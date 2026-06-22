// Mittel-Lager (Bestand / Verbrauch / Bewegungen)
// Teil der Pestalozzi-Plattform – nutzt die gemeinsame SQLite-DB.
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

function zulassungBadge(zulEnde: string | null): string {
  if (!zulEnde) return "";
  const end = new Date(zulEnde);
  if (Number.isNaN(end.getTime())) return escapeHtml(zulEnde);
  const days = Math.round((end.getTime() - Date.now()) / 86400000);
  if (days < 0)
    return `<span style="color:#ef4444;">${fmtDate(zulEnde)} · abgelaufen</span>`;
  if (days < 180)
    return `<span style="color:#f59e0b;">${fmtDate(zulEnde)} · ${days} T</span>`;
  return `<span class="calc-hint">${fmtDate(zulEnde)}</span>`;
}

function renderShell(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `
    <section class="calc-section">
      <fieldset class="calc-fieldset mb-4">
        <legend class="calc-legend"><i class="bi bi-box-seam me-2"></i>Bestandsübersicht</legend>
        <div class="calc-hint mb-2" data-role="lager-empty">
          Verbrauch wird automatisch aus den dokumentierten Anwendungen berechnet · Bestand = Zugänge − Verbrauch.
        </div>
        <div class="table-responsive">
          <table class="table table-sm align-middle" style="font-size:0.92rem;">
            <thead><tr class="calc-hint">
              <th>Mittel</th><th>Wirkstoff</th><th class="text-end">Verbraucht</th>
              <th class="text-end">Bestand</th><th>Zulassung bis</th><th>nächster Ablauf</th>
            </tr></thead>
            <tbody data-role="lager-uebersicht"></tbody>
          </table>
        </div>
      </fieldset>

      <fieldset class="calc-fieldset mb-4">
        <legend class="calc-legend"><i class="bi bi-plus-circle me-2"></i>Zugang / Bewegung erfassen</legend>
        <form data-role="lager-form">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label calc-label">Mittel <span class="calc-required">*</span></label>
              <input class="form-control calc-input" name="mittel" list="lager-mittel-options" autocomplete="off" required />
              <datalist id="lager-mittel-options"></datalist>
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Zulassungsnr.</label>
              <input class="form-control calc-input" name="kennr" />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Typ</label>
              <select class="form-select calc-input" name="typ">
                <option value="zugang">Zugang (Einkauf)</option>
                <option value="korrektur">Korrektur (±)</option>
                <option value="inventur">Inventur</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Menge <span class="calc-required">*</span></label>
              <input class="form-control calc-input" name="menge" type="number" step="any" required />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Einheit</label>
              <input class="form-control calc-input" name="einheit" placeholder="L / kg / ml / g" />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Datum</label>
              <input class="form-control calc-input" name="datum" type="date" value="${today}" />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Charge</label>
              <input class="form-control calc-input" name="charge" />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Ablaufdatum</label>
              <input class="form-control calc-input" name="ablauf" type="date" />
            </div>
            <div class="col-md-3">
              <label class="form-label calc-label">Lieferant</label>
              <input class="form-control calc-input" name="lieferant" />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Preis (€)</label>
              <input class="form-control calc-input" name="preis" type="number" step="any" />
            </div>
          </div>
          <div class="mt-3">
            <button type="submit" class="btn btn-psm-primary">Bewegung speichern</button>
          </div>
        </form>
      </fieldset>

      <fieldset class="calc-fieldset mb-4">
        <legend class="calc-legend"><i class="bi bi-clock-history me-2"></i>Letzte Bewegungen</legend>
        <div data-role="lager-bewegungen"></div>
      </fieldset>
    </section>`;
}

export function initLager(container: Element | null, services: Services): void {
  if (!(container instanceof HTMLElement)) return;
  container.innerHTML = renderShell();

  const tbody = container.querySelector<HTMLElement>(
    '[data-role="lager-uebersicht"]'
  );
  const movEl = container.querySelector<HTMLElement>(
    '[data-role="lager-bewegungen"]'
  );
  const form = container.querySelector<HTMLFormElement>(
    '[data-role="lager-form"]'
  );
  const mittelList = container.querySelector<HTMLDataListElement>(
    "#lager-mittel-options"
  );
  const emptyHint = container.querySelector<HTMLElement>(
    '[data-role="lager-empty"]'
  );
  // Index aller bekannten Mittel (Name → Stammdaten) für Auswahl + Auto-Ausfüllen
  const mittelIndex = new Map<
    string,
    { kennr: string | null; einheit: string | null; wirkstoff: string | null }
  >();

  const renderUebersicht = (rows: any[]): void => {
    if (!tbody) return;
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>`;
      return;
    }
    tbody.innerHTML = rows
      .map((r) => {
        const bestandColor =
          r.bestand < 0 ? "#ef4444" : r.bestand === 0 ? "#f59e0b" : "inherit";
        const einheit = escapeHtml(r.einheit || "");
        return `<tr>
          <td><span class="fw-semibold">${escapeHtml(r.name)}</span>${
            r.kennr
              ? `<span class="d-block calc-hint">${escapeHtml(r.kennr)}</span>`
              : ""
          }</td>
          <td class="calc-hint">${escapeHtml(r.wirkstoff || "")}</td>
          <td class="text-end">${nf(r.verbraucht)} ${einheit}<span class="d-block calc-hint">${
            r.anwendungen
          } Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${bestandColor};">${nf(
            r.bestand
          )} ${einheit}</td>
          <td>${zulassungBadge(r.zulEnde)}</td>
          <td class="calc-hint">${r.naechsterAblauf ? fmtDate(r.naechsterAblauf) : ""}</td>
        </tr>`;
      })
      .join("");
  };

  const renderBewegungen = (rows: any[]): void => {
    if (!movEl) return;
    if (!rows.length) {
      movEl.innerHTML = `<div class="calc-hint">Keine Bewegungen erfasst.</div>`;
      return;
    }
    movEl.innerHTML = rows
      .map(
        (b) => `
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${
            b.typ === "zugang" ? "#16a34a" : "#64748b"
          };">${escapeHtml(b.typ)}</span>
          <span class="flex-grow-1">${escapeHtml(b.mittelName)} · <b>${nf(
            b.menge
          )} ${escapeHtml(b.einheit || "")}</b>${
            b.charge ? ` · Charge ${escapeHtml(b.charge)}` : ""
          }<span class="d-block calc-hint">${fmtDate(b.datum)}${
            b.lieferant ? " · " + escapeHtml(b.lieferant) : ""
          }${b.ablauf ? " · Ablauf " + fmtDate(b.ablauf) : ""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${escapeAttr(
            b.id
          )}" title="Löschen">×</button>
        </div>`
      )
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
    if (!mittelList) return;
    mittelList.innerHTML = Array.from(mittelIndex.entries())
      .sort((a, b) => a[0].localeCompare(b[0], "de"))
      .map(
        ([name, m]) =>
          `<option value="${escapeAttr(name)}" data-kennr="${escapeAttr(
            m.kennr || ""
          )}" data-einheit="${escapeAttr(m.einheit || "")}" data-wirkstoff="${escapeAttr(
            m.wirkstoff || ""
          )}"></option>`
      )
      .join("");
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
      renderUebersicht(ueb?.rows || []);
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
      (ueb?.rows || []).forEach((r: any) => {
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

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (getActiveDriverKey() !== "sqlite") {
      toast.warning("Bitte zuerst eine Datenbank öffnen.");
      return;
    }
    const fd = new FormData(form);
    const mittelName = String(fd.get("mittel") || "").trim();
    const menge = Number(String(fd.get("menge") || "").replace(",", "."));
    if (!mittelName || !Number.isFinite(menge)) {
      toast.warning("Mittel und Menge angeben.");
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
      toast.success("Bewegung gespeichert.");
      await refresh();
    } catch {
      toast.warning("Speichern fehlgeschlagen.");
    }
  });

  // Einheit/Zulassungsnr. aus der Mittel-Auswahl automatisch übernehmen
  const mittelInput = container.querySelector<HTMLInputElement>(
    '[name="mittel"]'
  );
  mittelInput?.addEventListener("change", () => {
    const m = mittelIndex.get(mittelInput.value);
    if (!m) return;
    const eInp = container.querySelector<HTMLInputElement>('[name="einheit"]');
    const kInp = container.querySelector<HTMLInputElement>('[name="kennr"]');
    if (eInp && m.einheit) eInp.value = m.einheit;
    if (kInp && m.kennr) kInp.value = m.kennr;
  });

  // Aktualisieren, sobald der Lager-Bereich aktiv wird
  services.state.subscribe((s: any) => {
    if (s?.app?.activeSection === "lager") void refresh();
  });
  void refresh();
}
