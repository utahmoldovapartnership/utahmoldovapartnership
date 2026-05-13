import { TbPhoto } from 'react-icons/tb'

export default function PhotoPlaceholder({ label, caption, height = 'h-56' }) {
  return (
    <figure className="border border-border bg-white">
      <div className={`${height} w-full bg-[linear-gradient(135deg,#f7f7f7_25%,#fff_25%,#fff_50%,#f7f7f7_50%,#f7f7f7_75%,#fff_75%)] bg-[length:14px_14px] flex items-center justify-center`}>
        <div className="flex flex-col items-center text-muted">
          <TbPhoto size={28} />
          <span className="mt-2 text-[12px] uppercase tracking-[0.14em] font-sans">
            {label || 'Photo placeholder'}
          </span>
        </div>
      </div>
      {caption && (
        <figcaption className="border-t border-border px-4 py-3 text-[13px] text-muted font-sans">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
