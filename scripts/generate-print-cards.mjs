/**
 * Erzeugt das Kartenset zum Ausdrucken: A4, je vier Karten im Format A6.
 * Seiten abwechselnd Vorder- und Rückseiten, für beidseitigen Druck über die
 * lange Kante. Rückseiten sind spaltenweise gespiegelt, damit sie nach dem
 * Wenden hinter ihrer Vorderseite liegen.
 *
 * Aufruf: node scripts/generate-print-cards.mjs [lang]   (Standard: de)
 * Ausgabe: marketing/kartenset/kartenset-{lang}.html und .pdf
 * Braucht Google Chrome (headless) für den PDF-Druck.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'marketing/kartenset')
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const SITE = 'guide.zukunftskompetenzchallenge.ch'

const lang = process.argv[2] || 'de'

// Texte der Zusatzkarten; nur Deutsch, solange das Set nur in der Schweiz verteilt wird.
const EXTRA = {
  title: 'Inner Development Guide im Schulalltag',
  claim: 'Zukunft gestalten. In fünf Minuten.',
  sub: '25 Reflexionskarten für Lehrpersonen',
  howTitle: 'So nutzt du die Karten',
  how: [
    ['Vorderseite', 'Eine von 25 Kompetenzen des Inner Development Guide, geordnet in fünf Dimensionen.'],
    ['Für mich', 'Zwei Fragen an dich als Lehrperson – für den Morgen, den Heimweg oder das Team.'],
    ['Für meine Klasse', 'Zwei Fragen für das Gespräch mit der Klasse. Für Jüngere vereinfachen, für Ältere vertiefen.'],
    ['Mini-Übung', 'Fünf Minuten, ohne Vorbereitung. Gut als Einstieg in eine Lektion oder Klassenstunde.'],
  ],
  howNote: 'Ziehe eine Karte pro Woche oder am Morgen. Die Karten sind Impulse – ob eine Frage in deine Klasse passt, entscheidest du.',
  dimsTitle: 'Fünf Dimensionen',
  ownTitle: 'Eigene Karte',
  ownHint: 'Welche Fähigkeit fehlt dir noch? Schreib deine eigene Karte.',
  ownFields: ['Kompetenz', 'Für mich', 'Für meine Klasse', 'Mini-Übung'],
  moreTitle: 'Mehr entdecken',
  moreApp: 'Alle Karten als App, offline und ohne Konto',
  moreChallenge: 'Zukunftskompetenz-Challenge: sechs Wochen per E-Mail, kostenlos',
}

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const fileUrl = (p) => pathToFileURL(p).href

async function main() {
  const mod = await import(fileUrl(join(ROOT, 'src/content', `${lang}.js`)))
  const { ui, dimensions, skills } = mod.default || mod
  const dimById = new Map(dimensions.map((d) => [d.id, d]))
  const qrGuide = await readFile(join(ROOT, 'marketing/assets/qr-guide.svg'), 'utf8')
  const qrChallenge = await readFile(join(ROOT, 'marketing/assets/qr-challenge.svg'), 'utf8')
  const logo = fileUrl(join(ROOT, 'public/assets/inspired-by-idg.png'))

  const front = (sk) => {
    const dim = dimById.get(sk.dim)
    return `<div class="card front">
      <div class="dimlabel">${esc(dim.name)}</div>
      <div class="art" style="background:${dim.color}">
        <img src="${fileUrl(join(ROOT, 'public/assets/skills/white', `${sk.icon}.png`))}" alt="">
      </div>
      <h2>${esc(sk.name)}</h2>
      <p class="desc">${esc(sk.desc)}</p>
    </div>`
  }

  const back = (sk) => {
    const dim = dimById.get(sk.dim)
    // Weisse Schrift auf reinem Beige liest sich schlecht; dort das abgedunkelte Beige der App.
    const accent = dim.id === 'being' ? '#8a7350' : dim.color
    return `<div class="card back" style="--accent:${accent}">
      <header><span class="dot"></span><span class="name">${esc(sk.name)}</span><span class="dimlabel">${esc(dim.name)}</span></header>
      <section><h3>${esc(ui.forMe)}</h3>${sk.teacher.map((q) => `<p class="strong">${esc(q)}</p>`).join('')}</section>
      <section><h3>${esc(ui.forStudents)}</h3>${sk.students.map((q) => `<p>${esc(q)}</p>`).join('')}</section>
      <section><h3>${esc(ui.ideas)}</h3><ul>${sk.ideas.map((q) => `<li>${esc(q)}</li>`).join('')}</ul></section>
      <div class="exercise">
        <h3>${esc(ui.exercise)}</h3>
        <p><b>${esc(sk.exercise.title)}</b> ${esc(sk.exercise.text)}</p>
      </div>
      <footer><span>${esc(ui.subjects)}: ${sk.subjects.map(esc).join(' · ')}</span></footer>
    </div>`
  }

  const dots = dimensions.map((d) => `<span style="background:${d.color}"></span>`).join('')

  const titleFront = `<div class="card front titlecard">
      <div class="dots">${dots}</div>
      <h1>${esc(EXTRA.title)}</h1>
      <p class="claim">${esc(EXTRA.claim)}</p>
      <p class="sub">${esc(EXTRA.sub)}</p>
      <div class="url">${SITE}</div>
    </div>`
  const titleBack = `<div class="card back plain">
      <h2 class="small">${esc(EXTRA.howTitle)}</h2>
      ${EXTRA.how.map(([h, t]) => `<section><h3>${esc(h)}</h3><p>${esc(t)}</p></section>`).join('')}
      <p class="note">${esc(EXTRA.howNote)}</p>
    </div>`

  const dimsFront = `<div class="card front dimscard">
      <h2 class="small">${esc(EXTRA.dimsTitle)}</h2>
      ${dimensions.map((d) => `<div class="band" style="background:${d.color}"><b>${esc(d.name)}</b><span>${esc(d.subtitle)}</span></div>`).join('')}
    </div>`
  const moreBack = `<div class="card back plain more">
      <h2 class="small">${esc(EXTRA.moreTitle)}</h2>
      <div class="qr"><div class="code">${qrGuide}</div><p><b>${SITE}</b><br>${esc(EXTRA.moreApp)}</p></div>
      <div class="qr"><div class="code">${qrChallenge}</div><p><b>zukunftskompetenzchallenge.ch</b><br>${esc(EXTRA.moreChallenge)}</p></div>
      <div class="attr"><img src="${logo}" alt=""><p>${esc(ui.attribution)}</p></div>
    </div>`

  const ownFront = `<div class="card front owncard">
      <div class="dimlabel">${dots.replace(/<span/g, '<span class="mini"')}</div>
      <div class="art blank"></div>
      <h2>${esc(EXTRA.ownTitle)}</h2>
      <p class="desc">${esc(EXTRA.ownHint)}</p>
    </div>`
  const ownBack = `<div class="card back plain own">
      ${EXTRA.ownFields.map((f) => `<section><h3>${esc(f)}</h3><div class="lines"></div></section>`).join('')}
    </div>`

  const pairs = [
    [titleFront, titleBack],
    ...skills.map((sk) => [front(sk), back(sk)]),
    [dimsFront, moreBack],
    [ownFront, ownBack],
  ]

  const pages = []
  for (let i = 0; i < pairs.length; i += 4) {
    const slot = (j) => pairs[i + j] || ['<div class="card empty"></div>', '<div class="card empty"></div>']
    const f = [0, 1, 2, 3].map((j) => slot(j)[0])
    const b = [0, 1, 2, 3].map((j) => slot(j)[1])
    pages.push(`<div class="sheet fronts">${f.join('')}</div>`)
    // Wenden über die lange Kante: links und rechts tauschen.
    pages.push(`<div class="sheet backs">${[b[1], b[0], b[3], b[2]].join('')}</div>`)
  }

  const html = `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8">
<title>${esc(EXTRA.title)} – Kartenset</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=block">
<style>
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; font-family: Inter, system-ui, sans-serif; color: #000; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.sheet { width: 210mm; height: 297mm; display: grid; grid-template-columns: 105mm 105mm; grid-template-rows: 148.5mm 148.5mm; page-break-after: always; position: relative; overflow: hidden; }
.sheet.fronts::before, .sheet.fronts::after { content: ''; position: absolute; background: none; border-color: #c9c9c9; border-style: dashed; z-index: 2; }
.sheet.fronts::before { left: 105mm; top: 0; bottom: 0; border-width: 0 0 0 .2mm; }
.sheet.fronts::after { top: 148.5mm; left: 0; right: 0; border-width: .2mm 0 0 0; }
.card { width: 105mm; height: 148.5mm; padding: 6mm; overflow: hidden; display: flex; flex-direction: column; position: relative; }

/* Vorderseite */
.front .dimlabel { text-align: right; font-size: 6.5pt; font-weight: 300; letter-spacing: .08em; text-transform: uppercase; height: 4mm; }
.front .art { flex: 1; border-radius: 3mm; margin: 2mm 0 4mm; display: flex; align-items: center; justify-content: center; }
.front .art img { width: 58%; max-height: 80%; object-fit: contain; }
.front h2 { margin: 0 1mm 2mm; font-size: 15pt; line-height: 1.1; font-weight: 700; letter-spacing: -.01em; }
.front .desc { margin: 0 1mm; font-size: 8pt; line-height: 1.4; font-weight: 300; min-height: 3lh; }

/* Rückseite */
.back { gap: 3mm; font-size: 8.2pt; line-height: 1.38; }
.back header { display: flex; align-items: center; gap: 2mm; padding-bottom: 2.2mm; border-bottom: .2mm solid rgba(0,0,0,.14); }
.back header .dot { width: 3mm; height: 3mm; border-radius: 50%; background: var(--accent); flex: none; }
.back header .name { font-weight: 700; font-size: 11.5pt; line-height: 1.15; flex: 1; }
.back header .dimlabel { font-size: 6pt; letter-spacing: .08em; text-transform: uppercase; font-weight: 300; }
.back section { display: flex; flex-direction: column; gap: 1mm; }
.back h3 { margin: 0; font-size: 6.2pt; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; opacity: .62; }
.back p { margin: 0; font-weight: 300; }
.back p.strong { font-weight: 600; }
.back ul { margin: 0; padding-left: 3.2mm; font-weight: 300; }
.back li + li { margin-top: .8mm; }
.back .exercise { margin-top: auto; background: var(--accent); color: #fff; border-radius: 3mm; padding: 2.6mm 3.2mm; display: flex; flex-direction: column; gap: .8mm; }
.back .exercise h3 { opacity: .85; }
.back .exercise b { font-weight: 700; }
.back footer { font-size: 6.4pt; font-weight: 300; opacity: .7; }

/* Zusatzkarten */
.titlecard { justify-content: center; gap: 0; padding: 10mm; }
.titlecard .dots, .dimlabel:has(.mini) { display: flex; gap: 1.6mm; }
.titlecard .dots span { width: 6mm; height: 6mm; border-radius: 50%; }
.titlecard .dots { margin-bottom: 8mm; }
.titlecard h1 { margin: 0 0 4mm; font-size: 20pt; line-height: 1.08; font-weight: 800; letter-spacing: -.02em; }
.titlecard .claim { margin: 0 0 2mm; font-size: 10.5pt; font-weight: 600; }
.titlecard .sub { margin: 0; font-size: 8.5pt; font-weight: 300; }
.titlecard .url { position: absolute; left: 10mm; bottom: 10mm; font-size: 7pt; font-weight: 300; }
.dimlabel:has(.mini) { justify-content: flex-end; }
.mini { width: 2.6mm; height: 2.6mm; border-radius: 50%; display: inline-block; }
.plain { padding: 8mm; gap: 3.2mm; font-size: 8pt; }
h2.small { margin: 0 0 1mm; font-size: 12pt; font-weight: 700; }
.plain .note { margin-top: auto; padding: 2.6mm 3.2mm; background: #FAF7F5; border-radius: 3mm; }
.dimscard { gap: 2mm; padding: 8mm; }
.dimscard .band { flex: 1; border-radius: 3mm; color: #fff; padding: 2.5mm 3.5mm; display: flex; flex-direction: column; justify-content: center; gap: .6mm; }
.dimscard .band b { font-size: 10.5pt; }
.dimscard .band span { font-size: 7pt; font-weight: 300; }
.more .qr { display: flex; gap: 4mm; align-items: center; }
.more .qr .code { width: 22mm; height: 22mm; flex: none; }
.more .qr svg { width: 100%; height: 100%; display: block; }
.more .attr { margin-top: auto; display: flex; gap: 3mm; align-items: center; }
.more .attr img { width: 20mm; }
.more .attr p { font-size: 6.5pt; }
.owncard .art.blank { background: none; border: .3mm dashed #bdbdbd; }
.own section { flex: 1; }
.own .lines { flex: 1; background: repeating-linear-gradient(to bottom, transparent 0 6.3mm, #d6d6d6 6.3mm 6.5mm); }
.empty { background: #fff; }
</style></head>
<body>${pages.join('\n')}
<script>
document.fonts.ready.then(() => {
  const over = [...document.querySelectorAll('.card')].filter((c) => c.scrollHeight > c.clientHeight + 1)
  document.body.dataset.overflow = over.map((c) => (c.querySelector('h2, .name, h3') || {}).textContent).join(' | ')
})
</script></body></html>`

  await mkdir(OUT_DIR, { recursive: true })
  const htmlPath = join(OUT_DIR, `kartenset-${lang}.html`)
  const pdfPath = join(OUT_DIR, `kartenset-${lang}.pdf`)
  await writeFile(htmlPath, html)
  if (!existsSync(CHROME)) throw new Error('Google Chrome nicht gefunden: ' + CHROME)
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files',
    '--virtual-time-budget=15000', `--print-to-pdf=${pdfPath}`, fileUrl(htmlPath),
  ], { stdio: 'ignore' })
  const dom = execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--allow-file-access-from-files',
    '--virtual-time-budget=15000', '--dump-dom', fileUrl(htmlPath)], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  const over = dom.match(/data-overflow="([^"]*)"/)
  if (!over) throw new Error('Überlaufprüfung lief nicht')
  if (over[1]) throw new Error('Zu viel Text auf: ' + over[1])
  console.log(`Kartenset: ${pdfPath} (${pages.length} Seiten)`)
}

main().catch((err) => { console.error(err); process.exit(1) })
