import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useIsomorphicLayoutEffect from '../utils/useIsomorphicLayoutEffect.js'
import { TbX } from 'react-icons/tb'
import ScrollFade from './ScrollFade.jsx'
import OptimizedImage from './OptimizedImage.jsx'

function InternModal({ intern, closeLabel, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-ink/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intern-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[520px] bg-white border border-border max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white border border-border text-ink hover:border-red hover:text-red"
          aria-label={closeLabel}
        >
          <TbX size={18} />
        </button>

        <OptimizedImage
          src={intern.src ?? intern.image}
          srcSet={intern.srcSet}
          sizes={intern.modalSizes ?? intern.sizes}
          alt={intern.name}
          width={intern.width ?? 520}
          height={intern.height ?? 520}
          loading="eager"
          className="w-full aspect-square object-cover object-center"
        />

        <div className="p-6 md:p-8">
          <h3
            id="intern-modal-title"
            className="font-serif font-medium text-[28px] text-ink leading-[1.1] mb-1"
          >
            {intern.name}
          </h3>
          <p className="text-[12px] uppercase tracking-[0.12em] text-blue font-sans font-medium mb-4">
            {intern.focus}
          </p>
          <p className="text-[15px] text-muted leading-[1.7] font-sans">{intern.bio}</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function DuoInternCard({ intern, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(intern)}
      className="group flex h-full flex-row items-stretch gap-4 md:gap-5 text-left border border-border bg-white p-4 md:p-5 transition-[filter,transform] duration-300 hover:drop-shadow-[0_6px_20px_rgba(13,13,13,0.1)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
    >
      <div className="w-32 md:w-40 shrink-0 self-stretch overflow-hidden bg-white">
        <OptimizedImage
          src={intern.src ?? intern.image}
          srcSet={intern.srcSet}
          sizes="(min-width: 768px) 160px, 128px"
          alt={intern.name}
          width={intern.width ?? 280}
          height={intern.height ?? 280}
          className="w-full h-full min-h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-start p-1 md:p-2">
        <div className="font-serif font-medium text-[18px] text-ink leading-[1.2]">
          {intern.name}
        </div>
        <div className="text-[11px] uppercase tracking-[0.12em] text-blue font-sans font-medium mt-1 mb-2">
          {intern.focus}
        </div>
        <p className="text-[14px] text-muted leading-[1.6] font-sans">
          {intern.bio}
        </p>
      </div>
    </button>
  )
}

function GridInternCard({ intern, onSelect, setItemRef }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(intern)}
      ref={setItemRef}
      className="group flex h-full flex-col text-left border border-border bg-white transition-[filter,transform] duration-300 hover:drop-shadow-[0_6px_20px_rgba(13,13,13,0.1)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
    >
      <div className="aspect-square shrink-0 overflow-hidden bg-white">
        <OptimizedImage
          src={intern.src ?? intern.image}
          srcSet={intern.srcSet}
          sizes={intern.sizes}
          alt={intern.name}
          width={intern.width ?? 400}
          height={intern.height ?? 400}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col px-3 py-3 border-t border-border">
        <div className="font-serif font-medium text-[16px] text-ink leading-[1.2]">
          {intern.name}
        </div>
        <div
          data-intern-focus
          className="text-[12px] text-muted font-sans mt-0.5 leading-[1.35]"
        >
          {intern.focus}
        </div>
      </div>
    </button>
  )
}

export default function MeetInterns({ title = 'Meet the interns', intro, members, closeLabel = 'Close' }) {
  const [selected, setSelected] = useState(null)
  const gridRef = useRef(null)
  const itemRefs = useRef([])
  const isDuo = members?.length <= 2

  useIsomorphicLayoutEffect(() => {
    if (isDuo) return undefined

    const grid = gridRef.current
    if (!grid) return undefined

    const syncFocusHeights = () => {
      const nodes = grid.querySelectorAll('[data-intern-focus]')
      if (!nodes.length) return

      nodes.forEach((node) => {
        node.style.minHeight = ''
      })

      let max = 0
      nodes.forEach((node) => {
        max = Math.max(max, node.offsetHeight)
      })

      nodes.forEach((node) => {
        node.style.minHeight = `${max}px`
      })
    }

    syncFocusHeights()

    const observer = new ResizeObserver(syncFocusHeights)
    observer.observe(grid)
    window.addEventListener('resize', syncFocusHeights)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncFocusHeights)
    }
  }, [members, isDuo])

  useEffect(() => {
    if (!selected) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected])

  if (!members?.length) return null

  const introText = Array.isArray(intro) ? (
    <>
      {intro[0]}
      <br />
      {intro[1]}
    </>
  ) : (
    intro
  )

  return (
    <>
      <ScrollFade as="section" id="meet-interns" className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          {isDuo ? (
            <>
              <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
                {title}
              </h2>
              <p className="text-[15px] text-muted leading-[1.7] max-w-none mb-9 font-sans">
                {introText}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {members.map((intern) => (
                  <DuoInternCard
                    key={intern.id}
                    intern={intern}
                    onSelect={setSelected}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
                {title}
              </h2>
              <p className="text-[15px] text-muted leading-[1.7] max-w-none mb-9 font-sans">
                {introText}
              </p>

              <div
                ref={gridRef}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 items-stretch"
              >
                {members.map((intern, i) => (
                  <GridInternCard
                    key={intern.id}
                    intern={intern}
                    onSelect={setSelected}
                    setItemRef={(el) => {
                      itemRefs.current[i] = el
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </ScrollFade>

      {selected ? (
        <InternModal intern={selected} closeLabel={closeLabel} onClose={() => setSelected(null)} />
      ) : null}
    </>
  )
}
