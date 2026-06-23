/**
 * Acker-Planer – PDF-Export der berechneten Flächen-Details.
 *
 * Erzeugt ein echtes PDF (jsPDF, lazy geladen wie im PSM-Export) mit:
 *  - Firmenkopf (sofern hinterlegt)
 *  - je Fläche: Luftbild der Fläche (ArcGIS World-Imagery, mit eingezeichnetem
 *    Umriss); fällt das Laden aus (offline/CORS), wird eine maßstäbliche
 *    Vektor-Skizze (Umriss + Beet-Streifen) gezeichnet.
 *  - Kennzahlen + Anbauparameter
 *  - Bedarfs-/Stückliste (Jungpflanzen inkl. Reserve, Beet-/Reihenmeter)
 *  - Beet-Detailtabelle (Länge, Reihen, Pflanzen je Beet)
 *  - bei mehreren Flächen: Übersichtstabelle + Summen auf Seite 1
 *
 * Ausgabe via Web-Share-Sheet (Datei), Fallback Download.
 */

export interface AckerPdfCompany {
  name?: string;
  headline?: string;
  address?: string;
  contactEmail?: string;
}

export interface AckerPdfBed {
  geo: any;
  lenM: number;
  rows: number;
  perRow: number;
  plants: number;
  areaM2: number;
}

export interface AckerPdfField {
  name: string;
  kultur?: string | null;
  standortName?: string | null;
  eppoCode?: string | null;
  color: string;
  params: { bedW: number; pathW: number; rowSp: number; inRowSp: number; angle: number };
  areaM2: number;
  bedsCount: number;
  bedMeters: number;
  plants: number;
  /** Eckpunkte als [lat, lng]. */
  latlngs: Array<[number, number]>;
  /** Beet-Geometrien + Kennzahlen. */
  beds: AckerPdfBed[];
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

interface FieldBbox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}
interface SatImage {
  dataUrl: string;
  bbox: FieldBbox;
  aspect: number; // Breite/Höhe der Bildpixel
}

function fieldBbox(fl: AckerPdfField, pad = 0.12): FieldBbox | null {
  const lls = (fl.latlngs || []).filter(
    (p) => Number.isFinite(p?.[0]) && Number.isFinite(p?.[1]),
  );
  if (lls.length < 3) return null;
  let minLat = Infinity,
    maxLat = -Infinity,
    minLng = Infinity,
    maxLng = -Infinity;
  lls.forEach(([lat, lng]) => {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  });
  const padLat = (maxLat - minLat) * pad + 1e-5;
  const padLng = (maxLng - minLng) * pad + 1e-5;
  return {
    minLat: minLat - padLat,
    maxLat: maxLat + padLat,
    minLng: minLng - padLng,
    maxLng: maxLng + padLng,
  };
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(blob);
  });
}

/**
 * Luftbild der Fläche als JPEG holen (ArcGIS World-Imagery Export). Liefert ein
 * einzelnes Bild für die Bounding-Box – kein Kachel-/CORS-Canvas-Problem.
 * Bei Fehler/Offline: null (Aufrufer zeichnet dann die Vektor-Skizze).
 */
async function fetchSatelliteImage(fl: AckerPdfField): Promise<SatImage | null> {
  const bb = fieldBbox(fl);
  if (!bb) return null;
  const lat0 = (bb.minLat + bb.maxLat) / 2;
  const wM = (bb.maxLng - bb.minLng) * Math.cos((lat0 * Math.PI) / 180) * MPD;
  const hM = (bb.maxLat - bb.minLat) * MPD;
  const aspect = hM > 0 ? wM / hM : 1;
  let pxW: number, pxH: number;
  if (aspect >= 1) {
    pxW = 1000;
    pxH = Math.round(1000 / aspect);
  } else {
    pxH = 1000;
    pxW = Math.round(1000 * aspect);
  }
  pxW = Math.max(240, Math.min(1200, pxW));
  pxH = Math.max(240, Math.min(1200, pxH));
  const url =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export" +
    `?bbox=${bb.minLng},${bb.minLat},${bb.maxLng},${bb.maxLat}` +
    `&bboxSR=4326&imageSR=4326&size=${pxW},${pxH}&format=jpg&transparent=false&f=image`;
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 9000);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    clearTimeout(to);
    if (!r.ok) return null;
    const blob = await r.blob();
    if (!blob.size) return null;
    const dataUrl = await blobToDataUrl(blob);
    return { dataUrl, bbox: bb, aspect: pxW / pxH };
  } catch {
    clearTimeout(to);
    return null;
  }
}

/** Maßstäbliche Vektor-Skizze (Umriss + Beet-Streifen) in eine Box zeichnen. */
function drawVectorDiagram(
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
    offY + (maxY - Y) * scale,
  ];

  const rgb = hexToRgb(fl.color);
  const light = lighten(rgb, 0.55);
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

/** Diagramm-Block (Luftbild bevorzugt, sonst Vektor) inkl. Rahmen + Caption. */
function renderDiagramBlock(
  doc: any,
  fl: AckerPdfField,
  img: SatImage | null,
  startY: number,
  margin: number,
  pageW: number,
): number {
  const contentW = pageW - margin * 2;
  let y = startY;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20);
  doc.text(img ? "Luftbild der Fläche" : "Skizze (maßstäblich)", margin, y);
  y += 3;

  const rgb = hexToRgb(fl.color);
  let boxW = contentW;
  let boxH: number;
  if (img) {
    boxH = Math.min(92, boxW / Math.max(0.2, img.aspect));
    boxW = boxH * img.aspect;
    if (boxW > contentW) {
      boxW = contentW;
      boxH = boxW / img.aspect;
    }
    const bx = margin;
    try {
      doc.addImage(img.dataUrl, "JPEG", bx, y, boxW, boxH);
    } catch {
      /* defekte Bilddaten – Rahmen bleibt leer */
    }
    // Umriss über das Bild legen (exakte lineare bbox→Pixel-Abbildung).
    const bb = img.bbox;
    const toPx = ([lat, lng]: number[]): [number, number] => [
      bx + ((lng - bb.minLng) / (bb.maxLng - bb.minLng)) * boxW,
      y + ((bb.maxLat - lat) / (bb.maxLat - bb.minLat)) * boxH,
    ];
    doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
    doc.setLineWidth(0.9);
    polyPath(doc, fl.latlngs.map(toPx), "S");
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.25);
    polyPath(doc, fl.latlngs.map(toPx), "S");
    doc.setDrawColor(190);
    doc.setLineWidth(0.2);
    doc.rect(bx, y, boxW, boxH);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Luftbild © Esri World Imagery", margin + 1, y + boxH + 3.5);
    doc.setTextColor(20);
    return y + boxH + 6;
  }

  boxH = 80;
  doc.setDrawColor(220);
  doc.setLineWidth(0.2);
  doc.rect(margin, y, boxW, boxH);
  const dims = drawVectorDiagram(doc, fl, margin + 4, y + 4, boxW - 8, boxH - 8);
  if (dims) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(130);
    doc.text(
      `ca. ${nf(dims.spanX)} m × ${nf(dims.spanY)} m  ·  Beet-Streifen in Flächenfarbe`,
      margin + 1,
      y + boxH + 3.8,
    );
    doc.setTextColor(20);
  }
  return y + boxH + 6;
}

function rowsJeBeet(fl: AckerPdfField): number {
  return fl.params.rowSp > 0 ? Math.max(1, Math.floor(fl.params.bedW / fl.params.rowSp)) : 0;
}

function bedarf(fl: AckerPdfField): {
  plants: number;
  reserve: number;
  beetMeter: number;
  reihenMeter: number;
} {
  let reihenMeter = 0;
  (fl.beds || []).forEach((b) => { reihenMeter += (b.rows || 0) * (b.lenM || 0); });
  return {
    plants: fl.plants || 0,
    reserve: Math.ceil((fl.plants || 0) * 1.05),
    beetMeter: fl.bedMeters || 0,
    reihenMeter,
  };
}

/** Eine Fläche ausgeben (ab y). */
function renderField(
  doc: any,
  autoTable: any,
  fl: AckerPdfField,
  img: SatImage | null,
  startY: number,
  margin: number,
  pageW: number,
): void {
  const contentW = pageW - margin * 2;
  let y = startY;

  // Titel + Farb-Swatch.
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

  // Kopf-Infos.
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
    doc.text(label, cx, y);
    doc.setTextColor(20);
    doc.setFont("helvetica", "bold");
    doc.text(String(value), cx, y + 5);
  });
  y += 12;

  // Diagramm/Luftbild.
  y = renderDiagramBlock(doc, fl, img, y, margin, pageW);

  // Kennzahlen + Parameter nebeneinander.
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
    styles: { fontSize: 9.5, cellPadding: 2 },
    headStyles: { fillColor: [34, 197, 94], textColor: 255 },
    columnStyles: { 0: { cellWidth: 38, textColor: 90 }, 1: { fontStyle: "bold" } },
    theme: "grid",
    tableWidth: contentW / 2 - 4,
  });
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
    styles: { fontSize: 9.5, cellPadding: 2 },
    headStyles: { fillColor: [71, 85, 105], textColor: 255 },
    columnStyles: { 0: { cellWidth: 38, textColor: 90 }, 1: { fontStyle: "bold" } },
    theme: "grid",
    tableWidth: contentW / 2 - 4,
  });
  let afterY = ((doc as any).lastAutoTable?.finalY || y) + 8;

  // Bedarfs-/Stückliste.
  const b = bedarf(fl);
  autoTable(doc, {
    startY: afterY,
    margin: { left: margin, right: margin },
    head: [["Bedarf (Schätzung)", "Menge", "Verwendung"]],
    body: [
      ["Jungpflanzen / Setzlinge", nf(b.plants), "Pflanzbedarf"],
      ["Empfohlene Bestellmenge", nf(b.reserve), "inkl. 5 % Reserve"],
      ["Beetmeter", `${nf(b.beetMeter)} m`, "Vlies / Folie / Mulch"],
      ["Reihenmeter", `${nf(b.reihenMeter)} m`, "Tropfschlauch / Aussaat"],
    ],
    styles: { fontSize: 9.5, cellPadding: 2 },
    headStyles: { fillColor: [217, 119, 6], textColor: 255 },
    columnStyles: { 1: { fontStyle: "bold", halign: "right" }, 2: { textColor: 110 } },
    theme: "grid",
  });
  afterY = ((doc as any).lastAutoTable?.finalY || afterY) + 8;

  // Beet-Detailtabelle (bricht bei Bedarf auf Folgeseiten um).
  const beds = fl.beds || [];
  if (beds.length) {
    const MAX = 120;
    const rows = beds.slice(0, MAX).map((bd, i) => [
      String(i + 1),
      `${nf(bd.lenM, 1)} m`,
      nf(bd.rows),
      nf(bd.perRow),
      nf(bd.plants),
      `${nf(bd.areaM2, 1)} m²`,
    ]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(20);
    doc.text("Beete im Detail", margin, afterY);
    autoTable(doc, {
      startY: afterY + 2,
      margin: { left: margin, right: margin },
      head: [["Beet", "Länge", "Reihen", "Pfl./Reihe", "Pflanzen", "Fläche"]],
      body: rows,
      styles: { fontSize: 8.5, cellPadding: 1.6 },
      headStyles: { fillColor: [51, 65, 85], textColor: 255 },
      columnStyles: {
        0: { halign: "right", cellWidth: 14 },
        1: { halign: "right" },
        2: { halign: "right" },
        3: { halign: "right" },
        4: { halign: "right", fontStyle: "bold" },
        5: { halign: "right" },
      },
      theme: "striped",
    });
    if (beds.length > MAX) {
      const fy = ((doc as any).lastAutoTable?.finalY || afterY) + 4;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.setTextColor(130);
      doc.text(`… und ${beds.length - MAX} weitere Beete.`, margin, fy);
      doc.setTextColor(20);
    }
  }
}

async function buildAckerPdfBlob(
  fields: AckerPdfField[],
  company: AckerPdfCompany | null,
): Promise<Blob> {
  const { jsPDF, autoTable } = await loadAutoTable();
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 14;

  // Luftbilder vorab (parallel) holen – Fehler einzeln tolerieren.
  const images = await Promise.all(
    fields.map((f) => fetchSatelliteImage(f).catch(() => null)),
  );

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

  if (fields.length > 1) {
    const tot = fields.reduce(
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

  fields.forEach((fl, idx) => {
    if (idx === 0 && fields.length <= 1) {
      renderField(doc, autoTable, fl, images[idx], y, margin, pageW);
    } else {
      doc.addPage();
      const hy = drawHeader(margin);
      renderField(doc, autoTable, fl, images[idx], hy + 4, margin, pageW);
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
