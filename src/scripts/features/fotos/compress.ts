/**
 * Bild client-seitig verkleinern/komprimieren (Canvas) – Details bleiben
 * erkennbar (Standard ~1600 px lange Kante, JPEG-Qualität ~0.72), aber die
 * Datei wird klein genug für DB-Speicherung/Teilen (~200–500 KB).
 */
export interface CompressedImage {
  base64: string; // ohne data:-Präfix
  mime: string;
  width: number;
  height: number;
  bytes: number; // ungefähre Binärgröße
}

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

// Ziel: kleine, aber erkennbare Bilder. Detailreiche Pflanzen-/Grasfotos
// werden bei fester Qualität sonst 0,6–0,9 MB groß. Darum ADAPTIV: zuerst
// verkleinern, dann Qualität schrittweise senken, bis unter dem Deckel.
const TARGET_BYTES = 360 * 1024; // ~360 KB Obergrenze pro Foto
const QUALITY_STEPS = [0.7, 0.6, 0.5, 0.42, 0.35];

function canvasBytes(canvas: HTMLCanvasElement, quality: number): string {
  const outUrl = canvas.toDataURL("image/jpeg", quality);
  return outUrl.split(",")[1] || "";
}

export async function compressImage(
  file: File,
  maxDim = 1500,
): Promise<CompressedImage> {
  const dataUrl = await readAsDataUrl(file);
  const img = await loadImage(dataUrl);
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
  if (!ctx) {
    throw new Error("Canvas-Kontext nicht verfügbar");
  }
  ctx.drawImage(img, 0, 0, width, height);

  // Qualität senken, bis das Bild klein genug ist (oder Minimum erreicht).
  let base64 = "";
  for (const q of QUALITY_STEPS) {
    base64 = canvasBytes(canvas, q);
    const size = Math.round((base64.length * 3) / 4);
    if (size <= TARGET_BYTES) break;
  }
  const bytes = Math.round((base64.length * 3) / 4);
  return { base64, mime: "image/jpeg", width, height, bytes };
}

export function fotoDataUrl(base64: string, mime = "image/jpeg"): string {
  return `data:${mime};base64,${base64}`;
}
