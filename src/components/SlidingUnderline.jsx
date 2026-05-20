import { useCallback, useRef, useState } from 'react'
import useIsomorphicLayoutEffect from '../utils/useIsomorphicLayoutEffect.js'

export function SlidingUnderlineIndicator({ left, width, visible = true }) {
  return (
    <span
      aria-hidden
      className="absolute bottom-0 h-0.5 bg-red pointer-events-none ease-out"
      style={{
        left,
        width,
        opacity: visible ? 1 : 0,
        transition: 'left 0.3s ease, width 0.3s ease',
      }}
    />
  )
}

export function useSlidingUnderline(activeIndex) {
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })

  const setItemRef = useCallback(
    (index) => (el) => {
      itemRefs.current[index] = el
    },
    [],
  )

  const update = useCallback(() => {
    const container = containerRef.current
    const el = itemRefs.current[activeIndex]
    if (!container || !el || activeIndex < 0) return

    const containerRect = container.getBoundingClientRect()
    const rect = el.getBoundingClientRect()
    setIndicator({
      left: rect.left - containerRect.left,
      width: rect.width,
      visible: true,
    })
  }, [activeIndex])

  useIsomorphicLayoutEffect(() => {
    update()

    const container = containerRef.current
    if (!container) return undefined

    const observer = new ResizeObserver(update)
    observer.observe(container)
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [update])

  return { containerRef, setItemRef, indicator, update }
}
