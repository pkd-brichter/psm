/**
 * Fotos-Feature: moderne, langzeit-taugliche Galerie (Desktop + Mobil aus EINER
 * Logik). Aufnehmen/kategorisieren/senden bleibt schnell; zusätzlich:
 *  - echte Thumbnails (Galerie lädt NIE das Vollbild → kein Speicher-Explodieren)
 *  - Datums-Gruppierung mit Abschnitts-Überschriften (Heute/Gestern/…)
 *  - Sortier-Umschalter (neueste/älteste)
 *  - Suche + Mehrfachauswahl + Bulk (Löschen/Teilen/Kategorie) [nur archiveMode]
 *  - sinnvolle Titel statt UUID/"image"
 *  - Backfill: Altbestand/Importe ohne Thumbnail werden beim Anzeigen nachgezogen
 */
import {
  listFotos,
  appendFoto,
  getFotoData,
  deleteFoto,
  deleteFotosByIds,
  bulkUpdateFotoKategorie,
  exportFotosByIds,
  updateFoto,
  setFotoThumb,
  getFotoCounts,
  persistSqliteDatabaseFile,
  type FotoMeta,
} from "@scripts/core/storage/sqlite";
import { toast } from "@scripts/core/toast";
import { escapeHtml } from "@scripts/core/utils";
import { t, getLang } from "@scripts/core/i18n";
import { zipSync, strToU8 } from "fflate";
import { compressImage, fotoDataUrl, thumbnailFromBase64 } from "./compress";

interface FotoServices {
  state?: { getState: () => any };
  events?: {
    subscribe?: (name: string, handler: (payload?: unknown) => void) => void;
  };
}

interface InitFotosOptions {
  compact?: boolean;
  /** Archiv-Modus (Desktop): Suche + Mehrfachauswahl + Bulk-Aktionen anzeigen. */
  archiveMode?: boolean;
  getContext?: () => {
    standort?: string | null;
    kultur?: string | null;
    entryUuid?: string | null;
    kategorie?: string | null;
  };
  /** Mobil: schlanke, aufnahme-zuerst Oberfläche (Aufnahme-Karte + Galerie). */
  mobile?: boolean;
}

const GRUPPEN: { key: string; label: string }[] = [
  { key: "pflanzenschutz", label: "Pflanzenschutz" },
  { key: "betrieb", label: "Betrieb" },
];
const KATEGORIEN: { key: string; label: string; group: string }[] = [
  { key: "kultur", label: "Kultur-Dokumentation", group: "pflanzenschutz" },
  { key: "nachweis", label: "Flächennutzungs-Nachweis", group: "pflanzenschutz" },
  { key: "schaden", label: "Schaden / Krankheit", group: "pflanzenschutz" },
  { key: "werkstatt", label: "Werkstatt & Fahrzeuge", group: "betrieb" },
  { key: "werkzeug", label: "Werkzeuge & Geräte", group: "betrieb" },
  { key: "material", label: "Ersatzteile / Material", group: "betrieb" },
  { key: "lieferung", label: "Lieferung / Wareneingang", group: "betrieb" },
  { key: "sonstiges", label: "Sonstiges", group: "betrieb" },
];

function kategorieLabel(key: string | null | undefined): string {
  if (!key) return "";
  return t(KATEGORIEN.find((k) => k.key === key)?.label || key);
}

function buildKatOptions(selected: string | null | undefined): string {
  return GRUPPEN.map((g) => {
    const opts = KATEGORIEN.filter((k) => k.group === g.key)
      .map(
        (k) =>
          `<option value="${k.key}"${
            k.key === selected ? " selected" : ""
          }>${escapeHtml(t(k.label))}</option>`,
      )
      .join("");
    return `<optgroup label="${escapeHtml(t(g.label))}">${opts}</optgroup>`;
  }).join("");
}

function chipHtml(key: string, label: string, activeKey: string): string {
  const active = key === activeKey ? " is-active" : "";
  return `<button type="button" class="fotos-chip${active}" data-filter="${key}">${escapeHtml(
    t(label),
  )}</button>`;
}

/**
 * Filter-Chips. `flat` = eine einzige (horizontal scrollbare) Reihe ohne
 * Gruppen-Überschriften – für die schlanke Mobil-Galerie. Sonst nach Gruppen.
 */
function buildFilterChips(activeKey: string, flat = false): string {
  const allChip = chipHtml("", "Alle", activeKey);
  if (flat) {
    return allChip + KATEGORIEN.map((k) => chipHtml(k.key, k.label, activeKey)).join("");
  }
  const groups = GRUPPEN.map((g) => {
    const chips = KATEGORIEN.filter((k) => k.group === g.key)
      .map((k) => chipHtml(k.key, k.label, activeKey))
      .join("");
    return `<div class="fotos-filtergroup"><span class="fotos-filtercap">${escapeHtml(
      t(g.label),
    )}</span>${chips}</div>`;
  }).join("");
  return allChip + groups;
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
const SORT_KEY = "psm-foto-sort";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** UUID/"image"/"IMG_1234" sind keine sinnvollen Titel. */
function isUselessTitle(title: string | null | undefined): boolean {
  const s = (title || "").trim();
  if (!s) return true;
  return UUID_RE.test(s) || /^image$/i.test(s) || /^IMG[_-]?\d+$/i.test(s);
}

function localeTag(): string {
  return getLang() === "pl" ? "pl-PL" : "de-DE";
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso || "";
  return d.toLocaleDateString(localeTag(), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function fmtTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString(localeTag(), { hour: "2-digit", minute: "2-digit" });
}

function fmtWhen(iso: string): string {
  return `${fmtDate(iso)} ${fmtTime(iso)}`.trim();
}

/** Sprechender Anzeige-Name: echter Titel, sonst aus Kategorie/Kultur/Ort + Datum. */
function displayName(f: FotoMeta): string {
  if (!isUselessTitle(f.titel)) return f.titel!.trim();
  const parts = [kategorieLabel(f.kategorie), f.kultur, f.standort]
    .map((p) => (p || "").trim())
    .filter(Boolean);
  const base = parts.join(" · ") || t("Ohne Titel");
  return `${base} · ${fmtDate(f.createdAt)}`;
}

function fmtSize(bytes: number): string {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

/** Datums-Bucket-Schlüssel (Heute/Gestern/Diese Woche/YYYY-MM). */
function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}
function bucketFor(iso: string): { key: string; label: string } {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { key: "unbekannt", label: "—" };
  const today = startOfDay(new Date());
  const day = startOfDay(d);
  const diffDays = Math.round((today - day) / 86400000);
  if (diffDays <= 0) return { key: "today", label: t("Heute") };
  if (diffDays === 1) return { key: "yesterday", label: t("Gestern") };
  if (diffDays < 7) return { key: "week", label: t("Diese Woche") };
  const label = d.toLocaleDateString(localeTag(), { month: "long", year: "numeric" });
  return { key: `${d.getFullYear()}-${d.getMonth()}`, label };
}

function base64ToFile(base64: string, mime: string, name: string): File {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new File([bytes], name, { type: mime || "image/jpeg" });
}
function base64ToBytes(base64: string): Uint8Array {
  const bin = atob(base64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export function initFotos(
  container: Element | null,
  services: FotoServices,
  options: InitFotosOptions = {},
): void {
  if (!(container instanceof HTMLElement)) return;
  const host = container;
  const archive = Boolean(options.archiveMode);
  const mobile = Boolean(options.mobile);

  let lastKat = "kultur";
  let sortDir: "desc" | "asc" = "desc";
  try {
    lastKat = localStorage.getItem(LAST_KAT_KEY) || "kultur";
    sortDir = localStorage.getItem(SORT_KEY) === "asc" ? "asc" : "desc";
  } catch {
    /* ignore */
  }

  const searchBox = archive
    ? `<input type="search" class="form-control form-control-sm fotos-search" data-role="fotos-search" placeholder="${escapeHtml(
        t("Fotos durchsuchen…"),
      )}" />`
    : "";
  const selectBtn = archive
    ? `<button type="button" class="btn btn-sm btn-psm-secondary-outline" data-role="fotos-selectmode"><i class="bi bi-check2-square"></i> ${escapeHtml(
        t("Auswählen"),
      )}</button>`
    : "";

  // Anzeige-Filter startet auf „Alle" (voller Bestand sichtbar); das Aufnahme-Ziel
  // (captureKat) bleibt die zuletzt genutzte Kategorie.
  let activeFilter = "";
  let captureKat = lastKat;
  let allItems: FotoMeta[] = [];
  let fotoMap = new Map<number, FotoMeta>();
  let dbTotal = 0;
  let dbBytes = 0;
  let dbCounts: Record<string, number> = {};
  let searchQuery = "";
  let selectMode = false;
  let renderLimit = 150; // inkrementelles Rendern (Scroll lädt mehr)
  const failedThumbs = new Set<number>();
  const selected = new Set<number>();
  const GALLERY_LOAD_CAP = 5000;

  const cameraInputHtml = `<input type="file" accept="image/*" capture="environment" hidden data-role="fotos-camera" />`;
  const galleryInputHtml = `<input type="file" accept="image/*" multiple hidden data-role="fotos-gallery-input" />`;
  const cameraBtn = (extra = "") =>
    `<label class="fotos-add btn btn-psm-primary${extra}"><i class="bi bi-camera-fill"></i> ${escapeHtml(
      t("Foto aufnehmen"),
    )}${cameraInputHtml}</label>`;
  const galleryBtn = `<label class="fotos-add btn btn-psm-secondary-outline"><i class="bi bi-images"></i> ${escapeHtml(
    t("Aus Galerie"),
  )}${galleryInputHtml}</label>`;
  // Aufnahme-Ziel-Dropdown – in BEIDEN Layouts vorhanden; Chips sind reiner Filter.
  const captureSelect = (cls = "") =>
    `<select class="form-select ${cls}" data-role="fotos-capture-kat">${buildKatOptions(captureKat)}</select>`;
  const emptyHtml = `<div class="fotos-empty" data-role="fotos-empty">${escapeHtml(
    t('Noch keine Fotos. Kategorie wählen und „Foto aufnehmen".'),
  )}</div>`;

  if (mobile) {
    // Aufnahme-zuerst: eine klare „Aufnahme-Karte" (Kategorie-Auswahl + große
    // Buttons) ganz oben; Galerie + Filter deutlich darunter abgesetzt.
    host.innerHTML = `
    <div class="fotos-wrap fotos-wrap--mobile">
      <div class="fotos-capture">
        <label class="fotos-capture-cat">
          <span>${escapeHtml(t("Kategorie für neue Fotos"))}</span>
          ${captureSelect()}
        </label>
        <div class="fotos-capture-actions">
          ${cameraBtn(" fotos-add-hero")}
          ${galleryBtn}
        </div>
        <span class="fotos-hint" data-role="fotos-status"></span>
      </div>
      <div class="fotos-galhead" data-role="fotos-galhead" hidden>
        <span class="fotos-galhead-title">${escapeHtml(t("Galerie"))}</span>
        <span class="fotos-count" data-role="fotos-count"></span>
        <span class="fotos-controls-spacer"></span>
        <button type="button" class="fotos-sort" data-role="fotos-sort" title="${escapeHtml(
          t("Sortierung umschalten"),
        )}"></button>
      </div>
      <div class="fotos-filter fotos-filter--scroll" data-role="fotos-filter" hidden>${buildFilterChips(
        activeFilter,
        true,
      )}</div>
      <div class="fotos-gallery" data-role="fotos-gallery"></div>
      ${emptyHtml}
    </div>`;
  } else {
    // Desktop: aufgeräumte Toolbar – Aufnahme (links) klar getrennt von
    // Stöbern/Steuerung (rechts); Filter-Chips als eigene „Browse"-Zeile mit Zähler.
    host.innerHTML = `
    <div class="fotos-wrap fotos-wrap--desktop">
      <div class="fotos-toolbar">
        <div class="fotos-toolbar-capture">
          ${cameraBtn()}
          ${galleryBtn}
          <label class="fotos-katpick">${escapeHtml(t("Neue Fotos →"))} ${captureSelect(
            "form-select-sm",
          )}</label>
          <span class="fotos-hint" data-role="fotos-status"></span>
        </div>
        <div class="fotos-toolbar-controls">
          ${searchBox}
          <button type="button" class="fotos-sort" data-role="fotos-sort" title="${escapeHtml(
            t("Sortierung umschalten"),
          )}"></button>
          ${selectBtn}
        </div>
      </div>
      <div class="fotos-browsebar">
        <div class="fotos-filter" data-role="fotos-filter">${buildFilterChips(activeFilter)}</div>
        <span class="fotos-count" data-role="fotos-count"></span>
      </div>
      <div class="fotos-bulkbar" data-role="fotos-bulkbar" hidden></div>
      <div class="fotos-gallery" data-role="fotos-gallery"></div>
      ${emptyHtml}
    </div>`;
  }

  const cameraInput = host.querySelector<HTMLInputElement>('[data-role="fotos-camera"]');
  const galleryInput = host.querySelector<HTMLInputElement>('[data-role="fotos-gallery-input"]');
  const captureKatSel = host.querySelector<HTMLSelectElement>('[data-role="fotos-capture-kat"]');
  const galheadEl = host.querySelector<HTMLElement>('[data-role="fotos-galhead"]');
  const targetEl = host.querySelector<HTMLElement>('[data-role="fotos-target"]');
  const gallery = host.querySelector<HTMLElement>('[data-role="fotos-gallery"]');
  const emptyEl = host.querySelector<HTMLElement>('[data-role="fotos-empty"]');
  const statusEl = host.querySelector<HTMLElement>('[data-role="fotos-status"]');
  const filterBar = host.querySelector<HTMLElement>('[data-role="fotos-filter"]');
  const searchEl = host.querySelector<HTMLInputElement>('[data-role="fotos-search"]');
  const sortBtn = host.querySelector<HTMLButtonElement>('[data-role="fotos-sort"]');
  const countEl = host.querySelector<HTMLElement>('[data-role="fotos-count"]');
  const selectModeBtn = host.querySelector<HTMLButtonElement>('[data-role="fotos-selectmode"]');
  const bulkBar = host.querySelector<HTMLElement>('[data-role="fotos-bulkbar"]');

  const setStatus = (msg: string) => {
    if (statusEl) statusEl.textContent = msg;
  };
  const updateTarget = () => {
    if (targetEl) targetEl.textContent = kategorieLabel(captureKat);
    if (captureKatSel && captureKatSel.value !== captureKat) {
      captureKatSel.value = captureKat;
    }
  };
  const updateSortBtn = () => {
    if (!sortBtn) return;
    const asc = sortDir === "asc";
    sortBtn.innerHTML = `<i class="bi ${asc ? "bi-sort-up" : "bi-sort-down"}"></i> ${escapeHtml(
      asc ? t("Älteste zuerst") : t("Neueste zuerst"),
    )}`;
  };
  updateTarget();
  updateSortBtn();

  // ---- Daten: filtern + sortieren + gruppieren ------------------------------
  function getFiltered(): FotoMeta[] {
    let items = activeFilter
      ? allItems.filter((f) => f.kategorie === activeFilter)
      : allItems.slice();
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      items = items.filter((f) => {
        const hay = [
          f.titel,
          f.kultur,
          f.standort,
          f.notiz,
          kategorieLabel(f.kategorie),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }
    const dir = sortDir === "asc" ? 1 : -1;
    items.sort((a, b) => {
      const ta = Date.parse(a.createdAt) || 0;
      const tb = Date.parse(b.createdAt) || 0;
      if (ta !== tb) return (ta - tb) * dir;
      return (a.id - b.id) * dir;
    });
    return items;
  }

  function buildBuckets(items: FotoMeta[]): { key: string; label: string; items: FotoMeta[] }[] {
    const map = new Map<string, { key: string; label: string; items: FotoMeta[] }>();
    for (const f of items) {
      const b = bucketFor(f.createdAt);
      if (!map.has(b.key)) map.set(b.key, { key: b.key, label: b.label, items: [] });
      map.get(b.key)!.items.push(f);
    }
    return [...map.values()];
  }

  function updateCount(shown: number): void {
    if (!countEl) return;
    const filtered = activeFilter || searchQuery.trim();
    const parts: string[] = [];
    if (filtered) {
      parts.push(`${shown} ${t("von")} ${dbTotal} ${t("Fotos")}`);
    } else {
      parts.push(`${dbTotal} ${t("Fotos")} · ${fmtSize(dbBytes)}`);
    }
    // Hinweis, falls nicht der gesamte Bestand geladen ist (sehr großes Archiv).
    if (allItems.length < dbTotal) {
      parts.push(`(${allItems.length} ${t("geladen")})`);
    }
    countEl.textContent = parts.join(" ");
  }

  // Anzahl-Badge je Kategorie-Chip (aus echten DB-Counts).
  function updateChipCounts(): void {
    if (!filterBar) return;
    filterBar.querySelectorAll<HTMLElement>(".fotos-chip[data-filter]").forEach((chip) => {
      const key = chip.dataset.filter || "";
      const n = key ? dbCounts[key] || 0 : dbTotal;
      let badge = chip.querySelector<HTMLElement>(".fotos-chip-n");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "fotos-chip-n";
        chip.appendChild(document.createTextNode(" "));
        chip.appendChild(badge);
      }
      badge.textContent = n ? String(n) : "";
      chip.classList.toggle("fotos-chip-empty", !n && !!key);
    });
  }

  // ---- Thumbnails setzen + Backfill für fehlende (Altbestand/Importe) -------
  // Vorhandene Thumbnails (~10 KB) werden direkt gesetzt – NIE das Vollbild.
  // Fehlende werden gebatcht (max 3 parallel) aus dem Vollbild erzeugt und
  // einmalig in die DB zurückgeschrieben.
  // Nur SICHTBARE/gerenderte Kacheln ohne Thumb werden hier eingereiht (kein
  // Massen-Backfill). Persist wird stark debounced – sonst würde JEDES Thumb die
  // KOMPLETTE DB-Binärdatei neu schreiben.
  const backfillQueue: { id: number; img: HTMLImageElement }[] = [];
  let backfillActive = 0;
  let persistTimer: ReturnType<typeof setTimeout> | null = null;

  function scheduleBackfillPersist(): void {
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
      persistTimer = null;
      void persistSqliteDatabaseFile().catch(() => undefined);
    }, 2500);
  }

  function pumpBackfill(): void {
    while (backfillActive < 2 && backfillQueue.length) {
      const job = backfillQueue.shift()!;
      if (!job.img.isConnected || failedThumbs.has(job.id)) continue;
      backfillActive += 1;
      void (async () => {
        try {
          const full = await getFotoData(job.id);
          if (full?.data) {
            const thumb = await thumbnailFromBase64(full.data, full.mime);
            if (job.img.isConnected) job.img.src = fotoDataUrl(thumb);
            const item = fotoMap.get(job.id);
            if (item) item.thumb = thumb;
            await setFotoThumb(job.id, thumb).catch(() => undefined);
            scheduleBackfillPersist();
          } else {
            failedThumbs.add(job.id);
          }
        } catch {
          failedThumbs.add(job.id); // dauerhaft fehlerhaftes Bild nicht endlos retryen
        } finally {
          backfillActive -= 1;
          pumpBackfill();
        }
      })();
    }
  }

  function tileHtml(f: FotoMeta): string {
    const kat = kategorieLabel(f.kategorie);
    const sel = selected.has(f.id) ? " is-selected" : "";
    return `
      <button type="button" class="fotos-tile${sel}" data-foto-id="${f.id}" title="${escapeHtml(
        displayName(f),
      )}">
        <img class="fotos-tile-img" data-thumb-id="${f.id}" alt="${escapeHtml(displayName(f))}" loading="lazy" decoding="async" />
        ${kat ? `<span class="fotos-badge">${escapeHtml(kat)}</span>` : ""}
        <span class="fotos-tile-time">${escapeHtml(fmtTime(f.createdAt))}</span>
        <span class="fotos-tile-check"><i class="bi bi-check-lg"></i></span>
      </button>`;
  }

  function tilesForThumbs(): void {
    if (!gallery) return;
    backfillQueue.length = 0;
    gallery
      .querySelectorAll<HTMLImageElement>("img.fotos-tile-img")
      .forEach((img) => {
        if (img.src) return; // schon gesetzt (beim Nachladen behalten)
        const id = Number(img.dataset.thumbId);
        const item = fotoMap.get(id);
        if (item?.thumb) {
          img.src = fotoDataUrl(item.thumb);
        } else if (!failedThumbs.has(id)) {
          backfillQueue.push({ id, img });
        }
      });
    pumpBackfill();
  }

  let loadMoreObserver: IntersectionObserver | null = null;

  function renderGallery(): void {
    if (!gallery) return;
    const items = getFiltered();
    updateCount(items.length);
    updateChipCounts();
    // Mobil: Galerie-Kopf + Filter erst zeigen, wenn überhaupt Fotos da sind –
    // der Erststart bleibt so auf die Aufnahme-Karte fokussiert.
    if (mobile) {
      const hasPhotos = dbTotal > 0;
      if (galheadEl) galheadEl.hidden = !hasPhotos;
      if (filterBar) filterBar.hidden = !hasPhotos;
    }
    if (emptyEl) {
      emptyEl.style.display = items.length === 0 ? "block" : "none";
      emptyEl.textContent = !allItems.length
        ? t('Noch keine Fotos. Kategorie wählen und „Foto aufnehmen".')
        : searchQuery.trim()
          ? t("Keine Treffer für die Suche.")
          : t("Keine Fotos in dieser Kategorie.");
    }
    // Inkrementell: nur die ersten renderLimit Kacheln (Scroll lädt mehr nach).
    const visible = items.slice(0, renderLimit);
    const hasMore = items.length > visible.length;
    const buckets = buildBuckets(visible);
    gallery.innerHTML =
      buckets
        .map(
          (b) => `
        <div class="fotos-section">
          <div class="fotos-section-head">${escapeHtml(b.label)} <span>· ${b.items.length}</span></div>
          <div class="fotos-grid">${b.items.map(tileHtml).join("")}</div>
        </div>`,
        )
        .join("") +
      (hasMore ? `<div class="fotos-more" data-role="fotos-more"></div>` : "");
    tilesForThumbs();
    // Sentinel am Ende: beim Sichtwerden mehr rendern.
    loadMoreObserver?.disconnect();
    if (hasMore) {
      const sentinel = gallery.querySelector('[data-role="fotos-more"]');
      if (sentinel) {
        loadMoreObserver = new IntersectionObserver((entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            renderLimit += 150;
            renderGallery();
          }
        });
        loadMoreObserver.observe(sentinel);
      }
    }
  }

  // ---- Aufnahme -------------------------------------------------------------
  async function addFiles(files: FileList): Promise<void> {
    const ctx = options.getContext?.() || {};
    const kategorie = ctx.kategorie ?? captureKat ?? null;
    let ok = 0;
    setStatus(`${t("Verarbeitung")} … (${files.length})`);
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const c = await compressImage(file);
        await appendFoto({
          clientUuid: genUuid(),
          createdAt: new Date().toISOString(),
          entryUuid: ctx.entryUuid ?? null,
          kategorie,
          titel: null, // sinnvoller Anzeige-Name wird abgeleitet (kein UUID-Müll)
          standort: ctx.standort ?? null,
          kultur: ctx.kultur ?? null,
          device: deviceLabel() || null,
          mime: c.mime,
          width: c.width,
          height: c.height,
          bytes: c.bytes,
          data: c.base64,
          thumb: c.thumb,
        });
        ok += 1;
      } catch (err) {
        console.error("[Fotos] Hinzufügen fehlgeschlagen", err);
      }
    }
    try {
      await persistSqliteDatabaseFile();
    } catch {
      /* kein Datei-Handle (neue DB) */
    }
    setStatus("");
    if (ok) toast.success(`${ok} ${t("Foto(s) gespeichert.")}`);
    window.dispatchEvent(new CustomEvent("fotos:changed", { detail: { added: ok } }));
    await refresh();
  }

  const wireInput = (input: HTMLInputElement | null) => {
    input?.addEventListener("change", () => {
      if (input.files && input.files.length) {
        void addFiles(input.files).finally(() => {
          input.value = "";
        });
      }
    });
  };
  wireInput(cameraInput);
  wireInput(galleryInput);

  // Mobil: das Kategorie-Dropdown ist das Aufnahme-Ziel (entkoppelt vom Galerie-
  // Filter) – so ist beim Tippen auf „Foto aufnehmen" klar, wohin das Foto kommt.
  captureKatSel?.addEventListener("change", () => {
    captureKat = captureKatSel.value || captureKat;
    try {
      localStorage.setItem(LAST_KAT_KEY, captureKat);
    } catch {
      /* ignore */
    }
    updateTarget();
  });

  // ---- Kategorie-Chips (Filter + Aufnahme-Ziel) -----------------------------
  filterBar?.addEventListener("click", (event) => {
    const btn = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>(".fotos-chip");
    if (!btn) return;
    activeFilter = btn.dataset.filter || "";
    // Chips sind reiner Galerie-Filter; das Aufnahme-Ziel steuert das Kategorie-
    // Dropdown (eindeutige Trennung „Stöbern" ↔ „Aufnehmen", beide Layouts).
    filterBar
      .querySelectorAll(".fotos-chip")
      .forEach((c) => c.classList.toggle("is-active", c === btn));
    renderLimit = 150;
    renderGallery();
  });

  // ---- Suche + Sortierung ---------------------------------------------------
  let searchTimer: ReturnType<typeof setTimeout> | null = null;
  searchEl?.addEventListener("input", () => {
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuery = searchEl.value || "";
      renderLimit = 150;
      renderGallery();
    }, 150);
  });
  sortBtn?.addEventListener("click", () => {
    sortDir = sortDir === "asc" ? "desc" : "asc";
    try {
      localStorage.setItem(SORT_KEY, sortDir);
    } catch {
      /* ignore */
    }
    updateSortBtn();
    renderLimit = 150;
    renderGallery();
  });

  // ---- Mehrfachauswahl + Bulk (nur archiveMode) -----------------------------
  function setSelectMode(on: boolean): void {
    selectMode = on;
    selected.clear();
    host.classList.toggle("fotos-selecting", on);
    if (selectModeBtn) {
      selectModeBtn.innerHTML = on
        ? `<i class="bi bi-x-lg"></i> ${escapeHtml(t("Fertig"))}`
        : `<i class="bi bi-check2-square"></i> ${escapeHtml(t("Auswählen"))}`;
    }
    renderBulkBar();
    renderGallery();
  }

  function renderBulkBar(): void {
    if (!bulkBar) return;
    if (!selectMode) {
      bulkBar.hidden = true;
      bulkBar.innerHTML = "";
      return;
    }
    bulkBar.hidden = false;
    const n = selected.size;
    const katOpts = KATEGORIEN.map(
      (k) => `<option value="${k.key}">${escapeHtml(t(k.label))}</option>`,
    ).join("");
    bulkBar.innerHTML = `
      <span class="fotos-bulk-count">${n} ${escapeHtml(t("ausgewählt"))}</span>
      <button type="button" class="btn btn-sm btn-psm-secondary-outline" data-bulk="all"><i class="bi bi-check-all"></i> ${escapeHtml(
        t("Alle"),
      )}</button>
      <select class="form-select form-select-sm fotos-bulk-kat" data-bulk="kat-select" ${
        n ? "" : "disabled"
      }>
        <option value="">${escapeHtml(t("Kategorie ändern"))}</option>
        ${katOpts}
      </select>
      <button type="button" class="btn btn-sm btn-psm-secondary-outline" data-bulk="share" ${
        n ? "" : "disabled"
      }><i class="bi bi-share"></i> ${escapeHtml(t("Teilen"))}</button>
      <button type="button" class="btn btn-sm btn-psm-danger-outline" data-bulk="delete" ${
        n ? "" : "disabled"
      }><i class="bi bi-trash"></i> ${escapeHtml(t("Löschen"))}</button>`;
  }

  selectModeBtn?.addEventListener("click", () => setSelectMode(!selectMode));

  bulkBar?.addEventListener("click", async (event) => {
    const t2 = event.target as HTMLElement | null;
    const act = t2?.closest<HTMLElement>("[data-bulk]")?.dataset.bulk;
    if (!act) return;
    if (act === "all") {
      const items = getFiltered();
      const allSel = items.every((f) => selected.has(f.id));
      items.forEach((f) => (allSel ? selected.delete(f.id) : selected.add(f.id)));
      renderBulkBar();
      renderGallery();
    } else if (act === "delete") {
      if (!selected.size) return;
      if (!confirm(`${selected.size} ${t("Foto(s) endgültig löschen?")}`)) return;
      const ids = [...selected];
      try {
        const r = await deleteFotosByIds(ids);
        await persistSqliteDatabaseFile().catch(() => undefined);
        window.dispatchEvent(new CustomEvent("fotos:changed", { detail: { added: 0 } }));
        toast.info(`${r.deleted} ${t("Foto(s) gelöscht.")}`);
        setSelectMode(false);
        await refresh();
      } catch (err) {
        console.error("[Fotos] Bulk-Löschen fehlgeschlagen", err);
        toast.error(t("Löschen fehlgeschlagen."));
      }
    } else if (act === "share") {
      if (!selected.size) return;
      await shareSelected([...selected]);
    }
  });

  bulkBar?.addEventListener("change", async (event) => {
    const sel = (event.target as HTMLElement | null)?.closest<HTMLSelectElement>(
      '[data-bulk="kat-select"]',
    );
    if (!sel || !sel.value || !selected.size) return;
    const ids = [...selected];
    const kat = sel.value;
    try {
      await bulkUpdateFotoKategorie(ids, kat);
      await persistSqliteDatabaseFile().catch(() => undefined);
      window.dispatchEvent(new CustomEvent("fotos:changed", { detail: { added: 0 } }));
      toast.success(t("Kategorie geändert."));
      setSelectMode(false);
      await refresh();
    } catch (err) {
      console.error("[Fotos] Bulk-Kategorie fehlgeschlagen", err);
      toast.error(t("Speichern fehlgeschlagen."));
    }
  });

  async function shareSelected(ids: number[]): Promise<void> {
    try {
      const fotos = (await exportFotosByIds(ids)).items || [];
      if (!fotos.length) return;
      const files: Record<string, Uint8Array | [Uint8Array, { level: 0 }]> = {};
      const metaList = fotos.map((f: any, i: number) => {
        const name = `fotos/${(f.clientUuid || `foto-${i + 1}`).replace(/[^a-zA-Z0-9._-]/g, "_")}.jpg`;
        if (f.data) files[name] = [base64ToBytes(String(f.data)), { level: 0 }];
        const { data, ...rest } = f;
        return { ...rest, file: name };
      });
      files["pflanzenschutz.json"] = strToU8(JSON.stringify({ fotos: metaList }, null, 2));
      const zipped = zipSync(files);
      const ab = zipped.buffer.slice(
        zipped.byteOffset,
        zipped.byteOffset + zipped.byteLength,
      ) as ArrayBuffer;
      const blob = new Blob([ab], { type: "application/zip" });
      const fname = `psm-fotos-auswahl-${ids.length}.zip`;
      const file = new File([blob], fname, { type: "application/zip" });
      const nav = navigator as Navigator & {
        canShare?: (d?: any) => boolean;
        share?: (d?: any) => Promise<void>;
      };
      if (
        typeof nav.share === "function" &&
        (typeof nav.canShare !== "function" || nav.canShare({ files: [file] }))
      ) {
        await nav.share({ files: [file], title: "PSM-Fotos" });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fname;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
      console.error("[Fotos] Auswahl teilen fehlgeschlagen", err);
      toast.error(t("Teilen nicht möglich."));
    }
  }

  // ---- Kachel-Klick: Auswahl umschalten ODER Detail öffnen ------------------
  gallery?.addEventListener("click", (event) => {
    const tile = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      ".fotos-tile[data-foto-id]",
    );
    if (!tile) return;
    const id = Number(tile.dataset.fotoId);
    if (selectMode) {
      if (selected.has(id)) selected.delete(id);
      else selected.add(id);
      tile.classList.toggle("is-selected", selected.has(id));
      renderBulkBar();
    } else {
      void openViewer(id);
    }
  });

  // ---- Detail / Lightbox ----------------------------------------------------
  async function openViewer(id: number): Promise<void> {
    const meta = fotoMap.get(id);
    let dataUrl = "";
    let base64 = "";
    let mime = "image/jpeg";
    try {
      const d = await getFotoData(id);
      if (!d?.data) {
        toast.error(t("Foto nicht gefunden."));
        return;
      }
      base64 = d.data;
      mime = d.mime || "image/jpeg";
      dataUrl = fotoDataUrl(base64, mime);
    } catch {
      toast.error(t("Foto konnte nicht geladen werden."));
      return;
    }

    const katSelect = buildKatOptions(meta?.kategorie);
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
          <span><i class="bi bi-image"></i> ${escapeHtml(displayName(meta || ({} as FotoMeta)))}</span>
          <button type="button" class="fotos-modal-x" data-act="close" aria-label="${escapeHtml(
            t("Schließen"),
          )}"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="fotos-modal-body">
          <div class="fotos-modal-img">
            <button type="button" class="fotos-nav fotos-nav-prev" data-act="prev" aria-label="${escapeHtml(t("Zurück"))}"><i class="bi bi-chevron-left"></i></button>
            <img src="${dataUrl}" alt="Foto" />
            <button type="button" class="fotos-nav fotos-nav-next" data-act="next" aria-label="${escapeHtml(t("Weiter"))}"><i class="bi bi-chevron-right"></i></button>
          </div>
          <div class="fotos-modal-created">
            <i class="bi bi-clock"></i> ${escapeHtml(fmtWhen(meta?.createdAt || ""))}${
              meta?.device ? " · " + escapeHtml(meta.device) : ""
            }
          </div>
          <div class="fotos-form">
            <label class="fotos-field">
              <span>${escapeHtml(t("Titel / Beschreibung"))}</span>
              <input type="text" class="form-control" data-f="titel" value="${escapeHtml(
                isUselessTitle(meta?.titel) ? "" : meta?.titel || "",
              )}" placeholder="${escapeHtml(t("z. B. Tomaten Gewächshaus 2, Reihe 4"))}" />
            </label>
            <label class="fotos-field">
              <span>${escapeHtml(t("Zweck"))}</span>
              <select class="form-select" data-f="kategorie">${katSelect}</select>
            </label>
            <div class="fotos-field-row">
              <label class="fotos-field">
                <span>${escapeHtml(t("Kultur"))}</span>
                <input type="text" class="form-control" data-f="kultur" value="${escapeHtml(
                  meta?.kultur || "",
                )}" placeholder="${escapeHtml(t("z. B. Tomate"))}" />
              </label>
              <label class="fotos-field">
                <span>${escapeHtml(t("Standort / Fläche"))}</span>
                <input type="text" class="form-control" data-f="standort" value="${escapeHtml(
                  meta?.standort || "",
                )}" placeholder="${escapeHtml(t("z. B. GWH 2 / Acker Nord"))}" />
              </label>
            </div>
            <label class="fotos-field">
              <span>${escapeHtml(t("Notiz"))}</span>
              <textarea class="form-control" rows="2" data-f="notiz" placeholder="${escapeHtml(
                t("Optionale Anmerkung …"),
              )}">${escapeHtml(meta?.notiz || "")}</textarea>
            </label>
            <div class="fotos-gps">
              <button type="button" class="btn btn-sm btn-psm-secondary-outline" data-act="gps">
                <i class="bi bi-geo-alt"></i> ${escapeHtml(t("Standort erfassen"))}
              </button>
              <span class="fotos-gps-val" data-role="gps-val">${
                gpsText
                  ? `<a href="https://www.openstreetmap.org/?mlat=${meta!.gpsLatitude}&mlon=${meta!.gpsLongitude}#map=17/${meta!.gpsLatitude}/${meta!.gpsLongitude}" target="_blank" rel="noopener"><i class="bi bi-pin-map"></i> ${escapeHtml(
                      gpsText,
                    )}</a>`
                  : `<span class="text-muted">${escapeHtml(t("kein Standort"))}</span>`
              }</span>
            </div>
          </div>
        </div>
        <div class="fotos-modal-foot">
          <button type="button" class="btn btn-psm-primary" data-act="save"><i class="bi bi-check-lg"></i> ${escapeHtml(
            t("Speichern"),
          )}</button>
          <button type="button" class="btn btn-psm-secondary-outline" data-act="share"><i class="bi bi-share"></i> ${escapeHtml(
            t("Teilen"),
          )}</button>
          <a class="btn btn-psm-secondary-outline" href="${dataUrl}" download="foto-${id}.jpg"><i class="bi bi-download"></i> ${escapeHtml(
            t("Download"),
          )}</a>
          <button type="button" class="btn btn-psm-danger-outline" data-act="del"><i class="bi bi-trash"></i> ${escapeHtml(
            t("Löschen"),
          )}</button>
        </div>
      </div>`;

    // Blättern zwischen Fotos (in aktueller Filter-/Sortier-Reihenfolge).
    const navList = getFiltered();
    const curIdx = navList.findIndex((f) => f.id === id);
    const goto = (delta: number) => {
      const next = navList[curIdx + delta];
      if (next) {
        close();
        void openViewer(next.id);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goto(-1);
      else if (e.key === "ArrowRight") goto(1);
    };
    document.addEventListener("keydown", onKey);
    const close = () => {
      document.removeEventListener("keydown", onKey);
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
    const saveMeta = async (): Promise<void> => {
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
        window.dispatchEvent(new CustomEvent("fotos:changed", { detail: { added: 0 } }));
        await refresh();
        toast.success(t("Foto gespeichert."));
      } catch (err) {
        console.error("[Fotos] Speichern fehlgeschlagen", err);
        toast.error(t("Speichern fehlgeschlagen."));
      }
    };

    modal.addEventListener("click", async (ev) => {
      const tgt = ev.target as HTMLElement | null;
      if (tgt?.closest('[data-act="close"]')) {
        close();
      } else if (tgt?.closest('[data-act="prev"]')) {
        goto(-1);
      } else if (tgt?.closest('[data-act="next"]')) {
        goto(1);
      } else if (tgt?.closest('[data-act="save"]')) {
        await saveMeta();
        close();
      } else if (tgt?.closest('[data-act="gps"]')) {
        if (!navigator.geolocation) {
          toast.error(t("Standort wird nicht unterstützt."));
          return;
        }
        if (gpsValEl) gpsValEl.innerHTML = `<span class='text-muted'>${escapeHtml(t("Erfasse …"))}</span>`;
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            gpsLat = pos.coords.latitude;
            gpsLng = pos.coords.longitude;
            if (gpsValEl) {
              gpsValEl.innerHTML = `<a href="https://www.openstreetmap.org/?mlat=${gpsLat}&mlon=${gpsLng}#map=17/${gpsLat}/${gpsLng}" target="_blank" rel="noopener"><i class="bi bi-pin-map"></i> ${gpsLat!.toFixed(
                5,
              )}, ${gpsLng!.toFixed(5)}</a>`;
            }
            toast.info(t("Standort erfasst – mit „Speichern“ sichern."));
          },
          () => {
            toast.error(t("Standort konnte nicht erfasst werden."));
            if (gpsValEl)
              gpsValEl.innerHTML = `<span class="text-muted">${escapeHtml(t("kein Standort"))}</span>`;
          },
          { enableHighAccuracy: true, timeout: 10000 },
        );
      } else if (tgt?.closest('[data-act="share"]')) {
        const titel = readField("titel") || displayName(meta || ({} as FotoMeta)) || `foto-${id}`;
        // Nur pfad-unsichere Zeichen entfernen (polnische/deutsche Diakritika bleiben).
        const fname = (titel.replace(/[\\/:*?"<>|]+/g, "").trim() || `foto-${id}`) + ".jpg";
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
            if ((err as DOMException)?.name !== "AbortError") toast.error(t("Teilen nicht möglich."));
          }
        } else {
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = fname;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      } else if (tgt?.closest('[data-act="del"]')) {
        if (!confirm(t("Foto wirklich löschen?"))) return;
        try {
          await deleteFoto(id);
          await persistSqliteDatabaseFile().catch(() => undefined);
          window.dispatchEvent(new CustomEvent("fotos:changed", { detail: { added: 0 } }));
          close();
          await refresh();
          toast.info(t("Foto gelöscht."));
        } catch (err) {
          console.error("[Fotos] Löschen fehlgeschlagen", err);
          toast.error(t("Löschen fehlgeschlagen."));
        }
      }
    });
    document.body.appendChild(modal);
    document.body.classList.add("fotos-modal-open");
  }

  // ---- Laden (serialisiert: verhindert Render-Race/Clobber) -----------------
  let refreshing = false;
  let refreshPending = false;
  async function refresh(): Promise<void> {
    if (refreshing) {
      refreshPending = true;
      return;
    }
    refreshing = true;
    try {
      const [res, counts] = await Promise.all([
        listFotos(GALLERY_LOAD_CAP),
        getFotoCounts().catch(() => null),
      ]);
      allItems = res.items || [];
      fotoMap = new Map(allItems.map((f) => [f.id, f]));
      if (counts) {
        dbCounts = counts.counts || {};
        dbTotal = counts.total || allItems.length;
        dbBytes = counts.totalBytes || 0;
      } else {
        dbTotal = allItems.length;
        dbBytes = allItems.reduce((s, f) => s + (f.bytes || 0), 0);
      }
    } catch (err) {
      console.warn("[Fotos] Laden fehlgeschlagen", err);
      allItems = [];
      fotoMap = new Map();
      dbTotal = 0;
      dbBytes = 0;
      dbCounts = {};
    }
    renderGallery();
    refreshing = false;
    if (refreshPending) {
      refreshPending = false;
      await refresh();
    }
  }

  window.addEventListener("fotos:changed", () => void refresh());
  services.events?.subscribe?.("database:connected", () => void refresh());
  // Sprachwechsel: t()-gebaute Texte (Zähler/Sortier-Label/Monats-Buckets) neu erzeugen.
  window.addEventListener("i18n:changed", () => {
    updateSortBtn();
    updateTarget();
    if (selectMode) renderBulkBar();
    renderGallery();
  });
  void refresh();
}
