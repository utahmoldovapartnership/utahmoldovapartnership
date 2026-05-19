/**
 * Infinite horizontal scroll of square cohort photos.
 * Add images to `internCohortPhotos` in siteContent.js (place files in /public).
 */
export default function InternPhotoMarquee({ photos }) {
  if (!photos?.length) return null

  const items = [...photos, ...photos]

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="relative marquee-pause border-l border-r border-border overflow-hidden">
          <div className="flex w-max animate-marquee-slow">
            {items.map((photo, i) => (
              <div
                key={`${photo.src}-${i}`}
                className="flex-shrink-0 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] overflow-hidden bg-[#f3f4f6]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
