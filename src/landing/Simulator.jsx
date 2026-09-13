/* ---------------------------------------------------------------------------
   NICHT MEHR AUF DER LANDINGPAGE EINGEBUNDEN.

   Das war das frühere Schaltpult: die App im Geräterahmen, daneben Regler für
   alle acht Gestaltungsachsen aus den data-props der Vorlage. Für eine
   Marketingseite ist das das falsche Werkzeug — dort steht jetzt der
   Kartenstapel selbst (HeroDeck in Landing.jsx).

   Die Komponente bleibt liegen, weil die Achsen zum Beurteilen von
   Gestaltungsvarianten nützlich sind. Wieder einhängen:
   in Landing.jsx importieren und <Simulator /> setzen.
   --------------------------------------------------------------------------- */
import React, { useCallback, useRef, useState } from 'react'
import IdgCards from '../app/IdgCards.jsx'

/* Die Regler entsprechen den data-props aus
   "IDG Karten v3 organisch.dc.html" — inklusive der dortigen
   Gruppierung in "Karte" und "Bedienung". */
const CARD_CONTROLS = [
  { key: 'variant',     label: 'Variante',  options: [['farbe', 'Farbe'], ['papier', 'Papier']] },
  { key: 'back',        label: 'Rückseite', options: [['liste', 'Liste'], ['fokus', 'Fokus'], ['ruhig', 'Ruhig']] },
  { key: 'depth',       label: 'Tiefe',     options: [['flach', 'Flach'], ['schatten', 'Schatten'], ['stapel', 'Stapel']] },
  { key: 'flipAxis',    label: 'Umdrehen',  options: [['y', 'Horizontal'], ['x', 'Vertikal']] },
  { key: 'showNumbers', label: 'Nummern',   options: [[false, 'Aus'], [true, 'Ein']] },
]

const UI_CONTROLS = [
  { key: 'radius', label: 'Ecken',     options: [['eckig', 'Eckig'], ['weich', 'Weich'], ['rund', 'Rund']] },
  { key: 'ui',     label: 'Bedienung', options: [['minimal', 'Minimal'], ['leiste', 'Leiste']] },
]

const DEFAULTS = {
  variant: 'farbe', back: 'liste', depth: 'schatten',
  flipAxis: 'y', showNumbers: false, radius: 'weich', ui: 'minimal',
}

// Der Simulator schreibt in einen eigenen Namensraum, damit das
// Ausprobieren auf der Landingpage die Merkliste der installierten
// App nicht überschreibt.
const DEMO_PREFIX = 'idg-demo'

function Group({ control, value, onChange }) {
  return (
    <div className="grp">
      <label id={`lbl-${control.key}`}>{control.label}</label>
      <div className="seg" role="group" aria-labelledby={`lbl-${control.key}`}>
        {control.options.map(([v, label]) => (
          <button
            key={String(v)}
            type="button"
            aria-pressed={value === v}
            onClick={() => onChange(control.key, v)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Simulator() {
  const [cfg, setCfg] = useState(DEFAULTS)
  const [seed, setSeed] = useState(0)
  const appRef = useRef(null)

  const set = useCallback((k, v) => setCfg((c) => ({ ...c, [k]: v })), [])

  const reset = () => {
    try {
      localStorage.removeItem(`${DEMO_PREFIX}-saved`)
      localStorage.removeItem(`${DEMO_PREFIX}-prefs`)
      localStorage.removeItem(`${DEMO_PREFIX}-onboarded`)
    } catch { /* Privatmodus: dann gibt es ohnehin nichts zu löschen */ }
    setCfg(DEFAULTS)
    setSeed((n) => n + 1)
  }

  return (
    <div className="bench">
      <div className="stage">
        <div className="device">
          <div className="device-screen" tabIndex={-1}>
            <span className="device-slit" aria-hidden="true" />
            <IdgCards
              key={seed}
              ref={appRef}
              {...cfg}
              lang="de"
              embedded
              storagePrefix={DEMO_PREFIX}
              autoSplash={false}
              autoTour={false}
            />
          </div>
        </div>
        <p className="stage-hint">
          Karte antippen dreht sie um. Seitwärts wischen blättert durch das Set.
          Mit dem Fokus im Gerät blättern auch die Pfeiltasten.
        </p>
      </div>

      <div className="panel">
        <div className="panel-head">
          <b>Kartenset einstellen</b>
          <span>Alle Varianten wirken sofort. Was hier eingestellt wird, bleibt im Simulator.</span>
        </div>

        {CARD_CONTROLS.map((c) => (
          <Group key={c.key} control={c} value={cfg[c.key]} onChange={set} />
        ))}
        {UI_CONTROLS.map((c) => (
          <Group key={c.key} control={c} value={cfg[c.key]} onChange={set} />
        ))}

        <div className="panel-demo">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => appRef.current?.playSplash()}>
            Start zeigen
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => appRef.current?.startTour()}>
            Tutorial zeigen
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
            Zurücksetzen
          </button>
        </div>
      </div>
    </div>
  )
}
