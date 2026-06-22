/**
 * Schlanker Mobile-Client (Seite /psm/m/).
 *
 * Eigene, handy-zuerst gebaute Oberfläche – KEIN Desktop-Chrome (keine Sidebar,
 * kein Header, keine Einstellungen/Lager/Acker). Teilt sich aber den Kern mit
 * der Desktop-App: gleicher SQLite-Worker, IndexedDB-Persistenz, gleiche
 * Erfassungs-Maske (initCalculation) und denselben "Daten teilen"-Export.
 *
 * Fokus: unterwegs schnell erfassen + klarer Teilen-Status
 * ("X bereit zum Teilen" vs. "Alles geteilt ✓"; teilen nur wenn etwas offen ist).
 */
import { loadDefaultsConfig } from "@scripts/core/config";
import { setActiveDriver, createDatabase } from "@scripts/core/storage";
import {
  applyDatabase,
  createInitialDatabase,
  ensureInitialSeed,
  loadGpsPoints,
} from "@scripts/core/database";
import * as sqlite from "@scripts/core/storage/sqlite";
import {
  getState,
  patchState,
  updateSlice,
  subscribeState,
} from "@scripts/core/state";
import { emit, subscribe as subscribeEvent } from "@scripts/core/eventBus";
import { initToastContainer, toast } from "@scripts/core/toast";
import { initCalculation } from "@scripts/features/calculation";
import { shareMobileData, getDeviceLabel } from "@scripts/features/share";
import { getUnsharedCount, setUnsharedCount } from "@scripts/features/share/unshared";
import {
  listHistoryEntries,
  getHistoryEntryById,
} from "@scripts/core/storage/sqlite";
import { printEntriesSafe } from "@scripts/features/shared/printing";
import { renderCalculationSnapshot } from "@scripts/features/shared/calculationSnapshot";
import { escapeHtml, formatDateFromIso } from "@scripts/core/utils";

let started = false;

function renderShareStatus(): void {
  const host = document.querySelector<HTMLElement>('[data-role="m-share-status"]');
  if (!host) return;
  const n = getUnsharedCount();
  if (n > 0) {
    host.innerHTML = `
      <span class="m-pill m-pill-warn"><i class="bi bi-clock-history"></i> ${n} bereit zum Teilen</span>
      <button type="button" class="m-share-btn" data-action="m-share">
        <i class="bi bi-share"></i> Teilen
      </button>`;
  } else {
    host.innerHTML = `
      <span class="m-pill m-pill-ok"><i class="bi bi-check-circle"></i> Alles geteilt</span>
      <button type="button" class="m-share-btn" disabled>
        <i class="bi bi-share"></i> Teilen
      </button>`;
  }
}

function entryDateLabel(e: any): string {
  return (
    e?.datum ||
    formatDateFromIso(e?.dateIso) ||
    e?.date ||
    e?.savedAt?.slice(0, 10) ||
    ""
  );
}

/** Zeitpunkt der Erstellung (gespeichert am) als Datum + Uhrzeit. */
function createdAtOf(e: any): string {
  return e?.savedAt || e?.createdAt || e?.created_at || "";
}

function formatDateTime(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

let currentModal: HTMLElement | null = null;

function closeViewer(): void {
  currentModal?.remove();
  currentModal = null;
  document.body.classList.remove("m-modal-open");
}

async function openEntryViewer(id: string): Promise<void> {
  try {
    const entry = await getHistoryEntryById(id);
    if (!entry) {
      toast.error("Eintrag nicht gefunden.");
      return;
    }
    const st = getState();
    const created = createdAtOf(entry);
    const modal = document.createElement("div");
    modal.className = "m-modal";
    modal.innerHTML = `
      <div class="m-modal-backdrop" data-action="close-viewer"></div>
      <div class="m-modal-sheet" role="dialog" aria-modal="true" aria-label="Erfassung ansehen">
        <div class="m-modal-head">
          <span class="m-modal-title"><i class="bi bi-file-earmark-text"></i> Erfassung</span>
          <button type="button" class="m-modal-x" data-action="close-viewer" aria-label="Schließen"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="m-modal-body">
          ${
            created
              ? `<p class="m-modal-created"><i class="bi bi-clock"></i> Erstellt am ${escapeHtml(
                  formatDateTime(created)
                )} Uhr</p>`
              : ""
          }
          <div class="m-paper">${renderCalculationSnapshot(entry, st.fieldLabels, { showActions: false })}</div>
        </div>
        <div class="m-modal-foot">
          <button type="button" class="m-share-btn" data-action="viewer-pdf">
            <i class="bi bi-share"></i> Als PDF teilen / exportieren
          </button>
        </div>
      </div>`;
    modal.addEventListener("click", (ev) => {
      const t = ev.target as HTMLElement | null;
      if (t?.closest('[data-action="close-viewer"]')) {
        closeViewer();
      } else if (t?.closest('[data-action="viewer-pdf"]')) {
        void printEntry(id);
      }
    });
    document.body.appendChild(modal);
    document.body.classList.add("m-modal-open");
    currentModal = modal;
  } catch (err) {
    console.error("[Mobil] Viewer fehlgeschlagen", err);
    toast.error("Eintrag konnte nicht geöffnet werden.");
  }
}

async function loadRecent(): Promise<void> {
  const host = document.querySelector<HTMLElement>('[data-role="m-recent-list"]');
  if (!host) return;
  try {
    const res = await listHistoryEntries({
      page: 1,
      pageSize: 10,
      sortDirection: "desc",
    });
    const items = (res?.items || []) as any[];
    if (!items.length) {
      host.innerHTML =
        '<p class="m-recent-empty">Noch keine Erfassungen gespeichert.</p>';
      return;
    }
    host.innerHTML = items
      .map((e) => {
        const created = createdAtOf(e);
        const when = created ? formatDateTime(created) : entryDateLabel(e);
        const appDate = entryDateLabel(e);
        const subParts = [e.kultur, e.ersteller].filter(Boolean);
        if (appDate && created && appDate !== when.slice(0, appDate.length)) {
          subParts.push(`Anwendung ${appDate}`);
        }
        const title = subParts.join(" · ");
        return `
          <button type="button" class="m-recent-item" data-entry-id="${escapeHtml(
            String(e.id)
          )}">
            <div class="m-recent-info">
              <span class="m-recent-date">${escapeHtml(when)}${
                created ? " Uhr" : ""
              }</span>
              <span class="m-recent-title">${escapeHtml(title || "Erfassung")}</span>
            </div>
            <i class="bi bi-eye m-recent-chevron"></i>
          </button>`;
      })
      .join("");
  } catch (err) {
    console.warn("[Mobil] Letzte Erfassungen konnten nicht geladen werden", err);
  }
}

async function printEntry(id: string): Promise<void> {
  try {
    const entry = await getHistoryEntryById(id);
    if (!entry) {
      toast.error("Eintrag nicht gefunden.");
      return;
    }
    const st = getState();
    await printEntriesSafe([entry], st.fieldLabels, {
      title: `Berechnung – ${entryDateLabel(entry) || "PSM"}`,
      company: st.company || null,
      chunkSize: 1,
    });
  } catch (err) {
    console.error("[Mobil] PDF fehlgeschlagen", err);
    toast.error("PDF konnte nicht erstellt werden.");
  }
}

async function handleShare(): Promise<void> {
  const btn = document.querySelector<HTMLButtonElement>('[data-action="m-share"]');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> …';
  }
  try {
    await shareMobileData();
  } catch (err) {
    console.error("Teilen fehlgeschlagen", err);
  } finally {
    renderShareStatus();
  }
}

async function connectDatabase(): Promise<void> {
  if (!sqlite.isSupported()) {
    toast.error("Dieses Gerät unterstützt die lokale Datenbank nicht.");
    return;
  }
  setActiveDriver("sqlite");
  sqlite.enableIndexedDbPersistence(true);

  const existing = await sqlite.openFromIndexedDb();
  if (existing) {
    applyDatabase(existing.data);
  } else {
    const created = await createDatabase(createInitialDatabase());
    applyDatabase(created.data);
  }

  // Auf "calc" stellen, damit die Erfassungs-Maske als aktiv gilt.
  updateSlice("app", (app) => ({ ...app, activeSection: "calc" as const }));

  // WICHTIG: Seed VOR dem Event – sonst lädt die Maske die Kultur-Liste, bevor
  // die Pestalozzi-Stammdaten da sind (leeres Dropdown beim allerersten Start).
  try {
    await ensureInitialSeed();
    await loadGpsPoints();
  } catch (err) {
    console.warn("[Mobil] Seed/GPS konnte nicht geladen werden", err);
  }

  emit("database:connected", { driver: "sqlite" });
}

async function start(): Promise<void> {
  if (started) return;
  started = true;

  document.body.classList.add("mobile-mode", "m-page", "bg-app");
  initToastContainer();
  await loadDefaultsConfig();

  const services = {
    state: { getState, updateSlice, subscribe: subscribeState },
    events: {
      emit: (name: string, payload?: unknown) =>
        emit(name as any, payload as any),
      subscribe: subscribeEvent,
    },
  };

  // Geräte-Label-Feld vorbelegen.
  const labelInput =
    document.querySelector<HTMLInputElement>('[data-role="m-device-label"]');
  if (labelInput) {
    labelInput.value = getDeviceLabel();
    labelInput.addEventListener("change", () => {
      const v = labelInput.value.trim();
      try {
        if (v) localStorage.setItem("psm-device-label", v);
      } catch {
        /* ignore */
      }
    });
  }

  // Erfassungs-Maske mounten (subscribt u.a. auf database:connected).
  const calcContainer = document.querySelector('[data-feature="calculation"]');
  initCalculation(calcContainer, services);

  // Datenbank verbinden (löst Reload der Lookups in der Maske aus).
  await connectDatabase();

  // Teilen-Status + Liste der letzten Erfassungen.
  renderShareStatus();
  void loadRecent();
  subscribeEvent("history:data-changed", (payload) => {
    const type = (payload as { type?: string } | undefined)?.type;
    if (type === "created" || type === "created-bulk") {
      setUnsharedCount(getUnsharedCount() + 1);
      renderShareStatus();
    }
    void loadRecent();
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('[data-action="m-share"]')) {
      void handleShare();
      return;
    }
    const row = target?.closest<HTMLElement>(".m-recent-item[data-entry-id]");
    if (row) {
      void openEntryViewer(row.dataset.entryId || "");
    }
  });

  // Viewer mit Escape schließen.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && currentModal) closeViewer();
  });

  patchState({ app: { ...getState().app, ready: true } });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => void start(), {
    once: true,
  });
} else {
  void start();
}
