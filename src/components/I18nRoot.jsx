import Translator from './Translator.jsx'

/** Mounts client-side translation (works across Astro React islands). */
export default function I18nRoot() {
  return <Translator />
}
