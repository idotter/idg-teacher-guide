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
  it('entfernt auch das explizite deutsche Präfix', () => {
    expect(stripLangPrefix('/de/')).toBe('/')
    expect(stripLangPrefix('/de/projekt/')).toBe('/projekt/')
  })
  it('lässt deutsche Pfade ohne Präfix unberührt', () => {
    expect(stripLangPrefix('/projekt/')).toBe('/projekt/')
  })
})

describe('routeKeyFromPath', () => {
  it('erkennt die Startseite', () => {
    expect(routeKeyFromPath('/')).toEqual({ key: 'home', id: null })
    expect(routeKeyFromPath('/it/')).toEqual({ key: 'home', id: null })
  })
  it('erkennt Startseite auch mit explizitem deutschem Präfix', () => {
    expect(routeKeyFromPath('/de/')).toEqual({ key: 'home', id: null })
  })
  it('erkennt Unterseiten in jeder Sprache', () => {
    expect(routeKeyFromPath('/projekt/')).toEqual({ key: 'project', id: null })
    expect(routeKeyFromPath('/fr/projet/')).toEqual({ key: 'project', id: null })
    expect(routeKeyFromPath('/sv/villkor/')).toEqual({ key: 'terms', id: null })
  })
  it('erkennt Unterseiten auch mit explizitem deutschem Präfix', () => {
    expect(routeKeyFromPath('/de/projekt/')).toEqual({ key: 'project', id: null })
  })
  it('erkennt Inhaltsseiten samt ID', () => {
    expect(routeKeyFromPath('/kompetenzen/mut/')).toEqual({ key: 'skill', id: 'mut' })
    expect(routeKeyFromPath('/fr/competences/vergebung/')).toEqual({ key: 'skill', id: 'vergebung' })
    expect(routeKeyFromPath('/es/dimensiones/being/')).toEqual({ key: 'dimension', id: 'being' })
  })
  it('erkennt Inhaltsseiten mit ID auch bei explizitem deutschem Präfix', () => {
    expect(routeKeyFromPath('/de/kompetenzen/mut/')).toEqual({ key: 'skill', id: 'mut' })
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
  it('erzeugt nie ein explizites /de/-Präfix', () => {
    expect(localizedPath('project', 'de')).toBe('/projekt/')
    expect(localizedPath('home', 'de')).toBe('/')
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
