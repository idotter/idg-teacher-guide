/**
 * Erzeugt Share-PNGs der Kartenfront (Farbkarte, 500×700) pro Sprache und Skill.
 * Ausgabe: public/assets/share/{lang}/{id}.png
 */
import sharp from 'sharp'
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'public/assets/share')
const GLYPH_DIR = join(ROOT, 'public/assets/skills/white')
const LANGS = ['de', 'en', 'fr', 'es', 'sv']

const W = 500
const H = 700
const PAD = 12
const GAP = 12
const RAD = 12
const RAD_IN = 6
const INNER_W = W - PAD * 2

const INTER_WOFF2 = 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKDUQmIw.woff2'

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function wrapText(text, maxLen) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxLen && line) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines.length ? lines : ['']
}

async function makeWhiteGlyph(glyphPath, maxW, maxH) {
  const resized = await sharp(glyphPath)
    .resize(maxW, maxH, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { data, info } = resized
  const out = Buffer.alloc(info.width * info.height * 4)
  for (let i = 0; i < info.width * info.height; i++) {
    const a = data[i * 4 + 3]
    out[i * 4] = 255
    out[i * 4 + 1] = 255
    out[i * 4 + 2] = 255
    out[i * 4 + 3] = a
  }

  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer()
}

async function renderCard(skill, dim, glyphPath) {
  const titleLines = wrapText(skill.name, 28)
  const descLines = wrapText(skill.desc, 52)

  const titleLineH = 22 * 1.12
  const descLineH = 13.5 * 1.4
  const footerH = titleLines.length * titleLineH + 8 + descLines.length * descLineH + 4
  const headerH = 20
  const glyphH = H - PAD * 2 - headerH - GAP - footerH - GAP
  const glyphY = PAD + headerH + GAP
  const footerY = glyphY + glyphH + GAP

  const gW = Math.round(INNER_W * 0.6)
  const gH = Math.round(glyphH * 0.8)
  const whiteGlyph = await makeWhiteGlyph(glyphPath, gW, gH)
  const gMeta = await sharp(whiteGlyph).metadata()
  const gx = PAD + Math.round((INNER_W - gMeta.width) / 2)
  const gy = glyphY + Math.round((glyphH - gMeta.height) / 2)
  const glyphB64 = whiteGlyph.toString('base64')

  const titleSvg = titleLines.map((line, i) => {
    const y = footerY + 22 + i * titleLineH
    return `<tspan x="${PAD + 4}" y="${y}">${escapeXml(line)}</tspan>`
  }).join('')

  const descStartY = footerY + titleLines.length * titleLineH + 8 + 13.5
  const descSvg = descLines.map((line, i) => {
    const y = descStartY + i * descLineH
    return `<tspan x="${PAD + 4}" y="${y}">${escapeXml(line)}</tspan>`
  }).join('')

  const dimLabel = escapeXml(dim.name.toUpperCase())

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'Inter';
        src: url('${INTER_WOFF2}') format('woff2');
        font-weight: 300 700;
        font-style: normal;
      }
    </style>
    <clipPath id="cardClip">
      <rect width="${W}" height="${H}" rx="${RAD}" ry="${RAD}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#cardClip)">
    <rect width="${W}" height="${H}" fill="#ffffff"/>
    <text x="${W - PAD - 4}" y="${PAD + 14}" text-anchor="end"
      font-family="Inter, sans-serif" font-size="11" font-weight="300"
      letter-spacing="0.88" fill="#000000">${dimLabel}</text>
    <rect x="${PAD}" y="${glyphY}" width="${INNER_W}" height="${glyphH}" rx="${RAD_IN}" ry="${RAD_IN}" fill="${dim.color}"/>
    <image href="data:image/png;base64,${glyphB64}" x="${gx}" y="${gy}" width="${gMeta.width}" height="${gMeta.height}"/>
    <text font-family="Inter, sans-serif" font-size="22" font-weight="700" fill="#000000" letter-spacing="-0.22">${titleSvg}</text>
    <text font-family="Inter, sans-serif" font-size="13.5" font-weight="300" fill="#000000">${descSvg}</text>
  </g>
</svg>`

  return sharp(Buffer.from(svg)).png().toBuffer()
}

async function main() {
  let count = 0
  for (const lang of LANGS) {
    const mod = await import(pathToFileURL(join(ROOT, 'src/content', `${lang}.js`)).href)
    const data = mod.default || mod
    const dimById = new Map(data.dimensions.map((d) => [d.id, d]))
    const outLang = join(OUT_DIR, lang)
    await mkdir(outLang, { recursive: true })
    // Aufräumen, sonst bleiben Karten liegen, deren Kompetenz es nicht mehr gibt.
    for (const f of await readdir(outLang)) if (f.endsWith('.png')) await rm(join(outLang, f))

    for (const skill of data.skills) {
      const dim = dimById.get(skill.dim)
      if (!dim) throw new Error(`${lang}/${skill.id}: dimension ${skill.dim} missing`)
      const glyphPath = join(GLYPH_DIR, `${skill.icon}.png`)
      const png = await renderCard(skill, dim, glyphPath)
      await writeFile(join(outLang, `${skill.id}.png`), png)
      count += 1
    }
  }
  console.log(`Generated ${count} share card PNGs in public/assets/share/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
