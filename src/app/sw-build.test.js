import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { BUILD_PLACEHOLDER, resolveBuildId, stampServiceWorker, swBuildPlugin } from './sw-build.js'

const source = `const CACHE = 'idg-cards-v2'\nconst BUILD = '${BUILD_PLACEHOLDER}'\nself.__idgBuild = BUILD\n`

describe('stampServiceWorker', () => {
  it('ersetzt den Platzhalter und lässt den Cache-Namen', () => {
    const out = stampServiceWorker(source, 'abc123')
    expect(out).toContain("const BUILD = 'abc123'")
    expect(out).toContain('self.__idgBuild = BUILD')
    expect(out).toContain("const CACHE = 'idg-cards-v2'")
    expect(out).not.toContain(BUILD_PLACEHOLDER)
  })
})

describe('resolveBuildId', () => {
  it('nimmt die Commit-ID, sonst einen Zeitstempel', () => {
    expect(resolveBuildId({ VERCEL_GIT_COMMIT_SHA: 'deadbeef' }, new Date('2026-10-23T12:00:00.000Z'))).toBe('deadbeef')
    expect(resolveBuildId({}, new Date('2026-10-23T12:00:00.000Z'))).toBe('2026-10-23T12:00:00.000Z')
  })
})

describe('swBuildPlugin', () => {
  let dir
  afterEach(() => { if (dir) rmSync(dir, { recursive: true, force: true }) })

  it('schreibt die ersetzte Datei', () => {
    dir = mkdtempSync(join(tmpdir(), 'idg-sw-'))
    const file = join(dir, 'sw.js')
    writeFileSync(file, source)
    const plugin = swBuildPlugin()
    plugin.configResolved({ root: dir, build: { outDir: dir } })
    plugin.writeBundle()
    const out = readFileSync(file, 'utf8')
    expect(out).not.toContain(BUILD_PLACEHOLDER)
    expect(out).toContain("const CACHE = 'idg-cards-v2'")
    expect(out).toMatch(/const BUILD = '[^']+'/)
  })
})
