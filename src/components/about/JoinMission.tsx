import Link from "next/link";
import { Reveal } from "@/components/decoration/Reveal";
import { aboutMission } from "@/content/about";

/**
 * Section H. Four open-role cards. Each card links to /careers/[slug].
 */
export function JoinMission() {
  return (
    <section id="join" className="relative bg-light-pale py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-starry-violet-deep">
            {aboutMission.eyebrow}
          </p>
          <h2 className="mt-5 text-section text-balance text-ink-on-light">{aboutMission.title}</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-3xl text-body-lg text-ink-on-light-soft">{aboutMission.lead}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {aboutMission.roles.map((role, i) => (
            <Reveal key={role.slug} delay={0.1 + i * 0.06}>
              <Link
                href={`/careers/${role.slug}`}
                className="group block h-full rounded-[20px] border border-starry-violet-soft/25 bg-white p-7 shadow-[0_18px_40px_-22px_rgba(31,39,71,0.18),0_1px_2px_rgba(31,39,71,0.04)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-starry-violet/40 hover:shadow-[0_28px_56px_-26px_rgba(76,63,224,0.25)]"
              >
                <h3 className="font-display text-[20px] font-semibold leading-snug text-ink-on-light">
                  {role.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-on-light-soft">{role.body}</p>
                <p className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-starry-violet-deep">
                  <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-starry-violet-deep" />
                  {role.location}
                </p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-starry-violet-deep transition-transform duration-200 group-hover:translate-x-1">
                  See the role <span aria-hidden>→</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-12 text-center">
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-starry-violet-deep hover:text-starry-violet"
            >
              See all open roles <span aria-hidden>→</span>
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
