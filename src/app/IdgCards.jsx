import React from 'react'
import { LANGS } from '../content/langs.js'
import './cards.css'

/* --------------------------------------------------------------------------
   IDG Reflexionskarten — portiert aus "IDG Karten v3 organisch.dc.html".
   Die Vorlage lief auf dem Design-Runtime (DCLogic + {{ }}-Templating).
   Hier als echte React-Klassenkomponente: gleiche Zustandsmaschine, gleiche
   Berechnungen, gleiche Inline-Styles. Nur Pseudoklassen (:hover/:active)
   wandern nach cards.css, weil React sie inline nicht setzen kann.

   Sprachen: content/<lang>.js. Eine weitere Sprache ergänzt man, indem man
   die Datei kopiert, die Werte übersetzt, die IDs unverändert lässt und den
   Eintrag in content/langs.js ergänzt.
   -------------------------------------------------------------------------- */

const asset = (p) => `/assets/${p}`

/* --------------------------------------------------------------------------
   Glyph — Kompetenz- und Dimensionszeichen.

   Die Form eines Zeichens steckt allein im Alphakanal; die farbige und die
   weisse Datei unterscheiden sich nur in den RGB-Werten (geprüft: 0 Alpha-
   Abweichungen über alle 28 Paare). Statt zwei feste Bildvarianten zu wählen,
   nimmt diese Komponente eine Datei als Maske und färbt sie ein. So lässt sich
   die Vordergrundfarbe nach denselben Regeln bestimmen, die die Vorlage für
   Text bereits anwendet — nötig, weil das beige "Sein" (#D4B88C) als weisses
   Zeichen auf beigem Grund praktisch verschwindet (Kontrast 1.9).
   -------------------------------------------------------------------------- */
function Glyph({ src, color, style }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'block',
        backgroundColor: color,
        WebkitMaskImage: `url("${src}")`, maskImage: `url("${src}")`,
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        transition: 'background-color .35s ease',
        ...style,
      }}
    />
  )
}

// Auf einer Fläche in Dimensionsfarbe liegt das Zeichen immer in Weiss —
// auch auf dem hellen Beige von "Sein". Das ist gesetzt und gilt ohne Ausnahme.
const fgOnColor = () => '#fff'
// Auf hellem Grund (#fff / #FAF7F5) trägt Weiss nicht; dort die Dimensionsfarbe.
// Ausnahme "Sein": reines Beige auf Weiss ergibt Kontrast 1.8, das Zeichen ist
// in der Dimensionsliste bei 40 px praktisch weg. Die Vorlage kennt für genau
// diese Lage schon ein abgedunkeltes Beige (accentText) — das hier ebenso.
const fgOnLight = (dim) => (dim.id === 'being' ? '#8a7350' : dim.color)

// Zeichnet ein SVG aus einer Liste von Pfaden — entspricht mkIcon der Vorlage.
const mkIcon = (paths) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {paths.map((d, i) => <path key={i} d={d} />)}
  </svg>
)

const ringIcon = (rs) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {rs.map((r, i) => <circle key={i} cx="12" cy="12" r={r} />)}
  </svg>
)

const savedIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
  </svg>
)

const shuffleIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="8.5" cy="12" r="2.5" />
    <circle cx="15.5" cy="12" r="2.5" />
  </svg>
)

const shareIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9.5" strokeDasharray="4 3" />
    <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
  </svg>
)

const menuGlyph = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="2.5" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="9.5" />
  </svg>
)

const saveGlyph = (fill) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" fill={fill} stroke="none" style={{ transition: 'fill .2s' }} />
  </svg>
)

const closeGlyph = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

const targetGlyph = (stroke, fill, size = 22) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" style={{ flex: 'none' }}>
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="12" cy="12" r="3" fill={fill} stroke="none" />
  </svg>
)

// Die vier Tour-Schritte der Vorlage.
const oSvg = (els) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {els.map(([T, a], i) => React.createElement(T, { key: i, ...a }))}
  </svg>
)

function buildShareText(sk, dim, ui) {
  const parts = [
    `${sk.name} - (${dim.name})`,
    '',
    sk.desc,
    '',
  ]
  if (sk.teacher?.length) {
    parts.push(ui.forMe)
    sk.teacher.forEach((q) => parts.push(`• ${q}`))
    parts.push('')
  }
  if (sk.students?.length) {
    parts.push(ui.forStudents)
    sk.students.forEach((q) => parts.push(`• ${q}`))
    parts.push('')
  }
  if (sk.ideas?.length) {
    parts.push(ui.ideas)
    sk.ideas.forEach((q) => parts.push(`• ${q}`))
    parts.push('')
  }
  if (sk.subjects?.length) {
    parts.push(`${ui.subjects}: ${sk.subjects.join(', ')}`)
    parts.push('')
  }
  if (sk.exercise?.title) {
    parts.push(ui.exercise)
    parts.push(`${sk.exercise.title}: ${sk.exercise.text}`)
    parts.push('')
  }
  return parts.join('\n').trim()
}

function cardShareUrl(id) {
  if (typeof window === 'undefined') return `/app/?card=${encodeURIComponent(id)}`
  return `${window.location.origin}/app/?card=${encodeURIComponent(id)}`
}

function shareImageUrl(lang, id) {
  return `/assets/share/${encodeURIComponent(lang)}/${encodeURIComponent(id)}.png`
}

async function fetchShareImage(lang, id) {
  try {
    const res = await fetch(shareImageUrl(lang, id))
    if (!res.ok) return null
    const blob = await res.blob()
    if (!blob.type.startsWith('image/')) return null
    const safeName = `${id}.png`.replace(/[^\w.-]/g, '')
    return new File([blob], safeName, { type: blob.type || 'image/png' })
  } catch {
    return null
  }
}

const TOUR_STEPS = [
  {
    t: 'Karte umdrehen',
    x: 'Tippe auf die Karte: Vorne die Fähigkeit, hinten Reflexionsfragen für dich und deine Klasse.',
    o: oSvg([['circle', { cx: 12, cy: 12, r: 9 }], ['path', { d: 'M12 3a9 9 0 0 1 0 18z', fill: 'currentColor', stroke: 'none' }]]),
  },
  {
    t: 'Durch das Set blättern',
    x: 'Wische die Karte nach links oder rechts. Die Punkte oben zeigen deine Position im Set.',
    o: oSvg([
      ['circle', { cx: 4, cy: 12, r: 1.5, fill: 'currentColor', stroke: 'none' }],
      ['circle', { cx: 12, cy: 12, r: 3.5, fill: 'currentColor', stroke: 'none' }],
      ['circle', { cx: 20, cy: 12, r: 1.5, fill: 'currentColor', stroke: 'none' }],
    ]),
  },
  {
    t: 'Karten merken',
    x: 'Der Kreis oben rechts auf der Karte füllt sich und legt sie in deine Merkliste.',
    o: oSvg([['circle', { cx: 12, cy: 12, r: 8 }], ['circle', { cx: 12, cy: 12, r: 4, fill: 'currentColor', stroke: 'none' }]]),
  },
  {
    t: 'Alles andere im Menü',
    x: 'Hinter den Ringen oben rechts findest du Dimensionen, Merkliste, Reihenfolge und Einstellungen.',
    o: oSvg([['circle', { cx: 12, cy: 12, r: 2.5 }], ['circle', { cx: 12, cy: 12, r: 6 }], ['circle', { cx: 12, cy: 12, r: 9.5 }]]),
  },
]

export default class IdgCards extends React.Component {
  static defaultProps = {
    variant: 'farbe',      // farbe | papier
    flipAxis: 'y',         // y | x
    showNumbers: false,   // data-props der Vorlage: default false
    back: 'liste',         // liste | fokus | ruhig
    depth: 'schatten',     // flach | schatten | stapel
    radius: 'weich',       // eckig | weich | rund
    ui: 'minimal',         // minimal | leiste | ohne
    lang: 'de',
    embedded: false,       // true, wenn die App im Simulator-Rahmen sitzt
    only: null,            // Liste von Skill-IDs: beschränkt den Stapel darauf und legt die Reihenfolge fest
    storagePrefix: 'idg-cards',
    autoSplash: true,
    autoTour: true,
  }

  state = {
    aud: 'teacher', qi: 0, splash: false, data: null, tab: 'stack', filter: 'all',
    index: 0, flipped: false, dx: 0, dragging: false, leaving: 0, noTrans: false,
    saved: [], toast: null, openDim: null, ring: 0, prefs: {}, tour: -1,
    sheet: false, menu: false,
  }

  key = (k) => `${this.props.storagePrefix}-${k}`

  read = (k, fallback) => {
    try {
      const v = localStorage.getItem(this.key(k))
      return v == null ? fallback : JSON.parse(v)
    } catch { return fallback }
  }

  write = (k, v) => {
    try { localStorage.setItem(this.key(k), JSON.stringify(v)) } catch { /* Privatmodus o. Ä. */ }
  }

  usesDeepLink = () => !this.props.embedded && !(this.props.only && this.props.only.length)

  resolveCardIndex = (id) => {
    const d = this.state.data
    if (!d || !id) return -1
    if (!d.skills.some((k) => k.id === id)) return -1
    const base = (this.state.prefs || {}).shuffle ? d.shuffled : d.order
    return base.findIndex((k) => k.id === id)
  }

  openCardInFullStack = (id, cb) => {
    const idx = this.resolveCardIndex(id)
    if (idx < 0) return false
    this.setState({
      tab: 'stack', filter: 'all', index: idx, flipped: false, dx: 0, sheet: false, menu: false,
    }, cb)
    return true
  }

  syncUrlToCard = (sk) => {
    if (!this.usesDeepLink() || !sk || typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.searchParams.set('card', sk.id)
    window.history.replaceState(null, '', `${url.pathname}${url.search}`)
  }

  syncUrlFromIndex = () => {
    const sk = this.list()[this.state.index]
    if (sk) this.syncUrlToCard(sk)
  }

  initialCardIndex = (data, shuffled, prefs, preserveId) => {
    if (!this.usesDeepLink()) return 0
    const urlId = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('card')
      : null
    const targetId = urlId || preserveId
    if (!targetId || !data.skills.some((k) => k.id === targetId)) return 0
    const base = prefs.shuffle ? shuffled : data.skills
    const idx = base.findIndex((k) => k.id === targetId)
    return idx >= 0 ? idx : 0
  }

  getScreenBg() {
    const p = this.props
    const bare = (p.ui ?? 'minimal') === 'ohne'
    if (bare || p.embedded) return null

    const s = this.state
    const farbe = (p.variant ?? 'farbe') === 'farbe'
    const list = this.list()
    const sk = list[s.index] || list[0]
    const d = s.data
    const dims = d ? d.dimensions : []
    const dim = sk ? (dims.find((x) => x.id === sk.dim) || {}) : {}
    const onColor = farbe && s.tab === 'stack' && !!sk && !bare
    return onColor ? dim.color : '#FAF7F5'
  }

  syncRootScreenBg() {
    if (typeof document === 'undefined') return
    const bg = this.getScreenBg()
    if (bg == null) document.documentElement.style.removeProperty('--idg-screen-bg')
    else document.documentElement.style.setProperty('--idg-screen-bg', bg)
  }

  async componentDidMount() {
    this.mounted = true

    // Der Tastatur-Handler wird synchron registriert, noch vor dem await auf
    // loadLang. Sonst hängt eine bereits abgehängte Instanz ihren Handler nach
    // Auflösung des await nachträglich noch an — dann liegen zwei Handler auf
    // demselben Ziel und jeder Tastendruck wirkt doppelt (die Leertaste dreht
    // die Karte hin und gleich wieder zurück).
    this.onKey = (e) => {
      if (!this.mounted || !this.state.data) return
      if (e.key === 'Escape') this.setState({ sheet: false, menu: false })
      if (e.key === 'ArrowRight') this.go(1)
      if (e.key === 'ArrowLeft') this.go(-1)
      if (e.key === ' ') { e.preventDefault(); this.flipNow() }
    }
    // Im Simulator hört nur die fokussierte Instanz mit, sonst steuern
    // Pfeiltasten die App auch beim Scrollen der Landingpage.
    this.keyTarget = this.props.embedded ? this.rootEl : window
    if (this.keyTarget) this.keyTarget.addEventListener('keydown', this.onKey)

    const saved = this.read('saved', []) || []
    const prefs = this.read('prefs', {}) || {}
    const onboarded = this.read('onboarded', false)

    this.setState({
      prefs,
      splash: !!this.props.autoSplash,
      tour: this.props.autoTour && !onboarded ? 0 : -1,
    })

    if (this.props.autoSplash) {
      this.splashT = setTimeout(() => this.setState({ splash: false }), 3200)
    }

    const lang = this.props.embedded
      ? (this.props.lang ?? 'de')
      : (prefs.lang ?? this.props.lang ?? 'de')
    await this.loadLang(lang, saved)
  }

  componentDidUpdate(_prevProps, prevState) {
    this.syncRootScreenBg()

    if (!this.usesDeepLink() || this.state.tab !== 'stack' || !this.state.data) return
    if (!prevState.data) return
    const list = this.list()
    const sk = list[this.state.index]
    const prevList = this.list(prevState)
    const prevSk = prevList[prevState.index]
    if (sk && sk.id !== prevSk?.id) this.syncUrlToCard(sk)
  }

  componentWillUnmount() {
    this.mounted = false
    if (this.keyTarget && this.onKey) this.keyTarget.removeEventListener('keydown', this.onKey)
    clearTimeout(this.tt); clearTimeout(this.splashT); clearTimeout(this.toastT)
    if (typeof document !== 'undefined') document.documentElement.style.removeProperty('--idg-screen-bg')
  }

  async loadLang(lang, saved = this.state.saved) {
    const preserveId = this.state.data ? this.list()[this.state.index]?.id : null
    const prefs = this.state.prefs || this.read('prefs', {}) || {}
    let mod
    try { mod = await import(`../content/${lang}.js`) } catch { mod = await import('../content/de.js') }
    const data = mod.default || mod

    // Karte des Tages: über den Tag stabiler Shuffle, damit alle Geräte
    // dieselbe Reihenfolge zeigen.
    const dayN = Math.floor(Date.now() / 864e5)
    let seed = dayN * 9301 + 49297
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
    const shuffled = [...data.skills]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    this.dayId = shuffled[0].id
    if (this.mounted === false) return
    const index = this.initialCardIndex(data, shuffled, prefs, preserveId)
    this.setState(
      { data: { ...data, order: data.skills, shuffled }, saved, index, filter: 'all', flipped: false },
      () => { if (this.usesDeepLink()) this.syncUrlFromIndex() },
    )
  }

  list(s = this.state) {
    const d = s.data
    if (!d) return []
    const only = this.props.only
    let base = (s.prefs && s.prefs.shuffle) ? d.shuffled : d.order
    // Ein fester Ausschnitt (z. B. eine Karte je Dimension für die Landingpage).
    // Die Reihenfolge von `only` gilt — so steuert die Startseite die Startkarte.
    if (only && only.length) {
      const byId = new Map(base.map((k) => [k.id, k]))
      base = only.map((id) => byId.get(id)).filter(Boolean)
    }
    return s.filter === 'all' ? base : base.filter((k) => k.dim === s.filter)
  }

  flipNow() {
    if (this.moved || this.state.sheet || this.state.menu) return
    this.setState((s) => ({ flipped: !s.flipped }))
  }

  go(dir, out) {
    const l = this.list()
    if (l.length < 2 || this.state.leaving || this.state.sheet || this.state.menu) return
    this.setState({ leaving: out ?? dir, flipped: false, dragging: false })
    clearTimeout(this.tt)
    this.tt = setTimeout(() => {
      this.setState(
        (s) => ({ index: (s.index + dir + l.length) % l.length, leaving: 0, dx: 0, noTrans: true, qi: 0 }),
        () => requestAnimationFrame(() => this.setState({ noTrans: false })),
      )
    }, 260)
  }

  openSkill(id) {
    const d = this.state.data
    const sk = d.skills.find((k) => k.id === id)
    const l = (this.state.prefs || {}).shuffle
      ? d.shuffled.filter((k) => k.dim === sk.dim)
      : d.order.filter((k) => k.dim === sk.dim)
    this.setState({ tab: 'stack', filter: sk.dim, index: l.indexOf(sk), flipped: false, dx: 0, sheet: false })
  }

  toast(t) {
    this.setState({ toast: t })
    clearTimeout(this.toastT)
    this.toastT = setTimeout(() => this.setState({ toast: null }), 2200)
  }

  setPref = (k, v) => {
    const p = { ...(this.state.prefs || {}), [k]: v }
    this.write('prefs', p)
    this.setState({ prefs: p })
    if (k === 'lang') this.loadLang(v)
  }

  toggleSave = (sk, isSaved) => {
    if (!sk) return
    const saved = isSaved ? this.state.saved.filter((x) => x !== sk.id) : [...this.state.saved, sk.id]
    this.write('saved', saved)
    this.setState({ saved, ring: isSaved ? 0 : Date.now() })
    if (navigator.vibrate) navigator.vibrate(8)
  }

  endTour = () => { this.write('onboarded', true); this.setState({ tour: -1 }) }

  // Vom Simulator aus aufrufbar.
  startTour = () => this.setState({ tab: 'stack', tour: 0, sheet: false, flipped: false, menu: false })

  playSplash = () => {
    clearTimeout(this.splashT)
    this.setState({ splash: true })
    this.splashT = setTimeout(() => this.setState({ splash: false }), 3200)
  }

  doShare = async (sk, card, dim, ui) => {
    if (!sk) return
    const lang = (this.state.prefs || {}).lang ?? this.props.lang ?? 'de'
    const body = buildShareText(sk, dim, ui)
    const text = `${body}\n\n${cardShareUrl(sk.id)}`
    const file = await fetchShareImage(lang, sk.id)
    try {
      if (navigator.share) {
        const payload = file ? { title: card.name, text, files: [file] } : { title: card.name, text }
        if (!file || navigator.canShare?.(payload)) {
          await navigator.share(payload)
          return
        }
        await navigator.share({ title: card.name, text })
        return
      }
      await navigator.clipboard.writeText(text)
      this.toast(ui.shared)
    } catch (err) {
      if (err?.name === 'AbortError') return
      try {
        await navigator.clipboard.writeText(text)
        this.toast(ui.shared)
      } catch { /* Privatmodus o. Ä. */ }
    }
  }

  render() {
    const s = this.state
    const d = s.data
    const prefs = s.prefs || {}
    const p = this.props
    const variant = p.variant ?? 'farbe'
    const ui = d ? d.ui : {}
    const list = this.list()
    const sk = list[s.index] || list[0]
    const dims = d ? d.dimensions : []
    const dimOf = (k) => dims.find((x) => x.id === k.dim) || {}
    const fgOn = (dim) => (dim.id === 'being' ? '#000' : '#fff')
    // Maske: die weisse Datei trägt dieselbe Form, die Farbe kommt aus CSS.
    const glyphMask = (k) => asset(`skills/white/${k.icon}.png`)
    const dim = sk ? dimOf(sk) : {}
    const code = sk ? `${dim.num}.${d.skills.filter((k) => k.dim === sk.dim).indexOf(sk) + 1}` : ''
    const card = sk
      ? { ...sk, color: dim.color, dimName: dim.name, dimNum: dim.num, code }
      : { teacher: [], students: [], ideas: [], subjects: [], exercise: {}, name: '', desc: '', dimName: '' }

    const farbe = variant === 'farbe'
    const showNumbers = (prefs.numbers ?? p.showNumbers ?? true) !== false && prefs.numbers !== 'off'
    const frontCode = showNumbers ? code : ''
    const codeSuffix = showNumbers ? ` · ${code}` : ''
    const imgBg = farbe ? (dim.color || '#FAF7F5') : '#FAF7F5'
    const glyphSrc = sk ? glyphMask(sk) : ''
    // Auf der Farbkarte liegt das Zeichen auf der Dimensionsfarbe, auf der
    // Papierkarte auf hellem Grund — jeweils andere Vordergrundfarbe.
    const glyphFg = farbe ? fgOnColor(dim) : fgOnLight(dim)
    // "ohne": nur der Stapel. Keine Punktleiste, kein Menü, kein eigener Grund —
    // die Karten liegen direkt auf dem, was die einbettende Seite hergibt.
    const bare = (p.ui ?? 'minimal') === 'ohne'
    const onColor = farbe && s.tab === 'stack' && !!sk && !bare
    const screenBg = bare ? 'transparent' : onColor ? dim.color : '#FAF7F5'
    const ctrlFg = onColor ? '#fff' : '#000'
    const nextFg = onColor ? (dim.id === 'being' ? '#D4B88C' : dim.color) : '#fff'
    const axis = p.flipAxis ?? 'y'
    const lang = prefs.lang ?? p.lang ?? 'de'
    const mode = p.ui ?? 'minimal'
    const depth = p.depth ?? 'schatten'
    const back = p.back ?? 'liste'

    const qs = (s.aud === 'students' ? card.students : card.teacher) || []
    const qiSafe = qs.length ? s.qi % qs.length : 0
    const focusQ = qs[qiSafe] || ''

    const lift = s.dragging ? 1 : 0
    const shadowOn = depth !== 'flach'
    const cardShadow = shadowOn
      ? (lift
        ? '0 30px 60px -18px rgba(0,0,0,.45), 0 12px 24px -12px rgba(0,0,0,.3)'
        : '0 18px 40px -16px rgba(0,0,0,.4), 0 6px 14px -8px rgba(0,0,0,.25)')
      : 'none'
    const stackOn = depth === 'stapel'
    const radiusMode = p.radius ?? 'weich'
    const rad = { eckig: '0px', weich: '12px', rund: '24px' }[radiusMode] || '12px'
    const radIn = { eckig: '0px', weich: '6px', rund: '14px' }[radiusMode] || '6px'
    const radTop = `${rad} ${rad} 0 0`

    const rot = axis === 'x'
      ? `rotateX(${s.flipped ? -180 : 0}deg)`
      : `rotateY(${s.flipped ? 180 : 0}deg)`
    const tx = s.leaving ? `${-s.leaving * 140}%` : `${s.dx}px`
    const rz = s.leaving ? -s.leaving * 12 : s.dx / 22
    const cardTransform = `translateX(${tx}) rotateZ(${rz}deg) ${lift ? 'scale(1.03) ' : ''}${rot}`
    const cardTransition = s.dragging || s.noTrans
      ? 'none'
      : s.leaving ? 'transform .28s cubic-bezier(.4,0,.8,.4)' : 'transform .7s cubic-bezier(.2,.8,.2,1)'

    const isSaved = !!(sk && s.saved.includes(sk.id))
    const sheet = !!s.sheet && !!sk
    const menu = !!s.menu
    const accent = dim.color || '#000'
    const accentFg = fgOn(dim)
    const accentText = dim.id === 'being' ? '#8a7350' : (dim.color || '#000')
    const saveIconFill = isSaved ? 'currentColor' : 'none'
    const saveLabel = isSaved ? ui.saved : ui.save

    const saveRing = s.ring
      ? <span key={s.ring} style={{ position: 'absolute', inset: 0, border: '1.5px solid #000', borderRadius: '50%', animation: 'idgRing .6s ease-out forwards', pointerEvents: 'none' }} />
      : null

    const tourOn = s.tour != null && s.tour >= 0 && !!d
    const tourStep = TOUR_STEPS[s.tour] || TOUR_STEPS[0]
    const tourLast = s.tour === TOUR_STEPS.length - 1

    const goTab = (t) => this.setState({ tab: t, menu: false })

    const dimDots = (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        {dims.map((x, i) => <circle key={x.id} cx="12" cy="12" r={2 + i * 2} stroke={x.color} />)}
      </svg>
    )

    const menuItems = d ? [
      { label: ui.tabs.dimensions, meta: '', icon: dimDots, go: () => goTab('dimensions') },
      { label: ui.tabs.saved, meta: String(s.saved.length), icon: savedIcon, go: () => goTab('saved') },
      {
        label: ui.orderRandom || 'Zufällige Reihenfolge',
        meta: prefs.shuffle ? (ui.on || 'Ein') : (ui.off || 'Aus'),
        icon: shuffleIcon,
        go: () => { this.setPref('shuffle', !prefs.shuffle); this.setState({ index: 0, flipped: false, dx: 0, qi: 0 }) },
      },
      ...(mode === 'minimal'
        ? [{ label: ui.share, meta: '', icon: shareIcon, go: () => { this.setState({ menu: false }); setTimeout(() => this.doShare(sk, card, dim, ui), 300) } }]
        : []),
      { label: ui.tabs.settings, meta: '', icon: ringIcon([2.5, 6, 9.5]), go: () => goTab('settings') },
    ] : []

    const dimList = dims.map((x) => {
      const ks = d.skills.filter((k) => k.dim === x.id)
      return {
        ...x,
        numPrefix: showNumbers ? `${x.num} · ` : '',
        fg: fgOn(x),
        symbol: asset(`symbols/white/${x.id}.png`),
        symbolFg: fgOnColor(x),
        count: ks.length,
        open: s.openDim === x.id,
        chevron: s.openDim === x.id ? 'rotate(180deg)' : 'none',
        toggle: () => this.setState((st) => ({ openDim: st.openDim === x.id ? null : x.id })),
        skills: ks.map((k) => ({ ...k, iconSrc: glyphMask(k), iconFg: fgOnLight(x), saved: s.saved.includes(k.id), open: () => this.openSkill(k.id) })),
      }
    })

    const savedList = d
      ? d.skills.filter((k) => s.saved.includes(k.id)).map((k) => {
        const dm = dimOf(k)
        return {
          ...k,
          color: dm.color,
          fg: fgOn(dm),
          glyph: glyphMask(k),
          glyphFg: fgOnColor(dm),
          codeLabel: showNumbers ? `${dm.num}.${d.skills.filter((q) => q.dim === k.dim).indexOf(k) + 1}` : '',
          open: () => this.openSkill(k.id),
        }
      })
      : []

    const settingGroups = d ? [{
      label: ui.language,
      options: LANGS.map((o) => ({
        label: o.label,
        bg: lang === o.v ? '#000' : '#fff',
        fg: lang === o.v ? '#fff' : '#000',
        select: () => this.setPref('lang', o.v),
      })),
    }] : []

    const installHint = (() => {
      if (typeof navigator === 'undefined') return ''
      const ua = navigator.userAgent
      const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone
      if (standalone) return 'Die App ist installiert und läuft offline.'
      if (/iPhone|iPad|iPod/.test(ua)) return 'Safari: „Teilen“ antippen und „Zum Home-Bildschirm“ wählen.'
      if (/Android/.test(ua)) return 'Chrome: Menü (⋮) öffnen und „App installieren“ bzw. „Zum Startbildschirm hinzufügen“ wählen.'
      return 'Im Browser: Installieren-Symbol in der Adresszeile antippen oder im Menü „App installieren“ wählen.'
    })()

    const saveButton = (color) => (
      <button
        onClick={(e) => { e.stopPropagation(); this.toggleSave(sk, isSaved) }}
        aria-label={saveLabel}
        aria-pressed={isSaved}
        className="idg-h6"
        style={{ position: 'relative', width: 36, height: 36, margin: '-8px -10px -8px 0', border: 0, background: 'transparent', color, display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'opacity .15s' }}
      >
        {saveRing}
        {saveGlyph(saveIconFill)}
      </button>
    )

    const ideasButtonLabel = (
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span>{ui.ideas}</span>
        <span style={{ fontWeight: 300, fontSize: 12 }}>{ui.sheetSub}</span>
      </span>
    )

    const openSheet = (e) => { e.stopPropagation(); this.setState({ sheet: true }) }

    return (
      <div
        ref={(el) => { this.rootEl = el }}
        tabIndex={p.embedded ? 0 : undefined}
        className={`idg-root${p.embedded ? ' is-embedded' : ''}${bare ? ' is-bare' : ''}`}
      >
        <div style={{ width: '100%', maxWidth: 480, height: '100%', display: 'flex', flexDirection: 'column', background: screenBg, transition: 'background .35s ease', position: 'relative', overflow: bare ? 'visible' : 'hidden' }}>
          <main style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative', overflow: bare ? 'visible' : 'hidden', paddingTop: bare ? 0 : 'calc(var(--idg-sat) + 10px)' }}>

            {/* ---------------- Stapel ---------------- */}
            {s.tab === 'stack' && (
              <>
                <div style={{ flex: 'none', display: bare ? 'none' : 'flex', alignItems: 'center', gap: 14, padding: '2px 16px', minHeight: 36 }}>
                  <div style={{ flex: 1, display: 'flex', gap: 3, alignItems: 'center', height: 36 }}>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2px' }}>
                      {list.map((_, i) => (
                        <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: ctrlFg, opacity: i === s.index ? 1 : i < s.index ? 0.75 : 0.3, transform: `scale(${i === s.index ? 1.5 : 1})`, transition: 'opacity .3s, transform .3s, background .35s' }} />
                      ))}
                    </div>
                  </div>
                  {mode === 'minimal' && (
                    <button onClick={() => this.setState({ menu: true })} aria-label="Menü" className="idg-h6"
                      style={{ flex: 'none', width: 36, height: 36, marginRight: -8, border: 0, background: 'transparent', color: ctrlFg, display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'opacity .15s, color .35s' }}>
                      {menuGlyph}
                    </button>
                  )}
                </div>

                <div
                  style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 16px 12px', position: 'relative', perspective: 1400, containerType: 'size', touchAction: 'pan-y', userSelect: 'none', WebkitUserSelect: 'none' }}
                  onPointerDown={(e) => {
                    if (s.leaving || s.sheet || s.menu) return
                    if (e.pointerType === 'mouse' && e.button !== 0) return
                    this.x0 = e.clientX; this.y0 = e.clientY; this.moved = false
                    this.setState({ dragging: true })
                  }}
                  onPointerMove={(e) => {
                    if (this.x0 == null || s.leaving) return
                    const dx = e.clientX - this.x0, dy = e.clientY - this.y0
                    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { this.moved = true; this.setState({ dx }) }
                  }}
                  onPointerUp={() => {
                    if (this.x0 == null) return
                    const dx = s.dx; this.x0 = null
                    if (Math.abs(dx) > 70) this.go(dx < 0 ? 1 : -1)
                    else this.setState({ dx: 0, dragging: false })
                    setTimeout(() => { this.moved = false }, 50)
                  }}
                  onPointerCancel={() => { this.x0 = null; this.setState({ dx: 0, dragging: false }) }}
                  onPointerLeave={() => {
                    if (this.x0 == null) return
                    const dx = s.dx; this.x0 = null
                    if (Math.abs(dx) > 70) this.go(dx < 0 ? 1 : -1)
                    else this.setState({ dx: 0, dragging: false })
                    setTimeout(() => { this.moved = false }, 50)
                  }}
                >
                  <div style={{ position: 'relative', height: 'min(calc(100cqh - 16px), calc((100cqw - 32px) * 7 / 5))', aspectRatio: '5 / 7', transformStyle: 'preserve-3d' }}>
                    {stackOn && (
                      <>
                        <div style={{ position: 'absolute', inset: 0, background: '#fff', borderRadius: rad, transform: 'translateY(22px) rotate(-3deg) scale(.94)', transformOrigin: '50% 100%', boxShadow: '0 8px 20px -10px rgba(0,0,0,.35), inset 0 0 0 1px rgba(0,0,0,.08)' }} />
                        <div style={{ position: 'absolute', inset: 0, background: '#fff', borderRadius: rad, transform: 'translateY(11px) rotate(2deg) scale(.97)', transformOrigin: '50% 100%', boxShadow: '0 8px 20px -10px rgba(0,0,0,.35), inset 0 0 0 1px rgba(0,0,0,.08)' }} />
                      </>
                    )}

                    <div onClick={() => this.flipNow()} style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', cursor: 'pointer', borderRadius: rad, transform: cardTransform, transition: cardTransition, willChange: 'transform' }}>

                      {/* Vorderseite */}
                      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', background: '#fff', color: '#000', display: 'flex', flexDirection: 'column', gap: 12, padding: 12, overflow: 'hidden', borderRadius: rad, boxShadow: cardShadow, transition: 'box-shadow .3s ease' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, padding: '2px 4px 0' }}>
                          <span>{frontCode}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontWeight: 300 }}>{card.dimName}</span>
                            {saveButton('#000')}
                          </span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, background: imgBg, borderRadius: radIn, transition: 'background .35s ease' }}>
                          {!!sk && <Glyph src={glyphSrc} color={glyphFg} style={{ width: '60%', height: '80%' }} />}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 4px 4px' }}>
                          <h2 style={{ margin: 0, fontSize: 22, lineHeight: 1.12, fontWeight: 700, letterSpacing: '-.01em', textWrap: 'pretty' }}>{card.name}</h2>
                          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.4, fontWeight: 300, textWrap: 'pretty' }}>{card.desc}</p>
                          <span style={{ fontSize: 11, opacity: .6, marginTop: 4, display: tourOn ? 'flex' : 'none', alignItems: 'center', gap: 6 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
                            </svg>
                            {ui.flipHint}
                          </span>
                        </div>
                      </div>

                      {/* Rückseite */}
                      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: axis === 'x' ? 'rotateX(180deg)' : 'rotateY(180deg)', background: '#fff', color: '#000', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: rad, boxShadow: cardShadow, transition: 'box-shadow .3s ease' }}>

                        {back === 'liste' && (
                          <>
                            <div onClick={() => this.flipNow()} role="button" aria-label={ui.flipHint} className="idg-h7"
                              style={{ flex: 'none', padding: '14px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minWidth: 0, borderBottom: '1px solid rgba(0,0,0,.14)', cursor: 'pointer', transition: 'opacity .15s' }}>
                              <span style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.15 }}>{card.name}</span>
                              {saveButton('inherit')}
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 20px', display: 'flex', flexDirection: 'column', gap: 18, WebkitOverflowScrolling: 'touch' }}>
                              <section style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .65 }}>{ui.forMe}</h3>
                                {(card.teacher || []).map((q, i) => <p key={i} style={{ margin: 0, fontSize: 14, lineHeight: 1.4, fontWeight: 700, textWrap: 'pretty' }}>{q}</p>)}
                              </section>
                              <section style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .65 }}>{ui.forStudents}</h3>
                                {(card.students || []).map((q, i) => <p key={i} style={{ margin: 0, fontSize: 14, lineHeight: 1.4, fontWeight: 300, textWrap: 'pretty' }}>{q}</p>)}
                              </section>
                              <button onClick={openSheet} className="idg-h85 idg-press"
                                style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '12px 16px 12px 20px', border: '1px solid currentColor', borderRadius: 999, background: 'transparent', color: 'inherit', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', textAlign: 'left', transition: 'opacity .15s, transform .12s' }}>
                                {ideasButtonLabel}
                                {targetGlyph('currentColor', 'currentColor')}
                              </button>
                            </div>
                          </>
                        )}

                        {back === 'fokus' && (
                          <>
                            <div onClick={() => this.flipNow()} role="button" aria-label={ui.flipHint}
                              style={{ flex: 'none', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: accent, color: accentFg, cursor: 'pointer', transition: 'background .35s' }}>
                              <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                                <span style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .8 }}>{card.dimName}</span>
                                <span style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.15 }}>{card.name}</span>
                              </span>
                              {saveButton('inherit')}
                            </div>
                            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '16px 20px 20px', gap: 14 }}>
                              <div style={{ display: 'flex', gap: 6 }}>
                                <button onClick={(e) => { e.stopPropagation(); this.setState({ aud: 'teacher', qi: 0 }) }}
                                  style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 999, border: '1px solid #000', background: s.aud === 'teacher' ? '#000' : 'transparent', color: s.aud === 'teacher' ? '#fff' : '#000', transition: 'background .15s, color .15s' }}>{ui.forMe}</button>
                                <button onClick={(e) => { e.stopPropagation(); this.setState({ aud: 'students', qi: 0 }) }}
                                  style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 999, border: '1px solid #000', background: s.aud === 'students' ? '#000' : 'transparent', color: s.aud === 'students' ? '#fff' : '#000', transition: 'background .15s, color .15s' }}>{ui.forStudents}</button>
                              </div>
                              <div onClick={(e) => { e.stopPropagation(); if (qs.length > 1) this.setState({ qi: (qiSafe + 1) % qs.length }) }}
                                style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, cursor: 'pointer' }}>
                                <span style={{ width: 10, height: 10, borderRadius: '50%', background: accent }} />
                                <p style={{ margin: 0, fontSize: focusQ.length > 90 ? 17 : 20, lineHeight: 1.3, fontWeight: 700, letterSpacing: '-.01em', textWrap: 'pretty' }}>{focusQ}</p>
                                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                  {qs.map((_, i) => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#000', opacity: i === qiSafe ? 1 : .25, transition: 'opacity .2s' }} />)}
                                  <span style={{ fontSize: 11, opacity: .55, marginLeft: 6 }}>{qs.length > 1 ? (ui.tapNext || 'Tippen für nächste Frage') : ''}</span>
                                </div>
                              </div>
                              <button onClick={openSheet} className="idg-h85 idg-press"
                                style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '12px 16px 12px 20px', border: '1px solid transparent', borderRadius: 999, background: accent, color: accentFg, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', textAlign: 'left', transition: 'opacity .15s, transform .12s' }}>
                                {ideasButtonLabel}
                                {targetGlyph('currentColor', 'currentColor')}
                              </button>
                            </div>
                          </>
                        )}

                        {back === 'ruhig' && (
                          <>
                            <div onClick={() => this.flipNow()} role="button" aria-label={ui.flipHint} className="idg-h7"
                              style={{ flex: 'none', padding: '16px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer', transition: 'opacity .15s' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                                <span style={{ width: 14, height: 14, borderRadius: '50%', background: accent, flex: 'none' }} />
                                <span style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.name}</span>
                              </span>
                              {saveButton('inherit')}
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 22, WebkitOverflowScrolling: 'touch' }}>
                              <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, color: accentText }}>{ui.forMe}</h3>
                                {(card.teacher || []).map((q, i) => <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.3, fontWeight: 700, letterSpacing: '-.01em', textWrap: 'pretty' }}>{q}</p>)}
                              </section>
                              <section style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 18, borderTop: '1px solid rgba(0,0,0,.12)' }}>
                                <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, color: accentText }}>{ui.forStudents}</h3>
                                {(card.students || []).map((q, i) => <p key={i} style={{ margin: 0, fontSize: 15, lineHeight: 1.35, fontWeight: 300, textWrap: 'pretty' }}>{q}</p>)}
                              </section>
                              <button onClick={openSheet} className="idg-h6"
                                style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0 0', border: 0, background: 'transparent', color: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', textAlign: 'left', transition: 'opacity .15s' }}>
                                {targetGlyph(accent, accent, 26)}
                                <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                  <span>{ui.ideas}</span>
                                  <span style={{ fontWeight: 300, fontSize: 12, opacity: .7 }}>{ui.sheetSub}</span>
                                </span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {mode === 'leiste' && (
                  <div style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 4px' }}>
                    <button onClick={() => this.setState({ menu: true })} aria-label="Menü" className="idg-h6"
                      style={{ width: 44, height: 44, border: 0, background: 'transparent', color: ctrlFg, display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'opacity .15s, color .35s' }}>
                      {menuGlyph}
                    </button>
                    <div style={{ display: 'flex' }}>
                      <button
                        onClick={() => { const on = !prefs.shuffle; this.setPref('shuffle', on); this.setState({ index: 0, flipped: false, dx: 0 }); this.toast(on ? (ui.orderRandom || 'Zufällige Reihenfolge') : (ui.orderGuide || 'Reihenfolge gemäss Guide')) }}
                        aria-label={prefs.shuffle ? (ui.orderRandom || 'Zufällige Reihenfolge') : (ui.orderGuide || 'Reihenfolge gemäss Guide')}
                        aria-pressed={!!prefs.shuffle} className="idg-a6"
                        style={{ width: 44, height: 44, border: 0, background: 'transparent', color: ctrlFg, opacity: prefs.shuffle ? 1 : .5, display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'opacity .2s, color .35s' }}>
                        {shuffleIcon}
                      </button>
                      <button onClick={() => this.doShare(sk, card, dim, ui)} aria-label={ui.share} className="idg-h6"
                        style={{ width: 44, height: 44, border: 0, background: 'transparent', color: ctrlFg, display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'opacity .15s, color .35s' }}>
                        {shareIcon}
                      </button>
                    </div>
                  </div>
                )}
                {!bare && <div style={{ flex: 'none', height: 'var(--idg-sab)' }} />}
              </>
            )}

            {/* ---------------- Schliessen-Knopf der Unterseiten ---------------- */}
            {s.tab !== 'stack' && (
              <button onClick={() => this.setState({ tab: 'stack' })} aria-label={ui.close} className="idg-invert"
                style={{ position: 'absolute', top: 'calc(var(--idg-sat) + 10px)', right: 16, zIndex: 3, width: 36, height: 36, border: '1px solid #000', borderRadius: '50%', background: '#fff', color: '#000', display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'background .15s, color .15s' }}>
                {closeGlyph}
              </button>
            )}

            {/* ---------------- Dimensionen ---------------- */}
            {s.tab === 'dimensions' && (
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '6px 20px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h1 style={{ margin: 0, fontSize: 26, lineHeight: 1.12, fontWeight: 700, letterSpacing: '-.01em', paddingRight: 56 }}>
                    {d.dimensions.length} {ui.tabs.dimensions}<br /><span style={{ fontWeight: 300 }}>{d.skills.length} {ui.skillsCount}</span>
                  </h1>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 300, lineHeight: 1.45, textWrap: 'pretty' }}>{ui.intro}</p>
                </div>
                {dimList.map((dd) => (
                  <div key={dd.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <button onClick={dd.toggle} className="idg-a85"
                      style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', background: dd.color, color: dd.fg, transition: 'opacity .15s' }}>
                      <Glyph src={dd.symbol} color={dd.symbolFg} style={{ width: 52, height: 52, flex: 'none' }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                        <span style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .8 }}>{dd.numPrefix}{dd.count} {ui.skillsCount}</span>
                        <span style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>{dd.name}</span>
                        <span style={{ fontSize: 14, fontWeight: 300 }}>{dd.subtitle}</span>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform .3s ease', transform: dd.chevron }}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {dd.open && (
                      <div style={{ display: 'flex', flexDirection: 'column', animation: 'idgFadeUp .3s ease' }}>
                        <p style={{ margin: 0, padding: '14px 20px 6px', fontSize: 13.5, fontWeight: 300, lineHeight: 1.45, textWrap: 'pretty' }}>{dd.intro}</p>
                        {dd.skills.map((sx) => (
                          <button key={sx.id} onClick={sx.open} className="idg-tint"
                            style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, padding: '10px 20px', borderBottom: '1px solid rgba(0,0,0,.1)', transition: 'background .15s' }}>
                            <Glyph src={sx.iconSrc} color={sx.iconFg} style={{ width: 40, height: 40, flex: 'none' }} />
                            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{sx.name}</span>
                            {sx.saved && <svg width="12" height="12" viewBox="0 0 24 24" fill="#000"><circle cx="12" cy="12" r="8" /></svg>}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .5 }}>
                              <path d="M9 6l6 6-6 6" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div style={{ height: 24, flex: 'none' }} />
              </div>
            )}

            {/* ---------------- Merkliste ---------------- */}
            {s.tab === 'saved' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '6px 20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h1 style={{ margin: 0, fontSize: 26, lineHeight: 1.12, fontWeight: 700, letterSpacing: '-.01em', paddingRight: 56 }}>
                  {ui.tabs?.saved}<br /><span style={{ fontWeight: 300 }}>{s.saved.length} {ui.skillsCount}</span>
                </h1>
                {s.saved.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {savedList.map((sx) => (
                      <button key={sx.id} onClick={sx.open} className="idg-press97"
                        style={{ all: 'unset', cursor: 'pointer', aspectRatio: '5 / 7', background: sx.color, color: sx.fg, display: 'flex', flexDirection: 'column', padding: 12, boxSizing: 'border-box', borderRadius: radIn, animation: 'idgFadeUp .3s ease', transition: 'transform .15s' }}>
                        <span style={{ fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, minHeight: 12 }}>{sx.codeLabel}</span>
                        <Glyph src={sx.glyph} color={sx.glyphFg} style={{ width: '55%', aspectRatio: '1', margin: 'auto' }} />
                        <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.15, textWrap: 'pretty' }}>{sx.name}</span>
                      </button>
                    ))}
                  </div>
                )}
                {!!d && s.saved.length === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 20 }}>
                    <span style={{ fontWeight: 700 }}>{ui.emptySaved}</span>
                    <span style={{ fontWeight: 300, fontSize: 14 }}>{ui.emptySavedHint}</span>
                  </div>
                )}
              </div>
            )}

            {/* ---------------- Einstellungen ---------------- */}
            {s.tab === 'settings' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '6px 20px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                <h1 style={{ margin: 0, fontSize: 26, lineHeight: 1.12, fontWeight: 700, letterSpacing: '-.01em', paddingRight: 56 }}>{ui.tabs?.settings}</h1>
                {settingGroups.map((g, gi) => (
                  <section key={gi} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .65 }}>{g.label}</h3>
                    <div style={{ display: 'flex', border: '1px solid #000' }}>
                      {g.options.map((o, oi) => (
                        <button key={oi} onClick={o.select} className="idg-a8"
                          style={{ flex: 1, height: 44, border: 0, borderRight: '1px solid #000', background: o.bg, color: o.fg, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background .18s, color .18s' }}>{o.label}</button>
                      ))}
                    </div>
                  </section>
                ))}
                <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .65 }}>{ui.tabs?.saved}</h3>
                  <button onClick={() => { this.write('saved', []); this.setState({ saved: [] }); this.toast(ui.cleared) }} className="idg-invert"
                    style={{ height: 44, border: '1px solid #000', background: '#fff', color: '#000', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background .15s, color .15s' }}>
                    {ui.clearSaved} ({s.saved.length})
                  </button>
                </section>
                <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .65 }}>Als App installieren</h3>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', border: '1px solid #000', padding: 14 }}>
                    <img src={asset('icons/icon-192.png')} alt="" style={{ width: 48, height: 48, flex: 'none' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Zum Startbildschirm hinzufügen</span>
                      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45, fontWeight: 300, textWrap: 'pretty' }}>{installHint}</p>
                    </div>
                  </div>
                </section>
                <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .65 }}>Hilfe</h3>
                  <button onClick={this.startTour} className="idg-invert"
                    style={{ height: 44, border: '1px solid #000', background: '#fff', color: '#000', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background .15s, color .15s' }}>
                    Tutorial erneut anzeigen
                  </button>
                </section>
                <section style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,.14)' }}>
                  <img src={asset('inspired-by-idg.png')} alt="Inspired by IDG" style={{ height: 34, width: 'auto', alignSelf: 'flex-start' }} />
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45, fontWeight: 300, textWrap: 'pretty' }}>{ui.about}</p>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45, fontWeight: 300, opacity: .6, textWrap: 'pretty' }}>{ui.attribution}</p>
                </section>
              </div>
            )}

            {/* ---------------- Sheet: Im Unterricht ---------------- */}
            <div onClick={() => this.setState({ sheet: false })}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)', opacity: sheet ? 1 : 0, pointerEvents: sheet ? 'auto' : 'none', transition: 'opacity .3s ease', zIndex: 5 }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, maxHeight: '88%', background: '#fff', color: '#000', display: 'flex', flexDirection: 'column', borderRadius: radTop, transform: sheet ? 'translateY(0)' : 'translateY(105%)', visibility: sheet ? 'visible' : 'hidden', transition: 'transform .42s cubic-bezier(.2,.8,.2,1), visibility .42s', zIndex: 6 }}>
              <div style={{ flex: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '16px 20px 12px', borderBottom: '1px solid rgba(0,0,0,.14)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent, display: 'inline-block' }} />
                    {card.dimName}{codeSuffix}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.15 }}>{card.name}</span>
                  <span style={{ fontWeight: 300, fontSize: 13 }}>{ui.ideas}</span>
                </div>
                <button onClick={() => this.setState({ sheet: false })} aria-label={ui.close} className="idg-invert"
                  style={{ flex: 'none', width: 36, height: 36, border: '1px solid #000', borderRadius: '50%', background: '#fff', color: '#000', display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'background .15s, color .15s' }}>
                  {closeGlyph}
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px calc(var(--idg-sab) + 24px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .65 }}>{ui.ideas}</h3>
                  {(card.ideas || []).map((i, ix) => (
                    <p key={ix} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.45, textWrap: 'pretty', paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: 7, width: 8, height: 8, borderRadius: '50%', background: accent }} />{i}
                    </p>
                  ))}
                </section>
                <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .65 }}>{ui.subjects}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(card.subjects || []).map((sx, ix) => (
                      <span key={ix} style={{ fontSize: 12, fontWeight: 600, padding: '5px 12px', border: '1px solid #000', borderRadius: 999 }}>{sx}</span>
                    ))}
                  </div>
                </section>
                <section style={{ background: accent, color: accentFg, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 4, borderRadius: radIn }}>
                  <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .85 }}>{ui.exercise}</h3>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{card.exercise?.title}</span>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.45, textWrap: 'pretty', fontWeight: 300 }}>{card.exercise?.text}</p>
                </section>
              </div>
            </div>

            {/* ---------------- Menü ---------------- */}
            <div onClick={() => this.setState({ menu: false })}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)', opacity: menu ? 1 : 0, pointerEvents: menu ? 'auto' : 'none', transition: 'opacity .3s ease', zIndex: 5 }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', color: '#000', display: 'flex', flexDirection: 'column', borderRadius: radTop, overflow: 'hidden', paddingBottom: 'calc(var(--idg-sab) + 8px)', transform: menu ? 'translateY(0)' : 'translateY(105%)', visibility: menu ? 'visible' : 'hidden', transition: 'transform .42s cubic-bezier(.2,.8,.2,1), visibility .42s', zIndex: 6 }}>
              {menuItems.map((m, mi) => (
                <button key={mi} onClick={m.go} className="idg-tint"
                  style={{ all: 'unset', boxSizing: 'border-box', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', height: 56, borderBottom: '1px solid rgba(0,0,0,.1)', fontSize: 15, fontWeight: 600, transition: 'background .15s' }}>
                  <span style={{ width: 22, height: 22, display: 'grid', placeItems: 'center', flex: 'none' }}>{m.icon}</span>
                  <span style={{ flex: 1 }}>{m.label}</span>
                  <span style={{ fontWeight: 300, fontSize: 13, opacity: .7 }}>{m.meta}</span>
                </button>
              ))}
            </div>

            {/* ---------------- Splash ---------------- */}
            {s.splash && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: '#fff', color: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, animation: 'idgSplashOut .5s ease 2.6s forwards', pointerEvents: 'none' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  {/* Die Dimensionssymbole sind Vollflächen, keine Linienzeichen:
                      die reine Markenfarbe trägt hier auch auf hellem Grund. */}
                  {dims.map((x, i) => (
                    <Glyph key={x.id} src={asset(`symbols/white/${x.id}.png`)} color={x.color}
                      style={{ width: 44, height: 44, animation: `idgSymIn .7s cubic-bezier(.2,.8,.2,1) ${.15 + i * .15}s both` }} />
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, animation: 'idgWordIn .6s ease 1.2s both' }}>
                  <span style={{ fontSize: 22, lineHeight: 1.1, fontWeight: 700, letterSpacing: '-.01em' }}>{ui.appName}</span>
                  <span style={{ fontSize: 22, lineHeight: 1.1, fontWeight: 300 }}>{ui.appNameSub || ''}</span>
                </div>
                <img src={asset('inspired-by-idg.png')} alt="Inspired by IDG"
                  style={{ position: 'absolute', bottom: 'calc(var(--idg-sab) + 28px)', height: 30, width: 'auto', animation: 'idgWordIn .6s ease 1.6s both' }} />
              </div>
            )}

            {/* ---------------- Tour ---------------- */}
            {tourOn && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 8, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'rgba(0,0,0,.55)', animation: 'idgFadeUp .3s ease' }}>
                <div style={{ background: '#fff', color: '#000', borderRadius: radTop, padding: '22px 20px calc(var(--idg-sab) + 20px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {TOUR_STEPS.map((_, i) => (
                        <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#000', opacity: i === s.tour ? 1 : .25, transform: `scale(${i === s.tour ? 1.4 : 1})`, transition: 'opacity .2s, transform .2s' }} />
                      ))}
                    </div>
                    <button onClick={this.endTour} className="idg-h8"
                      style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 600, opacity: .6, padding: '6px 0' }}>Überspringen</button>
                  </div>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ flex: 'none', width: 52, height: 52, border: '1px solid #000', borderRadius: '50%', display: 'grid', placeItems: 'center' }}>{tourStep.o}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, opacity: .6 }}>{(s.tour || 0) + 1} von {TOUR_STEPS.length}</span>
                      <h2 style={{ margin: 0, fontSize: 22, lineHeight: 1.12, fontWeight: 700, letterSpacing: '-.01em', textWrap: 'pretty' }}>{tourStep.t}</h2>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, fontWeight: 300, textWrap: 'pretty' }}>{tourStep.x}</p>
                    </div>
                  </div>
                  <button onClick={() => (tourLast ? this.endTour() : this.setState((q) => ({ tour: q.tour + 1 })))} className="idg-h8"
                    style={{ height: 48, border: '1px solid #000', borderRadius: 999, background: '#000', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'opacity .15s' }}>
                    {tourLast ? 'Los geht’s' : 'Weiter'}
                  </button>
                </div>
              </div>
            )}

            {/* ---------------- Toast ---------------- */}
            {!!s.toast && (
              <div style={{ position: 'absolute', left: '50%', bottom: 16, transform: 'translateX(-50%)', background: '#000', color: '#fff', fontSize: 13, fontWeight: 600, padding: '10px 18px', borderRadius: 999, animation: 'idgToast 2.2s ease forwards', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                {s.toast}
              </div>
            )}
          </main>
        </div>
      </div>
    )
  }
}
