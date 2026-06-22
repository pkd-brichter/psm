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

  // Teilen-Status: bei jeder neuen Erfassung hochzählen.
  renderShareStatus();
  subscribeEvent("history:data-changed", (payload) => {
    const type = (payload as { type?: string } | undefined)?.type;
    if (type === "created" || type === "created-bulk") {
      setUnsharedCount(getUnsharedCount() + 1);
      renderShareStatus();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('[data-action="m-share"]')) {
      void handleShare();
    }
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
