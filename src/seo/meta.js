/** Zentrale SEO-/GEO-Daten für alle HTML-Einstiege. */
export const SITE_URL = 'https://guide.zukunftskompetenzchallenge.ch'
export const SITE_NAME = 'Inner Development Guide im Schulalltag'
export const CONTACT_MAIL = 'guide@zukunftskompetenzchallenge.ch'
export const OG_IMAGE = `${SITE_URL}/og-image.png`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_ALT = 'Inner Development Guide im Schulalltag — 25 Reflexionskarten für den Unterricht'

const INDEX_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const NOINDEX_ROBOTS = 'noindex, follow'

export const pages = {
  '/': {
    path: '/',
    title: 'Inner Development Guide im Schulalltag — Zukunft gestalten in fünf Minuten',
    description:
      '25 Kompetenzen des Inner Development Guide 2.0 als digitale Reflexionskarten für Lehrpersonen: Fragen für dich und deine Klasse, Ideen für den Unterricht und Anknüpfung an den Lehrplan 21 — ohne Konto, offline nutzbar.',
    robots: INDEX_ROBOTS,
    indexed: true,
    sitemapPriority: 1.0,
    sitemapChangefreq: 'weekly',
    ogType: 'website',
    pageLabel: 'Startseite',
  },
  '/projekt/': {
    path: '/projekt/',
    title: 'Das Projekt — Inner Development Guide im Schulalltag',
    description:
      'Der Inner Development Guide 2.0 als Reflexionskarten für den Schulalltag: 25 Kompetenzen, fünf Dimensionen, ohne Konto — für Lehrpersonen in der Schweiz.',
    robots: INDEX_ROBOTS,
    indexed: true,
    sitemapPriority: 0.8,
    sitemapChangefreq: 'monthly',
    ogType: 'website',
    pageLabel: 'Das Projekt',
  },
  '/kontakt/': {
    path: '/kontakt/',
    title: 'Kontakt — Inner Development Guide im Schulalltag',
    description:
      'Frage, Hinweis oder Rückmeldung zum Inner Development Guide im Schulalltag — per E-Mail an guide@zukunftskompetenzchallenge.ch.',
    robots: INDEX_ROBOTS,
    indexed: true,
    sitemapPriority: 0.5,
    sitemapChangefreq: 'monthly',
    ogType: 'website',
    pageLabel: 'Kontakt',
  },
  '/datenschutz/': {
    path: '/datenschutz/',
    title: 'Datenschutz — Inner Development Guide im Schulalltag',
    description:
      'Wie der Inner Development Guide im Schulalltag Daten bearbeitet: lokal auf dem Gerät, ohne Konto, ohne Upload.',
    robots: NOINDEX_ROBOTS,
    indexed: false,
    ogType: 'website',
    pageLabel: 'Datenschutz',
  },
  '/nutzungsbedingungen/': {
    path: '/nutzungsbedingungen/',
    title: 'Nutzungsbedingungen — Inner Development Guide im Schulalltag',
    description:
      'Bedingungen für die Nutzung der Reflexionskarten Inner Development Guide im Schulalltag.',
    robots: NOINDEX_ROBOTS,
    indexed: false,
    ogType: 'website',
    pageLabel: 'Nutzungsbedingungen',
  },
  '/app/': {
    path: '/app/',
    title: 'Reflexionskarten — Inner Development Guide im Schulalltag',
    description:
      '25 Kompetenzen des Inner Development Guide 2.0 als Reflexionskarten für den Unterricht — installierbar, offline, ohne Konto.',
    robots: NOINDEX_ROBOTS,
    indexed: false,
    ogType: 'website',
    pageLabel: 'Reflexionskarten',
  },
}

/** HTML-Datei → Routenschlüssel */
export const htmlRouteMap = {
  'index.html': '/',
  'app/index.html': '/app/',
  'projekt/index.html': '/projekt/',
  'kontakt/index.html': '/kontakt/',
  'datenschutz/index.html': '/datenschutz/',
  'nutzungsbedingungen/index.html': '/nutzungsbedingungen/',
}

export function pageFromHtmlFilename(filename) {
  const normalized = filename.replace(/\\/g, '/')
  const matches = Object.entries(htmlRouteMap)
    .filter(([htmlPath]) => normalized.endsWith(htmlPath))
    .sort(([a], [b]) => b.length - a.length)
  return matches.length ? pages[matches[0][1]] : null
}

export function absoluteUrl(path) {
  if (path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path}`
}

function breadcrumbJsonLd(page) {
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: absoluteUrl('/') },
  ]
  if (page.path !== '/') {
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

function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    inLanguage: 'de-CH',
    description: pages['/'].description,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  }
}

function webApplicationJsonLd({ slim = false } = {}) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: absoluteUrl('/app/'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript. Works offline after installation.',
    isAccessibleForFree: true,
    inLanguage: ['de-CH', 'en', 'fr', 'es', 'sv'],
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
      description: pages['/app/'].description,
    }
  }
  return {
    ...base,
    description: pages['/'].description,
    featureList: [
      '25 Reflexionskarten zu Kompetenzen des Inner Development Guide',
      'Fragen für Lehrperson und Klasse',
      'Unterrichtsideen und Mini-Übungen',
      'Offline-fähig als installierbare Web-App',
      'Fünf Sprachen: Deutsch, Englisch, Französisch, Spanisch, Schwedisch',
    ],
  }
}

function landingWebPageJsonLd(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: 'de-CH',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  }
}

function aboutPageJsonLd(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: 'de-CH',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  }
}

function contactPageJsonLd(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: 'de-CH',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      email: CONTACT_MAIL,
      url: absoluteUrl('/'),
    },
  }
}

function genericWebPageJsonLd(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: 'de-CH',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  }
}

/** JSON-LD-Blöcke pro Seite */
export function jsonLdForPage(page) {
  const blocks = [breadcrumbJsonLd(page)]

  switch (page.path) {
    case '/':
      blocks.unshift(webSiteJsonLd(), webApplicationJsonLd(), landingWebPageJsonLd(page))
      break
    case '/projekt/':
      blocks.unshift(aboutPageJsonLd(page))
      break
    case '/kontakt/':
      blocks.unshift(contactPageJsonLd(page))
      break
    case '/app/':
      blocks.unshift(webApplicationJsonLd({ slim: true }))
      break
    default:
      blocks.unshift(genericWebPageJsonLd(page))
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

/** Statischer Noscript-Fallback für die Landingpage (Crawler ohne JS). */
export function landingNoscriptHtml() {
  return `<noscript>
  <p><strong>Inner Development Guide im Schulalltag</strong> — 25 Kompetenzen als Reflexionskarten für Lehrpersonen.</p>
  <p>Der Inner Development Guide 2.0 beschreibt 25 innere Fähigkeiten in fünf Dimensionen: Sein, Denken, Beziehungen, Zusammenarbeit und Handeln. Dieses digitale Kartenset übersetzt sie in den Unterrichtsalltag — mit Reflexionsfragen, Ideen für die Klasse und Mini-Übungen.</p>
  <p><a href="/app/">Reflexionskarten öffnen</a> · <a href="/projekt/">Das Projekt</a> · <a href="/kontakt/">Kontakt</a></p>
</noscript>`
}

/** Vollständiger Head-Inhalt für eine Seite (ohne charset/viewport/favicon). */
export function renderSeoHead(page) {
  const url = absoluteUrl(page.path)
  const lines = [
    `<title>${escapeHtml(page.title)}</title>`,
    metaTag('description', page.description),
    metaTag('robots', page.robots),
    metaTag('language', 'de'),
    metaTag('geo.region', 'CH'),
    linkTag('canonical', url),
    linkTag('alternate', `${SITE_URL}/llms.txt`, ' type="text/plain" title="LLM Context"'),
    metaTag('og:type', page.ogType, true),
    metaTag('og:url', url, true),
    metaTag('og:title', page.title, true),
    metaTag('og:description', page.description, true),
    metaTag('og:locale', 'de_CH', true),
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

export function indexedPages() {
  return Object.values(pages).filter((page) => page.indexed)
}
