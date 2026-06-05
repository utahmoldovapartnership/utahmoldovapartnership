const SKIP_KEYS = new Set([
  'email',
  'whatsapp',
  'whatsappUrl',
  'website',
  'partnerSite',
  'src',
  'srcSet',
  'href',
  'image',
  'ogImage',
  'preconnect',
  'id',
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

const SKIP_VALUES = new Set([
  'UMBP',
  'Chișinău',
  'Moldova',
  'Braxton',
  'Libby',
  'Henry',
  'Katya',
  'Ethan',
  'Meg',
  'Halle',
  'Weston',
  'Clark Ivory',
  'Walter Plumb III',
  'utahmoldovapartnership@gmail.com',
  '+1 (801) 687-6222',
])

function translateString(value, dict) {
  if (typeof value !== 'string') return value
  if (SKIP_VALUES.has(value.trim())) return value
  if (dict[value] != null) return dict[value]
  const trimmed = value.trim()
  if (dict[trimmed] != null) return value.replace(trimmed, dict[trimmed])
  return value
}

export function localizeDeep(value, dict, key = '') {
  if (!dict || !Object.keys(dict).length) return value
  if (typeof value === 'string') {
    if (SKIP_KEYS.has(key)) return value
    return translateString(value, dict)
  }
  if (Array.isArray(value)) {
    return value.map((item) => localizeDeep(item, dict, key))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, localizeDeep(v, dict, k)]),
    )
  }
  return value
}
