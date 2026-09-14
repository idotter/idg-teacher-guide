import { langFromPath } from './routes.js'

/* Website-Texte und Kartendaten je Sprache, beide dynamisch: ein statischer
   Import zöge alle sechs Volltext-Dateien in jeden Seitenaufruf, und genau
   das zu vermeiden ist der Grund für die getrennten Dateien.

   Eine Zeile je Sprache statt `import(`./i18n/${lang}.js`)`: ein Import mit
   Template zieht alles ein, was der Ordner hergibt — samt i18n.test.js und
   damit vitest. Eine weitere Sprache braucht deshalb hier zwei neue Zeilen.

   Eigene Datei, weil beide Einstiege sie brauchen: die Unterseiten über
   page-main.jsx und die Landingpage über landing/main.jsx. Läge sie in
   Page.jsx, hinge das Bundle der Landingpage am Renderer der Unterseiten
   (pages.jsx mit Inline-Parser und Kontaktformular). Rollup schüttelt das
   heute weg — aber nur, solange dort nichts mit Seiteneffekt dazukommt. */
const SITE_TEXTS = {
  de: () => import('./i18n/de.js'),
  en: () => import('./i18n/en.js'),
  fr: () => import('./i18n/fr.js'),
  es: () => import('./i18n/es.js'),
  it: () => import('./i18n/it.js'),
  sv: () => import('./i18n/sv.js'),
}

const CARD_TEXTS = {
  de: () => import('../content/de.js'),
  en: () => import('../content/en.js'),
  fr: () => import('../content/fr.js'),
  es: () => import('../content/es.js'),
  it: () => import('../content/it.js'),
  sv: () => import('../content/sv.js'),
}

/** `{site, content}` der Sprache, die im Pfad steht. */
export async function loadLangModules(here) {
  const lang = langFromPath(here)
  const [siteMod, cardMod] = await Promise.all([
    (SITE_TEXTS[lang] || SITE_TEXTS.de)(),
    (CARD_TEXTS[lang] || CARD_TEXTS.de)(),
  ])
  return { site: siteMod.site || siteMod.default, content: cardMod.default || cardMod }
}
