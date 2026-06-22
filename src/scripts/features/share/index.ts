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

import { exportSnapshot } from "@scripts/core/storage/sqlite";
import { toast } from "@scripts/core/toast";

function timestampSlug(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
    `_${pad(now.getHours())}${pad(now.getMinutes())}`
  );
}

export async function shareMobileData(): Promise<void> {
  let json: string;
  try {
    const snapshot = await exportSnapshot();
    json = JSON.stringify(snapshot, null, 2);
  } catch (err) {
    console.error("[Share] Export fehlgeschlagen", err);
    toast.error("Daten konnten nicht exportiert werden.");
    return;
  }

  const filename = `psm-mobil-${timestampSlug()}.json`;
  const blob = new Blob([json], { type: "application/json" });
  const file = new File([blob], filename, { type: "application/json" });

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
        text: "Pflanzenschutz-Erfassung (JSON) – am Desktop über Import/Merge einspielen.",
      });
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
    toast.info("Datei wurde heruntergeladen.");
  } catch (err) {
    console.error("[Share] Download fehlgeschlagen", err);
    toast.error("Teilen wird auf diesem Gerät nicht unterstützt.");
  }
}
