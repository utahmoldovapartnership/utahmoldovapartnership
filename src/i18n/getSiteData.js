import translations from '../locales/translations.json'
import * as content from '../data/siteContent.js'
import { uiCopy } from './uiCopy.js'
import { localizeDeep } from './localize.js'

const englishBundle = {
  orgInfo: content.orgInfo,
  stats: content.stats,
  internStats: content.internStats,
  services: content.services,
  pastClients: content.pastClients,
  supporters: content.supporters,
  testimonial: content.testimonial,
  meetInterns: content.meetInterns,
  businessSteps: content.businessSteps,
  internWhatYouDo: content.internWhatYouDo,
  internCohortPhotos: content.internCohortPhotos,
  internWhoFor: content.internWhoFor,
  internSkillsSection: content.internSkillsSection,
  internApplySteps: content.internApplySteps,
  faqBusiness: content.faqBusiness,
  faqInterns: content.faqInterns,
  contactPaths: content.contactPaths,
  ui: uiCopy,
}

export function getSiteData(locale = 'en') {
  if (locale === 'en') return englishBundle
  const dict = translations[locale] || {}
  return localizeDeep(englishBundle, dict)
}
