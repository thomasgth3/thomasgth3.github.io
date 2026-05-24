'use client'

import { LanguageProvider } from '@/contexts/language-context'
import { ThemeProvider } from '@/contexts/theme-context'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}
