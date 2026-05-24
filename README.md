# Thomas Gouth — Data Scientist & ML Engineer

Personal portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

- Live: <https://thomasgth3.github.io>
- Source: <https://github.com/thomasgth3/thomasgth3.github.io>

## Tech stack

- Next.js 16 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS v4 + `tw-animate-css`
- Lucide icons
- Formspree for the contact form
- Bilingual (FR / EN) with persistence
- Dark / light theme with system preference + persistence

## Features

- 100% responsive (mobile-first), no horizontal scroll on small screens
- Mobile hamburger menu, scroll-spy active section highlight
- Smooth scroll between sections
- Subtle scroll-triggered animations (Intersection Observer)
- Project filter by tech stack + grid / list views
- Working contact form with honeypot spam protection
- Theme persisted to `localStorage`, FOUC-free initial render
- Full SEO: Open Graph, Twitter Card, JSON-LD Person schema, sitemap, robots
- Accessibility: skip-to-content link, ARIA labels, keyboard focus rings, `prefers-reduced-motion` support

## Local development

```bash
git clone https://github.com/thomasgth3/thomasgth3.github.io.git
cd thomasgth3.github.io
npm install
npm run dev          # http://localhost:3000
```

## Build for GitHub Pages

```bash
npm run build        # static export
```

The static site is emitted to the configured `distDir` (see `next.config.ts`).

## Configuration

Edit these files before your next deploy:

- `lib/translations.ts` — text content (FR/EN), projects, experience, education
- `components/ContactSection.tsx` — `FORMSPREE_ENDPOINT` constant
- `app/layout.tsx` — site URL, meta description, JSON-LD profile data
- `public/sitemap.xml` — canonical URL

## License

MIT. See [LICENSE](./LICENSE).
