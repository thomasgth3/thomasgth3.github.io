'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { translations, Language } from '@/lib/translations'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.fr
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'lang'

function isLanguage(value: unknown): value is Language {
  return value === 'fr' || value === 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  // On mount: pick up stored choice, else fall back to browser language.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (isLanguage(stored)) {
        setLanguageState(stored)
        return
      }
    } catch {
      /* ignore */
    }
    const browser = (navigator.language || '').toLowerCase()
    if (browser.startsWith('fr')) setLanguageState('fr')
  }, [])

  // Keep <html lang> in sync (a11y + SEO) and persist the choice.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      /* ignore */
    }
  }, [language])

  const setLanguage = (lang: Language) => setLanguageState(lang)

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
