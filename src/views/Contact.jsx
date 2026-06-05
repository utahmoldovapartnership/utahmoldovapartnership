import { useState } from 'react'
import { TbArrowRight, TbBrandWhatsapp, TbCheck, TbMail, TbWorld } from 'react-icons/tb'
import Hero from '../components/Hero.jsx'
import { pageHeroImages } from '../data/heroImages.js'
import ScrollFade from '../components/ScrollFade.jsx'
import {
  SlidingUnderlineIndicator,
  useSlidingUnderline,
} from '../components/SlidingUnderline.jsx'
import { getSiteData } from '../i18n/getSiteData.js'

export default function Contact({ locale = 'en' }) {
  const d = getSiteData(locale)
  const { ui, orgInfo, faqBusiness, faqInterns } = d
  const c = ui.contact

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    audience: 'business',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [faqTab, setFaqTab] = useState('business')

  const faqTabs = [
    { id: 'business', label: c.faq.tabs.business },
    { id: 'interns', label: c.faq.tabs.interns },
  ]
  const activeFaqs = faqTab === 'business' ? faqBusiness : faqInterns
  const faqActiveIndex = faqTab === 'business' ? 0 : 1
  const {
    containerRef: faqTabsRef,
    setItemRef: setFaqTabRef,
    indicator: faqIndicator,
  } = useSlidingUnderline(faqActiveIndex)

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(c.subjects[form.audience] || c.subjects.general)
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Company / Organization: ${form.company}`,
        `Audience: ${form.audience}`,
        '',
        form.message,
      ].join('\n'),
    )
    setSent(true)
    window.location.href = `mailto:${orgInfo.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <Hero
        title={
          <>
            {c.hero.titleLine1}
            <br />
            {c.hero.titleLine2} <em className="italic text-white">{c.hero.titleEmphasis}</em>
          </>
        }
        subtext={c.hero.subtext}
        primary={{ label: c.hero.primary, href: `mailto:${orgInfo.email}` }}
        secondary={{ label: c.hero.secondary, href: '#faq' }}
        image={pageHeroImages.contact}
        overlayDirection="vertical-strong"
      />

      <ScrollFade as="section" className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          <div className="md:col-span-2 p-7 md:p-10 border-b md:border-b-0 md:border-r border-border">
            <h3 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
              {c.form.title}
            </h3>
            <p className="text-[15px] text-muted leading-[1.65] font-sans mb-6 max-w-[640px]">
              {c.form.intro}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col md:flex-row">
                <input
                  required
                  type="text"
                  placeholder={c.form.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="flex-1 border border-border md:border-r-0 px-4 py-3 text-[15px] text-ink font-sans bg-white focus:border-red"
                />
                <input
                  required
                  type="email"
                  placeholder={c.form.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="flex-1 border border-border -mt-px md:mt-0 md:border-l-0 px-4 py-3 text-[15px] text-ink font-sans bg-white focus:border-red"
                />
              </div>

              <input
                type="text"
                placeholder={c.form.company}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="-mt-px border border-border px-4 py-3 text-[15px] text-ink font-sans bg-white focus:border-red"
              />

              <div
                role="radiogroup"
                aria-labelledby="audience-label"
                className="-mt-px border border-border bg-white text-[14px] text-muted font-sans"
              >
                <p
                  id="audience-label"
                  className="px-4 pt-4 pb-3 text-[12px] uppercase tracking-[0.12em] text-ink font-medium font-sans border-b border-border"
                >
                  {c.form.audienceLabel}
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-4">
                  {[
                    [
                      { id: 'business', label: c.form.audienceOptions.business },
                      { id: 'intern', label: c.form.audienceOptions.intern },
                    ],
                    [
                      { id: 'partner', label: c.form.audienceOptions.partner },
                      { id: 'general', label: c.form.audienceOptions.general },
                    ],
                  ].map((column, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-3">
                      {column.map((opt) => (
                        <label
                          key={opt.id}
                          className="flex items-center gap-2 cursor-pointer text-[14px] text-ink"
                        >
                          <input
                            type="radio"
                            name="audience"
                            value={opt.id}
                            checked={form.audience === opt.id}
                            onChange={(e) =>
                              setForm({ ...form, audience: e.target.value })
                            }
                            className="appearance-none w-4 h-4 flex-shrink-0 border border-border bg-white checked:bg-red checked:border-red"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <textarea
                required
                rows={6}
                placeholder={c.form.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="-mt-px border border-border px-4 py-3 text-[15px] text-ink font-sans bg-white focus:border-red resize-none"
              />

              <button
                type="submit"
                className="-mt-px w-full bg-red text-white py-4 font-sans font-medium text-[12px] uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2"
              >
                {sent ? c.form.sending : c.form.send} <TbArrowRight size={14} />
              </button>

              <p className="text-[13px] text-[#9ca3af] mt-3 font-sans inline-flex items-center gap-2">
                <TbCheck size={12} /> {c.form.privacy}
              </p>
            </form>
          </div>

          <aside className="p-7 md:p-10">
            <h3 className="font-serif font-medium text-[22px] md:text-[26px] leading-[1.0] tracking-[-0.5px] text-ink mb-4">
              {c.sidebar.title}
            </h3>

            <div className="border-t border-border">
              <a
                href={`mailto:${orgInfo.email}`}
                className="flex items-start gap-3 py-4 border-b border-border"
              >
                <span className="w-8 h-8 bg-red flex items-center justify-center flex-shrink-0">
                  <TbMail size={14} color="#fff" />
                </span>
                <span>
                  <span className="block text-[12px] uppercase tracking-[0.12em] text-muted font-sans">
                    {c.sidebar.email}
                  </span>
                  <span className="block text-[15px] text-ink font-sans break-all">
                    {orgInfo.email}
                  </span>
                </span>
              </a>
              <a
                href={`https://${orgInfo.partnerSite}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 py-4 border-b border-border"
              >
                <span className="w-8 h-8 bg-yellow flex items-center justify-center flex-shrink-0">
                  <TbWorld size={14} color="#0d0d0d" />
                </span>
                <span>
                  <span className="block text-[12px] uppercase tracking-[0.12em] text-muted font-sans">
                    {c.sidebar.partner}
                  </span>
                  <span className="block text-[15px] text-ink font-sans">{orgInfo.partnerSite}</span>
                </span>
              </a>
              <a
                href={orgInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 py-4"
              >
                <span className="w-8 h-8 bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <TbBrandWhatsapp size={14} color="#fff" />
                </span>
                <span>
                  <span className="block text-[12px] uppercase tracking-[0.12em] text-muted font-sans">
                    {c.sidebar.whatsapp}
                  </span>
                  <span className="block text-[15px] text-ink font-sans">{orgInfo.whatsapp}</span>
                </span>
              </a>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <div className="text-[12px] uppercase tracking-[0.12em] text-muted font-sans mb-2">
                {c.sidebar.where}
              </div>
              <div className="text-[15px] text-ink font-sans leading-[1.7]">
                {c.sidebar.locations[0]}
                <br />
                {c.sidebar.locations[1]}
              </div>
            </div>
          </aside>
        </div>
      </ScrollFade>

      <ScrollFade as="section" id="faq" className="bg-white scroll-mt-20">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-9">
            {c.faq.title}
          </h2>
          <div
            ref={faqTabsRef}
            role="tablist"
            aria-label="FAQ categories"
            className="relative flex items-stretch border-b border-border mb-6"
          >
            {faqTabs.map((tab, i) => {
              const isActive = faqTab === tab.id
              return (
                <button
                  key={tab.id}
                  ref={setFaqTabRef(i)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFaqTab(tab.id)}
                  className={[
                    'h-14 px-3 text-[11px] font-medium uppercase tracking-widest font-sans',
                    isActive ? 'text-red' : 'text-muted hover:text-ink',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              )
            })}
            <SlidingUnderlineIndicator {...faqIndicator} />
          </div>
          <div className="border border-border">
            {activeFaqs.map((f, i, arr) => (
              <div
                key={f.q}
                className={[
                  'p-6 md:p-7 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8',
                  i !== arr.length - 1 ? 'border-b border-border' : '',
                ].join(' ')}
              >
                <h3 className="font-serif font-medium text-[20px] text-ink leading-[1.2] md:col-span-1">
                  {f.q}
                </h3>
                <p className="text-[15px] text-muted leading-[1.7] font-sans md:col-span-2">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollFade>
    </>
  )
}
