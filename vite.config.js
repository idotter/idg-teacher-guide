import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { injectSeoPlugin } from './src/seo/vite-plugin-seo.js'

function loadContentInputs(rootDir) {
  try {
    const routes = JSON.parse(
      readFileSync(resolve(rootDir, 'scripts/content-routes.json'), 'utf8'),
    )
    return Object.fromEntries(
      routes.map((route) => [route.inputKey, resolve(rootDir, route.html)]),
    )
  } catch {
    return {}
  }
}

// Einstiegspunkte:
//   /                      Landingpage (Deutsch, handgepflegt)
//   /app/                  die installierbare PWA (start_url im Manifest),
//                          sprachübergreifend eine einzige Route
//   /projekt/              Über das Projekt (Deutsch, handgepflegt)
//   /kontakt/              Kontakt (Deutsch, handgepflegt)
//   /datenschutz/          Datenschutz (Deutsch, handgepflegt)
//   /nutzungsbedingungen/  Nutzungsbedingungen (Deutsch, handgepflegt)
//   /dimensionen/{id}/     Dimensionsseiten, Deutsch (generiert)
//   /kompetenzen/{id}/     Kompetenzseiten, Deutsch (generiert)
//   /{lang}/…              alle Routen der fünf nichtdeutschen Sprachen:
//                          Startseite, Projekt/Kontakt/Datenschutz/AGB,
//                          Dimensionen und Kompetenzen (alle generiert,
//                          siehe scripts/generate-content-pages.mjs und
//                          scripts/content-routes.json)
export default defineConfig({
  plugins: [react(), injectSeoPlugin()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        landing: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app/index.html'),
        projekt: resolve(__dirname, 'projekt/index.html'),
        kontakt: resolve(__dirname, 'kontakt/index.html'),
        datenschutz: resolve(__dirname, 'datenschutz/index.html'),
        nutzungsbedingungen: resolve(__dirname, 'nutzungsbedingungen/index.html'),
        ...loadContentInputs(__dirname),
      },
    },
  },
})
