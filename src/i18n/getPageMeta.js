import { pages } from '../data/siteSeo.js'
import translations from '../locales/translations.json'
import { localePath } from './config.js'

function t(str, dict) {
  if (!dict || !str) return str
  return dict[str] ?? str
}

export function getPageMeta(pageKey, locale = 'en') {
  const page = pages[pageKey]
  if (!page) throw new Error(`Unknown page: ${pageKey}`)
  const dict = locale === 'en' ? null : translations[locale]

  const localizedPath = localePath(locale, page.path)

  return {
    ...page,
    title: t(page.title, dict),
    description: t(page.description, dict),
    path: localizedPath,
    breadcrumbs: page.breadcrumbs?.map((item) => ({
      name: t(item.name, dict),
      path: localePath(locale, item.path),
    })),
  }
}
