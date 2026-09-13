import { describe, expect, it } from 'vitest'
import { LANG_IDS } from '../site/routes.js'
import enSite from '../site/i18n/en.js'
import frSite from '../site/i18n/fr.js'
import { buildContentPages } from './content-pages.js'
import { htmlRouteMap, jsonLdForPage, landingNoscriptHtml, pagesFor, renderSeoHead, SITE_NAME } from './meta.js'

describe('htmlRouteMap', () => {
  it('deckt alle sechs Sprachen mal fünf Routen plus /app/ ab', () => {
    // home, project, contact, privacy, terms je Sprache + eine einzige /app/-Route
    expect(Object.keys(htmlRouteMap)).toHaveLength(LANG_IDS.length * 5 + 1)
  })

  it('bildet deutsche Pfade ohne Präfix ab', () => {
    expect(htmlRouteMap['index.html']).toBe('/')
    expect(htmlRouteMap['projekt/index.html']).toBe('/projekt/')
    expect(htmlRouteMap['kontakt/index.html']).toBe('/kontakt/')
    expect(htmlRouteMap['datenschutz/index.html']).toBe('/datenschutz/')
    expect(htmlRouteMap['nutzungsbedingungen/index.html']).toBe('/nutzungsbedingungen/')
  })

  it('bildet fremdsprachige Pfade mit Präfix und eigenem Segmentwort ab', () => {
    expect(htmlRouteMap['fr/index.html']).toBe('/fr/')
    expect(htmlRouteMap['fr/projet/index.html']).toBe('/fr/projet/')
    expect(htmlRouteMap['sv/villkor/index.html']).toBe('/sv/villkor/')
    expect(htmlRouteMap['es/contacto/index.html']).toBe('/es/contacto/')
  })

  it('führt /app/ genau einmal, ohne Sprachpräfix', () => {
    expect(htmlRouteMap['app/index.html']).toBe('/app/')
    expect(Object.values(htmlRouteMap).filter((path) => path === '/app/')).toHaveLength(1)
  })
})

describe('pagesFor', () => {
  it('liefert für jede Sprache sechs Seiten (home, project, contact, privacy, terms, app)', () => {
    for (const lang of LANG_IDS) {
      expect(Object.keys(pagesFor(lang))).toHaveLength(6)
    }
  })

  it('stempelt jede Seite mit der angefragten Sprache', () => {
    for (const lang of LANG_IDS) {
      for (const page of Object.values(pagesFor(lang))) {
        expect(page.lang).toBe(lang)
      }
    }
  })

  it('markiert privacy/terms/app als nicht indexiert, den Rest als indexiert', () => {
    const de = pagesFor('de')
    expect(de['/'].indexed).toBe(true)
    expect(de['/projekt/'].indexed).toBe(true)
    expect(de['/kontakt/'].indexed).toBe(true)
    expect(de['/datenschutz/'].indexed).toBe(false)
    expect(de['/nutzungsbedingungen/'].indexed).toBe(false)
    expect(de['/app/'].indexed).toBe(false)
  })

  it('deutsche Seiten bleiben unpräfixiert', () => {
    const keys = Object.keys(pagesFor('de'))
    expect(keys).toEqual(['/', '/projekt/', '/kontakt/', '/datenschutz/', '/nutzungsbedingungen/', '/app/'])
  })

  it('baut fremdsprachige Pfade mit dem passenden Segmentwort', () => {
    const fr = pagesFor('fr')
    expect(Object.keys(fr)).toEqual([
      '/fr/', '/fr/projet/', '/fr/contact/', '/fr/confidentialite/', '/fr/conditions/', '/app/',
    ])
  })

  it('/app/ ist für jede Sprache derselbe unpräfixierte Pfad', () => {
    for (const lang of LANG_IDS) {
      expect(pagesFor(lang)['/app/'].path).toBe('/app/')
    }
  })

  it('übernimmt Titel/Beschreibung wortgleich aus den Website-Texten der jeweiligen Sprache', () => {
    const en = pagesFor('en')
    expect(en['/en/project/'].title).toBe(enSite.pages.project.documentTitle)
    expect(en['/en/project/'].description).toBe(enSite.pages.project.description)
  })
})

/* Das ist die Funktion, um die sich Task 6 dreht: hreflang, Canonical,
   og:locale/language je Route-Sprache. Jeder Fall hier ist gegen eine
   Mutation der zugehörigen Zeile in meta.js gegengeprüft (siehe
   task-6-report.md, Abschnitt „Fix-Runde 1"). */
describe('renderSeoHead', () => {
  const SITE_URL = 'https://guide.zukunftskompetenzchallenge.ch'

  it('eine indexierte fremdsprachige Seite trägt alle sechs hreflang-Alternates plus x-default auf die deutsche Fassung', () => {
    const page = pagesFor('fr')['/fr/projet/']
    const head = renderSeoHead(page)

    const hreflangs = [...head.matchAll(/<link rel="alternate" href="([^"]+)" hreflang="([^"]+)">/g)]
      .map(([, href, hreflang]) => ({ href, hreflang }))

    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/projekt/`, hreflang: 'de' })
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/en/project/`, hreflang: 'en' })
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/fr/projet/`, hreflang: 'fr' })
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/es/proyecto/`, hreflang: 'es' })
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/it/progetto/`, hreflang: 'it' })
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/sv/projektet/`, hreflang: 'sv' })
    // x-default zeigt auf die deutsche Fassung, nicht auf die eigene Sprache.
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/projekt/`, hreflang: 'x-default' })
    expect(hreflangs).toHaveLength(7)
  })

  it('ihr Canonical ist die eigene Sprachfassung, nie die deutsche', () => {
    const page = pagesFor('fr')['/fr/projet/']
    const head = renderSeoHead(page)
    expect(head).toContain(`<link rel="canonical" href="${SITE_URL}/fr/projet/">`)
    expect(head).not.toContain(`<link rel="canonical" href="${SITE_URL}/projekt/">`)
  })

  it('/datenschutz/, /nutzungsbedingungen/ und /app/ tragen kein hreflang', () => {
    const de = pagesFor('de')
    for (const path of ['/datenschutz/', '/nutzungsbedingungen/', '/app/']) {
      const head = renderSeoHead(de[path])
      expect(head).not.toContain('hreflang=')
    }
  })

  it('og:locale und die Startseite selbst tragen ebenfalls die eigene Sprache', () => {
    const page = pagesFor('it')['/it/']
    const head = renderSeoHead(page)
    expect(head).toContain('<meta property="og:locale" content="it_IT">')
    expect(head).toContain(`<link rel="canonical" href="${SITE_URL}/it/">`)
  })

  /* Task 8, Rest 1: og:site_name stand fest auf dem deutschen SITE_NAME, auch
     auf den 175 fremdsprachigen Seiten — beim Teilen von /fr/projet/ erschien
     der deutsche Name in der Vorschau. Jetzt trägt es siteBrand(site), wie
     schon <title> und der Noscript-Block (Fix-Runde 1). */
  it('og:site_name trägt den lokalisierten Markennamen, nicht das feste SITE_NAME', () => {
    const page = pagesFor('fr')['/fr/projet/']
    const head = renderSeoHead(page)
    expect(head).toContain('<meta property="og:site_name" content="Inner Development Guide en classe">')
    expect(head).not.toContain(`<meta property="og:site_name" content="${SITE_NAME}">`)
  })

  it('og:site_name bleibt für Deutsch wortgleich mit SITE_NAME (keine Regression)', () => {
    const page = pagesFor('de')['/']
    const head = renderSeoHead(page)
    expect(head).toContain(`<meta property="og:site_name" content="${SITE_NAME}">`)
  })
})

/* Vor Task 7 war dieser Block fest Deutsch (deutscher Text, feste Links auf
   /app/, /projekt/, /kontakt/) — seit jede Sprache einen eigenen HTML-Einstieg
   bekommt, würde /fr/index.html sonst einen deutschen noscript-Block tragen.
   Jeder Fall hier ist gegen eine Mutation (Rückbau auf feste deutsche Strings)
   gegengeprüft, siehe task-7-report.md. */
describe('landingNoscriptHtml', () => {
  it('bleibt für Deutsch wortgleich mit dem bisherigen, fest verdrahteten Block (Regression)', () => {
    expect(landingNoscriptHtml('de')).toBe(`<noscript>
  <p><strong>Inner Development Guide im Schulalltag</strong> — 25 Kompetenzen als Reflexionskarten für Lehrpersonen.</p>
  <p>Der Inner Development Guide 2.0 beschreibt 25 innere Fähigkeiten in fünf Dimensionen: Sein, Denken, Beziehungen, Zusammenarbeit und Handeln. Dieses digitale Kartenset übersetzt sie in den Unterrichtsalltag — mit Reflexionsfragen, Ideen für die Klasse und Mini-Übungen.</p>
  <p>Dimensionen: <a href="/dimensionen/being/">Sein</a> · <a href="/dimensionen/thinking/">Denken</a> · <a href="/dimensionen/relating/">Beziehungen</a> · <a href="/dimensionen/collaborating/">Zusammenarbeit</a> · <a href="/dimensionen/acting/">Handeln</a></p>
  <p><a href="/app/">Reflexionskarten öffnen</a> · <a href="/projekt/">Das Projekt</a> · <a href="/kontakt/">Kontakt</a></p>
</noscript>`)
  })

  it('trägt für Französisch französischen Text und französische Linkziele statt deutscher', () => {
    const html = landingNoscriptHtml('fr')
    expect(html).toContain(frSite.landing.noscript.tagline)
    expect(html).toContain(frSite.landing.noscript.intro)
    expect(html).toContain('<a href="/fr/projet/">')
    expect(html).toContain('<a href="/fr/contact/">')
    expect(html).toContain('<a href="/app/">')
    expect(html).not.toContain('Reflexionskarten')
    expect(html).not.toContain('/projekt/')
    expect(html).not.toContain('/kontakt/')
  })

  /* Fix-Runde 1, Punkt 1: der Markenname im noscript-Block war fest
     `SITE_NAME` (Deutsch), egal welche Sprache die Seite trägt — Widerspruch
     zum eigenen <title> derselben Datei (z. B. "…en classe" bei /fr/). Jetzt
     kommt er aus `chrome.brand` + `chrome.brandSub` der Route-Sprache. */
  it('zeigt den lokalisierten Markennamen (chrome.brand + chrome.brandSub), nicht das feste SITE_NAME', () => {
    const html = landingNoscriptHtml('fr')
    expect(html).toContain(`<strong>${frSite.chrome.brand} ${frSite.chrome.brandSub}</strong>`)
    expect(html).toContain('<strong>Inner Development Guide en classe</strong>')
    expect(html).not.toContain(SITE_NAME)
  })

  it('für Deutsch ist der lokalisierte Markenname wortgleich mit SITE_NAME (keine Regression)', () => {
    expect(landingNoscriptHtml('de')).toContain(`<strong>${SITE_NAME}</strong>`)
  })

  /* Fix-Runde 1, Punkt 7: Der Doppelpunkt vor der Dimensionsliste war fest im
     Template verdrahtet (kein Leerzeichen davor) — für Französisch falsch,
     das im selben Absatz zwei Sätze vorher korrekt "cinq dimensions : Être"
     schreibt. Jetzt trägt `dimensionsLabel` die Interpunktion selbst. */
  it('setzt für Französisch die Interpunktion vor dem Doppelpunkt (« Dimensions : »), nicht direkt danach', () => {
    const html = landingNoscriptHtml('fr')
    expect(html).toContain('Dimensions :')
    expect(html).not.toContain('Dimensions:')
  })

  it('setzt für Deutsch weiterhin keine Leerstelle vor dem Doppelpunkt («Dimensionen:»)', () => {
    const html = landingNoscriptHtml('de')
    expect(html).toContain('Dimensionen:')
    expect(html).not.toContain('Dimensionen :')
  })

  it('default ist Deutsch, wenn kein Sprachparameter übergeben wird', () => {
    expect(landingNoscriptHtml()).toBe(landingNoscriptHtml('de'))
  })

  /* Fix-Runde 1, Punkt 2: die alte Fassung filterte auf `/${lang}/` und zählte
     damit Projekt- und Kontaktlink mit — `>= 5` hielt deshalb auch, wenn zwei
     der fünf Dimensionslinks fehlten (belegt: mit `.slice(0, lang === 'de' ?
     5 : 3)` in `landingNoscriptHtml` blieben vorher alle 19 Tests grün).
     Jetzt: exakt die fünf erwarteten Pfade aus `buildContentPages`, plus eine
     Gesamtzahl-Kontrolle (5 Dimensionen + App + Projekt + Kontakt = 8 Links). */
  it('verlinkt für jede Sprache genau die fünf Dimensionsseiten dieser Sprache — nicht mehr, nicht weniger', () => {
    for (const lang of LANG_IDS) {
      const html = landingNoscriptHtml(lang)
      const dimPaths = buildContentPages(lang).filter((p) => p.kind === 'dimension').map((p) => p.path)
      expect(dimPaths).toHaveLength(5)
      for (const path of dimPaths) {
        expect(html).toContain(`<a href="${path}">`)
      }
      expect(html.match(/<a href="/g)).toHaveLength(8)
    }
  })
})

/* Schlussprüfung, Punkt 4: `educationalFramework: 'Lehrplan 21'` stand fest
   in jedem `educationalAlignment`-Eintrag, sprachunabhängig — im Widerspruch
   zum Fliesstext derselben fremdsprachigen Kompetenzseiten, der den
   Lehrplan-21-Bezug ausdrücklich aufs Deutsche einschränkt (z. B. it:
   „In tedesco si collegano alle aree disciplinari del Lehrplan 21"). */
describe('jsonLdForPage — educationalFramework', () => {
  const skillPage = (lang) => buildContentPages(lang).find((p) => p.kind === 'skill' && p.id === 'mut')
  const learningResourceBlock = (page) => jsonLdForPage(page).find((b) => b['@type'] === 'LearningResource')

  it('setzt den Lehrplan-21-Bezug für Deutsch', () => {
    const block = learningResourceBlock(skillPage('de'))
    expect(block.educationalAlignment.length).toBeGreaterThan(0)
    for (const alignment of block.educationalAlignment) {
      expect(alignment.educationalFramework).toBe('Lehrplan 21')
    }
  })

  it('lässt den Lehrplan-21-Bezug für die fünf anderen Sprachen weg', () => {
    for (const lang of LANG_IDS.filter((l) => l !== 'de')) {
      const block = learningResourceBlock(skillPage(lang))
      expect(block.educationalAlignment.length).toBeGreaterThan(0)
      for (const alignment of block.educationalAlignment) {
        expect(alignment.educationalFramework).toBeUndefined()
        expect(alignment).not.toHaveProperty('educationalFramework')
      }
    }
  })
})
