/**
 * Erzeugt Instagram-Karussells (1080×1350 PNG) aus marketing/instagram/posts.mjs.
 * Ausgabe: marketing/instagram/{post}/{nn}.png
 * Nur einzelne Beiträge: node scripts/generate-instagram.mjs 6 7
 * Braucht Google Chrome (headless) für die Screenshots.
 */
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'marketing/instagram')
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const W = 1080
const H = 1350

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
// **fett** im Fliesstext
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
const fileUrl = (p) => pathToFileURL(p).href

const { default: de } = await import(fileUrl(join(ROOT, 'src/content/de.js')))
const { posts } = await import(fileUrl(join(OUT_DIR, 'posts.mjs')))
const dims = new Map(de.dimensions.map((d) => [d.id, d]))
const skills = new Map(de.skills.map((s) => [s.id, s]))
const CREAM = '#FAF7F5'

const colorOf = (key) => (dims.get(key)?.color) || key || '#000'
// Weisse Schrift auf reinem Beige liest sich schlecht; Flächen mit Text nehmen das abgedunkelte Beige der App.
const surfaceOf = (key) => (key === 'being' ? '#8a7350' : colorOf(key))
const glyph = (id) => fileUrl(join(ROOT, 'public/assets/skills/white', `${skills.get(id).icon}.png`))
const shareCard = (id) => fileUrl(join(ROOT, 'public/assets/share/de', `${id}.png`))

function body(slide) {
  switch (slide.type) {
    case 'cover': return `
      <div class="slide cover" style="background:${surfaceOf(slide.color)}">
        ${slide.glyph ? `<img class="bgglyph" src="${glyph(slide.glyph)}" alt="">` : ''}
        <div class="kicker">${esc(slide.kicker)}</div>
        <h1>${rich(slide.title)}</h1>
        ${slide.sub ? `<p class="sub">${rich(slide.sub)}</p>` : ''}
        <div class="swipe">Wischen <span>→</span></div>
      </div>`
    case 'text': return `
      <div class="slide text" style="--accent:${slide.color === 'being' ? '#8a7350' : colorOf(slide.color)}">
        ${slide.kicker ? `<div class="kicker">${esc(slide.kicker)}</div>` : ''}
        <h2>${rich(slide.title)}</h2>
        ${(slide.body || []).map((p) => `<p>${rich(p)}</p>`).join('')}
      </div>`
    case 'list': return `
      <div class="slide list">
        ${slide.kicker ? `<div class="kicker">${esc(slide.kicker)}</div>` : ''}
        <h2>${rich(slide.title)}</h2>
        <div class="items${slide.items.length >= 5 ? ' dense' : ''}">${slide.items.map((it) => `
          <div class="item"><span class="dot" style="background:${colorOf(it.color)}"></span>
            <div><b>${esc(it.label)}</b>${it.text ? `<span>${rich(it.text)}</span>` : ''}</div></div>`).join('')}
        </div>
      </div>`
    case 'card': return `
      <div class="slide card${skills.get(slide.skill).dim === 'being' ? ' light' : ''}" style="background:${colorOf(skills.get(slide.skill).dim)}">
        <img class="share" src="${shareCard(slide.skill)}" alt="">
        ${slide.caption ? `<p class="caption">${rich(slide.caption)}</p>` : ''}
      </div>`
    case 'questions': {
      const dim = dims.get(skills.get(slide.skill).dim)
      return `
      <div class="slide questions" style="--accent:${dim.id === 'being' ? '#8a7350' : dim.color}">
        <div class="kicker">${esc(slide.kicker)}</div>
        ${slide.questions.map((q) => `<div class="bubble">${rich(q)}</div>`).join('')}
        ${slide.note ? `<p class="note">${rich(slide.note)}</p>` : ''}
      </div>`
    }
    case 'exercise': {
      const sk = skills.get(slide.skill)
      return `
      <div class="slide exercise" style="background:${surfaceOf(sk.dim)}">
        <div class="kicker">Mini-Übung · 5 Minuten</div>
        <h2>${esc(sk.exercise.title)}</h2>
        <p>${esc(sk.exercise.text)}</p>
      </div>`
    }
    case 'dims': return `
      <div class="slide dims">
        <h2>${rich(slide.title)}</h2>
        ${de.dimensions.map((d) => `<div class="band" style="background:${d.color}"><b>${esc(d.name)}</b><span>${esc(d.subtitle)}</span></div>`).join('')}
      </div>`
    case 'cta': return `
      <div class="slide cta">
        <div class="dots">${de.dimensions.map((d) => `<span style="background:${d.color}"></span>`).join('')}</div>
        <h2>${rich(slide.title)}</h2>
        ${(slide.body || []).map((p) => `<p>${rich(p)}</p>`).join('')}
        <div class="links">${slide.links.map((l) => `<div class="pill">${esc(l)}</div>`).join('')}</div>
      </div>`
    default: throw new Error('Unbekannter Folientyp: ' + slide.type)
  }
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=block');
* { box-sizing: border-box; }
html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
.slide { position: relative; width: ${W}px; height: ${H}px; padding: 110px 96px 150px; display: flex; flex-direction: column; background: ${CREAM}; color: #000; overflow: hidden; }
.kicker { font-size: 26px; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; margin-bottom: 36px; color: var(--accent, inherit); }
h1 { font-size: 104px; line-height: 1.02; font-weight: 800; letter-spacing: -.03em; margin: 0; text-wrap: balance; }
h2 { font-size: 68px; line-height: 1.08; font-weight: 700; letter-spacing: -.02em; margin: 0 0 44px; text-wrap: balance; }
p { font-size: 38px; line-height: 1.38; font-weight: 300; margin: 0 0 28px; text-wrap: pretty; }
b { font-weight: 700; }
.foot { position: absolute; left: 96px; right: 96px; bottom: 64px; display: flex; justify-content: space-between; align-items: center; font-size: 24px; font-weight: 400; opacity: .7; }
.foot .mark { display: flex; align-items: center; gap: 14px; }
.foot .mark i { display: inline-flex; gap: 6px; }
.foot .mark i span { width: 14px; height: 14px; border-radius: 50%; display: block; }
.on-color .foot { color: #fff; opacity: .85; }
.on-color .foot .mark i span { box-shadow: 0 0 0 2px #fff; }
.card.light, .card.light ~ .foot { color: #000; }

.cover { color: #fff; justify-content: center; }
.cover .kicker { color: #fff; opacity: .9; }
.cover .sub { font-size: 42px; margin-top: 40px; font-weight: 400; }
.cover .bgglyph { position: absolute; right: -170px; top: -120px; width: 760px; opacity: .22; }
.cover .swipe { position: absolute; right: 96px; bottom: 130px; padding: 18px 34px; border: 2px solid #fff; border-radius: 999px; font-size: 28px; font-weight: 600; }

.text { justify-content: center; }
.text h2 b, .list h2 b { color: var(--accent, inherit); }

.list { justify-content: center; }
.list .items { display: flex; flex-direction: column; gap: 22px; }
.list .item { display: flex; gap: 28px; align-items: flex-start; background: #fff; border-radius: 36px; padding: 30px 36px; }
.list .items.dense { gap: 16px; }
.list .items.dense .item { padding: 24px 34px; }
.list .items.dense .item span { font-size: 28px; }
.list .item .dot { width: 30px; height: 30px; border-radius: 50%; flex: none; margin-top: 8px; }
.list .item b { display: block; font-size: 36px; line-height: 1.2; }
.list .item span { display: block; font-size: 30px; line-height: 1.35; font-weight: 300; margin-top: 6px; }

.card { align-items: center; justify-content: center; color: #fff; }
.card .share { width: 640px; border-radius: 26px; box-shadow: 0 30px 80px rgba(0,0,0,.25); }
.card .caption { margin: 48px 0 0; text-align: center; font-weight: 400; }

.questions { justify-content: center; }
.questions .bubble { background: #fff; border-radius: 48px; padding: 44px 52px; font-size: 46px; line-height: 1.25; font-weight: 700; margin-bottom: 28px; border-left: 16px solid var(--accent); }
.questions .note { margin-top: 20px; font-size: 32px; }

.exercise { color: #fff; justify-content: center; }
.exercise .kicker { color: #fff; opacity: .9; }
.exercise h2 { font-size: 84px; }
.exercise p { font-size: 44px; font-weight: 400; }

.dims { justify-content: center; gap: 20px; }
.dims h2 { margin-bottom: 24px; }
.dims .band { border-radius: 36px; color: #fff; padding: 30px 40px; display: flex; flex-direction: column; gap: 4px; }
.dims .band b { font-size: 44px; }
.dims .band span { font-size: 28px; font-weight: 300; }

.cta { background: #000; color: #fff; justify-content: center; }
.cta .dots { display: flex; gap: 16px; margin-bottom: 56px; }
.cta .dots span { width: 44px; height: 44px; border-radius: 50%; }
.cta .links { display: flex; flex-direction: column; gap: 22px; align-items: flex-start; margin-top: 24px; }
.cta .pill { background: #fff; color: #000; border-radius: 999px; padding: 24px 40px; font-size: 34px; font-weight: 700; }
`

const onColor = new Set(['cover', 'card', 'exercise', 'cta'])
const dotsHtml = de.dimensions.map((d) => `<span style="background:${d.color}"></span>`).join('')

await mkdir(OUT_DIR, { recursive: true })
let total = 0
// Optional nur einzelne Beiträge: node scripts/generate-instagram.mjs 6 7  (Präfix der ID)
const only = process.argv.slice(2)
const selected = only.length ? posts.filter((p) => only.some((o) => p.id.startsWith(`${o}-`))) : posts
for (const post of selected) {
  const dir = join(OUT_DIR, post.id)
  await mkdir(dir, { recursive: true })
  for (const f of await readdir(dir)) if (f.endsWith('.png') || f.endsWith('.html')) await rm(join(dir, f))
  for (const [i, slide] of post.slides.entries()) {
    const n = String(i + 1).padStart(2, '0')
    const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${css}</style></head>
<body class="${onColor.has(slide.type) ? 'on-color' : ''}">${body(slide)}
<div class="foot"><span class="mark"><i>${dotsHtml}</i>Inner Development Guide im Schulalltag</span><span>${i + 1}/${post.slides.length}</span></div>
</body></html>`
    const htmlPath = join(dir, `${n}.html`)
    await writeFile(htmlPath, html)
    const args = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
      `--window-size=${W},${H}`, '--virtual-time-budget=10000', `--screenshot=${join(dir, `${n}.png`)}`, fileUrl(htmlPath)]
    // Headless-Chrome bricht vereinzelt ohne Grund ab; ein zweiter Versuch reicht dann.
    for (let attempt = 1; ; attempt++) {
      try { execFileSync(CHROME, args, { stdio: 'ignore' }); break } catch (err) { if (attempt >= 3) throw err }
    }
    await rm(htmlPath)
    total++
  }
}
console.log(`Instagram: ${selected.length} Beiträge, ${total} Folien in ${OUT_DIR}`)
