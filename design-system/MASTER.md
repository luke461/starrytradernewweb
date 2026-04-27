# StarryTrader Capability Showcase — Master Design System

This is the project's source of truth for visual decisions. Page-level overrides
live in `design-system/pages/<page>.md`. Read this file first; if a page file
exists, its rules override these.

Synthesised from the v4.0 brief (Section 2 reference languages) and the
ui-ux-pro-max skill recommendations (Modern Dark Cinema style + Bento Grid
Showcase landing pattern).

---

## 1. Visual Direction

| Layer | Reference | Contribution |
|---|---|---|
| Backbone | Linear | Dark cosmic base, gradient stops, modular grid, crisp type, bento layouts |
| Warmth | Headspace | Hand-drawn celestial illustrations, soft pastels, generous whitespace |
| Cinematography | Superhuman | Premium product mockups, big quote moments, awards strip, logo wall |

Net result: a **night sky observatory**. Modern, premium, emotionally safe,
unmistakably credible.

---

## 2. Color Tokens

Defined in `src/app/globals.css` under `@theme`. The `--starry-*` and `--text-*`
custom properties mirror the brief's Section 3 names so CSS-in-JS gradient
strings can use them verbatim.

| Token | Hex | Usage |
|---|---|---|
| `--starry-base-deep` | `#0B1024` | Page background, footer |
| `--starry-base-mid`  | `#131A35` | Card surface |
| `--starry-base-soft` | `#1F2747` | Elevated surface, dividers |
| `--starry-gold`      | `#F2C744` | Eyebrows, stat numbers, focus rings, accents |
| `--starry-gold-soft` | `#FFE38A` | Hover variant of gold |
| `--starry-violet`    | `#6B5BFF` | Cosmic gradient primary |
| `--starry-pink`      | `#FF8FB1` | CTA gradient start |
| `--starry-coral`     | `#FFB47A` | CTA gradient end |
| `--text-primary`     | `#FFFFFF` | Primary copy |
| `--text-soft`        | `#C7CCE6` | Secondary copy |
| `--text-muted`       | `#8089AD` | Captions, source citations |
| `--success-soft`     | `#7AE0B6` | Sentiment positive, completion |
| `--neutral-warm`     | `#E8E4D8` | Reserved for warm accents |

**TODO before launch:** verify each `--starry-*` against starrytrader.com via
DevTools and update.

### Gradient signatures

- **Hero cosmic:** radial violet at 18%/18% → radial pink at 82%/28% → linear
  base-deep to base-mid (`bg-hero-cosmic` utility).
- **CTA pill:** linear pink → coral. On hover: violet → pink.
- **Stat number:** linear gold → gold-soft → pink, clipped to text.
- **Section divider band:** horizontal mid → soft → mid (`bg-section-fade`).

### Star highlight

Use `--starry-gold` only for: eyebrows, stat numbers, focus rings, award icons,
nav logo glyph, sparkle accents, and the "Singapore ↔ Chicago" connector.
**Never on body text.**

---

## 3. Typography

| Role | Family | Weights | Size scale |
|---|---|---|---|
| Display (H1, H2, hero, big numbers) | Inter (variable) | 600, 700 | 96 / 56 / 32 |
| Body | Inter | 400, 500 | 17 desktop, 16 mobile |
| Mono (stat callouts, eyebrows, source citations) | JetBrains Mono | 500, 700 | 11–14 |

Letter-spacing `-0.02em` on display sizes. Line-height 1.04–1.15 display, 1.55
body. All fonts self-hosted via `next/font` so we hit FCP without a network
round-trip.

**TODO before launch:** consider swapping body to General Sans via Fontshare for
the warmer geometry the brief calls for. Inter is the safe default.

---

## 4. Layout & Rhythm

- **Container:** `max-w-7xl mx-auto px-5 md:px-8` for content sections.
- **Section spacing:** `py-28 md:py-36` between major sections.
- **Card radius:** 20px standard, 24px modals, 28px stats band.
- **Grid system:** 8pt baseline; spacing tokens follow Tailwind's defaults
  (4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 112 / 144).
- **Breakpoints:** 480 / 768 / 1024 / 1280 (Tailwind defaults).

---

## 5. Motion

- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` everywhere. Exposed as
  `--ease-cinematic` and used in Framer Motion variants.
- **Reveal:** sections fade in + translate up 16px once on scroll into view.
  Implemented in `src/components/decoration/Reveal.tsx`.
- **Star field:** three parallax depths in `StarField.tsx`; twinkle and
  scroll-offset disabled under `prefers-reduced-motion` (universal disable in
  `globals.css`).
- **CTA hover:** gradient swap pink→coral becomes violet→pink, plus 1px lift
  and shadow expansion, all in 240ms.
- **Modals:** scale 0.97→1 + 16px y rise + fade in 280ms with
  backdrop-blur scrim at 70% opacity.
- **Anti-patterns:** no infinite decorative animations, no scroll-jacking, no
  content-shifting hovers, no animated emojis.

---

## 6. Components

| Component | File | Notes |
|---|---|---|
| Button | `src/components/ui/Button.tsx` | Variants: primary (gradient pill), secondary (text + arrow), ghost |
| Card | `src/components/ui/Card.tsx` | Glow tints (violet/gold/pink), interactive lift |
| StatNumber | `src/components/ui/StatNumber.tsx` | Mono, optional gradient text-clip |
| SectionHeading | `src/components/ui/SectionHeading.tsx` | Eyebrow + display H2 + balanced subtitle |
| ContactModal | `src/components/ui/ContactModal.tsx` | Audience tabs, mailto submit |
| DemoModal | `src/components/ui/DemoModal.tsx` | Chapter scrub, "coming soon" placeholder |
| PhoneMockup | `src/components/decoration/PhoneMockup.tsx` | Mouse-tilt via Framer springs |
| StarField | `src/components/decoration/StarField.tsx` | Three-layer canvas parallax |
| Sparkle, Constellation | `src/components/decoration/Sparkle.tsx` | Hand-drawn celestial primitives |

---

## 7. Content Guardrails

These reflect brief Section 11 and are enforced by review before publish:

1. **No em dashes anywhere on the site.** Use periods, commas, colons, parens,
   or "and" instead. Applies to body, headlines, captions, blog posts, team
   bios, press pull quotes (rewrite source if needed), meta descriptions.
2. No language resembling investment advice (no "buy / sell / outperform /
   guaranteed return").
3. Compliance line in footer + on the capability section.
4. Stats cited inline with source and year.
5. Awards must be real before they appear on the live site.
6. Press pull quotes must come from the published article text.
7. Team profile pages reviewed by the member before publishing.
8. Logo and brand colors verified against starrytrader.com via DevTools.

---

## 8. Anti-patterns to avoid

From the skill's recommendations and the brief Section 2:

- Generic SaaS purple gradients (we use violet→pink intentionally, never as
  the dominant brand voice).
- Stock photography of any kind (illustrated avatars only).
- Finance clichés: bull/bear icons, candlestick chart decoration, green
  up-arrows.
- Glassmorphism overkill (used only on Nav backdrop and modal scrims).
- "AI sparkle" iconography (use celestial sparkles, not 4-point AI sparkles).
- Pure `#000000` backgrounds (causes OLED smear; we use `#0B1024`).
- Content-shifting hover transforms (we use opacity, color, and translate
  only).
- Decorative-only infinite animations.

---

## 9. Page overrides

When a page needs to deviate (e.g., the blog post layout's reading-column
width, or a future product-deep-dive), add a file at
`design-system/pages/<page>.md` and read it as the override layer. None exist
yet.
