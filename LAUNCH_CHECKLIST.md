# Pre-launch checklist

Items that must be resolved before this site goes public. Each is also flagged
inline in the code with a `TODO` comment where applicable.

## Brand & assets

- [ ] **Verified hex values from starrytrader.com** via DevTools. Replace each
      `--starry-*` token in `src/app/globals.css`.
- [ ] **Custom illustrations** to replace placeholder SVG primitives. Stars,
      constellations, soft moon, illustrated avatars, phone mockup screens.
      Spec lives in brief Section 7 ("Illustrations"). Files referenced from
      `src/components/decoration/`.
- [ ] **Real demo video.** `src/components/ui/DemoModal.tsx` currently shows
      a "coming soon" panel. Drop in the recorded walkthrough URL and remove
      the placeholder.

## Content

- [ ] **Co-founder full name + bio.** Update `src/content/home.ts` (`team`
      array entry with slug `co-founder`) and add a real entry to
      `src/content/team-bios.ts`. Also update the founder profile portrait.
- [ ] **Other team members.** Replace the bracketed placeholders in `team`
      with real names, locations, and "what I'm thinking about" lines.
- [ ] **Real reviews** to replace the 6 sample quotes in `reviews`.
- [ ] **Real blog posts** to replace the 3 sample posts in
      `src/content/blog-posts.ts`.
- [ ] **Press pull quote refresh.** The Daily Northwestern card uses a
      placeholder pull quote (`press` array). Pull the strongest line from the
      published article and swap it in.

## Trust elements

- [ ] **Partners section.** Currently shows only the three confirmed real
      partners (NUS School of Computing, Northwestern University, Google
      Gemini). When new partners land, append them to the `partners` array in
      `src/content/home.ts` with `status: "real"`. Target partners are listed
      in brief Section 6.8 but must not appear on the live site.
- [ ] **Awards section.** Only the Google Gemini honourable mention is shown.
      When additional awards land, add them to `awards` in
      `src/content/home.ts` with `featured: false`.
- [ ] **Trust strip in hero.** Brief Section 6.2 lists 3 real publications +
      3 placeholders. Currently rendered with reduced opacity for placeholders.
      Remove or replace as press lands.

## Infrastructure

- [ ] **Press email** `press@starrytrader.com` confirmed routable.
- [ ] **Other contact emails** (`team`, `partnerships`, `investors`) confirmed
      routable. Configured in `src/lib/site.ts`.
- [ ] **Research PDF** placed at `public/research/starrytrader-research-2026.pdf`.
      Path is configured in `src/lib/site.ts`.
- [ ] **Domain & deploy target** decided. Vercel, Cloudflare Pages, or Netlify.
      Update `metadataBase` URL in `src/app/layout.tsx` to match the production
      domain.
- [ ] **OG image.** Replace the logo at `/brand/starrytrader-logo-light.png`
      with a proper 1200×630 OG composite. Update `openGraph.images` in
      `src/app/layout.tsx`.
- [ ] **Favicon set.** Generate `favicon.ico`, `apple-touch-icon.png`, and
      192/512px PWA icons. Place in `app/` per Next.js convention.

## Compliance

- [ ] **Em-dash audit.** Run `grep -rn "—" src/` and `grep -rn " -- " src/` —
      both must return zero. The rule is enforced in code review (no automated
      lint rule yet).
- [ ] **Investment-advice language audit.** No "buy / sell / outperform /
      guaranteed return / winning trade" in any user-facing copy.
- [ ] **Compliance line present** in footer (already wired) and at the bottom
      of the capability section (already wired in `Pillars.tsx`).

## Quality

- [ ] **Lighthouse mobile audit.** Target Performance ≥95, Accessibility ≥95,
      Best Practices ≥95, SEO ≥95.
- [ ] **`prefers-reduced-motion` check.** Toggle in DevTools rendering panel
      and confirm parallax + scroll animations disable.
- [ ] **Breakpoint walk.** Resize through 1280 / 1024 / 768 / 480.
- [ ] **Cross-browser smoke test.** Latest Safari, Chrome, Firefox, Edge.

---

## Known build note (Windows only)

Tailwind 4 depends on `lightningcss`, whose platform-specific binary is not
always installed automatically by npm on Windows. If a fresh install fails
with `Cannot find module '../lightningcss.win32-x64-msvc.node'`, run:

```
npm install --os=win32 --cpu=x64 --include=optional
```

Already declared as `optionalDependencies` in `package.json`.
