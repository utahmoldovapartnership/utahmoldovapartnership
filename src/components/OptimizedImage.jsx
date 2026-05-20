/**
 * Content image with explicit dimensions for layout stability.
 */
export default function OptimizedImage({
  src,
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
