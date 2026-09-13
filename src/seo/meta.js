/** Zentrale SEO-/GEO-Daten für alle HTML-Einstiege, je Sprache der Route. */
import {
  buildContentPages,
  contentPageFromHtmlFilename,
} from './content-pages.js'
import { SEGMENTS } from '../site/i18n/segments.js'
import { CONTACT_MAIL, SITE_NAME } from './site-info.js'
import {
  DEFAULT_LANG,
  LANG_IDS,
  langFromPath,
  localizedPath,
  routeKeyFromPath,
  translationsOf,
} from '../site/routes.js'

import deSite from '../site/i18n/de.js'
import enSite from '../site/i18n/en.js'
import frSite from '../site/i18n/fr.js'
import esSite from '../site/i18n/es.js'
import itSite from '../site/i18n/it.js'
import svSite from '../site/i18n/sv.js'

const SITE_BY_LANG = { de: deSite, en: enSite, fr: frSite, es: esSite, it: itSite, sv: svSite }

function siteOf(lang) {
  return SITE_BY_LANG[lang] || SITE_BY_LANG[DEFAULT_LANG]
}

// Reexportiert, damit bestehende Aufrufer (scripts/generate-seo-files.mjs
// u. a.) `SITE_NAME`/`CONTACT_MAIL` weiterhin von hier beziehen können — die
// eigentliche Definition liegt in `site-info.js`, damit `src/site/pages.jsx`
// sie importieren kann, ohne den ganzen (sprachstatisch importierenden)
// SEO-Baum ins Client-Bundle zu ziehen.
export { CONTACT_MAIL, SITE_NAME } from './site-info.js'

export const SITE_URL = 'https://guide.zukunftskompetenzchallenge.ch'
export const OG_IMAGE = `${SITE_URL}/og-image.png`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_ALT = 'Inner Development Guide im Schulalltag — 25 Reflexionskarten für den Unterricht'

const INDEX_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const NOINDEX_ROBOTS = 'noindex, follow'

/**
 * Seitenregister einer Sprache, Schlüssel ist der lokalisierte Pfad — dieselbe
 * Form wie früher das feste `pages`-Objekt, nur einmal pro Sprache gebaut statt
 * einmal für Deutsch. Texte kommen aus `src/site/i18n/<lang>.js`.
 */
export function pagesFor(lang) {
  const site = siteOf(lang)
  const p = site.pages
  const home = localizedPath('home', lang)
  const project = localizedPath('project', lang)
  const contact = localizedPath('contact', lang)
  const privacy = localizedPath('privacy', lang)
  const terms = localizedPath('terms', lang)
  const app = localizedPath('app', lang)

  return {
    [home]: {
      path: home,
      lang,
      title: p.home.documentTitle,
      description: p.home.description,
      robots: INDEX_ROBOTS,
      indexed: true,
      sitemapPriority: 1.0,
      sitemapChangefreq: 'weekly',
      ogType: 'website',
      pageLabel: site.contentPages.crumbHome,
    },
    [project]: {
      path: project,
      lang,
      title: p.project.documentTitle,
      description: p.project.description,
      robots: INDEX_ROBOTS,
      indexed: true,
      sitemapPriority: 0.8,
      sitemapChangefreq: 'monthly',
      ogType: 'website',
      pageLabel: p.project.navLabel,
    },
    [contact]: {
      path: contact,
      lang,
      title: p.contact.documentTitle,
      description: p.contact.description,
      robots: INDEX_ROBOTS,
      indexed: true,
      sitemapPriority: 0.5,
      sitemapChangefreq: 'monthly',
      ogType: 'website',
      pageLabel: p.contact.navLabel,
    },
    [privacy]: {
      path: privacy,
      lang,
      title: p.privacy.documentTitle,
      description: p.privacy.description,
      robots: NOINDEX_ROBOTS,
      indexed: false,
      ogType: 'website',
      pageLabel: p.privacy.navLabel,
    },
    [terms]: {
      path: terms,
      lang,
      title: p.terms.documentTitle,
      description: p.terms.description,
      robots: NOINDEX_ROBOTS,
      indexed: false,
      ogType: 'website',
      pageLabel: p.terms.navLabel,
    },
    [app]: {
      path: app,
      lang,
      title: p.app.documentTitle,
      description: p.app.description,
      robots: NOINDEX_ROBOTS,
      indexed: false,
      ogType: 'website',
      pageLabel: p.app.documentTitle.split(' — ')[0],
    },
  }
}

/**
 * HTML-Datei → Routenpfad, für alle sechs Sprachen aus `SEGMENTS` erzeugt —
 * sonst gäbe es eine zweite, handgepflegte Quelle für dieselben Pfade.
 * `/app/` bleibt aussen vor der Sprachschleife: eine einzige Route ohne
 * Präfix, für jede Sprache dieselbe Datei.
 */
export const htmlRouteMap = Object.fromEntries(
  LANG_IDS.flatMap((lang) => {
    const prefix = lang === DEFAULT_LANG ? '' : `${lang}/`
    return [
      [`${prefix}index.html`, localizedPath('home', lang)],
      ...['project', 'contact', 'privacy', 'terms'].map((key) => [
        `${prefix}${SEGMENTS[lang][key]}/index.html`, localizedPath(key, lang),
      ]),
    ]
  }).concat([['app/index.html', '/app/']]),
)

function toSeoPage(page) {
  return {
    ...page,
    title: page.documentTitle || page.title,
  }
}

export function pageFromHtmlFilename(filename) {
  const contentPage = contentPageFromHtmlFilename(filename)
  if (contentPage) return toSeoPage(contentPage)

  const normalized = filename.replace(/\\/g, '/')
  const matches = Object.entries(htmlRouteMap)
    .filter(([htmlPath]) => normalized.endsWith(htmlPath))
    .sort(([a], [b]) => b.length - a.length)
  if (!matches.length) return null

  const path = matches[0][1]
  return pagesFor(langFromPath(path))[path] || null
}

export function absoluteUrl(path) {
  if (path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path}`
}

function breadcrumbJsonLd(page) {
  const site = siteOf(page.lang)
  const home = localizedPath('home', page.lang)
  const items = [
    { '@type': 'ListItem', position: 1, name: site.contentPages.crumbHome, item: absoluteUrl(home) },
  ]
  if (page.kind === 'dimension') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: page.pageLabel,
      item: absoluteUrl(page.path),
    })
  } else if (page.kind === 'skill') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: page.dim.name,
      item: absoluteUrl(localizedPath('dimension', page.lang, page.dim.id)),
    })
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: page.pageLabel,
      item: absoluteUrl(page.path),
    })
  } else if (page.path !== home) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: page.pageLabel,
      item: absoluteUrl(page.path),
    })
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

function webSiteJsonLd(page, site) {
  const home = localizedPath('home', page.lang)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl(home),
    inLanguage: site.htmlLang,
    description: site.pages.home.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absoluteUrl(home),
    },
  }
}

function webApplicationJsonLd({ slim = false, site } = {}) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: absoluteUrl('/app/'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript. Works offline after installation.',
    isAccessibleForFree: true,
    inLanguage: LANG_IDS.map((lang) => siteOf(lang).htmlLang),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CHF',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'teacher',
      audienceType: 'Lehrpersonen in der Schweiz',
    },
    sameAs: [
      'https://zukunftskompetenzchallenge.ch',
      'https://innerdevelopmentgoals.org',
    ],
    keywords:
      'Inner Development Guide, Inner Development Goals, IDG, Reflexionskarten, Lehrplan 21, Unterricht, Lehrpersonen, Zukunftskompetenzen',
  }
  if (slim) {
    return {
      ...base,
      description: site.pages.app.description,
    }
  }
  return {
    ...base,
    description: site.pages.home.description,
    featureList: [
      '25 Reflexionskarten zu Kompetenzen des Inner Development Guide',
      'Fragen für Lehrperson und Klasse',
      'Unterrichtsideen und Mini-Übungen',
      'Offline-fähig als installierbare Web-App',
      'Sechs Sprachen: Deutsch, Englisch, Französisch, Spanisch, Italienisch, Schwedisch',
    ],
  }
}

function landingWebPageJsonLd(page, site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: site.htmlLang,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl(localizedPath('home', page.lang)),
    },
  }
}

function aboutPageJsonLd(page, site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: site.htmlLang,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl(localizedPath('home', page.lang)),
    },
  }
}

function contactPageJsonLd(page, site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: site.htmlLang,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl(localizedPath('home', page.lang)),
    },
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      email: CONTACT_MAIL,
      url: absoluteUrl(localizedPath('home', page.lang)),
    },
  }
}

function genericWebPageJsonLd(page, site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: site.htmlLang,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl(localizedPath('home', page.lang)),
    },
  }
}

/** FAQ für /projekt/ — sichtbarer Text (site.pages.project.body) und JSON-LD
 *  kommen aus derselben Quelle, `site.pages.project.faq`. Vorher pflegte
 *  meta.js eine eigene, wortgleiche Kopie (`PROJECT_FAQ`) nur für Deutsch —
 *  auf `/fr/projet/` hätte das deutsches strukturiertes Markup ausgeliefert. */
function faqPageJsonLd(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (site.pages.project.faq || []).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

/** JSON-LD-Blöcke pro Seite, in der Sprache von `page.lang`. */
export function jsonLdForPage(page) {
  const site = siteOf(page.lang)
  const blocks = [breadcrumbJsonLd(page)]
  const { key } = routeKeyFromPath(page.path)

  switch (key) {
    case 'home':
      blocks.unshift(
        webSiteJsonLd(page, site),
        webApplicationJsonLd({ site }),
        landingWebPageJsonLd(page, site),
      )
      break
    case 'project':
      blocks.unshift(aboutPageJsonLd(page, site), faqPageJsonLd(site))
      break
    case 'contact':
      blocks.unshift(contactPageJsonLd(page, site))
      break
    case 'app':
      blocks.unshift(webApplicationJsonLd({ slim: true, site }))
      break
    default:
      if (page.kind === 'dimension') {
        blocks.unshift({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: page.pageLabel,
          description: page.description,
          url: absoluteUrl(page.path),
          inLanguage: site.htmlLang,
          about: page.dim.name,
          isPartOf: {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: absoluteUrl(localizedPath('home', page.lang)),
          },
          mainEntity: {
            '@type': 'ItemList',
            name: `Kompetenzen in ${page.dim.name}`,
            numberOfItems: page.dimSkills.length,
            itemListElement: page.dimSkills.map((skill, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: skill.name,
              url: absoluteUrl(localizedPath('skill', page.lang, skill.id)),
            })),
          },
        })
      } else if (page.kind === 'skill') {
        const ui = page.ui || {}
        const parts = []
        for (const text of page.skill.teacher || []) {
          parts.push({ '@type': 'Question', name: ui.forMe, text })
        }
        for (const text of page.skill.students || []) {
          parts.push({ '@type': 'Question', name: ui.forStudents, text })
        }
        for (const text of page.skill.ideas || []) {
          parts.push({ '@type': 'CreativeWork', name: ui.ideas, text })
        }
        if (page.skill.exercise?.title) {
          parts.push({
            '@type': 'HowTo',
            name: page.skill.exercise.title,
            text: page.skill.exercise.text,
          })
        }
        blocks.unshift({
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: page.skill.name,
          description: page.skill.desc,
          url: absoluteUrl(page.path),
          inLanguage: site.htmlLang,
          learningResourceType: 'Reflection prompt',
          educationalLevel: 'Professional',
          isAccessibleForFree: true,
          teaches: page.skill.name,
          about: page.dim?.name,
          educationalAlignment: (page.skill.subjects || []).map((subject) => ({
            '@type': 'AlignmentObject',
            alignmentType: 'educationalSubject',
            educationalFramework: 'Lehrplan 21',
            targetName: subject,
          })),
          hasPart: parts,
          isPartOf: {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: absoluteUrl(localizedPath('home', page.lang)),
          },
        })
      } else {
        blocks.unshift(genericWebPageJsonLd(page, site))
      }
      break
  }

  return blocks
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function metaTag(name, content, property = false) {
  const attr = property ? 'property' : 'name'
  return `<meta ${attr}="${escapeHtml(name)}" content="${escapeHtml(content)}">`
}

function linkTag(rel, href, extra = '') {
  return `<link rel="${escapeHtml(rel)}" href="${escapeHtml(href)}"${extra}>`
}

function jsonLdScript(block) {
  return `<script type="application/ld+json">${JSON.stringify(block)}</script>`
}

/** Statischer Noscript-Fallback für die Landingpage (Crawler ohne JS).
 *  Bleibt Deutsch: die Landingpage hat in Task 6 noch keinen fremdsprachigen
 *  HTML-Einstieg — den legt Task 7 an. */
export function landingNoscriptHtml() {
  const dimLinks = buildContentPages(DEFAULT_LANG)
    .filter((page) => page.kind === 'dimension')
    .map((page) => `<a href="${escapeHtml(page.path)}">${escapeHtml(page.dim.name)}</a>`)
    .join(' · ')

  return `<noscript>
  <p><strong>Inner Development Guide im Schulalltag</strong> — 25 Kompetenzen als Reflexionskarten für Lehrpersonen.</p>
  <p>Der Inner Development Guide 2.0 beschreibt 25 innere Fähigkeiten in fünf Dimensionen: Sein, Denken, Beziehungen, Zusammenarbeit und Handeln. Dieses digitale Kartenset übersetzt sie in den Unterrichtsalltag — mit Reflexionsfragen, Ideen für die Klasse und Mini-Übungen.</p>
  <p>Dimensionen: ${dimLinks}</p>
  <p><a href="/app/">Reflexionskarten öffnen</a> · <a href="/projekt/">Das Projekt</a> · <a href="/kontakt/">Kontakt</a></p>
</noscript>`
}

/** Vollständiger Head-Inhalt für eine Seite (ohne charset/viewport/favicon). */
export function renderSeoHead(page) {
  const site = siteOf(page.lang)
  const url = absoluteUrl(page.path)
  const { key, id } = routeKeyFromPath(page.path)
  const lines = [
    `<title>${escapeHtml(page.title)}</title>`,
    metaTag('description', page.description),
    metaTag('robots', page.robots),
    // `site.lang` (kurzer Code, z. B. 'de'/'fr'), nicht `site.htmlLang`
    // ('de-CH'): Vor Task 6 stand hier fest 'de', nicht 'de-CH' — mit
    // `site.htmlLang` änderte sich dieser Wert für Deutsch, obwohl die
    // deutschen Seiten unverändert bleiben sollen. `site.lang` liefert für
    // Deutsch exakt den alten Wert.
    metaTag('language', site.lang),
    metaTag('geo.region', 'CH'),
    ...(page.indexed
      ? translationsOf(page.path).map((t) =>
          linkTag('alternate', absoluteUrl(t.path), ` hreflang="${t.lang}"`))
        .concat(linkTag('alternate', absoluteUrl(localizedPath(key, DEFAULT_LANG, id)), ' hreflang="x-default"'))
      : []),
    linkTag('canonical', url),
    linkTag('alternate', `${SITE_URL}/llms.txt`, ' type="text/plain" title="LLM Context"'),
    metaTag('og:type', page.ogType, true),
    metaTag('og:url', url, true),
    metaTag('og:title', page.title, true),
    metaTag('og:description', page.description, true),
    metaTag('og:locale', site.ogLocale, true),
    metaTag('og:site_name', SITE_NAME, true),
    metaTag('og:image', OG_IMAGE, true),
    metaTag('og:image:width', String(OG_IMAGE_WIDTH), true),
    metaTag('og:image:height', String(OG_IMAGE_HEIGHT), true),
    metaTag('og:image:alt', OG_IMAGE_ALT, true),
    metaTag('twitter:card', 'summary_large_image'),
    metaTag('twitter:url', url),
    metaTag('twitter:title', page.title),
    metaTag('twitter:description', page.description),
    metaTag('twitter:image', OG_IMAGE),
    metaTag('twitter:image:alt', OG_IMAGE_ALT),
    ...jsonLdForPage(page).map(jsonLdScript),
  ]

  return lines.join('\n  ')
}

/** Indexierte Seiten einer Sprache, für Sitemap/robots. Default Deutsch —
 *  wie `buildContentPages`, bis Task 7 die Sitemap auf alle Sprachen ausweitet. */
export function indexedPages(lang = DEFAULT_LANG) {
  return [
    ...Object.values(pagesFor(lang)).filter((page) => page.indexed),
    ...buildContentPages(lang).filter((page) => page.indexed),
  ]
}
