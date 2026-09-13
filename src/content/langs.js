export const LANGS = [
  { v: 'de', label: 'Deutsch' },
  { v: 'en', label: 'English' },
  { v: 'fr', label: 'Français' },
  { v: 'es', label: 'Español' },
  { v: 'it', label: 'Italiano' },
  { v: 'sv', label: 'Svenska' },
]

const LANG_IDS = new Set(LANGS.map((l) => l.v))
const PREFS_KEY = 'idg-cards-prefs'

function readPrefs() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(PREFS_KEY)
    const prefs = raw == null ? {} : JSON.parse(raw)
    return prefs && typeof prefs === 'object' ? prefs : {}
  } catch {
    return {}
  }
}

export function readStoredLang() {
  const lang = readPrefs().lang
  return LANG_IDS.has(lang) ? lang : 'de'
}

export function writeStoredLang(lang) {
  if (typeof window === 'undefined' || !LANG_IDS.has(lang)) return
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify({ ...readPrefs(), lang }))
  } catch { /* Privatmodus o. Ä. */ }
}
