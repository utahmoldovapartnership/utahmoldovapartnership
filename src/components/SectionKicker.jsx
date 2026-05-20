export default function SectionKicker({ color = 'red', children, size = 'sm' }) {
  const map = {
    red: { text: 'text-red', bg: 'bg-red' },
    blue: { text: 'text-blue', bg: 'bg-blue' },
    yellow: { text: 'text-yellow', bg: 'bg-yellow' },
    white: { text: 'text-white', bg: 'bg-white' },
  }
  const c = map[color] || map.red
  const lineWidth = size === 'lg' ? 'w-6' : 'w-4'
  const fontSize = size === 'lg' ? 'text-[12px]' : 'text-[12px]'
  return (
    <div className={`flex items-center gap-[10px] ${fontSize} font-sans font-medium uppercase tracking-[0.14em] ${c.text} mb-3`}>
      <span className={`inline-block ${lineWidth} h-px ${c.bg}`} />
      <span>{children}</span>
    </div>
  )
}
