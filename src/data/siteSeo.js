import { orgInfo } from './siteContent.js'
import { pageHeroImages } from './heroImages.js'

/** Canonical production URL — used for sitemap, canonical links, and Open Graph */
export const SITE_URL = 'https://utahmoldovabusiness.com'

export const defaultOgImage = '/utah-moldova-logo.png'

export const pages = {
  home: {
    title: 'Free Business Consulting in Moldova | Utah Moldova Business Partnership',
    description:
      'UMBP offers free consulting for Moldovan businesses—strategy, marketing, web development, and more—delivered by American interns each summer in Chișinău.',
    path: '/',
    ogImage: pageHeroImages.home.src,
  },
  contact: {
    title: 'Contact UMBP | Free Consulting & Intern Inquiries',
    description:
      'Contact the Utah Moldova Business Partnership for free business consulting in Moldova, summer intern applications, or partnership inquiries.',
    path: '/contact',
    ogImage: pageHeroImages.contact.src,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  interns: {
    title: 'Summer Intern Program in Chișinău | Utah Moldova Business Partnership',
    description:
      'Apply for UMBP’s summer intern program in Chișinău, Moldova. Work with Moldovan businesses on real consulting projects abroad.',
    path: '/interns',
    ogImage: pageHeroImages.interns.src,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'For Interns', path: '/interns' },
    ],
  },
}

export function absoluteUrl(pathOrUrl, siteUrl = SITE_URL) {
  if (!pathOrUrl) return new URL(defaultOgImage, siteUrl).href
  if (pathOrUrl.startsWith('http')) return pathOrUrl
  return new URL(pathOrUrl, siteUrl).href
}

export function organizationJsonLd(siteUrl = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: orgInfo.name,
    alternateName: orgInfo.shortName,
    url: siteUrl,
    logo: absoluteUrl(defaultOgImage, siteUrl),
    email: orgInfo.email,
    foundingDate: String(orgInfo.founded),
    description: orgInfo.tagline,
    areaServed: {
      '@type': 'Country',
      name: 'Moldova',
    },
    founder: orgInfo.founders.map((name) => ({
      '@type': 'Person',
      name,
    })),
    sameAs: [
      'https://www.instagram.com/utahmoldovabusinesspartnership/',
      'https://twitter.com/UtahMoldova_BP',
      'https://www.facebook.com/utahmoldovapartnership/',
      'https://www.linkedin.com/company/the-utah-moldova-partnership/about/',
    ],
  }
}

export function webSiteJsonLd(siteUrl = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: orgInfo.name,
    url: siteUrl,
    description: orgInfo.tagline,
    publisher: {
      '@type': 'NGO',
      name: orgInfo.name,
      url: siteUrl,
    },
  }
}

export function breadcrumbJsonLd(items, siteUrl = SITE_URL) {
  if (!items?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteUrl),
    })),
  }
}

export function webPageJsonLd({ title, description, path }, siteUrl = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path, siteUrl),
    isPartOf: {
      '@type': 'WebSite',
      name: orgInfo.name,
      url: siteUrl,
    },
  }
}

export function jsonLdGraph(entries) {
  const filtered = entries.filter(Boolean)
  if (filtered.length === 1) return filtered[0]
  return {
    '@context': 'https://schema.org',
    '@graph': filtered,
  }
}
