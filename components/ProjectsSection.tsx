'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Github, Grid3x3, List, ExternalLink, Lock, Sparkles } from 'lucide-react'

type Project = {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  impact?: string
}

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const [selectedFilter, setSelectedFilter] = useState<string>(t.projects.filterAll)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    const node = sectionRef.current
    if (node) observer.observe(node)
    return () => {
      if (node) observer.unobserve(node)
    }
  }, [])

  useEffect(() => {
    setSelectedFilter(t.projects.filterAll)
  }, [t.projects.filterAll])

  const projects = t.projects.items as Project[]

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))),
    [projects]
  )
  const filters = [t.projects.filterAll, ...allTags]

  const filteredProjects =
    selectedFilter === t.projects.filterAll
      ? projects
      : projects.filter((p) => p.tags.includes(selectedFilter))

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {t.projects.title}
          </h2>
          <div className="mx-auto mb-12 h-1 w-24 rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 mb-12">
            <div className="flex flex-wrap justify-center md:justify-start gap-2" role="tablist">
              {filters.map((filter) => {
                const isActive = selectedFilter === filter
                return (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                        : 'bg-card border border-border hover:border-accent hover:text-accent'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>

            <div
              className="self-center flex gap-1 bg-card border border-border rounded-xl p-1"
              role="group"
              aria-label="View mode"
            >
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/50'
                }`}
                aria-label={t.projects.viewGrid}
                aria-pressed={viewMode === 'grid'}
              >
                <Grid3x3 className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/50'
                }`}
                aria-label={t.projects.viewList}
                aria-pressed={viewMode === 'list'}
              >
                <List className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex flex-col gap-6'
            }
          >
            {filteredProjects.map((project, index) => {
              const hasGithub = Boolean(project.github)
              const hasLive = Boolean(project.live)
              return (
                <article
                  key={`${project.title}-${index}`}
                  className="group relative bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:shadow-accent/10 hover:border-accent transition-all duration-500"
                  style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
                >
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 pr-8 text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {project.impact && (
                    <p className="text-sm font-semibold text-accent mb-5">
                      → {project.impact}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-5 text-sm">
                    {hasGithub ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-medium text-foreground hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        {t.projects.viewGithub}
                      </a>
                    ) : (
                      <span
                        className="inline-flex items-center gap-2 font-medium text-muted-foreground/70"
                        title={t.projects.sourcePrivate}
                      >
                        <Lock className="w-4 h-4" aria-hidden="true" />
                        {t.projects.sourcePrivate}
                      </span>
                    )}
                    {hasLive && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-medium text-foreground hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        {t.projects.viewProject}
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
