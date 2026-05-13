import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const SITE_CONTENT = path.join(ROOT, 'src/data/siteContent.js')
const OUT_FILE = path.join(ROOT, 'src/locales/translations.json')
const TARGETS = ['ru', 'ro']
const EMAIL = 'utahmoldovapartnership@gmail.com'
const SLEEP_MS = 120

function collectStrings(value, out = new Set()) {
  if (value == null) return out
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed.length > 1 && /[A-Za-z]/.test(trimmed)) {
      out.add(trimmed)
    }
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
