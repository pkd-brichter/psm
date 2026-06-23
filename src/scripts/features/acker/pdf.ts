/**
 * Acker-Planer – PDF-Export der berechneten Flächen-Details.
 *
 * Erzeugt ein echtes PDF (jsPDF, lazy geladen wie im PSM-Export) mit:
 *  - Firmenkopf (sofern hinterlegt)
 *  - je Fläche: Kennzahlen (Fläche/Beete/Beetmeter/Pflanzen) + Anbauparameter
 *  - maßstäbliche Vektor-Skizze der Fläche inkl. Beet-Streifen (druckt scharf,
 *    unabhängig von Karten-Kacheln/CORS – daher robuster als ein Karten-Screenshot)
 *  - bei mehreren Flächen eine Übersichtstabelle + Summen auf Seite 1
 *
 * Ausgabe via Web-Share-Sheet (Datei), Fallback Download – identisch zum
 * bestehenden Anwendungs-PDF.
 */

export interface AckerPdfCompany {
  name?: string;
  headline?: string;
  address?: string;
  contactEmail?: string;
}

export interface AckerPdfField {
  name: string;
  kultur?: string | null;
  standortName?: string | null;
  eppoCode?: string | null;
  color: string;
  params: {
    bedW: number;
    pathW: number;
    rowSp: number;
    inRowSp: number;
    angle: number;
  };
  areaM2: number;
  bedsCount: number;
  bedMeters: number;
  plants: number;
  /** Eckpunkte als [lat, lng]. */
  latlngs: Array<[number, number]>;
  /** Beet-Geometrien (turf-Feature/Geometry, Koordinaten [lng, lat]). */
  beds: Array<{ geo: any }>;
}

const MPD = 111320; // Meter pro Grad (Breite)

function nf(n: number, d = 0): string {
  return Number.isFinite(n)
    ? n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d })
    : "–";
}

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
  if (!m) return [34, 197, 94];
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lighten([r, g, b]: [number, number, number], amt: number): [number, number, number] {
  return [
    Math.round(r + (255 - r) * amt),
    Math.round(g + (255 - g) * amt),
    Math.round(b + (255 - b) * amt),
  ];
}

/** Ringe (je [lng,lat][]) aus einer turf-Geometrie/-Feature ziehen. */
function ringsFromGeo(geo: any): number[][][] {
  const g = geo?.geometry || geo;
  if (!g || !g.coordinates) return [];
  if (g.type === "Polygon") return g.coordinates.length ? [g.coordinates[0]] : [];
  if (g.type === "MultiPolygon")
    return g.coordinates.map((poly: any) => poly[0]).filter(Boolean);
  return [];
}

async function loadAutoTable() {
  const [{ jsPDF }, autoTableMod] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  const autoTable = (autoTableMod as any).default || (autoTableMod as any);
  return { jsPDF, autoTable };
}

/** Geschlossenen Polygonzug zeichnen (jsPDF lines mit Deltas). */
function polyPath(doc: any, pts: number[][], style: "S" | "F" | "FD"): void {
  if (pts.length < 2) return;
  const deltas: number[][] = [];
  for (let i = 1; i < pts.length; i++) {
    deltas.push([pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]]);
  }
  doc.lines(deltas, pts[0][0], pts[0][1], [1, 1], style, true);
}

/**
 * Maßstäbliche Skizze der Fläche (Umriss + Beet-Streifen) in eine Box zeichnen.
 * Gibt die ungefähren Real-Maße zurück (für eine Bildunterschrift).
 */
function drawDiagram(
  doc: any,
  fl: AckerPdfField,
  x: number,
  y: number,
  w: number,
  h: number,
): { spanX: number; spanY: number } | null {
  const outline = (fl.latlngs || []).filter(
    (p) => Number.isFinite(p?.[0]) && Number.isFinite(p?.[1]),
  );
  if (outline.length < 3) return null;

  // Alle Koordinaten (Umriss + Beete) als [lng,lat] sammeln.
  const allRings: number[][][] = [outline.map(([lat, lng]) => [lng, lat])];
  (fl.beds || []).forEach((b) => ringsFromGeo(b.geo).forEach((r) => allRings.push(r)));

  let latSum = 0,
    cnt = 0;
  allRings.forEach((r) => r.forEach(([, lat]) => { latSum += lat; cnt++; }));
  const lat0 = cnt ? latSum / cnt : 0;
  const cosLat = Math.cos((lat0 * Math.PI) / 180) || 1;
  const proj = (lng: number, lat: number): [number, number] => [lng * cosLat * MPD, lat * MPD];

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  const projRings = allRings.map((r) =>
    r.map(([lng, lat]) => {
      const [X, Y] = proj(lng, lat);
      if (X < minX) minX = X;
      if (X > maxX) maxX = X;
      if (Y < minY) minY = Y;
      if (Y > maxY) maxY = Y;
      return [X, Y];
    }),
  );
  const spanX = Math.max(1e-6, maxX - minX);
  const spanY = Math.max(1e-6, maxY - minY);
  const scale = Math.min(w / spanX, h / spanY);
  const offX = x + (w - spanX * scale) / 2;
  const offY = y + (h - spanY * scale) / 2;
  const toPdf = ([X, Y]: number[]): [number, number] => [
    offX + (X - minX) * scale,
    offY + (maxY - Y) * scale, // Y spiegeln (PDF: y wächst nach unten)
  ];

  const rgb = hexToRgb(fl.color);
  const light = lighten(rgb, 0.55);

  // Beet-Streifen füllen (hell), Umriss zuletzt zeichnen.
  doc.setLineWidth(0.1);
  doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  doc.setFillColor(light[0], light[1], light[2]);
  for (let i = 1; i < projRings.length; i++) {
    polyPath(doc, projRings[i].map(toPdf), "FD");
  }
  doc.setLineWidth(0.6);
  doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  polyPath(doc, projRings[0].map(toPdf), "S");

  return { spanX, spanY };
}

function rowsJeBeet(fl: AckerPdfField): number {
  return fl.params.rowSp > 0 ? Math.max(1, Math.floor(fl.params.bedW / fl.params.rowSp)) : 0;
}

/** Eine Fläche auf der aktuellen Seite ausgeben (ab y). */
function renderField(
  doc: any,
  autoTable: any,
  fl: AckerPdfField,
  startY: number,
  margin: number,
  pageW: number,
): void {
  const contentW = pageW - margin * 2;
  let y = startY;

  // Flächen-Titel mit Farb-Swatch.
  const rgb = hexToRgb(fl.color);
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  doc.rect(margin, y - 3.4, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20);
  doc.text(fl.name || "Fläche", margin + 6, y);
  y += 4;
  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  // Kopf-Infos (Kultur / Standort / EPPO).
  const info: Array<[string, string]> = [
    ["Kultur", fl.kultur || "–"],
    ["Standort", fl.standortName || "–"],
    ["EPPO-Code", fl.eppoCode || "–"],
  ];
  doc.setFontSize(10);
  const colW = contentW / 3;
  info.forEach(([label, value], i) => {
    const cx = margin + i * colW;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text(`${label}`, cx, y);
    doc.setTextColor(20);
    doc.setFont("helvetica", "bold");
    doc.text(String(value), cx, y + 5);
  });
  y += 12;

  // Kennzahlen-Tabelle.
  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [["Kennzahl", "Wert"]],
    body: [
      ["Fläche", `${nf(fl.areaM2)} m²  ·  ${nf(fl.areaM2 / 10000, 3)} ha`],
      ["Beete", nf(fl.bedsCount)],
      ["Beetmeter", `${nf(fl.bedMeters)} m`],
      ["Pflanzen (Bedarf)", nf(fl.plants)],
    ],
    styles: { fontSize: 10, cellPadding: 2.2 },
    headStyles: { fillColor: [34, 197, 94], textColor: 255 },
    columnStyles: { 0: { cellWidth: 45, textColor: 90 }, 1: { fontStyle: "bold" } },
    theme: "grid",
    tableWidth: contentW / 2 - 4,
  });

  // Parameter-Tabelle (rechts neben den Kennzahlen).
  autoTable(doc, {
    startY: y,
    margin: { left: margin + contentW / 2 + 4, right: margin },
    head: [["Anbauparameter", "Wert"]],
    body: [
      ["Bettbreite", `${nf(fl.params.bedW, 2)} m`],
      ["Wegbreite", `${nf(fl.params.pathW, 2)} m`],
      ["Reihenabstand", `${nf(fl.params.rowSp, 2)} m`],
      ["Pflanzabstand", `${nf(fl.params.inRowSp, 2)} m`],
      ["Reihen je Beet", nf(rowsJeBeet(fl))],
      ["Ausrichtung", `${nf(fl.params.angle)}°`],
    ],
    styles: { fontSize: 10, cellPadding: 2.2 },
    headStyles: { fillColor: [71, 85, 105], textColor: 255 },
    columnStyles: { 0: { cellWidth: 45, textColor: 90 }, 1: { fontStyle: "bold" } },
    theme: "grid",
    tableWidth: contentW / 2 - 4,
  });

  const afterTables =
    Math.max(
      (doc as any).lastAutoTable?.finalY || y,
      (doc as any).previousAutoTable?.finalY || y,
    ) + 10;

  // Skizze.
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20);
  doc.text("Skizze (maßstäblich)", margin, afterTables);

  const boxY = afterTables + 3;
  const boxW = contentW;
  const pageH = doc.internal.pageSize.getHeight();
  const boxH = Math.min(95, pageH - margin - boxY - 6);
  doc.setDrawColor(220);
  doc.setLineWidth(0.2);
  doc.rect(margin, boxY, boxW, boxH);
  const dims = drawDiagram(doc, fl, margin + 4, boxY + 4, boxW - 8, boxH - 8);

  if (dims) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(130);
    doc.text(
      `ca. ${nf(dims.spanX)} m × ${nf(dims.spanY)} m  ·  Beet-Streifen in Flächenfarbe`,
      margin + 2,
      boxY + boxH + 4,
    );
    doc.setTextColor(20);
  }
}

export interface AckerPdfTotals {
  areaM2: number;
  bedsCount: number;
  bedMeters: number;
  plants: number;
}

async function buildAckerPdfBlob(
  fields: AckerPdfField[],
  company: AckerPdfCompany | null,
): Promise<Blob> {
  const { jsPDF, autoTable } = await loadAutoTable();
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 14;

  const co = company || {};
  const drawHeader = (y0: number): number => {
    let y = y0;
    const title = co.headline || co.name || "";
    if (title) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(20);
      doc.text(title, margin, y);
      y += 6;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90);
    if (co.name && co.headline && co.name !== co.headline) {
      doc.text(co.name, margin, y);
      y += 4.5;
    }
    if (co.address) {
      for (const line of String(co.address).split(/\r?\n/)) {
        if (line.trim()) {
          doc.text(line.trim(), margin, y);
          y += 4.5;
        }
      }
    }
    if (co.contactEmail) {
      doc.text(co.contactEmail, margin, y);
      y += 4.5;
    }
    doc.setTextColor(20);
    return y;
  };

  let y = drawHeader(margin);

  // Titel + Datum.
  y += 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Acker-Planer – Flächenauswertung", margin, y);
  const dateStr = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  doc.setFontSize(11);
  doc.text(dateStr, pageW - margin, y, { align: "right" });
  y += 3;
  doc.setDrawColor(180);
  doc.line(margin, y, pageW - margin, y);
  y += 7;

  // Bei mehreren Flächen: Übersichtstabelle + Summen.
  if (fields.length > 1) {
    const tot: AckerPdfTotals = fields.reduce(
      (s, f) => ({
        areaM2: s.areaM2 + (f.areaM2 || 0),
        bedsCount: s.bedsCount + (f.bedsCount || 0),
        bedMeters: s.bedMeters + (f.bedMeters || 0),
        plants: s.plants + (f.plants || 0),
      }),
      { areaM2: 0, bedsCount: 0, bedMeters: 0, plants: 0 },
    );
    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [["Fläche", "Kultur", "ha", "Beete", "Beetmeter", "Pflanzen"]],
      body: fields.map((f) => [
        f.name || "–",
        f.kultur || "–",
        nf(f.areaM2 / 10000, 3),
        nf(f.bedsCount),
        `${nf(f.bedMeters)} m`,
        nf(f.plants),
      ]),
      foot: [
        [
          "Summe",
          "",
          nf(tot.areaM2 / 10000, 3),
          nf(tot.bedsCount),
          `${nf(tot.bedMeters)} m`,
          nf(tot.plants),
        ],
      ],
      styles: { fontSize: 9.5, cellPadding: 2 },
      headStyles: { fillColor: [34, 197, 94], textColor: 255 },
      footStyles: { fillColor: [226, 232, 240], textColor: 20, fontStyle: "bold" },
      theme: "grid",
    });
  }

  // Je Fläche eine eigene Seite (mit Skizze).
  fields.forEach((fl, idx) => {
    if (idx === 0 && fields.length <= 1) {
      renderField(doc, autoTable, fl, y, margin, pageW);
    } else {
      doc.addPage();
      const hy = drawHeader(margin);
      renderField(doc, autoTable, fl, hy + 4, margin, pageW);
    }
  });

  return doc.output("blob");
}

function safeFilename(title: string): string {
  return (
    title
      .replace(/[^\wäöüÄÖÜ.-]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 80) || "Acker"
  );
}

/** PDF erzeugen und teilen (Datei) bzw. herunterladen (Fallback). */
export async function exportAckerPdf(
  fields: AckerPdfField[],
  company: AckerPdfCompany | null,
  options: { title?: string } = {},
): Promise<void> {
  if (!fields.length) return;
  const blob = await buildAckerPdfBlob(fields, company);
  const title = options.title || (fields.length === 1 ? fields[0].name : "Acker-Flaechen");
  const filename = `${safeFilename(title || "Acker")}.pdf`;
  const file = new File([blob], filename, { type: "application/pdf" });

  const nav = navigator as Navigator & {
    canShare?: (data?: any) => boolean;
    share?: (data?: any) => Promise<void>;
  };
  if (
    typeof nav.share === "function" &&
    (typeof nav.canShare !== "function" || nav.canShare({ files: [file] }))
  ) {
    try {
      await nav.share({ files: [file], title });
      return;
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
      console.warn("[Acker] PDF-Share fehlgeschlagen, nutze Download", err);
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
