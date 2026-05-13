const logos = [
  {
    name: 'Covali',
    src: 'https://covali.md/images/tild6335-3430-4333-b031-666534356533__logo_horizontal.png',
    href: 'https://covali.md/',
  },
  {
    name: 'Le Parole',
    src: 'https://www.le-parole.com/wp-content/uploads/2019/02/logo-black.png',
    href: 'https://www.le-parole.com/',
  },
  {
    name: 'XY Partners',
    src: 'https://media.licdn.com/dms/image/v2/C560BAQEPg8XVIdUs3Q/company-logo_200_200/company-logo_200_200/0/1630599677092?e=1780531200&v=beta&t=zNsrndrIBkPdey0mjiwxYxjKxmvv-s2PfMoyz1dYaH4',
    href: 'https://www.linkedin.com/company/xypartners/',
  },
  {
    name: 'Tucano',
    src: 'https://optim.tildacdn.net/tild6538-3634-4034-a130-356663343733/-/resize/880x/-/format/webp/Logo_Long_White.png.webp',
    href: 'https://tucanofranchise.com/',
    invert: true,
  },
]

export default function LogoMarquee() {
  const items = [...logos, ...logos]
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-10 md:py-12">
        <div className="text-center text-[11px] uppercase tracking-[0.18em] text-muted font-sans font-medium mb-6">
          Past clients
        </div>
        <div className="relative overflow-hidden marquee-pause">
          <div className="flex w-max items-center gap-16 md:gap-20 animate-marquee">
            {items.map((logo, i) => (
              <a
                key={`${logo.name}-${i}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.name}
                className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className={[
                    'h-10 md:h-12 w-auto object-contain',
                    logo.invert ? 'invert' : '',
                  ].join(' ')}
                />
              </a>
            ))}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"
          />
        </div>
      </div>
    </section>
  )
}
