import { Link } from 'react-router-dom'
import { orgInfo } from '../data/siteContent.js'

function FooterCol({ title, children }) {
  return (
    <div className="p-8 border-r border-border last:border-r-0 md:border-r md:border-b-0 border-b">
      <div className="font-sans font-medium text-[10px] uppercase tracking-[0.12em] text-ink mb-4">
        {title}
      </div>
      <div className="flex flex-col gap-2 text-[12px] text-muted font-sans">
        {children}
      </div>
    </div>
  )
}

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
    <a href={href} className={cls} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1180px] grid grid-cols-1 md:grid-cols-4">
        <FooterCol title="Program">
          <FLink to="/">Home</FLink>
          <FLink to="/interns">For Interns</FLink>
          <FLink to="/contact">Contact</FLink>
        </FooterCol>
        <FooterCol title="Contact">
          <FLink href={`mailto:${orgInfo.email}`}>{orgInfo.email}</FLink>
          <FLink href={`https://${orgInfo.website}`}>{orgInfo.website}</FLink>
          <FLink href={`https://${orgInfo.partnerSite}`}>{orgInfo.partnerSite}</FLink>
        </FooterCol>
        <FooterCol title="Partners">
          <span>Ivory Center, Chișinău</span>
          <span>Hinckley Institute</span>
          <span>Tekwill</span>
          <span>Code to Success</span>
        </FooterCol>
        <FooterCol title="Follow">
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>Facebook</span>
        </FooterCol>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1180px] px-6 md:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <span className="text-[11px] text-muted font-sans">
            © {new Date().getFullYear()} {orgInfo.name} — Est. {orgInfo.founded} by {orgInfo.founders.join(' & ')}
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
