/**
 * Holt die 25 Kompetenz-Glyphen als Vektor aus der Brand-API des Inner
 * Development Guide und legt sie als weisse Masken (public/assets/skills/white/)
 * plus eingefärbte Varianten (public/assets/skills/) ab.
 *
 *   node scripts/fetch-skill-glyphs.mjs
 *
 * Jedes SVG zeigt die weisse Glyphe auf der farbigen Dimensionsform. Die Form
 * wird ausgeblendet, die Glyphe allein gerendert. Die Lizenz verlangt, Zeichen
 * und Farben unverändert zu verwenden — daher keine eigene Nachbearbeitung.
 *
 * SCALE hält die Glyphen auf derselben Grösse wie der bisherige Satz — sonst
 * würden die Karten beim Update leicht springen.
 */
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const WHITE_DIR = join(ROOT, 'public/assets/skills/white')
const COLOR_DIR = join(ROOT, 'public/assets/skills')
const API = 'https://idg.guide/api/v1/brand'

const CANVAS = { width: 1080, height: 1081 }
// Strichgrafik auf Transparenz: eine Palette reicht. Spart rund zwei Drittel
// gegenüber RGBA, die Alphakante weicht im Mittel um 0,4 von 255 Stufen ab.
const PNG = { palette: true, colours: 128, dither: 0, compressionLevel: 9, effort: 10 }

// Reihenfolge der Kompetenzen = Codes B1…B5 usw. der Brand-API.
const DIMS = [
  { code: 'b', dim: 'being', color: '#D4B88C', scale: 0.894, skills: [
    'innerer-kompass', 'integritaet-und-authentizitaet', 'offenheit-und-lernbereitschaft',
    'selbsterkenntnis', 'praesenz'] },
  { code: 't', dim: 'thinking', color: '#E585A1', scale: 0.874, skills: [
    'kritisches-denken', 'perspektivische-faehigkeiten', 'systemisches-denken',
    'langfristige-orientierung', 'kreativitaet'] },
  { code: 'r', dim: 'relating', color: '#EF4136', scale: 0.86, skills: [
    'wertschaetzung', 'verbundenheit', 'demut-und-bescheidenheit',
    'empathie-und-mitgefuehl', 'vergebung'] },
  { code: 'c', dim: 'collaborating', color: '#FF7E2A', scale: 0.875, skills: [
    'beziehungen-aufbauen', 'inklusive-denkweise', 'gemeinsam-gestalten',
    'kommunizieren', 'mobilisieren'] },
  { code: 'a', dim: 'acting', color: '#661A30', scale: 0.838, skills: [
    'mut', 'hoffnung-und-optimismus', 'bewusster-umgang-mit-ressourcen',
    'proaktiv-handeln', 'resilienz'] },
]

async function fetchSvg(code) {
  const res = await fetch(`${API}/icons/${code}.svg`)
  if (!res.ok) throw new Error(`${code}.svg: HTTP ${res.status}`)
  return res.text()
}

/** SVG → weisse Maske auf CANVAS: jede nicht-weisse Füllung (die Dimensionsform) fällt weg. */
async function svgToMask(svg, scale) {
  const glyphOnly = svg.replace(/fill:\s*#(?!fff\b)[0-9a-f]{6}/gi, 'fill: none')
  const size = Math.round(CANVAS.width * scale)
  const viewBox = Number(svg.match(/viewBox="0 0 ([\d.]+)/)[1])
  const glyph = await sharp(Buffer.from(glyphOnly), { density: (72 * size) / viewBox })
    .resize(size, size).png().toBuffer()
  return sharp({ create: { ...CANVAS, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: glyph, gravity: 'centre' }])
    .png().toBuffer()
}

async function main() {
  await mkdir(WHITE_DIR, { recursive: true })
  let n = 0
  for (const { code, dim, color, scale, skills } of DIMS) {
    for (let i = 0; i < skills.length; i++) {
      const mask = await svgToMask(await fetchSvg(`${code}${i + 1}`), scale)
      // Erst quantisieren, dann einfärben: sonst quantisiert die farbige Variante
      // ein zweites Mal unabhängig und die beiden Alphakanäle laufen auseinander.
      const white = await sharp(mask).png(PNG).toBuffer()
      await writeFile(join(WHITE_DIR, `${skills[i]}.png`), white)
      await sharp({ create: { ...CANVAS, channels: 4, background: color } })
        .composite([{ input: white, blend: 'dest-in' }])
        .png(PNG).toFile(join(COLOR_DIR, `${skills[i]}.png`))
      n++
    }
    console.log(`${dim}: ${skills.join(', ')}`)
  }
  console.log(`\n${n} Glyphen geschrieben.`)
}

main()
