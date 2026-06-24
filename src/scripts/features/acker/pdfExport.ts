/**
 * PDF-Export für den Acker-Planer.
 *
 * Erzeugt ein sauberes A4-Dokument mit:
 *  - Feld-Karte als Canvas-Vektorbild (kein CORS-Problem)
 *  - Zweispaltig: Karte links, Kennzahlen rechts
 *  - Beet-Detailtabelle (jspdf-autotable)
 *  - Übersichtsseite bei mehreren Flächen
 *  - Seitenzahlen (Nachbearbeitungs-Pass)
 *  - Web Share API / Download-Fallback
 */

export interface FieldForPdf {
  name: string;
  latlngs: [number, number][];
  color: string;
  params: {
    bedW: number;
    pathW: number;
    rowSp: number;
    inRowSp: number;
    angle: number;
  };
  result?: {
    areaM2?: number;
    bedMeters?: number;
    plants?: number;
    beds?: Array<{
      geo: any;
      lenM: number;
      rows: number;
      perRow: number;
      plants: number;
      areaM2: number;
    }>;
  };
}

export interface AckerPdfOptions {
  title?: string;
  company?: { name?: string; address?: string } | null;
  /** Wenn gesetzt: nur diese eine Fläche exportieren, ohne Übersichtsseite. */
  singleField?: FieldForPdf | null;
}

// ─── Hilfsformat ──────────────────────────────────────────────────────────────

const DEG2RAD = Math.PI / 180;

function nf(n: number | undefined | null, d = 0): string {
  if (!Number.isFinite(n as number)) return "–";
  return (n as number).toLocaleString("de-DE", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}

function estPl(n: number): string {
  n = Math.round(n || 0);
  if (n <= 0) return "0";
  if (n < 100) return `≈ ${n}`;
  const step = n < 1000 ? 50 : n < 10000 ? 100 : 500;
  const r = Math.round(n / step) * step;
  return `≈ ${r.toLocaleString("de-DE")}`;
}

function safeFilename(name: string): string {
  return (
    name
      .replace(/[^\wäöüÄÖÜ.-]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 80) || "Acker"
  );
}

// ─── Geo-Projektion ──────────────────────────────────────────────────────────

function makeProjection(
  latlngs: [number, number][],
  wPx: number,
  hPx: number,
  padFraction = 0.12,
) {
  const lats = latlngs.map((p) => p[0]);
  const lngs = latlngs.map((p) => p[1]);
  const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
  const cosLat = Math.cos(centerLat * DEG2RAD);

  const toM = (lat: number, lng: number) => ({
    x: (lng - centerLng) * 111_320 * cosLat,
    y: (lat - centerLat) * 111_320,
  });

  const pts = latlngs.map(([lat, lng]) => toM(lat, lng));
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);

  let minX = Math.min(...xs), maxX = Math.max(...xs);
  let minY = Math.min(...ys), maxY = Math.max(...ys);

  const padX = Math.max((maxX - minX) * padFraction, 1);
  const padY = Math.max((maxY - minY) * padFraction, 1);
  minX -= padX; maxX += padX;
  minY -= padY; maxY += padY;

  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const scale = Math.min(wPx / spanX, hPx / spanY);

  const offX = (wPx - spanX * scale) / 2;
  const offY = (hPx - spanY * scale) / 2;

  const toXY = (lat: number, lng: number): { x: number; y: number } => {
    const m = toM(lat, lng);
    return {
      x: (m.x - minX) * scale + offX,
      y: hPx - ((m.y - minY) * scale + offY),
    };
  };

  return { toXY, pxPerM: scale };
}

// ─── Canvas-Rendering ────────────────────────────────────────────────────────

function drawNorthArrow(ctx: CanvasRenderingContext2D, x: number, y: number, r = 18) {
  ctx.save();
  ctx.translate(x, y);

  // Filled arrowhead pointing up
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r * 0.35, 0);
  ctx.lineTo(-r * 0.35, 0);
  ctx.closePath();
  ctx.fillStyle = "#222";
  ctx.fill();

  // Stem
  ctx.strokeStyle = "#222";
  ctx.lineWidth = Math.max(1.5, r * 0.09);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, r);
  ctx.stroke();

  // "N" label
  ctx.fillStyle = "#222";
  ctx.font = `bold ${Math.round(r * 0.7)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("N", 0, -r - 3);
  ctx.restore();
}

function drawScaleBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  pxPerM: number,
) {
  const niceLengths = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
  const maxBarPx = 90;
  let barM = niceLengths.find((t) => t * pxPerM <= maxBarPx) ?? niceLengths[niceLengths.length - 1];
  const barPx = barM * pxPerM;

  ctx.save();
  ctx.strokeStyle = "#222";
  ctx.fillStyle = "#222";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + barPx, y);
  ctx.stroke();

  // End ticks
  ctx.lineWidth = 1.5;
  [0, barPx].forEach((dx) => {
    ctx.beginPath();
    ctx.moveTo(x + dx, y - 4);
    ctx.lineTo(x + dx, y + 4);
    ctx.stroke();
  });

  ctx.font = "11px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(`${barM} m`, x + barPx / 2, y + 5);
  ctx.restore();
}

function bedCoords(bed: { geo: any }): [number, number][] | null {
  const geo = bed.geo;
  if (!geo) return null;
  // WASM returns GeoJSON Feature: { type: "Feature", geometry: { type: "Polygon", coordinates: [[[lng,lat],...]] } }
  const coords: number[][] | undefined = geo?.geometry?.coordinates?.[0];
  if (!coords?.length) return null;
  return coords.map(([lng, lat]: number[]) => [lat, lng] as [number, number]);
}

/** Erzeugt den Canvas-Daten-URL für eine einzelne Fläche. */
export function renderFieldToCanvas(
  field: FieldForPdf,
  wPx: number,
  hPx: number,
): string {
  const canvas = document.createElement("canvas");
  canvas.width = wPx;
  canvas.height = hPx;
  const ctx = canvas.getContext("2d")!;

  // Hintergrund
  ctx.fillStyle = "#f5f7f5";
  ctx.fillRect(0, 0, wPx, hPx);

  const latlngs = field.latlngs;
  if (!latlngs || latlngs.length < 3) {
    ctx.fillStyle = "#aaa";
    ctx.font = "13px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Keine Koordinaten", wPx / 2, hPx / 2);
    return canvas.toDataURL("image/png");
  }

  const pad = 20; // Canvas-Rand in px
  const { toXY, pxPerM } = makeProjection(latlngs, wPx - pad * 2, hPx - pad * 2);

  const pt = (lat: number, lng: number) => {
    const { x, y } = toXY(lat, lng);
    return { x: x + pad, y: y + pad };
  };

  const hexColor = field.color || "#388e3c";
  // Polygon-Füllung (transparent)
  ctx.beginPath();
  latlngs.forEach(([lat, lng], i) => {
    const { x, y } = pt(lat, lng);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = `${hexColor}28`;
  ctx.fill();

  // Beete zeichnen (alternierend hell/dunkel)
  const beds = field.result?.beds || [];
  beds.forEach((bed, idx) => {
    const coords = bedCoords(bed);
    if (!coords || coords.length < 3) return;
    ctx.beginPath();
    coords.forEach(([lat, lng], i) => {
      const { x, y } = pt(lat, lng);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = idx % 2 === 0 ? `${hexColor}cc` : `${hexColor}88`;
    ctx.fill();
  });

  // Polygon-Umriss
  ctx.beginPath();
  latlngs.forEach(([lat, lng], i) => {
    const { x, y } = pt(lat, lng);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Nordpfeil (oben rechts, Abstand vom Rand)
  drawNorthArrow(ctx, wPx - 30, 32, 18);

  // Maßstabsleiste (unten links)
  drawScaleBar(ctx, pad, hPx - 18, pxPerM);

  return canvas.toDataURL("image/png");
}

// ─── jsPDF-Laden ─────────────────────────────────────────────────────────────

async function loadJsPdf() {
  const [{ jsPDF }, autoMod] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  const autoTable = (autoMod as any).default ?? (autoMod as any);
  return { jsPDF, autoTable };
}

// ─── PDF-Seitenbausteine ─────────────────────────────────────────────────────

const MARGIN = 14;
const GREEN: [number, number, number] = [34, 139, 34];

function addCompanyHeader(
  doc: any,
  company: { name?: string; address?: string } | null,
  y: number,
): number {
  if (!company?.name) return y;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(20);
  doc.text(company.name, MARGIN, y);
  y += 5;
  if (company.address) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(110);
    for (const line of String(company.address).split(/\r?\n/)) {
      if (line.trim()) { doc.text(line.trim(), MARGIN, y); y += 3.5; }
    }
    doc.setTextColor(20);
  }
  return y + 2;
}

function addSectionTitle(doc: any, text: string, y: number): number {
  const pageW = doc.internal.pageSize.getWidth();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(20);
  doc.text(text, MARGIN, y);
  y += 4;
  doc.setDrawColor(190);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, pageW - MARGIN, y);
  return y + 6;
}

function renderFieldPage(
  doc: any,
  autoTable: any,
  field: FieldForPdf,
  title: string,
  company: { name?: string; address?: string } | null,
  firstPage: boolean,
) {
  if (!firstPage) doc.addPage();

  const pageW = doc.internal.pageSize.getWidth();
  const contentW = pageW - MARGIN * 2;
  let y = MARGIN;

  if (firstPage) y = addCompanyHeader(doc, company, y);
  y = addSectionTitle(doc, title, y);

  // Zweispaltig: Karte links (100 mm), Statistiken rechts
  const imgW = 100;
  const imgH = Math.round(imgW * 0.6); // 60 mm hoch
  const statsX = MARGIN + imgW + 7;
  const statsW = contentW - imgW - 7;

  // Canvas-Bild (600 × 360 px → gut für 100 mm breite Ausgabe)
  const dataUrl = renderFieldToCanvas(field, 600, 360);
  doc.addImage(dataUrl, "PNG", MARGIN, y, imgW, imgH);

  // Statistiken rechts
  const r = field.result ?? {};
  const beds = r.beds ?? [];
  const avgOf = (fn: (b: any) => number) =>
    beds.length ? beds.reduce((s, b) => s + (fn(b) || 0), 0) / beds.length : null;

  const statsRows: Array<[string, string] | null> = [
    ["Fläche", `${nf(r.areaM2, 0)} m²  ·  ${nf((r.areaM2 ?? 0) / 10000, 3)} ha`],
    ["Beete", nf(beds.length, 0)],
    ["Beetmeter", `${nf(r.bedMeters, 0)} m`],
    ["Pflanzen (gesch.)", estPl(r.plants ?? 0)],
    null,
    ["Beet-Breite", `${nf(field.params.bedW, 2)} m`],
    ["Weg-Breite", `${nf(field.params.pathW, 2)} m`],
    ["Reihenabstand", `${nf(field.params.rowSp, 2)} m`],
    ["Pflanzabstand", `${nf(field.params.inRowSp, 2)} m`],
    ["Winkel", `${field.params.angle}°`],
    null,
    ["Reihen/Beet (⌀)", beds.length ? nf(avgOf((b) => b.rows)!, 1) : "–"],
    ["Pfl./Reihe (⌀)", beds.length ? nf(avgOf((b) => b.perRow)!, 1) : "–"],
    ["Pfl./Beet (⌀)", beds.length ? nf(avgOf((b) => b.plants)!, 0) : "–"],
    ["Beet-Fläche (⌀)", beds.length ? `${nf(avgOf((b) => b.areaM2)!, 1)} m²` : "–"],
  ];

  let sy = y;
  doc.setFontSize(8.5);
  for (const row of statsRows) {
    if (sy > y + imgH + 4) break;
    if (row === null) {
      // Trennlinie
      sy += 2;
      doc.setDrawColor(220);
      doc.setLineWidth(0.3);
      doc.line(statsX, sy, statsX + statsW, sy);
      sy += 2;
      continue;
    }
    const [label, value] = row;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text(label + ":", statsX, sy);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(20);
    doc.text(value, statsX + statsW, sy, { align: "right" });
    sy += 5.2;
  }

  y += imgH + 7;

  // Beet-Detailtabelle
  if (beds.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text("Beet-Details", MARGIN, y);
    y += 4;

    const MAX_ROWS = 80;
    const body = beds.slice(0, MAX_ROWS).map((b: any, i: number) => [
      String(i + 1),
      nf(b.lenM, 1),
      nf(b.rows, 0),
      nf(b.perRow, 0),
      nf(b.plants, 0),
      nf(b.areaM2, 1),
    ]);
    if (beds.length > MAX_ROWS) {
      body.push(["…", "", "", "", `+ ${beds.length - MAX_ROWS} weitere`, ""]);
    }

    autoTable(doc, {
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      head: [["Nr.", "Länge (m)", "Reihen", "Pfl./Reihe", "Pflanzen", "Fläche (m²)"]],
      body,
      styles: { fontSize: 8, cellPadding: 1.8 },
      headStyles: { fillColor: GREEN, textColor: 255, fontStyle: "bold" },
      columnStyles: {
        0: { cellWidth: 12, halign: "right" as const },
        1: { cellWidth: 28 },
        2: { cellWidth: 22 },
        3: { cellWidth: 28 },
        4: { cellWidth: 28 },
        5: { cellWidth: 28 },
      },
      alternateRowStyles: { fillColor: [245, 250, 245] },
      theme: "striped",
    });
  }
}

function renderSummaryPage(
  doc: any,
  autoTable: any,
  fields: FieldForPdf[],
  company: { name?: string; address?: string } | null,
) {
  const pageW = doc.internal.pageSize.getWidth();
  let y = MARGIN;

  y = addCompanyHeader(doc, company, y);
  y = addSectionTitle(doc, "Acker-Übersicht", y);

  // Mini-Karten (2 Spalten) für einen schnellen Überblick
  const thumbW = (pageW - MARGIN * 2 - 6) / 2;
  const thumbH = Math.round(thumbW * 0.5);
  const thumbsPerRow = 2;
  const thumbFields = fields.slice(0, 6); // max. 6 Vorschaubilder

  thumbFields.forEach((f, i) => {
    const col = i % thumbsPerRow;
    const row = Math.floor(i / thumbsPerRow);
    const tx = MARGIN + col * (thumbW + 6);
    const ty = y + row * (thumbH + 14);
    const url = renderFieldToCanvas(f, Math.round(thumbW * 4), Math.round(thumbH * 4));
    doc.addImage(url, "PNG", tx, ty, thumbW, thumbH);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(80);
    doc.text(f.name || "Unbenannt", tx + thumbW / 2, ty + thumbH + 3.5, { align: "center" });
  });

  if (thumbFields.length > 0) {
    const usedRows = Math.ceil(thumbFields.length / thumbsPerRow);
    y += usedRows * (thumbH + 14) + 4;
  }

  // Übersichtstabelle
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(20);
  doc.text("Zusammenfassung", MARGIN, y);
  y += 4;

  const bodyRows = fields.map((f) => {
    const r = f.result ?? {};
    return [
      f.name || "Unbenannt",
      nf(r.areaM2, 0),
      nf(r.beds?.length ?? 0, 0),
      nf(r.bedMeters, 0),
      estPl(r.plants ?? 0),
    ];
  });

  const totArea = fields.reduce((s, f) => s + (f.result?.areaM2 ?? 0), 0);
  const totBeds = fields.reduce((s, f) => s + (f.result?.beds?.length ?? 0), 0);
  const totMeters = fields.reduce((s, f) => s + (f.result?.bedMeters ?? 0), 0);
  const totPlants = fields.reduce((s, f) => s + (f.result?.plants ?? 0), 0);

  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    head: [["Fläche", "m²", "Beete", "Beetmeter", "Pflanzen (gesch.)"]],
    body: bodyRows,
    foot: [["Gesamt", nf(totArea, 0), nf(totBeds, 0), nf(totMeters, 0), estPl(totPlants)]],
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: GREEN, textColor: 255, fontStyle: "bold" },
    footStyles: { fillColor: [230, 245, 230], fontStyle: "bold", textColor: 20 },
    showFoot: "lastPage",
    alternateRowStyles: { fillColor: [245, 250, 245] },
    theme: "striped",
  });
}

function addFooters(doc: any, label: string) {
  const n = doc.internal.getNumberOfPages();
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  for (let i = 1; i <= n; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(150);
    doc.text(label, MARGIN, pageH - 5);
    doc.text(`${i} / ${n}`, pageW - MARGIN, pageH - 5, { align: "right" });
  }
}

// ─── Öffentliche API ─────────────────────────────────────────────────────────

/**
 * Exportiert eine oder mehrere Ackerflächen als professionelles A4-PDF.
 * Enthält Kartendiagramm, Statistiken und Beet-Detailtabelle.
 */
export async function exportAckerFieldsPdf(
  fields: FieldForPdf[],
  options: AckerPdfOptions = {},
): Promise<void> {
  if (!fields.length) return;

  const { jsPDF, autoTable } = await loadJsPdf();
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const company = options.company ?? null;
  const single = options.singleField ?? (fields.length === 1 ? fields[0] : null);

  if (single) {
    const title = options.title || single.name || "Ackerfläche";
    renderFieldPage(doc, autoTable, single, title, company, true);
  } else {
    renderSummaryPage(doc, autoTable, fields, company);
    fields.forEach((f, i) => {
      renderFieldPage(doc, autoTable, f, f.name || `Fläche ${i + 1}`, company, false);
    });
  }

  const footLabel = options.title ?? (single ? single.name : "Acker-Übersicht") ?? "Acker-PDF";
  addFooters(doc, footLabel);

  const filename = `${safeFilename(footLabel)}.pdf`;
  const blob: Blob = doc.output("blob");
  const file = new File([blob], filename, { type: "application/pdf" });

  const nav = navigator as any;
  if (
    typeof nav.share === "function" &&
    (typeof nav.canShare !== "function" || nav.canShare({ files: [file] }))
  ) {
    try {
      await nav.share({ files: [file], title: footLabel });
      return;
    } catch (err) {
      if ((err as any)?.name === "AbortError") return;
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
