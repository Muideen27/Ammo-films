# Ammofilms

Production-ready marketing website for **Ammofilms** — a African talent recruitment agency connecting creators and models with legitimate international streaming opportunities.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **React Hook Form** + **Zod**

## Project Structure

```
src/
├── app/                 # Routes, layout, SEO (sitemap, robots), API
├── components/
│   ├── layout/          # Header, Footer, MobileNav, Logo
│   ├── sections/        # Page sections (Hero, About, Apply, etc.)
│   └── ui/              # Reusable UI (Button, Input, Accordion, …)
├── hooks/               # useActiveSection
└── lib/                 # Constants, FAQ, schemas, structured data
docs/
└── DATABASE.md          # Optional persistence schema
public/
└── icon.jpg
```

## Getting Started

```bash
npm install
cp .env.example .env.local
# Edit NEXT_PUBLIC_SITE_URL for production
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

### Vercel (recommended)

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
4. Deploy.

### Manual

```bash
npm run build
npm start
```

### Other platforms

Works on any Node.js 18+ host (Railway, Render, AWS, etc.). Output is a standard Next.js production build.

## SEO

- Metadata & Open Graph in `src/app/layout.tsx`
- Dynamic OG image: `src/app/opengraph-image.tsx`
- JSON-LD: Organization, WebSite, FAQPage, JobPosting
- `src/app/sitemap.ts` and `src/app/robots.ts`

Target keywords are configured in `src/lib/constants.ts`.

## Applications API

`POST /api/apply` validates submissions with Zod. Connect persistence in `src/app/api/apply/route.ts` (see `docs/DATABASE.md`).

Client-side draft saving uses `localStorage` key `ammofilms-application-draft`.

## Accessibility

- Skip link, ARIA labels, accordion semantics
- Keyboard-focus styles
- `prefers-reduced-motion` support
- WCAG-oriented contrast (primary/accent on light & dark sections)

## FAQ Content

FAQ copy is in `src/lib/faq.ts`. If you have a brand PDF with specific Q&A, replace or extend entries there.

## License

Proprietary — Ammofilms.
