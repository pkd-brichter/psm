/**
 * Mobile-Datenweitergabe per Share-Sheet.
 *
 * Im Mobile-Modus liegt die DB nur lokal (IndexedDB). Um die erfassten Daten in
 * die zentrale Server-DB zu bekommen, exportiert diese Funktion einen
 * vollständigen JSON-Snapshot und übergibt ihn dem nativen Share-Sheet (iOS/
 * Android): Mail, WhatsApp-Gruppe, Dateien, … Am Desktop wird die Datei dann
 * über "Import/Merge" in die geteilte Datenbank eingespielt.
 *
 * Fallback ohne Web Share API: klassischer Download.
 */

import {
  exportMobileUnshared,
  markMobileShared,
  deleteSharedHistory,
  exportFotos,
  markFotosShared,
  clearSharedFotos,
  persistSqliteDatabaseFile,
} from "@scripts/core/storage/sqlite";
import { emit } from "@scripts/core/eventBus";
import { toast } from "@scripts/core/toast";
import { setUnsharedCount } from "./unshared";
import { zipSync, strToU8 } from "fflate";

/**
 * Zweiphasiger Cleanup nach erfolgreichem Share:
 *
 * Phase 1 – Markieren + Persistieren (kritisch):
 *   Alle noch ungeteilten History-Einträge und Fotos werden mit
 *   mobile_shared_at = datetime('now') gestempelt und sofort in der
 *   IndexedDB gespeichert. Damit sind sie beim nächsten Export dauerhaft
 *   ausgeschlossen – selbst wenn der Worker danach abstürzt und die DB
 *   aus der IndexedDB neu lädt.
 *
 * Phase 2 – Löschen (best-effort):
 *   Die markierten Einträge werden physisch aus der DB entfernt. Schlägt
 *   das Persistieren hier fehl, sind die Daten beim nächsten Worker-Start
 *   zwar wieder sichtbar, werden aber wegen mobile_shared_at IS NOT NULL
 *   nicht mehr exportiert.
 */
async function cleanupAfterShare(): Promise<void> {
  // --- Phase 1: Markieren (atomar, Persist darf NICHT still scheitern) ----
  const [histMark, fotoMark] = await Promise.all([
    markMobileShared().catch((err) => {
      console.warn("[Share] markMobileShared fehlgeschlagen:", err);
      return null;
    }),
    markFotosShared().catch((err) => {
      console.warn("[Share] markFotosShared fehlgeschlagen:", err);
      return null;
    }),
  ]);

  try {
    await persistSqliteDatabaseFile();
  } catch (err) {
    // Markierungen konnten nicht persistiert werden → Fotos könnten bei
    // Worker-Neustart erneut exportiert werden. Nutzer warnen.
    console.error("[Share] Kritisch: Persist nach Markierung fehlgeschlagen", err);
    toast.error(
      "Warnung: Datenbank konnte nicht gespeichert werden. " +
      "Beim nächsten Teilen könnten bereits gesendete Daten erneut erscheinen.",
    );
  }

  // --- Phase 2: Löschen (best-effort, Markierung schützt vor Doppel-Export) -
  const [histDel, fotoDel] = await Promise.all([
    deleteSharedHistory().catch((err) => {
      console.warn("[Share] deleteSharedHistory fehlgeschlagen:", err);
      return null;
    }),
    clearSharedFotos().catch((err) => {
      console.warn("[Share] clearSharedFotos fehlgeschlagen:", err);
      return null;
    }),
  ]);
  await persistSqliteDatabaseFile().catch(() => undefined);

  // --- UI aktualisieren ---------------------------------------------------
  setUnsharedCount(0);
  emit("history:data-changed", { type: "deleted" });
  window.dispatchEvent(new CustomEvent("fotos:changed", { detail: { added: 0 } }));

  const parts: string[] = [];
  const hd = histDel?.deleted ?? histMark?.marked ?? 0;
  const fd = fotoDel?.deleted ?? fotoMark?.marked ?? 0;
  if (hd) parts.push(`${hd} Eintrag/Einträge`);
  if (fd) parts.push(`${fd} Foto(s)`);
  toast.info(parts.length ? `Geteilt und gelöscht: ${parts.join(", ")}.` : "Geteilt.");
}

/** base64 (ohne data:-Präfix) -> rohe Bytes für echte Bilddatei im ZIP. */
function base64ToBytes(base64: string): Uint8Array {
  const bin = atob(base64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function fotoFileName(foto: any, index: number): string {
  const id = foto?.clientUuid ? String(foto.clientUuid) : `foto-${index + 1}`;
  const safe = id.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `fotos/${safe}.jpg`;
}

const DEVICE_LABEL_KEY = "psm-device-label";

function timestampSlug(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
    `_${pad(now.getHours())}${pad(now.getMinutes())}`
  );
}

/** Geräte-/Personen-Label, das in der Import-Historie am PC erscheint. */
export function getDeviceLabel(): string {
  try {
    const stored = localStorage.getItem(DEVICE_LABEL_KEY);
    if (stored && stored.trim()) return stored.trim();
  } catch {
    /* ignore */
  }
  return "Mobilgerät";
}

function filenameSlug(label: string): string {
  return (
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "mobil"
  );
}

export async function shareMobileData(): Promise<void> {
  let zipped: Uint8Array;
  const device = getDeviceLabel();
  try {
    const snapshot = await exportMobileUnshared();
    // Metadaten fürs Import-Protokoll am PC (Gerät/Zeitpunkt).
    snapshot.metadata = {
      ...(snapshot.metadata || {}),
      device,
      exportedAt: new Date().toISOString(),
    };

    // ZIP-Inhalt vorbereiten: die JPEGs werden als ECHTE Binärdateien abgelegt
    // (kein base64-Aufblähen). In der JSON stehen nur die Foto-Metadaten + ein
    // Dateiverweis (`file`); am PC werden Bild + Meta wieder zusammengeführt.
    // exportFotos() gibt nur Fotos mit mobile_shared_at IS NULL zurück.
    const files: Record<string, Uint8Array | [Uint8Array, { level: 0 }]> = {};
    try {
      const fotos = (await exportFotos()).items || [];
      snapshot.fotos = fotos.map((f: any, i: number) => {
        const name = fotoFileName(f, i);
        if (f?.data) {
          // JPEG ist bereits komprimiert -> level 0 (kein erneutes Packen).
          files[name] = [base64ToBytes(String(f.data)), { level: 0 }];
        }
        const { data, ...meta } = f; // base64 NICHT in die JSON
        return { ...meta, file: name };
      });
    } catch (err) {
      console.warn("[Share] Fotos konnten nicht angehängt werden", err);
    }

    files["pflanzenschutz.json"] = strToU8(JSON.stringify(snapshot, null, 2));
    zipped = zipSync(files);
  } catch (err) {
    console.error("[Share] Export fehlgeschlagen", err);
    toast.error("Daten konnten nicht exportiert werden.");
    return;
  }

  const filename = `psm-${filenameSlug(device)}-${timestampSlug()}.zip`;
  // Uint8Array -> eigener ArrayBuffer-Slice (BlobPart-typsicher, kein SAB).
  const ab = zipped.buffer.slice(
    zipped.byteOffset,
    zipped.byteOffset + zipped.byteLength,
  ) as ArrayBuffer;
  const blob = new Blob([ab], { type: "application/zip" });
  const file = new File([blob], filename, { type: "application/zip" });

  const nav = navigator as Navigator & {
    canShare?: (data?: any) => boolean;
    share?: (data?: any) => Promise<void>;
  };

  // Bevorzugt: natives Share-Sheet mit Datei (iOS Safari, Android Chrome).
  if (
    typeof nav.share === "function" &&
    (typeof nav.canShare !== "function" || nav.canShare({ files: [file] }))
  ) {
    try {
      await nav.share({
        files: [file],
        title: "PSM-Daten",
        text: "Pflanzenschutz-Erfassung (ZIP inkl. Fotos) – am Desktop über Import/Merge einspielen.",
      });
      await cleanupAfterShare();
      return;
    } catch (err) {
      // Abbruch durch Nutzer ist kein Fehler.
      if ((err as DOMException)?.name === "AbortError") {
        return;
      }
      console.warn("[Share] Web Share fehlgeschlagen, nutze Download", err);
    }
  }

  // Fallback: Download anstoßen.
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    await cleanupAfterShare();
  } catch (err) {
    console.error("[Share] Download fehlgeschlagen", err);
    toast.error("Teilen wird auf diesem Gerät nicht unterstützt.");
  }
}
