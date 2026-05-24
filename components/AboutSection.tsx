'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Brain, Zap, MessageSquare } from 'lucide-react'

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  // Intersection Observer – version 100 % propre (plus d'erreur TS)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target) // gain de perf
        }
      },
      { threshold: 0.2 }
    )

    const node = sectionRef.current
    if (node) observer.observe(node)
    return () => {
      if (node) observer.unobserve(node)
    }
  }, [])

  const qualities = t.about.qualities.map((quality: any, index: number) => ({
    ...quality,
    icon: [Brain, Zap, MessageSquare][index] || Brain,
  }))

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {t.about.title}
          </h2>
          <div className="mx-auto mb-16 h-1 w-24 rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Texte principal */}
            <div className="bg-card border border-border rounded-3xl p-10 shadow-xl">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t.about.description}
              </p>
            </div>

            {/* Qualités */}
            <div className="space-y-6">
              {qualities.map((quality: any, index: number) => {
                const Icon = quality.icon
                return (
                  <div
                    key={index}
                    className="group bg-card border border-border rounded-3xl p-8 hover:border-accent hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="p-4 bg-accent/10 rounded-2xl group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
                          {quality.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {quality.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}