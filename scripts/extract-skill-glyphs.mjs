/**
 * Schneidet die 25 Kompetenz-Glyphen aus dem Inner Development Guide 2.0 und legt
 * sie als weisse Masken (public/assets/skills/white/) plus eingefärbte Varianten
 * (public/assets/skills/) ab.
 *
 *   node scripts/extract-skill-glyphs.mjs "~/Downloads/Inner Development Guide (German).pdf"
 *
 * Der Guide zeigt pro Dimension eine Seite mit fünf quadratischen Kacheln: weisse
 * Strichgrafik auf der Dimensionsfarbe. Das Skript rendert die Kachelspalte mit
 * pdftoppm (poppler) in 600 dpi, findet die fünf Kacheln über den Kontrast zum
 * Seitenhintergrund und rechnet jede Kachel in eine Alpha-Maske um: Alpha ist die
 * Projektion des Pixels auf die Strecke von der Dimensionsfarbe nach Weiss.
 *
 * SCALE hält die Glyphen auf derselben Grösse wie der bisherige Satz aus dem
 * Design-Projekt — sonst würden die Karten beim Update leicht springen.
 */
import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { mkdir, rm, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const WHITE_DIR = join(ROOT, 'public/assets/skills/white')
const COLOR_DIR = join(ROOT, 'public/assets/skills')

// Kachelspalte im Seitenlayout (600 dpi, Seite ist 1920×1080 pt).
const CROP = { x: 7380, y: 660, w: 1360, h: 7720 }
// Rand wegschneiden: die Kachelkante ist antialiased und würde als Rahmen auftauchen.
const INSET = 16
const CANVAS = { width: 1080, height: 1081 }
// Strichgrafik auf Transparenz: eine Palette reicht. Spart rund zwei Drittel
// gegenüber RGBA, die Alphakante weicht im Mittel um 0,4 von 255 Stufen ab.
const PNG = { palette: true, colours: 128, dither: 0, compressionLevel: 9, effort: 10 }

const PAGES = [
  { page: 2, dim: 'being', color: '#D4B88C', scale: 0.7754, skills: [
    'innerer-kompass', 'integritaet-und-authentizitaet', 'offenheit-und-lernbereitschaft',
    'selbsterkenntnis', 'praesenz'] },
  { page: 3, dim: 'thinking', color: '#E585A1', scale: 0.7634, skills: [
    'kritisches-denken', 'perspektivische-faehigkeiten', 'systemisches-denken',
    'langfristige-orientierung', 'kreativitaet'] },
  { page: 4, dim: 'relating', color: '#EF4136', scale: 0.7476, skills: [
    'wertschaetzung', 'verbundenheit', 'demut-und-bescheidenheit',
    'empathie-und-mitgefuehl', 'vergebung'] },
  { page: 5, dim: 'collaborating', color: '#FF7E2A', scale: 0.7642, skills: [
    'beziehungen-aufbauen', 'inklusive-denkweise', 'gemeinsam-gestalten',
    'kommunizieren', 'mobilisieren'] },
  { page: 6, dim: 'acting', color: '#661A30', scale: 0.7326, skills: [
    'mut', 'hoffnung-und-optimismus', 'bewusster-umgang-mit-ressourcen',
    'proaktiv-handeln', 'resilienz'] },
]

function renderColumn(pdf, page, out) {
  execFileSync('pdftoppm', [
    '-r', '600', '-x', String(CROP.x), '-y', String(CROP.y),
    '-W', String(CROP.w), '-H', String(CROP.h),
    '-png', '-f', String(page), '-l', String(page), '-singlefile', pdf, out,
  ])
  return `${out}.png`
}

/** Die fünf Kacheln über den Kontrast zum Seitenhintergrund finden. */
async function findTiles(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H, channels: CH } = info
  const at = (x, y) => { const i = (y * W + x) * CH; return [data[i], data[i + 1], data[i + 2]] }
  const bg = at(4, Math.floor(H / 2))
  const off = (p) => Math.abs(p[0] - bg[0]) + Math.abs(p[1] - bg[1]) + Math.abs(p[2] - bg[2]) > 40

  const bands = []
  let start = -1
  for (let y = 0; y < H; y++) {
    let n = 0
    for (let x = 0; x < W; x++) if (off(at(x, y))) n++
    const on = n > W * 0.2
    if (on && start < 0) start = y
    if (!on && start >= 0) { if (y - start > 100) bands.push([start, y - 1]); start = -1 }
  }
  if (start >= 0 && H - start > 100) bands.push([start, H - 1])

  return bands.map(([ya, yb]) => {
    let x0 = W, x1 = -1
    for (let y = ya; y <= yb; y++) for (let x = 0; x < W; x++) {
      if (off(at(x, y))) { if (x < x0) x0 = x; if (x > x1) x1 = x }
    }
    return { left: x0 + INSET, top: ya + INSET, width: x1 - x0 + 1 - 2 * INSET, height: yb - ya + 1 - 2 * INSET }
  })
}

/** Kachel → weisse Maske: Alpha = Weissanteil gegenüber der Kachelfarbe. */
async function tileToMask(file, rect) {
  const { data, info } = await sharp(file).extract(rect).raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H, channels: CH } = info
  const C = [data[0], data[1], data[2]] // linke obere Ecke ist immer Vollfläche
  const v = [255 - C[0], 255 - C[1], 255 - C[2]]
  const len2 = v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
  const out = Buffer.alloc(W * H * 4)
  for (let i = 0, o = 0; o < out.length; i += CH, o += 4) {
    const t = ((data[i] - C[0]) * v[0] + (data[i + 1] - C[1]) * v[1] + (data[i + 2] - C[2]) * v[2]) / len2
    out[o] = 255; out[o + 1] = 255; out[o + 2] = 255
    out[o + 3] = Math.round(Math.max(0, Math.min(1, t)) * 255)
  }
  return { buf: out, W, H }
}

async function main() {
  const pdf = process.argv[2]
  if (!pdf) { console.error('Pfad zum Guide-PDF angeben.'); process.exit(1) }

  const tmp = join(tmpdir(), `idg-glyphs-${process.pid}`)
  await mkdir(tmp, { recursive: true })
  await mkdir(WHITE_DIR, { recursive: true })

  // Alter Satz weg, sonst bleiben die 1.0-Dateien als Leichen liegen.
  for (const dir of [WHITE_DIR, COLOR_DIR]) {
    for (const f of await readdir(dir)) if (f.endsWith('.png')) await rm(join(dir, f))
  }

  let n = 0
  for (const { page, dim, color, scale, skills } of PAGES) {
    const file = renderColumn(pdf, page, join(tmp, `col-${page}`))
    const tiles = await findTiles(file)
    if (tiles.length !== 5) throw new Error(`Seite ${page}: ${tiles.length} Kacheln gefunden, 5 erwartet.`)

    for (let i = 0; i < 5; i++) {
      const { buf, W, H } = await tileToMask(file, tiles[i])
      const mask = await sharp(buf, { raw: { width: W, height: H, channels: 4 } })
        .resize(Math.round(W * scale), Math.round(H * scale))
        .png().toBuffer()
      const centred = sharp({ create: { ...CANVAS, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
        .composite([{ input: mask, gravity: 'centre' }])

      // Erst quantisieren, dann einfärben: sonst quantisiert die farbige Variante
      // ein zweites Mal unabhängig und die beiden Alphakanäle laufen auseinander.
      const white = await centred.png(PNG).toBuffer()
      await writeFile(join(WHITE_DIR, `${skills[i]}.png`), white)
      // Eingefärbt: dieselbe Maske, Fläche in Dimensionsfarbe.
      await sharp({ create: { ...CANVAS, channels: 4, background: color } })
        .composite([{ input: white, blend: 'dest-in' }])
        .png(PNG).toFile(join(COLOR_DIR, `${skills[i]}.png`))
      n++
    }
    console.log(`${dim}: ${skills.join(', ')}`)
  }

  await rm(tmp, { recursive: true, force: true })
  console.log(`\n${n} Glyphen geschrieben.`)
}

main()
