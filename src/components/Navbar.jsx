import { useState } from 'react'
import { TbMenu2, TbX } from 'react-icons/tb'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { localePath } from '../i18n/config.js'
import {
  SlidingUnderlineIndicator,
  useSlidingUnderline,
} from './SlidingUnderline.jsx'

const links = [
  { href: '/', labelKey: 'home' },
  { href: '/contact', labelKey: 'contact' },
  { href: '/interns', labelKey: 'interns' },
]

function navActiveIndex(pathname) {
  const path = pathname.replace(/^\/(ro|ru)(?=\/|$)/, '') || '/'
  if (path === '/') return 0
  if (path.startsWith('/contact')) return 1
  if (path.startsWith('/interns')) return 2
  return -1
}

function isLinkActive(pathname, href, end) {
  const path = pathname.replace(/^\/(ro|ru)(?=\/|$)/, '') || '/'
  if (end) return path === href
  return path === href || path.startsWith(`${href}/`)
}

export default function Navbar({ currentPath = '/', locale = 'en', nav = {}, orgInfo }) {
  const [open, setOpen] = useState(false)
  const activeIndex = navActiveIndex(currentPath)
  const { containerRef, setItemRef, indicator } = useSlidingUnderline(activeIndex)

  return (
    <header className="sticky top-1 z-50 bg-white border-b border-border">
      <nav className="mx-auto flex items-center justify-between h-14 px-6 md:px-10 max-w-[1180px]">
        <a
          href={localePath(locale, '/')}
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src="/umbp-logo-color.png"
            alt={nav.logoAlt ?? 'Utah Moldova Business Partnership logo'}
            className="h-8 w-auto object-contain"
          />
          <span className="hidden sm:block font-sans font-bold text-[12px] uppercase text-ink tracking-[0.08em]">
            {orgInfo?.name ?? 'Utah Moldova Business Partnership'}
          </span>
          <span className="sm:hidden font-sans font-bold text-[12px] uppercase text-ink tracking-[0.08em]">
            {orgInfo?.shortName ?? 'UMBP'}
          </span>
        </a>

        <div className="hidden md:flex items-stretch h-14">
          <LanguageSwitcher currentPath={currentPath} languageLabel={nav.language} />
          <span className="w-px h-4 bg-border self-center mx-1" aria-hidden />
          <div ref={containerRef} className="relative flex items-stretch h-14">
            {links.map((l, i) => {
              const active = isLinkActive(currentPath, l.href, l.href === '/')
              return (
                <a
                  key={l.href}
                  href={localePath(locale, l.href)}
                  ref={setItemRef(i)}
                  className={[
                    'flex items-center h-14 px-3 text-[11px] font-medium uppercase tracking-widest',
                    active ? 'text-red' : 'text-muted hover:text-ink',
                  ].join(' ')}
                >
                  {nav[l.labelKey]}
                </a>
              )
            })}
            <SlidingUnderlineIndicator {...indicator} />
          </div>
        </div>

        <button
          type="button"
          aria-label={open ? nav.closeMenu : nav.openMenu}
          className="md:hidden h-9 w-9 flex items-center justify-center border border-border text-ink"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <TbX size={18} /> : <TbMenu2 size={18} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <LanguageSwitcher variant="mobile" currentPath={currentPath} languageLabel={nav.language} />
          {links.map((l) => {
            const active = isLinkActive(currentPath, l.href, l.href === '/')
            return (
              <a
                key={l.href}
                href={localePath(locale, l.href)}
                onClick={() => setOpen(false)}
                className={[
                  'block px-6 py-4 text-[13px] uppercase tracking-widest border-b border-border',
                  active ? 'text-red' : 'text-muted',
                ].join(' ')}
              >
                {nav[l.labelKey]}
              </a>
            )
          })}
        </div>
      )}
    </header>
  )
}
