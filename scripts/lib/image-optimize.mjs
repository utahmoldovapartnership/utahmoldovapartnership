import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export const IMAGE_INPUT_RE = /\.(jpe?g|png|webp|gif|avif)$/i
export const LEGACY_OUTPUT_RE = /\.(jpe?g|png|gif)$/i

export function listImageFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_INPUT_RE.test(f) && !f.startsWith('.'))
    .sort((a, b) => a.localeCompare(b))
}

export function slugFromFilename(filename) {
  return filename.replace(IMAGE_INPUT_RE, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'photo'
}

export function buildSrcSet(entries, publicPrefix) {
  return entries
    .map(({ width, file }) => {
      const url = publicPrefix ? `${publicPrefix}/${encodeURI(file)}` : `/${encodeURI(file)}`
      return `${url} ${width}w`
    })
    .join(', ')
}

/** Original uploads only — skip responsive WebP outputs from a previous run. */
export function isSourceImage(filename) {
  if (/-\d+w\.webp$/i.test(filename)) return false
  if (/\.webp$/i.test(filename)) return false
  return IMAGE_INPUT_RE.test(filename)
}

/**
 * @param {Buffer|string} input path or buffer
 * @returns {Promise<{ entries: { width, height, file }[], primary: object }>}
 */
export async function generateWebpVariants(input, outputDir, baseSlug, widths, options = {}) {
  const {
    quality = 80,
    square = false,
    maxWidth = null,
  } = options

  const meta = await sharp(input).metadata()
  const sourceWidth = meta.width ?? widths[widths.length - 1]

  let targetWidths = [...new Set(widths)]
    .filter((w) => w > 0)
    .map((w) => (maxWidth ? Math.min(w, maxWidth, sourceWidth) : Math.min(w, sourceWidth)))
    .sort((a, b) => a - b)

  if (!targetWidths.length) {
    targetWidths = [Math.min(sourceWidth, maxWidth ?? sourceWidth)]
  }

  targetWidths = [...new Set(targetWidths)]

  fs.mkdirSync(outputDir, { recursive: true })

  const entries = []

  for (const width of targetWidths) {
    const file = `${baseSlug}-${width}w.webp`
    const outPath = path.join(outputDir, file)

    let transform = sharp(input).rotate()
    if (square) {
      transform = transform.resize(width, width, { fit: 'cover', position: 'centre' })
    } else {
      transform = transform.resize(width, null, { fit: 'inside', withoutEnlargement: true })
    }

    await transform.webp({ quality }).toFile(outPath)

    const outMeta = await sharp(outPath).metadata()
    entries.push({
      width: outMeta.width,
      height: outMeta.height,
      file,
    })
  }

  const primary = entries[entries.length - 1]
  return { entries, primary }
}

export function removeLegacyImages(dir, keepFiles = new Set()) {
  if (!fs.existsSync(dir)) return
  for (const file of fs.readdirSync(dir)) {
    if (file === '.gitkeep') continue
    if (!LEGACY_OUTPUT_RE.test(file)) continue
    if (keepFiles.has(file)) continue
    fs.unlinkSync(path.join(dir, file))
  }
}

export function removeStaleWebp(dir, validBaseSlugs) {
  if (!fs.existsSync(dir)) return
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.webp')) continue
    const slug = file.replace(/-\d+w\.webp$/, '')
    if (!validBaseSlugs.has(slug)) {
      fs.unlinkSync(path.join(dir, file))
    }
  }
}
