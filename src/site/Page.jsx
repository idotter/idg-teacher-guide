import React, { useEffect } from 'react'
import { SiteFooter, SiteHeader, pagePath } from './chrome.jsx'
import { Crumbs } from './content-page-bodies.jsx'
import { pageFromPath } from './pages.jsx'

export function PageLayout({ page, here = '/' }) {
  if (!page) {
    return (
      <div className="site">
        <SiteHeader />
        <main className="page wrap">
          <h1>Seite nicht gefunden</h1>
          <p className="page-lead">
            Dieser Pfad führt nirgendwohin. <a href="/">Zur Startseite</a>
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

export default function Page() {
  const here = pagePath()
  const page = pageFromPath(here)

  useEffect(() => {
    if (page?.documentTitle) document.title = page.documentTitle
  }, [page])

  return <PageLayout page={page} here={here} />
}
