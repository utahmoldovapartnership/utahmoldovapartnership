import {
  TbBrandInstagram,
  TbBrandX,
  TbBrandFacebook,
  TbBrandLinkedin,
  TbBrandWhatsapp,
  TbMail,
  TbWorld,
} from 'react-icons/tb'
import { orgInfo } from '../data/siteContent.js'

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

export default function Footer() {
  const columns = [
    {
      title: 'Guide',
      items: [
        <FLink key="home" href="/">Home</FLink>,
        <FLink key="contact" href="/contact">Contact</FLink>,
        <FLink key="interns" href="/interns">For Interns</FLink>,
      ],
    },
    {
      title: 'Follow',
      items: [
        <FLink key="ig" href="https://www.instagram.com/utahmoldovabusinesspartnership/">
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
      title: 'Contact',
      items: [
        <FLink key="email" href={`mailto:${orgInfo.email}`}>
          <TbMail size={16} />
          {orgInfo.email}
        </FLink>,
        <FLink key="whatsapp" href="#">
          <TbBrandWhatsapp size={16} />
          WhatsApp
        </FLink>,
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1180px] grid grid-cols-2 md:grid-cols-4">
        <div className="p-5 md:p-8 border-r border-b md:border-b-0 md:border-r border-border">
          <a href="/" className="inline-flex items-center gap-2 mb-4">
            <img
              src="/utah-moldova-logo.png"
              alt="Utah Moldova Business Partnership logo"
              className="w-10 h-10 object-contain"
            />
          </a>
          <div className="font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-ink mb-3 leading-[1.4]">
            Utah Moldova
            <br />
            Business Partnership
          </div>
          <a
            href="https://maps.app.goo.gl/cwxyy8dqJRd1T3sP9"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] md:text-[14px] text-muted font-sans hover:text-red leading-relaxed block"
          >
            Ivory Center
            <br />
            Strada Alexandru cel Bun 144
            <br />
            MD-2004, Chișinău, Moldova
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
                'p-5 md:p-8 border-border',
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
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-3 md:py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-3">
          <span className="text-[11px] md:text-[13px] text-muted font-sans leading-snug">
            © {new Date().getFullYear()} {orgInfo.shortName} — Est. {orgInfo.founded}
            <span className="hidden md:inline">
              {' '}by {orgInfo.founders.join(' & ')}
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
