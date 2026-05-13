import { useEffect, useRef, useState } from 'react'
import { TbChevronDown, TbCheck } from 'react-icons/tb'
import { useLanguage } from '../contexts/LanguageContext.jsx'

const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'RU', label: 'Русский' },
  { code: 'RO', label: 'Română' },
]

export default function LanguageSwitcher({ variant = 'desktop' }) {
  const [open, setOpen] = useState(false)
  const { lang: active, setLang: setActive } = useLanguage()
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  if (variant === 'mobile') {
    return (
      <div data-no-translate className="border-b border-border bg-white">
        <div className="px-6 py-3 text-[12px] uppercase tracking-widest text-muted font-sans">
          Language
        </div>
        <div className="grid grid-cols-3 border-t border-border">
          {LANGUAGES.map((lang, i) => {
            const isActive = active === lang.code
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setActive(lang.code)}
                className={[
                  'py-3 text-[13px] uppercase tracking-widest font-medium',
                  i !== LANGUAGES.length - 1 ? 'border-r border-border' : '',
                  isActive ? 'bg-ink text-white' : 'text-ink',
                ].join(' ')}
              >
                {lang.code}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} data-no-translate className="relative h-14 flex items-center">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="h-14 px-3 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-ink border-b-2 border-transparent hover:text-red"
      >
        <span>{active}</span>
        <TbChevronDown
          size={12}
          className={open ? 'rotate-180' : ''}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-px w-44 border border-border bg-white z-50"
        >
          {LANGUAGES.map((lang) => {
            const isActive = active === lang.code
            return (
              <li key={lang.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(lang.code)
                    setOpen(false)
                  }}
                  className={[
                    'w-full text-left px-4 py-3 text-[11px] font-medium uppercase tracking-widest font-sans border-b border-border last:border-b-0 flex items-center justify-between',
                    isActive ? 'text-red' : 'text-ink hover:text-red',
                  ].join(' ')}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-[26px] text-[12px] tracking-widest text-muted">
                      {lang.code}
                    </span>
                    <span className="normal-case tracking-normal text-[14px] font-medium">
                      {lang.label}
                    </span>
                  </span>
                  {isActive && <TbCheck size={12} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
