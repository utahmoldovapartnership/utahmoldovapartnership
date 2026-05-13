export default function StatsBar({ items }) {
  return (
    <div className="border-b border-border bg-white">
      <div className="mx-auto max-w-[1180px] grid grid-cols-2 md:grid-cols-5">
        {items.map((s, i) => (
          <div
            key={s.label}
            className={[
              'py-6 px-3 text-center border-border',
              i !== items.length - 1 ? 'md:border-r' : '',
              i % 2 === 0 ? 'border-r md:border-r' : '',
              i < items.length - 2 ? 'border-b md:border-b-0' : '',
            ].join(' ')}
          >
            <div
              className={[
                'font-serif font-black text-ink leading-none',
                s.small ? 'text-[20px] pt-2' : 'text-[44px] md:text-[52px]',
              ].join(' ')}
            >
              {s.num}
            </div>
            <div className="mt-4 text-[12px] uppercase tracking-[0.08em] text-muted font-sans">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
