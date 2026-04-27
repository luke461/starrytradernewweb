# StarryTrader Capability Showcase — Master Design System (v4.1)

This is the project's source of truth for visual decisions. Page-level overrides
live in `design-system/pages/<page>.md`. Read this file first; if a page file
exists, its rules override these.

Synthesised from v4.0 brief (Section 2 reference languages) plus the v4.1
iteration brief (Sections 1–4).

---

## 1. Visual direction

| Layer | Reference | Contribution |
|---|---|---|
| Backbone | Linear | Lighter-than-pitch dark base, modular grid, crisp type, bento layouts |
| Warmth | Headspace | Hand-drawn celestial illustrations, soft pastels, generous whitespace, light-surface sections |
| Cinematography | Superhuman | Premium product mockups (pinned-scroll on /product), big quote moments, awards strip, logo wall |

Net result: a **night sky observatory that breathes**. Modern, premium,
emotionally safe, with intentional moments of light to break up the dark.

---

## 2. Color tokens (v4.1)

Defined in `src/app/globals.css` under `@theme`. Plain `--starry-*` and
`--text-*` properties are also exposed for CSS-in-JS gradient strings.

### Dark base (lighter than v4.0)

| Token | Hex | Usage |
|---|---|---|
| `--starry-base-deep` | `#131A35` | Page background, footer |
| `--starry-base-mid`  | `#1F2747` | Card surface |
| `--starry-base-soft` | `#2A3360` | Elevated surface, dividers |

### Light surfaces (NEW)

| Token | Hex | Usage |
|---|---|---|
| `--starry-surface-pale` | `#F4F6FF` | Pillars teaser, Final CTA |
| `--starry-surface-mist` | `#E4E9FF` | Press teaser |

### Accents

| Token | Hex | Usage |
|---|---|---|
| `--starry-violet-deep` | `#4C3FE0` | Primary CTA background |
| `--starry-violet`      | `#6B5BFF` | Brand accent, link color on light, hover state |
| `--starry-violet-soft` | `#9B8FFF` | Card glows, sentiment chips, illustration accents |
| `--starry-blue-light`  | `#7FC8FF` | Highlight color (replaces v4.0 gold). Eyebrows, stat numbers, focus rings, nav active indicator |
| `--starry-blue-soft`   | `#B8DEFF` | Hover variant of blue-light |

### Text

| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#FFFFFF` | Primary copy on dark |
| `--text-soft` | `#C7CCE6` | Secondary copy on dark |
| `--text-muted` | `#8089AD` | Captions, citations |
| `--text-on-light` | `#1F2747` | Primary copy on light surfaces |
| `--text-on-light-soft` | `#4C5577` | Secondary copy on light surfaces |

**Removed in v4.1:** `--starry-gold`, `--starry-gold-soft`, `--starry-pink`,
`--starry-coral` (the pink and coral family is reserved for illustration use,
never CTA).

**TODO before launch:** verify each `--starry-*` against starrytrader.com via
DevTools and update.

### Gradient signatures

- **Hero cosmic:** radial violet at 18%/18% → radial blue-light at 82%/28% →
  linear base-deep to mid (`bg-hero-cosmic` utility).
- **Light pale:** radial violet-soft + radial blue-light over `surface-pale`
  (`bg-light-pale` utility).
- **Light mist:** radial blue-light + radial violet-soft over `surface-mist`
  (`bg-light-mist` utility).
- **CTA pill:** solid `--starry-violet-deep`. Hover: solid `--starry-violet`
  with `--starry-blue-light` ring.
- **Section divider band:** horizontal mid → soft → mid (`bg-section-fade`).

---

## 3. Surface alternation

The home page uses an alternating pattern with SVG wave dividers between
surfaces of different colors. Other routes mix surfaces as needed.

```
Hero                      dark    --starry-base-deep
↓ wave divider
Pillars Teaser            light   bg-light-pale
↓ wave divider (up curve)
Research Stats Teaser     dark    --starry-base-deep
↓ wave divider
Press Teaser              light   bg-light-mist
↓ wave divider (up curve)
Team Teaser               dark    --starry-base-deep
Final CTA                 light   bg-light-pale + violet/blue gradient
Footer                    dark    --starry-base-deep
```

Cards on light surfaces use `surface="light"` prop on `<Card>` (and `<Button>`,
`<SectionHeading>`). On dark surfaces, the default surface applies.

---

## 4. Typography (preserved from v4.0)

| Role | Family | Weights | Size scale |
|---|---|---|---|
| Display | Inter (variable) | 600, 700 | 96 / 56 / 32 |
| Body | Inter | 400, 500 | 17 desktop, 16 mobile |
| Mono | JetBrains Mono | 500, 700 | 11–14 |

Letter-spacing `-0.02em` on display sizes. Line-height 1.04–1.15 display, 1.55
body. Self-hosted via `next/font`.

---

## 5. Motion

- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` everywhere. `--ease-cinematic`.
- **Reveal:** sections fade in + translate up 16px once on scroll into view.
- **Star field:** three parallax depths in `StarField.tsx`; twinkle and
  scroll-offset disabled under `prefers-reduced-motion`.
- **CursorFollow:** soft 200px radial-gradient that lerps after the cursor on
  desktop only (hidden on touch + reduced-motion).
- **Magnetic CTAs:** `<Button magnetic>` opts in. Inner span shifts up to 4px
  toward the cursor when within 80px.
- **CountUp:** `<CountUp value="62%" />` counts from 0 over 1.2s when scrolled
  into view (IntersectionObserver, ease-out cubic). Honours reduced-motion.
- **PillarsPinned (/product):** GSAP ScrollTrigger pins the phone mockup
  center-screen across three viewport-height segments. Falls back to a stacked
  layout under 1024px.
- **AnimatedConnector:** SVG path "draws" from each card to the center label
  on the press teaser as the section enters view.
- **TooManyWords:** word-by-word reveal with blur-in for Andre's "Too many
  words." pull quote.
- **NsBunkToNus:** SVG path drawn from NS bunk to NUS to a future star.
- **Reading progress:** thin `--starry-blue-light` bar pinned to viewport top
  on blog post pages.
- **Filter chip morph:** animated underline slides between active chips on
  `/blog`. LayoutGroup + AnimatePresence for the post stagger.
- **Modals:** scale 0.97→1 + 16px y rise + fade in 280ms with backdrop-blur
  scrim at 70% opacity.

---

## 6. Components

| Component | File | Notes |
|---|---|---|
| Button | `src/components/ui/Button.tsx` | Variants: primary, outline, secondary, ghost. `surface="dark"` (default) or `"light"`. `magnetic` opt-in. |
| Card | `src/components/ui/Card.tsx` | Glow tints (violet, blue, none). `surface="dark"` or `"light"`. Interactive lift on hover. |
| StatNumber | `src/components/ui/StatNumber.tsx` | Static stat. Use `CountUp` for animated. |
| CountUp | `src/components/decoration/CountUp.tsx` | Animated count from 0 with ease-out. |
| SectionHeading | `src/components/ui/SectionHeading.tsx` | Eyebrow + display H2 + balanced subtitle. `surface="light"` switches text colors. |
| ContactModal | `src/components/ui/ContactModal.tsx` | Audience tabs, mailto submit. Used by global `useUi()` provider. |
| ContactForm | `src/components/sections/ContactForm.tsx` | Standalone form for `/contact`. |
| DemoModal | `src/components/ui/DemoModal.tsx` | "Coming soon" placeholder for the product walkthrough. |
| PhoneMockup | `src/components/decoration/PhoneMockup.tsx` | Mouse-tilt via Framer springs. |
| StarField | `src/components/decoration/StarField.tsx` | Three-layer canvas parallax. |
| CursorFollow | `src/components/decoration/CursorFollow.tsx` | Radial-gradient cursor follow on desktop. |
| Sparkle, Constellation | `src/components/decoration/Sparkle.tsx` | Hand-drawn celestial primitives, default tone `blue`. |
| Reveal | `src/components/decoration/Reveal.tsx` | Scroll-into-view fade + 16px translate. |
| AnimatedConnector | `src/components/decoration/AnimatedConnector.tsx` | SVG "draws on scroll" connector with end stars. |
| WaveDivider | `src/components/decoration/WaveDivider.tsx` | SVG wave between two surface colors. |
| ReadingProgress | `src/components/decoration/ReadingProgress.tsx` | Pinned top bar for blog posts. |
| TooManyWords / NsBunkToNus | `src/components/sections/TooManyWords.tsx` | Andre profile signature moments. |
| PillarsPinned | `src/components/sections/PillarsPinned.tsx` | GSAP-driven pinned scroll on `/product`. |

---

## 7. Content guardrails

These reflect brief Section 11 and are enforced by review before publish.
See also `README-CONTENT.md` for the editor-facing version.

1. **No em dashes anywhere on the site.**
2. No language resembling investment advice.
3. Compliance line in footer + on the `/product` capability section.
4. Stats cited inline with source and year.
5. Awards must be real before they appear on the live site.
6. Press pull quotes must come from the published article text.
7. Team profile pages reviewed by the member before publishing.
8. Logo and brand colors verified against starrytrader.com via DevTools.

---

## 8. Anti-patterns to avoid

From the brief Section 2 and the v4.1 iteration:

- Generic SaaS purple gradients (we use violet→blue intentionally).
- Stock photography (illustrated avatars only).
- Finance clichés: bull/bear icons, candlestick chart decoration, green
  up-arrows.
- Glassmorphism overkill (used only on Nav backdrop and modal scrims).
- "AI sparkle" iconography (use celestial sparkles, not 4-point AI sparkles).
- Pure `#000000` backgrounds.
- Content-shifting hover transforms.
- Decorative-only infinite animations.
- **v4.1: any gold or warm-metallic color anywhere.** Highlight is light blue.
- **v4.1: pink-to-coral CTAs.** CTAs are solid violet-deep.

---

## 9. Page overrides

When a page needs to deviate, add a file at
`design-system/pages/<page>.md` and read it as the override layer. None exist
yet.
