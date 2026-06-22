/**
 * Plattform-Erkennung für den Hybrid-Betrieb:
 *
 *  - Desktop (Produktiv): geteilte SQLite-Datei auf dem Server-/AD-Verzeichnis
 *    über die File System Access API. Verhalten unverändert.
 *  - Mobile (Erfassungs-Client): keine File-System-API verfügbar, daher lokale
 *    DB in IndexedDB + Datenweitergabe per Share-Sheet (JSON).
 *
 * Die Erkennung lässt sich für Tests/Sonderfälle über URL-Parameter erzwingen:
 *   ?mobile=1   → Mobile-Modus erzwingen (auch am Desktop, zum Entwickeln/Testen)
 *   ?desktop=1  → Desktop-Modus erzwingen (z. B. Tablet mit echtem DB-Zugriff)
 * Die Wahl wird in localStorage gemerkt, damit sie über Reloads hinweg hält.
 */

const FORCE_KEY = "psm-force-platform";

export function isFsAccessSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof (window as any).showSaveFilePicker === "function"
  );
}

function readForced(): "mobile" | "desktop" | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mobile") === "1" || params.get("mobile") === "true") {
      localStorage.setItem(FORCE_KEY, "mobile");
      return "mobile";
    }
    if (params.get("desktop") === "1" || params.get("desktop") === "true") {
      localStorage.setItem(FORCE_KEY, "desktop");
      return "desktop";
    }
    const stored = localStorage.getItem(FORCE_KEY);
    if (stored === "mobile" || stored === "desktop") {
      return stored;
    }
  } catch {
    /* localStorage/URL nicht verfügbar – Heuristik nutzen */
  }
  return null;
}

/**
 * Setzt eine erzwungene Plattform-Wahl zurück (für Debug/Reset).
 */
export function clearForcedPlatform(): void {
  try {
    localStorage.removeItem(FORCE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * True, wenn die App als schlanker Mobile-Erfassungs-Client laufen soll.
 *
 * Heuristik (wenn nicht per URL erzwungen): echtes Touch-Gerät mit grobem
 * Zeiger (Smartphone/Tablet). Touch-Notebooks mit Maus/Trackpad melden
 * `pointer: fine` und gelten daher als Desktop.
 */
export function isMobileClient(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const forced = readForced();
  if (forced) {
    return forced === "mobile";
  }
  const coarse =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
  const touch =
    (navigator.maxTouchPoints ?? 0) > 0 ||
    "ontouchstart" in window;
  return coarse && touch;
}
