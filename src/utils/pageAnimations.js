/** Normalize pathname for per-page animation session keys. */
export function getPageKey(pathname = '/') {
  if (pathname === '/' || pathname === '') return '/'
  return pathname.replace(/\/$/, '') || '/'
}

export function hasSeenPage(pathname) {
  try {
    return sessionStorage.getItem(`umbp:seen:${getPageKey(pathname)}`) === '1'
  } catch {
    return false
  }
}

export function markPageSeen(pathname) {
  try {
    sessionStorage.setItem(`umbp:seen:${getPageKey(pathname)}`, '1')
  } catch {
    // ignore storage errors
  }
}
