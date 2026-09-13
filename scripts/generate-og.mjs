/**
 * Erzeugt das Open-Graph-Bild (1200×630) für Social Sharing.
 * Ausgabe: public/og-image.png
 */
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'og-image.png')

const W = 1200
const H = 630
const BG = '#FAF7F5'

const dimensions = [
  { color: '#661A30', r: 45 },
  { color: '#FF7E2A', r: 36 },
  { color: '#EF4136', r: 27 },
  { color: '#E585A1', r: 18 },
  { color: '#D4B88C', r: 9 },
]

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const rings = dimensions
  .map(({ color, r }) => `<circle cx="180" cy="315" r="${r}" stroke="${color}" stroke-width="8" fill="none"/>`)
  .join('\n    ')

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <circle cx="980" cy="120" r="180" fill="#E585A1" opacity="0.08"/>
  <circle cx="220" cy="520" r="140" fill="#D4B88C" opacity="0.12"/>
  <g>
    ${rings}
    <circle cx="180" cy="315" r="5" fill="#D4B88C"/>
  </g>
  <text x="320" y="250" font-family="Inter, Helvetica, Arial, sans-serif" font-size="52" font-weight="700" fill="#1a1a1a" letter-spacing="-0.02em">${escapeXml('Inner Development Guide')}</text>
  <text x="320" y="320" font-family="Inter, Helvetica, Arial, sans-serif" font-size="52" font-weight="700" fill="#661A30" letter-spacing="-0.02em">${escapeXml('im Schulalltag')}</text>
  <text x="320" y="390" font-family="Inter, Helvetica, Arial, sans-serif" font-size="28" font-weight="400" fill="#475569">${escapeXml('25 Reflexionskarten für den Unterricht')}</text>
  <text x="320" y="450" font-family="Inter, Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill="#64748B">${escapeXml('Fragen · Ideen · Mini-Übungen · ohne Konto')}</text>
</svg>`

async function main() {
  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  await writeFile(OUT, png)
  console.log(`Generated ${OUT}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
