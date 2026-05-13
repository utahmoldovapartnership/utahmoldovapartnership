import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const SITE_CONTENT = path.join(ROOT, 'src/data/siteContent.js')
const SCAN_DIRS = [
  path.join(ROOT, 'src/pages'),
  path.join(ROOT, 'src/components'),
]
const OUT_FILE = path.join(ROOT, 'src/locales/translations.json')
const TARGETS = ['ru', 'ro']
const EMAIL = 'utahmoldovapartnership@gmail.com'
const SLEEP_MS = 120

const KEEP_AS_IS = new Set([
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
  'Clark Ivory',
  'Walter Plumb III',
  'Est.',
  '©',
])

function isTranslatable(value) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (trimmed.length < 2) return false
  if (!/[A-Za-z]/.test(trimmed)) return false
  if (KEEP_AS_IS.has(trimmed)) return false
  return true
}

function collectStrings(value, out = new Set()) {
  if (value == null) return out
  if (typeof value === 'string') {
    if (isTranslatable(value)) out.add(value.trim())
    return out
  }
  if (Array.isArray(value)) {
    for (const v of value) collectStrings(v, out)
    return out
  }
  if (typeof value === 'object') {
    for (const v of Object.values(value)) collectStrings(v, out)
    return out
  }
  return out
}

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, files)
    else if (/\.(jsx?|tsx?)$/.test(entry.name)) files.push(full)
  }
  return files
}

const JSX_TEXT_RE = />([^<>{}\n]+?)</g
const JSX_PROP_RE =
  /\b(label|title|kicker|subtext|placeholder|aria-label|caption|tag|company|cta|text|name|alt|description)\s*=\s*["']([^"']{3,})["']/g

function extractFromSource(source, out) {
  let m
  while ((m = JSX_TEXT_RE.exec(source))) {
    const raw = m[1]
    const cleaned = raw
      .replace(/\s+/g, ' ')
      .replace(/\{['"][^'"]+['"]\}/g, '')
      .trim()
    if (!isTranslatable(cleaned)) continue
    out.add(cleaned)
  }
  JSX_PROP_RE.lastIndex = 0
  while ((m = JSX_PROP_RE.exec(source))) {
    const raw = m[2].trim()
    if (isTranslatable(raw)) out.add(raw)
  }
}

async function translateViaMyMemory(text, target) {
  const params = new URLSearchParams({
    q: text,
    langpair: `en|${target}`,
    de: EMAIL,
  })
  const res = await fetch(
    `https://api.mymemory.translated.net/get?${params.toString()}`,
  )
  if (res.status === 429) {
    const err = new Error('rate-limited')
    err.code = 429
    throw err
  }
  if (!res.ok) throw new Error(`mymemory ${res.status}`)
  const data = await res.json()
  if (data?.responseStatus === 429 || data?.quotaFinished === true) {
    const err = new Error('rate-limited')
    err.code = 429
    throw err
  }
  const out = data?.responseData?.translatedText
  if (typeof out === 'string' && out.trim()) return out
  throw new Error('empty response')
}

async function translateViaLingva(text, target) {
  const encoded = encodeURIComponent(text)
  const res = await fetch(`https://lingva.ml/api/v1/en/${target}/${encoded}`)
  if (!res.ok) throw new Error(`lingva ${res.status}`)
  const data = await res.json()
  const out = data?.translation
  if (typeof out === 'string' && out.trim()) return out
  throw new Error('empty response')
}

let myMemoryDisabled = false

async function translateOne(text, target) {
  if (!myMemoryDisabled) {
    try {
      return await translateViaMyMemory(text, target)
    } catch (err) {
      if (err.code === 429) {
        console.log('  ! MyMemory rate-limited, falling back to Lingva')
        myMemoryDisabled = true
      }
    }
  }
  try {
    return await translateViaLingva(text, target)
  } catch (err) {
    console.log(`  ! Failed to translate "${text.slice(0, 40)}…":`, err.message)
    return null
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const mod = await import(pathToFileURL(SITE_CONTENT).href)
  const strings = new Set()
  for (const v of Object.values(mod)) collectStrings(v, strings)

  for (const dir of SCAN_DIRS) {
    const files = await walk(dir)
    for (const file of files) {
      const src = await fs.readFile(file, 'utf8')
      extractFromSource(src, strings)
    }
  }

  const list = Array.from(strings).sort()
  console.log(`Found ${list.length} strings to translate.`)

  let existing = {}
  try {
    existing = JSON.parse(await fs.readFile(OUT_FILE, 'utf8'))
  } catch {
    existing = {}
  }

  for (const target of TARGETS) {
    console.log(`\n→ Translating to ${target.toUpperCase()}`)
    existing[target] = existing[target] || {}
    const dict = existing[target]
    let done = 0
    for (const text of list) {
      done++
      if (dict[text]) continue
      const translated = await translateOne(text, target)
      if (translated) {
        dict[text] = translated
        console.log(`  ${done}/${list.length} ✓ ${text.slice(0, 50)}`)
      }
      await sleep(SLEEP_MS)
    }
    await fs.mkdir(path.dirname(OUT_FILE), { recursive: true })
    await fs.writeFile(OUT_FILE, JSON.stringify(existing, null, 2) + '\n')
  }

  console.log(`\nDone. Wrote ${OUT_FILE}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
