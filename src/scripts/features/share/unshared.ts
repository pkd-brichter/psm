/**
 * Leichtgewichtige Logik für den "noch nicht geteilt"-Hinweis im Mobile-Modus.
 * Bewusst OHNE schwere Imports (nur localStorage + DOM), damit es in den
 * globalen Shell-Bundle passt, ohne den SQLite-Bridge-Chunk mitzuziehen.
 */

const UNSHARED_KEY = "psm-unshared-count";

export function getUnsharedCount(): number {
  try {
    const raw = parseInt(localStorage.getItem(UNSHARED_KEY) || "0", 10);
    return Number.isFinite(raw) && raw > 0 ? raw : 0;
  } catch {
    return 0;
  }
}

export function setUnsharedCount(n: number): void {
  try {
    localStorage.setItem(UNSHARED_KEY, String(Math.max(0, n)));
  } catch {
    /* ignore */
  }
  updateShareBadge();
}

/** Bei jeder neuen Mobil-Erfassung aufrufen. */
export function incrementUnshared(): void {
  setUnsharedCount(getUnsharedCount() + 1);
}

/** Aktualisiert Zähler-Badge + Akzentfarbe am "Daten teilen"-Button. */
export function updateShareBadge(): void {
  const badge = document.querySelector<HTMLElement>(
    '[data-role="share-badge"]',
  );
  const button = document.querySelector<HTMLElement>(".nav-btn-share");
  const count = getUnsharedCount();
  if (badge) {
    badge.textContent = count > 0 ? String(count) : "";
    badge.classList.toggle("d-none", count <= 0);
  }
  if (button) {
    button.classList.toggle("has-unshared", count > 0);
    button.title =
      count > 0 ? `Daten teilen – ${count} noch nicht geteilt` : "Daten teilen";
  }
}
