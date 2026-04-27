import Image from "next/image";
import Link from "next/link";

export function Logo({ size = 40, withWordmark = true, href = "/" }: { size?: number; withWordmark?: boolean; href?: string | null }) {
  const inner = (
    <span className="inline-flex items-center gap-3">
      <Image
        src="/brand/starrytrader-logo-light.png"
        alt="StarryTrader"
        width={size}
        height={size}
        priority
        className="h-auto w-auto"
        style={{ height: size, width: "auto" }}
      />
      {withWordmark && (
        <span className="font-display text-[18px] font-semibold tracking-tight text-ink-primary">
          StarryTrader
        </span>
      )}
    </span>
  );
  return href ? <Link href={href} aria-label="StarryTrader home">{inner}</Link> : inner;
}
