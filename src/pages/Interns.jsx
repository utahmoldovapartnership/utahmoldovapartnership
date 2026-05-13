import { useState } from 'react'
import { TbCheck, TbArrowRight } from 'react-icons/tb'
import Hero from '../components/Hero.jsx'
import StatsBar from '../components/StatsBar.jsx'
import SectionKicker from '../components/SectionKicker.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'
import {
  internStats,
  internTimeline,
  internChecklist,
  internDeliverables,
  internWhoFor,
  orgInfo,
} from '../data/siteContent.js'

const checkColorMap = {
  red: 'bg-red',
  blue: 'bg-blue',
}

export default function Interns() {
  const [form, setForm] = useState({ name: '', email: '' })

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent('Intern Program Application')
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nHi UMBP team — I'd like to apply for the summer intern program.`,
    )
    window.location.href = `mailto:${orgInfo.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <Hero
        kicker="Intern Program"
        kickerColor="yellow"
        title={
          <>
            Work inside a real company.
            <br />
            Deliver <em className="italic text-yellow">results.</em>
          </>
        }
        subtext="Spend a summer in Chișinău embedded with a local business, doing strategy, marketing, research, and operations work that actually matters."
        primary={{ label: 'Apply Now', href: '#apply', variant: 'yellow' }}
        secondary={{ label: 'Read the Timeline', href: '#timeline' }}
        backgroundImage="https://static.wixstatic.com/media/a6cdd8_d6163bc3110a467eba5acc96ecd9ae17~mv2.jpg/v1/crop/x_0,y_151,w_1600,h_899/fill/w_1600,h_899,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Our%20Team%20in%20Chisinau%20.jpg"
        backgroundSize="auto 170%"
        imagePosition="22% 68%"
        overlayDirection="horizontal"
      />

      <StatsBar items={internStats} />

      {/* Timeline */}
      <section id="timeline" className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">What you'll do</SectionKicker>
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
            Real work.
            <br />
            Real impact.
          </h2>
          <p className="text-[15px] text-muted leading-[1.7] max-w-[520px] mb-9 font-sans">
            You won't be making coffee. Each intern leads a consulting project from discovery through final presentation.
          </p>

          <div>
            {internTimeline.map((step, i) => (
              <div
                key={step.step}
                className={[
                  'flex',
                  i !== internTimeline.length - 1 ? 'border-b border-border' : '',
                ].join(' ')}
              >
                <div className="w-[110px] md:w-[140px] flex-shrink-0 border-r border-border py-6 pr-5">
                  <div className="font-serif font-black text-[28px] text-[#9ca3af] leading-none">
                    {step.step}
                  </div>
                  <div
                    className={[
                      'mt-1 text-[12px] uppercase tracking-[0.1em] font-sans font-medium',
                      step.phaseColor === 'blue' ? 'text-blue' : 'text-red',
                    ].join(' ')}
                  >
                    {step.phase}
                  </div>
                </div>
                <div className="flex-1 py-6 pl-6">
                  <h3 className="font-serif font-medium text-[20px] text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-muted leading-[1.65] font-sans">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables + who it's for */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <SectionKicker color="blue">Project deliverables</SectionKicker>
            <h2 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-5">
              The kind of work
              <br />
              you'll ship
            </h2>
            <ul className="border border-border">
              {internDeliverables.map((d, i) => (
                <li
                  key={d}
                  className={[
                    'flex items-center gap-3 px-4 py-3 text-[15px] text-ink font-sans',
                    i !== internDeliverables.length - 1 ? 'border-b border-border' : '',
                  ].join(' ')}
                >
                  <span className="w-4 h-4 bg-red flex items-center justify-center flex-shrink-0">
                    <TbCheck size={10} color="#fff" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionKicker color="red">Who it's for</SectionKicker>
            <h2 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-5">
              Driven students
              <br />
              and recent grads
            </h2>
            <ul className="border border-border">
              {internWhoFor.map((d, i) => (
                <li
                  key={d}
                  className={[
                    'flex items-center gap-3 px-4 py-3 text-[15px] text-ink font-sans',
                    i !== internWhoFor.length - 1 ? 'border-b border-border' : '',
                  ].join(' ')}
                >
                  <span className="w-4 h-4 bg-blue flex items-center justify-center flex-shrink-0">
                    <TbCheck size={10} color="#fff" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[15px] text-muted leading-[1.7] font-sans">
              Not sure if you qualify? Reach out anyway. We have placed students from a wide range of backgrounds and the right fit matters more than a specific major.
            </p>
          </div>
        </div>
      </section>

      {/* Intern life photos */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">A summer in Chișinău</SectionKicker>
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-9">
            More than
            <br />
            an internship
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PhotoPlaceholder label="Working session" caption="Replace with photo of interns and host company team." />
            <PhotoPlaceholder label="City life" caption="Replace with photo of life in Chișinău." />
            <PhotoPlaceholder label="Final presentation" caption="Replace with photo from the final presentation." />
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="blue">How to apply</SectionKicker>
          <div className="border border-border">
            <div className="p-8 md:p-9 border-b border-border">
              <h3 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
                Apply for the
                <br />
                summer program
              </h3>
              <p className="text-[15px] text-muted leading-[1.65] max-w-[480px] font-sans">
                Driven students and recent grads in business, marketing, finance, IT, or related fields who want to do meaningful work abroad.
              </p>
            </div>

            <div className="p-6 md:p-9">
              <div className="grid grid-cols-1 md:grid-cols-2 border border-border mb-6">
                {internChecklist.map((c, i) => (
                  <div
                    key={c.label}
                    className={[
                      'flex items-center gap-3 px-4 py-3 text-[14px] text-[#374151] font-sans border-border',
                      i % 2 === 0 ? 'md:border-r' : '',
                      i < 2 ? 'border-b md:border-b' : '',
                      i === internChecklist.length - 1 ? 'border-b-0' : 'border-b md:border-b-0',
                      i === 2 ? 'border-b md:border-b-0' : '',
                    ].join(' ')}
                  >
                    <span
                      className={`w-4 h-4 ${checkColorMap[c.color]} flex items-center justify-center flex-shrink-0`}
                    >
                      <TbCheck size={10} color="#fff" />
                    </span>
                    {c.label}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
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
                <button
                  type="submit"
                  className="-mt-px w-full bg-red text-white py-3 font-sans font-medium text-[12px] uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2"
                >
                  Send Application <TbArrowRight size={14} />
                </button>
              </form>

              <p className="text-[13px] text-[#9ca3af] mt-3 font-sans">
                Or email:{' '}
                <a className="text-ink hover:text-red" href={`mailto:${orgInfo.email}`}>
                  {orgInfo.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="bg-red">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-16 md:py-20">
          <div className="font-serif font-medium italic text-white text-[28px] sm:text-[36px] md:text-[44px] leading-[1.1] tracking-[-0.5px] max-w-[820px]">
            “Sometimes you need to do the things you don't want to do, but{' '}
            <em className="not-italic font-serif font-medium text-yellow italic">need to do</em>
            {' '}because the moment requires it.”
          </div>
          <div className="mt-8 pt-6 border-t border-white/20 flex items-center gap-4">
            <span className="text-[12px] uppercase tracking-[0.12em] text-yellow font-sans font-medium">
              Host Company
            </span>
            <span className="w-px h-4 bg-white/30" />
            <span className="text-[14px] text-white/85 font-sans">Macco — Chișinău, Moldova</span>
          </div>
        </div>
      </section>
    </>
  )
}
