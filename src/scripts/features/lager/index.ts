// Mittel-Lager (Bestand / Verbrauch / Bewegungen) – Desktop-Inventar-Ansicht.
// Teil der Pestalozzi-Plattform – nutzt die gemeinsame SQLite-DB.
// Layout orientiert sich an gängigen Inventar-Apps: KPI-Karten oben, Such-/
// Aktionsleiste, einklappbares Erfassungsformular, klare Bestandstabelle mit
// Status-Badges und eine Bewegungs-Timeline.
import { escapeHtml } from "@scripts/core/utils";
import { toast } from "@scripts/core/toast";

const escapeAttr = (value: unknown): string => escapeHtml(value as any);
import {
  getLagerUebersicht,
  listLagerBewegungen,
  upsertLagerBewegung,
  deleteLagerBewegung,
  listMittelStammdaten,
  persistSqliteDatabaseFile,
} from "@scripts/core/storage/sqlite";
import { getActiveDriverKey } from "@scripts/core/storage";

interface Services {
  state: {
    getState: () => any;
    subscribe: (fn: (s: any) => void) => void;
  };
  events?: { emit: (e: string, p?: unknown) => void };
}

const nf = (n: number, d = 1): string =>
  Number.isFinite(n)
    ? n.toLocaleString("de-DE", {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      })
    : "–";

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("de-DE");
}

function daysUntil(iso: string | null): number | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return Math.round((d.getTime() - Date.now()) / 86400000);
}

function zulassungBadge(zulEnde: string | null): string {
  const days = daysUntil(zulEnde);
  if (days === null) return zulEnde ? escapeHtml(zulEnde) : "";
  if (days < 0)
    return `<span class="lager-pill bad">${fmtDate(zulEnde)} · abgelaufen</span>`;
  if (days < 180)
    return `<span class="lager-pill low">${fmtDate(zulEnde)} · ${days} T</span>`;
  return `<span class="lager-muted">${fmtDate(zulEnde)}</span>`;
}

function statusBadge(bestand: number): string {
  if (!Number.isFinite(bestand))
    return `<span class="lager-badge neutral">–</span>`;
  if (bestand < 0) return `<span class="lager-badge bad">Negativ</span>`;
  if (bestand === 0) return `<span class="lager-badge low">Leer</span>`;
  return `<span class="lager-badge ok">Vorrätig</span>`;
}

function kpiCard(
  icon: string,
  label: string,
  value: string | number,
  tone: "" | "warn" | "bad" = ""
): string {
  const cls = tone ? ` is-${tone}` : "";
  return `
    <div class="lager-kpi${cls}">
      <i class="bi ${icon} lager-kpi-icon"></i>
      <div class="lager-kpi-value">${escapeHtml(String(value))}</div>
      <div class="lager-kpi-label">${escapeHtml(label)}</div>
    </div>`;
}

const STYLES = `
  <style>
    .lager-wrap{display:flex;flex-direction:column;gap:18px}
    .lager-head h2{margin:0;font-weight:650;display:flex;align-items:center;gap:8px}
    .lager-head h2 i{color:var(--color-primary,#22c55e)}
    .lager-head p{margin:4px 0 0;color:var(--color-text-muted,#94a3b8);font-size:.9rem;max-width:78ch}
    .lager-kpis{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
    .lager-kpi{background:var(--color-surface-1,rgba(255,255,255,.04));border:1px solid var(--border-1,rgba(255,255,255,.1));border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;gap:2px}
    .lager-kpi-icon{font-size:1.2rem;color:var(--color-primary,#22c55e)}
    .lager-kpi-value{font-size:1.6rem;font-weight:700;font-variant-numeric:tabular-nums;line-height:1.1}
    .lager-kpi-label{font-size:.82rem;color:var(--color-text-muted,#94a3b8)}
    .lager-kpi.is-warn .lager-kpi-icon,.lager-kpi.is-warn .lager-kpi-value{color:#f59e0b}
    .lager-kpi.is-bad .lager-kpi-icon,.lager-kpi.is-bad .lager-kpi-value{color:#ef4444}

    .lager-toolbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    .lager-search{position:relative;flex:0 1 380px;min-width:200px}
    .lager-search i{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--color-text-muted,#94a3b8);font-size:.9rem;pointer-events:none}
    .lager-search input{width:100%;padding:9px 12px 9px 34px;border-radius:9px;border:1px solid var(--border-1,rgba(255,255,255,.14));background:var(--surface-1);color:var(--text);font-size:.92rem}
    .lager-search input:focus{outline:none;border-color:var(--color-primary,#22c55e)}
    .lager-spacer{flex:1 1 auto}

    .lager-panel{background:var(--color-surface-1,rgba(255,255,255,.04));border:1px solid var(--border-1,rgba(255,255,255,.1));border-radius:12px;padding:16px 18px}
    .lager-panel[hidden]{display:none}
    .lager-panel-head{display:flex;align-items:center;gap:10px;margin-bottom:14px}
    .lager-panel-head h3{font-size:1rem;margin:0;display:flex;align-items:center;gap:8px;font-weight:650;flex:1}
    .lager-panel-head h3 i{color:var(--color-primary,#22c55e)}
    .lager-count{font-size:.82rem;color:var(--color-text-muted,#94a3b8)}
    .lager-panel-close{border:none;background:transparent;color:var(--color-text-muted,#94a3b8);cursor:pointer;font-size:1rem;padding:4px;line-height:1}
    .lager-panel-close:hover{color:var(--text)}

    .lager-form-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    @media(max-width:900px){.lager-form-grid{grid-template-columns:repeat(2,1fr)}}
    .lager-field{display:flex;flex-direction:column;gap:5px;min-width:0}
    .lager-field.col-2{grid-column:span 2}
    @media(max-width:900px){.lager-field.col-2{grid-column:span 2}}
    .lager-field label{font-size:.76rem;font-weight:600;color:var(--color-text-muted,#94a3b8)}
    .lager-field input,.lager-field select{padding:8px 10px;border-radius:8px;border:1px solid var(--border-1,rgba(255,255,255,.14));background:var(--surface-1);color:var(--text);font-size:.9rem;width:100%}
    .lager-field input:focus,.lager-field select:focus{outline:none;border-color:var(--color-primary,#22c55e)}
    .lager-req{color:#ef4444}
    .lager-form-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:16px}

    .lager-tablewrap{overflow-x:auto;margin:0 -4px}
    .lager-table{width:100%;border-collapse:collapse;font-size:.9rem}
    .lager-table th{text-align:left;font-size:.7rem;text-transform:uppercase;letter-spacing:.04em;color:var(--color-text-muted,#94a3b8);font-weight:700;padding:0 12px 10px;border-bottom:1px solid var(--border-1,rgba(255,255,255,.12));white-space:nowrap}
    .lager-table th.num,.lager-table td.num{text-align:right;font-variant-numeric:tabular-nums}
    .lager-table td{padding:11px 12px;border-bottom:1px solid var(--border-1,rgba(255,255,255,.06));vertical-align:middle}
    .lager-table tbody tr:hover{background:var(--surface-2,rgba(255,255,255,.03))}
    .lager-table tbody tr:last-child td{border-bottom:0}
    .lager-mname{font-weight:600;color:var(--text)}
    .lager-sub{display:block;font-size:.76rem;color:var(--color-text-muted,#94a3b8)}
    .lager-bestand{font-weight:700}
    .lager-bestand.bad{color:#ef4444}
    .lager-bestand.low{color:#f59e0b}
    .lager-row-add{border:1px solid var(--border-1,rgba(255,255,255,.14));background:transparent;color:var(--color-primary,#22c55e);border-radius:8px;width:30px;height:30px;cursor:pointer;line-height:1;font-size:.95rem;display:inline-flex;align-items:center;justify-content:center}
    .lager-row-add:hover{background:rgba(34,197,94,.12);border-color:var(--color-primary,#22c55e)}

    .lager-badge{display:inline-flex;align-items:center;gap:6px;padding:3px 11px;border-radius:999px;font-size:.74rem;font-weight:600;white-space:nowrap}
    .lager-badge::before{content:"";width:7px;height:7px;border-radius:999px;background:currentColor}
    .lager-badge.ok{color:#16a34a;background:rgba(22,163,74,.12)}
    .lager-badge.low{color:#f59e0b;background:rgba(245,158,11,.14)}
    .lager-badge.bad{color:#ef4444;background:rgba(239,68,68,.14)}
    .lager-badge.neutral{color:var(--color-text-muted,#94a3b8);background:rgba(148,163,184,.14)}
    .lager-pill{font-size:.8rem;font-weight:600}
    .lager-pill.bad{color:#ef4444}
    .lager-pill.low{color:#f59e0b}
    .lager-muted{color:var(--color-text-muted,#94a3b8)}

    .lager-mov{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-1,rgba(255,255,255,.06))}
    .lager-mov:last-child{border-bottom:0}
    .lager-mov-type{flex:0 0 auto;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.03em;padding:3px 10px;border-radius:999px}
    .lager-mov-type.zugang{color:#16a34a;background:rgba(22,163,74,.12)}
    .lager-mov-type.other{color:var(--color-text-muted,#94a3b8);background:rgba(148,163,184,.14)}
    .lager-mov-main{flex:1 1 auto;min-width:0}
    .lager-mov-main b{color:var(--text)}
    .lager-mov-sub{display:block;font-size:.78rem;color:var(--color-text-muted,#94a3b8)}
    .lager-mov-del{flex:0 0 auto;border:1px solid var(--border-1,rgba(255,255,255,.14));background:transparent;color:#ef4444;border-radius:8px;width:32px;height:32px;cursor:pointer;line-height:1;font-size:1rem}
    .lager-mov-del:hover{background:rgba(239,68,68,.12)}
    .lager-empty{color:var(--color-text-muted,#94a3b8);font-size:.9rem;padding:18px 2px;text-align:center}
  </style>`;

function renderShell(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `
    ${STYLES}
    <section class="calc-section">
      <div class="lager-wrap">
        <div class="lager-head">
          <h2><i class="bi bi-box-seam"></i>PSM-Lager</h2>
          <p data-role="lager-empty-hint">Bestand = Zugänge − Verbrauch · der Verbrauch wird automatisch aus den dokumentierten Anwendungen berechnet.</p>
        </div>

        <div class="lager-kpis" data-role="lager-kpis"></div>

        <div class="lager-toolbar">
          <div class="lager-search">
            <i class="bi bi-search"></i>
            <input type="search" data-role="lager-search" placeholder="Mittel oder Wirkstoff suchen …" autocomplete="off" />
          </div>
          <span class="lager-spacer"></span>
          <button type="button" class="btn btn-psm-primary" data-role="lager-add-toggle">
            <i class="bi bi-plus-lg me-1"></i>Zugang erfassen
          </button>
        </div>

        <div class="lager-panel" data-role="lager-form-panel" hidden>
          <div class="lager-panel-head">
            <h3><i class="bi bi-plus-circle"></i>Zugang / Bewegung erfassen</h3>
            <button type="button" class="lager-panel-close" data-role="lager-add-close" aria-label="Schließen"><i class="bi bi-x-lg"></i></button>
          </div>
          <form data-role="lager-form">
            <div class="lager-form-grid">
              <div class="lager-field col-2">
                <label>Mittel <span class="lager-req">*</span></label>
                <select name="mittel" data-role="lager-mittel-select" required>
                  <option value="">— Mittel wählen —</option>
                  <option value="__new__">➕ Neues Mittel …</option>
                </select>
                <input name="mittelNew" data-role="lager-mittel-new" placeholder="Name des neuen Mittels" autocomplete="off" hidden style="margin-top:6px" />
              </div>
              <div class="lager-field">
                <label>Typ</label>
                <select name="typ">
                  <option value="zugang">Zugang (Einkauf)</option>
                  <option value="korrektur">Korrektur (±)</option>
                  <option value="inventur">Inventur</option>
                </select>
              </div>
              <div class="lager-field">
                <label>Zulassungsnr.</label>
                <input name="kennr" />
              </div>
              <div class="lager-field">
                <label>Menge <span class="lager-req">*</span></label>
                <input name="menge" type="number" step="any" required />
              </div>
              <div class="lager-field">
                <label>Einheit</label>
                <input name="einheit" placeholder="L / kg / ml / g" />
              </div>
              <div class="lager-field">
                <label>Datum</label>
                <input name="datum" type="date" value="${today}" />
              </div>
              <div class="lager-field">
                <label>Charge</label>
                <input name="charge" />
              </div>
              <div class="lager-field">
                <label>Ablaufdatum</label>
                <input name="ablauf" type="date" />
              </div>
              <div class="lager-field col-2">
                <label>Lieferant</label>
                <input name="lieferant" />
              </div>
              <div class="lager-field">
                <label>Preis (€)</label>
                <input name="preis" type="number" step="any" />
              </div>
            </div>
            <div class="lager-form-actions">
              <button type="button" class="btn btn-psm-secondary-outline" data-role="lager-add-cancel">Abbrechen</button>
              <button type="submit" class="btn btn-psm-primary">Bewegung speichern</button>
            </div>
          </form>
        </div>

        <div class="lager-panel">
          <div class="lager-panel-head">
            <h3><i class="bi bi-card-checklist"></i>Bestandsübersicht</h3>
            <span class="lager-count" data-role="lager-count"></span>
          </div>
          <div class="lager-tablewrap">
            <table class="lager-table">
              <thead><tr>
                <th>Mittel</th>
                <th>Wirkstoff</th>
                <th class="num">Verbraucht</th>
                <th class="num">Bestand</th>
                <th>Status</th>
                <th>Zulassung bis</th>
                <th>Nächster Ablauf</th>
                <th class="num"></th>
              </tr></thead>
              <tbody data-role="lager-uebersicht"></tbody>
            </table>
          </div>
        </div>

        <div class="lager-panel">
          <div class="lager-panel-head">
            <h3><i class="bi bi-clock-history"></i>Letzte Bewegungen</h3>
          </div>
          <div data-role="lager-bewegungen"></div>
        </div>
      </div>
    </section>`;
}

export function initLager(container: Element | null, services: Services): void {
  if (!(container instanceof HTMLElement)) return;
  container.innerHTML = renderShell();

  const kpisEl = container.querySelector<HTMLElement>('[data-role="lager-kpis"]');
  const tbody = container.querySelector<HTMLElement>(
    '[data-role="lager-uebersicht"]'
  );
  const countEl = container.querySelector<HTMLElement>('[data-role="lager-count"]');
  const movEl = container.querySelector<HTMLElement>(
    '[data-role="lager-bewegungen"]'
  );
  const form = container.querySelector<HTMLFormElement>(
    '[data-role="lager-form"]'
  );
  const formPanel = container.querySelector<HTMLElement>(
    '[data-role="lager-form-panel"]'
  );
  const addToggle = container.querySelector<HTMLButtonElement>(
    '[data-role="lager-add-toggle"]'
  );
  const searchInput = container.querySelector<HTMLInputElement>(
    '[data-role="lager-search"]'
  );
  const mittelSelect = container.querySelector<HTMLSelectElement>(
    '[data-role="lager-mittel-select"]'
  );
  const mittelNewInput = container.querySelector<HTMLInputElement>(
    '[data-role="lager-mittel-new"]'
  );
  const einheitInput = container.querySelector<HTMLInputElement>(
    '[name="einheit"]'
  );
  const kennrInput = container.querySelector<HTMLInputElement>('[name="kennr"]');
  const emptyHint = container.querySelector<HTMLElement>(
    '[data-role="lager-empty-hint"]'
  );
  // Index aller bekannten Mittel (Name → Stammdaten) für Auswahl + Auto-Ausfüllen
  const mittelIndex = new Map<
    string,
    { kennr: string | null; einheit: string | null; wirkstoff: string | null }
  >();

  // Zuletzt geladene Daten (für client-seitige Suche ohne erneutes Laden)
  let lastUeb: any[] = [];

  const renderKpis = (rows: any[]): void => {
    if (!kpisEl) return;
    const total = rows.length;
    const kritisch = rows.filter((r) => Number(r.bestand) <= 0).length;
    const baldAblauf = rows.filter((r) => {
      const d = daysUntil(r.naechsterAblauf || r.zulEnde);
      return d !== null && d >= 0 && d < 180;
    }).length;
    const abgelaufen = rows.filter((r) => {
      const d = daysUntil(r.zulEnde);
      return d !== null && d < 0;
    }).length;
    kpisEl.innerHTML =
      kpiCard("bi-boxes", "Mittel im Lager", total) +
      kpiCard(
        "bi-exclamation-triangle",
        "Bestand kritisch",
        kritisch,
        kritisch ? "warn" : ""
      ) +
      kpiCard(
        "bi-hourglass-split",
        "Bald ablaufend (< 6 Mon.)",
        baldAblauf,
        baldAblauf ? "warn" : ""
      ) +
      kpiCard(
        "bi-slash-circle",
        "Zulassung abgelaufen",
        abgelaufen,
        abgelaufen ? "bad" : ""
      );
  };

  const renderUebersicht = (): void => {
    if (!tbody) return;
    const term = (searchInput?.value || "").trim().toLowerCase();
    const rows = term
      ? lastUeb.filter(
          (r) =>
            String(r.name || "").toLowerCase().includes(term) ||
            String(r.wirkstoff || "").toLowerCase().includes(term)
        )
      : lastUeb;

    if (countEl) {
      countEl.textContent = term
        ? `${rows.length} von ${lastUeb.length}`
        : `${lastUeb.length} Mittel`;
    }

    if (!lastUeb.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="lager-empty">Noch keine Mittel. Erfasse oben einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>`;
      return;
    }
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="lager-empty">Keine Treffer für „${escapeHtml(
        term
      )}".</td></tr>`;
      return;
    }
    tbody.innerHTML = rows
      .map((r) => {
        const einheit = escapeHtml(r.einheit || "");
        const bestandCls =
          r.bestand < 0 ? " bad" : r.bestand === 0 ? " low" : "";
        return `<tr>
          <td>
            <span class="lager-mname">${escapeHtml(r.name)}</span>
            ${r.kennr ? `<span class="lager-sub">${escapeHtml(r.kennr)}</span>` : ""}
          </td>
          <td class="lager-muted">${escapeHtml(r.wirkstoff || "")}</td>
          <td class="num">
            ${nf(r.verbraucht)} ${einheit}
            <span class="lager-sub">${r.anwendungen} Anw.</span>
          </td>
          <td class="num"><span class="lager-bestand${bestandCls}">${nf(
            r.bestand
          )} ${einheit}</span></td>
          <td>${statusBadge(Number(r.bestand))}</td>
          <td>${zulassungBadge(r.zulEnde)}</td>
          <td class="lager-muted">${
            r.naechsterAblauf ? fmtDate(r.naechsterAblauf) : ""
          }</td>
          <td class="num"><button type="button" class="lager-row-add" data-add="${escapeAttr(
            r.name
          )}" title="Zugang für „${escapeAttr(
            r.name
          )}" erfassen" aria-label="Zugang erfassen"><i class="bi bi-plus-lg"></i></button></td>
        </tr>`;
      })
      .join("");
  };

  const renderBewegungen = (rows: any[]): void => {
    if (!movEl) return;
    if (!rows.length) {
      movEl.innerHTML = `<div class="lager-empty">Noch keine Bewegungen erfasst.</div>`;
      return;
    }
    movEl.innerHTML = rows
      .map((b) => {
        const isZugang = b.typ === "zugang";
        const sub = [
          fmtDate(b.datum),
          b.lieferant ? escapeHtml(b.lieferant) : "",
          b.ablauf ? "Ablauf " + fmtDate(b.ablauf) : "",
        ]
          .filter(Boolean)
          .join(" · ");
        return `
        <div class="lager-mov">
          <span class="lager-mov-type ${isZugang ? "zugang" : "other"}">${escapeHtml(
            b.typ
          )}</span>
          <span class="lager-mov-main">
            <b>${escapeHtml(b.mittelName)}</b> · ${nf(b.menge)} ${escapeHtml(
              b.einheit || ""
            )}${b.charge ? ` · Charge ${escapeHtml(b.charge)}` : ""}
            <span class="lager-mov-sub">${sub}</span>
          </span>
          <button class="lager-mov-del" data-del="${escapeAttr(
            b.id
          )}" title="Löschen" aria-label="Löschen">×</button>
        </div>`;
      })
      .join("");
    movEl.querySelectorAll<HTMLButtonElement>("[data-del]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-del") || "";
        try {
          await deleteLagerBewegung({ id });
          await persistSqliteDatabaseFile().catch(() => {});
          await refresh();
        } catch {
          toast.warning("Löschen fehlgeschlagen.");
        }
      });
    });
  };

  const fillMittelOptions = (): void => {
    if (!mittelSelect) return;
    const prev = mittelSelect.value;
    const names = Array.from(mittelIndex.keys()).sort((a, b) =>
      a.localeCompare(b, "de")
    );
    mittelSelect.innerHTML =
      `<option value="">— Mittel wählen —</option>` +
      names
        .map((n) => `<option value="${escapeAttr(n)}">${escapeHtml(n)}</option>`)
        .join("") +
      `<option value="__new__">➕ Neues Mittel …</option>`;
    // Vorherige Auswahl beibehalten, falls noch gültig.
    if (prev && (prev === "__new__" || names.includes(prev))) {
      mittelSelect.value = prev;
    }
  };

  // Einheit/Zulassungsnr. aus der Mittel-Auswahl automatisch übernehmen; bei
  // „Neues Mittel" das Freitextfeld einblenden.
  const onMittelChange = (): void => {
    if (!mittelSelect) return;
    const isNew = mittelSelect.value === "__new__";
    if (mittelNewInput) {
      mittelNewInput.hidden = !isNew;
      if (isNew) mittelNewInput.focus();
    }
    const m = mittelIndex.get(mittelSelect.value);
    if (m) {
      if (einheitInput && m.einheit) einheitInput.value = m.einheit;
      if (kennrInput && m.kennr) kennrInput.value = m.kennr;
    }
  };
  mittelSelect?.addEventListener("change", onMittelChange);

  // Zugang direkt für ein vorhandenes Mittel erfassen (Zeilen-Button „+").
  const openFormForMittel = (name: string): void => {
    setFormOpen(true, false);
    if (mittelSelect) {
      mittelSelect.value = name;
      onMittelChange();
    }
    formPanel
      ?.querySelector<HTMLInputElement>('[name="menge"]')
      ?.focus();
  };

  const setFormOpen = (open: boolean, autoFocus = true): void => {
    if (!formPanel) return;
    formPanel.hidden = !open;
    if (addToggle) {
      addToggle.innerHTML = open
        ? `<i class="bi bi-x-lg me-1"></i>Formular schließen`
        : `<i class="bi bi-plus-lg me-1"></i>Zugang erfassen`;
    }
    if (open) {
      if (autoFocus) {
        formPanel
          .querySelector<HTMLSelectElement>('[name="mittel"]')
          ?.focus();
      }
      formPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const refresh = async (): Promise<void> => {
    if (getActiveDriverKey() !== "sqlite") {
      if (emptyHint)
        emptyHint.textContent = "Bitte zuerst eine Datenbank öffnen.";
      return;
    }
    try {
      const [ueb, bew, stamm] = await Promise.all([
        getLagerUebersicht(),
        listLagerBewegungen(),
        listMittelStammdaten(),
      ]);
      lastUeb = ueb?.rows || [];
      renderKpis(lastUeb);
      renderUebersicht();
      renderBewegungen(bew?.rows || []);
      // Mittel-Index: alle aus den PDFs extrahierten Mittel + bereits vorhandene
      mittelIndex.clear();
      (stamm?.rows || []).forEach((r: any) => {
        if (r.name)
          mittelIndex.set(r.name, {
            kennr: r.kennr ?? null,
            einheit: r.einheit ?? null,
            wirkstoff: r.wirkstoff ?? null,
          });
      });
      lastUeb.forEach((r: any) => {
        if (r.name && !mittelIndex.has(r.name))
          mittelIndex.set(r.name, {
            kennr: r.kennr ?? null,
            einheit: r.einheit ?? null,
            wirkstoff: r.wirkstoff ?? null,
          });
      });
      fillMittelOptions();
    } catch (e) {
      console.warn("[Lager] Laden fehlgeschlagen:", e);
    }
  };

  addToggle?.addEventListener("click", () =>
    setFormOpen(Boolean(formPanel?.hidden))
  );
  container
    .querySelector('[data-role="lager-add-close"]')
    ?.addEventListener("click", () => setFormOpen(false));
  container
    .querySelector('[data-role="lager-add-cancel"]')
    ?.addEventListener("click", () => setFormOpen(false));

  searchInput?.addEventListener("input", () => renderUebersicht());

  // Zeilen-Aktion „+": Zugang für genau dieses (vorhandene) Mittel erfassen.
  tbody?.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement)?.closest<HTMLElement>("[data-add]");
    if (!btn) return;
    const name = btn.getAttribute("data-add") || "";
    if (name) openFormForMittel(name);
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (getActiveDriverKey() !== "sqlite") {
      toast.warning("Bitte zuerst eine Datenbank öffnen.");
      return;
    }
    const fd = new FormData(form);
    const sel = String(fd.get("mittel") || "").trim();
    const mittelName =
      sel === "__new__"
        ? String(fd.get("mittelNew") || "").trim()
        : sel;
    const menge = Number(String(fd.get("menge") || "").replace(",", "."));
    if (!mittelName || !Number.isFinite(menge)) {
      toast.warning("Bitte ein Mittel wählen und die Menge angeben.");
      return;
    }
    const preisRaw = String(fd.get("preis") || "").trim();
    try {
      await upsertLagerBewegung({
        mittelName,
        kennr: String(fd.get("kennr") || "").trim() || null,
        wirkstoff: mittelIndex.get(mittelName)?.wirkstoff || null,
        typ: String(fd.get("typ") || "zugang"),
        menge,
        einheit: String(fd.get("einheit") || "").trim() || null,
        datum: String(fd.get("datum") || "").trim() || null,
        charge: String(fd.get("charge") || "").trim() || null,
        ablauf: String(fd.get("ablauf") || "").trim() || null,
        lieferant: String(fd.get("lieferant") || "").trim() || null,
        preis: preisRaw ? Number(preisRaw.replace(",", ".")) : null,
      });
      await persistSqliteDatabaseFile().catch(() => {});
      form.reset();
      onMittelChange();
      setFormOpen(false);
      toast.success("Bewegung gespeichert.");
      await refresh();
    } catch {
      toast.warning("Speichern fehlgeschlagen.");
    }
  });

  // Aktualisieren, sobald der Lager-Bereich aktiv wird
  services.state.subscribe((s: any) => {
    if (s?.app?.activeSection === "lager") void refresh();
  });
  void refresh();
}
