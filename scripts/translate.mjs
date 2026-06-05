import fs from 'node:fs/promises'
import path from 'node:path'
import { collectAllSiteStrings } from './lib/translatable-strings.mjs'

const ROOT = process.cwd()
const OUT_FILE = path.join(ROOT, 'src/locales/translations.json')
const TARGETS = ['ru', 'ro']
const EMAIL = 'utahmoldovapartnership@gmail.com'
const SLEEP_MS = 150

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
    console.log(`  ! Failed to translate "${text.slice(0, 50)}…":`, err.message)
    return null
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const list = await collectAllSiteStrings(ROOT)
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
    let added = 0
    let skipped = 0
    for (let i = 0; i < list.length; i++) {
      const text = list[i]
      if (dict[text]) {
        skipped++
        continue
      }
      const translated = await translateOne(text, target)
      if (translated) {
        dict[text] = translated
        added++
        console.log(`  ${i + 1}/${list.length} ✓ ${text.slice(0, 60)}`)
      }
      await sleep(SLEEP_MS)
    }
    await fs.mkdir(path.dirname(OUT_FILE), { recursive: true })
    await fs.writeFile(OUT_FILE, JSON.stringify(existing, null, 2) + '\n')
    console.log(`  Added ${added}, already had ${skipped}`)
  }

  console.log(`\nDone. Wrote ${OUT_FILE}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
