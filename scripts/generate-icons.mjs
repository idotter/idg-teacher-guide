/**
 * Erzeugt alle App-Icons: fünf aufgefächerte Karten in den Dimensionsfarben,
 * vorne die Handeln-Karte mit dem Symbol für Mut.
 * Ausgabe: public/assets/icons/*, public/favicon.ico
 *
 * Varianten:
 * - any        Creme-Fläche, Karten mit weissem Rand wie die gedruckten Karten (Manifest, Desktop, Windows)
 * - maskable   Stapel innerhalb der 80-%-Sicherheitszone (Android-Adaptive-Icons)
 * - monochrome weisse Karten mit schmalen Fugen auf transparent (Android-Themed-Icons)
 * - apple      180 px, deckend ohne Transparenz (iOS rundet selbst)
 * - favicon    Stapel randnah und ohne weissen Rand, damit er bei 16–32 px lesbar bleibt
 */
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')
const OUT = join(PUBLIC, 'assets', 'icons')
const GLYPH = join(PUBLIC, 'assets', 'skills', 'white', 'mut.png')

const BG = '#FAF7F5'

// Von hinten nach vorne: Sein, Denken, Beziehungen, Zusammenarbeit, Handeln.
const COLORS = ['#D4B88C', '#E585A1', '#EF4136', '#FF7E2A', '#661A30']

// Kartengeometrie in Einheiten, gefächert um einen gemeinsamen Drehpunkt unterhalb der Karten.
const CARD = { w: 40, h: 58, r: 5 }
const PIVOT = { x: 20, y: 72 }
const STEP = 9
// Weisser Kartenrand, wie bei den Karten in der App.
const BORDER = 1.8
const GLYPH_SIZE = 28
// Die feine Umrandung des Mut-Symbols leicht verstärken, damit sie auch klein sichtbar bleibt.
const GLYPH_BOLD = 0.35

const angles = COLORS.map((_, i) => (i - (COLORS.length - 1) / 2) * STEP)

function rotate([x, y], deg) {
  const a = (deg * Math.PI) / 180
  const dx = x - PIVOT.x
  const dy = y - PIVOT.y
  return [PIVOT.x + dx * Math.cos(a) - dy * Math.sin(a), PIVOT.y + dx * Math.sin(a) + dy * Math.cos(a)]
}

// Umrandung aller gedrehten Karten, damit der Stapel unabhängig vom Fächerwinkel mittig sitzt.
const corners = angles.flatMap((deg) =>
  [[0, 0], [CARD.w, 0], [0, CARD.h], [CARD.w, CARD.h]].map((p) => rotate(p, deg)),
)
const xs = corners.map(([x]) => x)
const ys = corners.map(([, y]) => y)
const BOX = { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) }
const CENTER = { x: BOX.x + BOX.w / 2, y: BOX.y + BOX.h / 2 }
const RADIUS = Math.max(...corners.map(([x, y]) => Math.hypot(x - CENTER.x, y - CENTER.y)))

// Wie viel des Bildes der Stapel einnimmt: `box` = längste Seite, `circle` = Durchmesser des umschliessenden Kreises.
const LAYOUTS = {
  any: { box: 0.8 },
  maskable: { circle: 0.78 },
  compact: { box: 0.98 },
}

function scaleFor(layout) {
  const { box, circle } = LAYOUTS[layout]
  return box ? box / Math.max(BOX.w, BOX.h) : circle / (2 * RADIUS)
}

function cardSvg(px, layout, i, { fill, grow = 0, glyph }) {
  const s = (scaleFor(layout) * px)
  const tx = px / 2 - CENTER.x * s
  const ty = px / 2 - CENTER.y * s
  const image = glyph
    ? `<filter id="bold"><feMorphology operator="dilate" radius="${GLYPH_BOLD}"/></filter><image filter="url(#bold)" href="${glyph}" x="${(CARD.w - GLYPH_SIZE) / 2}" y="${(CARD.h - GLYPH_SIZE) / 2}" width="${GLYPH_SIZE}" height="${GLYPH_SIZE}"/>`
    : `<rect x="${-grow}" y="${-grow}" width="${CARD.w + 2 * grow}" height="${CARD.h + 2 * grow}" rx="${CARD.r + grow}" fill="${fill}"/>`
  return Buffer.from(`<svg width="${px}" height="${px}" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(${tx} ${ty}) scale(${s}) rotate(${angles[i]} ${PIVOT.x} ${PIVOT.y})">${image}</g>
</svg>`)
}

async function compose(px, { layout, background = BG, mono = false, border = !mono }) {
  const glyph = `data:image/png;base64,${(await readFile(GLYPH)).toString('base64')}`
  const front = COLORS.length - 1
  const layers = COLORS.flatMap((color, i) =>
    mono
      ? [
          // Fuge zur darunterliegenden Karte, sonst verschmilzt der Stapel zu einer Fläche.
          { input: cardSvg(px, layout, i, { fill: '#fff', grow: 1.6 }), blend: 'dest-out' },
          { input: cardSvg(px, layout, i, { fill: '#fff' }) },
        ]
      : [
          ...(border ? [{ input: cardSvg(px, layout, i, { fill: '#fff', grow: BORDER }) }] : []),
          { input: cardSvg(px, layout, i, { fill: color }) },
        ],
  )
  layers.push({ input: cardSvg(px, layout, front, { glyph }), blend: mono ? 'dest-out' : 'over' })
  return sharp({ create: { width: px, height: px, channels: 4, background } })
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toBuffer()
}

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }

const icons = [
  ...[48, 72, 96, 144, 192, 256, 384, 512].map((px) => ({ file: `icon-${px}.png`, px, layout: 'any' })),
  { file: 'icon-maskable-192.png', px: 192, layout: 'maskable' },
  { file: 'icon-maskable-512.png', px: 512, layout: 'maskable' },
  { file: 'icon-monochrome-512.png', px: 512, layout: 'maskable', background: TRANSPARENT, mono: true },
  { file: 'apple-touch-icon.png', px: 180, layout: 'any' },
  { file: 'favicon-16.png', px: 16, layout: 'compact', background: TRANSPARENT, border: false },
  { file: 'favicon-32.png', px: 32, layout: 'compact', background: TRANSPARENT, border: false },
  { file: 'favicon-64.png', px: 64, layout: 'compact', background: TRANSPARENT, border: false },
]

// ICO mit eingebetteten PNG-Einträgen (von allen aktuellen Browsern und Windows unterstützt).
function ico(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  let offset = 6 + pngs.length * 16
  const entries = pngs.map(({ px, data }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(px >= 256 ? 0 : px, 0)
    entry.writeUInt8(px >= 256 ? 0 : px, 1)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

async function main() {
  for (const { file, px, ...opts } of icons) {
    await writeFile(join(OUT, file), await compose(px, opts))
  }
  const icoSizes = await Promise.all(
    [16, 32, 48].map(async (px) => ({ px, data: await compose(px, { layout: 'compact', background: TRANSPARENT, border: false }) })),
  )
  await writeFile(join(PUBLIC, 'favicon.ico'), ico(icoSizes))
  console.log(`Generated ${icons.length} icons in ${OUT} and favicon.ico`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
