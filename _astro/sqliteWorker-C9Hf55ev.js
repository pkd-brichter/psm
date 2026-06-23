(function(){"use strict";let S=null,t=null,H=!1,G="memory";const ie="https://cdn.jsdelivr.net/npm/@sqlite.org/sqlite-wasm@3.46.1-build1/sqlite-wasm/jswasm/",z="gps_active_point";function U(e,n=50,s=500){const a=Number(e);return!Number.isFinite(a)||a<=0?n:Math.min(Math.max(1,Math.floor(a)),s)}function Te(e){if(typeof e!="string")return null;try{return JSON.parse(e)}catch(n){return console.warn("Failed to parse payload JSON",n),null}}function se(e=t){e&&e.exec(`
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
  `)}function I(e,n,s){if(!e)return!1;const a=`SELECT 1 FROM pragma_table_info('${n}') WHERE name = '${s}' LIMIT 1`;return!!e.selectValue(a)}function y(e,n){if(!e||!n)return!1;const s=`SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = '${n}' LIMIT 1`;return!!e.selectValue(s)}function he(e=t){e&&(I(e,"mediums","zulassungsnummer")||e.exec("ALTER TABLE mediums ADD COLUMN zulassungsnummer TEXT"))}function j(e=t){if(e){if(!I(e,"mediums","wartezeit"))try{e.exec("ALTER TABLE mediums ADD COLUMN wartezeit TEXT"),console.log("[DB] Added wartezeit column to mediums")}catch(n){console.warn("[DB] Could not add wartezeit column:",n.message)}if(!I(e,"mediums","wirkstoff"))try{e.exec("ALTER TABLE mediums ADD COLUMN wirkstoff TEXT"),console.log("[DB] Added wirkstoff column to mediums")}catch(n){console.warn("[DB] Could not add wirkstoff column:",n.message)}}}function x(e=t){if(!e)return;const n=()=>{e.exec("DROP TABLE IF EXISTS lookup_eppo_codes"),e.exec(`
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
    `)};I(e,"lookup_eppo_codes","language")?e.exec(`
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
  `);const s=[{name:"dt_label",type:"TEXT"},{name:"language_label",type:"TEXT"},{name:"authority",type:"TEXT"},{name:"name_de",type:"TEXT"},{name:"name_en",type:"TEXT"},{name:"name_la",type:"TEXT"}];for(const a of s)I(e,"lookup_eppo_codes",a.name)||e.exec(`ALTER TABLE lookup_eppo_codes ADD COLUMN ${a.name} ${a.type}`)}function v(e=t){e&&e.exec(`
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
  `)}function X(e=t){e&&e.exec(`
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
  `)}function fe(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`archive_${Date.now()}_${Math.random().toString(16).slice(2)}`}function re(e){if(!e||typeof e!="object")return null;const n=e.id?String(e.id):fe(),s=e.archivedAt||e.archived_at||new Date().toISOString(),a=e.startDate||e.start_date||null,i=e.endDate||e.end_date||null,r=Number(e.entryCount??e.entry_count??0)||0,o=e.fileName||e.file_name||"",l=e.storageHint||e.storage_hint||null,u=e.note??e.note_text??null;return{id:n,archivedAt:s,startDate:a,endDate:i,entryCount:r,fileName:o,storageHint:l,note:u,metadata:{...e,id:n,archivedAt:s,startDate:a,endDate:i,entryCount:r,fileName:o,storageHint:l,note:u}}}function K(e){return{id:e.id,archivedAt:e.archivedAt,startDate:e.startDate??null,endDate:e.endDate??null,entryCount:e.entryCount??0,fileName:e.fileName??"",storageHint:e.storageHint??null,note:e.note??null}}function Y(e=[],n=t){if(X(n),n.exec("DELETE FROM archive_logs"),!Array.isArray(e)||!e.length)return[];const s=n.prepare(`INSERT OR REPLACE INTO archive_logs
      (id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`),a=[];for(const i of e){const r=re(i);r&&(s.bind([r.id,r.archivedAt,r.startDate,r.endDate,r.entryCount,r.fileName,r.storageHint,r.note,JSON.stringify(r.metadata||i||{})]).step(),s.reset(),a.push(K(r)))}return s.finalize(),a}function oe(e=t){X(e);const n=[];return e.exec({sql:`SELECT id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json
          FROM archive_logs
          ORDER BY datetime(archived_at) DESC, id DESC`,rowMode:"object",callback:s=>{const a=J(s);a&&n.push(a)}}),n}function J(e){if(!e)return null;const n=e.metadata_json?Te(e.metadata_json):null,s=n&&typeof n=="object"?{...n}:{};return s.id=String(e.id),s.archivedAt=e.archived_at||s.archivedAt||new Date().toISOString(),s.startDate=e.start_date??s.startDate??null,s.endDate=e.end_date??s.endDate??null,s.entryCount=Number(e.entry_count??s.entryCount??0)||0,s.fileName=e.file_name||s.fileName||"",s.storageHint=e.storage_hint??s.storageHint??null,s.note=e.note??s.note??null,s}function le(e=t){const n=oe(e).map(s=>K(s));w("archives",JSON.stringify({logs:n}),e)}function be(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`gps_${Date.now()}_${Math.random().toString(16).slice(2)}`}function Q(e){return e?{id:String(e.id),name:e.name!=null?String(e.name):"",description:e.description??null,latitude:Number(e.latitude),longitude:Number(e.longitude),source:e.source??null,created_at:e.created_at||new Date().toISOString(),updated_at:e.updated_at||new Date().toISOString(),nutzflaeche_qm:e.nutzflaeche_qm!=null?Number(e.nutzflaeche_qm):null,kind:e.kind??null}:null}function Se(e){if(!t||!e)return null;let n=null;return t.exec({sql:`SELECT id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind
           FROM gps_points
           WHERE id = ?
           LIMIT 1`,bind:[e],rowMode:"object",callback:s=>{n||(n=Q(s))}}),n}async function Ne(){if(!t)throw new Error("Database not initialized");v();const e=[];t.exec({sql:`SELECT id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind
          FROM gps_points
          ORDER BY datetime(updated_at) DESC`,rowMode:"object",callback:s=>{e.push(Q(s))}});const n=F(z);return{rows:e,activePointId:n||null}}async function Le(e={}){if(!t)throw new Error("Database not initialized");v();const{cursor:n=null,limit:s,pageSize:a,search:i,includeTotal:r=!1}=e||{},o=U(a??s,100,500),l=typeof i=="string"?i.trim():"",u=[],d=[];if(l){u.push("(LOWER(name) LIKE LOWER(?) OR LOWER(COALESCE(description, '')) LIKE LOWER(?))");const m=`%${l}%`;d.push(m,m)}const _=[...u],p=[...d];if(n&&n.updatedAt){const m=n.id!=null?String(n.id):"",c=n.updatedAt;_.push(`(
      datetime(updated_at) < datetime(?)
      OR (datetime(updated_at) = datetime(?) AND id > ?)
    )`),p.push(c,c,m)}const g=_.length?`WHERE ${_.join(" AND ")}`:"",N=t.prepare(`SELECT rowid AS cursor_rowid, id, name, description, latitude, longitude, source, created_at, updated_at
     FROM gps_points
     ${g}
     ORDER BY datetime(updated_at) DESC, id ASC
     LIMIT ?`);N.bind([...p,o+1]);const f=[];for(;N.step();)f.push(N.getAsObject());N.finalize();const k=f.length>o,R=k?f.slice(0,o):f,E=R.map(m=>Q(m)).filter(m=>m!==null),A=R.length?R[R.length-1]:null,L=k&&A?{id:String(A.id??""),updatedAt:A.updated_at||A.updatedAt||null,rowid:Number(A.cursor_rowid)||Number(A.rowid||0)}:null;let T;if(r){const m=u.length?`WHERE ${u.join(" AND ")}`:"",c=t.prepare(`SELECT COUNT(*) AS total FROM gps_points ${m}`);if(d.length&&c.bind(d),c.step()){const O=c.getAsObject();T=Number(O?.total)||0}else T=0;c.finalize()}const h=F(z);return{items:E,nextCursor:L,hasMore:k,pageSize:o,activePointId:h||null,totalCount:T}}async function Ae(e={}){if(!t)throw new Error("Database not initialized");v();const n=String(e.id||be()),s=String(e.name??"").trim();if(!s)throw new Error("GPS-Punkt benötigt einen Namen.");const a=Number(e.latitude),i=Number(e.longitude);if(!Number.isFinite(a)||!Number.isFinite(i))throw new Error("GPS-Punkt hat ungültige Koordinaten.");const r=e.description!=null?String(e.description):null,o=e.source!=null?String(e.source):null,l=e.nutzflaecheQm??e.nutzflaeche_qm??null,u=l!=null&&Number.isFinite(Number(l))?Number(l):null,d=e.kind!=null?String(e.kind):null,_=new Date().toISOString();if(t.selectValue("SELECT 1 FROM gps_points WHERE id = ? LIMIT 1",[n])){const N=t.prepare(`UPDATE gps_points
       SET name = ?, description = ?, latitude = ?, longitude = ?, source = ?, nutzflaeche_qm = ?, kind = ?, updated_at = ?
       WHERE id = ?`);N.bind([s,r,a,i,o,u,d,_,n]),N.step(),N.finalize()}else{const N=t.prepare(`INSERT INTO gps_points (id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);N.bind([n,s,r,a,i,o,_,_,u,d]),N.step(),N.finalize()}const g=Se(n);if(!g)throw new Error("GPS-Punkt konnte nicht gelesen werden.");return g}async function Re(e={}){if(!t)throw new Error("Database not initialized");v();const n=String(e.id??"").trim();if(!n)throw new Error("ID für GPS-Punkt fehlt.");const s=t.prepare("DELETE FROM gps_points WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),F(z)===n&&me(z),{success:!0}}async function Ie(e={}){if(!t)throw new Error("Database not initialized");v();const n=e&&typeof e.id=="string"?e.id.trim():null;if(n){if(!t.selectValue("SELECT 1 FROM gps_points WHERE id = ? LIMIT 1",[n]))throw new Error("GPS-Punkt wurde nicht gefunden.");return w(z,n),{activePointId:n}}return me(z),{activePointId:null}}async function Oe(){if(!t)throw new Error("Database not initialized");return{activePointId:F(z)||null}}function D(e=t){e&&e.exec(`
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
  `)}function Z(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`km_${Date.now()}_${Math.random().toString(16).slice(2)}`}function ue(e){return e?{id:String(e.id),kultur:e.kultur!=null?String(e.kultur):"",anbau:e.anbau??null,problem:e.problem??null,mittelName:e.mittel_name!=null?String(e.mittel_name):"",kennr:e.kennr??null,wirkstoff:e.wirkstoff??null,eppoCode:e.eppo_code??null,bbchDefault:e.bbch_default??null,bbch:e.bbch??null,wartezeit:e.wartezeit??null,aufwandWert:e.aufwand_wert??null,aufwandEinheit:e.aufwand_einheit??null,aufwandBezug:e.aufwand_bezug??null,maxAnwendungen:e.max_anwendungen??null,bemerkung:e.bemerkung??null,istPsm:e.ist_psm?1:0,istKupfer:e.ist_kupfer?1:0,sortOrder:e.sort_order!=null?Number(e.sort_order):0,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}async function ke(){if(!t)throw new Error("Database not initialized");D();const e=[];return t.exec({sql:`SELECT kultur, anbau, COUNT(*) AS anzahl,
                 MAX(eppo_code) AS eppo_code, MAX(bbch_default) AS bbch_default
          FROM kultur_mittel
          GROUP BY kultur, anbau
          ORDER BY kultur COLLATE NOCASE, anbau`,rowMode:"object",callback:n=>{e.push({kultur:n.kultur!=null?String(n.kultur):"",anbau:n.anbau??null,anzahl:n.anzahl!=null?Number(n.anzahl):0,eppoCode:n.eppo_code??null,bbchDefault:n.bbch_default??null})}}),{rows:e}}async function Ce(e={}){if(!t)throw new Error("Database not initialized");D();const n=e&&e.kultur!=null?String(e.kultur):null,s=e&&e.anbau!=null?String(e.anbau):null,a=[],i=[];n&&(a.push("kultur = ?"),i.push(n)),s&&(a.push("anbau = ?"),i.push(s));const r=a.length?`WHERE ${a.join(" AND ")}`:"",o=[];return t.exec({sql:`SELECT * FROM kultur_mittel ${r}
          ORDER BY sort_order, mittel_name COLLATE NOCASE`,bind:i,rowMode:"object",callback:l=>o.push(ue(l))}),{rows:o}}async function Me(e={}){if(!t)throw new Error("Database not initialized");D();const n=String(e.id||Z()),s=String(e.kultur??"").trim(),a=String(e.mittelName??e.mittel_name??"").trim();if(!s||!a)throw new Error("kultur und mittel_name sind erforderlich.");const i=new Date().toISOString(),r={anbau:e.anbau!=null?String(e.anbau):null,problem:e.problem!=null?String(e.problem):null,kennr:e.kennr!=null?String(e.kennr):null,wirkstoff:e.wirkstoff!=null?String(e.wirkstoff):null,wartezeit:e.wartezeit!=null?String(e.wartezeit):null,aufwand_wert:e.aufwandWert??e.aufwand_wert!=null?String(e.aufwandWert??e.aufwand_wert):null,aufwand_einheit:e.aufwandEinheit??e.aufwand_einheit!=null?String(e.aufwandEinheit??e.aufwand_einheit):null,aufwand_bezug:e.aufwandBezug??e.aufwand_bezug!=null?String(e.aufwandBezug??e.aufwand_bezug):null,max_anwendungen:e.maxAnwendungen!=null?String(e.maxAnwendungen):null,bemerkung:e.bemerkung!=null?String(e.bemerkung):null,ist_psm:e.istPsm===0||e.ist_psm===0||e.istPsm===!1?0:1,ist_kupfer:e.istKupfer||e.ist_kupfer?1:0,sort_order:Number.isFinite(Number(e.sortOrder??e.sort_order))?Number(e.sortOrder??e.sort_order):0};if(t.selectValue("SELECT 1 FROM kultur_mittel WHERE id = ? LIMIT 1",[n])){const u=t.prepare("UPDATE kultur_mittel SET kultur=?, anbau=?, problem=?, mittel_name=?, kennr=?, wirkstoff=?, wartezeit=?, aufwand_wert=?, aufwand_einheit=?, aufwand_bezug=?, max_anwendungen=?, bemerkung=?, ist_psm=?, ist_kupfer=?, sort_order=?, updated_at=? WHERE id=?");u.bind([s,r.anbau,r.problem,a,r.kennr,r.wirkstoff,r.wartezeit,r.aufwand_wert,r.aufwand_einheit,r.aufwand_bezug,r.max_anwendungen,r.bemerkung,r.ist_psm,r.ist_kupfer,r.sort_order,i,n]),u.step(),u.finalize()}else{const u=t.prepare("INSERT INTO kultur_mittel (id, kultur, anbau, problem, mittel_name, kennr, wirkstoff, wartezeit, aufwand_wert, aufwand_einheit, aufwand_bezug, max_anwendungen, bemerkung, ist_psm, ist_kupfer, sort_order, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");u.bind([n,s,r.anbau,r.problem,a,r.kennr,r.wirkstoff,r.wartezeit,r.aufwand_wert,r.aufwand_einheit,r.aufwand_bezug,r.max_anwendungen,r.bemerkung,r.ist_psm,r.ist_kupfer,r.sort_order,i,i]),u.step(),u.finalize()}let l=null;return t.exec({sql:"SELECT * FROM kultur_mittel WHERE id = ? LIMIT 1",bind:[n],rowMode:"object",callback:u=>{l||(l=ue(u))}}),l}async function ye(e={}){if(!t)throw new Error("Database not initialized");D();const n=String(e.id??"").trim();if(!n)throw new Error("ID fehlt.");const s=t.prepare("DELETE FROM kultur_mittel WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}async function De(e={}){if(!t)throw new Error("Database not initialized");v(),D();const n=new Date().toISOString(),s={gpsPoints:0,kulturMittel:0},a=Array.isArray(e.gpsPoints)?e.gpsPoints:[];if(a.length&&(t.selectValue("SELECT COUNT(*) FROM gps_points")||0)===0){t.exec("BEGIN TRANSACTION");try{const r=t.prepare(`INSERT INTO gps_points (id,name,description,latitude,longitude,source,created_at,updated_at,nutzflaeche_qm,kind)
         VALUES (?,?,?,?,?,?,?,?,?,?)`);for(const o of a)r.bind([String(o.id),String(o.name??""),o.description??null,Number(o.latitude),Number(o.longitude),o.source??null,o.created_at||n,o.updated_at||n,o.nutzflaeche_qm!=null?Number(o.nutzflaeche_qm):null,o.kind??null]),r.step(),r.reset();r.finalize(),t.exec("COMMIT"),s.gpsPoints=a.length}catch(r){throw t.exec("ROLLBACK"),r}}const i=Array.isArray(e.kulturMittel)?e.kulturMittel:[];if(i.length&&(t.selectValue("SELECT COUNT(*) FROM kultur_mittel")||0)===0){t.exec("BEGIN TRANSACTION");try{const r=t.prepare(`INSERT INTO kultur_mittel (id,kultur,anbau,problem,mittel_name,kennr,wirkstoff,eppo_code,bbch_default,bbch,wartezeit,aufwand_wert,aufwand_einheit,aufwand_bezug,max_anwendungen,bemerkung,ist_psm,ist_kupfer,sort_order,created_at,updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);for(const o of i)r.bind([String(o.id),String(o.kultur??""),o.anbau??null,o.problem??null,String(o.mittel_name??""),o.kennr??null,o.wirkstoff??null,o.eppo_code??null,o.bbch_default??null,o.bbch??null,o.wartezeit??null,o.aufwand_wert??null,o.aufwand_einheit??null,o.aufwand_bezug??null,o.max_anwendungen??null,o.bemerkung??null,o.ist_psm!=null?Number(o.ist_psm):1,o.ist_kupfer!=null?Number(o.ist_kupfer):0,o.sort_order!=null?Number(o.sort_order):0,o.created_at||n,o.updated_at||n]),r.step(),r.reset();r.finalize(),t.exec("COMMIT"),s.kulturMittel=i.length}catch(r){throw t.exec("ROLLBACK"),r}}return s}async function ve(){if(!t)throw new Error("Database not initialized");D();const e=[];return t.exec({sql:`SELECT mittel_name, kennr, MAX(wirkstoff) AS wirkstoff,
            (SELECT k2.aufwand_einheit FROM kultur_mittel k2
               WHERE k2.mittel_name = k.mittel_name
                 AND IFNULL(k2.kennr,'') = IFNULL(k.kennr,'')
                 AND k2.aufwand_einheit IS NOT NULL AND k2.aufwand_einheit <> ''
               GROUP BY k2.aufwand_einheit ORDER BY COUNT(*) DESC LIMIT 1) AS einheit
          FROM kultur_mittel k
          GROUP BY mittel_name, kennr
          ORDER BY mittel_name COLLATE NOCASE`,rowMode:"object",callback:n=>{e.push({name:n.mittel_name!=null?String(n.mittel_name):"",kennr:n.kennr??null,wirkstoff:n.wirkstoff??null,einheit:n.einheit??null})}}),{rows:e}}function $(e=t){e&&e.exec(`
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
  `)}function ce(e){if(!e)return null;let n=[];try{n=e.geojson?JSON.parse(e.geojson):[]}catch{n=[]}return{id:String(e.id),name:e.name!=null?String(e.name):"",kultur:e.kultur??null,eppoCode:e.eppo_code??null,standortId:e.standort_id??null,color:e.color??null,latlngs:n,areaQm:e.area_qm!=null?Number(e.area_qm):0,bedW:e.bed_w!=null?Number(e.bed_w):null,pathW:e.path_w!=null?Number(e.path_w):null,rowSp:e.row_sp!=null?Number(e.row_sp):null,inRowSp:e.in_row_sp!=null?Number(e.in_row_sp):null,angle:e.angle!=null?Number(e.angle):0,beds:e.beds!=null?Number(e.beds):0,bedMeters:e.bed_meters!=null?Number(e.bed_meters):0,plants:e.plants!=null?Number(e.plants):0,bemerkung:e.bemerkung??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}}async function we(){if(!t)throw new Error("Database not initialized");$();const e=[];return t.exec({sql:"SELECT * FROM ackerflaechen ORDER BY datetime(created_at) ASC",rowMode:"object",callback:n=>e.push(ce(n))}),{rows:e}}async function ze(e={}){if(!t)throw new Error("Database not initialized");$();const n=String(e.id||Z()),s=String(e.name??"").trim()||"Fläche",a=new Date().toISOString(),i=JSON.stringify(Array.isArray(e.latlngs)?e.latlngs:[]),r=d=>d!=null&&Number.isFinite(Number(d))?Number(d):null,o=[s,e.kultur!=null?String(e.kultur):null,e.eppoCode!=null?String(e.eppoCode):null,e.standortId!=null?String(e.standortId):null,e.color!=null?String(e.color):null,i,r(e.areaQm),r(e.bedW),r(e.pathW),r(e.rowSp),r(e.inRowSp),r(e.angle),r(e.beds),r(e.bedMeters),r(e.plants),e.bemerkung!=null?String(e.bemerkung):null];if(t.selectValue("SELECT 1 FROM ackerflaechen WHERE id = ? LIMIT 1",[n])){const d=t.prepare("UPDATE ackerflaechen SET name=?, kultur=?, eppo_code=?, standort_id=?, color=?, geojson=?, area_qm=?, bed_w=?, path_w=?, row_sp=?, in_row_sp=?, angle=?, beds=?, bed_meters=?, plants=?, bemerkung=?, updated_at=? WHERE id=?");d.bind([...o,a,n]),d.step(),d.finalize()}else{const d=t.prepare("INSERT INTO ackerflaechen (name, kultur, eppo_code, standort_id, color, geojson, area_qm, bed_w, path_w, row_sp, in_row_sp, angle, beds, bed_meters, plants, bemerkung, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");d.bind([...o,a,a,n]),d.step(),d.finalize()}let u=null;return t.exec({sql:"SELECT * FROM ackerflaechen WHERE id = ? LIMIT 1",bind:[n],rowMode:"object",callback:d=>{u||(u=ce(d))}}),u}async function xe(e={}){if(!t)throw new Error("Database not initialized");$();const n=String(e.id??"").trim();if(!n)throw new Error("ID fehlt.");const s=t.prepare("DELETE FROM ackerflaechen WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}function q(e=t){e&&e.exec(`
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
  `)}function ee(e=t){e&&e.exec(`
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
  `)}function M(e=t){e&&e.exec(`
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
  `)}function de(e){return e?{id:String(e.id),kennr:e.kennr??null,mittelName:e.mittel_name!=null?String(e.mittel_name):"",wirkstoff:e.wirkstoff??null,typ:e.typ||"zugang",menge:e.menge!=null?Number(e.menge):0,einheit:e.einheit??null,datum:e.datum??null,charge:e.charge??null,ablauf:e.ablauf??null,lieferant:e.lieferant??null,preis:e.preis!=null?Number(e.preis):null,bemerkung:e.bemerkung??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}async function Fe(e={}){if(!t)throw new Error("Database not initialized");q();const n=e&&e.kennr!=null?String(e.kennr):null,s=[];return t.exec({sql:`SELECT * FROM lager_bewegungen ${n?"WHERE kennr = ?":""}
          ORDER BY datetime(COALESCE(datum, created_at)) DESC, created_at DESC`,bind:n?[n]:[],rowMode:"object",callback:a=>s.push(de(a))}),{rows:s}}async function Xe(e={}){if(!t)throw new Error("Database not initialized");q();const n=String(e.id||Z()),s=String(e.mittelName??e.mittel_name??"").trim();if(!s)throw new Error("Mittelname ist erforderlich.");const a=Number(e.menge);if(!Number.isFinite(a))throw new Error("Menge ist ungültig.");const i=new Date().toISOString(),r={kennr:e.kennr!=null?String(e.kennr):null,wirkstoff:e.wirkstoff!=null?String(e.wirkstoff):null,typ:e.typ!=null?String(e.typ):"zugang",einheit:e.einheit!=null?String(e.einheit):null,datum:e.datum!=null?String(e.datum):i.slice(0,10),charge:e.charge!=null?String(e.charge):null,ablauf:e.ablauf!=null?String(e.ablauf):null,lieferant:e.lieferant!=null?String(e.lieferant):null,preis:e.preis!=null&&Number.isFinite(Number(e.preis))?Number(e.preis):null,bemerkung:e.bemerkung!=null?String(e.bemerkung):null};if(t.selectValue("SELECT 1 FROM lager_bewegungen WHERE id = ? LIMIT 1",[n])){const u=t.prepare("UPDATE lager_bewegungen SET kennr=?, mittel_name=?, wirkstoff=?, typ=?, menge=?, einheit=?, datum=?, charge=?, ablauf=?, lieferant=?, preis=?, bemerkung=?, updated_at=? WHERE id=?");u.bind([r.kennr,s,r.wirkstoff,r.typ,a,r.einheit,r.datum,r.charge,r.ablauf,r.lieferant,r.preis,r.bemerkung,i,n]),u.step(),u.finalize()}else{const u=t.prepare("INSERT INTO lager_bewegungen (id, kennr, mittel_name, wirkstoff, typ, menge, einheit, datum, charge, ablauf, lieferant, preis, bemerkung, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");u.bind([n,r.kennr,s,r.wirkstoff,r.typ,a,r.einheit,r.datum,r.charge,r.ablauf,r.lieferant,r.preis,r.bemerkung,i,i]),u.step(),u.finalize()}let l=null;return t.exec({sql:"SELECT * FROM lager_bewegungen WHERE id = ? LIMIT 1",bind:[n],rowMode:"object",callback:u=>{l||(l=de(u))}}),l}async function Ue(e={}){if(!t)throw new Error("Database not initialized");q();const n=String(e.id??"").trim();if(!n)throw new Error("ID fehlt.");const s=t.prepare("DELETE FROM lager_bewegungen WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}async function qe(){if(!t)throw new Error("Database not initialized");q();const e=new Map,n=(i,r)=>i&&String(i).trim()||`name:${String(r||"").toLowerCase().trim()}`,s=(i,r)=>{const o=n(i,r);return e.has(o)||e.set(o,{kennr:i||null,name:r||"",einheit:null,wirkstoff:null,zugang:0,verbraucht:0,bestand:0,zulEnde:null,naechsterAblauf:null,anwendungen:0}),e.get(o)};t.exec({sql:`SELECT kennr, mittel_name, einheit, wirkstoff,
                 SUM(menge) AS zugang, MIN(NULLIF(ablauf,'')) AS naechster_ablauf
          FROM lager_bewegungen GROUP BY kennr, mittel_name`,rowMode:"object",callback:i=>{const r=s(i.kennr,i.mittel_name);r.zugang+=Number(i.zugang)||0,i.einheit&&!r.einheit&&(r.einheit=i.einheit),i.wirkstoff&&!r.wirkstoff&&(r.wirkstoff=i.wirkstoff),i.naechster_ablauf&&(r.naechsterAblauf=i.naechster_ablauf)}}),t.exec({sql:`SELECT zulassungsnummer AS kennr, medium_name, medium_unit, wirkstoff,
                 SUM(calculated_total) AS verbraucht, COUNT(*) AS n
          FROM history_items GROUP BY zulassungsnummer, medium_name`,rowMode:"object",callback:i=>{const r=s(i.kennr,i.medium_name);r.verbraucht+=Number(i.verbraucht)||0,r.anwendungen+=Number(i.n)||0,i.medium_unit&&!r.einheit&&(r.einheit=i.medium_unit),i.wirkstoff&&!r.wirkstoff&&(r.wirkstoff=i.wirkstoff)}});const a=Array.from(e.values());for(const i of a)i.bestand=i.zugang-i.verbraucht;return a.sort((i,r)=>(r.verbraucht||0)-(i.verbraucht||0)),{rows:a}}function P(e=t){e&&e.exec(`
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
  `)}function B(e=t){e&&e.exec(`
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
  `)}function W(e){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${e}_${Date.now()}_${Math.random().toString(16).slice(2)}`}async function Pe(e={}){if(!t)throw new Error("Database not initialized");P();const{favoritesOnly:n=!1,limit:s=100}=e,a=n?"WHERE is_favorite = 1":"",i=[];return t.exec({sql:`SELECT id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at
          FROM saved_eppo_codes
          ${a}
          ORDER BY is_favorite DESC, usage_count DESC, name ASC
          LIMIT ?`,bind:[s],rowMode:"object",callback:r=>i.push({id:r.id,code:r.code,name:r.name,language:r.language,dtcode:r.dtcode,usageCount:r.usage_count,isFavorite:!!r.is_favorite,createdAt:r.created_at,updatedAt:r.updated_at})}),{items:i}}async function Be(e={}){if(!t)throw new Error("Database not initialized");P();const n=String(e.code??"").trim(),s=String(e.name??"").trim();if(!n||!s)throw new Error("EPPO-Code und Name sind erforderlich.");const a=e.id||W("eppo"),i=e.language||null,r=e.dtcode||null,o=e.isFavorite?1:0,l=new Date().toISOString(),u=t.selectValue("SELECT id FROM saved_eppo_codes WHERE code = ? LIMIT 1",[n]);if(u){const d=t.prepare(`
      UPDATE saved_eppo_codes 
      SET name = ?, language = ?, dtcode = ?, is_favorite = ?, updated_at = ?
      WHERE code = ?
    `);return d.bind([s,i,r,o,l,n]),d.step(),d.finalize(),{id:u,code:n,name:s,updated:!0}}else{const d=t.prepare(`
      INSERT INTO saved_eppo_codes (id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)
    `);return d.bind([a,n,s,i,r,o,l,l]),d.step(),d.finalize(),{id:a,code:n,name:s,created:!0}}}async function He(e={}){if(!t)throw new Error("Database not initialized");P();const n=String(e.id??"").trim();if(!n)throw new Error("ID erforderlich.");const s=t.prepare("DELETE FROM saved_eppo_codes WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}async function Ge(e={}){if(!t)throw new Error("Database not initialized");P();const n=String(e.code??"").trim(),s=String(e.name??"").trim();if(!n)return{success:!1};const a=new Date().toISOString();if(t.selectValue("SELECT id FROM saved_eppo_codes WHERE code = ? LIMIT 1",[n])){const r=t.prepare(`
      UPDATE saved_eppo_codes SET usage_count = usage_count + 1, updated_at = ? WHERE code = ?
    `);r.bind([a,n]),r.step(),r.finalize()}else if(s){const r=W("eppo"),o=t.prepare(`
      INSERT INTO saved_eppo_codes (id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
    `);o.bind([r,n,s,e.language||null,e.dtcode||null,a,a]),o.step(),o.finalize()}return{success:!0}}async function je(e={}){if(!t)throw new Error("Database not initialized");B();const{favoritesOnly:n=!1,limit:s=100}=e,a=n?"WHERE is_favorite = 1":"",i=[];return t.exec({sql:`SELECT id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at
          FROM saved_bbch_stages
          ${a}
          ORDER BY is_favorite DESC, usage_count DESC, code ASC
          LIMIT ?`,bind:[s],rowMode:"object",callback:r=>i.push({id:r.id,code:r.code,label:r.label,principalStage:r.principal_stage,secondaryStage:r.secondary_stage,usageCount:r.usage_count,isFavorite:!!r.is_favorite,createdAt:r.created_at,updatedAt:r.updated_at})}),{items:i}}async function $e(e={}){if(!t)throw new Error("Database not initialized");B();const n=String(e.code??"").trim(),s=String(e.label??"").trim();if(!n||!s)throw new Error("BBCH-Code und Bezeichnung sind erforderlich.");const a=e.id||W("bbch"),i=e.principalStage!=null?Number(e.principalStage):null,r=e.secondaryStage!=null?Number(e.secondaryStage):null,o=e.isFavorite?1:0,l=new Date().toISOString(),u=t.selectValue("SELECT id FROM saved_bbch_stages WHERE code = ? LIMIT 1",[n]);if(u){const d=t.prepare(`
      UPDATE saved_bbch_stages 
      SET label = ?, principal_stage = ?, secondary_stage = ?, is_favorite = ?, updated_at = ?
      WHERE code = ?
    `);return d.bind([s,i,r,o,l,n]),d.step(),d.finalize(),{id:u,code:n,label:s,updated:!0}}else{const d=t.prepare(`
      INSERT INTO saved_bbch_stages (id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)
    `);return d.bind([a,n,s,i,r,o,l,l]),d.step(),d.finalize(),{id:a,code:n,label:s,created:!0}}}async function We(e={}){if(!t)throw new Error("Database not initialized");B();const n=String(e.id??"").trim();if(!n)throw new Error("ID erforderlich.");const s=t.prepare("DELETE FROM saved_bbch_stages WHERE id = ?");return s.bind([n]),s.step(),s.finalize(),{success:!0}}async function Ve(e={}){if(!t)throw new Error("Database not initialized");B();const n=String(e.code??"").trim(),s=String(e.label??"").trim();if(!n)return{success:!1};const a=new Date().toISOString();if(t.selectValue("SELECT id FROM saved_bbch_stages WHERE code = ? LIMIT 1",[n])){const r=t.prepare(`
      UPDATE saved_bbch_stages SET usage_count = usage_count + 1, updated_at = ? WHERE code = ?
    `);r.bind([a,n]),r.step(),r.finalize()}else if(s){const r=W("bbch"),o=t.prepare(`
      INSERT INTO saved_bbch_stages (id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
    `);o.bind([r,n,s,e.principalStage||null,e.secondaryStage||null,a,a]),o.step(),o.finalize()}return{success:!0}}async function Ke(e={}){if(!t)throw new Error("Database not initialized");P();const n=e.limit||10,s=[];return t.exec({sql:`SELECT code, name, language, dtcode, usage_count, is_favorite
          FROM saved_eppo_codes
          WHERE usage_count > 0
          ORDER BY usage_count DESC, name ASC
          LIMIT ?`,bind:[n],rowMode:"object",callback:a=>s.push({code:a.code,name:a.name,language:a.language,dtcode:a.dtcode,usageCount:a.usage_count,isFavorite:!!a.is_favorite})}),{items:s}}async function Ye(e={}){if(!t)throw new Error("Database not initialized");B();const n=e.limit||10,s=[];return t.exec({sql:`SELECT code, label, principal_stage, secondary_stage, usage_count, is_favorite
          FROM saved_bbch_stages
          WHERE usage_count > 0
          ORDER BY usage_count DESC, code ASC
          LIMIT ?`,bind:[n],rowMode:"object",callback:a=>s.push({code:a.code,label:a.label,principalStage:a.principal_stage,secondaryStage:a.secondary_stage,usageCount:a.usage_count,isFavorite:!!a.is_favorite})}),{items:s}}function w(e,n,s=t){if(!s||!e)return;const a=s.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)");a.bind([e,typeof n=="string"?n:JSON.stringify(n)]).step(),a.finalize()}function me(e,n=t){if(!n||!e)return;const s=n.prepare("DELETE FROM meta WHERE key = ?");s.bind([e]).step(),s.finalize()}function F(e,n=t){return!n||!e?null:n.selectValue("SELECT value FROM meta WHERE key = ?",[e])??null}function Ee(e){if(!S)throw new Error("SQLite not initialized");const n=new S.oo1.DB(":memory:"),s=S.wasm.scopedAllocPush();try{const a=S.wasm.allocFromTypedArray(e),i=S.wasm.allocCString("main"),r=(S.capi.SQLITE_DESERIALIZE_FREEONCLOSE||0)|(S.capi.SQLITE_DESERIALIZE_RESIZEABLE||0),o=S.capi.sqlite3_deserialize(n.pointer,i,a,e.byteLength,e.byteLength,r);if(o!==S.capi.SQLITE_OK)throw n.close(),new Error(`sqlite3_deserialize failed: ${S.capi.sqlite3_js_rc_str(o)||o}`)}finally{S.wasm.scopedAllocPop(s)}return n}self.onmessage=async function(e){const{id:n,action:s,payload:a}=e.data;try{let i;switch(s){case"init":i=await Je(a);break;case"importSnapshot":i=await Ze(a);break;case"exportSnapshot":i=await et();break;case"upsertMedium":i=await tt(a);break;case"deleteMedium":i=await nt(a);break;case"listMediums":i=await at();break;case"listMediumsPaged":i=await st(a);break;case"listHistory":i=await ot(a);break;case"listHistoryPaged":i=await pe(a);break;case"streamHistoryChunk":i=await lt(a);break;case"exportHistoryRange":i=await ut(a);break;case"getHistoryEntry":i=await Mt(a);break;case"appendHistoryEntry":i=await yt(a);break;case"deleteHistoryEntry":i=await Dt(a);break;case"deleteHistoryRange":i=await ct(a);break;case"vacuumDatabase":i=await dt();break;case"setArchiveLogs":i=await mt(a);break;case"listArchiveLogs":i=await Et(a);break;case"insertArchiveLog":i=await _t(a);break;case"appendImportLog":i=await pt(a);break;case"listImportLog":i=await gt(a);break;case"appendFoto":i=await Tt(a);break;case"listFotos":i=await ht(a);break;case"getFotoData":i=await Rt(a);break;case"exportFotos":i=await It();break;case"deleteFoto":i=await Ot(a);break;case"updateFoto":i=await At(a);break;case"setFotoThumb":i=await ft(a);break;case"getFotoCounts":i=await bt();break;case"deleteFotosByIds":i=await St(a);break;case"bulkUpdateFotoKategorie":i=await Nt(a);break;case"exportFotosByIds":i=await Lt(a);break;case"clearFotos":i=await kt();break;case"deleteArchiveLog":i=await Ct(a);break;case"exportDB":i=await vt();break;case"importDB":i=await wt(a);break;case"importLookupEppo":i=await zt(a);break;case"importLookupBbch":i=await xt(a);break;case"searchEppoCodes":i=await Ft(a);break;case"searchBbchStages":i=await qt(a);break;case"listLookupLanguages":i=Ut();break;case"getLookupStats":i=await Pt();break;case"listGpsPoints":i=await Ne();break;case"listGpsPointsPaged":i=await Le(a);break;case"upsertGpsPoint":i=await Ae(a);break;case"deleteGpsPoint":i=await Re(a);break;case"setActiveGpsPointId":i=await Ie(a);break;case"getActiveGpsPointId":i=await Oe();break;case"listKulturen":i=await ke();break;case"listKulturMittel":i=await Ce(a);break;case"upsertKulturMittel":i=await Me(a);break;case"deleteKulturMittel":i=await ye(a);break;case"seedInitialData":i=await De(a);break;case"listLagerBewegungen":i=await Fe(a);break;case"upsertLagerBewegung":i=await Xe(a);break;case"deleteLagerBewegung":i=await Ue(a);break;case"getLagerUebersicht":i=await qe();break;case"listMittelStammdaten":i=await ve();break;case"listAckerflaechen":i=await we();break;case"upsertAckerflaeche":i=await ze(a);break;case"deleteAckerflaeche":i=await xe(a);break;case"listSavedEppo":i=await Pe(a);break;case"upsertSavedEppo":i=await Be(a);break;case"deleteSavedEppo":i=await He(a);break;case"incrementEppoUsage":i=await Ge(a);break;case"listSavedBbch":i=await je(a);break;case"upsertSavedBbch":i=await $e(a);break;case"deleteSavedBbch":i=await We(a);break;case"incrementBbchUsage":i=await Ve(a);break;case"getFrequentEppo":i=await Ke(a);break;case"getFrequentBbch":i=await Ye(a);break;default:throw new Error(`Unknown action: ${s}`)}self.postMessage({id:n,ok:!0,result:i})}catch(i){self.postMessage({id:n,ok:!1,error:i.message||String(i)})}};async function Je(e={}){if(H)return{success:!0,message:"Already initialized"};try{S=await(await import(ie+"sqlite3.mjs").then(a=>a.default))({print:console.log,printErr:console.error,locateFile:a=>ie+a});const s=e.mode||Qe();return t=_e(s),G=s,te(),await ne(),H=!0,{success:!0,mode:s,message:`Database initialized in ${s} mode`}}catch(n){throw console.error("Failed to initialize database:",n),new Error(`Database initialization failed: ${n.message}`)}}function Qe(){return typeof S?.opfs<"u"?"opfs":"memory"}function _e(e="memory"){return e==="opfs"&&S?.opfs?new S.oo1.OpfsDb("/pflanzenschutz.sqlite"):new S.oo1.DB}function te(e=t){if(!e)throw new Error("Database not initialized");e.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA temp_store = MEMORY;
    PRAGMA cache_size = -20000;
  `)}async function ne(){if(!t)throw new Error("Database not initialized");(t.selectValue("PRAGMA user_version")||0)===0&&t.exec(`
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
    `);let n=t.selectValue("PRAGMA user_version")||0;const s=!I(t,"mediums","zulassungsnummer");if(s||n<4){console.log("Migrating database to version 4..."),t.exec("BEGIN TRANSACTION");try{s&&he(t),t.exec("PRAGMA user_version = 4"),t.exec("COMMIT")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 4 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,n<5){console.log("Migrating database to version 5..."),t.exec("BEGIN TRANSACTION");try{x(t),t.exec("PRAGMA user_version = 5"),t.exec("COMMIT")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 5 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!y(t,"gps_points")||n<6){console.log("Migrating database to version 6..."),t.exec("BEGIN TRANSACTION");try{v(t),t.exec("PRAGMA user_version = 6"),t.exec("COMMIT")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 6 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!y(t,"medium_profiles")||!y(t,"medium_profile_mediums")||n<7){console.log("Migrating database to version 7..."),t.exec("BEGIN TRANSACTION");try{se(t),t.exec("PRAGMA user_version = 7"),t.exec("COMMIT")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 7 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!y(t,"archive_logs")||n<8){console.log("Migrating database to version 8..."),t.exec("BEGIN TRANSACTION");try{X(t);const E=F("archives",t);if(E)try{const A=JSON.parse(E),L=Array.isArray(A?.logs)?A.logs:[];L.length&&Y(L,t)}catch(A){console.warn("Archiv-Logs konnten nicht migriert werden",A)}t.exec("PRAGMA user_version = 8"),t.exec("COMMIT")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 8 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!I(t,"mediums","wartezeit")||!I(t,"mediums","wirkstoff")||n<9){console.log("Migrating database to version 9 (QS columns)..."),t.exec("BEGIN TRANSACTION");try{j(t),t.exec("PRAGMA user_version = 9"),t.exec("COMMIT")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 9 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!I(t,"history","ersteller")||n<10){console.log("Migrating database to version 10 (normalized history)..."),t.exec("BEGIN TRANSACTION");try{const E=[{name:"ersteller",type:"TEXT"},{name:"standort",type:"TEXT"},{name:"kultur",type:"TEXT"},{name:"eppo_code",type:"TEXT"},{name:"bbch",type:"TEXT"},{name:"datum",type:"TEXT"},{name:"date_iso",type:"TEXT"},{name:"uhrzeit",type:"TEXT"},{name:"usage_type",type:"TEXT"},{name:"area_ha",type:"REAL"},{name:"area_ar",type:"REAL"},{name:"area_sqm",type:"REAL"},{name:"water_volume",type:"REAL"},{name:"invekos",type:"TEXT"},{name:"gps",type:"TEXT"},{name:"gps_latitude",type:"REAL"},{name:"gps_longitude",type:"REAL"},{name:"gps_point_id",type:"TEXT"},{name:"qs_maschine",type:"TEXT"},{name:"qs_schaderreger",type:"TEXT"},{name:"qs_verantwortlicher",type:"TEXT"},{name:"qs_wetter",type:"TEXT"},{name:"qs_behandlungsart",type:"TEXT"}];for(const h of E)I(t,"history",h.name)||t.exec(`ALTER TABLE history ADD COLUMN ${h.name} ${h.type}`);const A=[{name:"medium_name",type:"TEXT"},{name:"medium_unit",type:"TEXT"},{name:"method_id",type:"TEXT"},{name:"method_label",type:"TEXT"},{name:"medium_value",type:"REAL"},{name:"calculated_total",type:"REAL"},{name:"zulassungsnummer",type:"TEXT"},{name:"wartezeit",type:"INTEGER"},{name:"wirkstoff",type:"TEXT"},{name:"input_area_ha",type:"REAL"},{name:"input_area_ar",type:"REAL"},{name:"input_area_sqm",type:"REAL"},{name:"input_water_volume",type:"REAL"}];for(const h of A)I(t,"history_items",h.name)||t.exec(`ALTER TABLE history_items ADD COLUMN ${h.name} ${h.type}`);t.exec(`
        CREATE INDEX IF NOT EXISTS idx_history_date_iso ON history(date_iso);
        CREATE INDEX IF NOT EXISTS idx_history_eppo_code ON history(eppo_code);
        CREATE INDEX IF NOT EXISTS idx_history_kultur ON history(kultur);
        CREATE INDEX IF NOT EXISTS idx_history_standort ON history(standort);
        CREATE INDEX IF NOT EXISTS idx_history_items_zulassungsnummer ON history_items(zulassungsnummer);
        CREATE INDEX IF NOT EXISTS idx_history_items_wirkstoff ON history_items(wirkstoff);
      `);const L=[];if(t.exec({sql:"SELECT id, header_json FROM history WHERE header_json IS NOT NULL",rowMode:"object",callback:h=>L.push(h)}),L.length>0){console.log(`Migrating ${L.length} history entries to normalized format...`);const h=t.prepare(`
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
        `);for(const m of L)try{const c=JSON.parse(m.header_json||"{}"),O=c.gpsCoordinates||{};h.bind([c.ersteller||null,c.standort||null,c.kultur||null,c.eppoCode||null,c.bbch||null,c.datum||null,c.dateIso||null,c.uhrzeit||null,c.usageType||null,c.areaHa??null,c.areaAr??null,c.areaSqm??null,c.waterVolume??null,c.invekos||null,c.gps||null,O.latitude??null,O.longitude??null,c.gpsPointId||null,c.qsMaschine||null,c.qsSchaderreger||null,c.qsVerantwortlicher||null,c.qsWetter||null,c.qsBehandlungsart||null,m.id]).step(),h.reset()}catch(c){console.warn(`Could not migrate history entry ${m.id}:`,c)}h.finalize()}const T=[];if(t.exec({sql:"SELECT id, payload_json FROM history_items WHERE payload_json IS NOT NULL",rowMode:"object",callback:h=>T.push(h)}),T.length>0){console.log(`Migrating ${T.length} history items to normalized format...`);const h=t.prepare(`
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
        `);for(const m of T)try{const c=JSON.parse(m.payload_json||"{}"),O=c.inputs||{};h.bind([c.name||null,c.unit||null,c.methodId||null,c.methodLabel||null,c.value??null,c.total??null,c.zulassungsnummer||null,c.wartezeit??null,c.wirkstoff||null,O.areaHa??null,O.areaAr??null,O.areaSqm??null,O.waterVolume??null,m.id]).step(),h.reset()}catch(c){console.warn(`Could not migrate history item ${m.id}:`,c)}h.finalize()}t.exec("PRAGMA user_version = 10"),t.exec("COMMIT"),console.log("Database migrated to version 10 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 10 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!I(t,"history","company_name")||n<11){console.log("Migrating database to version 11 (company data in history)..."),t.exec("BEGIN TRANSACTION");try{const E=[{name:"company_name",type:"TEXT"},{name:"company_address",type:"TEXT"},{name:"company_headline",type:"TEXT"},{name:"company_email",type:"TEXT"}];for(const L of E)I(t,"history",L.name)||t.exec(`ALTER TABLE history ADD COLUMN ${L.name} ${L.type}`);const A=[];if(t.exec({sql:"SELECT id, header_json FROM history WHERE header_json IS NOT NULL AND company_name IS NULL",rowMode:"object",callback:L=>A.push(L)}),A.length>0){console.log(`Migrating ${A.length} history entries for company data...`);const L=t.prepare(`
          UPDATE history SET
            company_name = ?,
            company_address = ?,
            company_headline = ?,
            company_email = ?
          WHERE id = ?
        `);for(const T of A)try{const m=JSON.parse(T.header_json||"{}").company||{};L.bind([m.name||null,m.address||null,m.headline||null,m.contactEmail||null,T.id]).step(),L.reset()}catch(h){console.warn(`Could not migrate company data for history entry ${T.id}:`,h)}L.finalize()}t.exec("PRAGMA user_version = 11"),t.exec("COMMIT"),console.log("Database migrated to version 11 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 11 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!I(t,"gps_points","nutzflaeche_qm")||!I(t,"gps_points","kind")||n<12){console.log("Migrating database to version 12 (gps_points Nutzfläche/Typ)..."),t.exec("BEGIN TRANSACTION");try{v(t),I(t,"gps_points","nutzflaeche_qm")||t.exec("ALTER TABLE gps_points ADD COLUMN nutzflaeche_qm REAL"),I(t,"gps_points","kind")||t.exec("ALTER TABLE gps_points ADD COLUMN kind TEXT"),t.exec("PRAGMA user_version = 12"),t.exec("COMMIT"),console.log("Database migrated to version 12 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 12 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!y(t,"kultur_mittel")||n<13){console.log("Migrating database to version 13 (kultur_mittel)..."),t.exec("BEGIN TRANSACTION");try{D(t),t.exec("PRAGMA user_version = 13"),t.exec("COMMIT"),console.log("Database migrated to version 13 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 13 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!(y(t,"kultur_mittel")&&I(t,"kultur_mittel","eppo_code"))||n<14){console.log("Migrating database to version 14 (kultur_mittel EPPO/BBCH)..."),t.exec("BEGIN TRANSACTION");try{D(t),y(t,"kultur_mittel")&&!I(t,"kultur_mittel","eppo_code")&&t.exec("ALTER TABLE kultur_mittel ADD COLUMN eppo_code TEXT"),y(t,"kultur_mittel")&&!I(t,"kultur_mittel","bbch_default")&&t.exec("ALTER TABLE kultur_mittel ADD COLUMN bbch_default TEXT"),t.exec("PRAGMA user_version = 14"),t.exec("COMMIT"),console.log("Database migrated to version 14 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 14 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!(y(t,"kultur_mittel")&&I(t,"kultur_mittel","bbch"))||n<15){console.log("Migrating database to version 15 (kultur_mittel BBCH)..."),t.exec("BEGIN TRANSACTION");try{D(t),y(t,"kultur_mittel")&&!I(t,"kultur_mittel","bbch")&&t.exec("ALTER TABLE kultur_mittel ADD COLUMN bbch TEXT"),t.exec("PRAGMA user_version = 15"),t.exec("COMMIT"),console.log("Database migrated to version 15 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 15 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!y(t,"lager_bewegungen")||n<16){console.log("Migrating database to version 16 (lager_bewegungen)..."),t.exec("BEGIN TRANSACTION");try{q(t),t.exec("PRAGMA user_version = 16"),t.exec("COMMIT"),console.log("Database migrated to version 16 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 16 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!y(t,"ackerflaechen")||n<17){console.log("Migrating database to version 17 (ackerflaechen)..."),t.exec("BEGIN TRANSACTION");try{$(t),t.exec("PRAGMA user_version = 17"),t.exec("COMMIT"),console.log("Database migrated to version 17 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 17 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!y(t,"import_log")||n<18){console.log("Migrating database to version 18 (import_log)..."),t.exec("BEGIN TRANSACTION");try{ee(t),t.exec("PRAGMA user_version = 18"),t.exec("COMMIT"),console.log("Database migrated to version 18 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 18 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,!y(t,"fotos")||n<19){console.log("Migrating database to version 19 (fotos)..."),t.exec("BEGIN TRANSACTION");try{M(t),t.exec("PRAGMA user_version = 19"),t.exec("COMMIT"),console.log("Database migrated to version 19 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 19 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,n<20){console.log("Migrating database to version 20 (foto notiz)..."),t.exec("BEGIN TRANSACTION");try{M(t),I(t,"fotos","notiz")||t.exec("ALTER TABLE fotos ADD COLUMN notiz TEXT"),t.exec("PRAGMA user_version = 20"),t.exec("COMMIT"),console.log("Database migrated to version 20 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 20 failed:",E),E}}if(n=t.selectValue("PRAGMA user_version")||0,n<21){console.log("Migrating database to version 21 (foto thumbnail)..."),t.exec("BEGIN TRANSACTION");try{M(t),I(t,"fotos","data_thumb")||t.exec("ALTER TABLE fotos ADD COLUMN data_thumb TEXT"),t.exec("CREATE INDEX IF NOT EXISTS idx_fotos_kategorie ON fotos(kategorie, created_at DESC)"),t.exec("PRAGMA user_version = 21"),t.exec("COMMIT"),console.log("Database migrated to version 21 successfully")}catch(E){throw t.exec("ROLLBACK"),console.error("Migration to version 21 failed:",E),E}}}async function Ze(e){if(!t)throw new Error("Database not initialized");t.exec("BEGIN TRANSACTION");try{if(Array.isArray(e.history)&&t.exec(`
        DELETE FROM history_items;
        DELETE FROM history;
      `),t.exec(`
      DELETE FROM mediums;
      DELETE FROM measurement_methods;
      DELETE FROM meta WHERE key IN ('version','company','defaults','fieldLabels','measurementMethods','archives');
    `),e.meta){const s={version:e.meta.version||1,company:JSON.stringify(e.meta.company||{}),defaults:JSON.stringify(e.meta.defaults||{}),fieldLabels:JSON.stringify(e.meta.fieldLabels||{}),measurementMethods:JSON.stringify(e.meta.measurementMethods||[]),archives:JSON.stringify(e.archives||{logs:[]})},a=t.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)");for(const[o,l]of Object.entries(s))a.bind([o,typeof l=="string"?l:JSON.stringify(l)]).step(),a.reset();if(a.finalize(),e.meta.measurementMethods&&Array.isArray(e.meta.measurementMethods)){const o=t.prepare("INSERT OR REPLACE INTO measurement_methods (id, label, type, unit, requires, config) VALUES (?, ?, ?, ?, ?, ?)");for(const l of e.meta.measurementMethods)o.bind([l.id,l.label,l.type,l.unit,JSON.stringify(l.requires||[]),JSON.stringify(l.config||{})]).step(),o.reset();o.finalize()}const i=Array.isArray(e.archives?.logs)?e.archives.logs:[],r=Y(i,t);w("archives",JSON.stringify({logs:r}),t)}if(e.mediums&&Array.isArray(e.mediums)){j(t);const s=t.prepare("INSERT OR REPLACE INTO mediums (id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");for(const a of e.mediums){const i=a.zulassungsnummer??a.approvalNumber??a.zulassung??null;s.bind([a.id,a.name,a.unit,a.methodId||a.method_id,a.value,i,a.wartezeit??null,a.wirkstoff??null]).step(),s.reset()}s.finalize()}if(e.mediumProfiles&&Array.isArray(e.mediumProfiles)){se(),t.exec("DELETE FROM medium_profile_mediums"),t.exec("DELETE FROM medium_profiles");const s=t.prepare("INSERT INTO medium_profiles (id, name, created_at, updated_at) VALUES (?, ?, ?, ?)"),a=t.prepare("INSERT INTO medium_profile_mediums (profile_id, medium_id, sort_order) VALUES (?, ?, ?)");for(const i of e.mediumProfiles){const r=String(i.id||"").trim();if(!r)continue;const o=String(i.name||"Profil ohne Namen"),l=i.createdAt||i.created_at||new Date().toISOString(),u=i.updatedAt||i.updated_at||l;s.bind([r,o,l,u]).step(),s.reset(),(Array.isArray(i.mediumIds)?i.mediumIds:[]).forEach((_,p)=>{_&&(a.bind([r,String(_),p]).step(),a.reset())})}s.finalize(),a.finalize()}if(e.history&&Array.isArray(e.history)){const s=t.prepare(`
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
      `);for(const i of e.history){const r=i.header?{...i.header}:{...i};delete r.items;const o=i.savedAt||r.savedAt||r.createdAt||new Date().toISOString();r.createdAt||(r.createdAt=o);const l=r.gpsCoordinates||{};s.bind([o,JSON.stringify(r),r.ersteller||null,r.standort||null,r.kultur||null,r.eppoCode||null,r.bbch||null,r.datum||null,r.dateIso||null,r.uhrzeit||null,r.usageType||null,r.areaHa??null,r.areaAr??null,r.areaSqm??null,r.waterVolume??null,r.invekos||null,r.gps||null,l.latitude??null,l.longitude??null,r.gpsPointId||null,r.qsMaschine||null,r.qsSchaderreger||null,r.qsVerantwortlicher||null,r.qsWetter||null,r.qsBehandlungsart||null]).step();const u=t.selectValue("SELECT last_insert_rowid()");s.reset();const d=i.items&&Array.isArray(i.items)?i.items:[];for(const _ of d){const p=_.inputs||{};a.bind([u,_.mediumId||_.medium_id||_.id||"",JSON.stringify(_),_.name||null,_.unit||null,_.methodId||null,_.methodLabel||null,_.value??null,_.total??null,_.zulassungsnummer||null,_.wartezeit??null,_.wirkstoff||null,p.areaHa??null,p.areaAr??null,p.areaSqm??null,p.waterVolume??null]).step(),a.reset()}}s.finalize(),a.finalize()}return t.exec("COMMIT"),{success:!0,message:"Snapshot imported successfully"}}catch(n){throw t.exec("ROLLBACK"),n}}async function et(){if(!t)throw new Error("Database not initialized");const e={meta:{version:1,company:{},defaults:{},fieldLabels:{},measurementMethods:[]},mediums:[],mediumProfiles:[],history:[],archives:{logs:[]}};t.exec({sql:"SELECT key, value FROM meta",callback:i=>{const r=i[0],o=i[1];if(!(r&&r.startsWith("lookup:")))try{const l=JSON.parse(o);r==="company"?e.meta.company=l:r==="defaults"?e.meta.defaults=l:r==="fieldLabels"?e.meta.fieldLabels=l:r==="version"?e.meta.version=l:r==="archives"&&(e.archives=l)}catch{}}}),t.exec({sql:"SELECT id, label, type, unit, requires, config FROM measurement_methods",callback:i=>{e.meta.measurementMethods.push({id:i[0],label:i[1],type:i[2],unit:i[3],requires:JSON.parse(i[4]||"[]"),config:JSON.parse(i[5]||"{}")})}}),t.exec({sql:"SELECT id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff FROM mediums",callback:i=>{e.mediums.push({id:i[0],name:i[1],unit:i[2],methodId:i[3],value:i[4],zulassungsnummer:i[5]||null,wartezeit:i[6]||null,wirkstoff:i[7]||null})}});const n=new Map;t.exec({sql:`SELECT id, name, created_at, updated_at
          FROM medium_profiles
          ORDER BY name COLLATE NOCASE`,rowMode:"object",callback:i=>{n.set(i.id,{id:String(i.id),name:String(i.name??""),createdAt:i.created_at||new Date().toISOString(),updatedAt:i.updated_at||new Date().toISOString(),mediumIds:[]})}}),n.size&&t.exec({sql:`SELECT profile_id, medium_id, sort_order
            FROM medium_profile_mediums
            ORDER BY profile_id, sort_order, rowid`,rowMode:"object",callback:i=>{const r=n.get(i.profile_id);r&&r.mediumIds.push(String(i.medium_id))}}),e.mediumProfiles=Array.from(n.values());const s=oe();s.length&&(e.archives={logs:s.map(i=>K(i))});const a=new Map;return t.exec({sql:`SELECT id, created_at, header_json,
            ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
            uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
            invekos, gps, gps_latitude, gps_longitude, gps_point_id,
            qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart
          FROM history ORDER BY created_at DESC`,rowMode:"object",callback:i=>{let r={};try{r=JSON.parse(i.header_json||"{}")}catch(o){console.warn("Could not parse header_json",o)}a.set(i.id,{header:{createdAt:i.created_at,ersteller:i.ersteller??r.ersteller,standort:i.standort??r.standort,kultur:i.kultur??r.kultur,eppoCode:i.eppo_code??r.eppoCode,bbch:i.bbch??r.bbch,datum:i.datum??r.datum,dateIso:i.date_iso??r.dateIso,uhrzeit:i.uhrzeit??r.uhrzeit,usageType:i.usage_type??r.usageType,areaHa:i.area_ha??r.areaHa,areaAr:i.area_ar??r.areaAr,areaSqm:i.area_sqm??r.areaSqm,waterVolume:i.water_volume??r.waterVolume,invekos:i.invekos??r.invekos,gps:i.gps??r.gps,gpsCoordinates:i.gps_latitude!=null&&i.gps_longitude!=null?{latitude:i.gps_latitude,longitude:i.gps_longitude}:r.gpsCoordinates||null,gpsPointId:i.gps_point_id??r.gpsPointId,qsMaschine:i.qs_maschine??r.qsMaschine,qsSchaderreger:i.qs_schaderreger??r.qsSchaderreger,qsVerantwortlicher:i.qs_verantwortlicher??r.qsVerantwortlicher,qsWetter:i.qs_wetter??r.qsWetter,qsBehandlungsart:i.qs_behandlungsart??r.qsBehandlungsart,savedAt:r.savedAt||i.created_at},items:[]})}}),t.exec({sql:`SELECT history_id, medium_id, payload_json,
            medium_name, medium_unit, method_id, method_label, medium_value,
            calculated_total, zulassungsnummer, wartezeit, wirkstoff,
            input_area_ha, input_area_ar, input_area_sqm, input_water_volume
          FROM history_items`,rowMode:"object",callback:i=>{const r=i.history_id;if(a.has(r)){let o={};try{o=JSON.parse(i.payload_json||"{}")}catch(l){console.warn("Could not parse payload_json",l)}a.get(r).items.push({id:i.medium_id??o.id,mediumId:i.medium_id??o.mediumId,name:i.medium_name??o.name,unit:i.medium_unit??o.unit,methodId:i.method_id??o.methodId,methodLabel:i.method_label??o.methodLabel,value:i.medium_value??o.value,total:i.calculated_total??o.total,zulassungsnummer:i.zulassungsnummer??o.zulassungsnummer,wartezeit:i.wartezeit??o.wartezeit,wirkstoff:i.wirkstoff??o.wirkstoff,inputs:{areaHa:i.input_area_ha??o.inputs?.areaHa,areaAr:i.input_area_ar??o.inputs?.areaAr,areaSqm:i.input_area_sqm??o.inputs?.areaSqm,waterVolume:i.input_water_volume??o.inputs?.waterVolume}})}}}),e.history=Array.from(a.values()).map(i=>({...i.header,items:i.items})),e}async function tt(e){if(!t)throw new Error("Database not initialized");j();const n=t.prepare("INSERT OR REPLACE INTO mediums (id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");return n.bind([e.id,e.name,e.unit,e.methodId||e.method_id,e.value,e.zulassungsnummer??e.approvalNumber??e.zulassung??null,e.wartezeit??null,e.wirkstoff??null]).step(),n.finalize(),{success:!0,id:e.id}}async function nt(e){if(!t)throw new Error("Database not initialized");const n=t.prepare("DELETE FROM mediums WHERE id = ?");return n.bind([e]).step(),n.finalize(),{success:!0}}async function at(){if(!t)throw new Error("Database not initialized");j();const e=[];return t.exec({sql:"SELECT id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff FROM mediums",callback:n=>{e.push({id:n[0],name:n[1],unit:n[2],methodId:n[3],value:n[4],zulassungsnummer:n[5]||null,wartezeit:n[6]||null,wirkstoff:n[7]||null})}}),e}function it(e){return e?{id:e.id!=null?String(e.id):"",name:e.name!=null?String(e.name):"",unit:e.unit!=null?String(e.unit):"",methodId:e.method_id!=null?String(e.method_id):e.methodId!=null?String(e.methodId):null,value:Number(e.value??0),zulassungsnummer:e.zulassungsnummer!=null?String(e.zulassungsnummer):e.zulassung!=null?String(e.zulassung):null,wartezeit:e.wartezeit!=null?Number(e.wartezeit):null,wirkstoff:e.wirkstoff!=null?String(e.wirkstoff):null}:null}async function st(e={}){if(!t)throw new Error("Database not initialized");const{cursor:n=null,limit:s,pageSize:a,search:i,includeTotal:r=!1}=e||{},o=U(a??s,50,500),l=typeof i=="string"?i.trim():"",u=[],d=[];if(l){u.push("(LOWER(name) LIKE LOWER(?) OR LOWER(COALESCE(zulassungsnummer, '')) LIKE LOWER(?))");const m=`%${l}%`;d.push(m,m)}const _=n&&Number.isFinite(Number(n.rowid))?Number(n.rowid):null,p=[...u],g=[...d];_!==null&&(p.push("rowid > ?"),g.push(_));const N=p.length?`WHERE ${p.join(" AND ")}`:"",f=t.prepare(`SELECT rowid AS cursor_rowid, id, name, unit, method_id, value, zulassungsnummer
     FROM mediums
     ${N}
     ORDER BY rowid ASC
     LIMIT ?`);f.bind([...g,o+1]);const k=[];for(;f.step();)k.push(f.getAsObject());f.finalize();const R=k.length>o,E=R?k.slice(0,o):k,A=E.map(m=>it(m)).filter(m=>m!==null),L=E.length?E[E.length-1]:null,T=R&&L?{rowid:Number(L.cursor_rowid)||Number(L.rowid||0)}:null;let h;if(r){const m=u.length?`WHERE ${u.join(" AND ")}`:"",c=t.prepare(`SELECT COUNT(*) AS total FROM mediums ${m}`);if(d.length&&c.bind(d),c.step()){const O=c.getAsObject();h=Number(O?.total)||0}else h=0;c.finalize()}return{items:A,nextCursor:T,hasMore:R,pageSize:o,totalCount:h}}function V(e={}){const n=`COALESCE(
    NULLIF(json_extract(header_json, '$.dateIso'), ''),
    CASE
      WHEN json_extract(header_json, '$.datum') GLOB '__.__.____'
      THEN substr(json_extract(header_json, '$.datum'), 7, 4) || '-' ||
           substr(json_extract(header_json, '$.datum'), 4, 2) || '-' ||
           substr(json_extract(header_json, '$.datum'), 1, 2)
      ELSE NULL
    END,
    created_at
  )`,s=[],a=[];if(e.startDate&&(s.push(`datetime(${n}) >= datetime(?)`),a.push(e.startDate)),e.endDate&&(s.push(`datetime(${n}) <= datetime(?)`),a.push(e.endDate)),[["creator","$.ersteller"],["location","$.standort"],["crop","$.kultur"],["usageType","$.usageType"],["eppoCode","$.eppoCode"],["invekos","$.invekos"],["bbch","$.bbch"]].forEach(([r,o])=>{const l=e?.[r];typeof l=="string"&&l.trim()&&(s.push(`LOWER(json_extract(header_json, '${o}')) LIKE LOWER(?)`),a.push(`%${l.trim()}%`))}),typeof e?.text=="string"&&e.text.trim()){const r=`%${e.text.trim()}%`,o=["$.ersteller","$.standort","$.kultur","$.usageType","$.eppoCode","$.invekos","$.bbch","$.gps"],l=o.map(u=>`LOWER(json_extract(header_json, '${u}')) LIKE LOWER(?)`);s.push(`(${l.join(" OR ")})`);for(let u=0;u<o.length;u+=1)a.push(r)}return{historyDateExpr:n,whereSql:s.length?`WHERE ${s.join(" AND ")}`:"",whereParams:a}}function rt(e,n,s){if(!e||!e.createdAt)return null;const a=s==="ASC"?">":"<",i=String(e.createdAt),r=Number(e.id??e.historyId??e.rowid??0);return{clause:`(
      datetime(${n}) ${a} datetime(?)
      OR (datetime(${n}) = datetime(?) AND history.id ${a} ?)
    )`,params:[i,i,r]}}async function ot({page:e=1,pageSize:n=50,filters:s={},sortDirection:a="desc"}={}){if(!t)throw new Error("Database not initialized");const i=String(a).toLowerCase()==="asc"?"ASC":"DESC",r=U(n,50,500),o=Number.isFinite(Number(e))?Math.max(1,Number(e)):1,l=(o-1)*r,{historyDateExpr:u,whereSql:d,whereParams:_}=V(s),p=[],g={sql:`
      SELECT id, created_at, header_json
      FROM history
      ${d}
      ORDER BY datetime(${u}) ${i}, rowid ${i}
      LIMIT ${r} OFFSET ${l}
    `,callback:f=>{const k=JSON.parse(f[2]||"{}");p.push({id:f[0],...k})}};_.length&&(g.bind=[..._]),t.exec(g);const N=t.selectValue(`SELECT COUNT(*) FROM history ${d}`,_.length?[..._]:void 0);return{items:p,page:o,pageSize:r,totalCount:Number(N)||0,totalPages:Math.ceil((Number(N)||0)/r)}}async function pe({cursor:e=null,pageSize:n=50,filters:s={},sortDirection:a="desc",includeItems:i=!1,includeTotal:r=!1}={}){if(!t)throw new Error("Database not initialized");const o=String(a).toLowerCase()==="asc"?"ASC":"DESC",l=U(n,50,500),u=l+1,{historyDateExpr:d,whereSql:_,whereParams:p}=V(s),g=rt(e,d,o),N=[],f=[];_?.trim()&&(N.push(_.replace(/^\s*WHERE\s+/i,"")),p.length&&f.push(...p)),g&&(N.push(g.clause),f.push(...g.params));const k=N.length>0?`WHERE ${N.join(" AND ")}`:"",R=[];t.exec({sql:`
      SELECT
        history.id AS id,
        history.header_json AS header_json,
        history.created_at AS created_at,
        ${d} AS cursor_created_at,
        history.ersteller, history.standort, history.kultur, history.eppo_code, history.bbch,
        history.datum, history.date_iso, history.uhrzeit, history.usage_type,
        history.area_ha, history.area_ar, history.area_sqm, history.water_volume,
        history.invekos, history.gps, history.gps_latitude, history.gps_longitude, history.gps_point_id,
        history.qs_maschine, history.qs_schaderreger, history.qs_verantwortlicher, history.qs_wetter, history.qs_behandlungsart,
        history.company_name, history.company_address, history.company_headline, history.company_email
      FROM history
      ${k}
      ORDER BY datetime(cursor_created_at) ${o}, history.id ${o}
      LIMIT ?
    `,bind:[...f,u],rowMode:"object",callback:m=>R.push(m)});const E=R.length>l,A=E?R.slice(0,-1):R;let L=null;if(E&&A.length){const m=A[A.length-1];L={id:m.id,createdAt:m.cursor_created_at||m.created_at||new Date().toISOString()}}const T=A.map(m=>{let c={};try{c=JSON.parse(m.header_json||"{}")}catch(b){console.warn("Konnte History-Header nicht parsen",b)}const O={company:{name:m.company_name??c.company?.name??null,address:m.company_address??c.company?.address??null,headline:m.company_headline??c.company?.headline??null,contactEmail:m.company_email??c.company?.contactEmail??null},id:m.id,createdAt:m.created_at,ersteller:m.ersteller??c.ersteller,standort:m.standort??c.standort,kultur:m.kultur??c.kultur,eppoCode:m.eppo_code??c.eppoCode,bbch:m.bbch??c.bbch,datum:m.datum??c.datum,dateIso:m.date_iso??c.dateIso,uhrzeit:m.uhrzeit??c.uhrzeit,usageType:m.usage_type??c.usageType,areaHa:m.area_ha??c.areaHa,areaAr:m.area_ar??c.areaAr,areaSqm:m.area_sqm??c.areaSqm,waterVolume:m.water_volume??c.waterVolume,invekos:m.invekos??c.invekos,gps:m.gps??c.gps,gpsCoordinates:m.gps_latitude!=null&&m.gps_longitude!=null?{latitude:m.gps_latitude,longitude:m.gps_longitude}:c.gpsCoordinates||null,gpsPointId:m.gps_point_id??c.gpsPointId,qsMaschine:m.qs_maschine??c.qsMaschine,qsSchaderreger:m.qs_schaderreger??c.qsSchaderreger,qsVerantwortlicher:m.qs_verantwortlicher??c.qsVerantwortlicher,qsWetter:m.qs_wetter??c.qsWetter,qsBehandlungsart:m.qs_behandlungsart??c.qsBehandlungsart,savedAt:c.savedAt||m.created_at};return i&&(O.items=[]),O});if(i&&T.length){const m=T.map(b=>b.id),c=m.map(()=>"?").join(","),O=new Map;t.exec({sql:`
        SELECT history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        FROM history_items
        WHERE history_id IN (${c})
        ORDER BY history_id, rowid
      `,bind:m,rowMode:"object",callback:b=>{const ae=b.history_id;O.has(ae)||O.set(ae,[]);let C={};try{C=JSON.parse(b.payload_json||"{}")}catch(Bt){console.warn("Konnte History-Item nicht parsen",Bt)}O.get(ae).push({id:b.medium_id??C.id,mediumId:b.medium_id??C.mediumId,name:b.medium_name??C.name,unit:b.medium_unit??C.unit,methodId:b.method_id??C.methodId,methodLabel:b.method_label??C.methodLabel,value:b.medium_value??C.value,total:b.calculated_total??C.total,zulassungsnummer:b.zulassungsnummer??C.zulassungsnummer,wartezeit:b.wartezeit??C.wartezeit,wirkstoff:b.wirkstoff??C.wirkstoff,inputs:{areaHa:b.input_area_ha??C.inputs?.areaHa,areaAr:b.input_area_ar??C.inputs?.areaAr,areaSqm:b.input_area_sqm??C.inputs?.areaSqm,waterVolume:b.input_water_volume??C.inputs?.waterVolume}})}}),T.forEach(b=>{b.items=O.get(b.id)||[]})}let h;return r&&(h=Number(t.selectValue(`SELECT COUNT(*) FROM history ${_||""}`,p.length?[...p]:void 0))||0),{items:T,nextCursor:L,pageSize:l,sortDirection:o==="ASC"?"asc":"desc",hasMore:E,totalCount:h}}async function lt(e={}){if(!t)throw new Error("Database not initialized");const{pageSize:n,chunkSize:s,includeItems:a=!0,includeTotal:i=!1,...r}=e||{},o=U(s??n??100,100,1e3);return await pe({pageSize:o,includeItems:a,includeTotal:i,...r})}async function ut({filters:e={},limit:n=5e3,sortDirection:s="asc"}={}){if(!t)throw new Error("Database not initialized");const a=Number.isFinite(Number(n))?Math.min(Math.max(Number(n),1),1e4):5e3,i=String(s).toLowerCase()==="desc"?"DESC":"ASC",{historyDateExpr:r,whereSql:o,whereParams:l}=V(e),u=[],d=[],_=`
    SELECT history.id AS history_id,
           history.header_json AS header_json,
           COALESCE(json_group_array(history_items.payload_json), '[]') AS items_json
    FROM history
    LEFT JOIN history_items ON history_items.history_id = history.id
    ${o}
    GROUP BY history.id
    ORDER BY datetime(${r}) ${i}, history.rowid ${i}
    LIMIT ?
  `,p=l.length?[...l,a]:[a];return t.exec({sql:_,bind:p,rowMode:"object",callback:g=>{try{const N=JSON.parse(g.header_json||"{}"),f=JSON.parse(g.items_json||"[]"),k=Array.isArray(f)?f.map(R=>{if(R==null)return null;if(typeof R=="string")try{return JSON.parse(R)}catch(E){return console.warn("Konnte History-Item nicht parsen",E),null}return R}).filter(R=>R!==null):[];d.push(g.history_id),u.push({...N,items:k})}catch(N){console.warn("Archiv-Export konnte nicht gelesen werden",N)}}}),{entries:u,historyIds:d}}async function ct({filters:e={}}={}){if(!t)throw new Error("Database not initialized");const{whereSql:n,whereParams:s}=V(e);t.exec("BEGIN TRANSACTION");try{const a={sql:`DELETE FROM history ${n}`};return s.length&&(a.bind=[...s]),t.exec(a),t.exec("COMMIT"),{success:!0}}catch(a){throw t.exec("ROLLBACK"),a}}async function dt(){if(!t)throw new Error("Database not initialized");return t.exec("VACUUM"),{success:!0}}async function mt(e={}){if(!t)throw new Error("Database not initialized");const n=Array.isArray(e.logs)?e.logs:[];t.exec("BEGIN TRANSACTION");try{const s=Y(n,t);return w("archives",JSON.stringify({logs:s}),t),t.exec("COMMIT"),{success:!0,count:s.length}}catch(s){throw t.exec("ROLLBACK"),s}}async function Et({limit:e=50,cursor:n=null,sortDirection:s="desc"}={}){if(!t)throw new Error("Database not initialized");X();const a=String(s).toLowerCase()==="asc"?"ASC":"DESC",i=Math.min(Math.max(Number(e)||1,1),500),r=i+1,o=(()=>{if(!n||!n.archivedAt)return null;const f=a==="ASC"?">":"<",k=f,R=String(n.archivedAt),E=n.id?String(n.id):"";return{clause:`(
        datetime(archived_at) ${f} datetime(?)
        OR (datetime(archived_at) = datetime(?) AND id ${k} ?)
      )`,params:[R,R,E]}})(),l=[],u=[];o&&(l.push(o.clause),u.push(...o.params));const d=l.length?`WHERE ${l.join(" AND ")}`:"",_=[];t.exec({sql:`SELECT id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json
          FROM archive_logs
          ${d}
          ORDER BY datetime(archived_at) ${a}, id ${a}
          LIMIT ?`,bind:[...u,r],rowMode:"object",callback:f=>_.push(f)});let p=null;const g=_.length>i;if(g){const f=_.pop();f&&(p={id:String(f.id),archivedAt:f.archived_at})}return{items:_.map(f=>J(f)).filter(f=>!!f),nextCursor:p,hasMore:g,pageSize:i,sortDirection:a}}async function _t(e={}){if(!t)throw new Error("Database not initialized");X();const n=re(e);if(!n)throw new Error("Ungültiger Archiv-Eintrag");const s=t.prepare(`INSERT OR REPLACE INTO archive_logs
      (id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);return s.bind([n.id,n.archivedAt,n.startDate,n.endDate,n.entryCount,n.fileName,n.storageHint,n.note,JSON.stringify(n.metadata||e||{})]).step(),s.finalize(),le(),J({id:n.id,archived_at:n.archivedAt,start_date:n.startDate,end_date:n.endDate,entry_count:n.entryCount,file_name:n.fileName,storage_hint:n.storageHint,note:n.note,metadata_json:JSON.stringify(n.metadata||e||{})})}async function pt(e={}){if(!t)throw new Error("Database not initialized");ee();const n=e.importedAt||new Date().toISOString(),s=t.prepare(`INSERT INTO import_log
      (imported_at, source, device, added, skipped, range_start, range_end, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);return s.bind([n,e.source!=null?String(e.source):null,e.device!=null?String(e.device):null,Number(e.added)||0,Number(e.skipped)||0,e.rangeStart!=null?String(e.rangeStart):null,e.rangeEnd!=null?String(e.rangeEnd):null,e.note!=null?String(e.note):null]).step(),s.finalize(),{id:t.selectValue("SELECT last_insert_rowid()"),importedAt:n}}async function gt(e={}){if(!t)throw new Error("Database not initialized");ee();const n=Math.min(Math.max(Number(e?.limit)||50,1),500),s=[];return t.exec({sql:`SELECT id, imported_at, source, device, added, skipped, range_start, range_end, note
          FROM import_log
          ORDER BY datetime(imported_at) DESC, id DESC
          LIMIT ?`,bind:[n],rowMode:"object",callback:a=>{s.push({id:a.id,importedAt:a.imported_at,source:a.source,device:a.device,added:Number(a.added)||0,skipped:Number(a.skipped)||0,rangeStart:a.range_start,rangeEnd:a.range_end,note:a.note})}}),{items:s}}async function Tt(e={}){if(!t)throw new Error("Database not initialized");M();const n=e.clientUuid?String(e.clientUuid):null;if(n)try{const r=t.selectValue("SELECT id FROM fotos WHERE client_uuid = ? LIMIT 1",[n]);if(r!=null)return{id:r,duplicate:!0}}catch{}if(!e.data)throw new Error("Foto-Daten fehlen");const s=e.createdAt||new Date().toISOString(),a=t.prepare(`INSERT INTO fotos
      (client_uuid, created_at, entry_uuid, kategorie, titel, standort, kultur,
       gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data, data_thumb)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);return a.bind([n,s,e.entryUuid!=null?String(e.entryUuid):null,e.kategorie!=null?String(e.kategorie):null,e.titel!=null?String(e.titel):null,e.standort!=null?String(e.standort):null,e.kultur!=null?String(e.kultur):null,e.gpsLatitude??null,e.gpsLongitude??null,e.notiz!=null?String(e.notiz):null,e.device!=null?String(e.device):null,e.mime!=null?String(e.mime):"image/jpeg",e.width??null,e.height??null,e.bytes??null,String(e.data),e.thumb!=null?String(e.thumb):null]).step(),a.finalize(),{id:t.selectValue("SELECT last_insert_rowid()"),duplicate:!1}}async function ht(e={}){if(!t)throw new Error("Database not initialized");M();const n=Math.min(Math.max(Number(e?.limit)||200,1),1e5),s=[];return t.exec({sql:`SELECT id, client_uuid, created_at, entry_uuid, kategorie, titel,
                 standort, kultur, gps_latitude, gps_longitude, notiz, device, mime,
                 width, height, bytes, data_thumb
          FROM fotos ORDER BY created_at DESC, id DESC LIMIT ?`,bind:[n],rowMode:"object",callback:a=>{s.push({id:a.id,clientUuid:a.client_uuid,createdAt:a.created_at,entryUuid:a.entry_uuid,kategorie:a.kategorie,titel:a.titel,standort:a.standort,kultur:a.kultur,gpsLatitude:a.gps_latitude,gpsLongitude:a.gps_longitude,notiz:a.notiz,device:a.device,mime:a.mime,width:a.width,height:a.height,bytes:a.bytes,thumb:a.data_thumb||null})}}),{items:s}}async function ft(e={}){if(!t)throw new Error("Database not initialized");M();const n=e&&e.id!=null?Number(e.id):null;if(n==null||!e.thumb)return{success:!1};const s=t.prepare("UPDATE fotos SET data_thumb = ? WHERE id = ?");return s.bind([String(e.thumb),n]).step(),s.finalize(),{success:!0}}async function bt(){if(!t)throw new Error("Database not initialized");M();const e={};let n=0,s=0;return t.exec({sql:"SELECT kategorie, COUNT(*) AS n, COALESCE(SUM(bytes),0) AS b FROM fotos GROUP BY kategorie",rowMode:"object",callback:a=>{e[a.kategorie||""]=Number(a.n)||0,n+=Number(a.n)||0,s+=Number(a.b)||0}}),{counts:e,total:n,totalBytes:s}}async function St(e={}){if(!t)throw new Error("Database not initialized");M();const n=Array.isArray(e?.ids)?e.ids.map(a=>Number(a)).filter(a=>Number.isFinite(a)):[];if(!n.length)return{success:!0,deleted:0};const s=n.map(()=>"?").join(",");return t.exec({sql:`DELETE FROM fotos WHERE id IN (${s})`,bind:n}),{success:!0,deleted:n.length}}async function Nt(e={}){if(!t)throw new Error("Database not initialized");M();const n=Array.isArray(e?.ids)?e.ids.map(i=>Number(i)).filter(i=>Number.isFinite(i)):[],s=e?.kategorie!=null?String(e.kategorie):null;if(!n.length)return{success:!0,updated:0};const a=n.map(()=>"?").join(",");return t.exec({sql:`UPDATE fotos SET kategorie = ? WHERE id IN (${a})`,bind:[s,...n]}),{success:!0,updated:n.length}}async function Lt(e={}){if(!t)throw new Error("Database not initialized");M();const n=Array.isArray(e?.ids)?e.ids.map(i=>Number(i)).filter(i=>Number.isFinite(i)):[];if(!n.length)return{items:[]};const s=n.map(()=>"?").join(","),a=[];return t.exec({sql:`SELECT client_uuid, created_at, entry_uuid, kategorie, titel, standort,
                 kultur, gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data
          FROM fotos WHERE id IN (${s}) ORDER BY created_at ASC, id ASC`,bind:n,rowMode:"object",callback:i=>{a.push({clientUuid:i.client_uuid,createdAt:i.created_at,entryUuid:i.entry_uuid,kategorie:i.kategorie,titel:i.titel,standort:i.standort,kultur:i.kultur,gpsLatitude:i.gps_latitude,gpsLongitude:i.gps_longitude,notiz:i.notiz,device:i.device,mime:i.mime,width:i.width,height:i.height,bytes:i.bytes,data:i.data})}}),{items:a}}async function At(e={}){if(!t)throw new Error("Database not initialized");M();const n=e&&e.id!=null?Number(e.id):null;if(n==null)throw new Error("Foto-ID fehlt");const s=[],a=[],i=(o,l)=>{if(Object.prototype.hasOwnProperty.call(e,o)){s.push(`${l} = ?`);const u=e[o];a.push(u==null||u===""?null:u)}};if(i("titel","titel"),i("kategorie","kategorie"),i("kultur","kultur"),i("standort","standort"),i("notiz","notiz"),i("gpsLatitude","gps_latitude"),i("gpsLongitude","gps_longitude"),!s.length)return{success:!0};a.push(n);const r=t.prepare(`UPDATE fotos SET ${s.join(", ")} WHERE id = ?`);return r.bind(a).step(),r.finalize(),{success:!0}}async function Rt(e={}){if(!t)throw new Error("Database not initialized");M();const n=e&&e.id!=null?Number(e.id):null;if(n==null)return{data:null};let s=null,a="image/jpeg";return t.exec({sql:"SELECT data, mime FROM fotos WHERE id = ? LIMIT 1",bind:[n],rowMode:"object",callback:i=>{s=i.data??null,a=i.mime||"image/jpeg"}}),{data:s,mime:a}}async function It(){if(!t)throw new Error("Database not initialized");M();const e=[];return t.exec({sql:`SELECT client_uuid, created_at, entry_uuid, kategorie, titel, standort,
                 kultur, gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data
          FROM fotos ORDER BY created_at ASC, id ASC`,rowMode:"object",callback:n=>{e.push({clientUuid:n.client_uuid,createdAt:n.created_at,entryUuid:n.entry_uuid,kategorie:n.kategorie,titel:n.titel,standort:n.standort,kultur:n.kultur,gpsLatitude:n.gps_latitude,gpsLongitude:n.gps_longitude,notiz:n.notiz,device:n.device,mime:n.mime,width:n.width,height:n.height,bytes:n.bytes,data:n.data})}}),{items:e}}async function Ot(e={}){if(!t)throw new Error("Database not initialized");M();const n=e&&e.id!=null?Number(e.id):null;if(n==null)throw new Error("Foto-ID fehlt");const s=t.prepare("DELETE FROM fotos WHERE id = ?");return s.bind([n]).step(),s.finalize(),{success:!0}}async function kt(){if(!t)throw new Error("Database not initialized");M();const e=t.selectValue("SELECT COUNT(*) FROM fotos")||0;return t.exec("DELETE FROM fotos"),{success:!0,deleted:Number(e)}}async function Ct(e={}){if(!t)throw new Error("Database not initialized");X();const n=e&&e.id?String(e.id):"";if(!n)throw new Error("Archiv-Log-ID fehlt");const s=t.prepare("DELETE FROM archive_logs WHERE id = ?");return s.bind([n]).step(),s.finalize(),le(),{success:!0}}async function Mt(e){if(!t)throw new Error("Database not initialized");let n=null;if(t.exec({sql:`SELECT id, created_at, header_json,
            ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
            uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
            invekos, gps, gps_latitude, gps_longitude, gps_point_id,
            qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart,
            company_name, company_address, company_headline, company_email
          FROM history WHERE id = ?`,bind:[e],rowMode:"object",callback:s=>{let a={};if(s.header_json)try{a=JSON.parse(s.header_json)}catch(i){console.warn("Could not parse header_json",i)}n={company:{name:s.company_name??a.company?.name??null,address:s.company_address??a.company?.address??null,headline:s.company_headline??a.company?.headline??null,contactEmail:s.company_email??a.company?.contactEmail??null},id:s.id,createdAt:s.created_at,ersteller:s.ersteller??a.ersteller,standort:s.standort??a.standort,kultur:s.kultur??a.kultur,eppoCode:s.eppo_code??a.eppoCode,bbch:s.bbch??a.bbch,datum:s.datum??a.datum,dateIso:s.date_iso??a.dateIso,uhrzeit:s.uhrzeit??a.uhrzeit,usageType:s.usage_type??a.usageType,areaHa:s.area_ha??a.areaHa,areaAr:s.area_ar??a.areaAr,areaSqm:s.area_sqm??a.areaSqm,waterVolume:s.water_volume??a.waterVolume,invekos:s.invekos??a.invekos,gps:s.gps??a.gps,gpsCoordinates:s.gps_latitude!=null&&s.gps_longitude!=null?{latitude:s.gps_latitude,longitude:s.gps_longitude}:a.gpsCoordinates||null,gpsPointId:s.gps_point_id??a.gpsPointId,qsMaschine:s.qs_maschine??a.qsMaschine,qsSchaderreger:s.qs_schaderreger??a.qsSchaderreger,qsVerantwortlicher:s.qs_verantwortlicher??a.qsVerantwortlicher,qsWetter:s.qs_wetter??a.qsWetter,qsBehandlungsart:s.qs_behandlungsart??a.qsBehandlungsart,savedAt:a.savedAt||s.created_at,items:[]}}}),!n)throw new Error("History entry not found");return t.exec({sql:`SELECT id, medium_id, payload_json,
            medium_name, medium_unit, method_id, method_label, medium_value,
            calculated_total, zulassungsnummer, wartezeit, wirkstoff,
            input_area_ha, input_area_ar, input_area_sqm, input_water_volume
          FROM history_items WHERE history_id = ?`,bind:[e],rowMode:"object",callback:s=>{let a={};if(s.payload_json)try{a=JSON.parse(s.payload_json)}catch(i){console.warn("Could not parse payload_json",i)}n.items.push({id:s.medium_id??a.id,mediumId:s.medium_id??a.mediumId,name:s.medium_name??a.name,unit:s.medium_unit??a.unit,methodId:s.method_id??a.methodId,methodLabel:s.method_label??a.methodLabel,value:s.medium_value??a.value,total:s.calculated_total??a.total,zulassungsnummer:s.zulassungsnummer??a.zulassungsnummer,wartezeit:s.wartezeit??a.wartezeit,wirkstoff:s.wirkstoff??a.wirkstoff,inputs:{areaHa:s.input_area_ha??a.inputs?.areaHa,areaAr:s.input_area_ar??a.inputs?.areaAr,areaSqm:s.input_area_sqm??a.inputs?.areaSqm,waterVolume:s.input_water_volume??a.inputs?.waterVolume}})}}),n}async function yt(e){if(!t)throw new Error("Database not initialized");const n=e&&e.header?e.header:e||{},s=n&&n.clientUuid?String(n.clientUuid):null;if(s)try{const a=t.selectValue("SELECT id FROM history WHERE json_extract(header_json, '$.clientUuid') = ? LIMIT 1",[s]);if(a!=null)return{id:a,duplicate:!0}}catch{}t.exec("BEGIN TRANSACTION");try{const a=e.header?{...e.header}:{...e};delete a.items;const i=e.savedAt||a.savedAt||a.createdAt||new Date().toISOString();a.createdAt||(a.createdAt=i);const r=a.gpsCoordinates||{},o=a.company||{},l=t.prepare(`
      INSERT INTO history (
        created_at, header_json,
        ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
        uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
        invekos, gps, gps_latitude, gps_longitude, gps_point_id,
        qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart,
        company_name, company_address, company_headline, company_email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);l.bind([i,JSON.stringify(a),a.ersteller||null,a.standort||null,a.kultur||null,a.eppoCode||null,a.bbch||null,a.datum||null,a.dateIso||null,a.uhrzeit||null,a.usageType||null,a.areaHa??null,a.areaAr??null,a.areaSqm??null,a.waterVolume??null,a.invekos||null,a.gps||null,r.latitude??null,r.longitude??null,a.gpsPointId||null,a.qsMaschine||null,a.qsSchaderreger||null,a.qsVerantwortlicher||null,a.qsWetter||null,a.qsBehandlungsart||null,o.name||null,o.address||null,o.headline||null,o.contactEmail||null]).step();const u=t.selectValue("SELECT last_insert_rowid()");l.finalize();const d=e.items&&Array.isArray(e.items)?e.items:[];if(d.length){const _=t.prepare(`
        INSERT INTO history_items (
          history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);for(const p of d){const g=p.inputs||{};_.bind([u,p.mediumId||p.medium_id||p.id||"",JSON.stringify(p),p.name||null,p.unit||null,p.methodId||null,p.methodLabel||null,p.value??null,p.total??null,p.zulassungsnummer||null,p.wartezeit??null,p.wirkstoff||null,g.areaHa??null,g.areaAr??null,g.areaSqm??null,g.waterVolume??null]).step(),_.reset()}_.finalize()}return t.exec("COMMIT"),{success:!0,id:u}}catch(a){throw t.exec("ROLLBACK"),a}}async function Dt(e){if(!t)throw new Error("Database not initialized");const n=t.prepare("DELETE FROM history WHERE id = ?");return n.bind([e]).step(),n.finalize(),{success:!0}}async function vt(){if(!t)throw new Error("Database not initialized");const e=S.capi.sqlite3_js_db_export(t.pointer);return{data:e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}}async function wt(e){if(!t)throw new Error("Database not initialized");const n=e instanceof Uint8Array?e:new Uint8Array(e);if(G==="opfs"&&S?.oo1?.OpfsDb&&S?.opfs)return t.close(),await S.oo1.OpfsDb.importDb("/pflanzenschutz.sqlite",n),t=_e("opfs"),te(),await ne(),G="opfs",H=!0,{success:!0,mode:"opfs"};t.close();const s=new S.oo1.DB,a=S.wasm.scopedAllocPush();try{const i=S.wasm.allocFromTypedArray(n),r=S.wasm.allocCString("main"),o=(S.capi.SQLITE_DESERIALIZE_FREEONCLOSE||0)|(S.capi.SQLITE_DESERIALIZE_RESIZEABLE||0),l=S.capi.sqlite3_deserialize(s.pointer,r,i,n.byteLength,n.byteLength,o);if(l!==S.capi.SQLITE_OK)throw s.close(),new Error(`sqlite3_deserialize failed: ${S.capi.sqlite3_js_rc_str(l)||l}`)}finally{S.wasm.scopedAllocPop(a)}return t=s,te(),await ne(),G="memory",H=!0,{success:!0,mode:"memory"}}async function zt(e={}){if(!t)throw new Error("Database not initialized");if(!S)throw new Error("SQLite not initialized");const{data:n}=e;if(!n)throw new Error("Keine Daten zum Importieren übergeben");const s=n instanceof Uint8Array?n:new Uint8Array(n);console.log(`[EPPO Import] Lade Datenbank, ${s.length} bytes`);const a=Ee(s),i=[];let r=0;try{const o=[];a.exec({sql:"SELECT name FROM sqlite_master WHERE type='table'",callback:l=>{l&&l[0]&&o.push(l[0])}}),console.log("[EPPO Import] Gefundene Tabellen:",o),o.includes("eppo")?(console.log('[EPPO Import] Nutze neue deutsche Tabelle "eppo"'),a.exec({sql:"SELECT code, name FROM eppo ORDER BY name",callback:l=>{if(!l||!l[0])return;const u=String(l[0]).trim().toUpperCase(),d=l[1]?String(l[1]).trim():u;i.push({code:u,name:d,language:"DE",dtcode:null,dtLabel:"plant",languageLabel:"Deutsch",authority:null,nameDe:d,nameEn:null,nameLa:null})}})):o.includes("t_codes")?(console.log("[EPPO Import] Nutze alte Struktur mit t_codes"),a.exec({sql:`
          SELECT UPPER(TRIM(c.eppocode)) AS code, TRIM(n.fullname) AS name
          FROM t_codes c
          JOIN t_names n ON c.codeid = n.codeid
          WHERE n.codelang = 'de' AND n.fullname IS NOT NULL
          ORDER BY n.fullname
        `,callback:l=>{if(!l||!l[0])return;const u=String(l[0]).trim().toUpperCase(),d=l[1]?String(l[1]).trim():u;i.push({code:u,name:d,language:"DE",dtcode:null,dtLabel:"plant",languageLabel:"Deutsch",authority:null,nameDe:d,nameEn:null,nameLa:null})}})):console.error("[EPPO Import] Keine bekannte Tabellenstruktur gefunden!"),r=i.length,console.log(`[EPPO Import] ${i.length} Einträge gelesen`)}finally{a.close()}t.exec("BEGIN TRANSACTION");try{if(x(t),t.exec("DELETE FROM lookup_eppo_codes"),i.length){const o=t.prepare(`INSERT OR REPLACE INTO lookup_eppo_codes (
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);for(const l of i)o.bind([l.code,l.name,l.language||"",l.dtcode,1,l.dtLabel,l.languageLabel,l.authority,l.nameDe,l.nameEn,l.nameLa]).step(),o.reset();o.finalize()}return w("lookup:eppo:lastImport",new Date().toISOString()),w("lookup:eppo:count",String(r||i.length)),t.exec("COMMIT"),{success:!0,count:i.length}}catch(o){throw t.exec("ROLLBACK"),console.error("EPPO-Lookup-Import fehlgeschlagen",o),o}}async function xt(e={}){if(!t)throw new Error("Database not initialized");if(!S)throw new Error("SQLite not initialized");const{data:n}=e;if(!n)throw new Error("Keine Daten zum Importieren übergeben");const s=n instanceof Uint8Array?n:new Uint8Array(n);console.log(`[BBCH Import] Lade Datenbank, ${s.length} bytes`);const a=Ee(s),i=[];try{const r=[];a.exec({sql:"SELECT name FROM sqlite_master WHERE type='table'",callback:o=>{o&&o[0]&&r.push(o[0])}}),console.log("[BBCH Import] Gefundene Tabellen:",r),r.includes("bbch")?(console.log('[BBCH Import] Nutze neue deutsche Tabelle "bbch"'),a.exec({sql:"SELECT code, label, stage_group FROM bbch ORDER BY CAST(code AS INTEGER)",callback:o=>{if(!o||!o[0])return;const l=String(o[0]).trim(),u=o[1]?String(o[1]).trim():l,d=o[2]!=null?Number(o[2]):null;i.push({code:l,label:u,principal:d,secondary:null,definition:u,kind:null})}})):r.includes("bbch_stage")?(console.log("[BBCH Import] Nutze alte Struktur mit bbch_stage"),a.exec({sql:"SELECT bbch_code, label_de, definition_1, definition_2, principal_stage FROM bbch_stage ORDER BY CAST(bbch_code AS INTEGER)",callback:o=>{if(!o||!o[0])return;const l=String(o[0]).trim();let u=o[1]||l;const d=o[2]||"",_=o[3]||"";_.includes("Quelle BBCH")||_.includes("(G)")||_.includes("(D)")?u=_:(d.includes("Quelle BBCH")||d.includes("(G)")||d.includes("(D)"))&&(u=d),i.push({code:l,label:u,principal:o[4]!=null?Number(o[4]):null,secondary:null,definition:u,kind:null})}})):console.error("[BBCH Import] Keine bekannte Tabellenstruktur gefunden!"),console.log(`[BBCH Import] ${i.length} Einträge gelesen`)}finally{a.close()}t.exec("BEGIN TRANSACTION");try{if(x(t),t.exec("DELETE FROM lookup_bbch_stages"),i.length){const r=t.prepare(`INSERT OR REPLACE INTO lookup_bbch_stages
        (code, label, principal_stage, secondary_stage, definition, kind)
        VALUES (?, ?, ?, ?, ?, ?)`);for(const o of i)r.bind([o.code,o.label,o.principal,o.secondary,o.definition||null,o.kind]).step(),r.reset();r.finalize()}return w("lookup:bbch:lastImport",new Date().toISOString()),w("lookup:bbch:count",String(i.length)),t.exec("COMMIT"),{success:!0,count:i.length}}catch(r){throw t.exec("ROLLBACK"),console.error("BBCH-Lookup-Import fehlgeschlagen",r),r}}function Ft(e={}){if(!t)throw new Error("Database not initialized");x(t);const n=(e.query||"").trim(),s=Math.min(Math.max(Number(e.limit)||10,1),50),a=Math.max(Number(e.offset)||0,0),i=(e.language||"").trim().toUpperCase(),r=i.length>0,o=[],l=t.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes")||0;if(console.log(`[EPPO Search] Suche: "${n}", Sprache: "${i}", hasLanguageFilter: ${r}`),console.log(`[EPPO Search] Gesamt ${l} Einträge in lookup_eppo_codes`),n&&l>0){const T=`%${n.toUpperCase()}%`,h=t.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes WHERE UPPER(name) LIKE ? OR UPPER(IFNULL(name_de, '')) LIKE ?",[T,T])||0;console.log(`[EPPO Search] ${h} Treffer für "${n}"`);const m=[];t.exec({sql:"SELECT code, name, language, name_de FROM lookup_eppo_codes LIMIT 3",callback:c=>{c&&m.push({code:c[0],name:c[1],lang:c[2],name_de:c[3]})}}),console.log("[EPPO Search] Beispiel-Einträge:",m)}if(r&&i==="DE")return Xt({query:n,limit:s,offset:a});const u=`
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
  `,d="UPPER(IFNULL(language, '')) = ?",_=T=>{r&&T.push(i)};if(!n){const T=r?`WHERE ${d}`:"",h=[];_(h),h.push(s,a),t.exec({sql:`${u}
        ${T}
        ORDER BY name
        LIMIT ? OFFSET ?
      `,bind:h,callback:b=>{o.push({code:b[0],name:b[1],dtcode:b[2]||null,language:b[3]||null,dtLabel:b[4]||null,languageLabel:b[5]||null,authority:b[6]||null,nameDe:b[7]||null,nameEn:b[8]||null,nameLa:b[9]||null})}});const m=r?`SELECT COUNT(*) FROM lookup_eppo_codes WHERE ${d}`:"SELECT COUNT(*) FROM lookup_eppo_codes",c=[];_(c);const O=Number(t.selectValue(m,c))||0;return{rows:o,total:O}}const p=n.toUpperCase(),g=`%${p}%`,N=["(code LIKE ? OR UPPER(name) LIKE ? OR UPPER(IFNULL(name_de, '')) LIKE ?)"];r&&N.push(d);const f=`WHERE ${N.join(" AND ")}`,k=[g,g,g];_(k);const R=Number(t.selectValue(`SELECT COUNT(*) FROM lookup_eppo_codes ${f}`,k))||0,E=[g,g,g];_(E);const A=[`${p}%`,g],L=[s,a];return t.exec({sql:`${u}
      ${f}
      ORDER BY CASE WHEN code LIKE ? THEN 0 ELSE 1 END,
               CASE WHEN UPPER(IFNULL(name_de, '')) LIKE ? THEN 0 ELSE 1 END,
               name
      LIMIT ? OFFSET ?
    `,bind:[...E,...A,...L],callback:T=>{o.push({code:T[0],name:T[1],dtcode:T[2]||null,language:T[3]||null,dtLabel:T[4]||null,languageLabel:T[5]||null,authority:T[6]||null,nameDe:T[7]||null,nameEn:T[8]||null,nameLa:T[9]||null})}}),{rows:o,total:R}}function Xt(e={}){const n=(e.query||"").trim(),s=Math.min(Math.max(Number(e.limit)||10,1),50),a=Math.max(Number(e.offset)||0,0),i=[],r=ge(),o=`(${r}) AS german_lookup`;if(!n){t.exec({sql:`
        SELECT code, name, dtcode, language, dt_label, language_label, authority, name_de, name_en, name_la
        FROM ${o}
        ORDER BY name
        LIMIT ? OFFSET ?
      `,bind:[s,a],callback:g=>{g&&i.push({code:g[0],name:g[1],dtcode:g[2]||null,language:g[3]||"DE",dtLabel:g[4]||null,languageLabel:g[5]||"Deutsch",authority:g[6]||null,nameDe:g[7]||null,nameEn:g[8]||null,nameLa:g[9]||null})}});const p=Number(t.selectValue(`SELECT COUNT(*) FROM (${r}) AS german_lookup`))||0;return{rows:i,total:p}}const l=n.toUpperCase(),u=`%${l}%`,d=Number(t.selectValue(`SELECT COUNT(*) FROM ${o} WHERE code LIKE ? OR UPPER(name) LIKE ?`,[u,u]))||0,_=[u,u,`${l}%`,s,a];return t.exec({sql:`
      SELECT code, name, dtcode, language, dt_label, language_label, authority, name_de, name_en, name_la
      FROM ${o}
      WHERE code LIKE ? OR UPPER(name) LIKE ?
      ORDER BY CASE WHEN code LIKE ? THEN 0 ELSE 1 END, name
      LIMIT ? OFFSET ?
    `,bind:_,callback:p=>{p&&i.push({code:p[0],name:p[1],dtcode:p[2]||null,language:p[3]||"DE",dtLabel:p[4]||null,languageLabel:p[5]||"Deutsch",authority:p[6]||null,nameDe:p[7]||null,nameEn:p[8]||null,nameLa:p[9]||null})}}),{rows:i,total:d}}function Ut(){if(!t)throw new Error("Database not initialized");x(t);const e=[];t.exec({sql:`
      SELECT
        UPPER(IFNULL(language, '')) AS language_code,
        MAX(language_label) AS language_label,
        COUNT(*) AS entry_count
      FROM lookup_eppo_codes
      GROUP BY UPPER(IFNULL(language, ''))
      ORDER BY CASE WHEN language_code = '' THEN 0 ELSE 1 END, language_code;
    `,callback:s=>{if(!s)return;const a=s[0]?String(s[0]).trim().toUpperCase():"",i=s[1]?String(s[1]).trim():null,r=s[2]!=null?Number(s[2]):0;e.push({language:a,label:i,count:r})}});const n=Number(t.selectValue(`SELECT COUNT(*) FROM (${ge()}) AS german_lookup`))||0;if(n>0){const s=e.find(a=>(a.language||"").toUpperCase()==="DE");if(s){const a=s.label?s.label.trim():"";s.label=a||"Deutsch",s.count=n}else e.push({language:"DE",label:"Deutsch",count:n})}return e.sort((s,a)=>{const i=o=>o===""?0:1,r=i(s.language||"")-i(a.language||"");return r!==0?r:(s.language||"").localeCompare(a.language||"")}),e.map(s=>{const a=s.language||"",i=s.label&&s.label.length?s.label:a||"Ohne Sprachcode";return{language:a,label:i,count:s.count}})}function ge(){return`
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
  `}function qt(e={}){if(!t)throw new Error("Database not initialized");x(t);const n=(e.query||"").trim(),s=Math.min(Math.max(Number(e.limit)||10,1),50),a=Math.max(Number(e.offset)||0,0),i=[],r="ORDER BY label";if(!n){t.exec({sql:`
        SELECT code, label, principal_stage, secondary_stage, definition, kind
        FROM lookup_bbch_stages
        ${r}
        LIMIT ? OFFSET ?
      `,bind:[s,a],callback:d=>{i.push({code:d[0],label:d[1],principalStage:d[2]!=null?Number(d[2]):null,secondaryStage:d[3]!=null?Number(d[3]):null,definition:d[4]||null,kind:d[5]||null})}});const u=Number(t.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages"))||0;return{rows:i,total:u}}const o=`%${n.toUpperCase()}%`,l=Number(t.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages WHERE code LIKE ? OR UPPER(label) LIKE ? OR UPPER(IFNULL(definition, '')) LIKE ?",[o,o,o]))||0;return t.exec({sql:`
      SELECT code, label, principal_stage, secondary_stage, definition, kind
      FROM lookup_bbch_stages
      WHERE code LIKE ? OR UPPER(label) LIKE ? OR UPPER(IFNULL(definition, '')) LIKE ?
      ORDER BY 
        CASE WHEN code LIKE ? THEN 0 ELSE 1 END,
        CASE WHEN UPPER(IFNULL(definition, '')) LIKE ? THEN 0 ELSE 1 END,
        label
      LIMIT ? OFFSET ?
    `,bind:[o,o,o,o,o,s,a],callback:u=>{i.push({code:u[0],label:u[1],principalStage:u[2]!=null?Number(u[2]):null,secondaryStage:u[3]!=null?Number(u[3]):null,definition:u[4]||null,kind:u[5]||null})}}),{rows:i,total:l}}function Pt(){if(!t)throw new Error("Database not initialized");x(t);const e=Number(t.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes"))||0,n=Number(t.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages"))||0;return{eppo:{count:e,lastImport:F("lookup:eppo:lastImport")},bbch:{count:n,lastImport:F("lookup:bbch:lastImport")}}}})();
