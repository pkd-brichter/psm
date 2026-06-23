// @ts-nocheck
// Vereinte "Fläche" (Management-Einheit) der Kulturführung: Freiland-Polygone
// (ackerflaechen) und Gewächshäuser (gps_points mit kind='gewaechshaus').
// Stabile Referenz = (typ, id) — entspricht (flaeche_typ, flaeche_id) in den
// Tabellen anbau_kultur/massnahme und ist 1:1 backend-tauglich.
import { listAckerflaechen } from "@scripts/core/storage/sqlite";
import { extractSliceItems } from "@scripts/core/state";

export interface Unit {
  typ: "acker" | "haus";
  id: string;
  name: string;
  areaQm: number | null;
  lat: number | null;
  lon: number | null;
  color: string | null;
}

export function unitKey(u: { typ: string; id: string }): string {
  return u.typ + ":" + u.id;
}

// Repräsentative Koordinate eines Polygons = Mittel der Eckpunkte. Für eine
// Wetter-Abfrage (Wochenwerte) genau genug – spart das schwere turf-Bundle.
function centroidLatLon(latlngs: any[]): { lat: number; lon: number } | null {
  if (!Array.isArray(latlngs) || latlngs.length < 3) return null;
  let sLat = 0;
  let sLon = 0;
  let n = 0;
  const len = latlngs.length;
  // letzten Punkt überspringen, falls Ring geschlossen ist (== erster Punkt)
  const last = latlngs[len - 1];
  const first = latlngs[0];
  const closed =
    last && first && Number(last[0]) === Number(first[0]) && Number(last[1]) === Number(first[1]);
  const upto = closed ? len - 1 : len;
  for (let i = 0; i < upto; i++) {
    const lat = Number(latlngs[i]?.[0]);
    const lon = Number(latlngs[i]?.[1]);
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      sLat += lat;
      sLon += lon;
      n++;
    }
  }
  if (!n) return null;
  return { lat: sLat / n, lon: sLon / n };
}

export async function loadUnits(services: any): Promise<Unit[]> {
  const units: Unit[] = [];
  // Gewächshäuser aus dem GPS-State (kind === 'gewaechshaus')
  const points = extractSliceItems<any>(services.state.getState().gps?.points) || [];
  points.forEach((p: any) => {
    if (p?.kind !== "gewaechshaus") return;
    const lat = Number(p.latitude);
    const lon = Number(p.longitude);
    const area = Number(p.nutzflaecheQm);
    units.push({
      typ: "haus",
      id: String(p.id),
      name: p.name || "Gewächshaus",
      areaQm: Number.isFinite(area) && area > 0 ? area : null,
      lat: Number.isFinite(lat) ? lat : null,
      lon: Number.isFinite(lon) ? lon : null,
      color: null,
    });
  });
  // Freiland aus den gezeichneten Acker-Flächen
  try {
    const r = await listAckerflaechen();
    (r?.rows || []).forEach((fl: any) => {
      const c = centroidLatLon(fl.latlngs);
      const area = Number(fl.areaQm);
      units.push({
        typ: "acker",
        id: String(fl.id),
        name: fl.name || "Fläche",
        areaQm: Number.isFinite(area) && area > 0 ? area : null,
        lat: c?.lat ?? null,
        lon: c?.lon ?? null,
        color: fl.color || null,
      });
    });
  } catch {
    /* ohne sqlite-Treiber bleibt die Liste auf Gewächshäuser beschränkt */
  }
  return units;
}
