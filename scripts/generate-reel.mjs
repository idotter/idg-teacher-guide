/**
 * Nimmt das Reel marketing/reel/reel.html Bild für Bild auf und schreibt
 * marketing/reel/reel-challenge.mp4 (1080×1920, 30 fps, H.264, ohne Ton)
 * sowie das Vorschaubild cover.jpg.
 *
 * Braucht Google Chrome, ffmpeg und puppeteer-core. puppeteer-core ist keine
 * Projekt-Abhängigkeit; Pfad zum Paket über PUPPETEER_CORE angeben, z. B.
 *   PUPPETEER_CORE=/pfad/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js node scripts/generate-reel.mjs
 */
import { spawn } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIR = join(ROOT, 'marketing/reel')
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const FPS = 30

const { default: puppeteer } = await import(process.env.PUPPETEER_CORE || 'puppeteer-core')

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--allow-file-access-from-files', '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 })
await page.goto(pathToFileURL(join(DIR, 'reel.html')).href, { waitUntil: 'networkidle0' })
await page.evaluate(async () => {
  await document.fonts.ready
  await Promise.all([...document.images].map((img) => img.decode()))
})

const duration = await page.evaluate(() => window.DURATION)
const frames = Math.round(duration * FPS)
const out = join(DIR, 'reel-challenge.mp4')
const ffmpeg = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-profile:v', 'high',
  '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] })
const done = new Promise((res, rej) => ffmpeg.on('close', (code) => (code === 0 ? res() : rej(new Error(`ffmpeg ${code}`)))))

for (let i = 0; i < frames; i++) {
  await page.evaluate((t) => window.render(t), i / FPS)
  const buf = await page.screenshot({ type: 'jpeg', quality: 95 })
  if (!ffmpeg.stdin.write(buf)) await new Promise((r) => ffmpeg.stdin.once('drain', r))
  if (i % 150 === 0) console.log(`Bild ${i}/${frames}`)
}
ffmpeg.stdin.end()
await done

await page.evaluate(() => window.renderCover())
await writeFile(join(DIR, 'cover.jpg'), await page.screenshot({ type: 'jpeg', quality: 92 }))
await browser.close()
console.log(`Reel: ${out} (${frames} Bilder, ${duration} s)`)
