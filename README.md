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
  - **Mobil** (`/m/`): eigene **schlanke Erfassungs-App** mit unterer Tab-Leiste (PSM · Fotos).
    DB = **lokal in IndexedDB** (vorbefüllt), erfassen + per **Share-Sheet als ZIP** (Erfassungen +
    Fotos als echte `.jpg`) weitergeben → am PC via **Import/Merge** in die zentrale DB.
    Handys werden von `/` automatisch auf `/m/` geleitet (`?desktop=1` hebelt das aus).
- **Zweisprachig DE/PL:** Laufzeit-Übersetzung (Deutsch = Quelle, Polnisch per Wörterbuch), Umschalter
  oben; viele polnische Mitarbeiter. Details unten.
- **Warum getrennt:** GitHub Pages kann nicht serverseitig nach Gerät ausliefern → stattdessen
  **2 Seiten in 1 Repo** mit **geteiltem Kern** (Worker/Storage/Seed/Share). Kein Zwilling-Repo.
- **`activeSection` ist die zentrale Wahrheit** der Navigation. Sidebar = Top-Level-**Bereiche** (nur Icons),
  Header-Reiter = Unter-Ansichten des Bereichs (siehe unten).
- **Nicht (mehr) vorhanden:** die **BVL-Zulassungsdatenbank** wurde komplett entfernt (Pestalozzi nutzt
  eigene Kulturen/Mittel); ein „Performance Monitor"-Overlay wurde entfernt. EPPO/BBCH-Codes bleiben.
- **Branch-Modell (kurz):** `main` = **aktueller Quellcode & Arbeitsbranch** (Source of Truth, immer aktuell
  halten, **keine PRs**, Historie **linear**); `gh-pages` = **generierter Deploy-Branch**, den GitHub Pages
  ausliefert (nie von Hand editieren). Voller Stand → unten unter **Deploy**.

---

## 🏗️ Architektur-Prinzipien (immer einhalten)

- **Eine gemeinsame SQLite-DB für ALLE Apps.** Worker `src/scripts/core/storage/sqliteWorker.js`
  ist die *Source of Truth*. Schema-Änderungen über **Migrationen** (`PRAGMA user_version`, aktuell bis **v25**).
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
| **Acker-Planer** | Karte (`acker`, Leaflet – lazy) · Kulturführung (`kultur`) |
| **Fotos** | Foto-Galerie (`fotos`) |
| **Daten** | Import (`daten`) |

> **Einstellungen sind PSM-spezifisch** (Mittel/EPPO/BBCH/GPS) und liegen daher im PSM-Header,
> nicht in der Sidebar. **Import liegt jetzt im zentralen Bereich „Daten"** (nicht mehr unter PSM).
> Mobil ersetzt eine **untere Tab-Leiste** die Sidebar (nur **PSM** + **Fotos**).
>
> **„Neu erfassen" ist ein Schritt-für-Schritt-Assistent** (`setupCalcWizard` in `features/calculation/`):
> 3 Schritte (Grunddaten · Mittel & Codes · Anwendung & QS) mit Zurück/Weiter statt einer langen Liste –
> Mobil **und** Desktop teilen dasselbe `initCalculation`-Formular. Reine Präsentationsschicht über den
> bestehenden Feldern; **sichere Degradation** (bei Fehler erscheint das vollständige Formular mit Speichern).

## 🌱 Kulturführung (`features/kultur/`)

Zweiter Reiter im Acker-Bereich – macht aus dem reinen Flächen-Planer eine **Kultur-Management-App**
(Desktop-only; im Mobil-Client `/m/` bewusst nicht enthalten). **Überblick zuerst:** Standard-Ansicht
ist der **Anbauplan** (alle Flächen auf einen Blick); Klick/Rechtsklick auf eine Fläche → planen bzw.
Detail. Pro **Fläche** (Freiland **oder** Gewächshaus): *aktuelle Kultur · nächste geplante · Aufgaben ·
Wetter*.

- **Management-Einheit = `(flaeche_typ, flaeche_id)`** – polymorphe, backend-taugliche Referenz:
  `'acker'` → `ackerflaechen.id` (gezeichnetes Polygon), `'haus'` → `gps_points.id` mit
  `kind='gewaechshaus'` (Häuser/Solarhalle aus dem Seed). Koordinate je Einheit = GPS-Punkt bzw.
  Polygon-Schwerpunkt (Eckpunkt-Mittel, **ohne** turf – leichteres Lazy-Load).
- **Tabellen** (Worker = Source of Truth):
  - `anbau_kultur` – Kultur-Belegung/Zeitachse (Migration **v22**; status `geplant`/`aktiv`/
    `abgeschlossen`, `pflanz_datum`, Farbe, Notiz). **Ernte ist ein ZEITRAUM** `ernte_von`/`ernte_bis`
    (Migration **v23**) – Fruchtgemüse (Tomate/Gurke) wird laufend geerntet; Belegung bis Ernte-Ende.
    Tabellenname bewusst ≠ Spalte `kultur_mittel.anbau`.
  - `massnahme` – Maßnahmen (`art`: mechanisch/chemisch_psm/duengung/nuetzlinge/bewaesserung/
    monitoring/sonstiges; `status` geplant/erledigt; Datum, Menge/Einheit, Mittel, Notiz). Spalte
    `history_id` **verlinkt** bestehende Pflanzenschutz-Einträge (`history`), statt sie zu duplizieren.
  - `kultur_stamm` – **Kultur-Stammdaten-Bibliothek** (Migration **v25**, ~40 Gemüse vorbefüllt): Familie
    (Fruchtfolge), Anbau-Methode (Anzucht/Direkt), Anzucht-Vorlauf & Kulturdauer & Erntefenster, Abstände,
    biodynamischer Typ (Maria Thun – für späteres Aussaattage-Overlay). **Basis der automatischen
    Termin-Berechnung.** `anbau_kultur` ist damit ein **Satz**: zusätzlich `aussaat_datum`,
    `kultur_stamm_id`, `menge`/`einheit`, `satz_gruppe` (Folgesatz-Serie). Satz-Editor: Kultur aus der
    Bibliothek wählen → Aussaat-/Pflanz-/Ernte-Termine rechnen sich automatisch (Anker wählbar:
    Aussaat · Pflanzung · Ernte, frei überschreibbar); **Folgesätze** (N Sätze, alle X Tage) in einem
    Schritt. Helfer in `kultur/model.ts` (`computePlan`/`shiftPlan`/`findStammByName`).
- **Anbauplan-Board** (`board.ts`, robuste Monatsachse + %-Positionierung, NICHT ein CSS-Grid mit
  explizitem grid-row/col – das war zuvor kollabiert): Kultur-Belegung als Balken (Pflanzung→Ernte-Ende),
  **schraffierter Ernte-Zeitraum**, Maßnahmen-Marker **erledigt = gefüllt / geplant = Ring/gestrichelt**,
  heute-Linie, gruppiert. Rechtsklick auf eine Zeile = schnell planen.
- **Pro Fläche**: JETZT/NÄCHSTE-Kacheln + **Saison-&-Pflege-Leiste** (`renderSeason`) – je Maßnahmen-Typ
  geplant vs. erledigt auf einer Zeitachse. Aufgaben-Liste mit Abhaken. **Eingabe bewusst minimal:**
  Kultur = nur Name (Ernte von/bis optional); Aufgabe = nur Art-Kachel antippen; alles Weitere hinter „Mehr".
- **Kontextmenü** (Rechtsklick auf Board-Zeile/Liste): Kultur setzen · Nächste planen · Aufgabe planen ·
  Fläche öffnen · Auf Karte.
- **Pflanzenschutz-Auto-Import** (`importPsmAsMassnahmen`, im Worker): vorhandene `history`-Einträge
  werden als erledigte `chemisch_psm`-Maßnahmen übernommen – idempotent über `history_id`,
  konservatives Matching (Gewächshaus via `gps_point_id`, Freiland via eindeutige `standort_id`).
- **Wetter** (`features/kultur/weather.ts`): **Open-Meteo**, client-side, kein API-Key. Forecast-API
  (`past_days=92`, `forecast_days=16`), auf ISO-KW aggregiert, in `localStorage` 1×/Tag gecacht,
  Trennung an der aktuellen KW (Ist/Archiv ↔ Vorhersage). Attribution: *Open-Meteo (CC BY 4.0)*.
- KW-Helfer in `core/utils.ts` (`getIsoWeek`/`weekKey`/`weekStart`).

### 🔌 Künftiges Backend (für neue Agenten)

Diese App ist auf einen späteren echten Server vorbereitet. **Bitte beibehalten:** sämtlicher
Datenzugriff läuft über die Bridge `storage/sqlite.ts` (`callWorker(action, payload)`). Die
Kulturführungs-Actions bilden 1:1 REST-Ressourcen ab:
`listAnbau/upsertAnbau/deleteAnbau` → `GET/POST/DELETE /anbau`,
`listMassnahmen/upsertMassnahme/deleteMassnahme` → `… /massnahme`,
`importPsmAsMassnahmen` → `POST /massnahme/import-psm`. `(flaeche_typ, flaeche_id)` + `history_id`
sind die relationalen Schlüssel, die ein Backend mit echten FKs absichern würde; das localStorage-
Wetter wird zum server-seitig gecachten Proxy. **Wird der Worker später durch einen HTTP-Client
ersetzt, ist das ein Ein-Schicht-Wechsel in `storage/sqlite.ts` – die Feature-UIs bleiben unverändert.**

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

- Jede Erfassung bekommt eine **stabile `clientUuid`** → **Duplikatschutz per UUID**. **Wichtig
  (Audit-Fix, Migration v24):** die `clientUuid` wird **EINMAL beim Berechnen** vergeben (nicht pro
  Speichern neu) und durch **Export *und* Verlauf-Listing** getragen; sie ist als persistente Spalte
  `history.client_uuid` (+ `fotos.client_uuid`) mit **partiellem UNIQUE-Index** (`WHERE client_uuid IS
  NOT NULL`) DB-erzwungen. `appendHistoryEntry`/`appendFoto` deduplizieren auf der Spalte (Vorprüfung +
  UNIQUE-Catch → `{duplicate:true}`); `importSnapshot` nutzt `INSERT OR IGNORE` + `changes()`-Guard.
  Dieselbe Datei/derselbe Eintrag doppelt = **0 neu**; verschiedene Einträge werden NICHT mehr fälschlich
  zusammengeworfen. **Migration v24 dedupliziert vorhandene Zeilen VOR dem UNIQUE-Index** (sonst bricht
  `CREATE UNIQUE INDEX` → DB-Open). Logik: `features/importMerge/`. (Details: Memory `psm-import-dedup`.)
- **Import-Historie** (Tabelle `import_log`): *wann / von welchem Gerät / wie viele neu·übersprungen /
  Zeitraum* – sichtbar im Bereich **Daten → Import**. Eine Zeile pro Import-Lauf.
- Import akzeptiert **ZIP** (Erfassungen + Fotos als echte `.jpg`), **Snapshot (`{history:[…]}`)** und `{entries:[…]}`.
  Mobil-Teilen erzeugt eine **ZIP** (`pflanzenschutz.json` + `fotos/<uuid>.jpg`), kein base64-Aufblähen.
  Hinweis: `exportSnapshot` liefert History-Einträge **flach** (Header-Felder auf Top-Level inkl. `clientUuid`, nicht unter `.header`).
- Mobiler **Teilen-Status**: „X bereit zum Teilen" / „Nichts zu teilen" (Teilen nur aktiv, wenn etwas offen ist).
  **Fotos werden nach dem Teilen NICHT mehr automatisch gelöscht** (Datenverlust-Schutz: `nav.share`
  „gelingt" schon bei Übergabe an Mail/Files, nicht am PC) – Löschen nur nach ausdrücklicher Bestätigung.

## 📷 Fotos (`features/fotos/`)

Betriebsweites Foto-/Beleg-Werkzeug (nicht nur Pflanzenschutz). EINE Galerie-Logik für Desktop+Mobil,
`archiveMode` (Desktop) schaltet Suche/Mehrfachauswahl frei; Mobil bleibt schlank.

- **Kategorien in Gruppen** (`KATEGORIEN`): *Pflanzenschutz* (Kultur-Doku · Flächennutzungs-Nachweis · Schaden) ·
  *Betrieb* (Werkstatt & Fahrzeuge · Werkzeuge & Geräte · Ersatzteile/Material · Lieferung/Wareneingang · Sonstiges).
  Chips = **Filter UND Aufnahme-Ziel** zugleich; Zeile „Neue Fotos → <Kategorie>".
- **Aufnahme:** „Foto aufnehmen" (Kamera) / „Aus Galerie" (mehrere); `compress.ts` erzeugt **Vollbild**
  (max 1500px, adaptiv ~≤360 KB) **und Thumbnail** `data_thumb` (~240px, ~10 KB).
- **Galerie:** Datums-Gruppen (Heute/Gestern/Diese Woche/Monat), Sortier-Umschalter, Zähler + Chip-Counts,
  inkrementelles Rendern + `content-visibility`. **Galerie nutzt nur Thumbnails**, Vollbild nur in der
  Lightbox (`getFotoData`). Altbestand/Importe ohne Thumb → **Backfill** beim Anzeigen.
- **Titel** werden abgeleitet (`displayName`: Kategorie·Kultur·Standort·Datum) statt UUID/„image".
- **Bulk (Desktop):** Mehrfachauswahl → löschen / als ZIP teilen / Kategorie ändern.
- Worker: `appendFoto/listFotos/getFotoData/updateFoto/deleteFoto/clearFotos/setFotoThumb/getFotoCounts/`
  `deleteFotosByIds/bulkUpdateFotoKategorie/exportFotos/exportFotosByIds` · Merge per `clientUuid`.

## 🌐 Zweisprachigkeit DE/PL (`core/i18n.ts` + `core/i18n-dict.ts`)

- Deutsch = **Quellsprache** (im Code/Templates). Polnisch via **Laufzeit-Übersetzung**: DOM-Textknoten +
  `placeholder/title/aria-label/alt` werden über das Wörterbuch `DE_PL` ersetzt; **MutationObserver**
  übersetzt dynamisch nachgerenderte Inhalte. Fehlt ein Begriff → bleibt deutsch (kein Absturz).
- **`t("Deutscher Text")`** für dynamisch im Code erzeugte Strings; bei Sprachwechsel feuert `i18n:changed`
  (Features re-rendern ihre t()-gebauten Teile).
- Umschalter **DE/PL** (Topnav + Startbildschirm + Mobil-Header), Auswahl persistiert (`localStorage psm-lang`),
  Auto-Erkennung über Gerätesprache. **Neue sichtbare DE-Strings IMMER in `i18n-dict.ts` ergänzen.**

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

### 🌿 Branch-Modell & aktueller Stand (WICHTIG – bitte beibehalten)

Damit nichts mehr durcheinandergerät (eine klare Regel, an die sich alle – Menschen wie Agenten – halten):

- **`main` = aktueller Quellcode & Arbeitsbranch = Source of Truth.** Alle Änderungen gehen **direkt auf
  `main`** – **keine Pull-Requests, kein Warten auf Freigabe, kein Branch-Wildwuchs.** Historie **linear**
  halten (Fast-Forward), **nie** force-pushen oder umschreiben. `main` ist per Definition der *aktuelle* Stand.
- **`gh-pages` = generierter Deploy-Branch.** Enthält ausschließlich das gebaute `dist/`, das GitHub Pages
  ausliefert (Pages-Quelle = Branch `gh-pages`, Root). **Nicht von Hand editieren** – wird nur über
  `npm run build` + `npx gh-pages -d dist -t` neu erzeugt.
- **Live testen:** Quellcode-Änderung → `main` pushen; dann bauen + nach `gh-pages` deployen → erscheint
  unter dem GH-Pages-Link.
- **Aufräum-Notiz:** Im Repo-Root liegt noch eine **alte Vanilla-JS-Version** (`index.html` + `assets/js/`,
  Pre-Astro, inkl. der entfernten BVL-DB). Sie wird **nicht** ausgeliefert (live = Astro-Build aus `src/`)
  und kann bei Gelegenheit entfernt werden.

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
      i18n.ts              # DE/PL Laufzeit-Übersetzung (+ i18n-dict.ts Wörterbuch)
    components/shellClient.ts  # Sidebar/Header-Navigation (AREAS)
    pages/
      indexClient.ts       # Desktop: mountet Features, Section-Sichtbarkeit
      mobileClient.ts      # Mobile: Tab-Leiste (PSM/Fotos) + DB + Teilen-Status
    features/
      dashboard/ calculation/ documentation/ lager/ acker/ kultur/
      fotos/ settings/ codesManager/ importMerge/ gps/ share/ ...
      kultur/                # Kulturführung: index(Hub) board weather units model
public/data/
  pestalozzi-seed.json     # Stammdaten-Seed (Standorte + Kultur->Mittel)
```

## 📄 Lizenz & Kontakt

MIT – siehe [LICENSE](LICENSE). Basis: [digitale-psm.de](https://www.digitale-psm.de) · Entwickler: Abbas Hoseiny.
