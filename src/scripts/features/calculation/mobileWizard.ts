/**
 * Mobiler Schritt-für-Schritt-Wizard für die Erfassungs-Maske.
 *
 * Reine Präsentationsschicht ÜBER der bestehenden Maske (kein Eingriff in die
 * Felder/IDs/Validierung): die vorhandenen Fieldsets werden in Schritt-Container
 * umgehängt und einzeln eingeblendet. Pro Screen sieht der Anwender nur wenige
 * Felder + Fortschritt + Zurück/Weiter – statt der langen Scroll-Liste.
 *
 * Der letzte Eingabeschritt löst das bestehende „Berechnen" (form submit) aus;
 * danach erscheint die Übersicht (die vorhandene Ergebnis-Karte mit „Speichern").
 * Nach dem Speichern setzt die Maske `calcContext` zurück → der Wizard springt
 * automatisch wieder auf Schritt 1.
 *
 * NUR mobil aktiv (Aufruf gated über `body.m-page`). Desktop bleibt unverändert.
 */
import { toast } from "@scripts/core/toast";
import { t } from "@scripts/core/i18n";
import { escapeHtml } from "@scripts/core/utils";

interface WizStep {
  title: string;
  /** data-wiz-group-Werte der Fieldsets, die zu diesem Schritt gehören. */
  groups: string[];
}

const STEPS: WizStep[] = [
  { title: "Grunddaten", groups: ["grund"] },
  { title: "Mittel & Codes", groups: ["mittel", "codes"] },
  { title: "Anwendung & QS", groups: ["anwendung", "qs"] },
];

export function initCalculationWizard(section: HTMLElement): void {
  const formMaybe = section.querySelector<HTMLFormElement>("#calculationForm");
  const resultMaybe = section.querySelector<HTMLElement>("#calc-result");
  const formCardMaybe = section.querySelector<HTMLElement>(".calc-form-card");
  if (!formMaybe || !resultMaybe || !formCardMaybe) return;
  // Non-null Aliase: Control-Flow-Narrowing greift sonst nicht in den Closures.
  const form = formMaybe;
  const resultCard = resultMaybe;
  const formCard = formCardMaybe;

  // Native Validierung aus: versteckte Pflichtfelder (andere Schritte) würden
  // sonst `requestSubmit()` lautlos blockieren. Die bestehende JS-Validierung
  // (Toasts) im submit-Handler greift weiterhin.
  form.noValidate = true;

  // ---- Fieldsets in Schritt-Container umhängen (behält Listener + IDs) ------
  const stepEls: HTMLElement[] = [];
  STEPS.forEach((step, i) => {
    const wrap = document.createElement("div");
    wrap.className = "wiz-step";
    wrap.dataset.wizStep = String(i);
    step.groups.forEach((group) => {
      const fs = form.querySelector<HTMLElement>(`[data-wiz-group="${group}"]`);
      if (fs) wrap.appendChild(fs);
    });
    form.appendChild(wrap);
    stepEls.push(wrap);
  });

  // Original-Submit-Zeile ausblenden – der Wizard-Footer steuert das Berechnen.
  const submitRow = form.querySelector<HTMLElement>("[data-wiz-submit]");
  if (submitRow) submitRow.style.display = "none";

  // ---- Kopf (Fortschritt) + Footer (Navigation) -----------------------------
  const totalSteps = STEPS.length + 1; // + Übersicht/Speichern
  const reviewIndex = STEPS.length;

  const head = document.createElement("div");
  head.className = "wiz-head no-print";
  head.innerHTML = `
    <div class="wiz-progress" data-role="wiz-progress"></div>
    <div class="wiz-title" data-role="wiz-title"></div>`;
  section.insertBefore(head, section.firstChild);

  const foot = document.createElement("div");
  foot.className = "wiz-foot no-print";
  foot.innerHTML = `
    <button type="button" class="wiz-btn wiz-btn-back" data-wiz="back">
      <i class="bi bi-chevron-left"></i> ${escapeHtml(t("Zurück"))}
    </button>
    <button type="button" class="wiz-btn wiz-btn-next" data-wiz="next"></button>`;
  section.appendChild(foot);

  const progressEl = head.querySelector<HTMLElement>('[data-role="wiz-progress"]')!;
  const titleEl = head.querySelector<HTMLElement>('[data-role="wiz-title"]')!;
  const backBtn = foot.querySelector<HTMLButtonElement>('[data-wiz="back"]')!;
  const nextBtn = foot.querySelector<HTMLButtonElement>('[data-wiz="next"]')!;

  let current = 0;
  // Eigene Klassen-Umschaltungen an der Ergebnis-Karte nicht als „extern"
  // (durch Berechnen/Reset) fehldeuten.
  let internalToggle = false;

  function setResultHidden(hidden: boolean): void {
    internalToggle = true;
    resultCard.classList.toggle("d-none", hidden);
    internalToggle = false;
  }

  function renderProgress(): void {
    let html = "";
    for (let i = 0; i < totalSteps; i++) {
      const cls = i < current ? "is-done" : i === current ? "is-active" : "";
      html += `<span class="wiz-dot ${cls}"></span>`;
    }
    progressEl.innerHTML = html;
  }

  function show(step: number): void {
    current = step;
    const review = step === reviewIndex;
    formCard.style.display = review ? "none" : "";
    setResultHidden(!review);
    stepEls.forEach((el, i) => {
      el.style.display = i === step ? "" : "none";
    });

    const title = review ? "Übersicht & Speichern" : STEPS[step].title;
    titleEl.textContent = `${t("Schritt")} ${step + 1}/${totalSteps} · ${t(title)}`;
    backBtn.style.visibility = step === 0 ? "hidden" : "visible";

    if (review) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "";
      const lastInput = step === STEPS.length - 1;
      nextBtn.innerHTML = lastInput
        ? `${escapeHtml(t("Berechnen"))} <i class="bi bi-calculator"></i>`
        : `${escapeHtml(t("Weiter"))} <i class="bi bi-chevron-right"></i>`;
    }
    renderProgress();
    window.scrollTo({ top: 0 });
  }

  /** Minimale Pflichtfeld-Prüfung pro Schritt (sanftes Blockieren + Hinweis). */
  function validateStep(step: number): boolean {
    if (step === 0) {
      const ersteller = form.querySelector<HTMLInputElement>("#calc-ersteller");
      const area = form.querySelector<HTMLInputElement>("#calc-area-ha");
      if (ersteller && !ersteller.value.trim()) {
        toast.warning(t("Bitte Ihren Namen eintragen."));
        ersteller.focus();
        return false;
      }
      if (area && (!area.value.trim() || Number.isNaN(Number(area.value)))) {
        toast.warning(t("Bitte die Fläche in Hektar eintragen."));
        area.focus();
        return false;
      }
    }
    return true;
  }

  function goNext(): void {
    if (current === reviewIndex) return;
    if (!validateStep(current)) return;
    const lastInput = current === STEPS.length - 1;
    if (!lastInput) {
      show(current + 1);
      return;
    }
    // Letzter Eingabeschritt → bestehendes „Berechnen" auslösen. Bei Erfolg
    // erscheint die Ergebnis-Karte (calcContext gesetzt) → Übersicht.
    setResultHidden(true);
    form.requestSubmit();
    setTimeout(() => {
      if (!resultCard.classList.contains("d-none")) {
        show(reviewIndex);
      }
      // sonst: Validierung schlug fehl (Toast bereits gezeigt) → Schritt bleibt.
    }, 0);
  }

  function goBack(): void {
    if (current === reviewIndex) {
      show(STEPS.length - 1); // zurück zum letzten Eingabeschritt (bearbeiten)
      return;
    }
    if (current > 0) show(current - 1);
  }

  nextBtn.addEventListener("click", goNext);
  backBtn.addEventListener("click", goBack);

  // Nach dem Speichern setzt die Maske calcContext zurück → Ergebnis-Karte wird
  // (extern) auf d-none gesetzt. Dann zurück auf Schritt 1 für die nächste Erfassung.
  const obs = new MutationObserver(() => {
    if (internalToggle) return;
    const hidden = resultCard.classList.contains("d-none");
    if (current === reviewIndex && hidden) {
      show(0);
    }
  });
  obs.observe(resultCard, { attributes: true, attributeFilter: ["class"] });

  show(0);
}
