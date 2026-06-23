/**
 * Bild client-seitig verkleinern/komprimieren (Canvas).
 *
 * Erzeugt ZWEI Größen aus EINEM Decode:
 *  - Vollbild (max ~1500 px, adaptive Qualität, Deckel ~360 KB) → Detailansicht/Export.
 *  - Thumbnail (max ~240 px, JPEG q~0.55, ~8–14 KB) → Galerie. So lädt die
 *    Galerie NIE das Vollbild (sonst explodiert der Speicher bei vielen Fotos).
 */
export interface CompressedImage {
  base64: string; // Vollbild, ohne data:-Präfix
  thumb: string; // Thumbnail, ohne data:-Präfix
  mime: string;
  width: number;
  height: number;
  bytes: number; // ungefähre Binärgröße des Vollbilds
}

const TARGET_BYTES = 360 * 1024; // ~360 KB Obergrenze pro Vollbild
const QUALITY_STEPS = [0.7, 0.6, 0.5, 0.42, 0.35];
const THUMB_DIM = 240;
const THUMB_QUALITY = 0.55;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Bild konnte nicht geladen werden"));
    img.src = src;
  });
}

function drawScaled(
  img: HTMLImageElement,
  maxDim: number,
): { canvas: HTMLCanvasElement; width: number; height: number } {
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;
  const longest = Math.max(width, height);
  if (longest > maxDim) {
    const scale = maxDim / longest;
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas-Kontext nicht verfügbar");
  ctx.drawImage(img, 0, 0, width, height);
  return { canvas, width, height };
}

function toBase64(canvas: HTMLCanvasElement, quality: number): string {
  return (canvas.toDataURL("image/jpeg", quality).split(",")[1] || "");
}

function makeThumb(img: HTMLImageElement): string {
  const { canvas } = drawScaled(img, THUMB_DIM);
  return toBase64(canvas, THUMB_QUALITY);
}

export async function compressImage(
  file: File,
  maxDim = 1500,
): Promise<CompressedImage> {
  const dataUrl = await readAsDataUrl(file);
  const img = await loadImage(dataUrl);
  const { canvas, width, height } = drawScaled(img, maxDim);

  // Vollbild: Qualität senken, bis klein genug (oder Minimum erreicht).
  let base64 = "";
  for (const q of QUALITY_STEPS) {
    base64 = toBase64(canvas, q);
    if (Math.round((base64.length * 3) / 4) <= TARGET_BYTES) break;
  }
  const thumb = makeThumb(img);
  const bytes = Math.round((base64.length * 3) / 4);
  return { base64, thumb, mime: "image/jpeg", width, height, bytes };
}

/** Thumbnail aus vorhandenem Vollbild-base64 erzeugen (Backfill für Altbestand). */
export async function thumbnailFromBase64(
  base64: string,
  mime = "image/jpeg",
): Promise<string> {
  const img = await loadImage(fotoDataUrl(base64, mime));
  return makeThumb(img);
}

export function fotoDataUrl(base64: string, mime = "image/jpeg"): string {
  return `data:${mime};base64,${base64}`;
}
