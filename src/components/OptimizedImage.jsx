/**
 * Content image with explicit dimensions, optional responsive srcset, and lazy loading.
 */
export default function OptimizedImage({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  className = '',
  style,
  objectPosition = 'center',
}) {
  return (
    <img
      src={src}
      {...(srcSet ? { srcSet } : {})}
      {...(sizes ? { sizes } : {})}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
      decoding={decoding}
      className={className}
      style={{ ...style, objectPosition }}
    />
  )
}
