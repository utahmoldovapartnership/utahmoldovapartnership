import { useEffect, useRef, useState } from 'react'
import useIsomorphicLayoutEffect from '../utils/useIsomorphicLayoutEffect.js'
import { TbX } from 'react-icons/tb'
import ScrollFade from './ScrollFade.jsx'
import OptimizedImage from './OptimizedImage.jsx'

export default function MeetInterns({ intro, members }) {
  const [selected, setSelected] = useState(null)
  const gridRef = useRef(null)

  useIsomorphicLayoutEffect(() => {
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
  }, [members])

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

  return (
    <>
      <ScrollFade as="section" id="meet-interns" className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
            Meet the interns
          </h2>
          <p className="text-[15px] text-muted leading-[1.7] max-w-none mb-9 font-sans">
            {Array.isArray(intro) ? (
              <>
                {intro[0]}
                <br />
                {intro[1]}
              </>
            ) : (
              intro
            )}
          </p>

          <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 items-stretch"
          >
            {members.map((intern) => (
              <button
                key={intern.id}
                type="button"
                onClick={() => setSelected(intern)}
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
            ))}
          </div>
        </div>
      </ScrollFade>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-ink/70"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intern-modal-title"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-[520px] bg-white border border-border max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white border border-border text-ink hover:border-red hover:text-red"
              aria-label="Close"
            >
              <TbX size={18} />
            </button>

            <OptimizedImage
              src={selected.src ?? selected.image}
              srcSet={selected.srcSet}
              sizes={selected.modalSizes ?? selected.sizes}
              alt={selected.name}
              width={selected.width ?? 520}
              height={selected.height ?? 520}
              loading="eager"
              className="w-full aspect-square object-cover object-center"
            />

            <div className="p-6 md:p-8">
              <h3
                id="intern-modal-title"
                className="font-serif font-medium text-[28px] text-ink leading-[1.1] mb-1"
              >
                {selected.name}
              </h3>
              <p className="text-[12px] uppercase tracking-[0.12em] text-blue font-sans font-medium mb-4">
                {selected.focus}
              </p>
              <p className="text-[15px] text-muted leading-[1.7] font-sans">{selected.bio}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
