export const DEFAULT_LOCALE = 'en'

export const LOCALE_META = {
  en: { code: 'en', prefix: '', label: 'English', switchCode: 'EN', htmlLang: 'en' },
  ro: { code: 'ro', prefix: '/ro', label: 'Română', switchCode: 'RO', htmlLang: 'ro' },
  ru: { code: 'ru', prefix: '/ru', label: 'Русский', switchCode: 'RU', htmlLang: 'ru' },
}

export const LOCALE_CODES = Object.keys(LOCALE_META)

const PREFIXED = LOCALE_CODES.filter((code) => code !== DEFAULT_LOCALE)

/** Strip /ro or /ru from a pathname. */
export function stripLocalePrefix(pathname = '/') {
  for (const code of PREFIXED) {
    const prefix = LOCALE_META[code].prefix
    if (pathname === prefix) return '/'
    if (pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length) || '/'
    }
  }
  return pathname
}

/** Resolve locale code from a pathname. */
export function localeFromPath(pathname = '/') {
  for (const code of PREFIXED) {
    const prefix = LOCALE_META[code].prefix
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return code
  }
  return DEFAULT_LOCALE
}

/** Build a localized path, e.g. localePath('ro', '/contact') → /ro/contact */
export function localePath(locale, path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return normalized
  const prefix = LOCALE_META[locale]?.prefix ?? ''
  if (normalized === '/') return prefix || '/'
  return `${prefix}${normalized}`
}

/** Switch the current page to another locale while keeping the same route. */
export function switchLocalePath(currentPath, targetLocale) {
  return localePath(targetLocale, stripLocalePrefix(currentPath))
}
