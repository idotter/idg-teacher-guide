import { describe, expect, it } from 'vitest'
import { loadLangModules } from './lang-modules.js'
import { localizedPath } from './routes.js'

/* Jeder der sechs Lader in `lang-modules.js` — je einer für `SITE_TEXTS` und
   `CARD_TEXTS` — muss wirklich die Datei seiner eigenen Sprache auflösen.
   Eine Verwechslung (z. B. `fr: () => import('./i18n/es.js')`) liesse keinen
   bestehenden Test anschlagen: der vorgerenderte Rumpf und die nachgeladenen
   Texte tragen beide gültiges, aber falsches Sprachmaterial.

   Erkennungsmerkmal je Ebene: `site.lang` erklärt sich für die Website-Texte
   bereits selbst (siehe i18n.test.js). Die Kartendaten (`content/*.js`) tragen
   kein solches Feld — dafür aber `ui.appNameSub`, in jeder der sechs Sprachen
   einen eigenen, unverwechselbaren Text. */
const EXPECTED_APP_NAME_SUB = {
  de: 'für Lehrpersonen',
  en: 'for teachers',
  fr: 'pour le corps enseignant',
  es: 'para docentes',
  it: 'per insegnanti',
  sv: 'för lärare',
}

describe('loadLangModules', () => {
  for (const lang of Object.keys(EXPECTED_APP_NAME_SUB)) {
    it(`löst für ${lang} auch wirklich ${lang} auf — Website-Texte und Kartendaten`, async () => {
      const here = localizedPath('home', lang)
      const { site, content } = await loadLangModules(here)
      expect(site.lang).toBe(lang)
      expect(content.ui.appNameSub).toBe(EXPECTED_APP_NAME_SUB[lang])
    })
  }
})
