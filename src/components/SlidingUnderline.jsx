import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import useIsomorphicLayoutEffect from '../utils/useIsomorphicLayoutEffect.js'

export function SlidingUnderlineIndicator({ indicatorRef, left, width, animate = false }) {
  return (
    <span
      ref={indicatorRef}
      aria-hidden
      className="absolute bottom-0 left-0 h-0.5 bg-red pointer-events-none"
      style={{
        width,
        transform: `translateX(${left}px)`,
        opacity: width > 0 ? 1 : 0,
        transition: animate
          ? 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
          : 'none',
        willChange: animate ? 'transform, width' : 'auto',
      }}
    />
  )
}

export function useSlidingUnderline(activeIndex) {
  const containerRef = useRef(null)
  const indicatorRef = useRef(null)
  const itemRefs = useRef([])
  const prevIndexRef = useRef(activeIndex)
  const readyRef = useRef(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, animate: false })

  const measure = useCallback((index) => {
    const container = containerRef.current
    const el = itemRefs.current[index]
    if (!container || !el || index < 0) return null

    const containerRect = container.getBoundingClientRect()
    const rect = el.getBoundingClientRect()
    return {
      left: rect.left - containerRect.left,
      width: rect.width,
    }
  }, [])

  const setPosition = useCallback((metrics, animate) => {
    if (!metrics) return
    setIndicator({ ...metrics, animate })
  }, [])

  const runSlide = useCallback(
    (fromIndex, toIndex) => {
      const from = measure(fromIndex)
      const to = measure(toIndex)
      if (!to) return

      if (!from || fromIndex === toIndex) {
        setPosition(to, false)
        return
      }

      flushSync(() => {
        setPosition(from, false)
      })
      void indicatorRef.current?.offsetWidth

      requestAnimationFrame(() => {
        setPosition(to, true)
      })
    },
    [measure, setPosition],
  )

  useIsomorphicLayoutEffect(() => {
    if (!readyRef.current) {
      readyRef.current = true
      const metrics = measure(activeIndex)
      if (metrics) setPosition(metrics, false)
      prevIndexRef.current = activeIndex
    }

    const container = containerRef.current
    if (!container) return undefined

    const onResize = () => {
      const metrics = measure(activeIndex)
      if (metrics) setPosition(metrics, false)
    }

    const observer = new ResizeObserver(onResize)
    observer.observe(container)
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    window.addEventListener('resize', onResize)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [activeIndex, measure, setPosition])

  useEffect(() => {
    if (!readyRef.current) return
    if (prevIndexRef.current === activeIndex) return

    runSlide(prevIndexRef.current, activeIndex)
    prevIndexRef.current = activeIndex
  }, [activeIndex, runSlide])

  return {
    containerRef,
    indicatorRef,
    setItemRef: useCallback((index) => (el) => {
      itemRefs.current[index] = el
    }, []),
    indicator,
    update: () => {
      const metrics = measure(activeIndex)
      if (metrics) setPosition(metrics, false)
    },
  }
}
