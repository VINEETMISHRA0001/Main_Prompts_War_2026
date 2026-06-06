# Main_Prompts_War_2026

**MindFlow** — A premium mental wellness companion built specifically for students preparing for high-pressure examinations.

Supports NEET, JEE, CUET, CAT, GATE, UPSC, and Board Exams during prep seasons, result periods, and burnout-prone study cycles.

## Problem Statement Alignment

This app helps students:

- Track mood during exam preparation
- Identify stress triggers (exams, results, family pressure, sleep, time management)
- Reflect on emotions through CBT-style journaling
- Build healthy habits with consistency tracking
- Monitor burnout risk and study–life balance
- Receive supportive wellness guidance

## Design System

- **Theme:** Black (#050505) + Emerald Green (#00FF94)
- **Fonts:** Space Grotesk (display), Inter (body)
- **Inspiration:** Headspace, Calm, Apple Health, Linear, Notion

## Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run test` | Unit tests (Vitest + RTL) |
| `npm run test:coverage` | Coverage report |
| `npm run test:e2e` | Playwright E2E tests |

## Architecture

```
src/
├── components/          # Reusable design system
│   ├── PageHeader/      StatCard/     WellnessCard/
│   ├── ChartContainer/  EmptyState/   LoadingState/
│   └── ui/              # shadcn primitives
├── pages/               # Route pages (lazy loaded)
├── hooks/
│   ├── useMoodTracker()
│   ├── useDashboardMetrics()
│   └── useWellnessInsights()
├── store/slices/
│   ├── moodSlice
│   ├── journalSlice
│   ├── wellnessSlice
│   ├── dashboardSlice
│   └── settings (via dashboardSlice)
└── test/                # Vitest setup
```

## Testing

- **Unit:** Vitest + React Testing Library
- **Accessibility:** jest-axe
- **E2E:** Playwright (landing → dashboard → mood flow)

## License

MIT
