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
  listAnbau,
  listMassnahmen,
  persistSqliteDatabaseFile,
} from "@scripts/core/storage/sqlite";
import { getActiveDriverKey } from "@scripts/core/storage";
import { extractSliceItems, updateSlice } from "@scripts/core/state";
import { unitCrops, cropColor } from "@scripts/features/kultur/model";

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
  // Aktuelle Kultur-Belegung + Maßnahmen je Fläche (aus der zentralen DB /
  // Kulturführung) – nur Anzeige auf der Karte. Modular: jede neue Funktion liest
  // dieselben zentralen Tabellen über (flaeche_typ, flaeche_id).
  let anbauRows: any[] = [];
  let massRows: any[] = [];
  const anbauForUnit = (typ: string, id: any) => anbauRows.filter((a) => a.flaecheTyp === typ && String(a.flaecheId) === String(id));
  const massForUnit = (typ: string, id: any) => massRows.filter((m) => m.flaecheTyp === typ && String(m.flaecheId) === String(id));
  // Welche Kultur „wächst" gerade auf dieser Fläche? Bevorzugt die echte,
  // datierte Belegung aus der Kulturführung; sonst das einfache Kultur-Etikett.
  function fieldCrop(fl: any): { name: string; color: string | null } | null {
    const cur = unitCrops(anbauForUnit("acker", fl.id)).current;
    if (cur && cur.kultur) return { name: cur.kultur, color: cropColor(cur) };
    if (fl.kultur) return { name: fl.kultur, color: null };
    return null;
  }

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
      // Klick auf ein Gewächshaus → dieselbe Info-Karte wie bei Flächen.
      marker.on("click", () => showInfoCard({
        typ: "haus", id: p.id, name,
        area: Number.isFinite(areaQm) && areaQm > 0 ? areaQm : 0,
        latlng: [lat, lng],
      }));
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
  // Outline-Stil: im Detail-Modus liefern die Beete die Füllung, der Umriss ist
  // OHNE Füllung – so zeigen die Weg-Lücken zwischen den Beeten den Boden
  // (Satellit) und man unterscheidet klar: farbig = Beet, Lücke = Weg.
  // Im Übersichts-Modus (rausgezoomt) füllt der Umriss selbst (eine ruhige Fläche).
  const styleOutline = (fl: any, sel: boolean, detail: boolean) => ({
    color: fl.color,
    weight: sel ? 3.5 : 2.5,
    fillColor: fl.color,
    fillOpacity: detail ? 0 : sel ? 0.3 : 0.18,
    dashArray: null,
  });
  // Beet-Stil: SOLIDE, gleichmäßige Füllung in Flächenfarbe + dünne helle
  // Trennkante. KEINE alternierende Deckkraft mehr (das sah aus wie Rauschen).
  // Die Weg-Lücken bleiben offen → klar: gefüllt = Beet, Lücke dazwischen = Weg.
  const bedStyle = (fl: any, _idx: number, sel: boolean) => ({
    color: "#ffffff",
    weight: sel ? 1 : 0.7,
    opacity: 0.9,
    fillColor: fl.color,
    fillOpacity: sel ? 0.9 : 0.78,
  });

  // Soll diese Fläche ihre einzelnen Beete zeichnen? Nur wenn global aktiv,
  // nicht ausgeblendet, UND Beet und Weg am Bildschirm klar sichtbar sind –
  // sonst verschwimmt es zum Streifenmuster und wir zeigen die Übersichts-Füllung.
  function bedsVisibleFor(fl: any): boolean {
    if (!bedsGlobalOn || fl.bedsHidden) return false;
    const mpp = metersPerPixel();
    const bedPx = (fl.params?.bedW || 0) / mpp;
    const pathPx = (fl.params?.pathW || 0) / mpp;
    const pathOk = (fl.params?.pathW || 0) <= 0.001 || pathPx >= 1.2;
    return bedPx >= 4 && pathOk;
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

    fl.outline = L.polygon(fl.latlngs, { ...styleOutline(fl, sel, detail), className: sel ? "acker-outline-grab" : "", bubblingMouseEvents: false }).addTo(map);
    fl.outline.on("click", () => { select(fl._key); showInfoCard({ typ: "acker", id: fl.id, name: fl.name, area: fl.result?.areaM2 || 0, fieldRef: fl }); });
    fl.outline.on("dblclick", () => zoomToField(fl));
    fl.outline.on("contextmenu", (e: any) => openFieldMenu(fl, e));
    fl.outline.on("mousedown", (e: any) => onFieldMouseDown(fl, e));

    renderLabel(fl, sel);
    if (sel || wasEditing) buildHandles(fl);
  }

  function renderLabel(fl: any, sel: boolean) {
    if (!labelsOn || !labelLayer || !fl.outline) return;
    let center: any;
    try { center = fl.outline.getBounds().getCenter(); } catch { return; }
    const plants = fl.result?.plants || 0;
    const crop = fieldCrop(fl);
    const cropHtml = crop
      ? `<em class="cr" style="--cc:${escapeHtml(crop.color || "#16a34a")}"><span class="dot"></span>${escapeHtml(crop.name)}</em>`
      : "";
    const html =
      `<div class="acker-flabel${sel ? " sel" : ""}" style="--fc:${fl.color}">` +
      `<b>${escapeHtml(fl.name || "")}</b>${cropHtml}<i>${nf(plants)} Pfl.</i></div>`;
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

  // Wechselt zum Kulturführung-Reiter und wählt dort diese Fläche vor.
  function openKultur(fl: any) {
    updateSlice("app", (app: any) => ({ ...app, activeSection: "kultur" }));
    if (fl?.id) {
      try {
        window.dispatchEvent(
          new CustomEvent("psm:openKultur", { detail: { typ: "acker", id: String(fl.id) } })
        );
      } catch {}
    } else {
      toast.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.");
    }
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
  // Beete parallel zur längsten Kante ausrichten (ein Klick statt Slider-Fummelei).
  // Beet-Peilung = 90° + angle → angle = Kanten-Peilung − 90° (empirisch geprüft).
  function alignBedsToField(fl: any) {
    const ll = fl.latlngs || [];
    if (ll.length < 2 || !turf) return;
    let bestLen = -1, bearing = 0;
    for (let i = 0; i < ll.length; i++) {
      const a = ll[i], b = ll[(i + 1) % ll.length];
      try {
        const pa = turf.point([a[1], a[0]]), pb = turf.point([b[1], b[0]]);
        const len = turf.distance(pa, pb);
        if (len > bestLen) { bestLen = len; bearing = turf.bearing(pa, pb); }
      } catch {}
    }
    fl.params.angle = ((Math.round(bearing - 90) % 180) + 180) % 180;
    recompute(fl);
    toast.success(`Beete an Fläche ausgerichtet (${fl.params.angle}°).`);
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
      { icon: '<i class="bi bi-clipboard2-pulse"></i>', label: "Kulturführung öffnen", action: () => openKultur(fl) },
      { icon: '<i class="bi bi-pencil"></i>', label: "Umbenennen", action: () => focusRename(fl) },
      kulturSubmenu(fl),
      colorSubmenu(fl),
      { sep: true },
      { icon: '<i class="bi bi-arrow-clockwise"></i>', label: "Beete drehen +15°", keepOpen: true, action: () => rotateField(fl, 15) },
      { icon: '<i class="bi bi-arrow-counterclockwise"></i>', label: "Beete drehen −15°", keepOpen: true, action: () => rotateField(fl, -15) },
      { icon: '<i class="bi bi-bounding-box"></i>', label: "Beete an Fläche ausrichten", action: () => alignBedsToField(fl) },
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

  // Kleine Kultur-Plakette für die Panel-Kopfzeile (was wächst hier?).
  function cropChipHtml(fl: any): string {
    const crop = fieldCrop(fl);
    if (!crop) return "";
    return `<span class="acker-cropchip" title="Kultur"><span class="dot" style="background:${escapeHtml(crop.color || "#94a3b8")}"></span>${escapeHtml(crop.name)}</span>`;
  }
  // Pflanzenzahl ist eine grobe SCHÄTZUNG → gerundet + „≈", damit sie nicht
  // fälschlich exakt wirkt.
  function estPlants(n: number): string {
    n = Math.round(n || 0);
    if (n <= 0) return "0";
    let step = 100;
    if (n >= 100000) step = 1000; else if (n >= 10000) step = 500;
    return "≈ " + nf(Math.round(n / step) * step);
  }
  // Kalibrierung: der Gärtner gibt die ECHTE Beetzahl ein → Bettbreite wird so
  // gesetzt, dass die App genauso viele Beete zeigt (Wegbreite bleibt). So muss
  // niemand rechnen. (Beete = Quer-Breite ÷ (Bettbreite+Wegbreite).)
  function calibrateBeds(fl: any, realCount: number) {
    const cur = fl.result?.beds?.length || 0;
    const pitch = fl.params.bedW + fl.params.pathW;
    if (cur < 1 || pitch <= 0) { toast.warning("Erst Beete berechnen lassen."); return; }
    const perp = cur * pitch; // ~Quer-Breite der Fläche in Metern
    const newBedW = +((perp / realCount) - fl.params.pathW).toFixed(2);
    if (newBedW < 0.1) { toast.warning("Wegbreite ist größer als der gewünschte Abstand – erst Wegbreite verkleinern."); return; }
    fl.params.bedW = newBedW;
    recompute(fl);
    toast.success(`Bettbreite ${nf(newBedW, 2)} m → ${fl.result?.beds?.length || 0} Beete.`);
  }

  // Gesamt-Summen aktualisieren, ohne das Panel neu zu bauen.
  function updateTotals() {
    if (!totalsEl) return;
    let A = 0, B = 0, M = 0, P = 0;
    fields.forEach((fl) => { A += fl.result?.areaM2 || 0; B += fl.result?.beds?.length || 0; M += fl.result?.bedMeters || 0; P += fl.result?.plants || 0; });
    const set = (sel: string, txt: string) => { const e = totalsEl!.querySelector(sel); if (e) e.textContent = txt; };
    set('[data-t="area"]', nf(A) + " m² · " + nf(A / 10000, 3) + " ha");
    set('[data-t="beds"]', nf(B));
    set('[data-t="meters"]', nf(M) + " m");
    set('[data-t="plants"]', estPlants(P));
  }
  // Nur die Ergebniszahlen EINER Fläche im Panel aktualisieren – ohne die ganze
  // Liste neu zu rendern (sonst verliert der Slider/das Eingabefeld beim Tippen
  // bzw. Ziehen den Fokus und „springt").
  function updateFieldResults(d: HTMLElement, fl: any) {
    const r = fl.result || {};
    const stat = d.querySelector(".acker-stat"); if (stat) stat.textContent = nf(r.plants || 0) + " Pfl.";
    const set = (k: string, txt: string) => { const e = d.querySelector(`[data-r="${k}"]`); if (e) e.textContent = txt; };
    set("area", nf(r.areaM2 || 0) + " m² · " + nf((r.areaM2 || 0) / 10000, 3) + " ha");
    set("pitch", nf(fl.params.bedW + fl.params.pathW, 2) + " m");
    set("beds", nf(r.beds?.length || 0));
    set("meters", nf(r.bedMeters || 0) + " m");
    set("plants", estPlants(r.plants || 0));
    updateTotals();
  }

  // ---------- Info-Karte auf der Karte (Klick auf Fläche/Gewächshaus) ----------
  const MON = ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
  function fmtD(iso: string): string {
    if (!iso) return "";
    const d = new Date(String(iso).slice(0, 10) + "T00:00:00");
    if (isNaN(d.getTime())) return "";
    return `${d.getDate()}. ${MON[d.getMonth()]}`;
  }
  function harvestTxt(c: any): string {
    const v = c?.ernteVon ? fmtD(c.ernteVon) : "";
    const b = c?.ernteBis || c?.ernteDatum ? fmtD(c.ernteBis || c.ernteDatum) : "";
    if (v && b) return `Ernte ${v}–${b}`;
    if (b) return `Ernte ~${b}`;
    if (v) return `Ernte ab ${v}`;
    return "";
  }
  function hideInfoCard() { const c = el('[data-role="acker-info"]'); if (c) c.style.display = "none"; }
  function showInfoCard(unit: any) {
    const card = el('[data-role="acker-info"]'); if (!card) return;
    const { current, next } = unitCrops(anbauForUnit(unit.typ, unit.id));
    const openTasks = massForUnit(unit.typ, unit.id).filter((m) => m.status === "geplant").length;
    const isHaus = unit.typ === "haus";
    const area = unit.area ? `${nf(unit.area)} m²` : "";
    const cc = current ? cropColor(current) : "#94a3b8";
    const cropBlock = current
      ? `<div class="ai-row"><span class="ai-dot" style="background:${escapeHtml(cc)}"></span>
           <div><div class="ai-crop">${escapeHtml(current.kultur || "Kultur")}</div>
           <div class="ai-sub">${escapeHtml([current.pflanzDatum ? "gepflanzt " + fmtD(current.pflanzDatum) : "", harvestTxt(current)].filter(Boolean).join(" · "))}</div></div></div>`
      : `<div class="ai-row"><span class="ai-dot" style="background:#cbd5e1"></span><div class="ai-crop muted">Fläche ist frei</div></div>`;
    const nextBlock = next
      ? `<div class="ai-next"><i class="bi bi-arrow-right-short"></i> Danach: <b>${escapeHtml(next.kultur || "")}</b>${next.pflanzDatum ? " ab " + fmtD(next.pflanzDatum) : ""}</div>`
      : "";
    const metrics = !isHaus && unit.fieldRef
      ? `<div class="ai-metrics"><span><b>${nf(unit.fieldRef.result?.beds?.length || 0)}</b> Beete</span><span><b>${nf(unit.fieldRef.result?.bedMeters || 0)}</b> m</span><span><b>${estPlants(unit.fieldRef.result?.plants || 0)}</b> Pfl.</span></div>`
      : "";
    const tasks = `<div class="ai-tasks${openTasks ? " has" : ""}"><i class="bi ${openTasks ? "bi-list-check" : "bi-check2-circle"}"></i> ${openTasks ? openTasks + " Aufgabe" + (openTasks === 1 ? "" : "n") + " offen" : "Nichts offen"}</div>`;
    card.innerHTML = `
      <div class="ai-head">
        <div class="ai-title"><b>${escapeHtml(unit.name || "Fläche")}</b><span class="ai-badge">${isHaus ? "Gewächshaus" : "Freiland"}${area ? " · " + area : ""}</span></div>
        <button class="ai-x" data-ai="close" title="Schließen"><i class="bi bi-x-lg"></i></button>
      </div>
      ${cropBlock}${nextBlock}${metrics}${tasks}
      <div class="ai-actions">
        <button class="ai-btn primary" data-ai="kultur"><i class="bi bi-clipboard2-pulse"></i> Kulturführung</button>
        <button class="ai-btn" data-ai="zoom"><i class="bi bi-zoom-in"></i> Hin</button>
      </div>`;
    card.style.display = "block";
    card.querySelector('[data-ai="close"]')?.addEventListener("click", hideInfoCard);
    card.querySelector('[data-ai="kultur"]')?.addEventListener("click", () => {
      updateSlice("app", (app: any) => ({ ...app, activeSection: "kultur" }));
      try { window.dispatchEvent(new CustomEvent("psm:openKultur", { detail: { typ: unit.typ, id: String(unit.id) } })); } catch {}
    });
    card.querySelector('[data-ai="zoom"]')?.addEventListener("click", () => {
      if (!isHaus && unit.fieldRef) zoomToField(unit.fieldRef);
      else if (unit.latlng) map.setView(unit.latlng, Math.max(map.getZoom(), 18));
    });
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
          ${cropChipHtml(fl)}
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
            <div class="acker-fld span2">
              <div class="acker-angle-head"><span>Ausrichtung der Beete: <b>${fl.params.angle}°</b></span>
                <button class="acker-align" data-act="align" type="button" title="Beete parallel zur längsten Kante ausrichten"><i class="bi bi-bounding-box"></i> an Fläche</button>
              </div>
              <input data-k="angle" type="range" min="0" max="180" step="5" value="${fl.params.angle}"/>
            </div>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b data-r="area">${nf(fl.result?.areaM2 || 0)} m² · ${nf((fl.result?.areaM2 || 0) / 10000, 3)} ha</b></div>
            <div class="r"><span>Abstand (Mitte–Mitte)</span><b data-r="pitch">${nf(fl.params.bedW + fl.params.pathW, 2)} m</b></div>
            <div class="r"><span>Beete</span><b data-r="beds">${nf(fl.result?.beds?.length || 0)}</b></div>
            <div class="r"><span>Beetmeter</span><b data-r="meters">${nf(fl.result?.bedMeters || 0)} m</b></div>
            <div class="r"><span>Pflanzen (geschätzt)</span><b data-r="plants">${estPlants(fl.result?.plants || 0)}</b></div>
          </div>
          <div class="acker-calib">
            <i class="bi bi-info-circle"></i> Beetzahl passt nicht zum echten Feld?
            <span class="calib-row"><input type="number" min="1" max="999" data-calib placeholder="echte Beetzahl" /><button class="acker-align" data-act="calib" type="button"><i class="bi bi-magic"></i> anpassen</button></span>
          </div>
          <div class="acker-actions">
            <label class="acker-colorbtn" title="Farbe wählen"><input type="color" data-act="color" value="${fl.color}"><i class="bi bi-palette"></i></label>
            <button class="btn btn-sm acker-abtn" data-act="zoom" title="Auf Fläche zoomen"><i class="bi bi-zoom-in"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="dup" title="Duplizieren"><i class="bi bi-copy"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="rot" title="Beete drehen +15°"><i class="bi bi-arrow-clockwise"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-arrows-move"></i> Ausgewählte Fläche ziehen = verschieben · Rechtsklick = mehr Aktionen</div>
        </div>`;
      d.querySelector(".acker-fhead")!.addEventListener("click", (ev: any) => {
        if (ev.target.classList.contains("acker-name")) return;
        select(fl._key);
        showInfoCard({ typ: "acker", id: fl.id, name: fl.name, area: fl.result?.areaM2 || 0, fieldRef: fl });
      });
      const nameInp = d.querySelector(".acker-name") as HTMLInputElement;
      nameInp.addEventListener("input", (e: any) => { fl.name = e.target.value; persistField(fl); });
      d.querySelectorAll("[data-k]").forEach((inp: any) => {
        const k = inp.dataset.k;
        if (k === "kultur") {
          inp.addEventListener("input", (e: any) => {
            fl.kultur = e.target.value || null;
            fl.eppoCode = kulturen.find((x) => x.kultur === fl.kultur)?.eppoCode || null;
            drawField(fl); persistField(fl); // Karten-Label/Plakette aktualisieren
          });
          return;
        }
        if (k === "standortId") {
          inp.addEventListener("input", (e: any) => { fl.standortId = e.target.value || null; persistField(fl); });
          return;
        }
        // Zahl-/Slider-Parameter: Beete + Zahlen LIVE aktualisieren, aber das Panel
        // NICHT neu bauen (sonst verliert das Feld/der Slider den Fokus).
        inp.addEventListener("input", (e: any) => {
          if (k === "angle") fl.params.angle = +e.target.value;
          else fl.params[k] = parseFloat(e.target.value) || 0;
          fl.result = computeBeds(fl.latlngs, fl.params);
          drawField(fl);
          updateFieldResults(d, fl);
          if (k === "angle") { const ah = d.querySelector(".acker-angle-head b"); if (ah) ah.textContent = fl.params.angle + "°"; }
          persistField(fl);
        });
      });
      d.querySelector('[data-act="align"]')?.addEventListener("click", () => alignBedsToField(fl));
      d.querySelector('[data-act="calib"]')?.addEventListener("click", () => {
        const v = Math.round(Number((d.querySelector("[data-calib]") as HTMLInputElement)?.value) || 0);
        if (v >= 1) calibrateBeds(fl, v); else toast.warning("Bitte die echte Beetzahl eingeben.");
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

  // ---------- Ganze Fläche verschieben (Polygon ziehen) ----------
  // Ausgewählte Fläche: auf der Füllung greifen und ziehen verschiebt das ganze
  // Polygon (ideal zum Vergleichen duplizierter Flächen). Beete werden während
  // des Ziehens ausgeblendet und am Ende einmalig neu berechnet (flüssig).
  let moveState: any = null;
  function onFieldMouseDown(fl: any, e: any) {
    if (drawing || fl._key !== selId) return; // nicht ausgewählt → Klick wählt nur aus
    moveState = { fl, lastLL: e.latlng, moved: false };
    map.dragging.disable();
    map.getContainer().style.cursor = "grabbing";
    L.DomEvent.stop(e);
  }
  function onFieldMouseMove(e: any) {
    if (!moveState) return;
    const fl = moveState.fl;
    if (!moveState.moved) {
      // erster echter Move: Beete ausblenden + „bewegt"-Stil (flüssiges Ziehen)
      if (fl.bedsLayer) { map.removeLayer(fl.bedsLayer); fl.bedsLayer = null; }
      try { fl.outline.setStyle({ fillOpacity: 0.3, dashArray: "6 5" }); } catch {}
    }
    const dLat = e.latlng.lat - moveState.lastLL.lat;
    const dLng = e.latlng.lng - moveState.lastLL.lng;
    moveState.lastLL = e.latlng;
    moveState.moved = true;
    fl.latlngs = fl.latlngs.map((p: any) => [p[0] + dLat, p[1] + dLng]);
    try { fl.outline.setLatLngs(fl.latlngs); } catch {}
    (fl.handles || []).forEach((m: any, i: number) => { try { m.setLatLng(fl.latlngs[i]); } catch {} });
    if (fl.label) { try { fl.label.setLatLng(fl.outline.getBounds().getCenter()); } catch {} }
  }
  function onFieldMouseUp() {
    if (!moveState) return;
    const fl = moveState.fl, moved = moveState.moved;
    moveState = null;
    map.dragging.enable();
    map.getContainer().style.cursor = "";
    if (moved) recompute(fl); // Beete + Stil neu berechnen & speichern
  }

  // ---------- Zeichen-Helfer: Schnapp am ersten Punkt + Live-Fläche ----------
  function isNearFirst(latlng: any): boolean {
    if (pts.length < 3) return false;
    const p0 = map.latLngToContainerPoint(L.latLng(pts[0][0], pts[0][1]));
    const pc = map.latLngToContainerPoint(latlng);
    return p0.distanceTo(pc) <= 14;
  }
  function ringAreaM2(ring: any[]): number {
    if (!turf || ring.length < 3) return 0;
    try {
      const c = ring.map((p: any) => [p[1], p[0]]); c.push(c[0]);
      return turf.area(turf.polygon([c]));
    } catch { return 0; }
  }
  function updateDrawStats(ring: any[]) {
    const elS = el('[data-role="acker-draw-stats"]'); if (!elS) return;
    const a = ringAreaM2(ring);
    elS.textContent = `${pts.length} Punkt${pts.length === 1 ? "" : "e"}` + (a > 0 ? ` · ~${nf(a)} m²` : "");
  }

  // ---------- Zeichnen ----------
  let drawing = false; let pts: any[] = []; let preview: any = null; let dots: any[] = [];
  let keySeq = 0;
  function clearDrawTemp() {
    if (preview) { map.removeLayer(preview); preview = null; }
    dots.forEach((d) => map.removeLayer(d)); dots = []; pts = [];
  }
  function setDraw(on: boolean) {
    drawing = on;
    el('[data-role="acker-banner"]')!.style.display = on ? "block" : "none";
    (el('[data-role="acker-draw"]') as HTMLElement).style.display = on ? "none" : "block";
    map.getContainer().style.cursor = on ? "crosshair" : "";
    if (on) { map.on("mousemove", onMapMove); }
    else { map.off("mousemove", onMapMove); clearDrawTemp(); }
  }
  // Live-Vorschau: das Polygon aus den gesetzten Punkten + (optional) der Cursor
  // als nächster Punkt. WICHTIG interactive:false – sonst „schluckt" das
  // Vorschau-Polygon Klicks und Punkte scheinen zu fehlen / komisch zu sitzen.
  function drawPreview(cursor?: any) {
    const ring = cursor ? [...pts, [cursor.lat, cursor.lng]] : pts;
    if (ring.length < 2) { if (preview) { map.removeLayer(preview); preview = null; } return; }
    if (!preview) {
      preview = L.polygon(ring, {
        interactive: false, className: "acker-draw-preview", color: "#22c55e", weight: 2.5,
        fillColor: "#22c55e", fillOpacity: 0.18, dashArray: "6 5",
      }).addTo(map);
    } else preview.setLatLngs(ring);
  }
  // Punkt-Marker: nicht-interaktiv (außer dem ersten) – sonst fangen sie Klicks
  // ab und das nächste Setzen schlägt fehl. Der erste Punkt schließt das Polygon.
  function addDot(latlng: any, isFirst: boolean) {
    const d = L.circleMarker(latlng, {
      radius: isFirst ? 7 : 5, color: "#fff", fillColor: isFirst ? "#16a34a" : "#22c55e",
      fillOpacity: 1, weight: 2, interactive: isFirst, bubblingMouseEvents: false,
    }).addTo(map);
    if (isFirst) {
      d.bindTooltip("Zum Schließen anklicken", { direction: "top" });
      d.on("click", (ev: any) => { L.DomEvent.stop(ev); if (pts.length >= 3) finishDraw(); });
    }
    dots.push(d);
  }
  function onMapClick(e: any) {
    if (!drawing) { hideInfoCard(); return; }
    // Klick nahe dem ersten Punkt schließt das Polygon (Schnapp-UX).
    if (isNearFirst(e.latlng)) { finishDraw(); return; }
    pts.push([e.latlng.lat, e.latlng.lng]);
    addDot(e.latlng, pts.length === 1);
    drawPreview();
    updateDrawStats(pts);
  }
  function onMapMove(e: any) {
    if (!drawing || !pts.length) return;
    const near = isNearFirst(e.latlng);
    // Nahe am Start: Vorschau geschlossen zeigen + ersten Punkt „aufleuchten".
    drawPreview(near ? undefined : e.latlng);
    if (dots[0]) { try { dots[0].setRadius(near ? 10 : 7); dots[0].setStyle({ weight: near ? 3 : 2 }); } catch {} }
    updateDrawStats(near ? pts : [...pts, [e.latlng.lat, e.latlng.lng]]);
  }
  function undoLastPoint() {
    if (!pts.length) return;
    pts.pop(); const d = dots.pop(); if (d) map.removeLayer(d);
    drawPreview();
    updateDrawStats(pts);
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
    // Karte bewusst aufgeräumt: keine schwebende Icon-Leiste und kein
    // Layer-Umschalter mehr. Anzeige-Schalter (Fit/Beschriftung/Beete/Kartentyp)
    // sitzen jetzt im linken Panel; beim Klick auf eine Fläche/ein Gewächshaus
    // erscheint stattdessen oben links eine Info-Karte.
    const infoEl = L.DomUtil.create("div", "acker-info");
    infoEl.setAttribute("data-role", "acker-info");
    infoEl.style.display = "none";
    map.getContainer().appendChild(infoEl);
    L.DomEvent.disableClickPropagation(infoEl);
    L.DomEvent.disableScrollPropagation(infoEl);

    map.on("click", onMapClick);
    map.on("contextmenu", (e: any) => {
      if (drawing) { L.DomEvent.preventDefault?.(e.originalEvent || e); undoLastPoint(); return; }
      openMapMenu(e);
    });
    // Ganze Fläche verschieben (ausgewählte Fläche auf der Karte ziehen)
    map.on("mousemove", onFieldMouseMove);
    map.on("mouseup", onFieldMouseUp);
    document.addEventListener("mouseup", onFieldMouseUp);
    // LOD: bei Zoomwechsel nur betroffene Flächen neu zeichnen (Übersicht ↔ Detail)
    map.on("zoomend", lodRedraw);

    el('[data-role="acker-draw"]')!.addEventListener("click", () => setDraw(true));
    el('[data-role="acker-export"]')?.addEventListener("click", exportGeoJson);
    el('[data-role="acker-finish"]')!.addEventListener("click", finishDraw);
    el('[data-role="acker-cancel"]')!.addEventListener("click", () => setDraw(false));
    el('[data-role="acker-go"]')!.addEventListener("click", geocode);
    (el('[data-role="acker-q"]') as HTMLInputElement).addEventListener("keydown", (e: any) => { if (e.key === "Enter") geocode(); });
    // Karten-Anzeigeschalter (aus der Karte ins Panel verlegt)
    el('[data-role="ctrl-fit"]')?.addEventListener("click", fitAll);
    el('[data-role="ctrl-labels"]')?.addEventListener("click", () => {
      labelsOn = !labelsOn;
      el('[data-role="ctrl-labels"]')?.classList.toggle("on", labelsOn);
      redrawAll();
    });
    el('[data-role="ctrl-beds"]')?.addEventListener("click", () => {
      bedsGlobalOn = !bedsGlobalOn;
      el('[data-role="ctrl-beds"]')?.classList.toggle("on", bedsGlobalOn);
      redrawAll();
    });
    el('[data-role="ctrl-basemap"]')?.addEventListener("click", switchBasemap);
    document.addEventListener("keydown", (e: any) => {
      if (!drawing) return;
      if (e.key === "Backspace") { e.preventDefault(); undoLastPoint(); }
      if (e.key === "Enter") finishDraw();
      if (e.key === "Escape") setDraw(false);
    });

    await loadKulturen();
    await loadAnbau();
    await loadFields();
    setTimeout(() => map.invalidateSize(), 60);
  }

  async function loadKulturen() {
    if (getActiveDriverKey() !== "sqlite") return;
    try { const r = await listKulturen(); kulturen = r?.rows || []; } catch { kulturen = []; }
  }
  async function loadAnbau() {
    if (getActiveDriverKey() !== "sqlite") { anbauRows = []; massRows = []; return; }
    try { const r = await listAnbau(); anbauRows = r?.rows || []; } catch { anbauRows = []; }
    try { const r = await listMassnahmen(); massRows = r?.rows || []; } catch { massRows = []; }
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
    if (s?.app?.activeSection !== "acker") return;
    if (!mapReady) { void ensureMap(); return; }
    // Zurück auf der Karte: aktuelle Kultur-Belegung neu laden + Labels/Panel auffrischen.
    void (async () => { await loadAnbau(); redrawAll(); renderPanel(); setTimeout(() => map && map.invalidateSize(), 60); })();
  });
  renderPanel();
}

function renderShell(): string {
  return `
  <style>
    .acker-wrap{display:flex;gap:0;height:calc(100vh - 80px);min-height:480px;border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);overflow:hidden;background:var(--ap-surface);box-shadow:var(--ap-shadow-sm)}
    .acker-side{width:360px;min-width:320px;display:flex;flex-direction:column;border-right:1px solid var(--ap-line);overflow:hidden;background:var(--ap-surface)}
    .acker-scroll{overflow-y:auto;padding:var(--ap-4);flex:1;display:flex;flex-direction:column;gap:var(--ap-3)}
    .acker-map{flex:1;min-height:300px}
    .acker-search{display:flex;gap:var(--ap-2)}
    .acker-search input{flex:1}
    .acker-banner{display:none;background:var(--ap-green-tint);border:1px solid var(--ap-green-line);color:var(--ap-ink);padding:var(--ap-3) var(--ap-4);border-radius:var(--ap-r);font-size:var(--ap-fs-sm);line-height:1.5}
    .acker-banner .row{display:flex;gap:var(--ap-2);margin-top:var(--ap-3)}
    .acker-totals{background:var(--ap-green-tint);border:1px solid var(--ap-green-line);border-radius:var(--ap-r-lg);padding:var(--ap-4)}
    .acker-totals .t-row{display:flex;justify-content:space-between;align-items:center;font-size:var(--ap-fs-sm);padding:var(--ap-1) 0;color:var(--ap-ink-2)}
    .acker-totals .t-row b{color:var(--ap-ink);font-weight:var(--ap-w-bold)}
    .acker-totals .big{font-size:var(--ap-fs-xl);font-weight:var(--ap-w-black);color:var(--ap-green)}
    .acker-legend{display:flex;align-items:center;gap:var(--ap-3);margin-top:var(--ap-2);padding-top:var(--ap-3);border-top:1px solid var(--ap-green-line);font-size:var(--ap-fs-xs);color:var(--ap-ink-3)}
    .acker-legend .lg{display:inline-flex;align-items:center;gap:5px}
    .acker-legend .lg i{width:17px;height:11px;border-radius:3px;display:inline-block;flex:none}
    .acker-legend .lg i.bed{background:var(--ap-green-bright);box-shadow:inset 0 0 0 1px #fff}
    .acker-legend .lg i.path{background:transparent;border:1px dashed var(--ap-ink-3)}
    .acker-legend .lg-hint{margin-left:auto;color:var(--ap-ink-3)}
    .acker-empty{color:var(--ap-ink-3);font-size:var(--ap-fs-sm);text-align:center;padding:var(--ap-6) var(--ap-2);line-height:1.6}
    .acker-field{border:1px solid var(--ap-line);border-radius:var(--ap-r);margin-bottom:var(--ap-3);overflow:hidden;background:var(--ap-surface);transition:box-shadow var(--ap-t),border-color var(--ap-t)}
    .acker-field.sel{border-color:var(--ap-green);box-shadow:0 0 0 2px var(--ap-green-soft)}
    .acker-fhead{display:flex;align-items:center;gap:var(--ap-2);padding:var(--ap-3);cursor:pointer}
    .acker-swatch{width:18px;height:18px;border-radius:6px;flex:none;border:1px solid rgba(0,0,0,.14)}
    .acker-name{flex:1;font-size:var(--ap-fs-md);font-weight:var(--ap-w-bold);border:0;background:transparent;outline:none;color:var(--ap-ink);min-width:0}
    .acker-stat{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);font-weight:var(--ap-w-med)}
    .acker-cropchip{display:inline-flex;align-items:center;gap:5px;font-size:var(--ap-fs-xs);color:var(--ap-ink);background:var(--ap-surface-2);border:1px solid var(--ap-line);border-radius:var(--ap-r-pill);padding:3px 10px;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
    .acker-cropchip .dot{width:8px;height:8px;border-radius:50%;flex:none}
    .acker-angle-head{display:flex;align-items:center;justify-content:space-between;gap:var(--ap-2);margin-bottom:6px}
    .acker-align{display:inline-flex;align-items:center;gap:5px;font-size:var(--ap-fs-xs);border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r-sm);padding:8px 12px;cursor:pointer;white-space:nowrap;font-weight:var(--ap-w-med);min-height:var(--ap-control-sm)}
    .acker-align:hover{background:var(--ap-green-soft);color:var(--ap-green-dark);border-color:var(--ap-green-line)}
    /* Karten-Anzeigeschalter im Panel (statt schwebender Icons) */
    .acker-mapctrls{display:flex;gap:var(--ap-2)}
    .acker-mapctrls button{flex:1;height:var(--ap-icon-btn);border:1px solid var(--ap-line);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r-sm);cursor:pointer;font-size:18px;display:inline-flex;align-items:center;justify-content:center;transition:background var(--ap-t),color var(--ap-t),border-color var(--ap-t)}
    .acker-mapctrls button:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .acker-mapctrls button.on{background:var(--ap-green-soft);color:var(--ap-green-dark);border-color:var(--ap-green-line)}
    /* Info-Karte (Klick auf Fläche/Gewächshaus) – Overlay im Karten-Container */
    .acker-info{position:absolute;top:14px;left:54px;z-index:1000;width:300px;max-width:calc(100% - 68px);background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);box-shadow:var(--ap-shadow-lg);padding:var(--ap-4);font-size:var(--ap-fs-sm);color:var(--ap-ink)}
    .acker-info .ai-head{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ap-2);margin-bottom:var(--ap-2)}
    .acker-info .ai-title b{font-size:var(--ap-fs-md);font-weight:var(--ap-w-bold);display:block;line-height:1.2}
    .acker-info .ai-badge{font-size:var(--ap-fs-xs);color:var(--ap-green-dark);background:var(--ap-green-soft);border-radius:var(--ap-r-pill);padding:2px 10px;display:inline-block;margin-top:4px;font-weight:var(--ap-w-med)}
    .acker-info .ai-x{border:0;background:transparent;color:var(--ap-ink-3);cursor:pointer;font-size:18px;padding:2px;line-height:1;border-radius:var(--ap-r-sm)}
    .acker-info .ai-x:hover{color:var(--ap-ink)}
    .acker-info .ai-row{display:flex;gap:var(--ap-2);align-items:flex-start;margin:var(--ap-2) 0}
    .acker-info .ai-dot{width:14px;height:14px;border-radius:50%;flex:none;margin-top:3px}
    .acker-info .ai-crop{font-size:var(--ap-fs-md);font-weight:var(--ap-w-bold);line-height:1.15}
    .acker-info .ai-crop.muted{color:var(--ap-ink-3);font-weight:var(--ap-w-med)}
    .acker-info .ai-sub{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:2px}
    .acker-info .ai-next{font-size:var(--ap-fs-sm);color:var(--ap-ink-2);margin:4px 0 2px}
    .acker-info .ai-next b{color:var(--ap-ink)}
    .acker-info .ai-metrics{display:flex;gap:var(--ap-4);margin:var(--ap-3) 0;padding:var(--ap-2) 0;border-top:1px solid var(--ap-line);border-bottom:1px solid var(--ap-line);font-size:var(--ap-fs-xs);color:var(--ap-ink-3)}
    .acker-info .ai-metrics b{color:var(--ap-green-dark);font-size:var(--ap-fs-md)}
    .acker-info .ai-tasks{font-size:var(--ap-fs-sm);color:var(--ap-ink-3);margin:var(--ap-2) 0 0;display:flex;align-items:center;gap:6px}
    .acker-info .ai-tasks.has{color:var(--ap-warn);font-weight:var(--ap-w-med)}
    .acker-info .ai-tasks i{font-size:16px}
    .acker-info .ai-actions{display:flex;gap:var(--ap-2);margin-top:var(--ap-3)}
    .acker-info .ai-btn{flex:1;border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r-sm);padding:11px 10px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;min-height:var(--ap-control-sm)}
    .acker-info .ai-btn:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .acker-info .ai-btn.primary{background:var(--ap-green);border-color:var(--ap-green);color:var(--ap-on-green);font-weight:var(--ap-w-bold)}
    .acker-info .ai-btn.primary:hover{background:var(--ap-green-dark);border-color:var(--ap-green-dark)}
    .acker-fbody{display:none;padding:0 var(--ap-3) var(--ap-3);border-top:1px solid var(--ap-line)}
    .acker-field.open .acker-fbody{display:block}
    .acker-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--ap-3);margin-top:var(--ap-3)}
    .acker-fld{font-size:var(--ap-fs-xs);color:var(--ap-ink-2);display:flex;flex-direction:column;gap:5px;font-weight:var(--ap-w-med)}
    .acker-fld input:not([type=range]),.acker-fld select{padding:11px 12px;border:1px solid var(--ap-line-2);border-radius:var(--ap-r-sm);font-size:var(--ap-fs);width:100%;background:var(--ap-surface);color:var(--ap-ink);min-height:var(--ap-control-sm)}
    .acker-fld input[type=range]{accent-color:var(--ap-green);width:100%}
    .acker-fld.span2{grid-column:1 / -1}
    .acker-res{margin-top:var(--ap-3);background:var(--ap-surface-2);border-radius:var(--ap-r-sm);padding:var(--ap-3)}
    .acker-res .r{display:flex;justify-content:space-between;align-items:center;font-size:var(--ap-fs-sm);padding:3px 0;color:var(--ap-ink-2)}
    .acker-res .r b{color:var(--ap-green-dark);font-weight:var(--ap-w-bold)}
    .acker-calib{margin-top:var(--ap-3);font-size:var(--ap-fs-xs);color:var(--ap-ink-2);line-height:1.5}
    .acker-calib i{color:var(--ap-info)}
    .acker-calib .calib-row{display:flex;gap:var(--ap-2);margin-top:var(--ap-2)}
    .acker-calib input{flex:1;min-width:0;padding:11px 12px;border:1px solid var(--ap-line-2);border-radius:var(--ap-r-sm);font-size:var(--ap-fs);background:var(--ap-surface);color:var(--ap-ink);min-height:var(--ap-control-sm)}
    .acker-calib button{white-space:nowrap}
    .acker-vhandle{background:#fff;border:2px solid var(--ap-green-dark);border-radius:50%;width:14px!important;height:14px!important;margin-left:-7px!important;margin-top:-7px!important;cursor:grab}
    .acker-outline-grab{cursor:grab}
    .acker-draw-preview{animation:acker-ants .8s linear infinite}
    @keyframes acker-ants{to{stroke-dashoffset:-22}}
    .acker-draw-stats{font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);color:var(--ap-green-dark);margin-top:var(--ap-2)}
    .acker-standort-dot{display:block;width:14px;height:14px;border-radius:50%;background:var(--ap-warn);border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
    .acker-standort-label{background:rgba(255,255,255,.94);color:var(--ap-ink);border:1px solid var(--ap-warn);border-radius:var(--ap-r-sm);padding:2px 7px;font-size:var(--ap-fs-xs);font-weight:var(--ap-w-med);box-shadow:0 1px 3px rgba(0,0,0,.25)}
    .acker-standort-label::before{display:none}
    /* Flächen-Beschriftung (Zentroid) */
    .acker-flabel-wrap{pointer-events:none!important}
    .acker-flabel{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:0;white-space:nowrap;padding:4px 10px;border-radius:var(--ap-r-sm);background:rgba(255,255,255,.94);border:2px solid var(--fc,#3b82f6);box-shadow:0 2px 8px rgba(0,0,0,.22);line-height:1.15}
    .acker-flabel b{font-weight:var(--ap-w-bold);font-size:var(--ap-fs-xs);color:var(--ap-ink)}
    .acker-flabel i{font-style:normal;color:var(--ap-green-dark);font-weight:var(--ap-w-med);font-size:11px}
    .acker-flabel .cr{font-style:normal;font-weight:var(--ap-w-bold);font-size:10px;color:#fff;background:var(--cc,#16a34a);border-radius:5px;padding:1px 6px;margin:1px 0;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .acker-flabel .cr .dot{display:none}
    .acker-flabel.sel{box-shadow:0 3px 12px rgba(0,0,0,.3);transform:translate(-50%,-50%) scale(1.05)}
    /* Floating-Toolbar */
    .acker-toolbar a{display:flex!important;align-items:center;justify-content:center;font-size:17px;color:var(--ap-ink-2);background:#fff;width:34px;height:34px;line-height:34px}
    .acker-toolbar a.on{color:var(--ap-green-dark);background:var(--ap-green-soft)}
    .acker-toolbar a:hover{background:var(--ap-surface-3)}
    .acker-toolbar a.on:hover{background:var(--ap-green-line)}
    /* Panel-Aktionen */
    .acker-actions{display:flex;align-items:center;gap:var(--ap-2);margin-top:var(--ap-3)}
    .acker-colorbtn{position:relative;width:var(--ap-icon-btn);height:var(--ap-icon-btn);border-radius:var(--ap-r-sm);border:1px solid var(--ap-line-2);display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;flex:none;background:var(--ap-surface)}
    .acker-colorbtn:hover{background:var(--ap-surface-3)}
    .acker-colorbtn input{position:absolute;inset:0;opacity:0;cursor:pointer}
    .acker-colorbtn i{font-size:17px;color:var(--ap-ink-2);pointer-events:none}
    .acker-abtn{width:var(--ap-icon-btn);height:var(--ap-icon-btn);display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--ap-line-2);border-radius:var(--ap-r-sm);background:var(--ap-surface);color:var(--ap-ink-2);padding:0;font-size:17px;flex:none;cursor:pointer;transition:background var(--ap-t),color var(--ap-t)}
    .acker-abtn:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .acker-abtn.danger{color:var(--ap-danger);border-color:var(--ap-danger-line)}
    .acker-abtn.danger:hover{background:var(--ap-danger-soft)}
    .acker-hint{margin-top:var(--ap-2);font-size:var(--ap-fs-xs);color:var(--ap-ink-3);display:flex;align-items:center;gap:5px;line-height:1.45}
    /* Rechtsklick-Kontextmenü */
    .acker-ctx{position:fixed;z-index:12000;min-width:248px;max-width:320px;background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);box-shadow:var(--ap-shadow-lg);padding:var(--ap-2);font-size:var(--ap-fs-sm);color:var(--ap-ink);user-select:none}
    .acker-ctx-title{font-size:var(--ap-fs-xs);font-weight:var(--ap-w-bold);color:var(--ap-ink-3);padding:7px 10px 9px;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .acker-ctx-sep{height:1px;background:var(--ap-line);margin:var(--ap-1) var(--ap-1)}
    .acker-ctx-item{display:flex;align-items:center;gap:var(--ap-2);width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:11px 10px;border-radius:var(--ap-r-sm);cursor:pointer;position:relative;font-size:var(--ap-fs-sm);line-height:1.2}
    .acker-ctx-item:hover{background:var(--ap-surface-3)}
    .acker-ctx-item .ic{width:20px;text-align:center;color:var(--ap-ink-2);flex:none;font-size:16px}
    .acker-ctx-item .lb{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .acker-ctx-item .ch{color:var(--ap-ink-3);margin-left:auto;font-size:12px}
    .acker-ctx-item.danger{color:var(--ap-danger)}
    .acker-ctx-item.danger .ic{color:var(--ap-danger)}
    .acker-ctx-item.disabled{opacity:.4;cursor:default}
    .acker-ctx-item.disabled:hover{background:transparent}
    .acker-ctx-sub{display:none;position:absolute;left:calc(100% + 3px);top:-5px;min-width:210px;max-height:62vh;overflow-y:auto;overflow-x:hidden;background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);box-shadow:var(--ap-shadow-lg);padding:var(--ap-2)}
    .acker-ctx-item.has-sub:hover>.acker-ctx-sub,.acker-ctx-sub:hover{display:block}
    .acker-ctx-swatches{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--ap-2);padding:7px 10px}
    .acker-sw{width:30px;height:30px;border-radius:var(--ap-r-sm);border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0}
    .acker-sw.on{box-shadow:0 0 0 2px var(--ap-ink)}
    .acker-sw-custom{grid-column:1 / -1;display:flex;align-items:center;justify-content:center;gap:6px;border:1px dashed var(--ap-line-2);border-radius:var(--ap-r-sm);padding:7px;cursor:pointer;font-size:var(--ap-fs-xs);color:var(--ap-ink-2)}
    .acker-sw-custom input{width:26px;height:26px;border:0;background:none;padding:0;cursor:pointer}
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
          <div class="acker-mapctrls">
            <button data-role="ctrl-fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></button>
            <button data-role="ctrl-labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></button>
            <button data-role="ctrl-beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></button>
            <button data-role="ctrl-basemap" title="Kartentyp (Satellit/OSM)"><i class="bi bi-layers"></i></button>
          </div>
          <div class="acker-banner" data-role="acker-banner">
            <b>Ecke für Ecke anklicken</b> – die Vorschau folgt dem Cursor. Zum Abschließen den <b>ersten Punkt</b> anklicken (oder <b>Enter</b>).<br>
            <span style="opacity:.8">Rechtsklick oder <b>Backspace</b> = letzten Punkt zurück · <b>Esc</b> = abbrechen.</span>
            <div class="acker-draw-stats" data-role="acker-draw-stats">0 Punkte</div>
            <div class="row">
              <button class="btn btn-sm btn-psm-primary" data-role="acker-finish">✓ Fertig</button>
              <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-cancel">Abbrechen</button>
            </div>
          </div>
          <div class="acker-totals" data-role="acker-totals" style="display:none">
            <div class="t-row"><span>Gesamtfläche</span><b data-t="area">–</b></div>
            <div class="t-row"><span>Beete gesamt</span><b data-t="beds">–</b></div>
            <div class="t-row"><span>Beetmeter gesamt</span><b data-t="meters">–</b></div>
            <div class="t-row"><span>Pflanzen gesamt</span><b class="big" data-t="plants">–</b></div>
            <div class="acker-legend">
              <span class="lg"><i class="bed"></i>Beet</span>
              <span class="lg"><i class="path"></i>Weg</span>
              <span class="lg-hint">beim Reinzoomen sichtbar</span>
            </div>
          </div>
          <div class="acker-export-box">
            <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-export" style="width:100%">
              <i class="bi bi-geo me-1"></i>Als GeoJSON exportieren
            </button>
            <div style="font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:6px;line-height:1.4">Flächen + Standorte (WGS84) für QGIS / FMIS / Traktor-Terminals.</div>
          </div>
          <div data-role="acker-list"></div>
          <div class="acker-empty" data-role="acker-empty">Noch keine Fläche.<br>Zum Acker navigieren, dann <b>Neue Fläche zeichnen</b>.</div>
        </div>
      </aside>
      <div class="acker-map" data-role="acker-map"></div>
    </div>
  </section>`;
}
