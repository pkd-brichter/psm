/**
 * Echtes PDF erzeugen (jsPDF) und teilen/speichern.
 *
 * Grund: window.print() ist auf iOS Safari unzuverlässig (blitzt auf und
 * verschwindet) und liefert keine Datei zum Versenden. Hier wird ein echtes
 * PDF gebaut und per Web-Share-Sheet weitergegeben (WhatsApp/Mail/Dateien),
 * mit Download als Fallback. jsPDF wird lazy geladen (nur bei PDF-Aktion).
 */
import { formatNumber, formatDateFromIso } from "@scripts/core/utils";
import type {
  CalculationSnapshotEntry,
  CalculationSnapshotLabels,
} from "./calculationSnapshot";

export interface PdfCompany {
  name?: string;
  address?: string;
  headline?: string;
}

function entryDate(e: CalculationSnapshotEntry): string {
  return (
    e.datum ||
    formatDateFromIso(e.dateIso) ||
    (typeof e.date === "string" ? e.date : "") ||
    ""
  );
}

function resolveAreaHa(e: CalculationSnapshotEntry): string {
  const n = (v: unknown) => {
    const x = Number(v);
    return Number.isFinite(x) ? x : null;
  };
  const ha =
    n(e.areaHa) ??
    (n(e.areaAr) !== null ? (n(e.areaAr) as number) / 100 : null) ??
    (n(e.areaSqm) !== null ? (n(e.areaSqm) as number) / 10000 : null);
  return ha === null ? "–" : formatNumber(ha, 2, "0.00");
}

async function loadAutoTable() {
  const [{ jsPDF }, autoTableMod] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  const autoTable = (autoTableMod as any).default || (autoTableMod as any);
  return { jsPDF, autoTable };
}

export async function buildEntriesPdfBlob(
  entries: CalculationSnapshotEntry[],
  _labels: CalculationSnapshotLabels,
  company: PdfCompany | null,
): Promise<Blob> {
  const { jsPDF, autoTable } = await loadAutoTable();
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentW = pageW - margin * 2;

  entries.forEach((entry, idx) => {
    if (idx > 0) doc.addPage();
    let y = margin;

    // Firmenkopf
    if (company?.name) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(company.name, margin, y);
      y += 6;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90);
    if (company?.address) {
      for (const line of String(company.address).split(/\r?\n/)) {
        if (line.trim()) {
          doc.text(line.trim(), margin, y);
          y += 4.5;
        }
      }
    }
    doc.setTextColor(20);

    // Titel + Datum
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Pflanzenschutz-Anwendung", margin, y);
    const dateStr = entryDate(entry);
    if (dateStr) {
      doc.setFontSize(11);
      doc.text(dateStr, pageW - margin, y, { align: "right" });
    }
    y += 3;
    doc.setDrawColor(180);
    doc.line(margin, y, pageW - margin, y);
    y += 5;

    // Grunddaten (zweispaltig)
    const grund: Array<[string, string]> = [
      ["Erstellt von", entry.ersteller || "–"],
      ["Standort", entry.standort || "–"],
      ["Kultur", entry.kultur || "–"],
      ["Fläche (ha)", resolveAreaHa(entry)],
      ["EPPO-Code", entry.eppoCode || "–"],
      ["BBCH-Stadium", entry.bbch || "–"],
      ["Verwendung", entry.usageType || "–"],
      ["Uhrzeit", entry.uhrzeit || "–"],
    ];
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const colW = contentW / 2;
    grund.forEach(([label, value], i) => {
      const col = i % 2;
      const x = margin + col * colW;
      if (col === 0 && i > 0) y += 6;
      doc.setTextColor(120);
      doc.text(`${label}:`, x, y);
      doc.setTextColor(20);
      doc.text(String(value), x + 34, y);
    });
    y += 8;

    // Mittel-Tabelle
    const items = Array.isArray(entry.items) ? entry.items : [];
    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [
        [
          "Mittel",
          "Aufwand",
          "Einheit",
          "Gesamt",
          "Wirkstoff",
          "Wartezeit",
        ],
      ],
      body: items.map((it: any) => [
        it?.name || "–",
        formatNumber(it?.value, 2, "–"),
        it?.unit || "",
        formatNumber(it?.total, 2, "–"),
        it?.wirkstoff || "",
        it?.wartezeit != null && it?.wartezeit !== "" ? String(it.wartezeit) : "",
      ]),
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [34, 197, 94], textColor: 255 },
      theme: "grid",
    });

    // QS-Dokumentation
    const qsAll: Array<[string, string]> = [
      ["Maschine / Gerät", entry.qsMaschine || ""],
      ["Schaderreger / Grund", entry.qsSchaderreger || ""],
      ["Verantwortliche Person", entry.qsVerantwortlicher || ""],
      ["Wetterbedingungen", entry.qsWetter || ""],
      ["Behandlungsart", entry.qsBehandlungsart || ""],
    ];
    const qs = qsAll.filter(([, v]) => v);
    if (qs.length) {
      let qy = (doc as any).lastAutoTable?.finalY
        ? (doc as any).lastAutoTable.finalY + 8
        : y + 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("QS-Dokumentation", margin, qy);
      qy += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      qs.forEach(([label, value]) => {
        doc.setTextColor(120);
        doc.text(`${label}:`, margin, qy);
        doc.setTextColor(20);
        doc.text(String(value), margin + 48, qy);
        qy += 6;
      });
    }
  });

  return doc.output("blob");
}

function safeFilename(title: string): string {
  return (
    title
      .replace(/[^\wäöüÄÖÜ.-]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 80) || "PSM"
  );
}

/**
 * Erzeugt das PDF und übergibt es dem Share-Sheet (Datei). Fallback: Download.
 */
export async function exportEntriesPdf(
  entries: CalculationSnapshotEntry[],
  labels: CalculationSnapshotLabels,
  company: PdfCompany | null,
  options: { title?: string } = {},
): Promise<void> {
  const blob = await buildEntriesPdfBlob(entries, labels, company);
  const filename = `${safeFilename(options.title || "PSM-Anwendung")}.pdf`;
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
      await nav.share({ files: [file], title: options.title || "PSM-Anwendung" });
      return;
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
      console.warn("[PDF] Share fehlgeschlagen, nutze Download", err);
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
