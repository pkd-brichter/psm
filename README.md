# PSM – Pestalozzi-Garten-Plattform

> **Was ist das?** Eine **Spezialisierung / ein Fork von [digitale-psm.de](https://www.digitale-psm.de)** –
> maßgeschneidert für die **Pestalozzi Gärtnerei Wahlwies** (Demeter-Bio-Betrieb).
> digitale-psm.de ist das generische Pflanzenschutz-Dokumentationstool; **dieses Repo
> (`pkd-brichter/psm`)** baut darauf auf und entwickelt es zu einer betriebseigenen
> **Plattform mit mehreren Apps** weiter (nicht nur Pflanzenschutz).
>
> 🌐 **Live:** https://pkd-brichter.github.io/psm/  ·  📱 **Mobil:** https://pkd-brichter.github.io/psm/m/

---

## 🧭 Für neue Agenten / Entwickler – schnelle Orientierung

- **Stack:** Astro 5 + **Vanilla TypeScript** (kein UI-Framework) + Bootstrap 5 (CDN).
  Daten in **SQLite-WASM in einem Web Worker**. **Komplett statisch**, GitHub Pages,
  **kein Backend**. Base-Pfad: `/psm/`.
- **Zwei Auslieferungen, ein Repo:**
  - **Desktop** (`/`): volle App. DB = **geteilte `.sqlite`-Datei auf dem Firmen-/AD-Server­verzeichnis**
    (File System Access API). **Single-Writer** (immer nur einer schreibt gleichzeitig) – das ist die *Quelle der Wahrheit*.
  - **Mobil** (`/m/`): eigene **schlanke Erfassungs-App**. DB = **lokal in IndexedDB** (vorbefüllt),
    erfassen + per **Share-Sheet (JSON)** weitergeben → am PC via **Import/Merge** in die zentrale DB.
    Handys werden von `/` automatisch auf `/m/` geleitet (`?desktop=1` hebelt das aus).
- **Warum getrennt:** GitHub Pages kann nicht serverseitig nach Gerät ausliefern → stattdessen
  **2 Seiten in 1 Repo** mit **geteiltem Kern** (Worker/Storage/Seed/Share). Kein Zwilling-Repo.
- **`activeSection` ist die zentrale Wahrheit** der Navigation. Sidebar = Top-Level-**Bereiche** (nur Icons),
  Header-Reiter = Unter-Ansichten des Bereichs (siehe unten).
- **Nicht (mehr) vorhanden:** die **BVL-Zulassungsdatenbank** wurde komplett entfernt (Pestalozzi nutzt
  eigene Kulturen/Mittel); ein „Performance Monitor"-Overlay wurde entfernt. EPPO/BBCH-Codes bleiben.

---

## 🏗️ Architektur-Prinzipien (immer einhalten)

- **Eine gemeinsame SQLite-DB für ALLE Apps.** Worker `src/scripts/core/storage/sqliteWorker.js`
  ist die *Source of Truth*. Schema-Änderungen über **Migrationen** (`PRAGMA user_version`, aktuell bis v18).
  Egal welche App geöffnet wird – dieselbe DB. Ziel: Cross-App-Auswertungen.
- **Modular & stabil:** jede App = eigenes Feature-Modul unter `src/scripts/features/<name>/`,
  als View in EINER SPA. Worker-CRUD + Bridge (`storage/sqlite.ts`) + Migration.
- **Maximal wenig Tipparbeit:** Stammdaten vorbefüllen/auswählbar machen (Seed), Unnötiges weglassen.
- **Immer Übersicht & Statistik:** jede App zeigt auf einen Blick *wann was gemacht wurde* und *was zu tun ist*.
- **Browser-only, leichtgewichtig:** schwere Libs (Leaflet/Turf) nur **lazy**.

## 🗂️ Apps & Navigation

**Desktop-Sidebar = Bereiche (nur Icons, Portainer-Stil).** Die Unter-Ansichten des aktiven Bereichs
erscheinen oben im **Header** als Reiter. Definition: `src/scripts/components/shellClient.ts` (`AREAS`).

| Bereich (Sidebar) | Header-Reiter (Sections) |
|---|---|
| **Start** | Dashboard |
| **PSM** | Neu erfassen (`calc`) · Übersicht (`documentation`) · Lager (`lager`) · Einstellungen (`settings`) |
| **Acker-Planer** | Acker-Planer (`acker`, Leaflet – lazy) |

> **Einstellungen sind PSM-spezifisch** (Mittel/EPPO/BBCH/GPS) und liegen daher im PSM-Header,
> nicht in der Sidebar. Geplant: weitere Apps/Lager + Cross-App-Features.

## 🗄️ Daten- & Speicher-Modell

- **Worker** (`storage/sqliteWorker.js`): SQLite-WASM (`@sqlite.org/sqlite-wasm` via CDN), In-Memory-DB,
  Tabellen + Migrationen, Snapshot-Import/Export, ganze-Datei-Export (`exportDB`).
- **Bridge** (`storage/sqlite.ts`): Main-Thread ↔ Worker (postMessage), plus Persistenz:
  - Desktop: schreibt die **ganze Datei** über das `FileSystemFileHandle` zurück.
  - Mobil: `enableIndexedDbPersistence()` → exportierte Bytes in **IndexedDB** (`storage/indexedDbStore.ts`).
- **Treiber-Auswahl:** `storage/index.ts` (`sqlite` bevorzugt).
- **Seed:** leere DB wird mit Pestalozzi-Stammdaten gefüllt (`public/data/pestalozzi-seed.json`:
  GPS-Standorte + Kultur→Mittel) – siehe `core/database.ts › ensureInitialSeed()`.
- **Plattform-Erkennung & Mobile-Auto-Start:** `core/platform.ts` (`isMobileClient`, `?mobile`/`?desktop`),
  `pages/mobileClient.ts`.

## 🔄 Mobil → Desktop zusammenführen (Merge)

- Jede Erfassung bekommt eine **stabile `clientUuid`** → **Duplikatschutz per UUID** beim Import
  (dieselbe Datei doppelt = 0 neu). Logik: `features/importMerge/`.
- **Import-Historie** (Tabelle `import_log`): *wann / von welchem Gerät / wie viele neu·übersprungen /
  Zeitraum* – sichtbar unter **PSM → Übersicht → Import**.
- Import akzeptiert **Snapshot (`{history:[…]}`)**, `{entries:[…]}` und ZIP.
- Mobiler **Teilen-Status**: „X bereit zum Teilen" / „Alles geteilt ✓" (Teilen nur aktiv, wenn etwas offen ist).

## 🚀 Entwicklung

**Voraussetzungen:** Node.js ≥ 18, npm ≥ 9, **Git LFS** (große Binärdateien wie `.sqlite`, Bilder, `.wasm`).

```bash
git lfs install                                   # einmalig pro System
git clone https://github.com/pkd-brichter/psm.git
cd psm
git lfs pull                                       # falls LFS-Dateien fehlen
npm install

npm run dev        # Dev-Server (http://localhost:4321/psm/)
npm run build      # astro check + Produktions-Build nach dist/
npm run preview    # gebautes dist/ lokal servieren
```

> Hinweis: Die EPPO/BBCH-Lookup-`.sqlite` unter `public/data/` werden per **Git LFS** verwaltet –
> in einem Klon ohne `git lfs pull` sind es nur Pointer (führt lokal zu `SQLITE_NOTADB`, in Produktion korrekt).

## 📦 Deploy (GitHub Pages, manuell)

```bash
npm run build
npx gh-pages -d dist -t        # -t = Dotfiles (.nojekyll) mit deployen
```

Deploy-Ziel: Branch `gh-pages` → https://pkd-brichter.github.io/psm/.
`astro.config.mjs` setzt `site` + `base: "/psm/"` und stempelt pro Build eine `CACHE_VERSION` in `sw.js`
(damit installierte PWAs den neuen Code bekommen).

## 📁 Projektstruktur (Auszug)

```
src/
  pages/
    index.astro            # Desktop-App (lädt main/shellClient/indexClient)
    m/index.astro          # Mobile-App (lädt mobileClient)
  components/Shell.astro    # Icon-Sidebar (Bereiche)
  layouts/BaseLayout.astro
  scripts/
    main.ts                # Desktop-Bootstrap-Einstieg
    core/
      bootstrap.ts         # Desktop-Init + Mobile-Redirect (/ → /m/)
      platform.ts          # Mobile-Erkennung (?mobile/?desktop)
      database.ts          # State <-> DB, Seed, GPS
      storage/
        sqliteWorker.js    # SQLite-WASM Worker (Source of Truth, Migrationen)
        sqlite.ts          # Bridge Main<->Worker + Persistenz
        indexedDbStore.ts  # Mobile-Persistenz (IndexedDB)
        index.ts           # Treiber-Auswahl
      state.ts             # zentraler App-State (activeSection ...)
    components/shellClient.ts  # Sidebar/Header-Navigation (AREAS)
    pages/
      indexClient.ts       # Desktop: mountet Features, Section-Sichtbarkeit
      mobileClient.ts      # Mobile: DB verbinden + Erfassung + Teilen-Status
    features/
      dashboard/ calculation/ documentation/ lager/ acker/
      settings/ codesManager/ importMerge/ gps/ share/ ...
public/data/
  pestalozzi-seed.json     # Stammdaten-Seed (Standorte + Kultur->Mittel)
```

## 📄 Lizenz & Kontakt

MIT – siehe [LICENSE](LICENSE). Basis: [digitale-psm.de](https://www.digitale-psm.de) · Entwickler: Abbas Hoseiny.
