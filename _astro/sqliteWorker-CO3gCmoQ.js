(function(){"use strict";let N=null,t=null,K=!1,V="memory";const ue=(typeof{url:self.location.href}<"u","/psm/"+"vendor/sqlite/"),X="gps_active_point";function H(e,a=50,i=500){const n=Number(e);return!Number.isFinite(n)||n<=0?a:Math.min(Math.max(1,Math.floor(n)),i)}function Ae(e){if(typeof e!="string")return null;try{return JSON.parse(e)}catch(a){return console.warn("Failed to parse payload JSON",a),null}}function oe(e=t){e&&e.exec(`
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
  `)}function L(e,a,i){if(!e)return!1;const n=`SELECT 1 FROM pragma_table_info('${a}') WHERE name = '${i}' LIMIT 1`;return!!e.selectValue(n)}function I(e,a){if(!e||!a)return!1;const i=`SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = '${a}' LIMIT 1`;return!!e.selectValue(i)}function Re(e=t){e&&(L(e,"mediums","zulassungsnummer")||e.exec("ALTER TABLE mediums ADD COLUMN zulassungsnummer TEXT"))}function $(e=t){if(e){if(!L(e,"mediums","wartezeit"))try{e.exec("ALTER TABLE mediums ADD COLUMN wartezeit TEXT"),console.log("[DB] Added wartezeit column to mediums")}catch(a){console.warn("[DB] Could not add wartezeit column:",a.message)}if(!L(e,"mediums","wirkstoff"))try{e.exec("ALTER TABLE mediums ADD COLUMN wirkstoff TEXT"),console.log("[DB] Added wirkstoff column to mediums")}catch(a){console.warn("[DB] Could not add wirkstoff column:",a.message)}}}function w(e=t){if(!e)return;const a=()=>{e.exec("DROP TABLE IF EXISTS lookup_eppo_codes"),e.exec(`
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
    `)};L(e,"lookup_eppo_codes","language")?e.exec(`
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
    `):a(),e.exec(`
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
  `);const i=[{name:"dt_label",type:"TEXT"},{name:"language_label",type:"TEXT"},{name:"authority",type:"TEXT"},{name:"name_de",type:"TEXT"},{name:"name_en",type:"TEXT"},{name:"name_la",type:"TEXT"}];for(const n of i)L(e,"lookup_eppo_codes",n.name)||e.exec(`ALTER TABLE lookup_eppo_codes ADD COLUMN ${n.name} ${n.type}`)}function v(e=t){e&&e.exec(`
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
  `)}function q(e=t){e&&e.exec(`
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
  `)}function Ie(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`archive_${Date.now()}_${Math.random().toString(16).slice(2)}`}function ce(e){if(!e||typeof e!="object")return null;const a=e.id?String(e.id):Ie(),i=e.archivedAt||e.archived_at||new Date().toISOString(),n=e.startDate||e.start_date||null,s=e.endDate||e.end_date||null,r=Number(e.entryCount??e.entry_count??0)||0,l=e.fileName||e.file_name||"",u=e.storageHint||e.storage_hint||null,o=e.note??e.note_text??null;return{id:a,archivedAt:i,startDate:n,endDate:s,entryCount:r,fileName:l,storageHint:u,note:o,metadata:{...e,id:a,archivedAt:i,startDate:n,endDate:s,entryCount:r,fileName:l,storageHint:u,note:o}}}function Y(e){return{id:e.id,archivedAt:e.archivedAt,startDate:e.startDate??null,endDate:e.endDate??null,entryCount:e.entryCount??0,fileName:e.fileName??"",storageHint:e.storageHint??null,note:e.note??null}}function te(e=[],a=t){if(q(a),a.exec("DELETE FROM archive_logs"),!Array.isArray(e)||!e.length)return[];const i=a.prepare(`INSERT OR REPLACE INTO archive_logs
      (id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`),n=[];for(const s of e){const r=ce(s);r&&(i.bind([r.id,r.archivedAt,r.startDate,r.endDate,r.entryCount,r.fileName,r.storageHint,r.note,JSON.stringify(r.metadata||s||{})]).step(),i.reset(),n.push(Y(r)))}return i.finalize(),n}function ne(e=t){q(e);const a=[];return e.exec({sql:`SELECT id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json
          FROM archive_logs
          ORDER BY datetime(archived_at) DESC, id DESC`,rowMode:"object",callback:i=>{const n=ae(i);n&&a.push(n)}}),a}function ae(e){if(!e)return null;const a=e.metadata_json?Ae(e.metadata_json):null,i=a&&typeof a=="object"?{...a}:{};return i.id=String(e.id),i.archivedAt=e.archived_at||i.archivedAt||new Date().toISOString(),i.startDate=e.start_date??i.startDate??null,i.endDate=e.end_date??i.endDate??null,i.entryCount=Number(e.entry_count??i.entryCount??0)||0,i.fileName=e.file_name||i.fileName||"",i.storageHint=e.storage_hint??i.storageHint??null,i.note=e.note??i.note??null,i}function de(e=t){const a=ne(e).map(i=>Y(i));x("archives",JSON.stringify({logs:a}),e)}function Oe(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`gps_${Date.now()}_${Math.random().toString(16).slice(2)}`}function ie(e){return e?{id:String(e.id),name:e.name!=null?String(e.name):"",description:e.description??null,latitude:Number(e.latitude),longitude:Number(e.longitude),source:e.source??null,created_at:e.created_at||new Date().toISOString(),updated_at:e.updated_at||new Date().toISOString(),nutzflaeche_qm:e.nutzflaeche_qm!=null?Number(e.nutzflaeche_qm):null,kind:e.kind??null}:null}function ke(e){if(!t||!e)return null;let a=null;return t.exec({sql:`SELECT id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind
           FROM gps_points
           WHERE id = ?
           LIMIT 1`,bind:[e],rowMode:"object",callback:i=>{a||(a=ie(i))}}),a}async function Ce(){if(!t)throw new Error("Database not initialized");v();const e=[];t.exec({sql:`SELECT id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind
          FROM gps_points
          ORDER BY datetime(updated_at) DESC`,rowMode:"object",callback:i=>{e.push(ie(i))}});const a=U(X);return{rows:e,activePointId:a||null}}async function Me(e={}){if(!t)throw new Error("Database not initialized");v();const{cursor:a=null,limit:i,pageSize:n,search:s,includeTotal:r=!1}=e||{},l=H(n??i,100,500),u=typeof s=="string"?s.trim():"",o=[],c=[];if(u){o.push("(LOWER(name) LIKE LOWER(?) OR LOWER(COALESCE(description, '')) LIKE LOWER(?))");const m=`%${u}%`;c.push(m,m)}const g=[...o],_=[...c];if(a&&a.updatedAt){const m=a.id!=null?String(a.id):"",E=a.updatedAt;g.push(`(
      datetime(updated_at) < datetime(?)
      OR (datetime(updated_at) = datetime(?) AND id > ?)
    )`),_.push(E,E,m)}const p=g.length?`WHERE ${g.join(" AND ")}`:"",b=t.prepare(`SELECT rowid AS cursor_rowid, id, name, description, latitude, longitude, source, created_at, updated_at
     FROM gps_points
     ${p}
     ORDER BY datetime(updated_at) DESC, id ASC
     LIMIT ?`);b.bind([..._,l+1]);const f=[];for(;b.step();)f.push(b.getAsObject());b.finalize();const O=f.length>l,A=O?f.slice(0,l):f,k=A.map(m=>ie(m)).filter(m=>m!==null),M=A.length?A[A.length-1]:null,d=O&&M?{id:String(M.id??""),updatedAt:M.updated_at||M.updatedAt||null,rowid:Number(M.cursor_rowid)||Number(M.rowid||0)}:null;let T;if(r){const m=o.length?`WHERE ${o.join(" AND ")}`:"",E=t.prepare(`SELECT COUNT(*) AS total FROM gps_points ${m}`);if(c.length&&E.bind(c),E.step()){const R=E.getAsObject();T=Number(R?.total)||0}else T=0;E.finalize()}const S=U(X);return{items:k,nextCursor:d,hasMore:O,pageSize:l,activePointId:S||null,totalCount:T}}async function ye(e={}){if(!t)throw new Error("Database not initialized");v();const a=String(e.id||Oe()),i=String(e.name??"").trim();if(!i)throw new Error("GPS-Punkt benötigt einen Namen.");const n=Number(e.latitude),s=Number(e.longitude);if(!Number.isFinite(n)||!Number.isFinite(s))throw new Error("GPS-Punkt hat ungültige Koordinaten.");const r=e.description!=null?String(e.description):null,l=e.source!=null?String(e.source):null,u=e.nutzflaecheQm??e.nutzflaeche_qm??null,o=u!=null&&Number.isFinite(Number(u))?Number(u):null,c=e.kind!=null?String(e.kind):null,g=new Date().toISOString();if(t.selectValue("SELECT 1 FROM gps_points WHERE id = ? LIMIT 1",[a])){const b=t.prepare(`UPDATE gps_points
       SET name = ?, description = ?, latitude = ?, longitude = ?, source = ?, nutzflaeche_qm = ?, kind = ?, updated_at = ?
       WHERE id = ?`);b.bind([i,r,n,s,l,o,c,g,a]),b.step(),b.finalize()}else{const b=t.prepare(`INSERT INTO gps_points (id, name, description, latitude, longitude, source, created_at, updated_at, nutzflaeche_qm, kind)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);b.bind([a,i,r,n,s,l,g,g,o,c]),b.step(),b.finalize()}const p=ke(a);if(!p)throw new Error("GPS-Punkt konnte nicht gelesen werden.");return p}async function De(e={}){if(!t)throw new Error("Database not initialized");v();const a=String(e.id??"").trim();if(!a)throw new Error("ID für GPS-Punkt fehlt.");const i=t.prepare("DELETE FROM gps_points WHERE id = ?");return i.bind([a]),i.step(),i.finalize(),U(X)===a&&fe(X),{success:!0}}async function ze(e={}){if(!t)throw new Error("Database not initialized");v();const a=e&&typeof e.id=="string"?e.id.trim():null;if(a){if(!t.selectValue("SELECT 1 FROM gps_points WHERE id = ? LIMIT 1",[a]))throw new Error("GPS-Punkt wurde nicht gefunden.");return x(X,a),{activePointId:a}}return fe(X),{activePointId:null}}async function ve(){if(!t)throw new Error("Database not initialized");return{activePointId:U(X)||null}}function z(e=t){e&&e.exec(`
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
  `)}function F(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`km_${Date.now()}_${Math.random().toString(16).slice(2)}`}function me(e){return e?{id:String(e.id),kultur:e.kultur!=null?String(e.kultur):"",anbau:e.anbau??null,problem:e.problem??null,mittelName:e.mittel_name!=null?String(e.mittel_name):"",kennr:e.kennr??null,wirkstoff:e.wirkstoff??null,eppoCode:e.eppo_code??null,bbchDefault:e.bbch_default??null,bbch:e.bbch??null,wartezeit:e.wartezeit??null,aufwandWert:e.aufwand_wert??null,aufwandEinheit:e.aufwand_einheit??null,aufwandBezug:e.aufwand_bezug??null,maxAnwendungen:e.max_anwendungen??null,bemerkung:e.bemerkung??null,istPsm:e.ist_psm?1:0,istKupfer:e.ist_kupfer?1:0,sortOrder:e.sort_order!=null?Number(e.sort_order):0,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}async function xe(){if(!t)throw new Error("Database not initialized");z();const e=[];return t.exec({sql:`SELECT kultur, anbau, COUNT(*) AS anzahl,
                 MAX(eppo_code) AS eppo_code, MAX(bbch_default) AS bbch_default
          FROM kultur_mittel
          GROUP BY kultur, anbau
          ORDER BY kultur COLLATE NOCASE, anbau`,rowMode:"object",callback:a=>{e.push({kultur:a.kultur!=null?String(a.kultur):"",anbau:a.anbau??null,anzahl:a.anzahl!=null?Number(a.anzahl):0,eppoCode:a.eppo_code??null,bbchDefault:a.bbch_default??null})}}),{rows:e}}async function Xe(e={}){if(!t)throw new Error("Database not initialized");z();const a=e&&e.kultur!=null?String(e.kultur):null,i=e&&e.anbau!=null?String(e.anbau):null,n=[],s=[];a&&(n.push("kultur = ?"),s.push(a)),i&&(n.push("anbau = ?"),s.push(i));const r=n.length?`WHERE ${n.join(" AND ")}`:"",l=[];return t.exec({sql:`SELECT * FROM kultur_mittel ${r}
          ORDER BY sort_order, mittel_name COLLATE NOCASE`,bind:s,rowMode:"object",callback:u=>l.push(me(u))}),{rows:l}}async function we(e={}){if(!t)throw new Error("Database not initialized");z();const a=String(e.id||F()),i=String(e.kultur??"").trim(),n=String(e.mittelName??e.mittel_name??"").trim();if(!i||!n)throw new Error("kultur und mittel_name sind erforderlich.");const s=new Date().toISOString(),r={anbau:e.anbau!=null?String(e.anbau):null,problem:e.problem!=null?String(e.problem):null,kennr:e.kennr!=null?String(e.kennr):null,wirkstoff:e.wirkstoff!=null?String(e.wirkstoff):null,wartezeit:e.wartezeit!=null?String(e.wartezeit):null,aufwand_wert:e.aufwandWert??e.aufwand_wert!=null?String(e.aufwandWert??e.aufwand_wert):null,aufwand_einheit:e.aufwandEinheit??e.aufwand_einheit!=null?String(e.aufwandEinheit??e.aufwand_einheit):null,aufwand_bezug:e.aufwandBezug??e.aufwand_bezug!=null?String(e.aufwandBezug??e.aufwand_bezug):null,max_anwendungen:e.maxAnwendungen!=null?String(e.maxAnwendungen):null,bemerkung:e.bemerkung!=null?String(e.bemerkung):null,ist_psm:e.istPsm===0||e.ist_psm===0||e.istPsm===!1?0:1,ist_kupfer:e.istKupfer||e.ist_kupfer?1:0,sort_order:Number.isFinite(Number(e.sortOrder??e.sort_order))?Number(e.sortOrder??e.sort_order):0};if(t.selectValue("SELECT 1 FROM kultur_mittel WHERE id = ? LIMIT 1",[a])){const o=t.prepare("UPDATE kultur_mittel SET kultur=?, anbau=?, problem=?, mittel_name=?, kennr=?, wirkstoff=?, wartezeit=?, aufwand_wert=?, aufwand_einheit=?, aufwand_bezug=?, max_anwendungen=?, bemerkung=?, ist_psm=?, ist_kupfer=?, sort_order=?, updated_at=? WHERE id=?");o.bind([i,r.anbau,r.problem,n,r.kennr,r.wirkstoff,r.wartezeit,r.aufwand_wert,r.aufwand_einheit,r.aufwand_bezug,r.max_anwendungen,r.bemerkung,r.ist_psm,r.ist_kupfer,r.sort_order,s,a]),o.step(),o.finalize()}else{const o=t.prepare("INSERT INTO kultur_mittel (id, kultur, anbau, problem, mittel_name, kennr, wirkstoff, wartezeit, aufwand_wert, aufwand_einheit, aufwand_bezug, max_anwendungen, bemerkung, ist_psm, ist_kupfer, sort_order, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");o.bind([a,i,r.anbau,r.problem,n,r.kennr,r.wirkstoff,r.wartezeit,r.aufwand_wert,r.aufwand_einheit,r.aufwand_bezug,r.max_anwendungen,r.bemerkung,r.ist_psm,r.ist_kupfer,r.sort_order,s,s]),o.step(),o.finalize()}let u=null;return t.exec({sql:"SELECT * FROM kultur_mittel WHERE id = ? LIMIT 1",bind:[a],rowMode:"object",callback:o=>{u||(u=me(o))}}),u}async function Fe(e={}){if(!t)throw new Error("Database not initialized");z();const a=String(e.id??"").trim();if(!a)throw new Error("ID fehlt.");const i=t.prepare("DELETE FROM kultur_mittel WHERE id = ?");return i.bind([a]),i.step(),i.finalize(),{success:!0}}async function Ue(e={}){if(!t)throw new Error("Database not initialized");v(),z();const a=new Date().toISOString(),i={gpsPoints:0,kulturMittel:0},n=Array.isArray(e.gpsPoints)?e.gpsPoints:[];if(n.length&&(t.selectValue("SELECT COUNT(*) FROM gps_points")||0)===0){t.exec("BEGIN TRANSACTION");try{const r=t.prepare(`INSERT INTO gps_points (id,name,description,latitude,longitude,source,created_at,updated_at,nutzflaeche_qm,kind)
         VALUES (?,?,?,?,?,?,?,?,?,?)`);for(const l of n)r.bind([String(l.id),String(l.name??""),l.description??null,Number(l.latitude),Number(l.longitude),l.source??null,l.created_at||a,l.updated_at||a,l.nutzflaeche_qm!=null?Number(l.nutzflaeche_qm):null,l.kind??null]),r.step(),r.reset();r.finalize(),t.exec("COMMIT"),i.gpsPoints=n.length}catch(r){throw t.exec("ROLLBACK"),r}}const s=Array.isArray(e.kulturMittel)?e.kulturMittel:[];if(s.length&&(t.selectValue("SELECT COUNT(*) FROM kultur_mittel")||0)===0){t.exec("BEGIN TRANSACTION");try{const r=t.prepare(`INSERT INTO kultur_mittel (id,kultur,anbau,problem,mittel_name,kennr,wirkstoff,eppo_code,bbch_default,bbch,wartezeit,aufwand_wert,aufwand_einheit,aufwand_bezug,max_anwendungen,bemerkung,ist_psm,ist_kupfer,sort_order,created_at,updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);for(const l of s)r.bind([String(l.id),String(l.kultur??""),l.anbau??null,l.problem??null,String(l.mittel_name??""),l.kennr??null,l.wirkstoff??null,l.eppo_code??null,l.bbch_default??null,l.bbch??null,l.wartezeit??null,l.aufwand_wert??null,l.aufwand_einheit??null,l.aufwand_bezug??null,l.max_anwendungen??null,l.bemerkung??null,l.ist_psm!=null?Number(l.ist_psm):1,l.ist_kupfer!=null?Number(l.ist_kupfer):0,l.sort_order!=null?Number(l.sort_order):0,l.created_at||a,l.updated_at||a]),r.step(),r.reset();r.finalize(),t.exec("COMMIT"),i.kulturMittel=s.length}catch(r){throw t.exec("ROLLBACK"),r}}return i}async function qe(){if(!t)throw new Error("Database not initialized");z();const e=[];return t.exec({sql:`SELECT mittel_name, kennr, MAX(wirkstoff) AS wirkstoff,
            (SELECT k2.aufwand_einheit FROM kultur_mittel k2
               WHERE k2.mittel_name = k.mittel_name
                 AND IFNULL(k2.kennr,'') = IFNULL(k.kennr,'')
                 AND k2.aufwand_einheit IS NOT NULL AND k2.aufwand_einheit <> ''
               GROUP BY k2.aufwand_einheit ORDER BY COUNT(*) DESC LIMIT 1) AS einheit
          FROM kultur_mittel k
          GROUP BY mittel_name, kennr
          ORDER BY mittel_name COLLATE NOCASE`,rowMode:"object",callback:a=>{e.push({name:a.mittel_name!=null?String(a.mittel_name):"",kennr:a.kennr??null,wirkstoff:a.wirkstoff??null,einheit:a.einheit??null})}}),{rows:e}}function J(e=t){e&&e.exec(`
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
  `)}function Ee(e){if(!e)return null;let a=[];try{a=e.geojson?JSON.parse(e.geojson):[]}catch{a=[]}return{id:String(e.id),name:e.name!=null?String(e.name):"",kultur:e.kultur??null,eppoCode:e.eppo_code??null,standortId:e.standort_id??null,color:e.color??null,latlngs:a,areaQm:e.area_qm!=null?Number(e.area_qm):0,bedW:e.bed_w!=null?Number(e.bed_w):null,pathW:e.path_w!=null?Number(e.path_w):null,rowSp:e.row_sp!=null?Number(e.row_sp):null,inRowSp:e.in_row_sp!=null?Number(e.in_row_sp):null,angle:e.angle!=null?Number(e.angle):0,beds:e.beds!=null?Number(e.beds):0,bedMeters:e.bed_meters!=null?Number(e.bed_meters):0,plants:e.plants!=null?Number(e.plants):0,bemerkung:e.bemerkung??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}}async function Pe(){if(!t)throw new Error("Database not initialized");J();const e=[];return t.exec({sql:"SELECT * FROM ackerflaechen ORDER BY datetime(created_at) ASC",rowMode:"object",callback:a=>e.push(Ee(a))}),{rows:e}}async function Be(e={}){if(!t)throw new Error("Database not initialized");J();const a=String(e.id||F()),i=String(e.name??"").trim()||"Fläche",n=new Date().toISOString(),s=JSON.stringify(Array.isArray(e.latlngs)?e.latlngs:[]),r=c=>c!=null&&Number.isFinite(Number(c))?Number(c):null,l=[i,e.kultur!=null?String(e.kultur):null,e.eppoCode!=null?String(e.eppoCode):null,e.standortId!=null?String(e.standortId):null,e.color!=null?String(e.color):null,s,r(e.areaQm),r(e.bedW),r(e.pathW),r(e.rowSp),r(e.inRowSp),r(e.angle),r(e.beds),r(e.bedMeters),r(e.plants),e.bemerkung!=null?String(e.bemerkung):null];if(t.selectValue("SELECT 1 FROM ackerflaechen WHERE id = ? LIMIT 1",[a])){const c=t.prepare("UPDATE ackerflaechen SET name=?, kultur=?, eppo_code=?, standort_id=?, color=?, geojson=?, area_qm=?, bed_w=?, path_w=?, row_sp=?, in_row_sp=?, angle=?, beds=?, bed_meters=?, plants=?, bemerkung=?, updated_at=? WHERE id=?");c.bind([...l,n,a]),c.step(),c.finalize()}else{const c=t.prepare("INSERT INTO ackerflaechen (name, kultur, eppo_code, standort_id, color, geojson, area_qm, bed_w, path_w, row_sp, in_row_sp, angle, beds, bed_meters, plants, bemerkung, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");c.bind([...l,n,n,a]),c.step(),c.finalize()}let o=null;return t.exec({sql:"SELECT * FROM ackerflaechen WHERE id = ? LIMIT 1",bind:[a],rowMode:"object",callback:c=>{o||(o=Ee(c))}}),o}async function He(e={}){if(!t)throw new Error("Database not initialized");J();const a=String(e.id??"").trim();if(!a)throw new Error("ID fehlt.");const i=t.prepare("DELETE FROM ackerflaechen WHERE id = ?");return i.bind([a]),i.step(),i.finalize(),{success:!0}}function P(e=t){e&&e.exec(`
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
  `)}function Q(e=t){e&&e.exec(`
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
  `)}const Ge=[["Tomate","Nachtschatten","anzucht",42,60,90,60,50,"frucht","#dc2626"],["Gurke","Kürbisgewächse","anzucht",28,55,70,100,50,"frucht","#16a34a"],["Zucchini","Kürbisgewächse","anzucht",21,50,70,100,90,"frucht","#65a30d"],["Paprika","Nachtschatten","anzucht",56,70,80,50,40,"frucht","#ea580c"],["Aubergine","Nachtschatten","anzucht",56,75,70,60,50,"frucht","#7c3aed"],["Kürbis (Hokkaido)","Kürbisgewächse","anzucht",21,100,30,150,100,"frucht","#ea580c"],["Butternut-Kürbis","Kürbisgewächse","anzucht",21,110,30,150,100,"frucht","#f59e0b"],["Zuckermais","Süßgräser","anzucht",21,80,14,60,30,"frucht","#facc15"],["Buschbohne","Hülsenfrüchte","direkt",0,60,30,40,8,"frucht","#16a34a"],["Stangenbohne","Hülsenfrüchte","direkt",0,70,50,80,15,"frucht","#15803d"],["Erbse","Hülsenfrüchte","direkt",0,65,25,40,5,"frucht","#65a30d"],["Kopfsalat","Korbblütler","anzucht",28,55,14,30,30,"blatt","#84cc16"],["Pflücksalat","Korbblütler","direkt",0,35,21,20,10,"blatt","#22c55e"],["Feldsalat","Baldriangewächse","direkt",0,60,21,10,5,"blatt","#15803d"],["Spinat","Gänsefußgewächse","direkt",0,45,21,20,5,"blatt","#166534"],["Mangold","Gänsefußgewächse","anzucht",28,55,60,35,30,"blatt","#0d9488"],["Rucola","Kreuzblütler","direkt",0,35,21,15,5,"blatt","#4ade80"],["Endivie","Korbblütler","anzucht",35,70,21,35,30,"blatt","#84cc16"],["Radicchio","Korbblütler","anzucht",35,80,21,35,30,"blatt","#be123c"],["Rote Bete","Gänsefußgewächse","direkt",0,90,30,25,8,"wurzel","#be123c"],["Möhre","Doldenblütler","direkt",0,100,30,25,4,"wurzel","#f97316"],["Pastinake","Doldenblütler","direkt",0,120,40,30,8,"wurzel","#fbbf24"],["Knollensellerie","Doldenblütler","anzucht",56,120,30,40,35,"wurzel","#14b8a6"],["Fenchel","Doldenblütler","anzucht",35,70,21,35,30,"blatt","#a3e635"],["Petersilie","Doldenblütler","direkt",0,80,90,25,8,"blatt","#16a34a"],["Dill","Doldenblütler","direkt",0,50,30,20,5,"blatt","#65a30d"],["Zwiebel","Lauchgewächse","anzucht",49,110,21,25,10,"wurzel","#f59e0b"],["Lauch / Porree","Lauchgewächse","anzucht",56,120,60,35,12,"blatt","#4d7c0f"],["Knoblauch","Lauchgewächse","direkt",0,240,21,25,12,"wurzel","#d97706"],["Brokkoli","Kreuzblütler","anzucht",35,70,21,45,40,"bluete","#0891b2"],["Blumenkohl","Kreuzblütler","anzucht",35,75,14,50,45,"bluete","#0ea5e9"],["Weißkohl","Kreuzblütler","anzucht",35,100,30,50,45,"blatt","#22c55e"],["Rotkohl","Kreuzblütler","anzucht",35,110,30,50,45,"blatt","#9333ea"],["Wirsing","Kreuzblütler","anzucht",35,90,30,50,45,"blatt","#16a34a"],["Grünkohl","Kreuzblütler","anzucht",35,90,60,45,45,"blatt","#166534"],["Kohlrabi","Kreuzblütler","anzucht",28,55,21,30,25,"blatt","#8b5cf6"],["Radieschen","Kreuzblütler","direkt",0,28,14,12,4,"wurzel","#ef4444"],["Rettich","Kreuzblütler","direkt",0,60,21,20,8,"wurzel","#f43f5e"],["Kartoffel","Nachtschatten","direkt",0,100,30,70,33,"wurzel","#a16207"],["Schwarzwurzel","Korbblütler","direkt",0,180,40,30,6,"wurzel","#57534e"],["Basilikum","Lippenblütler","anzucht",28,50,60,25,20,"blatt","#22c55e"]];function _e(e=t){if(!e||(e.selectValue("SELECT COUNT(*) FROM kultur_stamm")||0)>0)return;const i=new Date().toISOString(),n=e.prepare("INSERT INTO kultur_stamm (id, name, familie, anbau_methode, anzucht_tage, kultur_tage, ernte_tage, reihen_abstand_cm, pflanz_abstand_cm, bio_typ, color, eppo_code, notes, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");try{Ge.forEach((s,r)=>{n.bind(["ks-"+String(r+1).padStart(3,"0"),s[0],s[1],s[2],s[3],s[4],s[5],s[6],s[7],s[8],s[9],null,null,i,i]),n.step(),n.reset()})}finally{n.finalize()}}function B(e=t){e&&e.exec(`
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
  `)}function he(e){return e?{id:String(e.id),flaecheTyp:e.flaeche_typ??null,flaecheId:e.flaeche_id!=null?String(e.flaeche_id):null,kultur:e.kultur??null,eppoCode:e.eppo_code??null,status:e.status??"geplant",pflanzDatum:e.pflanz_datum??null,ernteDatum:e.ernte_datum??null,ernteVon:e.ernte_von??null,ernteBis:e.ernte_bis??e.ernte_datum??null,color:e.color??null,notes:e.notes??null,aussaatDatum:e.aussaat_datum??null,kulturStammId:e.kultur_stamm_id??null,menge:e.menge!=null?Number(e.menge):null,einheit:e.einheit??null,satzGruppe:e.satz_gruppe??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}function pe(e){return e?{id:String(e.id),name:e.name??"",familie:e.familie??null,anbauMethode:e.anbau_methode??null,anzuchtTage:e.anzucht_tage!=null?Number(e.anzucht_tage):null,kulturTage:e.kultur_tage!=null?Number(e.kultur_tage):null,ernteTage:e.ernte_tage!=null?Number(e.ernte_tage):null,reihenAbstandCm:e.reihen_abstand_cm!=null?Number(e.reihen_abstand_cm):null,pflanzAbstandCm:e.pflanz_abstand_cm!=null?Number(e.pflanz_abstand_cm):null,bioTyp:e.bio_typ??null,color:e.color??null,eppoCode:e.eppo_code??null,notes:e.notes??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}function ge(e){return e?{id:String(e.id),flaecheTyp:e.flaeche_typ??null,flaecheId:e.flaeche_id!=null?String(e.flaeche_id):null,anbauId:e.anbau_id??null,art:e.art??"sonstiges",status:e.status??"geplant",planDatum:e.plan_datum??null,erledigtDatum:e.erledigt_datum??null,menge:e.menge!=null?Number(e.menge):null,einheit:e.einheit??null,mittel:e.mittel??null,historyId:e.history_id!=null?Number(e.history_id):null,notes:e.notes??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}async function We(e={}){if(!t)throw new Error("Database not initialized");P();const a=[],i=[];e.flaecheTyp&&(a.push("flaeche_typ = ?"),i.push(String(e.flaecheTyp))),e.flaecheId&&(a.push("flaeche_id = ?"),i.push(String(e.flaecheId))),e.status&&(a.push("status = ?"),i.push(String(e.status)));const n="SELECT * FROM anbau_kultur"+(a.length?" WHERE "+a.join(" AND "):"")+" ORDER BY COALESCE(pflanz_datum, created_at) ASC",s=[];return t.exec({sql:n,bind:i,rowMode:"object",callback:r=>s.push(he(r))}),{rows:s}}async function je(e={}){if(!t)throw new Error("Database not initialized");P();const a=String(e.id||F()),i=new Date().toISOString(),n=[String(e.flaecheTyp||""),String(e.flaecheId||""),e.kultur!=null?String(e.kultur):null,e.eppoCode!=null?String(e.eppoCode):null,String(e.status||"geplant"),e.pflanzDatum!=null?String(e.pflanzDatum):null,e.ernteDatum!=null?String(e.ernteDatum):null,e.ernteVon!=null?String(e.ernteVon):null,e.ernteBis!=null?String(e.ernteBis):null,e.color!=null?String(e.color):null,e.notes!=null?String(e.notes):null,e.aussaatDatum!=null?String(e.aussaatDatum):null,e.kulturStammId!=null?String(e.kulturStammId):null,e.menge!=null&&e.menge!==""?Number(e.menge):null,e.einheit!=null?String(e.einheit):null,e.satzGruppe!=null?String(e.satzGruppe):null];if(t.selectValue("SELECT 1 FROM anbau_kultur WHERE id = ? LIMIT 1",[a])){const l=t.prepare("UPDATE anbau_kultur SET flaeche_typ=?, flaeche_id=?, kultur=?, eppo_code=?, status=?, pflanz_datum=?, ernte_datum=?, ernte_von=?, ernte_bis=?, color=?, notes=?, aussaat_datum=?, kultur_stamm_id=?, menge=?, einheit=?, satz_gruppe=?, updated_at=? WHERE id=?");l.bind([...n,i,a]),l.step(),l.finalize()}else{const l=t.prepare("INSERT INTO anbau_kultur (flaeche_typ, flaeche_id, kultur, eppo_code, status, pflanz_datum, ernte_datum, ernte_von, ernte_bis, color, notes, aussaat_datum, kultur_stamm_id, menge, einheit, satz_gruppe, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");l.bind([...n,i,i,a]),l.step(),l.finalize()}let r=null;return t.exec({sql:"SELECT * FROM anbau_kultur WHERE id = ? LIMIT 1",bind:[a],rowMode:"object",callback:l=>{r||(r=he(l))}}),r}async function Ke(e={}){if(!t)throw new Error("Database not initialized");P(),B();const a=String(e.id??"").trim();if(!a)throw new Error("ID fehlt.");const i=t.prepare("UPDATE massnahme SET anbau_id = NULL WHERE anbau_id = ?");i.bind([a]),i.step(),i.finalize();const n=t.prepare("DELETE FROM anbau_kultur WHERE id = ?");return n.bind([a]),n.step(),n.finalize(),{success:!0}}async function Ve(){if(!t)throw new Error("Database not initialized");Q(),_e();const e=[];return t.exec({sql:"SELECT * FROM kultur_stamm ORDER BY name COLLATE NOCASE ASC",rowMode:"object",callback:a=>e.push(pe(a))}),{rows:e}}async function $e(e={}){if(!t)throw new Error("Database not initialized");Q();const a=String(e.id||F()),i=new Date().toISOString(),n=u=>u!=null&&u!==""&&Number.isFinite(Number(u))?Math.round(Number(u)):null,s=[String(e.name||"").trim(),e.familie!=null?String(e.familie):null,e.anbauMethode!=null?String(e.anbauMethode):null,n(e.anzuchtTage),n(e.kulturTage),n(e.ernteTage),n(e.reihenAbstandCm),n(e.pflanzAbstandCm),e.bioTyp!=null?String(e.bioTyp):null,e.color!=null?String(e.color):null,e.eppoCode!=null?String(e.eppoCode):null,e.notes!=null?String(e.notes):null];if(t.selectValue("SELECT 1 FROM kultur_stamm WHERE id = ? LIMIT 1",[a])){const u=t.prepare("UPDATE kultur_stamm SET name=?, familie=?, anbau_methode=?, anzucht_tage=?, kultur_tage=?, ernte_tage=?, reihen_abstand_cm=?, pflanz_abstand_cm=?, bio_typ=?, color=?, eppo_code=?, notes=?, updated_at=? WHERE id=?");u.bind([...s,i,a]),u.step(),u.finalize()}else{const u=t.prepare("INSERT INTO kultur_stamm (name, familie, anbau_methode, anzucht_tage, kultur_tage, ernte_tage, reihen_abstand_cm, pflanz_abstand_cm, bio_typ, color, eppo_code, notes, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");u.bind([...s,i,i,a]),u.step(),u.finalize()}let l=null;return t.exec({sql:"SELECT * FROM kultur_stamm WHERE id = ? LIMIT 1",bind:[a],rowMode:"object",callback:u=>{l||(l=pe(u))}}),l}async function Ye(e={}){if(!t)throw new Error("Database not initialized");Q();const a=String(e.id??"").trim();if(!a)throw new Error("ID fehlt.");const i=t.prepare("DELETE FROM kultur_stamm WHERE id = ?");return i.bind([a]),i.step(),i.finalize(),{success:!0}}async function Je(e={}){if(!t)throw new Error("Database not initialized");B();const a=[],i=[];e.flaecheTyp&&(a.push("flaeche_typ = ?"),i.push(String(e.flaecheTyp))),e.flaecheId&&(a.push("flaeche_id = ?"),i.push(String(e.flaecheId))),e.anbauId&&(a.push("anbau_id = ?"),i.push(String(e.anbauId))),e.art&&(a.push("art = ?"),i.push(String(e.art))),e.status&&(a.push("status = ?"),i.push(String(e.status))),e.from&&(a.push("COALESCE(plan_datum, erledigt_datum) >= ?"),i.push(String(e.from))),e.to&&(a.push("COALESCE(plan_datum, erledigt_datum) <= ?"),i.push(String(e.to)));const n="SELECT * FROM massnahme"+(a.length?" WHERE "+a.join(" AND "):"")+" ORDER BY COALESCE(plan_datum, erledigt_datum, created_at) ASC",s=[];return t.exec({sql:n,bind:i,rowMode:"object",callback:r=>s.push(ge(r))}),{rows:s}}async function Qe(e={}){if(!t)throw new Error("Database not initialized");B();const a=String(e.id||F()),i=new Date().toISOString(),n=u=>u!=null&&Number.isFinite(Number(u))?Number(u):null,s=[String(e.flaecheTyp||""),String(e.flaecheId||""),e.anbauId!=null?String(e.anbauId):null,String(e.art||"sonstiges"),String(e.status||"geplant"),e.planDatum!=null?String(e.planDatum):null,e.erledigtDatum!=null?String(e.erledigtDatum):null,n(e.menge),e.einheit!=null?String(e.einheit):null,e.mittel!=null?String(e.mittel):null,n(e.historyId),e.notes!=null?String(e.notes):null];if(t.selectValue("SELECT 1 FROM massnahme WHERE id = ? LIMIT 1",[a])){const u=t.prepare("UPDATE massnahme SET flaeche_typ=?, flaeche_id=?, anbau_id=?, art=?, status=?, plan_datum=?, erledigt_datum=?, menge=?, einheit=?, mittel=?, history_id=?, notes=?, updated_at=? WHERE id=?");u.bind([...s,i,a]),u.step(),u.finalize()}else{const u=t.prepare("INSERT INTO massnahme (flaeche_typ, flaeche_id, anbau_id, art, status, plan_datum, erledigt_datum, menge, einheit, mittel, history_id, notes, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");u.bind([...s,i,i,a]),u.step(),u.finalize()}let l=null;return t.exec({sql:"SELECT * FROM massnahme WHERE id = ? LIMIT 1",bind:[a],rowMode:"object",callback:u=>{l||(l=ge(u))}}),l}async function Ze(e={}){if(!t)throw new Error("Database not initialized");B();const a=String(e.id??"").trim();if(!a)throw new Error("ID fehlt.");const i=t.prepare("DELETE FROM massnahme WHERE id = ?");return i.bind([a]),i.step(),i.finalize(),{success:!0}}async function et(){if(!t)throw new Error("Database not initialized");B();const e=new Set;t.exec({sql:"SELECT DISTINCT history_id AS h FROM massnahme WHERE history_id IS NOT NULL",rowMode:"object",callback:u=>{u.h!=null&&e.add(Number(u.h))}});const a=new Set;try{t.exec({sql:"SELECT id FROM gps_points WHERE kind = 'gewaechshaus'",rowMode:"object",callback:u=>a.add(String(u.id))})}catch{}const i=new Map;try{t.exec({sql:"SELECT id, standort_id FROM ackerflaechen WHERE standort_id IS NOT NULL",rowMode:"object",callback:u=>{const o=String(u.standort_id);i.has(o)||i.set(o,[]),i.get(o).push(String(u.id))}})}catch{}const n=[];try{t.exec({sql:"SELECT id, date_iso, kultur, gps_point_id FROM history WHERE gps_point_id IS NOT NULL ORDER BY id ASC",rowMode:"object",callback:u=>n.push(u)})}catch{return{imported:0,skipped:0,total:0}}let s=0,r=0;const l=new Date().toISOString();for(const u of n){const o=Number(u.id);if(e.has(o))continue;const c=u.gps_point_id!=null?String(u.gps_point_id):"";let g=null,_=null;if(c&&a.has(c)?(g="haus",_=c):c&&i.has(c)&&i.get(c).length===1&&(g="acker",_=i.get(c)[0]),!g){r++;continue}const p=F(),b=t.prepare("INSERT INTO massnahme (flaeche_typ, flaeche_id, anbau_id, art, status, plan_datum, erledigt_datum, menge, einheit, mittel, history_id, notes, created_at, updated_at, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");b.bind([g,_,null,"chemisch_psm","erledigt",null,u.date_iso||null,null,null,null,o,u.kultur!=null?String(u.kultur):null,l,l,p]),b.step(),b.finalize(),e.add(o),s++}return{imported:s,skipped:r,total:n.length}}function G(e=t){e&&e.exec(`
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
  `)}function se(e=t){e&&e.exec(`
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
  `)}function C(e=t){e&&e.exec(`
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
  `)}function Te(e){return e?{id:String(e.id),kennr:e.kennr??null,mittelName:e.mittel_name!=null?String(e.mittel_name):"",wirkstoff:e.wirkstoff??null,typ:e.typ||"zugang",menge:e.menge!=null?Number(e.menge):0,einheit:e.einheit??null,datum:e.datum??null,charge:e.charge??null,ablauf:e.ablauf??null,lieferant:e.lieferant??null,preis:e.preis!=null?Number(e.preis):null,bemerkung:e.bemerkung??null,createdAt:e.created_at||null,updatedAt:e.updated_at||null}:null}async function tt(e={}){if(!t)throw new Error("Database not initialized");G();const a=e&&e.kennr!=null?String(e.kennr):null,i=[];return t.exec({sql:`SELECT * FROM lager_bewegungen ${a?"WHERE kennr = ?":""}
          ORDER BY datetime(COALESCE(datum, created_at)) DESC, created_at DESC`,bind:a?[a]:[],rowMode:"object",callback:n=>i.push(Te(n))}),{rows:i}}async function nt(e={}){if(!t)throw new Error("Database not initialized");G();const a=String(e.id||F()),i=String(e.mittelName??e.mittel_name??"").trim();if(!i)throw new Error("Mittelname ist erforderlich.");const n=Number(e.menge);if(!Number.isFinite(n))throw new Error("Menge ist ungültig.");const s=new Date().toISOString(),r={kennr:e.kennr!=null?String(e.kennr):null,wirkstoff:e.wirkstoff!=null?String(e.wirkstoff):null,typ:e.typ!=null?String(e.typ):"zugang",einheit:e.einheit!=null?String(e.einheit):null,datum:e.datum!=null?String(e.datum):s.slice(0,10),charge:e.charge!=null?String(e.charge):null,ablauf:e.ablauf!=null?String(e.ablauf):null,lieferant:e.lieferant!=null?String(e.lieferant):null,preis:e.preis!=null&&Number.isFinite(Number(e.preis))?Number(e.preis):null,bemerkung:e.bemerkung!=null?String(e.bemerkung):null};if(t.selectValue("SELECT 1 FROM lager_bewegungen WHERE id = ? LIMIT 1",[a])){const o=t.prepare("UPDATE lager_bewegungen SET kennr=?, mittel_name=?, wirkstoff=?, typ=?, menge=?, einheit=?, datum=?, charge=?, ablauf=?, lieferant=?, preis=?, bemerkung=?, updated_at=? WHERE id=?");o.bind([r.kennr,i,r.wirkstoff,r.typ,n,r.einheit,r.datum,r.charge,r.ablauf,r.lieferant,r.preis,r.bemerkung,s,a]),o.step(),o.finalize()}else{const o=t.prepare("INSERT INTO lager_bewegungen (id, kennr, mittel_name, wirkstoff, typ, menge, einheit, datum, charge, ablauf, lieferant, preis, bemerkung, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");o.bind([a,r.kennr,i,r.wirkstoff,r.typ,n,r.einheit,r.datum,r.charge,r.ablauf,r.lieferant,r.preis,r.bemerkung,s,s]),o.step(),o.finalize()}let u=null;return t.exec({sql:"SELECT * FROM lager_bewegungen WHERE id = ? LIMIT 1",bind:[a],rowMode:"object",callback:o=>{u||(u=Te(o))}}),u}async function at(e={}){if(!t)throw new Error("Database not initialized");G();const a=String(e.id??"").trim();if(!a)throw new Error("ID fehlt.");const i=t.prepare("DELETE FROM lager_bewegungen WHERE id = ?");return i.bind([a]),i.step(),i.finalize(),{success:!0}}async function it(){if(!t)throw new Error("Database not initialized");G();const e=new Map,a=(s,r)=>s&&String(s).trim()||`name:${String(r||"").toLowerCase().trim()}`,i=(s,r)=>{const l=a(s,r);return e.has(l)||e.set(l,{kennr:s||null,name:r||"",einheit:null,wirkstoff:null,zugang:0,verbraucht:0,bestand:0,zulEnde:null,naechsterAblauf:null,anwendungen:0}),e.get(l)};t.exec({sql:`SELECT kennr, mittel_name, einheit, wirkstoff,
                 SUM(menge) AS zugang, MIN(NULLIF(ablauf,'')) AS naechster_ablauf
          FROM lager_bewegungen GROUP BY kennr, mittel_name`,rowMode:"object",callback:s=>{const r=i(s.kennr,s.mittel_name);r.zugang+=Number(s.zugang)||0,s.einheit&&!r.einheit&&(r.einheit=s.einheit),s.wirkstoff&&!r.wirkstoff&&(r.wirkstoff=s.wirkstoff),s.naechster_ablauf&&(r.naechsterAblauf=s.naechster_ablauf)}}),t.exec({sql:`SELECT zulassungsnummer AS kennr, medium_name, medium_unit, wirkstoff,
                 SUM(calculated_total) AS verbraucht, COUNT(*) AS n
          FROM history_items GROUP BY zulassungsnummer, medium_name`,rowMode:"object",callback:s=>{const r=i(s.kennr,s.medium_name);r.verbraucht+=Number(s.verbraucht)||0,r.anwendungen+=Number(s.n)||0,s.medium_unit&&!r.einheit&&(r.einheit=s.medium_unit),s.wirkstoff&&!r.wirkstoff&&(r.wirkstoff=s.wirkstoff)}});const n=Array.from(e.values());for(const s of n)s.bestand=s.zugang-s.verbraucht;return n.sort((s,r)=>(r.verbraucht||0)-(s.verbraucht||0)),{rows:n}}function W(e=t){e&&e.exec(`
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
  `)}function j(e=t){e&&e.exec(`
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
  `)}function Z(e){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${e}_${Date.now()}_${Math.random().toString(16).slice(2)}`}async function st(e={}){if(!t)throw new Error("Database not initialized");W();const{favoritesOnly:a=!1,limit:i=100}=e,n=a?"WHERE is_favorite = 1":"",s=[];return t.exec({sql:`SELECT id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at
          FROM saved_eppo_codes
          ${n}
          ORDER BY is_favorite DESC, usage_count DESC, name ASC
          LIMIT ?`,bind:[i],rowMode:"object",callback:r=>s.push({id:r.id,code:r.code,name:r.name,language:r.language,dtcode:r.dtcode,usageCount:r.usage_count,isFavorite:!!r.is_favorite,createdAt:r.created_at,updatedAt:r.updated_at})}),{items:s}}async function rt(e={}){if(!t)throw new Error("Database not initialized");W();const a=String(e.code??"").trim(),i=String(e.name??"").trim();if(!a||!i)throw new Error("EPPO-Code und Name sind erforderlich.");const n=e.id||Z("eppo"),s=e.language||null,r=e.dtcode||null,l=e.isFavorite?1:0,u=new Date().toISOString(),o=t.selectValue("SELECT id FROM saved_eppo_codes WHERE code = ? LIMIT 1",[a]);if(o){const c=t.prepare(`
      UPDATE saved_eppo_codes 
      SET name = ?, language = ?, dtcode = ?, is_favorite = ?, updated_at = ?
      WHERE code = ?
    `);return c.bind([i,s,r,l,u,a]),c.step(),c.finalize(),{id:o,code:a,name:i,updated:!0}}else{const c=t.prepare(`
      INSERT INTO saved_eppo_codes (id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)
    `);return c.bind([n,a,i,s,r,l,u,u]),c.step(),c.finalize(),{id:n,code:a,name:i,created:!0}}}async function lt(e={}){if(!t)throw new Error("Database not initialized");W();const a=String(e.id??"").trim();if(!a)throw new Error("ID erforderlich.");const i=t.prepare("DELETE FROM saved_eppo_codes WHERE id = ?");return i.bind([a]),i.step(),i.finalize(),{success:!0}}async function ut(e={}){if(!t)throw new Error("Database not initialized");W();const a=String(e.code??"").trim(),i=String(e.name??"").trim();if(!a)return{success:!1};const n=new Date().toISOString();if(t.selectValue("SELECT id FROM saved_eppo_codes WHERE code = ? LIMIT 1",[a])){const r=t.prepare(`
      UPDATE saved_eppo_codes SET usage_count = usage_count + 1, updated_at = ? WHERE code = ?
    `);r.bind([n,a]),r.step(),r.finalize()}else if(i){const r=Z("eppo"),l=t.prepare(`
      INSERT INTO saved_eppo_codes (id, code, name, language, dtcode, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
    `);l.bind([r,a,i,e.language||null,e.dtcode||null,n,n]),l.step(),l.finalize()}return{success:!0}}async function ot(e={}){if(!t)throw new Error("Database not initialized");j();const{favoritesOnly:a=!1,limit:i=100}=e,n=a?"WHERE is_favorite = 1":"",s=[];return t.exec({sql:`SELECT id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at
          FROM saved_bbch_stages
          ${n}
          ORDER BY is_favorite DESC, usage_count DESC, code ASC
          LIMIT ?`,bind:[i],rowMode:"object",callback:r=>s.push({id:r.id,code:r.code,label:r.label,principalStage:r.principal_stage,secondaryStage:r.secondary_stage,usageCount:r.usage_count,isFavorite:!!r.is_favorite,createdAt:r.created_at,updatedAt:r.updated_at})}),{items:s}}async function ct(e={}){if(!t)throw new Error("Database not initialized");j();const a=String(e.code??"").trim(),i=String(e.label??"").trim();if(!a||!i)throw new Error("BBCH-Code und Bezeichnung sind erforderlich.");const n=e.id||Z("bbch"),s=e.principalStage!=null?Number(e.principalStage):null,r=e.secondaryStage!=null?Number(e.secondaryStage):null,l=e.isFavorite?1:0,u=new Date().toISOString(),o=t.selectValue("SELECT id FROM saved_bbch_stages WHERE code = ? LIMIT 1",[a]);if(o){const c=t.prepare(`
      UPDATE saved_bbch_stages 
      SET label = ?, principal_stage = ?, secondary_stage = ?, is_favorite = ?, updated_at = ?
      WHERE code = ?
    `);return c.bind([i,s,r,l,u,a]),c.step(),c.finalize(),{id:o,code:a,label:i,updated:!0}}else{const c=t.prepare(`
      INSERT INTO saved_bbch_stages (id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)
    `);return c.bind([n,a,i,s,r,l,u,u]),c.step(),c.finalize(),{id:n,code:a,label:i,created:!0}}}async function dt(e={}){if(!t)throw new Error("Database not initialized");j();const a=String(e.id??"").trim();if(!a)throw new Error("ID erforderlich.");const i=t.prepare("DELETE FROM saved_bbch_stages WHERE id = ?");return i.bind([a]),i.step(),i.finalize(),{success:!0}}async function mt(e={}){if(!t)throw new Error("Database not initialized");j();const a=String(e.code??"").trim(),i=String(e.label??"").trim();if(!a)return{success:!1};const n=new Date().toISOString();if(t.selectValue("SELECT id FROM saved_bbch_stages WHERE code = ? LIMIT 1",[a])){const r=t.prepare(`
      UPDATE saved_bbch_stages SET usage_count = usage_count + 1, updated_at = ? WHERE code = ?
    `);r.bind([n,a]),r.step(),r.finalize()}else if(i){const r=Z("bbch"),l=t.prepare(`
      INSERT INTO saved_bbch_stages (id, code, label, principal_stage, secondary_stage, usage_count, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
    `);l.bind([r,a,i,e.principalStage||null,e.secondaryStage||null,n,n]),l.step(),l.finalize()}return{success:!0}}async function Et(e={}){if(!t)throw new Error("Database not initialized");W();const a=e.limit||10,i=[];return t.exec({sql:`SELECT code, name, language, dtcode, usage_count, is_favorite
          FROM saved_eppo_codes
          WHERE usage_count > 0
          ORDER BY usage_count DESC, name ASC
          LIMIT ?`,bind:[a],rowMode:"object",callback:n=>i.push({code:n.code,name:n.name,language:n.language,dtcode:n.dtcode,usageCount:n.usage_count,isFavorite:!!n.is_favorite})}),{items:i}}async function _t(e={}){if(!t)throw new Error("Database not initialized");j();const a=e.limit||10,i=[];return t.exec({sql:`SELECT code, label, principal_stage, secondary_stage, usage_count, is_favorite
          FROM saved_bbch_stages
          WHERE usage_count > 0
          ORDER BY usage_count DESC, code ASC
          LIMIT ?`,bind:[a],rowMode:"object",callback:n=>i.push({code:n.code,label:n.label,principalStage:n.principal_stage,secondaryStage:n.secondary_stage,usageCount:n.usage_count,isFavorite:!!n.is_favorite})}),{items:i}}function x(e,a,i=t){if(!i||!e)return;const n=i.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)");n.bind([e,typeof a=="string"?a:JSON.stringify(a)]).step(),n.finalize()}function fe(e,a=t){if(!a||!e)return;const i=a.prepare("DELETE FROM meta WHERE key = ?");i.bind([e]).step(),i.finalize()}function U(e,a=t){return!a||!e?null:a.selectValue("SELECT value FROM meta WHERE key = ?",[e])??null}function be(e){if(!N)throw new Error("SQLite not initialized");const a=new N.oo1.DB(":memory:"),i=N.wasm.scopedAllocPush();try{const n=N.wasm.allocFromTypedArray(e),s=N.wasm.allocCString("main"),r=(N.capi.SQLITE_DESERIALIZE_FREEONCLOSE||0)|(N.capi.SQLITE_DESERIALIZE_RESIZEABLE||0),l=N.capi.sqlite3_deserialize(a.pointer,s,n,e.byteLength,e.byteLength,r);if(l!==N.capi.SQLITE_OK)throw a.close(),new Error(`sqlite3_deserialize failed: ${N.capi.sqlite3_js_rc_str(l)||l}`)}finally{N.wasm.scopedAllocPop(i)}return a}self.onmessage=async function(e){const{id:a,action:i,payload:n}=e.data;try{let s;switch(i){case"init":s=await ht(n);break;case"importSnapshot":s=await gt(n);break;case"exportSnapshot":s=await Tt();break;case"exportMobileUnshared":s=await ft();break;case"markMobileShared":s=await bt();break;case"deleteSharedHistory":s=await St();break;case"markFotosShared":s=await Vt();break;case"clearSharedFotos":s=await $t();break;case"upsertMedium":s=await Nt(n);break;case"deleteMedium":s=await Lt(n);break;case"listMediums":s=await At();break;case"listMediumsPaged":s=await It(n);break;case"listHistory":s=await kt(n);break;case"listHistoryPaged":s=await Ne(n);break;case"streamHistoryChunk":s=await Ct(n);break;case"exportHistoryRange":s=await Mt(n);break;case"getHistoryEntry":s=await Zt(n);break;case"appendHistoryEntry":s=await en(n);break;case"deleteHistoryEntry":s=await tn(n);break;case"deleteHistoryRange":s=await yt(n);break;case"vacuumDatabase":s=await Dt();break;case"setArchiveLogs":s=await zt(n);break;case"listArchiveLogs":s=await vt(n);break;case"insertArchiveLog":s=await xt(n);break;case"appendImportLog":s=await Xt(n);break;case"listImportLog":s=await wt(n);break;case"appendFoto":s=await Ft(n);break;case"listFotos":s=await Ut(n);break;case"getFotoData":s=await jt(n);break;case"exportFotos":s=await Kt();break;case"deleteFoto":s=await Yt(n);break;case"updateFoto":s=await Wt(n);break;case"setFotoThumb":s=await qt(n);break;case"getFotoCounts":s=await Pt();break;case"deleteFotosByIds":s=await Bt(n);break;case"bulkUpdateFotoKategorie":s=await Ht(n);break;case"exportFotosByIds":s=await Gt(n);break;case"clearFotos":s=await Jt();break;case"deleteArchiveLog":s=await Qt(n);break;case"exportDB":s=await nn();break;case"importDB":s=await an(n);break;case"importLookupEppo":s=await sn(n);break;case"importLookupBbch":s=await rn(n);break;case"searchEppoCodes":s=await ln(n);break;case"searchBbchStages":s=await cn(n);break;case"listLookupLanguages":s=on();break;case"getLookupStats":s=await dn();break;case"listGpsPoints":s=await Ce();break;case"listGpsPointsPaged":s=await Me(n);break;case"upsertGpsPoint":s=await ye(n);break;case"deleteGpsPoint":s=await De(n);break;case"setActiveGpsPointId":s=await ze(n);break;case"getActiveGpsPointId":s=await ve();break;case"listKulturen":s=await xe();break;case"listKulturMittel":s=await Xe(n);break;case"upsertKulturMittel":s=await we(n);break;case"deleteKulturMittel":s=await Fe(n);break;case"seedInitialData":s=await Ue(n);break;case"listLagerBewegungen":s=await tt(n);break;case"upsertLagerBewegung":s=await nt(n);break;case"deleteLagerBewegung":s=await at(n);break;case"getLagerUebersicht":s=await it();break;case"listMittelStammdaten":s=await qe();break;case"listAckerflaechen":s=await Pe();break;case"upsertAckerflaeche":s=await Be(n);break;case"deleteAckerflaeche":s=await He(n);break;case"listAnbau":s=await We(n);break;case"upsertAnbau":s=await je(n);break;case"deleteAnbau":s=await Ke(n);break;case"listKulturStamm":s=await Ve();break;case"upsertKulturStamm":s=await $e(n);break;case"deleteKulturStamm":s=await Ye(n);break;case"listMassnahmen":s=await Je(n);break;case"upsertMassnahme":s=await Qe(n);break;case"deleteMassnahme":s=await Ze(n);break;case"importPsmAsMassnahmen":s=await et();break;case"listSavedEppo":s=await st(n);break;case"upsertSavedEppo":s=await rt(n);break;case"deleteSavedEppo":s=await lt(n);break;case"incrementEppoUsage":s=await ut(n);break;case"listSavedBbch":s=await ot(n);break;case"upsertSavedBbch":s=await ct(n);break;case"deleteSavedBbch":s=await dt(n);break;case"incrementBbchUsage":s=await mt(n);break;case"getFrequentEppo":s=await Et(n);break;case"getFrequentBbch":s=await _t(n);break;default:throw new Error(`Unknown action: ${i}`)}self.postMessage({id:a,ok:!0,result:s})}catch(s){self.postMessage({id:a,ok:!1,error:s.message||String(s)})}};async function ht(e={}){if(K)return{success:!0,message:"Already initialized"};try{N=await(await import(ue+"sqlite3.mjs").then(n=>n.default))({print:console.log,printErr:console.error,locateFile:n=>ue+n});const i=e.mode||pt();return t=Se(i),V=i,re(),await le(),K=!0,{success:!0,mode:i,message:`Database initialized in ${i} mode`}}catch(a){throw console.error("Failed to initialize database:",a),new Error(`Database initialization failed: ${a.message}`)}}function pt(){return typeof N?.opfs<"u"?"opfs":"memory"}function Se(e="memory"){return e==="opfs"&&N?.opfs?new N.oo1.OpfsDb("/pflanzenschutz.sqlite"):new N.oo1.DB}function re(e=t){if(!e)throw new Error("Database not initialized");e.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA temp_store = MEMORY;
    PRAGMA cache_size = -20000;
  `)}async function le(){if(!t)throw new Error("Database not initialized");(t.selectValue("PRAGMA user_version")||0)===0&&t.exec(`
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
    `);let a=t.selectValue("PRAGMA user_version")||0;const i=!L(t,"mediums","zulassungsnummer");if(i||a<4){console.log("Migrating database to version 4..."),t.exec("BEGIN TRANSACTION");try{i&&Re(t),t.exec("PRAGMA user_version = 4"),t.exec("COMMIT")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 4 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,a<5){console.log("Migrating database to version 5..."),t.exec("BEGIN TRANSACTION");try{w(t),t.exec("PRAGMA user_version = 5"),t.exec("COMMIT")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 5 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!I(t,"gps_points")||a<6){console.log("Migrating database to version 6..."),t.exec("BEGIN TRANSACTION");try{v(t),t.exec("PRAGMA user_version = 6"),t.exec("COMMIT")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 6 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!I(t,"medium_profiles")||!I(t,"medium_profile_mediums")||a<7){console.log("Migrating database to version 7..."),t.exec("BEGIN TRANSACTION");try{oe(t),t.exec("PRAGMA user_version = 7"),t.exec("COMMIT")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 7 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!I(t,"archive_logs")||a<8){console.log("Migrating database to version 8..."),t.exec("BEGIN TRANSACTION");try{q(t);const d=U("archives",t);if(d)try{const T=JSON.parse(d),S=Array.isArray(T?.logs)?T.logs:[];S.length&&te(S,t)}catch(T){console.warn("Archiv-Logs konnten nicht migriert werden",T)}t.exec("PRAGMA user_version = 8"),t.exec("COMMIT")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 8 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!L(t,"mediums","wartezeit")||!L(t,"mediums","wirkstoff")||a<9){console.log("Migrating database to version 9 (QS columns)..."),t.exec("BEGIN TRANSACTION");try{$(t),t.exec("PRAGMA user_version = 9"),t.exec("COMMIT")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 9 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!L(t,"history","ersteller")||a<10){console.log("Migrating database to version 10 (normalized history)..."),t.exec("BEGIN TRANSACTION");try{const d=[{name:"ersteller",type:"TEXT"},{name:"standort",type:"TEXT"},{name:"kultur",type:"TEXT"},{name:"eppo_code",type:"TEXT"},{name:"bbch",type:"TEXT"},{name:"datum",type:"TEXT"},{name:"date_iso",type:"TEXT"},{name:"uhrzeit",type:"TEXT"},{name:"usage_type",type:"TEXT"},{name:"area_ha",type:"REAL"},{name:"area_ar",type:"REAL"},{name:"area_sqm",type:"REAL"},{name:"water_volume",type:"REAL"},{name:"invekos",type:"TEXT"},{name:"gps",type:"TEXT"},{name:"gps_latitude",type:"REAL"},{name:"gps_longitude",type:"REAL"},{name:"gps_point_id",type:"TEXT"},{name:"qs_maschine",type:"TEXT"},{name:"qs_schaderreger",type:"TEXT"},{name:"qs_verantwortlicher",type:"TEXT"},{name:"qs_wetter",type:"TEXT"},{name:"qs_behandlungsart",type:"TEXT"}];for(const E of d)L(t,"history",E.name)||t.exec(`ALTER TABLE history ADD COLUMN ${E.name} ${E.type}`);const T=[{name:"medium_name",type:"TEXT"},{name:"medium_unit",type:"TEXT"},{name:"method_id",type:"TEXT"},{name:"method_label",type:"TEXT"},{name:"medium_value",type:"REAL"},{name:"calculated_total",type:"REAL"},{name:"zulassungsnummer",type:"TEXT"},{name:"wartezeit",type:"INTEGER"},{name:"wirkstoff",type:"TEXT"},{name:"input_area_ha",type:"REAL"},{name:"input_area_ar",type:"REAL"},{name:"input_area_sqm",type:"REAL"},{name:"input_water_volume",type:"REAL"}];for(const E of T)L(t,"history_items",E.name)||t.exec(`ALTER TABLE history_items ADD COLUMN ${E.name} ${E.type}`);t.exec(`
        CREATE INDEX IF NOT EXISTS idx_history_date_iso ON history(date_iso);
        CREATE INDEX IF NOT EXISTS idx_history_eppo_code ON history(eppo_code);
        CREATE INDEX IF NOT EXISTS idx_history_kultur ON history(kultur);
        CREATE INDEX IF NOT EXISTS idx_history_standort ON history(standort);
        CREATE INDEX IF NOT EXISTS idx_history_items_zulassungsnummer ON history_items(zulassungsnummer);
        CREATE INDEX IF NOT EXISTS idx_history_items_wirkstoff ON history_items(wirkstoff);
      `);const S=[];if(t.exec({sql:"SELECT id, header_json FROM history WHERE header_json IS NOT NULL",rowMode:"object",callback:E=>S.push(E)}),S.length>0){console.log(`Migrating ${S.length} history entries to normalized format...`);const E=t.prepare(`
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
        `);for(const R of S)try{const h=JSON.parse(R.header_json||"{}"),D=h.gpsCoordinates||{};E.bind([h.ersteller||null,h.standort||null,h.kultur||null,h.eppoCode||null,h.bbch||null,h.datum||null,h.dateIso||null,h.uhrzeit||null,h.usageType||null,h.areaHa??null,h.areaAr??null,h.areaSqm??null,h.waterVolume??null,h.invekos||null,h.gps||null,D.latitude??null,D.longitude??null,h.gpsPointId||null,h.qsMaschine||null,h.qsSchaderreger||null,h.qsVerantwortlicher||null,h.qsWetter||null,h.qsBehandlungsart||null,R.id]).step(),E.reset()}catch(h){console.warn(`Could not migrate history entry ${R.id}:`,h)}E.finalize()}const m=[];if(t.exec({sql:"SELECT id, payload_json FROM history_items WHERE payload_json IS NOT NULL",rowMode:"object",callback:E=>m.push(E)}),m.length>0){console.log(`Migrating ${m.length} history items to normalized format...`);const E=t.prepare(`
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
        `);for(const R of m)try{const h=JSON.parse(R.payload_json||"{}"),D=h.inputs||{};E.bind([h.name||null,h.unit||null,h.methodId||null,h.methodLabel||null,h.value??null,h.total??null,h.zulassungsnummer||null,h.wartezeit??null,h.wirkstoff||null,D.areaHa??null,D.areaAr??null,D.areaSqm??null,D.waterVolume??null,R.id]).step(),E.reset()}catch(h){console.warn(`Could not migrate history item ${R.id}:`,h)}E.finalize()}t.exec("PRAGMA user_version = 10"),t.exec("COMMIT"),console.log("Database migrated to version 10 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 10 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!L(t,"history","company_name")||a<11){console.log("Migrating database to version 11 (company data in history)..."),t.exec("BEGIN TRANSACTION");try{const d=[{name:"company_name",type:"TEXT"},{name:"company_address",type:"TEXT"},{name:"company_headline",type:"TEXT"},{name:"company_email",type:"TEXT"}];for(const S of d)L(t,"history",S.name)||t.exec(`ALTER TABLE history ADD COLUMN ${S.name} ${S.type}`);const T=[];if(t.exec({sql:"SELECT id, header_json FROM history WHERE header_json IS NOT NULL AND company_name IS NULL",rowMode:"object",callback:S=>T.push(S)}),T.length>0){console.log(`Migrating ${T.length} history entries for company data...`);const S=t.prepare(`
          UPDATE history SET
            company_name = ?,
            company_address = ?,
            company_headline = ?,
            company_email = ?
          WHERE id = ?
        `);for(const m of T)try{const R=JSON.parse(m.header_json||"{}").company||{};S.bind([R.name||null,R.address||null,R.headline||null,R.contactEmail||null,m.id]).step(),S.reset()}catch(E){console.warn(`Could not migrate company data for history entry ${m.id}:`,E)}S.finalize()}t.exec("PRAGMA user_version = 11"),t.exec("COMMIT"),console.log("Database migrated to version 11 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 11 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!L(t,"gps_points","nutzflaeche_qm")||!L(t,"gps_points","kind")||a<12){console.log("Migrating database to version 12 (gps_points Nutzfläche/Typ)..."),t.exec("BEGIN TRANSACTION");try{v(t),L(t,"gps_points","nutzflaeche_qm")||t.exec("ALTER TABLE gps_points ADD COLUMN nutzflaeche_qm REAL"),L(t,"gps_points","kind")||t.exec("ALTER TABLE gps_points ADD COLUMN kind TEXT"),t.exec("PRAGMA user_version = 12"),t.exec("COMMIT"),console.log("Database migrated to version 12 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 12 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!I(t,"kultur_mittel")||a<13){console.log("Migrating database to version 13 (kultur_mittel)..."),t.exec("BEGIN TRANSACTION");try{z(t),t.exec("PRAGMA user_version = 13"),t.exec("COMMIT"),console.log("Database migrated to version 13 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 13 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!(I(t,"kultur_mittel")&&L(t,"kultur_mittel","eppo_code"))||a<14){console.log("Migrating database to version 14 (kultur_mittel EPPO/BBCH)..."),t.exec("BEGIN TRANSACTION");try{z(t),I(t,"kultur_mittel")&&!L(t,"kultur_mittel","eppo_code")&&t.exec("ALTER TABLE kultur_mittel ADD COLUMN eppo_code TEXT"),I(t,"kultur_mittel")&&!L(t,"kultur_mittel","bbch_default")&&t.exec("ALTER TABLE kultur_mittel ADD COLUMN bbch_default TEXT"),t.exec("PRAGMA user_version = 14"),t.exec("COMMIT"),console.log("Database migrated to version 14 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 14 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!(I(t,"kultur_mittel")&&L(t,"kultur_mittel","bbch"))||a<15){console.log("Migrating database to version 15 (kultur_mittel BBCH)..."),t.exec("BEGIN TRANSACTION");try{z(t),I(t,"kultur_mittel")&&!L(t,"kultur_mittel","bbch")&&t.exec("ALTER TABLE kultur_mittel ADD COLUMN bbch TEXT"),t.exec("PRAGMA user_version = 15"),t.exec("COMMIT"),console.log("Database migrated to version 15 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 15 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!I(t,"lager_bewegungen")||a<16){console.log("Migrating database to version 16 (lager_bewegungen)..."),t.exec("BEGIN TRANSACTION");try{G(t),t.exec("PRAGMA user_version = 16"),t.exec("COMMIT"),console.log("Database migrated to version 16 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 16 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!I(t,"ackerflaechen")||a<17){console.log("Migrating database to version 17 (ackerflaechen)..."),t.exec("BEGIN TRANSACTION");try{J(t),t.exec("PRAGMA user_version = 17"),t.exec("COMMIT"),console.log("Database migrated to version 17 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 17 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!I(t,"import_log")||a<18){console.log("Migrating database to version 18 (import_log)..."),t.exec("BEGIN TRANSACTION");try{se(t),t.exec("PRAGMA user_version = 18"),t.exec("COMMIT"),console.log("Database migrated to version 18 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 18 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!I(t,"fotos")||a<19){console.log("Migrating database to version 19 (fotos)..."),t.exec("BEGIN TRANSACTION");try{C(t),t.exec("PRAGMA user_version = 19"),t.exec("COMMIT"),console.log("Database migrated to version 19 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 19 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,a<20){console.log("Migrating database to version 20 (foto notiz)..."),t.exec("BEGIN TRANSACTION");try{C(t),L(t,"fotos","notiz")||t.exec("ALTER TABLE fotos ADD COLUMN notiz TEXT"),t.exec("PRAGMA user_version = 20"),t.exec("COMMIT"),console.log("Database migrated to version 20 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 20 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,a<21){console.log("Migrating database to version 21 (foto thumbnail)..."),t.exec("BEGIN TRANSACTION");try{C(t),L(t,"fotos","data_thumb")||t.exec("ALTER TABLE fotos ADD COLUMN data_thumb TEXT"),t.exec("CREATE INDEX IF NOT EXISTS idx_fotos_kategorie ON fotos(kategorie, created_at DESC)"),t.exec("PRAGMA user_version = 21"),t.exec("COMMIT"),console.log("Database migrated to version 21 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 21 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!I(t,"anbau_kultur")||!I(t,"massnahme")||a<22){console.log("Migrating database to version 22 (Kulturführung)..."),t.exec("BEGIN TRANSACTION");try{P(t),B(t),t.exec("PRAGMA user_version = 22"),t.exec("COMMIT"),console.log("Database migrated to version 22 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 22 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,a<23){console.log("Migrating database to version 23 (Ernte-Zeitraum)..."),t.exec("BEGIN TRANSACTION");try{P(t),L(t,"anbau_kultur","ernte_von")||t.exec("ALTER TABLE anbau_kultur ADD COLUMN ernte_von TEXT"),L(t,"anbau_kultur","ernte_bis")||t.exec("ALTER TABLE anbau_kultur ADD COLUMN ernte_bis TEXT"),t.exec("UPDATE anbau_kultur SET ernte_bis = ernte_datum WHERE ernte_bis IS NULL AND ernte_datum IS NOT NULL"),t.exec("PRAGMA user_version = 23"),t.exec("COMMIT"),console.log("Database migrated to version 23 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 23 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,a<24){console.log("Migrating database to version 24 (client_uuid dedup)..."),t.exec("BEGIN TRANSACTION");try{I(t,"history")&&(L(t,"history","client_uuid")||t.exec("ALTER TABLE history ADD COLUMN client_uuid TEXT"),t.exec("UPDATE history SET client_uuid = json_extract(header_json, '$.clientUuid') WHERE client_uuid IS NULL AND header_json IS NOT NULL"),t.exec("DELETE FROM history WHERE client_uuid IS NOT NULL AND id NOT IN (SELECT MIN(id) FROM history WHERE client_uuid IS NOT NULL GROUP BY client_uuid)"),I(t,"history_items")&&t.exec("DELETE FROM history_items WHERE history_id NOT IN (SELECT id FROM history)"),t.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_history_client_uuid ON history(client_uuid) WHERE client_uuid IS NOT NULL")),I(t,"fotos")&&(t.exec("DELETE FROM fotos WHERE client_uuid IS NOT NULL AND id NOT IN (SELECT MIN(id) FROM fotos WHERE client_uuid IS NOT NULL GROUP BY client_uuid)"),t.exec("DROP INDEX IF EXISTS idx_fotos_uuid"),t.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_fotos_uuid ON fotos(client_uuid) WHERE client_uuid IS NOT NULL")),t.exec("PRAGMA user_version = 24"),t.exec("COMMIT"),console.log("Database migrated to version 24 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 24 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,!I(t,"kultur_stamm")||a<25){console.log("Migrating database to version 25 (Satzplanung / Kultur-Stammdaten)..."),t.exec("BEGIN TRANSACTION");try{P(t),[["aussaat_datum","TEXT"],["kultur_stamm_id","TEXT"],["menge","REAL"],["einheit","TEXT"],["satz_gruppe","TEXT"]].forEach(([T,S])=>{L(t,"anbau_kultur",T)||t.exec(`ALTER TABLE anbau_kultur ADD COLUMN ${T} ${S}`)}),t.exec("CREATE INDEX IF NOT EXISTS idx_anbau_satz ON anbau_kultur(satz_gruppe)"),Q(t),t.exec("PRAGMA user_version = 25"),t.exec("COMMIT"),console.log("Database migrated to version 25 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 25 failed:",d),d}try{_e(t)}catch(d){console.warn("kultur_stamm Seed übersprungen (nicht fatal):",d)}}if(a=t.selectValue("PRAGMA user_version")||0,a<26){t.exec("BEGIN TRANSACTION");try{L(t,"history","mobile_shared_at")||t.exec("ALTER TABLE history ADD COLUMN mobile_shared_at TEXT"),t.exec("PRAGMA user_version = 26"),t.exec("COMMIT"),console.log("Database migrated to version 26 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 26 failed:",d),d}}if(a=t.selectValue("PRAGMA user_version")||0,a<27){t.exec("BEGIN TRANSACTION");try{L(t,"fotos","mobile_shared_at")||t.exec("ALTER TABLE fotos ADD COLUMN mobile_shared_at TEXT"),t.exec("PRAGMA user_version = 27"),t.exec("COMMIT"),console.log("Database migrated to version 27 successfully")}catch(d){throw t.exec("ROLLBACK"),console.error("Migration to version 27 failed:",d),d}}}async function gt(e){if(!t)throw new Error("Database not initialized");t.exec("BEGIN TRANSACTION");try{if(Array.isArray(e.history)&&t.exec(`
        DELETE FROM history_items;
        DELETE FROM history;
      `),t.exec(`
      DELETE FROM mediums;
      DELETE FROM measurement_methods;
      DELETE FROM meta WHERE key IN ('version','company','defaults','fieldLabels','measurementMethods','archives');
    `),e.meta){const i={version:e.meta.version||1,company:JSON.stringify(e.meta.company||{}),defaults:JSON.stringify(e.meta.defaults||{}),fieldLabels:JSON.stringify(e.meta.fieldLabels||{}),measurementMethods:JSON.stringify(e.meta.measurementMethods||[]),archives:JSON.stringify(e.archives||{logs:[]})},n=t.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)");for(const[l,u]of Object.entries(i))n.bind([l,typeof u=="string"?u:JSON.stringify(u)]).step(),n.reset();if(n.finalize(),e.meta.measurementMethods&&Array.isArray(e.meta.measurementMethods)){const l=t.prepare("INSERT OR REPLACE INTO measurement_methods (id, label, type, unit, requires, config) VALUES (?, ?, ?, ?, ?, ?)");for(const u of e.meta.measurementMethods)l.bind([u.id,u.label,u.type,u.unit,JSON.stringify(u.requires||[]),JSON.stringify(u.config||{})]).step(),l.reset();l.finalize()}const s=Array.isArray(e.archives?.logs)?e.archives.logs:[],r=te(s,t);x("archives",JSON.stringify({logs:r}),t)}if(e.mediums&&Array.isArray(e.mediums)){$(t);const i=t.prepare("INSERT OR REPLACE INTO mediums (id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");for(const n of e.mediums){const s=n.zulassungsnummer??n.approvalNumber??n.zulassung??null;i.bind([n.id,n.name,n.unit,n.methodId||n.method_id,n.value,s,n.wartezeit??null,n.wirkstoff??null]).step(),i.reset()}i.finalize()}if(e.mediumProfiles&&Array.isArray(e.mediumProfiles)){oe(),t.exec("DELETE FROM medium_profile_mediums"),t.exec("DELETE FROM medium_profiles");const i=t.prepare("INSERT INTO medium_profiles (id, name, created_at, updated_at) VALUES (?, ?, ?, ?)"),n=t.prepare("INSERT INTO medium_profile_mediums (profile_id, medium_id, sort_order) VALUES (?, ?, ?)");for(const s of e.mediumProfiles){const r=String(s.id||"").trim();if(!r)continue;const l=String(s.name||"Profil ohne Namen"),u=s.createdAt||s.created_at||new Date().toISOString(),o=s.updatedAt||s.updated_at||u;i.bind([r,l,u,o]).step(),i.reset(),(Array.isArray(s.mediumIds)?s.mediumIds:[]).forEach((g,_)=>{g&&(n.bind([r,String(g),_]).step(),n.reset())})}i.finalize(),n.finalize()}if(e.history&&Array.isArray(e.history)){const i=t.prepare(`
        INSERT OR IGNORE INTO history (
          created_at, client_uuid, header_json,
          ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
          uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
          invekos, gps, gps_latitude, gps_longitude, gps_point_id,
          qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `),n=t.prepare(`
        INSERT INTO history_items (
          history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);for(const s of e.history){const r=s.header?{...s.header}:{...s};delete r.items;const l=s.savedAt||r.savedAt||r.createdAt||new Date().toISOString();r.createdAt||(r.createdAt=l);const u=r.gpsCoordinates||{};i.bind([l,r.clientUuid||null,JSON.stringify(r),r.ersteller||null,r.standort||null,r.kultur||null,r.eppoCode||null,r.bbch||null,r.datum||null,r.dateIso||null,r.uhrzeit||null,r.usageType||null,r.areaHa??null,r.areaAr??null,r.areaSqm??null,r.waterVolume??null,r.invekos||null,r.gps||null,u.latitude??null,u.longitude??null,r.gpsPointId||null,r.qsMaschine||null,r.qsSchaderreger||null,r.qsVerantwortlicher||null,r.qsWetter||null,r.qsBehandlungsart||null]).step();const o=(t.selectValue("SELECT changes()")||0)>0,c=o?t.selectValue("SELECT last_insert_rowid()"):null;if(i.reset(),!o)continue;const g=s.items&&Array.isArray(s.items)?s.items:[];for(const _ of g){const p=_.inputs||{};n.bind([c,_.mediumId||_.medium_id||_.id||"",JSON.stringify(_),_.name||null,_.unit||null,_.methodId||null,_.methodLabel||null,_.value??null,_.total??null,_.zulassungsnummer||null,_.wartezeit??null,_.wirkstoff||null,p.areaHa??null,p.areaAr??null,p.areaSqm??null,p.waterVolume??null]).step(),n.reset()}}i.finalize(),n.finalize()}return t.exec("COMMIT"),{success:!0,message:"Snapshot imported successfully"}}catch(a){throw t.exec("ROLLBACK"),a}}async function Tt(){if(!t)throw new Error("Database not initialized");const e={meta:{version:1,company:{},defaults:{},fieldLabels:{},measurementMethods:[]},mediums:[],mediumProfiles:[],history:[],archives:{logs:[]}};t.exec({sql:"SELECT key, value FROM meta",callback:s=>{const r=s[0],l=s[1];if(!(r&&r.startsWith("lookup:")))try{const u=JSON.parse(l);r==="company"?e.meta.company=u:r==="defaults"?e.meta.defaults=u:r==="fieldLabels"?e.meta.fieldLabels=u:r==="version"?e.meta.version=u:r==="archives"&&(e.archives=u)}catch{}}}),t.exec({sql:"SELECT id, label, type, unit, requires, config FROM measurement_methods",callback:s=>{e.meta.measurementMethods.push({id:s[0],label:s[1],type:s[2],unit:s[3],requires:JSON.parse(s[4]||"[]"),config:JSON.parse(s[5]||"{}")})}}),t.exec({sql:"SELECT id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff FROM mediums",callback:s=>{e.mediums.push({id:s[0],name:s[1],unit:s[2],methodId:s[3],value:s[4],zulassungsnummer:s[5]||null,wartezeit:s[6]||null,wirkstoff:s[7]||null})}});const a=new Map;t.exec({sql:`SELECT id, name, created_at, updated_at
          FROM medium_profiles
          ORDER BY name COLLATE NOCASE`,rowMode:"object",callback:s=>{a.set(s.id,{id:String(s.id),name:String(s.name??""),createdAt:s.created_at||new Date().toISOString(),updatedAt:s.updated_at||new Date().toISOString(),mediumIds:[]})}}),a.size&&t.exec({sql:`SELECT profile_id, medium_id, sort_order
            FROM medium_profile_mediums
            ORDER BY profile_id, sort_order, rowid`,rowMode:"object",callback:s=>{const r=a.get(s.profile_id);r&&r.mediumIds.push(String(s.medium_id))}}),e.mediumProfiles=Array.from(a.values());const i=ne();i.length&&(e.archives={logs:i.map(s=>Y(s))});const n=new Map;return t.exec({sql:`SELECT id, created_at, header_json, client_uuid,
            ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
            uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
            invekos, gps, gps_latitude, gps_longitude, gps_point_id,
            qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart
          FROM history ORDER BY created_at DESC`,rowMode:"object",callback:s=>{let r={};try{r=JSON.parse(s.header_json||"{}")}catch(l){console.warn("Could not parse header_json",l)}n.set(s.id,{header:{createdAt:s.created_at,ersteller:s.ersteller??r.ersteller,standort:s.standort??r.standort,kultur:s.kultur??r.kultur,eppoCode:s.eppo_code??r.eppoCode,bbch:s.bbch??r.bbch,datum:s.datum??r.datum,dateIso:s.date_iso??r.dateIso,uhrzeit:s.uhrzeit??r.uhrzeit,usageType:s.usage_type??r.usageType,areaHa:s.area_ha??r.areaHa,areaAr:s.area_ar??r.areaAr,areaSqm:s.area_sqm??r.areaSqm,waterVolume:s.water_volume??r.waterVolume,invekos:s.invekos??r.invekos,gps:s.gps??r.gps,gpsCoordinates:s.gps_latitude!=null&&s.gps_longitude!=null?{latitude:s.gps_latitude,longitude:s.gps_longitude}:r.gpsCoordinates||null,gpsPointId:s.gps_point_id??r.gpsPointId,qsMaschine:s.qs_maschine??r.qsMaschine,qsSchaderreger:s.qs_schaderreger??r.qsSchaderreger,qsVerantwortlicher:s.qs_verantwortlicher??r.qsVerantwortlicher,qsWetter:s.qs_wetter??r.qsWetter,qsBehandlungsart:s.qs_behandlungsart??r.qsBehandlungsart,savedAt:r.savedAt||s.created_at,clientUuid:s.client_uuid??r.clientUuid??null},items:[]})}}),t.exec({sql:`SELECT history_id, medium_id, payload_json,
            medium_name, medium_unit, method_id, method_label, medium_value,
            calculated_total, zulassungsnummer, wartezeit, wirkstoff,
            input_area_ha, input_area_ar, input_area_sqm, input_water_volume
          FROM history_items`,rowMode:"object",callback:s=>{const r=s.history_id;if(n.has(r)){let l={};try{l=JSON.parse(s.payload_json||"{}")}catch(u){console.warn("Could not parse payload_json",u)}n.get(r).items.push({id:s.medium_id??l.id,mediumId:s.medium_id??l.mediumId,name:s.medium_name??l.name,unit:s.medium_unit??l.unit,methodId:s.method_id??l.methodId,methodLabel:s.method_label??l.methodLabel,value:s.medium_value??l.value,total:s.calculated_total??l.total,zulassungsnummer:s.zulassungsnummer??l.zulassungsnummer,wartezeit:s.wartezeit??l.wartezeit,wirkstoff:s.wirkstoff??l.wirkstoff,inputs:{areaHa:s.input_area_ha??l.inputs?.areaHa,areaAr:s.input_area_ar??l.inputs?.areaAr,areaSqm:s.input_area_sqm??l.inputs?.areaSqm,waterVolume:s.input_water_volume??l.inputs?.waterVolume}})}}}),e.history=Array.from(n.values()).map(s=>({...s.header,items:s.items})),e}async function ft(){if(!t)throw new Error("Database not initialized");const e={meta:{version:1,company:{},defaults:{},fieldLabels:{},measurementMethods:[]},mediums:[],mediumProfiles:[],history:[],archives:{logs:[]}};t.exec({sql:"SELECT key, value FROM meta",callback:i=>{const n=i[0],s=i[1];if(!(n&&n.startsWith("lookup:")))try{const r=JSON.parse(s);n==="company"?e.meta.company=r:n==="defaults"?e.meta.defaults=r:n==="fieldLabels"?e.meta.fieldLabels=r:n==="version"?e.meta.version=r:n==="archives"&&(e.archives=r)}catch{}}}),t.exec({sql:"SELECT id, label, type, unit, requires, config FROM measurement_methods",callback:i=>{e.meta.measurementMethods.push({id:i[0],label:i[1],type:i[2],unit:i[3],requires:JSON.parse(i[4]||"[]"),config:JSON.parse(i[5]||"{}")})}});const a=new Map;if(t.exec({sql:`SELECT id, created_at, header_json, client_uuid,
            ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
            uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
            invekos, gps, gps_latitude, gps_longitude, gps_point_id,
            qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart
          FROM history WHERE mobile_shared_at IS NULL ORDER BY created_at DESC`,rowMode:"object",callback:i=>{let n={};try{n=JSON.parse(i.header_json||"{}")}catch{}a.set(i.id,{header:{createdAt:i.created_at,ersteller:i.ersteller??n.ersteller,standort:i.standort??n.standort,kultur:i.kultur??n.kultur,eppoCode:i.eppo_code??n.eppoCode,bbch:i.bbch??n.bbch,datum:i.datum??n.datum,dateIso:i.date_iso??n.dateIso,uhrzeit:i.uhrzeit??n.uhrzeit,usageType:i.usage_type??n.usageType,areaHa:i.area_ha??n.areaHa,areaAr:i.area_ar??n.areaAr,areaSqm:i.area_sqm??n.areaSqm,waterVolume:i.water_volume??n.waterVolume,invekos:i.invekos??n.invekos,gps:i.gps??n.gps,gpsCoordinates:i.gps_latitude!=null&&i.gps_longitude!=null?{latitude:i.gps_latitude,longitude:i.gps_longitude}:n.gpsCoordinates||null,gpsPointId:i.gps_point_id??n.gpsPointId,qsMaschine:i.qs_maschine??n.qsMaschine,qsSchaderreger:i.qs_schaderreger??n.qsSchaderreger,qsVerantwortlicher:i.qs_verantwortlicher??n.qsVerantwortlicher,qsWetter:i.qs_wetter??n.qsWetter,qsBehandlungsart:i.qs_behandlungsart??n.qsBehandlungsart,savedAt:n.savedAt||i.created_at,clientUuid:i.client_uuid??n.clientUuid??null},items:[]})}}),t.exec({sql:`SELECT history_id, medium_id, payload_json,
            medium_name, medium_unit, method_id, method_label, medium_value,
            calculated_total, zulassungsnummer, wartezeit, wirkstoff,
            input_area_ha, input_area_ar, input_area_sqm, input_water_volume
          FROM history_items`,rowMode:"object",callback:i=>{if(a.has(i.history_id)){let n={};try{n=JSON.parse(i.payload_json||"{}")}catch{}a.get(i.history_id).items.push({id:i.medium_id??n.id,mediumId:i.medium_id??n.mediumId,name:i.medium_name??n.name,unit:i.medium_unit??n.unit,methodId:i.method_id??n.methodId,methodLabel:i.method_label??n.methodLabel,value:i.medium_value??n.value,total:i.calculated_total??n.total,zulassungsnummer:i.zulassungsnummer??n.zulassungsnummer,wartezeit:i.wartezeit??n.wartezeit,wirkstoff:i.wirkstoff??n.wirkstoff,inputs:{areaHa:i.input_area_ha??n.inputs?.areaHa,areaAr:i.input_area_ar??n.inputs?.areaAr,areaSqm:i.input_area_sqm??n.inputs?.areaSqm,waterVolume:i.input_water_volume??n.inputs?.waterVolume}})}}}),e.history=Array.from(a.values()).map(i=>({...i.header,items:i.items})),a.size>0){t.exec({sql:"SELECT id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff FROM mediums",callback:s=>{e.mediums.push({id:s[0],name:s[1],unit:s[2],methodId:s[3],value:s[4],zulassungsnummer:s[5]||null,wartezeit:s[6]||null,wirkstoff:s[7]||null})}});const i=new Map;t.exec({sql:"SELECT id, name, created_at, updated_at FROM medium_profiles ORDER BY name COLLATE NOCASE",rowMode:"object",callback:s=>{i.set(s.id,{id:String(s.id),name:String(s.name??""),createdAt:s.created_at||new Date().toISOString(),updatedAt:s.updated_at||new Date().toISOString(),mediumIds:[]})}}),i.size&&t.exec({sql:"SELECT profile_id, medium_id, sort_order FROM medium_profile_mediums ORDER BY profile_id, sort_order, rowid",rowMode:"object",callback:s=>{const r=i.get(s.profile_id);r&&r.mediumIds.push(String(s.medium_id))}}),e.mediumProfiles=Array.from(i.values());const n=ne();n.length&&(e.archives={logs:n.map(s=>Y(s))})}return e}async function bt(){if(!t)throw new Error("Database not initialized");const e=t.selectValue("SELECT COUNT(*) FROM history WHERE mobile_shared_at IS NULL")||0;return e>0&&t.exec("UPDATE history SET mobile_shared_at = datetime('now') WHERE mobile_shared_at IS NULL"),{marked:e}}async function St(){if(!t)throw new Error("Database not initialized");const e=t.selectValue("SELECT COUNT(*) FROM history WHERE mobile_shared_at IS NOT NULL")||0;return e>0&&(t.exec("DELETE FROM history_items WHERE history_id IN (SELECT id FROM history WHERE mobile_shared_at IS NOT NULL)"),t.exec("DELETE FROM history WHERE mobile_shared_at IS NOT NULL")),{deleted:e}}async function Nt(e){if(!t)throw new Error("Database not initialized");$();const a=t.prepare("INSERT OR REPLACE INTO mediums (id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");return a.bind([e.id,e.name,e.unit,e.methodId||e.method_id,e.value,e.zulassungsnummer??e.approvalNumber??e.zulassung??null,e.wartezeit??null,e.wirkstoff??null]).step(),a.finalize(),{success:!0,id:e.id}}async function Lt(e){if(!t)throw new Error("Database not initialized");const a=t.prepare("DELETE FROM mediums WHERE id = ?");return a.bind([e]).step(),a.finalize(),{success:!0}}async function At(){if(!t)throw new Error("Database not initialized");$();const e=[];return t.exec({sql:"SELECT id, name, unit, method_id, value, zulassungsnummer, wartezeit, wirkstoff FROM mediums",callback:a=>{e.push({id:a[0],name:a[1],unit:a[2],methodId:a[3],value:a[4],zulassungsnummer:a[5]||null,wartezeit:a[6]||null,wirkstoff:a[7]||null})}}),e}function Rt(e){return e?{id:e.id!=null?String(e.id):"",name:e.name!=null?String(e.name):"",unit:e.unit!=null?String(e.unit):"",methodId:e.method_id!=null?String(e.method_id):e.methodId!=null?String(e.methodId):null,value:Number(e.value??0),zulassungsnummer:e.zulassungsnummer!=null?String(e.zulassungsnummer):e.zulassung!=null?String(e.zulassung):null,wartezeit:e.wartezeit!=null?Number(e.wartezeit):null,wirkstoff:e.wirkstoff!=null?String(e.wirkstoff):null}:null}async function It(e={}){if(!t)throw new Error("Database not initialized");const{cursor:a=null,limit:i,pageSize:n,search:s,includeTotal:r=!1}=e||{},l=H(n??i,50,500),u=typeof s=="string"?s.trim():"",o=[],c=[];if(u){o.push("(LOWER(name) LIKE LOWER(?) OR LOWER(COALESCE(zulassungsnummer, '')) LIKE LOWER(?))");const m=`%${u}%`;c.push(m,m)}const g=a&&Number.isFinite(Number(a.rowid))?Number(a.rowid):null,_=[...o],p=[...c];g!==null&&(_.push("rowid > ?"),p.push(g));const b=_.length?`WHERE ${_.join(" AND ")}`:"",f=t.prepare(`SELECT rowid AS cursor_rowid, id, name, unit, method_id, value, zulassungsnummer
     FROM mediums
     ${b}
     ORDER BY rowid ASC
     LIMIT ?`);f.bind([...p,l+1]);const O=[];for(;f.step();)O.push(f.getAsObject());f.finalize();const A=O.length>l,k=A?O.slice(0,l):O,M=k.map(m=>Rt(m)).filter(m=>m!==null),d=k.length?k[k.length-1]:null,T=A&&d?{rowid:Number(d.cursor_rowid)||Number(d.rowid||0)}:null;let S;if(r){const m=o.length?`WHERE ${o.join(" AND ")}`:"",E=t.prepare(`SELECT COUNT(*) AS total FROM mediums ${m}`);if(c.length&&E.bind(c),E.step()){const R=E.getAsObject();S=Number(R?.total)||0}else S=0;E.finalize()}return{items:M,nextCursor:T,hasMore:A,pageSize:l,totalCount:S}}function ee(e={}){const a=`COALESCE(
    NULLIF(json_extract(header_json, '$.dateIso'), ''),
    CASE
      WHEN json_extract(header_json, '$.datum') GLOB '__.__.____'
      THEN substr(json_extract(header_json, '$.datum'), 7, 4) || '-' ||
           substr(json_extract(header_json, '$.datum'), 4, 2) || '-' ||
           substr(json_extract(header_json, '$.datum'), 1, 2)
      ELSE NULL
    END,
    created_at
  )`,i=[],n=[];if(e.startDate&&(i.push(`datetime(${a}) >= datetime(?)`),n.push(e.startDate)),e.endDate&&(i.push(`datetime(${a}) <= datetime(?)`),n.push(e.endDate)),[["creator","$.ersteller"],["location","$.standort"],["crop","$.kultur"],["usageType","$.usageType"],["eppoCode","$.eppoCode"],["invekos","$.invekos"],["bbch","$.bbch"]].forEach(([r,l])=>{const u=e?.[r];typeof u=="string"&&u.trim()&&(i.push(`LOWER(json_extract(header_json, '${l}')) LIKE LOWER(?)`),n.push(`%${u.trim()}%`))}),typeof e?.text=="string"&&e.text.trim()){const r=`%${e.text.trim()}%`,l=["$.ersteller","$.standort","$.kultur","$.usageType","$.eppoCode","$.invekos","$.bbch","$.gps"],u=l.map(o=>`LOWER(json_extract(header_json, '${o}')) LIKE LOWER(?)`);i.push(`(${u.join(" OR ")})`);for(let o=0;o<l.length;o+=1)n.push(r)}return{historyDateExpr:a,whereSql:i.length?`WHERE ${i.join(" AND ")}`:"",whereParams:n}}function Ot(e,a,i){if(!e||!e.createdAt)return null;const n=i==="ASC"?">":"<",s=String(e.createdAt),r=Number(e.id??e.historyId??e.rowid??0);return{clause:`(
      datetime(${a}) ${n} datetime(?)
      OR (datetime(${a}) = datetime(?) AND history.id ${n} ?)
    )`,params:[s,s,r]}}async function kt({page:e=1,pageSize:a=50,filters:i={},sortDirection:n="desc"}={}){if(!t)throw new Error("Database not initialized");const s=String(n).toLowerCase()==="asc"?"ASC":"DESC",r=H(a,50,500),l=Number.isFinite(Number(e))?Math.max(1,Number(e)):1,u=(l-1)*r,{historyDateExpr:o,whereSql:c,whereParams:g}=ee(i),_=[],p={sql:`
      SELECT id, created_at, header_json
      FROM history
      ${c}
      ORDER BY datetime(${o}) ${s}, rowid ${s}
      LIMIT ${r} OFFSET ${u}
    `,callback:f=>{const O=JSON.parse(f[2]||"{}");_.push({id:f[0],...O})}};g.length&&(p.bind=[...g]),t.exec(p);const b=t.selectValue(`SELECT COUNT(*) FROM history ${c}`,g.length?[...g]:void 0);return{items:_,page:l,pageSize:r,totalCount:Number(b)||0,totalPages:Math.ceil((Number(b)||0)/r)}}async function Ne({cursor:e=null,pageSize:a=50,filters:i={},sortDirection:n="desc",includeItems:s=!1,includeTotal:r=!1}={}){if(!t)throw new Error("Database not initialized");const l=String(n).toLowerCase()==="asc"?"ASC":"DESC",u=H(a,50,500),o=u+1,{historyDateExpr:c,whereSql:g,whereParams:_}=ee(i),p=Ot(e,c,l),b=[],f=[];g?.trim()&&(b.push(g.replace(/^\s*WHERE\s+/i,"")),_.length&&f.push(..._)),p&&(b.push(p.clause),f.push(...p.params));const O=b.length>0?`WHERE ${b.join(" AND ")}`:"",A=[];t.exec({sql:`
      SELECT
        history.id AS id,
        history.header_json AS header_json,
        history.client_uuid AS client_uuid,
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
    `,bind:[...f,o],rowMode:"object",callback:m=>A.push(m)});const k=A.length>u,M=k?A.slice(0,-1):A;let d=null;if(k&&M.length){const m=M[M.length-1];d={id:m.id,createdAt:m.cursor_created_at||m.created_at||new Date().toISOString()}}const T=M.map(m=>{let E={};try{E=JSON.parse(m.header_json||"{}")}catch(h){console.warn("Konnte History-Header nicht parsen",h)}const R={company:{name:m.company_name??E.company?.name??null,address:m.company_address??E.company?.address??null,headline:m.company_headline??E.company?.headline??null,contactEmail:m.company_email??E.company?.contactEmail??null},id:m.id,createdAt:m.created_at,ersteller:m.ersteller??E.ersteller,standort:m.standort??E.standort,kultur:m.kultur??E.kultur,eppoCode:m.eppo_code??E.eppoCode,bbch:m.bbch??E.bbch,datum:m.datum??E.datum,dateIso:m.date_iso??E.dateIso,uhrzeit:m.uhrzeit??E.uhrzeit,usageType:m.usage_type??E.usageType,areaHa:m.area_ha??E.areaHa,areaAr:m.area_ar??E.areaAr,areaSqm:m.area_sqm??E.areaSqm,waterVolume:m.water_volume??E.waterVolume,invekos:m.invekos??E.invekos,gps:m.gps??E.gps,gpsCoordinates:m.gps_latitude!=null&&m.gps_longitude!=null?{latitude:m.gps_latitude,longitude:m.gps_longitude}:E.gpsCoordinates||null,gpsPointId:m.gps_point_id??E.gpsPointId,qsMaschine:m.qs_maschine??E.qsMaschine,qsSchaderreger:m.qs_schaderreger??E.qsSchaderreger,qsVerantwortlicher:m.qs_verantwortlicher??E.qsVerantwortlicher,qsWetter:m.qs_wetter??E.qsWetter,qsBehandlungsart:m.qs_behandlungsart??E.qsBehandlungsart,savedAt:E.savedAt||m.created_at,clientUuid:m.client_uuid??E.clientUuid??null};return s&&(R.items=[]),R});if(s&&T.length){const m=T.map(h=>h.id),E=m.map(()=>"?").join(","),R=new Map;t.exec({sql:`
        SELECT history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        FROM history_items
        WHERE history_id IN (${E})
        ORDER BY history_id, rowid
      `,bind:m,rowMode:"object",callback:h=>{const D=h.history_id;R.has(D)||R.set(D,[]);let y={};try{y=JSON.parse(h.payload_json||"{}")}catch(mn){console.warn("Konnte History-Item nicht parsen",mn)}R.get(D).push({id:h.medium_id??y.id,mediumId:h.medium_id??y.mediumId,name:h.medium_name??y.name,unit:h.medium_unit??y.unit,methodId:h.method_id??y.methodId,methodLabel:h.method_label??y.methodLabel,value:h.medium_value??y.value,total:h.calculated_total??y.total,zulassungsnummer:h.zulassungsnummer??y.zulassungsnummer,wartezeit:h.wartezeit??y.wartezeit,wirkstoff:h.wirkstoff??y.wirkstoff,inputs:{areaHa:h.input_area_ha??y.inputs?.areaHa,areaAr:h.input_area_ar??y.inputs?.areaAr,areaSqm:h.input_area_sqm??y.inputs?.areaSqm,waterVolume:h.input_water_volume??y.inputs?.waterVolume}})}}),T.forEach(h=>{h.items=R.get(h.id)||[]})}let S;return r&&(S=Number(t.selectValue(`SELECT COUNT(*) FROM history ${g||""}`,_.length?[..._]:void 0))||0),{items:T,nextCursor:d,pageSize:u,sortDirection:l==="ASC"?"asc":"desc",hasMore:k,totalCount:S}}async function Ct(e={}){if(!t)throw new Error("Database not initialized");const{pageSize:a,chunkSize:i,includeItems:n=!0,includeTotal:s=!1,...r}=e||{},l=H(i??a??100,100,1e3);return await Ne({pageSize:l,includeItems:n,includeTotal:s,...r})}async function Mt({filters:e={},limit:a=5e3,sortDirection:i="asc"}={}){if(!t)throw new Error("Database not initialized");const n=Number.isFinite(Number(a))?Math.min(Math.max(Number(a),1),1e4):5e3,s=String(i).toLowerCase()==="desc"?"DESC":"ASC",{historyDateExpr:r,whereSql:l,whereParams:u}=ee(e),o=[],c=[],g=`
    SELECT history.id AS history_id,
           history.header_json AS header_json,
           COALESCE(json_group_array(history_items.payload_json), '[]') AS items_json
    FROM history
    LEFT JOIN history_items ON history_items.history_id = history.id
    ${l}
    GROUP BY history.id
    ORDER BY datetime(${r}) ${s}, history.rowid ${s}
    LIMIT ?
  `,_=u.length?[...u,n]:[n];return t.exec({sql:g,bind:_,rowMode:"object",callback:p=>{try{const b=JSON.parse(p.header_json||"{}"),f=JSON.parse(p.items_json||"[]"),O=Array.isArray(f)?f.map(A=>{if(A==null)return null;if(typeof A=="string")try{return JSON.parse(A)}catch(k){return console.warn("Konnte History-Item nicht parsen",k),null}return A}).filter(A=>A!==null):[];c.push(p.history_id),o.push({...b,items:O})}catch(b){console.warn("Archiv-Export konnte nicht gelesen werden",b)}}}),{entries:o,historyIds:c}}async function yt({filters:e={}}={}){if(!t)throw new Error("Database not initialized");const{whereSql:a,whereParams:i}=ee(e);t.exec("BEGIN TRANSACTION");try{const n={sql:`DELETE FROM history ${a}`};return i.length&&(n.bind=[...i]),t.exec(n),t.exec("COMMIT"),{success:!0}}catch(n){throw t.exec("ROLLBACK"),n}}async function Dt(){if(!t)throw new Error("Database not initialized");return t.exec("VACUUM"),{success:!0}}async function zt(e={}){if(!t)throw new Error("Database not initialized");const a=Array.isArray(e.logs)?e.logs:[];t.exec("BEGIN TRANSACTION");try{const i=te(a,t);return x("archives",JSON.stringify({logs:i}),t),t.exec("COMMIT"),{success:!0,count:i.length}}catch(i){throw t.exec("ROLLBACK"),i}}async function vt({limit:e=50,cursor:a=null,sortDirection:i="desc"}={}){if(!t)throw new Error("Database not initialized");q();const n=String(i).toLowerCase()==="asc"?"ASC":"DESC",s=Math.min(Math.max(Number(e)||1,1),500),r=s+1,l=(()=>{if(!a||!a.archivedAt)return null;const f=n==="ASC"?">":"<",O=f,A=String(a.archivedAt),k=a.id?String(a.id):"";return{clause:`(
        datetime(archived_at) ${f} datetime(?)
        OR (datetime(archived_at) = datetime(?) AND id ${O} ?)
      )`,params:[A,A,k]}})(),u=[],o=[];l&&(u.push(l.clause),o.push(...l.params));const c=u.length?`WHERE ${u.join(" AND ")}`:"",g=[];t.exec({sql:`SELECT id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json
          FROM archive_logs
          ${c}
          ORDER BY datetime(archived_at) ${n}, id ${n}
          LIMIT ?`,bind:[...o,r],rowMode:"object",callback:f=>g.push(f)});let _=null;const p=g.length>s;if(p){const f=g.pop();f&&(_={id:String(f.id),archivedAt:f.archived_at})}return{items:g.map(f=>ae(f)).filter(f=>!!f),nextCursor:_,hasMore:p,pageSize:s,sortDirection:n}}async function xt(e={}){if(!t)throw new Error("Database not initialized");q();const a=ce(e);if(!a)throw new Error("Ungültiger Archiv-Eintrag");const i=t.prepare(`INSERT OR REPLACE INTO archive_logs
      (id, archived_at, start_date, end_date, entry_count, file_name, storage_hint, note, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);return i.bind([a.id,a.archivedAt,a.startDate,a.endDate,a.entryCount,a.fileName,a.storageHint,a.note,JSON.stringify(a.metadata||e||{})]).step(),i.finalize(),de(),ae({id:a.id,archived_at:a.archivedAt,start_date:a.startDate,end_date:a.endDate,entry_count:a.entryCount,file_name:a.fileName,storage_hint:a.storageHint,note:a.note,metadata_json:JSON.stringify(a.metadata||e||{})})}async function Xt(e={}){if(!t)throw new Error("Database not initialized");se();const a=e.importedAt||new Date().toISOString(),i=t.prepare(`INSERT INTO import_log
      (imported_at, source, device, added, skipped, range_start, range_end, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);return i.bind([a,e.source!=null?String(e.source):null,e.device!=null?String(e.device):null,Number(e.added)||0,Number(e.skipped)||0,e.rangeStart!=null?String(e.rangeStart):null,e.rangeEnd!=null?String(e.rangeEnd):null,e.note!=null?String(e.note):null]).step(),i.finalize(),{id:t.selectValue("SELECT last_insert_rowid()"),importedAt:a}}async function wt(e={}){if(!t)throw new Error("Database not initialized");se();const a=Math.min(Math.max(Number(e?.limit)||50,1),500),i=[];return t.exec({sql:`SELECT id, imported_at, source, device, added, skipped, range_start, range_end, note
          FROM import_log
          ORDER BY datetime(imported_at) DESC, id DESC
          LIMIT ?`,bind:[a],rowMode:"object",callback:n=>{i.push({id:n.id,importedAt:n.imported_at,source:n.source,device:n.device,added:Number(n.added)||0,skipped:Number(n.skipped)||0,rangeStart:n.range_start,rangeEnd:n.range_end,note:n.note})}}),{items:i}}async function Ft(e={}){if(!t)throw new Error("Database not initialized");C();const a=e.clientUuid?String(e.clientUuid):null;if(a)try{const r=t.selectValue("SELECT id FROM fotos WHERE client_uuid = ? LIMIT 1",[a]);if(r!=null)return{id:r,duplicate:!0}}catch{}if(!e.data)throw new Error("Foto-Daten fehlen");const i=e.createdAt||new Date().toISOString(),n=t.prepare(`INSERT INTO fotos
      (client_uuid, created_at, entry_uuid, kategorie, titel, standort, kultur,
       gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data, data_thumb)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);try{n.bind([a,i,e.entryUuid!=null?String(e.entryUuid):null,e.kategorie!=null?String(e.kategorie):null,e.titel!=null?String(e.titel):null,e.standort!=null?String(e.standort):null,e.kultur!=null?String(e.kultur):null,e.gpsLatitude??null,e.gpsLongitude??null,e.notiz!=null?String(e.notiz):null,e.device!=null?String(e.device):null,e.mime!=null?String(e.mime):"image/jpeg",e.width??null,e.height??null,e.bytes??null,String(e.data),e.thumb!=null?String(e.thumb):null]).step(),n.finalize()}catch(r){try{n.finalize()}catch{}if(a&&/UNIQUE|constraint/i.test(String(r&&r.message))){const l=t.selectValue("SELECT id FROM fotos WHERE client_uuid = ? LIMIT 1",[a]);if(l!=null)return{id:l,duplicate:!0}}throw r}return{id:t.selectValue("SELECT last_insert_rowid()"),duplicate:!1}}async function Ut(e={}){if(!t)throw new Error("Database not initialized");C();const a=Math.min(Math.max(Number(e?.limit)||200,1),1e5),i=[];return t.exec({sql:`SELECT id, client_uuid, created_at, entry_uuid, kategorie, titel,
                 standort, kultur, gps_latitude, gps_longitude, notiz, device, mime,
                 width, height, bytes, data_thumb
          FROM fotos ORDER BY created_at DESC, id DESC LIMIT ?`,bind:[a],rowMode:"object",callback:n=>{i.push({id:n.id,clientUuid:n.client_uuid,createdAt:n.created_at,entryUuid:n.entry_uuid,kategorie:n.kategorie,titel:n.titel,standort:n.standort,kultur:n.kultur,gpsLatitude:n.gps_latitude,gpsLongitude:n.gps_longitude,notiz:n.notiz,device:n.device,mime:n.mime,width:n.width,height:n.height,bytes:n.bytes,thumb:n.data_thumb||null})}}),{items:i}}async function qt(e={}){if(!t)throw new Error("Database not initialized");C();const a=e&&e.id!=null?Number(e.id):null;if(a==null||!e.thumb)return{success:!1};const i=t.prepare("UPDATE fotos SET data_thumb = ? WHERE id = ?");return i.bind([String(e.thumb),a]).step(),i.finalize(),{success:!0}}async function Pt(){if(!t)throw new Error("Database not initialized");C();const e={};let a=0,i=0;return t.exec({sql:"SELECT kategorie, COUNT(*) AS n, COALESCE(SUM(bytes),0) AS b FROM fotos GROUP BY kategorie",rowMode:"object",callback:n=>{e[n.kategorie||""]=Number(n.n)||0,a+=Number(n.n)||0,i+=Number(n.b)||0}}),{counts:e,total:a,totalBytes:i}}async function Bt(e={}){if(!t)throw new Error("Database not initialized");C();const a=Array.isArray(e?.ids)?e.ids.map(n=>Number(n)).filter(n=>Number.isFinite(n)):[];if(!a.length)return{success:!0,deleted:0};const i=a.map(()=>"?").join(",");return t.exec({sql:`DELETE FROM fotos WHERE id IN (${i})`,bind:a}),{success:!0,deleted:a.length}}async function Ht(e={}){if(!t)throw new Error("Database not initialized");C();const a=Array.isArray(e?.ids)?e.ids.map(s=>Number(s)).filter(s=>Number.isFinite(s)):[],i=e?.kategorie!=null?String(e.kategorie):null;if(!a.length)return{success:!0,updated:0};const n=a.map(()=>"?").join(",");return t.exec({sql:`UPDATE fotos SET kategorie = ? WHERE id IN (${n})`,bind:[i,...a]}),{success:!0,updated:a.length}}async function Gt(e={}){if(!t)throw new Error("Database not initialized");C();const a=Array.isArray(e?.ids)?e.ids.map(s=>Number(s)).filter(s=>Number.isFinite(s)):[];if(!a.length)return{items:[]};const i=a.map(()=>"?").join(","),n=[];return t.exec({sql:`SELECT client_uuid, created_at, entry_uuid, kategorie, titel, standort,
                 kultur, gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data
          FROM fotos WHERE id IN (${i}) ORDER BY created_at ASC, id ASC`,bind:a,rowMode:"object",callback:s=>{n.push({clientUuid:s.client_uuid,createdAt:s.created_at,entryUuid:s.entry_uuid,kategorie:s.kategorie,titel:s.titel,standort:s.standort,kultur:s.kultur,gpsLatitude:s.gps_latitude,gpsLongitude:s.gps_longitude,notiz:s.notiz,device:s.device,mime:s.mime,width:s.width,height:s.height,bytes:s.bytes,data:s.data})}}),{items:n}}async function Wt(e={}){if(!t)throw new Error("Database not initialized");C();const a=e&&e.id!=null?Number(e.id):null;if(a==null)throw new Error("Foto-ID fehlt");const i=[],n=[],s=(l,u)=>{if(Object.prototype.hasOwnProperty.call(e,l)){i.push(`${u} = ?`);const o=e[l];n.push(o==null||o===""?null:o)}};if(s("titel","titel"),s("kategorie","kategorie"),s("kultur","kultur"),s("standort","standort"),s("notiz","notiz"),s("gpsLatitude","gps_latitude"),s("gpsLongitude","gps_longitude"),!i.length)return{success:!0};n.push(a);const r=t.prepare(`UPDATE fotos SET ${i.join(", ")} WHERE id = ?`);return r.bind(n).step(),r.finalize(),{success:!0}}async function jt(e={}){if(!t)throw new Error("Database not initialized");C();const a=e&&e.id!=null?Number(e.id):null;if(a==null)return{data:null};let i=null,n="image/jpeg";return t.exec({sql:"SELECT data, mime FROM fotos WHERE id = ? LIMIT 1",bind:[a],rowMode:"object",callback:s=>{i=s.data??null,n=s.mime||"image/jpeg"}}),{data:i,mime:n}}async function Kt(){if(!t)throw new Error("Database not initialized");C();const e=[];return t.exec({sql:`SELECT client_uuid, created_at, entry_uuid, kategorie, titel, standort,
                 kultur, gps_latitude, gps_longitude, notiz, device, mime, width, height, bytes, data
          FROM fotos WHERE mobile_shared_at IS NULL ORDER BY created_at ASC, id ASC`,rowMode:"object",callback:a=>{e.push({clientUuid:a.client_uuid,createdAt:a.created_at,entryUuid:a.entry_uuid,kategorie:a.kategorie,titel:a.titel,standort:a.standort,kultur:a.kultur,gpsLatitude:a.gps_latitude,gpsLongitude:a.gps_longitude,notiz:a.notiz,device:a.device,mime:a.mime,width:a.width,height:a.height,bytes:a.bytes,data:a.data})}}),{items:e}}async function Vt(){if(!t)throw new Error("Database not initialized");C();const e=t.selectValue("SELECT COUNT(*) FROM fotos WHERE mobile_shared_at IS NULL")||0;return e>0&&t.exec("UPDATE fotos SET mobile_shared_at = datetime('now') WHERE mobile_shared_at IS NULL"),{marked:e}}async function $t(){if(!t)throw new Error("Database not initialized");C();const e=t.selectValue("SELECT COUNT(*) FROM fotos WHERE mobile_shared_at IS NOT NULL")||0;return e>0&&t.exec("DELETE FROM fotos WHERE mobile_shared_at IS NOT NULL"),{deleted:e}}async function Yt(e={}){if(!t)throw new Error("Database not initialized");C();const a=e&&e.id!=null?Number(e.id):null;if(a==null)throw new Error("Foto-ID fehlt");const i=t.prepare("DELETE FROM fotos WHERE id = ?");return i.bind([a]).step(),i.finalize(),{success:!0}}async function Jt(){if(!t)throw new Error("Database not initialized");C();const e=t.selectValue("SELECT COUNT(*) FROM fotos")||0;return t.exec("DELETE FROM fotos"),{success:!0,deleted:Number(e)}}async function Qt(e={}){if(!t)throw new Error("Database not initialized");q();const a=e&&e.id?String(e.id):"";if(!a)throw new Error("Archiv-Log-ID fehlt");const i=t.prepare("DELETE FROM archive_logs WHERE id = ?");return i.bind([a]).step(),i.finalize(),de(),{success:!0}}async function Zt(e){if(!t)throw new Error("Database not initialized");let a=null;if(t.exec({sql:`SELECT id, created_at, header_json,
            ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
            uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
            invekos, gps, gps_latitude, gps_longitude, gps_point_id,
            qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart,
            company_name, company_address, company_headline, company_email
          FROM history WHERE id = ?`,bind:[e],rowMode:"object",callback:i=>{let n={};if(i.header_json)try{n=JSON.parse(i.header_json)}catch(s){console.warn("Could not parse header_json",s)}a={company:{name:i.company_name??n.company?.name??null,address:i.company_address??n.company?.address??null,headline:i.company_headline??n.company?.headline??null,contactEmail:i.company_email??n.company?.contactEmail??null},id:i.id,createdAt:i.created_at,ersteller:i.ersteller??n.ersteller,standort:i.standort??n.standort,kultur:i.kultur??n.kultur,eppoCode:i.eppo_code??n.eppoCode,bbch:i.bbch??n.bbch,datum:i.datum??n.datum,dateIso:i.date_iso??n.dateIso,uhrzeit:i.uhrzeit??n.uhrzeit,usageType:i.usage_type??n.usageType,areaHa:i.area_ha??n.areaHa,areaAr:i.area_ar??n.areaAr,areaSqm:i.area_sqm??n.areaSqm,waterVolume:i.water_volume??n.waterVolume,invekos:i.invekos??n.invekos,gps:i.gps??n.gps,gpsCoordinates:i.gps_latitude!=null&&i.gps_longitude!=null?{latitude:i.gps_latitude,longitude:i.gps_longitude}:n.gpsCoordinates||null,gpsPointId:i.gps_point_id??n.gpsPointId,qsMaschine:i.qs_maschine??n.qsMaschine,qsSchaderreger:i.qs_schaderreger??n.qsSchaderreger,qsVerantwortlicher:i.qs_verantwortlicher??n.qsVerantwortlicher,qsWetter:i.qs_wetter??n.qsWetter,qsBehandlungsart:i.qs_behandlungsart??n.qsBehandlungsart,savedAt:n.savedAt||i.created_at,items:[]}}}),!a)throw new Error("History entry not found");return t.exec({sql:`SELECT id, medium_id, payload_json,
            medium_name, medium_unit, method_id, method_label, medium_value,
            calculated_total, zulassungsnummer, wartezeit, wirkstoff,
            input_area_ha, input_area_ar, input_area_sqm, input_water_volume
          FROM history_items WHERE history_id = ?`,bind:[e],rowMode:"object",callback:i=>{let n={};if(i.payload_json)try{n=JSON.parse(i.payload_json)}catch(s){console.warn("Could not parse payload_json",s)}a.items.push({id:i.medium_id??n.id,mediumId:i.medium_id??n.mediumId,name:i.medium_name??n.name,unit:i.medium_unit??n.unit,methodId:i.method_id??n.methodId,methodLabel:i.method_label??n.methodLabel,value:i.medium_value??n.value,total:i.calculated_total??n.total,zulassungsnummer:i.zulassungsnummer??n.zulassungsnummer,wartezeit:i.wartezeit??n.wartezeit,wirkstoff:i.wirkstoff??n.wirkstoff,inputs:{areaHa:i.input_area_ha??n.inputs?.areaHa,areaAr:i.input_area_ar??n.inputs?.areaAr,areaSqm:i.input_area_sqm??n.inputs?.areaSqm,waterVolume:i.input_water_volume??n.inputs?.waterVolume}})}}),a}async function en(e){if(!t)throw new Error("Database not initialized");const a=e&&e.header?e.header:e||{},i=a&&a.clientUuid?String(a.clientUuid):null;if(i)try{const n=t.selectValue("SELECT id FROM history WHERE client_uuid = ? LIMIT 1",[i]);if(n!=null)return{id:n,duplicate:!0}}catch{}t.exec("BEGIN TRANSACTION");try{const n=e.header?{...e.header}:{...e};delete n.items;const s=e.savedAt||n.savedAt||n.createdAt||new Date().toISOString();n.createdAt||(n.createdAt=s);const r=n.gpsCoordinates||{},l=n.company||{},u=t.prepare(`
      INSERT INTO history (
        created_at, client_uuid, header_json,
        ersteller, standort, kultur, eppo_code, bbch, datum, date_iso,
        uhrzeit, usage_type, area_ha, area_ar, area_sqm, water_volume,
        invekos, gps, gps_latitude, gps_longitude, gps_point_id,
        qs_maschine, qs_schaderreger, qs_verantwortlicher, qs_wetter, qs_behandlungsart,
        company_name, company_address, company_headline, company_email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);u.bind([s,i,JSON.stringify(n),n.ersteller||null,n.standort||null,n.kultur||null,n.eppoCode||null,n.bbch||null,n.datum||null,n.dateIso||null,n.uhrzeit||null,n.usageType||null,n.areaHa??null,n.areaAr??null,n.areaSqm??null,n.waterVolume??null,n.invekos||null,n.gps||null,r.latitude??null,r.longitude??null,n.gpsPointId||null,n.qsMaschine||null,n.qsSchaderreger||null,n.qsVerantwortlicher||null,n.qsWetter||null,n.qsBehandlungsart||null,l.name||null,l.address||null,l.headline||null,l.contactEmail||null]).step();const o=t.selectValue("SELECT last_insert_rowid()");u.finalize();const c=e.items&&Array.isArray(e.items)?e.items:[];if(c.length){const g=t.prepare(`
        INSERT INTO history_items (
          history_id, medium_id, payload_json,
          medium_name, medium_unit, method_id, method_label, medium_value,
          calculated_total, zulassungsnummer, wartezeit, wirkstoff,
          input_area_ha, input_area_ar, input_area_sqm, input_water_volume
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);for(const _ of c){const p=_.inputs||{};g.bind([o,_.mediumId||_.medium_id||_.id||"",JSON.stringify(_),_.name||null,_.unit||null,_.methodId||null,_.methodLabel||null,_.value??null,_.total??null,_.zulassungsnummer||null,_.wartezeit??null,_.wirkstoff||null,p.areaHa??null,p.areaAr??null,p.areaSqm??null,p.waterVolume??null]).step(),g.reset()}g.finalize()}return t.exec("COMMIT"),{success:!0,id:o}}catch(n){if(t.exec("ROLLBACK"),i&&/UNIQUE|constraint/i.test(String(n&&n.message)))try{const s=t.selectValue("SELECT id FROM history WHERE client_uuid = ? LIMIT 1",[i]);if(s!=null)return{id:s,duplicate:!0}}catch{}throw n}}async function tn(e){if(!t)throw new Error("Database not initialized");const a=t.prepare("DELETE FROM history WHERE id = ?");return a.bind([e]).step(),a.finalize(),{success:!0}}async function nn(){if(!t)throw new Error("Database not initialized");const e=N.capi.sqlite3_js_db_export(t.pointer);return{data:e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}}async function an(e){if(!t)throw new Error("Database not initialized");const a=e instanceof Uint8Array?e:new Uint8Array(e);if(V==="opfs"&&N?.oo1?.OpfsDb&&N?.opfs)return t.close(),await N.oo1.OpfsDb.importDb("/pflanzenschutz.sqlite",a),t=Se("opfs"),re(),await le(),V="opfs",K=!0,{success:!0,mode:"opfs"};t.close();const i=new N.oo1.DB,n=N.wasm.scopedAllocPush();try{const s=N.wasm.allocFromTypedArray(a),r=N.wasm.allocCString("main"),l=(N.capi.SQLITE_DESERIALIZE_FREEONCLOSE||0)|(N.capi.SQLITE_DESERIALIZE_RESIZEABLE||0),u=N.capi.sqlite3_deserialize(i.pointer,r,s,a.byteLength,a.byteLength,l);if(u!==N.capi.SQLITE_OK)throw i.close(),new Error(`sqlite3_deserialize failed: ${N.capi.sqlite3_js_rc_str(u)||u}`)}finally{N.wasm.scopedAllocPop(n)}return t=i,re(),await le(),V="memory",K=!0,{success:!0,mode:"memory"}}async function sn(e={}){if(!t)throw new Error("Database not initialized");if(!N)throw new Error("SQLite not initialized");const{data:a}=e;if(!a)throw new Error("Keine Daten zum Importieren übergeben");const i=a instanceof Uint8Array?a:new Uint8Array(a);console.log(`[EPPO Import] Lade Datenbank, ${i.length} bytes`);const n=be(i),s=[];let r=0;try{const l=[];n.exec({sql:"SELECT name FROM sqlite_master WHERE type='table'",callback:u=>{u&&u[0]&&l.push(u[0])}}),console.log("[EPPO Import] Gefundene Tabellen:",l),l.includes("eppo")?(console.log('[EPPO Import] Nutze neue deutsche Tabelle "eppo"'),n.exec({sql:"SELECT code, name FROM eppo ORDER BY name",callback:u=>{if(!u||!u[0])return;const o=String(u[0]).trim().toUpperCase(),c=u[1]?String(u[1]).trim():o;s.push({code:o,name:c,language:"DE",dtcode:null,dtLabel:"plant",languageLabel:"Deutsch",authority:null,nameDe:c,nameEn:null,nameLa:null})}})):l.includes("t_codes")?(console.log("[EPPO Import] Nutze alte Struktur mit t_codes"),n.exec({sql:`
          SELECT UPPER(TRIM(c.eppocode)) AS code, TRIM(n.fullname) AS name
          FROM t_codes c
          JOIN t_names n ON c.codeid = n.codeid
          WHERE n.codelang = 'de' AND n.fullname IS NOT NULL
          ORDER BY n.fullname
        `,callback:u=>{if(!u||!u[0])return;const o=String(u[0]).trim().toUpperCase(),c=u[1]?String(u[1]).trim():o;s.push({code:o,name:c,language:"DE",dtcode:null,dtLabel:"plant",languageLabel:"Deutsch",authority:null,nameDe:c,nameEn:null,nameLa:null})}})):console.error("[EPPO Import] Keine bekannte Tabellenstruktur gefunden!"),r=s.length,console.log(`[EPPO Import] ${s.length} Einträge gelesen`)}finally{n.close()}t.exec("BEGIN TRANSACTION");try{if(w(t),t.exec("DELETE FROM lookup_eppo_codes"),s.length){const l=t.prepare(`INSERT OR REPLACE INTO lookup_eppo_codes (
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);for(const u of s)l.bind([u.code,u.name,u.language||"",u.dtcode,1,u.dtLabel,u.languageLabel,u.authority,u.nameDe,u.nameEn,u.nameLa]).step(),l.reset();l.finalize()}return x("lookup:eppo:lastImport",new Date().toISOString()),x("lookup:eppo:count",String(r||s.length)),t.exec("COMMIT"),{success:!0,count:s.length}}catch(l){throw t.exec("ROLLBACK"),console.error("EPPO-Lookup-Import fehlgeschlagen",l),l}}async function rn(e={}){if(!t)throw new Error("Database not initialized");if(!N)throw new Error("SQLite not initialized");const{data:a}=e;if(!a)throw new Error("Keine Daten zum Importieren übergeben");const i=a instanceof Uint8Array?a:new Uint8Array(a);console.log(`[BBCH Import] Lade Datenbank, ${i.length} bytes`);const n=be(i),s=[];try{const r=[];n.exec({sql:"SELECT name FROM sqlite_master WHERE type='table'",callback:l=>{l&&l[0]&&r.push(l[0])}}),console.log("[BBCH Import] Gefundene Tabellen:",r),r.includes("bbch")?(console.log('[BBCH Import] Nutze neue deutsche Tabelle "bbch"'),n.exec({sql:"SELECT code, label, stage_group FROM bbch ORDER BY CAST(code AS INTEGER)",callback:l=>{if(!l||!l[0])return;const u=String(l[0]).trim(),o=l[1]?String(l[1]).trim():u,c=l[2]!=null?Number(l[2]):null;s.push({code:u,label:o,principal:c,secondary:null,definition:o,kind:null})}})):r.includes("bbch_stage")?(console.log("[BBCH Import] Nutze alte Struktur mit bbch_stage"),n.exec({sql:"SELECT bbch_code, label_de, definition_1, definition_2, principal_stage FROM bbch_stage ORDER BY CAST(bbch_code AS INTEGER)",callback:l=>{if(!l||!l[0])return;const u=String(l[0]).trim();let o=l[1]||u;const c=l[2]||"",g=l[3]||"";g.includes("Quelle BBCH")||g.includes("(G)")||g.includes("(D)")?o=g:(c.includes("Quelle BBCH")||c.includes("(G)")||c.includes("(D)"))&&(o=c),s.push({code:u,label:o,principal:l[4]!=null?Number(l[4]):null,secondary:null,definition:o,kind:null})}})):console.error("[BBCH Import] Keine bekannte Tabellenstruktur gefunden!"),console.log(`[BBCH Import] ${s.length} Einträge gelesen`)}finally{n.close()}t.exec("BEGIN TRANSACTION");try{if(w(t),t.exec("DELETE FROM lookup_bbch_stages"),s.length){const r=t.prepare(`INSERT OR REPLACE INTO lookup_bbch_stages
        (code, label, principal_stage, secondary_stage, definition, kind)
        VALUES (?, ?, ?, ?, ?, ?)`);for(const l of s)r.bind([l.code,l.label,l.principal,l.secondary,l.definition||null,l.kind]).step(),r.reset();r.finalize()}return x("lookup:bbch:lastImport",new Date().toISOString()),x("lookup:bbch:count",String(s.length)),t.exec("COMMIT"),{success:!0,count:s.length}}catch(r){throw t.exec("ROLLBACK"),console.error("BBCH-Lookup-Import fehlgeschlagen",r),r}}function ln(e={}){if(!t)throw new Error("Database not initialized");w(t);const a=(e.query||"").trim(),i=Math.min(Math.max(Number(e.limit)||10,1),50),n=Math.max(Number(e.offset)||0,0),s=(e.language||"").trim().toUpperCase(),r=s.length>0,l=[],u=t.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes")||0;if(console.log(`[EPPO Search] Suche: "${a}", Sprache: "${s}", hasLanguageFilter: ${r}`),console.log(`[EPPO Search] Gesamt ${u} Einträge in lookup_eppo_codes`),a&&u>0){const T=`%${a.toUpperCase()}%`,S=t.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes WHERE UPPER(name) LIKE ? OR UPPER(IFNULL(name_de, '')) LIKE ?",[T,T])||0;console.log(`[EPPO Search] ${S} Treffer für "${a}"`);const m=[];t.exec({sql:"SELECT code, name, language, name_de FROM lookup_eppo_codes LIMIT 3",callback:E=>{E&&m.push({code:E[0],name:E[1],lang:E[2],name_de:E[3]})}}),console.log("[EPPO Search] Beispiel-Einträge:",m)}if(r&&s==="DE")return un({query:a,limit:i,offset:n});const o=`
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
  `,c="UPPER(IFNULL(language, '')) = ?",g=T=>{r&&T.push(s)};if(!a){const T=r?`WHERE ${c}`:"",S=[];g(S),S.push(i,n),t.exec({sql:`${o}
        ${T}
        ORDER BY name
        LIMIT ? OFFSET ?
      `,bind:S,callback:h=>{l.push({code:h[0],name:h[1],dtcode:h[2]||null,language:h[3]||null,dtLabel:h[4]||null,languageLabel:h[5]||null,authority:h[6]||null,nameDe:h[7]||null,nameEn:h[8]||null,nameLa:h[9]||null})}});const m=r?`SELECT COUNT(*) FROM lookup_eppo_codes WHERE ${c}`:"SELECT COUNT(*) FROM lookup_eppo_codes",E=[];g(E);const R=Number(t.selectValue(m,E))||0;return{rows:l,total:R}}const _=a.toUpperCase(),p=`%${_}%`,b=["(code LIKE ? OR UPPER(name) LIKE ? OR UPPER(IFNULL(name_de, '')) LIKE ?)"];r&&b.push(c);const f=`WHERE ${b.join(" AND ")}`,O=[p,p,p];g(O);const A=Number(t.selectValue(`SELECT COUNT(*) FROM lookup_eppo_codes ${f}`,O))||0,k=[p,p,p];g(k);const M=[`${_}%`,p],d=[i,n];return t.exec({sql:`${o}
      ${f}
      ORDER BY CASE WHEN code LIKE ? THEN 0 ELSE 1 END,
               CASE WHEN UPPER(IFNULL(name_de, '')) LIKE ? THEN 0 ELSE 1 END,
               name
      LIMIT ? OFFSET ?
    `,bind:[...k,...M,...d],callback:T=>{l.push({code:T[0],name:T[1],dtcode:T[2]||null,language:T[3]||null,dtLabel:T[4]||null,languageLabel:T[5]||null,authority:T[6]||null,nameDe:T[7]||null,nameEn:T[8]||null,nameLa:T[9]||null})}}),{rows:l,total:A}}function un(e={}){const a=(e.query||"").trim(),i=Math.min(Math.max(Number(e.limit)||10,1),50),n=Math.max(Number(e.offset)||0,0),s=[],r=Le(),l=`(${r}) AS german_lookup`;if(!a){t.exec({sql:`
        SELECT code, name, dtcode, language, dt_label, language_label, authority, name_de, name_en, name_la
        FROM ${l}
        ORDER BY name
        LIMIT ? OFFSET ?
      `,bind:[i,n],callback:p=>{p&&s.push({code:p[0],name:p[1],dtcode:p[2]||null,language:p[3]||"DE",dtLabel:p[4]||null,languageLabel:p[5]||"Deutsch",authority:p[6]||null,nameDe:p[7]||null,nameEn:p[8]||null,nameLa:p[9]||null})}});const _=Number(t.selectValue(`SELECT COUNT(*) FROM (${r}) AS german_lookup`))||0;return{rows:s,total:_}}const u=a.toUpperCase(),o=`%${u}%`,c=Number(t.selectValue(`SELECT COUNT(*) FROM ${l} WHERE code LIKE ? OR UPPER(name) LIKE ?`,[o,o]))||0,g=[o,o,`${u}%`,i,n];return t.exec({sql:`
      SELECT code, name, dtcode, language, dt_label, language_label, authority, name_de, name_en, name_la
      FROM ${l}
      WHERE code LIKE ? OR UPPER(name) LIKE ?
      ORDER BY CASE WHEN code LIKE ? THEN 0 ELSE 1 END, name
      LIMIT ? OFFSET ?
    `,bind:g,callback:_=>{_&&s.push({code:_[0],name:_[1],dtcode:_[2]||null,language:_[3]||"DE",dtLabel:_[4]||null,languageLabel:_[5]||"Deutsch",authority:_[6]||null,nameDe:_[7]||null,nameEn:_[8]||null,nameLa:_[9]||null})}}),{rows:s,total:c}}function on(){if(!t)throw new Error("Database not initialized");w(t);const e=[];t.exec({sql:`
      SELECT
        UPPER(IFNULL(language, '')) AS language_code,
        MAX(language_label) AS language_label,
        COUNT(*) AS entry_count
      FROM lookup_eppo_codes
      GROUP BY UPPER(IFNULL(language, ''))
      ORDER BY CASE WHEN language_code = '' THEN 0 ELSE 1 END, language_code;
    `,callback:i=>{if(!i)return;const n=i[0]?String(i[0]).trim().toUpperCase():"",s=i[1]?String(i[1]).trim():null,r=i[2]!=null?Number(i[2]):0;e.push({language:n,label:s,count:r})}});const a=Number(t.selectValue(`SELECT COUNT(*) FROM (${Le()}) AS german_lookup`))||0;if(a>0){const i=e.find(n=>(n.language||"").toUpperCase()==="DE");if(i){const n=i.label?i.label.trim():"";i.label=n||"Deutsch",i.count=a}else e.push({language:"DE",label:"Deutsch",count:a})}return e.sort((i,n)=>{const s=l=>l===""?0:1,r=s(i.language||"")-s(n.language||"");return r!==0?r:(i.language||"").localeCompare(n.language||"")}),e.map(i=>{const n=i.language||"",s=i.label&&i.label.length?i.label:n||"Ohne Sprachcode";return{language:n,label:s,count:i.count}})}function Le(){return`
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
  `}function cn(e={}){if(!t)throw new Error("Database not initialized");w(t);const a=(e.query||"").trim(),i=Math.min(Math.max(Number(e.limit)||10,1),50),n=Math.max(Number(e.offset)||0,0),s=[],r="ORDER BY label";if(!a){t.exec({sql:`
        SELECT code, label, principal_stage, secondary_stage, definition, kind
        FROM lookup_bbch_stages
        ${r}
        LIMIT ? OFFSET ?
      `,bind:[i,n],callback:c=>{s.push({code:c[0],label:c[1],principalStage:c[2]!=null?Number(c[2]):null,secondaryStage:c[3]!=null?Number(c[3]):null,definition:c[4]||null,kind:c[5]||null})}});const o=Number(t.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages"))||0;return{rows:s,total:o}}const l=`%${a.toUpperCase()}%`,u=Number(t.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages WHERE code LIKE ? OR UPPER(label) LIKE ? OR UPPER(IFNULL(definition, '')) LIKE ?",[l,l,l]))||0;return t.exec({sql:`
      SELECT code, label, principal_stage, secondary_stage, definition, kind
      FROM lookup_bbch_stages
      WHERE code LIKE ? OR UPPER(label) LIKE ? OR UPPER(IFNULL(definition, '')) LIKE ?
      ORDER BY 
        CASE WHEN code LIKE ? THEN 0 ELSE 1 END,
        CASE WHEN UPPER(IFNULL(definition, '')) LIKE ? THEN 0 ELSE 1 END,
        label
      LIMIT ? OFFSET ?
    `,bind:[l,l,l,l,l,i,n],callback:o=>{s.push({code:o[0],label:o[1],principalStage:o[2]!=null?Number(o[2]):null,secondaryStage:o[3]!=null?Number(o[3]):null,definition:o[4]||null,kind:o[5]||null})}}),{rows:s,total:u}}function dn(){if(!t)throw new Error("Database not initialized");w(t);const e=Number(t.selectValue("SELECT COUNT(*) FROM lookup_eppo_codes"))||0,a=Number(t.selectValue("SELECT COUNT(*) FROM lookup_bbch_stages"))||0;return{eppo:{count:e,lastImport:U("lookup:eppo:lastImport")},bbch:{count:a,lastImport:U("lookup:bbch:lastImport")}}}})();
