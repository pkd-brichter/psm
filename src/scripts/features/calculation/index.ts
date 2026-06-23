import {
  escapeHtml,
  debounce,
  formatGpsCoordinates,
  normalizeDateInput,
  formatDateFromIso,
} from "@scripts/core/utils";
import {
  ensureSliceWindow,
  extractSliceItems,
  getState,
  type GpsPoint,
  type AppState,
} from "@scripts/core/state";
import { setFieldLabelByPath } from "@scripts/core/labels";
import { getDatabaseSnapshot } from "@scripts/core/database";
import { saveDatabase, getActiveDriverKey } from "@scripts/core/storage";
import { saveLock } from "@scripts/core/asyncLock";
import { toast } from "@scripts/core/toast";
import {
  appendHistoryEntry,
  persistSqliteDatabaseFile,
  listSavedEppo,
  listSavedBbch,
  incrementEppoUsage,
  incrementBbchUsage,
  getFrequentEppo,
  getFrequentBbch,
  listKulturen,
  listKulturMittel,
} from "@scripts/core/storage/sqlite";
import {
  buildMediumTableHead,
  buildMediumTableRows,
} from "../shared/mediumTable";
import type { CalculationSnapshotEntry } from "../shared/calculationSnapshot";
import {
  printEntriesSafe,
  buildCompanyPrintHeader,
} from "../shared/printing";
import {
  searchEppoSuggestions,
  searchBbchSuggestions,
} from "@scripts/core/lookups";
import { renderQsBadge, validateQsFields } from "@scripts/core/qsMode";
import {
  renderQsFieldsHtml,
  extractQsFieldsFromForm,
  initQsFieldsToggle,
} from "../shared/qsFields";
import { initCalculationWizard } from "./mobileWizard";

// Cached quick select data
let cachedEppoQuickSelect: Array<{
  code: string;
  name: string;
  isFavorite: boolean;
}> = [];
let cachedBbchQuickSelect: Array<{
  code: string;
  label: string;
  isFavorite: boolean;
}> = [];
let quickSelectLoaded = false;

interface Services {
  state: {
    getState: typeof getState;
    updateSlice: typeof import("@scripts/core/state").updateSlice;
    subscribe: typeof import("@scripts/core/state").subscribeState;
  };
  events: {
    emit: typeof import("@scripts/core/eventBus").emit;
    subscribe: typeof import("@scripts/core/eventBus").subscribe;
  };
}

type Labels = ReturnType<typeof getState>["fieldLabels"];

type DefaultsState = ReturnType<typeof getState>["defaults"];

export type CalculationItem = {
  id: string;
  name: string;
  unit: string;
  methodLabel: string;
  methodId: string;
  value: number;
  total: number;
  inputs: Record<string, number>;
  zulassungsnummer?: string | null;
};

export type CalculationResult = {
  header: Record<string, any>;
  items: CalculationItem[];
};

type LookupApplyEppoPayload = {
  code?: string;
  name?: string;
  language?: string;
  dtcode?: string;
};

type LookupApplyBbchPayload = {
  code?: string;
  label?: string;
};

function resolveGpsDisplay(
  source: { gps?: string; gpsCoordinates?: unknown } | null | undefined
): string {
  if (source && source.gpsCoordinates) {
    const formatted = formatGpsCoordinates(source.gpsCoordinates as any);
    if (formatted) {
      return formatted;
    }
  }
  return source?.gps?.trim() || "";
}

let initialized = false;
let calculationSaveLocked = false;
// Note: calculationSavePending replaced by saveLock.isLocked()

function escapeAttr(value: unknown): string {
  return escapeHtml(value);
}

function generateClientUuid(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `uuid_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function createSection(
  labels: Labels,
  defaultsState: DefaultsState
): HTMLElement {
  const formDefaults = defaultsState?.form || {
    creator: "",
    location: "",
    crop: "",
    usageType: "",
    areaHa: "",
    eppoCode: "",
    bbch: "",
    gps: "",
    invekos: "",
    time: "",
    date: "",
    // QS-Felder (Wartezeit/Wirkstoff sind pro Medium in Einstellungen gepflegt)
    qsMaschine: "",
    qsSchaderreger: "",
    qsVerantwortlicher: "",
    qsWetter: "",
    qsBehandlungsart: "",
  };
  const section = document.createElement("section");
  section.className = "section-inner";

  section.innerHTML = `
    <div class="card calc-form-card mb-4 no-print">
      <div class="card-body p-4">
        <form id="calculationForm" class="no-print">
          <!-- Gruppe 1: Grunddaten -->
          <fieldset class="calc-fieldset mb-4" data-wiz-group="grund">
            <legend class="calc-legend">
              <i class="bi bi-person-badge me-2"></i>Grunddaten
            </legend>
            <div class="row g-3">
              <div class="col-md-3">
                <label class="form-label calc-label" for="calc-ersteller">
                  ${escapeHtml(labels.calculation.fields.creator.label)}
                  <span class="calc-required">*</span>
                </label>
                <input type="text" class="form-control calc-input" 
                  id="calc-ersteller" name="calc-ersteller" required 
                  value="${escapeAttr(formDefaults.creator || "")}" />
              </div>
              <div class="col-md-3">
                <label class="form-label calc-label" for="calc-standort">
                  ${escapeHtml(labels.calculation.fields.location.label)}
                </label>
                <select class="form-select calc-input" id="calc-standort"
                  name="calc-standort" data-role="gps-point-select">
                  <option value="">Standort wählen ...</option>
                </select>
                <div class="form-text calc-hint" data-role="gps-selection-hint"></div>
              </div>
              <div class="col-md-3">
                <label class="form-label calc-label" for="calc-kultur">
                  ${escapeHtml(labels.calculation.fields.crop.label)}
                </label>
                <select class="form-select calc-input" id="calc-kultur"
                  name="calc-kultur" data-role="kultur-select">
                  <option value="">Kultur wählen ...</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label calc-label" for="calc-area-ha">
                  ${escapeHtml(labels.calculation.fields.quantity.label)}
                  <span class="calc-required">*</span>
                </label>
                <input type="number" min="0" step="any" class="form-control calc-input" 
                  id="calc-area-ha" name="calc-area-ha" required 
                  value="${escapeAttr(formDefaults.areaHa || "")}" />
              </div>
            </div>
          </fieldset>
          
          <!-- Gruppe 2: Mittel & Codes -->
          <fieldset class="calc-fieldset mb-4" data-wiz-group="codes">
            <legend class="calc-legend">
              <i class="bi bi-tags me-2"></i>Mittel &amp; Codes
            </legend>
            <div class="row g-3">
              <div class="col-md-3">
                <label class="form-label calc-label" for="calc-eppo">
                  ${escapeHtml(labels.calculation.fields.eppoCode.label)}
                </label>
                <input type="text" class="form-control calc-input" 
                  id="calc-eppo" name="calc-eppo" list="calc-eppo-options" autocomplete="off" 
                  value="${escapeAttr(formDefaults.eppoCode || "")}" />
                <datalist id="calc-eppo-options"></datalist>
                <div class="code-dropdown" data-dropdown="eppo" style="display:none;"></div>
              </div>
              <div class="col-md-3">
                <label class="form-label calc-label" for="calc-bbch">
                  ${escapeHtml(labels.calculation.fields.bbch.label)}
                </label>
                <input type="text" class="form-control calc-input" 
                  id="calc-bbch" name="calc-bbch" list="calc-bbch-options" autocomplete="off" 
                  value="${escapeAttr(formDefaults.bbch || "")}" />
                <datalist id="calc-bbch-options"></datalist>
                <div class="code-dropdown" data-dropdown="bbch" style="display:none;"></div>
              </div>
              <div class="col-md-3">
                <label class="form-label calc-label" for="calc-invekos">
                  ${escapeHtml(labels.calculation.fields.invekos.label)}
                </label>
                <input type="text" class="form-control calc-input" 
                  id="calc-invekos" name="calc-invekos" 
                  value="${escapeAttr(formDefaults.invekos || "")}" />
              </div>
            </div>
          </fieldset>

          <!-- Gruppe 2b: Mittel für die gewählte Kultur (Pestalozzi/Demeter) -->
          <fieldset class="calc-fieldset mb-4" data-role="kultur-mittel-fieldset" data-wiz-group="mittel" style="display:none;">
            <legend class="calc-legend">
              <i class="bi bi-list-check me-2"></i>Mittel für die Kultur
            </legend>
            <div class="d-flex align-items-center gap-2 mb-2 flex-wrap">
              <span class="calc-hint" data-role="kultur-mittel-info"></span>
              <div class="ms-auto d-flex gap-2">
                <button type="button" class="btn btn-psm-secondary-outline btn-sm" data-action="km-select-none">Alle abwählen</button>
              </div>
            </div>
            <input type="search" class="form-control form-control-sm km-filter mb-2"
              data-role="km-filter" placeholder="Mittel suchen…" autocomplete="off" />
            <div data-role="kultur-mittel-list" class="km-list"></div>
          </fieldset>

          <!-- Gruppe 3: Verwendung, Ort & Zeit -->
          <fieldset class="calc-fieldset mb-4" data-wiz-group="anwendung">
            <legend class="calc-legend">
              <i class="bi bi-calendar-event me-2"></i>Verwendung, Ort &amp; Zeit
            </legend>
            <div class="row g-3">
              <div class="col-md-3">
                <label class="form-label calc-label" for="calc-verwendung">
                  ${escapeHtml(labels.calculation.fields.usageType.label)}
                  <span class="calc-required">*</span>
                </label>
                <input type="text" class="form-control calc-input" 
                  id="calc-verwendung" name="calc-verwendung" required 
                  value="${escapeAttr(formDefaults.usageType || "")}" />
              </div>
              <div class="col-md-3">
                <label class="form-label calc-label" for="calc-datum">
                  ${escapeHtml(labels.calculation.fields.date.label)}
                </label>
                <input type="date" class="form-control calc-input" 
                  id="calc-datum" name="calc-datum" 
                  value="${escapeAttr(formDefaults.date || "")}" />
              </div>
              <div class="col-md-3">
                <label class="form-label calc-label" for="calc-uhrzeit">
                  ${escapeHtml(labels.calculation.fields.time.label)}
                </label>
                <input type="time" class="form-control calc-input" 
                  id="calc-uhrzeit" name="calc-uhrzeit" 
                  value="${escapeAttr(formDefaults.time || "")}" />
              </div>
            </div>
          </fieldset>

          ${renderQsFieldsHtml({
            maschine: formDefaults.qsMaschine || "",
            schaderreger: formDefaults.qsSchaderreger || "",
            verantwortlicher: formDefaults.qsVerantwortlicher || "",
            wetter: formDefaults.qsWetter || "",
            behandlungsart: formDefaults.qsBehandlungsart || "",
          })}
          
          <div class="text-center mt-4" data-wiz-submit>
            <button type="submit" class="btn btn-lg btn-psm-primary px-5">
              <i class="bi bi-calculator me-2"></i>Berechnen ${renderQsBadge()}
            </button>
          </div>
        </form>
      </div>
    </div>
    <div id="calc-result" class="card calc-result-card d-none">
      <div class="card-body">
        <div class="calc-summary mb-3">
          <div class="calc-summary-columns">
            <div class="calc-summary-column calc-summary-main">
              <div class="calc-summary-row">
                <span class="calc-summary-label" data-label-id="calc-summary-creator">${escapeHtml(
                  labels.calculation.fields.creator.label
                )}</span>
                <span class="calc-summary-value" data-field="ersteller"></span>
              </div>
              <div class="calc-summary-row">
                <span class="calc-summary-label" data-label-id="calc-summary-location">${escapeHtml(
                  labels.calculation.fields.location.label
                )}</span>
                <span class="calc-summary-value" data-field="standort"></span>
              </div>
              <div class="calc-summary-row">
                <span class="calc-summary-label" data-label-id="calc-summary-crop">${escapeHtml(
                  labels.calculation.fields.crop.label
                )}</span>
                <span class="calc-summary-value" data-field="kultur"></span>
              </div>
              <div class="calc-summary-row">
                <span class="calc-summary-label" data-label-id="calc-summary-date">${escapeHtml(
                  labels.calculation.summary.dateLabel || "Datum"
                )}</span>
                <span class="calc-summary-value" data-field="datum"></span>
              </div>
            </div>
            <div class="calc-summary-column calc-summary-meta">
              <div class="calc-summary-row">
                <span class="calc-summary-label" data-label-id="calc-summary-eppo">${escapeHtml(
                  labels.calculation.fields.eppoCode.label
                )}</span>
                <span class="calc-summary-value" data-field="eppoCode"></span>
              </div>
              <div class="calc-summary-row">
                <span class="calc-summary-label" data-label-id="calc-summary-bbch">${escapeHtml(
                  labels.calculation.fields.bbch.label
                )}</span>
                <span class="calc-summary-value" data-field="bbch"></span>
              </div>
              <div class="calc-summary-row">
                <span class="calc-summary-label" data-label-id="calc-summary-invekos">${escapeHtml(
                  labels.calculation.fields.invekos.label
                )}</span>
                <span class="calc-summary-value" data-field="invekos"></span>
              </div>
              <div class="calc-summary-row">
                <span class="calc-summary-label" data-label-id="calc-summary-usage">${escapeHtml(
                  labels.calculation.fields.usageType.label
                )}</span>
                <span class="calc-summary-value" data-field="usageType"></span>
              </div>
              <div class="calc-summary-row">
                <span class="calc-summary-label" data-label-id="calc-summary-gps">${escapeHtml(
                  labels.calculation.fields.gps.label
                )}</span>
                <span class="calc-summary-value" data-field="gps"></span>
              </div>
              <div class="calc-summary-row">
                <span class="calc-summary-label" data-label-id="calc-summary-time">${escapeHtml(
                  labels.calculation.fields.time.label
                )}</span>
                <span class="calc-summary-value" data-field="uhrzeit"></span>
              </div>
            </div>
            <div class="calc-summary-column calc-summary-company">
              <div class="calc-summary-row d-none" data-company-row="headline">
                <span class="calc-summary-label">Claim</span>
                <span class="calc-summary-value" data-field="company-headline"></span>
              </div>
              <div class="calc-summary-row d-none" data-company-row="address">
                <span class="calc-summary-label">Anschrift</span>
                <span class="calc-summary-value calc-summary-value--multiline" data-field="company-address"></span>
              </div>
              <div class="calc-summary-row d-none" data-company-row="email">
                <span class="calc-summary-label">E-Mail</span>
                <a class="calc-summary-value" data-field="company-email"></a>
              </div>
            </div>
          </div>
        </div>
        <div class="calc-table-wrapper">
          <table class="table table-dark table-striped align-middle calc-medium-table" id="calc-results-table">
            <thead></thead>
            <tbody></tbody>
          </table>
        </div>
        <div class="mt-3 no-print">
          <button class="btn btn-outline-secondary" data-action="print">Drucken / PDF</button>
          <button class="btn btn-primary ms-2" data-action="save">Aktuelle Berechnung speichern</button>
        </div>
      </div>
    </div>
  `;
  return section;
}

type LookupOptionItem = {
  value: string;
  label: string;
  hint?: string;
};

interface LookupAutocompleteConfig<T> {
  minChars?: number;
  emptyLabel?: string;
  search: (term: string) => Promise<T[]>;
  format: (item: T, term: string) => LookupOptionItem | null;
}

function attachLookupAutocomplete<T>(
  input: HTMLInputElement,
  datalist: HTMLDataListElement,
  config: LookupAutocompleteConfig<T>
): void {
  let requestId = 0;
  const minChars = config.minChars ?? 1;

  const renderOptions = (options: LookupOptionItem[]): void => {
    if (!options.length) {
      datalist.innerHTML = "";
      return;
    }
    datalist.innerHTML = options
      .map((option) => {
        const value = escapeHtml(option.value);
        const label = escapeHtml(option.label);
        const hint = option.hint ? escapeHtml(option.hint) : "";
        return `<option value="${value}" label="${label}">${hint}</option>`;
      })
      .join("");
  };

  const renderEmptyHint = (text?: string): void => {
    datalist.innerHTML = text
      ? `<option value="" disabled>${escapeHtml(text)}</option>`
      : "";
  };

  const updateOptions = async () => {
    const term = input.value.trim();
    if (term.length < minChars) {
      datalist.innerHTML = "";
      return;
    }
    const currentId = ++requestId;
    renderEmptyHint("Lade Vorschläge ...");
    try {
      const results = await config.search(term);
      if (currentId !== requestId) {
        return;
      }
      const formatted = (results || [])
        .map((item) => config.format(item, term))
        .filter((item): item is LookupOptionItem => Boolean(item));
      if (!formatted.length) {
        renderEmptyHint(config.emptyLabel || "Keine Treffer");
        return;
      }
      renderOptions(formatted);
    } catch (error) {
      console.error("Lookup-Autocomplete fehlgeschlagen", error);
      if (currentId === requestId) {
        renderEmptyHint("Fehler bei der Suche");
      }
    }
  };

  const debouncedUpdate = debounce(() => {
    void updateOptions();
  }, 250);

  input.addEventListener("input", () => {
    debouncedUpdate();
  });
  input.addEventListener("focus", () => {
    void updateOptions();
  });
}

function setupLookupAutocompletes(section: HTMLElement): void {
  const eppoInput = section.querySelector<HTMLInputElement>("#calc-eppo");
  const eppoDatalist =
    section.querySelector<HTMLDataListElement>("#calc-eppo-options");
  if (eppoInput && eppoDatalist) {
    attachLookupAutocomplete(eppoInput, eppoDatalist, {
      minChars: 2,
      emptyLabel: "Keine EPPO-Treffer",
      search: (term) => searchEppoSuggestions(term, 15),
      format: (item) => {
        if (!item.code) {
          return null;
        }
        const summary = item.dtcode ? `DT-Code ${item.dtcode}` : item.name;
        return {
          value: item.code,
          label: `${item.code} · ${item.name}`.trim(),
          hint: summary,
        };
      },
    });
  }

  const bbchInput = section.querySelector<HTMLInputElement>("#calc-bbch");
  const bbchDatalist =
    section.querySelector<HTMLDataListElement>("#calc-bbch-options");
  if (bbchInput && bbchDatalist) {
    attachLookupAutocomplete(bbchInput, bbchDatalist, {
      minChars: 1,
      emptyLabel: "Keine BBCH-Treffer",
      search: (term) => searchBbchSuggestions(term, 15),
      format: (item) => {
        if (!item.code) {
          return null;
        }
        const stageParts: string[] = [];
        if (item.principalStage != null) {
          let stageLabel = `${item.principalStage}`;
          if (item.secondaryStage != null) {
            stageLabel += `.${item.secondaryStage}`;
          }
          stageParts.push(`Stadium ${stageLabel}`);
        }
        return {
          value: item.code,
          label: `${item.code} · ${item.label}`.trim(),
          hint: stageParts.join(" ") || item.label,
        };
      },
    });
  }
}

// ============================================
// EPPO/BBCH Quick Select Functions
// ============================================

// Performance: Add loading flag to prevent duplicate concurrent requests
let quickSelectLoading = false;

async function loadQuickSelectData(forceReload = false): Promise<void> {
  // Performance: Prevent concurrent loading
  if (quickSelectLoading) return;
  if (quickSelectLoaded && !forceReload) return;

  quickSelectLoading = true;

  try {
    const [savedEppo, savedBbch, frequentEppo, frequentBbch] =
      await Promise.all([
        listSavedEppo({ favoritesOnly: false, limit: 20 }).catch((err) => {
          console.warn("listSavedEppo failed:", err);
          return { items: [] };
        }),
        listSavedBbch({ favoritesOnly: false, limit: 20 }).catch((err) => {
          console.warn("listSavedBbch failed:", err);
          return { items: [] };
        }),
        getFrequentEppo({ limit: 5 }).catch(() => ({ items: [] })),
        getFrequentBbch({ limit: 5 }).catch(() => ({ items: [] })),
      ]);

    // Combine saved (favorites first) with frequent
    const eppoMap = new Map<
      string,
      { code: string; name: string; isFavorite: boolean }
    >();

    // Add favorites first
    for (const item of savedEppo.items.filter((i) => i.isFavorite)) {
      eppoMap.set(item.code, {
        code: item.code,
        name: item.name,
        isFavorite: true,
      });
    }
    // Add frequent
    for (const item of frequentEppo.items) {
      if (!eppoMap.has(item.code)) {
        eppoMap.set(item.code, {
          code: item.code,
          name: item.name,
          isFavorite: item.isFavorite,
        });
      }
    }
    // Add remaining saved
    for (const item of savedEppo.items.filter((i) => !i.isFavorite)) {
      if (!eppoMap.has(item.code)) {
        eppoMap.set(item.code, {
          code: item.code,
          name: item.name,
          isFavorite: false,
        });
      }
    }
    cachedEppoQuickSelect = Array.from(eppoMap.values()).slice(0, 10);

    // Same for BBCH
    const bbchMap = new Map<
      string,
      { code: string; label: string; isFavorite: boolean }
    >();
    for (const item of savedBbch.items.filter((i) => i.isFavorite)) {
      bbchMap.set(item.code, {
        code: item.code,
        label: item.label,
        isFavorite: true,
      });
    }
    for (const item of frequentBbch.items) {
      if (!bbchMap.has(item.code)) {
        bbchMap.set(item.code, {
          code: item.code,
          label: item.label,
          isFavorite: item.isFavorite,
        });
      }
    }
    for (const item of savedBbch.items.filter((i) => !i.isFavorite)) {
      if (!bbchMap.has(item.code)) {
        bbchMap.set(item.code, {
          code: item.code,
          label: item.label,
          isFavorite: false,
        });
      }
    }
    cachedBbchQuickSelect = Array.from(bbchMap.values()).slice(0, 10);

    quickSelectLoaded = true;
  } catch (error) {
    console.warn("Failed to load quick select data:", error);
  } finally {
    // Performance: Always reset loading flag
    quickSelectLoading = false;
  }
}

// ============================================
// Clean Dropdown System for EPPO/BBCH
// Shows dropdown on focus, hides on blur/selection
// ============================================

function renderDropdownContent(type: "eppo" | "bbch"): string {
  const items = type === "eppo" ? cachedEppoQuickSelect : cachedBbchQuickSelect;

  if (!items.length) {
    return `
      <div class="dropdown-empty">
        <small class="text-muted">
          <i class="bi bi-info-circle me-1"></i>
          ${
            type === "eppo"
              ? "Keine gespeicherten EPPO-Codes"
              : "Keine gespeicherten BBCH-Stadien"
          }
        </small>
        <div class="mt-1">
          <small class="text-muted">Tippen Sie zum Suchen oder speichern Sie Codes unter "Zulassung & Codes"</small>
        </div>
      </div>
    `;
  }

  const listItems = items
    .map((item, index) => {
      const code = item.code;
      const label = type === "eppo" ? (item as any).name : (item as any).label;
      const isFav = item.isFavorite;

      return `
      <button type="button" class="dropdown-item" data-code="${escapeHtml(
        code
      )}" data-index="${index}">
        ${
          isFav
            ? '<i class="bi bi-star-fill text-warning me-2"></i>'
            : '<i class="bi bi-clock-history text-muted me-2"></i>'
        }
        <strong>${escapeHtml(code)}</strong>
        <span class="text-muted ms-2">${escapeHtml(label)}</span>
      </button>
    `;
    })
    .join("");

  return `
    <div class="dropdown-header">
      <small><i class="bi bi-bookmark-star me-1"></i>Gespeicherte ${
        type === "eppo" ? "Codes" : "Stadien"
      }</small>
    </div>
    ${listItems}
  `;
}

function setupCodeDropdowns(section: HTMLElement): void {
  const eppoInput = section.querySelector<HTMLInputElement>("#calc-eppo");
  const bbchInput = section.querySelector<HTMLInputElement>("#calc-bbch");
  const eppoDropdown = section.querySelector<HTMLElement>(
    '[data-dropdown="eppo"]'
  );
  const bbchDropdown = section.querySelector<HTMLElement>(
    '[data-dropdown="bbch"]'
  );

  let activeDropdown: HTMLElement | null = null;

  const showDropdown = (dropdown: HTMLElement, type: "eppo" | "bbch") => {
    if (!dropdown) return;
    dropdown.innerHTML = renderDropdownContent(type);
    dropdown.style.display = "block";
    activeDropdown = dropdown;
  };

  const hideDropdown = (dropdown: HTMLElement | null) => {
    if (dropdown) {
      dropdown.style.display = "none";
    }
    if (activeDropdown === dropdown) {
      activeDropdown = null;
    }
  };

  const hideAllDropdowns = () => {
    hideDropdown(eppoDropdown);
    hideDropdown(bbchDropdown);
  };

  // EPPO Input handlers
  if (eppoInput && eppoDropdown) {
    eppoInput.addEventListener("focus", () => {
      if (!eppoInput.value.trim()) {
        showDropdown(eppoDropdown, "eppo");
      }
    });

    eppoInput.addEventListener("input", () => {
      // Hide dropdown when user starts typing (autocomplete takes over)
      if (eppoInput.value.trim().length > 0) {
        hideDropdown(eppoDropdown);
      } else {
        showDropdown(eppoDropdown, "eppo");
      }
    });

    eppoDropdown.addEventListener("mousedown", (e) => {
      // Prevent blur from firing before click
      e.preventDefault();
    });

    eppoDropdown.addEventListener("click", (e) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>(
        ".dropdown-item"
      );
      if (item && item.dataset.code) {
        eppoInput.value = item.dataset.code;
        eppoInput.dispatchEvent(new Event("change", { bubbles: true }));
        hideDropdown(eppoDropdown);
        eppoInput.blur();
      }
    });
  }

  // BBCH Input handlers
  if (bbchInput && bbchDropdown) {
    bbchInput.addEventListener("focus", () => {
      if (!bbchInput.value.trim()) {
        showDropdown(bbchDropdown, "bbch");
      }
    });

    bbchInput.addEventListener("input", () => {
      if (bbchInput.value.trim().length > 0) {
        hideDropdown(bbchDropdown);
      } else {
        showDropdown(bbchDropdown, "bbch");
      }
    });

    bbchDropdown.addEventListener("mousedown", (e) => {
      e.preventDefault();
    });

    bbchDropdown.addEventListener("click", (e) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>(
        ".dropdown-item"
      );
      if (item && item.dataset.code) {
        bbchInput.value = item.dataset.code;
        bbchInput.dispatchEvent(new Event("change", { bubbles: true }));
        hideDropdown(bbchDropdown);
        bbchInput.blur();
      }
    });
  }

  // Hide dropdowns on blur (with small delay to allow click)
  const handleBlur = (dropdown: HTMLElement | null) => {
    setTimeout(() => {
      if (
        document.activeElement !== eppoInput &&
        document.activeElement !== bbchInput
      ) {
        hideDropdown(dropdown);
      }
    }, 150);
  };

  eppoInput?.addEventListener("blur", () => handleBlur(eppoDropdown));
  bbchInput?.addEventListener("blur", () => handleBlur(bbchDropdown));

  // Close on outside click
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (
      !target.closest("#calc-eppo") &&
      !target.closest('[data-dropdown="eppo"]')
    ) {
      hideDropdown(eppoDropdown);
    }
    if (
      !target.closest("#calc-bbch") &&
      !target.closest('[data-dropdown="bbch"]')
    ) {
      hideDropdown(bbchDropdown);
    }
  });

  // Load data
  void loadQuickSelectData().then(() => {
    // Data ready for dropdowns
  });
}

// ============================================

function applyFieldLabels(section: HTMLElement, labels: Labels): void {
  const labelMap: Record<string, string> = {
    "calc-form-creator": labels.calculation.fields.creator.label,
    "calc-form-location": labels.calculation.fields.location.label,
    "calc-form-crop": labels.calculation.fields.crop.label,
    "calc-form-usage": labels.calculation.fields.usageType.label,
    "calc-form-area": labels.calculation.fields.quantity.label,
    "calc-form-date": labels.calculation.fields.date?.label || "Datum",
    "calc-form-eppo": labels.calculation.fields.eppoCode.label,
    "calc-form-bbch": labels.calculation.fields.bbch.label,
    "calc-form-invekos": labels.calculation.fields.invekos.label,
    "calc-form-gps": labels.calculation.fields.gps.label,
    "calc-form-time": labels.calculation.fields.time.label,
    "calc-summary-creator": labels.calculation.fields.creator.label,
    "calc-summary-location": labels.calculation.fields.location.label,
    "calc-summary-crop": labels.calculation.fields.crop.label,
    "calc-summary-date":
      labels.calculation.summary.dateLabel ||
      labels.calculation.fields.date?.label ||
      "Datum",
    "calc-summary-eppo": labels.calculation.fields.eppoCode.label,
    "calc-summary-bbch": labels.calculation.fields.bbch.label,
    "calc-summary-invekos": labels.calculation.fields.invekos.label,
    "calc-summary-usage": labels.calculation.fields.usageType.label,
    "calc-summary-gps": labels.calculation.fields.gps.label,
    "calc-summary-time": labels.calculation.fields.time.label,
  };

  Object.entries(labelMap).forEach(([key, text]) => {
    const element = section.querySelector(`[data-label-id="${key}"]`);
    if (element) {
      element.textContent = typeof text === "string" ? text : "";
    }
  });

  section
    .querySelectorAll<HTMLInputElement>(".label-editor")
    .forEach((input) => {
      const path = input.dataset.labelEditor;
      if (!path) {
        return;
      }
      const value = path
        .split(".")
        .reduce<any>(
          (acc, segment) =>
            acc && acc[segment] !== undefined ? acc[segment] : null,
          labels
        );
      if (typeof value === "string") {
        input.placeholder = value;
        input.dataset.defaultLabel = value;
        if (!input.matches(":focus")) {
          input.value = value;
        }
      }
    });

  const placeholderMap: Record<string, string> = {
    "calc-form-creator": labels.calculation.fields.creator.placeholder,
    "calc-form-location": labels.calculation.fields.location.placeholder,
    "calc-form-crop": labels.calculation.fields.crop.placeholder,
    "calc-form-usage": labels.calculation.fields.usageType.placeholder,
    "calc-form-area": labels.calculation.fields.quantity.placeholder,
    "calc-form-eppo": labels.calculation.fields.eppoCode.placeholder,
    "calc-form-bbch": labels.calculation.fields.bbch.placeholder,
    "calc-form-invekos": labels.calculation.fields.invekos.placeholder,
    "calc-form-gps": labels.calculation.fields.gps.placeholder,
    "calc-form-date": labels.calculation.fields.date.placeholder,
    "calc-form-time": labels.calculation.fields.time.placeholder,
  };

  Object.entries(placeholderMap).forEach(([key, text]) => {
    const element = section.querySelector<HTMLInputElement>(
      `[data-placeholder-id="${key}"]`
    );
    if (element) {
      element.setAttribute("placeholder", typeof text === "string" ? text : "");
    }
  });

  const tableHead = section.querySelector("#calc-results-table thead");
  if (tableHead) {
    tableHead.innerHTML = buildMediumTableHead(labels, "calculation");
  }
}

async function persistHistory(services: Services): Promise<void> {
  const driverKey = getActiveDriverKey();
  if (!driverKey || driverKey === "memory") {
    return;
  }
  try {
    const snapshot = getDatabaseSnapshot();
    await saveDatabase(snapshot);
    services.events.emit("database:saved", {
      scope: "history",
      driver: driverKey,
    });
  } catch (err) {
    console.error("Automatisches Speichern der Historie fehlgeschlagen", err);
    services.events.emit("database:error", { scope: "history", error: err });
    toast.warning(
      "Berechnung gespeichert, aber die Datei konnte nicht aktualisiert werden. Bitte manuell sichern."
    );
  }
}

function getWaterVolume(areaHa: number, defaults: DefaultsState): number {
  const normalizedArea = Number(areaHa) || 0;
  const waterPerHa = Number(defaults?.waterPerHaL) || 0;
  return normalizedArea * waterPerHa;
}

function executeFormula(
  medium: any,
  method: any,
  inputs: Record<string, number>
): number {
  if (!method) {
    return 0;
  }
  const value = Number(medium.value) || 0;
  switch (method.type) {
    case "factor": {
      const baseField = method.config?.sourceField || "areaHa";
      const base = inputs[baseField] ?? 0;
      return value * base;
    }
    case "percentOf": {
      const base = inputs[method.config?.baseField || "waterVolume"] || 0;
      return (base * value) / 100;
    }
    case "fixed":
      return value;
    default:
      console.warn("Unbekannter Methodentyp", method.type);
      return value;
  }
}

function renderResults(
  section: HTMLElement,
  calculation: CalculationResult | null,
  labels: Labels
): void {
  const resultCard = section.querySelector<HTMLDivElement>("#calc-result");
  if (!resultCard) {
    return;
  }
  const resultsTable = resultCard.querySelector<HTMLTableElement>(
    "#calc-results-table"
  );
  const resultsHead = resultsTable?.querySelector("thead");
  const resultsBody = resultsTable?.querySelector("tbody");
  const stateSnapshot = getState();
  const companyData = stateSnapshot.company || {};

  if (!calculation) {
    resultCard.classList.add("d-none");
    if (resultsBody) {
      resultsBody.innerHTML = "";
    }
    return;
  }

  const { header, items } = calculation;

  const setFieldText = (key: string, value: string): void => {
    const el = resultCard.querySelector<HTMLElement>(`[data-field="${key}"]`);
    if (el) {
      el.textContent = value ?? "";
    }
  };

  setFieldText("ersteller", header.ersteller);
  setFieldText("standort", header.standort);
  setFieldText("kultur", header.kultur);
  const dateDisplay = header?.datum || formatDateFromIso(header?.dateIso) || "";
  setFieldText("datum", dateDisplay);
  setFieldText("eppoCode", header.eppoCode || "");
  setFieldText("bbch", header.bbch || "");
  setFieldText("gps", resolveGpsDisplay(header));
  setFieldText("invekos", header.invekos || "");
  setFieldText("usageType", header.usageType || "");
  setFieldText("uhrzeit", header.uhrzeit || "");

  const updateCompanyRowVisibility = (rowKey: string, visible: boolean) => {
    const row = resultCard.querySelector<HTMLElement>(
      `[data-company-row="${rowKey}"]`
    );
    if (row) {
      row.classList.toggle("d-none", !visible);
    }
  };

  const headlineValue = companyData.headline?.trim() || "";
  setFieldText("company-headline", headlineValue);
  updateCompanyRowVisibility("headline", Boolean(headlineValue));

  const addressValue = companyData.address?.trim() || "";
  const addressEl = resultCard.querySelector<HTMLElement>(
    '[data-field="company-address"]'
  );
  if (addressEl) {
    addressEl.textContent = addressValue;
  }
  updateCompanyRowVisibility("address", Boolean(addressValue));

  const emailEl = resultCard.querySelector<HTMLAnchorElement>(
    '[data-field="company-email"]'
  );
  const emailValue = companyData.contactEmail?.trim() || "";
  if (emailEl) {
    if (emailValue) {
      emailEl.textContent = emailValue;
      emailEl.setAttribute("href", `mailto:${emailValue}`);
    } else {
      emailEl.textContent = "";
      emailEl.removeAttribute("href");
    }
  }
  updateCompanyRowVisibility("email", Boolean(emailValue));

  const companyColumn = resultCard.querySelector<HTMLElement>(
    ".calc-summary-company"
  );
  if (companyColumn) {
    const hasVisibleRow = Array.from(
      companyColumn.querySelectorAll<HTMLElement>("[data-company-row]")
    ).some((row) => !row.classList.contains("d-none"));
    companyColumn.classList.toggle("d-none", !hasVisibleRow);
  }

  if (resultsHead) {
    resultsHead.innerHTML = buildMediumTableHead(labels, "calculation");
  }
  if (resultsBody) {
    resultsBody.innerHTML = buildMediumTableRows(items, "calculation");
  }

  resultCard.classList.remove("d-none");
}

export function initCalculation(
  container: Element | null,
  services: Services
): void {
  if (!container || initialized) {
    return;
  }

  const host = container as HTMLElement;
  const initialState = services.state.getState();

  host.innerHTML = "";
  const section = createSection(
    initialState.fieldLabels,
    initialState.defaults
  );
  host.appendChild(section);

  // QS-Felder Toggle initialisieren (standardmäßig ausgeblendet)
  initQsFieldsToggle();

  applyFieldLabels(section, initialState.fieldLabels);
  setupLookupAutocompletes(section);
  setupCodeDropdowns(section);

  const form = section.querySelector<HTMLFormElement>("#calculationForm");
  const resultCard = section.querySelector<HTMLDivElement>("#calc-result");
  const resultsTable = section.querySelector<HTMLTableElement>(
    "#calc-results-table"
  );
  const resultsHead = resultsTable?.querySelector("thead");
  const resultsBody = resultsTable?.querySelector("tbody");
  const saveButton = resultCard?.querySelector<HTMLButtonElement>(
    '[data-action="save"]'
  );
  const refreshSaveButtonState = (): void => {
    if (saveButton) {
      saveButton.disabled = saveLock.isLocked() || calculationSaveLocked;
    }
  };
  refreshSaveButtonState();

  // Hilfsfunktion: .has-value Klasse für ausgefüllte Felder setzen
  const updateHasValueClass = (
    field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ): void => {
    const hasValue = field.value.trim() !== "";
    field.classList.toggle("has-value", hasValue);
  };

  const setupHasValueTracking = (): void => {
    form
      ?.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >(".calc-input")
      .forEach((field) => {
        updateHasValueClass(field);
        field.addEventListener("input", () => updateHasValueClass(field));
        field.addEventListener("change", () => updateHasValueClass(field));
      });
  };

  const resetCalculationForm = (): void => {
    if (form) {
      form.reset();
      form
        .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
          "input:not([type='checkbox']):not([type='button']):not([type='submit']), textarea"
        )
        .forEach((field) => {
          field.value = "";
          updateHasValueClass(field);
        });
      form
        .querySelectorAll<HTMLInputElement>("input[type='checkbox']")
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
      form
        .querySelectorAll<HTMLSelectElement>("select.calc-input")
        .forEach((select) => {
          updateHasValueClass(select);
        });
    }
    clearGpsSelection(services.state.getState());
    services.state.updateSlice("calcContext", () => null);
    calculationSaveLocked = false;
    refreshSaveButtonState();
  };
  const eppoInput = section.querySelector<HTMLInputElement>("#calc-eppo");
  const bbchInput = section.querySelector<HTMLInputElement>("#calc-bbch");
  const cropInput = section.querySelector<HTMLInputElement>("#calc-kultur");
  // Standort-Auswahl (Dropdown) – ersetzt das frühere separate GPS-Feld.
  const gpsSelect = section.querySelector<HTMLSelectElement>(
    '[data-role="gps-point-select"]'
  );
  const gpsHint = section.querySelector<HTMLElement>(
    '[data-role="gps-selection-hint"]'
  );
  const areaInput = section.querySelector<HTMLInputElement>("#calc-area-ha");

  if (!form || !resultCard || !resultsTable || !resultsHead || !resultsBody) {
    console.warn("Berechnungsbereich konnte nicht initialisiert werden");
    return;
  }

  let selectedGpsPointId: string | null = null;
  // Kultur → Mittel (Pestalozzi/Demeter)
  let kulturenList: Array<{
    kultur: string;
    anbau: string | null;
    anzahl: number;
    eppoCode?: string | null;
    bbchDefault?: string | null;
  }> = [];
  let currentKultur: { kultur: string; anbau: string | null } | null = null;
  let kulturMittelEntries: any[] = [];
  const checkedKmIds = new Set<string>();
  // pro Mittel anpassbare Aufwandmenge (Default = Maximum aus der Liste)
  const kmAmounts = new Map<string, number>();

  const getGpsPointById = (
    state: AppState,
    id: string | null
  ): GpsPoint | null => {
    if (!id) {
      return null;
    }
    return (
      extractSliceItems<GpsPoint>(state.gps.points).find(
        (point) => point.id === id
      ) ?? null
    );
  };

  const updateGpsHint = (state: AppState): void => {
    if (!gpsHint) {
      return;
    }
    const activePoint = getGpsPointById(state, selectedGpsPointId);
    if (activePoint) {
      const parts: string[] = [];
      if (activePoint.kind === "gewaechshaus") {
        parts.push("🏠 Gewächshaus");
      } else if (activePoint.kind === "freiland") {
        parts.push("🌱 Freiland");
      }
      if (activePoint.nutzflaecheQm != null) {
        parts.push(`${activePoint.nutzflaecheQm} m²`);
      }
      const coords = formatGpsCoordinates(activePoint, "");
      if (coords) {
        parts.push(`📍 ${coords}`);
      }
      gpsHint.textContent = parts.join("  ·  ");
    } else {
      gpsHint.textContent =
        "Standort aus der Liste wählen – GPS wird automatisch übernommen.";
    }
  };

  const clearGpsSelection = (state: AppState): void => {
    selectedGpsPointId = null;
    if (gpsSelect) {
      gpsSelect.value = "";
    }
    updateGpsHint(state);
  };

  const setGpsSelection = (state: AppState, point: GpsPoint | null): void => {
    selectedGpsPointId = point?.id ?? null;
    if (gpsSelect) {
      gpsSelect.value = selectedGpsPointId || "";
    }
    updateGpsHint(state);
  };

  const updateGpsSelectOptions = (state: AppState): void => {
    if (!gpsSelect) {
      updateGpsHint(state);
      return;
    }
    const preservedId = selectedGpsPointId;
    gpsSelect.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Standort wählen ...";
    gpsSelect.appendChild(placeholder);
    extractSliceItems<GpsPoint>(state.gps.points).forEach((point) => {
      const option = document.createElement("option");
      option.value = point.id;
      const baseName = point.name?.trim() || "Ohne Namen";
      const areaLabel =
        point.nutzflaecheQm != null ? ` · ${point.nutzflaecheQm} m²` : "";
      const suffix = point.id === state.gps.activePointId ? " (aktiv)" : "";
      option.textContent = `${baseName}${suffix}${areaLabel}`;
      gpsSelect.appendChild(option);
    });
    if (
      preservedId &&
      extractSliceItems<GpsPoint>(state.gps.points).some(
        (point) => point.id === preservedId
      )
    ) {
      gpsSelect.value = preservedId;
      updateGpsHint(state);
    } else {
      clearGpsSelection(state);
    }
  };

  const setCalcContext = (calculation: CalculationResult | null) => {
    if (calculation) {
      calculationSaveLocked = false;
      refreshSaveButtonState();
    }
    renderResults(section, calculation, services.state.getState().fieldLabels);
  };

  services.state.subscribe((nextState) => {
    applyFieldLabels(section, nextState.fieldLabels);
    setCalcContext(nextState.calcContext as CalculationResult | null);
    updateGpsSelectOptions(nextState);
  });

  updateGpsSelectOptions(initialState);
  setupHasValueTracking();

  gpsSelect?.addEventListener("change", () => {
    const currentState = services.state.getState();
    const choice = gpsSelect.value || null;
    const point = getGpsPointById(currentState, choice);
    if (point) {
      setGpsSelection(currentState, point);
      // Nutzfläche des Gewächshauses automatisch als Fläche (ha) übernehmen
      if (
        areaInput &&
        point.nutzflaecheQm != null &&
        Number.isFinite(point.nutzflaecheQm)
      ) {
        const ha = point.nutzflaecheQm / 10000;
        areaInput.value = String(Number(ha.toFixed(4)));
        areaInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } else {
      clearGpsSelection(currentState);
    }
  });

  // ---- Kultur → Mittel (Pestalozzi/Demeter) ----
  const kulturSelect = section.querySelector<HTMLSelectElement>(
    '[data-role="kultur-select"]'
  );
  const kmFieldset = section.querySelector<HTMLElement>(
    '[data-role="kultur-mittel-fieldset"]'
  );
  const kmList = section.querySelector<HTMLElement>(
    '[data-role="kultur-mittel-list"]'
  );
  const kmInfo = section.querySelector<HTMLElement>(
    '[data-role="kultur-mittel-info"]'
  );
  const kmSelectNoneBtn = section.querySelector<HTMLButtonElement>(
    '[data-action="km-select-none"]'
  );
  const kmFilter = section.querySelector<HTMLInputElement>(
    '[data-role="km-filter"]'
  );
  let kmFilterTerm = "";
  const applyKmFilter = (): void => {
    if (!kmList) return;
    kmList.querySelectorAll<HTMLElement>(".km-row").forEach((row) => {
      const name = row.dataset.kmName || "";
      row.style.display = !kmFilterTerm || name.includes(kmFilterTerm) ? "" : "none";
    });
  };
  kmFilter?.addEventListener("input", () => {
    kmFilterTerm = kmFilter.value.trim().toLowerCase();
    applyKmFilter();
  });

  const updateKmInfo = (): void => {
    if (!kmInfo) return;
    const total = kulturMittelEntries.length;
    const checked = kulturMittelEntries.filter((e) =>
      checkedKmIds.has(e.id)
    ).length;
    kmInfo.textContent = total
      ? `${checked} von ${total} Mitteln ausgewählt – vor der Berechnung anpassbar.`
      : "Für diese Kultur sind keine Mittel hinterlegt.";
  };

  const maxAufwand = (e: any): number => {
    const rawVal = (e.aufwandWert ?? "").toString().replace(/,/g, ".");
    const nums = (rawVal.match(/\d+(\.\d+)?/g) || []).map(Number);
    return nums.length ? Math.max(...nums) : 0;
  };

  const renderKmList = (): void => {
    if (!kmList) return;
    if (!kulturMittelEntries.length) {
      kmList.innerHTML =
        '<div class="calc-hint">Keine Mittel für diese Kultur hinterlegt.</div>';
      updateKmInfo();
      return;
    }
    kmList.innerHTML = kulturMittelEntries
      .map((e) => {
        const checked = checkedKmIds.has(e.id);
        const maxv = maxAufwand(e);
        const amount = kmAmounts.has(e.id) ? kmAmounts.get(e.id) : maxv;
        const unitLabel = `${escapeHtml(e.aufwandEinheit || "")}${
          e.aufwandBezug ? "/" + escapeHtml(e.aufwandBezug) : ""
        }`;
        const meta = [
          e.wirkstoff ? escapeHtml(e.wirkstoff) : "",
          e.wartezeit ? `WZ ${escapeHtml(e.wartezeit)}` : "",
          e.maxAnwendungen ? escapeHtml(e.maxAnwendungen) : "",
          !e.kennr ? "kein PSM" : "",
        ]
          .filter(Boolean)
          .join(" · ");
        const problem = e.problem
          ? `<span class="text-secondary"> – ${escapeHtml(e.problem)}</span>`
          : "";
        const cbId = `km-cb-${escapeAttr(e.id)}`;
        return `
          <div class="km-row py-2" data-km-name="${escapeAttr(
            (e.mittelName || "").toLowerCase()
          )}" style="border-bottom:1px solid var(--border-1);">
            <div class="d-flex align-items-start gap-2">
              <input type="checkbox" class="form-check-input mt-1" id="${cbId}" data-km-id="${escapeAttr(
                e.id
              )}" ${checked ? "checked" : ""} />
              <label for="${cbId}" style="cursor:pointer; flex:1;">
                <span class="fw-semibold">${escapeHtml(e.mittelName)}</span>${problem}
                <span class="d-block calc-hint">${meta}</span>
              </label>
            </div>
            <div class="d-flex align-items-center gap-2 mt-1" style="margin-left:1.6rem; display:${
              checked ? "flex" : "none"
            };" data-km-amount-row="${escapeAttr(e.id)}">
              <span class="calc-hint">Aufwandmenge:</span>
              <input type="number" step="any" min="0" class="form-control form-control-sm"
                style="max-width:130px;" data-km-amount="${escapeAttr(e.id)}"
                value="${amount}" />
              <span class="calc-hint">${unitLabel} · max ${maxv}</span>
            </div>
          </div>`;
      })
      .join("");
    kmList
      .querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-km-id]')
      .forEach((cb) => {
        cb.addEventListener("change", () => {
          const id = cb.getAttribute("data-km-id") || "";
          const amountRow = kmList.querySelector<HTMLElement>(
            `[data-km-amount-row="${id}"]`
          );
          if (cb.checked) {
            checkedKmIds.add(id);
            if (amountRow) amountRow.style.display = "flex";
            // BVL-zugelassenes BBCH-Stadium dieses Mittels übernehmen (anpassbar)
            const entry = kulturMittelEntries.find((x) => x.id === id);
            if (entry && entry.bbch && bbchInput) {
              bbchInput.value = entry.bbch;
              bbchInput.dispatchEvent(new Event("input", { bubbles: true }));
            }
          } else {
            checkedKmIds.delete(id);
            if (amountRow) amountRow.style.display = "none";
          }
          updateKmInfo();
        });
      });
    kmList
      .querySelectorAll<HTMLInputElement>("input[data-km-amount]")
      .forEach((inp) => {
        inp.addEventListener("input", () => {
          const id = inp.getAttribute("data-km-amount") || "";
          const v = parseFloat(inp.value.replace(",", "."));
          if (Number.isFinite(v)) kmAmounts.set(id, v);
          else kmAmounts.delete(id);
        });
      });
    updateKmInfo();
    applyKmFilter();
  };

  const loadKulturMittelFor = async (
    k: { kultur: string; anbau: string | null } | null
  ): Promise<void> => {
    checkedKmIds.clear();
    kmAmounts.clear();
    kulturMittelEntries = [];
    if (!k) {
      if (kmFieldset) kmFieldset.style.display = "none";
      return;
    }
    try {
      const res = await listKulturMittel({
        kultur: k.kultur,
        anbau: k.anbau || undefined,
      });
      kulturMittelEntries = (res?.rows || []) as any[];
    } catch (err) {
      console.warn("Kultur-Mittel konnten nicht geladen werden:", err);
      kulturMittelEntries = [];
    }
    if (kmFieldset) kmFieldset.style.display = "";
    renderKmList();
  };

  const fillKulturSelect = (): void => {
    if (!kulturSelect) return;
    const previous = kulturSelect.value;
    const opts = ['<option value="">Kultur wählen ...</option>'];
    kulturenList.forEach((k, idx) => {
      const anbau = k.anbau ? ` (${k.anbau})` : "";
      opts.push(
        `<option value="${idx}">${escapeHtml(k.kultur)}${escapeHtml(
          anbau
        )} · ${k.anzahl}</option>`
      );
    });
    kulturSelect.innerHTML = opts.join("");
    if (previous) kulturSelect.value = previous;
  };

  const refreshKulturen = async (): Promise<void> => {
    if (getActiveDriverKey() !== "sqlite") return;
    try {
      const res = await listKulturen();
      kulturenList = (res?.rows || []) as any[];
      fillKulturSelect();
    } catch (err) {
      // DB evtl. noch nicht geöffnet – wird beim nächsten Versuch nachgeladen
    }
  };

  const kmToCalcMedium = (e: any): any => {
    // Default = Maximum aus der Liste (Vorgabe Betrieb); vom Nutzer angepasste
    // Menge im Checklisten-Feld hat Vorrang.
    const override = kmAmounts.get(e.id);
    let value =
      override != null && Number.isFinite(override) ? override : maxAufwand(e);
    const einheit = e.aufwandEinheit || "";
    const bezug = e.aufwandBezug || "";
    let methodId = "perAr";
    if (einheit === "%" || bezug === "%") {
      methodId = "percentWater";
    } else if (bezug === "m²") {
      value = value * 100; // pro m² -> pro ar
    }
    return {
      id: e.id,
      name: e.mittelName,
      unit: einheit,
      value,
      methodId,
      zulassungsnummer: e.kennr || null,
      wartezeit: e.wartezeit || null,
      wirkstoff: e.wirkstoff || null,
    };
  };

  void refreshKulturen();
  kulturSelect?.addEventListener("mousedown", () => {
    if (!kulturenList.length) void refreshKulturen();
  });
  kulturSelect?.addEventListener("change", () => {
    const idxRaw = kulturSelect.value;
    if (idxRaw === "" || idxRaw == null) {
      currentKultur = null;
      void loadKulturMittelFor(null);
      return;
    }
    const k = kulturenList[Number(idxRaw)] || null;
    currentKultur = k ? { kultur: k.kultur, anbau: k.anbau } : null;
    // EPPO-Code der Kultur automatisch übernehmen (anpassbar)
    if (k && k.eppoCode && eppoInput) {
      eppoInput.value = k.eppoCode;
      eppoInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
    void loadKulturMittelFor(currentKultur);
  });
  kmSelectNoneBtn?.addEventListener("click", () => {
    checkedKmIds.clear();
    renderKmList();
  });

  services.events.subscribe<LookupApplyEppoPayload>(
    "lookup:apply-eppo",
    (payload) => {
      if (!payload || typeof payload !== "object") {
        return;
      }
      if (payload.code && eppoInput) {
        eppoInput.value = payload.code;
        eppoInput.dispatchEvent(new Event("input", { bubbles: true }));
        eppoInput.focus();
      }
      if (payload.name && cropInput && !cropInput.value.trim()) {
        cropInput.value = payload.name;
        cropInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  );

  services.events.subscribe<LookupApplyBbchPayload>(
    "lookup:apply-bbch",
    (payload) => {
      if (!payload || typeof payload !== "object") {
        return;
      }
      if (payload.code && bbchInput) {
        bbchInput.value = payload.code;
        bbchInput.dispatchEvent(new Event("input", { bubbles: true }));
        bbchInput.focus();
      }
    }
  );

  // Listen for saved codes changes (from Zulassung & Codes tab)
  services.events.subscribe("savedCodes:changed", async () => {
    quickSelectLoaded = false;
    await loadQuickSelectData(true);
    // Dropdown content will be refreshed on next focus
  });

  // Also load quick select data when database is connected
  services.events.subscribe("database:connected", async () => {
    quickSelectLoaded = false;
    await loadQuickSelectData(true);
    // Kultur-Dropdown direkt füllen (sonst erst beim Antippen) – wichtig für
    // den Mobile-Erststart, wo der Seed gerade erst eingespielt wurde.
    void refreshKulturen();
  });

  section
    .querySelectorAll<HTMLInputElement>(".label-editor")
    .forEach((input) => {
      input.addEventListener("change", (event) => {
        const target = event.currentTarget as HTMLInputElement;
        const path = target.dataset.labelEditor;
        if (!path) {
          return;
        }
        const trimmed = target.value.trim();
        const fallback =
          target.dataset.defaultLabel ||
          target.getAttribute("placeholder") ||
          target.value;
        const nextValue = trimmed || fallback || "";
        if (!trimmed) {
          target.value = nextValue;
        }
        services.state.updateSlice("fieldLabels", (currentLabels) =>
          setFieldLabelByPath(currentLabels, path, nextValue)
        );
      });
    });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const rawErsteller = (formData.get("calc-ersteller") || "")
      .toString()
      .trim();
    const rawAreaHa = (formData.get("calc-area-ha") || "").toString().trim();
    const rawEppo = (formData.get("calc-eppo") || "").toString().trim();
    const rawBbch = (formData.get("calc-bbch") || "").toString().trim();
    const rawInvekos = (formData.get("calc-invekos") || "").toString().trim();
    const rawUsage = (formData.get("calc-verwendung") || "").toString().trim();
    // GPS-Freitext entfällt – Koordinaten kommen aus dem gewählten Standort
    const rawGps = "";
    const rawTime = (formData.get("calc-uhrzeit") || "").toString().trim();
    const rawDate = (formData.get("calc-datum") || "").toString().trim();

    // QS-Felder extrahieren
    const qsFields = extractQsFieldsFromForm(form);

    const ersteller = rawErsteller;
    const kultur = currentKultur
      ? `${currentKultur.kultur}${
          currentKultur.anbau ? ` (${currentKultur.anbau})` : ""
        }`
      : "-";
    const eppoCode = rawEppo;
    const bbch = rawBbch;
    const invekos = rawInvekos;
    const usageType = rawUsage;
    const normalizedDate = normalizeDateInput(rawDate);
    const uhrzeit = rawTime
      ? rawTime
      : new Date().toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        });
    const areaHa = Number(rawAreaHa);
    if (!ersteller || Number.isNaN(areaHa)) {
      toast.warning("Bitte Felder korrekt ausfüllen!");
      return;
    }
    if (!usageType) {
      toast.warning("Bitte die Art der Verwendung angeben.");
      return;
    }

    // QS-Felder: im Demeter-Modus Pflicht (Maschine, Schaderreger, Wetter)
    const qsErrors = validateQsFields(qsFields, true);
    if (qsErrors.length) {
      toast.warning(qsErrors.join(" · "));
      return;
    }

    const state = services.state.getState();
    const defaults = state.defaults;
    const selectedGpsPoint = getGpsPointById(state, selectedGpsPointId);
    const standort = selectedGpsPoint?.name || "-";
    const gpsCoordinates = selectedGpsPoint
      ? {
          latitude: selectedGpsPoint.latitude,
          longitude: selectedGpsPoint.longitude,
        }
      : null;
    const checkedKm = kulturMittelEntries.filter((e) =>
      checkedKmIds.has(e.id)
    );
    let mediumsForCalculation: any[];
    if (checkedKm.length) {
      // angehakte Mittel der gewählten Kultur
      mediumsForCalculation = checkedKm.map(kmToCalcMedium);
    } else {
      mediumsForCalculation = extractSliceItems<any>(state.mediums).slice();
    }
    const measurementMethods = state.measurementMethods;
    const waterVolume = getWaterVolume(areaHa, defaults);
    const areaAr = areaHa * 100;
    const areaSqm = areaHa * 10000;

    const inputs = {
      areaHa,
      waterVolume,
      areaAr,
      areaSqm,
    };

    const items = mediumsForCalculation.map((medium: any) => {
      const method = measurementMethods.find(
        (m: any) => m.id === medium.methodId
      );
      const total = executeFormula(medium, method, inputs);
      return {
        id: medium.id,
        name: medium.name,
        unit: medium.unit,
        methodLabel: method ? method.label : medium.methodId,
        methodId: medium.methodId,
        value: medium.value,
        total,
        inputs,
        zulassungsnummer: medium.zulassungsnummer ?? null,
        // QS-Felder pro Medium
        wartezeit: medium.wartezeit ?? null,
        wirkstoff: medium.wirkstoff ?? null,
      };
    });

    // Company-Daten Snapshot für vollständige Dokumentation
    const companySnapshot = {
      name: state.company?.name || "",
      address: state.company?.address || "",
      headline: state.company?.headline || "",
      contactEmail: state.company?.contactEmail || "",
    };

    const header = {
      ersteller,
      standort,
      kultur,
      eppoCode,
      bbch,
      // GPS-Notiz nur speichern wenn KEIN GPS-Punkt verknüpft ist (verhindert Duplikate)
      gps: selectedGpsPoint ? "" : rawGps,
      gpsCoordinates,
      gpsPointId: selectedGpsPoint?.id ?? null,
      invekos,
      usageType,
      uhrzeit,
      areaHa,
      datum: normalizedDate.display || "",
      dateIso: normalizedDate.iso,
      waterVolume,
      areaAr,
      areaSqm,
      // QS-Felder gemäß QS-GAP-Leitfaden 3.6.2 (immer speichern wenn ausgefüllt)
      // Wartezeit/Wirkstoff werden über das Medium gepflegt (nicht pro Anwendung)
      qsMaschine: qsFields.maschine || null,
      qsSchaderreger: qsFields.schaderreger || null,
      qsVerantwortlicher: qsFields.verantwortlicher || null,
      qsWetter: qsFields.wetter || null,
      qsBehandlungsart: qsFields.behandlungsart || null,
      // Company-Snapshot für EU-konforme Dokumentation
      company: companySnapshot,
    };

    const calculation: CalculationResult = {
      header,
      items,
    };

    services.state.updateSlice("defaults", (defaultsState) => ({
      ...defaultsState,
      form: {
        ...(defaultsState.form || {
          creator: "",
          location: "",
          crop: "",
          usageType: "",
          areaHa: "",
          eppoCode: "",
          bbch: "",
          gps: "",
          invekos: "",
          time: "",
          date: "",
          qsMaschine: "",
          qsSchaderreger: "",
          qsVerantwortlicher: "",
          qsWetter: "",
          qsBehandlungsart: "",
        }),
        creator: rawErsteller,
        location: standort === "-" ? "" : standort,
        crop: currentKultur ? currentKultur.kultur : "",
        usageType: rawUsage,
        areaHa: rawAreaHa,
        eppoCode: rawEppo,
        bbch: rawBbch,
        gps: rawGps,
        invekos: rawInvekos,
        time: rawTime,
        date: rawDate,
        // QS-Felder (Wartezeit/Wirkstoff über Medium)
        qsMaschine: qsFields.maschine,
        qsSchaderreger: qsFields.schaderreger,
        qsVerantwortlicher: qsFields.verantwortlicher,
        qsWetter: qsFields.wetter,
        qsBehandlungsart: qsFields.behandlungsart,
      },
    }));

    services.state.updateSlice("calcContext", () => calculation);

    // Track EPPO/BBCH usage for frequently used suggestions
    if (rawEppo) {
      incrementEppoUsage({ code: rawEppo }).catch(() => {
        // Ignore errors - usage tracking is non-critical
      });
    }
    if (rawBbch) {
      incrementBbchUsage({ code: rawBbch }).catch(() => {
        // Ignore errors - usage tracking is non-critical
      });
    }
  });

  function mapCalculationToSnapshotEntry(
    calculation: CalculationResult
  ): CalculationSnapshotEntry {
    return {
      ...(calculation.header || {}),
      items: calculation.items || [],
    } as CalculationSnapshotEntry;
  }

  async function printCurrentCalculationSnapshot(): Promise<void> {
    const state = services.state.getState();
    const calculation = state.calcContext as CalculationResult | null;
    if (!calculation) {
      toast.warning("Keine Berechnung vorhanden.");
      return;
    }
    const entry = mapCalculationToSnapshotEntry(calculation);
    const headerHtml = buildCompanyPrintHeader(state.company || null);
    const titleDate =
      entry?.datum ||
      formatDateFromIso(entry?.dateIso) ||
      entry?.date ||
      new Date().toLocaleDateString("de-DE");
    await printEntriesSafe([entry], state.fieldLabels, {
      title: `Berechnung – ${titleDate}`,
      headerHtml,
      company: state.company || null,
      chunkSize: 1,
    });
  }

  resultCard.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const action = target?.dataset?.action;
    if (!action) {
      return;
    }
    if (action === "print") {
      void printCurrentCalculationSnapshot().catch((error) => {
        console.error("Drucken fehlgeschlagen", error);
        toast.error(
          "Druck konnte nicht gestartet werden. Bitte erneut versuchen."
        );
      });
      return;
    } else if (action === "save") {
      // Use AsyncLock to prevent race conditions
      if (saveLock.isLocked()) {
        return;
      }
      if (calculationSaveLocked) {
        toast.warning(
          "Berechnung wurde bereits gespeichert. Bitte führen Sie zuerst eine neue Berechnung aus."
        );
        return;
      }
      const calc = services.state.getState()
        .calcContext as CalculationResult | null;
      if (!calc) {
        toast.warning("Keine Berechnung vorhanden.");
        return;
      }

      // Execute save operation with lock
      void saveLock.acquire(async () => {
        refreshSaveButtonState();
        const savedAt = new Date().toISOString();
        const entryForState = {
          ...calc.header,
          items: calc.items,
          savedAt,
          // Geräteübergreifend eindeutiger Ausweis – Grundlage für sicheren
          // Duplikatschutz beim Zusammenführen (Mobil -> zentrale DB).
          clientUuid:
            (calc.header as { clientUuid?: string })?.clientUuid ||
            generateClientUuid(),
        };
        const appState = services.state.getState();
        const driverKey = getActiveDriverKey();
        const useSqlite =
          driverKey === "sqlite" && Boolean(appState.app?.hasDatabase);

        try {
          if (useSqlite) {
            const result = await appendHistoryEntry({
              header: entryForState,
              items: calc.items,
            });
            await persistSqliteDatabaseFile().catch((error) => {
              console.warn(
                "SQLite-Datei konnte nicht sofort persistiert werden",
                error
              );
            });
            services.events.emit("history:data-changed", {
              type: "created",
              id: result?.id ?? null,
            });
            services.events.emit("database:saved", {
              scope: "history",
              driver: "sqlite",
            });
          } else {
            services.state.updateSlice("history", (historySlice) => {
              const slice = ensureSliceWindow<any>(historySlice as any);
              const items = [...slice.items, entryForState];
              return {
                ...slice,
                items,
                totalCount: items.length,
                lastUpdatedAt: new Date().toISOString(),
              };
            });
            await persistHistory(services);
          }

          calculationSaveLocked = true;
          toast.success(
            "Berechnung gespeichert! (Siehe Dokumentationsbereich)"
          );
          resetCalculationForm();
        } catch (error) {
          console.error("History konnte nicht gespeichert werden", error);
          toast.error(
            "Berechnung konnte nicht gespeichert werden. Bitte erneut versuchen."
          );
        } finally {
          refreshSaveButtonState();
        }
      });
    }
  });

  setCalcContext(initialState.calcContext as CalculationResult | null);

  // Mobil: Erfassung als Schritt-für-Schritt-Wizard präsentieren (Desktop bleibt
  // die volle Maske). Rein optische Schicht über den bestehenden Feldern.
  if (document.body.classList.contains("m-page")) {
    try {
      initCalculationWizard(section);
    } catch (err) {
      console.warn("[PSM] Mobiler Wizard konnte nicht initialisiert werden", err);
    }
  }

  initialized = true;
}
