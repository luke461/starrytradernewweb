import Image from "next/image";

/**
 * Drop-in replacement for the stylised JSX inside any <PhoneMockup>.
 * Use when you have a real app screenshot to display.
 *
 * Recommended source aspect ratio: 9 × 19.5 (e.g. 540 × 1170, 1080 × 2340).
 * Anything close works — `object-cover` crops gracefully.
 *
 * Example:
 *   <PhoneMockup ariaLabel="Watchlist screen">
 *     <PhoneScreenshot src="/screenshots/watchlist.png" alt="StarryTrader Watchlist" priority />
 *   </PhoneMockup>
 */
export function PhoneScreenshot({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 280px, 340px"
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
