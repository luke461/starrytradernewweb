# StarryTrader — Capability Showcase

Investing, explained.

This is the company-facing site that demonstrates what StarryTrader is building,
who is behind it, and why it deserves attention from investors, partners,
journalists, and the wider fintech and education ecosystem.

> **Not** the consumer app's marketing page. The consumer download lives in the
> footer.

---

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 with custom `@theme` tokens (see `src/app/globals.css`)
- **Animation:** Framer Motion (`Reveal`, `PhoneMockup`, modal transitions)
- **Fonts:** Self-hosted via `next/font` (Inter + JetBrains Mono)
- **Content:** TypeScript data files under `src/content/`

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

If installing on Windows and `next build` fails with
`Cannot find module '../lightningcss.win32-x64-msvc.node'`, run:

```bash
npm install --os=win32 --cpu=x64 --include=optional
```

## Build for production

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/                 Next.js App Router routes
    page.tsx           Home (12 stacked sections)
    blog/              /blog index + /blog/[slug]
    team/[slug]/       Team profiles
    careers/           Stub careers page
  components/
    layout/            Nav, Footer
    sections/          12 home page sections
    ui/                Button, Card, Modals, primitives
    decoration/        StarField, Sparkle, PhoneMockup, Reveal
    providers/         UiProvider (modal state)
  content/             All copy lives here, no JSX
  lib/                 site constants + cn helper
design-system/
  MASTER.md            Source of truth for visual decisions
  pages/               Page-level overrides (none yet)
LAUNCH_CHECKLIST.md    Pre-launch items not yet resolved
```

## Content guardrails

See `design-system/MASTER.md` Section 7 and the brief Section 11.

The biggest one: **no em dashes anywhere**. Use periods, commas, colons, parens
or "and" instead. Apply this to copy, headlines, captions, blog posts, bios,
and press pull quotes (rewrite the source if needed).

## Pre-launch

See `LAUNCH_CHECKLIST.md`.
