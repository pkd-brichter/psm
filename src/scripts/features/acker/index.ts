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
import { exportAckerPdf, type AckerPdfField } from "./pdf";

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
  let standorteLayer: any = null;

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

  // ---------- PDF-Export (berechnete Details) ----------
  function standortNameById(id: string | null | undefined): string | null {
    if (!id) return null;
    const points = extractSliceItems<any>(services.state.getState().gps?.points) || [];
    const p = points.find((x: any) => String(x.id) === String(id));
    return p?.name || null;
  }
  function toPdfField(fl: any): AckerPdfField {
    return {
      name: fl.name || "Fläche",
      kultur: fl.kultur || null,
      standortName: standortNameById(fl.standortId),
      eppoCode: fl.eppoCode || null,
      color: fl.color,
      params: { ...fl.params },
      areaM2: fl.result?.areaM2 || 0,
      bedsCount: fl.result?.beds?.length || 0,
      bedMeters: fl.result?.bedMeters || 0,
      plants: fl.result?.plants || 0,
      latlngs: (fl.latlngs || []).map((a: any) => [Number(a[0]), Number(a[1])]),
      beds: (fl.result?.beds || []).map((b: any) => ({
        geo: b.geo,
        lenM: b.lenM || 0,
        rows: b.rows || 0,
        perRow: b.perRow || 0,
        plants: b.plants || 0,
        areaM2: b.areaM2 || 0,
      })),
    };
  }
  function companyForPdf() {
    const c = services.state.getState().company || {};
    return {
      name: c.name || "",
      headline: c.headline || "",
      address: c.address || "",
      contactEmail: c.contactEmail || "",
    };
  }
  async function exportFieldPdf(fl: any): Promise<void> {
    if (!fl || (fl.latlngs?.length || 0) < 3) {
      toast.warning("Diese Fläche hat noch keine Geometrie.");
      return;
    }
    try {
      toast.info("PDF wird erstellt …");
      await exportAckerPdf([toPdfField(fl)], companyForPdf(), {
        title: fl.name || "Acker-Flaeche",
      });
    } catch (e) {
      console.error("[Acker] PDF-Export fehlgeschlagen", e);
      toast.error("PDF-Export fehlgeschlagen.");
    }
  }
  async function exportAllPdf(): Promise<void> {
    const valid = fields.filter((f) => (f.latlngs?.length || 0) >= 3);
    if (!valid.length) {
      toast.warning("Keine Flächen zum Exportieren.");
      return;
    }
    try {
      toast.info("PDF wird erstellt …");
      await exportAckerPdf(valid.map(toPdfField), companyForPdf(), {
        title: "Acker-Flaechen",
      });
    } catch (e) {
      console.error("[Acker] PDF-Export fehlgeschlagen", e);
      toast.error("PDF-Export fehlgeschlagen.");
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
  // Eckpunkt-Handles (verschieben), dazu Mittelpunkt-Handles zum EINFÜGEN neuer
  // Punkte und Doppel-/Rechtsklick zum LÖSCHEN – Standard-Editing wie in
  // Karten-Tools (Leaflet.draw/Geoman/Google My Maps).
  function buildHandles(fl: any) {
    clearHandles(fl);
    fl.handles = fl.latlngs.map((ll: any, i: number) => {
      const m = L.marker(ll, {
        draggable: true,
        icon: L.divIcon({ className: "acker-vhandle" }),
        title: "Ziehen = verschieben · Doppelklick = löschen",
      }).addTo(map);
      m.on("dragstart", () => hideMidHandles(fl));
      m.on("drag", (e: any) => { fl.latlngs[i] = [e.target.getLatLng().lat, e.target.getLatLng().lng]; fl.outline.setLatLngs(fl.latlngs); });
      m.on("dragend", () => recompute(fl));
      m.on("dblclick", (e: any) => { L.DomEvent.stop(e); deleteVertex(fl, i); });
      m.on("contextmenu", (e: any) => { L.DomEvent.stop(e); deleteVertex(fl, i); });
      return m;
    });
    buildMidHandles(fl);
  }
  function buildMidHandles(fl: any) {
    (fl.midHandles || []).forEach((m: any) => map.removeLayer(m));
    fl.midHandles = [];
    const ll = fl.latlngs || [];
    if (ll.length < 2) return;
    for (let i = 0; i < ll.length; i++) {
      const a = ll[i], b = ll[(i + 1) % ll.length];
      const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const insertAt = i + 1;
      const m = L.marker(mid, {
        icon: L.divIcon({ className: "acker-mhandle", html: "+" }),
        keyboard: false,
        title: "Klicken = Punkt einfügen",
      }).addTo(map);
      m.on("click", (e: any) => { L.DomEvent.stop(e); fl.latlngs.splice(insertAt, 0, mid.slice()); recompute(fl); });
      fl.midHandles.push(m);
    }
  }
  function hideMidHandles(fl: any) { (fl.midHandles || []).forEach((m: any) => map.removeLayer(m)); fl.midHandles = []; }
  function deleteVertex(fl: any, i: number) {
    if ((fl.latlngs?.length || 0) <= 3) { toast.warning("Eine Fläche braucht mindestens 3 Punkte."); return; }
    fl.latlngs.splice(i, 1);
    recompute(fl);
  }
  function clearHandles(fl: any) {
    (fl.handles || []).forEach((m: any) => map.removeLayer(m));
    (fl.midHandles || []).forEach((m: any) => map.removeLayer(m));
    fl.handles = []; fl.midHandles = [];
  }

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
          <div class="acker-edithint"><i class="bi bi-pencil me-1"></i>Eckpunkt ziehen = verschieben · Doppelklick = löschen · „+" auf der Kante = einfügen</div>
          <div class="acker-actions">
            <button class="btn btn-sm btn-psm-primary" data-act="pdf"><i class="bi bi-file-earmark-pdf me-1"></i>PDF-Export</button>
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
      d.querySelector('[data-act="pdf"]')!.addEventListener("click", () => void exportFieldPdf(fl));
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
  // Standard-Verhalten: tippen/klicken setzt Punkte; Live-Anzeige von Umfang +
  // Fläche; Abschluss per Doppelklick, Klick auf den ersten Punkt oder „Fertig";
  // „Punkt zurück" (Button + Backspace) macht den letzten rückgängig. Damit auch
  // ohne Tastatur (Tablet im Feld) voll bedienbar.
  let drawing = false; let pts: any[] = []; let temp: any = null; let fillTemp: any = null; let dots: any[] = [];
  let keySeq = 0;
  function provisionalStats(): { areaM2: number; perimM: number; n: number } {
    const n = pts.length;
    if (n < 2) return { areaM2: 0, perimM: 0, n };
    const coords = pts.map((p) => [p[1], p[0]]);
    let perimM = 0, areaM2 = 0;
    try { perimM = turf.length(turf.lineString(coords), { units: "kilometers" }) * 1000; } catch {}
    if (n >= 3) {
      const ring = coords.slice(); ring.push(coords[0]);
      try { areaM2 = turf.area(turf.polygon([ring])); } catch {}
    }
    return { areaM2, perimM, n };
  }
  function updateDrawStatus() {
    const s = el('[data-role="acker-drawstat"]');
    if (!s) return;
    const { areaM2, perimM, n } = provisionalStats();
    if (n === 0) { s.textContent = "Noch keine Punkte – auf die Karte tippen."; return; }
    const parts = [`${n} Punkt${n === 1 ? "" : "e"}`];
    if (perimM) parts.push(`Umfang ${nf(perimM)} m`);
    if (areaM2) parts.push(`Fläche ${nf(areaM2)} m² (${nf(areaM2 / 10000, 3)} ha)`);
    s.textContent = parts.join(" · ");
  }
  function redrawTemp() {
    if (!temp) temp = L.polyline(pts, { color: "#22c55e", weight: 2, dashArray: "5 5" }).addTo(map);
    else temp.setLatLngs(pts);
    // Ab 3 Punkten die provisorische Fläche füllen (sichtbare Live-Fläche).
    if (pts.length >= 3) {
      if (!fillTemp) fillTemp = L.polygon(pts, { color: "#22c55e", weight: 0, fillColor: "#22c55e", fillOpacity: 0.12, interactive: false }).addTo(map);
      else fillTemp.setLatLngs(pts);
    } else if (fillTemp) { map.removeLayer(fillTemp); fillTemp = null; }
  }
  function setDraw(on: boolean) {
    drawing = on;
    el('[data-role="acker-banner"]')!.style.display = on ? "block" : "none";
    map.getContainer().style.cursor = on ? "crosshair" : "";
    if (!on) {
      if (temp) map.removeLayer(temp);
      if (fillTemp) map.removeLayer(fillTemp);
      dots.forEach((d) => map.removeLayer(d));
      temp = null; fillTemp = null; dots = []; pts = [];
    }
    refreshToolButtons();
    updateDrawStatus();
  }
  function undoPoint() {
    if (!pts.length) return;
    pts.pop();
    const d = dots.pop(); if (d) map.removeLayer(d);
    redrawTemp();
    updateDrawStatus();
  }
  function onMapClick(e: any) {
    if (!drawing) return;
    // Klick (nahe) auf den ersten Punkt schließt das Polygon ab.
    if (pts.length >= 3) {
      const p0 = map.latLngToContainerPoint(L.latLng(pts[0][0], pts[0][1]));
      const pc = map.latLngToContainerPoint(e.latlng);
      if (p0.distanceTo(pc) < 14) { finishDraw(); return; }
    }
    pts.push([e.latlng.lat, e.latlng.lng]);
    dots.push(L.circleMarker(e.latlng, { radius: 4, color: "#22c55e", fillColor: "#fff", fillOpacity: 1, weight: 2 }).addTo(map));
    redrawTemp();
    updateDrawStatus();
  }
  function finishDraw() {
    if (pts.length < 3) { toast.warning("Mindestens 3 Punkte setzen."); return; }
    const latlngs = pts.map((p) => p.slice());
    setDraw(false);
    createFieldFromLatlngs(latlngs);
  }
  // Gemeinsamer Feld-Erzeuger (Polygon UND Rechteck) – speichert sofort.
  function createFieldFromLatlngs(latlngs: any[]) {
    const fl: any = {
      _key: "new-" + (++keySeq), id: null, name: "Fläche " + (fields.length + 1),
      kultur: null, eppoCode: null, standortId: null,
      color: palette[fields.length % palette.length],
      latlngs: latlngs.map((p: any) => p.slice()), params: defaultsParams(),
      outline: null, bedsLayer: null, handles: [], midHandles: [], result: { areaM2: 0, beds: [], bedMeters: 0, plants: 0 },
    };
    fields.push(fl); selId = fl._key;
    recompute(fl);
    persistField(fl, true);
    return fl;
  }

  // ---------- Rechteck-Werkzeug ----------
  // Erste Ecke klicken, gegenüberliegende Ecke klicken → rechteckige Fläche.
  // Schnell für Beete/Tunnel/typische Parzellen; voll touch-tauglich.
  let rectMode = false; let rectStart: any = null; let rectPreview: any = null; let rectDot: any = null;
  function refreshToolButtons() {
    const busy = drawing || rectMode;
    const db = el('[data-role="acker-draw"]') as HTMLElement | null;
    const rb = el('[data-role="acker-rect"]') as HTMLElement | null;
    if (db) db.style.display = busy ? "none" : "block";
    if (rb) rb.style.display = busy ? "none" : "block";
  }
  function setRect(on: boolean) {
    rectMode = on;
    const banner = el('[data-role="acker-rectbanner"]');
    if (banner) banner.style.display = on ? "block" : "none";
    map.getContainer().style.cursor = on ? "crosshair" : "";
    if (!on) {
      if (rectPreview) map.removeLayer(rectPreview);
      if (rectDot) map.removeLayer(rectDot);
      rectPreview = null; rectDot = null; rectStart = null;
    }
    refreshToolButtons();
  }
  function rectCorners(a: any, b: any): any[] {
    return [[a[0], a[1]], [a[0], b[1]], [b[0], b[1]], [b[0], a[1]]];
  }
  function onRectClick(e: any) {
    if (!rectMode) return;
    const p = [e.latlng.lat, e.latlng.lng];
    if (!rectStart) {
      rectStart = p;
      rectDot = L.circleMarker(e.latlng, { radius: 4, color: "#22c55e", fillColor: "#fff", fillOpacity: 1, weight: 2 }).addTo(map);
    } else {
      const corners = rectCorners(rectStart, p);
      setRect(false);
      createFieldFromLatlngs(corners);
    }
  }
  function onRectMove(e: any) {
    if (!rectMode || !rectStart) return;
    const corners = rectCorners(rectStart, [e.latlng.lat, e.latlng.lng]);
    if (!rectPreview) rectPreview = L.polygon(corners, { color: "#22c55e", weight: 2, dashArray: "5 5", fillColor: "#22c55e", fillOpacity: 0.12, interactive: false }).addTo(map);
    else rectPreview.setLatLngs(corners);
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
    // Vorhandene Freiland-Standorte (Name + Koordinaten + Fläche) als Marker-Layer
    standorteLayer = L.layerGroup();
    renderStandorte();
    standorteLayer.addTo(map);
    L.control.layers(
      { Satellit: sat, "Karte (OSM)": osm },
      { "Freiland-Standorte": standorteLayer },
      { position: "topright" }
    ).addTo(map);
    map.on("click", onMapClick);
    map.on("click", onRectClick);
    map.on("mousemove", onRectMove);
    // Doppelklick schließt das Polygon ab (nur während des Zeichnens).
    map.on("dblclick", () => { if (drawing) finishDraw(); });

    el('[data-role="acker-draw"]')!.addEventListener("click", () => { setRect(false); setDraw(true); });
    el('[data-role="acker-rect"]')?.addEventListener("click", () => { setDraw(false); setRect(true); });
    el('[data-role="acker-rectcancel"]')?.addEventListener("click", () => setRect(false));
    el('[data-role="acker-export"]')?.addEventListener("click", exportGeoJson);
    el('[data-role="acker-export-pdf"]')?.addEventListener("click", () => void exportAllPdf());
    el('[data-role="acker-finish"]')!.addEventListener("click", finishDraw);
    el('[data-role="acker-undo"]')?.addEventListener("click", undoPoint);
    el('[data-role="acker-cancel"]')!.addEventListener("click", () => setDraw(false));
    el('[data-role="acker-go"]')!.addEventListener("click", geocode);
    (el('[data-role="acker-q"]') as HTMLInputElement).addEventListener("keydown", (e: any) => { if (e.key === "Enter") geocode(); });
    document.addEventListener("keydown", (e: any) => {
      if (rectMode && e.key === "Escape") { setRect(false); return; }
      if (!drawing) return;
      if (e.key === "Backspace") { e.preventDefault(); undoPoint(); }
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
    .acker-tools{display:flex;gap:8px;margin-bottom:4px}
    .acker-tools .btn{flex:1;display:inline-flex;align-items:center;justify-content:center}
    .acker-banner{display:none;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.4);color:var(--text);padding:10px 12px;border-radius:8px;font-size:12.5px;margin:8px 0 10px;line-height:1.45}
    .acker-banner .row{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
    .acker-drawstat{margin-top:8px;font-weight:700;color:#16a34a;font-size:13px}
    .acker-export-cap{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--text-muted,#94a3b8);margin-bottom:6px}
    .acker-edithint{font-size:11px;color:var(--text-muted,#94a3b8);margin-top:10px;line-height:1.4}
    .acker-mhandle{background:#fff;border:2px dashed #15803d;border-radius:50%;width:16px!important;height:16px!important;margin-left:-8px!important;margin-top:-8px!important;color:#15803d;font-weight:700;font-size:12px;line-height:12px;text-align:center;cursor:copy;display:flex;align-items:center;justify-content:center;opacity:.85}
    .acker-mhandle:hover{opacity:1;background:#dcfce7}
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
    .acker-actions{display:flex;flex-wrap:wrap;align-items:center;margin-top:10px;gap:8px}
    .acker-actions [data-act="pdf"]{flex:1 1 100%}
    .acker-vhandle{background:#fff;border:2px solid #15803d;border-radius:50%;width:12px!important;height:12px!important;margin-left:-6px!important;margin-top:-6px!important;cursor:grab}
    .acker-standort-dot{display:block;width:14px;height:14px;border-radius:50%;background:#f59e0b;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
    .acker-standort-label{background:rgba(255,255,255,.92);color:#1f2937;border:1px solid #d97706;border-radius:6px;padding:1px 6px;font-size:11px;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.25)}
    .acker-standort-label::before{display:none}
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
          <div class="acker-tools">
            <button class="btn btn-psm-primary" data-role="acker-draw"><i class="bi bi-pentagon me-1"></i>Fläche zeichnen</button>
            <button class="btn btn-psm-secondary-outline" data-role="acker-rect"><i class="bi bi-bounding-box me-1"></i>Rechteck</button>
          </div>
          <div class="acker-banner" data-role="acker-rectbanner">
            <div><b>Rechteck aufziehen:</b> erste Ecke klicken/tippen, dann die gegenüberliegende Ecke.</div>
            <div class="row">
              <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-rectcancel">Abbrechen</button>
            </div>
          </div>
          <div class="acker-banner" data-role="acker-banner">
            <div><b>Fläche zeichnen:</b> auf die Karte tippen/klicken setzt die Eckpunkte. Abschließen: <b>Doppelklick</b>, Klick auf den <b>ersten Punkt</b> oder „Fertig".</div>
            <div class="acker-drawstat" data-role="acker-drawstat">Noch keine Punkte – auf die Karte tippen.</div>
            <div class="row">
              <button class="btn btn-sm btn-psm-primary" data-role="acker-finish">✓ Fertig</button>
              <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-undo">↶ Punkt zurück</button>
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
            <div class="acker-export-cap">Export</div>
            <button class="btn btn-sm btn-psm-primary" data-role="acker-export-pdf" style="width:100%">
              <i class="bi bi-file-earmark-pdf me-1"></i>Auswertung als PDF (alle Flächen)
            </button>
            <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-export" style="width:100%;margin-top:6px">
              <i class="bi bi-geo me-1"></i>Als GeoJSON exportieren
            </button>
            <div style="font-size:11px;color:var(--text-dim);margin-top:5px;line-height:1.35">PDF: Kennzahlen + maßstäbliche Skizze je Fläche. GeoJSON (WGS84): QGIS / FMIS / Traktor-Terminals.</div>
          </div>
          <div data-role="acker-list"></div>
          <div class="acker-empty" data-role="acker-empty">Noch keine Fläche.<br>Zum Acker navigieren, dann <b>Neue Fläche zeichnen</b>.</div>
        </div>
      </aside>
      <div class="acker-map" data-role="acker-map"></div>
    </div>
  </section>`;
}
