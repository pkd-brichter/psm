/**
 * Fotos-Feature (generisch, nicht nur Kulturen): Bilder per Kamera/Datei
 * aufnehmen, komprimiert in der DB speichern, beschriften, kategorisieren,
 * mit GPS versehen, ansehen, teilen, löschen. Funktioniert auf Desktop und
 * Mobile. Mergebar über client_uuid (siehe Worker appendFoto).
 */
import {
  listFotos,
  appendFoto,
  getFotoData,
  deleteFoto,
  updateFoto,
  persistSqliteDatabaseFile,
  type FotoMeta,
} from "@scripts/core/storage/sqlite";
import { toast } from "@scripts/core/toast";
import { escapeHtml } from "@scripts/core/utils";
import { compressImage, fotoDataUrl } from "./compress";

interface FotoServices {
  state?: { getState: () => any };
  events?: {
    subscribe?: (name: string, handler: (payload?: unknown) => void) => void;
  };
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

/** Verwendungszwecke der Fotos – steuert Filter & Badge. */
const KATEGORIEN: { key: string; label: string }[] = [
  { key: "kultur", label: "Kultur-Dokumentation" },
  { key: "nachweis", label: "Flächennutzungs-Nachweis" },
  { key: "schaden", label: "Schaden / Krankheit" },
  { key: "sonstiges", label: "Sonstiges" },
];

function kategorieLabel(key: string | null | undefined): string {
  if (!key) return "";
  return KATEGORIEN.find((k) => k.key === key)?.label || key;
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

const LAST_KAT_KEY = "psm-foto-last-kategorie";

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

/** base64 (ohne data:-Präfix) -> File für Web Share / Download. */
function base64ToFile(base64: string, mime: string, name: string): File {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new File([bytes], name, { type: mime || "image/jpeg" });
}

export function initFotos(
  container: Element | null,
  services: FotoServices,
  options: InitFotosOptions = {},
): void {
  if (!(container instanceof HTMLElement)) return;
  const host = container;

  let lastKat = "kultur";
  try {
    lastKat = localStorage.getItem(LAST_KAT_KEY) || "kultur";
  } catch {
    /* ignore */
  }

  const katOptions = KATEGORIEN.map(
    (k) =>
      `<option value="${k.key}"${k.key === lastKat ? " selected" : ""}>${escapeHtml(
        k.label,
      )}</option>`,
  ).join("");

  host.innerHTML = `
    <div class="fotos-wrap">
      <div class="fotos-bar">
        <label class="fotos-add btn btn-psm-primary">
          <i class="bi bi-camera"></i> Foto aufnehmen / hinzufügen
          <input type="file" accept="image/*" capture="environment" multiple hidden data-role="fotos-input" />
        </label>
        <label class="fotos-katpick">
          <span>Zweck</span>
          <select class="form-select form-select-sm" data-role="fotos-newkat">${katOptions}</select>
        </label>
        <span class="fotos-hint" data-role="fotos-status"></span>
      </div>
      <div class="fotos-filter" data-role="fotos-filter">
        <button type="button" class="fotos-chip is-active" data-filter="">Alle</button>
        ${KATEGORIEN.map(
          (k) =>
            `<button type="button" class="fotos-chip" data-filter="${k.key}">${escapeHtml(
              k.label,
            )}</button>`,
        ).join("")}
      </div>
      <div class="fotos-grid" data-role="fotos-grid"></div>
      <div class="fotos-empty" data-role="fotos-empty">Noch keine Fotos. Tippe oben auf „Foto aufnehmen".</div>
    </div>`;

  const input = host.querySelector<HTMLInputElement>('[data-role="fotos-input"]');
  const newKatSel = host.querySelector<HTMLSelectElement>('[data-role="fotos-newkat"]');
  const grid = host.querySelector<HTMLElement>('[data-role="fotos-grid"]');
  const emptyEl = host.querySelector<HTMLElement>('[data-role="fotos-empty"]');
  const statusEl = host.querySelector<HTMLElement>('[data-role="fotos-status"]');
  const filterBar = host.querySelector<HTMLElement>('[data-role="fotos-filter"]');

  let activeFilter = "";
  let allItems: FotoMeta[] = [];

  const setStatus = (msg: string) => {
    if (statusEl) statusEl.textContent = msg;
  };

  newKatSel?.addEventListener("change", () => {
    try {
      localStorage.setItem(LAST_KAT_KEY, newKatSel.value);
    } catch {
      /* ignore */
    }
  });

  filterBar?.addEventListener("click", (event) => {
    const btn = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>(
      ".fotos-chip",
    );
    if (!btn) return;
    activeFilter = btn.dataset.filter || "";
    filterBar
      .querySelectorAll(".fotos-chip")
      .forEach((c) => c.classList.toggle("is-active", c === btn));
    renderGrid();
  });

  function renderGrid(): void {
    if (!grid) return;
    const items = activeFilter
      ? allItems.filter((f) => f.kategorie === activeFilter)
      : allItems;
    if (emptyEl) {
      emptyEl.style.display = items.length ? "none" : "block";
      emptyEl.textContent = allItems.length
        ? "Keine Fotos in dieser Kategorie."
        : 'Noch keine Fotos. Tippe oben auf „Foto aufnehmen".';
    }
    grid.innerHTML = items
      .map((f) => {
        const kat = kategorieLabel(f.kategorie);
        const sub = [f.kultur, f.standort].filter(Boolean).join(" · ");
        return `
        <button type="button" class="fotos-card" data-foto-id="${f.id}" title="${escapeHtml(
          f.titel || "",
        )}">
          <img class="fotos-thumb" data-thumb="${f.id}" alt="${escapeHtml(f.titel || "Foto")}" />
          ${kat ? `<span class="fotos-badge">${escapeHtml(kat)}</span>` : ""}
          <span class="fotos-meta">
            ${f.titel ? `<b>${escapeHtml(f.titel)}</b>` : ""}
            <span class="fotos-meta-sub">${escapeHtml(fmtWhen(f.createdAt))}${
              sub ? " · " + escapeHtml(sub) : ""
            }</span>
          </span>
        </button>`;
      })
      .join("");
    // Thumbnails lazy laden
    for (const f of items) {
      getFotoData(f.id)
        .then((d) => {
          if (!d?.data) return;
          const img = grid.querySelector<HTMLImageElement>(`img[data-thumb="${f.id}"]`);
          if (img) img.src = fotoDataUrl(d.data, d.mime);
        })
        .catch(() => undefined);
    }
  }

  async function refresh(): Promise<void> {
    try {
      const res = await listFotos(500);
      allItems = res.items || [];
    } catch (err) {
      console.warn("[Fotos] Laden fehlgeschlagen", err);
      allItems = [];
    }
    renderGrid();
  }

  async function addFiles(files: FileList): Promise<void> {
    const ctx = options.getContext?.() || {};
    const kategorie = ctx.kategorie ?? newKatSel?.value ?? null;
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
          kategorie,
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
    // added > 0 signalisiert dem Mobile-Client „noch nicht geteilt" (Teilen-Button).
    window.dispatchEvent(new CustomEvent("fotos:changed", { detail: { added: ok } }));
    await refresh();
  }

  input?.addEventListener("change", () => {
    if (input.files && input.files.length) {
      void addFiles(input.files).finally(() => {
        input.value = "";
      });
    }
  });

  // Karte anklicken -> Detailansicht
  grid?.addEventListener("click", (event) => {
    const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      ".fotos-card[data-foto-id]",
    );
    if (card) void openViewer(Number(card.dataset.fotoId));
  });

  async function openViewer(id: number): Promise<void> {
    const meta = allItems.find((f) => f.id === id);
    let dataUrl = "";
    let base64 = "";
    let mime = "image/jpeg";
    try {
      const d = await getFotoData(id);
      if (!d?.data) {
        toast.error("Foto nicht gefunden.");
        return;
      }
      base64 = d.data;
      mime = d.mime || "image/jpeg";
      dataUrl = fotoDataUrl(base64, mime);
    } catch {
      toast.error("Foto konnte nicht geladen werden.");
      return;
    }

    const katSelect = KATEGORIEN.map(
      (k) =>
        `<option value="${k.key}"${
          meta?.kategorie === k.key ? " selected" : ""
        }>${escapeHtml(k.label)}</option>`,
    ).join("");
    const gpsText =
      meta?.gpsLatitude != null && meta?.gpsLongitude != null
        ? `${meta.gpsLatitude.toFixed(5)}, ${meta.gpsLongitude.toFixed(5)}`
        : "";

    const modal = document.createElement("div");
    modal.className = "fotos-modal";
    modal.innerHTML = `
      <div class="fotos-modal-backdrop" data-act="close"></div>
      <div class="fotos-modal-sheet">
        <div class="fotos-modal-head">
          <span><i class="bi bi-image"></i> Foto-Details</span>
          <button type="button" class="fotos-modal-x" data-act="close" aria-label="Schließen"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="fotos-modal-body">
          <div class="fotos-modal-img"><img src="${dataUrl}" alt="Foto" /></div>
          <div class="fotos-modal-created">
            <i class="bi bi-clock"></i> Erstellt am ${escapeHtml(fmtWhen(meta?.createdAt || ""))}${
              meta?.device ? " · " + escapeHtml(meta.device) : ""
            }
          </div>
          <div class="fotos-form">
            <label class="fotos-field">
              <span>Titel / Beschreibung</span>
              <input type="text" class="form-control" data-f="titel" value="${escapeHtml(
                meta?.titel || "",
              )}" placeholder="z. B. Tomaten Gewächshaus 2, Reihe 4" />
            </label>
            <label class="fotos-field">
              <span>Zweck</span>
              <select class="form-select" data-f="kategorie">${katSelect}</select>
            </label>
            <div class="fotos-field-row">
              <label class="fotos-field">
                <span>Kultur</span>
                <input type="text" class="form-control" data-f="kultur" value="${escapeHtml(
                  meta?.kultur || "",
                )}" placeholder="z. B. Tomate" />
              </label>
              <label class="fotos-field">
                <span>Standort / Fläche</span>
                <input type="text" class="form-control" data-f="standort" value="${escapeHtml(
                  meta?.standort || "",
                )}" placeholder="z. B. GWH 2 / Acker Nord" />
              </label>
            </div>
            <label class="fotos-field">
              <span>Notiz</span>
              <textarea class="form-control" rows="2" data-f="notiz" placeholder="Optionale Anmerkung …">${escapeHtml(
                meta?.notiz || "",
              )}</textarea>
            </label>
            <div class="fotos-gps">
              <button type="button" class="btn btn-sm btn-psm-secondary-outline" data-act="gps">
                <i class="bi bi-geo-alt"></i> Standort erfassen
              </button>
              <span class="fotos-gps-val" data-role="gps-val">${
                gpsText
                  ? `<a href="https://www.openstreetmap.org/?mlat=${meta!.gpsLatitude}&mlon=${meta!.gpsLongitude}#map=17/${meta!.gpsLatitude}/${meta!.gpsLongitude}" target="_blank" rel="noopener"><i class="bi bi-pin-map"></i> ${escapeHtml(
                      gpsText,
                    )}</a>`
                  : '<span class="text-muted">kein Standort</span>'
              }</span>
            </div>
          </div>
        </div>
        <div class="fotos-modal-foot">
          <button type="button" class="btn btn-psm-primary" data-act="save"><i class="bi bi-check-lg"></i> Speichern</button>
          <button type="button" class="btn btn-psm-secondary-outline" data-act="share"><i class="bi bi-share"></i> Teilen</button>
          <a class="btn btn-psm-secondary-outline" href="${dataUrl}" download="foto-${id}.jpg"><i class="bi bi-download"></i> Download</a>
          <button type="button" class="btn btn-psm-danger-outline" data-act="del"><i class="bi bi-trash"></i> Löschen</button>
        </div>
      </div>`;

    const close = () => {
      modal.remove();
      document.body.classList.remove("fotos-modal-open");
    };

    let gpsLat = meta?.gpsLatitude ?? null;
    let gpsLng = meta?.gpsLongitude ?? null;
    const gpsValEl = modal.querySelector<HTMLElement>('[data-role="gps-val"]');

    const readField = (name: string): string => {
      const el = modal.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        `[data-f="${name}"]`,
      );
      return el ? el.value.trim() : "";
    };

    const saveMeta = async (silent = false): Promise<void> => {
      try {
        await updateFoto(id, {
          titel: readField("titel") || null,
          kategorie: readField("kategorie") || null,
          kultur: readField("kultur") || null,
          standort: readField("standort") || null,
          notiz: readField("notiz") || null,
          gpsLatitude: gpsLat,
          gpsLongitude: gpsLng,
        });
        await persistSqliteDatabaseFile().catch(() => undefined);
        window.dispatchEvent(new CustomEvent("fotos:changed"));
        await refresh();
        if (!silent) toast.success("Foto gespeichert.");
      } catch (err) {
        console.error("[Fotos] Speichern fehlgeschlagen", err);
        toast.error("Speichern fehlgeschlagen.");
      }
    };

    modal.addEventListener("click", async (ev) => {
      const t = ev.target as HTMLElement | null;
      if (t?.closest('[data-act="close"]')) {
        close();
      } else if (t?.closest('[data-act="save"]')) {
        await saveMeta();
        close();
      } else if (t?.closest('[data-act="gps"]')) {
        if (!navigator.geolocation) {
          toast.error("Standort wird nicht unterstützt.");
          return;
        }
        if (gpsValEl) gpsValEl.innerHTML = "<span class='text-muted'>Erfasse …</span>";
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            gpsLat = pos.coords.latitude;
            gpsLng = pos.coords.longitude;
            if (gpsValEl) {
              gpsValEl.innerHTML = `<a href="https://www.openstreetmap.org/?mlat=${gpsLat}&mlon=${gpsLng}#map=17/${gpsLat}/${gpsLng}" target="_blank" rel="noopener"><i class="bi bi-pin-map"></i> ${gpsLat!.toFixed(
                5,
              )}, ${gpsLng!.toFixed(5)}</a>`;
            }
            toast.info("Standort erfasst – mit „Speichern“ sichern.");
          },
          (err) => {
            console.warn("[Fotos] GPS fehlgeschlagen", err);
            toast.error("Standort konnte nicht erfasst werden.");
            if (gpsValEl)
              gpsValEl.innerHTML = '<span class="text-muted">kein Standort</span>';
          },
          { enableHighAccuracy: true, timeout: 10000 },
        );
      } else if (t?.closest('[data-act="share"]')) {
        const titel = readField("titel") || `foto-${id}`;
        const fname = (titel.replace(/[^a-z0-9äöü\- ]/gi, "").trim() || `foto-${id}`) + ".jpg";
        const file = base64ToFile(base64, mime, fname);
        const nav = navigator as Navigator & {
          canShare?: (d?: any) => boolean;
          share?: (d?: any) => Promise<void>;
        };
        if (
          typeof nav.share === "function" &&
          (typeof nav.canShare !== "function" || nav.canShare({ files: [file] }))
        ) {
          try {
            await nav.share({ files: [file], title: titel });
          } catch (err) {
            if ((err as DOMException)?.name !== "AbortError") {
              console.warn("[Fotos] Teilen fehlgeschlagen", err);
              toast.error("Teilen nicht möglich.");
            }
          }
        } else {
          // Fallback: Download
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = fname;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
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

  // Aktualisieren, wenn anderswo (z. B. Import) Fotos hinzukommen
  window.addEventListener("fotos:changed", () => {
    void refresh();
  });

  // WICHTIG: Die DB ist beim Mounten oft noch NICHT verbunden (Reload, Desktop
  // beim Öffnen einer Datei). Ohne dieses Re-Refresh bliebe die Galerie leer,
  // obwohl Fotos in der DB liegen. Darum nach „database:connected" neu laden.
  services.events?.subscribe?.("database:connected", () => {
    void refresh();
  });

  void refresh();
}
