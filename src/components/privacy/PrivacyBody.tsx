import type { PrivacyBlock, PrivacySection } from "@/content/privacy";

/**
 * Renders the Layer 2 sections (A through K) into clean long-form HTML.
 * Heading hierarchy: page h1 (in the hero) -> section h2 (here) -> h3
 * subheadings inside sections. Body uses generous line-height and
 * monospace section eyebrows for visual rhythm.
 */
export function PrivacyBody({ sections }: { sections: readonly PrivacySection[] }) {
  return (
    <div>
      {sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-28 ${i === 0 ? "" : "mt-16"}`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-starry-violet-deep">
            Section {s.letter}
          </p>
          <h2 className="mt-3 font-display text-[26px] font-semibold leading-tight tracking-tight text-ink-on-light md:text-[30px]">
            {s.title}
          </h2>
          <div className="mt-6 space-y-5">
            {s.blocks.map((b, j) => renderBlock(b, j))}
          </div>
        </section>
      ))}
    </div>
  );
}

function renderBlock(block: PrivacyBlock, key: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={key} className="text-[16px] leading-[1.7] text-ink-on-light md:text-[17px]">
          {block.text}
        </p>
      );
    case "h3":
      return (
        <h3 key={key} className="mt-6 font-display text-[18px] font-semibold leading-snug text-ink-on-light md:text-[19px]">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul
          key={key}
          className="list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-ink-on-light marker:text-starry-violet-deep md:text-[17px]"
        >
          {block.items.map((item, k) => (
            <li key={k}>
              {item.strong && (
                <strong className="font-semibold text-ink-on-light">{item.strong}</strong>
              )}
              {item.strong ? " " : ""}
              {item.text}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={key}
          className="list-decimal space-y-3 pl-5 text-[16px] leading-[1.7] text-ink-on-light marker:font-semibold marker:text-starry-violet-deep md:text-[17px]"
        >
          {block.items.map((item, k) => (
            <li key={k}>
              {item.strong && (
                <strong className="font-semibold text-ink-on-light">{item.strong}</strong>
              )}
              {item.strong ? " " : ""}
              {item.text}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <p
          key={key}
          className="border-l-4 border-starry-blue-light/60 pl-5 text-[15px] italic leading-relaxed text-ink-on-light-soft"
        >
          {block.text}
        </p>
      );
  }
}
