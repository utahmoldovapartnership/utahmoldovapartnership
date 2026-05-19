import { TbArrowRight, TbCheck } from 'react-icons/tb'
import Hero from '../components/Hero.jsx'
import StatsBar from '../components/StatsBar.jsx'
import SectionKicker from '../components/SectionKicker.jsx'
import InternPhotoMarquee from '../components/InternPhotoMarquee.jsx'
import {
  internStats,
  internWhatYouDo,
  internCohortPhotos,
  internWhoFor,
  internSkillsSection,
  internApplySteps,
  orgInfo,
} from '../data/siteContent.js'

const tagColorMap = {
  red: 'text-red',
  blue: 'text-blue',
}

const applyMailto = `mailto:${orgInfo.email}?subject=${encodeURIComponent('Intern Program Application')}&body=${encodeURIComponent(
  'Hi UMBP team,\n\nI would like to apply for the summer intern program.\n\n[Attach your resume and cover letter]\n\n',
)}`

export default function Interns() {
  return (
    <>
      <Hero
        title={
          <>
            Internship abroad?
            <br />
            <em className="italic text-yellow">Yes Please!</em>
          </>
        }
        subtext="Spend a summer working abroad in Chișinău with a small, multidisciplinary team. You find Moldovan businesses, help them grow, and explore neighboring countries on weekends."
        primary={{ label: 'Apply Now', href: '#apply', variant: 'yellow' }}
        secondary={{ label: "See what you'll do", href: '#what-you-do' }}
        backgroundImage="https://static.wixstatic.com/media/a6cdd8_d6163bc3110a467eba5acc96ecd9ae17~mv2.jpg/v1/crop/x_0,y_151,w_1600,h_899/fill/w_1600,h_899,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Our%20Team%20in%20Chisinau%20.jpg"
        backgroundSize="auto 170%"
        imagePosition="22% 68%"
        overlayDirection="horizontal"
      />

      <StatsBar items={internStats} />

      {/* What you'll do */}
      <section id="what-you-do" className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">What you'll do</SectionKicker>
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
            Real work. Real impact.
          </h2>
          <p className="text-[15px] text-muted leading-[1.7] max-w-none mb-9 font-sans">
            {internWhatYouDo.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            {internWhatYouDo.items.map((item, i) => (
              <div
                key={item.title}
                className={[
                  'p-7 border-border',
                  i % 2 === 0 ? 'md:border-r' : '',
                  i < 2 ? 'border-b' : 'border-b md:border-b-0',
                  i === internWhatYouDo.items.length - 1 ? 'border-b-0' : '',
                ].join(' ')}
              >
                <div
                  className={[
                    'text-[11px] uppercase tracking-[0.14em] font-sans font-medium mb-3',
                    tagColorMap[item.tagColor],
                  ].join(' ')}
                >
                  {item.tag}
                </div>
                <h3 className="font-serif font-medium text-[20px] text-ink leading-[1.2] mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-muted leading-[1.65] font-sans">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternPhotoMarquee photos={internCohortPhotos} />

      {/* Who it's for + required skills */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <SectionKicker color="red">Who it's for</SectionKicker>
            <h2 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-5">
              Who thrives here
            </h2>
            {internWhoFor.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-[15px] text-muted leading-[1.7] font-sans mb-4">
                {p}
              </p>
            ))}
            <ul className="mt-2 space-y-2">
              {internWhoFor.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-ink font-sans">
                  <span className="w-4 h-4 bg-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TbCheck size={10} color="#fff" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] text-muted leading-[1.7] font-sans">
              Not sure if you qualify? Reach out anyway. We review every application.
            </p>
          </div>

          <div>
            <SectionKicker color="blue">{internSkillsSection.kicker}</SectionKicker>
            <h2 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-5">
              {internSkillsSection.title}
            </h2>
            <p className="text-[15px] text-muted leading-[1.7] font-sans mb-5">
              {internSkillsSection.intro}
            </p>
            <ul className="space-y-2">
              {internSkillsSection.items.map((skill) => (
                <li key={skill} className="flex items-start gap-3 text-[15px] text-ink font-sans">
                  <span className="w-4 h-4 bg-red flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TbCheck size={10} color="#fff" />
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            <div className="border-b md:border-b-0 md:border-r border-border min-h-[280px] md:min-h-0">
              <img
                src="/apply-summer-program.jpg"
                alt="UMBP intern cohort on the steps in Chișinău"
                className="w-full h-64 md:h-full md:min-h-[420px] object-cover object-[center_35%]"
                loading="lazy"
              />
            </div>
            <div className="p-8 md:p-10">
            <h2 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
              Apply for the summer program
            </h2>
            <p className="text-[15px] text-muted leading-[1.7] font-sans mb-8">
              Ready to spend a summer in Chișinău? Send us an email with your materials and we will get back to you with next steps.
            </p>

            <ol className="space-y-4 mb-8">
              {internApplySteps.map((step, i) => (
                <li key={step} className="flex gap-4 text-[15px] text-ink font-sans">
                  <span className="font-serif font-black text-[24px] text-blue leading-none flex-shrink-0 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pt-0.5 leading-[1.65]">{step}</span>
                </li>
              ))}
            </ol>

            <a
              href={applyMailto}
              className="inline-flex items-center gap-2 bg-yellow text-ink px-6 py-3 font-sans font-medium text-[12px] uppercase tracking-[0.08em] hover:bg-yellow/90"
            >
              Send application by email
              <TbArrowRight size={14} />
            </a>

            <p className="text-[13px] text-[#9ca3af] mt-4 font-sans">
              {orgInfo.email}
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
              Business partner
            </span>
            <span className="w-px h-4 bg-white/30" />
            <span className="text-[14px] text-white/85 font-sans">Macco — Chișinău, Moldova</span>
          </div>
        </div>
      </section>
    </>
  )
}
