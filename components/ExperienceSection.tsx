'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Briefcase, GraduationCap, MapPin } from 'lucide-react'

type Job = {
  title: string
  company: string
  period: string
  location: string
  technologies?: string[]
  description?: string
}

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'professional' | 'academic'>('professional')
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

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

  const experiences: Job[] =
    activeTab === 'professional' ? t.experience.jobs : t.experience.education

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {t.experience.title}
          </h2>
          <div className="mx-auto mb-12 h-1 w-24 rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

          <div className="flex justify-center mb-16">
            <div
              className="inline-flex gap-2 p-1 bg-muted/50 border border-border rounded-xl"
              role="tablist"
            >
              <button
                onClick={() => setActiveTab('professional')}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  activeTab === 'professional'
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                role="tab"
                aria-selected={activeTab === 'professional'}
              >
                <Briefcase className="w-4 h-4" aria-hidden="true" />
                {t.experience.professionalTab}
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  activeTab === 'academic'
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                role="tab"
                aria-selected={activeTab === 'academic'}
              >
                <GraduationCap className="w-4 h-4" aria-hidden="true" />
                {t.experience.academicTab}
              </button>
            </div>
          </div>

          <ol className="relative">
            {experiences.map((job, index) => (
              <li
                key={`${activeTab}-${index}`}
                className={`flex gap-6 sm:gap-8 mb-10 last:mb-0 opacity-0 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 120}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg z-10 ring-4 ring-accent/10" />
                  {index !== experiences.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border/50 mt-2" />
                  )}
                </div>

                <article className="flex-1 bg-card border border-border rounded-3xl p-6 sm:p-8 hover:border-accent hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        {job.title}
                      </h3>
                      <p className="text-base sm:text-lg font-medium text-accent mt-1">
                        {job.company}
                      </p>
                    </div>
                    <span className="self-start text-xs sm:text-sm font-medium text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>

                  <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {job.location}
                  </p>

                  {job.technologies && job.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {job.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {job.description && (
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up {
            animation: none;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
