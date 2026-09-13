import React, { useEffect } from 'react'
import { SiteFooter, SiteHeader, pagePath } from './chrome.jsx'
import { Crumbs } from './content-page-bodies.jsx'
import { pageFromPath } from './pages.jsx'
import { langFromPath, localizedPath } from './routes.js'

/* Website-Texte und Kartendaten je Sprache, beide dynamisch: ein statischer
   Import zöge alle sechs Volltext-Dateien in jeden Seitenaufruf, und genau
   das zu vermeiden ist der Grund für die getrennten Dateien.

   Eine Zeile je Sprache statt `import(`./i18n/${lang}.js`)`: ein Import mit
   Template zieht alles ein, was der Ordner hergibt — samt i18n.test.js.
   Eine weitere Sprache braucht deshalb hier zwei neue Zeilen. */
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

export function PageLayout({ page, here = '/', site }) {
  if (!page) {
    return (
      <div className="site">
        <SiteHeader />
        <main className="page wrap">
          <h1>{site.notFound.title}</h1>
          <p className="page-lead">
            {site.notFound.lead}{' '}
            <a href={localizedPath('home', langFromPath(here))}>{site.notFound.backHome}</a>
          </p>
        </main>
        <SiteFooter here={here} />
      </div>
    )
  }

  return (
    <div className="site">
      <SiteHeader />
      <main className="page wrap">
        <Crumbs items={page.crumbs} />
        <h1>{page.title}</h1>
        {page.lead && <p className="page-lead">{page.lead}</p>}
        <div className="prose">{page.body}</div>
      </main>
      <SiteFooter here={here} />
    </div>
  )
}

export default function Page({ site, content, here = pagePath() }) {
  const page = pageFromPath(here, site, content)

  useEffect(() => {
    if (page?.documentTitle) document.title = page.documentTitle
  }, [page])

  return <PageLayout page={page} here={here} site={site} />
}
