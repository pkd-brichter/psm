/**
 * Fotos-Feature (generisch, nicht nur Kulturen): Bilder per Kamera/Datei
 * aufnehmen, komprimiert in der DB speichern, ansehen, löschen. Funktioniert
 * auf Desktop und Mobile. Mergebar über client_uuid (siehe Worker appendFoto).
 */
import {
  listFotos,
  appendFoto,
  getFotoData,
  deleteFoto,
  persistSqliteDatabaseFile,
  type FotoMeta,
} from "@scripts/core/storage/sqlite";
import { toast } from "@scripts/core/toast";
import { escapeHtml } from "@scripts/core/utils";
import { compressImage, fotoDataUrl } from "./compress";

interface FotoServices {
  state?: { getState: () => any };
}

interface InitFotosOptions {
  compact?: boolean;
  /** Liefert Kontext (Standort/Kultur/Eintrag) für neue Fotos. */
  getContext?: () => {
    standort?: string | null;
    kultur?: string | null;
    entryUuid?: string | null;
    kategorie?: string | null;
  };
}

function genUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `foto_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function deviceLabel(): string {
  try {
    return localStorage.getItem("psm-device-label") || "";
  } catch {
    return "";
  }
}

function fmtWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso || "";
  return d.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function initFotos(
  container: Element | null,
  _services: FotoServices,
  options: InitFotosOptions = {},
): void {
  if (!(container instanceof HTMLElement)) return;
  const host = container;
  host.innerHTML = `
    <div class="fotos-wrap">
      <div class="fotos-bar">
        <label class="fotos-add btn btn-psm-primary">
          <i class="bi bi-camera"></i> Foto aufnehmen / hinzufügen
          <input type="file" accept="image/*" capture="environment" multiple hidden data-role="fotos-input" />
        </label>
        <span class="fotos-hint" data-role="fotos-status"></span>
      </div>
      <div class="fotos-grid" data-role="fotos-grid"></div>
      <div class="fotos-empty" data-role="fotos-empty">Noch keine Fotos. Tippe oben auf „Foto aufnehmen".</div>
    </div>`;

  const input = host.querySelector<HTMLInputElement>('[data-role="fotos-input"]');
  const grid = host.querySelector<HTMLElement>('[data-role="fotos-grid"]');
  const emptyEl = host.querySelector<HTMLElement>('[data-role="fotos-empty"]');
  const statusEl = host.querySelector<HTMLElement>('[data-role="fotos-status"]');

  const setStatus = (msg: string) => {
    if (statusEl) statusEl.textContent = msg;
  };

  async function refresh(): Promise<void> {
    if (!grid) return;
    let items: FotoMeta[] = [];
    try {
      const res = await listFotos(500);
      items = res.items || [];
    } catch (err) {
      console.warn("[Fotos] Laden fehlgeschlagen", err);
    }
    if (emptyEl) emptyEl.style.display = items.length ? "none" : "block";
    grid.innerHTML = items
      .map(
        (f) => `
        <button type="button" class="fotos-card" data-foto-id="${f.id}" title="${escapeHtml(
          f.titel || ""
        )}">
          <img class="fotos-thumb" data-thumb="${f.id}" alt="${escapeHtml(f.titel || "Foto")}" />
          <span class="fotos-meta">${escapeHtml(fmtWhen(f.createdAt))}${
            f.kultur ? " · " + escapeHtml(f.kultur) : ""
          }</span>
        </button>`,
      )
      .join("");
    // Thumbnails lazy laden
    for (const f of items) {
      try {
        const d = await getFotoData(f.id);
        if (d?.data) {
          const img = grid.querySelector<HTMLImageElement>(`img[data-thumb="${f.id}"]`);
          if (img) img.src = fotoDataUrl(d.data, d.mime);
        }
      } catch {
        /* ignore single thumb */
      }
    }
  }

  async function addFiles(files: FileList): Promise<void> {
    const ctx = options.getContext?.() || {};
    let ok = 0;
    setStatus(`Verarbeite ${files.length} Foto(s) …`);
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const c = await compressImage(file);
        await appendFoto({
          clientUuid: genUuid(),
          createdAt: new Date().toISOString(),
          entryUuid: ctx.entryUuid ?? null,
          kategorie: ctx.kategorie ?? null,
          titel: file.name?.replace(/\.[^.]+$/, "") || null,
          standort: ctx.standort ?? null,
          kultur: ctx.kultur ?? null,
          device: deviceLabel() || null,
          mime: c.mime,
          width: c.width,
          height: c.height,
          bytes: c.bytes,
          data: c.base64,
        });
        ok += 1;
      } catch (err) {
        console.error("[Fotos] Hinzufügen fehlgeschlagen", err);
      }
    }
    try {
      await persistSqliteDatabaseFile();
    } catch {
      /* kein Datei-Handle (neue DB) – wird beim Speichern geschrieben */
    }
    setStatus("");
    if (ok) toast.success(`${ok} Foto(s) gespeichert.`);
    window.dispatchEvent(new CustomEvent("fotos:changed"));
    await refresh();
  }

  input?.addEventListener("change", () => {
    if (input.files && input.files.length) {
      void addFiles(input.files).finally(() => {
        input.value = "";
      });
    }
  });

  // Karte anklicken -> Vollansicht
  grid?.addEventListener("click", (event) => {
    const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      ".fotos-card[data-foto-id]",
    );
    if (card) void openViewer(Number(card.dataset.fotoId));
  });

  async function openViewer(id: number): Promise<void> {
    let dataUrl = "";
    try {
      const d = await getFotoData(id);
      if (!d?.data) {
        toast.error("Foto nicht gefunden.");
        return;
      }
      dataUrl = fotoDataUrl(d.data, d.mime);
    } catch {
      toast.error("Foto konnte nicht geladen werden.");
      return;
    }
    const modal = document.createElement("div");
    modal.className = "fotos-modal";
    modal.innerHTML = `
      <div class="fotos-modal-backdrop" data-act="close"></div>
      <div class="fotos-modal-sheet">
        <div class="fotos-modal-head">
          <span>Foto</span>
          <button type="button" class="fotos-modal-x" data-act="close" aria-label="Schließen"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="fotos-modal-body"><img src="${dataUrl}" alt="Foto" /></div>
        <div class="fotos-modal-foot">
          <a class="btn btn-psm-secondary-outline" href="${dataUrl}" download="foto-${id}.jpg"><i class="bi bi-download"></i> Speichern</a>
          <button type="button" class="btn btn-psm-danger-outline" data-act="del"><i class="bi bi-trash"></i> Löschen</button>
        </div>
      </div>`;
    const close = () => {
      modal.remove();
      document.body.classList.remove("fotos-modal-open");
    };
    modal.addEventListener("click", async (ev) => {
      const t = ev.target as HTMLElement | null;
      if (t?.closest('[data-act="close"]')) {
        close();
      } else if (t?.closest('[data-act="del"]')) {
        if (!confirm("Foto wirklich löschen?")) return;
        try {
          await deleteFoto(id);
          await persistSqliteDatabaseFile().catch(() => undefined);
          window.dispatchEvent(new CustomEvent("fotos:changed"));
          close();
          await refresh();
          toast.info("Foto gelöscht.");
        } catch (err) {
          console.error("[Fotos] Löschen fehlgeschlagen", err);
          toast.error("Löschen fehlgeschlagen.");
        }
      }
    });
    document.body.appendChild(modal);
    document.body.classList.add("fotos-modal-open");
  }

  void refresh();
}
