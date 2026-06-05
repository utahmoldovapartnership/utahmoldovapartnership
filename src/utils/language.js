export const LANG_STORAGE_KEY = 'umbp.lang'
export const LANG_EVENT = 'umbp:langchange'

export function getLang() {
  if (typeof window === 'undefined') return 'EN'
  return window.localStorage.getItem(LANG_STORAGE_KEY) || 'EN'
}

export function setLang(lang) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LANG_STORAGE_KEY, lang)
  document.documentElement.lang = lang.toLowerCase()
  window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: lang }))
}
