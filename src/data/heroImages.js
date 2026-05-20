const HERO_WIDTHS = [640, 1024, 1920, 2400]

function buildSrcSet(baseUrl, formatParams) {
  return HERO_WIDTHS.map((w) => `${formatParams(baseUrl, w)} ${w}w`).join(', ')
}

/** Pexels CDN — auto=compress, cs=tinysrgb */
export function buildPexelsHero(baseUrl, { alt, width = 1920, height = 1080 }) {
  const root = baseUrl.split('?')[0]
  const format = (url, w) =>
    `${url}?auto=compress&cs=tinysrgb&w=${w}&q=80`
  return {
    src: format(root, 1920),
    srcSet: buildSrcSet(root, format),
    sizes: '100vw',
    width,
    height,
    alt,
    preconnect: 'https://images.pexels.com',
  }
}

/** Unsplash CDN */
export function buildUnsplashHero(baseUrl, { alt, width = 1920, height = 1280 }) {
  const root = baseUrl.split('?')[0]
  const format = (url, w) =>
    `${url}?auto=format&fit=crop&w=${w}&q=80`
  return {
    src: format(root, 1920),
    srcSet: buildSrcSet(root, format),
    sizes: '100vw',
    width,
    height,
    alt,
    preconnect: 'https://images.unsplash.com',
  }
}

export const pageHeroImages = {
  home: buildPexelsHero(
    'https://images.pexels.com/photos/17994722/pexels-photo-17994722.jpeg',
    {
      alt: 'Chișinău cityscape at dusk',
      height: 1280,
    },
  ),
  contact: buildPexelsHero(
    'https://images.pexels.com/photos/11185859/pexels-photo-11185859.jpeg',
    {
      alt: 'Historic architecture in Moldova',
      height: 1600,
    },
  ),
  interns: buildUnsplashHero(
    'https://images.unsplash.com/photo-1629045951387-6d86eb2aad3d',
    {
      alt: 'View over Chișinău, Moldova',
      height: 1280,
    },
  ),
}
