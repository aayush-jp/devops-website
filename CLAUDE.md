# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Terminal-aesthetic portfolio for Aayush JP (Cloud & DevOps Engineer). Single-page Next.js app deployed on AWS EC2 via Docker.

## Commands

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm run lint       # ESLint check
npm run typecheck  # TypeScript compiler check (tsc --noEmit)

# Docker (local only)
docker build -t aayush-portfolio:latest .
docker run -p 3000:3000 aayush-portfolio:latest
```

There are no tests — `package.json` has no test script. `typecheck` and `lint` serve as the automated quality gates in CI.

## Architecture

Single-page app (`app/page.tsx`) that renders all sections sequentially. The page is a client component (`"use client"`) because it holds `commandPaletteOpen` state passed down to `Navbar` and `CommandPalette`.

**Section order:** Hero → TechStack → Projects → Experience → Contact. Each section is wrapped in a `<div id="...">` for the command palette's scroll-to navigation.

**CommandPalette** (`components/CommandPalette.tsx`) uses the `cmdk` library, triggered by `Ctrl+K`. It handles navigation (scroll to section), copying email, and opening external links. The `<Toast>` component is always mounted (even when the palette is closed) to persist toast visibility after the palette closes.

**Animations:** All components use Framer Motion. Sections use `whileInView` with `viewport={{ once: true }}` — animations only trigger once on scroll-in. The hero typing effect runs via `setInterval` in a `useEffect`.

## Styling

Custom terminal color palette defined in `tailwind.config.ts`:

| Token | Hex | Usage |
|---|---|---|
| `terminal-bg` | `#0a0e14` | Page/card backgrounds |
| `terminal-text` | `#b3b1ad` | Body text |
| `terminal-green` | `#39ff14` | Primary accents, CTAs, neon glow |
| `terminal-cyan` | `#59c2ff` | Links, secondary interactive |
| `terminal-yellow` | `#f29668` | Warnings, experience section |
| `terminal-border` | `#1f2937` | Card borders |

Fonts: **JetBrains Mono** (`font-mono`) for all technical/heading text; **Inter** (`font-sans`) for paragraph text. Both loaded via `next/font/google`.

Neon glow is applied via Tailwind's `drop-shadow` utility: `drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]`.

## Content Updates

All content is hardcoded in component files — no CMS or external data source:

- **Projects** → `components/Projects.tsx`, `projects` array
- **Tech stack** → `components/TechStack.tsx`, `techStack` array
- **Experience** → `components/Experience.tsx`, `experiences` array
- **Contact links** → `components/Contact.tsx`, `contactLinks` array (also update email in `CommandPalette.tsx`)
- **Meta / SEO** → `app/layout.tsx`

## CI/CD & Deployment

**Pipeline:** GitHub Actions (`.github/workflows/ci.yml`) — triggers on push to `main` or `dev`.

**Flow:** `lint-and-typecheck → build → docker (build & push to GHCR) → deploy (main only)`

**Deployment:** The Docker image is built on GitHub's runners and pushed to `ghcr.io/aayush-jp/devops-website:latest`. The deploy job SSHes into AWS EC2 (`ubuntu@51.20.59.167`) and pulls the pre-built image — no building happens on EC2.

**Dockerfile:** 3-stage build (deps → builder → runner) producing a standalone Next.js output. `next.config.js` must keep `output: 'standalone'` for this to work.

**Branching:** `main` = production (triggers deploy), `dev` = active development (CI only, no deploy).
