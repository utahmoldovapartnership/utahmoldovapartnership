import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { TbMenu2, TbX } from 'react-icons/tb'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/interns', label: 'For Interns' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    [
      'flex items-center h-14 px-3 text-[11px] font-medium uppercase tracking-widest border-b-2',
      isActive
        ? 'text-red border-red'
        : 'text-muted border-transparent hover:text-ink',
    ].join(' ')

  return (
    <header className="sticky top-1 z-50 bg-white border-b border-border">
      <nav className="mx-auto flex items-center justify-between h-14 px-6 md:px-10 max-w-[1180px]">
        <Link
          to="/"
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
        </Link>

        <div className="hidden md:flex items-stretch h-14">
          <LanguageSwitcher />
          <span className="w-px h-4 bg-border self-center mx-1" aria-hidden />
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
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
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  'block px-6 py-4 text-[12px] uppercase tracking-widest border-b border-border',
                  isActive ? 'text-red' : 'text-muted',
                ].join(' ')
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
