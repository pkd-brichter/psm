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
  exportSnapshot,
  exportFotos,
  clearFotos,
  persistSqliteDatabaseFile,
} from "@scripts/core/storage/sqlite";
import { toast } from "@scripts/core/toast";
import { t } from "@scripts/core/i18n";
import { setUnsharedCount } from "./unshared";
import { zipSync, strToU8 } from "fflate";

/**
 * Nach erfolgreichem Senden: Fotos vom Gerät entfernen (mobil = reiner
 * Erfassungs-/Weitergabe-Client, „nichts hinterlassen" → kein Speicher-Ballast).
 * Die Erfassungen (Text) bleiben für die PDF-Ansicht erhalten.
 */
async function clearFotosAfterSend(): Promise<void> {
  try {
    const res = await clearFotos();
    await persistSqliteDatabaseFile().catch(() => undefined);
    window.dispatchEvent(
      new CustomEvent("fotos:changed", { detail: { added: 0 } }),
    );
    if (res?.deleted) {
      toast.info(`${res.deleted} ${t("Foto(s) gesendet und vom Gerät entfernt.")}`);
    }
  } catch (err) {
    console.warn("[Share] Fotos konnten nach dem Senden nicht entfernt werden", err);
  }
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
    const snapshot = await exportSnapshot();
    // Metadaten fürs Import-Protokoll am PC (Gerät/Zeitpunkt).
    snapshot.metadata = {
      ...(snapshot.metadata || {}),
      device,
      exportedAt: new Date().toISOString(),
    };

    // ZIP-Inhalt vorbereiten: die JPEGs werden als ECHTE Binärdateien abgelegt
    // (kein base64-Aufblähen). In der JSON stehen nur die Foto-Metadaten + ein
    // Dateiverweis (`file`); am PC werden Bild + Meta wieder zusammengeführt.
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
      setUnsharedCount(0);
      // WICHTIG (Datenverlust-Schutz): nav.share "gelingt" bereits, wenn das
      // Share-Sheet die Datei an eine Ziel-App (Mail/Files/WhatsApp) ÜBERGIBT –
      // NICHT, wenn sie am PC ankommt und importiert wurde. Daher Fotos NICHT
      // automatisch löschen, sondern nur nach ausdrücklicher Bestätigung.
      const confirmDelete =
        typeof window.confirm === "function"
          ? window.confirm(
              "Daten wurden geteilt.\n\nFotos jetzt vom Gerät löschen?\nNur bestätigen, wenn sie am PC bereits importiert wurden – sonst gehen sie verloren.",
            )
          : false;
      if (confirmDelete) {
        await clearFotosAfterSend();
      } else {
        toast.info("Geteilt. Fotos bleiben auf dem Gerät, bis du sie aufräumst.");
      }
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
    setUnsharedCount(0);
    // Beim Download-Fallback NICHT automatisch löschen: a.click() bestätigt nicht,
    // ob die Datei wirklich gespeichert wurde – sonst Datenverlust-Falle.
    toast.info("Datei wurde heruntergeladen.");
  } catch (err) {
    console.error("[Share] Download fehlgeschlagen", err);
    toast.error("Teilen wird auf diesem Gerät nicht unterstützt.");
  }
}
