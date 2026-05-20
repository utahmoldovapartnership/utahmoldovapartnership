import { useEffect, useRef, useState } from 'react'

/**
 * Fades content in on scroll (or on mount when revealOnMount is true).
 */
export default function ScrollFade({
  as: Tag = 'div',
  className = '',
  children,
  revealOnMount = false,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
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
    >
      {children}
    </Tag>
  )
}
