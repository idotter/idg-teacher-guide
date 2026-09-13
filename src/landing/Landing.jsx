import React from 'react'
import IdgCards from '../app/IdgCards.jsx'
import data from '../content/de.js'
import { SiteFooter, SiteHeader } from '../site/chrome.jsx'

const { ui, dimensions, skills } = data

// Für die Kartenanatomie eine echte Karte statt Blindtext.
const sample = skills.find((k) => k.id === 'b4')
const sampleDim = dimensions.find((d) => d.id === sample.dim)

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
const ringGlyph = (size = 18, fill = 'none') => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" fill={fill} stroke="none" />
  </svg>
)

/* Eine Karte je Dimension — der Stapel zeigt die Bandbreite, nicht den Umfang.
   Aus den Daten abgeleitet statt hart notiert, damit die Auswahl mitwandert,
   wenn sich die Reihenfolge im Guide ändert.
   Vorne liegt «Kritisches Denken»: ein schulnaher Einstieg statt der ersten
   Karte aus «Sein». */
const startId = 't1'
const heroDeck = [
  startId,
  ...dimensions
    .map((d) => skills.find((k) => k.dim === d.id))
    .filter(Boolean)
    .map((k) => k.id)
    .filter((id) => id !== startId),
]

/* Der Held ist das Produkt selbst: ein echter, umdrehbarer Kartenstapel.
   Kein Rahmen, kein Grund, keine Bedienelemente — nur die Karten, wie sie
   auf einem Tisch liegen würden.
   (Das frühere Schaltpult liegt weiterhin in Simulator.jsx.) */
function HeroDeck() {
  return (
    <div className="deck" aria-label="Kartenstapel zum Ausprobieren">
      <IdgCards
        variant="farbe"
        back="liste"
        depth="stapel"
        flipAxis="y"
        radius="weich"
        ui="ohne"
        showNumbers={false}
        lang="de"
        embedded
        only={heroDeck}
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

function CardFront() {
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

function CardBack() {
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

export default function Landing() {
  return (
    <div className="site">
      <SiteHeader />

      <main>
        <section className="hero">
          <div className="wrap hero-in">
            <div className="hero-text">
              <h1>Zukunft gestalten.<em>In fünf Minuten.</em></h1>
              <p className="hero-lead">
                Der Inner Development Guide beschreibt 23 Fähigkeiten, die wir brauchen,
                um Wandel zu gestalten. Dieses digitale Kartenset übersetzt sie in den Schulalltag.
              </p>
              <div className="hero-act">
                <a className="btn" href="/app/">App öffnen</a>
              </div>
            </div>
            <div className="hero-deck">
              <HeroDeck />
            </div>
          </div>
        </section>

        <section className="anatomy wrap">
          <h2>Was auf einer Karte steht<em>am Beispiel «{sample.name}»</em></h2>
          <p className="sec-lead">
            Eine Karte, zwei Seiten. Vorne die Kompetenz, hinten die Fragen — und dahinter
            das Material für die Lektion.
          </p>

          <div className="anat">
            <div className="anat-side">
              <span className="anat-face">Vorderseite</span>
              <CardFront />
              <ol className="anat-key">
                <li><i>1</i><div><b>Dimension</b><p>Zu welcher der fünf Dimensionen die Kompetenz gehört — die Farbe der Karte sagt es schon von weitem.</p></div></li>
                <li><i>2</i><div><b>Kompetenz</b><p>Name und Beschreibung, wörtlich aus dem Framework übernommen.</p></div></li>
              </ol>
            </div>

            <div className="anat-side">
              <span className="anat-face">Rückseite</span>
              <CardBack />
              <ol className="anat-key">
                <li><i>3</i><div><b>{ui.forMe}</b><p>Zwei Fragen an dich selbst — für die Vorbereitung, den Heimweg oder das Gespräch im Team.</p></div></li>
                <li><i>4</i><div><b>{ui.forStudents}</b><p>Zwei Fragen, die du unverändert in die Runde geben kannst. Auf die Altersstufe hin formuliert.</p></div></li>
                <li><i>5</i><div><b>{ui.ideas}</b><p>{ui.sheetSub} — beim Beispiel etwa die Mini-Übung «{sample.exercise.title}».</p></div></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="dims">
          <div className="wrap dims-head">
            <h2>Fünf Dimensionen<em>23 Kompetenzen</em></h2>
            <p className="sec-lead">{ui.intro}</p>
          </div>
          <div className="dims-body">
            {/* Auf einer Fläche in Dimensionsfarbe steht die Schrift immer in
                Weiss — auch auf dem hellen Beige von «Sein». */}
            <div className="bands">
              {dimensions.map((d) => (
                <div className="band" key={d.id} style={{ background: d.color, color: '#fff' }}>
                  <div className="band-in">
                    <Symbol id={d.id} color="#fff" size={58} />
                    <div className="band-txt">
                      <span className="band-name">{d.name}</span>
                      <span className="band-sub">{d.subtitle}</span>
                    </div>
                    <p className="band-intro">{d.intro}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="use wrap">
          <h2>Im Schulalltag<em>ohne Vorbereitung</em></h2>
          <div className="use-grid">
            <div className="use-col">
              <h3>Eine Karte, fünf Minuten</h3>
              <p>
                Für den Einstieg in eine Lektion, die Klassenstunde oder die eigene
                Vorbereitung am Morgen. Kein Programm, kein Ablaufplan — eine Frage genügt.
              </p>
            </div>
            <div className="use-col">
              <h3>Für dich und für die Klasse</h3>
              <p>
                Jede Karte trägt beides: zwei Fragen an dich selbst und zwei, die du
                unverändert in die Runde geben kannst.
              </p>
            </div>
            <div className="use-col">
              <h3>Vom Impuls zur Lektion</h3>
              <p>
                Wenn eine Karte trägt, steht dahinter mehr: Unterrichtsideen,
                Anknüpfungspunkte an die Fachbereiche und eine Mini-Übung.
              </p>
            </div>
          </div>
        </section>

        <section className="install wrap">
          <h2>Auf dem Gerät<em>ohne Store, ohne Konto</em></h2>
          <div className="install-box">
            <img src="/assets/icons/icon-192.png" alt="" />
            <div>
              <b>Zum Startbildschirm hinzufügen</b>
              <p>
                In Safari über „Teilen“ und „Zum Home-Bildschirm“, in Chrome über das Menü
                und „App installieren“. Danach läuft alles offline. Gemerkte Karten bleiben
                auf dem Gerät und werden nirgends hochgeladen.
              </p>
            </div>
            <a className="btn" href="/app/">App öffnen</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
