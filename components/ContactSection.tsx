'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Github, Linkedin, Send } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

// Formspree endpoint. Replace with your real form ID.
// Hosted on Formspree's side — this key is intentionally public (it identifies
// which form to deliver to, not how to read submissions). Server-side
// honeypot + reCAPTCHA on Formspree's dashboard provide the actual spam
// mitigation.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mldzdezp'

type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>

const XIcon: SocialIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const MaltIcon: SocialIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    {/* Geometric "M" mark inspired by Malt's brand — stylised, not the official logo */}
    <path d="M12 1.6 1.6 12 12 22.4 22.4 12 12 1.6Zm0 3.4 7 7-3.5 3.5L12 12l-3.5 3.5L5 12l7-7Zm0 9.5 3.5 3.5L12 21l-3.5-3.5L12 14.5Z" />
  </svg>
)

const socialLinks: {
  name: string
  icon: SocialIcon
  url: string
  brand: string
}[] = [
  { name: 'GitHub', icon: Github as unknown as SocialIcon, url: 'https://github.com/thomasgth3', brand: 'github' },
  {
    name: 'LinkedIn',
    icon: Linkedin as unknown as SocialIcon,
    url: 'https://linkedin.com/in/thomasgth',
    brand: 'linkedin',
  },
  { name: 'X', icon: XIcon, url: 'https://x.com/thomasgth', brand: 'x' },
  { name: 'Malt', icon: MaltIcon, url: 'https://www.malt.fr/profile/thomasgouth', brand: 'malt' },
]

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: real users never see or fill this field. Bots almost always do.
    const honeypot = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value
    if (honeypot) {
      // Silently "succeed" so bots don't retry — but never actually send.
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {t.contact.title}
          </h2>
          <div className="mx-auto mb-12 h-1 w-24 rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">
                  {t.contact.letsConnect}
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t.contact.connectDescription}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot — visually hidden, never tabbable. */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-10000px',
                      top: 'auto',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor="website">Do not fill this</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium mb-2"
                    >
                      {t.contact.formName}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder={t.contact.formNamePlaceholder}
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder-muted-foreground/60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium mb-2"
                    >
                      {t.contact.formEmail}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder={t.contact.formEmailPlaceholder}
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder-muted-foreground/60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium mb-2"
                    >
                      {t.contact.formMessage}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder={t.contact.formMessagePlaceholder}
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none placeholder-muted-foreground/60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-3 shadow-lg shadow-accent/20 hover:shadow-accent/30 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    {isSubmitting ? t.contact.formSending : t.contact.formSend}
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <p
                    aria-live="polite"
                    className="min-h-[1.25rem] text-center text-sm font-medium"
                  >
                    {submitStatus === 'success' && (
                      <span className="text-green-400">✓ {t.contact.formSuccess}</span>
                    )}
                    {submitStatus === 'error' && (
                      <span className="text-red-400">✕ {t.contact.formError}</span>
                    )}
                  </p>
                </form>
              </div>

              <div className="flex flex-col">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                  {t.contact.elsewhere}
                </h3>

                <div className="space-y-3">
                  {socialLinks.map((social, i) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="group flex items-center gap-4 p-4 bg-muted/50 hover:bg-accent/10 border border-border/50 hover:border-accent/50 rounded-2xl transition-all duration-300 hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        style={{ transitionDelay: isVisible ? `${i * 80}ms` : '0ms' }}
                      >
                        <div className="p-2.5 bg-card rounded-xl group-hover:bg-accent/20 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-base font-medium">{social.name}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © {year} Thomas Gouth. {t.footer.rights}
              </p>
              <p className="text-xs text-muted-foreground/70">{t.footer.builtWith}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
