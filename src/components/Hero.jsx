import SectionKicker from './SectionKicker.jsx'

export default function Hero({
  kicker,
  kickerColor = 'red',
  title,
  subtext,
  primary,
  secondary,
  backgroundImage,
  imageCredit,
  imagePosition = 'center',
  backgroundSize = 'cover',
  overlayDirection = 'vertical',
  imageWidth = '100%',
  imageAlignRight = false,
}) {
  const hasImage = Boolean(backgroundImage)
  const overlay =
    overlayDirection === 'horizontal'
      ? 'linear-gradient(90deg, rgba(13,13,13,1) 0%, rgba(13,13,13,1) 25%, rgba(13,13,13,0.7) 45%, rgba(13,13,13,0.15) 75%, rgba(13,13,13,0.0) 100%)'
      : 'linear-gradient(180deg, rgba(13,13,13,0.20) 0%, rgba(13,13,13,0.40) 55%, rgba(13,13,13,0.75) 100%)'
  const imageBoxStyle = imageAlignRight
    ? {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: imageWidth,
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: imagePosition,
        backgroundSize,
      }
    : {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: imagePosition,
        backgroundSize,
      }
  return (
    <section className="relative bg-ink border-b border-[#1f1f1f] overflow-hidden">
      {hasImage && (
        <>
          {imageAlignRight ? (
            <div aria-hidden style={imageBoxStyle} />
          ) : (
            <div aria-hidden className="absolute inset-0" style={imageBoxStyle} />
          )}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: overlay }}
          />
        </>
      )}
      <div className="relative mx-auto max-w-[1180px] px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20">
        <div
          className={[
            'mb-6 flex items-center gap-[12px] text-[12px] font-sans font-medium uppercase tracking-[0.18em]',
            kickerColor === 'yellow'
              ? 'text-yellow'
              : kickerColor === 'white'
              ? 'text-white'
              : 'text-red',
          ].join(' ')}
        >
          <span
            className={[
              'inline-block w-6 h-px',
              kickerColor === 'yellow'
                ? 'bg-yellow'
                : kickerColor === 'white'
                ? 'bg-white'
                : 'bg-red',
            ].join(' ')}
          />
          <span>{kicker}</span>
        </div>
        <h1 className="font-serif font-medium italic text-white text-[44px] sm:text-[56px] md:text-[72px] leading-[1.1] tracking-[-1px] max-w-[820px]">
          {title}
        </h1>
        <div className="w-full h-px bg-white/15 my-8" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="text-[16px] md:text-[17px] text-white/80 leading-[1.7] max-w-[480px] font-sans">
            {subtext}
          </p>
          <div className="flex flex-wrap">
            {primary && (
              <a
                href={primary.href}
                className={[
                  'px-7 py-3 font-sans font-medium text-[12px] uppercase tracking-wider cursor-pointer inline-flex items-center',
                  primary.variant === 'yellow'
                    ? 'bg-yellow text-ink'
                    : 'bg-red text-white',
                ].join(' ')}
              >
                {primary.label}
              </a>
            )}
            {secondary && (
              <a
                href={secondary.href}
                className="-ml-px px-7 py-3 border border-white/25 text-white font-sans font-medium text-[12px] uppercase tracking-wider inline-flex items-center"
              >
                {secondary.label}
              </a>
            )}
          </div>
        </div>
        {imageCredit && (
          <div className="relative mt-10 text-[10px] uppercase tracking-[0.14em] text-white/40 font-sans">
            {imageCredit}
          </div>
        )}
      </div>
    </section>
  )
}

export { SectionKicker }
