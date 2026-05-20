import { useEffect, useRef, useState } from 'react'
import { hasSeenPage } from '../utils/pageAnimations.js'

/**
 * Fades content in on scroll (or on mount when revealOnMount is true).
 * Runs once per page per session; revisiting a page skips animations.
 */
export default function ScrollFade({
  as: Tag = 'div',
  className = '',
  children,
  revealOnMount = false,
}) {
  const ref = useRef(null)
  const skipAnimations =
    typeof window !== 'undefined' && hasSeenPage(window.location.pathname)
  const [visible, setVisible] = useState(skipAnimations)

  useEffect(() => {
    if (skipAnimations) return undefined

    if (revealOnMount) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      return () => cancelAnimationFrame(id)
    }

    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [revealOnMount, skipAnimations])

  return (
    <Tag
      ref={ref}
      className={['scroll-reveal', visible && 'scroll-reveal--visible', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}
