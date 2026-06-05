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
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (hasSeenPage(window.location.pathname)) {
      setVisible(true)
      return undefined
    }

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
  }, [revealOnMount])

  return (
    <Tag
      ref={ref}
      className={['scroll-reveal', visible && 'scroll-reveal--visible', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
