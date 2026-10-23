import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { isAbsolute, resolve } from 'node:path'

export const BUILD_PLACEHOLDER = '__BUILD_ID__'

/** Commit auf Vercel, sonst ein Zeitstempel — beides ändert sw.js pro Deploy. */
export function resolveBuildId(env = process.env, now = new Date()) {
  return env.VERCEL_GIT_COMMIT_SHA || now.toISOString()
}

export function stampServiceWorker(source, id) {
  return source.replaceAll(BUILD_PLACEHOLDER, id)
}

/** Ersetzt den Platzhalter in dist/sw.js, nachdem Vite public/ kopiert hat. */
export function swBuildPlugin() {
  let file
  return {
    name: 'idg-sw-build',
    apply: 'build',
    configResolved(config) {
      const outDir = config.build.outDir
      const dir = isAbsolute(outDir) ? outDir : resolve(config.root, outDir)
      file = resolve(dir, 'sw.js')
    },
    writeBundle() {
      if (!existsSync(file)) {
        this.error('sw.js fehlt im Ausgabeverzeichnis — der Build-Platzhalter wurde nicht ersetzt.')
      }
      const src = readFileSync(file, 'utf8')
      writeFileSync(file, stampServiceWorker(src, resolveBuildId()))
    },
  }
}
