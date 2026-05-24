'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden bg-background"
    >
      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] dark:opacity-[0.10]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            color: 'var(--foreground)',
            maskImage:
              'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(0,0,0,0.9), transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(0,0,0,0.9), transparent 80%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full blur-3xl opacity-25 dark:opacity-30"
          style={{
            background:
              'radial-gradient(circle at center, var(--accent) 0%, transparent 60%)',
          }}
        />
      </div>

      <div
        className={`relative max-w-4xl w-full text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>{t.hero.tagline}</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 text-foreground tracking-tight">
          <span className="bg-gradient-to-br from-foreground via-foreground to-accent bg-clip-text text-transparent">
            Thomas Gouth
          </span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-accent font-medium mb-6">
          {t.hero.role}
        </p>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t.hero.description}
        </p>

        <div className="mt-12 flex gap-4 sm:gap-6 justify-center flex-col sm:flex-row">
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:scale-[1.03] transition-transform duration-200 shadow-lg shadow-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t.hero.viewProjects}
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-card text-foreground border border-border rounded-full font-semibold hover:border-accent hover:bg-accent/5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t.hero.contactMe}
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
        aria-label={t.hero.scrollHint}
      >
        <span className="text-xs uppercase tracking-widest">{t.hero.scrollHint}</span>
        <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
