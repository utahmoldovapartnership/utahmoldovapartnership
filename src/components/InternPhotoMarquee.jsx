import { useEffect, useRef } from 'react'

const LOOP_DURATION_SEC = 60
const EASE = 0.04

/**
 * Infinite horizontal scroll of square cohort photos.
 * Add images to `internCohortPhotos` in siteContent.js (place files in /public).
 */
export default function InternPhotoMarquee({ photos }) {
  const trackRef = useRef(null)
  const positionRef = useRef(0)
  const speedRef = useRef(0)
  const targetSpeedRef = useRef(0)
  const normalSpeedRef = useRef(0)
  const halfWidthRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || !photos?.length) return

    const updateMetrics = () => {
      halfWidthRef.current = track.scrollWidth / 2
      normalSpeedRef.current =
        halfWidthRef.current > 0 ? halfWidthRef.current / LOOP_DURATION_SEC / 60 : 0

      if (targetSpeedRef.current > 0) {
        targetSpeedRef.current = normalSpeedRef.current
      }
    }

    const tick = () => {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * EASE

      if (Math.abs(speedRef.current) > 0.001) {
        positionRef.current -= speedRef.current
        const half = halfWidthRef.current
        if (half > 0) {
          while (positionRef.current <= -half) positionRef.current += half
          while (positionRef.current > 0) positionRef.current -= half
        }
        track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const start = () => {
      updateMetrics()
      targetSpeedRef.current = normalSpeedRef.current
      speedRef.current = normalSpeedRef.current
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }

    const images = track.querySelectorAll('img')
    let pending = images.length

    if (pending === 0) {
      start()
    } else {
      const onImageReady = () => {
        pending -= 1
        if (pending <= 0) start()
      }
      images.forEach((img) => {
        if (img.complete) onImageReady()
        else {
          img.addEventListener('load', onImageReady)
          img.addEventListener('error', onImageReady)
        }
      })
    }

    const ro = new ResizeObserver(updateMetrics)
    ro.observe(track)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [photos])

  if (!photos?.length) return null

  const items = [...photos, ...photos]

  function handlePointerEnter() {
    targetSpeedRef.current = 0
  }

  function handlePointerLeave() {
    targetSpeedRef.current = normalSpeedRef.current
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div
          className="relative border-l border-r border-border overflow-hidden"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <div ref={trackRef} className="flex w-max will-change-transform">
            {items.map((photo, i) => (
              <div
                key={`${photo.src}-${i}`}
                className="flex-shrink-0 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] overflow-hidden bg-[#f3f4f6]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
