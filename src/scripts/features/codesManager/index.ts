/**
 * EPPO/BBCH Codes-Manager: eigene Kulturen (EPPO-Codes) und Wachstumsstadien
 * (BBCH) als Schnellauswahl pflegen. Aus dem früheren Zulassungs-/BVL-Modul
 * herausgelöst – die BVL-Zulassungsdatenbank wurde komplett entfernt, dieser
 * Codes-Manager bleibt (nutzt nur die lookup- und saved-Tabellen, kein BVL).
 */
import * as storage from "@scripts/core/storage/sqlite";
import { saveDatabase } from "@scripts/core/storage";
import { getDatabaseSnapshot } from "@scripts/core/database";
import { escapeHtml, debounce } from "@scripts/core/utils";
import {
  searchEppoSuggestions,
  searchBbchSuggestions,
} from "@scripts/core/lookups";
import { emit as emitEvent } from "@scripts/core/eventBus";
import type { AppState } from "@scripts/core/state";

interface Services {
  state: {
    getState: () => AppState;
    subscribe?: (listener: (state: AppState) => void) => void;
  };
  events: {
    subscribe?: (event: string, handler: (payload?: unknown) => void) => void;
  };
}

// Saved EPPO/BBCH state for the codes manager
let savedEppoList: storage.SavedEppoRecord[] = [];
let savedBbchList: storage.SavedBbchRecord[] = [];
let initialized = false;
let container: HTMLElement | null = null;

async function loadSavedCodes(): Promise<void> {
  try {
    const [eppoResult, bbchResult] = await Promise.all([
      storage.listSavedEppo({ limit: 100 }),
      storage.listSavedBbch({ limit: 100 }),
    ]);
    savedEppoList = eppoResult.items || [];
    savedBbchList = bbchResult.items || [];

    // Emit event DIRECTLY via EventBus to notify other components (e.g., Calculation form quick select)
    // This ensures the event is always sent, even when embedded in Settings
    emitEvent("savedCodes:changed", {
      eppoCount: savedEppoList.length,
      bbchCount: savedBbchList.length,
    });
  } catch (error) {
    console.error("Failed to load saved codes:", error);
    savedEppoList = [];
    savedBbchList = [];
  }
}

function renderCodesManagerSection(): string {
  const hasEppo = savedEppoList.length > 0;
  const hasBbch = savedBbchList.length > 0;

  return `
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${savedEppoList.length} gespeichert</span>
          </div>
          <div class="card-body">
            <!-- Suchfeld für EPPO - prominent -->
            <div class="mb-3">
              <label class="form-label">
                <i class="bi bi-search me-1"></i>
                Kultur suchen und speichern
              </label>
              <input type="text" class="form-control form-control-lg" 
                     data-input="eppo-search" 
                     placeholder="z.B. Tomate, Apfel, Salat, Gurke..."
                     autocomplete="off" />
              <small class="form-text text-muted">Tippe mindestens 2 Buchstaben – Klick speichert direkt</small>
              <div data-role="eppo-search-results" class="list-group mt-2" style="max-height: 250px; overflow-y: auto;"></div>
            </div>
            
            <!-- Saved EPPO List - MOVED UP for visibility -->
            <div class="border-top pt-3 mb-3" style="border-color: var(--border-1) !important;">
              ${
                hasEppo
                  ? `
                <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
                  <i class="bi bi-bookmark-star me-1"></i>
                  Meine Kulturen
                  <span class="badge bg-success ms-2">${savedEppoList.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${renderSavedEppoList()}
                </div>
              `
                  : `
                <div class="text-center py-3 text-muted">
                  <i class="bi bi-inbox fs-3 d-block mb-2 opacity-50"></i>
                  <p class="mb-0 small">Noch keine Kulturen gespeichert</p>
                  <small>Suche oben und klicke zum Speichern</small>
                </div>
              `
              }
            </div>
            
            <!-- Manuell eingeben - Collapsed by default -->
            <div class="border-top pt-2" style="border-color: var(--border-1) !important;">
              <button class="btn btn-sm btn-link text-decoration-none p-0 text-muted" type="button" 
                      data-bs-toggle="collapse" data-bs-target="#eppo-manual-form" 
                      aria-expanded="false">
                <i class="bi bi-pencil me-1"></i>
                Manuell eingeben
                <i class="bi bi-chevron-down ms-1"></i>
              </button>
              
              <div class="collapse mt-3" id="eppo-manual-form">
                <form data-form="add-eppo" class="row g-2">
                  <div class="col-5">
                    <input type="text" class="form-control form-control-sm" data-input="eppo-code" placeholder="Code (z.B. SOLLY)" />
                  </div>
                  <div class="col-5">
                    <input type="text" class="form-control form-control-sm" data-input="eppo-name" placeholder="Name (z.B. Tomate)" />
                  </div>
                  <div class="col-2">
                    <button type="submit" class="btn btn-psm-primary btn-sm w-100">
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                  <div class="col-12">
                    <div class="form-check form-check-inline">
                      <input type="checkbox" class="form-check-input" data-input="eppo-favorite" id="eppo-favorite" />
                      <label class="form-check-label small" for="eppo-favorite">
                        <i class="bi bi-star text-warning me-1"></i>Favorit
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- BBCH Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-bar-chart-steps me-2 text-info"></i>
              Wachstumsstadien (BBCH)
            </h5>
            <span class="badge badge-psm-neutral">${savedBbchList.length} gespeichert</span>
          </div>
          <div class="card-body">
            <!-- Suchfeld für BBCH - prominent -->
            <div class="mb-3">
              <label class="form-label">
                <i class="bi bi-search me-1"></i>
                Stadium suchen und speichern
              </label>
              <input type="text" class="form-control form-control-lg" 
                     data-input="bbch-search" 
                     placeholder="z.B. Blüte, Ernte, 65, Keimung..."
                     autocomplete="off" />
              <small class="form-text text-muted">Tippe einen Begriff oder eine Nummer – Klick speichert direkt</small>
              <div data-role="bbch-search-results" class="list-group mt-2" style="max-height: 250px; overflow-y: auto;"></div>
            </div>
            
            <!-- Saved BBCH List - MOVED UP for visibility -->
            <div class="border-top pt-3 mb-3" style="border-color: var(--border-1) !important;">
              ${
                hasBbch
                  ? `
                <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
                  <i class="bi bi-bookmark-star me-1"></i>
                  Meine Stadien
                  <span class="badge bg-info ms-2">${savedBbchList.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${renderSavedBbchList()}
                </div>
              `
                  : `
                <div class="text-center py-3 text-muted">
                  <i class="bi bi-inbox fs-3 d-block mb-2 opacity-50"></i>
                  <p class="mb-0 small">Noch keine Stadien gespeichert</p>
                  <small>Suche oben und klicke zum Speichern</small>
                </div>
              `
              }
            </div>
            
            <!-- Manuell eingeben - Collapsed by default -->
            <div class="border-top pt-2" style="border-color: var(--border-1) !important;">
              <button class="btn btn-sm btn-link text-decoration-none p-0 text-muted" type="button" 
                      data-bs-toggle="collapse" data-bs-target="#bbch-manual-form" 
                      aria-expanded="false">
                <i class="bi bi-pencil me-1"></i>
                Manuell eingeben
                <i class="bi bi-chevron-down ms-1"></i>
              </button>
              
              <div class="collapse mt-3" id="bbch-manual-form">
                <form data-form="add-bbch" class="row g-2">
                  <div class="col-3">
                    <input type="text" class="form-control form-control-sm" data-input="bbch-code" placeholder="Code" />
                  </div>
                  <div class="col-7">
                    <input type="text" class="form-control form-control-sm" data-input="bbch-label" placeholder="Bezeichnung" />
                  </div>
                  <div class="col-2">
                    <button type="submit" class="btn btn-psm-primary btn-sm w-100">
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                  <div class="col-12">
                    <div class="form-check form-check-inline">
                      <input type="checkbox" class="form-check-input" data-input="bbch-favorite" id="bbch-favorite" />
                      <label class="form-check-label small" for="bbch-favorite">
                        <i class="bi bi-star text-warning me-1"></i>Favorit
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSavedEppoList(): string {
  if (!savedEppoList.length) {
    return `
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine EPPO-Codes gespeichert
      </div>
    `;
  }

  return savedEppoList
    .map(
      (item) => `
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-eppo-id="${escapeHtml(
      item.id
    )}">
      <div class="flex-grow-1">
        ${
          item.isFavorite
            ? '<i class="bi bi-star-fill text-warning me-2"></i>'
            : ""
        }
        <strong class="text-success">${escapeHtml(item.code)}</strong>
        <span class="ms-2">${escapeHtml(item.name)}</span>
        ${
          item.usageCount > 0
            ? `<span class="badge bg-secondary ms-2">${item.usageCount}x</span>`
            : ""
        }
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-eppo" data-id="${escapeHtml(
          item.id
        )}" title="Favorit umschalten">
          <i class="bi bi-star${item.isFavorite ? "-fill" : ""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-eppo" data-id="${escapeHtml(
          item.id
        )}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

function renderSavedBbchList(): string {
  if (!savedBbchList.length) {
    return `
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine BBCH-Stadien gespeichert
      </div>
    `;
  }

  return savedBbchList
    .map(
      (item) => `
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-bbch-id="${escapeHtml(
      item.id
    )}">
      <div class="flex-grow-1">
        ${
          item.isFavorite
            ? '<i class="bi bi-star-fill text-warning me-2"></i>'
            : ""
        }
        <strong class="text-info">${escapeHtml(item.code)}</strong>
        <span class="ms-2">${escapeHtml(item.label)}</span>
        ${
          item.usageCount > 0
            ? `<span class="badge bg-secondary ms-2">${item.usageCount}x</span>`
            : ""
        }
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-bbch" data-id="${escapeHtml(
          item.id
        )}" title="Favorit umschalten">
          <i class="bi bi-star${item.isFavorite ? "-fill" : ""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-bbch" data-id="${escapeHtml(
          item.id
        )}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

function updateCodesLists(section: HTMLElement): void {
  // Update EPPO section
  const eppoListEl = section.querySelector<HTMLElement>(
    '[data-role="saved-eppo-list"]'
  );
  const hasEppo = savedEppoList.length > 0;

  if (eppoListEl) {
    // Find the parent container that holds either the list or empty placeholder
    const eppoContainer = eppoListEl.closest(".border-top");
    if (eppoContainer) {
      if (hasEppo) {
        eppoContainer.innerHTML = `
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${savedEppoList.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${renderSavedEppoList()}
          </div>
        `;
      }
    }
  } else if (hasEppo) {
    // Need to replace empty placeholder with list
    const emptyPlaceholder = section.querySelector(
      ".codes-card:first-child .border-top.pt-3.mb-3"
    );
    if (emptyPlaceholder) {
      emptyPlaceholder.innerHTML = `
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${savedEppoList.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${renderSavedEppoList()}
        </div>
      `;
    }
  }

  // Update BBCH section
  const bbchListEl = section.querySelector<HTMLElement>(
    '[data-role="saved-bbch-list"]'
  );
  const hasBbch = savedBbchList.length > 0;

  if (bbchListEl) {
    // Find the parent container that holds either the list or empty placeholder
    const bbchContainer = bbchListEl.closest(".border-top");
    if (bbchContainer) {
      if (hasBbch) {
        bbchContainer.innerHTML = `
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${savedBbchList.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${renderSavedBbchList()}
          </div>
        `;
      }
    }
  } else if (hasBbch) {
    // Need to replace empty placeholder with list - find the second card (BBCH)
    const bbchCards = section.querySelectorAll(".codes-card");
    const bbchCard = bbchCards[1];
    if (bbchCard) {
      const emptyPlaceholder = bbchCard.querySelector(".border-top.pt-3.mb-3");
      if (emptyPlaceholder) {
        emptyPlaceholder.innerHTML = `
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${savedBbchList.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${renderSavedBbchList()}
          </div>
        `;
      }
    }
  }

  // Update badge counts in card headers
  const eppoCountBadge = section.querySelector(
    ".codes-card:first-child .card-header .badge"
  );
  const bbchCountBadge = section.querySelector(
    ".codes-card:last-child .card-header .badge"
  );
  if (eppoCountBadge)
    eppoCountBadge.textContent = `${savedEppoList.length} gespeichert`;
  if (bbchCountBadge)
    bbchCountBadge.textContent = `${savedBbchList.length} gespeichert`;
}

function attachCodesManagerHandlers(section: HTMLElement): void {
  // EPPO Search
  const eppoSearchInput = section.querySelector<HTMLInputElement>(
    '[data-input="eppo-search"]'
  );
  const eppoSearchResults = section.querySelector<HTMLElement>(
    '[data-role="eppo-search-results"]'
  );

  if (eppoSearchInput && eppoSearchResults) {
    const searchEppo = debounce(async () => {
      const term = eppoSearchInput.value.trim();
      if (term.length < 2) {
        eppoSearchResults.innerHTML = "";
        return;
      }

      try {
        const results = await searchEppoSuggestions(term, 10);
        if (!results.length) {
          eppoSearchResults.innerHTML = `
            <div class="list-group-item text-muted">Keine Ergebnisse für "${escapeHtml(
              term
            )}"</div>
          `;
          return;
        }

        eppoSearchResults.innerHTML = results
          .map(
            (r) => `
          <button type="button" class="list-group-item list-group-item-action" 
                  data-action="select-eppo" 
                  data-code="${escapeHtml(r.code)}" 
                  data-name="${escapeHtml(r.name)}"
                  data-language="${escapeHtml(r.language || "")}"
                  data-dtcode="${escapeHtml(r.dtcode || "")}">
            <strong class="text-success">${escapeHtml(r.code)}</strong>
            <span class="ms-2">${escapeHtml(r.name)}</span>
            ${
              r.dtcode
                ? `<small class="text-muted ms-2">(${escapeHtml(
                    r.dtcode
                  )})</small>`
                : ""
            }
          </button>
        `
          )
          .join("");
      } catch (error) {
        console.error("EPPO search failed:", error);
        eppoSearchResults.innerHTML = `
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `;
      }
    }, 300);

    eppoSearchInput.addEventListener("input", searchEppo);
  }

  // BBCH Search
  const bbchSearchInput = section.querySelector<HTMLInputElement>(
    '[data-input="bbch-search"]'
  );
  const bbchSearchResults = section.querySelector<HTMLElement>(
    '[data-role="bbch-search-results"]'
  );

  if (bbchSearchInput && bbchSearchResults) {
    const searchBbch = debounce(async () => {
      const term = bbchSearchInput.value.trim();
      if (term.length < 1) {
        bbchSearchResults.innerHTML = "";
        return;
      }

      try {
        const results = await searchBbchSuggestions(term, 10);
        if (!results.length) {
          bbchSearchResults.innerHTML = `
            <div class="list-group-item text-muted">Keine Ergebnisse für "${escapeHtml(
              term
            )}"</div>
          `;
          return;
        }

        bbchSearchResults.innerHTML = results
          .map(
            (r) => `
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${escapeHtml(r.code)}" 
                  data-label="${escapeHtml(r.label)}"
                  data-principal="${r.principalStage ?? ""}"
                  data-secondary="${r.secondaryStage ?? ""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${escapeHtml(r.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${escapeHtml(r.label)}</span>
          </button>
        `
          )
          .join("");
      } catch (error) {
        console.error("BBCH search failed:", error);
        bbchSearchResults.innerHTML = `
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `;
      }
    }, 300);

    bbchSearchInput.addEventListener("input", searchBbch);
  }

  // Event delegation for dynamic elements.
  // WICHTIG: nur EINMAL pro Section binden (render() läuft mehrfach; sonst
  // feuert z.B. "EPPO-Code löschen" mehrfach → mehrere confirm()-Dialoge und
  // doppelte deleteSaved*/saveDatabase-Aufrufe = die gemeldeten Fehler).
  if (section.dataset.codesClickBound !== "1") {
    section.dataset.codesClickBound = "1";
    section.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;
    const actionBtn = target.closest<HTMLElement>("[data-action]");
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;

    // Select EPPO from search results - DIRECTLY SAVE to SQLite
    if (action === "select-eppo") {
      const code = actionBtn.dataset.code || "";
      const name = actionBtn.dataset.name || "";
      const language = actionBtn.dataset.language || "";
      const dtcode = actionBtn.dataset.dtcode || "";

      if (!code || !name) {
        console.warn("EPPO selection missing code or name");
        return;
      }

      // Clear search UI immediately for feedback
      if (eppoSearchResults) eppoSearchResults.innerHTML = "";
      if (eppoSearchInput) eppoSearchInput.value = "";

      // Check if already saved
      const existing = savedEppoList.find(
        (e) => e.code.toUpperCase() === code.toUpperCase()
      );
      if (existing) {
        // Show a visual hint that it's already saved
        const listItem = section.querySelector<HTMLElement>(
          `[data-eppo-id="${existing.id}"]`
        );
        if (listItem) {
          listItem.classList.add("flash-highlight");
          setTimeout(() => listItem.classList.remove("flash-highlight"), 800);
        }
        return;
      }

      try {
        // Directly save to SQLite
        await storage.upsertSavedEppo({
          code,
          name,
          language: language || undefined,
          dtcode: dtcode || undefined,
          isFavorite: false,
        });
        // Persist to database file
        const snapshot = getDatabaseSnapshot();
        await saveDatabase(snapshot);
        await loadSavedCodes();
        updateCodesLists(section);
      } catch (error) {
        console.error("Failed to save EPPO from search:", error);
        alert("Speichern fehlgeschlagen");
      }
    }

    // Select BBCH from search results - DIRECTLY SAVE to SQLite
    if (action === "select-bbch") {
      const code = actionBtn.dataset.code || "";
      const label = actionBtn.dataset.label || "";
      const principalStageStr = actionBtn.dataset.principal;
      const secondaryStageStr = actionBtn.dataset.secondary;
      const principalStage = principalStageStr
        ? parseInt(principalStageStr, 10)
        : undefined;
      const secondaryStage = secondaryStageStr
        ? parseInt(secondaryStageStr, 10)
        : undefined;

      if (!code || !label) {
        console.warn("BBCH selection missing code or label");
        return;
      }

      // Clear search UI immediately for feedback
      if (bbchSearchResults) bbchSearchResults.innerHTML = "";
      if (bbchSearchInput) bbchSearchInput.value = "";

      // Check if already saved
      const existing = savedBbchList.find((b) => b.code === code);
      if (existing) {
        // Show a visual hint that it's already saved
        const listItem = section.querySelector<HTMLElement>(
          `[data-bbch-id="${existing.id}"]`
        );
        if (listItem) {
          listItem.classList.add("flash-highlight");
          setTimeout(() => listItem.classList.remove("flash-highlight"), 800);
        }
        return;
      }

      try {
        // Directly save to SQLite
        await storage.upsertSavedBbch({
          code,
          label,
          principalStage: Number.isNaN(principalStage)
            ? undefined
            : principalStage,
          secondaryStage: Number.isNaN(secondaryStage)
            ? undefined
            : secondaryStage,
          isFavorite: false,
        });
        // Persist to database file
        const snapshot = getDatabaseSnapshot();
        await saveDatabase(snapshot);
        await loadSavedCodes();
        updateCodesLists(section);
      } catch (error) {
        console.error("Failed to save BBCH from search:", error);
        alert("Speichern fehlgeschlagen");
      }
    }

    // Toggle EPPO favorite
    if (action === "toggle-favorite-eppo") {
      const id = actionBtn.dataset.id;
      if (!id) return;
      const item = savedEppoList.find((e) => e.id === id);
      if (!item) return;
      try {
        await storage.upsertSavedEppo({
          id: item.id,
          code: item.code,
          name: item.name,
          language: item.language,
          dtcode: item.dtcode,
          isFavorite: !item.isFavorite,
        });
        // Persistiere in Datenbank
        const snapshot = getDatabaseSnapshot();
        await saveDatabase(snapshot);
        await loadSavedCodes();
        updateCodesLists(section);
      } catch (error) {
        console.error("Failed to toggle EPPO favorite:", error);
      }
    }

    // Toggle BBCH favorite
    if (action === "toggle-favorite-bbch") {
      const id = actionBtn.dataset.id;
      if (!id) return;
      const item = savedBbchList.find((b) => b.id === id);
      if (!item) return;
      try {
        await storage.upsertSavedBbch({
          id: item.id,
          code: item.code,
          label: item.label,
          principalStage: item.principalStage,
          secondaryStage: item.secondaryStage,
          isFavorite: !item.isFavorite,
        });
        // Persistiere in Datenbank
        const snapshot = getDatabaseSnapshot();
        await saveDatabase(snapshot);
        await loadSavedCodes();
        updateCodesLists(section);
      } catch (error) {
        console.error("Failed to toggle BBCH favorite:", error);
      }
    }

    // Delete EPPO
    if (action === "delete-eppo") {
      const id = actionBtn.dataset.id;
      if (!id) return;
      if (!confirm("EPPO-Code wirklich löschen?")) return;
      try {
        await storage.deleteSavedEppo({ id });
        // Persistiere in Datenbank
        const snapshot = getDatabaseSnapshot();
        await saveDatabase(snapshot);
        await loadSavedCodes();
        updateCodesLists(section);
      } catch (error) {
        console.error("Failed to delete EPPO:", error);
      }
    }

    // Delete BBCH
    if (action === "delete-bbch") {
      const id = actionBtn.dataset.id;
      if (!id) return;
      if (!confirm("BBCH-Stadium wirklich löschen?")) return;
      try {
        await storage.deleteSavedBbch({ id });
        // Persistiere in Datenbank
        const snapshot = getDatabaseSnapshot();
        await saveDatabase(snapshot);
        await loadSavedCodes();
        updateCodesLists(section);
      } catch (error) {
        console.error("Failed to delete BBCH:", error);
      }
    }
    });
  }

  // Form submissions
  const eppoForm = section.querySelector<HTMLFormElement>(
    '[data-form="add-eppo"]'
  );
  if (eppoForm) {
    eppoForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const codeInput = section.querySelector<HTMLInputElement>(
        '[data-input="eppo-code"]'
      );
      const nameInput = section.querySelector<HTMLInputElement>(
        '[data-input="eppo-name"]'
      );
      const favoriteInput = section.querySelector<HTMLInputElement>(
        '[data-input="eppo-favorite"]'
      );

      const code = codeInput?.value.trim();
      const name = nameInput?.value.trim();
      if (!code || !name) {
        alert("Bitte Code und Name eingeben");
        return;
      }

      try {
        await storage.upsertSavedEppo({
          code,
          name,
          isFavorite: favoriteInput?.checked || false,
        });
        // Persistiere in Datenbank
        const snapshot = getDatabaseSnapshot();
        await saveDatabase(snapshot);
        await loadSavedCodes();
        updateCodesLists(section);
        // Clear form
        if (codeInput) codeInput.value = "";
        if (nameInput) nameInput.value = "";
        if (favoriteInput) favoriteInput.checked = false;
      } catch (error) {
        console.error("Failed to save EPPO:", error);
        alert("Speichern fehlgeschlagen");
      }
    });
  }

  const bbchForm = section.querySelector<HTMLFormElement>(
    '[data-form="add-bbch"]'
  );
  if (bbchForm) {
    bbchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const codeInput = section.querySelector<HTMLInputElement>(
        '[data-input="bbch-code"]'
      );
      const labelInput = section.querySelector<HTMLInputElement>(
        '[data-input="bbch-label"]'
      );
      const favoriteInput = section.querySelector<HTMLInputElement>(
        '[data-input="bbch-favorite"]'
      );

      const code = codeInput?.value.trim();
      const label = labelInput?.value.trim();
      if (!code || !label) {
        alert("Bitte Code und Bezeichnung eingeben");
        return;
      }

      try {
        await storage.upsertSavedBbch({
          code,
          label,
          isFavorite: favoriteInput?.checked || false,
        });
        // Persistiere in Datenbank
        const snapshot = getDatabaseSnapshot();
        await saveDatabase(snapshot);
        await loadSavedCodes();
        updateCodesLists(section);
        // Clear form
        if (codeInput) codeInput.value = "";
        if (labelInput) labelInput.value = "";
        if (favoriteInput) favoriteInput.checked = false;
      } catch (error) {
        console.error("Failed to save BBCH:", error);
        alert("Speichern fehlgeschlagen");
      }
    });
  }
}

export interface InitCodesManagerOptions {
  embedded?: boolean;
}

export function initCodesManager(
  target: Element | null,
  providedServices: Services,
  _options: InitCodesManagerOptions = {}
): void {
  if (!target || initialized) {
    return;
  }
  container = target as HTMLElement;
  initialized = true;
  container.innerHTML = `
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${renderCodesManagerSection()}
    </div>`;
  const section = container.querySelector<HTMLElement>(".codes-manager");
  if (!section) {
    return;
  }
  attachCodesManagerHandlers(section);

  const load = async () => {
    await loadSavedCodes();
    updateCodesLists(section);
  };
  providedServices?.events?.subscribe?.("database:connected", () => {
    void load();
  });
  if (providedServices?.state?.getState?.().app?.hasDatabase) {
    void load();
  }
}

export function resetCodesManagerInit(): void {
  initialized = false;
  container = null;
}
