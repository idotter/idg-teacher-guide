/**
 * Erzeugt HTML-Einstiege für Dimensions- und Kompetenzseiten.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildContentPages } from '../src/seo/content-pages.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const HTML = `<!DOCTYPE html>
<html lang="de-CH">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#FAF7F5">
  <link rel="icon" type="image/png" sizes="64x64" href="/assets/icons/favicon-64.png">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/site/page-main.jsx"></script>
</body>
</html>
`

async function main() {
  const routes = []
  for (const page of buildContentPages()) {
    const segments = page.path.replace(/^\/|\/$/g, '').split('/')
    const dir = join(ROOT, ...segments)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), HTML)
    routes.push({
      path: page.path,
      html: join(...segments, 'index.html'),
      inputKey: `${segments[0]}-${segments[1]}`,
    })
  }
  await writeFile(
    join(__dirname, 'content-routes.json'),
    `${JSON.stringify(routes, null, 2)}\n`,
  )
  console.log(`Generated ${routes.length} content page HTML entries`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
