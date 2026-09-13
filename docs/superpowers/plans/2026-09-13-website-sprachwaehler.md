# Sprachwähler für die ganze Website — Implementierungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Jede Sprache bekommt eigene, indexierbare URLs mit `hreflang`, und der Sprachwähler im Header wechselt die gesamte Website statt nur die Karten.

**Architecture:** Ein Pfadpräfix je Sprache (`/fr/…`), Deutsch bleibt auf `/`. Die Website-Texte liegen in sechs reinen Datendateien unter `src/site/i18n/`, getrennt von den Kartendaten in `src/content/`. Ein kleiner Routing-Kern übersetzt zwischen Pfad, Sprache und Routenschlüssel; die bestehenden Generatoren erzeugen daraus statt 30 künftig 205 HTML-Einstiege.

**Tech Stack:** Vite 6, React 18, vitest (neu), Node-Generatorskripte, Vercel-Hosting

**Spec:** `docs/superpowers/specs/2026-09-13-website-sprachwaehler-design.md`

**Eine Abweichung von der Spec, bewusst:** Die Spec legt die Pfadhilfen in
`src/content/langs.js` und die Segment-Tabelle in die i18n-Textdateien. Beides würde
den Routing-Kern an die sechs Volltext-Dateien binden und sie damit ins Client-Bundle
ziehen — genau der Effekt, den die Spec an anderer Stelle vermeiden will. Der Plan legt
deshalb `src/site/routes.js` (Logik) und `src/site/i18n/segments.js` (Tabelle) an, beide
ohne Inhaltsimporte. `langs.js` bleibt unverändert die einzige Sprachliste.

## Global Constraints

- **Deutsch hat kein Präfix.** `/projekt/` bleibt `/projekt/`. Kein bestehender deutscher Pfad ändert sich.
- **Kompetenz- und Dimensions-IDs sind sprachneutral** und ändern sich nie: `mut`, `vergebung`, `being`. Nur die Pfadsegmente davor werden übersetzt.
- **`/app/` bleibt eine einzige Route** ohne Sprachpräfix.
- **`src/content/*.js` wird in diesem Plan nicht angefasst.** Kartendaten und Website-Texte bleiben getrennt.
- **Sprachreihenfolge überall:** `de, en, fr, es, it, sv` — wie in `src/content/langs.js`.
- **Schweizer Rechtschreibung im Deutschen:** ss statt ß.
- **Rechtstexte:** jede nichtdeutsche Fassung von `privacy` und `terms` beginnt mit `precedenceNote`; deutsche Fassung hat kein `precedenceNote`.
- **Keine `noindex`-Seite bekommt `hreflang`** oder einen Sitemap-Eintrag. Das betrifft `privacy`, `terms` und `/app/`.

---

### Task 1: Routing-Kern

Reine Pfadlogik, die Client, Build und Generatoren gemeinsam nutzen. Eigene Datei ohne Inhaltsimporte, damit das Client-Bundle nicht die Textdateien aller sechs Sprachen mitzieht.

**Files:**
- Create: `src/site/i18n/segments.js`
- Create: `src/site/routes.js`
- Test: `src/site/routes.test.js`
- Modify: `package.json` (devDependency `vitest`, Script `test`)

**Interfaces:**
- Produces:
  - `SEGMENTS: Record<lang, Record<routeKey, string>>` aus `segments.js`
  - `langFromPath(pathname: string): string`
  - `stripLangPrefix(pathname: string): string`
  - `routeKeyFromPath(pathname: string): {key: string, id: string|null}` — `key` ist einer von `home|project|contact|privacy|terms|dimension|skill|app|unknown`
  - `localizedPath(key: string, lang: string, id?: string|null): string`
  - `translationsOf(pathname: string): Array<{lang: string, path: string}>`

- [ ] **Step 1: vitest installieren**

```bash
npm install --save-dev vitest
```

Dann in `package.json` bei `scripts` ergänzen (alphabetisch vor `generate:share` einsortieren):

```json
"test": "vitest run",
```

- [ ] **Step 2: Segment-Tabelle anlegen**

Create `src/site/i18n/segments.js`:

```js
/**
 * Pfadsegmente je Sprache. Bewusst eine eigene, winzige Datei: der Routing-Kern
 * braucht sie im Client, die Volltext-Dateien daneben aber nicht — läge die
 * Tabelle dort, zöge jeder Seitenaufruf alle sechs Textdateien ins Bundle.
 *
 * Slugs sind absichtlich ASCII (competences, formagor): akzentfreie Pfade
 * ersparen Prozent-Kodierung in Links, Sitemap und Analytics.
 */
export const SEGMENTS = {
  de: { project: 'projekt', contact: 'kontakt', privacy: 'datenschutz',
        terms: 'nutzungsbedingungen', dimension: 'dimensionen', skill: 'kompetenzen' },
  en: { project: 'project', contact: 'contact', privacy: 'privacy',
        terms: 'terms', dimension: 'dimensions', skill: 'skills' },
  fr: { project: 'projet', contact: 'contact', privacy: 'confidentialite',
        terms: 'conditions', dimension: 'dimensions', skill: 'competences' },
  es: { project: 'proyecto', contact: 'contacto', privacy: 'privacidad',
        terms: 'condiciones', dimension: 'dimensiones', skill: 'competencias' },
  it: { project: 'progetto', contact: 'contatti', privacy: 'privacy',
        terms: 'condizioni', dimension: 'dimensioni', skill: 'competenze' },
  sv: { project: 'projektet', contact: 'kontakt', privacy: 'integritet',
        terms: 'villkor', dimension: 'dimensioner', skill: 'formagor' },
}

/** Seiten ohne Sprachpräfix und ohne Übersetzung. */
export const UNPREFIXED = new Set(['app'])
```

- [ ] **Step 3: Den fehlschlagenden Test schreiben**

Create `src/site/routes.test.js`:

```js
import { describe, expect, it } from 'vitest'
import {
  langFromPath, localizedPath, routeKeyFromPath, stripLangPrefix, translationsOf,
} from './routes.js'

describe('langFromPath', () => {
  it('liest die Sprache aus dem Präfix', () => {
    expect(langFromPath('/fr/projet/')).toBe('fr')
    expect(langFromPath('/sv/formagor/mut/')).toBe('sv')
  })
  it('nimmt Deutsch, wo kein Präfix steht', () => {
    expect(langFromPath('/')).toBe('de')
    expect(langFromPath('/projekt/')).toBe('de')
    expect(langFromPath('/app/')).toBe('de')
  })
  it('behandelt unbekannte Präfixe als Deutsch', () => {
    expect(langFromPath('/pt/projeto/')).toBe('de')
  })
})

describe('stripLangPrefix', () => {
  it('entfernt das Präfix', () => {
    expect(stripLangPrefix('/fr/projet/')).toBe('/projet/')
    expect(stripLangPrefix('/en/')).toBe('/')
  })
  it('lässt deutsche Pfade unberührt', () => {
    expect(stripLangPrefix('/projekt/')).toBe('/projekt/')
  })
})

describe('routeKeyFromPath', () => {
  it('erkennt die Startseite', () => {
    expect(routeKeyFromPath('/')).toEqual({ key: 'home', id: null })
    expect(routeKeyFromPath('/it/')).toEqual({ key: 'home', id: null })
  })
  it('erkennt Unterseiten in jeder Sprache', () => {
    expect(routeKeyFromPath('/projekt/')).toEqual({ key: 'project', id: null })
    expect(routeKeyFromPath('/fr/projet/')).toEqual({ key: 'project', id: null })
    expect(routeKeyFromPath('/sv/villkor/')).toEqual({ key: 'terms', id: null })
  })
  it('erkennt Inhaltsseiten samt ID', () => {
    expect(routeKeyFromPath('/kompetenzen/mut/')).toEqual({ key: 'skill', id: 'mut' })
    expect(routeKeyFromPath('/fr/competences/vergebung/')).toEqual({ key: 'skill', id: 'vergebung' })
    expect(routeKeyFromPath('/es/dimensiones/being/')).toEqual({ key: 'dimension', id: 'being' })
  })
  it('erkennt die App', () => {
    expect(routeKeyFromPath('/app/')).toEqual({ key: 'app', id: null })
  })
  it('meldet Unbekanntes', () => {
    expect(routeKeyFromPath('/gibtsnicht/')).toEqual({ key: 'unknown', id: null })
  })
})

describe('localizedPath', () => {
  it('baut deutsche Pfade ohne Präfix', () => {
    expect(localizedPath('home', 'de')).toBe('/')
    expect(localizedPath('project', 'de')).toBe('/projekt/')
    expect(localizedPath('skill', 'de', 'mut')).toBe('/kompetenzen/mut/')
  })
  it('baut fremdsprachige Pfade mit Präfix', () => {
    expect(localizedPath('home', 'fr')).toBe('/fr/')
    expect(localizedPath('skill', 'fr', 'mut')).toBe('/fr/competences/mut/')
    expect(localizedPath('privacy', 'sv')).toBe('/sv/integritet/')
  })
  it('lässt die App unpräfixiert', () => {
    expect(localizedPath('app', 'fr')).toBe('/app/')
  })
})

describe('translationsOf', () => {
  it('liefert alle sechs Sprachen in fester Reihenfolge', () => {
    const out = translationsOf('/fr/competences/mut/')
    expect(out.map((t) => t.lang)).toEqual(['de', 'en', 'fr', 'es', 'it', 'sv'])
    expect(out.find((t) => t.lang === 'de').path).toBe('/kompetenzen/mut/')
    expect(out.find((t) => t.lang === 'it').path).toBe('/it/competenze/mut/')
  })
  it('liefert für unbekannte Pfade eine leere Liste', () => {
    expect(translationsOf('/gibtsnicht/')).toEqual([])
  })
})
```

- [ ] **Step 4: Test laufen lassen und Fehlschlag sehen**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./routes.js"`

- [ ] **Step 5: Routing-Kern schreiben**

Create `src/site/routes.js`:

```js
import { LANGS } from '../content/langs.js'
import { SEGMENTS, UNPREFIXED } from './i18n/segments.js'

export const LANG_IDS = LANGS.map((l) => l.v)
export const DEFAULT_LANG = 'de'

/** '/x' und '/x/' und 'x' → '/x/'; leer → '/' */
function normalize(pathname) {
  const clean = String(pathname || '').replace(/^\/+|\/+$/g, '')
  return clean ? `/${clean}/` : '/'
}

export function langFromPath(pathname) {
  const first = normalize(pathname).split('/')[1]
  return LANG_IDS.includes(first) && first !== DEFAULT_LANG ? first : DEFAULT_LANG
}

export function stripLangPrefix(pathname) {
  const path = normalize(pathname)
  const lang = langFromPath(path)
  return lang === DEFAULT_LANG ? path : normalize(path.slice(lang.length + 1))
}

export function routeKeyFromPath(pathname) {
  const rest = stripLangPrefix(pathname)
  if (rest === '/') return { key: 'home', id: null }

  const [head, id] = rest.replace(/^\/|\/$/g, '').split('/')
  if (head === 'app') return { key: 'app', id: null }

  const table = SEGMENTS[langFromPath(pathname)]
  const key = Object.keys(table).find((k) => table[k] === head)
  if (!key) return { key: 'unknown', id: null }
  // Inhaltsseiten tragen eine ID, Unterseiten nicht.
  if (key === 'dimension' || key === 'skill') {
    return id ? { key, id } : { key: 'unknown', id: null }
  }
  return id ? { key: 'unknown', id: null } : { key, id: null }
}

export function localizedPath(key, lang, id = null) {
  if (key === 'app') return '/app/'
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`
  if (key === 'home') return `${prefix}/`
  const segment = SEGMENTS[lang]?.[key]
  if (!segment) return `${prefix}/`
  return id ? `${prefix}/${segment}/${id}/` : `${prefix}/${segment}/`
}

export function translationsOf(pathname) {
  const { key, id } = routeKeyFromPath(pathname)
  if (key === 'unknown' || UNPREFIXED.has(key)) return []
  return LANG_IDS.map((lang) => ({ lang, path: localizedPath(key, lang, id) }))
}
```

- [ ] **Step 6: Test laufen lassen und grün sehen**

Run: `npm test`
Expected: PASS, 14 Tests

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/site/i18n/segments.js src/site/routes.js src/site/routes.test.js
git commit -m "Routing-Kern für sprachpräfixierte Pfade."
```

---

### Task 2: Deutsche i18n-Datei und Schlüsselprüfung

Der deutsche Website-Text zieht aus JSX in eine Datendatei um. Danach steht die Struktur fest, an der sich die fünf Übersetzungen orientieren.

**Files:**
- Create: `src/site/i18n/de.js`
- Create: `scripts/check-i18n.mjs`
- Test: `src/site/i18n/i18n.test.js`
- Modify: `package.json` (Script `check:i18n`)

**Interfaces:**
- Consumes: `SEGMENTS` aus Task 1
- Produces: `site` (default export von `src/site/i18n/de.js`) mit der unten festgelegten Form. `scripts/check-i18n.mjs` ist ein reines CLI: es druckt Befunde und endet mit Rückgabecode 1, wenn es welche gibt.

- [ ] **Step 1: Die deutsche Datei aus dem bestehenden JSX ziehen**

Create `src/site/i18n/de.js`. Fliesstext als Blockliste statt JSX — so ist die Datei maschinell prüfbar und enthält kein Markup, das pro Sprache auseinanderläuft. Blocktypen: `h2`, `h3`, `p`, `ul`, `dimList`, `faq`.

```js
/**
 * Website-Texte auf Deutsch (de-CH). Kartentexte liegen getrennt in src/content/.
 * Weitere Sprache: Datei kopieren, Werte übersetzen, Schlüssel unverändert lassen.
 */
export const site = {
  lang: 'de',
  htmlLang: 'de-CH',
  ogLocale: 'de_CH',
  chrome: {
    brand: 'Inner Development Guide',
    brandSub: 'im Schulalltag',
    homeAria: 'Zur Startseite',
    langAria: 'Sprache',
    footerAria: 'Fusszeile',
    footerAbout: 'Über das Projekt',
    footerLegal: 'Rechtliches',
    footerNote: 'Dieses Angebot ist inspiriert vom Inner Development Guide. Mehr unter',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    lead: 'Dieser Pfad führt nirgendwohin.',
    backHome: 'Zur Startseite',
  },
  pages: {
    project: {
      navLabel: 'Das Projekt',
      title: 'Das Projekt',
      documentTitle: 'Das Projekt — Inner Development Guide im Schulalltag',
      description: 'Der Inner Development Guide 2.0 als Reflexionskarten für den Schulalltag: 25 Kompetenzen, fünf Dimensionen, ohne Konto — für Lehrpersonen in der Schweiz.',
      lead: 'Ein digitales Kartenset, das den Inner Development Guide 2.0 in den Unterricht übersetzt — eine Karte, eine Frage, ein Einstieg.',
      body: [
        { t: 'h2', v: 'Worum es geht' },
        { t: 'p', v: 'Der Inner Development Guide 2.0 beschreibt 25 innere Fähigkeiten in fünf Dimensionen: Sein, Denken, Beziehungen, Zusammenarbeit und Handeln. Dieses Angebot macht sie für Lehrpersonen greifbar: als Karten, die sich umdrehen, merken und offline auf dem Gerät behalten lassen.' },
        // … die weiteren Absätze aus src/site/pages.jsx wörtlich übernehmen
        { t: 'h2', v: 'Die fünf Dimensionen' },
        { t: 'dimList' },
        { t: 'h2', v: 'Häufige Fragen' },
        { t: 'faq' },
      ],
      faq: [
        { q: 'Was ist der Inner Development Guide im Schulalltag?', a: '…' },
        // … alle sechs Einträge aus PROJECT_FAQ in src/seo/meta.js
      ],
    },
    contact: { navLabel: 'Kontakt', title: '…', documentTitle: '…', description: '…', lead: '…', body: [...],
               form: { name: 'Name', email: 'E-Mail', message: 'Nachricht', submit: 'Nachricht senden',
                       subject: 'Nachricht von' } },
    privacy: { navLabel: 'Datenschutz', /* kein precedenceNote im Deutschen */ ... },
    terms:   { navLabel: 'Nutzungsbedingungen', ... },
  },
  landing: {
    heroTitle: 'Zukunft gestalten.',
    heroTitleEm: 'In fünf Minuten.',
    heroLead: '…',  // aus src/landing/Landing.jsx
    cta: 'App öffnen',
    anatomy: { title: '…', em: '…', lead: '…', front: 'Vorderseite', back: 'Rückseite', keys: [...] },
    dims: { title: 'Fünf Dimensionen', em: '{n} Kompetenzen' },
    // … die übrigen Abschnitte aus Landing.jsx
  },
  contentPages: {
    skillDescriptionSuffix: 'Reflexionskarten-Einstieg für Lehrpersonen im Inner Development Guide 2.0.',
    crumbHome: 'Startseite',
  },
}

export default site
```

Der vollständige deutsche Text steht bereits im Repo: Unterseiten in `src/site/pages.jsx:65-320`, FAQ in `src/seo/meta.js` (`PROJECT_FAQ`), Titel und Descriptions in `src/seo/meta.js` (`pages`), Landingpage in `src/landing/Landing.jsx:135-260`, Header und Footer in `src/site/chrome.jsx`. **Wörtlich übernehmen, nicht neu formulieren** — die Texte sind lektoriert und teilweise rechtlich relevant.

- [ ] **Step 2: Den fehlschlagenden Test schreiben**

Create `src/site/i18n/i18n.test.js`:

```js
import { describe, expect, it } from 'vitest'
import { LANGS } from '../../content/langs.js'
import { SEGMENTS } from './segments.js'
import de from './de.js'

/** Rekursive Schlüsselpfade, Arrays als eine Einheit. */
function keyPaths(value, prefix = '') {
  if (Array.isArray(value) || value === null || typeof value !== 'object') return [prefix]
  return Object.keys(value).flatMap((k) => keyPaths(value[k], prefix ? `${prefix}.${k}` : k))
}

describe('deutsche i18n-Datei', () => {
  it('hat keine leeren Werte', () => {
    const empty = keyPaths(de).filter((p) => {
      const v = p.split('.').reduce((o, k) => o?.[k], de)
      return v === '' || (Array.isArray(v) && v.length === 0)
    })
    expect(empty).toEqual([])
  })
  it('führt alle vier Unterseiten', () => {
    expect(Object.keys(de.pages).sort()).toEqual(['contact', 'privacy', 'project', 'terms'])
  })
  it('hat für jede Sprache vollständige Segmente', () => {
    const keys = Object.keys(SEGMENTS.de).sort()
    for (const { v } of LANGS) expect(Object.keys(SEGMENTS[v]).sort()).toEqual(keys)
  })
  it('trägt im Deutschen keine Vorrangklausel', () => {
    expect(de.pages.privacy.precedenceNote).toBeUndefined()
    expect(de.pages.terms.precedenceNote).toBeUndefined()
  })
})
```

- [ ] **Step 3: Test laufen lassen**

Run: `npm test`
Expected: PASS, sobald `de.js` vollständig ist — schlägt vorher bei „hat keine leeren Werte" fehl und zeigt, welcher Schlüssel noch fehlt.

- [ ] **Step 4: Prüfskript für alle Sprachen anlegen**

Create `scripts/check-i18n.mjs`. Es vergleicht die Schlüsselpfade aller vorhandenen `src/site/i18n/<lang>.js` gegen Deutsch und meldet Abweichungen; `precedenceNote` ist im Deutschen erlaubt zu fehlen, in den übrigen fünf Pflicht. Aufruf `node scripts/check-i18n.mjs`, Rückgabecode 1 bei Befunden. In `package.json` als `"check:i18n": "node scripts/check-i18n.mjs"` eintragen und in `prebuild` vor `generate:content` einhängen.

- [ ] **Step 5: Commit**

```bash
git add src/site/i18n/de.js src/site/i18n/i18n.test.js scripts/check-i18n.mjs package.json
git commit -m "Deutsche Website-Texte als Daten, Schlüsselprüfung für i18n-Dateien."
```

---

### Task 3: Die fünf Übersetzungen

Der grösste Brocken: rund 2000 Wörter je Sprache. Eine Datei pro Commit, damit ein Review überschaubar bleibt.

**Files:**
- Create: `src/site/i18n/en.js`, `fr.js`, `es.js`, `it.js`, `sv.js`
- Modify: `src/site/i18n/i18n.test.js` (Schleife über alle sechs statt nur Deutsch)

**Interfaces:**
- Consumes: Struktur aus `de.js` (Task 2)
- Produces: je ein `site`-Objekt mit identischen Schlüsselpfaden

- [ ] **Step 1: Test auf alle Sprachen ausweiten**

In `src/site/i18n/i18n.test.js` die Beschreibung ergänzen:

```js
import en from './en.js'
import fr from './fr.js'
import es from './es.js'
import it from './it.js'
import sv from './sv.js'

const ALL = { de, en, fr, es, it, sv }

describe('alle i18n-Dateien', () => {
  const reference = keyPaths(de).sort()
  for (const [lang, data] of Object.entries(ALL)) {
    it(`${lang} hat dieselben Schlüssel wie Deutsch`, () => {
      const own = keyPaths(data).sort().filter((p) => p !== 'pages.privacy.precedenceNote' && p !== 'pages.terms.precedenceNote')
      expect(own).toEqual(reference.filter((p) => !p.endsWith('precedenceNote')))
    })
    it(`${lang} deklariert sich selbst`, () => {
      expect(data.lang).toBe(lang)
    })
  }
  for (const lang of ['en', 'fr', 'es', 'it', 'sv']) {
    it(`${lang} trägt die Vorrangklausel in beiden Rechtstexten`, () => {
      expect(ALL[lang].pages.privacy.precedenceNote).toBeTruthy()
      expect(ALL[lang].pages.terms.precedenceNote).toBeTruthy()
    })
  }
})
```

- [ ] **Step 2: Englisch übersetzen, Test laufen lassen, committen**

`de.js` kopieren, Werte übersetzen, `lang`/`htmlLang`/`ogLocale` auf `en`/`en`/`en_GB` setzen. Titel und Descriptions sinngemäss statt wörtlich — sie sind Suchmaschinentext, keine Prosa. In `privacy` und `terms` als erstes Feld:

```js
precedenceNote: 'This is a translation for convenience. In case of any discrepancy, the German version prevails.',
```

Run: `npm test` → PASS. Dann:

```bash
git add src/site/i18n/en.js src/site/i18n/i18n.test.js
git commit -m "Website-Texte auf Englisch."
```

- [ ] **Step 3: Französisch** — gleiches Vorgehen, `fr`/`fr`/`fr_CH`. Klausel: `Cette traduction est fournie à titre indicatif. En cas de divergence, la version allemande fait foi.` Commit einzeln.

- [ ] **Step 4: Spanisch** — `es`/`es`/`es_ES`. Klausel: `Esta traducción se ofrece a título informativo. En caso de discrepancia, prevalece la versión alemana.` Commit einzeln.

- [ ] **Step 5: Italienisch** — `it`/`it`/`it_IT`. Klausel: `Questa traduzione è fornita a titolo informativo. In caso di divergenza prevale la versione tedesca.` Commit einzeln.

- [ ] **Step 6: Schwedisch** — `sv`/`sv`/`sv_SE`. Klausel: `Denna översättning tillhandahålls i informationssyfte. Vid avvikelser gäller den tyska versionen.` Commit einzeln.

---

### Task 4: Seitenrumpf aus Daten rendern

`src/site/pages.jsx` hört auf, deutsches JSX zu halten, und rendert stattdessen die Blocklisten der i18n-Datei.

**Files:**
- Modify: `src/site/pages.jsx` (ersetzt `pages`, behält `pageFromPath` und `ContactForm`)
- Modify: `src/site/Page.jsx:8-19` (404-Text aus i18n)

**Interfaces:**
- Consumes: `site.pages`, `site.notFound` aus Task 2/3; `routeKeyFromPath`, `localizedPath` aus Task 1
- Produces: `pageFromPath(pathname, site, content)` — zwei Argumente neu, `content` sind die `{dimensions, skills, ui}` der Route-Sprache; liefert weiterhin `{title, documentTitle, description, lead, crumbs, body}`

- [ ] **Step 1: Blockrenderer schreiben**

In `src/site/pages.jsx`:

```jsx
function Blocks({ blocks, site, lang, dimensions, faq }) {
  return blocks.map((b, i) => {
    if (b.t === 'h2') return <h2 key={i}>{b.v}</h2>
    if (b.t === 'h3') return <h3 key={i}>{b.v}</h3>
    if (b.t === 'p') return <p key={i}>{b.v}</p>
    if (b.t === 'ul') return <ul key={i}>{b.v.map((li, j) => <li key={j}>{li}</li>)}</ul>
    if (b.t === 'dimList') {
      return (
        <ul key={i}>
          {dimensions.map((dim) => (
            <li key={dim.id}>
              <a href={localizedPath('dimension', lang, dim.id)}>{dim.name}</a>
              {' — '}{dim.subtitle}
            </li>
          ))}
        </ul>
      )
    }
    if (b.t === 'faq') {
      return faq.map((item, j) => (
        <React.Fragment key={`${i}-${j}`}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </React.Fragment>
      ))
    }
    return null
  })
}
```

- [ ] **Step 2: `pageFromPath` auf Sprache umstellen**

```jsx
export function pageFromPath(pathname, site, content) {
  const lang = langFromPath(pathname)
  const { key, id } = routeKeyFromPath(pathname)

  if (key === 'dimension' || key === 'skill') {
    return contentPage(key, id, lang, site, content)
  }
  const page = site.pages[key]
  if (!page) return null
  return {
    title: page.title,
    documentTitle: page.documentTitle,
    description: page.description,
    lead: page.lead,
    crumbs: [{ href: localizedPath('home', lang), label: site.contentPages.crumbHome }],
    body: (
      <>
        {page.precedenceNote && <p className="note">{page.precedenceNote}</p>}
        <Blocks blocks={page.body} site={site} lang={lang}
                dimensions={content.dimensions} faq={page.faq || []} />
        {key === 'contact' && <ContactForm labels={page.form} />}
      </>
    ),
  }
}
```

`contentPage(...)` ist die bestehende Verzweigung aus `pages.jsx:322-340`, ergänzt um `lang`.

- [ ] **Step 3: Build und Sichtprüfung**

Run: `npm run build && npx vite preview --port 5190`
Deutsche Seiten müssen unverändert aussehen — das ist der ganze Zweck dieses Schritts: kein sichtbarer Unterschied, nur eine andere Quelle.

- [ ] **Step 4: Commit**

```bash
git add src/site/pages.jsx src/site/Page.jsx
git commit -m "Seitenrümpfe aus den i18n-Daten statt aus festem JSX rendern."
```

---

### Task 5: Wähler navigiert, Kopf und Fuss werden sprachabhängig

**Files:**
- Modify: `src/site/chrome.jsx` (`SiteHeader`, `SiteFooter`, `FOOT_ABOUT`, `FOOT_LEGAL`, `LangSwitcher`)
- Modify: `src/landing/Landing.jsx:3` (nicht mehr fest `de.js`)

**Interfaces:**
- Consumes: `translationsOf`, `localizedPath`, `langFromPath` aus Task 1; `site.chrome` aus Task 2/3
- Produces: `SiteHeader({ site, here })`, `SiteFooter({ site, here })` — `lang`/`onLangChange` entfallen

- [ ] **Step 1: Footer-Links sprachabhängig machen**

`FOOT_ABOUT` und `FOOT_LEGAL` werden von Konstanten zu Funktionen:

```js
export function footAbout(site, lang) {
  return [
    { href: localizedPath('project', lang), label: site.pages.project.navLabel },
    { href: localizedPath('contact', lang), label: site.pages.contact.navLabel },
  ]
}

export function footLegal(site, lang) {
  return [
    { href: localizedPath('privacy', lang), label: site.pages.privacy.navLabel },
    { href: localizedPath('terms', lang), label: site.pages.terms.navLabel },
  ]
}
```

- [ ] **Step 2: Wähler navigieren lassen**

In `SiteHeader` ersetzt eine Navigation den State-Wechsel. `writeStoredLang` bleibt, damit die App derselben Wahl folgt:

```jsx
const changeLang = (next) => {
  writeStoredLang(next)
  const target = translationsOf(here).find((t) => t.lang === next)
  window.location.assign(target ? target.path : localizedPath('home', next))
}
```

- [ ] **Step 3: URL gewinnt gegen localStorage**

In `Page.jsx` und `Landing.jsx` beim Mount:

```js
useEffect(() => { writeStoredLang(langFromPath(here)) }, [here])
```

Ohne das zeigt der Wähler eine andere Sprache an als die Seite darunter.

- [ ] **Step 4: Sprung in die App**

Der CTA auf der Landingpage schreibt die Sprache, bevor er navigiert:

```jsx
<a className="btn" href="/app/" onClick={() => writeStoredLang(lang)}>{site.landing.cta}</a>
```

- [ ] **Step 5: Im Browser prüfen**

`npm run dev`, dann auf `/` den Wähler auf Français stellen → landet auf `/fr/`. Von dort auf „Ouvrir l'application" → App auf Französisch. Zurück-Knopf führt auf `/fr/`.

- [ ] **Step 6: Commit**

```bash
git add src/site/chrome.jsx src/site/Page.jsx src/landing/Landing.jsx
git commit -m "Sprachwähler navigiert statt nur zu speichern."
```

---

### Task 6: Inhaltsmodul teilen, meta.js mehrsprachig

**Files:**
- Modify: `src/seo/content-pages.js` (Inhaltsteil, nur Build)
- Modify: `src/seo/meta.js` (`pages` → `pagesFor(lang)`, hreflang, canonical, inLanguage)
- Modify: `src/seo/static-page.jsx` (Sprache aus dem Pfad)
- Modify: `src/site/content-page-bodies.jsx`, `src/landing/Landing.jsx` (Pfade aus `routes.js` statt `content-pages.js`)

**Interfaces:**
- Consumes: `localizedPath`, `translationsOf` aus Task 1
- Produces: `buildContentPages(lang)`, `buildAllContentPages()`, `pagesFor(lang)`, `renderSeoHead(page)` mit `page.lang`

- [ ] **Step 1: Pfadfunktionen aus `content-pages.js` herauslösen**

`dimensionPath`/`skillPath` entfallen dort; alle Aufrufer importieren `localizedPath` aus `src/site/routes.js`. Danach importiert `content-pages.js` die Inhaltsdateien aller sechs Sprachen statisch — das ist in Ordnung, weil es nur noch im Build läuft.

- [ ] **Step 2: Prüfen, dass die Textdateien aus dem Client-Bundle sind**

Run: `npm run build`
Expected: In `dist/assets/` gibt es je Sprache einen eigenen Chunk; das Site-Chunk enthält keine Kartentexte. Gegenprobe:

```bash
grep -l "Reflexionsfragen" dist/assets/*.js | head
```

Erwartet: nur die Sprach-Chunks, nicht das Site-Chunk.

- [ ] **Step 3: hreflang und Canonical**

In `renderSeoHead` vor `linkTag('canonical', url)` einfügen:

```js
...(page.indexed
  ? translationsOf(page.path).map((t) =>
      linkTag('alternate', absoluteUrl(t.path), ` hreflang="${t.lang}"`))
    .concat(linkTag('alternate', absoluteUrl(localizedPath(routeKeyFromPath(page.path).key, 'de', routeKeyFromPath(page.path).id)), ' hreflang="x-default"'))
  : []),
```

Canonical bleibt `absoluteUrl(page.path)` — also die eigene Sprachfassung, nie die deutsche. `metaTag('language', …)` und `og:locale` kommen aus `site.htmlLang` bzw. `site.ogLocale`.

- [ ] **Step 4: htmlRouteMap und Breadcrumbs**

`htmlRouteMap` wird aus `SEGMENTS` erzeugt statt handgepflegt — sonst gibt es eine
zweite Quelle für dieselben Pfade:

```js
export const htmlRouteMap = Object.fromEntries(
  LANG_IDS.flatMap((lang) => {
    const prefix = lang === 'de' ? '' : `${lang}/`
    return [
      [`${prefix}index.html`, localizedPath('home', lang)],
      ...['project', 'contact', 'privacy', 'terms'].map((key) => [
        `${prefix}${SEGMENTS[lang][key]}/index.html`, localizedPath(key, lang),
      ]),
    ]
  }).concat([['app/index.html', '/app/']]),
)
```

In `breadcrumbJsonLd` ersetzt `site.contentPages.crumbHome` das feste `'Startseite'`,
und `absoluteUrl(dimensionPath(page.dim.id))` wird zu
`absoluteUrl(localizedPath('dimension', page.lang, page.dim.id))`.

- [ ] **Step 5: Prerender und Hydration auf dieselbe Sprache bringen**

`renderStaticPageHtml(pathname)` lädt bisher immer Deutsch. Künftig:

```jsx
export function renderStaticPageHtml(pathname, site, content) {
  const page = pageFromPath(pathname, site, content)
  if (!page) return ''
  return renderToStaticMarkup(<PageLayout page={page} here={pathname} site={site} />)
}
```

Weicht die Hydration von der vorgerenderten Sprache ab, flackert die Seite beim Laden.
Gegenprobe im Browser: `/it/progetto/` neu laden — der Text darf sich nicht sichtbar ändern.

- [ ] **Step 6: Commit**

```bash
git add src/seo/ src/site/content-page-bodies.jsx src/landing/Landing.jsx
git commit -m "SEO-Kopf je Sprache mit hreflang und eigenem Canonical."
```

---

### Task 7: Generatoren und Hosting

**Files:**
- Modify: `scripts/generate-content-pages.mjs` (205 Stubs statt 30)
- Modify: `scripts/generate-seo-files.mjs` (Sitemap 198 Einträge mit Alternates)
- Modify: `vite.config.js` (Einstiege aus `content-routes.json`)
- Modify: `vercel.json` (Weiterleitung `/de/:path*`)
- Modify: `.gitignore` (die neuen generierten Sprachordner)

**Interfaces:**
- Consumes: `buildAllContentPages()`, `pagesFor(lang)` aus Task 6
- Produces: `scripts/content-routes.json` mit Einträgen `{path, html, inputKey, lang, routeKey}`

- [ ] **Step 1: Stubs für alle Sprachen erzeugen**

Die Schleife deckt künftig beides ab: Inhaltsseiten **und** die Unterseiten der fünf nichtdeutschen Sprachen. `<html lang>` je Stub aus `site.htmlLang`.

- [ ] **Step 2: Prüfen**

Run: `npm run generate:content`
Expected: `Generated 205 content page HTML entries`

- [ ] **Step 3: Sitemap mit Alternates**

Jeder `<url>`-Block bekommt für jede Übersetzung:

```xml
<xhtml:link rel="alternate" hreflang="fr" href="https://guide.zukunftskompetenzchallenge.ch/fr/competences/mut/"/>
```

Das Wurzelelement braucht `xmlns:xhtml="http://www.w3.org/1999/xhtml"`.

- [ ] **Step 4: Weiterleitung für `/de/`**

In `vercel.json` neben `headers`:

```json
"redirects": [
  { "source": "/de", "destination": "/", "permanent": true },
  { "source": "/de/:path*", "destination": "/:path*", "permanent": true }
]
```

- [ ] **Step 5: Build und Commit**

```bash
npm run build
git add scripts/ vite.config.js vercel.json .gitignore public/sitemap.xml public/llms.txt
git commit -m "205 Seiteneinstiege und mehrsprachige Sitemap erzeugen."
```

---

### Task 8: Ausgabeprüfung

Ein Skript, das die gebaute Website gegen die Spec prüft. Läuft nach `npm run build`.

**Files:**
- Create: `scripts/check-build.mjs`
- Modify: `package.json` (Script `check:build`)

**Interfaces:**
- Consumes: `dist/`, `buildAllContentPages()`, `translationsOf`

- [ ] **Step 1: Prüfungen schreiben**

`scripts/check-build.mjs` prüft über alle HTML-Dateien in `dist/`:

1. `<html lang>` passt zur Route
2. genau ein `<link rel="canonical">`, und es zeigt auf die eigene URL
3. indexierte Seiten haben genau 7 `hreflang`-Zeilen, `noindex`-Seiten keine
4. `dist/sitemap.xml` enthält genau 198 `<loc>`, keine davon `noindex`
5. keine Datei unter `dist/fr|es|it|sv/` enthält `Reflexionsfragen`, `Lehrperson` oder `Anknüpfungspunkte`
6. jeder Pfad aus `content-routes.json` existiert als Datei

Rückgabecode 1 bei Befunden, mit Angabe von Datei und Prüfung.

- [ ] **Step 2: Laufen lassen**

Run: `npm run build && npm run check:build`
Expected: `211 Routen geprüft, 0 Befunde`

- [ ] **Step 3: Browser-Verifikation**

`npx vite preview --port 5190`, dann: Wähler auf `/fr/competences/mut/` durch alle sechs Sprachen; Neuladen auf `/it/progetto/`; `/de/projekt/` landet auf `/projekt/`; ein unbekannter Pfad zeigt die 404-Seite in der Sprache des Präfixes.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-build.mjs package.json
git commit -m "Gebaute Website gegen die Mehrsprachigkeits-Spec prüfen."
```

---

## Offene Punkte für den Menschen

- **Die fünf Fassungen von Datenschutz und Nutzungsbedingungen müssen vor dem Deploy gegengelesen werden.** Die Vorrangklausel mindert das Risiko, hebt es nicht auf.
- **`llms.txt` bleibt deutsch** und bekommt nur einen Verweis auf die anderen Sprachen — bewusst, weil die Datei ein Fliesstext-Abriss ist und nicht sechsfach gepflegt werden soll.
- **Die Segment-Slugs** (`/en/skills/`, `/fr/competences/`) sind nach dem ersten Deploy nur noch mit Weiterleitungen änderbar.
