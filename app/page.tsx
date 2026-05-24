import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { SkillsSection } from '@/components/SkillsSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ContactSection } from '@/components/ContactSection'
import { Navigation } from '@/components/Navigation'

export default function Home() {
  return (
    <main id="main" className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
