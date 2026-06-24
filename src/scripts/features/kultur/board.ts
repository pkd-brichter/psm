// @ts-nocheck
// Anbauplan-Board: alle Flächen (Zeilen) × Monatsachse (Spalten) auf einen
// Blick. Kultur-Balken = Belegung (Pflanzung → Ernte-Ende), helleres Band =
// Ernte-Zeitraum; Maßnahmen als Marker (gefüllt = erledigt, Ring = geplant);
// heute-Linie. Robuste Positionierung in % über eine gleich breite Monatsachse
// (kein zerbrechliches CSS-Grid). Klick öffnet die Fläche, Rechtsklick plant.
import { escapeHtml } from "@scripts/core/utils";
import { ART_META, artMeta, cropColor, MONTHS_SHORT, monthsBetween, posInMonths } from "./model";

const MONTH_W = 66; // px je Monat

export function renderBoard(host: HTMLElement, ctx: any): void {
  const { units, anbau, mass, onSelect, onContext } = ctx;
  if (!units || !units.length) {
    host.innerHTML = `<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>`;
    return;
  }

  // Zeitfenster (ganze Monate)
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
  (anbau || []).forEach((a: any) => { stretch(a.pflanzDatum); stretch(a.ernteBis || a.ernteDatum); stretch(a.ernteVon); });
  (mass || []).forEach((m: any) => stretch(m.planDatum || m.erledigtDatum));
  const months = monthsBetween(minD, maxD);
  const N = months.length;
  const W = N * MONTH_W;
  const pct = (p: number) => (p == null ? null : (p * 100).toFixed(2) + "%");
  const todayPos = posInMonths(months, today.toISOString());

  const houses = units.filter((u: any) => u.typ === "haus");
  const fields = units.filter((u: any) => u.typ === "acker");

  // Kopf-Achse
  let axis = "";
  months.forEach((mo: any, i: number) => {
    const cur = mo.y === today.getFullYear() && mo.m === today.getMonth();
    axis += `<div class="kb2-mo${cur ? " cur" : ""}" style="width:${MONTH_W}px">${MONTHS_SHORT[mo.m]}${mo.m === 0 ? " " + String(mo.y).slice(2) : ""}</div>`;
  });

  const trackInner = (u: any) => {
    const crops = (anbau || []).filter((a: any) => a.flaecheTyp === u.typ && String(a.flaecheId) === String(u.id));
    const measures = (mass || []).filter((m: any) => m.flaecheTyp === u.typ && String(m.flaecheId) === String(u.id));
    let inner = "";
    crops.forEach((c: any, ci: number) => {
      const p0 = posInMonths(months, c.pflanzDatum);
      let p1 = posInMonths(months, c.ernteBis || c.ernteDatum || c.pflanzDatum);
      if (p0 == null) return;
      if (p1 == null || p1 <= p0) p1 = Math.min(1, p0 + 0.5 / N);
      const col = cropColor(c, ci);
      const planned = c.status === "geplant";
      inner += `<div class="kb2-bar${planned ? " planned" : ""}" title="${escapeHtml(c.kultur || "Kultur")}" style="left:${pct(p0)};width:${((p1 - p0) * 100).toFixed(2)}%;--cc:${escapeHtml(col)}"><span>${escapeHtml(c.kultur || "")}</span></div>`;
      // Ernte-Zeitraum-Band
      const ev = posInMonths(months, c.ernteVon);
      const eb = posInMonths(months, c.ernteBis);
      if (ev != null && eb != null && eb > ev) {
        inner += `<div class="kb2-harvest" title="Ernte" style="left:${pct(ev)};width:${((eb - ev) * 100).toFixed(2)}%;--cc:${escapeHtml(col)}"></div>`;
      }
    });
    measures.forEach((m: any) => {
      const d = m.status === "erledigt" ? (m.erledigtDatum || m.planDatum) : (m.planDatum || m.erledigtDatum);
      const p = posInMonths(months, d);
      if (p == null) return;
      const a = artMeta(m.art);
      const done = m.status === "erledigt";
      inner += `<span class="kb2-mk${done ? " done" : ""}" title="${escapeHtml(a.label + (m.notes ? ": " + m.notes : ""))}" style="left:${pct(p)};--mc:${a.color}"></span>`;
    });
    if (todayPos != null) inner += `<div class="kb2-today" style="left:${pct(todayPos)}"></div>`;
    return inner;
  };

  const rowHtml = (u: any) => {
    const key = u.typ + ":" + u.id;
    const crops = (anbau || []).filter((a: any) => a.flaecheTyp === u.typ && String(a.flaecheId) === String(u.id));
    const cur = crops.find((c: any) => c.status === "aktiv") || crops.find((c: any) => c.status !== "abgeschlossen");
    const sub = cur ? escapeHtml(cur.kultur || "") : "frei";
    return `<div class="kb2-row" data-ukey="${key}">
      <div class="kb2-label" title="${escapeHtml(u.name)}"><b>${escapeHtml(u.name)}</b><small>${sub}</small></div>
      <div class="kb2-track" style="width:${W}px">${trackInner(u)}</div>
    </div>`;
  };

  const group = (title: string, arr: any[]) =>
    arr.length ? `<div class="kb2-grp"><div class="kb2-grp-l">${escapeHtml(title)}</div><div class="kb2-grp-t" style="width:${W}px"></div></div>` + arr.map(rowHtml).join("") : "";

  host.innerHTML = `
    <style>
      .kb2-scroll{overflow:auto;max-width:100%}
      .kb2-head{display:flex;align-items:flex-end;position:sticky;top:0;background:var(--surface-1);z-index:4}
      .kb2-corner{position:sticky;left:0;z-index:5;background:var(--surface-1);width:130px;min-width:130px;font-size:12px;font-weight:600;color:var(--text-muted);padding:0 8px 6px}
      .kb2-axis{display:flex}
      .kb2-mo{font-size:11px;color:var(--text-dim);text-align:center;border-left:1px solid var(--border-1);padding-bottom:6px;box-sizing:border-box}
      .kb2-mo.cur{color:#16a34a;font-weight:700}
      .kb2-grp{display:flex}
      .kb2-grp-l{position:sticky;left:0;z-index:3;background:var(--surface-1);width:130px;min-width:130px;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;color:var(--text-dim);padding:9px 8px 3px}
      .kb2-row{display:flex;align-items:stretch}
      .kb2-row:hover .kb2-label{background:var(--surface-2)}
      .kb2-label{position:sticky;left:0;z-index:3;background:var(--surface-1);width:130px;min-width:130px;padding:6px 8px;cursor:pointer;border-top:1px solid var(--border-1);display:flex;flex-direction:column;justify-content:center;overflow:hidden}
      .kb2-label b{font-size:12.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .kb2-label small{font-size:11px;color:var(--text-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .kb2-track{position:relative;height:38px;border-top:1px solid var(--border-1);background-image:linear-gradient(to right,var(--border-1) 1px,transparent 1px);background-size:${MONTH_W}px 100%}
      .kb2-bar{position:absolute;top:9px;height:20px;border-radius:5px;background:var(--cc);color:#fff;display:flex;align-items:center;padding:0 7px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08);min-width:6px}
      .kb2-bar span{font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .kb2-bar.planned{background:transparent;border:1.5px dashed var(--cc);color:var(--cc)}
      .kb2-harvest{position:absolute;top:11px;height:16px;border-radius:4px;background:repeating-linear-gradient(45deg,rgba(255,255,255,.55),rgba(255,255,255,.55) 3px,transparent 3px,transparent 6px);box-shadow:inset 0 0 0 1.5px #fff;pointer-events:none}
      .kb2-mk{position:absolute;top:24px;width:11px;height:11px;border-radius:50%;background:var(--mc);transform:translateX(-50%);border:1.5px solid var(--surface-1);z-index:2}
      .kb2-mk:not(.done){background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--mc)}
      .kb2-today{position:absolute;top:0;bottom:0;width:0;border-left:2px dashed #16a34a;transform:translateX(-1px);pointer-events:none;z-index:1}
      .kb2-legend{display:flex;flex-wrap:wrap;gap:7px 16px;font-size:11.5px;color:var(--text-muted);margin-top:12px;align-items:center}
      .kb2-legend .lg{display:inline-flex;align-items:center;gap:5px}
      .kb2-legend .d{width:11px;height:11px;border-radius:50%}
      .kb2-hint{margin-left:auto;color:var(--text-dim)}
    </style>
    <div class="kb2-scroll">
      <div class="kb2-head"><div class="kb2-corner">Fläche</div><div class="kb2-axis">${axis}</div></div>
      ${group("Gewächshäuser", houses)}
      ${group("Freiland", fields)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--text-secondary,#475569)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--text-secondary,#475569)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:#9FE1CB;display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,#bbb,#bbb 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`;

  host.querySelectorAll(".kb2-row").forEach((r: any) => {
    const key = r.dataset.ukey;
    r.querySelector(".kb2-label")?.addEventListener("click", () => onSelect && onSelect(key));
    r.addEventListener("contextmenu", (e: any) => {
      e.preventDefault();
      onContext && onContext(key, e.clientX, e.clientY);
    });
  });
}
