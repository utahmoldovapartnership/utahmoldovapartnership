import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import { orgInfo } from '../data/siteContent.js'
import staticTranslations from '../locales/translations.json'

const LANG_MAP = { EN: 'en', RU: 'ru', RO: 'ro' }

const CACHE_KEY = 'umbp.translations.v1'
const CONCURRENCY = 3

function loadCache() {
  let stored = {}
  try {
    stored = JSON.parse(window.localStorage.getItem(CACHE_KEY) || '{}')
  } catch {
    stored = {}
  }
  const merged = { ...stored }
  for (const lang of Object.keys(staticTranslations || {})) {
    merged[lang] = { ...(staticTranslations[lang] || {}), ...(stored[lang] || {}) }
  }
  return merged
}

function saveCache(cache) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    /* ignore quota errors */
  }
}

const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'CODE',
  'PRE',
  'INPUT',
  'TEXTAREA',
  'SVG',
  'PATH',
])

function collectTextNodes(root) {
  const out = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT
      if (parent.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT
      const value = node.nodeValue
      if (!value) return NodeFilter.FILTER_REJECT
      const trimmed = value.trim()
      if (!trimmed) return NodeFilter.FILTER_REJECT
      if (/^[\d\s.,:%+\-/]+$/.test(trimmed)) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })
  let n
  while ((n = walker.nextNode())) out.push(n)
  return out
}

async function translateViaMyMemory(text, target) {
  const params = new URLSearchParams({
    q: text,
    langpair: `en|${target}`,
    de: orgInfo.email,
  })
  const url = `https://api.mymemory.translated.net/get?${params.toString()}`
  const res = await fetch(url)
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
  throw new Error('mymemory empty response')
}

async function translateViaLingva(text, target) {
  const encoded = encodeURIComponent(text)
  const url = `https://lingva.ml/api/v1/en/${target}/${encoded}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`lingva ${res.status}`)
  const data = await res.json()
  const out = data?.translation
  if (typeof out === 'string' && out.trim()) return out
  throw new Error('lingva empty response')
}

let myMemoryDisabledUntil = 0

async function translateOne(text, target) {
  if (Date.now() > myMemoryDisabledUntil) {
    try {
      return await translateViaMyMemory(text, target)
    } catch (err) {
      if (err.code === 429) {
        myMemoryDisabledUntil = Date.now() + 60 * 60 * 1000
      }
    }
  }
  try {
    return await translateViaLingva(text, target)
  } catch {
    return null
  }
}

async function translateMany(texts, target, onProgress) {
  const results = {}
  let cursor = 0
  async function worker() {
    while (cursor < texts.length) {
      const idx = cursor++
      const text = texts[idx]
      const translated = await translateOne(text, target)
      if (translated) {
        results[text] = translated
        onProgress?.(text, translated)
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, texts.length) }, worker),
  )
  return results
}

export default function Translator() {
  const { lang } = useLanguage()
  const originalsRef = useRef(new WeakMap())
  const isPatchingRef = useRef(false)
  const runIdRef = useRef(0)

  useEffect(() => {
    const runId = ++runIdRef.current
    const target = LANG_MAP[lang] || 'en'
    const originals = originalsRef.current
    const cache = loadCache()

    function applyTranslationToNode(node, originalText, translated) {
      const key = originalText.trim()
      const value = originalText.replace(key, translated)
      if (node.nodeValue !== value) {
        node.nodeValue = value
      }
    }

    async function apply() {
      if (runIdRef.current !== runId) return
      isPatchingRef.current = true
      const nodes = collectTextNodes(document.body)

      for (const node of nodes) {
        if (!originals.has(node)) {
          originals.set(node, node.nodeValue)
        }
      }

      if (target === 'en') {
        for (const node of nodes) {
          const orig = originals.get(node)
          if (orig != null && node.nodeValue !== orig) {
            node.nodeValue = orig
          }
        }
        isPatchingRef.current = false
        return
      }

      cache[target] = cache[target] || {}
      const langCache = cache[target]

      const pendingKeys = new Set()
      const nodeMeta = []
      for (const node of nodes) {
        const orig = originals.get(node) ?? node.nodeValue
        const key = orig.trim()
        if (!key) continue
        nodeMeta.push({ node, orig, key })
        if (langCache[key] != null) {
          applyTranslationToNode(node, orig, langCache[key])
        } else {
          pendingKeys.add(key)
        }
      }

      const pending = Array.from(pendingKeys)
      if (pending.length === 0) {
        isPatchingRef.current = false
        return
      }

      await translateMany(pending, target, (src, translated) => {
        if (runIdRef.current !== runId) return
        langCache[src] = translated
        for (const meta of nodeMeta) {
          if (meta.key === src) {
            applyTranslationToNode(meta.node, meta.orig, translated)
          }
        }
      })

      saveCache(cache)
      isPatchingRef.current = false
    }

    apply()

    const observer = new MutationObserver((mutations) => {
      if (isPatchingRef.current) return
      let needsApply = false
      for (const m of mutations) {
        if (m.type === 'characterData' || m.addedNodes.length > 0) {
          needsApply = true
          break
        }
      }
      if (needsApply) apply()
    })
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [lang])

  return null
}
