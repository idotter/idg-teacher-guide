import React, { useState } from 'react'
import { dimensions } from '../content/de.js'
import { contentPageFromPath, dimensionPath } from '../seo/content-pages.js'
import { CONTACT_MAIL, PROJECT_FAQ, pages as seoPages } from '../seo/meta.js'
import {
  dimensionCrumbs,
  dimensionPageBody,
  skillCrumbs,
  skillPageBody,
} from './content-page-bodies.jsx'

export { CONTACT_MAIL }

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Nachricht von ${name || 'der Website'}`)
    const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`)
    window.location.href = `mailto:${CONTACT_MAIL}?subject=${subject}&body=${body}`
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="field">
        <span>E-Mail</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="field">
        <span>Nachricht</span>
        <textarea
          name="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>
      <button className="btn" type="submit">Nachricht senden</button>
    </form>
  )
}

export const pages = {
  '/projekt/': {
    title: seoPages['/projekt/'].pageLabel,
    documentTitle: seoPages['/projekt/'].title,
    description: seoPages['/projekt/'].description,
    lead: 'Ein digitales Kartenset, das den Inner Development Guide 2.0 in den Unterricht übersetzt — eine Karte, eine Frage, ein Einstieg.',
    body: (
      <>
        <h2>Worum es geht</h2>
        <p>
          Der Inner Development Guide 2.0 beschreibt 25 innere Fähigkeiten in fünf Dimensionen:
          Sein, Denken, Beziehungen, Zusammenarbeit und Handeln. Dieses Angebot macht sie für
          Lehrpersonen greifbar: als Karten, die sich umdrehen, merken und offline auf dem
          Gerät behalten lassen.
        </p>
        <p>
          Vorne steht die Kompetenz. Hinten stehen zwei Fragen an dich selbst und zwei, die
          du unverändert in die Runde geben kannst — plus Ideen für den Unterricht,
          Anknüpfungspunkte an die Fachbereiche und eine Mini-Übung.
        </p>

        <h2>Ohne Store, ohne Konto</h2>
        <p>
          Die App läuft im Browser und lässt sich auf den Startbildschirm legen. Gemerkte
          Karten und Einstellungen bleiben im Speicher dieses Geräts. Es gibt keine
          Anmeldung, und es wird nichts auf einen Server hochgeladen.
        </p>

        <h2>Für den Schulalltag geschrieben</h2>
        <p>
          Die Namen und Beschreibungen der Kompetenzen stammen aus dem Inner Development
          Guide 2.0 (Version 7.2). Die
          Reflexionsfragen, Unterrichtsideen und Mini-Übungen sind eigens für diese App
          formuliert. Im Deutschen knüpfen sie an die Fachbereiche des Lehrplans 21 an.
        </p>
        <p>
          Ausser Deutsch gibt es die Karten auf Englisch, Französisch, Spanisch,
          Italienisch und Schwedisch.
        </p>

        <h2>Die fünf Dimensionen</h2>
        <ul>
          {dimensions.map((dim) => (
            <li key={dim.id}>
              <a href={dimensionPath(dim.id)}>{dim.name}</a>
              {' — '}
              {dim.subtitle}
            </li>
          ))}
        </ul>

        <h2>Häufige Fragen</h2>
        {PROJECT_FAQ.map((item) => (
          <React.Fragment key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </React.Fragment>
        ))}

        <h2>Herkunft</h2>
        <p>
          Dieses Angebot ist inspiriert vom Inner Development Guide. Es ist kein
          offizielles Produkt der Herausgeber:innen des Rahmenwerks. Mehr unter{' '}
          <a href="https://innerdevelopmentgoals.org" rel="noopener noreferrer">
            innerdevelopmentgoals.org
          </a>
          . Ein verwandtes Angebot ist die{' '}
          <a href="https://zukunftskompetenzchallenge.ch" rel="noopener noreferrer">
            Zukunftskompetenz-Challenge
          </a>
          .
        </p>
      </>
    ),
  },

  '/kontakt/': {
    title: seoPages['/kontakt/'].pageLabel,
    documentTitle: seoPages['/kontakt/'].title,
    description: seoPages['/kontakt/'].description,
    lead: 'Eine Frage zum Kartenset, ein Hinweis aus dem Unterricht oder der Wunsch, das Angebot im Kollegium zu teilen — schreib uns.',
    body: (
      <>
        <p>
          Die Nachricht öffnet dein Mailprogramm und geht an{' '}
          <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
          . Es gibt kein Formular-Konto und keinen Versand über unsere Server.
        </p>
        <ContactForm />
      </>
    ),
  },

  '/datenschutz/': {
    title: seoPages['/datenschutz/'].pageLabel,
    documentTitle: seoPages['/datenschutz/'].title,
    description: seoPages['/datenschutz/'].description,
    lead: 'Dieses Angebot kommt ohne Benutzerkonto aus. Was du merkst, bleibt auf deinem Gerät.',
    body: (
      <>
        <p>Stand: 13. September 2026</p>

        <h2>Verantwortliche Stelle</h2>
        <p>
          Verantwortlich für die Datenbearbeitung auf dieser Website ist die herausgebende
          Person dieses Angebots. Erreichbar über die Seite{' '}
          <a href="/kontakt/">Kontakt</a>.
        </p>

        <h2>Was diese Website nicht tut</h2>
        <p>
          Es gibt keine Registrierung, keine Analyse- oder Werbecookies und keinen Upload
          von Merklisten oder Einstellungen. Die App und die Landingpage speichern nichts
          auf unseren Servern.
        </p>

        <h2>Daten auf deinem Gerät</h2>
        <p>
          Im Speicher des Browsers (<code>localStorage</code>) können liegen:
        </p>
        <ul>
          <li>gemerkte Karten</li>
          <li>Einstellungen wie Sprache oder Reihenfolge</li>
          <li>ob die kurze Einführung schon gesehen wurde</li>
        </ul>
        <p>
          Die App nutzt den Schlüsselpräfix <code>idg-cards-</code>, der Stapel auf der
          Startseite <code>idg-demo-</code>. Ausprobieren auf der Startseite überschreibt
          deshalb keine Merkliste in der App. Du kannst diese Einträge jederzeit über die
          App («Merkliste leeren») oder indem du die Website-Daten im Browser löschst
          entfernen.
        </p>

        <h2>Offline-Betrieb</h2>
        <p>
          Die App unter <a href="/app/">/app/</a> kann einen Service Worker registrieren,
          damit Karten auch ohne Netz im Schulzimmer verfügbar sind. Dabei werden
          Programmdateien und Bilder in einem Cache dieses Browsers abgelegt — nicht auf
          einem Server unter unserem Namen.
        </p>

        <h2>Teilen</h2>
        <p>
          Wenn du eine Karte teilst, nutzt das Gerät die Systemfunktion «Teilen» oder
          kopiert den Kartentext samt Link in die Zwischenablage. Wo das Gerät es
          unterstützt, wird auch ein Bild der Kartenfront mitgeschickt. Der Link öffnet
          genau diese Karte in der App. Wir empfangen weder Text noch Bild und erfahren
          nicht, an wen du sie sendest.
        </p>

        <h2>Kontaktaufnahme</h2>
        <p>
          Das Formular auf der Kontaktseite öffnet dein eigenes Mailprogramm. Erst wenn
          du die Nachricht absendest, erhält die herausgebende Person Name, E-Mail und
          Text — über den Weg, den dein Mailanbieter vorsieht.
        </p>

        <h2>Hosting und Serverprotokolle</h2>
        <p>
          Die Website wird über einen Webhost ausgeliefert. Der Host kann technische
          Protokolle (etwa Zeitpunkt, aufgerufene Adresse, gekürzte IP, Browserkennung)
          bearbeiten, soweit das für Betrieb, Sicherheit und Fehlerbehebung nötig ist.
          Dazu gelten die Angaben des jeweiligen Hosts.
        </p>

        <h2>Externe Links</h2>
        <p>
          Links etwa auf{' '}
          <a href="https://innerdevelopmentgoals.org" rel="noopener noreferrer">
            innerdevelopmentgoals.org
          </a>
          {' '}führen zu Angeboten Dritter. Für deren Datenbearbeitung sind die jeweiligen
          Betreiber verantwortlich.
        </p>

        <h2>Deine Rechte</h2>
        <p>
          Soweit das Schweizer Datenschutzgesetz greift, kannst du Auskunft, Berichtigung
          oder Löschung verlangen und eine Meldung an den Eidgenössischen Datenschutz-
          und Öffentlichkeitsbeauftragten (EDÖB) richten. Weil Merkliste und
          Einstellungen nur auf deinem Gerät liegen, löschst du sie am schnellsten selbst.
          Für alles, was uns per E-Mail erreicht, gilt die Kontaktseite.
        </p>
      </>
    ),
  },

  '/nutzungsbedingungen/': {
    title: seoPages['/nutzungsbedingungen/'].pageLabel,
    documentTitle: seoPages['/nutzungsbedingungen/'].title,
    description: seoPages['/nutzungsbedingungen/'].description,
    lead: 'Das Kartenset ist für den Unterricht gedacht. Die Verantwortung für den Einsatz bleibt bei dir.',
    body: (
      <>
        <p>Stand: 13. September 2026</p>

        <h2>Angebot</h2>
        <p>
          «Inner Development Guide im Schulalltag» stellt Reflexionskarten zum Inner Development
          Guide 2.0 bereit: 25 Kompetenzen, Fragen für Lehrperson und Klasse, Ideen für den
          Unterricht und Mini-Übungen. Die Nutzung ist unentgeltlich.
        </p>

        <h2>Wer nutzen darf</h2>
        <p>
          Lehrpersonen, Schulleitungen, Teams und alle, die das Kartenset in Bildung und
          Weiterbildung einsetzen wollen. Der Einsatz im Klassenzimmer, in der
          Vorbereitung und in der Aus- und Weiterbildung ist gestattet.
        </p>

        <h2>Kein offizielles Rahmenwerk-Produkt</h2>
        <p>
          Dieses Angebot ist inspiriert vom Inner Development Guide. Es wird nicht von
          den Herausgeber:innen des Rahmenwerks herausgegeben und spricht nicht in deren
          Namen. Namen und Beschreibungen der Kompetenzen stammen aus dem Inner Development
          Guide 2.0 (Version 7.2). Fragen, Unterrichtsideen, Anknüpfungspunkte und
          Mini-Übungen stammen von diesem Angebot.
        </p>

        <h2>Inhalte und Haftung</h2>
        <p>
          Die Karten sind Impulse, kein Lehrplan und keine Beratung. Ob eine Frage oder
          Übung in deine Klasse passt, entscheidest du. Wir übernehmen keine Gewähr für
          Vollständigkeit, Aktualität oder Eignung in einem bestimmten Unterricht und
          haften nicht für Entscheidungen, die auf diesem Angebot beruhen — soweit das
          Gesetz das zulässt.
        </p>

        <h2>Daten auf dem Gerät</h2>
        <p>
          Gemerkte Karten und Einstellungen liegen im Browser dieses Geräts. Wer das
          Gerät teilt, teilt auch diese Einträge. Mehr dazu in der{' '}
          <a href="/datenschutz/">Datenschutzerklärung</a>.
        </p>

        <h2>Weitergabe</h2>
        <p>
          Den Link auf die Website und die App darfst du weitergeben. Das Angebot selbst
          darfst du nicht als eigenes Produkt verkaufen oder so umbenennen, dass der
          Eindruck entsteht, es sei das offizielle Rahmenwerk.
        </p>

        <h2>Änderungen</h2>
        <p>
          Inhalte, Funktionen und diese Bedingungen können sich ändern. Es besteht kein
          Anspruch darauf, dass das Angebot unverändert oder dauerhaft erreichbar bleibt.
        </p>

        <h2>Kontakt</h2>
        <p>
          Fragen zu diesen Bedingungen: <a href="/kontakt/">Kontakt</a>.
        </p>
      </>
    ),
  },
}

export function pageFromPath(pathname) {
  const contentPage = contentPageFromPath(pathname)
  if (contentPage) {
    return {
      title: contentPage.title,
      documentTitle: contentPage.documentTitle,
      description: contentPage.description,
      lead: contentPage.kind === 'dimension' ? contentPage.dim.subtitle : contentPage.skill.desc,
      crumbs: contentPage.kind === 'dimension'
        ? dimensionCrumbs(contentPage)
        : skillCrumbs(contentPage),
      body: contentPage.kind === 'dimension'
        ? dimensionPageBody(contentPage)
        : skillPageBody(contentPage),
    }
  }

  const key = pathname.replace(/\/+$/, '')
  return pages[key ? `${key}/` : '/']
}
