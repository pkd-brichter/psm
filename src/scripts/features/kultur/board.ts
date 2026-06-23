// @ts-nocheck
// Hof-weites Anbauplan-Board: alle Flächen (Zeilen) × Kalenderwochen (Spalten),
// Kultur-Belegung als Balken, Maßnahmen als Marker, "heute"-Linie. Read-only;
// Klick auf einen Flächennamen springt zurück ins Fläche-Dashboard.
import { escapeHtml } from "@scripts/core/utils";
import {
  ART_META,
  ART_ORDER,
  artMeta,
  cropColor,
  dateNum,
  weekWindow,
  weekIndexOf,
  spanInWindow,
} from "./model";

export function renderBoard(host: HTMLElement, ctx: any): void {
  const { units, anbau, mass, onSelect } = ctx;
  if (!units || !units.length) {
    host.innerHTML = `<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>`;
    return;
  }
  const today = new Date();
  let from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7 * 4);
  let to = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7 * 16);
  const push = (iso: string) => {
    if (!iso) return;
    const d = new Date(String(iso).slice(0, 10) + "T00:00:00");
    if (isNaN(d.getTime())) return;
    if (d < from) from = d;
    if (d > to) to = d;
  };
  (anbau || []).forEach((a: any) => { push(a.pflanzDatum); push(a.ernteDatum); });
  (mass || []).forEach((m: any) => push(m.planDatum || m.erledigtDatum));
  const win = weekWindow(from, to);
  const N = win.length;
  const colW = 30;

  const houses = units.filter((u: any) => u.typ === "haus");
  const fields = units.filter((u: any) => u.typ === "acker");
  const groups = [
    { label: "Gewächshäuser", arr: houses },
    { label: "Freiland", arr: fields },
  ];

  let header = `<div class="kb-corner" style="grid-row:1;grid-column:1">Fläche</div>`;
  win.forEach((w, i) => {
    header += `<div class="kb-h${w.isCurrent ? " cur" : ""}${w.isFuture ? " fut" : ""}" style="grid-row:1;grid-column:${i + 2}">${w.week}</div>`;
  });

  let body = "";
  let r = 1;
  groups.forEach((g) => {
    if (!g.arr.length) return;
    r++;
    body += `<div class="kb-group" style="grid-row:${r};grid-column:1/-1">${escapeHtml(g.label)}</div>`;
    g.arr.forEach((u: any) => {
      r++;
      const ukey = u.typ + ":" + u.id;
      body += `<div class="kb-name" data-ukey="${ukey}" title="${escapeHtml(u.name)}" style="grid-row:${r};grid-column:1">${escapeHtml(u.name)}</div>`;
      const crops = (anbau || [])
        .filter((a: any) => a.flaecheTyp === u.typ && String(a.flaecheId) === String(u.id))
        .sort((a: any, b: any) => (dateNum(a.pflanzDatum) || 0) - (dateNum(b.pflanzDatum) || 0));
      crops.forEach((c: any, ci: number) => {
        const span = spanInWindow(win, c.pflanzDatum, c.ernteDatum);
        if (!span) return;
        const col = cropColor(c, ci);
        const planned = c.status === "geplant";
        body += `<div class="kb-bar${planned ? " planned" : ""}" title="${escapeHtml(c.kultur || "Kultur")}" style="grid-row:${r};grid-column:${span.s + 2}/${span.e + 3};--cc:${col}">${escapeHtml(c.kultur || "")}</div>`;
      });
      const ms = (mass || []).filter((m: any) => m.flaecheTyp === u.typ && String(m.flaecheId) === String(u.id));
      const seen: Record<number, boolean> = {};
      ms.forEach((m: any) => {
        const d = m.status === "erledigt" ? (m.erledigtDatum || m.planDatum) : (m.planDatum || m.erledigtDatum);
        const wi = weekIndexOf(win, d);
        if (wi < 0 || seen[wi]) return;
        seen[wi] = true;
        const a = artMeta(m.art);
        body += `<div class="kb-m" title="${escapeHtml(a.label)}" style="grid-row:${r};grid-column:${wi + 2};--mc:${a.color}"></div>`;
      });
    });
  });

  const curIdx = win.findIndex((w) => w.isCurrent);
  const todayLine = curIdx >= 0 ? `<div class="kb-today" style="grid-row:1/${r + 1};grid-column:${curIdx + 2}"></div>` : "";

  host.innerHTML = `<div class="kb-wrap"><div class="kb-grid" style="grid-template-columns:150px repeat(${N},${colW}px);grid-auto-rows:26px">${header}${body}${todayLine}</div></div>
    <div class="km-legend" style="margin-top:10px">${ART_ORDER.map((a) => `<span class="km-leg"><span class="km-leg-dot" style="background:${ART_META[a].color}"></span>${escapeHtml(ART_META[a].label)}</span>`).join("")}</div>`;
  host.querySelectorAll("[data-ukey]").forEach((n: any) => n.addEventListener("click", () => onSelect && onSelect(n.dataset.ukey)));
}
