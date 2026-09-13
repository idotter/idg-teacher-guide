import { dimensions, skills } from '../content/de.js'
import { SITE_NAME } from './meta.js'

const dimById = new Map(dimensions.map((d) => [d.id, d]))

export const DIMENSION_PATH_PREFIX = '/dimensionen/'
export const SKILL_PATH_PREFIX = '/kompetenzen/'

export function dimensionPath(id) {
  return `${DIMENSION_PATH_PREFIX}${id}/`
}

export function skillPath(id) {
  return `${SKILL_PATH_PREFIX}${id}/`
}

function pageLabel(name, suffix = SITE_NAME) {
  return `${name} — ${suffix}`
}

export function buildDimensionPages() {
  return dimensions.map((dim) => {
    const dimSkills = skills.filter((s) => s.dim === dim.id)
    const path = dimensionPath(dim.id)
    const title = pageLabel(dim.name)
    const description = `${dim.subtitle}. ${dim.intro.slice(0, 140).trim()}…`
    return {
      path,
      kind: 'dimension',
      id: dim.id,
      title: dim.name,
      documentTitle: title,
      description,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      indexed: true,
      sitemapPriority: 0.7,
      sitemapChangefreq: 'monthly',
      ogType: 'website',
      pageLabel: dim.name,
      dim,
      dimSkills,
    }
  })
}

export function buildSkillPages() {
  return skills.map((skill) => {
    const dim = dimById.get(skill.dim)
    const path = skillPath(skill.id)
    const title = pageLabel(skill.name)
    const description = `${skill.desc} Reflexionskarten-Einstieg für Lehrpersonen im Inner Development Guide 2.0.`
    return {
      path,
      kind: 'skill',
      id: skill.id,
      title: skill.name,
      documentTitle: title,
      description,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      indexed: true,
      sitemapPriority: 0.6,
      sitemapChangefreq: 'monthly',
      ogType: 'article',
      pageLabel: skill.name,
      skill,
      dim,
    }
  })
}

export function buildContentPages() {
  return [...buildDimensionPages(), ...buildSkillPages()]
}

export function contentPageFromPath(pathname) {
  const key = pathname.replace(/\/+$/, '')
  const normalized = key ? `${key}/` : '/'
  return buildContentPages().find((page) => page.path === normalized) || null
}

export function contentPageFromHtmlFilename(filename) {
  const normalized = filename.replace(/\\/g, '/')
  if (!normalized.includes('/dimensionen/') && !normalized.includes('/kompetenzen/')) return null
  const match = normalized.match(/(?:dimensionen|kompetenzen)\/([^/]+)\/index\.html$/)
  if (!match) return null
  const segment = normalized.includes('/dimensionen/') ? 'dimensionen' : 'kompetenzen'
  const path = `/${segment}/${match[1]}/`
  return buildContentPages().find((page) => page.path === path) || null
}
