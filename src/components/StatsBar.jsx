import ScrollFade from './ScrollFade.jsx'

const mdColClass = {
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
}

export default function StatsBar({ items }) {
  const mdCols = mdColClass[items.length] ?? 'md:grid-cols-5'

  return (
    <ScrollFade className="border-b border-border bg-white">
      <div className={['mx-auto max-w-[1180px] grid grid-cols-2', mdCols].join(' ')}>
        {items.map((s, i) => (
          <div
            key={s.label}
            className={[
              'flex flex-col items-center justify-center py-6 px-3 text-center border-border',
              i !== items.length - 1 ? 'md:border-r' : '',
              i % 2 === 0 && i !== items.length - 1 ? 'border-r' : '',
              i < items.length - 2 ? 'border-b md:border-b-0' : '',
            ].join(' ')}
          >
            <div className="flex min-h-[52px] md:min-h-[56px] w-full items-center justify-center">
              <div
                className={[
                  'font-serif font-black text-ink leading-none text-center',
                  s.small ? 'text-[20px] md:text-[22px]' : 'text-[44px] md:text-[52px]',
                ].join(' ')}
              >
                {s.num}
              </div>
            </div>
            <div className="mt-3 w-full text-[12px] uppercase tracking-[0.08em] text-muted font-sans text-center">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </ScrollFade>
  )
}
