## Learned User Preferences

- Diese Seite auf Vercel hosten, dort wo bereits `zukunftskompetenzchallenge.ch` liegt — nicht über Hostinger.
- Im sichtbaren Text und in Titles das Angebot als Inner Development Guide bezeichnen, nicht als Inner Development Goals und nicht als IDG; der Attribution-Link bleibt `innerdevelopmentgoals.org`. «IDG»/«Inner Development Goals» nur als Alias in JSON-LD und `llms.txt`. Einzige Ausnahme: Die PWA heisst «IDG Guide für Lehrpersonen» (Kurzname «IDG Guide») — Manifest, iOS-Titel, Splash-Wortmarke, `<title>` von `/app/` und `WebApplication.name`; der Website-Markenname bleibt «Inner Development Guide im Schulalltag».
- Die Landingpage visuell schlank halten: keine Kompetenzzahlen auf den Dimensionsbändern, keine Kartennummern und keine dekorativen Icons, die dem Text Platz nehmen.
- Hero-Copy führt mit dem Ziel («Zukunft gestalten»), die fünf Minuten stehen als zweite Zeile.
- Header-Wortmarke ausschreiben («Inner Development Guide im Schulalltag»); oben rechts Sprachwähler statt «App öffnen» — der App-Button bleibt in Hero und Install-Bereich.
- App-Splashscreen weiss (`#fff`), nicht beige — gilt für In-App-Overlay, Manifest-`background_color` und Boot-Hintergrund in `app/index.html` sowie für `html`/`body`/Safe-Areas, solange der Splash läuft (`getScreenBg` liefert dann `#fff`); nach dem Splash füllt die Dimensionsfarbe der Karte den ganzen Bildschirm, sonst Creme.
- Kartentexte und Beispiele sollen über eine kleine Bearbeitungsoberfläche anpassbar sein: eine Seite pro Karte mit allen Texten.
- Organisches UI überall in der App, auch in den Einstellungen: Pill-Buttons (`borderRadius: 999`), Sprachwahl als Chips, Boxen mit runden Ecken — keine eckigen Rahmen. Der «Im Unterricht»-Button auf der Kartenrückseite trägt kein Icon.

## Learned Workspace Facts

- Vite/React-PWA mit Landing unter `/` und installierbarer App unter `/app/`; kein Backend, Persistenz nur in `localStorage`. Die Standalone-PWA füllt den visuellen Viewport inkl. Safe-Areas; `html`/`body` folgen `--idg-screen-bg` (Dimensionsfarbe im Stapel, sonst Creme `#FAF7F5`).
- Geplante Produktions-URL: `guide.zukunftskompetenzchallenge.ch`.
- Die Challenge-Hauptseite läuft bereits auf Vercel; die DNS-Zone von `zukunftskompetenzchallenge.ch` liegt bei Metanet.
- Als eigenes Vercel-Projekt deployen, nicht in das bestehende Challenge-Projekt mischen (eigene Rewrites/APIs).
- Der Hero-Stapel startet mit der Karte «Kritisches Denken» (`kritisches-denken`); die Reihenfolge von `only` in `IdgCards` steuert die Startkarte.
- Eigenes IDG-Designsystem unter `src/ds`, kein daisyUI.
- Verwandtes Challenge-Repo: `/Users/marc/Dev/zukunftskompetenzwebseite/zukunftskompetenzchallenge`.
- Footer-Navigation: Über das Projekt (Das Projekt, Kontakt) und Rechtliches (Datenschutz, Nutzungsbedingungen); keine Roadmap- oder Spenden-Links — die vier Links sind eigene Seiten.
- Inhalt: 25 Kompetenzen in fünf Dimensionen (Sein, Denken, Beziehungen, Zusammenarbeit, Handeln) nach dem Inner Development Guide 2.0 (Version 7.2); Framework-Texte aus den IDG, Pädagogik eigens; DE mit Lehrplan-21-Anknüpfungen; Karten in DE, EN, FR, ES, IT, SV.
- Karten lassen sich aus der PWA per System-Teilen mit Deep-Link (`/app/?card=<id>`) und gebauter Kartenfront-PNG versenden.
- SEO/GEO liegt unter `src/seo/`; der Build erzeugt `robots.txt`, `sitemap.xml`, `llms.txt`, OG-Bild sowie Seiten unter `/dimensionen/{id}/` und `/kompetenzen/{id}/` mit vollem Karteninhalt und schreibt den Artikeltext in `#root`. Indexiert: Landing, Projekt (inkl. FAQ), Kontakt, Dimensionen, Kompetenzen; `/app/`, Datenschutz und Nutzungsbedingungen bleiben noindex; Landing-Dimensionsbänder verlinken auf `/dimensionen/{id}/`.
