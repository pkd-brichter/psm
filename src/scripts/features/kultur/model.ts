// @ts-nocheck
// Gemeinsame Modell-Helfer der Kulturführung (Hub + Anbauplan-Board).
import { getIsoWeek, weekKeyOf, weekStart } from "@scripts/core/utils";

// Maßnahmen-Arten: Label, Bootstrap-Icon, Farbe.
export const ART_META = {
  mechanisch:   { label: "Mechanisch",     icon: "bi-tools",        color: "#2563eb" },
  chemisch_psm: { label: "Pflanzenschutz", icon: "bi-droplet-half", color: "#dc2626" },
  duengung:     { label: "Düngung",        icon: "bi-flower1",      color: "#b45309" },
  nuetzlinge:   { label: "Nützlinge",      icon: "bi-bug",          color: "#7c3aed" },
  bewaesserung: { label: "Bewässerung",    icon: "bi-moisture",     color: "#0891b2" },
  monitoring:   { label: "Monitoring",     icon: "bi-eye",          color: "#475569" },
  sonstiges:    { label: "Sonstiges",      icon: "bi-three-dots",   color: "#64748b" },
};
export const ART_ORDER = [
  "mechanisch", "chemisch_psm", "duengung", "nuetzlinge", "bewaesserung", "monitoring", "sonstiges",
];
export function artMeta(art) {
  return ART_META[art] || ART_META.sonstiges;
}

export const STATUS_META = {
  geplant:       { label: "geplant",       color: "#64748b" },
  aktiv:         { label: "aktiv",          color: "#16a34a" },
  abgeschlossen: { label: "abgeschlossen",  color: "#94a3b8" },
};

export const CROP_PALETTE = [
  "#16a34a", "#0891b2", "#7c3aed", "#d97706", "#dc2626", "#0d9488", "#65a30d", "#db2777",
];
// Farbe nur akzeptieren, wenn sie ein sauberer Hex-Wert ist – sonst Palette.
// Schützt davor, dass eine aus einer importierten/synchronisierten DB stammende
// Farbe ungeprüft in style-/CSS-Var-Attribute fließt (Attribut-Ausbruch/XSS).
const HEX_COLOR_RE = /^#[0-9a-fA-F]{3,8}$/;
export function safeColor(c) {
  return typeof c === "string" && HEX_COLOR_RE.test(c.trim()) ? c.trim() : null;
}
export function cropColor(a, idx = 0) {
  return safeColor(a && a.color) || CROP_PALETTE[idx % CROP_PALETTE.length];
}

export function todayIso() {
  const d = new Date();
  return (
    d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0")
  );
}

// yyyy-mm-dd -> vergleichbare Zahl (20260612); ungültig -> NaN
export function dateNum(iso) {
  if (!iso) return NaN;
  const s = String(iso).slice(0, 10).replace(/-/g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

// Aktuelle + nächste Kultur einer Fläche ermitteln.
export function unitCrops(anbauForUnit) {
  const rows = [...(anbauForUnit || [])].sort(
    (a, b) => (dateNum(a.pflanzDatum) || 0) - (dateNum(b.pflanzDatum) || 0)
  );
  const t = Number(todayIso().replace(/-/g, ""));
  let current = rows.find((r) => r.status === "aktiv") || null;
  if (!current) {
    const cand = rows.filter(
      (r) =>
        r.status !== "abgeschlossen" &&
        dateNum(r.pflanzDatum) <= t &&
        (!r.ernteDatum || dateNum(r.ernteDatum) >= t)
    );
    current = cand.length ? cand[cand.length - 1] : null;
  }
  let next =
    rows
      .filter((r) => r !== current && r.status !== "abgeschlossen" && dateNum(r.pflanzDatum) > t)
      .sort((a, b) => (dateNum(a.pflanzDatum) || 0) - (dateNum(b.pflanzDatum) || 0))[0] || null;
  if (!next) {
    next =
      rows
        .filter((r) => r !== current && r.status === "geplant")
        .sort((a, b) => (dateNum(a.pflanzDatum) || 0) - (dateNum(b.pflanzDatum) || 0))[0] || null;
  }
  return { current, next, all: rows };
}

// Fenster aus ISO-Wochen zwischen zwei Daten (inkl.), DST-sicher (Kalenderschritt).
export function weekWindow(fromDate, toDate, maxWeeks = 70) {
  const out = [];
  const fw = getIsoWeek(fromDate);
  let cursor = weekStart(fw.year, fw.week);
  const endT = toDate.getTime();
  const c = getIsoWeek(new Date());
  const curKey = weekKeyOf(c.year, c.week);
  let guard = 0;
  while (cursor.getTime() <= endT && guard < maxWeeks) {
    const iw = getIsoWeek(cursor);
    const key = weekKeyOf(iw.year, iw.week);
    out.push({
      year: iw.year,
      week: iw.week,
      key,
      monday: new Date(cursor),
      isCurrent: key === curKey,
      isPast: key < curKey,
      isFuture: key > curKey,
    });
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 7);
    guard++;
  }
  return out;
}

// Index der Woche im Fenster, die ein ISO-Datum enthält (-1 wenn außerhalb).
export function weekIndexOf(window, iso) {
  if (!iso) return -1;
  const d = new Date(String(iso).slice(0, 10) + "T00:00:00");
  if (isNaN(d.getTime())) return -1;
  const iw = getIsoWeek(d);
  const key = weekKeyOf(iw.year, iw.week);
  return window.findIndex((w) => w.key === key);
}

function isoOf(d) {
  return (
    d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0")
  );
}

// Start-/End-Spaltenindex eines Zeitraums im Wochenfenster (geklemmt). Gibt
// {s,e,openEnd} zurück oder null, wenn der Zeitraum komplett außerhalb liegt.
export function spanInWindow(window, fromIso, toIso) {
  if (!window || !window.length || !fromIso) return null;
  const firstMon = window[0].monday;
  const lastMon = window[window.length - 1].monday;
  const lastEnd = new Date(lastMon.getFullYear(), lastMon.getMonth(), lastMon.getDate() + 6);
  const firstNum = dateNum(isoOf(firstMon));
  const lastNum = dateNum(isoOf(lastEnd));
  const fNum = dateNum(fromIso);
  const tNum = toIso ? dateNum(toIso) : lastNum;
  if (!Number.isFinite(fNum)) return null;
  if (fNum > lastNum) return null;
  if (Number.isFinite(tNum) && tNum < firstNum) return null;
  let s = weekIndexOf(window, fromIso);
  if (s < 0) s = fNum < firstNum ? 0 : window.length - 1;
  let e = toIso ? weekIndexOf(window, toIso) : window.length - 1;
  if (e < 0) e = Number.isFinite(tNum) && tNum > lastNum ? window.length - 1 : s;
  if (e < s) e = s;
  return { s, e, openEnd: !toIso };
}
