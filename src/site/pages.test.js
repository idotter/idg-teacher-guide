import { describe, expect, it } from 'vitest'
import itSite from './i18n/it.js'
import deSite from './i18n/de.js'
import itContent from '../content/it.js'
import deContent from '../content/de.js'
import { pageFromPath } from './pages.jsx'

/* pages.jsx baut Inhaltsseiten (Dimension/Kompetenz) seit Task 6 selbst aus
   den Kartendaten der Route-Sprache statt über das build-only
   `seo/content-pages.js`. Diese Tests sichern zu, dass eine fremdsprachige
   Route wirklich die Kartendaten und Website-Texte ihrer eigenen Sprache
   zieht — nicht (versehentlich) die deutschen. */
describe('pageFromPath — Inhaltsseiten in fremder Sprache', () => {
  it('rendert eine Kompetenzseite mit den italienischen Kartendaten', () => {
    const page = pageFromPath('/it/competenze/mut/', itSite, itContent)
    expect(page).not.toBeNull()
    const skill = itContent.skills.find((s) => s.id === 'mut')
    expect(page.title).toBe(skill.name)
    expect(page.lead).toBe(skill.desc)
    expect(page.documentTitle).toContain(skill.name)
  })

  it('trägt italienische Brotkrumen (crumbHome) statt des deutschen "Startseite"', () => {
    const page = pageFromPath('/it/competenze/mut/', itSite, itContent)
    expect(page.crumbs[0].label).toBe(itSite.contentPages.crumbHome)
    expect(page.crumbs[0].label).not.toBe('Startseite')
    expect(page.crumbs[0].href).toBe('/it/')
  })

  it('verlinkt Geschwisterkarten und die Dimension mit italienischen Pfaden', () => {
    const page = pageFromPath('/it/competenze/mut/', itSite, itContent)
    // crumbs[1] ist die Dimension der Kompetenz
    expect(page.crumbs[1].href).toMatch(/^\/it\/dimensioni\//)
  })

  it('rendert eine Dimensionsseite mit den italienischen Kartendaten', () => {
    const page = pageFromPath('/it/dimensioni/being/', itSite, itContent)
    const dim = itContent.dimensions.find((d) => d.id === 'being')
    expect(page.title).toBe(dim.name)
    expect(page.lead).toBe(dim.subtitle)
  })

  it('deutsche Route bleibt unverändert (Regression)', () => {
    const page = pageFromPath('/kompetenzen/mut/', deSite, deContent)
    const skill = deContent.skills.find((s) => s.id === 'mut')
    expect(page.crumbs[0]).toEqual({ href: '/', label: 'Startseite' })
    expect(page.title).toBe(skill.name)
  })

  /* Fix-Runde 1, Punkt 3: `documentTitle` hing hier bisher am festen
     `SITE_NAME` (Deutsch) statt am lokalisierten Markennamen der Route-
     Sprache — derselbe Fund wie in `content-pages.js` (Build), nur für den
     Hydrations-Titel. `.toContain(skill.name)` oben hätte das nie gemeldet:
     ein deutscher Markenname enthält den italienischen Kompetenznamen
     trotzdem. */
  it('trägt im documentTitle den italienischen Markennamen, nicht "im Schulalltag"', () => {
    const page = pageFromPath('/it/competenze/mut/', itSite, itContent)
    expect(page.documentTitle).toBe(`Coraggio — ${itSite.chrome.brand} ${itSite.chrome.brandSub}`)
    expect(page.documentTitle).toBe('Coraggio — Inner Development Guide in classe')
    expect(page.documentTitle).not.toContain('im Schulalltag')
  })
})
