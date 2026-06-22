// Acker-Planer (Freiland-Flächen) – Plattform-App auf der gemeinsamen DB.
// Leaflet + Turf werden LAZY geladen (nur wenn diese View geöffnet wird).
// @ts-nocheck
import { escapeHtml } from "@scripts/core/utils";
import { toast } from "@scripts/core/toast";
import {
  listAckerflaechen,
  upsertAckerflaeche,
  deleteAckerflaeche,
  listKulturen,
  persistSqliteDatabaseFile,
} from "@scripts/core/storage/sqlite";
import { getActiveDriverKey } from "@scripts/core/storage";
import { extractSliceItems } from "@scripts/core/state";

interface Services {
  state: { getState: () => any; subscribe: (fn: (s: any) => void) => void };
  events?: { emit: (e: string, p?: unknown) => void };
}

const palette = [
  "#ef4444", "#3b82f6", "#a855f7", "#f59e0b",
  "#06b6d4", "#ec4899", "#84cc16", "#14b8a6",
];
const defaultsParams = () => ({
  bedW: 1.2, pathW: 0.4, rowSp: 0.5, inRowSp: 0.4, angle: 0,
});
const nf = (n: number, d = 0): string =>
  Number.isFinite(n)
    ? n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d })
    : "–";

let L: any = null;
let turf: any = null;
let map: any = null;
let mapReady = false;
let kulturen: Array<{ kultur: string; anbau: string | null; eppoCode: string | null }> = [];

export function initAcker(container: Element | null, services: Services): void {
  if (!(container instanceof HTMLElement)) return;
  container.innerHTML = renderShell();

  const fields: any[] = [];
  let selId: string | null = null;
  const saveTimers = new Map<string, any>();

  const el = (sel: string) => container.querySelector(sel) as HTMLElement | null;
  const listEl = el('[data-role="acker-list"]');
  const emptyEl = el('[data-role="acker-empty"]');
  const totalsEl = el('[data-role="acker-totals"]');
  const mapEl = el('[data-role="acker-map"]');

  // ---------- Persistenz ----------
  const fieldToPayload = (fl: any) => ({
    id: fl.id,
    name: fl.name,
    kultur: fl.kultur || null,
    eppoCode: fl.eppoCode || null,
    standortId: fl.standortId || null,
    color: fl.color,
    latlngs: fl.latlngs,
    areaQm: fl.result?.areaM2 || 0,
    bedW: fl.params.bedW, pathW: fl.params.pathW, rowSp: fl.params.rowSp,
    inRowSp: fl.params.inRowSp, angle: fl.params.angle,
    beds: fl.result?.beds?.length || 0,
    bedMeters: fl.result?.bedMeters || 0,
    plants: fl.result?.plants || 0,
  });
  const persistField = (fl: any, immediate = false) => {
    if (getActiveDriverKey() !== "sqlite") return;
    const run = async () => {
      try {
        const rec = await upsertAckerflaeche(fieldToPayload(fl));
        if (rec?.id) fl.id = rec.id;
        await persistSqliteDatabaseFile().catch(() => {});
      } catch (e) {
        console.warn("[Acker] Speichern fehlgeschlagen:", e);
      }
    };
    if (immediate) {
      void run();
      return;
    }
    clearTimeout(saveTimers.get(fl._key));
    saveTimers.set(fl._key, setTimeout(run, 600));
  };

  // ---------- Geometrie (Polygon → Beete + Pflanzen) ----------
  function computeBeds(latlngs: any[], p: any) {
    const ring = latlngs.map((a) => [a[1], a[0]]);
    if (ring.length < 3) return { areaM2: 0, beds: [], bedMeters: 0, plants: 0 };
    const f = ring[0], l = ring[ring.length - 1];
    if (f[0] !== l[0] || f[1] !== l[1]) ring.push(f.slice());
    if (ring.length < 4) return { areaM2: 0, beds: [], bedMeters: 0, plants: 0 };
    let field;
    try { field = turf.polygon([ring]); } catch { return { areaM2: 0, beds: [], bedMeters: 0, plants: 0 }; }
    const areaM2 = turf.area(field);
    const pitch = p.bedW + p.pathW;
    if (pitch <= 0 || p.bedW <= 0 || p.rowSp <= 0 || p.inRowSp <= 0)
      return { areaM2, beds: [], bedMeters: 0, plants: 0 };
    const pivot = turf.centroid(field);
    const rot = turf.transformRotate(field, -p.angle, { pivot });
    const bb = turf.bbox(rot);
    const mToDeg = 1 / 111320;
    const step = pitch * mToDeg;
    const bedH = p.bedW * mToDeg;
    const padX = (bb[2] - bb[0]) * 0.02 + 1e-4;
    const beds: any[] = []; let bedMeters = 0, plants = 0, guard = 0;
    for (let y = bb[1]; y < bb[3] && guard < 4000; y += step, guard++) {
      const yTop = Math.min(y + bedH, bb[3]);
      const strip = turf.polygon([[
        [bb[0] - padX, y], [bb[2] + padX, y], [bb[2] + padX, yTop], [bb[0] - padX, yTop], [bb[0] - padX, y],
      ]]);
      let inter = null;
      try { inter = turf.intersect(rot, strip); } catch { inter = null; }
      if (!inter) continue;
      let back;
      try { back = turf.transformRotate(inter, p.angle, { pivot }); } catch { continue; }
      const a = turf.area(back);
      if (a < Math.max(0.4, p.bedW * 0.3)) continue;
      const lenM = a / p.bedW;
      const rows = Math.max(1, Math.floor(p.bedW / p.rowSp));
      const perRow = Math.max(0, Math.floor(lenM / p.inRowSp));
      bedMeters += lenM; plants += rows * perRow;
      beds.push({ geo: back, lenM, rows, perRow, plants: rows * perRow, areaM2: a });
    }
    return { areaM2, beds, bedMeters, plants };
  }

  // ---------- Rendern (Karte) ----------
  const styleOutline = (fl: any, sel: boolean) => ({
    color: fl.color, weight: sel ? 3 : 2, fillColor: fl.color,
    fillOpacity: sel ? 0.05 : 0.12, dashArray: sel ? null : "4 4",
  });
  const bedStyle = (fl: any) => ({ color: fl.color, weight: 1, fillColor: fl.color, fillOpacity: 0.4 });

  function drawField(fl: any) {
    if (fl.outline) map.removeLayer(fl.outline);
    if (fl.bedsLayer) map.removeLayer(fl.bedsLayer);
    clearHandles(fl);
    const sel = fl._key === selId;
    fl.bedsLayer = L.layerGroup();
    (fl.result?.beds || []).forEach((b: any) => {
      L.geoJSON(b.geo, { style: bedStyle(fl) })
        .bindTooltip(`${nf(b.lenM, 1)} m · ${b.rows}×${nf(b.perRow)} = ${nf(b.plants)} Pfl.`, { sticky: true })
        .addTo(fl.bedsLayer);
    });
    fl.bedsLayer.addTo(map);
    fl.outline = L.polygon(fl.latlngs, styleOutline(fl, sel)).addTo(map);
    fl.outline.on("click", () => select(fl._key));
    if (sel) buildHandles(fl);
  }
  function buildHandles(fl: any) {
    clearHandles(fl);
    fl.handles = fl.latlngs.map((ll: any, i: number) => {
      const m = L.marker(ll, { draggable: true, icon: L.divIcon({ className: "acker-vhandle" }) }).addTo(map);
      m.on("drag", (e: any) => { fl.latlngs[i] = [e.target.getLatLng().lat, e.target.getLatLng().lng]; fl.outline.setLatLngs(fl.latlngs); });
      m.on("dragend", () => recompute(fl));
      return m;
    });
  }
  function clearHandles(fl: any) { (fl.handles || []).forEach((m: any) => map.removeLayer(m)); fl.handles = []; }

  function recompute(fl: any) {
    fl.result = computeBeds(fl.latlngs, fl.params);
    drawField(fl);
    renderPanel();
    persistField(fl);
  }

  // ---------- Panel ----------
  function kulturOptions(selected: string | null): string {
    return ['<option value="">– Kultur –</option>']
      .concat(kulturen.map((k) => {
        const label = `${k.kultur}${k.anbau ? " (" + k.anbau + ")" : ""}`;
        return `<option value="${escapeHtml(k.kultur)}"${k.kultur === selected ? " selected" : ""}>${escapeHtml(label)}</option>`;
      })).join("");
  }
  function standortOptions(selected: string | null): string {
    const points = extractSliceItems<any>(services.state.getState().gps?.points) || [];
    return ['<option value="">– Standort –</option>']
      .concat(points.map((p: any) => `<option value="${escapeHtml(p.id)}"${p.id === selected ? " selected" : ""}>${escapeHtml(p.name || "")}</option>`))
      .join("");
  }

  function renderPanel() {
    if (!listEl || !emptyEl || !totalsEl) return;
    emptyEl.style.display = fields.length ? "none" : "block";
    totalsEl.style.display = fields.length ? "block" : "none";
    listEl.innerHTML = "";
    let A = 0, B = 0, M = 0, P = 0;
    fields.forEach((fl) => {
      A += fl.result?.areaM2 || 0; B += fl.result?.beds?.length || 0;
      M += fl.result?.bedMeters || 0; P += fl.result?.plants || 0;
      const sel = fl._key === selId;
      const d = document.createElement("div");
      d.className = "acker-field" + (sel ? " sel open" : "");
      d.innerHTML = `
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${fl.color}"></span>
          <input class="acker-name" value="${escapeHtml(fl.name)}" />
          <span class="acker-stat">${nf(fl.result?.plants || 0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${kulturOptions(fl.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${standortOptions(fl.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${fl.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${fl.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${fl.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${fl.params.inRowSp}"/></label>
            <label class="acker-fld span2">Ausrichtung der Beete: ${fl.params.angle}°<input data-k="angle" type="range" min="0" max="180" step="5" value="${fl.params.angle}"/></label>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b>${nf(fl.result?.areaM2 || 0)} m² · ${nf((fl.result?.areaM2 || 0) / 10000, 3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${nf(fl.result?.beds?.length || 0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${nf(fl.result?.bedMeters || 0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${nf(fl.result?.plants || 0)}</b></div>
          </div>
          <div class="acker-actions">
            <button class="btn btn-sm" data-act="recolor">Farbe</button>
            <button class="btn btn-sm" data-act="del" style="color:#ef4444;">Löschen</button>
          </div>
        </div>`;
      d.querySelector(".acker-fhead")!.addEventListener("click", (ev: any) => {
        if (ev.target.classList.contains("acker-name")) return;
        select(fl._key);
      });
      const nameInp = d.querySelector(".acker-name") as HTMLInputElement;
      nameInp.addEventListener("input", (e: any) => { fl.name = e.target.value; persistField(fl); });
      d.querySelectorAll("[data-k]").forEach((inp: any) => {
        inp.addEventListener("input", (e: any) => {
          const k = inp.dataset.k;
          if (k === "kultur") {
            fl.kultur = e.target.value || null;
            fl.eppoCode = kulturen.find((x) => x.kultur === fl.kultur)?.eppoCode || null;
            persistField(fl); return;
          }
          if (k === "standortId") { fl.standortId = e.target.value || null; persistField(fl); return; }
          if (k === "angle") fl.params.angle = +e.target.value;
          else fl.params[k] = parseFloat(e.target.value) || 0;
          recompute(fl);
        });
      });
      d.querySelector('[data-act="del"]')!.addEventListener("click", () => removeField(fl._key));
      d.querySelector('[data-act="recolor"]')!.addEventListener("click", () => {
        fl.color = palette[(palette.indexOf(fl.color) + 1) % palette.length];
        drawField(fl); renderPanel(); persistField(fl);
      });
      listEl.appendChild(d);
    });
    totalsEl.querySelector('[data-t="area"]')!.textContent = nf(A) + " m² · " + nf(A / 10000, 3) + " ha";
    totalsEl.querySelector('[data-t="beds"]')!.textContent = nf(B);
    totalsEl.querySelector('[data-t="meters"]')!.textContent = nf(M) + " m";
    totalsEl.querySelector('[data-t="plants"]')!.textContent = nf(P);
  }

  function select(key: string) { selId = key; fields.forEach((fl) => drawField(fl)); renderPanel(); }
  async function removeField(key: string) {
    const fl = fields.find((f) => f._key === key); if (!fl) return;
    if (fl.outline) map.removeLayer(fl.outline);
    if (fl.bedsLayer) map.removeLayer(fl.bedsLayer);
    clearHandles(fl);
    const idx = fields.findIndex((f) => f._key === key);
    if (idx >= 0) fields.splice(idx, 1);
    if (selId === key) selId = null;
    renderPanel();
    if (fl.id && getActiveDriverKey() === "sqlite") {
      try { await deleteAckerflaeche({ id: fl.id }); await persistSqliteDatabaseFile().catch(() => {}); } catch {}
    }
  }

  // ---------- Zeichnen ----------
  let drawing = false; let pts: any[] = []; let temp: any = null; let dots: any[] = [];
  let keySeq = 0;
  function setDraw(on: boolean) {
    drawing = on;
    el('[data-role="acker-banner"]')!.style.display = on ? "block" : "none";
    (el('[data-role="acker-draw"]') as HTMLElement).style.display = on ? "none" : "block";
    map.getContainer().style.cursor = on ? "crosshair" : "";
    if (!on) { if (temp) map.removeLayer(temp); dots.forEach((d) => map.removeLayer(d)); temp = null; dots = []; pts = []; }
  }
  function onMapClick(e: any) {
    if (!drawing) return;
    pts.push([e.latlng.lat, e.latlng.lng]);
    dots.push(L.circleMarker(e.latlng, { radius: 4, color: "#22c55e", fillColor: "#fff", fillOpacity: 1, weight: 2 }).addTo(map));
    if (!temp) temp = L.polyline(pts, { color: "#22c55e", weight: 2, dashArray: "5 5" }).addTo(map);
    else temp.setLatLngs(pts);
  }
  function finishDraw() {
    if (pts.length < 3) { toast.warning("Mindestens 3 Punkte setzen."); return; }
    const fl: any = {
      _key: "new-" + (++keySeq), id: null, name: "Fläche " + (fields.length + 1),
      kultur: null, eppoCode: null, standortId: null,
      color: palette[fields.length % palette.length],
      latlngs: pts.map((p) => p.slice()), params: defaultsParams(),
      outline: null, bedsLayer: null, handles: [], result: { areaM2: 0, beds: [], bedMeters: 0, plants: 0 },
    };
    fields.push(fl); setDraw(false); selId = fl._key;
    recompute(fl);
    persistField(fl, true);
  }

  // ---------- Suche (Nominatim) ----------
  async function geocode() {
    const q = (el('[data-role="acker-q"]') as HTMLInputElement).value.trim(); if (!q) return;
    try {
      const r = await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURIComponent(q));
      const j = await r.json();
      if (j[0]) map.setView([+j[0].lat, +j[0].lon], 18);
      else toast.info("Nichts gefunden.");
    } catch { toast.warning("Suche nicht verfügbar."); }
  }

  // ---------- Lazy Map-Init ----------
  async function ensureMap() {
    if (mapReady) { setTimeout(() => map && map.invalidateSize(), 60); return; }
    mapReady = true;
    try {
      await import("leaflet/dist/leaflet.css");
      const leafletMod: any = await import("leaflet");
      L = leafletMod.default || leafletMod;
      turf = await import("@turf/turf");
    } catch (e) {
      console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:", e);
      if (emptyEl) emptyEl.textContent = "Karte konnte nicht geladen werden (offline?).";
      mapReady = false;
      return;
    }
    map = L.map(mapEl, { doubleClickZoom: false }).setView([47.818, 8.976], 17);
    const sat = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 21, maxNativeZoom: 19, attribution: "Tiles © Esri" }).addTo(map);
    const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" });
    L.control.layers({ Satellit: sat, "Karte (OSM)": osm }, {}, { position: "topright" }).addTo(map);
    map.on("click", onMapClick);

    el('[data-role="acker-draw"]')!.addEventListener("click", () => setDraw(true));
    el('[data-role="acker-finish"]')!.addEventListener("click", finishDraw);
    el('[data-role="acker-cancel"]')!.addEventListener("click", () => setDraw(false));
    el('[data-role="acker-go"]')!.addEventListener("click", geocode);
    (el('[data-role="acker-q"]') as HTMLInputElement).addEventListener("keydown", (e: any) => { if (e.key === "Enter") geocode(); });
    document.addEventListener("keydown", (e: any) => {
      if (!drawing) return;
      if (e.key === "Backspace") { e.preventDefault(); pts.pop(); const d = dots.pop(); if (d) map.removeLayer(d); if (temp) temp.setLatLngs(pts); }
      if (e.key === "Enter") finishDraw();
      if (e.key === "Escape") setDraw(false);
    });

    await loadKulturen();
    await loadFields();
    setTimeout(() => map.invalidateSize(), 60);
  }

  async function loadKulturen() {
    if (getActiveDriverKey() !== "sqlite") return;
    try { const r = await listKulturen(); kulturen = r?.rows || []; } catch { kulturen = []; }
  }
  async function loadFields() {
    if (getActiveDriverKey() !== "sqlite") return;
    try {
      const r = await listAckerflaechen();
      (r?.rows || []).forEach((row: any) => {
        const fl: any = {
          _key: "db-" + row.id, id: row.id, name: row.name, kultur: row.kultur,
          eppoCode: row.eppoCode, standortId: row.standortId,
          color: row.color || palette[fields.length % palette.length],
          latlngs: row.latlngs || [],
          params: { bedW: row.bedW ?? 1.2, pathW: row.pathW ?? 0.4, rowSp: row.rowSp ?? 0.5, inRowSp: row.inRowSp ?? 0.4, angle: row.angle ?? 0 },
          outline: null, bedsLayer: null, handles: [], result: { areaM2: 0, beds: [], bedMeters: 0, plants: 0 },
        };
        fl.result = computeBeds(fl.latlngs, fl.params);
        fields.push(fl); drawField(fl);
      });
      renderPanel();
      const withGeo = fields.find((f) => f.latlngs?.length);
      if (withGeo && map) {
        try { map.fitBounds(L.polygon(withGeo.latlngs).getBounds(), { maxZoom: 19, padding: [30, 30] }); } catch {}
      }
    } catch (e) { console.warn("[Acker] Flächen laden fehlgeschlagen:", e); }
  }

  services.state.subscribe((s: any) => {
    if (s?.app?.activeSection === "acker") void ensureMap();
  });
  renderPanel();
}

function renderShell(): string {
  return `
  <style>
    .acker-wrap{display:flex;gap:0;height:calc(100vh - 80px);min-height:460px;border:1px solid var(--border-1);border-radius:12px;overflow:hidden;background:var(--surface-1,#0f172a)}
    .acker-side{width:340px;min-width:300px;display:flex;flex-direction:column;border-right:1px solid var(--border-1);overflow:hidden}
    .acker-scroll{overflow-y:auto;padding:12px 14px;flex:1}
    .acker-map{flex:1;min-height:300px}
    .acker-search{display:flex;gap:6px;margin-bottom:10px}
    .acker-search input{flex:1}
    .acker-banner{display:none;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.4);color:var(--text);padding:10px 12px;border-radius:8px;font-size:12.5px;margin-bottom:10px;line-height:1.45}
    .acker-banner .row{display:flex;gap:8px;margin-top:8px}
    .acker-totals{background:var(--surface-2,rgba(255,255,255,.04));border:1px solid var(--border-1);border-radius:10px;padding:12px;margin-bottom:12px}
    .acker-totals .t-row{display:flex;justify-content:space-between;font-size:13px;padding:3px 0}
    .acker-totals .big{font-size:20px;font-weight:700;color:#22c55e}
    .acker-empty{color:var(--text-muted,#94a3b8);font-size:13px;text-align:center;padding:22px 8px;line-height:1.5}
    .acker-field{border:1px solid var(--border-1);border-radius:10px;margin-bottom:10px;overflow:hidden}
    .acker-field.sel{border-color:#22c55e;box-shadow:0 0 0 1px #22c55e}
    .acker-fhead{display:flex;align-items:center;gap:8px;padding:9px 10px;cursor:pointer}
    .acker-swatch{width:14px;height:14px;border-radius:4px;flex:none;border:1px solid rgba(0,0,0,.2)}
    .acker-name{flex:1;font-size:13.5px;font-weight:600;border:0;background:transparent;outline:none;color:var(--text);min-width:0}
    .acker-stat{font-size:12px;color:var(--text-muted,#94a3b8)}
    .acker-fbody{display:none;padding:0 10px 10px;border-top:1px solid var(--border-1)}
    .acker-field.open .acker-fbody{display:block}
    .acker-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
    .acker-fld{font-size:11px;color:var(--text-muted,#94a3b8);display:flex;flex-direction:column;gap:3px}
    .acker-fld input,.acker-fld select{padding:6px 7px;border:1px solid var(--border-1);border-radius:7px;font-size:12.5px;width:100%;background:var(--surface-2,rgba(255,255,255,.04));color:var(--text)}
    .acker-fld.span2{grid-column:1 / -1}
    .acker-res{margin-top:10px;background:var(--surface-2,rgba(255,255,255,.04));border-radius:8px;padding:8px 10px}
    .acker-res .r{display:flex;justify-content:space-between;font-size:12.5px;padding:2px 0}
    .acker-res .r b{color:#22c55e}
    .acker-actions{display:flex;justify-content:space-between;margin-top:10px;gap:8px}
    .acker-vhandle{background:#fff;border:2px solid #15803d;border-radius:50%;width:12px!important;height:12px!important;margin-left:-6px!important;margin-top:-6px!important;cursor:grab}
    @media(max-width:760px){.acker-wrap{flex-direction:column;height:auto}.acker-side{width:100%;max-height:46vh}.acker-map{height:52vh}}
  </style>
  <section class="calc-section">
    <div class="acker-wrap">
      <aside class="acker-side">
        <div class="acker-scroll">
          <div class="acker-search">
            <input class="form-control calc-input" data-role="acker-q" placeholder="Ort suchen (z. B. Wahlwies)" />
            <button class="btn btn-psm-secondary-outline" data-role="acker-go">Suchen</button>
          </div>
          <button class="btn btn-psm-primary" style="width:100%" data-role="acker-draw">+ Neue Fläche zeichnen</button>
          <div class="acker-banner" data-role="acker-banner">
            Auf die Karte klicken setzt Eckpunkte. <b>Backspace</b> = letzten Punkt löschen, <b>Enter</b> = fertig.
            <div class="row">
              <button class="btn btn-sm btn-psm-primary" data-role="acker-finish">✓ Fertig</button>
              <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-cancel">Abbrechen</button>
            </div>
          </div>
          <div class="acker-totals" data-role="acker-totals" style="display:none;margin-top:12px">
            <div class="t-row"><span>Gesamtfläche</span><b data-t="area">–</b></div>
            <div class="t-row"><span>Beete gesamt</span><b data-t="beds">–</b></div>
            <div class="t-row"><span>Beetmeter gesamt</span><b data-t="meters">–</b></div>
            <div class="t-row" style="margin-top:4px"><span>Pflanzen gesamt</span><b class="big" data-t="plants">–</b></div>
          </div>
          <div data-role="acker-list"></div>
          <div class="acker-empty" data-role="acker-empty">Noch keine Fläche.<br>Zum Acker navigieren, dann <b>Neue Fläche zeichnen</b>.</div>
        </div>
      </aside>
      <div class="acker-map" data-role="acker-map"></div>
    </div>
  </section>`;
}
