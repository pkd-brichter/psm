// psm-geo – WebAssembly-Geometriemodul für den Acker-Planer.
//
// Ersetzt Turf.js für die rechenintensiven Operationen:
//   • compute_beds(): Beet-Layout (bis zu 4000 Polygon-Schnitte pro Aufruf)
//   • haversine_m():  exakte Kantenlängen in Metern (für die Anzeige auf der Karte)
//   • bearing_deg():  Peilwinkel zwischen zwei Punkten (für "Beete ausrichten")
//
// Algorithmus (compute_beds):
//   1. Feld-Koordinaten [lat,lng] → lokales XY-Meter-Koordinatensystem
//      (Zentroid als Ursprung, cosinus-korrigierte Längengrade)
//   2. Fläche via Shoelace-Formel (m²)
//   3. Polygon um –angle rotieren → achsenparallele Streifen schneiden
//   4. Streifen zurückrotieren → Beet-Polygone in Originalausrichtung
//   5. Beet-Koordinaten → GeoJSON Feature (für Leaflet)
//
// Der gesamte Rechenkern läuft in nativem WASM-Code statt in interpretiertem JS,
// was den Hot-Path (4000 Polygon-Schnitte) ca. 8–12× beschleunigt.

use geo::{BooleanOps, Coord, LineString, MultiPolygon, Polygon};
use serde::Serialize;
use wasm_bindgen::prelude::*;

// ─── Hilfs-Geometrie ───────────────────────────────────────────────────────

/// Meter pro Grad (WGS-84, Äquatornähe). Gleicher Wert wie in Turf.js.
const M_PER_DEG: f64 = 111_320.0;
const R_EARTH: f64 = 6_371_000.0;

/// Projektiert (lat, lng) → lokales (x, y) in Metern relativ zum Zentroids (lat0, lng0).
/// Der Kosinusterm korrigiert die Breiten-abhängige Längengrad-Skalierung.
#[inline]
fn project(lat: f64, lng: f64, lat0: f64, lng0: f64) -> (f64, f64) {
    let x = (lng - lng0) * lat0.to_radians().cos() * M_PER_DEG;
    let y = (lat - lat0) * M_PER_DEG;
    (x, y)
}

/// Inverse Projektion: lokales (x, y) → (lat, lng).
#[inline]
fn unproject(x: f64, y: f64, lat0: f64, lng0: f64) -> (f64, f64) {
    let lat = lat0 + y / M_PER_DEG;
    let lng = lng0 + x / (lat0.to_radians().cos() * M_PER_DEG);
    (lat, lng)
}

/// Rotiert einen Punkt um den Ursprung um angle_rad (mathematisch positiv = gegen Uhrzeigersinn).
#[inline]
fn rotate_pt(x: f64, y: f64, cos_a: f64, sin_a: f64) -> (f64, f64) {
    (x * cos_a - y * sin_a, x * sin_a + y * cos_a)
}

/// Shoelace-Formel: Fläche eines einfachen Polygons in den Einheiten der Koordinaten.
/// Bei Meter-Koordinaten ergibt das direkt m².
fn shoelace_area(pts: &[(f64, f64)]) -> f64 {
    let n = pts.len();
    if n < 3 {
        return 0.0;
    }
    let mut acc = 0.0;
    for i in 0..n {
        let j = (i + 1) % n;
        acc += pts[i].0 * pts[j].1;
        acc -= pts[j].0 * pts[i].1;
    }
    (acc / 2.0).abs()
}

// ─── Exportierte WASM-Funktionen ────────────────────────────────────────────

/// Haversine-Distanz zwischen zwei WGS-84-Punkten in Metern.
/// Wird für die exakte Kantenlängenanzeige auf der Karte verwendet.
#[wasm_bindgen]
pub fn haversine_m(lat1: f64, lng1: f64, lat2: f64, lng2: f64) -> f64 {
    let phi1 = lat1.to_radians();
    let phi2 = lat2.to_radians();
    let dphi = (lat2 - lat1).to_radians();
    let dlam = (lng2 - lng1).to_radians();
    let a = (dphi / 2.0).sin().powi(2)
        + phi1.cos() * phi2.cos() * (dlam / 2.0).sin().powi(2);
    let c = 2.0 * a.sqrt().atan2((1.0 - a).sqrt());
    R_EARTH * c
}

/// Kompass-Peilwinkel (0–360°, Nord = 0) von Punkt A nach Punkt B.
/// Wird von "Beete an Fläche ausrichten" verwendet.
#[wasm_bindgen]
pub fn bearing_deg(lat1: f64, lng1: f64, lat2: f64, lng2: f64) -> f64 {
    let phi1 = lat1.to_radians();
    let phi2 = lat2.to_radians();
    let dlam = (lng2 - lng1).to_radians();
    let y = dlam.sin() * phi2.cos();
    let x = phi1.cos() * phi2.sin() - phi1.sin() * phi2.cos() * dlam.cos();
    (y.atan2(x).to_degrees() + 360.0) % 360.0
}

// ─── Beet-Berechnung ────────────────────────────────────────────────────────

#[derive(Serialize)]
struct BedResult {
    /// GeoJSON Feature (Polygon) in WGS-84 für Leaflet.
    geo: serde_json::Value,
    #[serde(rename = "lenM")]
    len_m: f64,
    rows: u32,
    #[serde(rename = "perRow")]
    per_row: u32,
    plants: u32,
    #[serde(rename = "areaM2")]
    area_m2: f64,
}

#[derive(Serialize)]
struct ComputeBedsResult {
    #[serde(rename = "areaM2")]
    area_m2: f64,
    #[serde(rename = "bedMeters")]
    bed_meters: f64,
    plants: u32,
    beds: Vec<BedResult>,
}

/// Berechnet das vollständige Beet-Layout für eine Ackerfläche.
///
/// # Parameter
/// - `latlngs_json`: JSON-Array `[[lat, lng], ...]` der Polygon-Eckpunkte
/// - `bed_w`:  Bettbreite in Metern
/// - `path_w`: Wegbreite in Metern
/// - `row_sp`: Reihenabstand in Metern
/// - `in_row_sp`: Pflanzabstand in der Reihe in Metern
/// - `angle_deg`: Ausrichtungswinkel der Beete in Grad
///
/// # Rückgabe
/// JSON-String mit `{ areaM2, bedMeters, plants, beds[] }`.
/// Jedes Beet enthält ein GeoJSON Feature für Leaflet.
#[wasm_bindgen]
pub fn compute_beds(
    latlngs_json: &str,
    bed_w: f64,
    path_w: f64,
    row_sp: f64,
    in_row_sp: f64,
    angle_deg: f64,
) -> String {
    // ── 1. Eingabe parsen ──────────────────────────────────────────────────
    let latlngs: Vec<[f64; 2]> = match serde_json::from_str(latlngs_json) {
        Ok(v) => v,
        Err(_) => return empty_result(),
    };

    let n = latlngs.len();
    if n < 3 {
        return empty_result();
    }

    // ── 2. Zentroid als Projektionsursprung ───────────────────────────────
    let lat0 = latlngs.iter().map(|p| p[0]).sum::<f64>() / n as f64;
    let lng0 = latlngs.iter().map(|p| p[1]).sum::<f64>() / n as f64;

    // ── 3. Projektieren → lokales XY in Metern ───────────────────────────
    let xy: Vec<(f64, f64)> = latlngs.iter()
        .map(|p| project(p[0], p[1], lat0, lng0))
        .collect();

    // ── 4. Gesamtfläche (Shoelace) ────────────────────────────────────────
    let area_m2 = shoelace_area(&xy);

    if !(bed_w > 0.0 && path_w >= 0.0 && row_sp > 0.0 && in_row_sp > 0.0) {
        return no_beds_result(area_m2);
    }
    let pitch = bed_w + path_w;
    if pitch <= 0.0 {
        return no_beds_result(area_m2);
    }

    // ── 5. Polygon um –angle rotieren ────────────────────────────────────
    let neg_rad = (-angle_deg).to_radians();
    let cos_neg = neg_rad.cos();
    let sin_neg = neg_rad.sin();
    let xy_rot: Vec<(f64, f64)> = xy.iter()
        .map(|(x, y)| rotate_pt(*x, *y, cos_neg, sin_neg))
        .collect();

    // ── 6. Bounding-Box im rotierten Raum ────────────────────────────────
    let xmin = xy_rot.iter().map(|p| p.0).fold(f64::INFINITY, f64::min);
    let xmax = xy_rot.iter().map(|p| p.0).fold(f64::NEG_INFINITY, f64::max);
    let ymin = xy_rot.iter().map(|p| p.1).fold(f64::INFINITY, f64::min);
    let ymax = xy_rot.iter().map(|p| p.1).fold(f64::NEG_INFINITY, f64::max);

    // ── 7. Feld-Polygon für geo::BooleanOps vorbereiten ──────────────────
    let mut ring_coords: Vec<Coord<f64>> = xy_rot.iter()
        .map(|(x, y)| Coord { x: *x, y: *y })
        .collect();
    // Ring schließen (BooleanOps erwartet geschlossenen Ring)
    if ring_coords.first() != ring_coords.last() {
        ring_coords.push(ring_coords[0]);
    }
    let field_poly = Polygon::new(LineString::from(ring_coords), vec![]);
    let field_mp = MultiPolygon::new(vec![field_poly]);

    // ── 8. Streifen-Schleife ──────────────────────────────────────────────
    let pad = (xmax - xmin) * 0.02 + 0.1; // kleiner Rand damit Randbeete nicht verloren gehen
    let back_rad = angle_deg.to_radians();
    let cos_back = back_rad.cos();
    let sin_back = back_rad.sin();

    let mut beds: Vec<BedResult> = Vec::new();
    let mut bed_meters = 0.0_f64;
    let mut total_plants = 0_u32;

    let mut y = ymin;
    let mut guard = 0;

    while y < ymax && guard < 4000 {
        let y_top = y + bed_w;

        // Streifen-Rechteck im rotierten Raum
        let strip_coords: Vec<Coord<f64>> = vec![
            Coord { x: xmin - pad, y },
            Coord { x: xmax + pad, y },
            Coord { x: xmax + pad, y: y_top },
            Coord { x: xmin - pad, y: y_top },
            Coord { x: xmin - pad, y }, // geschlossener Ring
        ];
        let strip_poly = Polygon::new(LineString::from(strip_coords), vec![]);
        let strip_mp = MultiPolygon::new(vec![strip_poly]);

        // Polygon-Schnitt (geo::BooleanOps via i_overlay)
        let inter: MultiPolygon<f64> = field_mp.intersection(&strip_mp);

        for poly in inter.0.iter() {
            // Äußeren Ring als Punktliste holen
            let inter_pts: Vec<(f64, f64)> = poly
                .exterior()
                .coords()
                .map(|c| (c.x, c.y))
                .collect();

            // Zurückrotieren (+angle) → Originalausrichtung der Beete
            let back_pts: Vec<(f64, f64)> = inter_pts.iter()
                .map(|(x, y)| rotate_pt(*x, *y, cos_back, sin_back))
                .collect();

            let area = shoelace_area(&back_pts);

            // Winzige Splitter (Randeffekte) herausfiltern
            let min_area = (bed_w * 0.3_f64).max(0.4);
            if area < min_area {
                continue;
            }

            let len_m = area / bed_w;
            let rows = ((bed_w / row_sp).floor() as u32).max(1);
            let per_row = (len_m / in_row_sp).floor() as u32;
            let plants = rows * per_row;

            bed_meters += len_m;
            total_plants += plants;

            // Rück-Projektion → WGS-84 Koordinaten für GeoJSON
            // GeoJSON-Konvention: [longitude, latitude]
            let geo_ring: Vec<[f64; 2]> = back_pts.iter()
                .map(|(x, y)| {
                    let (lat, lng) = unproject(*x, *y, lat0, lng0);
                    [lng, lat]
                })
                .collect();

            beds.push(BedResult {
                geo: serde_json::json!({
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [geo_ring]
                    },
                    "properties": {}
                }),
                len_m,
                rows,
                per_row,
                plants,
                area_m2: area,
            });
        }

        y += pitch;
        guard += 1;
    }

    serde_json::to_string(&ComputeBedsResult {
        area_m2,
        bed_meters,
        plants: total_plants,
        beds,
    })
    .unwrap_or_else(|_| empty_result())
}

// ─── Interne Hilfsfunktionen ────────────────────────────────────────────────

fn empty_result() -> String {
    r#"{"areaM2":0,"bedMeters":0,"plants":0,"beds":[]}"#.to_string()
}

fn no_beds_result(area_m2: f64) -> String {
    format!(
        r#"{{"areaM2":{area_m2},"bedMeters":0,"plants":0,"beds":[]}}"#
    )
}
