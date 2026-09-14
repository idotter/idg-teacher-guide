import { LANGS } from '../content/langs.js'
import { SEGMENTS, UNPREFIXED } from './i18n/segments.js'

export const LANG_IDS = LANGS.map((l) => l.v)
export const DEFAULT_LANG = 'de'

/** '/x' und '/x/' und 'x' → '/x/'; leer → '/' */
function normalize(pathname) {
  const clean = String(pathname || '').replace(/^\/+|\/+$/g, '')
  return clean ? `/${clean}/` : '/'
}

export function langFromPath(pathname) {
  const first = normalize(pathname).split('/')[1]
  return LANG_IDS.includes(first) && first !== DEFAULT_LANG ? first : DEFAULT_LANG
}

export function stripLangPrefix(pathname) {
  const path = normalize(pathname)
  const first = path.split('/')[1]
  return LANG_IDS.includes(first) ? normalize(path.slice(first.length + 1)) : path
}

export function routeKeyFromPath(pathname) {
  const rest = stripLangPrefix(pathname)
  if (rest === '/') return { key: 'home', id: null }

  const [head, id] = rest.replace(/^\/|\/$/g, '').split('/')
  if (head === 'app') return { key: 'app', id: null }

  const table = SEGMENTS[langFromPath(pathname)]
  const key = Object.keys(table).find((k) => table[k] === head)
  if (!key) return { key: 'unknown', id: null }
  // Inhaltsseiten tragen eine ID, Unterseiten nicht.
  if (key === 'dimension' || key === 'skill') {
    return id ? { key, id } : { key: 'unknown', id: null }
  }
  return id ? { key: 'unknown', id: null } : { key, id: null }
}

export function localizedPath(key, lang, id = null) {
  if (key === 'app') return '/app/'
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`
  if (key === 'home') return `${prefix}/`
  const segment = SEGMENTS[lang]?.[key]
  if (!segment) return `${prefix}/`
  return id ? `${prefix}/${segment}/${id}/` : `${prefix}/${segment}/`
}

export function translationsOf(pathname) {
  const { key, id } = routeKeyFromPath(pathname)
  if (key === 'unknown' || UNPREFIXED.has(key)) return []
  return LANG_IDS.map((lang) => ({ lang, path: localizedPath(key, lang, id) }))
}
