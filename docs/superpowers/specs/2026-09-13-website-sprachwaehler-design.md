# Sprachwähler für die ganze Website

## Kontext

Die Karten gibt es in sechs Sprachen, die Website nur auf Deutsch. Der Sprachwähler
im Header (`src/site/chrome.jsx`) schaltet heute ausschliesslich die Karten um: er
schreibt `localStorage` und setzt `<html lang>`, der Seitentext bleibt deutsch. Auf
den Unterseiten ist er damit faktisch wirkungslos — die Seite behauptet
`lang="fr"` und zeigt Deutsch. Mit Italienisch als sechster Sprache fällt das stärker auf.

Gleichzeitig steht seit Kurzem eine SEO-Schicht: 30 indexierbare Dimensions- und
Kompetenzseiten, Sitemap, `llms.txt`, JSON-LD, vorgerenderte Seitenrümpfe. Diese
Arbeit wirkt bisher nur auf Deutsch, obwohl **der Karteninhalt in allen sechs
Sprachen bereits vorliegt**. Die Übersetzungen sind da; ihnen fehlen nur URLs.

Ziel: jede Sprache bekommt eigene, indexierbare URLs mit `hreflang`, und der
Sprachwähler wechselt die gesamte Seite statt nur die Karten.

## Nicht-Ziele

- `/app/` bleibt **eine** Route. Die App merkt sich die Sprache in `localStorage`,
  ist `noindex` und kein Sucheinstieg; sechs Varianten würden `start_url` und
  `scope` im PWA-Manifest verkomplizieren, ohne etwas einzubringen.
- Keine automatische Umleitung nach Browsersprache. Die aufgerufene URL entscheidet.
- Keine Übersetzung der Code-Kommentare, der Projektdoku oder von `llms.txt`.

## Getroffene Entscheidungen

| Frage | Entscheidung |
|---|---|
| Eigene URLs je Sprache? | Ja, Pfadpräfix |
| Deutsch unter `/de/`? | Nein, Deutsch bleibt auf `/`. Die URLs sind live und in der Sitemap; ein Umzug kostet 36 Weiterleitungen ohne Gegenwert. `x-default` zeigt auf Deutsch. |
| Pfadsegmente übersetzen? | Ja (`/en/skills/`, `/fr/competences/`). Das Segment ist ein Rankingsignal; ein deutsches Wort in einer französischen URL wäre eine verschenkte Position. |
| Kompetenz-Slugs übersetzen? | Nein. `mut`, `vergebung` sind schon heute sprachneutrale IDs und stecken in Deep-Links, Glyphen- und Share-Dateinamen. |
| Rechtstexte | Übersetzt, mit Vorrangklausel: massgebend ist die deutsche Fassung. |
| Erstbesuch | Deutsch, Wähler sichtbar. Keine Umleitung. |
| Wo wohnen die Website-Texte? | Eigene Dateien `src/site/i18n/<lang>.js`, getrennt von `src/content/` |

## URL-Schema

```
de (ohne Präfix)        en              fr                es                 it              sv
/                       /en/            /fr/              /es/               /it/            /sv/
/projekt/               /en/project/    /fr/projet/       /es/proyecto/      /it/progetto/   /sv/projektet/
/kontakt/               /en/contact/    /fr/contact/      /es/contacto/      /it/contatti/   /sv/kontakt/
/datenschutz/           /en/privacy/    /fr/confidentialite/ /es/privacidad/ /it/privacy/    /sv/integritet/
/nutzungsbedingungen/   /en/terms/      /fr/conditions/   /es/condiciones/   /it/condizioni/ /sv/villkor/
/dimensionen/<id>/      /en/dimensions/<id>/  /fr/dimensions/<id>/  /es/dimensiones/<id>/  /it/dimensioni/<id>/  /sv/dimensioner/<id>/
/kompetenzen/<id>/      /en/skills/<id>/      /fr/competences/<id>/ /es/competencias/<id>/ /it/competenze/<id>/  /sv/formagor/<id>/
/app/                   (eine Route für alle Sprachen)
```

Segment-Slugs sind bewusst ASCII (`competences`, `formagor`) — akzentfreie Pfade
ersparen Prozent-Kodierung in Links, Sitemap und Analytics.

**Umfang:** 36 Routen heute → 6 Sprachen × (1 Startseite + 4 Unterseiten + 5
Dimensionen + 25 Kompetenzen) + 1 App = **211 Routen**. Davon indexiert 6 × 33 = **198**:
je Sprache Startseite, Projekt, Kontakt, 5 Dimensionen, 25 Kompetenzen. Datenschutz,
Nutzungsbedingungen und `/app/` bleiben `noindex`, aus der Sitemap draussen und
brauchen deshalb auch kein `hreflang`.

Neu **generiert** werden davon 205 Einstiege: die 30 deutschen Inhaltsseiten wie
heute, dazu 5 Sprachen × 35 Seiten. Die sechs deutschen Einstiege (`/`, `/app/`
und die vier Unterseiten) bleiben als Dateien im Repo.

## Module und Datenfluss

### Neu: `src/site/i18n/<lang>.js` (6 Dateien)

Ein Export je Datei mit denselben Schlüsseln:

```js
export const site = {
  lang: 'en',
  // Pfadsegmente dieser Sprache
  segments: { project: 'project', contact: 'contact', privacy: 'privacy',
              terms: 'terms', dimensions: 'dimensions', skills: 'skills' },
  chrome: { brand, brandSub, langLabel, footerHeadings, footerLinks, footerText, skipToContent },
  landing: { heroTitle, heroLead, cta, anatomy: {...}, dims: {...}, ... },
  pages: {
    project: { title, documentTitle, description, lead, body: [...], faq: [...] },
    contact: { ... },
    privacy: { ..., precedenceNote },
    terms:   { ..., precedenceNote },
  },
  contentPages: { dimensionDescriptionSuffix, skillDescriptionSuffix, crumbHome },
  notFound: { title, lead, backHome },
}
```

Fliesstext als Array von Absätzen und Überschriften statt als JSX — so bleiben die
Dateien reine Daten, sind maschinell auf Schlüsselgleichheit prüfbar und enthalten
kein Markup, das pro Sprache auseinanderlaufen kann. `src/site/pages.jsx` bekommt
einen kleinen Renderer, der diese Struktur in die bestehenden `prose`-Elemente
übersetzt.

`precedenceNote` steht nur in den fünf nichtdeutschen Rechtstexten und wird vor dem
ersten Abschnitt ausgegeben.

### Geändert: `src/content/langs.js`

Bleibt die **einzige** Sprachliste. Ergänzt um die Pfadhilfen, weil sie überall
gebraucht werden und sonst dreimal entstehen:

```js
export function langFromPath(pathname)   // '/fr/projet/' → 'fr', '/projekt/' → 'de'
export function stripLangPrefix(pathname) // '/fr/projet/' → '/projet/'
export function localizedPath(routeKey, lang, id?) // ('skill','fr','mut') → '/fr/competences/mut/'
export function translationsOf(pathname)  // → [{ lang, path }] für hreflang und Wähler
```

`routeKey` ist einer von `home | project | contact | privacy | terms | dimension | skill | app`.
Die Segment-Tabelle kommt aus den i18n-Dateien, damit es keine zweite Quelle gibt.

### Geändert: `src/seo/content-pages.js`

Heute: `import { dimensions, skills } from '../content/de.js'` — statisch, und das
Modul liegt über `pages.jsx`, `Landing.jsx` und `content-page-bodies.jsx` **im
Client-Bundle**. Sechs Sprachen statisch dazuzuhängen kostete rund 50 KB gzip.

Deshalb wird das Modul geteilt:

- **`src/seo/routes.js`** (neu, client-tauglich): nur Pfadlogik, kein Inhalt.
  Übernimmt `dimensionPath`/`skillPath` in sprachbewusster Form.
- **`src/seo/content-pages.js`** (bleibt, nur Build): `buildContentPages(lang)` und
  `buildAllContentPages()`, importiert alle sechs Inhaltsdateien. Wird nur noch von
  `meta.js`, `generate-content-pages.mjs` und `generate-seo-files.mjs` benutzt.
- Der Client lädt die Inhalte seiner Route per **dynamischem Import**, wie es
  `src/app/IdgCards.jsx` schon tut. Vite legt dadurch je Sprache einen eigenen Chunk an.

Damit wächst das Site-Bundle nicht, und jede Sprache lädt nur ihre eigenen Daten.

### Geändert: `src/seo/meta.js`

`pages` wird von einer festen Tabelle zu einer Funktion `pagesFor(lang)`, gespeist
aus `site.pages` der i18n-Datei. `renderSeoHead(page)` ergänzt:

- `<link rel="alternate" hreflang="…">` für alle sechs plus `x-default` → Deutsch,
  **nur für indexierte Seiten**
- `<link rel="canonical">` auf die eigene Sprachfassung, nie auf Deutsch
- `inLanguage` im JSON-LD aus der Route statt fest `de-CH`
- übersetzte Breadcrumb-Namen

`htmlRouteMap` wird aus den i18n-Segmenten erzeugt statt handgepflegt.

### Geändert: Generatoren und Build

- `generate-content-pages.mjs`: Schleife über Sprachen, schreibt 205 Stubs mit
  passendem `<html lang>` — auch die Unterseiten der fünf nichtdeutschen Sprachen,
  die es heute nur als eingecheckte deutsche Dateien gibt; `content-routes.json`
  führt `lang` und `routeKey` mit.
- `generate-seo-files.mjs`: Sitemap mit 198 Einträgen, jeder mit `xhtml:link`-
  Alternates. `llms.txt` bleibt deutsch, bekommt am Kopf einen Verweis auf die
  anderen Sprachen.
- `vite.config.js`: die Unterseiten-Einstiege kommen künftig ebenfalls aus
  `content-routes.json`, statt sechs feste Einträge × sechs Sprachen von Hand zu
  pflegen.
- `vercel.json`: Weiterleitung `/de/:path*` → `/:path*`, damit `/de/projekt/` und
  getippte Präfixe nicht ins Leere laufen.

### Geändert: `src/site/chrome.jsx`, `Page.jsx`, `Landing.jsx`

Der Wähler wird vom `localStorage`-Schalter zur **Navigation**: Klick auf Français
führt auf `translationsOf(here)` → `/fr/projet/`, und schreibt `fr` zusätzlich in
`localStorage`, damit die App derselben Wahl folgt. Header, Footer, 404-Text und
die Landingpage beziehen ihre Texte aus der i18n-Datei der aktuellen Route statt
aus `de.js`.

## Randfälle

**Die URL gewinnt gegen `localStorage`.** Wer `it` gespeichert hat und `/fr/projet/`
öffnet, sieht Französisch; die Speicherung wird auf `fr` nachgezogen. Sonst zeigt der
Wähler etwas anderes an als die Seite darunter.

**Sprung in die App.** Der «App öffnen»-Link einer Sprachseite schreibt die Sprache
vor der Navigation in `localStorage`, weil `/app/` eine einzige Route bleibt. Ohne
das öffnet sich die App in der zuletzt gespeicherten, nicht in der angesehenen Sprache.

**Unbekannte Präfixe.** `/de/…` und `/pt/…` existieren nicht als Datei. `vercel.json`
leitet `/de/:path*` auf `/:path*`; alles andere fällt auf die bestehende
404-Behandlung, die künftig in der Sprache des Präfixes antwortet, falls es eine
bekannte ist.

**Prerender und Hydration müssen übereinstimmen.** `renderStaticPageHtml` rendert
heute immer Deutsch. Künftig bekommt es die Sprache aus dem Pfad; weicht die
Hydration davon ab, flackert die Seite. Der Verifikationsschritt prüft das.

## Verifikation

1. **Schlüsselgleichheit** der sechs i18n-Dateien, wie schon bei `src/content/`:
   gleiche Schlüssel, keine leeren Werte, `segments` in allen sechs vollständig.
2. **Routen-Inventar:** `content-routes.json` enthält genau 205 Einträge; zusammen mit
   den sechs eingecheckten deutschen Einstiegen ergibt das 211 Routen, und jede Datei
   existiert nach dem Build.
3. **Pro gebauter HTML-Datei:** `<html lang>` passt zur Route, Canonical zeigt auf
   sich selbst, indexierte Seiten haben genau 7 `alternate`-Zeilen (6 + `x-default`),
   `noindex`-Seiten keine.
4. **Kein deutscher Fliesstext auf fremdsprachigen Routen:** die gebauten HTML-Dateien
   unter `/fr/` gegen markante deutsche Zeichenfolgen prüfen («Reflexionsfragen»,
   «Lehrperson», «Kompetenzen»).
5. **Sitemap** enthält 198 URLs, alle mit Alternates, keine `noindex`-Route.
6. **Bundle:** das Site-Chunk darf gegenüber heute nicht nennenswert wachsen.
7. **Im Browser:** Wähler auf `/fr/kompetenzen/…`, Sprung in die App, Zurück-Knopf,
   Neuladen auf einer `/it/`-Route, `/de/projekt/`-Weiterleitung.

## Risiken

- **Die 2000 Wörter Website-Text × 5 Sprachen sind der eigentliche Aufwand**, nicht
  die Technik. Datenschutz und Nutzungsbedingungen müssen vor dem Deploy von einem
  Menschen gegengelesen werden; die Vorrangklausel mindert das Risiko, hebt es nicht auf.
- **Die SEO-Schicht ist zwei Tage alt und noch in Bewegung.** Je länger zwischen
  Spec und Umsetzung liegt, desto mehr weicht `meta.js` ab.
- Bereits indexierte deutsche URLs bleiben unangetastet — das ist der Grund für
  Deutsch auf `/`. Ein späterer Umzug auf `/de/` wäre teuer.
