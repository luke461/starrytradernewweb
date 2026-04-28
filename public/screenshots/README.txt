App screenshots go here.

Hero phone mockup screenshot:
  Path:   /public/screenshots/hero-watchlist.png  (any name, any extension Next.js Image supports)
  Aspect: 9 x 19.5 (e.g. 540x1170, 1080x2340). Other ratios are cropped via object-cover.
  Format: PNG or JPG.

To wire up:
  1. Drop the file in this folder.
  2. Open src/components/sections/Hero.tsx.
  3. Set the HERO_SCREENSHOT constant near the top of the file:
       const HERO_SCREENSHOT: string | null = "/screenshots/hero-watchlist.png";
  4. Reload. The phone will show the screenshot instead of the placeholder watchlist UI.

To revert: set HERO_SCREENSHOT back to null.
