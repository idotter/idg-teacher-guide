import { describe, expect, it } from 'vitest'
import deSite from '../site/i18n/de.js'
import frSite from '../site/i18n/fr.js'
import { pageLabel, SITE_NAME, siteBrand } from './site-info.js'

/* siteBrand/pageLabel tragen die Fix-Runde-1-Korrektur für Punkt 1 und 3:
   der lokalisierte Markenname (chrome.brand + chrome.brandSub) statt des
   festen, sprachübergreifenden SITE_NAME. Die deutsche Identität
   (siteBrand(deSite) === SITE_NAME) ist die Grundlage, auf der sich alle
   anderen "Deutsch bleibt byte-gleich"-Zusicherungen in meta.test.js,
   content-pages.test.js und pages.test.js verlassen — deshalb hier separat
   als eigene, kleinste Einheit geprüft. */
describe('siteBrand', () => {
  it('ist für Deutsch wortgleich mit SITE_NAME', () => {
    expect(siteBrand(deSite)).toBe(SITE_NAME)
    expect(siteBrand(deSite)).toBe('Inner Development Guide im Schulalltag')
  })

  it('ist für Französisch ein eigener, lokalisierter String — nicht SITE_NAME', () => {
    expect(siteBrand(frSite)).toBe('Inner Development Guide en classe')
    expect(siteBrand(frSite)).not.toBe(SITE_NAME)
  })
})

describe('pageLabel', () => {
  it('nutzt ohne zweites Argument weiterhin SITE_NAME (bestehende Aufrufer bleiben unverändert)', () => {
    expect(pageLabel('Mut')).toBe('Mut — Inner Development Guide im Schulalltag')
  })

  it('nutzt mit zweitem Argument den übergebenen Markennamen statt SITE_NAME', () => {
    expect(pageLabel('Courage', siteBrand(frSite))).toBe('Courage — Inner Development Guide en classe')
  })
})
