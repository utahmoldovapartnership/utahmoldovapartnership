import { Link } from 'react-router-dom'
import { orgInfo } from '../data/siteContent.js'

function FLink({ to, href, children }) {
  const cls = 'hover:text-red transition-none'
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={cls}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const columns = [
    {
      title: 'Program',
      items: [
        <FLink key="home" to="/">Home</FLink>,
        <FLink key="interns" to="/interns">For Interns</FLink>,
        <FLink key="contact" to="/contact">Contact</FLink>,
      ],
    },
    {
      title: 'Contact',
      items: [
        <FLink key="email" href={`mailto:${orgInfo.email}`}>{orgInfo.email}</FLink>,
        <FLink key="partner" href={`https://${orgInfo.partnerSite}`}>{orgInfo.partnerSite}</FLink>,
      ],
    },
    {
      title: 'Follow',
      items: [
        <span key="ig">Instagram</span>,
        <span key="li">LinkedIn</span>,
        <span key="fb">Facebook</span>,
      ],
    },
    {
      title: 'Partners',
      items: [
        <span key="ic">Ivory Center, Chișinău</span>,
        <span key="hi">Hinckley Institute</span>,
        <span key="tw">Tekwill</span>,
        <span key="cts">Code to Success</span>,
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1180px] grid grid-cols-2 md:grid-cols-4">
        {columns.map((col, i) => {
          const isEvenMobile = i % 2 === 0
          const isTopRowMobile = i < 2
          const isLast = i === columns.length - 1
          return (
            <div
              key={col.title}
              className={[
                'p-5 md:p-8 border-border',
                isEvenMobile ? 'border-r' : '',
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
