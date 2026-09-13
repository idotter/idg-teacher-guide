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
//   /                      Landingpage
//   /app/                  die installierbare PWA (start_url im Manifest)
//   /projekt/              Über das Projekt
//   /kontakt/              Kontakt
//   /datenschutz/          Datenschutz
//   /nutzungsbedingungen/  Nutzungsbedingungen
//   /dimensionen/{id}/     Dimensionsseiten (generiert)
//   /kompetenzen/{id}/     Kompetenzseiten (generiert)
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
