import { Reveal } from "@/components/decoration/Reveal";
import { aboutClosingTagline } from "@/content/about";

/**
 * Section J. Closing band that sits ABOVE the global footer. Centred,
 * large display font, light-blue accent on "For everyone. For free."
 */
export function ClosingTagline() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(107, 91, 255, 0.18), transparent 65%), radial-gradient(ellipse 50% 40% at 80% 50%, rgba(127, 200, 255, 0.18), transparent 65%), #131A35",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 py-20 text-center md:px-8 md:py-28">
        <Reveal>
          <p className="text-section font-display font-semibold leading-tight text-ink-primary">
            {aboutClosingTagline.base}{" "}
            <span className="text-starry-blue-light">{aboutClosingTagline.accent}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
