import { useState } from 'react'
import { TbArrowRight, TbBrandWhatsapp, TbCheck, TbMail, TbWorld } from 'react-icons/tb'
import Hero from '../components/Hero.jsx'
import SectionKicker from '../components/SectionKicker.jsx'
import { contactPaths, orgInfo } from '../data/siteContent.js'

const tagColorMap = {
  red: 'bg-red text-white',
  blue: 'bg-blue text-white',
  yellow: 'bg-yellow text-ink',
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    audience: 'business',
    message: '',
  })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const subjectMap = {
      business: 'Free Consulting Inquiry',
      intern: 'Intern Program Inquiry',
      partner: 'Partnership Inquiry',
      general: 'General Inquiry',
    }
    const subject = encodeURIComponent(subjectMap[form.audience] || 'Inquiry')
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
            Let’s build
            <br />
            something <em className="italic text-white">together</em>
          </>
        }
        subtext="Whether you run a business in Moldova, want to intern with us, or want to support the partnership — start here. We read every message."
        primary={{ label: 'Email the program', href: `mailto:${orgInfo.email}` }}
        secondary={{ label: 'See FAQ', href: '#faq' }}
        backgroundImage="https://images.pexels.com/photos/11185859/pexels-photo-11185859.jpeg?auto=compress&cs=tinysrgb&w=2400"
        overlayDirection="vertical-strong"
      />

      {/* Audience paths */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">Choose your path</SectionKicker>
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
            Who are you
            <br />
            reaching out as?
          </h2>
          <p className="text-[15px] text-muted leading-[1.7] max-w-[520px] mb-9 font-sans">
            Pick the path that fits you best. Each one goes to the same team — it just helps us route your message faster.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            {contactPaths.map((p, i) => (
              <div
                key={p.title}
                className={[
                  'p-7 border-border',
                  i % 2 === 0 ? 'md:border-r' : '',
                  i < 2 ? 'border-b' : '',
                  i === contactPaths.length - 1 ? 'border-b-0' : '',
                ].join(' ')}
              >
                <span
                  className={`inline-block text-[12px] uppercase tracking-[0.08em] font-medium px-2 py-[3px] mb-3 ${tagColorMap[p.tagColor]}`}
                >
                  {p.tag}
                </span>
                <h3 className="font-serif font-medium text-[22px] text-ink leading-[1.15] mb-2">
                  {p.title}
                </h3>
                <p className="text-[14px] text-muted leading-[1.65] font-sans mb-4">
                  {p.text}
                </p>
                <a
                  href={`mailto:${orgInfo.email}?subject=${encodeURIComponent(p.subject)}`}
                  className="inline-flex items-center gap-2 border-b border-ink pb-1 text-[12px] uppercase tracking-wider text-ink font-sans font-medium"
                >
                  {p.cta} <TbArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Direct contact */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          <div className="md:col-span-2 p-7 md:p-10 border-b md:border-b-0 md:border-r border-border">
            <SectionKicker color="blue">Send a message</SectionKicker>
            <h3 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
              Tell us about your project
            </h3>
            <p className="text-[15px] text-muted leading-[1.65] font-sans mb-6 max-w-[460px]">
              Short and direct is fine. We will reply by email within a few business days.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col md:flex-row">
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="flex-1 border border-border md:border-r-0 px-4 py-3 text-[15px] text-ink font-sans bg-white focus:border-red"
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="flex-1 border border-border -mt-px md:mt-0 md:border-l-0 px-4 py-3 text-[15px] text-ink font-sans bg-white focus:border-red"
                />
              </div>

              <input
                type="text"
                placeholder="Company or organization (optional)"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="-mt-px border border-border px-4 py-3 text-[15px] text-ink font-sans bg-white focus:border-red"
              />

              <div className="-mt-px border border-border px-4 py-3 text-[14px] text-muted font-sans bg-white flex flex-wrap gap-x-6 gap-y-2 items-center">
                <span className="text-[12px] uppercase tracking-[0.12em] text-ink font-medium">
                  I am
                </span>
                {[
                  { id: 'business', label: 'A business in Moldova' },
                  { id: 'intern', label: 'A prospective intern' },
                  { id: 'partner', label: 'A partner or donor' },
                  { id: 'general', label: 'Something else' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className="inline-flex items-center gap-2 cursor-pointer text-[14px] text-ink"
                  >
                    <input
                      type="radio"
                      name="audience"
                      value={opt.id}
                      checked={form.audience === opt.id}
                      onChange={(e) => setForm({ ...form, audience: e.target.value })}
                      className="appearance-none w-4 h-4 border border-border bg-white checked:bg-red checked:border-red"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              <textarea
                required
                rows={6}
                placeholder="Tell us a bit about your business, project, or question."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="-mt-px border border-border px-4 py-3 text-[15px] text-ink font-sans bg-white focus:border-red resize-none"
              />

              <button
                type="submit"
                className="-mt-px w-full bg-red text-white py-4 font-sans font-medium text-[12px] uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2"
              >
                {sent ? 'Opening your email client…' : 'Send message'} <TbArrowRight size={14} />
              </button>

              <p className="text-[13px] text-[#9ca3af] mt-3 font-sans inline-flex items-center gap-2">
                <TbCheck size={12} /> We use your email only to reply. No newsletters.
              </p>
            </form>
          </div>

          <aside className="p-7 md:p-10">
            <h3 className="font-serif font-medium text-[22px] md:text-[26px] leading-[1.0] tracking-[-0.5px] text-ink mb-4">
              Reach us
              <br />
              directly
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
                  <span className="block text-[12px] uppercase tracking-[0.12em] text-muted font-sans">Email</span>
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
                  <span className="block text-[12px] uppercase tracking-[0.12em] text-muted font-sans">Local Partner</span>
                  <span className="block text-[15px] text-ink font-sans">{orgInfo.partnerSite}</span>
                </span>
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 py-4"
              >
                <span className="w-8 h-8 bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <TbBrandWhatsapp size={14} color="#fff" />
                </span>
                <span>
                  <span className="block text-[12px] uppercase tracking-[0.12em] text-muted font-sans">WhatsApp</span>
                  <span className="block text-[15px] text-ink font-sans">+373 000 000 000</span>
                </span>
              </a>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <div className="text-[12px] uppercase tracking-[0.12em] text-muted font-sans mb-2">
                Where we work
              </div>
              <div className="text-[15px] text-ink font-sans leading-[1.7]">
                Chișinău, Moldova<br />
                Salt Lake City, Utah
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white scroll-mt-20">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">Frequently Asked Questions</SectionKicker>
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-9">
            Before you write in
          </h2>
          <div className="border border-border">
            {[
              {
                q: 'Do you charge for consulting?',
                a: 'No. Every engagement is free for the Moldovan business. We are funded by our partners and donors.',
              },
              {
                q: 'Do I need to be a big company to qualify?',
                a: 'No. Most of the businesses we have worked with are small or growing — start-ups, SMEs, retailers, and service companies.',
              },
              {
                q: 'Where does the work happen?',
                a: 'Teams are based in Chișinău and meet with host companies in person and remotely throughout the program.',
              },
              {
                q: 'When should interns apply?',
                a: 'We review applications on a rolling basis for the summer cohort. Earlier is better, especially if you need to plan travel.',
              },
            ].map((f, i, arr) => (
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
      </section>
    </>
  )
}
