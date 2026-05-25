import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const SITE_URL = 'https://thomasgth3.github.io'
const SITE_NAME = 'Thomas Gouth — Data Scientist'
const SITE_DESC =
  'Portfolio of Thomas Gouth — Data Scientist & ML Engineer. Projects in machine learning, deep learning, NLP, computer vision and data engineering.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: '%s | Thomas Gouth',
  },
  description: SITE_DESC,
  applicationName: 'Thomas Gouth Portfolio',
  authors: [{ name: 'Thomas Gouth', url: SITE_URL }],
  creator: 'Thomas Gouth',
  publisher: 'Thomas Gouth',
  keywords: [
    'Thomas Gouth',
    'Data Scientist',
    'Machine Learning',
    'Deep Learning',
    'NLP',
    'Computer Vision',
    'Python',
    'Portfolio',
    'CY Tech',
    'TotalEnergies',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESC,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#1f1f1f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

// Prevent flash of wrong theme: applied synchronously before React hydrates.
const themeBootScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (prefersDark ? 'dark' : 'light');
    var root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  } catch (e) {}
})();
`.trim()

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Thomas Gouth',
  url: SITE_URL,
  jobTitle: 'Data Scientist & ML Engineer',
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'CY Tech' },
    { '@type': 'CollegeOrUniversity', name: 'Universidad de Zaragoza' },
  ],
  sameAs: [
    'https://github.com/thomasgth3',
    'https://linkedin.com/in/thomasgth',
    'https://www.malt.fr/profile/thomasgouth',
  ],
  knowsAbout: [
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Data Engineering',
    'Python',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeBootScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-accent-foreground focus:shadow-lg"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
