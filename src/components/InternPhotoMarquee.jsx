/**
 * Infinite horizontal scroll of square cohort photos.
 * Add images to `internCohortPhotos` in siteContent.js (place files in /public).
 */
export default function InternPhotoMarquee({ photos }) {
  if (!photos?.length) return null

  const items = [...photos, ...photos]

  return (
    <section className="border-b border-border bg-white overflow-hidden">
      <div className="relative marquee-pause">
        <div className="flex w-max animate-marquee">
          {items.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              className="flex-shrink-0 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] overflow-hidden bg-[#f3f4f6]"
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
    </section>
  )
}
