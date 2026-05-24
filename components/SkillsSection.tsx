'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import {
  Code2,
  Brain,
  LayoutDashboard,
  Database,
  Wrench,
  Languages as LanguagesIcon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t, language } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    const node = sectionRef.current
    if (node) observer.observe(node)
    return () => {
      if (node) observer.unobserve(node)
    }
  }, [])

  const categories: { title: string; skills: string[]; icon: LucideIcon }[] = [
    {
      title: t.skills.programmingLanguages,
      skills: ['Python', 'R', 'SQL', 'JavaScript', 'TypeScript', 'C'],
      icon: Code2,
    },
    {
      title: t.skills.engineeringConcepts,
      skills: [
        'Machine Learning',
        'Deep Learning',
        'NLP',
        'Computer Vision',
        'Data Mining',
        'Statistical Analysis',
      ],
      icon: Brain,
    },
    {
      title: t.skills.frontendDevelopment,
      skills: ['React', 'Next.js', 'Tailwind CSS', 'D3.js', 'Plotly', 'HTML/CSS'],
      icon: LayoutDashboard,
    },
    {
      title: t.skills.databaseSystems,
      skills: ['MongoDB', 'MySQL', 'PySpark', 'Google Cloud Platform'],
      icon: Database,
    },
    {
      title: t.skills.developmentTools,
      skills: ['Git', 'Docker', 'VS Code', 'Linux', 'CI/CD'],
      icon: Wrench,
    },
    {
      title: t.skills.languages,
      skills:
        language === 'fr'
          ? ['Français — Natif', 'Anglais — C1', 'Espagnol — Notions']
          : ['French — Native', 'English — C1', 'Spanish — Basic'],
      icon: LanguagesIcon,
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {t.skills.title}
          </h2>
          <div className="mx-auto mb-16 h-1 w-24 rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, catIndex) => {
              const Icon = category.icon
              return (
                <div
                  key={category.title}
                  className="group bg-card border border-border rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-accent/10 hover:border-accent transition-all duration-500"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, index) => (
                      <span
                        key={skill}
                        className={`px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-xl text-sm font-medium border border-cyan-500/20 hover:bg-cyan-500/20 hover:shadow-md transition-all duration-300 ${
                          isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                        style={{
                          transitionDelay: isVisible
                            ? `${(catIndex * 6 + index) * 50}ms`
                            : '0ms',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
