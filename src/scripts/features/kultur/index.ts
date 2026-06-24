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
  listKulturStamm,
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
  METHODE_META,
  MENGE_EINHEITEN,
  computePlan,
  shiftPlan,
  findStammByName,
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
  let stamm: any[] = [];
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
      try { const r = await listKulturStamm(); stamm = r?.rows || []; } catch { stamm = []; }
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
        <div class="km-hero-body"><div class="km-hero-crop">${escapeHtml(current.kultur || "Kultur")}</div><div class="km-hero-sub">${escapeHtml(since + harvest + mengeText(current))}</div></div>
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
  function mengeText(c: any): string {
    if (!c || c.menge == null || c.menge === "") return "";
    return ` · ${c.menge} ${c.einheit || "Pflanzen"}`;
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
    // Bibliothek (mit Termin-Stammdaten) zuerst, dann übrige bekannte Kulturen.
    const seen = new Set<string>();
    const names: string[] = [];
    const push = (n: string) => {
      const k = String(n || "").trim().toLowerCase();
      if (n && !seen.has(k)) { seen.add(k); names.push(n); }
    };
    stamm.forEach((s) => push(s.name));
    kulturen.forEach((k) => push(k.kultur));
    const opts = names.map((k) => `<option value="${escapeHtml(k)}"></option>`).join("");
    return `<datalist id="km-kultur-dl">${opts}</datalist>`;
  }

  // ---------------- Kultur eintragen (1 Feld) ----------------
  function editCrop(u: any, crop: any, which: string, cropCount: number) {
    const isNext = which === "next" && !crop;
    const c = crop || {};
    const initStamm =
      (c.kulturStammId ? stamm.find((s) => s.id === c.kulturStammId) : null) ||
      findStammByName(stamm, c.kultur);
    const defPflanz = c.pflanzDatum?.slice(0, 10) || (isNext ? "" : todayIso());
    const swatches = CROP_PALETTE.map((col) => `<button type="button" class="km-sw${(c.color || "") === col ? " on" : ""}" data-col="${col}" style="background:${col}"></button>`).join("");
    const einheitOpts = MENGE_EINHEITEN.map((e) => `<option value="${escapeHtml(e)}"${(c.einheit || "Pflanzen") === e ? " selected" : ""}>${escapeHtml(e)}</option>`).join("");
    const body = `
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${escapeHtml(c.kultur || "")}" placeholder="z. B. Tomate – aus Bibliothek wählen" autocomplete="off" /></label>${kulturDatalist()}
      <div class="km-stammhint" data-stammhint hidden></div>
      <div class="km-anchor" data-anchor-row>
        <span class="km-anchor-l">Termine berechnen ab</span>
        <div class="km-seg km-anchor-seg" data-anchorseg>
          <button type="button" class="km-segb" data-anchor="aussaat">Aussaat</button>
          <button type="button" class="km-segb on" data-anchor="pflanz">Pflanzung</button>
          <button type="button" class="km-segb" data-anchor="ernte">Ernte</button>
        </div>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Aussaat<input type="date" data-f="aussaat" value="${(c.aussaatDatum || "").slice(0, 10)}" /></label>
        <label class="km-fld">${isNext ? "Geplante Pflanzung" : "Pflanzung"}<input type="date" data-f="pflanz" value="${defPflanz}" /></label>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(c.ernteVon || "").slice(0, 10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(c.ernteBis || c.ernteDatum || "").slice(0, 10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Termine kommen automatisch aus der Bibliothek – jederzeit frei überschreibbar.</div>
      <div class="km-frow2">
        <label class="km-fld">Menge<input type="number" step="1" min="0" data-f="menge" value="${c.menge != null ? c.menge : ""}" placeholder="optional" /></label>
        <label class="km-fld">Einheit<select data-f="einheit">${einheitOpts}</select></label>
      </div>
      ${!crop ? `
      <div class="km-succ">
        <label class="km-check2"><input type="checkbox" data-f="succOn" /> <span><i class="bi bi-layers"></i> Folgesätze anlegen <small>(gestaffelt für laufende Ernte)</small></span></label>
        <div class="km-succ-box km-frow2" data-succ-box hidden>
          <label class="km-fld">Anzahl Sätze<input type="number" min="2" max="20" step="1" data-f="succN" value="4" /></label>
          <label class="km-fld">Abstand (Tage)<input type="number" min="1" step="1" data-f="succGap" value="14" /></label>
        </div>
      </div>` : ""}
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Mehr (Status, Farbe, Notiz)</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Status<select data-f="status">${["aktiv", "geplant", "abgeschlossen"].map((s) => `<option value="${s}"${(c.status || (isNext ? "geplant" : "aktiv")) === s ? " selected" : ""}>${STATUS_META[s].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${swatches}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${escapeHtml(c.notes || "")}</textarea></label>
      </div>
      ${crop ? `<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Satz löschen</button>` : ""}`;
    const ov = openModal(crop ? "Satz bearbeiten" : (isNext ? "Nächsten Satz planen" : "Satz eintragen"), body, "Speichern", (root) => {
      const get = (f: string) => (root.querySelector(`[data-f="${f}"]`) as HTMLInputElement)?.value?.trim() || "";
      const kultur = get("kultur");
      if (!kultur) { toast.warning("Bitte eine Kultur angeben."); return false; }
      const matched = findStammByName(stamm, kultur);
      const aussaat = get("aussaat") || null;
      const pflanz = get("pflanz") || null;
      const ernteVon = get("ernteVon") || null;
      const ernteBis = get("ernteBis") || null;
      const mengeRaw = get("menge");
      const menge = mengeRaw ? Number(mengeRaw) : null;
      const einheit = (root.querySelector('[data-f="einheit"]') as HTMLSelectElement)?.value || null;
      const moreOpen = !(root.querySelector("[data-more-box]") as HTMLElement).hidden;
      let status = moreOpen ? get("status") : "";
      if (!status) status = isNext ? "geplant" : (pflanz && dateNum(pflanz) > Number(todayIso().replace(/-/g, "")) ? "geplant" : "aktiv");
      const selSw = root.querySelector(".km-sw.on") as HTMLElement | null;
      const color = selSw?.dataset.col || c.color || matched?.color || CROP_PALETTE[cropCount % CROP_PALETTE.length];
      const eppo = kulturen.find((k) => k.kultur === kultur)?.eppoCode || matched?.eppoCode || null;
      const notes = moreOpen ? (get("notes") || null) : (c.notes || null);
      const base = { flaecheTyp: u.typ, flaecheId: u.id, kultur, eppoCode: eppo, color, menge, einheit, kulturStammId: matched?.id || c.kulturStammId || null, notes };
      const succOn = !crop && (root.querySelector('[data-f="succOn"]') as HTMLInputElement)?.checked;
      const succN = Math.max(2, Math.min(20, Number((root.querySelector('[data-f="succN"]') as HTMLInputElement)?.value) || 2));
      const succGap = Math.max(1, Number((root.querySelector('[data-f="succGap"]') as HTMLInputElement)?.value) || 14);
      const t = Number(todayIso().replace(/-/g, ""));
      void (async () => {
        try {
          if (succOn) {
            const grp = "sg-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
            const basePlan = { aussaatDatum: aussaat, pflanzDatum: pflanz, ernteVon, ernteBis };
            for (let k = 0; k < succN; k++) {
              const sp = shiftPlan(basePlan, k * succGap);
              const st = sp.pflanzDatum && dateNum(sp.pflanzDatum) > t ? "geplant" : status;
              await upsertAnbau({ ...base, ...sp, ernteDatum: null, status: st, satzGruppe: grp });
            }
            toast.success(`${succN} Sätze angelegt.`);
          } else {
            await upsertAnbau({ id: crop?.id, ...base, aussaatDatum: aussaat, pflanzDatum: pflanz, ernteVon, ernteBis, ernteDatum: null, status, satzGruppe: c.satzGruppe || null });
          }
          await reloadData(); renderAll(); persist();
        } catch { toast.error("Speichern fehlgeschlagen."); }
      })();
    });

    // ---- Live: Bibliotheks-Erkennung + automatische Termin-Berechnung ----
    let anchor = "pflanz";
    const dEl = (f: string) => ov.querySelector(`[data-f="${f}"]`) as HTMLInputElement;
    const anchorRow = ov.querySelector("[data-anchor-row]") as HTMLElement;
    const hintEl = ov.querySelector("[data-stammhint]") as HTMLElement;
    let curStamm: any = initStamm;
    const showHint = () => {
      if (!curStamm) { hintEl.hidden = true; anchorRow.style.opacity = "0.45"; return; }
      anchorRow.style.opacity = "1";
      const meta = METHODE_META[curStamm.anbauMethode === "anzucht" ? "anzucht" : "direkt"];
      const parts = [meta.short];
      if (curStamm.kulturTage) parts.push(`${curStamm.kulturTage} T. Kultur`);
      if (curStamm.anbauMethode === "anzucht" && curStamm.anzuchtTage) parts.push(`${curStamm.anzuchtTage} T. Anzucht`);
      if (curStamm.familie) parts.push(curStamm.familie);
      hintEl.innerHTML = `<i class="bi bi-stars"></i> <b>Bibliothek:</b> ${escapeHtml(parts.join(" · "))}`;
      hintEl.hidden = false;
    };
    const recompute = () => {
      if (!curStamm) return;
      const srcField = anchor === "ernte" ? "ernteVon" : anchor;
      const anchorIso = dEl(srcField).value || todayIso();
      const plan = computePlan(curStamm, anchor, anchorIso);
      if (plan.aussaatDatum != null) dEl("aussaat").value = plan.aussaatDatum || "";
      if (plan.pflanzDatum != null) dEl("pflanz").value = plan.pflanzDatum || "";
      if (plan.ernteVon != null) dEl("ernteVon").value = plan.ernteVon || "";
      if (plan.ernteBis != null) dEl("ernteBis").value = plan.ernteBis || "";
    };
    const kulturInp = dEl("kultur");
    kulturInp.addEventListener("input", () => { curStamm = findStammByName(stamm, kulturInp.value); showHint(); });
    kulturInp.addEventListener("change", () => {
      curStamm = findStammByName(stamm, kulturInp.value);
      showHint();
      if (curStamm) { if (!dEl("pflanz").value) dEl("pflanz").value = todayIso(); recompute(); }
    });
    ov.querySelectorAll("[data-anchor]").forEach((b: any) => b.addEventListener("click", () => {
      ov.querySelectorAll("[data-anchorseg] .km-segb").forEach((x: any) => x.classList.remove("on"));
      b.classList.add("on"); anchor = b.dataset.anchor; recompute();
    }));
    ["aussaat", "pflanz", "ernteVon"].forEach((f) => dEl(f)?.addEventListener("change", () => {
      const srcField = anchor === "ernte" ? "ernteVon" : anchor;
      if (f === srcField) recompute();
    }));
    showHint();

    const succChk = ov.querySelector('[data-f="succOn"]') as HTMLInputElement | null;
    succChk?.addEventListener("change", () => { (ov.querySelector("[data-succ-box]") as HTMLElement).hidden = !succChk.checked; });
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
    .kultur-wrap{display:flex;flex-direction:column;gap:var(--ap-4);min-height:calc(100vh - 120px);font-size:var(--ap-fs)}
    .kultur-top{display:flex;flex-wrap:wrap;gap:var(--ap-3);align-items:center;justify-content:space-between}
    .kultur-modes{display:inline-flex;background:var(--ap-surface-2);border:1px solid var(--ap-line);border-radius:var(--ap-r);padding:4px}
    .km-modebtn{border:0;background:transparent;color:var(--ap-ink-3);font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);padding:10px 20px;border-radius:var(--ap-r-sm);cursor:pointer;display:inline-flex;align-items:center;gap:8px;min-height:var(--ap-control-sm);transition:background var(--ap-t),color var(--ap-t)}
    .km-modebtn:hover{color:var(--ap-ink)}
    .km-modebtn.active{background:var(--ap-surface);color:var(--ap-green-dark);box-shadow:var(--ap-shadow-sm)}
    .kultur-kpis{display:flex;flex-wrap:wrap;gap:var(--ap-2);align-items:center}
    .km-kpi{background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r);padding:10px 18px;text-align:center;min-width:104px}
    .km-kpi-v{font-size:var(--ap-fs-lg);font-weight:var(--ap-w-black);color:var(--ap-ink);line-height:1.1}
    .km-kpi-l{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:2px}
    .km-psm{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r);padding:11px 16px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;min-height:var(--ap-control-sm)}
    .km-psm:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .kultur-body{display:grid;grid-template-columns:280px 1fr;gap:var(--ap-4);flex:1;min-height:0}
    .kultur-list{background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);padding:var(--ap-2);overflow-y:auto;max-height:calc(100vh - 200px);box-shadow:var(--ap-shadow-sm)}
    .km-grp{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);text-transform:uppercase;letter-spacing:.05em;font-weight:var(--ap-w-bold);padding:var(--ap-3) var(--ap-2) 6px}
    .km-row{display:flex;align-items:center;gap:var(--ap-3);padding:var(--ap-3);border-radius:var(--ap-r);cursor:pointer;transition:background var(--ap-t)}
    .km-row:hover{background:var(--ap-surface-2)}
    .km-row.sel{background:var(--ap-green-soft);box-shadow:inset 4px 0 0 var(--ap-green)}
    .km-dot{width:12px;height:12px;border-radius:4px;flex:none}
    .km-row-main{min-width:0}
    .km-row-name{font-size:var(--ap-fs);font-weight:var(--ap-w-bold);color:var(--ap-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .km-row-sub{font-size:var(--ap-fs-sm)}
    .km-row-sub .crop{color:var(--ap-green-dark);font-weight:var(--ap-w-med)}
    .km-row-sub .free{color:var(--ap-ink-3)}
    .kultur-detail{background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);padding:var(--ap-6);overflow-y:auto;max-height:calc(100vh - 200px);box-shadow:var(--ap-shadow-sm)}
    .km-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--ap-3);color:var(--ap-ink-3);text-align:center;padding:var(--ap-8) var(--ap-4);height:100%}
    .km-empty i{font-size:44px;opacity:.4;color:var(--ap-green)}.km-empty p{font-size:var(--ap-fs);line-height:1.6;margin:0}
    .km-head{display:flex;align-items:center;justify-content:space-between;gap:var(--ap-3);margin-bottom:var(--ap-5)}
    .km-head-name{font-size:var(--ap-fs-lg);font-weight:var(--ap-w-black);color:var(--ap-ink)}
    .km-head-badge{font-size:var(--ap-fs-xs);color:var(--ap-green-dark);background:var(--ap-green-soft);border-radius:var(--ap-r-pill);padding:4px 12px;margin-left:var(--ap-3);font-weight:var(--ap-w-med)}
    .km-headbtn{border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r);padding:10px 16px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;gap:7px;white-space:nowrap;min-height:var(--ap-control-sm)}
    .km-headbtn:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .km-hero{display:flex;align-items:center;gap:var(--ap-4);border-radius:var(--ap-r-lg);padding:var(--ap-5);margin-bottom:var(--ap-3)}
    .km-hero.active{background:var(--ap-green-tint);border:1px solid var(--ap-green-line)}
    .km-hero.empty{background:var(--ap-surface-2);border:1px dashed var(--ap-line-2)}
    .km-hero-ic{width:56px;height:56px;border-radius:50%;background:var(--cc,#16a34a);display:flex;align-items:center;justify-content:center;color:#fff;font-size:26px;flex:none}
    .km-hero-ic.gray{background:var(--ap-line-2);color:var(--ap-surface)}
    .km-hero-body{flex:1;min-width:0}
    .km-hero-crop{font-size:var(--ap-fs-xl);font-weight:var(--ap-w-black);color:var(--ap-ink);line-height:1.15}
    .km-hero-crop.gray{color:var(--ap-ink-3);font-size:var(--ap-fs-lg)}
    .km-hero-sub{font-size:var(--ap-fs-sm);color:var(--ap-ink-2);margin-top:3px}
    .km-hero-edit{border:0;background:transparent;color:var(--ap-ink-3);cursor:pointer;font-size:18px;padding:8px;align-self:flex-start;border-radius:var(--ap-r-sm)}
    .km-hero-edit:hover{color:var(--ap-ink);background:var(--ap-surface-3)}
    .km-hero-add{border:0;background:var(--ap-green);color:var(--ap-on-green);border-radius:var(--ap-r);padding:13px 22px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);cursor:pointer;display:inline-flex;align-items:center;gap:8px;white-space:nowrap;min-height:var(--ap-control)}
    .km-hero-add:hover{background:var(--ap-green-dark)}
    .km-next{font-size:var(--ap-fs-sm);color:var(--ap-ink-2);display:flex;align-items:center;gap:4px;padding:6px 6px var(--ap-4)}
    .km-next b{color:var(--ap-ink);font-weight:var(--ap-w-bold)}
    .km-next-edit{border:0;background:transparent;color:var(--ap-ink-3);cursor:pointer;font-size:14px;padding:4px 6px;margin-left:4px;border-radius:var(--ap-r-sm)}
    .km-next-edit:hover{color:var(--ap-ink);background:var(--ap-surface-3)}
    .km-next-add{border:1px dashed var(--ap-line-2);background:transparent;color:var(--ap-ink-2);border-radius:var(--ap-r);padding:11px 16px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;gap:7px;margin:2px 0 var(--ap-4);min-height:var(--ap-control-sm)}
    .km-next-add:hover{border-color:var(--ap-green);color:var(--ap-green-dark);background:var(--ap-green-tint)}
    .km-tasks-head{display:flex;align-items:center;justify-content:space-between;margin:var(--ap-2) 0 var(--ap-3)}
    .km-tasks-head>span{font-size:var(--ap-fs-md);font-weight:var(--ap-w-black);color:var(--ap-ink)}
    .km-addtask{border:0;background:var(--ap-green-soft);color:var(--ap-green-dark);border-radius:var(--ap-r);padding:11px 17px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);cursor:pointer;display:inline-flex;align-items:center;gap:7px;min-height:var(--ap-control-sm)}
    .km-addtask:hover{background:var(--ap-green-line)}
    .km-tasks{display:flex;flex-direction:column;gap:var(--ap-2)}
    .km-task{display:flex;align-items:center;gap:var(--ap-3);padding:var(--ap-3);border:1px solid var(--ap-line);border-radius:var(--ap-r);cursor:pointer;transition:background var(--ap-t),border-color var(--ap-t)}
    .km-task:hover{background:var(--ap-surface-2);border-color:var(--ap-line-2)}
    .km-task.done{opacity:.62}
    .km-task-ic{width:42px;height:42px;border-radius:var(--ap-r-sm);background:color-mix(in srgb,var(--mc) 14%,transparent);color:var(--mc);display:flex;align-items:center;justify-content:center;font-size:19px;flex:none}
    .km-task-main{flex:1;min-width:0}
    .km-task-title{font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);color:var(--ap-ink);display:flex;align-items:center;gap:7px}
    .km-task-sub{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:1px}
    .km-task-when{font-size:var(--ap-fs-sm);color:var(--ap-ink-2);white-space:nowrap;font-weight:var(--ap-w-med)}
    .km-task-when.overdue{color:var(--ap-danger);font-weight:var(--ap-w-bold)}
    .km-pill{font-size:10px;background:var(--ap-danger-soft);color:var(--ap-danger);border:1px solid var(--ap-danger-line);border-radius:5px;padding:1px 6px;font-weight:var(--ap-w-bold)}
    .km-check{border:2px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-3);width:38px;height:38px;border-radius:50%;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:18px;flex:none;transition:border-color var(--ap-t),color var(--ap-t),background var(--ap-t)}
    .km-check:hover{border-color:var(--ap-green);color:var(--ap-green);background:var(--ap-green-tint)}
    .km-tbtn{border:0;background:transparent;color:var(--ap-ink-3);cursor:pointer;width:36px;height:36px;border-radius:var(--ap-r-sm);font-size:15px}
    .km-tbtn:hover{color:var(--ap-danger);background:var(--ap-danger-soft)}
    .km-tasks-none{display:flex;align-items:center;gap:var(--ap-2);color:var(--ap-ink-3);font-size:var(--ap-fs-sm);padding:var(--ap-4) var(--ap-1)}
    .km-tasks-none i{color:var(--ap-green);font-size:18px}
    .km-done-h{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);text-transform:uppercase;letter-spacing:.04em;font-weight:var(--ap-w-bold);margin:var(--ap-4) 0 2px}
    .km-foot{display:flex;align-items:center;justify-content:space-between;gap:var(--ap-3);margin-top:var(--ap-5);padding-top:var(--ap-4);border-top:1px solid var(--ap-line)}
    .km-weather{font-size:var(--ap-fs-sm);color:var(--ap-ink-2);display:inline-flex;align-items:center;gap:7px}
    .km-weather i{color:var(--ap-info-bright);font-size:18px}
    .km-plan{border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r);padding:10px 16px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;gap:7px;min-height:var(--ap-control-sm)}
    .km-plan:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .km-attr{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:var(--ap-2)}
    .kultur-board{background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);padding:var(--ap-4);overflow:auto;max-height:calc(100vh - 190px);box-shadow:var(--ap-shadow-sm)}
    /* Modal */
    .kmodal-ov{position:fixed;inset:0;z-index:3000;background:var(--ap-overlay);display:flex;align-items:center;justify-content:center;padding:var(--ap-4)}
    .kmodal{background:var(--ap-surface);border-radius:var(--ap-r-xl);width:min(500px,96vw);max-height:92vh;display:flex;flex-direction:column;box-shadow:var(--ap-shadow-lg)}
    .kmodal-h{display:flex;align-items:center;justify-content:space-between;padding:var(--ap-5) var(--ap-5) var(--ap-3);font-size:var(--ap-fs-md);font-weight:var(--ap-w-black);color:var(--ap-ink)}
    .kmodal-x{border:0;background:transparent;color:var(--ap-ink-3);cursor:pointer;font-size:18px;padding:4px;border-radius:var(--ap-r-sm)}
    .kmodal-x:hover{color:var(--ap-ink);background:var(--ap-surface-3)}
    .kmodal-b{padding:var(--ap-1) var(--ap-5) var(--ap-4);overflow-y:auto;display:flex;flex-direction:column;gap:var(--ap-4)}
    .kmodal-f{display:flex;justify-content:flex-end;gap:var(--ap-2);padding:var(--ap-4) var(--ap-5);border-top:1px solid var(--ap-line)}
    .btn-cancel{border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r);padding:12px 20px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;min-height:var(--ap-control)}
    .btn-cancel:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .btn-save{border:0;background:var(--ap-green);color:var(--ap-on-green);border-radius:var(--ap-r);padding:12px 26px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);cursor:pointer;min-height:var(--ap-control)}
    .btn-save:hover{background:var(--ap-green-dark)}
    .km-fld{display:flex;flex-direction:column;gap:7px;font-size:var(--ap-fs-xs);color:var(--ap-ink-2);font-weight:var(--ap-w-med)}
    .km-fld.big{font-size:var(--ap-fs-sm);color:var(--ap-ink)}
    .km-fld input,.km-fld select,.km-fld textarea{padding:13px 14px;border:1px solid var(--ap-line-2);border-radius:var(--ap-r-sm);font-size:var(--ap-fs);background:var(--ap-surface);color:var(--ap-ink);width:100%;min-height:var(--ap-control)}
    .km-fld.big input{font-size:var(--ap-fs-md);padding:14px 16px}
    .km-frow2{display:grid;grid-template-columns:1fr 1fr;gap:var(--ap-3)}
    .km-more{border:0;background:transparent;color:var(--ap-ink-2);font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;gap:7px;padding:4px 0;align-self:flex-start}
    .km-more:hover{color:var(--ap-ink)}
    .km-more-box{display:flex;flex-direction:column;gap:var(--ap-3);padding-top:var(--ap-1);border-top:1px dashed var(--ap-line)}
    .km-dangerlink{border:0;background:transparent;color:var(--ap-danger);font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;gap:6px;align-self:flex-start;padding:2px 0}
    .km-sws{display:flex;gap:8px;flex-wrap:wrap}
    .km-sw{width:34px;height:34px;border-radius:var(--ap-r-sm);border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0}
    .km-sw.on{box-shadow:0 0 0 2px var(--ap-ink)}
    .km-tasktiles{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--ap-2)}
    .km-tile{display:flex;flex-direction:column;align-items:center;gap:8px;padding:var(--ap-4) 4px;border:1.5px solid var(--ap-line);background:var(--ap-surface);border-radius:var(--ap-r);cursor:pointer;color:var(--ap-ink-2);font-size:var(--ap-fs-xs);font-weight:var(--ap-w-med)}
    .km-tile i{font-size:23px}
    .km-tile.on{border-color:var(--ac);color:var(--ac);background:color-mix(in srgb,var(--ac) 10%,transparent)}
    .km-when{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .km-chip{border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r-sm);padding:10px 16px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;min-height:var(--ap-control-sm)}
    .km-chip:hover{border-color:var(--ap-green);color:var(--ap-green-dark);background:var(--ap-green-tint)}
    .km-when input[type=date]{width:auto;display:none}
    .km-seg{display:inline-flex;background:var(--ap-surface-2);border:1px solid var(--ap-line);border-radius:var(--ap-r);padding:4px;align-self:flex-start}
    .km-segb{border:0;background:transparent;color:var(--ap-ink-3);font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);padding:10px 18px;border-radius:var(--ap-r-sm);cursor:pointer;display:inline-flex;align-items:center;gap:6px;min-height:var(--ap-control-sm)}
    .km-segb.on{background:var(--ap-surface);color:var(--ap-green-dark);box-shadow:var(--ap-shadow-sm)}
    .km-frow3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--ap-3)}
    .km-hint2{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);display:flex;align-items:center;gap:6px;margin-top:-2px}
    .km-hint2 i{color:var(--ap-info-bright)}
    .km-stammhint{font-size:var(--ap-fs-xs);color:var(--ap-green-dark);background:var(--ap-green-tint);border:1px solid var(--ap-green-line);border-radius:var(--ap-r-sm);padding:10px 12px;display:flex;align-items:center;gap:7px;margin-top:-4px}
    .km-stammhint i{color:var(--ap-green-bright)}
    .km-stammhint b{font-weight:var(--ap-w-bold)}
    .km-anchor{display:flex;align-items:center;justify-content:space-between;gap:var(--ap-3);flex-wrap:wrap;transition:opacity .15s}
    .km-anchor-l{font-size:var(--ap-fs-xs);color:var(--ap-ink-2)}
    .km-anchor-seg{align-self:auto}
    .km-anchor-seg .km-segb{padding:8px 14px;font-size:var(--ap-fs-xs)}
    .km-succ{border:1px dashed var(--ap-line-2);border-radius:var(--ap-r);padding:12px;display:flex;flex-direction:column;gap:var(--ap-3)}
    .km-check2{display:flex;align-items:center;gap:10px;font-size:var(--ap-fs-sm);color:var(--ap-ink);cursor:pointer}
    .km-check2 input{width:19px;height:19px;accent-color:var(--ap-green);flex:none}
    .km-check2 small{color:var(--ap-ink-3);font-weight:400}
    /* Kontextmenü */
    .km-ctx{position:fixed;z-index:4000;min-width:220px;background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);box-shadow:var(--ap-shadow-lg);padding:var(--ap-2);font-size:var(--ap-fs-sm);color:var(--ap-ink)}
    .km-ctx-t{font-size:var(--ap-fs-xs);font-weight:var(--ap-w-bold);color:var(--ap-ink-3);text-transform:uppercase;letter-spacing:.04em;padding:7px 10px 9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .km-ctx-sep{height:1px;background:var(--ap-line);margin:var(--ap-1) var(--ap-1)}
    .km-ctx-i{display:flex;align-items:center;gap:10px;width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:11px 10px;border-radius:var(--ap-r-sm);cursor:pointer;font-size:var(--ap-fs-sm)}
    .km-ctx-i:hover{background:var(--ap-surface-3)}
    .km-ctx-i i{width:18px;text-align:center;color:var(--ap-ink-2);font-size:16px}
    /* Saison-Leiste (Detail) */
    .ks-wrap{border:1px solid var(--ap-line);border-radius:var(--ap-r);padding:var(--ap-3);margin:6px 0 var(--ap-4);background:var(--ap-surface-2)}
    .ks-head,.ks-row{display:flex;align-items:center;min-height:24px}
    .ks-rl{width:88px;min-width:88px;font-size:var(--ap-fs-xs);color:var(--ap-ink-2);padding-right:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:var(--ap-w-med)}
    .ks-axis{display:flex;flex:1}
    .ks-mo{flex:1;text-align:center;font-size:11px;color:var(--ap-ink-3);border-left:1px solid var(--ap-line)}
    .ks-mo.cur{color:var(--ap-green-dark);font-weight:var(--ap-w-bold)}
    .ks-track{position:relative;flex:1;height:24px;background-image:linear-gradient(to right,var(--ap-line) 1px,transparent 1px);background-repeat:repeat-x}
    .ks-bar{position:absolute;top:4px;height:16px;border-radius:5px;background:var(--cc);color:#fff;display:flex;align-items:center;padding:0 6px;overflow:hidden;min-width:6px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
    .ks-bar span{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ks-bar.planned{background:transparent;border:1.5px dashed var(--cc);color:var(--cc)}
    .ks-harvest{position:absolute;top:6px;height:12px;border-radius:3px;background:repeating-linear-gradient(45deg,rgba(255,255,255,.62),rgba(255,255,255,.62) 3px,transparent 3px,transparent 6px);box-shadow:inset 0 0 0 1.5px #fff;pointer-events:none}
    .ks-mk{position:absolute;top:7px;width:11px;height:11px;border-radius:50%;background:var(--mc);transform:translateX(-50%);border:1.5px solid var(--ap-surface)}
    .ks-mk:not(.done){background:var(--ap-surface);box-shadow:inset 0 0 0 2px var(--mc)}
    .ks-today{position:absolute;top:-2px;bottom:-2px;width:0;border-left:2px dashed var(--ap-green);transform:translateX(-1px);pointer-events:none}
    .ks-legend{display:flex;gap:var(--ap-3);font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:var(--ap-2);padding-left:88px;align-items:center}
    .ks-legend>span{display:inline-flex;align-items:center;gap:5px}
    .ks-d{width:11px;height:11px;border-radius:50%;background:var(--ap-surface);box-shadow:inset 0 0 0 2px var(--ap-ink-3)}
    .ks-d.done{background:var(--ap-ink-3);box-shadow:none}
    .ks-hbar{width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,var(--ap-line-2),var(--ap-line-2) 2px,transparent 2px,transparent 4px);display:inline-block}
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
