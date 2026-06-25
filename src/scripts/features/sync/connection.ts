/**
 * Server-Verbindungs-Konfiguration (Mobile).
 *
 * Reiner Konfig-Speicher: hält Server-URL + Zugangs-Schlüssel im localStorage.
 * KEINE Netzwerk-Aufrufe, KEIN DOM, KEINE Abhängigkeit zu Share/DB/Fotos.
 *
 * Aktuell wird die gespeicherte Verbindung noch von keinem aktiven Sync
 * genutzt – sie ist die Grundlage für eine spätere Server-Anbindung. Das
 * Scannen/Speichern stört keinen bestehenden Flow.
 */

const URL_KEY = "psm-sync-url";
const TOKEN_KEY = "psm-sync-key";

export interface ServerConnection {
  url: string;
  key: string;
}

/** Gespeicherte Verbindung lesen (leere Strings, wenn nicht gesetzt). */
export function getServerConnection(): ServerConnection {
  try {
    return {
      url: localStorage.getItem(URL_KEY)?.trim() || "",
      key: localStorage.getItem(TOKEN_KEY)?.trim() || "",
    };
  } catch {
    return { url: "", key: "" };
  }
}

/** true, wenn mindestens eine URL hinterlegt ist. */
export function hasServerConnection(): boolean {
  return Boolean(getServerConnection().url);
}

/** Verbindung speichern. Leere Werte werden entfernt. */
export function setServerConnection(conn: ServerConnection): void {
  try {
    const url = (conn.url || "").trim();
    const key = (conn.key || "").trim();
    if (url) localStorage.setItem(URL_KEY, url);
    else localStorage.removeItem(URL_KEY);
    if (key) localStorage.setItem(TOKEN_KEY, key);
    else localStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.warn("[Sync] Verbindung konnte nicht gespeichert werden", err);
  }
}

/** Verbindung vollständig entfernen. */
export function clearServerConnection(): void {
  try {
    localStorage.removeItem(URL_KEY);
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * QR-Inhalt (oder manuelle Eingabe) in eine Verbindung übersetzen.
 *
 * Akzeptiert mehrere Formate, damit der QR-Generator auf der Server-Seite
 * flexibel bleibt:
 *   1. JSON:        {"url":"https://srv","key":"abc"}  (auch u/k, server/token)
 *   2. URL-Schema:  psm://connect?url=https://srv&key=abc
 *                   https://srv?key=abc   (URL selbst = Server)
 *                   …auch als #hash-Parameter
 *   3. Nur Token:   ein beliebiger String ohne URL  → wird als key gewertet
 *
 * Gibt null zurück, wenn nichts Brauchbares erkennbar ist.
 */
export function parseConnectionPayload(raw: string): ServerConnection | null {
  const text = (raw || "").trim();
  if (!text) return null;

  // (1) JSON-Objekt
  if (text.startsWith("{")) {
    try {
      const obj = JSON.parse(text);
      const url = String(obj.url ?? obj.server ?? obj.u ?? "").trim();
      const key = String(obj.key ?? obj.token ?? obj.k ?? "").trim();
      if (url || key) return { url, key };
    } catch {
      /* kein gültiges JSON – nächster Versuch */
    }
  }

  // (2) URL mit Parametern (Query oder Hash)
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(text)) {
    try {
      const u = new URL(text);
      const params = new URLSearchParams(
        u.search ? u.search.slice(1) : u.hash.replace(/^#/, ""),
      );
      const paramUrl = (params.get("url") || params.get("server") || "").trim();
      const paramKey = (params.get("key") || params.get("token") || "").trim();

      // psm://connect?url=…&key=…  → URL steht im Parameter
      if (u.protocol === "psm:" || paramUrl) {
        if (paramUrl || paramKey) return { url: paramUrl, key: paramKey };
      }

      // https://srv?key=…  → die URL selbst ist der Server
      if (u.protocol === "http:" || u.protocol === "https:") {
        const base = `${u.protocol}//${u.host}${u.pathname}`.replace(/\/$/, "");
        return { url: base, key: paramKey };
      }
    } catch {
      /* keine parsebare URL – nächster Versuch */
    }
  }

  // (3) Reiner Token (kein erkennbares URL-/JSON-Format)
  return { url: "", key: text };
}
