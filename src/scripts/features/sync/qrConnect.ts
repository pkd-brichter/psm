/**
 * QR-Scanner zum Verbinden mit einem Server (Mobile).
 *
 * Vollständig selbstverwaltetes Overlay: öffnet die Kamera, scannt einen
 * QR-Code mit den Server-Zugangsdaten (URL + Schlüssel) und speichert sie
 * über connection.ts im localStorage. Räumt Kamera-Stream, RAF-Loop und
 * Listener bei jedem Schließ-Pfad sauber auf.
 *
 * Isoliert: kein Zugriff auf Share-/Foto-/DB-Logik. Stört keinen Flow –
 * speichert nur Konfiguration für eine spätere Server-Synchronisation.
 */

import jsQR from "jsqr";
import { toast } from "@scripts/core/toast";
import {
  getServerConnection,
  setServerConnection,
  clearServerConnection,
  parseConnectionPayload,
  type ServerConnection,
} from "./connection";

let openOverlay: HTMLElement | null = null;

function maskKey(key: string): string {
  if (!key) return "";
  if (key.length <= 6) return "••••";
  return `${key.slice(0, 3)}…${key.slice(-2)}`;
}

function connectionSummary(conn: ServerConnection): string {
  if (!conn.url && !conn.key) {
    return `<span class="m-qr-none"><i class="bi bi-plug"></i> Noch keine Verbindung gespeichert.</span>`;
  }
  const url = conn.url
    ? `<div class="m-qr-row"><span class="m-qr-k">Server</span><span class="m-qr-v">${escapeText(conn.url)}</span></div>`
    : "";
  const key = conn.key
    ? `<div class="m-qr-row"><span class="m-qr-k">Schlüssel</span><span class="m-qr-v">${escapeText(maskKey(conn.key))}</span></div>`
    : "";
  return url + key;
}

function escapeText(s: string): string {
  return String(s).replace(/[&<>"]/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;",
  );
}

/** Öffnet das Verbinden-Overlay (Kamera-Scan + manuelle Eingabe). */
export function openQrConnectModal(): void {
  if (openOverlay) return; // schon offen

  let stream: MediaStream | null = null;
  let rafId = 0;
  let scanning = false;
  let closed = false;

  const overlay = document.createElement("div");
  overlay.className = "m-modal m-qr";
  overlay.innerHTML = `
    <div class="m-modal-backdrop" data-action="qr-close"></div>
    <div class="m-modal-sheet" role="dialog" aria-modal="true" aria-label="Server verbinden">
      <div class="m-modal-head">
        <span class="m-modal-title"><i class="bi bi-qr-code-scan"></i> Server verbinden</span>
        <button type="button" class="m-modal-x" data-action="qr-close" aria-label="Schließen"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="m-modal-body">
        <div class="m-qr-scanwrap" data-role="qr-scanwrap">
          <video class="m-qr-video" data-role="qr-video" playsinline muted></video>
          <div class="m-qr-frame"></div>
        </div>
        <p class="m-qr-status" data-role="qr-status">Kamera wird gestartet …</p>

        <div class="m-qr-current" data-role="qr-current">${connectionSummary(getServerConnection())}</div>

        <details class="m-qr-manual">
          <summary>Manuell eingeben</summary>
          <label class="m-qr-field">
            <span>Server-Adresse</span>
            <input type="url" inputmode="url" autocomplete="off" data-role="qr-url" placeholder="https://dein-server.de" />
          </label>
          <label class="m-qr-field">
            <span>Schlüssel</span>
            <input type="text" autocomplete="off" data-role="qr-key" placeholder="Zugangs-Schlüssel" />
          </label>
          <button type="button" class="m-share-btn" data-action="qr-save-manual">
            <i class="bi bi-check-lg"></i> Speichern
          </button>
        </details>

        <p class="m-qr-note">
          <i class="bi bi-info-circle"></i>
          Wird lokal gespeichert für die spätere Server-Synchronisation.
          Aktuell findet noch kein automatischer Abgleich statt.
        </p>
      </div>
      <div class="m-modal-foot">
        <button type="button" class="m-qr-clear" data-action="qr-clear">
          <i class="bi bi-trash"></i> Verbindung entfernen
        </button>
        <button type="button" class="m-share-btn" data-action="qr-close">
          <i class="bi bi-x-lg"></i> Schließen
        </button>
      </div>
    </div>`;

  const statusEl = () =>
    overlay.querySelector<HTMLElement>('[data-role="qr-status"]');
  const currentEl = () =>
    overlay.querySelector<HTMLElement>('[data-role="qr-current"]');
  const scanWrap = () =>
    overlay.querySelector<HTMLElement>('[data-role="qr-scanwrap"]');

  function setStatus(msg: string): void {
    const el = statusEl();
    if (el) el.textContent = msg;
  }

  function refreshCurrent(): void {
    const el = currentEl();
    if (el) el.innerHTML = connectionSummary(getServerConnection());
  }

  function cleanup(): void {
    if (closed) return;
    closed = true;
    scanning = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    if (stream) {
      for (const track of stream.getTracks()) {
        try {
          track.stop();
        } catch {
          /* ignore */
        }
      }
      stream = null;
    }
    document.removeEventListener("keydown", onKeydown);
    overlay.remove();
    document.body.classList.remove("m-modal-open");
    if (openOverlay === overlay) openOverlay = null;
  }

  function applyConnection(conn: ServerConnection, viaScan: boolean): void {
    setServerConnection(conn);
    refreshCurrent();
    try {
      window.dispatchEvent(
        new CustomEvent("sync:connection-changed", { detail: { ...conn } }),
      );
    } catch {
      /* ignore */
    }
    if (typeof navigator.vibrate === "function" && viaScan) {
      try {
        navigator.vibrate(60);
      } catch {
        /* ignore */
      }
    }
    toast.success("Server-Verbindung gespeichert.");
    cleanup();
  }

  function onKeydown(ev: KeyboardEvent): void {
    if (ev.key === "Escape") cleanup();
  }

  overlay.addEventListener("click", (ev) => {
    const t = ev.target as HTMLElement | null;
    if (t?.closest('[data-action="qr-close"]')) {
      cleanup();
      return;
    }
    if (t?.closest('[data-action="qr-clear"]')) {
      clearServerConnection();
      refreshCurrent();
      toast.info("Verbindung entfernt.");
      return;
    }
    if (t?.closest('[data-action="qr-save-manual"]')) {
      const url =
        overlay.querySelector<HTMLInputElement>('[data-role="qr-url"]')?.value ||
        "";
      const key =
        overlay.querySelector<HTMLInputElement>('[data-role="qr-key"]')?.value ||
        "";
      if (!url.trim() && !key.trim()) {
        toast.error("Bitte Server-Adresse oder Schlüssel eingeben.");
        return;
      }
      applyConnection({ url: url.trim(), key: key.trim() }, false);
    }
  });

  document.addEventListener("keydown", onKeydown);
  document.body.appendChild(overlay);
  document.body.classList.add("m-modal-open");
  openOverlay = overlay;

  void startCamera();

  async function startCamera(): Promise<void> {
    const video = overlay.querySelector<HTMLVideoElement>(
      '[data-role="qr-video"]',
    );
    if (!video) return;

    const md = navigator.mediaDevices;
    if (!md || typeof md.getUserMedia !== "function") {
      noCamera("Kamera wird auf diesem Gerät nicht unterstützt.");
      return;
    }

    try {
      stream = await md.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
    } catch (err) {
      console.warn("[Sync] Kamera-Zugriff verweigert/fehlgeschlagen", err);
      noCamera("Kein Kamera-Zugriff. Bitte unten manuell eingeben.");
      return;
    }
    if (closed) {
      // Während des await geschlossen → Stream sofort stoppen.
      for (const tr of stream.getTracks()) tr.stop();
      return;
    }

    video.srcObject = stream;
    video.setAttribute("playsinline", "true");
    video.muted = true;
    try {
      await video.play();
    } catch {
      /* play() kann ohne weitere Geste scheitern – Loop versucht es trotzdem */
    }

    setStatus("QR-Code in den Rahmen halten.");
    scanning = true;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      noCamera("Scan wird nicht unterstützt. Bitte manuell eingeben.");
      return;
    }

    const tick = (): void => {
      if (!scanning || closed) return;
      if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(img.data, img.width, img.height, {
          inversionAttempts: "dontInvert",
        });
        if (code && code.data) {
          const raw = code.data.trim();
          // Nur unser definiertes Format automatisch übernehmen (JSON oder
          // psm:-Schema). So lösen fremde QR-Codes (Produkt, WLAN, Website)
          // keine versehentliche "gespeichert"-Meldung aus.
          const structured =
            raw.startsWith("{") || /^psm:/i.test(raw);
          const conn = structured ? parseConnectionPayload(raw) : null;
          if (conn && (conn.url || conn.key)) {
            scanning = false;
            applyConnection(conn, true);
            return;
          }
          setStatus("QR erkannt, aber kein Server-Code. Bitte richtigen Code scannen oder manuell eingeben.");
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
  }

  function noCamera(msg: string): void {
    scanning = false;
    const wrap = scanWrap();
    if (wrap) wrap.classList.add("m-qr-nocam");
    setStatus(msg);
    // Manuelle Eingabe aufklappen, damit der Nutzer nicht blockiert ist.
    const details = overlay.querySelector<HTMLDetailsElement>(".m-qr-manual");
    if (details) details.open = true;
  }
}
