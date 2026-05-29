import ScrollFade from './ScrollFade.jsx'
import OptimizedImage from './OptimizedImage.jsx'

/**
 * Infinite horizontal scroll of square cohort photos (CSS marquee, same pattern as LogoMarquee).
 * Add images via `npm run photos` → cohortPhotos.generated.js
 */
export default function InternPhotoMarquee({ photos }) {
  if (!photos?.length) return null

  const items = [...photos, ...photos]

  return (
    <ScrollFade as="section" className="bg-white">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="relative border-l border-r border-border overflow-hidden">
          <div className="flex w-max animate-marquee-photos">
            {items.map((photo, i) => (
              <div
                key={`${photo.src}-${i}`}
                className="flex-shrink-0 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] overflow-hidden bg-white"
              >
                <OptimizedImage
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes={photo.sizes}
                  alt={photo.alt}
                  width={photo.width ?? 560}
                  height={photo.height ?? 560}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollFade>
  )
}
