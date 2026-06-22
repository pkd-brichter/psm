/**
 * Geführte Eingabehilfe für die Berechnung
 *
 * Hilft Anwendern, die nicht viel mit Computern arbeiten,
 * Schritt für Schritt durch das Formular zu navigieren.
 *
 * Funktionen:
 * - Hebt das aktuelle Feld hervor
 * - Zeigt einen Hilfetext für jedes Feld
 * - Mit Enter zum nächsten Feld
 * - Einfache, verständliche Sprache
 */

// localStorage Key für Einstellung
const GUIDED_INPUT_KEY = "pestalozzi_guided_input_enabled";

// Die Felder in der richtigen Reihenfolge (von oben links nach unten rechts)
// Nur die wichtigsten Pflichtfelder für Einsteiger
const GUIDED_FIELDS = [
  {
    id: "calc-ersteller",
    label: "Ihr Name",
    hint: "Wer führt die Behandlung durch? Tragen Sie hier Ihren Namen ein.",
    beispiel: "z.B. Max Mustermann",
    required: true,
  },
  {
    id: "calc-standort",
    label: "Wo?",
    hint: "Welches Feld oder welcher Ort wird behandelt?",
    beispiel: "z.B. Feld 5, Gewächshaus Nord",
    required: false,
  },
  {
    id: "calc-kultur",
    label: "Welche Pflanze?",
    hint: "Welche Kultur wird behandelt?",
    beispiel: "z.B. Tomaten, Äpfel, Erdbeeren",
    required: false,
  },
  {
    id: "calc-area-ha",
    label: "Fläche in Hektar",
    hint: "Wie groß ist die zu behandelnde Fläche? Geben Sie die Zahl in Hektar ein.",
    beispiel: "z.B. 0.5 (= 5000 m²) oder 1.0 (= 10000 m²)",
    required: true,
  },
  {
    id: "calc-verwendung",
    label: "Art der Verwendung",
    hint: "Wie wird das Mittel angewendet?",
    beispiel: "Tippen Sie und wählen Sie aus der Liste",
    required: true,
  },
  {
    id: "calc-datum",
    label: "Datum",
    hint: "Wann wird behandelt? Klicken Sie um ein Datum zu wählen.",
    beispiel: "Klicken Sie auf das Kalender-Symbol",
    required: false,
  },
];

let currentFieldIndex = 0;
let isGuidedModeActive = false;
let tooltipElement: HTMLElement | null = null;
let overlayElement: HTMLElement | null = null;

/**
 * Prüft ob die geführte Eingabe aktiviert ist
 */
export function isGuidedInputEnabled(): boolean {
  try {
    const stored = localStorage.getItem(GUIDED_INPUT_KEY);
    // Standardmäßig AN für neue Benutzer
    return stored !== "false";
  } catch {
    return true;
  }
}

/**
 * Setzt den Status der geführten Eingabe
 */
export function setGuidedInputEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(GUIDED_INPUT_KEY, enabled ? "true" : "false");
  } catch {
    console.warn("[Eingabehilfe] Einstellung konnte nicht gespeichert werden");
  }
}

/**
 * Erstellt das HTML für die Eingabehilfe-Checkbox
 */
export function renderGuidedInputToggle(): string {
  const isEnabled = isGuidedInputEnabled();
  return `
    <div class="guided-input-toggle mb-3 p-2 bg-body-tertiary rounded border">
      <div class="form-check">
        <input 
          type="checkbox" 
          class="form-check-input" 
          id="guided-input-toggle" 
          ${isEnabled ? "checked" : ""}
        />
        <label class="form-check-label" for="guided-input-toggle">
          <strong>🎯 Schritt-für-Schritt Hilfe</strong>
          <small class="d-block text-muted">Zeigt Ihnen bei jedem Feld was einzutragen ist</small>
        </label>
      </div>
    </div>
  `;
}

/**
 * Erstellt das Tooltip-Element für die Hilfe
 */
function createTooltip(): HTMLElement {
  const tooltip = document.createElement("div");
  tooltip.className = "guided-tooltip";
  tooltip.innerHTML = `
    <div class="guided-tooltip-content">
      <div class="guided-tooltip-header">
        <span class="guided-tooltip-step"></span>
        <span class="guided-tooltip-title"></span>
      </div>
      <div class="guided-tooltip-hint"></div>
      <div class="guided-tooltip-example"></div>
      <div class="guided-tooltip-nav">
        <small class="text-muted">Drücken Sie <kbd>Enter ↵</kbd> für das nächste Feld</small>
      </div>
    </div>
    <div class="guided-tooltip-arrow"></div>
  `;
  document.body.appendChild(tooltip);
  return tooltip;
}

/**
 * Erstellt das Overlay für den Fokus-Effekt
 */
function createOverlay(): HTMLElement {
  const overlay = document.createElement("div");
  overlay.className = "guided-overlay";
  document.body.appendChild(overlay);
  return overlay;
}

/**
 * Positioniert das Tooltip neben dem aktuellen Feld
 */
function positionTooltip(field: HTMLElement): void {
  if (!tooltipElement) return;

  const rect = field.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();

  // Tooltip unter dem Feld positionieren (fixed position, keine Scroll-Offset)
  let top = rect.bottom + 10;
  let left = rect.left;

  // Prüfen ob Tooltip aus dem Bildschirm ragt
  if (left + tooltipRect.width > window.innerWidth - 20) {
    left = window.innerWidth - tooltipRect.width - 20;
  }
  if (left < 10) {
    left = 10;
  }

  // Wenn nicht genug Platz unten, dann oben anzeigen
  if (top + tooltipRect.height > window.innerHeight - 20) {
    top = rect.top - tooltipRect.height - 10;
  }

  // Fixed positioning - kein scrollY Offset nötig
  tooltipElement.style.top = `${top}px`;
  tooltipElement.style.left = `${left}px`;
}

/**
 * Zeigt die Hilfe für ein bestimmtes Feld an
 */
function showFieldHelp(fieldIndex: number): void {
  const fieldConfig = GUIDED_FIELDS[fieldIndex];
  if (!fieldConfig) return;

  const field = document.getElementById(fieldConfig.id);
  if (!field) return;

  // Tooltip erstellen falls nicht vorhanden
  if (!tooltipElement) {
    tooltipElement = createTooltip();
  }

  // Overlay erstellen falls nicht vorhanden
  if (!overlayElement) {
    overlayElement = createOverlay();
  }

  // Alle Felder zurücksetzen
  GUIDED_FIELDS.forEach((f) => {
    const el = document.getElementById(f.id);
    if (el) {
      el.classList.remove("guided-active");
      el.parentElement?.classList.remove("guided-highlight");
    }
  });

  // Aktuelles Feld hervorheben
  field.classList.add("guided-active");
  field.parentElement?.classList.add("guided-highlight");

  // Tooltip-Inhalt aktualisieren
  const stepEl = tooltipElement.querySelector(".guided-tooltip-step");
  const titleEl = tooltipElement.querySelector(".guided-tooltip-title");
  const hintEl = tooltipElement.querySelector(".guided-tooltip-hint");
  const exampleEl = tooltipElement.querySelector(".guided-tooltip-example");

  if (stepEl)
    stepEl.textContent = `Schritt ${fieldIndex + 1} von ${GUIDED_FIELDS.length}`;
  if (titleEl) titleEl.textContent = fieldConfig.label;
  if (hintEl) hintEl.textContent = fieldConfig.hint;
  if (exampleEl) exampleEl.textContent = fieldConfig.beispiel;

  // Tooltip anzeigen und positionieren
  tooltipElement.classList.add("visible");
  overlayElement.classList.add("visible");

  // Zum Feld scrollen
  field.scrollIntoView({ behavior: "smooth", block: "center" });

  // Kurz warten dann Fokus setzen
  setTimeout(() => {
    field.focus();
    positionTooltip(field);
  }, 100);
}

/**
 * Geht zum nächsten Feld
 */
function nextField(): void {
  if (currentFieldIndex < GUIDED_FIELDS.length - 1) {
    currentFieldIndex++;
    showFieldHelp(currentFieldIndex);
  } else {
    // Alle Felder durchlaufen - Hilfe beenden
    hideGuidedHelp();
    // Fokus auf den "Berechnen" Button setzen
    const submitBtn = document.querySelector<HTMLButtonElement>(
      '#calculationForm button[type="submit"]'
    );
    if (submitBtn) {
      submitBtn.focus();
      submitBtn.classList.add("guided-submit-ready");
      setTimeout(() => submitBtn.classList.remove("guided-submit-ready"), 2000);
    }
  }
}

/**
 * Geht zum vorherigen Feld
 */
function previousField(): void {
  if (currentFieldIndex > 0) {
    currentFieldIndex--;
    showFieldHelp(currentFieldIndex);
  }
}

/**
 * Versteckt die geführte Hilfe
 */
function hideGuidedHelp(): void {
  if (tooltipElement) {
    tooltipElement.classList.remove("visible");
  }
  if (overlayElement) {
    overlayElement.classList.remove("visible");
  }

  // Alle Hervorhebungen entfernen
  GUIDED_FIELDS.forEach((f) => {
    const el = document.getElementById(f.id);
    if (el) {
      el.classList.remove("guided-active");
      el.parentElement?.classList.remove("guided-highlight");
    }
  });
}

/**
 * Behandelt Tastatureingaben im geführten Modus
 */
function handleKeyDown(event: KeyboardEvent): void {
  if (!isGuidedModeActive) return;

  if (event.key === "Enter") {
    const target = event.target as HTMLElement;
    // Nicht bei Select-Elementen oder wenn es der Submit-Button ist
    if (target.tagName === "SELECT" || target.tagName === "BUTTON") {
      return;
    }
    // Verhindere Formular-Submit
    event.preventDefault();
    nextField();
  } else if (event.key === "Escape") {
    hideGuidedHelp();
    isGuidedModeActive = false;
  } else if (event.key === "Tab" && !event.shiftKey) {
    // Bei Tab auch zum nächsten Feld gehen
    if (currentFieldIndex < GUIDED_FIELDS.length - 1) {
      event.preventDefault();
      nextField();
    }
  } else if (event.key === "Tab" && event.shiftKey) {
    // Bei Shift+Tab zum vorherigen Feld
    if (currentFieldIndex > 0) {
      event.preventDefault();
      previousField();
    }
  }
}

/**
 * Behandelt Fokus-Änderungen
 */
function handleFocusChange(event: FocusEvent): void {
  if (!isGuidedModeActive) return;

  const target = event.target as HTMLElement;
  const fieldIndex = GUIDED_FIELDS.findIndex((f) => f.id === target.id);

  if (fieldIndex !== -1 && fieldIndex !== currentFieldIndex) {
    currentFieldIndex = fieldIndex;
    showFieldHelp(currentFieldIndex);
  }
}

/**
 * Startet die geführte Eingabe
 */
export function startGuidedInput(): void {
  if (!isGuidedInputEnabled()) return;

  isGuidedModeActive = true;
  currentFieldIndex = 0;

  // Event-Listener hinzufügen
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("focusin", handleFocusChange);
  // Klicks außerhalb erkennen (mit kleiner Verzögerung um den aktuellen Klick zu ignorieren)
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 100);

  // Ersten Feld anzeigen
  showFieldHelp(0);

  console.log("[Eingabehilfe] Geführte Eingabe gestartet");
}

/**
 * Stoppt die geführte Eingabe
 */
export function stopGuidedInput(): void {
  isGuidedModeActive = false;
  hideGuidedHelp();

  // Event-Listener entfernen
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("focusin", handleFocusChange);
  document.removeEventListener("click", handleClickOutside);

  console.log("[Eingabehilfe] Geführte Eingabe beendet");
}

/**
 * Prüft ob ein Klick außerhalb des Berechnungsbereichs erfolgt
 */
function handleClickOutside(event: MouseEvent): void {
  if (!isGuidedModeActive) return;

  const target = event.target as HTMLElement;
  const form = document.getElementById("calculationForm");
  const tooltip = tooltipElement;

  // Prüfe ob der Klick innerhalb des Formulars oder Tooltips ist
  const isInsideForm = form?.contains(target);
  const isInsideTooltip = tooltip?.contains(target);
  const isToggle = target.closest(".guided-input-toggle");

  // Wenn außerhalb geklickt wurde, Hilfe beenden
  if (!isInsideForm && !isInsideTooltip && !isToggle) {
    stopGuidedInput();
  }
}

/**
 * Bereinigt alle DOM-Elemente der geführten Eingabe
 */
export function cleanupGuidedInput(): void {
  stopGuidedInput();

  // Entferne Tooltip und Overlay aus dem DOM
  if (tooltipElement) {
    tooltipElement.remove();
    tooltipElement = null;
  }
  if (overlayElement) {
    overlayElement.remove();
    overlayElement = null;
  }
}

/**
 * Initialisiert die geführte Eingabehilfe
 * Wird nach dem Rendern des Formulars aufgerufen
 */
export function initGuidedInput(): void {
  const toggle = document.getElementById(
    "guided-input-toggle"
  ) as HTMLInputElement | null;
  if (!toggle) return;

  // Toggle-Event
  toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    setGuidedInputEnabled(enabled);

    if (enabled) {
      startGuidedInput();
    } else {
      stopGuidedInput();
    }
  });

  // Beim ersten Klick ins Formular starten (wenn aktiviert)
  const form = document.getElementById("calculationForm");
  if (form && isGuidedInputEnabled()) {
    const startOnFirstClick = (event: Event) => {
      const target = event.target as HTMLElement;
      // Nur wenn ein Eingabefeld angeklickt wurde
      if (target.tagName === "INPUT" || target.tagName === "SELECT") {
        startGuidedInput();
        form.removeEventListener("click", startOnFirstClick);
      }
    };
    form.addEventListener("click", startOnFirstClick);
  }

  // Window-Resize: Tooltip neu positionieren
  window.addEventListener("resize", () => {
    if (isGuidedModeActive && tooltipElement) {
      const currentField = document.getElementById(
        GUIDED_FIELDS[currentFieldIndex]?.id || ""
      );
      if (currentField) {
        positionTooltip(currentField);
      }
    }
  });

  // Bei Navigation-Klicks (andere Tabs) die Hilfe beenden
  const navLinks = document.querySelectorAll("nav a, [data-section]");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isGuidedModeActive) {
        cleanupGuidedInput();
      }
    });
  });

  // MutationObserver: Wenn das Formular aus dem DOM entfernt wird
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        const formStillExists = document.getElementById("calculationForm");
        if (!formStillExists && isGuidedModeActive) {
          cleanupGuidedInput();
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
