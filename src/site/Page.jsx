import React, { useEffect } from 'react'
import { SiteFooter, SiteHeader } from './chrome.jsx'
import { pageFromPath } from './pages.jsx'

export default function Page() {
  const page = pageFromPath(window.location.pathname)

  useEffect(() => {
    if (page?.documentTitle) document.title = page.documentTitle
  }, [page])

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
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="site">
      <SiteHeader />
      <main className="page wrap">
        <h1>{page.title}</h1>
        {page.lead && <p className="page-lead">{page.lead}</p>}
        <div className="prose">{page.body}</div>
      </main>
      <SiteFooter />
    </div>
  )
}
