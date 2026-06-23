// @ts-nocheck
// Kulturführung – Hub je Fläche (Freiland + Gewächshaus): aktuelle/nächste
// Kultur, KW-Zeitleiste mit Maßnahmen & Wetter, Maßnahmen-Planung + Doku.
// Daten über die Worker-Bridge (anbau_kultur, massnahme); Wetter via Open-Meteo.
//
// Künftiges Backend: sämtlicher Datenzugriff läuft über die Bridge-Funktionen
// (listAnbau/upsertAnbau/… , importPsmAsMassnahmen). Wird der Worker später
// gegen einen HTTP-Client getauscht, bleibt diese UI unverändert.
import { escapeHtml, weekLabel } from "@scripts/core/utils";
import { toast } from "@scripts/core/toast";
import { getActiveDriverKey } from "@scripts/core/storage";
import { updateSlice } from "@scripts/core/state";
import {
  listAnbau,
  upsertAnbau,
  deleteAnbau,
  listMassnahmen,
  upsertMassnahme,
  deleteMassnahme,
  importPsmAsMassnahmen,
  listKulturen,
  persistSqliteDatabaseFile,
} from "@scripts/core/storage/sqlite";
import { loadUnits, unitKey } from "./units";
import { getWeather, WEATHER_ATTRIBUTION } from "./weather";
import {
  ART_META,
  ART_ORDER,
  artMeta,
  STATUS_META,
  CROP_PALETTE,
  cropColor,
  safeColor,
  todayIso,
  dateNum,
  unitCrops,
  weekWindow,
  weekIndexOf,
  spanInWindow,
} from "./model";
import { renderBoard } from "./board";

interface Services {
  state: { getState: () => any; subscribe: (fn: (s: any) => void) => void };
  events?: { emit: (e: string, p?: unknown) => void };
}

const STATUS_OPTIONS = ["geplant", "aktiv", "abgeschlossen"];

export function initKultur(container: Element | null, services: Services): void {
  if (!(container instanceof HTMLElement)) return;
  container.innerHTML = renderShell();

  let units: any[] = [];
  let anbau: any[] = [];
  let mass: any[] = [];
  let kulturen: Array<{ kultur: string; anbau: string | null; eppoCode: string | null }> = [];
  let selKey: string | null = null;
  let mode: "flaechen" | "plan" = "flaechen";
  let loaded = false;
  let psmImportedThisSession = false;
  const weatherByKey: Record<string, any> = {};
  let modalEl: HTMLElement | null = null;

  const el = (s: string) => container.querySelector(s) as HTMLElement | null;
  const listEl = () => el('[data-role="list"]');
  const detailEl = () => el('[data-role="detail"]');
  const kpiEl = () => el('[data-role="kpis"]');
  const boardEl = () => el('[data-role="board-view"]');
  const flaechenViewEl = () => el('[data-role="flaechen-view"]');

  const sqliteOn = () => getActiveDriverKey() === "sqlite";
  const persist = () => { if (sqliteOn()) persistSqliteDatabaseFile().catch(() => {}); };
  const forUnitArr = (arr: any[], u: any) =>
    arr.filter((r) => r.flaecheTyp === u.typ && String(r.flaecheId) === String(u.id));
  const findUnit = (key: string) => units.find((u) => unitKey(u) === key) || null;
  const unitColor = (u: any, idx = 0) => safeColor(u.color) || CROP_PALETTE[idx % CROP_PALETTE.length];

  // ---------------- Laden ----------------
  async function loadAll() {
    units = await loadUnits(services);
    if (sqliteOn()) {
      try { const r = await listAnbau(); anbau = r?.rows || []; } catch { anbau = []; }
      try { const r = await listMassnahmen(); mass = r?.rows || []; } catch { mass = []; }
      try { const r = await listKulturen(); kulturen = r?.rows || []; } catch { kulturen = []; }
      if (!psmImportedThisSession) {
        psmImportedThisSession = true;
        try {
          const res = await importPsmAsMassnahmen();
          if (res?.imported) {
            const r = await listMassnahmen(); mass = r?.rows || [];
            toast.info(`${res.imported} Pflanzenschutz-Eintrag(e) in die Kulturführung übernommen.`);
            persist();
          }
        } catch {}
      }
    }
    if (!selKey && units.length) selKey = unitKey(units[0]);
    renderAll();
    void ensureWeather();
  }

  async function reloadData() {
    if (sqliteOn()) {
      try { const r = await listAnbau(); anbau = r?.rows || []; } catch {}
      try { const r = await listMassnahmen(); mass = r?.rows || []; } catch {}
    }
  }

  async function ensureWeather() {
    const u = selKey ? findUnit(selKey) : null;
    if (!u || u.lat == null || u.lon == null) return;
    const k = unitKey(u);
    if (weatherByKey[k]) return;
    weatherByKey[k] = { loading: true, weeks: [] };
    try {
      const wb = await getWeather(u.lat, u.lon);
      weatherByKey[k] = wb;
    } catch {
      weatherByKey[k] = { weeks: [] };
    }
    if (selKey === k) renderDetail();
  }

  // ---------------- Render: Gesamt ----------------
  function renderAll() {
    renderKpis();
    if (mode === "plan") {
      flaechenViewEl()!.style.display = "none";
      boardEl()!.style.display = "block";
      renderBoard(boardEl()!, { units, anbau, mass, onSelect: (key: string) => { selKey = key; setMode("flaechen"); } });
    } else {
      boardEl()!.style.display = "none";
      flaechenViewEl()!.style.display = "grid";
      renderList();
      renderDetail();
    }
    container.querySelectorAll(".km-btn").forEach((b: any) =>
      b.classList.toggle("active", b.dataset.mode === mode)
    );
  }

  function setMode(m: "flaechen" | "plan") { mode = m; renderAll(); }

  // ---------------- KPIs ----------------
  function renderKpis() {
    const host = kpiEl(); if (!host) return;
    const houses = units.filter((u) => u.typ === "haus").length;
    const fields = units.filter((u) => u.typ === "acker").length;
    let aktive = 0;
    let nextPlant: any = null;
    units.forEach((u) => {
      const { current, next } = unitCrops(forUnitArr(anbau, u));
      if (current) aktive++;
      if (next && next.pflanzDatum) {
        if (!nextPlant || dateNum(next.pflanzDatum) < dateNum(nextPlant.crop.pflanzDatum)) {
          nextPlant = { crop: next, unit: u };
        }
      }
    });
    const t = Number(todayIso().replace(/-/g, ""));
    const open = mass.filter((m) => m.status === "geplant");
    const overdue = open.filter((m) => m.planDatum && dateNum(m.planDatum) < t).length;
    const nextKw = nextPlant
      ? weekLabel(weekNumber(nextPlant.crop.pflanzDatum)) + " · " + escapeHtml(nextPlant.crop.kultur || "Kultur")
      : "–";
    host.innerHTML = `
      ${kpiCard("bi-grid-3x3-gap", "Flächen", String(units.length), `${houses} Häuser · ${fields} Freiland`)}
      ${kpiCard("bi-flower2", "Aktive Kulturen", String(aktive), `${Math.max(0, units.length - aktive)} frei`)}
      ${kpiCard("bi-list-check", "Offene Maßnahmen", String(open.length), overdue ? `<span style="color:var(--danger-600)">${overdue} überfällig</span>` : "im Plan")}
      ${kpiCard("bi-calendar-event", "Nächste Pflanzung", nextKw, nextPlant ? escapeHtml(nextPlant.unit.name) : "nichts geplant")}
      <button class="btn btn-sm btn-psm-secondary-outline km-import" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle me-1"></i>PSM übernehmen</button>`;
    host.querySelector('[data-role="psm-import"]')?.addEventListener("click", runPsmImport);
  }
  function kpiCard(icon: string, label: string, value: string, sub: string) {
    return `<div class="km-kpi"><div class="km-kpi-ic"><i class="bi ${icon}"></i></div><div class="km-kpi-body"><div class="km-kpi-label">${escapeHtml(label)}</div><div class="km-kpi-value">${value}</div><div class="km-kpi-sub">${sub}</div></div></div>`;
  }
  function weekNumber(iso: string): number {
    const d = new Date(String(iso).slice(0, 10) + "T00:00:00");
    if (isNaN(d.getTime())) return 0;
    // getIsoWeek via weekIndex on a 1-week window would be overkill; reuse model
    return require_isoWeek(d);
  }

  // ---------------- Liste ----------------
  function renderList() {
    const host = listEl(); if (!host) return;
    if (!units.length) {
      host.innerHTML = `<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter <b>Einstellungen → Standorte</b> anlegen oder Freiland im <b>Karte</b>-Reiter zeichnen.</p></div>`;
      return;
    }
    const houses = units.filter((u) => u.typ === "haus");
    const fields = units.filter((u) => u.typ === "acker");
    const group = (title: string, arr: any[]) =>
      arr.length
        ? `<div class="km-group">${escapeHtml(title)}</div>` +
          arr.map((u, i) => rowHtml(u, i)).join("")
        : "";
    host.innerHTML = group("Gewächshäuser", houses) + group("Freiland", fields);
    host.querySelectorAll("[data-ukey]").forEach((r: any) =>
      r.addEventListener("click", () => { selKey = r.dataset.ukey; renderList(); renderDetail(); void ensureWeather(); })
    );
  }
  function rowHtml(u: any, idx: number) {
    const key = unitKey(u);
    const { current } = unitCrops(forUnitArr(anbau, u));
    const sel = key === selKey;
    const sub = current
      ? `<span class="km-row-crop">${escapeHtml(current.kultur || "Kultur")}</span>`
      : `<span class="km-row-free">frei</span>`;
    return `<div class="km-row${sel ? " sel" : ""}" data-ukey="${key}">
      <span class="km-dot" style="background:${current ? cropColor(current) : unitColor(u, idx)}"></span>
      <div class="km-row-main"><div class="km-row-name">${escapeHtml(u.name)}</div><div class="km-row-sub">${sub}</div></div>
    </div>`;
  }

  // ---------------- Detail (Fläche-Dashboard) ----------------
  function renderDetail() {
    const host = detailEl(); if (!host) return;
    const u = selKey ? findUnit(selKey) : null;
    if (!u) {
      host.innerHTML = `<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links auswählen.</p></div>`;
      return;
    }
    const crops = forUnitArr(anbau, u);
    const measures = forUnitArr(mass, u);
    const { current, next } = unitCrops(crops);
    const wb = weatherByKey[unitKey(u)];
    const typBadge = u.typ === "haus" ? "Gewächshaus" : "Freiland";
    const areaTxt = u.areaQm ? `${Math.round(u.areaQm).toLocaleString("de-DE")} m²` : "";
    host.innerHTML = `
      <div class="km-head">
        <div class="km-head-l">
          <span class="km-head-name">${escapeHtml(u.name)}</span>
          <span class="km-head-badge">${typBadge}${areaTxt ? " · " + areaTxt : ""}</span>
        </div>
        <button class="btn btn-sm btn-psm-secondary-outline" data-act="map"><i class="bi bi-map me-1"></i>Auf Karte</button>
      </div>
      <div class="km-tiles">
        ${tileHtml("JETZT", current, "current")}
        ${tileHtml("NÄCHSTE", next, "next")}
      </div>
      ${renderTimeline(crops, measures, wb)}
      ${renderLegend()}
      ${renderMeasures(measures, current)}
      <div class="km-attr">${escapeHtml(WEATHER_ATTRIBUTION)}${wb?.stale ? " · offline (zwischengespeichert)" : ""}</div>`;

    host.querySelector('[data-act="map"]')?.addEventListener("click", () => openOnMap(u));
    host.querySelectorAll("[data-tile]").forEach((t: any) =>
      t.addEventListener("click", (e: any) => {
        if (e.target.closest("[data-edit-crop]")) return;
        const which = t.dataset.tile;
        const c = which === "current" ? current : next;
        editCrop(u, c, which === "next" ? "geplant" : "aktiv");
      })
    );
    host.querySelectorAll("[data-edit-crop]").forEach((b: any) =>
      b.addEventListener("click", () => {
        const c = b.dataset.editCrop === "current" ? current : next;
        editCrop(u, c, b.dataset.editCrop === "next" ? "geplant" : "aktiv");
      })
    );
    host.querySelector('[data-act="add-massnahme"]')?.addEventListener("click", () => editMassnahme(u, null, current));
    host.querySelectorAll("[data-m-done]").forEach((b: any) =>
      b.addEventListener("click", () => completeMassnahme(b.dataset.mDone))
    );
    host.querySelectorAll("[data-m-edit]").forEach((b: any) =>
      b.addEventListener("click", () => { const m = mass.find((x) => x.id === b.dataset.mEdit); editMassnahme(u, m, current); })
    );
    host.querySelectorAll("[data-m-del]").forEach((b: any) =>
      b.addEventListener("click", () => removeMassnahme(b.dataset.mDel))
    );
    host.querySelectorAll(".kw-bar[data-crop]").forEach((b: any) =>
      b.addEventListener("click", () => { const c = crops.find((x) => x.id === b.dataset.crop); if (c) editCrop(u, c, c.status); })
    );
  }

  function tileHtml(label: string, crop: any, which: string) {
    if (!crop) {
      return `<div class="km-tile empty" data-tile="${which}"><div class="km-tile-label">${label}</div><div class="km-tile-add"><i class="bi bi-plus-lg"></i> ${which === "next" ? "Nächste Kultur planen" : "Kultur eintragen"}</div></div>`;
    }
    const col = cropColor(crop);
    let info = "";
    if (which === "current") {
      const days = crop.pflanzDatum ? Math.max(0, Math.floor((Date.now() - new Date(crop.pflanzDatum).getTime()) / 86400000)) : null;
      const parts: string[] = [];
      if (crop.pflanzDatum) parts.push("seit " + weekLabel(weekNumber(crop.pflanzDatum)));
      if (days != null) parts.push("Tag " + days);
      if (crop.ernteDatum) parts.push("Ernte " + weekLabel(weekNumber(crop.ernteDatum)));
      info = parts.join(" · ");
    } else {
      const parts: string[] = [];
      if (crop.pflanzDatum) {
        parts.push("Pflanzung " + weekLabel(weekNumber(crop.pflanzDatum)));
        const wks = Math.round((new Date(crop.pflanzDatum).getTime() - Date.now()) / (7 * 86400000));
        if (wks > 0) parts.push("in " + wks + " Wo.");
      } else parts.push("Termin offen");
      info = parts.join(" · ");
    }
    return `<div class="km-tile" data-tile="${which}" style="border-left-color:${col}">
      <div class="km-tile-top"><div class="km-tile-label">${label}</div><button class="km-tile-edit" data-edit-crop="${which}" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>
      <div class="km-tile-crop">${escapeHtml(crop.kultur || "Kultur")}</div>
      <div class="km-tile-info">${escapeHtml(info)}</div>
    </div>`;
  }

  // ---------------- KW-Zeitleiste ----------------
  function unitWindow(crops: any[], measures: any[]) {
    const today = new Date();
    let from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7 * 5);
    let to = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7 * 14);
    const push = (iso: string) => {
      if (!iso) return;
      const d = new Date(String(iso).slice(0, 10) + "T00:00:00");
      if (isNaN(d.getTime())) return;
      if (d < from) from = d;
      if (d > to) to = d;
    };
    crops.forEach((c) => { push(c.pflanzDatum); push(c.ernteDatum); });
    measures.forEach((m) => push(m.planDatum || m.erledigtDatum));
    return weekWindow(from, to);
  }

  function renderTimeline(crops: any[], measures: any[], wb: any) {
    const win = unitWindow(crops, measures);
    const N = win.length;
    const colW = 40;
    let cells = "";
    win.forEach((w, i) => {
      cells += `<div class="kw-h${w.isCurrent ? " cur" : ""}${w.isFuture ? " fut" : ""}" style="grid-row:1;grid-column:${i + 2}">${w.week}</div>`;
    });
    const sortedCrops = [...crops].sort((a, b) => (dateNum(a.pflanzDatum) || 0) - (dateNum(b.pflanzDatum) || 0));
    sortedCrops.forEach((c, idx) => {
      const span = spanInWindow(win, c.pflanzDatum, c.ernteDatum);
      if (!span) return;
      const col = cropColor(c, idx);
      const planned = c.status === "geplant";
      cells += `<div class="kw-bar${planned ? " planned" : ""}${span.openEnd ? " open" : ""}" data-crop="${c.id}" title="${escapeHtml((c.kultur || "Kultur") + " · " + (STATUS_META[c.status]?.label || c.status))}" style="grid-row:2;grid-column:${span.s + 2}/${span.e + 3};--cc:${col}">${escapeHtml(c.kultur || "Kultur")}</div>`;
    });
    const byWeek: Record<number, any[]> = {};
    measures.forEach((m) => {
      const d = m.status === "erledigt" ? (m.erledigtDatum || m.planDatum) : (m.planDatum || m.erledigtDatum);
      const wi = weekIndexOf(win, d);
      if (wi >= 0) (byWeek[wi] = byWeek[wi] || []).push(m);
    });
    Object.keys(byWeek).forEach((wiStr) => {
      const wi = Number(wiStr);
      const dots = byWeek[wi].map((m) => {
        const a = artMeta(m.art);
        return `<span class="kw-dot${m.status === "erledigt" ? " done" : ""}" title="${escapeHtml(a.label + (m.notes ? ": " + m.notes : ""))}" style="--mc:${a.color}"><i class="bi ${a.icon}"></i></span>`;
      }).join("");
      cells += `<div class="kw-mcell" style="grid-row:3;grid-column:${wi + 2}">${dots}</div>`;
    });
    const wmap: Record<string, any> = {};
    (wb?.weeks || []).forEach((w: any) => (wmap[w.weekKey] = w));
    const maxP = Math.max(1, ...(wb?.weeks || []).map((w: any) => w.precipSum || 0));
    win.forEach((w, i) => {
      const ww = wmap[w.key];
      if (!ww) { cells += `<div class="kw-wcell" style="grid-row:4;grid-column:${i + 2}"></div>`; return; }
      const h = Math.round(2 + ((ww.precipSum || 0) / maxP) * 20);
      cells += `<div class="kw-wcell${ww.isForecast ? " fut" : ""}" style="grid-row:4;grid-column:${i + 2}" title="${Math.round(ww.precipSum || 0)} mm · ${ww.tMaxAvg != null ? Math.round(ww.tMaxAvg) : "–"}°C"><span class="kw-precip" style="height:${h}px"></span><span class="kw-temp">${ww.tMaxAvg != null ? Math.round(ww.tMaxAvg) + "°" : ""}</span></div>`;
    });
    const curIdx = win.findIndex((w) => w.isCurrent);
    const todayLine = curIdx >= 0 ? `<div class="kw-today" style="grid-row:1/5;grid-column:${curIdx + 2}"></div>` : "";
    const loadingNote = wb?.loading ? `<div class="kw-loading">Wetter lädt…</div>` : "";
    return `<div class="kw-scroll"><div class="kw-grid" style="grid-template-columns:62px repeat(${N},${colW}px)">
      <div class="kw-rl" style="grid-row:1;grid-column:1">KW</div>
      <div class="kw-rl" style="grid-row:2;grid-column:1">Kultur</div>
      <div class="kw-rl" style="grid-row:3;grid-column:1">Maßn.</div>
      <div class="kw-rl" style="grid-row:4;grid-column:1">Wetter</div>
      ${cells}${todayLine}
    </div>${loadingNote}</div>
    <div class="kw-split"><span>◀ Ist / Archiv</span><span>Vorhersage ▶</span></div>`;
  }

  function renderLegend() {
    return `<div class="km-legend">${ART_ORDER.map((a) => {
      const m = ART_META[a];
      return `<span class="km-leg"><span class="km-leg-dot" style="background:${m.color}"></span>${escapeHtml(m.label)}</span>`;
    }).join("")}</div>`;
  }

  // ---------------- Maßnahmen-Liste ----------------
  function renderMeasures(measures: any[], current: any) {
    const open = measures.filter((m) => m.status === "geplant").sort((a, b) => (dateNum(a.planDatum) || 9e15) - (dateNum(b.planDatum) || 9e15));
    const done = measures.filter((m) => m.status === "erledigt").sort((a, b) => (dateNum(b.erledigtDatum) || 0) - (dateNum(a.erledigtDatum) || 0)).slice(0, 8);
    const t = Number(todayIso().replace(/-/g, ""));
    const row = (m: any) => {
      const a = artMeta(m.art);
      const date = m.status === "erledigt" ? m.erledigtDatum : m.planDatum;
      const overdue = m.status === "geplant" && date && dateNum(date) < t;
      const kw = date ? weekLabel(weekNumber(date)) : "Termin offen";
      const psm = m.historyId ? `<span class="km-tag">PSM</span>` : "";
      const amount = m.menge != null ? ` · ${m.menge}${m.einheit ? " " + escapeHtml(m.einheit) : ""}` : "";
      const title = m.notes || a.label;
      return `<div class="km-m">
        <i class="bi ${a.icon}" style="color:${a.color}"></i>
        <div class="km-m-main"><div class="km-m-title">${escapeHtml(title)}${psm}</div><div class="km-m-sub">${a.label}${m.mittel ? " · " + escapeHtml(m.mittel) : ""}${amount}</div></div>
        <div class="km-m-date${overdue ? " overdue" : ""}">${kw}${overdue ? " · überfällig" : ""}</div>
        <div class="km-m-acts">
          ${m.status === "geplant" ? `<button class="km-ic" data-m-done="${m.id}" title="Als erledigt markieren"><i class="bi bi-check2"></i></button>` : ""}
          <button class="km-ic" data-m-edit="${m.id}" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
          <button class="km-ic danger" data-m-del="${m.id}" title="Löschen"><i class="bi bi-trash"></i></button>
        </div>
      </div>`;
    };
    return `<div class="km-mhead"><span>Maßnahmen</span><button class="btn btn-sm btn-psm-primary" data-act="add-massnahme"><i class="bi bi-plus-lg me-1"></i>Maßnahme</button></div>
      ${open.length ? `<div class="km-msub">Anstehend</div>${open.map(row).join("")}` : `<div class="km-mnone">Keine offenen Maßnahmen.</div>`}
      ${done.length ? `<div class="km-msub">Erledigt</div>${done.map(row).join("")}` : ""}`;
  }

  // ---------------- Aktionen ----------------
  function openOnMap(u: any) {
    updateSlice("app", (app: any) => ({ ...app, activeSection: "acker" }));
    services.events?.emit?.("kultur:focusUnit", { typ: u.typ, id: u.id });
    toast.info("Karte geöffnet.");
  }

  async function runPsmImport() {
    if (!sqliteOn()) { toast.warning("Keine Datenbank aktiv."); return; }
    try {
      const res = await importPsmAsMassnahmen();
      await reloadData();
      renderAll();
      if (res?.imported) { toast.success(`${res.imported} Pflanzenschutz-Maßnahme(n) übernommen.`); persist(); }
      else toast.info(`Nichts Neues zu übernehmen${res?.skipped ? ` (${res.skipped} nicht eindeutig zuordenbar)` : ""}.`);
    } catch { toast.error("Übernahme fehlgeschlagen."); }
  }

  async function completeMassnahme(id: string) {
    const m = mass.find((x) => x.id === id); if (!m) return;
    try {
      await upsertMassnahme({ ...m, status: "erledigt", erledigtDatum: m.erledigtDatum || todayIso() });
      await reloadData(); renderAll(); persist();
    } catch { toast.error("Speichern fehlgeschlagen."); }
  }
  async function removeMassnahme(id: string) {
    try { await deleteMassnahme({ id }); await reloadData(); renderAll(); persist(); toast.info("Maßnahme gelöscht."); }
    catch { toast.error("Löschen fehlgeschlagen."); }
  }

  // ---------------- Modals ----------------
  function closeModal() { if (modalEl) { modalEl.remove(); modalEl = null; } }
  function openModal(title: string, bodyHtml: string, saveLabel: string, onSave: (root: HTMLElement) => boolean | void) {
    closeModal();
    const ov = document.createElement("div");
    ov.className = "kmodal-ov";
    ov.innerHTML = `<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${escapeHtml(title)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${bodyHtml}</div>
      <div class="kmodal-f"><button class="btn btn-psm-secondary-outline" data-k="cancel">Abbrechen</button><button class="btn btn-psm-primary" data-k="save">${escapeHtml(saveLabel)}</button></div>
    </div>`;
    container.appendChild(ov);
    modalEl = ov;
    ov.querySelector(".kmodal-x")!.addEventListener("click", closeModal);
    ov.querySelector('[data-k="cancel"]')!.addEventListener("click", closeModal);
    ov.addEventListener("mousedown", (e: any) => { if (e.target === ov) closeModal(); });
    ov.querySelector('[data-k="save"]')!.addEventListener("click", () => { const r = onSave(ov); if (r !== false) closeModal(); });
    const first = ov.querySelector("input,select,textarea") as HTMLElement | null;
    setTimeout(() => first?.focus(), 30);
    return ov;
  }

  function kulturDatalist() {
    const seen = new Set<string>();
    const opts = kulturen
      .map((k) => k.kultur)
      .filter((k) => k && !seen.has(k) && seen.add(k))
      .map((k) => `<option value="${escapeHtml(k)}"></option>`)
      .join("");
    return `<datalist id="km-kultur-dl">${opts}</datalist>`;
  }

  function editCrop(u: any, crop: any, defaultStatus: string) {
    const c = crop || { status: defaultStatus, color: null };
    const swatches = CROP_PALETTE.map((col) => `<button type="button" class="km-sw${(c.color || "") === col ? " on" : ""}" data-col="${col}" style="background:${col}"></button>`).join("");
    const body = `
      <label class="km-fld">Kultur<input list="km-kultur-dl" data-f="kultur" value="${escapeHtml(c.kultur || "")}" placeholder="z. B. Babyleafsalate" /></label>${kulturDatalist()}
      <div class="km-frow">
        <label class="km-fld">Status<select data-f="status">${STATUS_OPTIONS.map((s) => `<option value="${s}"${(c.status || defaultStatus) === s ? " selected" : ""}>${STATUS_META[s].label}</option>`).join("")}</select></label>
        <label class="km-fld">Pflanzdatum<input type="date" data-f="pflanz" value="${(c.pflanzDatum || "").slice(0, 10)}" /></label>
        <label class="km-fld">Erntedatum<input type="date" data-f="ernte" value="${(c.ernteDatum || "").slice(0, 10)}" /></label>
      </div>
      <div class="km-fld">Farbe<div class="km-sws">${swatches}</div></div>
      <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${escapeHtml(c.notes || "")}</textarea></label>
      ${crop ? `<button type="button" class="btn btn-sm btn-psm-danger-outline" data-f="del" style="margin-top:8px"><i class="bi bi-trash me-1"></i>Kultur löschen</button>` : ""}`;
    const ov = openModal(crop ? "Kultur bearbeiten" : "Kultur eintragen", body, "Speichern", (root) => {
      const get = (f: string) => (root.querySelector(`[data-f="${f}"]`) as HTMLInputElement)?.value?.trim() || "";
      const kultur = get("kultur");
      if (!kultur) { toast.warning("Bitte eine Kultur angeben."); return false; }
      const selSw = root.querySelector(".km-sw.on") as HTMLElement | null;
      const eppo = kulturen.find((k) => k.kultur === kultur)?.eppoCode || null;
      const payload = {
        id: crop?.id, flaecheTyp: u.typ, flaecheId: u.id, kultur, eppoCode: eppo,
        status: get("status") || defaultStatus,
        pflanzDatum: get("pflanz") || null, ernteDatum: get("ernte") || null,
        color: selSw?.dataset.col || c.color || null, notes: get("notes") || null,
      };
      void (async () => { try { await upsertAnbau(payload); await reloadData(); renderAll(); persist(); } catch { toast.error("Speichern fehlgeschlagen."); } })();
    });
    ov.querySelectorAll(".km-sw").forEach((b: any) => b.addEventListener("click", () => {
      ov.querySelectorAll(".km-sw").forEach((x: any) => x.classList.remove("on")); b.classList.add("on");
    }));
    ov.querySelector('[data-f="del"]')?.addEventListener("click", async () => {
      if (!crop?.id) return;
      try { await deleteAnbau({ id: crop.id }); await reloadData(); renderAll(); persist(); closeModal(); toast.info("Kultur gelöscht."); }
      catch { toast.error("Löschen fehlgeschlagen."); }
    });
  }

  function editMassnahme(u: any, m: any, current: any) {
    const cur = m || { art: "mechanisch", status: "geplant" };
    const chips = ART_ORDER.map((a) => {
      const meta = ART_META[a];
      return `<button type="button" class="km-chip${(cur.art || "mechanisch") === a ? " on" : ""}" data-art="${a}" style="--ac:${meta.color}"><i class="bi ${meta.icon}"></i>${escapeHtml(meta.label)}</button>`;
    }).join("");
    const isDone = (cur.status || "geplant") === "erledigt";
    const body = `
      <div class="km-fld">Art<div class="km-chips">${chips}</div></div>
      <label class="km-fld">Bezeichnung<input data-f="notes" value="${escapeHtml(cur.notes || "")}" placeholder="z. B. Unkraut hacken, Kompostgabe" /></label>
      <div class="km-frow">
        <label class="km-fld">Status<select data-f="status"><option value="geplant"${!isDone ? " selected" : ""}>geplant</option><option value="erledigt"${isDone ? " selected" : ""}>erledigt</option></select></label>
        <label class="km-fld"><span data-role="datelabel">${isDone ? "Erledigt am" : "Plandatum"}</span><input type="date" data-f="datum" value="${((isDone ? cur.erledigtDatum : cur.planDatum) || todayIso()).slice(0, 10)}" /></label>
      </div>
      <div class="km-frow">
        <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${cur.menge != null ? cur.menge : ""}" placeholder="optional" /></label>
        <label class="km-fld">Einheit<input data-f="einheit" value="${escapeHtml(cur.einheit || "")}" placeholder="z. B. kg/ha, l" /></label>
        <label class="km-fld">Mittel<input data-f="mittel" value="${escapeHtml(cur.mittel || "")}" placeholder="optional" /></label>
      </div>
      <div class="km-psmhint" data-role="psmhint" style="${(cur.art || "mechanisch") === "chemisch_psm" ? "" : "display:none"}"><i class="bi bi-info-circle me-1"></i>Für die rechtssichere Pflanzenschutz-Doku bitte den <b>PSM-Bereich</b> nutzen – diese Maßnahme dient der Planung/Übersicht.</div>
      ${m ? `<button type="button" class="btn btn-sm btn-psm-danger-outline" data-f="del" style="margin-top:8px"><i class="bi bi-trash me-1"></i>Maßnahme löschen</button>` : ""}`;
    const ov = openModal(m ? "Maßnahme bearbeiten" : "Neue Maßnahme", body, "Speichern", (root) => {
      const art = (root.querySelector(".km-chip.on") as HTMLElement)?.dataset.art || "mechanisch";
      const status = (root.querySelector('[data-f="status"]') as HTMLSelectElement).value;
      const datum = (root.querySelector('[data-f="datum"]') as HTMLInputElement).value || null;
      const num = (f: string) => { const v = (root.querySelector(`[data-f="${f}"]`) as HTMLInputElement).value; return v ? Number(v) : null; };
      const str = (f: string) => (root.querySelector(`[data-f="${f}"]`) as HTMLInputElement).value.trim() || null;
      const payload = {
        id: m?.id, flaecheTyp: u.typ, flaecheId: u.id, anbauId: m?.anbauId || current?.id || null,
        art, status,
        planDatum: status === "geplant" ? datum : (m?.planDatum || null),
        erledigtDatum: status === "erledigt" ? datum : null,
        menge: num("menge"), einheit: str("einheit"), mittel: str("mittel"),
        historyId: m?.historyId || null, notes: str("notes"),
      };
      void (async () => { try { await upsertMassnahme(payload); await reloadData(); renderAll(); persist(); } catch { toast.error("Speichern fehlgeschlagen."); } })();
    });
    ov.querySelectorAll(".km-chip").forEach((b: any) => b.addEventListener("click", () => {
      ov.querySelectorAll(".km-chip").forEach((x: any) => x.classList.remove("on")); b.classList.add("on");
      (ov.querySelector('[data-role="psmhint"]') as HTMLElement).style.display = b.dataset.art === "chemisch_psm" ? "" : "none";
    }));
    ov.querySelector('[data-f="status"]')?.addEventListener("change", (e: any) => {
      (ov.querySelector('[data-role="datelabel"]') as HTMLElement).textContent = e.target.value === "erledigt" ? "Erledigt am" : "Plandatum";
    });
    ov.querySelector('[data-f="del"]')?.addEventListener("click", async () => {
      if (!m?.id) return;
      try { await deleteMassnahme({ id: m.id }); await reloadData(); renderAll(); persist(); closeModal(); toast.info("Maßnahme gelöscht."); }
      catch { toast.error("Löschen fehlgeschlagen."); }
    });
  }

  // ---------------- Lifecycle ----------------
  container.querySelectorAll(".km-btn").forEach((b: any) =>
    b.addEventListener("click", () => setMode(b.dataset.mode))
  );
  document.addEventListener("keydown", (e: any) => { if (e.key === "Escape" && modalEl) closeModal(); });

  // Querverweis von der Karte: "Kulturführung öffnen" wählt die Fläche vor.
  window.addEventListener("psm:openKultur", (e: any) => {
    const d = e?.detail;
    if (!d || !d.typ || !d.id) return;
    selKey = d.typ + ":" + d.id;
    setMode("flaechen");
    if (loaded) { renderList(); renderDetail(); void ensureWeather(); }
  });

  services.state.subscribe((s: any) => {
    if (s?.app?.activeSection === "kultur") {
      if (!loaded) { loaded = true; void loadAll(); }
      else { void (async () => { units = await loadUnits(services); renderAll(); void ensureWeather(); })(); }
    }
  });
  renderKpis();
}

// ISO-Wochennummer eines ISO-Datums (lokaler Helfer ohne Import-Zyklus).
function require_isoWeek(d: Date): number {
  const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = x.getUTCDay() || 7;
  x.setUTCDate(x.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(x.getUTCFullYear(), 0, 1));
  return Math.ceil(((x.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function renderShell(): string {
  return `
  <style>
    .kultur-wrap{display:flex;flex-direction:column;gap:12px;min-height:calc(100vh - 120px)}
    .kultur-top{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}
    .kultur-modes{display:inline-flex;background:var(--surface-2);border:1px solid var(--border-1);border-radius:9px;padding:3px}
    .km-btn{border:0;background:transparent;color:var(--text-muted);font-size:13px;font-weight:600;padding:6px 14px;border-radius:7px;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .km-btn.active{background:var(--surface-1);color:var(--text);box-shadow:0 1px 2px rgba(0,0,0,.08)}
    .kultur-kpis{display:flex;flex-wrap:wrap;gap:10px;align-items:stretch}
    .km-kpi{display:flex;gap:10px;align-items:center;background:var(--surface-1);border:1px solid var(--border-1);border-radius:11px;padding:9px 13px;min-width:148px}
    .km-kpi-ic{width:34px;height:34px;border-radius:9px;background:var(--surface-2);display:flex;align-items:center;justify-content:center;color:#16a34a;font-size:16px;flex:none}
    .km-kpi-label{font-size:11px;color:var(--text-dim)}
    .km-kpi-value{font-size:18px;font-weight:700;color:var(--text);line-height:1.15}
    .km-kpi-sub{font-size:10.5px;color:var(--text-dim)}
    .km-import{white-space:nowrap}
    .kultur-body{display:grid;grid-template-columns:240px 1fr;gap:12px;flex:1;min-height:0}
    .kultur-list{background:var(--surface-1);border:1px solid var(--border-1);border-radius:12px;padding:8px;overflow-y:auto;max-height:calc(100vh - 200px)}
    .km-group{font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;padding:8px 8px 4px}
    .km-row{display:flex;align-items:center;gap:9px;padding:8px;border-radius:8px;cursor:pointer}
    .km-row:hover{background:var(--surface-2)}
    .km-row.sel{background:var(--surface-3);box-shadow:inset 2px 0 0 #16a34a}
    .km-dot{width:9px;height:9px;border-radius:3px;flex:none}
    .km-row-main{min-width:0}
    .km-row-name{font-size:13.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .km-row-sub{font-size:11.5px}
    .km-row-crop{color:var(--text-muted)}
    .km-row-free{color:var(--text-dim)}
    .kultur-detail{background:var(--surface-1);border:1px solid var(--border-1);border-radius:12px;padding:14px;overflow-y:auto;max-height:calc(100vh - 200px)}
    .km-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--text-dim);text-align:center;padding:36px 14px;height:100%}
    .km-empty i{font-size:30px;opacity:.5}
    .km-empty p{font-size:13px;line-height:1.5;margin:0}
    .km-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
    .km-head-name{font-size:17px;font-weight:700;color:var(--text)}
    .km-head-badge{font-size:11.5px;color:#0f766e;background:rgba(16,163,74,.1);border-radius:7px;padding:2px 8px;margin-left:8px}
    .km-tiles{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
    .km-tile{background:var(--surface-2);border-radius:10px;border-left:3px solid #16a34a;padding:10px 12px;cursor:pointer}
    .km-tile.empty{border-left-color:var(--border-2);display:flex;flex-direction:column;justify-content:center;min-height:78px}
    .km-tile-top{display:flex;align-items:center;justify-content:space-between}
    .km-tile-label{font-size:10.5px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em}
    .km-tile-edit{border:0;background:transparent;color:var(--text-dim);cursor:pointer;padding:2px;font-size:12px}
    .km-tile-edit:hover{color:var(--text)}
    .km-tile-crop{font-size:16px;font-weight:700;color:var(--text);margin-top:2px}
    .km-tile-info{font-size:12px;color:var(--text-muted)}
    .km-tile-add{color:var(--text-dim);font-size:13px;display:flex;align-items:center;gap:6px}
    .kw-scroll{overflow-x:auto;border:1px solid var(--border-1);border-radius:10px;padding:8px;background:var(--surface-1)}
    .kw-grid{display:grid;column-gap:2px;row-gap:6px;align-items:center;position:relative;min-width:min-content}
    .kw-rl{position:sticky;left:0;z-index:3;background:var(--surface-1);font-size:11px;color:var(--text-muted);padding-right:6px}
    .kw-h{text-align:center;font-size:11px;color:var(--text-muted)}
    .kw-h.cur{color:#16a34a;font-weight:700}
    .kw-h.fut{color:var(--info-600,#0891b2)}
    .kw-bar{height:20px;border-radius:5px;background:var(--cc);color:#fff;font-size:11px;display:flex;align-items:center;padding:0 7px;overflow:hidden;white-space:nowrap;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
    .kw-bar.planned{background:transparent;color:var(--cc);border:1.5px dashed var(--cc)}
    .kw-bar.open{border-top-right-radius:0;border-bottom-right-radius:0}
    .kw-mcell{display:flex;flex-wrap:wrap;gap:2px;justify-content:center}
    .kw-dot{width:18px;height:18px;border-radius:50%;background:#fff;border:1.5px solid var(--mc);color:var(--mc);display:flex;align-items:center;justify-content:center;font-size:10px}
    .kw-dot.done{background:var(--mc);color:#fff}
    .kw-wcell{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:1px;min-height:30px}
    .kw-precip{width:9px;border-radius:2px;background:#0ea5e9}
    .kw-wcell.fut .kw-precip{background:transparent;border:1px solid #7dd3fc}
    .kw-temp{font-size:9.5px;color:var(--text-dim);line-height:1}
    .kw-today{border-left:2px dashed #16a34a;pointer-events:none;z-index:1}
    .kw-loading{font-size:11px;color:var(--text-dim);padding:4px}
    .kw-split{display:flex;justify-content:space-between;font-size:10.5px;color:var(--text-dim);margin:4px 2px 10px}
    .km-legend{display:flex;flex-wrap:wrap;gap:5px 12px;font-size:11px;color:var(--text-muted);margin-bottom:14px}
    .km-leg{display:flex;align-items:center;gap:5px}
    .km-leg-dot{width:10px;height:10px;border-radius:3px}
    .km-mhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
    .km-mhead>span{font-size:14px;font-weight:700;color:var(--text)}
    .km-msub{font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;margin:10px 0 4px}
    .km-mnone{font-size:12.5px;color:var(--text-dim);padding:6px 0}
    .km-m{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--border-1);border-radius:9px;margin-bottom:6px}
    .km-m>i{font-size:16px;flex:none}
    .km-m-main{flex:1;min-width:0}
    .km-m-title{font-size:13px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:6px}
    .km-m-sub{font-size:11px;color:var(--text-dim)}
    .km-m-date{font-size:11.5px;color:var(--text-muted);white-space:nowrap}
    .km-m-date.overdue{color:var(--danger-600);font-weight:600}
    .km-tag{font-size:9.5px;background:rgba(220,38,38,.12);color:var(--danger-600);border-radius:5px;padding:1px 5px;font-weight:700}
    .km-m-acts{display:flex;gap:3px}
    .km-ic{border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);width:27px;height:27px;border-radius:7px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:13px}
    .km-ic:hover{background:var(--surface-3);color:var(--text)}
    .km-ic.danger:hover{color:var(--danger-600)}
    .km-attr{font-size:10.5px;color:var(--text-dim);border-top:1px solid var(--border-1);margin-top:12px;padding-top:8px}
    .kultur-board{background:var(--surface-1);border:1px solid var(--border-1);border-radius:12px;padding:12px;overflow:auto;max-height:calc(100vh - 190px)}
    /* Modal */
    .kmodal-ov{position:fixed;inset:0;z-index:3000;background:rgba(15,23,42,.4);display:flex;align-items:center;justify-content:center;padding:16px}
    .kmodal{background:var(--surface-1);border-radius:14px;width:min(520px,96vw);max-height:92vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.3)}
    .kmodal-h{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--border-1);font-size:15px;font-weight:700;color:var(--text)}
    .kmodal-x{border:0;background:transparent;color:var(--text-dim);cursor:pointer;font-size:15px}
    .kmodal-b{padding:14px 16px;overflow-y:auto;display:flex;flex-direction:column;gap:10px}
    .kmodal-f{display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;border-top:1px solid var(--border-1)}
    .km-fld{display:flex;flex-direction:column;gap:4px;font-size:12px;color:var(--text-muted)}
    .km-fld input,.km-fld select,.km-fld textarea{padding:8px 9px;border:1px solid var(--border-1);border-radius:8px;font-size:13px;background:var(--surface-1);color:var(--text);width:100%}
    .km-frow{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
    .km-sws{display:flex;gap:6px;flex-wrap:wrap}
    .km-sw{width:26px;height:26px;border-radius:7px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0}
    .km-sw.on{box-shadow:0 0 0 2px var(--text)}
    .km-chips{display:flex;flex-wrap:wrap;gap:6px}
    .km-chip{display:inline-flex;align-items:center;gap:5px;border:1.5px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:8px;padding:6px 10px;font-size:12px;cursor:pointer}
    .km-chip.on{border-color:var(--ac);color:var(--ac);background:color-mix(in srgb,var(--ac) 10%,transparent)}
    .km-psmhint{font-size:11.5px;color:var(--text-muted);background:var(--surface-2);border-radius:8px;padding:8px 10px;line-height:1.45}
    /* Anbauplan-Board */
    .kb-wrap{overflow:auto;max-width:100%}
    .kb-grid{display:grid;column-gap:2px;row-gap:3px;align-items:center;position:relative;min-width:min-content}
    .kb-corner{position:sticky;left:0;top:0;z-index:5;background:var(--surface-1);font-size:11px;font-weight:600;color:var(--text-muted);display:flex;align-items:center}
    .kb-h{position:sticky;top:0;z-index:3;background:var(--surface-1);text-align:center;font-size:10.5px;color:var(--text-muted)}
    .kb-h.cur{color:#16a34a;font-weight:700}
    .kb-h.fut{color:var(--info-600,#0891b2)}
    .kb-group{font-size:10.5px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;padding-top:4px}
    .kb-name{position:sticky;left:0;z-index:2;background:var(--surface-1);font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;padding-right:6px}
    .kb-name:hover{color:#16a34a}
    .kb-bar{height:18px;border-radius:4px;background:var(--cc);color:#fff;font-size:10px;display:flex;align-items:center;padding:0 5px;overflow:hidden;white-space:nowrap;z-index:1}
    .kb-bar.planned{background:transparent;color:var(--cc);border:1.5px dashed var(--cc)}
    .kb-m{width:7px;height:7px;border-radius:2px;background:var(--mc);align-self:start;justify-self:center;margin-top:1px;z-index:2}
    .kb-today{border-left:2px dashed #16a34a;pointer-events:none;z-index:1}
    @media(max-width:820px){.kultur-body{grid-template-columns:1fr}.kultur-list{max-height:200px}.km-frow{grid-template-columns:1fr 1fr}}
  </style>
  <section class="calc-section kultur-wrap">
    <div class="kultur-top">
      <div class="kultur-modes">
        <button class="km-btn active" data-mode="flaechen"><i class="bi bi-grid-1x2"></i>Flächen</button>
        <button class="km-btn" data-mode="plan"><i class="bi bi-calendar3"></i>Anbauplan</button>
      </div>
      <div class="kultur-kpis" data-role="kpis"></div>
    </div>
    <div class="kultur-body" data-role="flaechen-view">
      <aside class="kultur-list" data-role="list"></aside>
      <div class="kultur-detail" data-role="detail"></div>
    </div>
    <div class="kultur-board" data-role="board-view" style="display:none"></div>
  </section>`;
}
