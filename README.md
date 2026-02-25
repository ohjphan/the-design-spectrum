# Design Archetype Lab

A lightweight, interactive micro-app that helps product designers discover their dominant design archetype and explore how different archetypes fit across company and project stages.

- **5-question diagnostic** — Answer 5 questions; no sign-up required.
- **Archetype results** — See your dominant (or hybrid) archetype with strengths, risks, best company stage, and project phase.
- **Education layer** — Explore which archetypes thrive at each company stage and project lifecycle phase.

## Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS (Swiss Modernist theme: black, red accent, beige, grays)
- Static JSON data (archetypes, questions, stage-fit, phase-fit); no backend

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run test` — Run Vitest unit tests (scoring logic)

## Routes

- `/` — Landing; CTA to start quiz
- `/quiz` — 5-question flow; redirects to results with `?s=A,B,C,D,E`
- `/results` — Results (reads `?s=...` or shareable `?d=...&s=...`)
- `/explore` — Company Stage + Project Phase

## Shareable results

Results URLs can be shared: `/results?d=systems-thinker&s=strategic-partner` (dominant and optional secondary). Use “Copy result link” on the results page.
