import { pathToFileURL } from 'node:url'
import path from 'node:path'

export const KEEP_AS_IS = new Set([
  'UMBP',
  'Facebook',
  'Instagram',
  'Twitter',
  'LinkedIn',
  'WhatsApp',
  'Chișinău',
  'Moldova',
  'Bottega',
  'Tucano',
  'Tekwill',
  'AmCham',
  'Le Parole',
  'Covali',
  'UNDP',
  'Hinckley Institute',
  'Code to Success',
  'David Eccles School of Business',
  'Startup Moldova',
  'Ivory Center',
  'University of Utah',
  'Clark & Christine Ivory Foundation',
  'Clark Ivory',
  'Walter Plumb III',
  'Est.',
  '©',
  'Jackson',
  'Krista',
  'Salt Lake City, Utah',
  'Chișinău, Moldova',
  'utahmoldovapartnership@gmail.com',
  '+1 (801) 687-6222',
  'utahmoldovabusiness.com',
  'ivorycenter.md',
])

const SKIP_LITERALS = new Set([
  'jackson',
  'krista',
  'red',
  'blue',
  'ink',
  'yellow',
  'white',
])

const SKIP_KEYS = new Set([
  'id',
  'src',
  'srcSet',
  'href',
  'image',
  'ogImage',
  'preconnect',
  'whatsappUrl',
  'website',
  'partnerSite',
  'email',
  'whatsapp',
  'num',
  'number',
  'tagColor',
  'theme',
  'width',
  'height',
  'sizes',
  'modalSizes',
  'file',
  'founded',
  'switchCode',
  'code',
  'path',
])

export function isTranslatable(value, key = '') {
  if (typeof value !== 'string') return false
  if (SKIP_KEYS.has(key)) return false
  const trimmed = value.trim()
  if (trimmed.length < 2) return false
  if (!/[A-Za-zÀ-ÿ]/.test(trimmed)) return false
  if (KEEP_AS_IS.has(trimmed)) return false
  if (SKIP_LITERALS.has(trimmed.toLowerCase())) return false
  if (/^\/[\w/.%-]+/.test(trimmed)) return false
  if (/\.webp(\s|$)/i.test(trimmed)) return false
  if (/^\(max-width:/i.test(trimmed)) return false
  if (/^https?:\/\//i.test(trimmed)) return false
  if (/^[\d+]+$/.test(trimmed.replace(/\s/g, ''))) return false
  return true
}

export function collectStrings(value, out = new Set(), key = '') {
  if (value == null) return out
  if (typeof value === 'string') {
    if (isTranslatable(value, key)) out.add(value)
    return out
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out, key)
    return out
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collectStrings(v, out, k)
  }
  return out
}

export async function collectAllSiteStrings(root) {
  const strings = new Set()

  const siteContentPath = path.join(root, 'src/data/siteContent.js')
  const uiCopyPath = path.join(root, 'src/i18n/uiCopy.js')
  const siteSeoPath = path.join(root, 'src/data/siteSeo.js')

  const siteContent = await import(pathToFileURL(siteContentPath).href)
  for (const v of Object.values(siteContent)) collectStrings(v, strings)

  const { uiCopy } = await import(pathToFileURL(uiCopyPath).href)
  collectStrings(uiCopy, strings)

  const { pages } = await import(pathToFileURL(siteSeoPath).href)
  collectStrings(pages, strings)

  return Array.from(strings).sort()
}
