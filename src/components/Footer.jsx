import {
  TbBrandInstagram,
  TbBrandX,
  TbBrandFacebook,
  TbBrandLinkedin,
  TbBrandWhatsapp,
  TbMail,
  TbWorld,
} from 'react-icons/tb'
import { localePath } from '../i18n/config.js'

function FLink({ href, children }) {
  const cls =
    'flex items-center gap-2 hover:text-red transition-none [overflow-wrap:anywhere] min-w-0'
  const external = href?.startsWith('http')
  return (
    <a
      href={href}
      className={cls}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

export default function Footer({ locale = 'en', ui, orgInfo }) {
  const footer = ui?.footer ?? {}
  const nav = ui?.nav ?? {}

  const columns = [
    {
      title: footer.guide ?? 'Guide',
      items: [
        <FLink key="home" href={localePath(locale, '/')}>{nav.home ?? 'Home'}</FLink>,
        <FLink key="contact" href={localePath(locale, '/contact')}>{nav.contact ?? 'Contact'}</FLink>,
        <FLink key="interns" href={localePath(locale, '/interns')}>{nav.interns ?? 'For Interns'}</FLink>,
      ],
    },
    {
      title: footer.follow ?? 'Follow',
      items: [
        <FLink key="ig" href="https://www.instagram.com/utahmoldova/">
          <TbBrandInstagram size={16} />
          Instagram
        </FLink>,
        <FLink key="tw" href="https://twitter.com/UtahMoldova_BP">
          <TbBrandX size={16} />
          Twitter
        </FLink>,
        <FLink key="fb" href="https://www.facebook.com/utahmoldovapartnership/">
          <TbBrandFacebook size={16} />
          Facebook
        </FLink>,
        <FLink key="li" href="https://www.linkedin.com/company/the-utah-moldova-partnership/about/">
          <TbBrandLinkedin size={16} />
          LinkedIn
        </FLink>,
      ],
    },
    {
      title: footer.contact ?? 'Contact',
      wide: true,
      items: [
        <FLink key="email" href={`mailto:${orgInfo.email}`}>
          <TbMail size={16} />
          {orgInfo.email}
        </FLink>,
        <FLink key="whatsapp" href={orgInfo.whatsappUrl}>
          <TbBrandWhatsapp size={16} />
          {orgInfo.whatsapp}
        </FLink>,
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1180px] grid grid-cols-2 md:grid-cols-[1.1fr_0.85fr_0.85fr_1.35fr]">
        <div className="p-5 md:p-8 border-r border-b md:border-b-0 md:border-r border-border">
          <a href={localePath(locale, '/')} className="inline-flex items-center gap-2 mb-4">
            <img
              src="/umbp-logo-red.png"
              alt={nav.logoAlt ?? 'Utah Moldova Business Partnership logo'}
              className="h-10 w-auto object-contain"
            />
          </a>
          <div className="font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-ink mb-3 leading-[1.4]">
            {orgInfo.name}
          </div>
          <a
            href="https://maps.app.goo.gl/cwxyy8dqJRd1T3sP9"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] md:text-[14px] text-muted font-sans hover:text-red leading-relaxed block"
          >
            {orgInfo.address?.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            )) ?? (
              <>
                Ivory Center
                <br />
                Strada Alexandru cel Bun 144
                <br />
                MD-2004, Chișinău, Moldova
              </>
            )}
          </a>
          <a
            href={`https://${orgInfo.partnerSite}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-[13px] md:text-[14px] text-muted font-sans hover:text-red"
          >
            <TbWorld size={16} />
            {orgInfo.partnerSite}
          </a>
        </div>
        {columns.map((col, i) => {
          const pos = i + 1
          const isEvenPos = pos % 2 === 0
          const isTopRowMobile = pos < 2
          const isLast = i === columns.length - 1
          return (
            <div
              key={col.title}
              className={[
                'border-border',
                col.wide ? 'p-5 md:px-10 md:py-8' : 'p-5 md:p-8',
                isEvenPos ? 'border-r' : '',
                isTopRowMobile ? 'border-b md:border-b-0' : '',
                !isLast ? 'md:border-r' : '',
              ].join(' ')}
            >
              <div className="font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-ink mb-3 md:mb-4">
                {col.title}
              </div>
              <div className="flex flex-col gap-2 text-[13px] md:text-[14px] text-muted font-sans">
                {col.items}
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-3 md:py-4 flex flex-row justify-between items-center gap-3">
          <span className="text-[11px] md:text-[13px] text-muted font-sans leading-snug">
            © {new Date().getFullYear()} {orgInfo.shortName} — {footer.est ?? 'Est.'} {orgInfo.founded}
            <span className="hidden md:inline">
              {' '}{footer.by ?? 'by'} {orgInfo.founders.join(' & ')}
            </span>
          </span>
          <span className="flex items-center gap-[2px]">
            <span className="w-2 h-3 bg-blue inline-block" />
            <span className="w-2 h-3 bg-yellow inline-block" />
            <span className="w-2 h-3 bg-red inline-block" />
          </span>
        </div>
      </div>
    </footer>
  )
}
