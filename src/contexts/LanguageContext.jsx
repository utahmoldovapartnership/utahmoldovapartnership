import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext({
  lang: 'EN',
  setLang: () => {},
})

const STORAGE_KEY = 'umbp.lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'EN'
    return window.localStorage.getItem(STORAGE_KEY) || 'EN'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang.toLowerCase()
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
