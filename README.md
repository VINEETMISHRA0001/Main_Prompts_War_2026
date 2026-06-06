# MindFlow — Mental Wellness Tracker for Exam Students

**MindFlow** is a Phase 1 frontend wellness platform for students preparing for NEET, JEE, CUET, CAT, GATE, UPSC, SSC, and Board Exams.

## Problem Statement Alignment

MindFlow addresses the core challenge: *students under exam pressure lack structured tools to track mental wellness, identify stress early, and build sustainable prep habits.*

| Requirement | Implementation |
|-------------|----------------|
| Mood tracking during exam prep | 8 emotions + 1–10 sliders (sleep, energy, anxiety, confidence) |
| Stress trigger identification | 10 categories including relationships, financial, health, study backlog |
| CBT reflection journaling | Prompts, auto-save draft, search, sanitized input |
| Healthy habit building | Daily habits + study–life balance hour logging |
| Burnout prevention | Low / Medium / High / Critical tiers with recommendations |
| Progress visibility | Dashboard trends, heatmap, streaks, XP, achievements |
| Voice wellness check-ins | Scheduled reminders + voice-only modal with prosody analysis |
| Safety & guardian support | NLP safety filter → crisis UI → guardian alert (summary only) |
| AI guidance | Sage AI (Perplexity-style) with sources, streaming, voice-first |

## Quick Start

```bash
npm install
npm.cmd run dev   # Windows PowerShell
```

Open **http://localhost:5173/desktop** — the main MindFlow OS experience.

## Routes

| Route | Destination |
|-------|-------------|
| `/` | Landing page |
| `/desktop` | MindFlow OS (desktop shell) |
| `/desktop?app=sage-ai` | Sage AI voice wellness hub |
| `/mood`, `/journal`, `/habits`, etc. | Redirect to desktop apps |

## Architecture

```
src/
├── components/
│   ├── desktop/       # OS shell, windows, taskbar, console
│   ├── sage-ai/       # Perplexity-style AI UI
│   ├── voice/         # Voice check-in, crisis modal
│   ├── notifications/ # Scheduled in-app reminders
│   └── dashboard/     # Wellness widgets
├── pages/             # Lazy-loaded desktop apps
├── store/slices/      # Zustand (mood, journal, wellness, habits, voice, guardian)
├── services/          # Safety classifier, voice analysis (mock STT for demo)
├── hooks/             # useMoodTracker, useDashboardMetrics, useCheckInScheduler
└── utils/             # syncAchievements, criticalRiskHandler, sanitize
```

## Safety & Guardian Flow

1. Student completes **voice check-in** (scheduled or manual)
2. **Safety classifier** scans transcript for distress, abuse, self-harm language
3. **Prosody analysis** (pitch, energy, agitation) contributes to risk tier
4. **Red/Critical** → crisis modal with India helplines + optional guardian SMS/email (mock)
5. Guardian receives **summary only** by default (no raw transcript)

**Crisis helplines:** Kiran 1800-599-0019 · iCall 9152987821 · Vandrevala 1860-2662-345

## Design System

- **Theme:** Black `#050505` + Emerald `#00FF94` (light/dark toggle)
- **Fonts:** Space Grotesk (display), Inter (body)

## Testing

| Layer | Tool | Coverage |
|-------|------|----------|
| Unit | Vitest + RTL | Stores, services, utils, regression |
| Accessibility | jest-axe | StatCard, MoodSelector, CrisisModal |
| E2E | Playwright + @axe-core/playwright | Desktop OS flows, a11y scans |

```bash
npm run test              # Unit + regression
npm run test:coverage     # Coverage with thresholds
npm run test:e2e          # Playwright E2E
npm run lint              # ESLint (Google-style strict TS rules)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run test` | Vitest unit tests |
| `npm run test:coverage` | Coverage report |
| `npm run test:e2e` | Playwright E2E |
| `npm run lint` | ESLint |

## License

MIT
