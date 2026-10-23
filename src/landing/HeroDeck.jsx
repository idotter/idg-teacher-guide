import React from 'react'
import IdgCards from '../app/IdgCards.jsx'

/* Der Held ist das Produkt selbst: ein echter, umdrehbarer Kartenstapel.
   Kein Rahmen, kein Grund, keine Bedienelemente — nur die Karten, wie sie
   auf einem Tisch liegen würden.
   (Das frühere Schaltpult liegt weiterhin in Simulator.jsx.)
   Eigene Datei, damit der vorgerenderte Rumpf (LandingView) diese Komponente
   und ihre Styles nicht mitlädt. */
export default function HeroDeck({ lang, deck, label }) {
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
