(function(){"use strict";let N=null,t=null,j=!1,$="memory";const re="https://cdn.jsdelivr.net/npm/@sqlite.org/sqlite-wasm@3.46.1-build1/sqlite-wasm/jswasm/",w="gps_active_point";function P(e,n=50,s=500){const a=Number(e);return!Number.isFinite(a)||a<=0?n:Math.min(Math.max(1,Math.floor(a)),s)}function Se(e){if(typeof e!="string")return null;try{return JSON.parse(e)}catch(n){return console.warn("Failed to parse payload JSON",n),null}}function le(e=t){e&&e.exec(`
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
  `)}function A(e,n,s){if(!e)return!1;const a=`SELECT 1 FROM pragma_table_info('${n}') WHERE name = '${s}' LIMIT 1`;return!!e.selectValue(a)}function C(e,n){if(!e||!n)return!1;const s=`SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = '${n}' LIMIT 1`;return!!e.selectValue(s)}function Ne(e=t){e&&(A(e,"mediums","zulassungsnummer")||e.exec("ALTER TABLE mediums ADD COLUMN zulassungsnummer TEXT"))}function W(e=t){if(e){if(!A(e,"mediums","wartezeit"))try{e.exec("ALTER TABLE mediums ADD COLUMN wartezeit TEXT"),console.log("[DB] Added wartezeit column to mediums")}catch(n){console.warn("[DB] Could not add wartezeit column:",n.message)}if(!A(e,"mediums","wirkstoff"))try{e.exec("ALTER TABLE mediums ADD COLUMN wirkstoff TEXT"),console.log("[DB] Added wirkstoff column to mediums")}catch(n){console.warn("[DB] Could not add wirkstoff column:",n.message)}}}function X(e=t){if(!e)return;const n=()=>{e.exec("DROP TABLE IF EXISTS lookup_eppo_codes"),e.exec(`
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
    `)};A(e,"lookup_eppo_codes","language")?e.exec(`
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
    `):n(),e.exec(`
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
  `);const s=[{name:"dt_label",type:"TEXT"},{name:"language_label",type:"TEXT"},{name:"authority",type:"TEXT"},{name:"name_de",type:"TEXT"},{name:"name_en",type:"TEXT"},{name:"name_la",type:"TEXT"}];for(const a of s)A(e,"lookup_eppo_codes",a.name)||e.exec(`ALTER TABLE lookup_eppo_codes ADD COLUMN ${a.name} ${a.type}`)}function v(e=t){e&&e.exec(`
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
  `)}function F(e=t){e&&e.exec(`
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
  `)}function Le(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`archive_${Date.now()}_${Math.random().toString(16).slice(2)}`}function oe(e){if(!e||typeof e!="object")return null;const n=e.id?String(e.id):Le(),s=e.archivedAt||e.archived_at||new Date().toISOString(),a=e.startDate||e.start_date||null,i=e.endDate||e.end_date||null,r=Number(e.entryCount??e.entry_count??0)||0,l=e.fileName||e.file_name||"",o=e.storageHint||e.storage_hint||null,u=e.note??e.note_text??null;return{id:n,archivedAt:s,startDate:a,endDate:i,entryCount:r,fileName:l,storageHint:o,note:u,metadata:{...e,id:n,archivedAt:s,startDate:a,endDate:i,entryCount:r,fileName:l,storageHint:o,note:u}}}function Q(e){return{id:e.id,archivedAt:e.archivedAt,startDate:e.startDate??null,endDate:e.endDate??null,entryCount:e.entryCount??0,fileName:e.fileName??"",storageHint:e.storageHint??null,note:e.note??null}}function Z(e=[],n=t){if(F(n),n.exec("DELETE FROM archive_logs"),!Array.isArray(e)||!e.length)return[];const s=n.prepare(`INSERT OR REPLACE INTO archive_logs
      (id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`),a=[];for(const i of e){const r=oe(i);r&&(s.bind([r.id,r.archivedAt,r.startDate,r.endDate,r.entryCount,r.fileName,r.storageHint,r.note,JSON.stringify(r.metadata||i||{})]).step(),s.reset(),a.push(Q(r)))}return s.finalize(),a}function ue(e=t){F(e);const n=[];return e.exec({sql:`SELECT id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json
          FROM archive_logs
          ORDER BY datetime(archived_at) DESC, id DESC`,rowMode:"object",callback:s=>{const a=ee(s);a&&n.push(a)}}),n}function ee(e){if(!e)return null;const n=e.metadata_json?Se(e.metadata_json):null,s=n&&typeof n=="object"?{...n}:{};return s.id=String(e.id),s.archivedAt=e.archived_at||s.archivedAt||new Date().toISOString(),s.startDate=e.start_date??s.startDate??null,s.endDate=e.end_date??s.endDate??null,s.entryCount=Number(e.entry_count??s.entryCount??0)||0,s.fileName=e.file_name||s.fileName||"",s.storageHint=e.storage_hint??s.storageHint??null,s.note=e.note??s.note??null,s}function ce(e=t){const n=ue(e).map(s=>Q(s));z("archives",JSON.stringify({logs:n}),e)}function Ae(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`gps_${Date.now()}_${Math.random().toString(16).slice(2)}`}function te(e){return e?{id:String(e.id),name:e.name!=null?String(e.name):"",description:e.description??null,latitude:Number(e.latitude),longitude:Number(e.longitude),source:e.source??null,created_at:e.created_at||new Date().toISOString(),updated_at:e.updated_at||new Date().toISOString(),nutzflaeche_qm:e.nutzflaeche_qm!=null?Number(e.nutzflaeche_qm):null,kind:e.kind??null}:null}function Re(e){if(!t||!e)return null;let n=null;return t.exec({sql:`SELECT id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind
           FROM gps_points
           WHERE id = ?
           LIMIT 1`,bind:[e],rowMode:"object",callback:s=>{n||(n=te(s))}}),n}async function Ie(){if(!t)throw new Error("Database not initialized");v();const e=[];t.exec({sql:`SELECT id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind
          FROM gps_points
          ORDER BY datetime(updated_at) DESC`,rowMode:"object",callback:s=>{e.push(te(s))}});const n=x(w);return{rows:e,activePointId:n||null}}async function Oe(e={}){if(!t)throw new Error("Database not initialized");v();const{cursor:n=null,limit:s,pageSize:a,search:i,includeTotal:r=!1}=e||{},l=P(a??s,100,500),o=typeof i=="string"?i.trim():"",u=[],c=[];if(o){u.push("(LOWER(name) LIKE LOWER(?) OR LOWER(COALESCE(description, '')) LIKE LOWER(?))");const d=`%${o}%`;c.push(d,d)}const E=[...u],p=[...c];if(n&&n.updatedAt){const d=n.id!=null?String(n.id):"",_=n.updatedAt;E.push(`(
      datetime(updated_at) < datetime(?)
      OR (datetime(updated_at) = datetime(?) AND id > ?)
    )`),p.push(_,_,d)}const T=E.length?`WHERE ${E.join(" AND ")}`:"",S=t.prepare(`SELECT rowid AS cursor_rowid, id, name, description, latitude, longitude, source, created_at, updated_at
     FROM gps_points
     ${T}
     ORDER BY datetime(updated_at) DESC, id ASC
     LIMIT ?`);S.bind([...p,l+1]);const b=[];for(;S.step();)b.push(S.getAsObject());S.finalize();const O=b.length>l,L=O?b.slice(0,l):b,k=L.map(d=>te(d)).filter(d=>d!==null),m=L.length?L[L.length-1]:null,I=O&&m?{id:String(m.id??""),updatedAt:m.updated_at||m.updatedAt||null,rowid:Number(m.cursor_rowid)||Number(m.rowid||0)}:null;let h;if(r){const d=u.length?`WHERE ${u.join(" AND ")}`:"",_=t.prepare(`SELECT COUNT(*) AS total FROM gps_points ${d}`);if(c.length&&_.bind(c),_.step()){const g=_.getAsObject();h=Number(g?.total)||0}else h=0;_.finalize()}const R=x(w);return{items:k,nextCursor:I,hasMore:O,pageSize:l,activePointId:R||null,totalCount:h}}async function ke(e={}){if(!t)throw new Error("Database not initialized");v();const n=String(e.id||Ae()),s=String(e.name??"").trim();if(!s)throw new Error("GPS-Punkt benötigt einen Namen.");const a=Number(e.latitude),i=Number(e.longitude);if(!Number.isFinite(a)||!Number.isFinite(i))throw new Error("GPS-Punkt hat ungültige Koordinaten.");const r=e.description!=null?String(e.description):null,l=e.source!=null?String(e.source):null,o=e.nutzflaecheQm??e.nutzflaeche_qm??null,u=o!=null&&Number.isFinite(Number(o))?Number(o):null,c=e.kind!=null?String(e.kind):null,E=new Date().toISOString();if(t.selectValue("SELECT 1 FROM gps_points WHERE id = ? LIMIT 1",[n])){const S=t.prepare(`UPDATE gps_points
       SET name = ?, description = ?, latitude = ?, longitude = ?, source = ?, nutzflaeche_qm = ?, kind = ?, updated_at = ?
       WHERE id = ?`);S.bind([s,r,a,i,l,u,c,E,n]),S.step(),S.finalize()}else{const S=t.prepare(`INSERT INTO gps_points (id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);S.bind([n,s,r,a,i,l,E,E,u,c]),S.step(),S.finalize()}const T=Re(n);if(!T)throw new Error("GPS-Punkt konnte nicht gelesen werden.");return T}async function Ce(e={}){if(!t)throw new Error("Database not initialized");v();const n=String(e.id??"").trim();if(!n)throw new Error("ID für GPS-Punkt fehlt.");const s=t.prepare("DELETE FROM gps_points WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),x(w)===n&&ge(w),{success:!0}}async function Me(e={}){if(!t)throw new Error("Database not initialized");v();const n=e&&typeof e.id=="string"?e.id.trim():null;if(n){if(!t.selectValue("SELECT 1 FROM gps_points WHERE id = ? LIMIT 1",[n]))throw new Error("GPS-Punkt wurde nicht gefunden.");return z(w,n),{activePointId:n}}return ge(w),{activePointId:null}}async function ye(){if(!t)throw new Error("Database not initialized");return{activePointId:x(w)||null}}function D(e=t){e&&e.exec(`
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
  `)}function U(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`km_${Date.now()}_${Math.random().toString(16).slice(2)}`}function de(e){return e?{id:String(e.id),kultur:e.kultur!=null?String(e.kultur):"",anbau:e.anbau??null,problem:e.problem??null,mittelName:e.mittel_name!=null?String(e.mittel_name):"",kennr:e.kennr??null,wirkstoff:e.wirkstoff??null,eppoCode:e.eppo_code??null,bbchDefault:e.bbch_default??null,bbch:e.bbch??null,wartezeit:e.wartezeit??null,aufwandWert:e.aufwand_wert??null,aufwandEinheit:e.aufwand_einheit??null,aufwandBezug:e.aufwand_bezug??null,maxAnwendungen:e.max_anwendungen??null,bemerkung:e.bemerkung??null,istPsm:e.ist_psm?1:0,istKupfer:e.ist_kupfer?1:0,sortOrder:e.sort_order!=null?Number(e.sort_order):0,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}async function De(){if(!t)throw new Error("Database not initialized");D();const e=[];return t.exec({sql:`SELECT kultur, anbau, COUNT(*) AS anzahl,
                 MAX(eppo_code) AS eppo_code, MAX(bbch_default) AS bbch_default
          FROM kultur_mittel
          GROUP BY kultur, anbau
          ORDER BY kultur COLLATE NOCASE, anbau`,rowMode:"object",callback:n=>{e.push({kultur:n.kultur!=null?String(n.kultur):"",anbau:n.anbau??null,anzahl:n.anzahl!=null?Number(n.anzahl):0,eppoCode:n.eppo_code??null,bbchDefault:n.bbch_default??null})}}),{rows:e}}async function ve(e={}){if(!t)throw new Error("Database not initialized");D();const n=e&&e.kultur!=null?String(e.kultur):null,s=e&&e.anbau!=null?String(e.anbau):null,a=[],i=[];n&&(a.push("kultur = ?"),i.push(n)),s&&(a.push("anbau = ?"),i.push(s));const r=a.length?`WHERE ${a.join(" AND ")}`:"",l=[];return t.exec({sql:`SELECT * FROM kultur_mittel ${r}
          ORDER BY sort_order, mittel_name COLLATE NOCASE`,bind:i,rowMode:"object",callback:o=>l.push(de(o))}),{rows:l}}async function ze(e={}){if(!t)throw new Error("Database not initialized");D();const n=String(e.id||U()),s=String(e.kultur??"").trim(),a=String(e.mittelName??e.mittel_name??"").trim();if(!s||!a)throw new Error("kultur und mittel_name sind erforderlich.");const i=new Date().toISOString(),r={anbau:e.anbau!=null?String(e.anbau):null,problem:e.problem!=null?String(e.problem):null,kennr:e.kennr!=null?String(e.kennr):null,wirkstoff:e.wirkstoff!=null?String(e.wirkstoff):null,wartezeit:e.wartezeit!=null?String(e.wartezeit):null,aufwand_wert:e.aufwandWert??e.aufwand_wert!=null?String(e.aufwandWert??e.aufwand_wert):null,aufwand_einheit:e.aufwandEinheit??e.aufwand_einheit!=null?String(e.aufwandEinheit??e.aufwand_einheit):null,aufwand_bezug:e.aufwandBezug??e.aufwand_bezug!=null?String(e.aufwandBezug??e.aufwand_bezug):null,max_anwendungen:e.maxAnwendungen!=null?String(e.maxAnwendungen):null,bemerkung:e.bemerkung!=null?String(e.bemerkung):null,ist_psm:e.istPsm===0||e.ist_psm===0||e.istPsm===!1?0:1,ist_kupfer:e.istKupfer||e.ist_kupfer?1:0,sort_order:Number.isFinite(Number(e.sortOrder??e.sort_order))?Number(e.sortOrder??e.sort_order):0};if(t.selectValue("SELECT 1 FROM kultur_mittel WHERE id = ? LIMIT 1",[n])){const u=t.prepare("UPDATE kultur_mittel SET kultur=?, anbau=?, problem=?, mittel_name=?, kennr=?, wirkstoff=?, wartezeit=?, aufwand_wert=?, aufwand_einheit=?, aufwand_bezug=?, max_anwendungen=?, bemerkung=?, ist_psm=?, ist_kupfer=?, sort_order=?, updated_at=? WHERE id=?");u.bind([s,r.anbau,r.problem,a,r.kennr,r.wirkstoff,r.wartezeit,r.aufwand_wert,r.aufwand_einheit,r.aufwand_bezug,r.max_anwendungen,r.bemerkung,r.ist_psm,r.ist_kupfer,r.sort_order,i,n]),u.step(),u.finalize()}else{const u=t.prepare("INSERT INTO kultur_mittel (id, kultur, anbau, problem, mittel_name, kennr, wirkstoff, wartezeit, aufwand_wert, aufwand_einheit, aufwand_bezug, max_anwendungen, bemerkung, ist_psm, ist_kupfer, sort_order, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");u.bind([n,s,r.anbau,r.problem,a,r.kennr,r.wirkstoff,r.wartezeit,r.aufwand_wert,r.aufwand_einheit,r.aufwand_bezug,r.max_anwendungen,r.bemerkung,r.ist_psm,r.ist_kupfer,r.sort_order,i,i]),u.step(),u.finalize()}let o=null;return t.exec({sql:"SELECT * FROM kultur_mittel WHERE id = ? LIMIT 1",bind:[n],rowMode:"object",callback:u=>{o||(o=de(u))}}),o}async function we(e={}){if(!t)throw new Error("Database not initialized");D();const n=String(e.id??"").trim();if(!n)throw new Error("ID fehlt.");const s=t.prepare("DELETE FROM kultur_mittel WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}async function Xe(e={}){if(!t)throw new Error("Database not initialized");v(),D();const n=new Date().toISOString(),s={gpsPoints:0,kulturMittel:0},a=Array.isArray(e.gpsPoints)?e.gpsPoints:[];if(a.length&&(t.selectValue("SELECT COUNT(*) FROM gps_points")||0)===0){t.exec("BEGIN TRANSACTION");try{const r=t.prepare(`INSERT INTO gps_points (id,name,description,latitude,longitude,source,created_at,updated_at,nutzflaeche_qm,kind)
         VALUES (?,?,?,?,?,?,?,?,?,?)`);for(const l of a)r.bind([String(l.id),String(l.name??""),l.description??null,Number(l.latitude),Number(l.longitude),l.source??null,l.created_at||n,l.updated_at||n,l.nutzflaeche_qm!=null?Number(l.nutzflaeche_qm):null,l.kind??null]),r.step(),r.reset();r.finalize(),t.exec("COMMIT"),s.gpsPoints=a.length}catch(r){throw t.exec("ROLLBACK"),r}}const i=Array.isArray(e.kulturMittel)?e.kulturMittel:[];if(i.length&&(t.selectValue("SELECT COUNT(*) FROM kultur_mittel")||0)===0){t.exec("BEGIN TRANSACTION");try{const r=t.prepare(`INSERT INTO kultur_mittel (id,kultur,anbau,problem,mittel_name,kennr,wirkstoff,eppo_code,bbch_default,bbch,wartezeit,aufwand_wert,aufwand_einheit,aufwand_bezug,max_anwendungen,bemerkung,ist_psm,ist_kupfer,sort_order,created_at,updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);for(const l of i)r.bind([String(l.id),String(l.kultur??""),l.anbau??null,l.problem??null,String(l.mittel_name??""),l.kennr??null,l.wirkstoff??null,l.eppo_code??null,l.bbch_default??null,l.bbch??null,l.wartezeit??null,l.aufwand_wert??null,l.aufwand_einheit??null,l.aufwand_bezug??null,l.max_anwendungen??null,l.bemerkung??null,l.ist_psm!=null?Number(l.ist_psm):1,l.ist_kupfer!=null?Number(l.ist_kupfer):0,l.sort_order!=null?Number(l.sort_order):0,l.created_at||n,l.updated_at||n]),r.step(),r.reset();r.finalize(),t.exec("COMMIT"),s.kulturMittel=i.length}catch(r){throw t.exec("ROLLBACK"),r}}return s}async function xe(){if(!t)throw new Error("Database not initialized");D();const e=[];return t.exec({sql:`SELECT mittel_name, kennr, MAX(wirkstoff) AS wirkstoff,
            (SELECT k2.aufwand_einheit FROM kultur_mittel k2
               WHERE k2.mittel_name = k.mittel_name
                 AND IFNULL(k2.kennr,'') = IFNULL(k.kennr,'')
                 AND k2.aufwand_einheit IS NOT NULL AND k2.aufwand_einheit <> ''
               GROUP BY k2.aufwand_einheit ORDER BY COUNT(*) DESC LIMIT 1) AS einheit
          FROM kultur_mittel k
          GROUP BY mittel_name, kennr
          ORDER BY mittel_name COLLATE NOCASE`,rowMode:"object",callback:n=>{e.push({name:n.mittel_name!=null?String(n.mittel_name):"",kennr:n.kennr??null,wirkstoff:n.wirkstoff??null,einheit:n.einheit??null})}}),{rows:e}}function V(e=t){e&&e.exec(`
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
  `)}function me(e){if(!e)return null;let n=[];try{n=e.geojson?JSON.parse(e.geojson):[]}catch{n=[]}return{id:String(e.id),name:e.name!=null?String(e.name):"",kultur:e.kultur??null,eppoCode:e.eppo_code??null,standortId:e.standort_id??null,color:e.color??null,latlngs:n,areaQm:e.area_qm!=null?Number(e.area_qm):0,bedW:e.bed_w!=null?Number(e.bed_w):null,pathW:e.path_w!=null?Number(e.path_w):null,rowSp:e.row_sp!=null?Number(e.row_sp):null,inRowSp:e.in_row_sp!=null?Number(e.in_row_sp):null,angle:e.angle!=null?Number(e.angle):0,beds:e.beds!=null?Number(e.beds):0,bedMeters:e.bed_meters!=null?Number(e.bed_meters):0,plants:e.plants!=null?Number(e.plants):0,bemerkung:e.bemerkung??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}}async function Fe(){if(!t)throw new Error("Database not initialized");V();const e=[];return t.exec({sql:"SELECT * FROM ackerflaechen ORDER BY datetime(created_at) ASC",rowMode:"object",callback:n=>e.push(me(n))}),{rows:e}}async function Ue(e={}){if(!t)throw new Error("Database not initialized");V();const n=String(e.id||U()),s=String(e.name??"").trim()||"Fläche",a=new Date().toISOString(),i=JSON.stringify(Array.isArray(e.latlngs)?e.latlngs:[]),r=c=>c!=null&&Number.isFinite(Number(c))?Number(c):null,l=[s,e.kultur!=null?String(e.kultur):null,e.eppoCode!=null?String(e.eppoCode):null,e.standortId!=null?String(e.standortId):null,e.color!=null?String(e.color):null,i,r(e.areaQm),r(e.bedW),r(e.pathW),r(e.rowSp),r(e.inRowSp),r(e.angle),r(e.beds),r(e.bedMeters),r(e.plants),e.bemerkung!=null?String(e.bemerkung):null];if(t.selectValue("SELECT 1 FROM ackerflaechen WHERE id = ? LIMIT 1",[n])){const c=t.prepare("UPDATE ackerflaechen SET name=?, kultur=?, eppo_code=?, standort_id=?, color=?, geojson=?, area_qm=?, bed_w=?, path_w=?, row_sp=?, in_row_sp=?, angle=?, beds=?, bed_meters=?, plants=?, bemerkung=?, updated_at=? WHERE id=?");c.bind([...l,a,n]),c.step(),c.finalize()}else{const c=t.prepare("INSERT INTO ackerflaechen (name, kultur, eppo_code, standort_id, color, geojson, area_qm, bed_w, path_w, row_sp, in_row_sp, angle, beds, bed_meters, plants, bemerkung, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");c.bind([...l,a,a,n]),c.step(),c.finalize()}let u=null;return t.exec({sql:"SELECT * FROM ackerflaechen WHERE id = ? LIMIT 1",bind:[n],rowMode:"object",callback:c=>{u||(u=me(c))}}),u}async function qe(e={}){if(!t)throw new Error("Database not initialized");V();const n=String(e.id??"").trim();if(!n)throw new Error("ID fehlt.");const s=t.prepare("DELETE FROM ackerflaechen WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}function K(e=t){e&&e.exec(`
    CREATE TABLE IF NOT EXISTS anbau_kultur (
      id TEXT PRIMARY KEY,
      flaeche_typ TEXT NOT NULL,
      flaeche_id TEXT NOT NULL,
      kultur TEXT,
      eppo_code TEXT,
      status TEXT NOT NULL DEFAULT 'geplant',
      pflanz_datum TEXT,
      ernte_datum TEXT,
      color TEXT,
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_anbau_unit ON anbau_kultur(flaeche_typ, flaeche_id);
    CREATE INDEX IF NOT EXISTS idx_anbau_status ON anbau_kultur(status);
    CREATE INDEX IF NOT EXISTS idx_anbau_pflanz ON anbau_kultur(pflanz_datum);
  `)}function q(e=t){e&&e.exec(`
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
  `)}function Ee(e){return e?{id:String(e.id),flaecheTyp:e.flaeche_typ??null,flaecheId:e.flaeche_id!=null?String(e.flaeche_id):null,kultur:e.kultur??null,eppoCode:e.eppo_code??null,status:e.status??"geplant",pflanzDatum:e.pflanz_datum??null,ernteDatum:e.ernte_datum??null,color:e.color??null,notes:e.notes??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}function _e(e){return e?{id:String(e.id),flaecheTyp:e.flaeche_typ??null,flaecheId:e.flaeche_id!=null?String(e.flaeche_id):null,anbauId:e.anbau_id??null,art:e.art??"sonstiges",status:e.status??"geplant",planDatum:e.plan_datum??null,erledigtDatum:e.erledigt_datum??null,menge:e.menge!=null?Number(e.menge):null,einheit:e.einheit??null,mittel:e.mittel??null,historyId:e.history_id!=null?Number(e.history_id):null,notes:e.notes??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}async function Pe(e={}){if(!t)throw new Error("Database not initialized");K();const n=[],s=[];e.flaecheTyp&&(n.push("flaeche_typ = ?"),s.push(String(e.flaecheTyp))),e.flaecheId&&(n.push("flaeche_id = ?"),s.push(String(e.flaecheId))),e.status&&(n.push("status = ?"),s.push(String(e.status)));const a="SELECT * FROM anbau_kultur"+(n.length?" WHERE "+n.join(" AND "):"")+" ORDER BY COALESCE(pflanz_datum, created_at) ASC",i=[];return t.exec({sql:a,bind:s,rowMode:"object",callback:r=>i.push(Ee(r))}),{rows:i}}async function Be(e={}){if(!t)throw new Error("Database not initialized");K();const n=String(e.id||U()),s=new Date().toISOString(),a=[String(e.flaecheTyp||""),String(e.flaecheId||""),e.kultur!=null?String(e.kultur):null,e.eppoCode!=null?String(e.eppoCode):null,String(e.status||"geplant"),e.pflanzDatum!=null?String(e.pflanzDatum):null,e.ernteDatum!=null?String(e.ernteDatum):null,e.color!=null?String(e.color):null,e.notes!=null?String(e.notes):null];if(t.selectValue("SELECT 1 FROM anbau_kultur WHERE id = ? LIMIT 1",[n])){const l=t.prepare("UPDATE anbau_kultur SET flaeche_typ=?, flaeche_id=?, kultur=?, eppo_code=?, status=?, pflanz_datum=?, ernte_datum=?, color=?, notes=?, updated_at=? WHERE id=?");l.bind([...a,s,n]),l.step(),l.finalize()}else{const l=t.prepare("INSERT INTO anbau_kultur (flaeche_typ, flaeche_id, kultur, eppo_code, status, pflanz_datum, ernte_datum, color, notes, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");l.bind([...a,s,s,n]),l.step(),l.finalize()}let r=null;return t.exec({sql:"SELECT * FROM anbau_kultur WHERE id = ? LIMIT 1",bind:[n],rowMode:"object",callback:l=>{r||(r=Ee(l))}}),r}async function He(e={}){if(!t)throw new Error("Database not initialized");K(),q();const n=String(e.id??"").trim();if(!n)throw new Error("ID fehlt.");const s=t.prepare("UPDATE massnahme SET anbau_id = NULL WHERE anbau_id = ?");s.bind([n]),s.step(),s.finalize();const a=t.prepare("DELETE FROM anbau_kultur WHERE id = ?");return a.bind([n]),a.step(),a.finalize(),{success:!0}}async function Ge(e={}){if(!t)throw new Error("Database not initialized");q();const n=[],s=[];e.flaecheTyp&&(n.push("flaeche_typ = ?"),s.push(String(e.flaecheTyp))),e.flaecheId&&(n.push("flaeche_id = ?"),s.push(String(e.flaecheId))),e.anbauId&&(n.push("anbau_id = ?"),s.push(String(e.anbauId))),e.art&&(n.push("art = ?"),s.push(String(e.art))),e.status&&(n.push("status = ?"),s.push(String(e.status))),e.from&&(n.push("COALESCE(plan_datum, erledigt_datum) >= ?"),s.push(String(e.from))),e.to&&(n.push("COALESCE(plan_datum, erledigt_datum) <= ?"),s.push(String(e.to)));const a="SELECT * FROM massnahme"+(n.length?" WHERE "+n.join(" AND "):"")+" ORDER BY COALESCE(plan_datum, erledigt_datum, created_at) ASC",i=[];return t.exec({sql:a,bind:s,rowMode:"object",callback:r=>i.push(_e(r))}),{rows:i}}async function je(e={}){if(!t)throw new Error("Database not initialized");q();const n=String(e.id||U()),s=new Date().toISOString(),a=o=>o!=null&&Number.isFinite(Number(o))?Number(o):null,i=[String(e.flaecheTyp||""),String(e.flaecheId||""),e.anbauId!=null?String(e.anbauId):null,String(e.art||"sonstiges"),String(e.status||"geplant"),e.planDatum!=null?String(e.planDatum):null,e.erledigtDatum!=null?String(e.erledigtDatum):null,a(e.menge),e.einheit!=null?String(e.einheit):null,e.mittel!=null?String(e.mittel):null,a(e.historyId),e.notes!=null?String(e.notes):null];if(t.selectValue("SELECT 1 FROM massnahme WHERE id = ? LIMIT 1",[n])){const o=t.prepare("UPDATE massnahme SET flaeche_typ=?, flaeche_id=?, anbau_id=?, art=?, status=?, plan_datum=?, erledigt_datum=?, menge=?, einheit=?, mittel=?, history_id=?, notes=?, updated_at=? WHERE id=?");o.bind([...i,s,n]),o.step(),o.finalize()}else{const o=t.prepare("INSERT INTO massnahme (flaeche_typ, flaeche_id, anbau_id, art, status, plan_datum, erledigt_datum, menge, einheit, mittel, history_id, notes, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");o.bind([...i,s,s,n]),o.step(),o.finalize()}let l=null;return t.exec({sql:"SELECT * FROM massnahme WHERE id = ? LIMIT 1",bind:[n],rowMode:"object",callback:o=>{l||(l=_e(o))}}),l}async function $e(e={}){if(!t)throw new Error("Database not initialized");q();const n=String(e.id??"").trim();if(!n)throw new Error("ID fehlt.");const s=t.prepare("DELETE FROM massnahme WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}async function We(){if(!t)throw new Error("Database not initialized");q();const e=new Set;t.exec({sql:"SELECT DISTINCT history_id AS h FROM massnahme WHERE history_id IS NOT NULL",rowMode:"object",callback:o=>{o.h!=null&&e.add(Number(o.h))}});const n=new Set;try{t.exec({sql:"SELECT id FROM gps_points WHERE kind = 'gewaechshaus'",rowMode:"object",callback:o=>n.add(String(o.id))})}catch{}const s=new Map;try{t.exec({sql:"SELECT id, standort_id FROM ackerflaechen WHERE standort_id IS NOT NULL",rowMode:"object",callback:o=>{const u=String(o.standort_id);s.has(u)||s.set(u,[]),s.get(u).push(String(o.id))}})}catch{}const a=[];try{t.exec({sql:"SELECT id, date_iso, kultur, gps_point_id FROM history WHERE gps_point_id IS NOT NULL ORDER BY id ASC",rowMode:"object",callback:o=>a.push(o)})}catch{return{imported:0,skipped:0,total:0}}let i=0,r=0;const l=new Date().toISOString();for(const o of a){const u=Number(o.id);if(e.has(u))continue;const c=o.gps_point_id!=null?String(o.gps_point_id):"";let E=null,p=null;if(c&&n.has(c)?(E="haus",p=c):c&&s.has(c)&&s.get(c).length===1&&(E="acker",p=s.get(c)[0]),!E){r++;continue}const T=U(),S=t.prepare("INSERT INTO massnahme (flaeche_typ, flaeche_id, anbau_id, art, status, plan_datum, erledigt_datum, menge, einheit, mittel, history_id, notes, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");S.bind([E,p,null,"chemisch_psm","erledigt",null,o.date_iso||null,null,null,null,u,o.kultur!=null?String(o.kultur):null,l,l,T]),S.step(),S.finalize(),e.add(u),i++}return{imported:i,skipped:r,total:a.length}}function B(e=t){e&&e.exec(`
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
  `)}function ne(e=t){e&&e.exec(`
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
  `)}function y(e=t){e&&e.exec(`
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
  `)}function pe(e){return e?{id:String(e.id),kennr:e.kennr??null,mittelName:e.mittel_name!=null?String(e.mittel_name):"",wirkstoff:e.wirkstoff??null,typ:e.typ||"zugang",menge:e.menge!=null?Number(e.menge):0,einheit:e.einheit??null,datum:e.datum??null,charge:e.charge??null,ablauf:e.ablauf??null,lieferant:e.lieferant??null,preis:e.preis!=null?Number(e.preis):null,bemerkung:e.bemerkung??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}async function Ve(e={}){if(!t)throw new Error("Database not initialized");B();const n=e&&e.kennr!=null?String(e.kennr):null,s=[];return t.exec({sql:`SELECT * FROM lager_bewegungen ${n?"WHERE kennr = ?":""}
          ORDER BY datetime(COALESCE(datum, created_at)) DESC, created_at DESC`,bind:n?[n]:[],rowMode:"object",callback:a=>s.push(pe(a))}),{rows:s}}async function Ke(e={}){if(!t)throw new Error("Database not initialized");B();const n=String(e.id||U()),s=String(e.mittelName??e.mittel_name??"").trim();if(!s)throw new Error("Mittelname ist erforderlich.");const a=Number(e.menge);if(!Number.isFinite(a))throw new Error("Menge ist ungültig.");const i=new Date().toISOString(),r={kennr:e.kennr!=null?String(e.kennr):null,wirkstoff:e.wirkstoff!=null?String(e.wirkstoff):null,typ:e.typ!=null?String(e.typ):"zugang",einheit:e.einheit!=null?String(e.einheit):null,datum:e.datum!=null?String(e.datum):i.slice(0,10),charge:e.charge!=null?String(e.charge):null,ablauf:e.ablauf!=null?String(e.ablauf):null,lieferant:e.lieferant!=null?String(e.lieferant):null,preis:e.preis!=null&&Number.isFinite(Number(e.preis))?Number(e.preis):null,bemerkung:e.bemerkung!=null?String(e.bemerkung):null};if(t.selectValue("SELECT 1 FROM lager_bewegungen WHERE id = ? LIMIT 1",[n])){const u=t.prepare("UPDATE lager_bewegungen SET kennr=?, mittel_name=?, wirkstoff=?, typ=?, menge=?, einheit=?, datum=?, charge=?, ablauf=?, lieferant=?, preis=?, bemerkung=?, updated_at=? WHERE id=?");u.bind([r.kennr,s,r.wirkstoff,r.typ,a,r.einheit,r.datum,r.charge,r.ablauf,r.lieferant,r.preis,r.bemerkung,i,n]),u.step(),u.finalize()}else{const u=t.prepare("INSERT INTO lager_bewegungen (id, kennr, mittel_name, wirkstoff, typ, menge, einheit, datum, charge, ablauf, lieferant, preis, bemerkung, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");u.bind([n,r.kennr,s,r.wirkstoff,r.typ,a,r.einheit,r.datum,r.charge,r.ablauf,r.lieferant,r.preis,r.bemerkung,i,i]),u.step(),u.finalize()}let o=null;return t.exec({sql:"SELECT * FROM lager_bewegungen WHERE id = ? LIMIT 1",bind:[n],rowMode:"object",callback:u=>{o||(o=pe(u))}}),o}async function Ye(e={}){if(!t)throw new Error("Database not initialized");B();const n=String(e.id??"").trim();if(!n)throw new Error("ID fehlt.");const s=t.prepare("DELETE FROM lager_bewegungen WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}async function Je(){if(!t)throw new Error("Database not initialized");B();const e=new Map,n=(i,r)=>i&&String(i).trim()||`name:${String(r||"").toLowerCase().trim()}`,s=(i,r)=>{const l=n(i,r);return e.has(l)||e.set(l,{kennr:i||null,name:r||"",einheit:null,wirkstoff:null,zugang:0,verbraucht:0,bestand:0,zulEnde:null,naechsterAblauf:null,anwendungen:0}),e.get(l)};t.exec({sql:`SELECT kennr, mittel_name, einheit, wirkstoff,
                 SUM(menge) AS zugang, MIN(NULLIF(ablauf,'')) AS naechster_ablauf
          FROM lager_bewegungen GROUP BY kennr, mittel_name`,rowMode:"object",callback:i=>{const r=s(i.kennr,i.mittel_name);r.zugang+=Number(i.zugang)||0,i.einheit&&!r.einheit&&(r.einheit=i.einheit),i.wirkstoff&&!r.wirkstoff&&(r.wirkstoff=i.wirkstoff),i.naechster_ablauf&&(r.naechsterAblauf=i.naechster_ablauf)}}),t.exec({sql:`SELECT zulassungsnummer AS kennr, medium_name, medium_unit, wirkstoff,
                 SUM(calculated_total) AS verbraucht, COUNT(*) AS n
          FROM history_items GROUP BY zulassungsnummer, medium_name`,rowMode:"object",callback:i=>{const r=s(i.kennr,i.medium_name);r.verbraucht+=Number(i.verbraucht)||0,r.anwendungen+=Number(i.n)||0,i.medium_unit&&!r.einheit&&(r.einheit=i.medium_unit),i.wirkstoff&&!r.wirkstoff&&(r.wirkstoff=i.wirkstoff)}});const a=Array.from(e.values());for(const i of a)i.bestand=i.zugang-i.verbraucht;return a.sort((i,r)=>(r.verbraucht||0)-(i.verbraucht||0)),{rows:a}}function H(e=t){e&&e.exec(`
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
  `)}function G(e=t){e&&e.exec(`
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
  `)}function Y(e){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${e}_${Date.now()}_${Math.random().toString(16).slice(2)}`}async function Qe(e={}){if(!t)throw new Error("Database not initialized");H();const{favoritesOnly:n=!1,limit:s=100}=e,a=n?"WHERE is_favorite = 1":"",i=[];return t.exec({sql:`SELECT id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at
          FROM saved_eppo_codes
          ${a}
          ORDER BY is_favorite DESC, usage_count DESC, name ASC
          LIMIT ?`,bind:[s],rowMode:"object",callback:r=>i.push({id:r.id,code:r.code,name:r.name,language:r.language,dtcode:r.dtcode,usageCount:r.usage_count,isFavorite:!!r.is_favorite,createdAt:r.created_at,updatedAt:r.updated_at})}),{items:i}}async function Ze(e={}){if(!t)throw new Error("Database not initialized");H();const n=String(e.code??"").trim(),s=String(e.name??"").trim();if(!n||!s)throw new Error("EPPO-Code und Name sind erforderlich.");const a=e.id||Y("eppo"),i=e.language||null,r=e.dtcode||null,l=e.isFavorite?1:0,o=new Date().toISOString(),u=t.selectValue("SELECT id FROM saved_eppo_codes WHERE code = ? LIMIT 1",[n]);if(u){const c=t.prepare(`
      UPDATE saved_eppo_codes 
      SET name = ?, language = ?, dtcode = ?, is_favorite = ?, updated_at = ?
      WHERE code = ?
    `);return c.bind([s,i,r,l,o,n]),c.step(),c.finalize(),{id:u,code:n,name:s,updated:!0}}else{const c=t.prepare(`
      INSERT INTO saved_eppo_codes (id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)
    `);return c.bind([a,n,s,i,r,l,o,o]),c.step(),c.finalize(),{id:a,code:n,name:s,created:!0}}}async function et(e={}){if(!t)throw new Error("Database not initialized");H();const n=String(e.id??"").trim();if(!n)throw new Error("ID erforderlich.");const s=t.prepare("DELETE FROM saved_eppo_codes WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}async function tt(e={}){if(!t)throw new Error("Database not initialized");H();const n=String(e.code??"").trim(),s=String(e.name??"").trim();if(!n)return{success:!1};const a=new Date().toISOString();if(t.selectValue("SELECT id FROM saved_eppo_codes WHERE code = ? LIMIT 1",[n])){const r=t.prepare(`
      UPDATE saved_eppo_codes SET usage_count = usage_count + 1, updated_at = ? WHERE code = ?
    `);r.bind([a,n]),r.step(),r.finalize()}else if(s){const r=Y("eppo"),l=t.prepare(`
      INSERT INTO saved_eppo_codes (id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
    `);l.bind([r,n,s,e.language||null,e.dtcode||null,a,a]),l.step(),l.finalize()}return{success:!0}}async function nt(e={}){if(!t)throw new Error("Database not initialized");G();const{favoritesOnly:n=!1,limit:s=100}=e,a=n?"WHERE is_favorite = 1":"",i=[];return t.exec({sql:`SELECT id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at
          FROM saved_bbch_stages
          ${a}
          ORDER BY is_favorite DESC, usage_count DESC, code ASC
          LIMIT ?`,bind:[s],rowMode:"object",callback:r=>i.push({id:r.id,code:r.code,label:r.label,principalStage:r.principal_stage,secondaryStage:r.secondary_stage,usageCount:r.usage_count,isFavorite:!!r.is_favorite,createdAt:r.created_at,updatedAt:r.updated_at})}),{items:i}}async function at(e={}){if(!t)throw new Error("Database not initialized");G();const n=String(e.code??"").trim(),s=String(e.label??"").trim();if(!n||!s)throw new Error("BBCH-Code und Bezeichnung sind erforderlich.");const a=e.id||Y("bbch"),i=e.principalStage!=null?Number(e.principalStage):null,r=e.secondaryStage!=null?Number(e.secondaryStage):null,l=e.isFavorite?1:0,o=new Date().toISOString(),u=t.selectValue("SELECT id FROM saved_bbch_stages WHERE code = ? LIMIT 1",[n]);if(u){const c=t.prepare(`
      UPDATE saved_bbch_stages 
      SET label = ?, principal_stage = ?, secondary_stage = ?, is_favorite = ?, updated_at = ?
      WHERE code = ?
    `);return c.bind([s,i,r,l,o,n]),c.step(),c.finalize(),{id:u,code:n,label:s,updated:!0}}else{const c=t.prepare(`
      INSERT INTO saved_bbch_stages (id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)
    `);return c.bind([a,n,s,i,r,l,o,o]),c.step(),c.finalize(),{id:a,code:n,label:s,created:!0}}}async function it(e={}){if(!t)throw new Error("Database not initialized");G();const n=String(e.id??"").trim();if(!n)throw new Error("ID erforderlich.");const s=t.prepare("DELETE FROM saved_bbch_stages WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}async function st(e={}){if(!t)throw new Error("Database not initialized");G();const n=String(e.code??"").trim(),s=String(e.label??"").trim();if(!n)return{success:!1};const a=new Date().toISOString();if(t.selectValue("SELECT id FROM saved_bbch_stages WHERE code = ? LIMIT 1",[n])){const r=t.prepare(`
      UPDATE saved_bbch_stages SET usage_count = usage_count + 1, updated_at = ? WHERE code = ?
    `);r.bind([a,n]),r.step(),r.finalize()}else if(s){const r=Y("bbch"),l=t.prepare(`
      INSERT INTO saved_bbch_stages (id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
    `);l.bind([r,n,s,e.principalStage||null,e.secondaryStage||null,a,a]),l.step(),l.finalize()}return{success:!0}}async function rt(e={}){if(!t)throw new Error("Database not initialized");H();const n=e.limit||10,s=[];return t.exec({sql:`SELECT code, name, language, dtcode, usage_count, is_favorite
          FROM saved_eppo_codes
          WHERE usage_count > 0
          ORDER BY usage_count DESC, name ASC
          LIMIT ?`,bind:[n],rowMode:"object",callback:a=>s.push({code:a.code,name:a.name,language:a.language,dtcode:a.dtcode,usageCount:a.usage_count,isFavorite:!!a.is_favorite})}),{items:s}}async function lt(e={}){if(!t)throw new Error("Database not initialized");G();const n=e.limit||10,s=[];return t.exec({sql:`SELECT code, label, principal_stage, secondary_stage, usage_count, is_favorite
          FROM saved_bbch_stages
          WHERE usage_count > 0
          ORDER BY usage_count DESC, code ASC
          LIMIT ?`,bind:[n],rowMode:"object",callback:a=>s.push({code:a.code,label:a.label,principalStage:a.principal_stage,secondaryStage:a.secondary_stage,usageCount:a.usage_count,isFavorite:!!a.is_favorite})}),{items:s}}function z(e,n,s=t){if(!s||!e)return;const a=s.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)");a.bind([e,typeof n=="string"?n:JSON.stringify(n)]).step(),a.finalize()}function ge(e,n=t){if(!n||!e)return;const s=n.prepare("DELETE FROM meta WHERE key = ?");s.bind([e]).step(),s.finalize()}function x(e,n=t){return!n||!e?null:n.selectValue("SELECT value FROM meta WHERE key = ?",[e])??null}function Te(e){if(!N)throw new Error("SQLite not initialized");const n=new N.oo1.DB(":memory:"),s=N.wasm.scopedAllocPush();try{const a=N.wasm.allocFromTypedArray(e),i=N.wasm.allocCString("main"),r=(N.capi.SQLITE_DESERIALIZE_FREEONCLOSE||0)|(N.capi.SQLITE_DESERIALIZE_RESIZEABLE||0),l=N.capi.sqlite3_deserialize(n.pointer,i,a,e.byteLength,e.byteLength,r);if(l!==N.capi.SQLITE_OK)throw n.close(),new Error(`sqlite3_deserialize failed: ${N.capi.sqlite3_js_rc_str(l)||l}`)}finally{N.wasm.scopedAllocPop(s)}return n}self.onmessage=async function(e){const{id:n,action:s,payload:a}=e.data;try{let i;switch(s){case"init":i=await ot(a);break;case"importSnapshot":i=await ct(a);break;case"exportSnapshot":i=await dt();break;case"upsertMedium":i=await mt(a);break;case"deleteMedium":i=await Et(a);break;case"listMediums":i=await _t();break;case"listMediumsPaged":i=await gt(a);break;case"listHistory":i=await ht(a);break;case"listHistoryPaged":i=await fe(a);break;case"streamHistoryChunk":i=await ft(a);break;case"exportHistoryRange":i=await bt(a);break;case"getHistoryEntry":i=await Pt(a);break;case"appendHistoryEntry":i=await Bt(a);break;case"deleteHistoryEntry":i=await Ht(a);break;case"deleteHistoryRange":i=await St(a);break;case"vacuumDatabase":i=await Nt();break;case"setArchiveLogs":i=await Lt(a);break;case"listArchiveLogs":i=await At(a);break;case"insertArchiveLog":i=await Rt(a);break;case"appendImportLog":i=await It(a);break;case"listImportLog":i=await Ot(a);break;case"appendFoto":i=await kt(a);break;case"listFotos":i=await Ct(a);break;case"getFotoData":i=await Xt(a);break;case"exportFotos":i=await xt();break;case"deleteFoto":i=await Ft(a);break;case"updateFoto":i=await wt(a);break;case"setFotoThumb":i=await Mt(a);break;case"getFotoCounts":i=await yt();break;case"deleteFotosByIds":i=await Dt(a);break;case"bulkUpdateFotoKategorie":i=await vt(a);break;case"exportFotosByIds":i=await zt(a);break;case"clearFotos":i=await Ut();break;case"deleteArchiveLog":i=await qt(a);break;case"exportDB":i=await Gt();break;case"importDB":i=await jt(a);break;case"importLookupEppo":i=await $t(a);break;case"importLookupBbch":i=await Wt(a);break;case"searchEppoCodes":i=await Vt(a);break;case"searchBbchStages":i=await Jt(a);break;case"listLookupLanguages":i=Yt();break;case"getLookupStats":i=await Qt();break;case"listGpsPoints":i=await Ie();break;case"listGpsPointsPaged":i=await Oe(a);break;case"upsertGpsPoint":i=await ke(a);break;case"deleteGpsPoint":i=await Ce(a);break;case"setActiveGpsPointId":i=await Me(a);break;case"getActiveGpsPointId":i=await ye();break;case"listKulturen":i=await De();break;case"listKulturMittel":i=await ve(a);break;case"upsertKulturMittel":i=await ze(a);break;case"deleteKulturMittel":i=await we(a);break;case"seedInitialData":i=await Xe(a);break;case"listLagerBewegungen":i=await Ve(a);break;case"upsertLagerBewegung":i=await Ke(a);break;case"deleteLagerBewegung":i=await Ye(a);break;case"getLagerUebersicht":i=await Je();break;case"listMittelStammdaten":i=await xe();break;case"listAckerflaechen":i=await Fe();break;case"upsertAckerflaeche":i=await Ue(a);break;case"deleteAckerflaeche":i=await qe(a);break;case"listAnbau":i=await Pe(a);break;case"upsertAnbau":i=await Be(a);break;case"deleteAnbau":i=await He(a);break;case"listMassnahmen":i=await Ge(a);break;case"upsertMassnahme":i=await je(a);break;case"deleteMassnahme":i=await $e(a);break;case"importPsmAsMassnahmen":i=await We();break;case"listSavedEppo":i=await Qe(a);break;case"upsertSavedEppo":i=await Ze(a);break;case"deleteSavedEppo":i=await et(a);break;case"incrementEppoUsage":i=await tt(a);break;case"listSavedBbch":i=await nt(a);break;case"upsertSavedBbch":i=await at(a);break;case"deleteSavedBbch":i=await it(a);break;case"incrementBbchUsage":i=await st(a);break;case"getFrequentEppo":i=await rt(a);break;case"getFrequentBbch":i=await lt(a);break;default:throw new Error(`Unknown action: ${s}`)}self.postMessage({id:n,ok:!0,result:i})}catch(i){self.postMessage({id:n,ok:!1,error:i.message||String(i)})}};async function ot(e={}){if(j)return{success:!0,message:"Already initialized"};try{N=await(await import(re+"sqlite3.mjs").then(a=>a.default))({print:console.log,printErr:console.error,locateFile:a=>re+a});const s=e.mode||ut();return t=he(s),$=s,ae(),await ie(),j=!0,{success:!0,mode:s,message:`Database initialized in ${s} mode`}}catch(n){throw console.error("Failed to initialize database:",n),new Error(`Database initialization failed: ${n.message}`)}}function ut(){return typeof N?.opfs<"u"?"opfs":"memory"}function he(e="memory"){return e==="opfs"&&N?.opfs?new N.oo1.OpfsDb("/pflanzenschutz.sqlite"):new N.oo1.DB}function ae(e=t){if(!e)throw new Error("Database not initialized");e.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA temp_store = MEMORY;
    PRAGMA cache_size = -20000;
  `)}async function ie(){if(!t)throw new Error("Database not initialized");(t.selectValue("PRAGMA user_version")||0)===0&&t.exec(`
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
    `);let n=t.selectValue("PRAGMA user_version")||0;const s=!A(t,"mediums","zulassungsnummer");if(s||n<4){console.log("Migrating database to version 4..."),t.exec("BEGIN TRANSACTION");try{s&&Ne(t),t.exec("PRAGMA user_version = 4"),t.exec("COMMIT")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 4 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,n<5){console.log("Migrating database to version 5..."),t.exec("BEGIN TRANSACTION");try{X(t),t.exec("PRAGMA user_version = 5"),t.exec("COMMIT")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 5 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!C(t,"gps_points")||n<6){console.log("Migrating database to version 6..."),t.exec("BEGIN TRANSACTION");try{v(t),t.exec("PRAGMA user_version = 6"),t.exec("COMMIT")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 6 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!C(t,"medium_profiles")||!C(t,"medium_profile_mediums")||n<7){console.log("Migrating database to version 7..."),t.exec("BEGIN TRANSACTION");try{le(t),t.exec("PRAGMA user_version = 7"),t.exec("COMMIT")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 7 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!C(t,"archive_logs")||n<8){console.log("Migrating database to version 8..."),t.exec("BEGIN TRANSACTION");try{F(t);const m=x("archives",t);if(m)try{const I=JSON.parse(m),h=Array.isArray(I?.logs)?I.logs:[];h.length&&Z(h,t)}catch(I){console.warn("Archiv-Logs konnten nicht migriert werden",I)}t.exec("PRAGMA user_version = 8"),t.exec("COMMIT")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 8 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!A(t,"mediums","wartezeit")||!A(t,"mediums","wirkstoff")||n<9){console.log("Migrating database to version 9 (QS columns)..."),t.exec("BEGIN TRANSACTION");try{W(t),t.exec("PRAGMA user_version = 9"),t.exec("COMMIT")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 9 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!A(t,"history","ersteller")||n<10){console.log("Migrating database to version 10 (normalized history)..."),t.exec("BEGIN TRANSACTION");try{const m=[{name:"ersteller",type:"TEXT"},{name:"standort",type:"TEXT"},{name:"kultur",type:"TEXT"},{name:"eppo_code",type:"TEXT"},{name:"bbch",type:"TEXT"},{name:"datum",type:"TEXT"},{name:"date_iso",type:"TEXT"},{name:"uhrzeit",type:"TEXT"},{name:"usage_type",type:"TEXT"},{name:"area_ha",type:"REAL"},{name:"area_ar",type:"REAL"},{name:"area_sqm",type:"REAL"},{name:"water_volume",type:"REAL"},{name:"invekos",type:"TEXT"},{name:"gps",type:"TEXT"},{name:"gps_latitude",type:"REAL"},{name:"gps_longitude",type:"REAL"},{name:"gps_point_id",type:"TEXT"},{name:"qs_maschine",type:"TEXT"},{name:"qs_schaderreger",type:"TEXT"},{name:"qs_verantwortlicher",type:"TEXT"},{name:"qs_wetter",type:"TEXT"},{name:"qs_behandlungsart",type:"TEXT"}];for(const d of m)A(t,"history",d.name)||t.exec(`ALTER TABLE history ADD COLUMN ${d.name} ${d.type}`);const I=[{name:"medium_name",type:"TEXT"},{name:"medium_unit",type:"TEXT"},{name:"method_id",type:"TEXT"},{name:"method_label",type:"TEXT"},{name:"medium_value",type:"REAL"},{name:"calculated_total",type:"REAL"},{name:"zulassungsnummer",type:"TEXT"},{name:"wartezeit",type:"INTEGER"},{name:"wirkstoff",type:"TEXT"},{name:"input_area_ha",type:"REAL"},{name:"input_area_ar",type:"REAL"},{name:"input_area_sqm",type:"REAL"},{name:"input_water_volume",type:"REAL"}];for(const d of I)A(t,"history_items",d.name)||t.exec(`ALTER TABLE history_items ADD COLUMN ${d.name} ${d.type}`);t.exec(`
        CREATE INDEX IF NOT EXISTS idx_history_date_iso ON history(date_iso);
        CREATE INDEX IF NOT EXISTS idx_history_eppo_code ON history(eppo_code);
        CREATE INDEX IF NOT EXISTS idx_history_kultur ON history(kultur);
        CREATE INDEX IF NOT EXISTS idx_history_standort ON history(standort);
        CREATE INDEX IF NOT EXISTS idx_history_items_zulassungsnummer ON history_items(zulassungsnummer);
        CREATE INDEX IF NOT EXISTS idx_history_items_wirkstoff ON history_items(wirkstoff);
      `);const h=[];if(t.exec({sql:"SELECT id, header_json FROM history WHERE header_json IS NOT NULL",rowMode:"object",callback:d=>h.push(d)}),h.length>0){console.log(`Migrating ${h.length} history entries to normalized format...`);const d=t.prepare(`
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
        `);for(const _ of h)try{const g=JSON.parse(_.header_json||"{}"),f=g.gpsCoordinates||{};d.bind([g.ersteller||null,g.standort||null,g.kultur||null,g.eppoCode||null,g.bbch||null,g.datum||null,g.dateIso||null,g.uhrzeit||null,g.usageType||null,g.areaHa??null,g.areaAr??null,g.areaSqm??null,g.waterVolume??null,g.invekos||null,g.gps||null,f.latitude??null,f.longitude??null,g.gpsPointId||null,g.qsMaschine||null,g.qsSchaderreger||null,g.qsVerantwortlicher||null,g.qsWetter||null,g.qsBehandlungsart||null,_.id]).step(),d.reset()}catch(g){console.warn(`Could not migrate history entry ${_.id}:`,g)}d.finalize()}const R=[];if(t.exec({sql:"SELECT id, payload_json FROM history_items WHERE payload_json IS NOT NULL",rowMode:"object",callback:d=>R.push(d)}),R.length>0){console.log(`Migrating ${R.length} history items to normalized format...`);const d=t.prepare(`
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
        `);for(const _ of R)try{const g=JSON.parse(_.payload_json||"{}"),f=g.inputs||{};d.bind([g.name||null,g.unit||null,g.methodId||null,g.methodLabel||null,g.value??null,g.total??null,g.zulassungsnummer||null,g.wartezeit??null,g.wirkstoff||null,f.areaHa??null,f.areaAr??null,f.areaSqm??null,f.waterVolume??null,_.id]).step(),d.reset()}catch(g){console.warn(`Could not migrate history item ${_.id}:`,g)}d.finalize()}t.exec("PRAGMA user_version = 10"),t.exec("COMMIT"),console.log("Database migrated to version 10 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 10 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!A(t,"history","company_name")||n<11){console.log("Migrating database to version 11 (company data in history)..."),t.exec("BEGIN TRANSACTION");try{const m=[{name:"company_name",type:"TEXT"},{name:"company_address",type:"TEXT"},{name:"company_headline",type:"TEXT"},{name:"company_email",type:"TEXT"}];for(const h of m)A(t,"history",h.name)||t.exec(`ALTER TABLE history ADD COLUMN ${h.name} ${h.type}`);const I=[];if(t.exec({sql:"SELECT id, header_json FROM history WHERE header_json IS NOT NULL AND company_name IS NULL",rowMode:"object",callback:h=>I.push(h)}),I.length>0){console.log(`Migrating ${I.length} history entries for company data...`);const h=t.prepare(`
          UPDATE history SET
            company_name = ?,
            company_address = ?,
            company_headline = ?,
            company_email = ?
          WHERE id = ?
        `);for(const R of I)try{const _=JSON.parse(R.header_json||"{}").company||{};h.bind([_.name||null,_.address||null,_.headline||null,_.contactEmail||null,R.id]).step(),h.reset()}catch(d){console.warn(`Could not migrate company data for history entry ${R.id}:`,d)}h.finalize()}t.exec("PRAGMA user_version = 11"),t.exec("COMMIT"),console.log("Database migrated to version 11 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 11 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!A(t,"gps_points","nutzflaeche_qm")||!A(t,"gps_points","kind")||n<12){console.log("Migrating database to version 12 (gps_points Nutzfläche/Typ)..."),t.exec("BEGIN TRANSACTION");try{v(t),A(t,"gps_points","nutzflaeche_qm")||t.exec("ALTER TABLE gps_points ADD COLUMN nutzflaeche_qm REAL"),A(t,"gps_points","kind")||t.exec("ALTER TABLE gps_points ADD COLUMN kind TEXT"),t.exec("PRAGMA user_version = 12"),t.exec("COMMIT"),console.log("Database migrated to version 12 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 12 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!C(t,"kultur_mittel")||n<13){console.log("Migrating database to version 13 (kultur_mittel)..."),t.exec("BEGIN TRANSACTION");try{D(t),t.exec("PRAGMA user_version = 13"),t.exec("COMMIT"),console.log("Database migrated to version 13 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 13 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!(C(t,"kultur_mittel")&&A(t,"kultur_mittel","eppo_code"))||n<14){console.log("Migrating database to version 14 (kultur_mittel EPPO/BBCH)..."),t.exec("BEGIN TRANSACTION");try{D(t),C(t,"kultur_mittel")&&!A(t,"kultur_mittel","eppo_code")&&t.exec("ALTER TABLE kultur_mittel ADD COLUMN eppo_code TEXT"),C(t,"kultur_mittel")&&!A(t,"kultur_mittel","bbch_default")&&t.exec("ALTER TABLE kultur_mittel ADD COLUMN bbch_default TEXT"),t.exec("PRAGMA user_version = 14"),t.exec("COMMIT"),console.log("Database migrated to version 14 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 14 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!(C(t,"kultur_mittel")&&A(t,"kultur_mittel","bbch"))||n<15){console.log("Migrating database to version 15 (kultur_mittel BBCH)..."),t.exec("BEGIN TRANSACTION");try{D(t),C(t,"kultur_mittel")&&!A(t,"kultur_mittel","bbch")&&t.exec("ALTER TABLE kultur_mittel ADD COLUMN bbch TEXT"),t.exec("PRAGMA user_version = 15"),t.exec("COMMIT"),console.log("Database migrated to version 15 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 15 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!C(t,"lager_bewegungen")||n<16){console.log("Migrating database to version 16 (lager_bewegungen)..."),t.exec("BEGIN TRANSACTION");try{B(t),t.exec("PRAGMA user_version = 16"),t.exec("COMMIT"),console.log("Database migrated to version 16 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 16 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!C(t,"ackerflaechen")||n<17){console.log("Migrating database to version 17 (ackerflaechen)..."),t.exec("BEGIN TRANSACTION");try{V(t),t.exec("PRAGMA user_version = 17"),t.exec("COMMIT"),console.log("Database migrated to version 17 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 17 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!C(t,"import_log")||n<18){console.log("Migrating database to version 18 (import_log)..."),t.exec("BEGIN TRANSACTION");try{ne(t),t.exec("PRAGMA user_version = 18"),t.exec("COMMIT"),console.log("Database migrated to version 18 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 18 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!C(t,"fotos")||n<19){console.log("Migrating database to version 19 (fotos)..."),t.exec("BEGIN TRANSACTION");try{y(t),t.exec("PRAGMA user_version = 19"),t.exec("COMMIT"),console.log("Database migrated to version 19 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 19 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,n<20){console.log("Migrating database to version 20 (foto notiz)..."),t.exec("BEGIN TRANSACTION");try{y(t),A(t,"fotos","notiz")||t.exec("ALTER TABLE fotos ADD COLUMN notiz TEXT"),t.exec("PRAGMA user_version = 20"),t.exec("COMMIT"),console.log("Database migrated to version 20 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 20 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,n<21){console.log("Migrating database to version 21 (foto thumbnail)..."),t.exec("BEGIN TRANSACTION");try{y(t),A(t,"fotos","data_thumb")||t.exec("ALTER TABLE fotos ADD COLUMN data_thumb TEXT"),t.exec("CREATE INDEX IF NOT EXISTS idx_fotos_kategorie ON fotos(kategorie, created_at DESC)"),t.exec("PRAGMA user_version = 21"),t.exec("COMMIT"),console.log("Database migrated to version 21 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 21 failed:",m),m}}if(n=t.selectValue("PRAGMA user_version")||0,!C(t,"anbau_kultur")||!C(t,"massnahme")||n<22){console.log("Migrating database to version 22 (Kulturführung)..."),t.exec("BEGIN TRANSACTION");try{K(t),q(t),t.exec("PRAGMA user_version = 22"),t.exec("COMMIT"),console.log("Database migrated to version 22 successfully")}catch(m){throw t.exec("ROLLBACK"),console.error("Migration to version 22 failed:",m),m}}}async function ct(e){if(!t)throw new Error("Database not initialized");t.exec("BEGIN TRANSACTION");try{if(Array.isArray(e.history)&&t.exec(`
        DELETE FROM history_items;
        DELETE FROM history;
      `),t.exec(`
      DELETE FROM mediums;
      DELETE FROM measurement_methods;
      DELETE FROM meta WHERE key IN ('version','company','defaults','fieldLabels','measurementMethods','archives');
    `),e.meta){const s={version:e.meta.version||1,company:JSON.stringify(e.meta.company||{}),defaults:JSON.stringify(e.meta.defaults||{}),fieldLabels:JSON.stringify(e.meta.fieldLabels||{}),measurementMethods:JSON.stringify(e.meta.measurementMethods||[]),archives:JSON.stringify(e.archives||{logs:[]})},a=t.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)");for(const[l,o]of Object.entries(s))a.bind([l,typeof o=="string"?o:JSON.stringify(o)]).step(),a.reset();if(a.finalize(),e.meta.measurementMethods&&Array.isArray(e.meta.measurementMethods)){const l=t.prepare("INSERT OR REPLACE INTO measurement_methods (id, label, type, unit, requires, config) VALUES (?, ?, ?, ?, ?, ?)");for(const o of e.meta.measurementMethods)l.bind([o.id,o.label,o.type,o.unit,JSON.stringify(o.requires||[]),JSON.stringify(o.config||{})]).step(),l.reset();l.finalize()}const i=Array.isArray(e.archives?.logs)?e.archives.logs:[],r=Z(i,t);z("archives",JSON.stringify({logs:r}),t)}if(e.mediums&&Array.isArray(e.mediums)){W(t);const s=t.prepare("INSERT OR REPLACE INTO mediums (id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");for(const a of e.mediums){const i=a.zulassungsnummer??a.approvalNumber??a.zulassung??null;s.bind([a.id,a.name,a.unit,a.methodId||a.method_id,a.value,i,a.wartezeit??null,a.wirkstoff??null]).step(),s.reset()}s.finalize()}if(e.mediumProfiles&&Array.isArray(e.mediumProfiles)){le(),t.exec("DELETE FROM medium_profile_mediums"),t.exec("DELETE FROM medium_profiles");const s=t.prepare("INSERT INTO medium_profiles (id, name, created_at, updated_at) VALUES (?, ?, ?, ?)"),a=t.prepare("INSERT INTO medium_profile_mediums (profile_id, medium_id, sort_order) VALUES (?, ?, ?)");for(const i of e.mediumProfiles){const r=String(i.id||"").trim();if(!r)continue;const l=String(i.name||"Profil ohne Namen"),o=i.createdAt||i.created_at||new Date().toISOString(),u=i.updatedAt||i.updated_at||o;s.bind([r,l,o,u]).step(),s.reset(),(Array.isArray(i.mediumIds)?i.mediumIds:[]).forEach((E,p)=>{E&&(a.bind([r,String(E),p]).step(),a.reset())})}s.finalize(),a.finalize()}if(e.history&&Array.isArray(e.history)){const s=t.prepare(`
        INSERT INTO history (
          created_at, header_json,
          ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
          uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
          invekos, gps, gps_latitude, gps_longitude, gps_point_id,
          qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `),a=t.prepare(`
        INSERT INTO history_items (
          history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);for(const i of e.history){const r=i.header?{...i.header}:{...i};delete r.items;const l=i.savedAt||r.savedAt||r.createdAt||new Date().toISOString();r.createdAt||(r.createdAt=l);const o=r.gpsCoordinates||{};s.bind([l,JSON.stringify(r),r.ersteller||null,r.standort||null,r.kultur||null,r.eppoCode||null,r.bbch||null,r.datum||null,r.dateIso||null,r.uhrzeit||null,r.usageType||null,r.areaHa??null,r.areaAr??null,r.areaSqm??null,r.waterVolume??null,r.invekos||null,r.gps||null,o.latitude??null,o.longitude??null,r.gpsPointId||null,r.qsMaschine||null,r.qsSchaderreger||null,r.qsVerantwortlicher||null,r.qsWetter||null,r.qsBehandlungsart||null]).step();const u=t.selectValue("SELECT last_insert_rowid()");s.reset();const c=i.items&&Array.isArray(i.items)?i.items:[];for(const E of c){const p=E.inputs||{};a.bind([u,E.mediumId||E.medium_id||E.id||"",JSON.stringify(E),E.name||null,E.unit||null,E.methodId||null,E.methodLabel||null,E.value??null,E.total??null,E.zulassungsnummer||null,E.wartezeit??null,E.wirkstoff||null,p.areaHa??null,p.areaAr??null,p.areaSqm??null,p.waterVolume??null]).step(),a.reset()}}s.finalize(),a.finalize()}return t.exec("COMMIT"),{success:!0,message:"Snapshot imported successfully"}}catch(n){throw t.exec("ROLLBACK"),n}}async function dt(){if(!t)throw new Error("Database not initialized");const e={meta:{version:1,company:{},defaults:{},fieldLabels:{},measurementMethods:[]},mediums:[],mediumProfiles:[],history:[],archives:{logs:[]}};t.exec({sql:"SELECT key, value FROM meta",callback:i=>{const r=i[0],l=i[1];if(!(r&&r.startsWith("lookup:")))try{const o=JSON.parse(l);r==="company"?e.meta.company=o:r==="defaults"?e.meta.defaults=o:r==="fieldLabels"?e.meta.fieldLabels=o:r==="version"?e.meta.version=o:r==="archives"&&(e.archives=o)}catch{}}}),t.exec({sql:"SELECT id, label, type, unit, requires, config FROM measurement_methods",callback:i=>{e.meta.measurementMethods.push({id:i[0],label:i[1],type:i[2],unit:i[3],requires:JSON.parse(i[4]||"[]"),config:JSON.parse(i[5]||"{}")})}}),t.exec({sql:"SELECT id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff FROM mediums",callback:i=>{e.mediums.push({id:i[0],name:i[1],unit:i[2],methodId:i[3],value:i[4],zulassungsnummer:i[5]||null,wartezeit:i[6]||null,wirkstoff:i[7]||null})}});const n=new Map;t.exec({sql:`SELECT id, name, created_at, updated_at
          FROM medium_profiles
          ORDER BY name COLLATE NOCASE`,rowMode:"object",callback:i=>{n.set(i.id,{id:String(i.id),name:String(i.name??""),createdAt:i.created_at||new Date().toISOString(),updatedAt:i.updated_at||new Date().toISOString(),mediumIds:[]})}}),n.size&&t.exec({sql:`SELECT profile_id, medium_id, sort_order
            FROM medium_profile_mediums
            ORDER BY profile_id, sort_order, rowid`,rowMode:"object",callback:i=>{const r=n.get(i.profile_id);r&&r.mediumIds.push(String(i.medium_id))}}),e.mediumProfiles=Array.from(n.values());const s=ue();s.length&&(e.archives={logs:s.map(i=>Q(i))});const a=new Map;return t.exec({sql:`SELECT id, created_at, header_json,
            ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
            uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
            invekos, gps, gps_latitude, gps_longitude, gps_point_id,
            qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart
          FROM history ORDER BY created_at DESC`,rowMode:"object",callback:i=>{let r={};try{r=JSON.parse(i.header_json||"{}")}catch(l){console.warn("Could not parse header_json",l)}a.set(i.id,{header:{createdAt:i.created_at,ersteller:i.ersteller??r.ersteller,standort:i.standort??r.standort,kultur:i.kultur??r.kultur,eppoCode:i.eppo_code??r.eppoCode,bbch:i.bbch??r.bbch,datum:i.datum??r.datum,dateIso:i.date_iso??r.dateIso,uhrzeit:i.uhrzeit??r.uhrzeit,usageType:i.usage_type??r.usageType,areaHa:i.area_ha??r.areaHa,areaAr:i.area_ar??r.areaAr,areaSqm:i.area_sqm??r.areaSqm,waterVolume:i.water_volume??r.waterVolume,invekos:i.invekos??r.invekos,gps:i.gps??r.gps,gpsCoordinates:i.gps_latitude!=null&&i.gps_longitude!=null?{latitude:i.gps_latitude,longitude:i.gps_longitude}:r.gpsCoordinates||null,gpsPointId:i.gps_point_id??r.gpsPointId,qsMaschine:i.qs_maschine??r.qsMaschine,qsSchaderreger:i.qs_schaderreger??r.qsSchaderreger,qsVerantwortlicher:i.qs_verantwortlicher??r.qsVerantwortlicher,qsWetter:i.qs_wetter??r.qsWetter,qsBehandlungsart:i.qs_behandlungsart??r.qsBehandlungsart,savedAt:r.savedAt||i.created_at},items:[]})}}),t.exec({sql:`SELECT history_id, medium_id, payload_json,
            medium_name, medium_unit, method_id, method_label, medium_value,
            calculated_total, zulassungsnummer, wartezeit, wirkstoff,
            input_area_ha, input_area_ar, input_area_sqm, input_water_volume
          FROM history_items`,rowMode:"object",callback:i=>{const r=i.history_id;if(a.has(r)){let l={};try{l=JSON.parse(i.payload_json||"{}")}catch(o){console.warn("Could not parse payload_json",o)}a.get(r).items.push({id:i.medium_id??l.id,mediumId:i.medium_id??l.mediumId,name:i.medium_name??l.name,unit:i.medium_unit??l.unit,methodId:i.method_id??l.methodId,methodLabel:i.method_label??l.methodLabel,value:i.medium_value??l.value,total:i.calculated_total??l.total,zulassungsnummer:i.zulassungsnummer??l.zulassungsnummer,wartezeit:i.wartezeit??l.wartezeit,wirkstoff:i.wirkstoff??l.wirkstoff,inputs:{areaHa:i.input_area_ha??l.inputs?.areaHa,areaAr:i.input_area_ar??l.inputs?.areaAr,areaSqm:i.input_area_sqm??l.inputs?.areaSqm,waterVolume:i.input_water_volume??l.inputs?.waterVolume}})}}}),e.history=Array.from(a.values()).map(i=>({...i.header,items:i.items})),e}async function mt(e){if(!t)throw new Error("Database not initialized");W();const n=t.prepare("INSERT OR REPLACE INTO mediums (id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");return n.bind([e.id,e.name,e.unit,e.methodId||e.method_id,e.value,e.zulassungsnummer??e.approvalNumber??e.zulassung??null,e.wartezeit??null,e.wirkstoff??null]).step(),n.finalize(),{success:!0,id:e.id}}async function Et(e){if(!t)throw new Error("Database not initialized");const n=t.prepare("DELETE FROM mediums WHERE id = ?");return n.bind([e]).step(),n.finalize(),{success:!0}}async function _t(){if(!t)throw new Error("Database not initialized");W();const e=[];return t.exec({sql:"SELECT id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff FROM mediums",callback:n=>{e.push({id:n[0],name:n[1],unit:n[2],methodId:n[3],value:n[4],zulassungsnummer:n[5]||null,wartezeit:n[6]||null,wirkstoff:n[7]||null})}}),e}function pt(e){return e?{id:e.id!=null?String(e.id):"",name:e.name!=null?String(e.name):"",unit:e.unit!=null?String(e.unit):"",methodId:e.method_id!=null?String(e.method_id):e.methodId!=null?String(e.methodId):null,value:Number(e.value??0),zulassungsnummer:e.zulassungsnummer!=null?String(e.zulassungsnummer):e.zulassung!=null?String(e.zulassung):null,wartezeit:e.wartezeit!=null?Number(e.wartezeit):null,wirkstoff:e.wirkstoff!=null?String(e.wirkstoff):null}:null}async function gt(e={}){if(!t)throw new Error("Database not initialized");const{cursor:n=null,limit:s,pageSize:a,search:i,includeTotal:r=!1}=e||{},l=P(a??s,50,500),o=typeof i=="string"?i.trim():"",u=[],c=[];if(o){u.push("(LOWER(name) LIKE LOWER(?) OR LOWER(COALESCE(zulassungsnummer, '')) LIKE LOWER(?))");const d=`%${o}%`;c.push(d,d)}const E=n&&Number.isFinite(Number(n.rowid))?Number(n.rowid):null,p=[...u],T=[...c];E!==null&&(p.push("rowid > ?"),T.push(E));const S=p.length?`WHERE ${p.join(" AND ")}`:"",b=t.prepare(`SELECT rowid AS cursor_rowid, id, name, unit, method_id, value, zulassungsnummer
     FROM mediums
     ${S}
     ORDER BY rowid ASC
     LIMIT ?`);b.bind([...T,l+1]);const O=[];for(;b.step();)O.push(b.getAsObject());b.finalize();const L=O.length>l,k=L?O.slice(0,l):O,m=k.map(d=>pt(d)).filter(d=>d!==null),I=k.length?k[k.length-1]:null,h=L&&I?{rowid:Number(I.cursor_rowid)||Number(I.rowid||0)}:null;let R;if(r){const d=u.length?`WHERE ${u.join(" AND ")}`:"",_=t.prepare(`SELECT COUNT(*) AS total FROM mediums ${d}`);if(c.length&&_.bind(c),_.step()){const g=_.getAsObject();R=Number(g?.total)||0}else R=0;_.finalize()}return{items:m,nextCursor:h,hasMore:L,pageSize:l,totalCount:R}}function J(e={}){const n=`COALESCE(
    NULLIF(json_extract(header_json, '$.dateIso'), ''),
    CASE
      WHEN json_extract(header_json, '$.datum') GLOB '__.__.____'
      THEN substr(json_extract(header_json, '$.datum'), 7, 4) || '-' ||
           substr(json_extract(header_json, '$.datum'), 4, 2) || '-' ||
           substr(json_extract(header_json, '$.datum'), 1, 2)
      ELSE NULL
    END,
    created_at
  )`,s=[],a=[];if(e.startDate&&(s.push(`datetime(${n}) >= datetime(?)`),a.push(e.startDate)),e.endDate&&(s.push(`datetime(${n}) <= datetime(?)`),a.push(e.endDate)),[["creator","$.ersteller"],["location","$.standort"],["crop","$.kultur"],["usageType","$.usageType"],["eppoCode","$.eppoCode"],["invekos","$.invekos"],["bbch","$.bbch"]].forEach(([r,l])=>{const o=e?.[r];typeof o=="string"&&o.trim()&&(s.push(`LOWER(json_extract(header_json, '${l}')) LIKE LOWER(?)`),a.push(`%${o.trim()}%`))}),typeof e?.text=="string"&&e.text.trim()){const r=`%${e.text.trim()}%`,l=["$.ersteller","$.standort","$.kultur","$.usageType","$.eppoCode","$.invekos","$.bbch","$.gps"],o=l.map(u=>`LOWER(json_extract(header_json, '${u}')) LIKE LOWER(?)`);s.push(`(${o.join(" OR ")})`);for(let u=0;u<l.length;u+=1)a.push(r)}return{historyDateExpr:n,whereSql:s.length?`WHERE ${s.join(" AND ")}`:"",whereParams:a}}function Tt(e,n,s){if(!e||!e.createdAt)return null;const a=s==="ASC"?">":"<",i=String(e.createdAt),r=Number(e.id??e.historyId??e.rowid??0);return{clause:`(
      datetime(${n}) ${a} datetime(?)
      OR (datetime(${n}) = datetime(?) AND history.id ${a} ?)
    )`,params:[i,i,r]}}async function ht({page:e=1,pageSize:n=50,filters:s={},sortDirection:a="desc"}={}){if(!t)throw new Error("Database not initialized");const i=String(a).toLowerCase()==="asc"?"ASC":"DESC",r=P(n,50,500),l=Number.isFinite(Number(e))?Math.max(1,Number(e)):1,o=(l-1)*r,{historyDateExpr:u,whereSql:c,whereParams:E}=J(s),p=[],T={sql:`
      SELECT id, created_at, header_json
      FROM history
      ${c}
      ORDER BY datetime(${u}) ${i}, rowid ${i}
      LIMIT ${r} OFFSET ${o}
    `,callback:b=>{const O=JSON.parse(b[2]||"{}");p.push({id:b[0],...O})}};E.length&&(T.bind=[...E]),t.exec(T);const S=t.selectValue(`SELECT COUNT(*) FROM history ${c}`,E.length?[...E]:void 0);return{items:p,page:l,pageSize:r,totalCount:Number(S)||0,totalPages:Math.ceil((Number(S)||0)/r)}}async function fe({cursor:e=null,pageSize:n=50,filters:s={},sortDirection:a="desc",includeItems:i=!1,includeTotal:r=!1}={}){if(!t)throw new Error("Database not initialized");const l=String(a).toLowerCase()==="asc"?"ASC":"DESC",o=P(n,50,500),u=o+1,{historyDateExpr:c,whereSql:E,whereParams:p}=J(s),T=Tt(e,c,l),S=[],b=[];E?.trim()&&(S.push(E.replace(/^\s*WHERE\s+/i,"")),p.length&&b.push(...p)),T&&(S.push(T.clause),b.push(...T.params));const O=S.length>0?`WHERE ${S.join(" AND ")}`:"",L=[];t.exec({sql:`
      SELECT
        history.id AS id,
        history.header_json AS header_json,
        history.created_at AS created_at,
        ${c} AS cursor_created_at,
        history.ersteller, history.standort, history.kultur, history.eppo_code, history.bbch,
        history.datum, history.date_iso, history.uhrzeit, history.usage_type,
        history.area_ha, history.area_ar, history.area_sqm, history.water_volume,
        history.invekos, history.gps, history.gps_latitude, history.gps_longitude, history.gps_point_id,
        history.qs_maschine, history.qs_schaderreger, history.qs_verantwortlicher, history.qs_wetter, history.qs_behandlungsart,
        history.company_name, history.company_address, history.company_headline, history.company_email
      FROM history
      ${O}
      ORDER BY datetime(cursor_created_at) ${l}, history.id ${l}
      LIMIT ?
    `,bind:[...b,u],rowMode:"object",callback:d=>L.push(d)});const k=L.length>o,m=k?L.slice(0,-1):L;let I=null;if(k&&m.length){const d=m[m.length-1];I={id:d.id,createdAt:d.cursor_created_at||d.created_at||new Date().toISOString()}}const h=m.map(d=>{let _={};try{_=JSON.parse(d.header_json||"{}")}catch(f){console.warn("Konnte History-Header nicht parsen",f)}const g={company:{name:d.company_name??_.company?.name??null,address:d.company_address??_.company?.address??null,headline:d.company_headline??_.company?.headline??null,contactEmail:d.company_email??_.company?.contactEmail??null},id:d.id,createdAt:d.created_at,ersteller:d.ersteller??_.ersteller,standort:d.standort??_.standort,kultur:d.kultur??_.kultur,eppoCode:d.eppo_code??_.eppoCode,bbch:d.bbch??_.bbch,datum:d.datum??_.datum,dateIso:d.date_iso??_.dateIso,uhrzeit:d.uhrzeit??_.uhrzeit,usageType:d.usage_type??_.usageType,areaHa:d.area_ha??_.areaHa,areaAr:d.area_ar??_.areaAr,areaSqm:d.area_sqm??_.areaSqm,waterVolume:d.water_volume??_.waterVolume,invekos:d.invekos??_.invekos,gps:d.gps??_.gps,gpsCoordinates:d.gps_latitude!=null&&d.gps_longitude!=null?{latitude:d.gps_latitude,longitude:d.gps_longitude}:_.gpsCoordinates||null,gpsPointId:d.gps_point_id??_.gpsPointId,qsMaschine:d.qs_maschine??_.qsMaschine,qsSchaderreger:d.qs_schaderreger??_.qsSchaderreger,qsVerantwortlicher:d.qs_verantwortlicher??_.qsVerantwortlicher,qsWetter:d.qs_wetter??_.qsWetter,qsBehandlungsart:d.qs_behandlungsart??_.qsBehandlungsart,savedAt:_.savedAt||d.created_at};return i&&(g.items=[]),g});if(i&&h.length){const d=h.map(f=>f.id),_=d.map(()=>"?").join(","),g=new Map;t.exec({sql:`
        SELECT history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        FROM history_items
        WHERE history_id IN (${_})
        ORDER BY history_id, rowid
      `,bind:d,rowMode:"object",callback:f=>{const se=f.history_id;g.has(se)||g.set(se,[]);let M={};try{M=JSON.parse(f.payload_json||"{}")}catch(Zt){console.warn("Konnte History-Item nicht parsen",Zt)}g.get(se).push({id:f.medium_id??M.id,mediumId:f.medium_id??M.mediumId,name:f.medium_name??M.name,unit:f.medium_unit??M.unit,methodId:f.method_id??M.methodId,methodLabel:f.method_label??M.methodLabel,value:f.medium_value??M.value,total:f.calculated_total??M.total,zulassungsnummer:f.zulassungsnummer??M.zulassungsnummer,wartezeit:f.wartezeit??M.wartezeit,wirkstoff:f.wirkstoff??M.wirkstoff,inputs:{areaHa:f.input_area_ha??M.inputs?.areaHa,areaAr:f.input_area_ar??M.inputs?.areaAr,areaSqm:f.input_area_sqm??M.inputs?.areaSqm,waterVolume:f.input_water_volume??M.inputs?.waterVolume}})}}),h.forEach(f=>{f.items=g.get(f.id)||[]})}let R;return r&&(R=Number(t.selectValue(`SELECT COUNT(*) FROM history ${E||""}`,p.length?[...p]:void 0))||0),{items:h,nextCursor:I,pageSize:o,sortDirection:l==="ASC"?"asc":"desc",hasMore:k,totalCount:R}}async function ft(e={}){if(!t)throw new Error("Database not initialized");const{pageSize:n,chunkSize:s,includeItems:a=!0,includeTotal:i=!1,...r}=e||{},l=P(s??n??100,100,1e3);return await fe({pageSize:l,includeItems:a,includeTotal:i,...r})}async function bt({filters:e={},limit:n=5e3,sortDirection:s="asc"}={}){if(!t)throw new Error("Database not initialized");const a=Number.isFinite(Number(n))?Math.min(Math.max(Number(n),1),1e4):5e3,i=String(s).toLowerCase()==="desc"?"DESC":"ASC",{historyDateExpr:r,whereSql:l,whereParams:o}=J(e),u=[],c=[],E=`
    SELECT history.id AS history_id,
           history.header_json AS header_json,
           COALESCE(json_group_array(history_items.payload_json), '[]') AS items_json
    FROM history
    LEFT JOIN history_items ON history_items.history_id = history.id
    ${l}
    GROUP BY history.id
    ORDER BY datetime(${r}) ${i}, history.rowid ${i}
    LIMIT ?
  `,p=o.length?[...o,a]:[a];return t.exec({sql:E,bind:p,rowMode:"object",callback:T=>{try{const S=JSON.parse(T.header_json||"{}"),b=JSON.parse(T.items_json||"[]"),O=Array.isArray(b)?b.map(L=>{if(L==null)return null;if(typeof L=="string")try{return JSON.parse(L)}catch(k){return console.warn("Konnte History-Item nicht parsen",k),null}return L}).filter(L=>L!==null):[];c.push(T.history_id),u.push({...S,items:O})}catch(S){console.warn("Archiv-Export konnte nicht gelesen werden",S)}}}),{entries:u,historyIds:c}}async function St({filters:e={}}={}){if(!t)throw new Error("Database not initialized");const{whereSql:n,whereParams:s}=J(e);t.exec("BEGIN TRANSACTION");try{const a={sql:`DELETE FROM history ${n}`};return s.length&&(a.bind=[...s]),t.exec(a),t.exec("COMMIT"),{success:!0}}catch(a){throw t.exec("ROLLBACK"),a}}async function Nt(){if(!t)throw new Error("Database not initialized");return t.exec("VACUUM"),{success:!0}}async function Lt(e={}){if(!t)throw new Error("Database not initialized");const n=Array.isArray(e.logs)?e.logs:[];t.exec("BEGIN TRANSACTION");try{const s=Z(n,t);return z("archives",JSON.stringify({logs:s}),t),t.exec("COMMIT"),{success:!0,count:s.length}}catch(s){throw t.exec("ROLLBACK"),s}}async function At({limit:e=50,cursor:n=null,sortDirection:s="desc"}={}){if(!t)throw new Error("Database not initialized");F();const a=String(s).toLowerCase()==="asc"?"ASC":"DESC",i=Math.min(Math.max(Number(e)||1,1),500),r=i+1,l=(()=>{if(!n||!n.archivedAt)return null;const b=a==="ASC"?">":"<",O=b,L=String(n.archivedAt),k=n.id?String(n.id):"";return{clause:`(
        datetime(archived_at) ${b} datetime(?)
        OR (datetime(archived_at) = datetime(?) AND id ${O} ?)
      )`,params:[L,L,k]}})(),o=[],u=[];l&&(o.push(l.clause),u.push(...l.params));const c=o.length?`WHERE ${o.join(" AND ")}`:"",E=[];t.exec({sql:`SELECT id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json
          FROM archive_logs
          ${c}
          ORDER BY datetime(archived_at) ${a}, id ${a}
          LIMIT ?`,bind:[...u,r],rowMode:"object",callback:b=>E.push(b)});let p=null;const T=E.length>i;if(T){const b=E.pop();b&&(p={id:String(b.id),archivedAt:b.archived_at})}return{items:E.map(b=>ee(b)).filter(b=>!!b),nextCursor:p,hasMore:T,pageSize:i,sortDirection:a}}async function Rt(e={}){if(!t)throw new Error("Database not initialized");F();const n=oe(e);if(!n)throw new Error("Ungültiger Archiv-Eintrag");const s=t.prepare(`INSERT OR REPLACE INTO archive_logs
      (id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);return s.bind([n.id,n.archivedAt,n.startDate,n.endDate,n.entryCount,n.fileName,n.storageHint,n.note,JSON.stringify(n.metadata||e||{})]).step(),s.finalize(),ce(),ee({id:n.id,archived_at:n.archivedAt,start_date:n.startDate,end_date:n.endDate,entry_count:n.entryCount,file_name:n.fileName,storage_hint:n.storageHint,note:n.note,metadata_json:JSON.stringify(n.metadata||e||{})})}async function It(e={}){if(!t)throw new Error("Database not initialized");ne();const n=e.importedAt||new Date().toISOString(),s=t.prepare(`INSERT INTO import_log
      (imported_at, source, device, added, skipped, range_start, range_end, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);return s.bind([n,e.source!=null?String(e.source):null,e.device!=null?String(e.device):null,Number(e.added)||0,Number(e.skipped)||0,e.rangeStart!=null?String(e.rangeStart):null,e.rangeEnd!=null?String(e.rangeEnd):null,e.note!=null?String(e.note):null]).step(),s.finalize(),{id:t.selectValue("SELECT last_insert_rowid()"),importedAt:n}}async function Ot(e={}){if(!t)throw new Error("Database not initialized");ne();const n=Math.min(Math.max(Number(e?.limit)||50,1),500),s=[];return t.exec({sql:`SELECT id, imported_at, source, device, added, skipped, range_start, range_end, note
          FROM import_log
          ORDER BY datetime(imported_at) DESC, id DESC
          LIMIT ?`,bind:[n],rowMode:"object",callback:a=>{s.push({id:a.id,importedAt:a.imported_at,source:a.source,device:a.device,added:Number(a.added)||0,skipped:Number(a.skipped)||0,rangeStart:a.range_start,rangeEnd:a.range_end,note:a.note})}}),{items:s}}async function kt(e={}){if(!t)throw new Error("Database not initialized");y();const n=e.clientUuid?String(e.clientUuid):null;if(n)try{const r=t.selectValue("SELECT id FROM fotos WHERE client_uuid = ? LIMIT 1",[n]);if(r!=null)return{id:r,duplicate:!0}}catch{}if(!e.data)throw new Error("Foto-Daten fehlen");const s=e.createdAt||new Date().toISOString(),a=t.prepare(`INSERT INTO fotos
      (client_uuid, created_at, entry_uuid, kategorie, titel, standort, kultur,
       gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data, data_thumb)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);return a.bind([n,s,e.entryUuid!=null?String(e.entryUuid):null,e.kategorie!=null?String(e.kategorie):null,e.titel!=null?String(e.titel):null,e.standort!=null?String(e.standort):null,e.kultur!=null?String(e.kultur):null,e.gpsLatitude??null,e.gpsLongitude??null,e.notiz!=null?String(e.notiz):null,e.device!=null?String(e.device):null,e.mime!=null?String(e.mime):"image/jpeg",e.width??null,e.height??null,e.bytes??null,String(e.data),e.thumb!=null?String(e.thumb):null]).step(),a.finalize(),{id:t.selectValue("SELECT last_insert_rowid()"),duplicate:!1}}async function Ct(e={}){if(!t)throw new Error("Database not initialized");y();const n=Math.min(Math.max(Number(e?.limit)||200,1),1e5),s=[];return t.exec({sql:`SELECT id, client_uuid, created_at, entry_uuid, kategorie, titel,
                 standort, kultur, gps_latitude, gps_longitude, notiz, device, mime,
                 width, height, bytes, data_thumb
          FROM fotos ORDER BY created_at DESC, id DESC LIMIT ?`,bind:[n],rowMode:"object",callback:a=>{s.push({id:a.id,clientUuid:a.client_uuid,createdAt:a.created_at,entryUuid:a.entry_uuid,kategorie:a.kategorie,titel:a.titel,standort:a.standort,kultur:a.kultur,gpsLatitude:a.gps_latitude,gpsLongitude:a.gps_longitude,notiz:a.notiz,device:a.device,mime:a.mime,width:a.width,height:a.height,bytes:a.bytes,thumb:a.data_thumb||null})}}),{items:s}}async function Mt(e={}){if(!t)throw new Error("Database not initialized");y();const n=e&&e.id!=null?Number(e.id):null;if(n==null||!e.thumb)return{success:!1};const s=t.prepare("UPDATE fotos SET data_thumb = ? WHERE id = ?");return s.bind([String(e.thumb),n]).step(),s.finalize(),{success:!0}}async function yt(){if(!t)throw new Error("Database not initialized");y();const e={};let n=0,s=0;return t.exec({sql:"SELECT kategorie, COUNT(*) AS n, COALESCE(SUM(bytes),0) AS b FROM fotos GROUP BY kategorie",rowMode:"object",callback:a=>{e[a.kategorie||""]=Number(a.n)||0,n+=Number(a.n)||0,s+=Number(a.b)||0}}),{counts:e,total:n,totalBytes:s}}async function Dt(e={}){if(!t)throw new Error("Database not initialized");y();const n=Array.isArray(e?.ids)?e.ids.map(a=>Number(a)).filter(a=>Number.isFinite(a)):[];if(!n.length)return{success:!0,deleted:0};const s=n.map(()=>"?").join(",");return t.exec({sql:`DELETE FROM fotos WHERE id IN (${s})`,bind:n}),{success:!0,deleted:n.length}}async function vt(e={}){if(!t)throw new Error("Database not initialized");y();const n=Array.isArray(e?.ids)?e.ids.map(i=>Number(i)).filter(i=>Number.isFinite(i)):[],s=e?.kategorie!=null?String(e.kategorie):null;if(!n.length)return{success:!0,updated:0};const a=n.map(()=>"?").join(",");return t.exec({sql:`UPDATE fotos SET kategorie = ? WHERE id IN (${a})`,bind:[s,...n]}),{success:!0,updated:n.length}}async function zt(e={}){if(!t)throw new Error("Database not initialized");y();const n=Array.isArray(e?.ids)?e.ids.map(i=>Number(i)).filter(i=>Number.isFinite(i)):[];if(!n.length)return{items:[]};const s=n.map(()=>"?").join(","),a=[];return t.exec({sql:`SELECT client_uuid, created_at, entry_uuid, kategorie, titel, standort,
                 kultur, gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data
          FROM fotos WHERE id IN (${s}) ORDER BY created_at ASC, id ASC`,bind:n,rowMode:"object",callback:i=>{a.push({clientUuid:i.client_uuid,createdAt:i.created_at,entryUuid:i.entry_uuid,kategorie:i.kategorie,titel:i.titel,standort:i.standort,kultur:i.kultur,gpsLatitude:i.gps_latitude,gpsLongitude:i.gps_longitude,notiz:i.notiz,device:i.device,mime:i.mime,width:i.width,height:i.height,bytes:i.bytes,data:i.data})}}),{items:a}}async function wt(e={}){if(!t)throw new Error("Database not initialized");y();const n=e&&e.id!=null?Number(e.id):null;if(n==null)throw new Error("Foto-ID fehlt");const s=[],a=[],i=(l,o)=>{if(Object.prototype.hasOwnProperty.call(e,l)){s.push(`${o} = ?`);const u=e[l];a.push(u==null||u===""?null:u)}};if(i("titel","titel"),i("kategorie","kategorie"),i("kultur","kultur"),i("standort","standort"),i("notiz","notiz"),i("gpsLatitude","gps_latitude"),i("gpsLongitude","gps_longitude"),!s.length)return{success:!0};a.push(n);const r=t.prepare(`UPDATE fotos SET ${s.join(", ")} WHERE id = ?`);return r.bind(a).step(),r.finalize(),{success:!0}}async function Xt(e={}){if(!t)throw new Error("Database not initialized");y();const n=e&&e.id!=null?Number(e.id):null;if(n==null)return{data:null};let s=null,a="image/jpeg";return t.exec({sql:"SELECT data, mime FROM fotos WHERE id = ? LIMIT 1",bind:[n],rowMode:"object",callback:i=>{s=i.data??null,a=i.mime||"image/jpeg"}}),{data:s,mime:a}}async function xt(){if(!t)throw new Error("Database not initialized");y();const e=[];return t.exec({sql:`SELECT client_uuid, created_at, entry_uuid, kategorie, titel, standort,
                 kultur, gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data
          FROM fotos ORDER BY created_at ASC, id ASC`,rowMode:"object",callback:n=>{e.push({clientUuid:n.client_uuid,createdAt:n.created_at,entryUuid:n.entry_uuid,kategorie:n.kategorie,titel:n.titel,standort:n.standort,kultur:n.kultur,gpsLatitude:n.gps_latitude,gpsLongitude:n.gps_longitude,notiz:n.notiz,device:n.device,mime:n.mime,width:n.width,height:n.height,bytes:n.bytes,data:n.data})}}),{items:e}}async function Ft(e={}){if(!t)throw new Error("Database not initialized");y();const n=e&&e.id!=null?Number(e.id):null;if(n==null)throw new Error("Foto-ID fehlt");const s=t.prepare("DELETE FROM fotos WHERE id = ?");return s.bind([n]).step(),s.finalize(),{success:!0}}async function Ut(){if(!t)throw new Error("Database not initialized");y();const e=t.selectValue("SELECT COUNT(*) FROM fotos")||0;return t.exec("DELETE FROM fotos"),{success:!0,deleted:Number(e)}}async function qt(e={}){if(!t)throw new Error("Database not initialized");F();const n=e&&e.id?String(e.id):"";if(!n)throw new Error("Archiv-Log-ID fehlt");const s=t.prepare("DELETE FROM archive_logs WHERE id = ?");return s.bind([n]).step(),s.finalize(),ce(),{success:!0}}async function Pt(e){if(!t)throw new Error("Database not initialized");let n=null;if(t.exec({sql:`SELECT id, created_at, header_json,
            ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
            uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
            invekos, gps, gps_latitude, gps_longitude, gps_point_id,
            qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart,
            company_name, company_address, company_headline, company_email
          FROM history WHERE id = ?`,bind:[e],rowMode:"object",callback:s=>{let a={};if(s.header_json)try{a=JSON.parse(s.header_json)}catch(i){console.warn("Could not parse header_json",i)}n={company:{name:s.company_name??a.company?.name??null,address:s.company_address??a.company?.address??null,headline:s.company_headline??a.company?.headline??null,contactEmail:s.company_email??a.company?.contactEmail??null},id:s.id,createdAt:s.created_at,ersteller:s.ersteller??a.ersteller,standort:s.standort??a.standort,kultur:s.kultur??a.kultur,eppoCode:s.eppo_code??a.eppoCode,bbch:s.bbch??a.bbch,datum:s.datum??a.datum,dateIso:s.date_iso??a.dateIso,uhrzeit:s.uhrzeit??a.uhrzeit,usageType:s.usage_type??a.usageType,areaHa:s.area_ha??a.areaHa,areaAr:s.area_ar??a.areaAr,areaSqm:s.area_sqm??a.areaSqm,waterVolume:s.water_volume??a.waterVolume,invekos:s.invekos??a.invekos,gps:s.gps??a.gps,gpsCoordinates:s.gps_latitude!=null&&s.gps_longitude!=null?{latitude:s.gps_latitude,longitude:s.gps_longitude}:a.gpsCoordinates||null,gpsPointId:s.gps_point_id??a.gpsPointId,qsMaschine:s.qs_maschine??a.qsMaschine,qsSchaderreger:s.qs_schaderreger??a.qsSchaderreger,qsVerantwortlicher:s.qs_verantwortlicher??a.qsVerantwortlicher,qsWetter:s.qs_wetter??a.qsWetter,qsBehandlungsart:s.qs_behandlungsart??a.qsBehandlungsart,savedAt:a.savedAt||s.created_at,items:[]}}}),!n)throw new Error("History entry not found");return t.exec({sql:`SELECT id, medium_id, payload_json,
            medium_name, medium_unit, method_id, method_label, medium_value,
            calculated_total, zulassungsnummer, wartezeit, wirkstoff,
            input_area_ha, input_area_ar, input_area_sqm, input_water_volume
          FROM history_items WHERE history_id = ?`,bind:[e],rowMode:"object",callback:s=>{let a={};if(s.payload_json)try{a=JSON.parse(s.payload_json)}catch(i){console.warn("Could not parse payload_json",i)}n.items.push({id:s.medium_id??a.id,mediumId:s.medium_id??a.mediumId,name:s.medium_name??a.name,unit:s.medium_unit??a.unit,methodId:s.method_id??a.methodId,methodLabel:s.method_label??a.methodLabel,value:s.medium_value??a.value,total:s.calculated_total??a.total,zulassungsnummer:s.zulassungsnummer??a.zulassungsnummer,wartezeit:s.wartezeit??a.wartezeit,wirkstoff:s.wirkstoff??a.wirkstoff,inputs:{areaHa:s.input_area_ha??a.inputs?.areaHa,areaAr:s.input_area_ar??a.inputs?.areaAr,areaSqm:s.input_area_sqm??a.inputs?.areaSqm,waterVolume:s.input_water_volume??a.inputs?.waterVolume}})}}),n}async function Bt(e){if(!t)throw new Error("Database not initialized");const n=e&&e.header?e.header:e||{},s=n&&n.clientUuid?String(n.clientUuid):null;if(s)try{const a=t.selectValue("SELECT id FROM history WHERE json_extract(header_json, '$.clientUuid') = ? LIMIT 1",[s]);if(a!=null)return{id:a,duplicate:!0}}catch{}t.exec("BEGIN TRANSACTION");try{const a=e.header?{...e.header}:{...e};delete a.items;const i=e.savedAt||a.savedAt||a.createdAt||new Date().toISOString();a.createdAt||(a.createdAt=i);const r=a.gpsCoordinates||{},l=a.company||{},o=t.prepare(`
      INSERT INTO history (
        created_at, header_json,
        ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
        uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
        invekos, gps, gps_latitude, gps_longitude, gps_point_id,
        qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart,
        company_name, company_address, company_headline, company_email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);o.bind([i,JSON.stringify(a),a.ersteller||null,a.standort||null,a.kultur||null,a.eppoCode||null,a.bbch||null,a.datum||null,a.dateIso||null,a.uhrzeit||null,a.usageType||null,a.areaHa??null,a.areaAr??null,a.areaSqm??null,a.waterVolume??null,a.invekos||null,a.gps||null,r.latitude??null,r.longitude??null,a.gpsPointId||null,a.qsMaschine||null,a.qsSchaderreger||null,a.qsVerantwortlicher||null,a.qsWetter||null,a.qsBehandlungsart||null,l.name||null,l.address||null,l.headline||null,l.contactEmail||null]).step();const u=t.selectValue("SELECT last_insert_rowid()");o.finalize();const c=e.items&&Array.isArray(e.items)?e.items:[];if(c.length){const E=t.prepare(`
        INSERT INTO history_items (
          history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);for(const p of c){const T=p.inputs||{};E.bind([u,p.mediumId||p.medium_id||p.id||"",JSON.stringify(p),p.name||null,p.unit||null,p.methodId||null,p.methodLabel||null,p.value??null,p.total??null,p.zulassungsnummer||null,p.wartezeit??null,p.wirkstoff||null,T.areaHa??null,T.areaAr??null,T.areaSqm??null,T.waterVolume??null]).step(),E.reset()}E.finalize()}return t.exec("COMMIT"),{success:!0,id:u}}catch(a){throw t.exec("ROLLBACK"),a}}async function Ht(e){if(!t)throw new Error("Database not initialized");const n=t.prepare("DELETE FROM history WHERE id = ?");return n.bind([e]).step(),n.finalize(),{success:!0}}async function Gt(){if(!t)throw new Error("Database not initialized");const e=N.capi.sqlite3_js_db_export(t.pointer);return{data:e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}}async function jt(e){if(!t)throw new Error("Database not initialized");const n=e instanceof Uint8Array?e:new Uint8Array(e);if($==="opfs"&&N?.oo1?.OpfsDb&&N?.opfs)return t.close(),await N.oo1.OpfsDb.importDb("/pflanzenschutz.sqlite",n),t=he("opfs"),ae(),await ie(),$="opfs",j=!0,{success:!0,mode:"opfs"};t.close();const s=new N.oo1.DB,a=N.wasm.scopedAllocPush();try{const i=N.wasm.allocFromTypedArray(n),r=N.wasm.allocCString("main"),l=(N.capi.SQLITE_DESERIALIZE_FREEONCLOSE||0)|(N.capi.SQLITE_DESERIALIZE_RESIZEABLE||0),o=N.capi.sqlite3_deserialize(s.pointer,r,i,n.byteLength,n.byteLength,l);if(o!==N.capi.SQLITE_OK)throw s.close(),new Error(`sqlite3_deserialize failed: ${N.capi.sqlite3_js_rc_str(o)||o}`)}finally{N.wasm.scopedAllocPop(a)}return t=s,ae(),await ie(),$="memory",j=!0,{success:!0,mode:"memory"}}async function $t(e={}){if(!t)throw new Error("Database not initialized");if(!N)throw new Error("SQLite not initialized");const{data:n}=e;if(!n)throw new Error("Keine Daten zum Importieren übergeben");const s=n instanceof Uint8Array?n:new Uint8Array(n);console.log(`[EPPO Import] Lade Datenbank, ${s.length} bytes`);const a=Te(s),i=[];let r=0;try{const l=[];a.exec({sql:"SELECT name FROM sqlite_master WHERE type='table'",callback:o=>{o&&o[0]&&l.push(o[0])}}),console.log("[EPPO Import] Gefundene Tabellen:",l),l.includes("eppo")?(console.log('[EPPO Import] Nutze neue deutsche Tabelle "eppo"'),a.exec({sql:"SELECT code, name FROM eppo ORDER BY name",callback:o=>{if(!o||!o[0])return;const u=String(o[0]).trim().toUpperCase(),c=o[1]?String(o[1]).trim():u;i.push({code:u,name:c,language:"DE",dtcode:null,dtLabel:"plant",languageLabel:"Deutsch",authority:null,nameDe:c,nameEn:null,nameLa:null})}})):l.includes("t_codes")?(console.log("[EPPO Import] Nutze alte Struktur mit t_codes"),a.exec({sql:`
          SELECT UPPER(TRIM(c.eppocode)) AS code, TRIM(n.fullname) AS name
          FROM t_codes c
          JOIN t_names n ON c.codeid = n.codeid
          WHERE n.codelang = 'de' AND n.fullname IS NOT NULL
          ORDER BY n.fullname
        `,callback:o=>{if(!o||!o[0])return;const u=String(o[0]).trim().toUpperCase(),c=o[1]?String(o[1]).trim():u;i.push({code:u,name:c,language:"DE",dtcode:null,dtLabel:"plant",languageLabel:"Deutsch",authority:null,nameDe:c,nameEn:null,nameLa:null})}})):console.error("[EPPO Import] Keine bekannte Tabellenstruktur gefunden!"),r=i.length,console.log(`[EPPO Import] ${i.length} Einträge gelesen`)}finally{a.close()}t.exec("BEGIN TRANSACTION");try{if(X(t),t.exec("DELETE FROM lookup_eppo_codes"),i.length){const l=t.prepare(`INSERT OR REPLACE INTO lookup_eppo_codes (
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);for(const o of i)l.bind([o.code,o.name,o.language||"",o.dtcode,1,o.dtLabel,o.languageLabel,o.authority,o.nameDe,o.nameEn,o.nameLa]).step(),l.reset();l.finalize()}return z("lookup:eppo:lastImport",new Date().toISOString()),z("lookup:eppo:count",String(r||i.length)),t.exec("COMMIT"),{success:!0,count:i.length}}catch(l){throw t.exec("ROLLBACK"),console.error("EPPO-Lookup-Import fehlgeschlagen",l),l}}async function Wt(e={}){if(!t)throw new Error("Database not initialized");if(!N)throw new Error("SQLite not initialized");const{data:n}=e;if(!n)throw new Error("Keine Daten zum Importieren übergeben");const s=n instanceof Uint8Array?n:new Uint8Array(n);console.log(`[BBCH Import] Lade Datenbank, ${s.length} bytes`);const a=Te(s),i=[];try{const r=[];a.exec({sql:"SELECT name FROM sqlite_master WHERE type='table'",callback:l=>{l&&l[0]&&r.push(l[0])}}),console.log("[BBCH Import] Gefundene Tabellen:",r),r.includes("bbch")?(console.log('[BBCH Import] Nutze neue deutsche Tabelle "bbch"'),a.exec({sql:"SELECT code, label, stage_group FROM bbch ORDER BY CAST(code AS INTEGER)",callback:l=>{if(!l||!l[0])return;const o=String(l[0]).trim(),u=l[1]?String(l[1]).trim():o,c=l[2]!=null?Number(l[2]):null;i.push({code:o,label:u,principal:c,secondary:null,definition:u,kind:null})}})):r.includes("bbch_stage")?(console.log("[BBCH Import] Nutze alte Struktur mit bbch_stage"),a.exec({sql:"SELECT bbch_code, label_de, definition_1, definition_2, principal_stage FROM bbch_stage ORDER BY CAST(bbch_code AS INTEGER)",callback:l=>{if(!l||!l[0])return;const o=String(l[0]).trim();let u=l[1]||o;const c=l[2]||"",E=l[3]||"";E.includes("Quelle BBCH")||E.includes("(G)")||E.includes("(D)")?u=E:(c.includes("Quelle BBCH")||c.includes("(G)")||c.includes("(D)"))&&(u=c),i.push({code:o,label:u,principal:l[4]!=null?Number(l[4]):null,secondary:null,definition:u,kind:null})}})):console.error("[BBCH Import] Keine bekannte Tabellenstruktur gefunden!"),console.log(`[BBCH Import] ${i.length} Einträge gelesen`)}finally{a.close()}t.exec("BEGIN TRANSACTION");try{if(X(t),t.exec("DELETE FROM lookup_bbch_stages"),i.length){const r=t.prepare(`INSERT OR REPLACE INTO lookup_bbch_stages
        (code, label, principal_stage, secondary_stage, definition, kind)
        VALUES (?, ?, ?, ?, ?, ?)`);for(const l of i)r.bind([l.code,l.label,l.principal,l.secondary,l.definition||null,l.kind]).step(),r.reset();r.finalize()}return z("lookup:bbch:lastImport",new Date().toISOString()),z("lookup:bbch:count",String(i.length)),t.exec("COMMIT"),{success:!0,count:i.length}}catch(r){throw t.exec("ROLLBACK"),console.error("BBCH-Lookup-Import fehlgeschlagen",r),r}}function Vt(e={}){if(!t)throw new Error("Database not initialized");X(t);const n=(e.query||"").trim(),s=Math.min(Math.max(Number(e.limit)||10,1),50),a=Math.max(Number(e.offset)||0,0),i=(e.language||"").trim().toUpperCase(),r=i.length>0,l=[],o=t.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes")||0;if(console.log(`[EPPO Search] Suche: "${n}", Sprache: "${i}", hasLanguageFilter: ${r}`),console.log(`[EPPO Search] Gesamt ${o} Einträge in lookup_eppo_codes`),n&&o>0){const h=`%${n.toUpperCase()}%`,R=t.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes WHERE UPPER(name) LIKE ? OR UPPER(IFNULL(name_de, '')) LIKE ?",[h,h])||0;console.log(`[EPPO Search] ${R} Treffer für "${n}"`);const d=[];t.exec({sql:"SELECT code, name, language, name_de FROM lookup_eppo_codes LIMIT 3",callback:_=>{_&&d.push({code:_[0],name:_[1],lang:_[2],name_de:_[3]})}}),console.log("[EPPO Search] Beispiel-Einträge:",d)}if(r&&i==="DE")return Kt({query:n,limit:s,offset:a});const u=`
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
  `,c="UPPER(IFNULL(language, '')) = ?",E=h=>{r&&h.push(i)};if(!n){const h=r?`WHERE ${c}`:"",R=[];E(R),R.push(s,a),t.exec({sql:`${u}
        ${h}
        ORDER BY name
        LIMIT ? OFFSET ?
      `,bind:R,callback:f=>{l.push({code:f[0],name:f[1],dtcode:f[2]||null,language:f[3]||null,dtLabel:f[4]||null,languageLabel:f[5]||null,authority:f[6]||null,nameDe:f[7]||null,nameEn:f[8]||null,nameLa:f[9]||null})}});const d=r?`SELECT COUNT(*) FROM lookup_eppo_codes WHERE ${c}`:"SELECT COUNT(*) FROM lookup_eppo_codes",_=[];E(_);const g=Number(t.selectValue(d,_))||0;return{rows:l,total:g}}const p=n.toUpperCase(),T=`%${p}%`,S=["(code LIKE ? OR UPPER(name) LIKE ? OR UPPER(IFNULL(name_de, '')) LIKE ?)"];r&&S.push(c);const b=`WHERE ${S.join(" AND ")}`,O=[T,T,T];E(O);const L=Number(t.selectValue(`SELECT COUNT(*) FROM lookup_eppo_codes ${b}`,O))||0,k=[T,T,T];E(k);const m=[`${p}%`,T],I=[s,a];return t.exec({sql:`${u}
      ${b}
      ORDER BY CASE WHEN code LIKE ? THEN 0 ELSE 1 END,
               CASE WHEN UPPER(IFNULL(name_de, '')) LIKE ? THEN 0 ELSE 1 END,
               name
      LIMIT ? OFFSET ?
    `,bind:[...k,...m,...I],callback:h=>{l.push({code:h[0],name:h[1],dtcode:h[2]||null,language:h[3]||null,dtLabel:h[4]||null,languageLabel:h[5]||null,authority:h[6]||null,nameDe:h[7]||null,nameEn:h[8]||null,nameLa:h[9]||null})}}),{rows:l,total:L}}function Kt(e={}){const n=(e.query||"").trim(),s=Math.min(Math.max(Number(e.limit)||10,1),50),a=Math.max(Number(e.offset)||0,0),i=[],r=be(),l=`(${r}) AS german_lookup`;if(!n){t.exec({sql:`
        SELECT code, name, dtcode, language, dt_label, language_label, authority, name_de, name_en, name_la
        FROM ${l}
        ORDER BY name
        LIMIT ? OFFSET ?
      `,bind:[s,a],callback:T=>{T&&i.push({code:T[0],name:T[1],dtcode:T[2]||null,language:T[3]||"DE",dtLabel:T[4]||null,languageLabel:T[5]||"Deutsch",authority:T[6]||null,nameDe:T[7]||null,nameEn:T[8]||null,nameLa:T[9]||null})}});const p=Number(t.selectValue(`SELECT COUNT(*) FROM (${r}) AS german_lookup`))||0;return{rows:i,total:p}}const o=n.toUpperCase(),u=`%${o}%`,c=Number(t.selectValue(`SELECT COUNT(*) FROM ${l} WHERE code LIKE ? OR UPPER(name) LIKE ?`,[u,u]))||0,E=[u,u,`${o}%`,s,a];return t.exec({sql:`
      SELECT code, name, dtcode, language, dt_label, language_label, authority, name_de, name_en, name_la
      FROM ${l}
      WHERE code LIKE ? OR UPPER(name) LIKE ?
      ORDER BY CASE WHEN code LIKE ? THEN 0 ELSE 1 END, name
      LIMIT ? OFFSET ?
    `,bind:E,callback:p=>{p&&i.push({code:p[0],name:p[1],dtcode:p[2]||null,language:p[3]||"DE",dtLabel:p[4]||null,languageLabel:p[5]||"Deutsch",authority:p[6]||null,nameDe:p[7]||null,nameEn:p[8]||null,nameLa:p[9]||null})}}),{rows:i,total:c}}function Yt(){if(!t)throw new Error("Database not initialized");X(t);const e=[];t.exec({sql:`
      SELECT
        UPPER(IFNULL(language, '')) AS language_code,
        MAX(language_label) AS language_label,
        COUNT(*) AS entry_count
      FROM lookup_eppo_codes
      GROUP BY UPPER(IFNULL(language, ''))
      ORDER BY CASE WHEN language_code = '' THEN 0 ELSE 1 END, language_code;
    `,callback:s=>{if(!s)return;const a=s[0]?String(s[0]).trim().toUpperCase():"",i=s[1]?String(s[1]).trim():null,r=s[2]!=null?Number(s[2]):0;e.push({language:a,label:i,count:r})}});const n=Number(t.selectValue(`SELECT COUNT(*) FROM (${be()}) AS german_lookup`))||0;if(n>0){const s=e.find(a=>(a.language||"").toUpperCase()==="DE");if(s){const a=s.label?s.label.trim():"";s.label=a||"Deutsch",s.count=n}else e.push({language:"DE",label:"Deutsch",count:n})}return e.sort((s,a)=>{const i=l=>l===""?0:1,r=i(s.language||"")-i(a.language||"");return r!==0?r:(s.language||"").localeCompare(a.language||"")}),e.map(s=>{const a=s.language||"",i=s.label&&s.label.length?s.label:a||"Ohne Sprachcode";return{language:a,label:i,count:s.count}})}function be(){return`
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
  `}function Jt(e={}){if(!t)throw new Error("Database not initialized");X(t);const n=(e.query||"").trim(),s=Math.min(Math.max(Number(e.limit)||10,1),50),a=Math.max(Number(e.offset)||0,0),i=[],r="ORDER BY label";if(!n){t.exec({sql:`
        SELECT code, label, principal_stage, secondary_stage, definition, kind
        FROM lookup_bbch_stages
        ${r}
        LIMIT ? OFFSET ?
      `,bind:[s,a],callback:c=>{i.push({code:c[0],label:c[1],principalStage:c[2]!=null?Number(c[2]):null,secondaryStage:c[3]!=null?Number(c[3]):null,definition:c[4]||null,kind:c[5]||null})}});const u=Number(t.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages"))||0;return{rows:i,total:u}}const l=`%${n.toUpperCase()}%`,o=Number(t.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages WHERE code LIKE ? OR UPPER(label) LIKE ? OR UPPER(IFNULL(definition, '')) LIKE ?",[l,l,l]))||0;return t.exec({sql:`
      SELECT code, label, principal_stage, secondary_stage, definition, kind
      FROM lookup_bbch_stages
      WHERE code LIKE ? OR UPPER(label) LIKE ? OR UPPER(IFNULL(definition, '')) LIKE ?
      ORDER BY 
        CASE WHEN code LIKE ? THEN 0 ELSE 1 END,
        CASE WHEN UPPER(IFNULL(definition, '')) LIKE ? THEN 0 ELSE 1 END,
        label
      LIMIT ? OFFSET ?
    `,bind:[l,l,l,l,l,s,a],callback:u=>{i.push({code:u[0],label:u[1],principalStage:u[2]!=null?Number(u[2]):null,secondaryStage:u[3]!=null?Number(u[3]):null,definition:u[4]||null,kind:u[5]||null})}}),{rows:i,total:o}}function Qt(){if(!t)throw new Error("Database not initialized");X(t);const e=Number(t.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes"))||0,n=Number(t.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages"))||0;return{eppo:{count:e,lastImport:x("lookup:eppo:lastImport")},bbch:{count:n,lastImport:x("lookup:bbch:lastImport")}}}})();
