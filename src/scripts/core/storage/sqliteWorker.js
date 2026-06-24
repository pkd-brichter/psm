/**
 * SQLite Web Worker
 * Handles all database operations in a separate thread to prevent UI blocking
 */

let sqlite3 = null;
let db = null;
let isInitialized = false;
let currentMode = "memory";

// SQLite-WASM CDN URL
const SQLITE_WASM_CDN =
  "https://cdn.jsdelivr.net/npm/@sqlite.org/sqlite-wasm@3.46.1-build1/sqlite-wasm/jswasm/";
const GPS_ACTIVE_POINT_META_KEY = "gps_active_point";

function clampPageSize(value, fallback = 50, max = 500) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return fallback;
  }
  return Math.min(Math.max(1, Math.floor(numeric)), max);
}

function getFieldValue(record, fieldName) {
  if (!record || !fieldName) {
    return null;
  }

  const candidates = [
    fieldName,
    fieldName.toLowerCase(),
    fieldName.toUpperCase(),
  ];
  for (const key of candidates) {
    if (Object.prototype.hasOwnProperty.call(record, key)) {
      const value = record[key];
      if (value === null || value === undefined || value === "") {
        return null;
      }
      return String(value);
    }
  }
  return null;
}

function safeParseJson(text) {
  if (typeof text !== "string") {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    console.warn("Failed to parse payload JSON", error);
    return null;
  }
}

function normalizePayloadRecord(record) {
  if (!record || typeof record !== "object") {
    return record;
  }
  const normalized = {};
  for (const [key, value] of Object.entries(record)) {
    normalized[key] = value;
    const lower = key.toLowerCase();
    if (!Object.prototype.hasOwnProperty.call(normalized, lower)) {
      normalized[lower] = value;
    }
  }
  return normalized;
}

function ensureMediumProfileTables(targetDb = db) {
  if (!targetDb) {
    return;
  }

  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS medium_profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS medium_profile_mediums (
      profile_id TEXT NOT NULL,
      medium_id TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (profile_id, medium_id),
      FOREIGN KEY(profile_id) REFERENCES medium_profiles(id) ON DELETE CASCADE,
      FOREIGN KEY(medium_id) REFERENCES mediums(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_medium_profile_mediums_profile
      ON medium_profile_mediums(profile_id, sort_order);
  `);
}

function hasColumn(targetDb, tableName, columnName) {
  if (!targetDb) {
    return false;
  }
  const sql = `SELECT 1 FROM pragma_table_info('${tableName}') WHERE name = '${columnName}' LIMIT 1`;
  return Boolean(targetDb.selectValue(sql));
}

function hasTable(targetDb, tableName) {
  if (!targetDb || !tableName) {
    return false;
  }
  const sql = `SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = '${tableName}' LIMIT 1`;
  return Boolean(targetDb.selectValue(sql));
}

function ensureMediumApprovalColumn(targetDb = db) {
  if (!targetDb) {
    return;
  }
  if (hasColumn(targetDb, "mediums", "zulassungsnummer")) {
    return;
  }
  targetDb.exec("ALTER TABLE mediums ADD COLUMN zulassungsnummer TEXT");
}

/**
 * Ensure QS columns (wartezeit, wirkstoff) exist on mediums table
 */
function ensureMediumColumns(targetDb = db) {
  if (!targetDb) {
    return;
  }
  // Add wartezeit column if missing (TEXT for codes like 'FX')
  if (!hasColumn(targetDb, "mediums", "wartezeit")) {
    try {
      targetDb.exec("ALTER TABLE mediums ADD COLUMN wartezeit TEXT");
      console.log("[DB] Added wartezeit column to mediums");
    } catch (e) {
      console.warn("[DB] Could not add wartezeit column:", e.message);
    }
  }
  // Add wirkstoff column if missing
  if (!hasColumn(targetDb, "mediums", "wirkstoff")) {
    try {
      targetDb.exec("ALTER TABLE mediums ADD COLUMN wirkstoff TEXT");
      console.log("[DB] Added wirkstoff column to mediums");
    } catch (e) {
      console.warn("[DB] Could not add wirkstoff column:", e.message);
    }
  }
}

function ensureLookupTables(targetDb = db) {
  if (!targetDb) {
    return;
  }

  const ensureEppoTable = () => {
    targetDb.exec("DROP TABLE IF EXISTS lookup_eppo_codes");
    targetDb.exec(`
      CREATE TABLE IF NOT EXISTS lookup_eppo_codes (
        code TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT '',
        name TEXT NOT NULL,
        dtcode TEXT,
        preferred INTEGER DEFAULT 1,
        dt_label TEXT,
        language_label TEXT,
        authority TEXT,
        name_de TEXT,
        name_en TEXT,
        name_la TEXT,
        PRIMARY KEY (code, language)
      );
    `);
  };

  if (!hasColumn(targetDb, "lookup_eppo_codes", "language")) {
    ensureEppoTable();
  } else {
    targetDb.exec(`
      CREATE TABLE IF NOT EXISTS lookup_eppo_codes (
        code TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT '',
        name TEXT NOT NULL,
        dtcode TEXT,
        preferred INTEGER DEFAULT 1,
        dt_label TEXT,
        language_label TEXT,
        authority TEXT,
        name_de TEXT,
        name_en TEXT,
        name_la TEXT,
        PRIMARY KEY (code, language)
      );
    `);
  }

  targetDb.exec(`
    CREATE INDEX IF NOT EXISTS idx_lookup_eppo_name ON lookup_eppo_codes(name COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_lookup_eppo_dtcode ON lookup_eppo_codes(dtcode);
    CREATE INDEX IF NOT EXISTS idx_lookup_eppo_language ON lookup_eppo_codes(language);

    CREATE TABLE IF NOT EXISTS lookup_bbch_stages (
      code TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      principal_stage INTEGER,
      secondary_stage INTEGER,
      definition TEXT,
      kind TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_lookup_bbch_label ON lookup_bbch_stages(label COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_lookup_bbch_principal ON lookup_bbch_stages(principal_stage);
  `);

  const enrichedColumns = [
    { name: "dt_label", type: "TEXT" },
    { name: "language_label", type: "TEXT" },
    { name: "authority", type: "TEXT" },
    { name: "name_de", type: "TEXT" },
    { name: "name_en", type: "TEXT" },
    { name: "name_la", type: "TEXT" },
  ];
  for (const column of enrichedColumns) {
    if (!hasColumn(targetDb, "lookup_eppo_codes", column.name)) {
      targetDb.exec(
        `ALTER TABLE lookup_eppo_codes ADD COLUMN ${column.name} ${column.type}`
      );
    }
  }
}

function ensureGpsPointTable(targetDb = db) {
  if (!targetDb) {
    return;
  }
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS gps_points (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      source TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      nutzflaeche_qm REAL,
      kind TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_gps_points_created ON gps_points(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_gps_points_name ON gps_points(name COLLATE NOCASE);
  `);
}

function ensureArchiveLogsTable(targetDb = db) {
  if (!targetDb) {
    return;
  }
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS archive_logs (
      id TEXT PRIMARY KEY,
      archived_at TEXT NOT NULL,
      start_date TEXT,
      end_date TEXT,
      entry_count INTEGER NOT NULL DEFAULT 0,
      file_name TEXT,
      storage_hint TEXT,
      note TEXT,
      metadata_json TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_archive_logs_archived_at
      ON archive_logs(archived_at DESC, id DESC);
  `);
}

function generateArchiveLogId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `archive_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function normalizeArchiveLogEntry(entry) {
  if (!entry || typeof entry !== "object") {
    return null;
  }
  const id = entry.id ? String(entry.id) : generateArchiveLogId();
  const archivedAt =
    entry.archivedAt || entry.archived_at || new Date().toISOString();
  const startDate = entry.startDate || entry.start_date || null;
  const endDate = entry.endDate || entry.end_date || null;
  const entryCount = Number(entry.entryCount ?? entry.entry_count ?? 0) || 0;
  const fileName = entry.fileName || entry.file_name || "";
  const storageHint = entry.storageHint || entry.storage_hint || null;
  const note = entry.note ?? entry.note_text ?? null;
  return {
    id,
    archivedAt,
    startDate,
    endDate,
    entryCount,
    fileName,
    storageHint,
    note,
    metadata: {
      ...entry,
      id,
      archivedAt,
      startDate,
      endDate,
      entryCount,
      fileName,
      storageHint,
      note,
    },
  };
}

function toArchiveLogMetaPayload(entry) {
  return {
    id: entry.id,
    archivedAt: entry.archivedAt,
    startDate: entry.startDate ?? null,
    endDate: entry.endDate ?? null,
    entryCount: entry.entryCount ?? 0,
    fileName: entry.fileName ?? "",
    storageHint: entry.storageHint ?? null,
    note: entry.note ?? null,
  };
}

function replaceArchiveLogs(logs = [], targetDb = db) {
  ensureArchiveLogsTable(targetDb);
  targetDb.exec("DELETE FROM archive_logs");
  if (!Array.isArray(logs) || !logs.length) {
    return [];
  }
  const stmt = targetDb.prepare(
    `INSERT OR REPLACE INTO archive_logs
      (id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const sanitized = [];
  for (const raw of logs) {
    const normalized = normalizeArchiveLogEntry(raw);
    if (!normalized) {
      continue;
    }
    stmt
      .bind([
        normalized.id,
        normalized.archivedAt,
        normalized.startDate,
        normalized.endDate,
        normalized.entryCount,
        normalized.fileName,
        normalized.storageHint,
        normalized.note,
        JSON.stringify(normalized.metadata || raw || {}),
      ])
      .step();
    stmt.reset();
    sanitized.push(toArchiveLogMetaPayload(normalized));
  }
  stmt.finalize();
  return sanitized;
}

function readAllArchiveLogs(targetDb = db) {
  ensureArchiveLogsTable(targetDb);
  const logs = [];
  targetDb.exec({
    sql: `SELECT id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json
          FROM archive_logs
          ORDER BY datetime(archived_at) DESC, id DESC`,
    rowMode: "object",
    callback: (row) => {
      const mapped = mapArchiveLogRow(row);
      if (mapped) {
        logs.push(mapped);
      }
    },
  });
  return logs;
}

function mapArchiveLogRow(row) {
  if (!row) {
    return null;
  }
  const metadata = row.metadata_json ? safeParseJson(row.metadata_json) : null;
  const entry = metadata && typeof metadata === "object" ? { ...metadata } : {};
  entry.id = String(row.id);
  entry.archivedAt =
    row.archived_at || entry.archivedAt || new Date().toISOString();
  entry.startDate = row.start_date ?? entry.startDate ?? null;
  entry.endDate = row.end_date ?? entry.endDate ?? null;
  entry.entryCount = Number(row.entry_count ?? entry.entryCount ?? 0) || 0;
  entry.fileName = row.file_name || entry.fileName || "";
  entry.storageHint = row.storage_hint ?? entry.storageHint ?? null;
  entry.note = row.note ?? entry.note ?? null;
  return entry;
}

function syncArchiveLogsMeta(targetDb = db) {
  const logs = readAllArchiveLogs(targetDb).map((entry) =>
    toArchiveLogMetaPayload(entry)
  );
  setMetaValue("archives", JSON.stringify({ logs }), targetDb);
}

function generateGpsPointId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `gps_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function mapGpsPointRow(row) {
  if (!row) {
    return null;
  }
  return {
    id: String(row.id),
    name: row.name != null ? String(row.name) : "",
    description: row.description ?? null,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    source: row.source ?? null,
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
    nutzflaeche_qm: row.nutzflaeche_qm != null ? Number(row.nutzflaeche_qm) : null,
    kind: row.kind ?? null,
  };
}

function readGpsPointById(id) {
  if (!db || !id) {
    return null;
  }
  let record = null;
  db.exec({
    sql: `SELECT id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind
           FROM gps_points
           WHERE id = ?
           LIMIT 1`,
    bind: [id],
    rowMode: "object",
    callback: (row) => {
      if (!record) {
        record = mapGpsPointRow(row);
      }
    },
  });
  return record;
}

async function listGpsPoints() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  ensureGpsPointTable();
  const rows = [];
  db.exec({
    sql: `SELECT id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind
          FROM gps_points
          ORDER BY datetime(updated_at) DESC`,
    rowMode: "object",
    callback: (row) => {
      rows.push(mapGpsPointRow(row));
    },
  });
  const activePointId = getMetaValue(GPS_ACTIVE_POINT_META_KEY);
  return { rows, activePointId: activePointId || null };
}

async function listGpsPointsPaged(options = {}) {
  if (!db) {
    throw new Error("Database not initialized");
  }
  ensureGpsPointTable();

  const {
    cursor = null,
    limit,
    pageSize,
    search,
    includeTotal = false,
  } = options || {};

  const effectivePageSize = clampPageSize(pageSize ?? limit, 100, 500);
  const searchTerm = typeof search === "string" ? search.trim() : "";
  const filterClauses = [];
  const filterParams = [];

  if (searchTerm) {
    filterClauses.push(
      "(LOWER(name) LIKE LOWER(?) OR LOWER(COALESCE(description, '')) LIKE LOWER(?))"
    );
    const like = `%${searchTerm}%`;
    filterParams.push(like, like);
  }

  const queryClauses = [...filterClauses];
  const queryParams = [...filterParams];
  if (cursor && cursor.updatedAt) {
    const idValue = cursor.id != null ? String(cursor.id) : "";
    const updatedAt = cursor.updatedAt;
    queryClauses.push(`(
      datetime(updated_at) < datetime(?)
      OR (datetime(updated_at) = datetime(?) AND id > ?)
    )`);
    queryParams.push(updatedAt, updatedAt, idValue);
  }

  const whereSql = queryClauses.length
    ? `WHERE ${queryClauses.join(" AND ")}`
    : "";

  const stmt = db.prepare(
    `SELECT rowid AS cursor_rowid, id, name, description, latitude, longitude, source, created_at, updated_at
     FROM gps_points
     ${whereSql}
     ORDER BY datetime(updated_at) DESC, id ASC
     LIMIT ?`
  );
  stmt.bind([...queryParams, effectivePageSize + 1]);

  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.finalize();

  const hasMore = rows.length > effectivePageSize;
  const pageRows = hasMore ? rows.slice(0, effectivePageSize) : rows;
  const items = pageRows
    .map((row) => mapGpsPointRow(row))
    .filter((row) => row !== null);

  const lastRow = pageRows.length ? pageRows[pageRows.length - 1] : null;
  const nextCursor =
    hasMore && lastRow
      ? {
          id: String(lastRow.id ?? ""),
          updatedAt: lastRow.updated_at || lastRow.updatedAt || null,
          rowid: Number(lastRow.cursor_rowid) || Number(lastRow.rowid || 0),
        }
      : null;

  let totalCount;
  if (includeTotal) {
    const totalWhere = filterClauses.length
      ? `WHERE ${filterClauses.join(" AND ")}`
      : "";
    const totalStmt = db.prepare(
      `SELECT COUNT(*) AS total FROM gps_points ${totalWhere}`
    );
    if (filterParams.length) {
      totalStmt.bind(filterParams);
    }
    if (totalStmt.step()) {
      const row = totalStmt.getAsObject();
      totalCount = Number(row?.total) || 0;
    } else {
      totalCount = 0;
    }
    totalStmt.finalize();
  }

  const activePointId = getMetaValue(GPS_ACTIVE_POINT_META_KEY);

  return {
    items,
    nextCursor,
    hasMore,
    pageSize: effectivePageSize,
    activePointId: activePointId || null,
    totalCount,
  };
}

async function upsertGpsPoint(payload = {}) {
  if (!db) {
    throw new Error("Database not initialized");
  }
  ensureGpsPointTable();

  const id = String(payload.id || generateGpsPointId());
  const name = String(payload.name ?? "").trim();
  if (!name) {
    throw new Error("GPS-Punkt benötigt einen Namen.");
  }
  const latitude = Number(payload.latitude);
  const longitude = Number(payload.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error("GPS-Punkt hat ungültige Koordinaten.");
  }
  const description =
    payload.description != null ? String(payload.description) : null;
  const source = payload.source != null ? String(payload.source) : null;
  const nutzflaecheRaw =
    payload.nutzflaecheQm ?? payload.nutzflaeche_qm ?? null;
  const nutzflaeche =
    nutzflaecheRaw != null && Number.isFinite(Number(nutzflaecheRaw))
      ? Number(nutzflaecheRaw)
      : null;
  const kind = payload.kind != null ? String(payload.kind) : null;
  const now = new Date().toISOString();

  const exists = db.selectValue(
    "SELECT 1 FROM gps_points WHERE id = ? LIMIT 1",
    [id]
  );
  if (exists) {
    const stmt = db.prepare(
      `UPDATE gps_points
       SET name = ?, description = ?, latitude = ?, longitude = ?, source = ?, nutzflaeche_qm = ?, kind = ?, updated_at = ?
       WHERE id = ?`
    );
    stmt.bind([name, description, latitude, longitude, source, nutzflaeche, kind, now, id]);
    stmt.step();
    stmt.finalize();
  } else {
    const stmt = db.prepare(
      `INSERT INTO gps_points (id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    stmt.bind([id, name, description, latitude, longitude, source, now, now, nutzflaeche, kind]);
    stmt.step();
    stmt.finalize();
  }

  const row = readGpsPointById(id);
  if (!row) {
    throw new Error("GPS-Punkt konnte nicht gelesen werden.");
  }
  return row;
}
async function deleteGpsPoint(payload = {}) {
  if (!db) {
    throw new Error("Database not initialized");
  }
  ensureGpsPointTable();
  const id = String(payload.id ?? "").trim();
  if (!id) {
    throw new Error("ID für GPS-Punkt fehlt.");
  }
  const stmt = db.prepare("DELETE FROM gps_points WHERE id = ?");
  stmt.bind([id]);
  stmt.step();
  stmt.finalize();
  const activePointId = getMetaValue(GPS_ACTIVE_POINT_META_KEY);
  if (activePointId === id) {
    deleteMetaValue(GPS_ACTIVE_POINT_META_KEY);
  }
  return { success: true };
}

async function setActiveGpsPointId(payload = {}) {
  if (!db) {
    throw new Error("Database not initialized");
  }
  ensureGpsPointTable();
  const id =
    payload && typeof payload.id === "string" ? payload.id.trim() : null;
  if (id) {
    const exists = db.selectValue(
      "SELECT 1 FROM gps_points WHERE id = ? LIMIT 1",
      [id]
    );
    if (!exists) {
      throw new Error("GPS-Punkt wurde nicht gefunden.");
    }
    setMetaValue(GPS_ACTIVE_POINT_META_KEY, id);
    return { activePointId: id };
  }
  deleteMetaValue(GPS_ACTIVE_POINT_META_KEY);
  return { activePointId: null };
}

async function getActiveGpsPointId() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  const activePointId = getMetaValue(GPS_ACTIVE_POINT_META_KEY);
  return { activePointId: activePointId || null };
}

// ============================================
// Kultur → Mittel (Pestalozzi / Demeter) Functions
// ============================================

function ensureKulturMittelTable(targetDb = db) {
  if (!targetDb) return;
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS kultur_mittel (
      id TEXT PRIMARY KEY,
      kultur TEXT NOT NULL,
      anbau TEXT,
      problem TEXT,
      mittel_name TEXT NOT NULL,
      kennr TEXT,
      wirkstoff TEXT,
      eppo_code TEXT,
      bbch_default TEXT,
      bbch TEXT,
      wartezeit TEXT,
      aufwand_wert TEXT,
      aufwand_einheit TEXT,
      aufwand_bezug TEXT,
      max_anwendungen TEXT,
      bemerkung TEXT,
      ist_psm INTEGER NOT NULL DEFAULT 1,
      ist_kupfer INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_kultur_mittel_kultur
      ON kultur_mittel(kultur, anbau, sort_order);
  `);
}

function generateKulturMittelId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `km_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function mapKulturMittelRow(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    kultur: row.kultur != null ? String(row.kultur) : "",
    anbau: row.anbau ?? null,
    problem: row.problem ?? null,
    mittelName: row.mittel_name != null ? String(row.mittel_name) : "",
    kennr: row.kennr ?? null,
    wirkstoff: row.wirkstoff ?? null,
    eppoCode: row.eppo_code ?? null,
    bbchDefault: row.bbch_default ?? null,
    bbch: row.bbch ?? null,
    wartezeit: row.wartezeit ?? null,
    aufwandWert: row.aufwand_wert ?? null,
    aufwandEinheit: row.aufwand_einheit ?? null,
    aufwandBezug: row.aufwand_bezug ?? null,
    maxAnwendungen: row.max_anwendungen ?? null,
    bemerkung: row.bemerkung ?? null,
    istPsm: row.ist_psm ? 1 : 0,
    istKupfer: row.ist_kupfer ? 1 : 0,
    sortOrder: row.sort_order != null ? Number(row.sort_order) : 0,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

async function listKulturen() {
  if (!db) throw new Error("Database not initialized");
  ensureKulturMittelTable();
  const rows = [];
  db.exec({
    sql: `SELECT kultur, anbau, COUNT(*) AS anzahl,
                 MAX(eppo_code) AS eppo_code, MAX(bbch_default) AS bbch_default
          FROM kultur_mittel
          GROUP BY kultur, anbau
          ORDER BY kultur COLLATE NOCASE, anbau`,
    rowMode: "object",
    callback: (row) => {
      rows.push({
        kultur: row.kultur != null ? String(row.kultur) : "",
        anbau: row.anbau ?? null,
        anzahl: row.anzahl != null ? Number(row.anzahl) : 0,
        eppoCode: row.eppo_code ?? null,
        bbchDefault: row.bbch_default ?? null,
      });
    },
  });
  return { rows };
}

async function listKulturMittel(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureKulturMittelTable();
  const kultur =
    payload && payload.kultur != null ? String(payload.kultur) : null;
  const anbau = payload && payload.anbau != null ? String(payload.anbau) : null;
  const clauses = [];
  const params = [];
  if (kultur) {
    clauses.push("kultur = ?");
    params.push(kultur);
  }
  if (anbau) {
    clauses.push("anbau = ?");
    params.push(anbau);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const rows = [];
  db.exec({
    sql: `SELECT * FROM kultur_mittel ${where}
          ORDER BY sort_order, mittel_name COLLATE NOCASE`,
    bind: params,
    rowMode: "object",
    callback: (row) => rows.push(mapKulturMittelRow(row)),
  });
  return { rows };
}

async function upsertKulturMittel(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureKulturMittelTable();
  const id = String(payload.id || generateKulturMittelId());
  const kultur = String(payload.kultur ?? "").trim();
  const mittelName = String(
    payload.mittelName ?? payload.mittel_name ?? ""
  ).trim();
  if (!kultur || !mittelName) {
    throw new Error("kultur und mittel_name sind erforderlich.");
  }
  const now = new Date().toISOString();
  const v = {
    anbau: payload.anbau != null ? String(payload.anbau) : null,
    problem: payload.problem != null ? String(payload.problem) : null,
    kennr: payload.kennr != null ? String(payload.kennr) : null,
    wirkstoff: payload.wirkstoff != null ? String(payload.wirkstoff) : null,
    wartezeit: payload.wartezeit != null ? String(payload.wartezeit) : null,
    aufwand_wert:
      payload.aufwandWert ?? payload.aufwand_wert != null
        ? String(payload.aufwandWert ?? payload.aufwand_wert)
        : null,
    aufwand_einheit:
      payload.aufwandEinheit ?? payload.aufwand_einheit != null
        ? String(payload.aufwandEinheit ?? payload.aufwand_einheit)
        : null,
    aufwand_bezug:
      payload.aufwandBezug ?? payload.aufwand_bezug != null
        ? String(payload.aufwandBezug ?? payload.aufwand_bezug)
        : null,
    max_anwendungen:
      payload.maxAnwendungen != null ? String(payload.maxAnwendungen) : null,
    bemerkung: payload.bemerkung != null ? String(payload.bemerkung) : null,
    ist_psm:
      payload.istPsm === 0 || payload.ist_psm === 0 || payload.istPsm === false
        ? 0
        : 1,
    ist_kupfer: payload.istKupfer || payload.ist_kupfer ? 1 : 0,
    sort_order: Number.isFinite(Number(payload.sortOrder ?? payload.sort_order))
      ? Number(payload.sortOrder ?? payload.sort_order)
      : 0,
  };
  const exists = db.selectValue(
    "SELECT 1 FROM kultur_mittel WHERE id = ? LIMIT 1",
    [id]
  );
  if (exists) {
    const stmt = db.prepare(
      `UPDATE kultur_mittel SET kultur=?, anbau=?, problem=?, mittel_name=?, kennr=?, wirkstoff=?, wartezeit=?, aufwand_wert=?, aufwand_einheit=?, aufwand_bezug=?, max_anwendungen=?, bemerkung=?, ist_psm=?, ist_kupfer=?, sort_order=?, updated_at=? WHERE id=?`
    );
    stmt.bind([
      kultur, v.anbau, v.problem, mittelName, v.kennr, v.wirkstoff,
      v.wartezeit, v.aufwand_wert, v.aufwand_einheit, v.aufwand_bezug,
      v.max_anwendungen, v.bemerkung, v.ist_psm, v.ist_kupfer, v.sort_order,
      now, id,
    ]);
    stmt.step();
    stmt.finalize();
  } else {
    const stmt = db.prepare(
      `INSERT INTO kultur_mittel (id, kultur, anbau, problem, mittel_name, kennr, wirkstoff, wartezeit, aufwand_wert, aufwand_einheit, aufwand_bezug, max_anwendungen, bemerkung, ist_psm, ist_kupfer, sort_order, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    );
    stmt.bind([
      id, kultur, v.anbau, v.problem, mittelName, v.kennr, v.wirkstoff,
      v.wartezeit, v.aufwand_wert, v.aufwand_einheit, v.aufwand_bezug,
      v.max_anwendungen, v.bemerkung, v.ist_psm, v.ist_kupfer, v.sort_order,
      now, now,
    ]);
    stmt.step();
    stmt.finalize();
  }
  let record = null;
  db.exec({
    sql: "SELECT * FROM kultur_mittel WHERE id = ? LIMIT 1",
    bind: [id],
    rowMode: "object",
    callback: (row) => {
      if (!record) record = mapKulturMittelRow(row);
    },
  });
  return record;
}

async function deleteKulturMittel(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureKulturMittelTable();
  const id = String(payload.id ?? "").trim();
  if (!id) throw new Error("ID fehlt.");
  const stmt = db.prepare("DELETE FROM kultur_mittel WHERE id = ?");
  stmt.bind([id]);
  stmt.step();
  stmt.finalize();
  return { success: true };
}

/**
 * Spielt die Pestalozzi-Stammdaten (Standorte + Kultur→Mittel) in eine
 * LEERE Datenbank ein (idempotent: je Tabelle nur, wenn sie leer ist).
 * Die Daten kommen aus der App (public/data/pestalozzi-seed.json).
 */
async function seedInitialData(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureGpsPointTable();
  ensureKulturMittelTable();
  const now = new Date().toISOString();
  const result = { gpsPoints: 0, kulturMittel: 0 };

  const gpsPoints = Array.isArray(payload.gpsPoints) ? payload.gpsPoints : [];
  if (gpsPoints.length && (db.selectValue("SELECT COUNT(*) FROM gps_points") || 0) === 0) {
    db.exec("BEGIN TRANSACTION");
    try {
      const stmt = db.prepare(
        `INSERT INTO gps_points (id,name,description,latitude,longitude,source,created_at,updated_at,nutzflaeche_qm,kind)
         VALUES (?,?,?,?,?,?,?,?,?,?)`
      );
      for (const p of gpsPoints) {
        stmt.bind([
          String(p.id), String(p.name ?? ""), p.description ?? null,
          Number(p.latitude), Number(p.longitude), p.source ?? null,
          p.created_at || now, p.updated_at || now,
          p.nutzflaeche_qm != null ? Number(p.nutzflaeche_qm) : null,
          p.kind ?? null,
        ]);
        stmt.step();
        stmt.reset();
      }
      stmt.finalize();
      db.exec("COMMIT");
      result.gpsPoints = gpsPoints.length;
    } catch (e) {
      db.exec("ROLLBACK");
      throw e;
    }
  }

  const km = Array.isArray(payload.kulturMittel) ? payload.kulturMittel : [];
  if (km.length && (db.selectValue("SELECT COUNT(*) FROM kultur_mittel") || 0) === 0) {
    db.exec("BEGIN TRANSACTION");
    try {
      const stmt = db.prepare(
        `INSERT INTO kultur_mittel (id,kultur,anbau,problem,mittel_name,kennr,wirkstoff,eppo_code,bbch_default,bbch,wartezeit,aufwand_wert,aufwand_einheit,aufwand_bezug,max_anwendungen,bemerkung,ist_psm,ist_kupfer,sort_order,created_at,updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
      );
      for (const r of km) {
        stmt.bind([
          String(r.id), String(r.kultur ?? ""), r.anbau ?? null, r.problem ?? null,
          String(r.mittel_name ?? ""), r.kennr ?? null, r.wirkstoff ?? null,
          r.eppo_code ?? null, r.bbch_default ?? null, r.bbch ?? null,
          r.wartezeit ?? null, r.aufwand_wert ?? null, r.aufwand_einheit ?? null,
          r.aufwand_bezug ?? null, r.max_anwendungen ?? null, r.bemerkung ?? null,
          r.ist_psm != null ? Number(r.ist_psm) : 1,
          r.ist_kupfer != null ? Number(r.ist_kupfer) : 0,
          r.sort_order != null ? Number(r.sort_order) : 0,
          r.created_at || now, r.updated_at || now,
        ]);
        stmt.step();
        stmt.reset();
      }
      stmt.finalize();
      db.exec("COMMIT");
      result.kulturMittel = km.length;
    } catch (e) {
      db.exec("ROLLBACK");
      throw e;
    }
  }

  return result;
}

/**
 * Eindeutige Mittel-Stammdaten aus den Kultur→Mittel-Daten (PDF-Import) –
 * für die Auswahl im Mittel-Lager (Name + Zulassungsnr. + Wirkstoff + Einheit).
 */
async function listMittelStammdaten() {
  if (!db) throw new Error("Database not initialized");
  ensureKulturMittelTable();
  const rows = [];
  db.exec({
    sql: `SELECT mittel_name, kennr, MAX(wirkstoff) AS wirkstoff,
            (SELECT k2.aufwand_einheit FROM kultur_mittel k2
               WHERE k2.mittel_name = k.mittel_name
                 AND IFNULL(k2.kennr,'') = IFNULL(k.kennr,'')
                 AND k2.aufwand_einheit IS NOT NULL AND k2.aufwand_einheit <> ''
               GROUP BY k2.aufwand_einheit ORDER BY COUNT(*) DESC LIMIT 1) AS einheit
          FROM kultur_mittel k
          GROUP BY mittel_name, kennr
          ORDER BY mittel_name COLLATE NOCASE`,
    rowMode: "object",
    callback: (row) => {
      rows.push({
        name: row.mittel_name != null ? String(row.mittel_name) : "",
        kennr: row.kennr ?? null,
        wirkstoff: row.wirkstoff ?? null,
        einheit: row.einheit ?? null,
      });
    },
  });
  return { rows };
}

// ============================================
// Acker-Planer (Freiland-Flächen) Functions
// ============================================

function ensureAckerTable(targetDb = db) {
  if (!targetDb) return;
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS ackerflaechen (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      kultur TEXT,
      eppo_code TEXT,
      standort_id TEXT,
      color TEXT,
      geojson TEXT,
      area_qm REAL,
      bed_w REAL,
      path_w REAL,
      row_sp REAL,
      in_row_sp REAL,
      angle REAL,
      beds INTEGER,
      bed_meters REAL,
      plants INTEGER,
      bemerkung TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_ackerflaechen_name ON ackerflaechen(name COLLATE NOCASE);
  `);
}

function mapAckerRow(row) {
  if (!row) return null;
  let latlngs = [];
  try {
    latlngs = row.geojson ? JSON.parse(row.geojson) : [];
  } catch {
    latlngs = [];
  }
  return {
    id: String(row.id),
    name: row.name != null ? String(row.name) : "",
    kultur: row.kultur ?? null,
    eppoCode: row.eppo_code ?? null,
    standortId: row.standort_id ?? null,
    color: row.color ?? null,
    latlngs,
    areaQm: row.area_qm != null ? Number(row.area_qm) : 0,
    bedW: row.bed_w != null ? Number(row.bed_w) : null,
    pathW: row.path_w != null ? Number(row.path_w) : null,
    rowSp: row.row_sp != null ? Number(row.row_sp) : null,
    inRowSp: row.in_row_sp != null ? Number(row.in_row_sp) : null,
    angle: row.angle != null ? Number(row.angle) : 0,
    beds: row.beds != null ? Number(row.beds) : 0,
    bedMeters: row.bed_meters != null ? Number(row.bed_meters) : 0,
    plants: row.plants != null ? Number(row.plants) : 0,
    bemerkung: row.bemerkung ?? null,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

async function listAckerflaechen() {
  if (!db) throw new Error("Database not initialized");
  ensureAckerTable();
  const rows = [];
  db.exec({
    sql: `SELECT * FROM ackerflaechen ORDER BY datetime(created_at) ASC`,
    rowMode: "object",
    callback: (row) => rows.push(mapAckerRow(row)),
  });
  return { rows };
}

async function upsertAckerflaeche(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureAckerTable();
  const id = String(payload.id || generateKulturMittelId());
  const name = String(payload.name ?? "").trim() || "Fläche";
  const now = new Date().toISOString();
  const geojson = JSON.stringify(
    Array.isArray(payload.latlngs) ? payload.latlngs : []
  );
  const num = (x) => (x != null && Number.isFinite(Number(x)) ? Number(x) : null);
  const v = [
    name,
    payload.kultur != null ? String(payload.kultur) : null,
    payload.eppoCode != null ? String(payload.eppoCode) : null,
    payload.standortId != null ? String(payload.standortId) : null,
    payload.color != null ? String(payload.color) : null,
    geojson,
    num(payload.areaQm),
    num(payload.bedW),
    num(payload.pathW),
    num(payload.rowSp),
    num(payload.inRowSp),
    num(payload.angle),
    num(payload.beds),
    num(payload.bedMeters),
    num(payload.plants),
    payload.bemerkung != null ? String(payload.bemerkung) : null,
  ];
  const exists = db.selectValue(
    "SELECT 1 FROM ackerflaechen WHERE id = ? LIMIT 1",
    [id]
  );
  if (exists) {
    const stmt = db.prepare(
      `UPDATE ackerflaechen SET name=?, kultur=?, eppo_code=?, standort_id=?, color=?, geojson=?, area_qm=?, bed_w=?, path_w=?, row_sp=?, in_row_sp=?, angle=?, beds=?, bed_meters=?, plants=?, bemerkung=?, updated_at=? WHERE id=?`
    );
    stmt.bind([...v, now, id]);
    stmt.step();
    stmt.finalize();
  } else {
    const stmt = db.prepare(
      `INSERT INTO ackerflaechen (name, kultur, eppo_code, standort_id, color, geojson, area_qm, bed_w, path_w, row_sp, in_row_sp, angle, beds, bed_meters, plants, bemerkung, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    );
    stmt.bind([...v, now, now, id]);
    stmt.step();
    stmt.finalize();
  }
  let record = null;
  db.exec({
    sql: "SELECT * FROM ackerflaechen WHERE id = ? LIMIT 1",
    bind: [id],
    rowMode: "object",
    callback: (row) => {
      if (!record) record = mapAckerRow(row);
    },
  });
  return record;
}

async function deleteAckerflaeche(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureAckerTable();
  const id = String(payload.id ?? "").trim();
  if (!id) throw new Error("ID fehlt.");
  const stmt = db.prepare("DELETE FROM ackerflaechen WHERE id = ?");
  stmt.bind([id]);
  stmt.step();
  stmt.finalize();
  return { success: true };
}

// ============================================
// Kulturführung (Anbau-Belegung + Maßnahmen) Functions
// ============================================
// Stabile, backend-taugliche Flächen-Referenz: (flaeche_typ, flaeche_id).
//   flaeche_typ = 'acker' -> ackerflaechen.id  (Freiland-Polygon)
//   flaeche_typ = 'haus'  -> gps_points.id     (Gewächshaus-Standort)
// Bewusst KEINE SQL-Fremdschlüssel (polymorphe Referenz); referenzielle
// Integrität liegt in der App. Tabellenname 'anbau_kultur' (nicht 'anbau'),
// um Verwechslung mit der Spalte kultur_mittel.anbau zu vermeiden. Ein
// künftiges Backend kann diese Tabellen 1:1 als REST-Ressourcen spiegeln.

function ensureAnbauTable(targetDb = db) {
  if (!targetDb) return;
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS anbau_kultur (
      id TEXT PRIMARY KEY,
      flaeche_typ TEXT NOT NULL,
      flaeche_id TEXT NOT NULL,
      kultur TEXT,
      eppo_code TEXT,
      status TEXT NOT NULL DEFAULT 'geplant',
      pflanz_datum TEXT,
      ernte_datum TEXT,
      ernte_von TEXT,
      ernte_bis TEXT,
      color TEXT,
      notes TEXT,
      aussaat_datum TEXT,
      kultur_stamm_id TEXT,
      menge REAL,
      einheit TEXT,
      satz_gruppe TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_anbau_unit ON anbau_kultur(flaeche_typ, flaeche_id);
    CREATE INDEX IF NOT EXISTS idx_anbau_status ON anbau_kultur(status);
    CREATE INDEX IF NOT EXISTS idx_anbau_pflanz ON anbau_kultur(pflanz_datum);
  `);
  // Index auf satz_gruppe NICHT hier – die Spalte wird bei bestehenden DBs erst
  // in Migration v25 per ALTER ergänzt; der Index wird dort danach angelegt.
}

// Kultur-Stammdaten: Bibliothek anbaubarer Kulturen mit gärtnerischen Kennwerten
// (Familie für Fruchtfolge, Kulturdauer/Anzucht-Vorlauf für automatische Termine,
// Abstände, biodynamischer Typ nach Maria Thun). Quelle der automatischen
// Aussaat-/Pflanz-/Ernte-Terminberechnung im Satz-Editor.
function ensureKulturStammTable(targetDb = db) {
  if (!targetDb) return;
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS kultur_stamm (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      familie TEXT,
      anbau_methode TEXT,
      anzucht_tage INTEGER,
      kultur_tage INTEGER,
      ernte_tage INTEGER,
      reihen_abstand_cm INTEGER,
      pflanz_abstand_cm INTEGER,
      bio_typ TEXT,
      color TEXT,
      eppo_code TEXT,
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_kultur_stamm_name ON kultur_stamm(name);
  `);
}

// Startbibliothek für eine deutsche (Demeter-)Marktgärtnerei. Werte sind
// praxisnahe Richtwerte (Tage = Kulturdauer ab Pflanzung/Saat bis Erntebeginn;
// anzucht = Tage Aussaat→pflanzbereit; ernte = Länge des Erntefensters).
// Spalten: [name, familie, methode, anzuchtTage, kulturTage, ernteTage,
//           reiheCm, pflanzCm, bioTyp, color]
const KULTUR_STAMM_SEED = [
  ["Tomate", "Nachtschatten", "anzucht", 42, 60, 90, 60, 50, "frucht", "#dc2626"],
  ["Gurke", "Kürbisgewächse", "anzucht", 28, 55, 70, 100, 50, "frucht", "#16a34a"],
  ["Zucchini", "Kürbisgewächse", "anzucht", 21, 50, 70, 100, 90, "frucht", "#65a30d"],
  ["Paprika", "Nachtschatten", "anzucht", 56, 70, 80, 50, 40, "frucht", "#ea580c"],
  ["Aubergine", "Nachtschatten", "anzucht", 56, 75, 70, 60, 50, "frucht", "#7c3aed"],
  ["Kürbis (Hokkaido)", "Kürbisgewächse", "anzucht", 21, 100, 30, 150, 100, "frucht", "#ea580c"],
  ["Butternut-Kürbis", "Kürbisgewächse", "anzucht", 21, 110, 30, 150, 100, "frucht", "#f59e0b"],
  ["Zuckermais", "Süßgräser", "anzucht", 21, 80, 14, 60, 30, "frucht", "#facc15"],
  ["Buschbohne", "Hülsenfrüchte", "direkt", 0, 60, 30, 40, 8, "frucht", "#16a34a"],
  ["Stangenbohne", "Hülsenfrüchte", "direkt", 0, 70, 50, 80, 15, "frucht", "#15803d"],
  ["Erbse", "Hülsenfrüchte", "direkt", 0, 65, 25, 40, 5, "frucht", "#65a30d"],
  ["Kopfsalat", "Korbblütler", "anzucht", 28, 55, 14, 30, 30, "blatt", "#84cc16"],
  ["Pflücksalat", "Korbblütler", "direkt", 0, 35, 21, 20, 10, "blatt", "#22c55e"],
  ["Feldsalat", "Baldriangewächse", "direkt", 0, 60, 21, 10, 5, "blatt", "#15803d"],
  ["Spinat", "Gänsefußgewächse", "direkt", 0, 45, 21, 20, 5, "blatt", "#166534"],
  ["Mangold", "Gänsefußgewächse", "anzucht", 28, 55, 60, 35, 30, "blatt", "#0d9488"],
  ["Rucola", "Kreuzblütler", "direkt", 0, 35, 21, 15, 5, "blatt", "#4ade80"],
  ["Endivie", "Korbblütler", "anzucht", 35, 70, 21, 35, 30, "blatt", "#84cc16"],
  ["Radicchio", "Korbblütler", "anzucht", 35, 80, 21, 35, 30, "blatt", "#be123c"],
  ["Rote Bete", "Gänsefußgewächse", "direkt", 0, 90, 30, 25, 8, "wurzel", "#be123c"],
  ["Möhre", "Doldenblütler", "direkt", 0, 100, 30, 25, 4, "wurzel", "#f97316"],
  ["Pastinake", "Doldenblütler", "direkt", 0, 120, 40, 30, 8, "wurzel", "#fbbf24"],
  ["Knollensellerie", "Doldenblütler", "anzucht", 56, 120, 30, 40, 35, "wurzel", "#14b8a6"],
  ["Fenchel", "Doldenblütler", "anzucht", 35, 70, 21, 35, 30, "blatt", "#a3e635"],
  ["Petersilie", "Doldenblütler", "direkt", 0, 80, 90, 25, 8, "blatt", "#16a34a"],
  ["Dill", "Doldenblütler", "direkt", 0, 50, 30, 20, 5, "blatt", "#65a30d"],
  ["Zwiebel", "Lauchgewächse", "anzucht", 49, 110, 21, 25, 10, "wurzel", "#f59e0b"],
  ["Lauch / Porree", "Lauchgewächse", "anzucht", 56, 120, 60, 35, 12, "blatt", "#4d7c0f"],
  ["Knoblauch", "Lauchgewächse", "direkt", 0, 240, 21, 25, 12, "wurzel", "#d97706"],
  ["Brokkoli", "Kreuzblütler", "anzucht", 35, 70, 21, 45, 40, "bluete", "#0891b2"],
  ["Blumenkohl", "Kreuzblütler", "anzucht", 35, 75, 14, 50, 45, "bluete", "#0ea5e9"],
  ["Weißkohl", "Kreuzblütler", "anzucht", 35, 100, 30, 50, 45, "blatt", "#22c55e"],
  ["Rotkohl", "Kreuzblütler", "anzucht", 35, 110, 30, 50, 45, "blatt", "#9333ea"],
  ["Wirsing", "Kreuzblütler", "anzucht", 35, 90, 30, 50, 45, "blatt", "#16a34a"],
  ["Grünkohl", "Kreuzblütler", "anzucht", 35, 90, 60, 45, 45, "blatt", "#166534"],
  ["Kohlrabi", "Kreuzblütler", "anzucht", 28, 55, 21, 30, 25, "blatt", "#8b5cf6"],
  ["Radieschen", "Kreuzblütler", "direkt", 0, 28, 14, 12, 4, "wurzel", "#ef4444"],
  ["Rettich", "Kreuzblütler", "direkt", 0, 60, 21, 20, 8, "wurzel", "#f43f5e"],
  ["Kartoffel", "Nachtschatten", "direkt", 0, 100, 30, 70, 33, "wurzel", "#a16207"],
  ["Schwarzwurzel", "Korbblütler", "direkt", 0, 180, 40, 30, 6, "wurzel", "#57534e"],
  ["Basilikum", "Lippenblütler", "anzucht", 28, 50, 60, 25, 20, "blatt", "#22c55e"],
];

function seedKulturStammIfEmpty(targetDb = db) {
  if (!targetDb) return;
  const count = targetDb.selectValue("SELECT COUNT(*) FROM kultur_stamm") || 0;
  if (count > 0) return;
  const now = new Date().toISOString();
  const stmt = targetDb.prepare(
    "INSERT INTO kultur_stamm (id, name, familie, anbau_methode, anzucht_tage, kultur_tage, ernte_tage, reihen_abstand_cm, pflanz_abstand_cm, bio_typ, color, eppo_code, notes, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  );
  try {
    KULTUR_STAMM_SEED.forEach((r, i) => {
      stmt.bind([
        "ks-" + String(i + 1).padStart(3, "0"),
        r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9],
        null, null, now, now,
      ]);
      stmt.step();
      stmt.reset();
    });
  } finally {
    stmt.finalize();
  }
}

function ensureMassnahmeTable(targetDb = db) {
  if (!targetDb) return;
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS massnahme (
      id TEXT PRIMARY KEY,
      flaeche_typ TEXT NOT NULL,
      flaeche_id TEXT NOT NULL,
      anbau_id TEXT,
      art TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'geplant',
      plan_datum TEXT,
      erledigt_datum TEXT,
      menge REAL,
      einheit TEXT,
      mittel TEXT,
      history_id INTEGER,
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_massnahme_unit ON massnahme(flaeche_typ, flaeche_id);
    CREATE INDEX IF NOT EXISTS idx_massnahme_anbau ON massnahme(anbau_id);
    CREATE INDEX IF NOT EXISTS idx_massnahme_art ON massnahme(art, status);
    CREATE INDEX IF NOT EXISTS idx_massnahme_plan ON massnahme(plan_datum);
    CREATE INDEX IF NOT EXISTS idx_massnahme_history ON massnahme(history_id);
  `);
}

function mapAnbauRow(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    flaecheTyp: row.flaeche_typ ?? null,
    flaecheId: row.flaeche_id != null ? String(row.flaeche_id) : null,
    kultur: row.kultur ?? null,
    eppoCode: row.eppo_code ?? null,
    status: row.status ?? "geplant",
    pflanzDatum: row.pflanz_datum ?? null,
    ernteDatum: row.ernte_datum ?? null,
    ernteVon: row.ernte_von ?? null,
    ernteBis: row.ernte_bis ?? row.ernte_datum ?? null,
    color: row.color ?? null,
    notes: row.notes ?? null,
    aussaatDatum: row.aussaat_datum ?? null,
    kulturStammId: row.kultur_stamm_id ?? null,
    menge: row.menge != null ? Number(row.menge) : null,
    einheit: row.einheit ?? null,
    satzGruppe: row.satz_gruppe ?? null,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

function mapKulturStammRow(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name ?? "",
    familie: row.familie ?? null,
    anbauMethode: row.anbau_methode ?? null,
    anzuchtTage: row.anzucht_tage != null ? Number(row.anzucht_tage) : null,
    kulturTage: row.kultur_tage != null ? Number(row.kultur_tage) : null,
    ernteTage: row.ernte_tage != null ? Number(row.ernte_tage) : null,
    reihenAbstandCm: row.reihen_abstand_cm != null ? Number(row.reihen_abstand_cm) : null,
    pflanzAbstandCm: row.pflanz_abstand_cm != null ? Number(row.pflanz_abstand_cm) : null,
    bioTyp: row.bio_typ ?? null,
    color: row.color ?? null,
    eppoCode: row.eppo_code ?? null,
    notes: row.notes ?? null,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

function mapMassnahmeRow(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    flaecheTyp: row.flaeche_typ ?? null,
    flaecheId: row.flaeche_id != null ? String(row.flaeche_id) : null,
    anbauId: row.anbau_id ?? null,
    art: row.art ?? "sonstiges",
    status: row.status ?? "geplant",
    planDatum: row.plan_datum ?? null,
    erledigtDatum: row.erledigt_datum ?? null,
    menge: row.menge != null ? Number(row.menge) : null,
    einheit: row.einheit ?? null,
    mittel: row.mittel ?? null,
    historyId: row.history_id != null ? Number(row.history_id) : null,
    notes: row.notes ?? null,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

async function listAnbau(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureAnbauTable();
  const where = [];
  const bind = [];
  if (payload.flaecheTyp) { where.push("flaeche_typ = ?"); bind.push(String(payload.flaecheTyp)); }
  if (payload.flaecheId) { where.push("flaeche_id = ?"); bind.push(String(payload.flaecheId)); }
  if (payload.status) { where.push("status = ?"); bind.push(String(payload.status)); }
  const sql =
    "SELECT * FROM anbau_kultur" +
    (where.length ? " WHERE " + where.join(" AND ") : "") +
    " ORDER BY COALESCE(pflanz_datum, created_at) ASC";
  const rows = [];
  db.exec({ sql, bind, rowMode: "object", callback: (row) => rows.push(mapAnbauRow(row)) });
  return { rows };
}

async function upsertAnbau(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureAnbauTable();
  const id = String(payload.id || generateKulturMittelId());
  const now = new Date().toISOString();
  const v = [
    String(payload.flaecheTyp || ""),
    String(payload.flaecheId || ""),
    payload.kultur != null ? String(payload.kultur) : null,
    payload.eppoCode != null ? String(payload.eppoCode) : null,
    String(payload.status || "geplant"),
    payload.pflanzDatum != null ? String(payload.pflanzDatum) : null,
    payload.ernteDatum != null ? String(payload.ernteDatum) : null,
    payload.ernteVon != null ? String(payload.ernteVon) : null,
    payload.ernteBis != null ? String(payload.ernteBis) : null,
    payload.color != null ? String(payload.color) : null,
    payload.notes != null ? String(payload.notes) : null,
    payload.aussaatDatum != null ? String(payload.aussaatDatum) : null,
    payload.kulturStammId != null ? String(payload.kulturStammId) : null,
    payload.menge != null && payload.menge !== "" ? Number(payload.menge) : null,
    payload.einheit != null ? String(payload.einheit) : null,
    payload.satzGruppe != null ? String(payload.satzGruppe) : null,
  ];
  const exists = db.selectValue("SELECT 1 FROM anbau_kultur WHERE id = ? LIMIT 1", [id]);
  if (exists) {
    const stmt = db.prepare(
      "UPDATE anbau_kultur SET flaeche_typ=?, flaeche_id=?, kultur=?, eppo_code=?, status=?, pflanz_datum=?, ernte_datum=?, ernte_von=?, ernte_bis=?, color=?, notes=?, aussaat_datum=?, kultur_stamm_id=?, menge=?, einheit=?, satz_gruppe=?, updated_at=? WHERE id=?"
    );
    stmt.bind([...v, now, id]); stmt.step(); stmt.finalize();
  } else {
    const stmt = db.prepare(
      "INSERT INTO anbau_kultur (flaeche_typ, flaeche_id, kultur, eppo_code, status, pflanz_datum, ernte_datum, ernte_von, ernte_bis, color, notes, aussaat_datum, kultur_stamm_id, menge, einheit, satz_gruppe, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    );
    stmt.bind([...v, now, now, id]); stmt.step(); stmt.finalize();
  }
  let record = null;
  db.exec({ sql: "SELECT * FROM anbau_kultur WHERE id = ? LIMIT 1", bind: [id], rowMode: "object", callback: (row) => { if (!record) record = mapAnbauRow(row); } });
  return record;
}

async function deleteAnbau(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureAnbauTable();
  ensureMassnahmeTable();
  const id = String(payload.id ?? "").trim();
  if (!id) throw new Error("ID fehlt.");
  // Maßnahmen bleiben erhalten, werden aber vom gelöschten Anbau entkoppelt.
  const upd = db.prepare("UPDATE massnahme SET anbau_id = NULL WHERE anbau_id = ?");
  upd.bind([id]); upd.step(); upd.finalize();
  const stmt = db.prepare("DELETE FROM anbau_kultur WHERE id = ?");
  stmt.bind([id]); stmt.step(); stmt.finalize();
  return { success: true };
}

// ---- Kultur-Stammdaten (Bibliothek) -------------------------------------
async function listKulturStamm() {
  if (!db) throw new Error("Database not initialized");
  ensureKulturStammTable();
  seedKulturStammIfEmpty();
  const rows = [];
  db.exec({
    sql: "SELECT * FROM kultur_stamm ORDER BY name COLLATE NOCASE ASC",
    rowMode: "object",
    callback: (row) => rows.push(mapKulturStammRow(row)),
  });
  return { rows };
}

async function upsertKulturStamm(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureKulturStammTable();
  const id = String(payload.id || generateKulturMittelId());
  const now = new Date().toISOString();
  const intOrNull = (x) => (x != null && x !== "" && Number.isFinite(Number(x)) ? Math.round(Number(x)) : null);
  const v = [
    String(payload.name || "").trim(),
    payload.familie != null ? String(payload.familie) : null,
    payload.anbauMethode != null ? String(payload.anbauMethode) : null,
    intOrNull(payload.anzuchtTage),
    intOrNull(payload.kulturTage),
    intOrNull(payload.ernteTage),
    intOrNull(payload.reihenAbstandCm),
    intOrNull(payload.pflanzAbstandCm),
    payload.bioTyp != null ? String(payload.bioTyp) : null,
    payload.color != null ? String(payload.color) : null,
    payload.eppoCode != null ? String(payload.eppoCode) : null,
    payload.notes != null ? String(payload.notes) : null,
  ];
  const exists = db.selectValue("SELECT 1 FROM kultur_stamm WHERE id = ? LIMIT 1", [id]);
  if (exists) {
    const stmt = db.prepare(
      "UPDATE kultur_stamm SET name=?, familie=?, anbau_methode=?, anzucht_tage=?, kultur_tage=?, ernte_tage=?, reihen_abstand_cm=?, pflanz_abstand_cm=?, bio_typ=?, color=?, eppo_code=?, notes=?, updated_at=? WHERE id=?"
    );
    stmt.bind([...v, now, id]); stmt.step(); stmt.finalize();
  } else {
    const stmt = db.prepare(
      "INSERT INTO kultur_stamm (name, familie, anbau_methode, anzucht_tage, kultur_tage, ernte_tage, reihen_abstand_cm, pflanz_abstand_cm, bio_typ, color, eppo_code, notes, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    );
    stmt.bind([...v, now, now, id]); stmt.step(); stmt.finalize();
  }
  let record = null;
  db.exec({ sql: "SELECT * FROM kultur_stamm WHERE id = ? LIMIT 1", bind: [id], rowMode: "object", callback: (row) => { if (!record) record = mapKulturStammRow(row); } });
  return record;
}

async function deleteKulturStamm(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureKulturStammTable();
  const id = String(payload.id ?? "").trim();
  if (!id) throw new Error("ID fehlt.");
  const stmt = db.prepare("DELETE FROM kultur_stamm WHERE id = ?");
  stmt.bind([id]); stmt.step(); stmt.finalize();
  return { success: true };
}

async function listMassnahmen(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureMassnahmeTable();
  const where = [];
  const bind = [];
  if (payload.flaecheTyp) { where.push("flaeche_typ = ?"); bind.push(String(payload.flaecheTyp)); }
  if (payload.flaecheId) { where.push("flaeche_id = ?"); bind.push(String(payload.flaecheId)); }
  if (payload.anbauId) { where.push("anbau_id = ?"); bind.push(String(payload.anbauId)); }
  if (payload.art) { where.push("art = ?"); bind.push(String(payload.art)); }
  if (payload.status) { where.push("status = ?"); bind.push(String(payload.status)); }
  if (payload.from) { where.push("COALESCE(plan_datum, erledigt_datum) >= ?"); bind.push(String(payload.from)); }
  if (payload.to) { where.push("COALESCE(plan_datum, erledigt_datum) <= ?"); bind.push(String(payload.to)); }
  const sql =
    "SELECT * FROM massnahme" +
    (where.length ? " WHERE " + where.join(" AND ") : "") +
    " ORDER BY COALESCE(plan_datum, erledigt_datum, created_at) ASC";
  const rows = [];
  db.exec({ sql, bind, rowMode: "object", callback: (row) => rows.push(mapMassnahmeRow(row)) });
  return { rows };
}

async function upsertMassnahme(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureMassnahmeTable();
  const id = String(payload.id || generateKulturMittelId());
  const now = new Date().toISOString();
  const num = (x) => (x != null && Number.isFinite(Number(x)) ? Number(x) : null);
  const v = [
    String(payload.flaecheTyp || ""),
    String(payload.flaecheId || ""),
    payload.anbauId != null ? String(payload.anbauId) : null,
    String(payload.art || "sonstiges"),
    String(payload.status || "geplant"),
    payload.planDatum != null ? String(payload.planDatum) : null,
    payload.erledigtDatum != null ? String(payload.erledigtDatum) : null,
    num(payload.menge),
    payload.einheit != null ? String(payload.einheit) : null,
    payload.mittel != null ? String(payload.mittel) : null,
    num(payload.historyId),
    payload.notes != null ? String(payload.notes) : null,
  ];
  const exists = db.selectValue("SELECT 1 FROM massnahme WHERE id = ? LIMIT 1", [id]);
  if (exists) {
    const stmt = db.prepare(
      "UPDATE massnahme SET flaeche_typ=?, flaeche_id=?, anbau_id=?, art=?, status=?, plan_datum=?, erledigt_datum=?, menge=?, einheit=?, mittel=?, history_id=?, notes=?, updated_at=? WHERE id=?"
    );
    stmt.bind([...v, now, id]); stmt.step(); stmt.finalize();
  } else {
    const stmt = db.prepare(
      "INSERT INTO massnahme (flaeche_typ, flaeche_id, anbau_id, art, status, plan_datum, erledigt_datum, menge, einheit, mittel, history_id, notes, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    );
    stmt.bind([...v, now, now, id]); stmt.step(); stmt.finalize();
  }
  let record = null;
  db.exec({ sql: "SELECT * FROM massnahme WHERE id = ? LIMIT 1", bind: [id], rowMode: "object", callback: (row) => { if (!record) record = mapMassnahmeRow(row); } });
  return record;
}

async function deleteMassnahme(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureMassnahmeTable();
  const id = String(payload.id ?? "").trim();
  if (!id) throw new Error("ID fehlt.");
  const stmt = db.prepare("DELETE FROM massnahme WHERE id = ?");
  stmt.bind([id]); stmt.step(); stmt.finalize();
  return { success: true };
}

// Übernimmt bestehende Pflanzenschutz-Einträge (history) als erledigte
// Maßnahmen (art='chemisch_psm') in die Kulturführung – ohne Duplizierung
// (Verknüpfung über history_id). Konservatives, eindeutiges Matching:
//   - history.gps_point_id == Gewächshaus-Standort  -> typ 'haus'
//   - genau EINE ackerflaeche mit standort_id == gps_point_id -> typ 'acker'
//   - sonst übersprungen (bleibt in der PSM-Historie sichtbar).
async function importPsmAsMassnahmen() {
  if (!db) throw new Error("Database not initialized");
  ensureMassnahmeTable();
  const have = new Set();
  db.exec({
    sql: "SELECT DISTINCT history_id AS h FROM massnahme WHERE history_id IS NOT NULL",
    rowMode: "object",
    callback: (r) => { if (r.h != null) have.add(Number(r.h)); },
  });
  const houseIds = new Set();
  try {
    db.exec({
      sql: "SELECT id FROM gps_points WHERE kind = 'gewaechshaus'",
      rowMode: "object",
      callback: (r) => houseIds.add(String(r.id)),
    });
  } catch {}
  const fieldByStandort = new Map();
  try {
    db.exec({
      sql: "SELECT id, standort_id FROM ackerflaechen WHERE standort_id IS NOT NULL",
      rowMode: "object",
      callback: (r) => {
        const k = String(r.standort_id);
        if (!fieldByStandort.has(k)) fieldByStandort.set(k, []);
        fieldByStandort.get(k).push(String(r.id));
      },
    });
  } catch {}
  const rows = [];
  try {
    db.exec({
      sql: "SELECT id, date_iso, kultur, gps_point_id FROM history WHERE gps_point_id IS NOT NULL ORDER BY id ASC",
      rowMode: "object",
      callback: (r) => rows.push(r),
    });
  } catch {
    return { imported: 0, skipped: 0, total: 0 };
  }
  let imported = 0, skipped = 0;
  const now = new Date().toISOString();
  for (const r of rows) {
    const hid = Number(r.id);
    if (have.has(hid)) continue;
    const gp = r.gps_point_id != null ? String(r.gps_point_id) : "";
    let typ = null, fid = null;
    if (gp && houseIds.has(gp)) { typ = "haus"; fid = gp; }
    else if (gp && fieldByStandort.has(gp) && fieldByStandort.get(gp).length === 1) {
      typ = "acker"; fid = fieldByStandort.get(gp)[0];
    }
    if (!typ) { skipped++; continue; }
    const id = generateKulturMittelId();
    const stmt = db.prepare(
      "INSERT INTO massnahme (flaeche_typ, flaeche_id, anbau_id, art, status, plan_datum, erledigt_datum, menge, einheit, mittel, history_id, notes, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    );
    stmt.bind([typ, fid, null, "chemisch_psm", "erledigt", null, r.date_iso || null, null, null, null, hid, r.kultur != null ? String(r.kultur) : null, now, now, id]);
    stmt.step(); stmt.finalize();
    have.add(hid); imported++;
  }
  return { imported, skipped, total: rows.length };
}

// ============================================
// Mittel-Lager (Bestand / Verbrauch) Functions
// ============================================

function ensureLagerTable(targetDb = db) {
  if (!targetDb) return;
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS lager_bewegungen (
      id TEXT PRIMARY KEY,
      kennr TEXT,
      mittel_name TEXT NOT NULL,
      wirkstoff TEXT,
      typ TEXT NOT NULL DEFAULT 'zugang',
      menge REAL NOT NULL,
      einheit TEXT,
      datum TEXT,
      charge TEXT,
      ablauf TEXT,
      lieferant TEXT,
      preis REAL,
      bemerkung TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_lager_kennr ON lager_bewegungen(kennr);
    CREATE INDEX IF NOT EXISTS idx_lager_datum ON lager_bewegungen(datum DESC);
  `);
}

// Import-Historie: protokolliert jeden Daten-Import (z. B. Mobil-Pakete via
// WhatsApp), damit am PC nachvollziehbar ist, WANN WAS von WEM eingespielt wurde.
function ensureImportLogTable(targetDb = db) {
  if (!targetDb) return;
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS import_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      imported_at TEXT NOT NULL,
      source TEXT,
      device TEXT,
      added INTEGER NOT NULL DEFAULT 0,
      skipped INTEGER NOT NULL DEFAULT 0,
      range_start TEXT,
      range_end TEXT,
      note TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_import_log_imported_at ON import_log(imported_at DESC);
  `);
}

// Fotos (Nachweis/allgemein): komprimiertes Bild als base64 (TEXT) + Metadaten.
// Generisch nutzbar (nicht nur Kulturen). client_uuid = stabiler Ausweis für
// Merge/Dedup (Handy -> zentrale DB).
function ensureFotosTable(targetDb = db) {
  if (!targetDb) return;
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS fotos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_uuid TEXT,
      created_at TEXT NOT NULL,
      entry_uuid TEXT,
      kategorie TEXT,
      titel TEXT,
      standort TEXT,
      kultur TEXT,
      gps_latitude REAL,
      gps_longitude REAL,
      notiz TEXT,
      device TEXT,
      mime TEXT,
      width INTEGER,
      height INTEGER,
      bytes INTEGER,
      data TEXT NOT NULL,
      data_thumb TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_fotos_created ON fotos(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_fotos_uuid ON fotos(client_uuid);
    CREATE INDEX IF NOT EXISTS idx_fotos_kategorie ON fotos(kategorie, created_at DESC);
  `);
}

function mapLagerRow(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    kennr: row.kennr ?? null,
    mittelName: row.mittel_name != null ? String(row.mittel_name) : "",
    wirkstoff: row.wirkstoff ?? null,
    typ: row.typ || "zugang",
    menge: row.menge != null ? Number(row.menge) : 0,
    einheit: row.einheit ?? null,
    datum: row.datum ?? null,
    charge: row.charge ?? null,
    ablauf: row.ablauf ?? null,
    lieferant: row.lieferant ?? null,
    preis: row.preis != null ? Number(row.preis) : null,
    bemerkung: row.bemerkung ?? null,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

async function listLagerBewegungen(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureLagerTable();
  const kennr = payload && payload.kennr != null ? String(payload.kennr) : null;
  const rows = [];
  db.exec({
    sql: `SELECT * FROM lager_bewegungen ${kennr ? "WHERE kennr = ?" : ""}
          ORDER BY datetime(COALESCE(datum, created_at)) DESC, created_at DESC`,
    bind: kennr ? [kennr] : [],
    rowMode: "object",
    callback: (row) => rows.push(mapLagerRow(row)),
  });
  return { rows };
}

async function upsertLagerBewegung(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureLagerTable();
  const id = String(payload.id || generateKulturMittelId());
  const mittelName = String(payload.mittelName ?? payload.mittel_name ?? "").trim();
  if (!mittelName) throw new Error("Mittelname ist erforderlich.");
  const menge = Number(payload.menge);
  if (!Number.isFinite(menge)) throw new Error("Menge ist ungültig.");
  const now = new Date().toISOString();
  const v = {
    kennr: payload.kennr != null ? String(payload.kennr) : null,
    wirkstoff: payload.wirkstoff != null ? String(payload.wirkstoff) : null,
    typ: payload.typ != null ? String(payload.typ) : "zugang",
    einheit: payload.einheit != null ? String(payload.einheit) : null,
    datum: payload.datum != null ? String(payload.datum) : now.slice(0, 10),
    charge: payload.charge != null ? String(payload.charge) : null,
    ablauf: payload.ablauf != null ? String(payload.ablauf) : null,
    lieferant: payload.lieferant != null ? String(payload.lieferant) : null,
    preis:
      payload.preis != null && Number.isFinite(Number(payload.preis))
        ? Number(payload.preis)
        : null,
    bemerkung: payload.bemerkung != null ? String(payload.bemerkung) : null,
  };
  const exists = db.selectValue(
    "SELECT 1 FROM lager_bewegungen WHERE id = ? LIMIT 1",
    [id]
  );
  if (exists) {
    const stmt = db.prepare(
      `UPDATE lager_bewegungen SET kennr=?, mittel_name=?, wirkstoff=?, typ=?, menge=?, einheit=?, datum=?, charge=?, ablauf=?, lieferant=?, preis=?, bemerkung=?, updated_at=? WHERE id=?`
    );
    stmt.bind([
      v.kennr, mittelName, v.wirkstoff, v.typ, menge, v.einheit, v.datum,
      v.charge, v.ablauf, v.lieferant, v.preis, v.bemerkung, now, id,
    ]);
    stmt.step();
    stmt.finalize();
  } else {
    const stmt = db.prepare(
      `INSERT INTO lager_bewegungen (id, kennr, mittel_name, wirkstoff, typ, menge, einheit, datum, charge, ablauf, lieferant, preis, bemerkung, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    );
    stmt.bind([
      id, v.kennr, mittelName, v.wirkstoff, v.typ, menge, v.einheit, v.datum,
      v.charge, v.ablauf, v.lieferant, v.preis, v.bemerkung, now, now,
    ]);
    stmt.step();
    stmt.finalize();
  }
  let record = null;
  db.exec({
    sql: "SELECT * FROM lager_bewegungen WHERE id = ? LIMIT 1",
    bind: [id],
    rowMode: "object",
    callback: (row) => {
      if (!record) record = mapLagerRow(row);
    },
  });
  return record;
}

async function deleteLagerBewegung(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureLagerTable();
  const id = String(payload.id ?? "").trim();
  if (!id) throw new Error("ID fehlt.");
  const stmt = db.prepare("DELETE FROM lager_bewegungen WHERE id = ?");
  stmt.bind([id]);
  stmt.step();
  stmt.finalize();
  return { success: true };
}

/**
 * Lager-Übersicht je Mittel: Zugänge (Ledger) − Verbrauch (Anwendungen aus
 * history_items) = Bestand.
 */
async function getLagerUebersicht() {
  if (!db) throw new Error("Database not initialized");
  ensureLagerTable();
  const map = new Map();
  const keyOf = (kennr, name) =>
    (kennr && String(kennr).trim()) || `name:${String(name || "").toLowerCase().trim()}`;
  const ensure = (kennr, name) => {
    const k = keyOf(kennr, name);
    if (!map.has(k)) {
      map.set(k, {
        kennr: kennr || null,
        name: name || "",
        einheit: null,
        wirkstoff: null,
        zugang: 0,
        verbraucht: 0,
        bestand: 0,
        zulEnde: null,
        naechsterAblauf: null,
        anwendungen: 0,
      });
    }
    return map.get(k);
  };

  // Zugänge / Korrekturen aus dem Ledger (signiert)
  db.exec({
    sql: `SELECT kennr, mittel_name, einheit, wirkstoff,
                 SUM(menge) AS zugang, MIN(NULLIF(ablauf,'')) AS naechster_ablauf
          FROM lager_bewegungen GROUP BY kennr, mittel_name`,
    rowMode: "object",
    callback: (row) => {
      const e = ensure(row.kennr, row.mittel_name);
      e.zugang += Number(row.zugang) || 0;
      if (row.einheit && !e.einheit) e.einheit = row.einheit;
      if (row.wirkstoff && !e.wirkstoff) e.wirkstoff = row.wirkstoff;
      if (row.naechster_ablauf) e.naechsterAblauf = row.naechster_ablauf;
    },
  });

  // Verbrauch aus den Anwendungen
  db.exec({
    sql: `SELECT zulassungsnummer AS kennr, medium_name, medium_unit, wirkstoff,
                 SUM(calculated_total) AS verbraucht, COUNT(*) AS n
          FROM history_items GROUP BY zulassungsnummer, medium_name`,
    rowMode: "object",
    callback: (row) => {
      const e = ensure(row.kennr, row.medium_name);
      e.verbraucht += Number(row.verbraucht) || 0;
      e.anwendungen += Number(row.n) || 0;
      if (row.medium_unit && !e.einheit) e.einheit = row.medium_unit;
      if (row.wirkstoff && !e.wirkstoff) e.wirkstoff = row.wirkstoff;
    },
  });

  const rows = Array.from(map.values());
  for (const e of rows) {
    e.bestand = e.zugang - e.verbraucht;
  }
  rows.sort((a, b) => (b.verbraucht || 0) - (a.verbraucht || 0));
  return { rows };
}

// ============================================
// Saved EPPO/BBCH Favorites Functions
// ============================================

function ensureSavedEppoTable(targetDb = db) {
  if (!targetDb) return;
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS saved_eppo_codes (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      language TEXT,
      dtcode TEXT,
      usage_count INTEGER NOT NULL DEFAULT 0,
      is_favorite INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_saved_eppo_code ON saved_eppo_codes(code);
    CREATE INDEX IF NOT EXISTS idx_saved_eppo_favorite ON saved_eppo_codes(is_favorite DESC, usage_count DESC);
    CREATE INDEX IF NOT EXISTS idx_saved_eppo_usage ON saved_eppo_codes(usage_count DESC);
  `);
}

function ensureSavedBbchTable(targetDb = db) {
  if (!targetDb) return;
  targetDb.exec(`
    CREATE TABLE IF NOT EXISTS saved_bbch_stages (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      label TEXT NOT NULL,
      principal_stage INTEGER,
      secondary_stage INTEGER,
      usage_count INTEGER NOT NULL DEFAULT 0,
      is_favorite INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_saved_bbch_code ON saved_bbch_stages(code);
    CREATE INDEX IF NOT EXISTS idx_saved_bbch_favorite ON saved_bbch_stages(is_favorite DESC, usage_count DESC);
    CREATE INDEX IF NOT EXISTS idx_saved_bbch_usage ON saved_bbch_stages(usage_count DESC);
  `);
}

function generateSavedId(prefix) {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

async function listSavedEppo(options = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureSavedEppoTable();

  const { favoritesOnly = false, limit = 100 } = options;
  const whereClause = favoritesOnly ? "WHERE is_favorite = 1" : "";

  const rows = [];
  db.exec({
    sql: `SELECT id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at
          FROM saved_eppo_codes
          ${whereClause}
          ORDER BY is_favorite DESC, usage_count DESC, name ASC
          LIMIT ?`,
    bind: [limit],
    rowMode: "object",
    callback: (row) =>
      rows.push({
        id: row.id,
        code: row.code,
        name: row.name,
        language: row.language,
        dtcode: row.dtcode,
        usageCount: row.usage_count,
        isFavorite: Boolean(row.is_favorite),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }),
  });
  return { items: rows };
}

async function upsertSavedEppo(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureSavedEppoTable();

  const code = String(payload.code ?? "").trim();
  const name = String(payload.name ?? "").trim();
  if (!code || !name) throw new Error("EPPO-Code und Name sind erforderlich.");

  const id = payload.id || generateSavedId("eppo");
  const language = payload.language || null;
  const dtcode = payload.dtcode || null;
  const isFavorite = payload.isFavorite ? 1 : 0;
  const now = new Date().toISOString();

  // Check if code already exists
  const existing = db.selectValue(
    "SELECT id FROM saved_eppo_codes WHERE code = ? LIMIT 1",
    [code]
  );

  if (existing) {
    // Update existing
    const stmt = db.prepare(`
      UPDATE saved_eppo_codes 
      SET name = ?, language = ?, dtcode = ?, is_favorite = ?, updated_at = ?
      WHERE code = ?
    `);
    stmt.bind([name, language, dtcode, isFavorite, now, code]);
    stmt.step();
    stmt.finalize();
    return { id: existing, code, name, updated: true };
  } else {
    // Insert new
    const stmt = db.prepare(`
      INSERT INTO saved_eppo_codes (id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)
    `);
    stmt.bind([id, code, name, language, dtcode, isFavorite, now, now]);
    stmt.step();
    stmt.finalize();
    return { id, code, name, created: true };
  }
}

async function deleteSavedEppo(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureSavedEppoTable();

  const id = String(payload.id ?? "").trim();
  if (!id) throw new Error("ID erforderlich.");

  const stmt = db.prepare("DELETE FROM saved_eppo_codes WHERE id = ?");
  stmt.bind([id]);
  stmt.step();
  stmt.finalize();
  return { success: true };
}

async function incrementEppoUsage(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureSavedEppoTable();

  const code = String(payload.code ?? "").trim();
  const name = String(payload.name ?? "").trim();
  if (!code) return { success: false };

  const now = new Date().toISOString();

  // Check if exists
  const existing = db.selectValue(
    "SELECT id FROM saved_eppo_codes WHERE code = ? LIMIT 1",
    [code]
  );

  if (existing) {
    // Increment usage
    const stmt = db.prepare(`
      UPDATE saved_eppo_codes SET usage_count = usage_count + 1, updated_at = ? WHERE code = ?
    `);
    stmt.bind([now, code]);
    stmt.step();
    stmt.finalize();
  } else if (name) {
    // Auto-create entry for frequently used codes
    const id = generateSavedId("eppo");
    const stmt = db.prepare(`
      INSERT INTO saved_eppo_codes (id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
    `);
    stmt.bind([
      id,
      code,
      name,
      payload.language || null,
      payload.dtcode || null,
      now,
      now,
    ]);
    stmt.step();
    stmt.finalize();
  }
  return { success: true };
}

async function listSavedBbch(options = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureSavedBbchTable();

  const { favoritesOnly = false, limit = 100 } = options;
  const whereClause = favoritesOnly ? "WHERE is_favorite = 1" : "";

  const rows = [];
  db.exec({
    sql: `SELECT id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at
          FROM saved_bbch_stages
          ${whereClause}
          ORDER BY is_favorite DESC, usage_count DESC, code ASC
          LIMIT ?`,
    bind: [limit],
    rowMode: "object",
    callback: (row) =>
      rows.push({
        id: row.id,
        code: row.code,
        label: row.label,
        principalStage: row.principal_stage,
        secondaryStage: row.secondary_stage,
        usageCount: row.usage_count,
        isFavorite: Boolean(row.is_favorite),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }),
  });
  return { items: rows };
}

async function upsertSavedBbch(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureSavedBbchTable();

  const code = String(payload.code ?? "").trim();
  const label = String(payload.label ?? "").trim();
  if (!code || !label)
    throw new Error("BBCH-Code und Bezeichnung sind erforderlich.");

  const id = payload.id || generateSavedId("bbch");
  const principalStage =
    payload.principalStage != null ? Number(payload.principalStage) : null;
  const secondaryStage =
    payload.secondaryStage != null ? Number(payload.secondaryStage) : null;
  const isFavorite = payload.isFavorite ? 1 : 0;
  const now = new Date().toISOString();

  // Check if code already exists
  const existing = db.selectValue(
    "SELECT id FROM saved_bbch_stages WHERE code = ? LIMIT 1",
    [code]
  );

  if (existing) {
    const stmt = db.prepare(`
      UPDATE saved_bbch_stages 
      SET label = ?, principal_stage = ?, secondary_stage = ?, is_favorite = ?, updated_at = ?
      WHERE code = ?
    `);
    stmt.bind([label, principalStage, secondaryStage, isFavorite, now, code]);
    stmt.step();
    stmt.finalize();
    return { id: existing, code, label, updated: true };
  } else {
    const stmt = db.prepare(`
      INSERT INTO saved_bbch_stages (id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)
    `);
    stmt.bind([
      id,
      code,
      label,
      principalStage,
      secondaryStage,
      isFavorite,
      now,
      now,
    ]);
    stmt.step();
    stmt.finalize();
    return { id, code, label, created: true };
  }
}

async function deleteSavedBbch(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureSavedBbchTable();

  const id = String(payload.id ?? "").trim();
  if (!id) throw new Error("ID erforderlich.");

  const stmt = db.prepare("DELETE FROM saved_bbch_stages WHERE id = ?");
  stmt.bind([id]);
  stmt.step();
  stmt.finalize();
  return { success: true };
}

async function incrementBbchUsage(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureSavedBbchTable();

  const code = String(payload.code ?? "").trim();
  const label = String(payload.label ?? "").trim();
  if (!code) return { success: false };

  const now = new Date().toISOString();

  const existing = db.selectValue(
    "SELECT id FROM saved_bbch_stages WHERE code = ? LIMIT 1",
    [code]
  );

  if (existing) {
    const stmt = db.prepare(`
      UPDATE saved_bbch_stages SET usage_count = usage_count + 1, updated_at = ? WHERE code = ?
    `);
    stmt.bind([now, code]);
    stmt.step();
    stmt.finalize();
  } else if (label) {
    const id = generateSavedId("bbch");
    const stmt = db.prepare(`
      INSERT INTO saved_bbch_stages (id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
    `);
    stmt.bind([
      id,
      code,
      label,
      payload.principalStage || null,
      payload.secondaryStage || null,
      now,
      now,
    ]);
    stmt.step();
    stmt.finalize();
  }
  return { success: true };
}

async function getFrequentEppo(options = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureSavedEppoTable();

  const limit = options.limit || 10;
  const rows = [];
  db.exec({
    sql: `SELECT code, name, language, dtcode, usage_count, is_favorite
          FROM saved_eppo_codes
          WHERE usage_count > 0
          ORDER BY usage_count DESC, name ASC
          LIMIT ?`,
    bind: [limit],
    rowMode: "object",
    callback: (row) =>
      rows.push({
        code: row.code,
        name: row.name,
        language: row.language,
        dtcode: row.dtcode,
        usageCount: row.usage_count,
        isFavorite: Boolean(row.is_favorite),
      }),
  });
  return { items: rows };
}

async function getFrequentBbch(options = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureSavedBbchTable();

  const limit = options.limit || 10;
  const rows = [];
  db.exec({
    sql: `SELECT code, label, principal_stage, secondary_stage, usage_count, is_favorite
          FROM saved_bbch_stages
          WHERE usage_count > 0
          ORDER BY usage_count DESC, code ASC
          LIMIT ?`,
    bind: [limit],
    rowMode: "object",
    callback: (row) =>
      rows.push({
        code: row.code,
        label: row.label,
        principalStage: row.principal_stage,
        secondaryStage: row.secondary_stage,
        usageCount: row.usage_count,
        isFavorite: Boolean(row.is_favorite),
      }),
  });
  return { items: rows };
}

// ============================================

function setMetaValue(key, value, targetDb = db) {
  if (!targetDb || !key) {
    return;
  }
  const stmt = targetDb.prepare(
    "INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)"
  );
  stmt
    .bind([key, typeof value === "string" ? value : JSON.stringify(value)])
    .step();
  stmt.finalize();
}

function deleteMetaValue(key, targetDb = db) {
  if (!targetDb || !key) {
    return;
  }
  const stmt = targetDb.prepare("DELETE FROM meta WHERE key = ?");
  stmt.bind([key]).step();
  stmt.finalize();
}

function getMetaValue(key, targetDb = db) {
  if (!targetDb || !key) {
    return null;
  }
  const value = targetDb.selectValue("SELECT value FROM meta WHERE key = ?", [
    key,
  ]);
  return value ?? null;
}

function openDatabaseFromBytes(bytes) {
  if (!sqlite3) {
    throw new Error("SQLite not initialized");
  }
  // Force in-memory VFS to avoid OPFS/CANTOPEN issues in browsers without COOP/COEP
  const remoteDb = new sqlite3.oo1.DB(":memory:");
  const scope = sqlite3.wasm.scopedAllocPush();
  try {
    const pData = sqlite3.wasm.allocFromTypedArray(bytes);
    const pSchema = sqlite3.wasm.allocCString("main");
    const flags =
      (sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE || 0) |
      (sqlite3.capi.SQLITE_DESERIALIZE_RESIZEABLE || 0);
    const rc = sqlite3.capi.sqlite3_deserialize(
      remoteDb.pointer,
      pSchema,
      pData,
      bytes.byteLength,
      bytes.byteLength,
      flags
    );
    if (rc !== sqlite3.capi.SQLITE_OK) {
      remoteDb.close();
      throw new Error(
        `sqlite3_deserialize failed: ${
          sqlite3.capi.sqlite3_js_rc_str(rc) || rc
        }`
      );
    }
  } finally {
    sqlite3.wasm.scopedAllocPop(scope);
  }
  return remoteDb;
}

// Message handler
self.onmessage = async function (event) {
  const { id, action, payload } = event.data;

  try {
    let result;

    switch (action) {
      case "init":
        result = await initDatabase(payload);
        break;
      case "importSnapshot":
        result = await importSnapshot(payload);
        break;
      case "exportSnapshot":
        result = await exportSnapshot();
        break;
      case "upsertMedium":
        result = await upsertMedium(payload);
        break;
      case "deleteMedium":
        result = await deleteMedium(payload);
        break;
      case "listMediums":
        result = await listMediums();
        break;
      case "listMediumsPaged":
        result = await listMediumsPaged(payload);
        break;
      case "listHistory":
        result = await listHistory(payload);
        break;
      case "listHistoryPaged":
        result = await listHistoryPaged(payload);
        break;
      case "streamHistoryChunk":
        result = await streamHistoryChunk(payload);
        break;
      case "exportHistoryRange":
        result = await exportHistoryRange(payload);
        break;
      case "getHistoryEntry":
        result = await getHistoryEntry(payload);
        break;
      case "appendHistoryEntry":
        result = await appendHistoryEntry(payload);
        break;
      case "deleteHistoryEntry":
        result = await deleteHistoryEntry(payload);
        break;
      case "deleteHistoryRange":
        result = await deleteHistoryRange(payload);
        break;
      case "vacuumDatabase":
        result = await vacuumDatabase();
        break;
      case "setArchiveLogs":
        result = await setArchiveLogs(payload);
        break;
      case "listArchiveLogs":
        result = await listArchiveLogs(payload);
        break;
      case "insertArchiveLog":
        result = await insertArchiveLog(payload);
        break;
      case "appendImportLog":
        result = await appendImportLog(payload);
        break;
      case "listImportLog":
        result = await listImportLog(payload);
        break;
      case "appendFoto":
        result = await appendFoto(payload);
        break;
      case "listFotos":
        result = await listFotos(payload);
        break;
      case "getFotoData":
        result = await getFotoData(payload);
        break;
      case "exportFotos":
        result = await exportFotos();
        break;
      case "deleteFoto":
        result = await deleteFoto(payload);
        break;
      case "updateFoto":
        result = await updateFoto(payload);
        break;
      case "setFotoThumb":
        result = await setFotoThumb(payload);
        break;
      case "getFotoCounts":
        result = await getFotoCounts();
        break;
      case "deleteFotosByIds":
        result = await deleteFotosByIds(payload);
        break;
      case "bulkUpdateFotoKategorie":
        result = await bulkUpdateFotoKategorie(payload);
        break;
      case "exportFotosByIds":
        result = await exportFotosByIds(payload);
        break;
      case "clearFotos":
        result = await clearFotos();
        break;
      case "deleteArchiveLog":
        result = await deleteArchiveLog(payload);
        break;
      case "exportDB":
        result = await exportDB();
        break;
      case "importDB":
        result = await importDB(payload);
        break;
      case "importLookupEppo":
        result = await importLookupEppo(payload);
        break;
      case "importLookupBbch":
        result = await importLookupBbch(payload);
        break;
      case "searchEppoCodes":
        result = await searchEppoCodes(payload);
        break;
      case "searchBbchStages":
        result = await searchBbchStages(payload);
        break;
      case "listLookupLanguages":
        result = listLookupLanguages();
        break;
      case "getLookupStats":
        result = await getLookupStats();
        break;
      case "listGpsPoints":
        result = await listGpsPoints();
        break;
      case "listGpsPointsPaged":
        result = await listGpsPointsPaged(payload);
        break;
      case "upsertGpsPoint":
        result = await upsertGpsPoint(payload);
        break;
      case "deleteGpsPoint":
        result = await deleteGpsPoint(payload);
        break;
      case "setActiveGpsPointId":
        result = await setActiveGpsPointId(payload);
        break;
      case "getActiveGpsPointId":
        result = await getActiveGpsPointId();
        break;
      case "listKulturen":
        result = await listKulturen();
        break;
      case "listKulturMittel":
        result = await listKulturMittel(payload);
        break;
      case "upsertKulturMittel":
        result = await upsertKulturMittel(payload);
        break;
      case "deleteKulturMittel":
        result = await deleteKulturMittel(payload);
        break;
      case "seedInitialData":
        result = await seedInitialData(payload);
        break;
      case "listLagerBewegungen":
        result = await listLagerBewegungen(payload);
        break;
      case "upsertLagerBewegung":
        result = await upsertLagerBewegung(payload);
        break;
      case "deleteLagerBewegung":
        result = await deleteLagerBewegung(payload);
        break;
      case "getLagerUebersicht":
        result = await getLagerUebersicht();
        break;
      case "listMittelStammdaten":
        result = await listMittelStammdaten();
        break;
      case "listAckerflaechen":
        result = await listAckerflaechen();
        break;
      case "upsertAckerflaeche":
        result = await upsertAckerflaeche(payload);
        break;
      case "deleteAckerflaeche":
        result = await deleteAckerflaeche(payload);
        break;
      // Kulturführung (Anbau-Belegung + Maßnahmen)
      case "listAnbau":
        result = await listAnbau(payload);
        break;
      case "upsertAnbau":
        result = await upsertAnbau(payload);
        break;
      case "deleteAnbau":
        result = await deleteAnbau(payload);
        break;
      case "listKulturStamm":
        result = await listKulturStamm();
        break;
      case "upsertKulturStamm":
        result = await upsertKulturStamm(payload);
        break;
      case "deleteKulturStamm":
        result = await deleteKulturStamm(payload);
        break;
      case "listMassnahmen":
        result = await listMassnahmen(payload);
        break;
      case "upsertMassnahme":
        result = await upsertMassnahme(payload);
        break;
      case "deleteMassnahme":
        result = await deleteMassnahme(payload);
        break;
      case "importPsmAsMassnahmen":
        result = await importPsmAsMassnahmen();
        break;
      // Saved EPPO/BBCH favorites
      case "listSavedEppo":
        result = await listSavedEppo(payload);
        break;
      case "upsertSavedEppo":
        result = await upsertSavedEppo(payload);
        break;
      case "deleteSavedEppo":
        result = await deleteSavedEppo(payload);
        break;
      case "incrementEppoUsage":
        result = await incrementEppoUsage(payload);
        break;
      case "listSavedBbch":
        result = await listSavedBbch(payload);
        break;
      case "upsertSavedBbch":
        result = await upsertSavedBbch(payload);
        break;
      case "deleteSavedBbch":
        result = await deleteSavedBbch(payload);
        break;
      case "incrementBbchUsage":
        result = await incrementBbchUsage(payload);
        break;
      case "getFrequentEppo":
        result = await getFrequentEppo(payload);
        break;
      case "getFrequentBbch":
        result = await getFrequentBbch(payload);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    self.postMessage({ id, ok: true, result });
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      error: error.message || String(error),
    });
  }
};

/**
 * Initialize SQLite database
 */
async function initDatabase(options = {}) {
  if (isInitialized) {
    return { success: true, message: "Already initialized" };
  }

  try {
    // Load SQLite WASM module
    const sqlite3InitModule = await import(
      SQLITE_WASM_CDN + "sqlite3.mjs"
    ).then((m) => m.default);

    sqlite3 = await sqlite3InitModule({
      print: console.log,
      printErr: console.error,
      locateFile: (file) => SQLITE_WASM_CDN + file,
    });

    // Determine storage mode
    const mode = options.mode || detectMode();
    db = createDatabaseInstance(mode);
    currentMode = mode;

    configureDatabase();

    // Apply schema for freshly created databases
    await applySchema();

    isInitialized = true;

    return {
      success: true,
      mode,
      message: `Database initialized in ${mode} mode`,
    };
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw new Error(`Database initialization failed: ${error.message}`);
  }
}

/**
 * Detect best storage mode
 */
function detectMode() {
  if (typeof sqlite3?.opfs !== "undefined") {
    return "opfs";
  }
  return "memory";
}

function createDatabaseInstance(mode = "memory") {
  if (mode === "opfs" && sqlite3?.opfs) {
    return new sqlite3.oo1.OpfsDb("/pflanzenschutz.sqlite");
  }
  return new sqlite3.oo1.DB();
}

function configureDatabase(targetDb = db) {
  if (!targetDb) {
    throw new Error("Database not initialized");
  }
  targetDb.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA temp_store = MEMORY;
    PRAGMA cache_size = -20000;
  `);
}

/**
 * Apply database schema
 */
async function applySchema() {
  if (!db) throw new Error("Database not initialized");

  // Check current version
  const currentVersion = db.selectValue("PRAGMA user_version") || 0;

  if (currentVersion === 0) {
    // Apply initial schema
    const schemaSql = `
      CREATE TABLE IF NOT EXISTS meta (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS measurement_methods (
        id TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        type TEXT NOT NULL,
        unit TEXT NOT NULL,
        requires TEXT,
        config TEXT
      );
      
      CREATE TABLE IF NOT EXISTS mediums (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        unit TEXT NOT NULL,
        method_id TEXT NOT NULL,
        value REAL NOT NULL,
        zulassungsnummer TEXT,
        FOREIGN KEY(method_id) REFERENCES measurement_methods(id)
      );

      CREATE TABLE IF NOT EXISTS medium_profiles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS medium_profile_mediums (
        profile_id TEXT NOT NULL,
        medium_id TEXT NOT NULL,
        sort_order INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (profile_id, medium_id),
        FOREIGN KEY(profile_id) REFERENCES medium_profiles(id) ON DELETE CASCADE,
        FOREIGN KEY(medium_id) REFERENCES mediums(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_medium_profile_mediums_profile
        ON medium_profile_mediums(profile_id, sort_order);
      
      CREATE TABLE IF NOT EXISTS lookup_eppo_codes (
        code TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        language TEXT,
        dtcode TEXT,
        preferred INTEGER DEFAULT 1,
        dt_label TEXT,
        language_label TEXT,
        authority TEXT,
        name_de TEXT,
        name_en TEXT,
        name_la TEXT
      );
      
      CREATE INDEX IF NOT EXISTS idx_lookup_eppo_name ON lookup_eppo_codes(name COLLATE NOCASE);
      CREATE INDEX IF NOT EXISTS idx_lookup_eppo_dtcode ON lookup_eppo_codes(dtcode);
      
      CREATE TABLE IF NOT EXISTS lookup_bbch_stages (
        code TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        principal_stage INTEGER,
        secondary_stage INTEGER,
        definition TEXT,
        kind TEXT
      );
      
      CREATE INDEX IF NOT EXISTS idx_lookup_bbch_label ON lookup_bbch_stages(label COLLATE NOCASE);
      CREATE INDEX IF NOT EXISTS idx_lookup_bbch_principal ON lookup_bbch_stages(principal_stage);

      CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        header_json TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS history_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        history_id INTEGER NOT NULL,
        medium_id TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        FOREIGN KEY(history_id) REFERENCES history(id) ON DELETE CASCADE
      );
      
      CREATE INDEX IF NOT EXISTS idx_history_created_at ON history(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_history_items_history_id ON history_items(history_id);
      CREATE INDEX IF NOT EXISTS idx_mediums_method_id ON mediums(method_id);

      CREATE TABLE IF NOT EXISTS gps_points (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        source TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_gps_points_created ON gps_points(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_gps_points_name ON gps_points(name COLLATE NOCASE);
      
      PRAGMA user_version = 1;
    `;

    db.exec(schemaSql);
  }

  let postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const needsApprovalColumn = !hasColumn(db, "mediums", "zulassungsnummer");
  if (needsApprovalColumn || postMigrationVersion < 4) {
    console.log("Migrating database to version 4...");
    db.exec("BEGIN TRANSACTION");
    try {
      if (needsApprovalColumn) {
        ensureMediumApprovalColumn(db);
      }
      db.exec("PRAGMA user_version = 4");
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 4 failed:", error);
      throw error;
    }
  }

  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  if (postMigrationVersion < 5) {
    console.log("Migrating database to version 5...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureLookupTables(db);
      db.exec("PRAGMA user_version = 5");
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 5 failed:", error);
      throw error;
    }
  }

  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const gpsTableMissing = !hasTable(db, "gps_points");
  if (gpsTableMissing || postMigrationVersion < 6) {
    console.log("Migrating database to version 6...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureGpsPointTable(db);
      db.exec("PRAGMA user_version = 6");
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 6 failed:", error);
      throw error;
    }
  }

  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const profileTablesMissing =
    !hasTable(db, "medium_profiles") || !hasTable(db, "medium_profile_mediums");
  if (profileTablesMissing || postMigrationVersion < 7) {
    console.log("Migrating database to version 7...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureMediumProfileTables(db);
      db.exec("PRAGMA user_version = 7");
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 7 failed:", error);
      throw error;
    }
  }

  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const archiveTableMissing = !hasTable(db, "archive_logs");
  if (archiveTableMissing || postMigrationVersion < 8) {
    console.log("Migrating database to version 8...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureArchiveLogsTable(db);
      const archivesMetaRaw = getMetaValue("archives", db);
      if (archivesMetaRaw) {
        try {
          const parsed = JSON.parse(archivesMetaRaw);
          const logs = Array.isArray(parsed?.logs) ? parsed.logs : [];
          if (logs.length) {
            replaceArchiveLogs(logs, db);
          }
        } catch (parseError) {
          console.warn("Archiv-Logs konnten nicht migriert werden", parseError);
        }
      }
      db.exec("PRAGMA user_version = 8");
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 8 failed:", error);
      throw error;
    }
  }

  // Migration to version 9: Add QS columns (wartezeit, wirkstoff) to mediums
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const needsQsColumns =
    !hasColumn(db, "mediums", "wartezeit") ||
    !hasColumn(db, "mediums", "wirkstoff");
  if (needsQsColumns || postMigrationVersion < 9) {
    console.log("Migrating database to version 9 (QS columns)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureMediumColumns(db);
      db.exec("PRAGMA user_version = 9");
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 9 failed:", error);
      throw error;
    }
  }

  // Migration to version 10: Normalize history tables for EU machine-readable compliance
  // (DVO 2023/564 + 2025/2203)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const historyNeedsNormalization = !hasColumn(db, "history", "ersteller");
  if (historyNeedsNormalization || postMigrationVersion < 10) {
    console.log("Migrating database to version 10 (normalized history)...");
    db.exec("BEGIN TRANSACTION");
    try {
      // Add normalized columns to history table
      const historyColumns = [
        { name: "ersteller", type: "TEXT" },
        { name: "standort", type: "TEXT" },
        { name: "kultur", type: "TEXT" },
        { name: "eppo_code", type: "TEXT" },
        { name: "bbch", type: "TEXT" },
        { name: "datum", type: "TEXT" },
        { name: "date_iso", type: "TEXT" },
        { name: "uhrzeit", type: "TEXT" },
        { name: "usage_type", type: "TEXT" },
        { name: "area_ha", type: "REAL" },
        { name: "area_ar", type: "REAL" },
        { name: "area_sqm", type: "REAL" },
        { name: "water_volume", type: "REAL" },
        { name: "invekos", type: "TEXT" },
        { name: "gps", type: "TEXT" },
        { name: "gps_latitude", type: "REAL" },
        { name: "gps_longitude", type: "REAL" },
        { name: "gps_point_id", type: "TEXT" },
        { name: "qs_maschine", type: "TEXT" },
        { name: "qs_schaderreger", type: "TEXT" },
        { name: "qs_verantwortlicher", type: "TEXT" },
        { name: "qs_wetter", type: "TEXT" },
        { name: "qs_behandlungsart", type: "TEXT" },
      ];

      for (const col of historyColumns) {
        if (!hasColumn(db, "history", col.name)) {
          db.exec(`ALTER TABLE history ADD COLUMN ${col.name} ${col.type}`);
        }
      }

      // Add normalized columns to history_items table
      const itemColumns = [
        { name: "medium_name", type: "TEXT" },
        { name: "medium_unit", type: "TEXT" },
        { name: "method_id", type: "TEXT" },
        { name: "method_label", type: "TEXT" },
        { name: "medium_value", type: "REAL" },
        { name: "calculated_total", type: "REAL" },
        { name: "zulassungsnummer", type: "TEXT" },
        { name: "wartezeit", type: "INTEGER" },
        { name: "wirkstoff", type: "TEXT" },
        { name: "input_area_ha", type: "REAL" },
        { name: "input_area_ar", type: "REAL" },
        { name: "input_area_sqm", type: "REAL" },
        { name: "input_water_volume", type: "REAL" },
      ];

      for (const col of itemColumns) {
        if (!hasColumn(db, "history_items", col.name)) {
          db.exec(
            `ALTER TABLE history_items ADD COLUMN ${col.name} ${col.type}`
          );
        }
      }

      // Create indices for machine-readable queries
      db.exec(`
        CREATE INDEX IF NOT EXISTS idx_history_date_iso ON history(date_iso);
        CREATE INDEX IF NOT EXISTS idx_history_eppo_code ON history(eppo_code);
        CREATE INDEX IF NOT EXISTS idx_history_kultur ON history(kultur);
        CREATE INDEX IF NOT EXISTS idx_history_standort ON history(standort);
        CREATE INDEX IF NOT EXISTS idx_history_items_zulassungsnummer ON history_items(zulassungsnummer);
        CREATE INDEX IF NOT EXISTS idx_history_items_wirkstoff ON history_items(wirkstoff);
      `);

      // Migrate existing JSON data to normalized columns
      const existingEntries = [];
      db.exec({
        sql: "SELECT id, header_json FROM history WHERE header_json IS NOT NULL",
        rowMode: "object",
        callback: (row) => existingEntries.push(row),
      });

      if (existingEntries.length > 0) {
        console.log(
          `Migrating ${existingEntries.length} history entries to normalized format...`
        );
        const updateStmt = db.prepare(`
          UPDATE history SET
            ersteller = ?,
            standort = ?,
            kultur = ?,
            eppo_code = ?,
            bbch = ?,
            datum = ?,
            date_iso = ?,
            uhrzeit = ?,
            usage_type = ?,
            area_ha = ?,
            area_ar = ?,
            area_sqm = ?,
            water_volume = ?,
            invekos = ?,
            gps = ?,
            gps_latitude = ?,
            gps_longitude = ?,
            gps_point_id = ?,
            qs_maschine = ?,
            qs_schaderreger = ?,
            qs_verantwortlicher = ?,
            qs_wetter = ?,
            qs_behandlungsart = ?
          WHERE id = ?
        `);

        for (const row of existingEntries) {
          try {
            const header = JSON.parse(row.header_json || "{}");
            const coords = header.gpsCoordinates || {};
            updateStmt
              .bind([
                header.ersteller || null,
                header.standort || null,
                header.kultur || null,
                header.eppoCode || null,
                header.bbch || null,
                header.datum || null,
                header.dateIso || null,
                header.uhrzeit || null,
                header.usageType || null,
                header.areaHa ?? null,
                header.areaAr ?? null,
                header.areaSqm ?? null,
                header.waterVolume ?? null,
                header.invekos || null,
                header.gps || null,
                coords.latitude ?? null,
                coords.longitude ?? null,
                header.gpsPointId || null,
                header.qsMaschine || null,
                header.qsSchaderreger || null,
                header.qsVerantwortlicher || null,
                header.qsWetter || null,
                header.qsBehandlungsart || null,
                row.id,
              ])
              .step();
            updateStmt.reset();
          } catch (parseErr) {
            console.warn(
              `Could not migrate history entry ${row.id}:`,
              parseErr
            );
          }
        }
        updateStmt.finalize();
      }

      // Migrate history_items
      const existingItems = [];
      db.exec({
        sql: "SELECT id, payload_json FROM history_items WHERE payload_json IS NOT NULL",
        rowMode: "object",
        callback: (row) => existingItems.push(row),
      });

      if (existingItems.length > 0) {
        console.log(
          `Migrating ${existingItems.length} history items to normalized format...`
        );
        const itemUpdateStmt = db.prepare(`
          UPDATE history_items SET
            medium_name = ?,
            medium_unit = ?,
            method_id = ?,
            method_label = ?,
            medium_value = ?,
            calculated_total = ?,
            zulassungsnummer = ?,
            wartezeit = ?,
            wirkstoff = ?,
            input_area_ha = ?,
            input_area_ar = ?,
            input_area_sqm = ?,
            input_water_volume = ?
          WHERE id = ?
        `);

        for (const row of existingItems) {
          try {
            const payload = JSON.parse(row.payload_json || "{}");
            const inputs = payload.inputs || {};
            itemUpdateStmt
              .bind([
                payload.name || null,
                payload.unit || null,
                payload.methodId || null,
                payload.methodLabel || null,
                payload.value ?? null,
                payload.total ?? null,
                payload.zulassungsnummer || null,
                payload.wartezeit ?? null,
                payload.wirkstoff || null,
                inputs.areaHa ?? null,
                inputs.areaAr ?? null,
                inputs.areaSqm ?? null,
                inputs.waterVolume ?? null,
                row.id,
              ])
              .step();
            itemUpdateStmt.reset();
          } catch (parseErr) {
            console.warn(`Could not migrate history item ${row.id}:`, parseErr);
          }
        }
        itemUpdateStmt.finalize();
      }

      db.exec("PRAGMA user_version = 10");
      db.exec("COMMIT");
      console.log("Database migrated to version 10 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 10 failed:", error);
      throw error;
    }
  }

  // Migration to version 11: Add company data columns to history table
  // (für vollständige Dokumentation pro Anwendung)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const companyColumnsNeeded = !hasColumn(db, "history", "company_name");
  if (companyColumnsNeeded || postMigrationVersion < 11) {
    console.log("Migrating database to version 11 (company data in history)...");
    db.exec("BEGIN TRANSACTION");
    try {
      // Add company columns to history table
      const companyColumns = [
        { name: "company_name", type: "TEXT" },
        { name: "company_address", type: "TEXT" },
        { name: "company_headline", type: "TEXT" },
        { name: "company_email", type: "TEXT" },
      ];

      for (const col of companyColumns) {
        if (!hasColumn(db, "history", col.name)) {
          db.exec(`ALTER TABLE history ADD COLUMN ${col.name} ${col.type}`);
        }
      }

      // Migrate existing JSON data to extract company info if available
      const existingEntries = [];
      db.exec({
        sql: "SELECT id, header_json FROM history WHERE header_json IS NOT NULL AND company_name IS NULL",
        rowMode: "object",
        callback: (row) => existingEntries.push(row),
      });

      if (existingEntries.length > 0) {
        console.log(
          `Migrating ${existingEntries.length} history entries for company data...`
        );
        const updateStmt = db.prepare(`
          UPDATE history SET
            company_name = ?,
            company_address = ?,
            company_headline = ?,
            company_email = ?
          WHERE id = ?
        `);

        for (const row of existingEntries) {
          try {
            const header = JSON.parse(row.header_json || "{}");
            const company = header.company || {};
            updateStmt
              .bind([
                company.name || null,
                company.address || null,
                company.headline || null,
                company.contactEmail || null,
                row.id,
              ])
              .step();
            updateStmt.reset();
          } catch (parseErr) {
            console.warn(
              `Could not migrate company data for history entry ${row.id}:`,
              parseErr
            );
          }
        }
        updateStmt.finalize();
      }

      db.exec("PRAGMA user_version = 11");
      db.exec("COMMIT");
      console.log("Database migrated to version 11 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 11 failed:", error);
      throw error;
    }
  }

  // Migration to version 12: Nutzfläche + Typ für Standorte (gps_points)
  // (Gewächshäuser haben eine Nutzfläche, Freiland nicht)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const gpsAreaColumnsNeeded =
    !hasColumn(db, "gps_points", "nutzflaeche_qm") ||
    !hasColumn(db, "gps_points", "kind");
  if (gpsAreaColumnsNeeded || postMigrationVersion < 12) {
    console.log(
      "Migrating database to version 12 (gps_points Nutzfläche/Typ)..."
    );
    db.exec("BEGIN TRANSACTION");
    try {
      ensureGpsPointTable(db);
      if (!hasColumn(db, "gps_points", "nutzflaeche_qm")) {
        db.exec("ALTER TABLE gps_points ADD COLUMN nutzflaeche_qm REAL");
      }
      if (!hasColumn(db, "gps_points", "kind")) {
        db.exec("ALTER TABLE gps_points ADD COLUMN kind TEXT");
      }
      db.exec("PRAGMA user_version = 12");
      db.exec("COMMIT");
      console.log("Database migrated to version 12 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 12 failed:", error);
      throw error;
    }
  }

  // Migration to version 13: Kultur → Mittel Tabelle (Pestalozzi/Demeter)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const kulturMittelTableMissing = !hasTable(db, "kultur_mittel");
  if (kulturMittelTableMissing || postMigrationVersion < 13) {
    console.log("Migrating database to version 13 (kultur_mittel)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureKulturMittelTable(db);
      db.exec("PRAGMA user_version = 13");
      db.exec("COMMIT");
      console.log("Database migrated to version 13 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 13 failed:", error);
      throw error;
    }
  }

  // Migration to version 14: EPPO-Code + BBCH-Default je Kultur in kultur_mittel
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const kulturMittelHasEppo =
    hasTable(db, "kultur_mittel") && hasColumn(db, "kultur_mittel", "eppo_code");
  if (!kulturMittelHasEppo || postMigrationVersion < 14) {
    console.log("Migrating database to version 14 (kultur_mittel EPPO/BBCH)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureKulturMittelTable(db);
      if (
        hasTable(db, "kultur_mittel") &&
        !hasColumn(db, "kultur_mittel", "eppo_code")
      ) {
        db.exec("ALTER TABLE kultur_mittel ADD COLUMN eppo_code TEXT");
      }
      if (
        hasTable(db, "kultur_mittel") &&
        !hasColumn(db, "kultur_mittel", "bbch_default")
      ) {
        db.exec("ALTER TABLE kultur_mittel ADD COLUMN bbch_default TEXT");
      }
      db.exec("PRAGMA user_version = 14");
      db.exec("COMMIT");
      console.log("Database migrated to version 14 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 14 failed:", error);
      throw error;
    }
  }

  // Migration to version 15: BVL-BBCH-Stadium je Mittel/Kultur in kultur_mittel
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const kulturMittelHasBbch =
    hasTable(db, "kultur_mittel") && hasColumn(db, "kultur_mittel", "bbch");
  if (!kulturMittelHasBbch || postMigrationVersion < 15) {
    console.log("Migrating database to version 15 (kultur_mittel BBCH)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureKulturMittelTable(db);
      if (
        hasTable(db, "kultur_mittel") &&
        !hasColumn(db, "kultur_mittel", "bbch")
      ) {
        db.exec("ALTER TABLE kultur_mittel ADD COLUMN bbch TEXT");
      }
      db.exec("PRAGMA user_version = 15");
      db.exec("COMMIT");
      console.log("Database migrated to version 15 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 15 failed:", error);
      throw error;
    }
  }

  // Migration to version 16: Mittel-Lager (Bestandsbewegungen)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const lagerTableMissing = !hasTable(db, "lager_bewegungen");
  if (lagerTableMissing || postMigrationVersion < 16) {
    console.log("Migrating database to version 16 (lager_bewegungen)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureLagerTable(db);
      db.exec("PRAGMA user_version = 16");
      db.exec("COMMIT");
      console.log("Database migrated to version 16 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 16 failed:", error);
      throw error;
    }
  }

  // Migration to version 17: Acker-Planer (Freiland-Flächen)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const ackerTableMissing = !hasTable(db, "ackerflaechen");
  if (ackerTableMissing || postMigrationVersion < 17) {
    console.log("Migrating database to version 17 (ackerflaechen)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureAckerTable(db);
      db.exec("PRAGMA user_version = 17");
      db.exec("COMMIT");
      console.log("Database migrated to version 17 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 17 failed:", error);
      throw error;
    }
  }

  // Migration to version 18: Import-Historie (import_log)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const importLogTableMissing = !hasTable(db, "import_log");
  if (importLogTableMissing || postMigrationVersion < 18) {
    console.log("Migrating database to version 18 (import_log)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureImportLogTable(db);
      db.exec("PRAGMA user_version = 18");
      db.exec("COMMIT");
      console.log("Database migrated to version 18 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 18 failed:", error);
      throw error;
    }
  }

  // Migration to version 19: Fotos (Nachweis/allgemein)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const fotosTableMissing = !hasTable(db, "fotos");
  if (fotosTableMissing || postMigrationVersion < 19) {
    console.log("Migrating database to version 19 (fotos)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureFotosTable(db);
      db.exec("PRAGMA user_version = 19");
      db.exec("COMMIT");
      console.log("Database migrated to version 19 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 19 failed:", error);
      throw error;
    }
  }

  // Migration to version 20: Foto-Notiz-Spalte
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  if (postMigrationVersion < 20) {
    console.log("Migrating database to version 20 (foto notiz)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureFotosTable(db);
      if (!hasColumn(db, "fotos", "notiz")) {
        db.exec("ALTER TABLE fotos ADD COLUMN notiz TEXT");
      }
      db.exec("PRAGMA user_version = 20");
      db.exec("COMMIT");
      console.log("Database migrated to version 20 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 20 failed:", error);
      throw error;
    }
  }

  // Migration to version 21: Foto-Thumbnail-Spalte (Galerie lädt nicht mehr das Vollbild)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  if (postMigrationVersion < 21) {
    console.log("Migrating database to version 21 (foto thumbnail)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureFotosTable(db);
      if (!hasColumn(db, "fotos", "data_thumb")) {
        db.exec("ALTER TABLE fotos ADD COLUMN data_thumb TEXT");
      }
      db.exec(
        "CREATE INDEX IF NOT EXISTS idx_fotos_kategorie ON fotos(kategorie, created_at DESC)"
      );
      db.exec("PRAGMA user_version = 21");
      db.exec("COMMIT");
      console.log("Database migrated to version 21 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 21 failed:", error);
      throw error;
    }
  }

  // Migration to version 22: Kulturführung (anbau_kultur + massnahme)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const kulturTablesMissing =
    !hasTable(db, "anbau_kultur") || !hasTable(db, "massnahme");
  if (kulturTablesMissing || postMigrationVersion < 22) {
    console.log("Migrating database to version 22 (Kulturführung)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureAnbauTable(db);
      ensureMassnahmeTable(db);
      db.exec("PRAGMA user_version = 22");
      db.exec("COMMIT");
      console.log("Database migrated to version 22 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 22 failed:", error);
      throw error;
    }
  }

  // Migration to version 23: Ernte-Zeitraum (anbau_kultur.ernte_von / ernte_bis)
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  if (postMigrationVersion < 23) {
    console.log("Migrating database to version 23 (Ernte-Zeitraum)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureAnbauTable(db);
      if (!hasColumn(db, "anbau_kultur", "ernte_von")) {
        db.exec("ALTER TABLE anbau_kultur ADD COLUMN ernte_von TEXT");
      }
      if (!hasColumn(db, "anbau_kultur", "ernte_bis")) {
        db.exec("ALTER TABLE anbau_kultur ADD COLUMN ernte_bis TEXT");
      }
      // Bisheriger Einzel-Erntetag wird zum Ernte-Ende übernommen.
      db.exec(
        "UPDATE anbau_kultur SET ernte_bis = ernte_datum WHERE ernte_bis IS NULL AND ernte_datum IS NOT NULL"
      );
      db.exec("PRAGMA user_version = 23");
      db.exec("COMMIT");
      console.log("Database migrated to version 23 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 23 failed:", error);
      throw error;
    }
  }

  // Migration to version 24: persistente client_uuid-Spalte + DB-erzwungener
  // Duplikatschutz (partieller UNIQUE-Index) für history und fotos.
  // WICHTIG: vorhandene Duplikate werden VOR dem UNIQUE-Index entfernt, sonst
  // schlägt CREATE UNIQUE INDEX fehl und blockiert das Öffnen der DB.
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  if (postMigrationVersion < 24) {
    console.log("Migrating database to version 24 (client_uuid dedup)...");
    db.exec("BEGIN TRANSACTION");
    try {
      if (hasTable(db, "history")) {
        if (!hasColumn(db, "history", "client_uuid")) {
          db.exec("ALTER TABLE history ADD COLUMN client_uuid TEXT");
        }
        // Aus dem bestehenden header_json befüllen (json_extract liefert bei
        // fehlendem/ungültigem JSON sicher NULL).
        db.exec(
          "UPDATE history SET client_uuid = json_extract(header_json, '$.clientUuid') WHERE client_uuid IS NULL AND header_json IS NOT NULL"
        );
        // Echte Duplikate (gleiche client_uuid) entfernen – kleinste id behalten.
        db.exec(
          "DELETE FROM history WHERE client_uuid IS NOT NULL AND id NOT IN (SELECT MIN(id) FROM history WHERE client_uuid IS NOT NULL GROUP BY client_uuid)"
        );
        // Verwaiste Items aufräumen (falls Foreign-Keys/CASCADE nicht aktiv sind).
        if (hasTable(db, "history_items")) {
          db.exec("DELETE FROM history_items WHERE history_id NOT IN (SELECT id FROM history)");
        }
        db.exec(
          "CREATE UNIQUE INDEX IF NOT EXISTS idx_history_client_uuid ON history(client_uuid) WHERE client_uuid IS NOT NULL"
        );
      }
      if (hasTable(db, "fotos")) {
        db.exec(
          "DELETE FROM fotos WHERE client_uuid IS NOT NULL AND id NOT IN (SELECT MIN(id) FROM fotos WHERE client_uuid IS NOT NULL GROUP BY client_uuid)"
        );
        // Alten, nicht-eindeutigen Index durch partiellen UNIQUE-Index ersetzen.
        db.exec("DROP INDEX IF EXISTS idx_fotos_uuid");
        db.exec(
          "CREATE UNIQUE INDEX IF NOT EXISTS idx_fotos_uuid ON fotos(client_uuid) WHERE client_uuid IS NOT NULL"
        );
      }
      db.exec("PRAGMA user_version = 24");
      db.exec("COMMIT");
      console.log("Database migrated to version 24 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 24 failed:", error);
      throw error;
    }
  }

  // Migration to version 25: Satzplanung – Kultur-Stammdaten-Bibliothek
  // (kultur_stamm, vorbefüllt) + Satz-Felder an anbau_kultur (Aussaat-Termin,
  // Stammdaten-Verknüpfung, Menge/Einheit, Folgesatz-Gruppe).
  postMigrationVersion = db.selectValue("PRAGMA user_version") || 0;
  const kulturStammMissing = !hasTable(db, "kultur_stamm");
  if (kulturStammMissing || postMigrationVersion < 25) {
    console.log("Migrating database to version 25 (Satzplanung / Kultur-Stammdaten)...");
    db.exec("BEGIN TRANSACTION");
    try {
      ensureAnbauTable(db);
      const anbauCols = [
        ["aussaat_datum", "TEXT"],
        ["kultur_stamm_id", "TEXT"],
        ["menge", "REAL"],
        ["einheit", "TEXT"],
        ["satz_gruppe", "TEXT"],
      ];
      anbauCols.forEach(([name, typ]) => {
        if (!hasColumn(db, "anbau_kultur", name)) {
          db.exec(`ALTER TABLE anbau_kultur ADD COLUMN ${name} ${typ}`);
        }
      });
      db.exec("CREATE INDEX IF NOT EXISTS idx_anbau_satz ON anbau_kultur(satz_gruppe)");
      ensureKulturStammTable(db);
      db.exec("PRAGMA user_version = 25");
      db.exec("COMMIT");
      console.log("Database migrated to version 25 successfully");
    } catch (error) {
      db.exec("ROLLBACK");
      console.error("Migration to version 25 failed:", error);
      throw error;
    }
    // Bibliothek-Seed GETRENNT von der Schema-Transaktion und fehlertolerant:
    // ein Seed-Problem darf das Öffnen der DB niemals blockieren.
    try {
      seedKulturStammIfEmpty(db);
    } catch (seedErr) {
      console.warn("kultur_stamm Seed übersprungen (nicht fatal):", seedErr);
    }
  }
}

/**
 * Import a complete snapshot from JSON format
 */
async function importSnapshot(snapshot) {
  if (!db) throw new Error("Database not initialized");

  db.exec("BEGIN TRANSACTION");

  try {
    // Datenverlust-Schutz: History NUR löschen, wenn der Snapshot tatsächlich
    // eine history-Liste enthält. Im SQLite-Modus lässt getDatabaseSnapshot()
    // history bewusst weg (sie lebt nur in der Worker-DB) – ohne diese Bedingung
    // würde ein Einstellungs-Speichern (Mittel/EPPO/BBCH/Firma) alle seit dem
    // Öffnen erfassten Einträge löschen. Der History-Insert weiter unten ist
    // bereits an dieselbe Bedingung (snapshot.history Array) gekoppelt.
    const replaceHistory = Array.isArray(snapshot.history);

    // Clear existing data
    if (replaceHistory) {
      db.exec(`
        DELETE FROM history_items;
        DELETE FROM history;
      `);
    }
    db.exec(`
      DELETE FROM mediums;
      DELETE FROM measurement_methods;
      DELETE FROM meta WHERE key IN ('version','company','defaults','fieldLabels','measurementMethods','archives');
    `);

    // Import meta data
    if (snapshot.meta) {
      const metaEntries = {
        version: snapshot.meta.version || 1,
        company: JSON.stringify(snapshot.meta.company || {}),
        defaults: JSON.stringify(snapshot.meta.defaults || {}),
        fieldLabels: JSON.stringify(snapshot.meta.fieldLabels || {}),
        measurementMethods: JSON.stringify(
          snapshot.meta.measurementMethods || []
        ),
        archives: JSON.stringify(snapshot.archives || { logs: [] }),
      };

      const stmt = db.prepare(
        "INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)"
      );
      for (const [key, value] of Object.entries(metaEntries)) {
        stmt
          .bind([
            key,
            typeof value === "string" ? value : JSON.stringify(value),
          ])
          .step();
        stmt.reset();
      }
      stmt.finalize();

      // Import measurement methods
      if (
        snapshot.meta.measurementMethods &&
        Array.isArray(snapshot.meta.measurementMethods)
      ) {
        const methodStmt = db.prepare(
          "INSERT OR REPLACE INTO measurement_methods (id, label, type, unit, requires, config) VALUES (?, ?, ?, ?, ?, ?)"
        );
        for (const method of snapshot.meta.measurementMethods) {
          methodStmt
            .bind([
              method.id,
              method.label,
              method.type,
              method.unit,
              JSON.stringify(method.requires || []),
              JSON.stringify(method.config || {}),
            ])
            .step();
          methodStmt.reset();
        }
        methodStmt.finalize();
      }

      const importedArchiveLogs = Array.isArray(snapshot.archives?.logs)
        ? snapshot.archives.logs
        : [];
      const sanitized = replaceArchiveLogs(importedArchiveLogs, db);
      setMetaValue("archives", JSON.stringify({ logs: sanitized }), db);
    }

    // Import mediums
    if (snapshot.mediums && Array.isArray(snapshot.mediums)) {
      ensureMediumColumns(db);
      const mediumStmt = db.prepare(
        "INSERT OR REPLACE INTO mediums (id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      );
      for (const medium of snapshot.mediums) {
        const approvalNumber =
          medium.zulassungsnummer ??
          medium.approvalNumber ??
          medium.zulassung ??
          null;

        mediumStmt
          .bind([
            medium.id,
            medium.name,
            medium.unit,
            medium.methodId || medium.method_id,
            medium.value,
            approvalNumber,
            medium.wartezeit ?? null,
            medium.wirkstoff ?? null,
          ])
          .step();
        mediumStmt.reset();
      }
      mediumStmt.finalize();
    }

    // Import medium profiles
    if (snapshot.mediumProfiles && Array.isArray(snapshot.mediumProfiles)) {
      ensureMediumProfileTables();
      db.exec("DELETE FROM medium_profile_mediums");
      db.exec("DELETE FROM medium_profiles");

      const profileStmt = db.prepare(
        "INSERT INTO medium_profiles (id, name, created_at, updated_at) VALUES (?, ?, ?, ?)"
      );
      const linkStmt = db.prepare(
        "INSERT INTO medium_profile_mediums (profile_id, medium_id, sort_order) VALUES (?, ?, ?)"
      );
      for (const profile of snapshot.mediumProfiles) {
        const id = String(profile.id || "").trim();
        if (!id) {
          continue;
        }
        const name = String(profile.name || "Profil ohne Namen");
        const createdAt =
          profile.createdAt || profile.created_at || new Date().toISOString();
        const updatedAt = profile.updatedAt || profile.updated_at || createdAt;

        profileStmt.bind([id, name, createdAt, updatedAt]).step();
        profileStmt.reset();

        const mediumIds = Array.isArray(profile.mediumIds)
          ? profile.mediumIds
          : [];
        mediumIds.forEach((mediumId, index) => {
          if (!mediumId) {
            return;
          }
          linkStmt.bind([id, String(mediumId), index]).step();
          linkStmt.reset();
        });
      }
      profileStmt.finalize();
      linkStmt.finalize();
    }

    // Import history (with normalized columns for EU compliance)
    if (snapshot.history && Array.isArray(snapshot.history)) {
      const historyStmt = db.prepare(`
        INSERT OR IGNORE INTO history (
          created_at, client_uuid, header_json,
          ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
          uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
          invekos, gps, gps_latitude, gps_longitude, gps_point_id,
          qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const itemsStmt = db.prepare(`
        INSERT INTO history_items (
          history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const entry of snapshot.history) {
        const header = entry.header ? { ...entry.header } : { ...entry };
        delete header.items;
        const createdAt =
          entry.savedAt ||
          header.savedAt ||
          header.createdAt ||
          new Date().toISOString();
        if (!header.createdAt) {
          header.createdAt = createdAt;
        }

        const gpsCoords = header.gpsCoordinates || {};
        historyStmt
          .bind([
            createdAt,
            header.clientUuid || null,
            JSON.stringify(header),
            header.ersteller || null,
            header.standort || null,
            header.kultur || null,
            header.eppoCode || null,
            header.bbch || null,
            header.datum || null,
            header.dateIso || null,
            header.uhrzeit || null,
            header.usageType || null,
            header.areaHa ?? null,
            header.areaAr ?? null,
            header.areaSqm ?? null,
            header.waterVolume ?? null,
            header.invekos || null,
            header.gps || null,
            gpsCoords.latitude ?? null,
            gpsCoords.longitude ?? null,
            header.gpsPointId || null,
            header.qsMaschine || null,
            header.qsSchaderreger || null,
            header.qsVerantwortlicher || null,
            header.qsWetter || null,
            header.qsBehandlungsart || null,
          ])
          .step();
        // OR IGNORE kann den Eintrag (gleiche client_uuid) überspringen ->
        // dann KEINE Items anhängen (sonst landen sie an der falschen Zeile).
        const inserted = (db.selectValue("SELECT changes()") || 0) > 0;
        const historyId = inserted
          ? db.selectValue("SELECT last_insert_rowid()")
          : null;
        historyStmt.reset();
        if (!inserted) {
          continue;
        }

        const items =
          entry.items && Array.isArray(entry.items) ? entry.items : [];
        for (const item of items) {
          const inputs = item.inputs || {};
          itemsStmt
            .bind([
              historyId,
              item.mediumId || item.medium_id || item.id || "",
              JSON.stringify(item),
              item.name || null,
              item.unit || null,
              item.methodId || null,
              item.methodLabel || null,
              item.value ?? null,
              item.total ?? null,
              item.zulassungsnummer || null,
              item.wartezeit ?? null,
              item.wirkstoff || null,
              inputs.areaHa ?? null,
              inputs.areaAr ?? null,
              inputs.areaSqm ?? null,
              inputs.waterVolume ?? null,
            ])
            .step();
          itemsStmt.reset();
        }
      }

      historyStmt.finalize();
      itemsStmt.finalize();
    }

    db.exec("COMMIT");
    return { success: true, message: "Snapshot imported successfully" };
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

/**
 * Export complete database as JSON snapshot
 */
async function exportSnapshot() {
  if (!db) throw new Error("Database not initialized");

  const snapshot = {
    meta: {
      version: 1,
      company: {},
      defaults: {},
      fieldLabels: {},
      measurementMethods: [],
    },
    mediums: [],
    mediumProfiles: [],
    history: [],
    archives: { logs: [] },
  };

  // Export meta
  db.exec({
    sql: "SELECT key, value FROM meta",
    callback: (row) => {
      const key = row[0];
      const value = row[1];
      // Only parse known JSON keys, skip internal lookup metadata
      if (key && key.startsWith("lookup:")) {
        return; // Skip lookup metadata (simple string values, not JSON)
      }
      try {
        const parsed = JSON.parse(value);
        if (key === "company") snapshot.meta.company = parsed;
        else if (key === "defaults") snapshot.meta.defaults = parsed;
        else if (key === "fieldLabels") snapshot.meta.fieldLabels = parsed;
        else if (key === "version") snapshot.meta.version = parsed;
        else if (key === "archives") snapshot.archives = parsed;
      } catch (e) {
        // Silently skip non-JSON meta values (e.g. simple strings)
        if (import.meta.env?.DEV) {
          console.debug(`Meta key ${key} is not JSON, skipping`);
        }
      }
    },
  });

  // Export measurement methods
  db.exec({
    sql: "SELECT id, label, type, unit, requires, config FROM measurement_methods",
    callback: (row) => {
      snapshot.meta.measurementMethods.push({
        id: row[0],
        label: row[1],
        type: row[2],
        unit: row[3],
        requires: JSON.parse(row[4] || "[]"),
        config: JSON.parse(row[5] || "{}"),
      });
    },
  });

  // Export mediums
  db.exec({
    sql: "SELECT id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff FROM mediums",
    callback: (row) => {
      snapshot.mediums.push({
        id: row[0],
        name: row[1],
        unit: row[2],
        methodId: row[3],
        value: row[4],
        zulassungsnummer: row[5] || null,
        wartezeit: row[6] || null,
        wirkstoff: row[7] || null,
      });
    },
  });

  // Export medium profiles
  const profileMap = new Map();
  db.exec({
    sql: `SELECT id, name, created_at, updated_at
          FROM medium_profiles
          ORDER BY name COLLATE NOCASE`,
    rowMode: "object",
    callback: (row) => {
      profileMap.set(row.id, {
        id: String(row.id),
        name: String(row.name ?? ""),
        createdAt: row.created_at || new Date().toISOString(),
        updatedAt: row.updated_at || new Date().toISOString(),
        mediumIds: [],
      });
    },
  });

  if (profileMap.size) {
    db.exec({
      sql: `SELECT profile_id, medium_id, sort_order
            FROM medium_profile_mediums
            ORDER BY profile_id, sort_order, rowid`,
      rowMode: "object",
      callback: (row) => {
        const profile = profileMap.get(row.profile_id);
        if (profile) {
          profile.mediumIds.push(String(row.medium_id));
        }
      },
    });
  }

  snapshot.mediumProfiles = Array.from(profileMap.values());

  const archiveLogsFromTable = readAllArchiveLogs();
  if (archiveLogsFromTable.length) {
    snapshot.archives = {
      logs: archiveLogsFromTable.map((entry) => toArchiveLogMetaPayload(entry)),
    };
  }

  // Export history (using normalized columns for EU compliance)
  const historyMap = new Map();
  db.exec({
    sql: `SELECT id, created_at, header_json, client_uuid,
            ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
            uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
            invekos, gps, gps_latitude, gps_longitude, gps_point_id,
            qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart
          FROM history ORDER BY created_at DESC`,
    rowMode: "object",
    callback: (row) => {
      // Prefer normalized columns, fall back to JSON for backward compatibility
      let header = {};
      try {
        header = JSON.parse(row.header_json || "{}");
      } catch (e) {
        console.warn("Could not parse header_json", e);
      }
      historyMap.set(row.id, {
        header: {
          createdAt: row.created_at,
          ersteller: row.ersteller ?? header.ersteller,
          standort: row.standort ?? header.standort,
          kultur: row.kultur ?? header.kultur,
          eppoCode: row.eppo_code ?? header.eppoCode,
          bbch: row.bbch ?? header.bbch,
          datum: row.datum ?? header.datum,
          dateIso: row.date_iso ?? header.dateIso,
          uhrzeit: row.uhrzeit ?? header.uhrzeit,
          usageType: row.usage_type ?? header.usageType,
          areaHa: row.area_ha ?? header.areaHa,
          areaAr: row.area_ar ?? header.areaAr,
          areaSqm: row.area_sqm ?? header.areaSqm,
          waterVolume: row.water_volume ?? header.waterVolume,
          invekos: row.invekos ?? header.invekos,
          gps: row.gps ?? header.gps,
          gpsCoordinates:
            row.gps_latitude != null && row.gps_longitude != null
              ? { latitude: row.gps_latitude, longitude: row.gps_longitude }
              : header.gpsCoordinates || null,
          gpsPointId: row.gps_point_id ?? header.gpsPointId,
          qsMaschine: row.qs_maschine ?? header.qsMaschine,
          qsSchaderreger: row.qs_schaderreger ?? header.qsSchaderreger,
          qsVerantwortlicher:
            row.qs_verantwortlicher ?? header.qsVerantwortlicher,
          qsWetter: row.qs_wetter ?? header.qsWetter,
          qsBehandlungsart: row.qs_behandlungsart ?? header.qsBehandlungsart,
          savedAt: header.savedAt || row.created_at,
          // Stabiler Ausweis fürs zuverlässige Dedup beim Import (Mobil -> PC).
          clientUuid: row.client_uuid ?? header.clientUuid ?? null,
        },
        items: [],
      });
    },
  });

  // Export history items (using normalized columns)
  db.exec({
    sql: `SELECT history_id, medium_id, payload_json,
            medium_name, medium_unit, method_id, method_label, medium_value,
            calculated_total, zulassungsnummer, wartezeit, wirkstoff,
            input_area_ha, input_area_ar, input_area_sqm, input_water_volume
          FROM history_items`,
    rowMode: "object",
    callback: (row) => {
      const historyId = row.history_id;
      if (historyMap.has(historyId)) {
        // Prefer normalized columns, fall back to JSON
        let payload = {};
        try {
          payload = JSON.parse(row.payload_json || "{}");
        } catch (e) {
          console.warn("Could not parse payload_json", e);
        }
        historyMap.get(historyId).items.push({
          id: row.medium_id ?? payload.id,
          mediumId: row.medium_id ?? payload.mediumId,
          name: row.medium_name ?? payload.name,
          unit: row.medium_unit ?? payload.unit,
          methodId: row.method_id ?? payload.methodId,
          methodLabel: row.method_label ?? payload.methodLabel,
          value: row.medium_value ?? payload.value,
          total: row.calculated_total ?? payload.total,
          zulassungsnummer: row.zulassungsnummer ?? payload.zulassungsnummer,
          wartezeit: row.wartezeit ?? payload.wartezeit,
          wirkstoff: row.wirkstoff ?? payload.wirkstoff,
          inputs: {
            areaHa: row.input_area_ha ?? payload.inputs?.areaHa,
            areaAr: row.input_area_ar ?? payload.inputs?.areaAr,
            areaSqm: row.input_area_sqm ?? payload.inputs?.areaSqm,
            waterVolume: row.input_water_volume ?? payload.inputs?.waterVolume,
          },
        });
      }
    },
  });

  snapshot.history = Array.from(historyMap.values()).map((entry) => ({
    ...entry.header,
    items: entry.items,
  }));
  return snapshot;
}

/**
 * CRUD operations for mediums
 */
async function upsertMedium(medium) {
  if (!db) throw new Error("Database not initialized");

  // Ensure columns exist (for database migration)
  ensureMediumColumns();

  const stmt = db.prepare(
    "INSERT OR REPLACE INTO mediums (id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  );
  stmt
    .bind([
      medium.id,
      medium.name,
      medium.unit,
      medium.methodId || medium.method_id,
      medium.value,
      medium.zulassungsnummer ??
        medium.approvalNumber ??
        medium.zulassung ??
        null,
      medium.wartezeit ?? null,
      medium.wirkstoff ?? null,
    ])
    .step();
  stmt.finalize();

  return { success: true, id: medium.id };
}

async function deleteMedium(id) {
  if (!db) throw new Error("Database not initialized");

  const stmt = db.prepare("DELETE FROM mediums WHERE id = ?");
  stmt.bind([id]).step();
  stmt.finalize();

  return { success: true };
}

async function listMediums() {
  if (!db) throw new Error("Database not initialized");

  // Ensure columns exist (for database migration)
  ensureMediumColumns();

  const mediums = [];
  db.exec({
    sql: "SELECT id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff FROM mediums",
    callback: (row) => {
      mediums.push({
        id: row[0],
        name: row[1],
        unit: row[2],
        methodId: row[3],
        value: row[4],
        zulassungsnummer: row[5] || null,
        wartezeit: row[6] || null,
        wirkstoff: row[7] || null,
      });
    },
  });

  return mediums;
}

function mapMediumRow(row) {
  if (!row) {
    return null;
  }
  return {
    id: row.id != null ? String(row.id) : "",
    name: row.name != null ? String(row.name) : "",
    unit: row.unit != null ? String(row.unit) : "",
    methodId:
      row.method_id != null
        ? String(row.method_id)
        : row.methodId != null
          ? String(row.methodId)
          : null,
    value: Number(row.value ?? 0),
    zulassungsnummer:
      row.zulassungsnummer != null
        ? String(row.zulassungsnummer)
        : row.zulassung != null
          ? String(row.zulassung)
          : null,
    wartezeit: row.wartezeit != null ? Number(row.wartezeit) : null,
    wirkstoff: row.wirkstoff != null ? String(row.wirkstoff) : null,
  };
}

async function listMediumsPaged(options = {}) {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const {
    cursor = null,
    limit,
    pageSize,
    search,
    includeTotal = false,
  } = options || {};

  const effectivePageSize = clampPageSize(pageSize ?? limit, 50, 500);
  const searchTerm = typeof search === "string" ? search.trim() : "";
  const filterClauses = [];
  const filterParams = [];

  if (searchTerm) {
    filterClauses.push(
      "(LOWER(name) LIKE LOWER(?) OR LOWER(COALESCE(zulassungsnummer, '')) LIKE LOWER(?))"
    );
    const like = `%${searchTerm}%`;
    filterParams.push(like, like);
  }

  const cursorRowId =
    cursor && Number.isFinite(Number(cursor.rowid))
      ? Number(cursor.rowid)
      : null;

  const whereParts = [...filterClauses];
  const queryParams = [...filterParams];
  if (cursorRowId !== null) {
    whereParts.push("rowid > ?");
    queryParams.push(cursorRowId);
  }
  const whereSql = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";

  const stmt = db.prepare(
    `SELECT rowid AS cursor_rowid, id, name, unit, method_id, value, zulassungsnummer
     FROM mediums
     ${whereSql}
     ORDER BY rowid ASC
     LIMIT ?`
  );
  stmt.bind([...queryParams, effectivePageSize + 1]);

  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.finalize();

  const hasMore = rows.length > effectivePageSize;
  const pageRows = hasMore ? rows.slice(0, effectivePageSize) : rows;
  const items = pageRows
    .map((row) => mapMediumRow(row))
    .filter((row) => row !== null);

  const lastRow = pageRows.length ? pageRows[pageRows.length - 1] : null;
  const nextCursor =
    hasMore && lastRow
      ? { rowid: Number(lastRow.cursor_rowid) || Number(lastRow.rowid || 0) }
      : null;

  let totalCount;
  if (includeTotal) {
    const totalWhere = filterClauses.length
      ? `WHERE ${filterClauses.join(" AND ")}`
      : "";
    const totalStmt = db.prepare(
      `SELECT COUNT(*) AS total FROM mediums ${totalWhere}`
    );
    if (filterParams.length) {
      totalStmt.bind(filterParams);
    }
    if (totalStmt.step()) {
      const row = totalStmt.getAsObject();
      totalCount = Number(row?.total) || 0;
    } else {
      totalCount = 0;
    }
    totalStmt.finalize();
  }

  return {
    items,
    nextCursor,
    hasMore,
    pageSize: effectivePageSize,
    totalCount,
  };
}

/**
 * History operations with paging
 */
function buildHistoryFilterQuery(filters = {}) {
  const historyDateExpr = `COALESCE(
    NULLIF(json_extract(header_json, '$.dateIso'), ''),
    CASE
      WHEN json_extract(header_json, '$.datum') GLOB '__.__.____'
      THEN substr(json_extract(header_json, '$.datum'), 7, 4) || '-' ||
           substr(json_extract(header_json, '$.datum'), 4, 2) || '-' ||
           substr(json_extract(header_json, '$.datum'), 1, 2)
      ELSE NULL
    END,
    created_at
  )`;

  const whereParts = [];
  const whereParams = [];

  if (filters.startDate) {
    whereParts.push(`datetime(${historyDateExpr}) >= datetime(?)`);
    whereParams.push(filters.startDate);
  }

  if (filters.endDate) {
    whereParts.push(`datetime(${historyDateExpr}) <= datetime(?)`);
    whereParams.push(filters.endDate);
  }

  const textFilters = [
    ["creator", "$.ersteller"],
    ["location", "$.standort"],
    ["crop", "$.kultur"],
    ["usageType", "$.usageType"],
    ["eppoCode", "$.eppoCode"],
    ["invekos", "$.invekos"],
    ["bbch", "$.bbch"],
  ];

  textFilters.forEach(([key, jsonPath]) => {
    const value = filters?.[key];
    if (typeof value === "string" && value.trim()) {
      whereParts.push(
        `LOWER(json_extract(header_json, '${jsonPath}')) LIKE LOWER(?)`
      );
      whereParams.push(`%${value.trim()}%`);
    }
  });

  if (typeof filters?.text === "string" && filters.text.trim()) {
    const textValue = `%${filters.text.trim()}%`;
    const jsonTargets = [
      "$.ersteller",
      "$.standort",
      "$.kultur",
      "$.usageType",
      "$.eppoCode",
      "$.invekos",
      "$.bbch",
      "$.gps",
    ];
    const textClauses = jsonTargets.map(
      (path) => `LOWER(json_extract(header_json, '${path}')) LIKE LOWER(?)`
    );
    whereParts.push(`(${textClauses.join(" OR ")})`);
    for (let i = 0; i < jsonTargets.length; i += 1) {
      whereParams.push(textValue);
    }
  }

  return {
    historyDateExpr,
    whereSql: whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "",
    whereParams,
  };
}

function buildHistoryCursorClause(cursor, historyDateExpr, sortDirection) {
  if (!cursor || !cursor.createdAt) {
    return null;
  }
  const comparator = sortDirection === "ASC" ? ">" : "<";
  const createdAt = String(cursor.createdAt);
  const cursorId = Number(cursor.id ?? cursor.historyId ?? cursor.rowid ?? 0);
  return {
    clause: `(
      datetime(${historyDateExpr}) ${comparator} datetime(?)
      OR (datetime(${historyDateExpr}) = datetime(?) AND history.id ${comparator} ?)
    )`,
    params: [createdAt, createdAt, cursorId],
  };
}

async function listHistory({
  page = 1,
  pageSize = 50,
  filters = {},
  sortDirection = "desc",
} = {}) {
  if (!db) throw new Error("Database not initialized");

  const sanitizedDirection =
    String(sortDirection).toLowerCase() === "asc" ? "ASC" : "DESC";

  const normalizedPageSize = clampPageSize(pageSize, 50, 500);
  const normalizedPage = Number.isFinite(Number(page))
    ? Math.max(1, Number(page))
    : 1;
  const offset = (normalizedPage - 1) * normalizedPageSize;

  const { historyDateExpr, whereSql, whereParams } =
    buildHistoryFilterQuery(filters);

  const history = [];
  const queryConfig = {
    sql: `
      SELECT id, created_at, header_json
      FROM history
      ${whereSql}
      ORDER BY datetime(${historyDateExpr}) ${sanitizedDirection}, rowid ${sanitizedDirection}
      LIMIT ${normalizedPageSize} OFFSET ${offset}
    `,
    callback: (row) => {
      const header = JSON.parse(row[2] || "{}");
      history.push({
        id: row[0],
        ...header,
      });
    },
  };
  if (whereParams.length) {
    queryConfig.bind = [...whereParams];
  }
  db.exec(queryConfig);

  const totalCount = db.selectValue(
    `SELECT COUNT(*) FROM history ${whereSql}`,
    whereParams.length ? [...whereParams] : undefined
  );

  return {
    items: history,
    page: normalizedPage,
    pageSize: normalizedPageSize,
    totalCount: Number(totalCount) || 0,
    totalPages: Math.ceil((Number(totalCount) || 0) / normalizedPageSize),
  };
}

async function listHistoryPaged({
  cursor = null,
  pageSize = 50,
  filters = {},
  sortDirection = "desc",
  includeItems = false,
  includeTotal = false,
} = {}) {
  if (!db) throw new Error("Database not initialized");

  const sanitizedDirection =
    String(sortDirection).toLowerCase() === "asc" ? "ASC" : "DESC";
  const normalizedPageSize = clampPageSize(pageSize, 50, 500);
  const fetchLimit = normalizedPageSize + 1;

  const { historyDateExpr, whereSql, whereParams } =
    buildHistoryFilterQuery(filters);
  const cursorClause = buildHistoryCursorClause(
    cursor,
    historyDateExpr,
    sanitizedDirection
  );

  const clauseSegments = [];
  const bindParams = [];

  if (whereSql?.trim()) {
    clauseSegments.push(whereSql.replace(/^\s*WHERE\s+/i, ""));
    if (whereParams.length) {
      bindParams.push(...whereParams);
    }
  }

  if (cursorClause) {
    clauseSegments.push(cursorClause.clause);
    bindParams.push(...cursorClause.params);
  }

  const combinedWhereSql =
    clauseSegments.length > 0 ? `WHERE ${clauseSegments.join(" AND ")}` : "";

  const rows = [];
  db.exec({
    sql: `
      SELECT
        history.id AS id,
        history.header_json AS header_json,
        history.client_uuid AS client_uuid,
        history.created_at AS created_at,
        ${historyDateExpr} AS cursor_created_at,
        history.ersteller, history.standort, history.kultur, history.eppo_code, history.bbch,
        history.datum, history.date_iso, history.uhrzeit, history.usage_type,
        history.area_ha, history.area_ar, history.area_sqm, history.water_volume,
        history.invekos, history.gps, history.gps_latitude, history.gps_longitude, history.gps_point_id,
        history.qs_maschine, history.qs_schaderreger, history.qs_verantwortlicher, history.qs_wetter, history.qs_behandlungsart,
        history.company_name, history.company_address, history.company_headline, history.company_email
      FROM history
      ${combinedWhereSql}
      ORDER BY datetime(cursor_created_at) ${sanitizedDirection}, history.id ${sanitizedDirection}
      LIMIT ?
    `,
    bind: [...bindParams, fetchLimit],
    rowMode: "object",
    callback: (row) => rows.push(row),
  });

  const hasMore = rows.length > normalizedPageSize;
  const entries = hasMore ? rows.slice(0, -1) : rows;

  let nextCursor = null;
  if (hasMore && entries.length) {
    const lastEntry = entries[entries.length - 1];
    nextCursor = {
      id: lastEntry.id,
      createdAt:
        lastEntry.cursor_created_at ||
        lastEntry.created_at ||
        new Date().toISOString(),
    };
  }

  const history = entries.map((row) => {
    // Prefer normalized columns, fall back to JSON for backward compatibility
    let header = {};
    try {
      header = JSON.parse(row.header_json || "{}");
    } catch (error) {
      console.warn("Konnte History-Header nicht parsen", error);
    }
    // Build entry from normalized columns where available
    // Company data snapshot kommt zuerst für bessere Lesbarkeit im Export
    const entry = {
      company: {
        name: row.company_name ?? header.company?.name ?? null,
        address: row.company_address ?? header.company?.address ?? null,
        headline: row.company_headline ?? header.company?.headline ?? null,
        contactEmail: row.company_email ?? header.company?.contactEmail ?? null,
      },
      id: row.id,
      createdAt: row.created_at,
      ersteller: row.ersteller ?? header.ersteller,
      standort: row.standort ?? header.standort,
      kultur: row.kultur ?? header.kultur,
      eppoCode: row.eppo_code ?? header.eppoCode,
      bbch: row.bbch ?? header.bbch,
      datum: row.datum ?? header.datum,
      dateIso: row.date_iso ?? header.dateIso,
      uhrzeit: row.uhrzeit ?? header.uhrzeit,
      usageType: row.usage_type ?? header.usageType,
      areaHa: row.area_ha ?? header.areaHa,
      areaAr: row.area_ar ?? header.areaAr,
      areaSqm: row.area_sqm ?? header.areaSqm,
      waterVolume: row.water_volume ?? header.waterVolume,
      invekos: row.invekos ?? header.invekos,
      gps: row.gps ?? header.gps,
      gpsCoordinates:
        row.gps_latitude != null && row.gps_longitude != null
          ? { latitude: row.gps_latitude, longitude: row.gps_longitude }
          : header.gpsCoordinates || null,
      gpsPointId: row.gps_point_id ?? header.gpsPointId,
      qsMaschine: row.qs_maschine ?? header.qsMaschine,
      qsSchaderreger: row.qs_schaderreger ?? header.qsSchaderreger,
      qsVerantwortlicher: row.qs_verantwortlicher ?? header.qsVerantwortlicher,
      qsWetter: row.qs_wetter ?? header.qsWetter,
      qsBehandlungsart: row.qs_behandlungsart ?? header.qsBehandlungsart,
      savedAt: header.savedAt || row.created_at,
      // Stabiler Ausweis -> Dedup-Schlüssel beim Import (gleiche Namensraum wie Export).
      clientUuid: row.client_uuid ?? header.clientUuid ?? null,
    };
    if (includeItems) {
      entry.items = [];
    }
    return entry;
  });

  if (includeItems && history.length) {
    const historyIds = history.map((entry) => entry.id);
    const placeholders = historyIds.map(() => "?").join(",");
    const itemsMap = new Map();

    db.exec({
      sql: `
        SELECT history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        FROM history_items
        WHERE history_id IN (${placeholders})
        ORDER BY history_id, rowid
      `,
      bind: historyIds,
      rowMode: "object",
      callback: (row) => {
        const historyId = row.history_id;
        if (!itemsMap.has(historyId)) {
          itemsMap.set(historyId, []);
        }
        // Prefer normalized columns, fall back to JSON
        let payload = {};
        try {
          payload = JSON.parse(row.payload_json || "{}");
        } catch (error) {
          console.warn("Konnte History-Item nicht parsen", error);
        }
        itemsMap.get(historyId).push({
          id: row.medium_id ?? payload.id,
          mediumId: row.medium_id ?? payload.mediumId,
          name: row.medium_name ?? payload.name,
          unit: row.medium_unit ?? payload.unit,
          methodId: row.method_id ?? payload.methodId,
          methodLabel: row.method_label ?? payload.methodLabel,
          value: row.medium_value ?? payload.value,
          total: row.calculated_total ?? payload.total,
          zulassungsnummer: row.zulassungsnummer ?? payload.zulassungsnummer,
          wartezeit: row.wartezeit ?? payload.wartezeit,
          wirkstoff: row.wirkstoff ?? payload.wirkstoff,
          inputs: {
            areaHa: row.input_area_ha ?? payload.inputs?.areaHa,
            areaAr: row.input_area_ar ?? payload.inputs?.areaAr,
            areaSqm: row.input_area_sqm ?? payload.inputs?.areaSqm,
            waterVolume: row.input_water_volume ?? payload.inputs?.waterVolume,
          },
        });
      },
    });

    history.forEach((entry) => {
      entry.items = itemsMap.get(entry.id) || [];
    });
  }

  let totalCount;
  if (includeTotal) {
    totalCount =
      Number(
        db.selectValue(
          `SELECT COUNT(*) FROM history ${whereSql || ""}`,
          whereParams.length ? [...whereParams] : undefined
        )
      ) || 0;
  }

  return {
    items: history,
    nextCursor,
    pageSize: normalizedPageSize,
    sortDirection: sanitizedDirection === "ASC" ? "asc" : "desc",
    hasMore,
    totalCount,
  };
}

async function streamHistoryChunk(options = {}) {
  if (!db) {
    throw new Error("Database not initialized");
  }
  const {
    pageSize,
    chunkSize,
    includeItems = true,
    includeTotal = false,
    ...rest
  } = options || {};

  const effectiveSize = clampPageSize(chunkSize ?? pageSize ?? 100, 100, 1000);

  return await listHistoryPaged({
    pageSize: effectiveSize,
    includeItems,
    includeTotal,
    ...rest,
  });
}

async function exportHistoryRange({
  filters = {},
  limit = 5000,
  sortDirection = "asc",
} = {}) {
  if (!db) throw new Error("Database not initialized");

  const sanitizedLimit = Number.isFinite(Number(limit))
    ? Math.min(Math.max(Number(limit), 1), 10000)
    : 5000;
  const direction =
    String(sortDirection).toLowerCase() === "desc" ? "DESC" : "ASC";

  const { historyDateExpr, whereSql, whereParams } =
    buildHistoryFilterQuery(filters);

  const entries = [];
  const historyIds = [];
  const sql = `
    SELECT history.id AS history_id,
           history.header_json AS header_json,
           COALESCE(json_group_array(history_items.payload_json), '[]') AS items_json
    FROM history
    LEFT JOIN history_items ON history_items.history_id = history.id
    ${whereSql}
    GROUP BY history.id
    ORDER BY datetime(${historyDateExpr}) ${direction}, history.rowid ${direction}
    LIMIT ?
  `;
  const bindParams = whereParams.length
    ? [...whereParams, sanitizedLimit]
    : [sanitizedLimit];

  db.exec({
    sql,
    bind: bindParams,
    rowMode: "object",
    callback: (row) => {
      try {
        const header = JSON.parse(row.header_json || "{}");
        const rawItems = JSON.parse(row.items_json || "[]");
        const items = Array.isArray(rawItems)
          ? rawItems
              .map((item) => {
                if (item == null) {
                  return null;
                }
                if (typeof item === "string") {
                  try {
                    return JSON.parse(item);
                  } catch (err) {
                    console.warn("Konnte History-Item nicht parsen", err);
                    return null;
                  }
                }
                return item;
              })
              .filter((value) => value !== null)
          : [];
        historyIds.push(row.history_id);
        entries.push({
          ...header,
          items,
        });
      } catch (error) {
        console.warn("Archiv-Export konnte nicht gelesen werden", error);
      }
    },
  });

  return { entries, historyIds };
}

async function deleteHistoryRange({ filters = {} } = {}) {
  if (!db) throw new Error("Database not initialized");

  const { whereSql, whereParams } = buildHistoryFilterQuery(filters);
  db.exec("BEGIN TRANSACTION");
  try {
    const deleteConfig = {
      sql: `DELETE FROM history ${whereSql}`,
    };
    if (whereParams.length) {
      deleteConfig.bind = [...whereParams];
    }
    db.exec(deleteConfig);
    db.exec("COMMIT");
    return { success: true };
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

async function vacuumDatabase() {
  if (!db) throw new Error("Database not initialized");
  db.exec("VACUUM");
  return { success: true };
}

async function setArchiveLogs(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  const logs = Array.isArray(payload.logs) ? payload.logs : [];
  db.exec("BEGIN TRANSACTION");
  try {
    const sanitized = replaceArchiveLogs(logs, db);
    setMetaValue("archives", JSON.stringify({ logs: sanitized }), db);
    db.exec("COMMIT");
    return { success: true, count: sanitized.length };
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

async function listArchiveLogs({
  limit = 50,
  cursor = null,
  sortDirection = "desc",
} = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureArchiveLogsTable();

  const sanitizedDirection =
    String(sortDirection).toLowerCase() === "asc" ? "ASC" : "DESC";
  const normalizedLimit = Math.min(Math.max(Number(limit) || 1, 1), 500);
  const fetchLimit = normalizedLimit + 1;

  const cursorClause = (() => {
    if (!cursor || !cursor.archivedAt) {
      return null;
    }
    const comparator = sanitizedDirection === "ASC" ? ">" : "<";
    const tieComparator = comparator;
    const createdAt = String(cursor.archivedAt);
    const cursorId = cursor.id ? String(cursor.id) : "";
    return {
      clause: `(
        datetime(archived_at) ${comparator} datetime(?)
        OR (datetime(archived_at) = datetime(?) AND id ${tieComparator} ?)
      )`,
      params: [createdAt, createdAt, cursorId],
    };
  })();

  const clauses = [];
  const params = [];
  if (cursorClause) {
    clauses.push(cursorClause.clause);
    params.push(...cursorClause.params);
  }
  const whereSql = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  const rows = [];
  db.exec({
    sql: `SELECT id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json
          FROM archive_logs
          ${whereSql}
          ORDER BY datetime(archived_at) ${sanitizedDirection}, id ${sanitizedDirection}
          LIMIT ?`,
    bind: [...params, fetchLimit],
    rowMode: "object",
    callback: (row) => rows.push(row),
  });

  let nextCursor = null;
  const hasMore = rows.length > normalizedLimit;
  if (hasMore) {
    const nextRow = rows.pop();
    if (nextRow) {
      nextCursor = {
        id: String(nextRow.id),
        archivedAt: nextRow.archived_at,
      };
    }
  }

  const items = rows
    .map((row) => mapArchiveLogRow(row))
    .filter((entry) => Boolean(entry));

  return {
    items,
    nextCursor,
    hasMore,
    pageSize: normalizedLimit,
    sortDirection: sanitizedDirection,
  };
}

async function insertArchiveLog(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureArchiveLogsTable();
  const normalized = normalizeArchiveLogEntry(payload);
  if (!normalized) {
    throw new Error("Ungültiger Archiv-Eintrag");
  }
  const stmt = db.prepare(
    `INSERT OR REPLACE INTO archive_logs
      (id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  stmt
    .bind([
      normalized.id,
      normalized.archivedAt,
      normalized.startDate,
      normalized.endDate,
      normalized.entryCount,
      normalized.fileName,
      normalized.storageHint,
      normalized.note,
      JSON.stringify(normalized.metadata || payload || {}),
    ])
    .step();
  stmt.finalize();
  syncArchiveLogsMeta();
  return mapArchiveLogRow({
    id: normalized.id,
    archived_at: normalized.archivedAt,
    start_date: normalized.startDate,
    end_date: normalized.endDate,
    entry_count: normalized.entryCount,
    file_name: normalized.fileName,
    storage_hint: normalized.storageHint,
    note: normalized.note,
    metadata_json: JSON.stringify(normalized.metadata || payload || {}),
  });
}

async function appendImportLog(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureImportLogTable();
  const importedAt = payload.importedAt || new Date().toISOString();
  const stmt = db.prepare(
    `INSERT INTO import_log
      (imported_at, source, device, added, skipped, range_start, range_end, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  stmt
    .bind([
      importedAt,
      payload.source != null ? String(payload.source) : null,
      payload.device != null ? String(payload.device) : null,
      Number(payload.added) || 0,
      Number(payload.skipped) || 0,
      payload.rangeStart != null ? String(payload.rangeStart) : null,
      payload.rangeEnd != null ? String(payload.rangeEnd) : null,
      payload.note != null ? String(payload.note) : null,
    ])
    .step();
  stmt.finalize();
  const id = db.selectValue("SELECT last_insert_rowid()");
  return { id, importedAt };
}

async function listImportLog(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureImportLogTable();
  const limit = Math.min(Math.max(Number(payload?.limit) || 50, 1), 500);
  const rows = [];
  db.exec({
    sql: `SELECT id, imported_at, source, device, added, skipped, range_start, range_end, note
          FROM import_log
          ORDER BY datetime(imported_at) DESC, id DESC
          LIMIT ?`,
    bind: [limit],
    rowMode: "object",
    callback: (row) => {
      rows.push({
        id: row.id,
        importedAt: row.imported_at,
        source: row.source,
        device: row.device,
        added: Number(row.added) || 0,
        skipped: Number(row.skipped) || 0,
        rangeStart: row.range_start,
        rangeEnd: row.range_end,
        note: row.note,
      });
    },
  });
  return { items: rows };
}

// ===== FOTOS =====
async function appendFoto(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const clientUuid = payload.clientUuid ? String(payload.clientUuid) : null;
  if (clientUuid) {
    try {
      const existing = db.selectValue(
        "SELECT id FROM fotos WHERE client_uuid = ? LIMIT 1",
        [clientUuid]
      );
      if (existing != null) {
        return { id: existing, duplicate: true };
      }
    } catch (e) {
      /* ignore */
    }
  }
  if (!payload.data) throw new Error("Foto-Daten fehlen");
  const createdAt = payload.createdAt || new Date().toISOString();
  const stmt = db.prepare(
    `INSERT INTO fotos
      (client_uuid, created_at, entry_uuid, kategorie, titel, standort, kultur,
       gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data, data_thumb)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  try {
    stmt
      .bind([
        clientUuid,
        createdAt,
        payload.entryUuid != null ? String(payload.entryUuid) : null,
        payload.kategorie != null ? String(payload.kategorie) : null,
        payload.titel != null ? String(payload.titel) : null,
        payload.standort != null ? String(payload.standort) : null,
        payload.kultur != null ? String(payload.kultur) : null,
        payload.gpsLatitude ?? null,
        payload.gpsLongitude ?? null,
        payload.notiz != null ? String(payload.notiz) : null,
        payload.device != null ? String(payload.device) : null,
        payload.mime != null ? String(payload.mime) : "image/jpeg",
        payload.width ?? null,
        payload.height ?? null,
        payload.bytes ?? null,
        String(payload.data),
        payload.thumb != null ? String(payload.thumb) : null,
      ])
      .step();
    stmt.finalize();
  } catch (error) {
    try { stmt.finalize(); } catch (e) { /* ignore */ }
    // UNIQUE-Index (gleiche client_uuid) -> als Duplikat behandeln.
    if (clientUuid && /UNIQUE|constraint/i.test(String(error && error.message))) {
      const existing = db.selectValue(
        "SELECT id FROM fotos WHERE client_uuid = ? LIMIT 1",
        [clientUuid]
      );
      if (existing != null) return { id: existing, duplicate: true };
    }
    throw error;
  }
  const id = db.selectValue("SELECT last_insert_rowid()");
  return { id, duplicate: false };
}

// Liste OHNE Bilddaten (für Galerie – performant).
async function listFotos(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const limit = Math.min(Math.max(Number(payload?.limit) || 200, 1), 100000);
  const rows = [];
  db.exec({
    // created_at ist ISO-8601-Z -> lexikografisch = zeitlich; rohe Spalte nutzt idx_fotos_created.
    sql: `SELECT id, client_uuid, created_at, entry_uuid, kategorie, titel,
                 standort, kultur, gps_latitude, gps_longitude, notiz, device, mime,
                 width, height, bytes, data_thumb
          FROM fotos ORDER BY created_at DESC, id DESC LIMIT ?`,
    bind: [limit],
    rowMode: "object",
    callback: (row) => {
      rows.push({
        id: row.id,
        clientUuid: row.client_uuid,
        createdAt: row.created_at,
        entryUuid: row.entry_uuid,
        kategorie: row.kategorie,
        titel: row.titel,
        standort: row.standort,
        kultur: row.kultur,
        gpsLatitude: row.gps_latitude,
        gpsLongitude: row.gps_longitude,
        notiz: row.notiz,
        device: row.device,
        mime: row.mime,
        width: row.width,
        height: row.height,
        bytes: row.bytes,
        thumb: row.data_thumb || null,
      });
    },
  });
  return { items: rows };
}

// Thumbnail nachtragen (Backfill für Altbestand/Importe ohne data_thumb).
async function setFotoThumb(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const id = payload && payload.id != null ? Number(payload.id) : null;
  if (id == null || !payload.thumb) return { success: false };
  const stmt = db.prepare("UPDATE fotos SET data_thumb = ? WHERE id = ?");
  stmt.bind([String(payload.thumb), id]).step();
  stmt.finalize();
  return { success: true };
}

// Anzahl Fotos je Kategorie (für Chip-Badges / Übersicht).
async function getFotoCounts() {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const counts = {};
  let total = 0;
  let totalBytes = 0;
  db.exec({
    sql: "SELECT kategorie, COUNT(*) AS n, COALESCE(SUM(bytes),0) AS b FROM fotos GROUP BY kategorie",
    rowMode: "object",
    callback: (row) => {
      counts[row.kategorie || ""] = Number(row.n) || 0;
      total += Number(row.n) || 0;
      totalBytes += Number(row.b) || 0;
    },
  });
  return { counts, total, totalBytes };
}

// Mehrere Fotos auf einmal löschen (Bulk-Aufräumen).
async function deleteFotosByIds(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const ids = Array.isArray(payload?.ids)
    ? payload.ids.map((n) => Number(n)).filter((n) => Number.isFinite(n))
    : [];
  if (!ids.length) return { success: true, deleted: 0 };
  const placeholders = ids.map(() => "?").join(",");
  db.exec({ sql: `DELETE FROM fotos WHERE id IN (${placeholders})`, bind: ids });
  return { success: true, deleted: ids.length };
}

// Kategorie mehrerer Fotos auf einmal ändern.
async function bulkUpdateFotoKategorie(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const ids = Array.isArray(payload?.ids)
    ? payload.ids.map((n) => Number(n)).filter((n) => Number.isFinite(n))
    : [];
  const kategorie = payload?.kategorie != null ? String(payload.kategorie) : null;
  if (!ids.length) return { success: true, updated: 0 };
  const placeholders = ids.map(() => "?").join(",");
  db.exec({
    sql: `UPDATE fotos SET kategorie = ? WHERE id IN (${placeholders})`,
    bind: [kategorie, ...ids],
  });
  return { success: true, updated: ids.length };
}

// Nur ausgewählte Fotos MIT Vollbild exportieren (für Teilen einer Auswahl).
async function exportFotosByIds(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const ids = Array.isArray(payload?.ids)
    ? payload.ids.map((n) => Number(n)).filter((n) => Number.isFinite(n))
    : [];
  if (!ids.length) return { items: [] };
  const placeholders = ids.map(() => "?").join(",");
  const rows = [];
  db.exec({
    sql: `SELECT client_uuid, created_at, entry_uuid, kategorie, titel, standort,
                 kultur, gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data
          FROM fotos WHERE id IN (${placeholders}) ORDER BY created_at ASC, id ASC`,
    bind: ids,
    rowMode: "object",
    callback: (row) => {
      rows.push({
        clientUuid: row.client_uuid,
        createdAt: row.created_at,
        entryUuid: row.entry_uuid,
        kategorie: row.kategorie,
        titel: row.titel,
        standort: row.standort,
        kultur: row.kultur,
        gpsLatitude: row.gps_latitude,
        gpsLongitude: row.gps_longitude,
        notiz: row.notiz,
        device: row.device,
        mime: row.mime,
        width: row.width,
        height: row.height,
        bytes: row.bytes,
        data: row.data,
      });
    },
  });
  return { items: rows };
}

// Metadaten eines Fotos aktualisieren (Bild bleibt unverändert).
async function updateFoto(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const id = payload && payload.id != null ? Number(payload.id) : null;
  if (id == null) throw new Error("Foto-ID fehlt");
  const fields = [];
  const values = [];
  const setIf = (key, column) => {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      fields.push(`${column} = ?`);
      const v = payload[key];
      values.push(v == null || v === "" ? null : v);
    }
  };
  setIf("titel", "titel");
  setIf("kategorie", "kategorie");
  setIf("kultur", "kultur");
  setIf("standort", "standort");
  setIf("notiz", "notiz");
  setIf("gpsLatitude", "gps_latitude");
  setIf("gpsLongitude", "gps_longitude");
  if (!fields.length) return { success: true };
  values.push(id);
  const stmt = db.prepare(`UPDATE fotos SET ${fields.join(", ")} WHERE id = ?`);
  stmt.bind(values).step();
  stmt.finalize();
  return { success: true };
}

// Bilddaten (base64) eines Fotos – lazy nachladen.
async function getFotoData(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const id = payload && payload.id != null ? Number(payload.id) : null;
  if (id == null) return { data: null };
  let data = null;
  let mime = "image/jpeg";
  db.exec({
    sql: "SELECT data, mime FROM fotos WHERE id = ? LIMIT 1",
    bind: [id],
    rowMode: "object",
    callback: (row) => {
      data = row.data ?? null;
      mime = row.mime || "image/jpeg";
    },
  });
  return { data, mime };
}

// Alle Fotos MIT Daten (für Export/Teilen).
async function exportFotos() {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const rows = [];
  db.exec({
    sql: `SELECT client_uuid, created_at, entry_uuid, kategorie, titel, standort,
                 kultur, gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data
          FROM fotos ORDER BY created_at ASC, id ASC`,
    rowMode: "object",
    callback: (row) => {
      rows.push({
        clientUuid: row.client_uuid,
        createdAt: row.created_at,
        entryUuid: row.entry_uuid,
        kategorie: row.kategorie,
        titel: row.titel,
        standort: row.standort,
        kultur: row.kultur,
        gpsLatitude: row.gps_latitude,
        gpsLongitude: row.gps_longitude,
        notiz: row.notiz,
        device: row.device,
        mime: row.mime,
        width: row.width,
        height: row.height,
        bytes: row.bytes,
        data: row.data,
      });
    },
  });
  return { items: rows };
}

async function deleteFoto(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const id = payload && payload.id != null ? Number(payload.id) : null;
  if (id == null) throw new Error("Foto-ID fehlt");
  const stmt = db.prepare("DELETE FROM fotos WHERE id = ?");
  stmt.bind([id]).step();
  stmt.finalize();
  return { success: true };
}

// Alle Fotos löschen (mobil nach dem Senden – nichts auf dem Gerät lassen).
async function clearFotos() {
  if (!db) throw new Error("Database not initialized");
  ensureFotosTable();
  const count = db.selectValue("SELECT COUNT(*) FROM fotos") || 0;
  db.exec("DELETE FROM fotos");
  return { success: true, deleted: Number(count) };
}

async function deleteArchiveLog(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureArchiveLogsTable();
  const id = payload && payload.id ? String(payload.id) : "";
  if (!id) {
    throw new Error("Archiv-Log-ID fehlt");
  }
  const stmt = db.prepare("DELETE FROM archive_logs WHERE id = ?");
  stmt.bind([id]).step();
  stmt.finalize();
  syncArchiveLogsMeta();
  return { success: true };
}

async function getHistoryEntry(id) {
  if (!db) throw new Error("Database not initialized");

  let entry = null;

  db.exec({
    sql: `SELECT id, created_at, header_json,
            ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
            uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
            invekos, gps, gps_latitude, gps_longitude, gps_point_id,
            qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart,
            company_name, company_address, company_headline, company_email
          FROM history WHERE id = ?`,
    bind: [id],
    rowMode: "object",
    callback: (row) => {
      // Prefer normalized columns, fall back to JSON for backward compatibility
      let header = {};
      if (row.header_json) {
        try {
          header = JSON.parse(row.header_json);
        } catch (e) {
          console.warn("Could not parse header_json", e);
        }
      }
      // Build entry from normalized columns (override JSON if columns are populated)
      // Company data snapshot kommt zuerst für bessere Lesbarkeit im Export
      entry = {
        company: {
          name: row.company_name ?? header.company?.name ?? null,
          address: row.company_address ?? header.company?.address ?? null,
          headline: row.company_headline ?? header.company?.headline ?? null,
          contactEmail: row.company_email ?? header.company?.contactEmail ?? null,
        },
        id: row.id,
        createdAt: row.created_at,
        ersteller: row.ersteller ?? header.ersteller,
        standort: row.standort ?? header.standort,
        kultur: row.kultur ?? header.kultur,
        eppoCode: row.eppo_code ?? header.eppoCode,
        bbch: row.bbch ?? header.bbch,
        datum: row.datum ?? header.datum,
        dateIso: row.date_iso ?? header.dateIso,
        uhrzeit: row.uhrzeit ?? header.uhrzeit,
        usageType: row.usage_type ?? header.usageType,
        areaHa: row.area_ha ?? header.areaHa,
        areaAr: row.area_ar ?? header.areaAr,
        areaSqm: row.area_sqm ?? header.areaSqm,
        waterVolume: row.water_volume ?? header.waterVolume,
        invekos: row.invekos ?? header.invekos,
        gps: row.gps ?? header.gps,
        gpsCoordinates:
          row.gps_latitude != null && row.gps_longitude != null
            ? { latitude: row.gps_latitude, longitude: row.gps_longitude }
            : header.gpsCoordinates || null,
        gpsPointId: row.gps_point_id ?? header.gpsPointId,
        qsMaschine: row.qs_maschine ?? header.qsMaschine,
        qsSchaderreger: row.qs_schaderreger ?? header.qsSchaderreger,
        qsVerantwortlicher:
          row.qs_verantwortlicher ?? header.qsVerantwortlicher,
        qsWetter: row.qs_wetter ?? header.qsWetter,
        qsBehandlungsart: row.qs_behandlungsart ?? header.qsBehandlungsart,
        savedAt: header.savedAt || row.created_at,
        items: [],
      };
    },
  });

  if (!entry) {
    throw new Error("History entry not found");
  }

  db.exec({
    sql: `SELECT id, medium_id, payload_json,
            medium_name, medium_unit, method_id, method_label, medium_value,
            calculated_total, zulassungsnummer, wartezeit, wirkstoff,
            input_area_ha, input_area_ar, input_area_sqm, input_water_volume
          FROM history_items WHERE history_id = ?`,
    bind: [id],
    rowMode: "object",
    callback: (row) => {
      // Prefer normalized columns, fall back to JSON
      let payload = {};
      if (row.payload_json) {
        try {
          payload = JSON.parse(row.payload_json);
        } catch (e) {
          console.warn("Could not parse payload_json", e);
        }
      }
      entry.items.push({
        id: row.medium_id ?? payload.id,
        mediumId: row.medium_id ?? payload.mediumId,
        name: row.medium_name ?? payload.name,
        unit: row.medium_unit ?? payload.unit,
        methodId: row.method_id ?? payload.methodId,
        methodLabel: row.method_label ?? payload.methodLabel,
        value: row.medium_value ?? payload.value,
        total: row.calculated_total ?? payload.total,
        zulassungsnummer: row.zulassungsnummer ?? payload.zulassungsnummer,
        wartezeit: row.wartezeit ?? payload.wartezeit,
        wirkstoff: row.wirkstoff ?? payload.wirkstoff,
        inputs: {
          areaHa: row.input_area_ha ?? payload.inputs?.areaHa,
          areaAr: row.input_area_ar ?? payload.inputs?.areaAr,
          areaSqm: row.input_area_sqm ?? payload.inputs?.areaSqm,
          waterVolume: row.input_water_volume ?? payload.inputs?.waterVolume,
        },
      });
    },
  });

  return entry;
}

async function appendHistoryEntry(entry) {
  if (!db) throw new Error("Database not initialized");

  // Robuster Duplikatschutz: gleiche clientUuid bereits vorhanden -> nicht
  // erneut einfügen (unabhängig von Datum/Zeitzone). Greift für normale
  // Erfassung (immer neue UUID) nicht, nur beim (Re-)Import gleicher Einträge.
  const incomingHeader = entry && entry.header ? entry.header : entry || {};
  const clientUuid =
    incomingHeader && incomingHeader.clientUuid
      ? String(incomingHeader.clientUuid)
      : null;
  if (clientUuid) {
    try {
      const existingId = db.selectValue(
        "SELECT id FROM history WHERE client_uuid = ? LIMIT 1",
        [clientUuid]
      );
      if (existingId != null) {
        return { id: existingId, duplicate: true };
      }
    } catch (e) {
      /* Spalte (noch) nicht vorhanden -> Fallback ohne Worker-Dedup */
    }
  }

  db.exec("BEGIN TRANSACTION");

  try {
    const header = entry.header ? { ...entry.header } : { ...entry };
    delete header.items;
    const createdAt =
      entry.savedAt ||
      header.savedAt ||
      header.createdAt ||
      new Date().toISOString();
    if (!header.createdAt) {
      header.createdAt = createdAt;
    }

    // Extract GPS coordinates
    const gpsCoords = header.gpsCoordinates || {};

    // Extract company data snapshot
    const company = header.company || {};

    // Insert with both normalized columns AND legacy JSON for backward compatibility
    const stmt = db.prepare(`
      INSERT INTO history (
        created_at, client_uuid, header_json,
        ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
        uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
        invekos, gps, gps_latitude, gps_longitude, gps_point_id,
        qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart,
        company_name, company_address, company_headline, company_email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt
      .bind([
        createdAt,
        clientUuid,
        JSON.stringify(header), // Keep JSON for backward compatibility
        header.ersteller || null,
        header.standort || null,
        header.kultur || null,
        header.eppoCode || null,
        header.bbch || null,
        header.datum || null,
        header.dateIso || null,
        header.uhrzeit || null,
        header.usageType || null,
        header.areaHa ?? null,
        header.areaAr ?? null,
        header.areaSqm ?? null,
        header.waterVolume ?? null,
        header.invekos || null,
        header.gps || null,
        gpsCoords.latitude ?? null,
        gpsCoords.longitude ?? null,
        header.gpsPointId || null,
        header.qsMaschine || null,
        header.qsSchaderreger || null,
        header.qsVerantwortlicher || null,
        header.qsWetter || null,
        header.qsBehandlungsart || null,
        company.name || null,
        company.address || null,
        company.headline || null,
        company.contactEmail || null,
      ])
      .step();
    const historyId = db.selectValue("SELECT last_insert_rowid()");
    stmt.finalize();

    const items = entry.items && Array.isArray(entry.items) ? entry.items : [];
    if (items.length) {
      const itemStmt = db.prepare(`
        INSERT INTO history_items (
          history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const item of items) {
        const inputs = item.inputs || {};
        itemStmt
          .bind([
            historyId,
            item.mediumId || item.medium_id || item.id || "",
            JSON.stringify(item), // Keep JSON for backward compatibility
            item.name || null,
            item.unit || null,
            item.methodId || null,
            item.methodLabel || null,
            item.value ?? null,
            item.total ?? null,
            item.zulassungsnummer || null,
            item.wartezeit ?? null,
            item.wirkstoff || null,
            inputs.areaHa ?? null,
            inputs.areaAr ?? null,
            inputs.areaSqm ?? null,
            inputs.waterVolume ?? null,
          ])
          .step();
        itemStmt.reset();
      }
      itemStmt.finalize();
    }

    db.exec("COMMIT");
    return { success: true, id: historyId };
  } catch (error) {
    db.exec("ROLLBACK");
    // UNIQUE-Index (gleiche client_uuid, z. B. durch parallelen Schreiber) ->
    // sauber als Duplikat behandeln statt den Import abzubrechen.
    if (clientUuid && /UNIQUE|constraint/i.test(String(error && error.message))) {
      try {
        const existingId = db.selectValue(
          "SELECT id FROM history WHERE client_uuid = ? LIMIT 1",
          [clientUuid]
        );
        if (existingId != null) return { id: existingId, duplicate: true };
      } catch (e) { /* ignore */ }
    }
    throw error;
  }
}

async function deleteHistoryEntry(id) {
  if (!db) throw new Error("Database not initialized");

  // CASCADE will handle history_items deletion
  const stmt = db.prepare("DELETE FROM history WHERE id = ?");
  stmt.bind([id]).step();
  stmt.finalize();

  return { success: true };
}

/**
 * Export database as binary SQLite file
 */
async function exportDB() {
  if (!db) throw new Error("Database not initialized");

  const exported = sqlite3.capi.sqlite3_js_db_export(db.pointer);
  const buffer = exported.buffer.slice(
    exported.byteOffset,
    exported.byteOffset + exported.byteLength
  );
  return { data: buffer };
}

/**
 * Import database from binary SQLite file
 */
async function importDB(data) {
  if (!db) throw new Error("Database not initialized");
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);

  if (currentMode === "opfs" && sqlite3?.oo1?.OpfsDb && sqlite3?.opfs) {
    // Import directly into OPFS-backed database
    db.close();
    await sqlite3.oo1.OpfsDb.importDb("/pflanzenschutz.sqlite", bytes);
    db = createDatabaseInstance("opfs");
    configureDatabase();
    await applySchema();
    currentMode = "opfs";
    isInitialized = true;
    return { success: true, mode: "opfs" };
  }

  // In-memory fallback using sqlite3_deserialize
  db.close();
  const newDb = new sqlite3.oo1.DB();
  const scope = sqlite3.wasm.scopedAllocPush();
  try {
    const pData = sqlite3.wasm.allocFromTypedArray(bytes);
    const pSchema = sqlite3.wasm.allocCString("main");
    const flags =
      (sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE || 0) |
      (sqlite3.capi.SQLITE_DESERIALIZE_RESIZEABLE || 0);
    const rc = sqlite3.capi.sqlite3_deserialize(
      newDb.pointer,
      pSchema,
      pData,
      bytes.byteLength,
      bytes.byteLength,
      flags
    );
    if (rc !== sqlite3.capi.SQLITE_OK) {
      newDb.close();
      throw new Error(
        `sqlite3_deserialize failed: ${
          sqlite3.capi.sqlite3_js_rc_str(rc) || rc
        }`
      );
    }
  } finally {
    sqlite3.wasm.scopedAllocPop(scope);
  }

  db = newDb;
  configureDatabase();
  await applySchema();
  currentMode = "memory";
  isInitialized = true;
  return { success: true, mode: "memory" };
}

async function importLookupEppo(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  if (!sqlite3) throw new Error("SQLite not initialized");

  const { data } = payload;
  if (!data) {
    throw new Error("Keine Daten zum Importieren übergeben");
  }

  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  console.log(`[EPPO Import] Lade Datenbank, ${bytes.length} bytes`);
  const remoteDb = openDatabaseFromBytes(bytes);

  const rows = [];
  let uniqueCodeCount = 0;
  try {
    // Prüfe welche Tabellen existieren
    const tables = [];
    remoteDb.exec({
      sql: `SELECT name FROM sqlite_master WHERE type='table'`,
      callback: (row) => {
        if (row && row[0]) tables.push(row[0]);
      },
    });
    console.log(`[EPPO Import] Gefundene Tabellen:`, tables);

    // Neue einfache deutsche Struktur: Tabelle "eppo" mit code + name
    if (tables.includes("eppo")) {
      console.log(`[EPPO Import] Nutze neue deutsche Tabelle "eppo"`);
      remoteDb.exec({
        sql: `SELECT code, name FROM eppo ORDER BY name`,
        callback: (row) => {
          if (!row || !row[0]) {
            return;
          }
          const code = String(row[0]).trim().toUpperCase();
          const name = row[1] ? String(row[1]).trim() : code;
          rows.push({
            code,
            name,
            language: "DE",
            dtcode: null,
            dtLabel: "plant",
            languageLabel: "Deutsch",
            authority: null,
            nameDe: name,
            nameEn: null,
            nameLa: null,
          });
        },
      });
    } else if (tables.includes("t_codes")) {
      // Alte komplexe Struktur - Fallback
      console.log(`[EPPO Import] Nutze alte Struktur mit t_codes`);
      remoteDb.exec({
        sql: `
          SELECT UPPER(TRIM(c.eppocode)) AS code, TRIM(n.fullname) AS name
          FROM t_codes c
          JOIN t_names n ON c.codeid = n.codeid
          WHERE n.codelang = 'de' AND n.fullname IS NOT NULL
          ORDER BY n.fullname
        `,
        callback: (row) => {
          if (!row || !row[0]) return;
          const code = String(row[0]).trim().toUpperCase();
          const name = row[1] ? String(row[1]).trim() : code;
          rows.push({
            code,
            name,
            language: "DE",
            dtcode: null,
            dtLabel: "plant",
            languageLabel: "Deutsch",
            authority: null,
            nameDe: name,
            nameEn: null,
            nameLa: null,
          });
        },
      });
    } else {
      console.error(`[EPPO Import] Keine bekannte Tabellenstruktur gefunden!`);
    }
    uniqueCodeCount = rows.length;
    console.log(`[EPPO Import] ${rows.length} Einträge gelesen`);
  } finally {
    remoteDb.close();
  }

  db.exec("BEGIN TRANSACTION");
  try {
    ensureLookupTables(db);
    db.exec("DELETE FROM lookup_eppo_codes");
    if (rows.length) {
      const stmt = db.prepare(
        `INSERT OR REPLACE INTO lookup_eppo_codes (
          code,
          name,
          language,
          dtcode,
          preferred,
          dt_label,
          language_label,
          authority,
          name_de,
          name_en,
          name_la
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );
      for (const row of rows) {
        stmt
          .bind([
            row.code,
            row.name,
            row.language || "",
            row.dtcode,
            1,
            row.dtLabel,
            row.languageLabel,
            row.authority,
            row.nameDe,
            row.nameEn,
            row.nameLa,
          ])
          .step();
        stmt.reset();
      }
      stmt.finalize();
    }
    setMetaValue("lookup:eppo:lastImport", new Date().toISOString());
    setMetaValue("lookup:eppo:count", String(uniqueCodeCount || rows.length));
    db.exec("COMMIT");
    return { success: true, count: rows.length };
  } catch (error) {
    db.exec("ROLLBACK");
    console.error("EPPO-Lookup-Import fehlgeschlagen", error);
    throw error;
  }
}

async function importLookupBbch(payload = {}) {
  if (!db) throw new Error("Database not initialized");
  if (!sqlite3) throw new Error("SQLite not initialized");

  const { data } = payload;
  if (!data) {
    throw new Error("Keine Daten zum Importieren übergeben");
  }

  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  console.log(`[BBCH Import] Lade Datenbank, ${bytes.length} bytes`);
  const remoteDb = openDatabaseFromBytes(bytes);
  const rows = [];

  try {
    // Prüfe welche Tabellen existieren
    const tables = [];
    remoteDb.exec({
      sql: `SELECT name FROM sqlite_master WHERE type='table'`,
      callback: (row) => {
        if (row && row[0]) tables.push(row[0]);
      },
    });
    console.log(`[BBCH Import] Gefundene Tabellen:`, tables);

    // Neue einfache deutsche Struktur: Tabelle "bbch" mit code + label + stage_group
    if (tables.includes("bbch")) {
      console.log(`[BBCH Import] Nutze neue deutsche Tabelle "bbch"`);
      remoteDb.exec({
        sql: `SELECT code, label, stage_group FROM bbch ORDER BY CAST(code AS INTEGER)`,
        callback: (row) => {
          if (!row || !row[0]) {
            return;
          }
          const code = String(row[0]).trim();
          const label = row[1] ? String(row[1]).trim() : code;
          const stageGroup = row[2] != null ? Number(row[2]) : null;
          rows.push({
            code,
            label,
            principal: stageGroup,
            secondary: null,
            definition: label,
            kind: null,
          });
        },
      });
    } else if (tables.includes("bbch_stage")) {
      // Alte komplexe Struktur - Fallback
      console.log(`[BBCH Import] Nutze alte Struktur mit bbch_stage`);
      remoteDb.exec({
        sql: `SELECT bbch_code, label_de, definition_1, definition_2, principal_stage FROM bbch_stage ORDER BY CAST(bbch_code AS INTEGER)`,
        callback: (row) => {
          if (!row || !row[0]) return;
          const code = String(row[0]).trim();
          // Versuche deutschen Text zu finden
          let label = row[1] || code;
          const def1 = row[2] || "";
          const def2 = row[3] || "";
          if (
            def2.includes("Quelle BBCH") ||
            def2.includes("(G)") ||
            def2.includes("(D)")
          ) {
            label = def2;
          } else if (
            def1.includes("Quelle BBCH") ||
            def1.includes("(G)") ||
            def1.includes("(D)")
          ) {
            label = def1;
          }
          rows.push({
            code,
            label,
            principal: row[4] != null ? Number(row[4]) : null,
            secondary: null,
            definition: label,
            kind: null,
          });
        },
      });
    } else {
      console.error(`[BBCH Import] Keine bekannte Tabellenstruktur gefunden!`);
    }
    console.log(`[BBCH Import] ${rows.length} Einträge gelesen`);
  } finally {
    remoteDb.close();
  }

  db.exec("BEGIN TRANSACTION");
  try {
    ensureLookupTables(db);
    db.exec("DELETE FROM lookup_bbch_stages");
    if (rows.length) {
      const stmt = db.prepare(
        `INSERT OR REPLACE INTO lookup_bbch_stages
        (code, label, principal_stage, secondary_stage, definition, kind)
        VALUES (?, ?, ?, ?, ?, ?)`
      );
      for (const row of rows) {
        stmt
          .bind([
            row.code,
            row.label,
            row.principal,
            row.secondary,
            row.definition || null,
            row.kind,
          ])
          .step();
        stmt.reset();
      }
      stmt.finalize();
    }
    setMetaValue("lookup:bbch:lastImport", new Date().toISOString());
    setMetaValue("lookup:bbch:count", String(rows.length));
    db.exec("COMMIT");
    return { success: true, count: rows.length };
  } catch (error) {
    db.exec("ROLLBACK");
    console.error("BBCH-Lookup-Import fehlgeschlagen", error);
    throw error;
  }
}

function searchEppoCodes(params = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureLookupTables(db);

  const query = (params.query || "").trim();
  const limit = Math.min(Math.max(Number(params.limit) || 10, 1), 50);
  const offset = Math.max(Number(params.offset) || 0, 0);
  const languageParam = (params.language || "").trim().toUpperCase();
  const hasLanguageFilter = languageParam.length > 0;
  const results = [];

  // DEBUG: Zeige was in der DB ist
  const totalCount =
    db.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes") || 0;
  console.log(
    `[EPPO Search] Suche: "${query}", Sprache: "${languageParam}", hasLanguageFilter: ${hasLanguageFilter}`
  );
  console.log(
    `[EPPO Search] Gesamt ${totalCount} Einträge in lookup_eppo_codes`
  );
  if (query && totalCount > 0) {
    const likeTerm = `%${query.toUpperCase()}%`;
    const matchCount =
      db.selectValue(
        `SELECT COUNT(*) FROM lookup_eppo_codes WHERE UPPER(name) LIKE ? OR UPPER(IFNULL(name_de, '')) LIKE ?`,
        [likeTerm, likeTerm]
      ) || 0;
    console.log(`[EPPO Search] ${matchCount} Treffer für "${query}"`);
    // Zeige erste 3 Einträge als Beispiel
    const samples = [];
    db.exec({
      sql: `SELECT code, name, language, name_de FROM lookup_eppo_codes LIMIT 3`,
      callback: (row) => {
        if (row)
          samples.push({
            code: row[0],
            name: row[1],
            lang: row[2],
            name_de: row[3],
          });
      },
    });
    console.log(`[EPPO Search] Beispiel-Einträge:`, samples);
  }

  if (hasLanguageFilter && languageParam === "DE") {
    return searchGermanEppoCodes({ query, limit, offset });
  }

  const selectClause = `
    SELECT
      code,
      name,
      dtcode,
      language,
      dt_label,
      language_label,
      authority,
      name_de,
      name_en,
      name_la
    FROM lookup_eppo_codes
  `;

  const languageCondition = "UPPER(IFNULL(language, '')) = ?";
  const appendLanguageFilter = (binds) => {
    if (hasLanguageFilter) {
      binds.push(languageParam);
    }
  };

  if (!query) {
    const whereClause = hasLanguageFilter ? `WHERE ${languageCondition}` : "";
    const rowBinds = [];
    appendLanguageFilter(rowBinds);
    rowBinds.push(limit, offset);

    db.exec({
      sql: `${selectClause}
        ${whereClause}
        ORDER BY name
        LIMIT ? OFFSET ?
      `,
      bind: rowBinds,
      callback: (row) => {
        results.push({
          code: row[0],
          name: row[1],
          dtcode: row[2] || null,
          language: row[3] || null,
          dtLabel: row[4] || null,
          languageLabel: row[5] || null,
          authority: row[6] || null,
          nameDe: row[7] || null,
          nameEn: row[8] || null,
          nameLa: row[9] || null,
        });
      },
    });

    const totalQuery = hasLanguageFilter
      ? `SELECT COUNT(*) FROM lookup_eppo_codes WHERE ${languageCondition}`
      : "SELECT COUNT(*) FROM lookup_eppo_codes";
    const totalBinds = [];
    appendLanguageFilter(totalBinds);
    const total = Number(db.selectValue(totalQuery, totalBinds)) || 0;
    return { rows: results, total };
  }

  const upper = query.toUpperCase();
  const likeTerm = `%${upper}%`;

  // Suche auch in name_de für deutsche Begriffe wie "Kartoffel", "Salat" etc.
  const whereParts = [
    "(code LIKE ? OR UPPER(name) LIKE ? OR UPPER(IFNULL(name_de, '')) LIKE ?)",
  ];
  if (hasLanguageFilter) {
    whereParts.push(languageCondition);
  }
  const whereClause = `WHERE ${whereParts.join(" AND ")}`;

  const totalBinds = [likeTerm, likeTerm, likeTerm];
  appendLanguageFilter(totalBinds);
  const total =
    Number(
      db.selectValue(
        `SELECT COUNT(*) FROM lookup_eppo_codes ${whereClause}`,
        totalBinds
      )
    ) || 0;

  const rowBinds = [likeTerm, likeTerm, likeTerm];
  appendLanguageFilter(rowBinds);
  const orderBinds = [`${upper}%`, likeTerm];
  const paginationBinds = [limit, offset];

  db.exec({
    sql: `${selectClause}
      ${whereClause}
      ORDER BY CASE WHEN code LIKE ? THEN 0 ELSE 1 END,
               CASE WHEN UPPER(IFNULL(name_de, '')) LIKE ? THEN 0 ELSE 1 END,
               name
      LIMIT ? OFFSET ?
    `,
    bind: [...rowBinds, ...orderBinds, ...paginationBinds],
    callback: (row) => {
      results.push({
        code: row[0],
        name: row[1],
        dtcode: row[2] || null,
        language: row[3] || null,
        dtLabel: row[4] || null,
        languageLabel: row[5] || null,
        authority: row[6] || null,
        nameDe: row[7] || null,
        nameEn: row[8] || null,
        nameLa: row[9] || null,
      });
    },
  });

  return { rows: results, total };
}

function searchGermanEppoCodes(params = {}) {
  const query = (params.query || "").trim();
  const limit = Math.min(Math.max(Number(params.limit) || 10, 1), 50);
  const offset = Math.max(Number(params.offset) || 0, 0);
  const results = [];
  const germanSourceSql = getGermanLookupSelectSql();
  const germanTable = `(${germanSourceSql}) AS german_lookup`;

  if (!query) {
    db.exec({
      sql: `
        SELECT code, name, dtcode, language, dt_label, language_label, authority, name_de, name_en, name_la
        FROM ${germanTable}
        ORDER BY name
        LIMIT ? OFFSET ?
      `,
      bind: [limit, offset],
      callback: (row) => {
        if (!row) {
          return;
        }
        results.push({
          code: row[0],
          name: row[1],
          dtcode: row[2] || null,
          language: row[3] || "DE",
          dtLabel: row[4] || null,
          languageLabel: row[5] || "Deutsch",
          authority: row[6] || null,
          nameDe: row[7] || null,
          nameEn: row[8] || null,
          nameLa: row[9] || null,
        });
      },
    });
    const total =
      Number(
        db.selectValue(
          `SELECT COUNT(*) FROM (${germanSourceSql}) AS german_lookup`
        )
      ) || 0;
    return { rows: results, total };
  }

  const upper = query.toUpperCase();
  const likeTerm = `%${upper}%`;
  const total =
    Number(
      db.selectValue(
        `SELECT COUNT(*) FROM ${germanTable} WHERE code LIKE ? OR UPPER(name) LIKE ?`,
        [likeTerm, likeTerm]
      )
    ) || 0;

  const rowBinds = [likeTerm, likeTerm, `${upper}%`, limit, offset];

  db.exec({
    sql: `
      SELECT code, name, dtcode, language, dt_label, language_label, authority, name_de, name_en, name_la
      FROM ${germanTable}
      WHERE code LIKE ? OR UPPER(name) LIKE ?
      ORDER BY CASE WHEN code LIKE ? THEN 0 ELSE 1 END, name
      LIMIT ? OFFSET ?
    `,
    bind: rowBinds,
    callback: (row) => {
      if (!row) {
        return;
      }
      results.push({
        code: row[0],
        name: row[1],
        dtcode: row[2] || null,
        language: row[3] || "DE",
        dtLabel: row[4] || null,
        languageLabel: row[5] || "Deutsch",
        authority: row[6] || null,
        nameDe: row[7] || null,
        nameEn: row[8] || null,
        nameLa: row[9] || null,
      });
    },
  });

  return { rows: results, total };
}

function listLookupLanguages() {
  if (!db) throw new Error("Database not initialized");
  ensureLookupTables(db);

  const languages = [];
  db.exec({
    sql: `
      SELECT
        UPPER(IFNULL(language, '')) AS language_code,
        MAX(language_label) AS language_label,
        COUNT(*) AS entry_count
      FROM lookup_eppo_codes
      GROUP BY UPPER(IFNULL(language, ''))
      ORDER BY CASE WHEN language_code = '' THEN 0 ELSE 1 END, language_code;
    `,
    callback: (row) => {
      if (!row) {
        return;
      }
      const language = row[0] ? String(row[0]).trim().toUpperCase() : "";
      const label = row[1] ? String(row[1]).trim() : null;
      const count = row[2] != null ? Number(row[2]) : 0;
      languages.push({ language, label, count });
    },
  });

  const germanCount =
    Number(
      db.selectValue(
        `SELECT COUNT(*) FROM (${getGermanLookupSelectSql()}) AS german_lookup`
      )
    ) || 0;
  if (germanCount > 0) {
    const existingGerman = languages.find(
      (entry) => (entry.language || "").toUpperCase() === "DE"
    );
    if (existingGerman) {
      const normalizedLabel = existingGerman.label
        ? existingGerman.label.trim()
        : "";
      existingGerman.label = normalizedLabel || "Deutsch";
      existingGerman.count = germanCount;
    } else {
      languages.push({ language: "DE", label: "Deutsch", count: germanCount });
    }
  }

  languages.sort((a, b) => {
    const score = (code) => (code === "" ? 0 : 1);
    const delta = score(a.language || "") - score(b.language || "");
    if (delta !== 0) {
      return delta;
    }
    return (a.language || "").localeCompare(b.language || "");
  });

  return languages.map((entry) => {
    const language = entry.language || "";
    const label =
      entry.label && entry.label.length
        ? entry.label
        : language || "Ohne Sprachcode";
    return {
      language,
      label,
      count: entry.count,
    };
  });
}

function getGermanLookupSelectSql() {
  return `
    SELECT
      code,
      name,
      dtcode,
      language,
      dt_label,
      language_label,
      authority,
      name_de,
      name_en,
      name_la
    FROM lookup_eppo_codes
    WHERE UPPER(IFNULL(language, '')) = 'DE'
    UNION ALL
    SELECT
      code,
      name_de AS name,
      dtcode,
      'DE' AS language,
      dt_label,
      'Deutsch' AS language_label,
      authority,
      name_de,
      name_en,
      name_la
    FROM lookup_eppo_codes
    WHERE TRIM(IFNULL(name_de, '')) <> ''
      AND UPPER(IFNULL(language, '')) <> 'DE'
  `;
}

function searchBbchStages(params = {}) {
  if (!db) throw new Error("Database not initialized");
  ensureLookupTables(db);

  const query = (params.query || "").trim();
  const limit = Math.min(Math.max(Number(params.limit) || 10, 1), 50);
  const offset = Math.max(Number(params.offset) || 0, 0);
  const results = [];
  const orderClause = "ORDER BY label";

  if (!query) {
    db.exec({
      sql: `
        SELECT code, label, principal_stage, secondary_stage, definition, kind
        FROM lookup_bbch_stages
        ${orderClause}
        LIMIT ? OFFSET ?
      `,
      bind: [limit, offset],
      callback: (row) => {
        results.push({
          code: row[0],
          label: row[1],
          principalStage: row[2] != null ? Number(row[2]) : null,
          secondaryStage: row[3] != null ? Number(row[3]) : null,
          definition: row[4] || null,
          kind: row[5] || null,
        });
      },
    });
    const total =
      Number(db.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages")) || 0;
    return { rows: results, total };
  }

  const likeTerm = `%${query.toUpperCase()}%`;
  // Suche auch in definition für deutsche Begriffe wie "Blüte", "Keimblatt" etc.
  const total =
    Number(
      db.selectValue(
        `SELECT COUNT(*) FROM lookup_bbch_stages WHERE code LIKE ? OR UPPER(label) LIKE ? OR UPPER(IFNULL(definition, '')) LIKE ?`,
        [likeTerm, likeTerm, likeTerm]
      )
    ) || 0;
  db.exec({
    sql: `
      SELECT code, label, principal_stage, secondary_stage, definition, kind
      FROM lookup_bbch_stages
      WHERE code LIKE ? OR UPPER(label) LIKE ? OR UPPER(IFNULL(definition, '')) LIKE ?
      ORDER BY 
        CASE WHEN code LIKE ? THEN 0 ELSE 1 END,
        CASE WHEN UPPER(IFNULL(definition, '')) LIKE ? THEN 0 ELSE 1 END,
        label
      LIMIT ? OFFSET ?
    `,
    bind: [likeTerm, likeTerm, likeTerm, likeTerm, likeTerm, limit, offset],
    callback: (row) => {
      results.push({
        code: row[0],
        label: row[1],
        principalStage: row[2] != null ? Number(row[2]) : null,
        secondaryStage: row[3] != null ? Number(row[3]) : null,
        definition: row[4] || null,
        kind: row[5] || null,
      });
    },
  });

  return { rows: results, total };
}

function getLookupStats() {
  if (!db) throw new Error("Database not initialized");
  ensureLookupTables(db);

  const eppoCount =
    Number(db.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes")) || 0;
  const bbchCount =
    Number(db.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages")) || 0;

  return {
    eppo: {
      count: eppoCount,
      lastImport: getMetaValue("lookup:eppo:lastImport"),
    },
    bbch: {
      count: bbchCount,
      lastImport: getMetaValue("lookup:bbch:lastImport"),
    },
  };
}
