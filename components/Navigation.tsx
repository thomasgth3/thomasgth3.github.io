'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { useTheme } from '@/contexts/theme-context'
import { Moon, Sun, Linkedin, Menu, X as CloseIcon } from 'lucide-react'

const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'contact'] as const
type SectionId = (typeof SECTION_IDS)[number]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll-spy: highlight the section currently centred in the viewport.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    )
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActiveSection(visible[0].target.id as SectionId)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close on Escape.
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [mobileOpen])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-lg'
          : 'bg-transparent'
      }`}
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: logo + socials */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-accent/10 border-2 border-accent hover:bg-accent/20 hover:scale-110 transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={language === 'fr' ? 'Retour en haut' : 'Back to top'}
            >
              <span className="text-base font-bold text-accent">TG</span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              <span
                role="link"
                aria-disabled="true"
                tabIndex={-1}
                title={`X — ${t.nav.comingSoon}`}
                className="p-2.5 rounded-lg opacity-40 cursor-not-allowed select-none"
                aria-label={`X — ${t.nav.comingSoon}`}
              >
                <svg
                  className="w-5 h-5 text-foreground/80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </span>

              <a
                href="https://linkedin.com/in/thomasgth"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg hover:bg-muted/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="LinkedIn"
              >
                <Linkedin
                  className="w-5 h-5 text-foreground/80 hover:text-accent transition-colors"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* Right: nav links (desktop) + controls + mobile burger */}
          <div className="flex items-center gap-3 lg:gap-8">
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative font-medium tracking-wide transition-colors duration-300 focus:outline-none ${
                      isActive
                        ? 'text-accent'
                        : 'text-foreground/80 hover:text-accent'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    <span
                      className={`pointer-events-none absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={t.nav.toggleTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" aria-hidden="true" />
                )}
              </button>

              <div
                className="hidden sm:flex items-center gap-3 bg-muted/50 rounded-xl px-3 py-2"
                role="group"
                aria-label="Language"
              >
                <button
                  onClick={() => setLanguage('fr')}
                  className={`text-sm font-semibold transition-colors ${
                    language === 'fr' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-pressed={language === 'fr'}
                >
                  FR
                </button>
                <span className="text-muted-foreground/40" aria-hidden="true">
                  |
                </span>
                <button
                  onClick={() => setLanguage('en')}
                  className={`text-sm font-semibold transition-colors ${
                    language === 'en' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-pressed={language === 'en'}
                >
                  EN
                </button>
              </div>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? (
                  <CloseIcon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            mobileOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-1 pb-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                        isActive
                          ? 'bg-accent/10 text-accent'
                          : 'text-foreground/80 hover:bg-muted/50 hover:text-accent'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </button>
                  </li>
                )
              })}
              <li className="sm:hidden mt-2 px-1">
                <div
                  className="flex items-center justify-center gap-3 bg-muted/50 rounded-xl px-4 py-2"
                  role="group"
                  aria-label="Language"
                >
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`text-sm font-semibold ${
                      language === 'fr' ? 'text-accent' : 'text-muted-foreground'
                    }`}
                    aria-pressed={language === 'fr'}
                  >
                    FR
                  </button>
                  <span className="text-muted-foreground/40" aria-hidden="true">
                    |
                  </span>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`text-sm font-semibold ${
                      language === 'en' ? 'text-accent' : 'text-muted-foreground'
                    }`}
                    aria-pressed={language === 'en'}
                  >
                    EN
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
