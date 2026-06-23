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

// Meter pro Bildschirm-Pixel auf aktueller Zoomstufe/Breite (für LOD-Entscheidung).
function metersPerPixel(): number {
  if (!map) return 1;
  const lat = map.getCenter().lat;
  return (156543.03392 * Math.cos((lat * Math.PI) / 180)) / Math.pow(2, map.getZoom());
}

export function initAcker(container: Element | null, services: Services): void {
  if (!(container instanceof HTMLElement)) return;
  container.innerHTML = renderShell();

  const fields: any[] = [];
  let selId: string | null = null;
  const saveTimers = new Map<string, any>();
  let standorteLayer: any = null;
  let labelLayer: any = null;
  let baseLayers: { sat: any; osm: any } = { sat: null, osm: null };
  // Anzeige-Schalter (Client-seitig, nicht persistiert)
  let labelsOn = true;
  let bedsGlobalOn = true;

  // Export der Flächen + Standorte als GeoJSON (WGS84/CRS84) – Standard-Format
  // für QGIS, FMIS und (via Shapefile) Traktor-Terminals (ISOBUS/ISO-XML-Welt).
  function exportGeoJson(): void {
    const features: any[] = [];
    fields.forEach((fl) => {
      const ll = fl.latlngs || [];
      if (ll.length < 3) return;
      const ring = ll.map((a: any) => [Number(a[1]), Number(a[0])]); // [lng,lat]
      const f0 = ring[0];
      const fl_ = ring[ring.length - 1];
      if (f0[0] !== fl_[0] || f0[1] !== fl_[1]) ring.push([f0[0], f0[1]]); // Ring schließen
      features.push({
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [ring] },
        properties: {
          name: fl.name || "",
          kultur: fl.kultur || null,
          eppoCode: fl.eppoCode || null,
          flaeche_m2: Math.round(fl.result?.areaM2 || 0),
          flaeche_ha: Number(((fl.result?.areaM2 || 0) / 10000).toFixed(4)),
          beete: fl.result?.beds?.length || 0,
          beetmeter_m: Math.round(fl.result?.bedMeters || 0),
          pflanzen: fl.result?.plants || 0,
          bettbreite_m: fl.params?.bedW ?? null,
          wegbreite_m: fl.params?.pathW ?? null,
          reihenabstand_m: fl.params?.rowSp ?? null,
          pflanzabstand_m: fl.params?.inRowSp ?? null,
          ausrichtung_grad: fl.params?.angle ?? null,
        },
      });
    });
    const points = extractSliceItems<any>(services.state.getState().gps?.points) || [];
    points.forEach((p: any) => {
      const lat = Number(p.latitude);
      const lng = Number(p.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      const areaQm = Number(p.nutzflaecheQm);
      features.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: [lng, lat] },
        properties: {
          name: p.name || "Standort",
          typ: "standort",
          flaeche_m2: Number.isFinite(areaQm) && areaQm > 0 ? Math.round(areaQm) : null,
          kind: p.kind || null,
        },
      });
    });
    if (!features.length) {
      toast.warning("Keine Flächen oder Standorte zum Exportieren.");
      return;
    }
    const fc = {
      type: "FeatureCollection",
      name: "PSM Acker-Planer",
      crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      features,
    };
    try {
      const blob = new Blob([JSON.stringify(fc, null, 2)], { type: "application/geo+json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "acker-flaechen.geojson";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success(`${features.length} Objekt(e) als GeoJSON exportiert.`);
    } catch (err) {
      console.error("[Acker] GeoJSON-Export fehlgeschlagen", err);
      toast.error("Export fehlgeschlagen.");
    }
  }

  // Vorhandene Freiland-Standorte (aus GPS-Punkten: Name + Koordinaten + Fläche)
  // als Marker auf der Karte anzeigen.
  function renderStandorte(): void {
    if (!L || !standorteLayer) return;
    standorteLayer.clearLayers();
    const points = extractSliceItems<any>(services.state.getState().gps?.points) || [];
    points.forEach((p: any) => {
      const lat = Number(p.latitude);
      const lng = Number(p.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      const areaQm = Number(p.nutzflaecheQm);
      const areaTxt = Number.isFinite(areaQm) && areaQm > 0 ? `${Math.round(areaQm)} m²` : "";
      const name = p.name || "Standort";
      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: "acker-standort",
          html: '<span class="acker-standort-dot"></span>',
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        }),
      });
      marker.bindTooltip(
        `${escapeHtml(name)}${areaTxt ? " · " + areaTxt : ""}`,
        { permanent: true, direction: "top", className: "acker-standort-label", offset: [0, -9] }
      );
      const popupRows = [
        `<b>${escapeHtml(name)}</b>`,
        areaTxt ? `Fläche: ${areaTxt}` : "",
        p.kind ? escapeHtml(String(p.kind)) : "",
      ].filter(Boolean).join("<br>");
      marker.bindPopup(popupRows);
      standorteLayer.addLayer(marker);
    });
  }

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
  // Outline-Stil: im Detail-Modus liefern die Beete die Füllung (Outline fast
  // transparent); im Übersichts-Modus (rausgezoomt) füllt die Outline selbst,
  // damit kleine Flächen nicht zu 110 winzigen Polygonen zerfallen.
  const styleOutline = (fl: any, sel: boolean, detail: boolean) => ({
    color: fl.color,
    weight: sel ? 3 : 2,
    fillColor: fl.color,
    fillOpacity: detail ? (sel ? 0.04 : 0.1) : sel ? 0.32 : 0.22,
    dashArray: sel ? null : detail ? "5 5" : null,
  });
  // Beet-Stil: alternierende Deckkraft = Reihen-Optik (kein gleichförmiges
  // Rauschen); ausgewählte Fläche kräftig + weiße Trennfuge, andere dezent.
  const bedStyle = (fl: any, idx: number, sel: boolean) => {
    const alt = idx % 2 === 0;
    if (sel)
      return { color: "#ffffff", weight: 0.7, opacity: 0.85, fillColor: fl.color, fillOpacity: alt ? 0.78 : 0.52 };
    return { color: fl.color, weight: 0, fillColor: fl.color, fillOpacity: alt ? 0.5 : 0.32 };
  };

  // Soll diese Fläche ihre einzelnen Beete zeichnen? Nur wenn global aktiv,
  // nicht für diese Fläche ausgeblendet, und Beete breit genug am Bildschirm.
  function bedsVisibleFor(fl: any): boolean {
    if (!bedsGlobalOn || fl.bedsHidden) return false;
    const bedPx = (fl.params?.bedW || 0) / metersPerPixel();
    return bedPx >= 2.2;
  }

  function clearFieldLayers(fl: any) {
    if (fl.outline) { map.removeLayer(fl.outline); fl.outline = null; }
    if (fl.bedsLayer) { map.removeLayer(fl.bedsLayer); fl.bedsLayer = null; }
    if (fl.label && labelLayer) { labelLayer.removeLayer(fl.label); fl.label = null; }
    clearHandles(fl);
  }

  function drawField(fl: any) {
    const wasEditing = !!fl.editing;
    if (fl.outline) map.removeLayer(fl.outline);
    if (fl.bedsLayer) { map.removeLayer(fl.bedsLayer); fl.bedsLayer = null; }
    if (fl.label && labelLayer) labelLayer.removeLayer(fl.label);
    clearHandles(fl);
    const sel = fl._key === selId;
    const detail = bedsVisibleFor(fl);
    fl._lastDetail = detail;

    if (detail) {
      fl.bedsLayer = L.layerGroup();
      (fl.result?.beds || []).forEach((b: any, i: number) => {
        const layer = L.geoJSON(b.geo, { style: bedStyle(fl, i, sel), bubblingMouseEvents: false });
        layer.bindTooltip(
          `Beet ${i + 1} · ${nf(b.lenM, 1)} m · ${b.rows}×${nf(b.perRow)} = ${nf(b.plants)} Pfl.`,
          { sticky: true }
        );
        layer.on("click", () => select(fl._key));
        layer.on("contextmenu", (e: any) => openFieldMenu(fl, e, i + 1));
        layer.addTo(fl.bedsLayer);
      });
      fl.bedsLayer.addTo(map);
    }

    fl.outline = L.polygon(fl.latlngs, { ...styleOutline(fl, sel, detail), bubblingMouseEvents: false }).addTo(map);
    fl.outline.on("click", () => select(fl._key));
    fl.outline.on("dblclick", () => zoomToField(fl));
    fl.outline.on("contextmenu", (e: any) => openFieldMenu(fl, e));

    renderLabel(fl, sel);
    if (sel || wasEditing) buildHandles(fl);
  }

  function renderLabel(fl: any, sel: boolean) {
    if (!labelsOn || !labelLayer || !fl.outline) return;
    let center: any;
    try { center = fl.outline.getBounds().getCenter(); } catch { return; }
    const plants = fl.result?.plants || 0;
    const html =
      `<div class="acker-flabel${sel ? " sel" : ""}" style="--fc:${fl.color}">` +
      `<b>${escapeHtml(fl.name || "")}</b><i>${nf(plants)} Pfl.</i></div>`;
    fl.label = L.marker(center, {
      interactive: false,
      keyboard: false,
      icon: L.divIcon({ className: "acker-flabel-wrap", html, iconSize: [0, 0] }),
    });
    labelLayer.addLayer(fl.label);
  }

  function buildHandles(fl: any) {
    clearHandles(fl);
    fl.handles = fl.latlngs.map((ll: any, i: number) => {
      const m = L.marker(ll, { draggable: true, icon: L.divIcon({ className: "acker-vhandle" }) }).addTo(map);
      m.on("drag", (e: any) => { fl.latlngs[i] = [e.target.getLatLng().lat, e.target.getLatLng().lng]; fl.outline.setLatLngs(fl.latlngs); });
      m.on("dragend", () => recompute(fl));
      m.on("contextmenu", (e: any) => openVertexMenu(fl, i, e));
      return m;
    });
    fl.editing = true;
  }
  function clearHandles(fl: any) { (fl.handles || []).forEach((m: any) => map.removeLayer(m)); fl.handles = []; fl.editing = false; }

  function redrawAll() { fields.forEach((fl) => drawField(fl)); }
  // Bei Zoomwechsel nur die Flächen neu zeichnen, deren Detail-Modus
  // (Beete sichtbar?) tatsächlich kippt – spart das Rebuild aller Layer.
  function lodRedraw() {
    fields.forEach((fl) => { if (bedsVisibleFor(fl) !== fl._lastDetail) drawField(fl); });
  }

  // Leichtes Re-Styling ohne Layer-Neuaufbau (für Live-Farbwahl beim Ziehen).
  function liveRecolor(fl: any, color: string) {
    fl.color = color;
    try { fl.outline?.setStyle({ color, fillColor: color }); } catch {}
    if (fl.bedsLayer) { try { fl.bedsLayer.eachLayer((l: any) => l.setStyle && l.setStyle({ fillColor: color })); } catch {} }
    try {
      const lbl = fl.label?.getElement?.()?.querySelector?.(".acker-flabel");
      if (lbl) lbl.style.setProperty("--fc", color);
    } catch {}
    const sw = listEl?.querySelector(`.acker-field.sel .acker-swatch`) as HTMLElement | null;
    if (sw) sw.style.background = color;
  }

  function zoomToField(fl: any) {
    if (!fl.latlngs?.length) return;
    try { map.fitBounds(L.polygon(fl.latlngs).getBounds(), { maxZoom: 20, padding: [40, 40] }); } catch {}
  }
  function fitAll() {
    const withGeo = fields.filter((f) => f.latlngs?.length >= 3);
    if (!withGeo.length) { toast.info("Keine Flächen vorhanden."); return; }
    try {
      let b = L.polygon(withGeo[0].latlngs).getBounds();
      withGeo.slice(1).forEach((f) => { b = b.extend(L.polygon(f.latlngs).getBounds()); });
      map.fitBounds(b, { maxZoom: 19, padding: [40, 40] });
    } catch {}
  }

  function recompute(fl: any) {
    fl.result = computeBeds(fl.latlngs, fl.params);
    drawField(fl);
    renderPanel();
    persistField(fl);
  }

  // ---------- Kontextmenü (Rechtsklick) ----------
  let ctxEl: HTMLElement | null = null;
  const closeCtx = () => {
    if (!ctxEl) return;
    ctxEl.remove();
    ctxEl = null;
    document.removeEventListener("pointerdown", onCtxOutside, true);
    document.removeEventListener("keydown", onCtxKey, true);
  };
  const onCtxOutside = (e: any) => { if (ctxEl && !ctxEl.contains(e.target)) closeCtx(); };
  const onCtxKey = (e: any) => { if (e.key === "Escape") closeCtx(); };

  // Submenü so positionieren, dass es nicht aus dem Viewport läuft (nach links
  // klappen wenn rechts kein Platz; nach oben schieben wenn unten kein Platz).
  function positionSubmenu(row: HTMLElement, sub: HTMLElement) {
    sub.style.left = ""; sub.style.right = ""; sub.style.top = "";
    const rr = row.getBoundingClientRect();
    const sr = sub.getBoundingClientRect();
    const w = sr.width || 210, h = sr.height || 260;
    if (rr.right + 3 + w > window.innerWidth - 8) { sub.style.left = "auto"; sub.style.right = "calc(100% + 3px)"; }
    let top = -5;
    if (rr.top + top + h > window.innerHeight - 8) top = Math.min(-5, window.innerHeight - 8 - h - rr.top);
    if (rr.top + top < 8) top = 8 - rr.top;
    sub.style.top = top + "px";
  }

  function buildCtxItems(parent: HTMLElement, items: any[]) {
    items.forEach((it) => {
      if (!it) return;
      if (it.sep) { const s = document.createElement("div"); s.className = "acker-ctx-sep"; parent.appendChild(s); return; }
      if (it.type === "swatchGrid") {
        const grid = document.createElement("div"); grid.className = "acker-ctx-swatches";
        (it.colors as string[]).forEach((c) => {
          const b = document.createElement("button");
          b.type = "button"; b.className = "acker-sw" + (c === it.current ? " on" : "");
          b.style.background = c; b.title = c;
          b.addEventListener("click", (e) => { e.stopPropagation(); closeCtx(); it.onPick(c); });
          grid.appendChild(b);
        });
        const custom = document.createElement("label"); custom.className = "acker-sw-custom";
        custom.innerHTML = `<i class="bi bi-eyedropper"></i><input type="color" value="${it.current || "#3b82f6"}">`;
        const inp = custom.querySelector("input") as HTMLInputElement;
        inp.addEventListener("input", (e: any) => (it.onLive || it.onPick)(e.target.value));
        inp.addEventListener("change", (e: any) => { it.onPick(e.target.value); closeCtx(); });
        grid.appendChild(custom);
        parent.appendChild(grid);
        return;
      }
      const row = document.createElement("button");
      row.type = "button";
      row.className = "acker-ctx-item" + (it.danger ? " danger" : "") + (it.submenu ? " has-sub" : "") + (it.disabled ? " disabled" : "");
      row.innerHTML =
        `<span class="ic">${it.icon || ""}</span><span class="lb">${escapeHtml(it.label)}</span>` +
        (it.right ? `<span class="rt">${escapeHtml(it.right)}</span>` : "") +
        (it.submenu ? `<span class="ch"><i class="bi bi-chevron-right"></i></span>` : "");
      if (it.submenu) {
        const sub = document.createElement("div"); sub.className = "acker-ctx-sub";
        buildCtxItems(sub, it.submenu);
        row.appendChild(sub);
        row.addEventListener("pointerenter", () => positionSubmenu(row, sub));
      } else if (!it.disabled) {
        row.addEventListener("click", (e) => { e.stopPropagation(); if (it.keepOpen) { it.action?.(); } else { closeCtx(); it.action?.(); } });
      }
      parent.appendChild(row);
    });
  }

  function openCtx(clientX: number, clientY: number, items: any[], title?: string) {
    closeCtx();
    ctxEl = document.createElement("div");
    ctxEl.className = "acker-ctx";
    if (title) { const h = document.createElement("div"); h.className = "acker-ctx-title"; h.textContent = title; ctxEl.appendChild(h); }
    buildCtxItems(ctxEl, items);
    document.body.appendChild(ctxEl);
    const r = ctxEl.getBoundingClientRect();
    let x = clientX, y = clientY;
    if (x + r.width > window.innerWidth - 8) x = Math.max(8, window.innerWidth - r.width - 8);
    if (y + r.height > window.innerHeight - 8) y = Math.max(8, window.innerHeight - r.height - 8);
    ctxEl.style.left = x + "px"; ctxEl.style.top = y + "px";
    setTimeout(() => {
      document.addEventListener("pointerdown", onCtxOutside, true);
      document.addEventListener("keydown", onCtxKey, true);
    }, 0);
  }

  const evXY = (e: any) => {
    const oe = e.originalEvent || e;
    if (oe) L.DomEvent.preventDefault?.(oe);
    if (e.originalEvent) L.DomEvent.stop?.(e);
    return { x: oe.clientX, y: oe.clientY };
  };

  // ---------- Kontextmenü-Aktionen ----------
  function rotateField(fl: any, delta: number) {
    fl.params.angle = ((Math.round(fl.params.angle + delta) % 180) + 180) % 180;
    recompute(fl);
    toast.info(`Beete-Ausrichtung: ${fl.params.angle}°`);
  }
  function setColor(fl: any, color: string) { fl.color = color; drawField(fl); renderPanel(); persistField(fl); }
  function setKultur(fl: any, kultur: string | null) {
    fl.kultur = kultur || null;
    fl.eppoCode = kulturen.find((x) => x.kultur === fl.kultur)?.eppoCode || null;
    drawField(fl); renderPanel(); persistField(fl);
    toast.success(kultur ? `Kultur: ${kultur}` : "Kultur entfernt.");
  }
  function toggleFieldBeds(fl: any) { fl.bedsHidden = !fl.bedsHidden; drawField(fl); toast.info(fl.bedsHidden ? "Beete ausgeblendet." : "Beete eingeblendet."); }
  function focusRename(fl: any) {
    select(fl._key);
    setTimeout(() => {
      const inp = listEl?.querySelector(".acker-field.sel .acker-name") as HTMLInputElement | null;
      if (inp) { inp.focus(); inp.select(); }
    }, 30);
  }
  function duplicateField(src: any) {
    const d = metersPerPixel() * 18; // ~18px Versatz, damit die Kopie sichtbar daneben liegt
    const dLat = (d / 111320);
    const fl: any = {
      _key: "new-" + (++keySeq), id: null,
      name: (src.name || "Fläche") + " (Kopie)",
      kultur: src.kultur, eppoCode: src.eppoCode, standortId: src.standortId,
      color: palette[(palette.indexOf(src.color) + 1) % palette.length],
      latlngs: src.latlngs.map((p: any) => [p[0] + dLat, p[1] + dLat]),
      params: { ...src.params },
      outline: null, bedsLayer: null, label: null, handles: [],
      result: { areaM2: 0, beds: [], bedMeters: 0, plants: 0 },
    };
    fields.push(fl); selId = fl._key;
    recompute(fl);
    persistField(fl, true);
    toast.success("Fläche dupliziert.");
  }
  function exportSingle(fl: any) {
    const ll = fl.latlngs || [];
    if (ll.length < 3) { toast.warning("Fläche hat keine Geometrie."); return; }
    const ring = ll.map((a: any) => [Number(a[1]), Number(a[0])]);
    if (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1]) ring.push([ring[0][0], ring[0][1]]);
    const fc = {
      type: "FeatureCollection",
      crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      features: [{
        type: "Feature", geometry: { type: "Polygon", coordinates: [ring] },
        properties: {
          name: fl.name || "", kultur: fl.kultur || null, eppoCode: fl.eppoCode || null,
          flaeche_m2: Math.round(fl.result?.areaM2 || 0),
          beete: fl.result?.beds?.length || 0, beetmeter_m: Math.round(fl.result?.bedMeters || 0),
          pflanzen: fl.result?.plants || 0,
        },
      }],
    };
    try {
      const blob = new Blob([JSON.stringify(fc, null, 2)], { type: "application/geo+json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${(fl.name || "flaeche").replace(/[^\w\-]+/g, "_")}.geojson`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success("Fläche als GeoJSON exportiert.");
    } catch { toast.error("Export fehlgeschlagen."); }
  }
  async function copyStats(fl: any) {
    const r = fl.result || {};
    const txt = [
      `Fläche: ${fl.name || ""}`,
      fl.kultur ? `Kultur: ${fl.kultur}` : "",
      `Größe: ${nf(r.areaM2 || 0)} m² (${nf((r.areaM2 || 0) / 10000, 3)} ha)`,
      `Beete: ${nf(r.beds?.length || 0)}`,
      `Beetmeter: ${nf(r.bedMeters || 0)} m`,
      `Pflanzen: ${nf(r.plants || 0)}`,
    ].filter(Boolean).join("\n");
    try { await navigator.clipboard.writeText(txt); toast.success("Werte kopiert."); }
    catch { toast.warning("Kopieren nicht möglich."); }
  }

  const colorSubmenu = (fl: any) => ({
    icon: '<i class="bi bi-palette"></i>', label: "Farbe", submenu: [
      { type: "swatchGrid", colors: palette, current: fl.color, onPick: (c: string) => setColor(fl, c), onLive: (c: string) => liveRecolor(fl, c) },
    ],
  });
  const kulturSubmenu = (fl: any) => ({
    icon: '<i class="bi bi-flower1"></i>', label: "Kultur zuweisen",
    submenu: [
      { icon: '<i class="bi bi-x"></i>', label: "– keine –", action: () => setKultur(fl, null) },
      ...(kulturen.length ? [{ sep: true }] : []),
      ...kulturen.map((k) => ({
        icon: k.kultur === fl.kultur ? '<i class="bi bi-check2"></i>' : "",
        label: `${k.kultur}${k.anbau ? " (" + k.anbau + ")" : ""}`,
        action: () => setKultur(fl, k.kultur),
      })),
    ],
  });

  function openFieldMenu(fl: any, e: any, bedNo?: number) {
    select(fl._key);
    const { x, y } = evXY(e);
    const editing = !!fl.editing;
    openCtx(x, y, [
      { icon: '<i class="bi bi-pencil"></i>', label: "Umbenennen", action: () => focusRename(fl) },
      kulturSubmenu(fl),
      colorSubmenu(fl),
      { sep: true },
      { icon: '<i class="bi bi-arrow-clockwise"></i>', label: "Beete drehen +15°", keepOpen: true, action: () => rotateField(fl, 15) },
      { icon: '<i class="bi bi-arrow-counterclockwise"></i>', label: "Beete drehen −15°", keepOpen: true, action: () => rotateField(fl, -15) },
      { icon: '<i class="bi bi-grid-3x3-gap"></i>', label: fl.bedsHidden ? "Beete einblenden" : "Beete ausblenden", action: () => toggleFieldBeds(fl) },
      { icon: '<i class="bi bi-bounding-box-circles"></i>', label: editing ? "Eckpunkte fertig" : "Eckpunkte bearbeiten", action: () => { if (editing) clearHandles(fl); else buildHandles(fl); } },
      { sep: true },
      { icon: '<i class="bi bi-copy"></i>', label: "Duplizieren", action: () => duplicateField(fl) },
      { icon: '<i class="bi bi-zoom-in"></i>', label: "Auf Fläche zoomen", action: () => zoomToField(fl) },
      { icon: '<i class="bi bi-clipboard-data"></i>', label: "Werte kopieren", action: () => copyStats(fl) },
      { icon: '<i class="bi bi-download"></i>', label: "Als GeoJSON exportieren", action: () => exportSingle(fl) },
      { sep: true },
      { icon: '<i class="bi bi-trash"></i>', label: "Löschen", danger: true, action: () => removeField(fl._key) },
    ], bedNo ? `${fl.name || "Fläche"} · Beet ${bedNo}` : (fl.name || "Fläche"));
  }

  function openVertexMenu(fl: any, idx: number, e: any) {
    const { x, y } = evXY(e);
    openCtx(x, y, [
      { icon: '<i class="bi bi-node-minus"></i>', label: "Eckpunkt löschen", disabled: fl.latlngs.length <= 3, action: () => {
          if (fl.latlngs.length <= 3) return;
          fl.latlngs.splice(idx, 1); recompute(fl);
        } },
      { icon: '<i class="bi bi-check2"></i>', label: "Bearbeiten beenden", action: () => clearHandles(fl) },
    ], `Eckpunkt ${idx + 1}`);
  }

  function switchBasemap() {
    if (!baseLayers.sat || !baseLayers.osm) return;
    if (map.hasLayer(baseLayers.sat)) { map.removeLayer(baseLayers.sat); baseLayers.osm.addTo(map); toast.info("Karte: OSM"); }
    else { map.removeLayer(baseLayers.osm); baseLayers.sat.addTo(map); toast.info("Karte: Satellit"); }
  }

  function openMapMenu(e: any) {
    const ll = e.latlng;
    const { x, y } = evXY(e);
    openCtx(x, y, [
      { icon: '<i class="bi bi-pencil-square"></i>', label: "Neue Fläche hier zeichnen", action: () => { setDraw(true); onMapClick({ latlng: ll }); } },
      { icon: '<i class="bi bi-crosshair"></i>', label: "Hierhin zentrieren", action: () => map.panTo(ll) },
      { sep: true },
      { icon: '<i class="bi bi-arrows-fullscreen"></i>', label: "Alle Flächen anzeigen", disabled: !fields.some((f) => f.latlngs?.length >= 3), action: fitAll },
      { icon: '<i class="bi bi-layers"></i>', label: "Kartentyp wechseln (Satellit/OSM)", action: switchBasemap },
      { sep: true },
      { icon: '<i class="bi bi-geo-alt"></i>', label: "Koordinaten kopieren", action: async () => {
          try { await navigator.clipboard.writeText(`${ll.lat.toFixed(6)}, ${ll.lng.toFixed(6)}`); toast.success("Koordinaten kopiert."); }
          catch { toast.warning("Kopieren nicht möglich."); }
        } },
    ], "Karte");
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
            <label class="acker-colorbtn" title="Farbe wählen"><input type="color" data-act="color" value="${fl.color}"><i class="bi bi-palette"></i></label>
            <button class="btn btn-sm acker-abtn" data-act="zoom" title="Auf Fläche zoomen"><i class="bi bi-zoom-in"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="dup" title="Duplizieren"><i class="bi bi-copy"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="rot" title="Beete drehen +15°"><i class="bi bi-arrow-clockwise"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-mouse2"></i> Rechtsklick auf die Fläche für mehr Aktionen</div>
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
      d.querySelector('[data-act="zoom"]')!.addEventListener("click", () => zoomToField(fl));
      d.querySelector('[data-act="dup"]')!.addEventListener("click", () => duplicateField(fl));
      d.querySelector('[data-act="rot"]')!.addEventListener("click", () => rotateField(fl, 15));
      const colorInp = d.querySelector('[data-act="color"]') as HTMLInputElement;
      colorInp.addEventListener("input", (e: any) => liveRecolor(fl, e.target.value));
      colorInp.addEventListener("change", (e: any) => setColor(fl, e.target.value));
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
    clearFieldLayers(fl);
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
    map = L.map(mapEl, { doubleClickZoom: false, zoomControl: true, attributionControl: true }).setView([47.818, 8.976], 17);
    const sat = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 21, maxNativeZoom: 19, attribution: "Tiles © Esri" }).addTo(map);
    const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" });
    baseLayers = { sat, osm };
    // Vorhandene Freiland-Standorte (Name + Koordinaten + Fläche) als Marker-Layer
    standorteLayer = L.layerGroup();
    renderStandorte();
    standorteLayer.addTo(map);
    // Flächen-Beschriftungen (Name + Pflanzenzahl am Zentroid)
    labelLayer = L.layerGroup().addTo(map);
    L.control.layers(
      { Satellit: sat, "Karte (OSM)": osm },
      { "Freiland-Standorte": standorteLayer },
      { position: "topright", collapsed: true }
    ).addTo(map);

    // Floating-Toolbar: alle anzeigen · Beschriftung · Beete-Detail
    const Toolbar = L.Control.extend({
      options: { position: "topleft" },
      onAdd() {
        const div = L.DomUtil.create("div", "leaflet-bar acker-toolbar");
        div.innerHTML =
          `<a href="#" data-tb="fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></a>` +
          `<a href="#" data-tb="labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></a>` +
          `<a href="#" data-tb="beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></a>`;
        L.DomEvent.disableClickPropagation(div);
        const hook = (sel: string, fn: () => void) => {
          (div.querySelector(sel) as HTMLElement).addEventListener("click", (e) => { e.preventDefault(); fn(); });
        };
        hook('[data-tb="fit"]', fitAll);
        hook('[data-tb="labels"]', () => {
          labelsOn = !labelsOn;
          (div.querySelector('[data-tb="labels"]') as HTMLElement).classList.toggle("on", labelsOn);
          redrawAll();
        });
        hook('[data-tb="beds"]', () => {
          bedsGlobalOn = !bedsGlobalOn;
          (div.querySelector('[data-tb="beds"]') as HTMLElement).classList.toggle("on", bedsGlobalOn);
          redrawAll();
        });
        return div;
      },
    });
    map.addControl(new Toolbar());

    map.on("click", onMapClick);
    map.on("contextmenu", (e: any) => { if (!drawing) openMapMenu(e); });
    // LOD: bei Zoomwechsel nur betroffene Flächen neu zeichnen (Übersicht ↔ Detail)
    map.on("zoomend", lodRedraw);

    el('[data-role="acker-draw"]')!.addEventListener("click", () => setDraw(true));
    el('[data-role="acker-export"]')?.addEventListener("click", exportGeoJson);
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
    .acker-standort-dot{display:block;width:14px;height:14px;border-radius:50%;background:#f59e0b;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
    .acker-standort-label{background:rgba(255,255,255,.92);color:#1f2937;border:1px solid #d97706;border-radius:6px;padding:1px 6px;font-size:11px;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.25)}
    .acker-standort-label::before{display:none}
    /* Flächen-Beschriftung (Zentroid) */
    .acker-flabel-wrap{pointer-events:none!important}
    .acker-flabel{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:0;white-space:nowrap;padding:3px 9px;border-radius:9px;background:rgba(255,255,255,.93);border:1.5px solid var(--fc,#3b82f6);box-shadow:0 1px 5px rgba(0,0,0,.28);line-height:1.15}
    .acker-flabel b{font-weight:700;font-size:12px;color:#1f2937}
    .acker-flabel i{font-style:normal;color:#15803d;font-weight:600;font-size:10.5px}
    .acker-flabel.sel{box-shadow:0 2px 9px rgba(0,0,0,.34);transform:translate(-50%,-50%) scale(1.05)}
    /* Floating-Toolbar */
    .acker-toolbar a{display:flex!important;align-items:center;justify-content:center;font-size:15px;color:#334155;background:#fff;width:30px;height:30px;line-height:30px}
    .acker-toolbar a.on{color:#15803d;background:#dcfce7}
    .acker-toolbar a:hover{background:#eef2f6}
    .acker-toolbar a.on:hover{background:#bbf7d0}
    /* Panel-Aktionen */
    .acker-actions{display:flex;align-items:center;gap:6px;margin-top:10px}
    .acker-colorbtn{position:relative;width:30px;height:30px;border-radius:7px;border:1px solid var(--border-1);display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;flex:none}
    .acker-colorbtn input{position:absolute;inset:0;opacity:0;cursor:pointer}
    .acker-colorbtn i{font-size:14px;color:var(--text-muted);pointer-events:none}
    .acker-abtn{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--border-1);border-radius:7px;background:var(--surface-1);color:var(--text-muted);padding:0;font-size:14px;flex:none}
    .acker-abtn:hover{background:var(--surface-3);color:var(--text)}
    .acker-abtn.danger{color:#dc2626;border-color:rgba(220,38,38,.3)}
    .acker-abtn.danger:hover{background:var(--danger-subtle,rgba(220,38,38,.12))}
    .acker-hint{margin-top:8px;font-size:10.5px;color:var(--text-dim);display:flex;align-items:center;gap:5px}
    /* Rechtsklick-Kontextmenü */
    .acker-ctx{position:fixed;z-index:12000;min-width:236px;max-width:300px;background:var(--surface-1,#fff);border:1px solid var(--border-1,#d3dce4);border-radius:11px;box-shadow:0 12px 34px rgba(15,23,42,.22);padding:5px;font-size:13px;color:var(--text,#152230);user-select:none}
    .acker-ctx-title{font-size:11px;font-weight:700;color:var(--text-dim,#687889);padding:5px 9px 7px;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .acker-ctx-sep{height:1px;background:var(--border-1,#d3dce4);margin:4px 2px}
    .acker-ctx-item{display:flex;align-items:center;gap:9px;width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:7px 9px;border-radius:7px;cursor:pointer;position:relative;font-size:13px;line-height:1.2}
    .acker-ctx-item:hover{background:var(--surface-3,#e4ebf1)}
    .acker-ctx-item .ic{width:18px;text-align:center;color:var(--text-muted,#45566a);flex:none}
    .acker-ctx-item .lb{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .acker-ctx-item .ch{color:var(--text-dim);margin-left:auto;font-size:11px}
    .acker-ctx-item.danger{color:#dc2626}
    .acker-ctx-item.danger .ic{color:#dc2626}
    .acker-ctx-item.disabled{opacity:.38;cursor:default}
    .acker-ctx-item.disabled:hover{background:transparent}
    .acker-ctx-sub{display:none;position:absolute;left:calc(100% + 3px);top:-5px;min-width:200px;max-height:62vh;overflow-y:auto;overflow-x:hidden;background:var(--surface-1,#fff);border:1px solid var(--border-1);border-radius:11px;box-shadow:0 12px 34px rgba(15,23,42,.22);padding:5px}
    .acker-ctx-item.has-sub:hover>.acker-ctx-sub,.acker-ctx-sub:hover{display:block}
    .acker-ctx-swatches{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:7px 9px}
    .acker-sw{width:26px;height:26px;border-radius:7px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0}
    .acker-sw.on{box-shadow:0 0 0 2px var(--text)}
    .acker-sw-custom{grid-column:1 / -1;display:flex;align-items:center;justify-content:center;gap:6px;border:1px dashed var(--border-2,#b3c1ce);border-radius:7px;padding:5px;cursor:pointer;font-size:12px;color:var(--text-muted)}
    .acker-sw-custom input{width:24px;height:24px;border:0;background:none;padding:0;cursor:pointer}
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
          <div class="acker-export-box" style="margin:12px 0">
            <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-export" style="width:100%">
              <i class="bi bi-geo me-1"></i>Als GeoJSON exportieren
            </button>
            <div style="font-size:11px;color:var(--text-dim);margin-top:5px;line-height:1.35">Flächen + Standorte (WGS84) für QGIS / FMIS / Traktor-Terminals.</div>
          </div>
          <div data-role="acker-list"></div>
          <div class="acker-empty" data-role="acker-empty">Noch keine Fläche.<br>Zum Acker navigieren, dann <b>Neue Fläche zeichnen</b>.</div>
        </div>
      </aside>
      <div class="acker-map" data-role="acker-map"></div>
    </div>
  </section>`;
}
