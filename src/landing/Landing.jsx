import React, { useEffect } from 'react'
import IdgCards from '../app/IdgCards.jsx'
import { writeStoredLang } from '../content/langs.js'
import { SiteFooter, SiteHeader, pagePath } from '../site/chrome.jsx'
import { langFromPath, localizedPath } from '../site/routes.js'

/* Ersetzt {platzhalter} in einem Landingtext. Dieselbe Regel wie der Renderer
   der Unterseiten (pages.jsx), aber bewusst eine eigene Zeile: pages.jsx zöge
   seo/meta.js samt aller Seitenmetadaten in das Bundle der Landingpage. */
const fill = (text, vars) =>
  text.replace(/\{(\w+)\}/g, (whole, name) => (name in vars ? vars[name] : whole))

// Für die Kartenanatomie eine echte Karte statt Blindtext. Die IDs sind in
// allen Sprachdateien dieselben, nur die Texte dahinter wechseln.
const SAMPLE_ID = 'selbsterkenntnis'

/* Vorne liegt «Kritisches Denken»: ein schulnaher Einstieg statt der ersten
   Karte aus «Sein». */
const START_ID = 'kritisches-denken'

// Zeichen werden als Maske eingefärbt, nicht als fertiges Bild geladen:
// so bestimmt der Code die Farbe. `path` zeigt auf die weisse Vorlage.
function Mark({ path, color, size, className }) {
  const url = `url("${path}")`
  return (
    <span aria-hidden="true" className={className} style={{
      display: 'block', width: size, height: size, flex: 'none', backgroundColor: color,
      WebkitMaskImage: url, maskImage: url,
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center', maskPosition: 'center',
      WebkitMaskSize: 'contain', maskSize: 'contain',
    }} />
  )
}

const Symbol = ({ id, color, size }) =>
  <Mark path={`/assets/symbols/white/${id}.png`} color={color} size={size} />

// Die Ringe der App: Merken auf der Karte, Ziel für die Vertiefung.
const ringGlyph = (size = 18, dotFill = 'none') => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" fill={dotFill} stroke="none" />
  </svg>
)

/* Eine Karte je Dimension — der Stapel zeigt die Bandbreite, nicht den Umfang.
   Aus den Daten abgeleitet statt hart notiert, damit die Auswahl mitwandert,
   wenn sich die Reihenfolge im Guide ändert. */
function heroDeckOf({ dimensions, skills }) {
  return [
    START_ID,
    ...dimensions
      .map((d) => skills.find((k) => k.dim === d.id))
      .filter(Boolean)
      .map((k) => k.id)
      .filter((id) => id !== START_ID),
  ]
}

/* Der Held ist das Produkt selbst: ein echter, umdrehbarer Kartenstapel.
   Kein Rahmen, kein Grund, keine Bedienelemente — nur die Karten, wie sie
   auf einem Tisch liegen würden.
   (Das frühere Schaltpult liegt weiterhin in Simulator.jsx.) */
function HeroDeck({ lang, deck, label }) {
  return (
    <div className="deck" aria-label={label}>
      <IdgCards
        variant="farbe"
        back="liste"
        depth="stapel"
        flipAxis="y"
        radius="weich"
        ui="ohne"
        showNumbers={false}
        lang={lang}
        key={lang}
        embedded
        only={deck}
        storagePrefix="idg-demo"
        autoSplash={false}
        autoTour={false}
      />
    </div>
  )
}

/* Die Karte in Ruhe. Kein Bildschirmfoto, sondern dieselben Daten in
   derselben Gestaltung wie in der App — so veraltet die Erklärung nicht,
   wenn sich die Karte ändert, und sie bleibt bei jeder Grösse scharf.
   Die Nummern hängen an den Teilen, die Legende steht darunter. */
const Pin = ({ n, right }) => <span className={`pin${right ? ' pin-r' : ''}`} aria-hidden="true">{n}</span>

function CardFront({ sample, sampleDim }) {
  return (
    <div className="mock" aria-hidden="true">
      {/* Kopfzeile wie in der App: rechts Dimension und Merkring. */}
      <div className="mock-head">
        <span className="mock-save"><Pin n={1} right />{sampleDim.name}{ringGlyph(18)}</span>
      </div>
      <div className="mock-art" style={{ background: sampleDim.color }}>
        <Mark path={`/assets/skills/white/${sample.icon}.png`} color="#fff" size="60%" className="mock-glyph" />
      </div>
      <div className="mock-foot">
        <Pin n={2} />
        <b>{sample.name}</b>
        <p>{sample.desc}</p>
      </div>
    </div>
  )
}

function CardBack({ sample, ui }) {
  return (
    <div className="mock mock-b" aria-hidden="true">
      <div className="mock-bhead">
        <span>{sample.name}</span>
        {ringGlyph(18)}
      </div>
      <div className="mock-body">
        <section>
          <Pin n={3} />
          <h4>{ui.forMe}</h4>
          {sample.teacher.map((q, i) => <p key={i} className="q-me">{q}</p>)}
        </section>
        <section>
          <Pin n={4} />
          <h4>{ui.forStudents}</h4>
          {sample.students.map((q, i) => <p key={i}>{q}</p>)}
        </section>
        <span className="mock-pill">
          <Pin n={5} />
          <span><b>{ui.ideas}</b><small>{ui.sheetSub}</small></span>
        </span>
      </div>
    </div>
  )
}

/* Die Legende neben der Karte. Die Einträge 1–2 gehören zur Vorderseite,
   3–5 zur Rückseite; deren Titel stehen in den Kartendaten (ui), nicht in
   den Website-Texten — deshalb tragen sie dort kein `title`. */
const BACK_KEY_TITLES = { 3: 'forMe', 4: 'forStudents', 5: 'ideas' }

function AnatKeys({ keys, ui, vars }) {
  return (
    <ol className="anat-key">
      {keys.map((k) => (
        <li key={k.n}>
          <i>{k.n}</i>
          <div>
            <b>{k.title ?? ui[BACK_KEY_TITLES[k.n]]}</b>
            <p>{fill(k.desc, vars)}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/* Der Sprung in die App. Die Sprache wird geschrieben, bevor der Browser
   navigiert — /app/ hat kein Präfix und liest sie nur aus dem Speicher. */
function AppLink({ lang, children }) {
  return (
    <a className="btn" href="/app/" onClick={() => writeStoredLang(lang)}>{children}</a>
  )
}

export default function Landing({ site, content, here = pagePath() }) {
  const lang = langFromPath(here)
  const { ui, dimensions, skills } = content
  const L = site.landing

  const sample = skills.find((k) => k.id === SAMPLE_ID)
  const sampleDim = dimensions.find((d) => d.id === sample.dim)
  const vars = {
    n: skills.length,
    skillName: sample.name,
    sheetSub: ui.sheetSub,
    exerciseTitle: sample.exercise.title,
  }

  /* Die URL gewinnt gegen den Speicher — auch auf der Startseite. */
  useEffect(() => {
    writeStoredLang(lang)
  }, [lang])

  return (
    <div className="site">
      <SiteHeader site={site} here={here} />

      <main>
        <section className="hero">
          <div className="wrap hero-in">
            <div className="hero-text">
              <h1>{L.heroTitle}<em>{L.heroTitleEm}</em></h1>
              <p className="hero-lead">{fill(L.heroLead, vars)}</p>
              <div className="hero-act">
                <AppLink lang={lang}>{L.cta}</AppLink>
              </div>
            </div>
            <div className="hero-deck">
              <HeroDeck lang={lang} deck={heroDeckOf(content)} label={L.deckAria} />
            </div>
          </div>
        </section>

        <section className="anatomy wrap">
          <h2>{L.anatomy.title}<em>{fill(L.anatomy.em, vars)}</em></h2>
          <p className="sec-lead">{L.anatomy.lead}</p>

          <div className="anat">
            <div className="anat-side">
              <span className="anat-face">{L.anatomy.front}</span>
              <CardFront sample={sample} sampleDim={sampleDim} />
              <AnatKeys keys={L.anatomy.keys.filter((k) => k.n <= 2)} ui={ui} vars={vars} />
            </div>

            <div className="anat-side">
              <span className="anat-face">{L.anatomy.back}</span>
              <CardBack sample={sample} ui={ui} />
              <AnatKeys keys={L.anatomy.keys.filter((k) => k.n > 2)} ui={ui} vars={vars} />
            </div>
          </div>
        </section>

        <section className="dims">
          <div className="wrap dims-head">
            <h2>{L.dims.title}<em>{fill(L.dims.em, vars)}</em></h2>
            <p className="sec-lead">{ui.intro}</p>
          </div>
          <div className="dims-body">
            {/* Auf einer Fläche in Dimensionsfarbe steht die Schrift immer in
                Weiss — auch auf dem hellen Beige von «Sein». */}
            <div className="bands">
              {dimensions.map((d) => (
                <a
                  className="band"
                  key={d.id}
                  href={localizedPath('dimension', lang, d.id)}
                  style={{ background: d.color, color: '#fff' }}
                >
                  <div className="band-in">
                    <Symbol id={d.id} color="#fff" size={58} />
                    <div className="band-txt">
                      <span className="band-name">{d.name}</span>
                      <span className="band-sub">{d.subtitle}</span>
                    </div>
                    <p className="band-intro">{d.intro}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="use wrap">
          <h2>{L.use.title}<em>{L.use.em}</em></h2>
          <div className="use-grid">
            {L.use.cols.map((col) => (
              <div className="use-col" key={col.title}>
                <h3>{col.title}</h3>
                <p>{col.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="install wrap">
          <h2>{L.install.title}<em>{L.install.em}</em></h2>
          <div className="install-box">
            <img src="/assets/icons/icon-192.png" alt="" />
            <div>
              <b>{L.install.heading}</b>
              <p>{L.install.body}</p>
            </div>
            <AppLink lang={lang}>{L.cta}</AppLink>
          </div>
        </section>
      </main>

      <SiteFooter site={site} here={here} />
    </div>
  )
}
