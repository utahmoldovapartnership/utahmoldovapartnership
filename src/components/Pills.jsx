export default function Pills({ items }) {
  return (
    <div className="flex flex-wrap">
      {items.map((label) => (
        <div
          key={label}
          className="border border-border px-[18px] py-[9px] text-[14px] text-[#374151] font-sans -mr-px -mb-px bg-white"
        >
          {label}
        </div>
      ))}
    </div>
  )
}
