import {
  type AppState,
  getState,
  subscribeState,
  updateSlice,
} from "@scripts/core/state";
import { emit, subscribe as subscribeEvent } from "@scripts/core/eventBus";
import { incrementUnshared, updateShareBadge } from "@scripts/features/share/unshared";

type Section = AppState["app"]["activeSection"];

interface AreaSection {
  section: Section;
  label: string;
  icon: string;
}

interface AreaDef {
  id: string;
  label: string;
  icon: string;
  sections: AreaSection[];
}

/**
 * Top-Level-Bereiche (Sidebar, nur Icons). Die `sections` jedes Bereichs werden
 * als Reiter oben im Header (topnav) angezeigt. Die App ist eine Plattform mit
 * mehreren Apps – PSM (Pflanzenschutz) ist nur einer davon.
 */
const AREAS: AreaDef[] = [
  {
    id: "start",
    label: "Start",
    icon: "bi-grid-1x2",
    sections: [{ section: "dashboard", label: "Übersicht", icon: "bi-grid-1x2" }],
  },
  {
    id: "psm",
    label: "PSM",
    icon: "bi-flower1",
    sections: [
      { section: "calc", label: "Neu erfassen", icon: "bi-pencil-square" },
      { section: "documentation", label: "Übersicht", icon: "bi-list-ul" },
      { section: "lager", label: "Lager", icon: "bi-box-seam" },
    ],
  },
  {
    id: "acker",
    label: "Acker-Planer",
    icon: "bi-map",
    sections: [{ section: "acker", label: "Acker-Planer", icon: "bi-map" }],
  },
  {
    id: "settings",
    label: "Einstellungen",
    icon: "bi-gear",
    sections: [{ section: "settings", label: "Einstellungen", icon: "bi-gear" }],
  },
];

/**
 * Ordnet JEDE mögliche Section einem Bereich zu (auch Unter-Sections, die nicht
 * als Header-Reiter erscheinen, z. B. die internen Einstellungs-Ansichten).
 */
const SECTION_TO_AREA: Partial<Record<Section, string>> = {
  dashboard: "start",
  calc: "psm",
  documentation: "psm",
  lager: "psm",
  history: "psm",
  report: "psm",
  acker: "acker",
  settings: "settings",
  gps: "settings",
  lookup: "settings",
  import: "settings",
};

function areaById(id: string): AreaDef | undefined {
  return AREAS.find((a) => a.id === id);
}

function areaForSection(section: Section): AreaDef | undefined {
  const id = SECTION_TO_AREA[section];
  return id ? areaById(id) : undefined;
}

function initOfflineIndicator(): void {
  const indicator = document.getElementById("offline-indicator");
  if (!indicator) return;

  const updateStatus = () => {
    const isOffline = !navigator.onLine;
    indicator.classList.toggle("d-none", !isOffline);
  };

  updateStatus();
  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
}

function setActiveSection(section: Section): void {
  if (getState().app.activeSection === section) {
    return;
  }
  updateSlice("app", (app) => ({ ...app, activeSection: section }));
  emit("app:sectionChanged", section);
}

function initShell(): void {
  initOfflineIndicator();

  const sidebarButtons =
    document.querySelectorAll<HTMLButtonElement>(".nav-btn[data-area]");
  const brandStart = document.getElementById("brand-link");
  const tabsHost = document.getElementById("topnav-tabs");
  const areaIcon = document.getElementById("topnav-area-icon");
  const areaLabel = document.getElementById("topnav-area-label");

  // Merkt sich pro Bereich die zuletzt aktive Section, damit ein erneuter
  // Klick auf den Bereich dort fortsetzt, wo man war.
  const lastSectionByArea: Record<string, Section> = {};
  for (const area of AREAS) {
    lastSectionByArea[area.id] = area.sections[0].section;
  }

  let renderedAreaId: string | null = null;

  function renderTabs(area: AreaDef, activeSection: Section): void {
    if (!tabsHost) return;
    // Bereiche mit nur einer Ansicht brauchen keine Reiter (Bereichstitel reicht).
    if (area.sections.length <= 1) {
      tabsHost.innerHTML = "";
      return;
    }
    tabsHost.innerHTML = area.sections
      .map(
        (s) => `
        <button type="button" class="topnav-tab${
          s.section === activeSection ? " active" : ""
        }" data-section="${s.section}">
          <i class="bi ${s.icon}"></i><span>${s.label}</span>
        </button>`,
      )
      .join("");
  }

  function highlightTabs(activeSection: Section): void {
    if (!tabsHost) return;
    tabsHost
      .querySelectorAll<HTMLButtonElement>(".topnav-tab")
      .forEach((tab) => {
        tab.classList.toggle(
          "active",
          tab.dataset.section === activeSection,
        );
      });
  }

  // Klick auf einen Bereich in der Sidebar.
  const handleArea = (areaId: string) => {
    const area = areaById(areaId);
    if (!area || !getState().app.hasDatabase) return;
    setActiveSection(lastSectionByArea[areaId] ?? area.sections[0].section);
  };

  sidebarButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const areaId = btn.dataset.area;
      if (areaId) handleArea(areaId);
    });
  });
  brandStart?.addEventListener("click", (event) => {
    event.preventDefault();
    handleArea("start");
  });

  // Klick auf einen Reiter im Header.
  tabsHost?.addEventListener("click", (event) => {
    const tab = (event.target as HTMLElement | null)?.closest(
      ".topnav-tab",
    ) as HTMLButtonElement | null;
    const section = tab?.dataset.section as Section | undefined;
    if (section) setActiveSection(section);
  });

  // "Daten teilen" (nur Mobile-Modus sichtbar) – Share-Sheet/Download.
  const shareButton = document.querySelector<HTMLButtonElement>(
    '.nav-btn[data-action="share-data"]',
  );
  shareButton?.addEventListener("click", () => {
    shareButton.disabled = true;
    import("@scripts/features/share")
      .then(({ shareMobileData }) => shareMobileData())
      .catch((error) => console.error("Teilen fehlgeschlagen", error))
      .finally(() => {
        shareButton.disabled = false;
      });
  });

  // Mobile-Hinweis "noch nicht geteilt": Zähler bei jeder neuen Erfassung erhöhen.
  updateShareBadge();
  subscribeEvent("history:data-changed", (payload) => {
    if (!document.body.classList.contains("mobile-mode")) return;
    const type = (payload as { type?: string } | undefined)?.type;
    if (type === "created" || type === "created-bulk") {
      incrementUnshared();
    }
  });

  const syncUi = (state: AppState) => {
    const brandTitle = document.getElementById("brand-title");
    const brandTagline = document.getElementById("brand-tagline");
    const appVersion = document.getElementById("app-version");
    if (brandTitle && state.company.name) {
      brandTitle.textContent = state.company.name;
    }
    if (brandTagline && state.company.headline) {
      brandTagline.textContent = state.company.headline;
    }
    if (appVersion && state.app.version) {
      appVersion.textContent = `v${state.app.version}`;
    }

    const hasDb = state.app.hasDatabase;
    const activeSection = state.app.activeSection;
    const area = areaForSection(activeSection);

    // Merken, wo wir im Bereich zuletzt waren.
    if (area && SECTION_TO_AREA[activeSection] === area.id) {
      lastSectionByArea[area.id] = activeSection;
    }

    // Sidebar: aktiven Bereich hervorheben + Disabled-Status.
    sidebarButtons.forEach((btn) => {
      btn.disabled = !hasDb;
      const isActive = hasDb && area?.id === btn.dataset.area;
      btn.classList.toggle("active", Boolean(isActive));
    });

    // Header: Bereichstitel + Reiter.
    if (area) {
      if (areaIcon) areaIcon.className = `bi ${area.icon} topnav-area-icon`;
      if (areaLabel) areaLabel.textContent = area.label;
      if (renderedAreaId !== area.id) {
        renderTabs(area, activeSection);
        renderedAreaId = area.id;
      } else {
        highlightTabs(activeSection);
      }
    }
  };

  subscribeState(syncUi);
  syncUi(getState());

  let isPrinting = false;
  const activeDocumentTitle = document.title || "Pflanzenschutz";

  window.addEventListener("beforeprint", () => {
    if (isPrinting) return;
    isPrinting = true;
    document.title = " ";
  });

  window.addEventListener("afterprint", () => {
    if (!isPrinting) return;
    isPrinting = false;
    document.title = activeDocumentTitle;
  });
}

function bootstrapShell(): void {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShell, { once: true });
  } else {
    initShell();
  }
}

bootstrapShell();
