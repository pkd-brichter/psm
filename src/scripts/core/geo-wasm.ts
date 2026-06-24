// geo-wasm.ts – Brücke zum psm-geo WebAssembly-Modul.
//
// Das WASM-Modul wird LAZY geladen (nur wenn die Acker-Karte geöffnet wird)
// und danach im Speicher gehalten. Alle Funktionen sind async, aber nach dem
// ersten Aufruf sind nur noch synchrone WASM-Aufrufe hinter dem await.
//
// Bereitgestellte Funktionen:
//   geoWasm.haversineM(lat1, lng1, lat2, lng2)  → Meter
//   geoWasm.bearingDeg(lat1, lng1, lat2, lng2)  → 0–360°
//   geoWasm.computeBeds(latlngs, params)         → { areaM2, bedMeters, plants, beds[] }

export interface BedResult {
  geo: object;
  lenM: number;
  rows: number;
  perRow: number;
  plants: number;
  areaM2: number;
}

export interface ComputeBedsResult {
  areaM2: number;
  bedMeters: number;
  plants: number;
  beds: BedResult[];
}

export interface BedParams {
  bedW: number;
  pathW: number;
  rowSp: number;
  inRowSp: number;
  angle: number;
}

// Interner Modul-Cache – nach erstem Laden wird das WASM nicht erneut geladen.
let _mod: Record<string, Function> | null = null;

async function getWasmModule(): Promise<Record<string, Function>> {
  if (_mod) return _mod;

  // BASE_URL wird von Vite/Astro beim Build zu "/psm/" aufgelöst.
  const jsUrl = import.meta.env.BASE_URL + "vendor/psm-geo/psm_geo.js";

  // Dynamischer Import des wasm-bindgen JS-Wrappers.
  // /* @vite-ignore */ unterdrückt die Warnung über dynamische Pfade –
  // der Pfad ist bewusst variabel (BASE_URL).
  const wasmModule = await import(/* @vite-ignore */ jsUrl);

  // wasm-bindgen erzeugt eine default-Funktion, die das .wasm lädt und initialisiert.
  const wasmUrl = new URL(
    import.meta.env.BASE_URL + "vendor/psm-geo/psm_geo_bg.wasm",
    globalThis.location?.href,
  );
  await wasmModule.default(wasmUrl);

  _mod = wasmModule as Record<string, Function>;
  return _mod;
}

// ─── Öffentliche API ────────────────────────────────────────────────────────

/**
 * Haversine-Distanz in Metern zwischen zwei WGS-84-Punkten.
 * Wird für die Kantenlängen-Anzeige auf der Karte verwendet.
 */
export async function haversineM(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): Promise<number> {
  const m = await getWasmModule();
  return (m.haversine_m as Function)(lat1, lng1, lat2, lng2);
}

/**
 * Kompass-Peilwinkel (0–360°) von Punkt A nach B.
 * Wird für "Beete an Fläche ausrichten" verwendet.
 */
export async function bearingDeg(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): Promise<number> {
  const m = await getWasmModule();
  return (m.bearing_deg as Function)(lat1, lng1, lat2, lng2);
}

/**
 * Berechnet das vollständige Beet-Layout für eine Ackerfläche.
 * Ersetzt die Turf.js-basierte computeBeds()-Funktion.
 *
 * @param latlngs  Polygon-Eckpunkte als [[lat, lng], ...]
 * @param p        Beet-Parameter (Breiten, Abstände, Winkel)
 */
export async function computeBeds(
  latlngs: [number, number][],
  p: BedParams,
): Promise<ComputeBedsResult> {
  const m = await getWasmModule();
  const json = (m.compute_beds as Function)(
    JSON.stringify(latlngs),
    p.bedW,
    p.pathW,
    p.rowSp,
    p.inRowSp,
    p.angle,
  );
  return JSON.parse(json) as ComputeBedsResult;
}

// Vorkompiliertes Singleton – der Aufrufer kann das Modul vorab laden,
// damit der erste compute_beds()-Aufruf ohne WASM-Ladezeit reagiert.
export async function preloadGeoWasm(): Promise<void> {
  await getWasmModule();
}
