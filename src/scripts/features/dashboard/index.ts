// Dashboard / Start – Plattform-Übersicht: Statistik, Warnungen, letzte Aktivität.
import { escapeHtml } from "@scripts/core/utils";
import { extractSliceItems } from "@scripts/core/state";
import { getActiveDriverKey } from "@scripts/core/storage";
import {
  getLagerUebersicht,
  listKulturen,
  listMittelStammdaten,
  listAckerflaechen,
  listHistoryEntries,
} from "@scripts/core/storage/sqlite";

interface Services {
  state: {
    getState: () => any;
    updateSlice: (key: any, updater: any) => any;
    subscribe: (fn: (s: any) => void) => void;
  };
  events?: { emit: (e: string, p?: unknown) => void };
}

const nf = (n: number, d = 0): string =>
  Number.isFinite(n)
    ? n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d })
    : "–";

function fmtDate(v: string | null): string {
  if (!v) return "";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString("de-DE");
}

function statCard(icon: string, label: string, value: string, section?: string): string {
  const click = section ? ` data-goto="${section}" style="cursor:pointer;"` : "";
  return `
    <div class="dash-card"${click}>
      <i class="bi ${icon} dash-card-icon"></i>
      <div class="dash-card-value">${value}</div>
      <div class="dash-card-label">${escapeHtml(label)}</div>
    </div>`;
}

function renderShell(): string {
  return `
  <style>
    .dash-wrap{display:flex;flex-direction:column;gap:18px}
    .dash-greet h2{margin:0;font-weight:650}
    .dash-greet p{margin:2px 0 0;color:var(--color-text-muted,#94a3b8);font-size:.95rem}
    .dash-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
    .dash-card{background:var(--color-surface-1,rgba(255,255,255,.04));border:1px solid var(--border-1,rgba(255,255,255,.1));border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;gap:2px;transition:border-color .15s}
    .dash-card[data-goto]:hover{border-color:var(--color-primary,#22c55e)}
    .dash-card-icon{font-size:1.2rem;color:var(--color-primary,#22c55e)}
    .dash-card-value{font-size:1.6rem;font-weight:700;font-variant-numeric:tabular-nums;line-height:1.1}
    .dash-card-label{font-size:.82rem;color:var(--color-text-muted,#94a3b8)}
    .dash-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    @media(max-width:820px){.dash-cols{grid-template-columns:1fr}}
    .dash-panel{background:var(--color-surface-1,rgba(255,255,255,.04));border:1px solid var(--border-1,rgba(255,255,255,.1));border-radius:12px;padding:14px 16px}
    .dash-panel h3{font-size:1rem;margin:0 0 10px;display:flex;align-items:center;gap:8px;font-weight:650}
    .dash-row{display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px solid var(--border-1,rgba(255,255,255,.07));font-size:.9rem}
    .dash-row:last-child{border-bottom:0}
    .dash-empty{color:var(--color-text-muted,#94a3b8);font-size:.9rem;padding:8px 0}
    .dash-actions{display:flex;flex-wrap:wrap;gap:8px}
  </style>
  <section class="calc-section">
    <div class="dash-wrap">
      <div class="dash-greet">
        <h2><i class="bi bi-grid-1x2-fill me-2" style="color:var(--color-primary,#22c55e)"></i>Übersicht</h2>
        <p data-role="dash-sub">Willkommen – hier siehst du auf einen Blick, was los ist.</p>
      </div>

      <div class="dash-cards" data-role="dash-cards"></div>

      <div class="dash-actions">
        <button class="btn btn-psm-primary" data-goto="calc"><i class="bi bi-pencil-square me-1"></i>Neu erfassen</button>
        <button class="btn btn-psm-secondary-outline" data-goto="lager"><i class="bi bi-box-seam me-1"></i>PSM-Lager</button>
        <button class="btn btn-psm-secondary-outline" data-goto="acker"><i class="bi bi-map me-1"></i>Acker-Planer</button>
        <button class="btn btn-psm-secondary-outline" data-goto="documentation"><i class="bi bi-list-ul me-1"></i>Übersicht</button>
      </div>

      <div class="dash-cols">
        <div class="dash-panel">
          <h3><i class="bi bi-exclamation-triangle" style="color:#f59e0b"></i>Zu beachten</h3>
          <div data-role="dash-warn"></div>
        </div>
        <div class="dash-panel">
          <h3><i class="bi bi-clock-history"></i>Letzte Anwendungen</h3>
          <div data-role="dash-recent"></div>
        </div>
      </div>
    </div>
  </section>`;
}

export function initDashboard(container: Element | null, services: Services): void {
  if (!(container instanceof HTMLElement)) return;
  container.innerHTML = renderShell();

  const cardsEl = container.querySelector<HTMLElement>('[data-role="dash-cards"]');
  const warnEl = container.querySelector<HTMLElement>('[data-role="dash-warn"]');
  const recentEl = container.querySelector<HTMLElement>('[data-role="dash-recent"]');

  // Schnellzugriff + klickbare Karten → Bereich wechseln
  container.addEventListener("click", (ev) => {
    const t = (ev.target as HTMLElement)?.closest("[data-goto]") as HTMLElement | null;
    if (!t) return;
    const section = t.getAttribute("data-goto");
    if (section) {
      services.state.updateSlice("app", (app: any) => ({ ...app, activeSection: section }));
    }
  });

  const refresh = async (): Promise<void> => {
    if (getActiveDriverKey() !== "sqlite") {
      if (cardsEl) cardsEl.innerHTML = `<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>`;
      return;
    }
    const state = services.state.getState();
    const standorte = (extractSliceItems<any>(state.gps?.points) || []).length;

    let kulturen = 0, mittel = 0, acker = 0, ackerPlants = 0;
    let lagerRows: any[] = [];
    let recent: any[] = [];
    let anwendungen = 0;
    try { kulturen = (await listKulturen())?.rows?.length || 0; } catch {}
    try { mittel = (await listMittelStammdaten())?.rows?.length || 0; } catch {}
    try {
      const a = (await listAckerflaechen())?.rows || [];
      acker = a.length;
      ackerPlants = a.reduce((s: number, f: any) => s + (f.plants || 0), 0);
    } catch {}
    try { lagerRows = (await getLagerUebersicht())?.rows || []; } catch {}
    try {
      const h: any = await listHistoryEntries({});
      const entries = h?.entries || h?.rows || [];
      anwendungen = h?.totalCount ?? entries.length;
      recent = entries.slice(0, 6);
    } catch {}

    if (cardsEl) {
      cardsEl.innerHTML = [
        statCard("bi-geo-alt", "Standorte", nf(standorte)),
        statCard("bi-flower1", "Kulturen", nf(kulturen)),
        statCard("bi-droplet", "Mittel im Sortiment", nf(mittel), "lager"),
        statCard("bi-journal-check", "Anwendungen", nf(anwendungen), "documentation"),
        statCard("bi-map", "Acker-Flächen", nf(acker), "acker"),
        statCard("bi-flower3", "Pflanzen (Acker)", nf(ackerPlants), "acker"),
      ].join("");
    }

    // Warnungen: niedriger Bestand + ablaufende Zulassungen
    if (warnEl) {
      const warns: string[] = [];
      lagerRows.forEach((r: any) => {
        if (r.bestand <= 0 && (r.verbraucht > 0 || r.zugang > 0)) {
          warns.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${escapeHtml(r.name)}</span><span style="color:#ef4444">Bestand ${nf(r.bestand)} ${escapeHtml(r.einheit || "")}</span></div>`);
        }
      });
      lagerRows.forEach((r: any) => {
        if (!r.zulEnde) return;
        const days = Math.round((new Date(r.zulEnde).getTime() - Date.now()) / 86400000);
        if (days < 0) warns.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${escapeHtml(r.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`);
        else if (days < 180) warns.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${escapeHtml(r.name)}</span><span style="color:#f59e0b">Zulassung endet in ${days} T</span></div>`);
      });
      warnEl.innerHTML = warns.length
        ? warns.slice(0, 8).join("")
        : `<div class="dash-empty">Alles im grünen Bereich. ✓</div>`;
    }

    // Letzte Anwendungen
    if (recentEl) {
      recentEl.innerHTML = recent.length
        ? recent.map((e: any) => {
            const datum = fmtDate(e.datum || e.dateIso || e.created_at || e.createdAt || null);
            const kultur = e.kultur || "";
            const standort = e.standort || "";
            return `<div class="dash-row"><span>${escapeHtml(standort)}${kultur ? " · " + escapeHtml(kultur) : ""}</span><span class="dash-empty" style="padding:0">${escapeHtml(datum)}</span></div>`;
          }).join("")
        : `<div class="dash-empty">Noch keine Anwendungen erfasst.</div>`;
    }
  };

  services.state.subscribe((s: any) => {
    if (s?.app?.activeSection === "dashboard") void refresh();
  });
  void refresh();
}
