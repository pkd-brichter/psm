import { getDefaultsConfig } from "./config";
import { resolveFieldLabels } from "./labels";
import {
  createSliceWindowFromArray,
  getState,
  patchState,
  updateSlice,
  type GpsPoint,
  type AppState,
} from "./state";
import { emit } from "./eventBus";
import { getActiveDriverKey } from "./storage";
import { gpsLock } from "./asyncLock";
import {
  listGpsPoints as workerListGpsPoints,
  upsertGpsPoint as workerUpsertGpsPoint,
  deleteGpsPoint as workerDeleteGpsPoint,
  setActiveGpsPointId as workerSetActiveGpsPointId,
  getActiveGpsPointId as workerGetActiveGpsPointId,
  persistSqliteDatabaseFile,
  listKulturen,
  seedInitialData,
} from "./storage/sqlite";

function clone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

function deepMerge(target: any, source: any): any {
  if (!source || typeof source !== "object") {
    return target;
  }
  const result = Array.isArray(target) ? [...target] : { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        item && typeof item === "object" ? clone(item) : item,
      );
      continue;
    }
    if (value && typeof value === "object") {
      const baseValue =
        result[key] &&
        typeof result[key] === "object" &&
        !Array.isArray(result[key])
          ? result[key]
          : {};
      result[key] = deepMerge(baseValue, value);
      continue;
    }
    result[key] = value;
  }
  return result;
}

const DEFAULT_WATER_PER_HA = 500;

function normalizeDefaultForm(rawForm: any = {}): any {
  const baseForm = {
    creator: "",
    location: "",
    crop: "",
    usageType: "",
    areaHa: "",
    eppoCode: "",
    bbch: "",
    gps: "",
    invekos: "",
    time: "",
    date: "",
  };
  const form = { ...rawForm };
  if (form.quantity !== undefined && form.areaHa === undefined) {
    form.areaHa = form.quantity;
  }
  delete form.quantity;
  return { ...baseForm, ...form };
}

function normalizeDefaults(source: any = {}): any {
  const normalized: any = { ...source };
  const legacyWaterPerKiste = normalized.waterPerKisteL;
  const hasWaterPerHa = normalized.waterPerHaL != null;
  if (!hasWaterPerHa) {
    const perAr = Number(legacyWaterPerKiste);
    if (Number.isFinite(perAr)) {
      normalized.waterPerHaL = perAr * 100;
    }
  }
  if (normalized.waterPerHaL == null) {
    normalized.waterPerHaL = DEFAULT_WATER_PER_HA;
  }
  delete normalized.waterPerKisteL;
  delete normalized.kistenProAr;
  normalized.form = normalizeDefaultForm(normalized.form);
  return normalized;
}

function mergeDefaults(base: any = {}, incoming: any = {}): any {
  const normalizedBase = normalizeDefaults(base);
  const normalizedIncoming = normalizeDefaults(incoming);
  return {
    ...normalizedBase,
    ...normalizedIncoming,
    form: normalizeDefaultForm({
      ...normalizedBase.form,
      ...normalizedIncoming.form,
    }),
  };
}

export function applyDatabase(data: any): void {
  if (!data) {
    throw new Error("Keine Daten zum Anwenden übergeben");
  }
  const current = getState();
  const fieldLabels = resolveFieldLabels(data.meta?.fieldLabels ?? {});
  patchState({
    company: { ...current.company, ...(data.meta?.company ?? {}) },
    defaults: mergeDefaults(current.defaults, data.meta?.defaults ?? {}),
    measurementMethods: [
      ...(data.meta?.measurementMethods ?? current.measurementMethods),
    ],
    mediums: createSliceWindowFromArray(data.mediums ?? []),
    mediumProfiles: [...(data.mediumProfiles ?? [])],
    history: createSliceWindowFromArray(data.history ?? []),
    archives: {
      logs: [...(data.archives?.logs ?? current.archives?.logs ?? [])],
    },
    fieldLabels,
    app: {
      ...current.app,
      hasDatabase: true,
    },
  });
}

export function createInitialDatabase(overrides: any = {}): any {
  const defaults = getDefaultsConfig();
  if (defaults) {
    const base = clone(defaults);
    base.meta = base.meta || {};
    base.meta.fieldLabels = resolveFieldLabels(base.meta.fieldLabels ?? {});
    base.meta.defaults = mergeDefaults(
      {
        waterPerHaL: DEFAULT_WATER_PER_HA,
        form: {
          creator: "",
          location: "",
          crop: "",
          usageType: "",
          areaHa: "",
          eppoCode: "",
          bbch: "",
          gps: "",
          invekos: "",
          time: "",
          date: "",
        },
      },
      base.meta.defaults ?? {},
    );
    if ("templates" in base) {
      delete base.templates;
    }
    const merged = deepMerge(base, overrides);
    if ("templates" in merged) {
      delete (merged as any).templates;
    }
    if (!merged.archives) {
      (merged as any).archives = { logs: [] };
    } else if (!Array.isArray(merged.archives.logs)) {
      merged.archives.logs = [];
    }
    return merged;
  }
  const state = getState();
  const base = {
    meta: {
      version: state.app.version || 1,
      company: { ...state.company },
      defaults: { ...state.defaults },
      measurementMethods: [...state.measurementMethods],
      fieldLabels: { ...state.fieldLabels },
    },
    mediums: [...state.mediums.items],
    mediumProfiles: [...state.mediumProfiles],
    history: [],
    archives: { logs: [] },
  };
  const merged = deepMerge(base, overrides);
  if ("templates" in merged) {
    delete (merged as any).templates;
  }
  if (!merged.archives) {
    (merged as any).archives = { logs: [] };
  } else if (!Array.isArray(merged.archives.logs)) {
    merged.archives.logs = [];
  }
  return merged;
}

export function getDatabaseSnapshot(): any {
  const state = getState();
  const snapshot: any = {
    meta: {
      version: state.app.version || 1,
      company: { ...state.company },
      defaults: { ...state.defaults },
      measurementMethods: [...state.measurementMethods],
      fieldLabels: { ...state.fieldLabels },
    },
    mediums: [...state.mediums.items],
    mediumProfiles: [...state.mediumProfiles],
    archives: { logs: [...(state.archives?.logs ?? [])] },
  };
  // WICHTIG (Datenverlust-Schutz): Im SQLite-Modus wird die History direkt in der
  // Worker-Datenbank verwaltet (appendHistoryEntry/deleteHistoryEntryById) und ist
  // NICHT in state.history gespiegelt – state.history enthält nur den Stand beim
  // Öffnen. Würde man sie hier mitschicken, würde importSnapshot beim Speichern
  // einer Einstellung (Mittel/EPPO/BBCH/Firma) die veraltete Liste schreiben und
  // alle seit dem Öffnen erfassten Einträge löschen. Im SQLite-Modus wird die
  // History separat über persistSqliteDatabaseFile (Binär-Export) gesichert; daher
  // hier bewusst weglassen, damit importSnapshot sie unangetastet lässt.
  if (getActiveDriverKey() !== "sqlite") {
    snapshot.history = [...state.history.items];
  }
  return snapshot;
}

type GpsPointInput = {
  id?: string;
  name: string;
  description?: string | null;
  latitude: number;
  longitude: number;
  source?: string | null;
  nutzflaecheQm?: number | null;
  kind?: string | null;
};

function assertSqliteDriver(action: string): void {
  const driver = getActiveDriverKey();
  if (driver !== "sqlite") {
    throw new Error(
      `${action} erfordert eine aktive SQLite-Datenbank (aktueller Treiber: ${driver}).`,
    );
  }
}

/**
 * Spielt die Pestalozzi-Stammdaten (Standorte + Kultur→Mittel) in eine LEERE
 * Datenbank ein. Wird bei jedem DB-Connect aufgerufen, seedet aber nur, was
 * leer ist (idempotent) – so kommt eine NEU angelegte Datei vorbefüllt, ohne
 * bestehende Nutzerdaten zu verändern. Die Seed-Daten liegen als statische
 * Datei in der App (public/data/pestalozzi-seed.json) und werden nur bei
 * Bedarf nachgeladen (nicht im Haupt-Bundle).
 */
export async function ensureInitialSeed(): Promise<void> {
  if (getActiveDriverKey() !== "sqlite") {
    return;
  }
  try {
    const [gps, kult] = await Promise.all([
      workerListGpsPoints(),
      listKulturen(),
    ]);
    const needGps = !gps?.rows?.length;
    const needKm = !kult?.rows?.length;
    if (!needGps && !needKm) {
      return;
    }
    const url = `${import.meta.env.BASE_URL}data/pestalozzi-seed.json`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn("[Seed] pestalozzi-seed.json nicht erreichbar:", res.status);
      return;
    }
    const seed = await res.json();
    const inserted = await seedInitialData({
      gpsPoints: needGps ? seed.gpsPoints || [] : [],
      kulturMittel: needKm ? seed.kulturMittel || [] : [],
    });
    try {
      await persistSqliteDatabaseFile();
    } catch {
      /* kein Datei-Handle (neue, noch ungespeicherte DB) – wird beim Speichern geschrieben */
    }
    console.log("[Seed] Pestalozzi-Stammdaten eingespielt:", inserted);
  } catch (err) {
    console.warn("[Seed] Pestalozzi-Seed übersprungen:", err);
  }
}

function generateGpsPointId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `gps_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function normalizeGpsPoint(raw: any): GpsPoint {
  if (!raw) {
    throw new Error("Ungültiger GPS-Datensatz");
  }
  const latitude = Number(raw.latitude);
  const longitude = Number(raw.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error("Ungültige Koordinaten");
  }
  return {
    id: String(raw.id),
    name: String(raw.name ?? "").trim(),
    description: raw.description != null ? String(raw.description) : null,
    latitude,
    longitude,
    source: raw.source != null ? String(raw.source) : null,
    nutzflaecheQm:
      raw.nutzflaeche_qm != null
        ? Number(raw.nutzflaeche_qm)
        : raw.nutzflaecheQm != null
          ? Number(raw.nutzflaecheQm)
          : null,
    kind: raw.kind != null ? String(raw.kind) : null,
    createdAt: raw.created_at || raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updated_at || raw.updatedAt || new Date().toISOString(),
  };
}

function updateGpsState(
  updater:
    | Partial<AppState["gps"]>
    | ((prev: AppState["gps"]) => AppState["gps"]),
): void {
  if (typeof updater === "function") {
    updateSlice(
      "gps",
      updater as (current: AppState["gps"]) => AppState["gps"],
    );
    return;
  }
  updateSlice("gps", (prev) => ({ ...prev, ...updater }));
}

function insertPointIntoList(points: GpsPoint[], point: GpsPoint): GpsPoint[] {
  const filtered = points.filter((entry) => entry.id !== point.id);
  const next = [point, ...filtered];
  next.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return next;
}

async function persistGpsChanges(): Promise<void> {
  try {
    await persistSqliteDatabaseFile();
  } catch (error) {
    console.warn("GPS-Daten konnten nicht gespeichert werden", error);
  }
}

export async function loadGpsPoints(): Promise<GpsPoint[]> {
  assertSqliteDriver("GPS-Punkte laden");
  updateGpsState({ pending: true, lastError: null });
  try {
    const result = await workerListGpsPoints();
    const rows = Array.isArray(result?.rows) ? result.rows : [];
    const normalized = rows.map((row: any) => normalizeGpsPoint(row));
    const activeIdRaw =
      typeof result?.activePointId === "string"
        ? result.activePointId.trim()
        : "";
    updateGpsState({
      points: createSliceWindowFromArray(normalized),
      activePointId: activeIdRaw || null,
      pending: false,
      lastError: null,
      initialized: true,
    });
    return normalized;
  } catch (error) {
    console.error("GPS-Punkte konnten nicht geladen werden", error);
    updateGpsState({
      pending: false,
      lastError:
        error instanceof Error
          ? error.message
          : "GPS-Punkte konnten nicht geladen werden.",
      initialized: true,
    });
    throw error;
  }
}

export async function saveGpsPoint(
  input: GpsPointInput,
  options: { activate?: boolean } = {},
): Promise<GpsPoint> {
  assertSqliteDriver("GPS-Punkt speichern");

  // Verwende gpsLock um Race Conditions zu verhindern
  return gpsLock.acquire(async () => {
    const trimmedName = String(input.name ?? "").trim();
    if (!trimmedName) {
      throw new Error("Name für GPS-Punkt fehlt");
    }
    const latitude = Number(input.latitude);
    const longitude = Number(input.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new Error("Ungültige Koordinaten für GPS-Punkt");
    }

    const payload = {
      id: input.id || generateGpsPointId(),
      name: trimmedName,
      description: input.description ?? null,
      latitude,
      longitude,
      source: input.source ?? null,
      nutzflaecheQm:
        input.nutzflaecheQm != null && Number.isFinite(Number(input.nutzflaecheQm))
          ? Number(input.nutzflaecheQm)
          : null,
      kind: input.kind ?? null,
    };

    updateGpsState({ pending: true, lastError: null });
    try {
      const stored = await workerUpsertGpsPoint(payload);
      const point = normalizeGpsPoint(stored);
      updateGpsState((prev) => {
        const items = insertPointIntoList(prev.points.items, point);
        return {
          ...prev,
          points: {
            ...prev.points,
            items,
            totalCount: items.length,
            lastUpdatedAt: new Date().toISOString(),
            isComplete: true,
          },
          pending: false,
          lastError: null,
          initialized: true,
        };
      });
      if (options.activate) {
        await setActiveGpsPoint(point.id, { silent: true });
      }
      await persistGpsChanges();
      emit("gps:data-changed", { action: "upsert", id: point.id });
      return point;
    } catch (error) {
      console.error("GPS-Punkt konnte nicht gespeichert werden", error);
      updateGpsState({
        pending: false,
        lastError:
          error instanceof Error
            ? error.message
            : "GPS-Punkt konnte nicht gespeichert werden.",
        initialized: true,
      });
      throw error;
    }
  });
}

export async function deleteGpsPoint(id: string): Promise<void> {
  assertSqliteDriver("GPS-Punkt löschen");
  const trimmedId = String(id || "").trim();
  if (!trimmedId) {
    throw new Error("Ungültige GPS-Punkt-ID");
  }

  // Verwende gpsLock um Race Conditions zu verhindern
  return gpsLock.acquire(async () => {
    const wasActive = getState().gps.activePointId === trimmedId;
    updateGpsState({ pending: true, lastError: null });
    try {
      await workerDeleteGpsPoint({ id: trimmedId });
      updateGpsState((prev) => {
        const items = prev.points.items.filter(
          (point) => point.id !== trimmedId,
        );
        const activePointId =
          prev.activePointId === trimmedId ? null : prev.activePointId;
        return {
          ...prev,
          points: {
            ...prev.points,
            items,
            totalCount: items.length,
            lastUpdatedAt: new Date().toISOString(),
            isComplete: true,
          },
          activePointId,
          pending: false,
          lastError: null,
          initialized: true,
        };
      });
      if (wasActive) {
        await workerSetActiveGpsPointId({ id: null });
      }
      await persistGpsChanges();
      emit("gps:data-changed", { action: "delete", id: trimmedId });
    } catch (error) {
      console.error("GPS-Punkt konnte nicht gelöscht werden", error);
      updateGpsState({
        pending: false,
        lastError:
          error instanceof Error
            ? error.message
            : "GPS-Punkt konnte nicht gelöscht werden.",
        initialized: true,
      });
      throw error;
    }
  });
}

export async function setActiveGpsPoint(
  id: string | null,
  options: { silent?: boolean } = {},
): Promise<void> {
  assertSqliteDriver("GPS-Punkt aktiv setzen");
  const trimmedId = id ? String(id).trim() : "";
  await workerSetActiveGpsPointId({ id: trimmedId || null });
  updateGpsState({ activePointId: trimmedId || null });
  await persistGpsChanges();
  emit("gps:data-changed", { action: "activate", id: trimmedId || null });
  if (!options.silent) {
    console.info(
      trimmedId
        ? `GPS-Punkt ${trimmedId} als aktiv markiert.`
        : "Aktiver GPS-Punkt wurde zurückgesetzt.",
    );
  }
}

export async function syncGpsStateFromStorage(): Promise<void> {
  assertSqliteDriver("GPS-Status synchronisieren");
  const activeId = await workerGetActiveGpsPointId();
  updateGpsState({
    activePointId:
      typeof activeId === "string" && activeId.trim() ? activeId.trim() : null,
  });
  emit("gps:data-changed", { action: "sync-active", id: activeId ?? null });
}
