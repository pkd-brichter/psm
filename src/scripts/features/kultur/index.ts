// @ts-nocheck
// Kulturführung – ruhiges, Aufgaben-zuerst Dashboard je Fläche (Freiland +
// Gewächshaus). Großer Status (aktuelle Kultur / "frei"), einfache
// Aufgabenliste, Wetter als 1-Zeile; die KW-Planung (Gantt) lebt im Reiter
// "Anbauplan". Eingabe bewusst minimal (1 Tipp, Rest hinter "Mehr").
//
// Künftiges Backend: aller Datenzugriff über die Bridge (listAnbau/upsertAnbau/
// listMassnahmen/… , importPsmAsMassnahmen). Worker→HTTP wäre ein 1-Schicht-
// Wechsel in storage/sqlite.ts; diese UI bliebe unverändert.
import { escapeHtml, weekLabel, getIsoWeek } from "@scripts/core/utils";
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
  MONTHS_SHORT,
  monthsBetween,
  posInMonths,
} from "./model";
import { renderBoard } from "./board";

interface Services {
  state: { getState: () => any; subscribe: (fn: (s: any) => void) => void };
  events?: { emit: (e: string, p?: unknown) => void };
}

// Aufgaben-Schnellwahl: gärtner-freundliche Labels → DB-Art.
const TASK_TILES = [
  { art: "bewaesserung", label: "Gießen", icon: "bi-droplet" },
  { art: "mechanisch", label: "Hacken", icon: "bi-tools" },
  { art: "duengung", label: "Düngen", icon: "bi-flower1" },
  { art: "nuetzlinge", label: "Nützlinge", icon: "bi-bug" },
  { art: "chemisch_psm", label: "Pflanzenschutz", icon: "bi-droplet-half" },
  { art: "monitoring", label: "Kontrolle", icon: "bi-eye" },
  { art: "sonstiges", label: "Sonstiges", icon: "bi-three-dots" },
];

const MONTHS = ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];

export function initKultur(container: Element | null, services: Services): void {
  if (!(container instanceof HTMLElement)) return;
  container.innerHTML = renderShell();

  let units: any[] = [];
  let anbau: any[] = [];
  let mass: any[] = [];
  let kulturen: any[] = [];
  let selKey: string | null = null;
  let mode: "flaechen" | "plan" = "plan"; // Überblick (Anbauplan) zuerst
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
  const forUnitArr = (arr: any[], u: any) => arr.filter((r) => r.flaecheTyp === u.typ && String(r.flaecheId) === String(u.id));
  const findUnit = (key: string) => units.find((u) => unitKey(u) === key) || null;
  const unitColor = (u: any, idx = 0) => safeColor(u.color) || CROP_PALETTE[idx % CROP_PALETTE.length];

  // ---------------- Daten laden ----------------
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
            toast.info(`${res.imported} Pflanzenschutz-Eintrag(e) übernommen.`);
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
    if (!sqliteOn()) return;
    try { const r = await listAnbau(); anbau = r?.rows || []; } catch {}
    try { const r = await listMassnahmen(); mass = r?.rows || []; } catch {}
  }
  async function ensureWeather() {
    const u = selKey ? findUnit(selKey) : null;
    if (!u || u.lat == null || u.lon == null) return;
    const k = unitKey(u);
    if (weatherByKey[k]) return;
    weatherByKey[k] = { loading: true, weeks: [] };
    try { weatherByKey[k] = await getWeather(u.lat, u.lon); }
    catch { weatherByKey[k] = { weeks: [] }; }
    if (selKey === k) renderDetail();
  }

  // ---------------- Render gesamt ----------------
  function renderAll() {
    renderKpis();
    if (mode === "plan") {
      flaechenViewEl()!.style.display = "none";
      boardEl()!.style.display = "block";
      renderBoard(boardEl()!, {
        units, anbau, mass,
        onSelect: (key: string) => { selKey = key; setMode("flaechen"); void ensureWeather(); },
        onContext: (key: string, x: number, y: number) => openUnitMenu(key, x, y),
      });
    } else {
      boardEl()!.style.display = "none";
      flaechenViewEl()!.style.display = "grid";
      renderList();
      renderDetail();
    }
    container.querySelectorAll(".km-modebtn").forEach((b: any) => b.classList.toggle("active", b.dataset.mode === mode));
  }
  function setMode(m: "flaechen" | "plan") { mode = m; renderAll(); }

  // ---------------- KPIs (schlank) ----------------
  function renderKpis() {
    const host = kpiEl(); if (!host) return;
    const houses = units.filter((u) => u.typ === "haus").length;
    const fields = units.filter((u) => u.typ === "acker").length;
    let aktive = 0, nextPlant: any = null;
    units.forEach((u) => {
      const { current, next } = unitCrops(forUnitArr(anbau, u));
      if (current) aktive++;
      if (next?.pflanzDatum && (!nextPlant || dateNum(next.pflanzDatum) < dateNum(nextPlant.pflanzDatum))) nextPlant = next;
    });
    const open = mass.filter((m) => m.status === "geplant").length;
    host.innerHTML = `
      ${kpi(String(units.length), "Flächen")}
      ${kpi(String(aktive), "Kulturen aktiv")}
      ${kpi(String(open), "Aufgaben offen")}
      ${kpi(nextPlant ? weekLabel(weekNumber(nextPlant.pflanzDatum)) : "–", "Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`;
    host.querySelector('[data-role="psm-import"]')?.addEventListener("click", runPsmImport);
  }
  const kpi = (v: string, l: string) => `<div class="km-kpi"><div class="km-kpi-v">${v}</div><div class="km-kpi-l">${escapeHtml(l)}</div></div>`;

  // ---------------- Flächenliste ----------------
  function renderList() {
    const host = listEl(); if (!host) return;
    if (!units.length) {
      host.innerHTML = `<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>`;
      return;
    }
    const houses = units.filter((u) => u.typ === "haus");
    const fields = units.filter((u) => u.typ === "acker");
    const grp = (t: string, arr: any[]) => (arr.length ? `<div class="km-grp">${escapeHtml(t)}</div>` + arr.map(rowHtml).join("") : "");
    host.innerHTML = grp("Gewächshäuser", houses) + grp("Freiland", fields);
    host.querySelectorAll("[data-ukey]").forEach((r: any) => {
      r.addEventListener("click", () => { selKey = r.dataset.ukey; renderList(); renderDetail(); void ensureWeather(); });
      r.addEventListener("contextmenu", (e: any) => { e.preventDefault(); openUnitMenu(r.dataset.ukey, e.clientX, e.clientY); });
    });
  }
  function rowHtml(u: any, idx: number) {
    const key = unitKey(u);
    const { current } = unitCrops(forUnitArr(anbau, u));
    const sel = key === selKey;
    return `<div class="km-row${sel ? " sel" : ""}" data-ukey="${key}">
      <span class="km-dot" style="background:${escapeHtml(current ? cropColor(current) : unitColor(u, idx))}"></span>
      <div class="km-row-main"><div class="km-row-name">${escapeHtml(u.name)}</div>
      <div class="km-row-sub">${current ? `<span class="crop">${escapeHtml(current.kultur || "Kultur")}</span>` : `<span class="free">frei</span>`}</div></div>
    </div>`;
  }

  // ---------------- Detail: ruhiges Dashboard ----------------
  function renderDetail() {
    const host = detailEl(); if (!host) return;
    const u = selKey ? findUnit(selKey) : null;
    if (!u) { host.innerHTML = `<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>`; return; }
    const crops = forUnitArr(anbau, u);
    const measures = forUnitArr(mass, u);
    const { current, next } = unitCrops(crops);
    const wb = weatherByKey[unitKey(u)];
    const typ = u.typ === "haus" ? "Gewächshaus" : "Freiland";
    const area = u.areaQm ? `${Math.round(u.areaQm).toLocaleString("de-DE")} m²` : "";

    // Status-Hero
    let hero;
    if (current) {
      const since = current.pflanzDatum ? `seit ${fmtDay(current.pflanzDatum)} · ${weekLabel(weekNumber(current.pflanzDatum))}` : "";
      const harvest = harvestText(current);
      hero = `<div class="km-hero active" style="--cc:${escapeHtml(cropColor(current))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${escapeHtml(current.kultur || "Kultur")}</div><div class="km-hero-sub">${escapeHtml(since + harvest)}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`;
    } else {
      hero = `<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;
    }
    const nextLine = next
      ? `<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${escapeHtml(next.kultur || "Kultur")}</b> · ab ${weekLabel(weekNumber(next.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`
      : (current ? `<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>` : "");

    host.innerHTML = `
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${escapeHtml(u.name)}</span><span class="km-head-badge">${typ}${area ? " · " + area : ""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${hero}
      ${nextLine}
      ${renderSeason(crops, measures)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${renderTasks(measures)}
      <div class="km-foot">
        <span class="km-weather">${weatherLine(wb)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${escapeHtml(WEATHER_ATTRIBUTION)}${wb?.stale ? " · offline" : ""}</div>`;

    host.querySelector('[data-act="map"]')?.addEventListener("click", () => openOnMap(u));
    host.querySelector('[data-act="plan"]')?.addEventListener("click", () => setMode("plan"));
    host.querySelector('[data-act="add-massnahme"]')?.addEventListener("click", () => editMassnahme(u, null, current));
    host.querySelectorAll("[data-edit-crop]").forEach((b: any) => b.addEventListener("click", () => {
      const which = b.dataset.editCrop;
      editCrop(u, which === "current" ? current : next, which, crops.length);
    }));
    host.querySelectorAll("[data-m-done]").forEach((b: any) => b.addEventListener("click", (e: any) => { e.stopPropagation(); completeMassnahme(b.dataset.mDone); }));
    host.querySelectorAll("[data-m-del]").forEach((b: any) => b.addEventListener("click", (e: any) => { e.stopPropagation(); removeMassnahme(b.dataset.mDel); }));
    host.querySelectorAll("[data-m-edit]").forEach((r: any) => r.addEventListener("click", () => { const m = mass.find((x) => x.id === r.dataset.mEdit); editMassnahme(u, m, current); }));
  }

  function renderTasks(measures: any[]) {
    const open = measures.filter((m) => m.status === "geplant").sort((a, b) => (dateNum(a.planDatum) || 9e15) - (dateNum(b.planDatum) || 9e15));
    const done = measures.filter((m) => m.status === "erledigt").sort((a, b) => (dateNum(b.erledigtDatum) || 0) - (dateNum(a.erledigtDatum) || 0)).slice(0, 6);
    const t = Number(todayIso().replace(/-/g, ""));
    const row = (m: any, isDone: boolean) => {
      const a = artMeta(m.art);
      const date = isDone ? m.erledigtDatum : m.planDatum;
      const overdue = !isDone && date && dateNum(date) < t;
      const when = isDone ? fmtDay(date) : taskWhen(date, overdue);
      const title = m.notes || a.label;
      const psm = m.historyId ? `<span class="km-pill">PSM</span>` : "";
      // Unterzeile nur mit zusätzlicher Info (Art-Name nur, wenn er nicht schon Titel ist)
      const subParts: string[] = [];
      if (m.notes) subParts.push(escapeHtml(a.label));
      if (m.mittel) subParts.push(escapeHtml(m.mittel));
      if (m.menge != null) subParts.push(`${m.menge}${m.einheit ? " " + escapeHtml(m.einheit) : ""}`);
      const sub = subParts.join(" · ");
      return `<div class="km-task${isDone ? " done" : ""}" data-m-edit="${m.id}">
        <span class="km-task-ic" style="--mc:${a.color}"><i class="bi ${a.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${escapeHtml(title)}${psm}</div>${sub ? `<div class="km-task-sub">${sub}</div>` : ""}</div>
        <span class="km-task-when${overdue ? " overdue" : ""}">${when}</span>
        ${isDone
          ? `<button class="km-tbtn del" data-m-del="${m.id}" title="Löschen"><i class="bi bi-trash"></i></button>`
          : `<button class="km-check" data-m-done="${m.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`;
    };
    let html = "";
    if (open.length) html += open.map((m) => row(m, false)).join("");
    else html += `<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>`;
    if (done.length) html += `<div class="km-done-h">Erledigt</div>` + done.map((m) => row(m, true)).join("");
    return `<div class="km-tasks">${html}</div>`;
  }

  // ---------------- kleine Datums-Helfer ----------------
  function weekNumber(iso: string): number {
    const d = new Date(String(iso).slice(0, 10) + "T00:00:00");
    return isNaN(d.getTime()) ? 0 : getIsoWeek(d).week;
  }
  function fmtDay(iso: string): string {
    const d = new Date(String(iso).slice(0, 10) + "T00:00:00");
    if (isNaN(d.getTime())) return "";
    return `${d.getDate()}. ${MONTHS[d.getMonth()]}`;
  }
  function taskWhen(iso: string, overdue: boolean): string {
    if (!iso) return "offen";
    const d = new Date(String(iso).slice(0, 10) + "T00:00:00");
    if (isNaN(d.getTime())) return "offen";
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
    if (diff === 0) return "heute";
    if (diff === 1) return "morgen";
    if (overdue) return "überfällig";
    return fmtDay(iso);
  }
  function weatherLine(wb: any): string {
    if (!wb || !wb.weeks?.length) return wb?.loading ? "Wetter lädt…" : "";
    const { year, week } = getIsoWeek(new Date());
    const w = wb.weeks.find((x: any) => x.year === year && x.week === week) || wb.weeks.find((x: any) => !x.isForecast);
    if (!w) return "";
    const t = w.tMaxAvg != null ? Math.round(w.tMaxAvg) + "°" : "–";
    const p = w.precipSum != null ? Math.round(w.precipSum) + " mm" : "–";
    return `<i class="bi bi-cloud-sun"></i> Diese Woche: ${t} · ${p} Regen`;
  }
  function harvestText(c: any): string {
    const v = c.ernteVon ? weekLabel(weekNumber(c.ernteVon)) : null;
    const bIso = c.ernteBis || c.ernteDatum;
    const b = bIso ? weekLabel(weekNumber(bIso)) : null;
    if (v && b) return ` · Ernte ${v}–${b}`;
    if (b) return ` · Ernte ~${b}`;
    if (v) return ` · Ernte ab ${v}`;
    return "";
  }

  // Saison-Leiste: Kultur-Belegung + Ernte-Zeitraum + je Maßnahmen-Typ
  // geplant(Ring)/erledigt(gefüllt) auf einer Monatsachse.
  function renderSeason(crops: any[], measures: any[]): string {
    if (!crops.length && !measures.length) return "";
    const today = new Date();
    let minD = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    let maxD = new Date(today.getFullYear(), today.getMonth() + 4, 1);
    const stretch = (iso: string) => {
      if (!iso) return;
      const d = new Date(String(iso).slice(0, 10) + "T00:00:00");
      if (isNaN(d.getTime())) return;
      if (d < minD) minD = new Date(d.getFullYear(), d.getMonth(), 1);
      if (d > maxD) maxD = new Date(d.getFullYear(), d.getMonth(), 1);
    };
    crops.forEach((c) => { stretch(c.pflanzDatum); stretch(c.ernteBis || c.ernteDatum); stretch(c.ernteVon); });
    measures.forEach((m) => stretch(m.planDatum || m.erledigtDatum));
    const months = monthsBetween(minD, maxD);
    const N = months.length;
    const gridStyle = `background-size:${(100 / N).toFixed(4)}% 100%`;
    const pct = (p: number) => (p == null ? null : (p * 100).toFixed(2) + "%");
    const todayPos = posInMonths(months, today.toISOString());
    const todayLine = todayPos != null ? `<div class="ks-today" style="left:${pct(todayPos)}"></div>` : "";
    const head = months.map((mo: any) => `<div class="ks-mo${mo.y === today.getFullYear() && mo.m === today.getMonth() ? " cur" : ""}">${MONTHS_SHORT[mo.m]}</div>`).join("");
    let kultur = "";
    crops.forEach((c, ci) => {
      const p0 = posInMonths(months, c.pflanzDatum);
      let p1 = posInMonths(months, c.ernteBis || c.ernteDatum || c.pflanzDatum);
      if (p0 == null) return;
      if (p1 == null || p1 <= p0) p1 = Math.min(1, p0 + 0.5 / N);
      const col = cropColor(c, ci);
      kultur += `<div class="ks-bar${c.status === "geplant" ? " planned" : ""}" style="left:${pct(p0)};width:${((p1 - p0) * 100).toFixed(2)}%;--cc:${escapeHtml(col)}"><span>${escapeHtml(c.kultur || "")}</span></div>`;
      const ev = posInMonths(months, c.ernteVon);
      const eb = posInMonths(months, c.ernteBis);
      if (ev != null && eb != null && eb > ev) kultur += `<div class="ks-harvest" style="left:${pct(ev)};width:${((eb - ev) * 100).toFixed(2)}%"></div>`;
    });
    const byArt: Record<string, any[]> = {};
    measures.forEach((m) => { (byArt[m.art] = byArt[m.art] || []).push(m); });
    const artRows = ART_ORDER.filter((a) => byArt[a]).map((a) => {
      const meta = ART_META[a];
      const marks = byArt[a].map((m: any) => {
        const d = m.status === "erledigt" ? (m.erledigtDatum || m.planDatum) : (m.planDatum || m.erledigtDatum);
        const p = posInMonths(months, d);
        if (p == null) return "";
        return `<span class="ks-mk${m.status === "erledigt" ? " done" : ""}" title="${escapeHtml(meta.label + (m.notes ? ": " + m.notes : ""))}" style="left:${pct(p)};--mc:${meta.color}"></span>`;
      }).join("");
      return `<div class="ks-row"><div class="ks-rl">${escapeHtml(meta.label)}</div><div class="ks-track" style="${gridStyle}">${marks}${todayLine}</div></div>`;
    }).join("");
    return `<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${head}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${gridStyle}">${kultur}${todayLine}</div></div>
      ${artRows}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`;
  }

  // ---------------- Aktionen ----------------
  function openOnMap(u: any) {
    updateSlice("app", (app: any) => ({ ...app, activeSection: "acker" }));
    toast.info("Karte geöffnet.");
  }
  async function runPsmImport() {
    if (!sqliteOn()) { toast.warning("Keine Datenbank aktiv."); return; }
    try {
      const res = await importPsmAsMassnahmen();
      await reloadData(); renderAll();
      if (res?.imported) { toast.success(`${res.imported} übernommen.`); persist(); }
      else toast.info(`Nichts Neues${res?.skipped ? ` (${res.skipped} nicht zuordenbar)` : ""}.`);
    } catch { toast.error("Übernahme fehlgeschlagen."); }
  }
  async function completeMassnahme(id: string) {
    const m = mass.find((x) => x.id === id); if (!m) return;
    try { await upsertMassnahme({ ...m, status: "erledigt", erledigtDatum: m.erledigtDatum || todayIso() }); await reloadData(); renderAll(); persist(); }
    catch { toast.error("Speichern fehlgeschlagen."); }
  }
  async function removeMassnahme(id: string) {
    try { await deleteMassnahme({ id }); await reloadData(); renderAll(); persist(); }
    catch { toast.error("Löschen fehlgeschlagen."); }
  }

  // ---------------- Kontextmenü (schnell planen) ----------------
  let ctxEl: HTMLElement | null = null;
  const closeCtx = () => { if (ctxEl) { ctxEl.remove(); ctxEl = null; document.removeEventListener("pointerdown", onCtxOut, true); } };
  const onCtxOut = (e: any) => { if (ctxEl && !ctxEl.contains(e.target)) closeCtx(); };
  function openCtx(x: number, y: number, items: any[], title?: string) {
    closeCtx();
    ctxEl = document.createElement("div");
    ctxEl.className = "km-ctx";
    if (title) { const t = document.createElement("div"); t.className = "km-ctx-t"; t.textContent = title; ctxEl.appendChild(t); }
    items.forEach((it) => {
      if (it.sep) { const s = document.createElement("div"); s.className = "km-ctx-sep"; ctxEl!.appendChild(s); return; }
      const b = document.createElement("button");
      b.className = "km-ctx-i";
      b.innerHTML = `<i class="bi ${it.icon}"></i><span>${escapeHtml(it.label)}</span>`;
      b.addEventListener("click", () => { closeCtx(); it.action?.(); });
      ctxEl!.appendChild(b);
    });
    document.body.appendChild(ctxEl);
    const r = ctxEl.getBoundingClientRect();
    ctxEl.style.left = Math.max(8, Math.min(x, window.innerWidth - r.width - 8)) + "px";
    ctxEl.style.top = Math.max(8, Math.min(y, window.innerHeight - r.height - 8)) + "px";
    setTimeout(() => document.addEventListener("pointerdown", onCtxOut, true), 0);
  }
  function openUnitMenu(key: string, x: number, y: number) {
    const u = findUnit(key); if (!u) return;
    const crops = forUnitArr(anbau, u);
    const { current } = unitCrops(crops);
    openCtx(x, y, [
      { icon: "bi-flower2", label: current ? "Kultur bearbeiten" : "Kultur setzen", action: () => editCrop(u, current, "current", crops.length) },
      { icon: "bi-plus-lg", label: "Nächste Kultur planen", action: () => editCrop(u, null, "next", crops.length) },
      { icon: "bi-list-check", label: "Aufgabe planen", action: () => editMassnahme(u, null, current) },
      { sep: true },
      { icon: "bi-arrow-right-circle", label: "Fläche öffnen", action: () => { selKey = key; setMode("flaechen"); void ensureWeather(); } },
      { icon: "bi-map", label: "Auf Karte", action: () => openOnMap(u) },
    ], u.name);
  }

  // ---------------- Modal-Gerüst ----------------
  function closeModal() { if (modalEl) { modalEl.remove(); modalEl = null; } }
  function openModal(title: string, bodyHtml: string, saveLabel: string, onSave: (root: HTMLElement) => boolean | void) {
    closeModal();
    const ov = document.createElement("div");
    ov.className = "kmodal-ov";
    ov.innerHTML = `<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${escapeHtml(title)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${bodyHtml}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${escapeHtml(saveLabel)}</button></div></div>`;
    container.appendChild(ov);
    modalEl = ov;
    ov.querySelector(".kmodal-x")!.addEventListener("click", closeModal);
    ov.querySelector('[data-k="cancel"]')!.addEventListener("click", closeModal);
    ov.addEventListener("mousedown", (e: any) => { if (e.target === ov) closeModal(); });
    ov.querySelector('[data-k="save"]')!.addEventListener("click", () => { const r = onSave(ov); if (r !== false) closeModal(); });
    // "+ Mehr" aufklappen
    ov.querySelectorAll("[data-more]").forEach((b: any) => b.addEventListener("click", () => {
      const box = ov.querySelector("[data-more-box]") as HTMLElement; if (box) { box.hidden = false; b.style.display = "none"; }
    }));
    setTimeout(() => (ov.querySelector("input,select,textarea,.km-tile") as HTMLElement)?.focus?.(), 30);
    return ov;
  }
  function kulturDatalist() {
    const seen = new Set<string>();
    const opts = kulturen.map((k) => k.kultur).filter((k) => k && !seen.has(k) && seen.add(k)).map((k) => `<option value="${escapeHtml(k)}"></option>`).join("");
    return `<datalist id="km-kultur-dl">${opts}</datalist>`;
  }

  // ---------------- Kultur eintragen (1 Feld) ----------------
  function editCrop(u: any, crop: any, which: string, cropCount: number) {
    const isNext = which === "next" && !crop;
    const c = crop || {};
    const defDate = crop?.pflanzDatum?.slice(0, 10) || (isNext ? "" : todayIso());
    const swatches = CROP_PALETTE.map((col) => `<button type="button" class="km-sw${(c.color || "") === col ? " on" : ""}" data-col="${col}" style="background:${col}"></button>`).join("");
    const body = `
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${escapeHtml(c.kultur || "")}" placeholder="z. B. Gurke" autocomplete="off" /></label>${kulturDatalist()}
      <div class="km-frow3">
        <label class="km-fld">${isNext ? "Geplante Pflanzung" : "Pflanzung"}<input type="date" data-f="pflanz" value="${defDate}" /></label>
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(c.ernteVon || "").slice(0, 10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(c.ernteBis || c.ernteDatum || "").slice(0, 10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Bei Frucht­gemüse (Tomate, Gurke …) wird über den ganzen Zeitraum laufend geerntet.</div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Mehr (Status, Farbe, Notiz)</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Status<select data-f="status">${["aktiv", "geplant", "abgeschlossen"].map((s) => `<option value="${s}"${(c.status || (isNext ? "geplant" : "aktiv")) === s ? " selected" : ""}>${STATUS_META[s].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${swatches}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${escapeHtml(c.notes || "")}</textarea></label>
      </div>
      ${crop ? `<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Kultur löschen</button>` : ""}`;
    const ov = openModal(crop ? "Kultur bearbeiten" : (isNext ? "Nächste Kultur planen" : "Kultur eintragen"), body, "Speichern", (root) => {
      const get = (f: string) => (root.querySelector(`[data-f="${f}"]`) as HTMLInputElement)?.value?.trim() || "";
      const kultur = get("kultur");
      if (!kultur) { toast.warning("Bitte eine Kultur angeben."); return false; }
      const pflanz = get("pflanz") || null;
      const ernteVon = get("ernteVon") || null;
      const ernteBis = get("ernteBis") || null;
      const moreOpen = !(root.querySelector("[data-more-box]") as HTMLElement).hidden;
      let status = moreOpen ? get("status") : "";
      if (!status) status = isNext ? "geplant" : (pflanz && dateNum(pflanz) > Number(todayIso().replace(/-/g, "")) ? "geplant" : "aktiv");
      const selSw = root.querySelector(".km-sw.on") as HTMLElement | null;
      const color = selSw?.dataset.col || c.color || CROP_PALETTE[cropCount % CROP_PALETTE.length];
      const eppo = kulturen.find((k) => k.kultur === kultur)?.eppoCode || null;
      void (async () => {
        try {
          await upsertAnbau({ id: crop?.id, flaecheTyp: u.typ, flaecheId: u.id, kultur, eppoCode: eppo, status, pflanzDatum: pflanz, ernteVon, ernteBis, ernteDatum: null, color, notes: moreOpen ? (get("notes") || null) : (c.notes || null) });
          await reloadData(); renderAll(); persist();
        } catch { toast.error("Speichern fehlgeschlagen."); }
      })();
    });
    ov.querySelectorAll(".km-sw").forEach((b: any) => b.addEventListener("click", () => { ov.querySelectorAll(".km-sw").forEach((x: any) => x.classList.remove("on")); b.classList.add("on"); }));
    ov.querySelector('[data-f="del"]')?.addEventListener("click", async () => {
      if (!crop?.id) return;
      try { await deleteAnbau({ id: crop.id }); await reloadData(); renderAll(); persist(); closeModal(); }
      catch { toast.error("Löschen fehlgeschlagen."); }
    });
  }

  // ---------------- Aufgabe (1 Tipp) ----------------
  function editMassnahme(u: any, m: any, current: any) {
    const cur = m || { art: "bewaesserung", status: "geplant" };
    const tiles = TASK_TILES.map((t) => `<button type="button" class="km-tile${(cur.art || "bewaesserung") === t.art ? " on" : ""}" data-art="${t.art}" style="--ac:${ART_META[t.art].color}"><i class="bi ${t.icon}"></i><span>${escapeHtml(t.label)}</span></button>`).join("");
    const isDone = (cur.status || "geplant") === "erledigt";
    const curDate = (isDone ? cur.erledigtDatum : cur.planDatum) || todayIso();
    const body = `
      <div class="km-tasktiles">${tiles}</div>
      <div class="km-fld">Wann?<div class="km-when" data-when>
        <button type="button" class="km-chip" data-day="0">Heute</button>
        <button type="button" class="km-chip" data-day="1">Morgen</button>
        <button type="button" class="km-chip" data-day="x">Datum…</button>
        <input type="date" data-f="datum" value="${curDate.slice(0, 10)}" />
      </div></div>
      <div class="km-seg" data-seg>
        <button type="button" class="km-segb${!isDone ? " on" : ""}" data-status="geplant"><i class="bi bi-clock"></i> Geplant</button>
        <button type="button" class="km-segb${isDone ? " on" : ""}" data-status="erledigt"><i class="bi bi-check-lg"></i> Erledigt</button>
      </div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Notiz, Menge, Mittel</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${escapeHtml(cur.notes || "")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${cur.menge != null ? cur.menge : ""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${escapeHtml(cur.einheit || "")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${escapeHtml(cur.mittel || "")}" placeholder="optional" /></label>
      </div>
      ${m ? `<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>` : ""}`;
    const ov = openModal(m ? "Aufgabe bearbeiten" : "Aufgabe hinzufügen", body, "Speichern", (root) => {
      const art = (root.querySelector(".km-tile.on") as HTMLElement)?.dataset.art || "bewaesserung";
      const status = (root.querySelector(".km-segb.on") as HTMLElement)?.dataset.status || "geplant";
      const datum = (root.querySelector('[data-f="datum"]') as HTMLInputElement).value || todayIso();
      const moreOpen = !(root.querySelector("[data-more-box]") as HTMLElement).hidden;
      const num = (f: string) => { const v = (root.querySelector(`[data-f="${f}"]`) as HTMLInputElement)?.value; return v ? Number(v) : null; };
      const str = (f: string) => (root.querySelector(`[data-f="${f}"]`) as HTMLInputElement)?.value.trim() || null;
      void (async () => {
        try {
          await upsertMassnahme({
            id: m?.id, flaecheTyp: u.typ, flaecheId: u.id, anbauId: m?.anbauId || current?.id || null, art, status,
            planDatum: status === "geplant" ? datum : (m?.planDatum || null),
            erledigtDatum: status === "erledigt" ? datum : null,
            menge: moreOpen ? num("menge") : (m?.menge ?? null), einheit: moreOpen ? str("einheit") : (m?.einheit || null),
            mittel: moreOpen ? str("mittel") : (m?.mittel || null), historyId: m?.historyId || null,
            notes: moreOpen ? str("notes") : (m?.notes || null),
          });
          await reloadData(); renderAll(); persist();
        } catch { toast.error("Speichern fehlgeschlagen."); }
      })();
    });
    ov.querySelectorAll(".km-tile").forEach((b: any) => b.addEventListener("click", () => { ov.querySelectorAll(".km-tile").forEach((x: any) => x.classList.remove("on")); b.classList.add("on"); }));
    ov.querySelectorAll(".km-segb").forEach((b: any) => b.addEventListener("click", () => { ov.querySelectorAll(".km-segb").forEach((x: any) => x.classList.remove("on")); b.classList.add("on"); }));
    const dateInp = ov.querySelector('[data-f="datum"]') as HTMLInputElement;
    ov.querySelectorAll("[data-day]").forEach((b: any) => b.addEventListener("click", () => {
      const day = b.dataset.day;
      if (day === "x") { dateInp.style.display = "inline-block"; dateInp.showPicker?.(); return; }
      const d = new Date(); d.setDate(d.getDate() + Number(day));
      dateInp.value = d.toISOString().slice(0, 10); dateInp.style.display = "none";
    }));
    ov.querySelector('[data-f="del"]')?.addEventListener("click", async () => {
      if (!m?.id) return;
      try { await deleteMassnahme({ id: m.id }); await reloadData(); renderAll(); persist(); closeModal(); }
      catch { toast.error("Löschen fehlgeschlagen."); }
    });
  }

  // ---------------- Lifecycle ----------------
  container.querySelectorAll(".km-modebtn").forEach((b: any) => b.addEventListener("click", () => setMode(b.dataset.mode)));
  document.addEventListener("keydown", (e: any) => { if (e.key === "Escape") { if (modalEl) closeModal(); closeCtx(); } });
  window.addEventListener("psm:openKultur", (e: any) => {
    const d = e?.detail; if (!d?.typ || !d?.id) return;
    selKey = d.typ + ":" + d.id; setMode("flaechen");
    if (loaded) { renderList(); renderDetail(); void ensureWeather(); }
  });
  services.state.subscribe((s: any) => {
    if (s?.app?.activeSection === "kultur") {
      if (!loaded) { loaded = true; void loadAll(); }
      else void (async () => { units = await loadUnits(services); renderAll(); void ensureWeather(); })();
    }
  });
  renderKpis();
}

function renderShell(): string {
  return `
  <style>
    .kultur-wrap{display:flex;flex-direction:column;gap:14px;min-height:calc(100vh - 120px);font-size:14px}
    .kultur-top{display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between}
    .kultur-modes{display:inline-flex;background:var(--surface-2);border:1px solid var(--border-1);border-radius:10px;padding:3px}
    .km-modebtn{border:0;background:transparent;color:var(--text-muted);font-size:14px;font-weight:600;padding:8px 16px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:7px}
    .km-modebtn.active{background:var(--surface-1);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.1)}
    .kultur-kpis{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
    .km-kpi{background:var(--surface-1);border:1px solid var(--border-1);border-radius:11px;padding:8px 16px;text-align:center;min-width:92px}
    .km-kpi-v{font-size:19px;font-weight:700;color:var(--text);line-height:1.1}
    .km-kpi-l{font-size:11px;color:var(--text-dim)}
    .km-psm{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:10px;padding:9px 14px;font-size:13px;cursor:pointer}
    .km-psm:hover{background:var(--surface-2);color:var(--text)}
    .kultur-body{display:grid;grid-template-columns:248px 1fr;gap:14px;flex:1;min-height:0}
    .kultur-list{background:var(--surface-1);border:1px solid var(--border-1);border-radius:14px;padding:8px;overflow-y:auto;max-height:calc(100vh - 200px)}
    .km-grp{font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em;padding:10px 10px 5px}
    .km-row{display:flex;align-items:center;gap:11px;padding:11px 10px;border-radius:10px;cursor:pointer}
    .km-row:hover{background:var(--surface-2)}
    .km-row.sel{background:var(--surface-3);box-shadow:inset 3px 0 0 #16a34a}
    .km-dot{width:10px;height:10px;border-radius:3px;flex:none}
    .km-row-main{min-width:0}
    .km-row-name{font-size:14.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .km-row-sub{font-size:12.5px}
    .km-row-sub .crop{color:var(--text-muted)}
    .km-row-sub .free{color:var(--text-dim)}
    .kultur-detail{background:var(--surface-1);border:1px solid var(--border-1);border-radius:14px;padding:20px;overflow-y:auto;max-height:calc(100vh - 200px)}
    .km-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--text-dim);text-align:center;padding:48px 16px;height:100%}
    .km-empty i{font-size:34px;opacity:.45}.km-empty p{font-size:14px;line-height:1.55;margin:0}
    .km-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}
    .km-head-name{font-size:20px;font-weight:700;color:var(--text)}
    .km-head-badge{font-size:12.5px;color:#0f766e;background:rgba(16,163,74,.1);border-radius:8px;padding:3px 10px;margin-left:10px}
    .km-headbtn{border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:9px;padding:8px 13px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
    .km-headbtn:hover{background:var(--surface-2);color:var(--text)}
    .km-hero{display:flex;align-items:center;gap:16px;border-radius:14px;padding:18px 20px;margin-bottom:10px}
    .km-hero.active{background:rgba(16,163,74,.09)}
    .km-hero.empty{background:var(--surface-2)}
    .km-hero-ic{width:48px;height:48px;border-radius:50%;background:var(--cc,#16a34a);display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;flex:none}
    .km-hero-ic.gray{background:var(--border-2);color:var(--surface-1)}
    .km-hero-body{flex:1;min-width:0}
    .km-hero-crop{font-size:23px;font-weight:700;color:var(--text);line-height:1.15}
    .km-hero-crop.gray{color:var(--text-muted);font-size:19px}
    .km-hero-sub{font-size:13px;color:var(--text-muted);margin-top:2px}
    .km-hero-edit{border:0;background:transparent;color:var(--text-dim);cursor:pointer;font-size:16px;padding:6px;align-self:flex-start}
    .km-hero-edit:hover{color:var(--text)}
    .km-hero-add{border:0;background:#16a34a;color:#fff;border-radius:10px;padding:11px 18px;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}
    .km-hero-add:hover{background:#15803d}
    .km-next{font-size:13px;color:var(--text-muted);display:flex;align-items:center;gap:3px;padding:4px 6px 14px}
    .km-next b{color:var(--text);font-weight:600}
    .km-next-edit{border:0;background:transparent;color:var(--text-dim);cursor:pointer;font-size:12px;padding:2px 4px;margin-left:4px}
    .km-next-add{border:1px dashed var(--border-2);background:transparent;color:var(--text-muted);border-radius:9px;padding:9px 14px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;margin:2px 0 14px}
    .km-next-add:hover{border-color:#16a34a;color:#16a34a}
    .km-tasks-head{display:flex;align-items:center;justify-content:space-between;margin:6px 0 8px}
    .km-tasks-head>span{font-size:16px;font-weight:700;color:var(--text)}
    .km-addtask{border:0;background:rgba(16,163,74,.1);color:#15803d;border-radius:9px;padding:9px 15px;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .km-addtask:hover{background:rgba(16,163,74,.18)}
    .km-tasks{display:flex;flex-direction:column;gap:6px}
    .km-task{display:flex;align-items:center;gap:12px;padding:12px 12px;border:1px solid var(--border-1);border-radius:11px;cursor:pointer}
    .km-task:hover{background:var(--surface-2)}
    .km-task.done{opacity:.66}
    .km-task-ic{width:36px;height:36px;border-radius:10px;background:color-mix(in srgb,var(--mc) 14%,transparent);color:var(--mc);display:flex;align-items:center;justify-content:center;font-size:17px;flex:none}
    .km-task-main{flex:1;min-width:0}
    .km-task-title{font-size:14.5px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:7px}
    .km-task-sub{font-size:12px;color:var(--text-dim)}
    .km-task-when{font-size:13px;color:var(--text-muted);white-space:nowrap}
    .km-task-when.overdue{color:var(--danger-600);font-weight:600}
    .km-pill{font-size:9.5px;background:rgba(220,38,38,.12);color:var(--danger-600);border-radius:5px;padding:1px 6px;font-weight:700}
    .km-check{border:1.5px solid var(--border-2);background:var(--surface-1);color:var(--text-dim);width:30px;height:30px;border-radius:50%;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:15px;flex:none}
    .km-check:hover{border-color:#16a34a;color:#16a34a;background:rgba(16,163,74,.08)}
    .km-tbtn{border:0;background:transparent;color:var(--text-dim);cursor:pointer;width:28px;height:28px;border-radius:7px;font-size:13px}
    .km-tbtn:hover{color:var(--danger-600)}
    .km-tasks-none{display:flex;align-items:center;gap:8px;color:var(--text-dim);font-size:13.5px;padding:14px 4px}
    .km-tasks-none i{color:#16a34a}
    .km-done-h{font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 2px}
    .km-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:18px;padding-top:14px;border-top:1px solid var(--border-1)}
    .km-weather{font-size:13.5px;color:var(--text-muted);display:inline-flex;align-items:center;gap:7px}
    .km-weather i{color:#0891b2;font-size:16px}
    .km-plan{border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:9px;padding:8px 14px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .km-plan:hover{background:var(--surface-2);color:var(--text)}
    .km-attr{font-size:10.5px;color:var(--text-dim);margin-top:8px}
    .kultur-board{background:var(--surface-1);border:1px solid var(--border-1);border-radius:14px;padding:14px;overflow:auto;max-height:calc(100vh - 190px)}
    /* Modal */
    .kmodal-ov{position:fixed;inset:0;z-index:3000;background:rgba(15,23,42,.42);display:flex;align-items:center;justify-content:center;padding:16px}
    .kmodal{background:var(--surface-1);border-radius:16px;width:min(480px,96vw);max-height:92vh;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,.32)}
    .kmodal-h{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;font-size:17px;font-weight:700;color:var(--text)}
    .kmodal-x{border:0;background:transparent;color:var(--text-dim);cursor:pointer;font-size:16px}
    .kmodal-b{padding:4px 20px 16px;overflow-y:auto;display:flex;flex-direction:column;gap:14px}
    .kmodal-f{display:flex;justify-content:flex-end;gap:10px;padding:14px 20px;border-top:1px solid var(--border-1)}
    .btn-cancel{border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:10px;padding:10px 18px;font-size:14px;cursor:pointer}
    .btn-save{border:0;background:#16a34a;color:#fff;border-radius:10px;padding:10px 24px;font-size:14px;font-weight:600;cursor:pointer}
    .btn-save:hover{background:#15803d}
    .km-fld{display:flex;flex-direction:column;gap:6px;font-size:12.5px;color:var(--text-muted)}
    .km-fld.big{font-size:14px;color:var(--text)}
    .km-fld input,.km-fld select,.km-fld textarea{padding:11px 12px;border:1px solid var(--border-1);border-radius:10px;font-size:15px;background:var(--surface-1);color:var(--text);width:100%}
    .km-fld.big input{font-size:17px;padding:13px 14px}
    .km-frow2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .km-more{border:0;background:transparent;color:var(--text-muted);font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:7px;padding:4px 0;align-self:flex-start}
    .km-more:hover{color:var(--text)}
    .km-more-box{display:flex;flex-direction:column;gap:12px;padding-top:4px;border-top:1px dashed var(--border-1)}
    .km-dangerlink{border:0;background:transparent;color:var(--danger-600);font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;align-self:flex-start;padding:2px 0}
    .km-sws{display:flex;gap:7px;flex-wrap:wrap}
    .km-sw{width:28px;height:28px;border-radius:8px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0}
    .km-sw.on{box-shadow:0 0 0 2px var(--text)}
    .km-tasktiles{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
    .km-tile{display:flex;flex-direction:column;align-items:center;gap:7px;padding:14px 4px;border:1.5px solid var(--border-1);background:var(--surface-1);border-radius:12px;cursor:pointer;color:var(--text-muted);font-size:12px}
    .km-tile i{font-size:21px}
    .km-tile.on{border-color:var(--ac);color:var(--ac);background:color-mix(in srgb,var(--ac) 9%,transparent)}
    .km-when{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .km-chip{border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:8px;padding:8px 14px;font-size:13px;cursor:pointer}
    .km-chip:hover{border-color:#16a34a;color:#16a34a}
    .km-when input[type=date]{width:auto;display:none}
    .km-seg{display:inline-flex;background:var(--surface-2);border:1px solid var(--border-1);border-radius:10px;padding:3px;align-self:flex-start}
    .km-segb{border:0;background:transparent;color:var(--text-muted);font-size:13px;font-weight:600;padding:8px 16px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .km-segb.on{background:var(--surface-1);color:var(--text);box-shadow:0 1px 2px rgba(0,0,0,.1)}
    .km-frow3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
    .km-hint2{font-size:11.5px;color:var(--text-dim);display:flex;align-items:center;gap:6px;margin-top:-2px}
    .km-hint2 i{color:#0891b2}
    /* Kontextmenü */
    .km-ctx{position:fixed;z-index:4000;min-width:210px;background:var(--surface-1);border:1px solid var(--border-1);border-radius:11px;box-shadow:0 14px 38px rgba(15,23,42,.22);padding:5px;font-size:14px;color:var(--text)}
    .km-ctx-t{font-size:11px;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;padding:6px 10px 7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .km-ctx-sep{height:1px;background:var(--border-1);margin:4px 4px}
    .km-ctx-i{display:flex;align-items:center;gap:10px;width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:9px 10px;border-radius:8px;cursor:pointer;font-size:13.5px}
    .km-ctx-i:hover{background:var(--surface-3)}
    .km-ctx-i i{width:18px;text-align:center;color:var(--text-muted)}
    /* Saison-Leiste (Detail) */
    .ks-wrap{border:1px solid var(--border-1);border-radius:12px;padding:10px 12px;margin:6px 0 16px}
    .ks-head,.ks-row{display:flex;align-items:center;min-height:24px}
    .ks-rl{width:88px;min-width:88px;font-size:11.5px;color:var(--text-muted);padding-right:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ks-axis{display:flex;flex:1}
    .ks-mo{flex:1;text-align:center;font-size:10.5px;color:var(--text-dim);border-left:1px solid var(--border-1)}
    .ks-mo.cur{color:#16a34a;font-weight:700}
    .ks-track{position:relative;flex:1;height:24px;background-image:linear-gradient(to right,var(--border-1) 1px,transparent 1px);background-repeat:repeat-x}
    .ks-bar{position:absolute;top:4px;height:16px;border-radius:4px;background:var(--cc);color:#fff;display:flex;align-items:center;padding:0 6px;overflow:hidden;min-width:6px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
    .ks-bar span{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ks-bar.planned{background:transparent;border:1.5px dashed var(--cc);color:var(--cc)}
    .ks-harvest{position:absolute;top:6px;height:12px;border-radius:3px;background:repeating-linear-gradient(45deg,rgba(255,255,255,.62),rgba(255,255,255,.62) 3px,transparent 3px,transparent 6px);box-shadow:inset 0 0 0 1.5px #fff;pointer-events:none}
    .ks-mk{position:absolute;top:7px;width:11px;height:11px;border-radius:50%;background:var(--mc);transform:translateX(-50%);border:1.5px solid var(--surface-1)}
    .ks-mk:not(.done){background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--mc)}
    .ks-today{position:absolute;top:-2px;bottom:-2px;width:0;border-left:2px dashed #16a34a;transform:translateX(-1px);pointer-events:none}
    .ks-legend{display:flex;gap:14px;font-size:11px;color:var(--text-dim);margin-top:8px;padding-left:88px;align-items:center}
    .ks-legend>span{display:inline-flex;align-items:center;gap:5px}
    .ks-d{width:11px;height:11px;border-radius:50%;background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--text-dim)}
    .ks-d.done{background:var(--text-dim);box-shadow:none}
    .ks-hbar{width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,#bbb,#bbb 2px,transparent 2px,transparent 4px);display:inline-block}
    @media(max-width:820px){.kultur-body{grid-template-columns:1fr}.kultur-list{max-height:200px}.km-frow2{grid-template-columns:1fr}.km-frow3{grid-template-columns:1fr}.km-tasktiles{grid-template-columns:repeat(3,1fr)}}
  </style>
  <section class="calc-section kultur-wrap">
    <div class="kultur-top">
      <div class="kultur-modes">
        <button class="km-modebtn active" data-mode="plan"><i class="bi bi-calendar3"></i>Überblick</button>
        <button class="km-modebtn" data-mode="flaechen"><i class="bi bi-grid-1x2"></i>Fläche</button>
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
