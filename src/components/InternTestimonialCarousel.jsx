import { useCallback, useEffect, useRef, useState } from 'react'

const INITIAL_HOLD_MS = 1200
const AUTO_ADVANCE_MS = 6500
const TRANSITION_MS = 500

const THEME_BG = {
  red: 'bg-red',
  blue: 'bg-blue',
  ink: 'bg-ink',
}

function isForwardAdjacent(from, to, total) {
  return (from + 1) % total === to
}

function isBackwardAdjacent(from, to, total) {
  return (from - 1 + total) % total === to
}

function logicalIndex(position, total) {
  if (total <= 0) return 0
  return position >= total ? 0 : position
}

function QuoteText({ text, emphasis }) {
  if (!emphasis || !text.includes(emphasis)) {
    return <>{text}</>
  }
  const idx = text.indexOf(emphasis)
  const before = text.slice(0, idx)
  const after = text.slice(idx + emphasis.length)
  return (
    <>
      {before}
      <em className="not-italic font-serif font-medium text-yellow italic">{emphasis}</em>
      {after}
    </>
  )
}

export default function InternTestimonialCarousel({ quotes }) {
  const count = quotes?.length ?? 0
  const slides = count > 0 ? [...quotes, quotes[0]] : []
  const [position, setPosition] = useState(0)
  const [instantJump, setInstantJump] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const intervalRef = useRef(null)
  const indexRef = useRef(0)
  const loopResetRef = useRef(false)

  const activeIndex = logicalIndex(position, count)

  useEffect(() => {
    indexRef.current = activeIndex
  }, [activeIndex])

  const snapTo = useCallback((target) => {
    setInstantJump(true)
    setPosition(target)
  }, [])

  const goTo = useCallback(
    (next) => {
      if (count === 0) return
      const target = ((next % count) + count) % count
      const current = indexRef.current
      if (current === target) return

      if (isForwardAdjacent(current, target, count)) {
        if (current === count - 1 && target === 0) {
          setPosition(count)
        } else {
          setPosition(target)
        }
        return
      }

      if (
        isBackwardAdjacent(current, target, count) &&
        !(current === 0 && target === count - 1)
      ) {
        setPosition(target)
        return
      }

      snapTo(target)
    },
    [count, snapTo],
  )

  const advance = useCallback(() => {
    if (count <= 1) return
    if (reduceMotion) {
      setPosition((p) => (logicalIndex(p, count) + 1) % count)
      return
    }
    setPosition((p) => {
      if (p < count - 1) return p + 1
      if (p === count - 1) return count
      return p
    })
  }, [count, reduceMotion])

  useEffect(() => {
    if (!instantJump) return undefined
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setInstantJump(false))
    })
    return () => cancelAnimationFrame(id)
  }, [position, instantJump])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (count <= 1 || paused || reduceMotion) return undefined

    const startDelay = window.setTimeout(() => {
      intervalRef.current = window.setInterval(advance, AUTO_ADVANCE_MS)
    }, INITIAL_HOLD_MS)

    return () => {
      window.clearTimeout(startDelay)
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [count, paused, reduceMotion, advance])

  const handleTrackTransitionEnd = useCallback(
    (event) => {
      if (
        event.propertyName !== 'transform' ||
        position !== count ||
        loopResetRef.current
      ) {
        return
      }
      loopResetRef.current = true
      snapTo(0)
      loopResetRef.current = false
    },
    [count, position, snapTo],
  )

  if (!count) return null

  const slideTransform = `translateX(-${position * 100}%)`
  const animateSlide = !reduceMotion && !instantJump
  const transitionStyle = animateSlide
    ? { transitionDuration: `${TRANSITION_MS}ms` }
    : undefined
  const transitionClass = animateSlide ? 'transition-transform ease-in-out' : ''

  return (
    <section
      className="relative border-b border-[#1f1f1f] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Past intern testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background colors slide in sync with the quote track */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className={['flex h-full', transitionClass].join(' ')}
          style={{
            transform: slideTransform,
            ...transitionStyle,
          }}
        >
          {slides.map((item, i) => (
            <div
              key={`bg-${i}`}
              className={[
                'w-full flex-shrink-0 h-full',
                THEME_BG[item.theme] ?? THEME_BG.red,
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 py-10 md:py-12">
        <div className="relative overflow-hidden w-full">
          <div
            className={['flex', transitionClass].join(' ')}
            style={{
              transform: slideTransform,
              ...transitionStyle,
            }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {slides.map((item, i) => (
              <article
                key={`testimonial-${i}`}
                className="w-full flex-shrink-0 min-h-[180px] md:min-h-[200px] flex flex-col justify-center"
                aria-hidden={i !== position}
              >
                <div className="mx-auto max-w-[1180px] px-6 md:px-10 w-full">
                  <blockquote className="font-serif font-medium italic text-white text-[28px] sm:text-[36px] md:text-[44px] leading-[1.1] tracking-[-0.5px] w-full max-w-[820px]">
                    “<QuoteText text={item.text} emphasis={item.emphasis} />”
                  </blockquote>
                  <footer className="mt-8 pt-6 border-t border-white/20 flex items-center gap-4 w-full">
                    <span className="text-[12px] uppercase tracking-[0.12em] text-yellow font-sans font-medium">
                      {item.tag ?? 'Past intern'}
                    </span>
                    <span className="w-px h-4 bg-white/30" aria-hidden />
                    <span className="text-[14px] text-white/85 font-sans">
                      {item.name} · {item.detail}
                    </span>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="mx-auto max-w-[1180px] px-6 md:px-10 mt-6 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Testimonial slides"
        >
          {quotes.map((_, i) => {
            const active = i === activeIndex
            return (
              <button
                key={`dot-${i}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Show testimonial ${i + 1} of ${count}`}
                onClick={() => goTo(i)}
                className={[
                  'h-2 w-2 border border-white/40 transition-colors',
                  active ? 'bg-yellow border-yellow' : 'bg-transparent hover:bg-white/30',
                ].join(' ')}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
