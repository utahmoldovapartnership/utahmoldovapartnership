import { useState } from 'react'

const CACHE_KEY = 'umbp.translations.v1'

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function TranslationExporter() {
  const [count, setCount] = useState(null)

  function handleExport() {
    let cache = {}
    try {
      cache = JSON.parse(window.localStorage.getItem(CACHE_KEY) || '{}')
    } catch {
      cache = {}
    }
    const total = Object.values(cache).reduce(
      (n, dict) => n + Object.keys(dict || {}).length,
      0,
    )
    setCount(total)
    downloadJson('translations.json', cache)
  }

  if (!import.meta.env.DEV) return null

  return (
    <div
      data-no-translate
      className="fixed bottom-3 right-3 z-50 flex items-center gap-2 bg-black/85 text-white text-[11px] uppercase tracking-widest font-sans px-3 py-2 border border-white/10"
    >
      <button type="button" onClick={handleExport} className="hover:text-yellow">
        Save translations
      </button>
      {count != null && (
        <span className="text-white/60 normal-case tracking-normal text-[10px]">
          {count} strings → translations.json
        </span>
      )}
    </div>
  )
}
