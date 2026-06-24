/* tslint:disable */
/* eslint-disable */

/**
 * Kompass-Peilwinkel (0–360°, Nord = 0) von Punkt A nach Punkt B.
 * Wird von "Beete an Fläche ausrichten" verwendet.
 */
export function bearing_deg(lat1: number, lng1: number, lat2: number, lng2: number): number;

/**
 * Berechnet das vollständige Beet-Layout für eine Ackerfläche.
 *
 * # Parameter
 * - `latlngs_json`: JSON-Array `[[lat, lng], ...]` der Polygon-Eckpunkte
 * - `bed_w`:  Bettbreite in Metern
 * - `path_w`: Wegbreite in Metern
 * - `row_sp`: Reihenabstand in Metern
 * - `in_row_sp`: Pflanzabstand in der Reihe in Metern
 * - `angle_deg`: Ausrichtungswinkel der Beete in Grad
 *
 * # Rückgabe
 * JSON-String mit `{ areaM2, bedMeters, plants, beds[] }`.
 * Jedes Beet enthält ein GeoJSON Feature für Leaflet.
 */
export function compute_beds(latlngs_json: string, bed_w: number, path_w: number, row_sp: number, in_row_sp: number, angle_deg: number): string;

/**
 * Haversine-Distanz zwischen zwei WGS-84-Punkten in Metern.
 * Wird für die exakte Kantenlängenanzeige auf der Karte verwendet.
 */
export function haversine_m(lat1: number, lng1: number, lat2: number, lng2: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly bearing_deg: (a: number, b: number, c: number, d: number) => number;
    readonly compute_beds: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly haversine_m: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
