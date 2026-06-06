# Main_Prompts_War_2026

**MindFlow** — A production-grade Mental Wellness Tracker for students preparing for competitive exams (NEET, JEE, UPSC, GATE, CAT, CUET, and Board Exams).

Phase 1 is **frontend only** — mock data, local state (Zustand + localStorage), no backend or authentication.

## Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- React 19 + TypeScript (strict) + Vite
- shadcn/ui + Aceternity-inspired UI + Tailwind CSS v4
- GSAP (hero particles, scroll reveals, counters)
- Framer Motion (cards, modals, page transitions)
- Recharts (dashboard & stress charts)
- React Hook Form + Zod (journal validation)
- Zustand (persistent local state)
- Lucide React icons

## Pages

| Route | Page |
|-------|------|
| `/` | Landing (Hero, Features, Benefits, Stats, FAQ, CTA) |
| `/dashboard` | Dashboard with wellness widgets & charts |
| `/mood` | Mood Tracker with emoji selection & timeline |
| `/stress` | Stress Trigger tracking & insights |
| `/journal` | Reflection Journal with mood tags |
| `/toolkit` | Wellness Toolkit (breathing, focus, etc.) |
| `/profile` | Profile, achievements & preferences |

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn-style primitives
│   ├── layout/       # App shell, sidebar, nav
│   ├── dashboard/    # Stat cards, charts
│   ├── mood/         # Mood selector, timeline
│   ├── journal/      # Journal components
│   ├── toolkit/      # Toolkit cards
│   └── landing/      # Landing page sections
├── pages/            # Route pages (lazy loaded)
├── hooks/            # useMoodData, useDashboardStats, useAnimations
├── store/            # Zustand stores (mood, journal, stress, profile)
├── data/             # Mock data
├── constants/        # Routes, moods, stress triggers
├── utils/            # cn, formatDate, sanitize
└── types/            # TypeScript interfaces
```

## Accessibility

- WCAG AA color contrast
- Skip link, ARIA labels, keyboard navigation
- Focus indicators on all interactive elements
- `prefers-reduced-motion` respected for GSAP & Framer Motion

## License

MIT
