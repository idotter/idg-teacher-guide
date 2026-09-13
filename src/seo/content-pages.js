/**
 * Build-only: Dimensions- und Kompetenzseiten für alle sechs Sprachen —
 * Grundlage für Prerender (vite-plugin-seo.js), Sitemap/llms.txt
 * (scripts/generate-seo-files.mjs) und die generierten HTML-Einstiege
 * (scripts/generate-content-pages.mjs). Läuft nur im Build: der Client
 * bezieht Kartendaten weiterhin sprachweise über `site/lang-modules.js`.
 *
 * Pfade kommen aus `localizedPath` (src/site/routes.js) statt aus eigenen
 * `dimensionPath`/`skillPath`-Helfern — sonst gäbe es zwei Quellen für
 * dieselben Pfade, eine German-only und eine sprachbewusste.
 */
import { DEFAULT_LANG, LANG_IDS, localizedPath } from '../site/routes.js'
import { SITE_NAME } from './site-info.js'

import de from '../content/de.js'
import en from '../content/en.js'
import fr from '../content/fr.js'
import es from '../content/es.js'
import it from '../content/it.js'
import sv from '../content/sv.js'

import deSite from '../site/i18n/de.js'
import enSite from '../site/i18n/en.js'
import frSite from '../site/i18n/fr.js'
import esSite from '../site/i18n/es.js'
import itSite from '../site/i18n/it.js'
import svSite from '../site/i18n/sv.js'

const CONTENT_BY_LANG = { de, en, fr, es, it, sv }
const SITE_BY_LANG = { de: deSite, en: enSite, fr: frSite, es: esSite, it: itSite, sv: svSite }

const INDEX_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

function pageLabel(name, suffix = SITE_NAME) {
  return `${name} — ${suffix}`
}

export function buildDimensionPages(lang) {
  const { dimensions, skills, ui } = CONTENT_BY_LANG[lang]
  return dimensions.map((dim) => {
    const dimSkills = skills.filter((s) => s.dim === dim.id)
    return {
      path: localizedPath('dimension', lang, dim.id),
      kind: 'dimension',
      id: dim.id,
      lang,
      ui,
      title: dim.name,
      documentTitle: pageLabel(dim.name),
      description: `${dim.subtitle}. ${dim.intro.slice(0, 140).trim()}…`,
      robots: INDEX_ROBOTS,
      indexed: true,
      sitemapPriority: 0.7,
      sitemapChangefreq: 'monthly',
      ogType: 'website',
      pageLabel: dim.name,
      dim,
      dimSkills,
    }
  })
}

export function buildSkillPages(lang) {
  const { dimensions, skills, ui } = CONTENT_BY_LANG[lang]
  const dimById = new Map(dimensions.map((d) => [d.id, d]))
  const descriptionSuffix = SITE_BY_LANG[lang].contentPages.skillDescriptionSuffix
  return skills.map((skill) => {
    const dim = dimById.get(skill.dim)
    const dimSkills = skills.filter((item) => item.dim === skill.dim)
    return {
      path: localizedPath('skill', lang, skill.id),
      kind: 'skill',
      id: skill.id,
      lang,
      ui,
      title: skill.name,
      documentTitle: pageLabel(skill.name),
      description: `${skill.desc} ${descriptionSuffix}`,
      robots: INDEX_ROBOTS,
      indexed: true,
      sitemapPriority: 0.6,
      sitemapChangefreq: 'monthly',
      ogType: 'article',
      pageLabel: skill.name,
      skill,
      dim,
      dimSkills,
    }
  })
}

/** Dimensions- und Kompetenzseiten einer Sprache. Default Deutsch, damit
 *  bestehende Aufrufer (generate-content-pages.mjs, generate-seo-files.mjs),
 *  die noch keine Sprache übergeben, unverändert nur die deutschen Seiten
 *  erzeugen — die fremdsprachigen HTML-Einstiege legt erst Task 7 an. */
export function buildContentPages(lang = DEFAULT_LANG) {
  return [...buildDimensionPages(lang), ...buildSkillPages(lang)]
}

/** Dieselben Seiten für alle sechs Sprachen — Grundlage für Task 7s Sitemap. */
export function buildAllContentPages() {
  return LANG_IDS.flatMap((lang) => buildContentPages(lang))
}

/** HTML-Datei → Inhaltsseite, sprachunabhängig: gesucht wird per Pfad-Suffix
 *  (`<page.path>index.html`), nicht per hartcodiertem deutschem Segmentnamen —
 *  so muss Task 7 diese Funktion für die fremdsprachigen Einstiege nicht mehr
 *  anfassen. */
export function contentPageFromHtmlFilename(filename) {
  const normalized = filename.replace(/\\/g, '/')
  return buildAllContentPages().find((page) => {
    const suffix = `${page.path}index.html`.replace(/^\//, '')
    return normalized.endsWith(suffix)
  }) || null
}
