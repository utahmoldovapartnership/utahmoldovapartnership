import { useEffect, useRef } from 'react'
import ScrollFade from './ScrollFade.jsx'
import SectionKicker from './SectionKicker.jsx'

const PARALLAX_FACTOR = 0.42

export default function Hero({
  kicker,
  kickerColor = 'red',
  title,
  subtext,
  primary,
  secondary,
  /** @deprecated Use `image` — kept for compatibility */
  backgroundImage,
  image,
  imageCredit,
  imagePosition = 'center',
  backgroundSize = 'cover',
  overlayDirection = 'vertical',
}) {
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const backgroundUrl = backgroundImage ?? image?.src
  const hasImage = Boolean(backgroundUrl)

  useEffect(() => {
    const section = sectionRef.current
    const media = mediaRef.current
    if (!section || !media || !hasImage) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    let ticking = false

    function updateParallax() {
      const { top, height } = section.getBoundingClientRect()
      const scrollProgress = Math.min(Math.max(-top, 0), height)
      const offset = scrollProgress * PARALLAX_FACTOR
      media.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        updateParallax()
        ticking = false
      })
    }

    updateParallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [hasImage])

  const overlay =
    overlayDirection === 'horizontal'
      ? 'linear-gradient(90deg, rgba(13,13,13,1) 0%, rgba(13,13,13,1) 25%, rgba(13,13,13,0.7) 45%, rgba(13,13,13,0.15) 75%, rgba(13,13,13,0.0) 100%)'
      : overlayDirection === 'vertical-strong'
        ? 'linear-gradient(180deg, rgba(13,13,13,0.50) 0%, rgba(13,13,13,0.65) 55%, rgba(13,13,13,0.90) 100%)'
        : overlayDirection === 'vertical-medium'
          ? 'linear-gradient(180deg, rgba(13,13,13,0.32) 0%, rgba(13,13,13,0.48) 55%, rgba(13,13,13,0.78) 100%)'
          : 'linear-gradient(180deg, rgba(13,13,13,0.20) 0%, rgba(13,13,13,0.40) 55%, rgba(13,13,13,0.75) 100%)'

  const fullBleedStyle = {
    backgroundImage: `url(${backgroundUrl})`,
    backgroundPosition: imagePosition,
    backgroundSize,
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink border-b border-[#1f1f1f] overflow-hidden"
    >
      {hasImage && (
        <>
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <div
              ref={mediaRef}
              className="absolute left-0 right-0 -top-[12%] h-[124%] will-change-transform"
              style={fullBleedStyle}
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: overlay }}
          />
        </>
      )}
      <ScrollFade
        revealOnMount
        className="relative mx-auto max-w-[1180px] px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20"
      >
        {kicker && (
          <div
            className={[
              'mb-6 flex items-center gap-[12px] text-[12px] font-sans font-medium uppercase tracking-[0.18em]',
              kickerColor === 'yellow'
                ? 'text-yellow'
                : kickerColor === 'white'
                  ? 'text-white'
                  : 'text-red',
            ].join(' ')}
          >
            <span
              className={[
                'inline-block w-6 h-px',
                kickerColor === 'yellow'
                  ? 'bg-yellow'
                  : kickerColor === 'white'
                    ? 'bg-white'
                    : 'bg-red',
              ].join(' ')}
            />
            <span>{kicker}</span>
          </div>
        )}
        <h1 className="font-serif font-medium italic text-white text-[44px] sm:text-[56px] md:text-[72px] leading-[1.1] tracking-[-1px] max-w-[820px]">
          {title}
        </h1>
        <div className="w-full h-px bg-white/15 my-8" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="text-[16px] md:text-[17px] text-white/80 leading-[1.7] max-w-[480px] font-sans">
            {subtext}
          </p>
          <div className="flex flex-wrap">
            {primary && (
              <a
                href={primary.href}
                className={[
                  'px-7 py-3 font-sans font-medium text-[12px] uppercase tracking-wider cursor-pointer inline-flex items-center',
                  primary.variant === 'yellow'
                    ? 'bg-yellow text-ink'
                    : 'bg-red text-white',
                ].join(' ')}
              >
                {primary.label}
              </a>
            )}
            {secondary && (
              <a
                href={secondary.href}
                className="-ml-px px-7 py-3 border border-white/25 text-white font-sans font-medium text-[12px] uppercase tracking-wider inline-flex items-center"
              >
                {secondary.label}
              </a>
            )}
          </div>
        </div>
        {imageCredit && (
          <div className="relative mt-10 text-[10px] uppercase tracking-[0.14em] text-white/40 font-sans">
            {imageCredit}
          </div>
        )}
      </ScrollFade>
    </section>
  )
}

export { SectionKicker }
