# IDG im Schulalltag

Die Inner Development Goals als Reflexionskarten für Lehrpersonen. 25 Kompetenzen
in 5 Dimensionen, je mit Reflexionsfragen für die Lehrperson und für die Klasse,
Ideen für den Unterricht, Anknüpfungspunkten an die Fachbereiche und einer
Mini-Übung.

Umgesetzt aus dem Claude-Design-Projekt **IDG Reflexionsfragen App**, Datei
`IDG Karten v3 organisch.dc.html`.

## Zwei Einstiegspunkte

| Pfad    | Inhalt                                                            |
|---------|-------------------------------------------------------------------|
| `/`     | Landingpage — Marketingseite mit einem echten, umdrehbaren Kartenstapel als Held (fünf Karten, eine je Dimension) |
| `/app/` | Die App selbst, installierbar als PWA, offlinefähig               |

## Entwickeln

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

Share-Bilder der Kartenfront (`public/assets/share/{lang}/{id}.png`) werden beim
Build erzeugt (`npm run generate:share`, läuft automatisch als `prebuild`). Nach
Änderungen an `src/content/` oder am Front-Layout das Skript erneut ausführen.

## Aufbau

```
index.html              Landingpage
app/index.html          PWA-Einstieg (start_url im Manifest)
src/
  app/IdgCards.jsx      die gesamte App — Kartenstapel, Dimensionen,
                        Merkliste, Einstellungen, Sheet, Menü, Tour, Splash
  app/cards.css         Hover-/Active-Zustände und Animationen
  landing/Landing.jsx   Landingpage (Marketingseite)
  landing/Simulator.jsx früheres Schaltpult für die Gestaltungsvarianten,
                        nicht mehr eingebunden — siehe Kopf der Datei
  landing/landing.css
  content/de.js         alle Inhalte: ui, dimensions, skills
  content/{en,fr,es,sv}.js  dieselbe Struktur, gleiche IDs
  ds/                   Design-System-Tokens, unverändert aus dem Projekt
scripts/
  extract-skill-glyphs.mjs  Kompetenzglyphen aus dem Guide-PDF schneiden
  generate-share-cards.mjs  Share-PNG der Kartenfront je Sprache und Kompetenz
public/
  assets/               Symbole, Kompetenzgrafiken, Icons
  manifest.webmanifest
  sw.js                 Service Worker für den Offline-Betrieb
```

## Gestaltungsvarianten

Die Vorlage definiert acht Achsen als `data-props`. Die App setzt die dortigen
Vorgaben; durchschaltbar sind sie über `Simulator.jsx` (aktuell nicht
eingebunden):

| Prop          | Werte                        | Vorgabe    |
|---------------|------------------------------|------------|
| `variant`     | `farbe`, `papier`            | `farbe`    |
| `back`        | `liste`, `fokus`, `ruhig`    | `liste`    |
| `depth`       | `flach`, `schatten`, `stapel`| `schatten` |
| `flipAxis`    | `y`, `x`                     | `y`        |
| `showNumbers` | `true`, `false`              | `false`    |
| `radius`      | `eckig`, `weich`, `rund`     | `weich`    |
| `ui`          | `minimal`, `leiste`, `ohne`  | `minimal`  |
| `lang`        | `de`, `en`, `fr`, `es`, `sv` | `de`       |
| `only`        | Liste von Skill-IDs          | –          |

`ui="ohne"` blendet Punktleiste, Menü und den eigenen Grund aus: es bleibt
nur der Kartenstapel, der auf der einbettenden Seite liegt. So steht er auf der
Landingpage. `only` beschränkt den Stapel auf bestimmte Karten — dort auf die
erste Kompetenz jeder Dimension.

## Daten auf dem Gerät

Merkliste und Einstellungen liegen ausschliesslich im `localStorage` des
Browsers und werden nirgends hochgeladen. Die App nutzt den Präfix
`idg-cards-`, der Stapel auf der Landingpage `idg-demo-` — Ausprobieren auf
der Landingpage überschreibt also keine echte Merkliste.

## Sprachen

Deutsch, Englisch, Französisch, Spanisch und Schwedisch. Jede Sprache ist ein
eigenes Bündel; geladen wird nur die aktive.

Jede Karte hat zwei Schichten, die unterschiedlich entstanden sind:

- **Rahmenwerk** — Dimensionsname, Untertitel, Einleitung, Kompetenzname und
  Beschreibung. Aus dem **Inner Development Guide 2.0 (Version 7.2)**,
  deutsche Ausgabe; im Deutschen wörtlich übernommen und nur auf Schweizer
  Rechtschreibung gebracht (ß → ss), in en/fr/es/sv daraus übersetzt. Wo die
  Formulierung der Version 1.0 der 2.0-Definition noch entspricht, ist sie
  stehen geblieben.
- **Pädagogik** — Reflexionsfragen, Unterrichtsideen, Anknüpfungspunkte und
  Mini-Übung. Nicht Teil des IDG-Rahmenwerks, sondern für diese App
  geschrieben. In en/fr/es/sv aus dem Deutschen übersetzt.

Die IDs der Kompetenzen sind sprechende Slugs (`vergebung`, `resilienz`) und
nicht durchnummeriert. Sie stehen im Deep-Link (`/app/?card=resilienz`), in der
Merkliste und als Dateiname der Glyphen und Share-Karten — eine erneute
Umstellung des Rahmenwerks soll sie deshalb nicht verschieben. Die angezeigte
Nummer (`2.3`) wird aus der Position berechnet.

Die Anknüpfungspunkte sind im Deutschen Lehrplan-21-Fachbereiche. Für die
anderen Sprachen wurden sie sinngemäss verallgemeinert („Natur, Mensch,
Gesellschaft" → „Science & society"), weil eine wörtliche Übersetzung ausserhalb
der Schweiz nichts bezeichnet.

### Weitere Sprache ergänzen

`src/content/de.js` kopieren, Werte übersetzen, IDs und `icon`-Namen unverändert
lassen, dann in `src/app/IdgCards.jsx` in `LANGS` eintragen. Die Sprachauswahl
listet nur Sprachen, die es wirklich gibt.

## Zeichen auf den Karten

Kompetenz- und Dimensionszeichen werden nicht als fertige Bilddatei geladen,
sondern als CSS-Maske eingefärbt (`Glyph` in `IdgCards.jsx`). Die Form eines
Zeichens steckt allein im Alphakanal — die farbige und die weisse Datei
unterscheiden sich nur in den RGB-Werten, geprüft über alle 30 Paare mit
0 Alpha-Abweichungen. Dadurch bestimmt der Code die Vordergrundfarbe:

- auf einer Fläche in Dimensionsfarbe **immer Weiss**, auch auf dem hellen
  Beige von „Sein";
- auf hellem Grund (weisse Zeile, Papierkarte) die Dimensionsfarbe — mit einer
  Ausnahme: „Sein" bekommt dort das abgedunkelte Beige `#8a7350`, das die
  Vorlage für Text in derselben Lage schon nutzt. Reines Beige auf Weiss ergibt
  Kontrast 1.8; die Linienzeichen der Kompetenzen sind in der Dimensionsliste
  bei 40 px sonst nicht mehr zu sehen.

Die Dimensionssymbole auf dem Startbildschirm sind Vollflächen statt
Linienzeichen und behalten dort die reine Markenfarbe.

## App-Icon

Die fünf Dimensionssymbole als Kreis angeordnet, je in ihrer Dimensionsfarbe,
auf dem hellen Markengrund `#FAF7F5`. Erzeugt aus den Symbolmasken
(`public/assets/symbols/white/`), damit Form und Farbe aus derselben Quelle
kommen wie in der App.

| Datei | Grösse | Zweck |
|---|---|---|
| `icon-512.png` | 512 | Manifest |
| `icon-192.png` | 192 | Manifest, Hinweis in den Einstellungen |
| `icon-maskable-512.png` | 512 | Android, Inhalt in der Sicherheitszone (0.34 der Kantenlänge, Grenze 0.40) |
| `apple-touch-icon.png` | 180 | iOS-Startbildschirm |
| `favicon-64.png` | 64 | Browser-Tab |

Alle vollflächig deckend — iOS legt transparente Icons sonst auf Schwarz.

Der helle Grund ist eine bewusste Wahl: Auf Schwarz verschwindet das dunkle
Burgunder von „Handeln" (Kontrast ~1.9), auf Hell bleibt das beige „Sein" als
Vollfläche gut lesbar. Die vorherigen Icons (weisse Symbole auf Schwarz) liegen
unter `.icon-backup/`; wenn sie nicht mehr gebraucht werden, kann der Ordner
weg.

## Herkunft der Grafiken

Die Dimensionssymbole, die App-Icons und das Kartenlayout stammen aus dem
Design-Projekt. Die 25 Kompetenzglyphen sind aus dem Guide-PDF selbst
geschnitten — `scripts/extract-skill-glyphs.mjs` rendert die Kachelspalte jeder
Dimensionsseite mit `pdftoppm` in 600 dpi, findet die fünf Kacheln über den
Kontrast zum Seitenhintergrund und rechnet jede in eine Alpha-Maske um (Alpha =
Projektion des Pixels auf die Strecke von der Dimensionsfarbe nach Weiss):

```
node scripts/extract-skill-glyphs.mjs "~/Downloads/Inner Development Guide (German).pdf"
```

Aus dem PDF statt aus dem Design-Projekt, weil die Version 2.0 vier Glyphen
mitbringt, die es im alten Satz nicht gab (Kreativität als Neuneck der Dimension
„Denken", Vergebung, Bewusster Umgang mit Ressourcen, Proaktiv Handeln). Alle 25
aus einer Quelle zu schneiden hält den Satz in sich konsistent. Der Faktor
`scale` je Dimension hält die Glyphen auf der Grösse des bisherigen Satzes, damit
die Karten beim Update nicht springen.

Gespeichert wird als Palette-PNG mit 128 Farben — Strichgrafik auf Transparenz
braucht nicht mehr, und es spart gegenüber RGBA rund zwei Drittel. Die farbige
Variante entsteht aus der bereits quantisierten weissen, damit beide denselben
Alphakanal tragen.

## Attribution

Diese Arbeit ist inspiriert von den Inner Development Goals.
Mehr unter [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org).
