import { useState } from 'react'
import { TbMenu2, TbX } from 'react-icons/tb'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import {
  SlidingUnderlineIndicator,
  useSlidingUnderline,
} from './SlidingUnderline.jsx'

const links = [
  { href: '/', label: 'Home', end: true },
  { href: '/contact', label: 'Contact' },
  { href: '/interns', label: 'For Interns' },
]

function navActiveIndex(pathname) {
  if (pathname === '/') return 0
  if (pathname.startsWith('/contact')) return 1
  if (pathname.startsWith('/interns')) return 2
  return -1
}

function isLinkActive(pathname, href, end) {
  if (end) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar({ currentPath = '/' }) {
  const [open, setOpen] = useState(false)
  const activeIndex = navActiveIndex(currentPath)
  const { containerRef, setItemRef, indicator } = useSlidingUnderline(activeIndex)

  return (
    <header className="sticky top-1 z-50 bg-white border-b border-border">
      <nav className="mx-auto flex items-center justify-between h-14 px-6 md:px-10 max-w-[1180px]">
        <a
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src="/utah-moldova-logo.png"
            alt="Utah Moldova Business Partnership logo"
            className="w-[38px] h-[38px] object-contain"
          />
          <span className="hidden sm:block font-sans font-bold text-[12px] uppercase text-ink tracking-[0.08em]">
            Utah Moldova Business Partnership
          </span>
          <span className="sm:hidden font-sans font-bold text-[12px] uppercase text-ink tracking-[0.08em]">
            UMBP
          </span>
        </a>

        <div className="hidden md:flex items-stretch h-14">
          <LanguageSwitcher />
          <span className="w-px h-4 bg-border self-center mx-1" aria-hidden />
          <div ref={containerRef} className="relative flex items-stretch h-14">
            {links.map((l, i) => {
              const active = isLinkActive(currentPath, l.href, l.end)
              return (
                <a
                  key={l.href}
                  href={l.href}
                  ref={setItemRef(i)}
                  className={[
                    'flex items-center h-14 px-3 text-[11px] font-medium uppercase tracking-widest',
                    active ? 'text-red' : 'text-muted hover:text-ink',
                  ].join(' ')}
                >
                  {l.label}
                </a>
              )
            })}
            <SlidingUnderlineIndicator {...indicator} />
          </div>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden h-9 w-9 flex items-center justify-center border border-border text-ink"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <TbX size={18} /> : <TbMenu2 size={18} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <LanguageSwitcher variant="mobile" />
          {links.map((l) => {
            const active = isLinkActive(currentPath, l.href, l.end)
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={[
                  'block px-6 py-4 text-[13px] uppercase tracking-widest border-b border-border',
                  active ? 'text-red' : 'text-muted',
                ].join(' ')}
              >
                {l.label}
              </a>
            )
          })}
        </div>
      )}
    </header>
  )
}
