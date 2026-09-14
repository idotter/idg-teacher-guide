import React, { useEffect } from 'react'
import { writeStoredLang } from '../content/langs.js'
import { SiteFooter, SiteHeader, pagePath } from './chrome.jsx'
import { Crumbs } from './content-page-bodies.jsx'
import { pageFromPath } from './pages.jsx'
import { langFromPath, localizedPath } from './routes.js'

export function PageLayout({ page, here = '/', site }) {
  if (!page) {
    return (
      <div className="site">
        <SiteHeader site={site} here={here} />
        <main className="page wrap">
          <h1>{site.notFound.title}</h1>
          <p className="page-lead">
            {site.notFound.lead}{' '}
            <a href={localizedPath('home', langFromPath(here))}>{site.notFound.backHome}</a>
          </p>
        </main>
        <SiteFooter site={site} here={here} />
      </div>
    )
  }

  return (
    <div className="site">
      <SiteHeader site={site} here={here} />
      <main className="page wrap">
        <Crumbs items={page.crumbs} ariaLabel={site.contentPages.crumbsAriaLabel} />
        <h1>{page.title}</h1>
        {page.lead && <p className="page-lead">{page.lead}</p>}
        <div className="prose">{page.body}</div>
      </main>
      <SiteFooter site={site} here={here} />
    </div>
  )
}

export default function Page({ site, content, here = pagePath() }) {
  const page = pageFromPath(here, site, content)

  useEffect(() => {
    if (page?.documentTitle) document.title = page.documentTitle
  }, [page])

  /* Die URL gewinnt gegen den Speicher: wer `it` gespeichert hat und
     /fr/projet/ öffnet, sieht Französisch — und die App unter /app/ folgt
     ab jetzt derselben Sprache. */
  useEffect(() => {
    writeStoredLang(langFromPath(here))
  }, [here])

  return <PageLayout page={page} here={here} site={site} />
}
