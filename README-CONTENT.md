# Editing content with Claude Code

You chose not to add a CMS. Instead, all dynamic content lives in TypeScript
files under `src/content/` and you ask Claude Code to update them.

This document tells you (a) where each piece of content lives and (b) how to
phrase requests so Claude Code edits the right thing on the first try.

---

## Where content lives

| What | File | Notes |
|---|---|---|
| Hero "Featured in" logos | `src/content/home.ts` → `hero.trustStrip.logos` | `real: true` shows in normal opacity, `real: false` is faded as a placeholder |
| Three research stats (62% / 43% / 48%) | `src/content/home.ts` → `problemStats` | Used on the home Research Teaser and on `/research` |
| Three product pillars + capability lists | `src/content/home.ts` → `pillars` | Used on the home and on `/product` |
| "Us in numbers" stat band | `src/content/home.ts` → `stats` | Animated count-up. Used on the home and on `/product` |
| User reviews (6 cards) | `src/content/home.ts` → `reviews` | `tone` is `"violet" \| "blue" \| "indigo"` for the gradient flavour |
| Partners (logo wall) | `src/content/home.ts` → `partners` | Only `status: "real"` partners render on the live site |
| Awards (Google Gemini etc.) | `src/content/home.ts` → `awards` | Only `featured: true` shows the hero card |
| Press articles (NUS, Daily NW) | `src/content/home.ts` → `press` | Used on home Press Teaser and on `/press` |
| Team list | `src/content/home.ts` → `team` | `founder: true` puts the card in the founders row |
| Team profiles (full bios) | `src/content/team-bios.ts` | Andre's is the canonical example |
| Blog posts | `src/content/blog-posts.ts` | Title, excerpt, body (array of paragraphs), category, cover gradient |
| Site-wide constants (URLs, emails) | `src/lib/site.ts` | Contact emails, social links, App Store / Play URLs |
| Hero headline / sub-copy | `src/components/sections/Hero.tsx` | Inline in the JSX |

---

## Writing a good request

Claude Code is good at this when you give it three things:

1. **What changed** ("update Andre's third paragraph...")
2. **The new value** (paste it)
3. **Anything sensitive** ("...don't change anything else in the file")

### Examples

**Add a new blog post**

> Add a new blog post to `src/content/blog-posts.ts`:
> - slug: `bond-yields-explained`
> - title: "What bond yields are, in three sentences."
> - category: Beginner
> - author: Andre Liu
> - date: 2026-05-10
> - excerpt: [paste]
> - cover: blue
> - body: [paste paragraphs]
> - readMin: 5

**Swap a press pull quote**

> In `src/content/home.ts`, in the `press` array, replace the Daily Northwestern
> pull quote with this exact text: [paste]. Confirm there are no em dashes in
> the new quote.

**Add a new team member**

> Add a new team member to `src/content/home.ts` `team` array:
> - name: Maya Tan
> - role: Head of Design
> - location: Singapore
> - city: Singapore
> - thinking: "..."
> - founder: false
> Then add a stub bio in `src/content/team-bios.ts` with my paragraph:
> [paste 2 paragraphs]

**Replace an image / illustration**

> I'm dropping a new file at `public/team/maya-tan.jpg`. Switch the Maya Tan
> portrait to use that image instead of the gradient initial. Add proper alt
> text.

**Update the contact email**

> Change the press email in `src/lib/site.ts` to `media@starrytrader.com`.
> Make sure all references on the press page and footer pick up the change.

---

## Image handling

Drop image files into `public/`. Keep folders organised:

```
public/
  brand/         logos
  team/          team portraits
  press/         publication logos
  blog/          blog cover images
  awards/        award icons
```

Then ask Claude Code to wire the image into the relevant component using
`next/image`. AVIF and WebP fallbacks are configured in `next.config.ts`, so
performance is automatic.

For SVG illustrations, drop them in `public/` and inline them as React
components when you want fill-color control.

---

## Hard rules to enforce when editing

These are from the v4.0 brief Section 11 and apply to *all* content:

1. **No em dashes anywhere.** Use periods, commas, colons, parens, or "and"
   instead. This applies to body copy, headlines, captions, blog posts, team
   bios, press pull quotes (rewrite the source if needed), and meta
   descriptions.
2. **No language that resembles investment advice.** No "buy", "sell",
   "outperform", "winning trade", or "guaranteed return" in any user-facing
   copy.
3. **Stats cited inline with source and year.** Every percentage, every claim.
4. **Awards must be real before they appear on the live site.** Don't add
   placeholder awards.
5. **Press pull quotes must come from the published article text.** If the
   source uses an em dash, rewrite it with a period or comma.
6. **Team profile pages must be reviewed by the team member before publishing.**

When in doubt, ask Claude Code to verify by running:

```
grep -rn "—" src/   # must return zero
grep -rn " -- " src/  # must return zero
```

---

## Committing changes

Claude Code creates commits per logical change. The convention:

- One commit per piece of content. Don't batch unrelated edits.
- Commit messages start with `content:` for editorial changes:
  - `content: add new blog post on bond yields`
  - `content: refresh Daily Northwestern pull quote`
  - `content: add Maya Tan to team`
- Push to your remote when you're ready. Netlify will rebuild.

If you want a draft to review before committing, just tell Claude Code:
"Make this change but don't commit yet."

---

## Phone screenshots

When you have real app screenshots ready, drop them in `public/screenshots/`
and swap them into the existing `<PhoneMockup>` slots.

### Where to put files

```
public/screenshots/
  watchlist.png         used by Hero on the home page
  pillar-learn.png      Learn pillar mockup (home + /product)
  pillar-research.png   Research pillar mockup (home + /product)
  pillar-compete.png    Compete pillar mockup (home + /product)
```

Recommended source aspect ratio: **9 × 19.5** (e.g. 540 × 1170, 1080 × 2340).
Anything close works — `object-cover` crops gracefully.

### How to swap

Each phone mockup currently has stylised JSX inside `<PhoneMockup>`. Replace
that JSX with `<PhoneScreenshot src="..." alt="..." />`.

**Hero (`src/components/sections/Hero.tsx`)**

Replace `<WatchlistScreen />` with:

```tsx
<PhoneScreenshot src="/screenshots/watchlist.png" alt="StarryTrader Watchlist" priority />
```

Then delete the `WatchlistScreen` function below it (no longer used). Don't
forget to import: `import { PhoneScreenshot } from "@/components/decoration/PhoneScreenshot";`.

**Pillars (`src/components/decoration/PillarScreen.tsx`)**

This file has three branches (`learn`, `research`, `compete`). Replace each
return block with the matching screenshot:

```tsx
if (pillarId === "learn") return <PhoneScreenshot src="/screenshots/pillar-learn.png" alt="Learn pillar" />;
if (pillarId === "research") return <PhoneScreenshot src="/screenshots/pillar-research.png" alt="Research pillar" />;
return <PhoneScreenshot src="/screenshots/pillar-compete.png" alt="Compete pillar" />;
```

This automatically updates both the home `PillarsTeaser` and the `/product`
`PillarsPinned` mockups.

**Launch animation (`src/components/launch/LaunchAnimation.tsx`)**

Optional. The `PhoneStandIn` component inside this file paints stylised cards
during the 3.5s launch sequence. The user only sees it briefly, so swapping
to a real screenshot is low priority. If you want to: replace the inner
`<div ref={ref}>` and its children with `<PhoneScreenshot src="/screenshots/watchlist.png" alt="" />`,
and remove the `data-launch-card` GSAP stagger animation in the timeline.

### Tip

Just tell Claude Code: *"I dropped four screenshots in public/screenshots/.
Swap them into the Hero and the three pillar mockups."* That's enough.
