# CLAUDE.md – Arbeitsanleitung für Agenten

Kurzkontext für Claude Code in diesem Repo. Ausführliche Architektur: **siehe `README.md`**.

## Was ist das?
Statische **Astro 5 + Vanilla-TypeScript**-Plattform (kein UI-Framework) für die Pestalozzi
Gärtnerei. Daten in **SQLite-WASM in einem Web Worker**, **kein Backend**, GitHub Pages,
Base-Pfad `/psm/`. Zwei Auslieferungen aus einem Repo: **Desktop** (`/`) und **Mobil** (`/m/`).

## Befehle
```bash
npm install
npm run dev        # Dev-Server: http://localhost:4321/psm/  (Mobil: .../psm/m/)
npm run build      # astro check + Produktions-Build nach dist/   (MUSS vor jedem Deploy laufen)
npm run preview    # gebautes dist/ lokal servieren
```
Git LFS wird gebraucht (`.sqlite`, Bilder, `.wasm`): `git lfs install && git lfs pull`.

## Im Browser verifizieren (wichtig)
Diese Umgebung hat einen echten Browser – **nutze ihn**, optische Änderungen wurden in der
vorherigen (Remote-)Sandbox NICHT visuell geprüft. Vorgehen:
1. `npm run dev`, dann `http://localhost:4321/psm/` öffnen.
2. Bereiche links (Icon-Sidebar) durchgehen, v. a. **Fotos** und **Acker-Planer**.
3. Acker-Planer: „Fläche zeichnen" (On-Map-Overlay führt durch), **Rechtsklick** = Kontextmenü,
   nach dem Zeichnen **„PDF-Export"** prüfen.
4. Fotos: Desktop-Header oben, schmale **Kategorie-Rail** links, **Gruppieren**-Dropdown,
   **Auswählen** → Bulk (Standort/Kultur zuweisen).

## Architektur-Regeln (einhalten)
- **Eine gemeinsame SQLite-DB für alle Apps.** Worker `src/scripts/core/storage/sqliteWorker.js`
  ist die *Source of Truth*; Bridge `storage/sqlite.ts`. Schema-Änderungen NUR über Migrationen
  (`PRAGMA user_version`, aktuell **v21**).
- Jede App = Feature-Modul unter `src/scripts/features/<name>/`, gemountet als View in EINER SPA.
- Schwere Libs (**Leaflet/Turf, jsPDF**) immer **lazy** importieren.
- **Zweisprachig DE/PL:** Deutsch ist Quellsprache. **Neue sichtbare DE-Strings IMMER in
  `src/scripts/core/i18n-dict.ts` ergänzen**; dynamische Strings mit `t("…")`.
- `activeSection` ist die zentrale Navigations-Wahrheit.

## Zuletzt überarbeitet (Stand dieser Session)
- **Fotos (Desktop):** eigener Fotos-Header + schmale Kategorie-Rail + Galerie; Gruppieren nach
  Datum/Standort/Kultur/Zweck; Bulk-Zuweisung Standort/Kultur (`bulkUpdateFotos`).
- **Acker-Planer:** PDF-Export der Auswertung (`features/acker/pdf.ts`), geführtes Zeichnen
  (On-Map-Overlay, Doppelklick/erster-Punkt-Abschluss, „Punkt zurück"), Rechtsklick-Kontextmenü,
  Eckpunkt einfügen/löschen, Rechteck-Werkzeug.

## Git / Deploy
- Entwicklung auf dem vom Auftrag genannten Feature-Branch; **nicht** ungefragt auf andere Branches pushen.
- **Deploy = Produktion** (GitHub Pages): `npm run build`, dann `dist/` auf Branch `gh-pages`
  veröffentlichen (z. B. `npx gh-pages -d dist -t`). Das ist ein Force-Push auf Produktion →
  **vorher beim Nutzer rückfragen**. Live: https://pkd-brichter.github.io/psm/
