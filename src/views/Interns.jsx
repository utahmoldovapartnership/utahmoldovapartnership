import { TbArrowRight, TbCheck } from 'react-icons/tb'
import Hero from '../components/Hero.jsx'
import OptimizedImage from '../components/OptimizedImage.jsx'
import { pageHeroImages } from '../data/heroImages.js'
import StatsBar from '../components/StatsBar.jsx'
import SectionKicker from '../components/SectionKicker.jsx'
import InternPhotoMarquee from '../components/InternPhotoMarquee.jsx'
import ScrollFade from '../components/ScrollFade.jsx'
import { applySummerProgramImage } from '../data/staticImages.generated.js'
import { getSiteData } from '../i18n/getSiteData.js'

const tagColorMap = {
  red: 'text-red',
  blue: 'text-blue',
}

export default function Interns({ locale = 'en' }) {
  const d = getSiteData(locale)
  const {
    ui,
    orgInfo,
    internStats,
    internWhatYouDo,
    internCohortPhotos,
    internWhoFor,
    internSkillsSection,
    internApplySteps,
  } = d
  const i = ui.interns

  const applyMailto = `mailto:${orgInfo.email}?subject=${encodeURIComponent(i.apply.mailSubject)}&body=${encodeURIComponent(i.apply.mailBody)}`

  return (
    <>
      <Hero
        title={
          <>
            {i.hero.titleLine1}
            <br />
            <em className="italic text-yellow">{i.hero.titleEmphasis}</em>
          </>
        }
        subtext={i.hero.subtext}
        primary={{ label: i.hero.primary, href: '#apply', variant: 'yellow' }}
        secondary={{ label: i.hero.secondary, href: '#what-you-do' }}
        image={pageHeroImages.interns}
        overlayDirection="vertical"
      />

      <StatsBar items={internStats} />

      <ScrollFade as="section" id="what-you-do" className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">{i.whatYouDo.kicker}</SectionKicker>
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
            {i.whatYouDo.title}
          </h2>
          <p className="text-[15px] text-muted leading-[1.7] max-w-none mb-9 font-sans">
            {internWhatYouDo.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            {internWhatYouDo.items.map((item, idx) => (
              <div
                key={item.title}
                className={[
                  'p-7 border-border',
                  idx % 2 === 0 ? 'md:border-r' : '',
                  idx < 2 ? 'border-b' : 'border-b md:border-b-0',
                  idx === internWhatYouDo.items.length - 1 ? 'border-b-0' : '',
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
      </ScrollFade>

      <InternPhotoMarquee photos={internCohortPhotos} />

      <ScrollFade as="section" className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <SectionKicker color="red">{i.whoFor.kicker}</SectionKicker>
            <h2 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-5">
              {i.whoFor.title}
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
            <p className="mt-6 text-[15px] text-muted leading-[1.7] font-sans">{i.whoFor.closing}</p>
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
      </ScrollFade>

      <ScrollFade as="section" id="apply" className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            <div className="group border-b md:border-b-0 md:border-r border-border min-h-[280px] md:min-h-0 bg-white overflow-hidden">
              <OptimizedImage
                src={applySummerProgramImage?.src ?? '/apply-summer-program-1200w.webp'}
                srcSet={applySummerProgramImage?.srcSet}
                sizes={applySummerProgramImage?.sizes}
                alt={i.apply.imageAlt}
                width={applySummerProgramImage?.width ?? 1200}
                height={applySummerProgramImage?.height ?? 900}
                className="w-full h-64 md:h-full md:min-h-[420px] object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-8 md:p-10">
              <h2 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
                {i.apply.title}
              </h2>
              <p className="text-[15px] text-muted leading-[1.7] font-sans mb-8">{i.apply.intro}</p>

              <ol className="space-y-4 mb-8">
                {internApplySteps.map((step, idx) => (
                  <li key={step} className="flex gap-4 text-[15px] text-ink font-sans">
                    <span className="font-serif font-black text-[24px] text-blue leading-none flex-shrink-0 w-8">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="pt-0.5 leading-[1.65]">{step}</span>
                  </li>
                ))}
              </ol>

              <a
                href={applyMailto}
                className="inline-flex items-center gap-2 bg-yellow text-ink px-6 py-3 font-sans font-medium text-[12px] uppercase tracking-[0.08em] hover:bg-yellow/90"
              >
                {i.apply.cta}
                <TbArrowRight size={14} />
              </a>

              <p className="text-[13px] text-[#9ca3af] mt-4 font-sans">{orgInfo.email}</p>
            </div>
          </div>
        </div>
      </ScrollFade>
    </>
  )
}
