# Pre-launch checklist (v4.1)

Items that must be resolved before this site goes public. Each is also flagged
inline in the code with a `TODO` comment where applicable.

## Brand & assets

- [ ] **Verified hex values from starrytrader.com** via DevTools. Replace each
      `--starry-*` token in `src/app/globals.css` and `:root` block.
- [ ] **Custom illustrations** to replace placeholder SVG primitives. Stars,
      constellations, soft moon, illustrated avatars, phone mockup screens.
      Files referenced from `src/components/decoration/`.
- [ ] **Real demo video.** `src/components/ui/DemoModal.tsx` currently shows
      a "coming soon" panel. Drop in the recorded walkthrough URL and remove
      the placeholder.

## Content

- [ ] **Co-founder full name + bio.** Update `src/content/home.ts` (`team`
      array entry with slug `co-founder`) and add a real entry to
      `src/content/team-bios.ts`. Also update the founder portrait.
- [ ] **Other team members.** Replace bracketed placeholders in `team` with
      real names, locations, and "what I'm thinking about" lines.
- [ ] **Real reviews** to replace the 6 sample quotes in `reviews`.
- [ ] **Real blog posts** to replace the 3 sample posts in
      `src/content/blog-posts.ts`.
- [ ] **Press pull quote refresh.** The Daily Northwestern card uses a
      placeholder pull quote. Pull the strongest line from the published
      article and swap it in.
- [ ] **Bias quiz on /research.** Currently a "coming soon" teaser card.
      Either build the real quiz or remove the card.

## Trust elements

- [ ] **Partners section.** Currently shows only the three confirmed real
      partners. When new partners land, append them with `status: "real"`.
      Target partners are listed in brief Section 6.8 but must not appear on
      the live site.
- [ ] **Awards section.** Only the Google Gemini honourable mention is
      shown. When additional awards land, add them to `awards` with
      `featured: false`.
- [ ] **Trust strip in hero.** Brief Section 6.2 lists 3 real publications +
      3 placeholders. Currently rendered with reduced opacity for
      placeholders. Remove or replace as press lands.

## Infrastructure

- [ ] **Press email** `press@starrytrader.com` confirmed routable.
- [ ] **Other contact emails** (`team`, `partnerships`, `investors`) confirmed
      routable. Configured in `src/lib/site.ts`.
- [ ] **Research PDF** placed at `public/research/starrytrader-research-2026.pdf`.
      Path configured in `src/lib/site.ts`.
- [ ] **Domain & deploy target.** Netlify is the chosen target. Connect the
      GitHub repo, add the custom domain. Update `metadataBase` URL in
      `src/app/layout.tsx` to match the production domain.
- [ ] **OG image.** Replace the logo at `/brand/starrytrader-logo-light.png`
      with a proper 1200×630 OG composite. Update `openGraph.images` in
      `src/app/layout.tsx`.
- [ ] **Favicon set.** Generate `favicon.ico`, `apple-touch-icon.png`, and
      192/512px PWA icons. Place in `app/` per Next.js convention.

## Compliance

- [ ] **Em-dash audit.** Run `grep -rn "—" src/` and `grep -rn " -- " src/`.
      Both must return zero. The rule is enforced in code review (no
      automated lint rule yet).
- [ ] **Investment-advice language audit.** No "buy / sell / outperform /
      guaranteed return / winning trade" in any user-facing copy.
- [ ] **Compliance line present** in footer (wired) and at the bottom of the
      `/product` capability section (wired).

## Quality

- [ ] **Lighthouse mobile audit.** Target Performance ≥95, Accessibility ≥95,
      Best Practices ≥95, SEO ≥95.
- [ ] **`prefers-reduced-motion` check.** Toggle in DevTools rendering panel
      and confirm parallax, count-up, cursor-follow, and PillarsPinned all
      disable cleanly.
- [ ] **Touch device check.** CursorFollow hidden. Magnetic effect inert.
      PillarsPinned falls back to stacked layout under 1024px.
- [ ] **Breakpoint walk.** Resize through 1280 / 1024 / 768 / 480.
- [ ] **Cross-browser smoke test.** Latest Safari, Chrome, Firefox, Edge.
- [ ] **Netlify build test.** Push to a preview branch, confirm Netlify build
      succeeds end-to-end.

---

## Known build note (Windows only)

Tailwind 4 depends on `lightningcss`, whose platform-specific binary is not
always installed automatically by npm on Windows (and gets dropped by some
subsequent installs). If a fresh install fails with
`Cannot find module '../lightningcss.win32-x64-msvc.node'`, run:

```
npm install --os=win32 --cpu=x64 --include=optional
```

`lightningcss-win32-x64-msvc` is declared as `optionalDependencies` in
`package.json`.

---

## Resolved in v4.1 (no longer on this list)

- ~~CMS integration.~~ User chose to edit content via Claude Code (see
  `README-CONTENT.md`).
- ~~Strip gold tokens.~~ Done in Phase 1.
- ~~Light surface utilities.~~ Done in Phase 1; applied to home in Phase 3.
- ~~Multi-page architecture.~~ Done in Phase 3.
- ~~Page transition + creative treatments.~~ Done in Phase 4 (cursor follow,
  magnetic CTAs, count-up, pinned-scroll pillars, animated press connector,
  "Too many words" reveal, NS bunk visual, blog filter chip morph, reading
  progress bar, 404 page).
