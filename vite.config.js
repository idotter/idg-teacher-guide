import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { injectSeoPlugin } from './src/seo/vite-plugin-seo.js'

// Einstiegspunkte:
//   /                      Landingpage
//   /app/                  die installierbare PWA (start_url im Manifest)
//   /projekt/              Über das Projekt
//   /kontakt/              Kontakt
//   /datenschutz/          Datenschutz
//   /nutzungsbedingungen/  Nutzungsbedingungen
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
      },
    },
  },
})
