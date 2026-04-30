App store badge images go here. Drop two files:

  app-store.svg     — Apple's "Download on the App Store" badge
                      Recommended: 170×56 (matches sizes used in code)
                      Source: https://developer.apple.com/app-store/marketing/guidelines/

  google-play.svg   — Google's "Get it on Google Play" badge
                      Recommended: 190×56 (matches sizes used in code)
                      Source: https://play.google.com/intl/en_us/badges/

These are referenced from:
  - src/components/sections/Hero.tsx       (Get the app strip)
  - src/components/sections/FinalCta.tsx   (For learners card)

PNGs work too — change the file extension and update the src in both
files (or rename the assets to keep the .svg path).

Until both files exist, GracefulImage falls back to a styled <span> with
text + glyph, so nothing breaks.
