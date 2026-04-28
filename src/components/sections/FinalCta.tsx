"use client";

import { Button } from "@/components/ui/Button";
import { Sparkle } from "@/components/decoration/Sparkle";
import { Reveal } from "@/components/decoration/Reveal";
import { GracefulImage } from "@/components/decoration/GracefulImage";
import { useUi } from "@/components/providers/UiProvider";
import { site } from "@/lib/site";

/**
 * v4.3 split-audience Final CTA. Replaces the v4.1 'Want to talk?' single
 * CTA with a two-card layout aimed at learners and institutions.
 */
export function FinalCta() {
  const { openContact } = useUi();
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 25% 20%, rgba(107, 91, 255, 0.20), transparent 65%), radial-gradient(ellipse 50% 45% at 80% 80%, rgba(127, 200, 255, 0.18), transparent 65%), #F4F6FF",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <Sparkle tone="violet" size={28} className="mx-auto mb-6" />
          <Reveal>
            <h2 className="text-hero text-ink-on-light">Three ways to be part of this.</h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal delay={0.05}>
            <div className="group relative h-full overflow-hidden rounded-[24px] border border-starry-violet-soft/25 bg-white p-8 shadow-[0_18px_40px_-22px_rgba(31,39,71,0.18),0_1px_2px_rgba(31,39,71,0.04)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-starry-violet/40 hover:shadow-[0_30px_56px_-26px_rgba(76,63,224,0.30)]">
              <h3 className="font-display text-[28px] font-semibold leading-tight text-ink-on-light">
                For learners.
              </h3>
              <p className="mt-3 text-body text-ink-on-light-soft">
                Start where you are. We&rsquo;ve got the rest.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={site.appLinks.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                  className="inline-flex transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
                >
                  <GracefulImage
                    src="/images/store/app-store.svg"
                    alt="Download on the App Store"
                    width={170}
                    height={56}
                    className="h-14 w-auto"
                    fallback={
                      <span className="inline-flex h-14 items-center gap-2 rounded-xl bg-black px-5 text-[15px] font-semibold text-white">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M16.5 1.5c.1 1.4-.5 2.7-1.4 3.7-1 1-2.3 1.7-3.6 1.6-.1-1.3.5-2.7 1.4-3.6.9-1 2.4-1.7 3.6-1.7Zm4.4 16.5c-.6 1.4-.9 2-1.7 3.2-1.1 1.7-2.6 3.7-4.5 3.7-1.7 0-2.2-1.1-4.5-1.1-2.3 0-2.8 1.1-4.5 1.1-1.9 0-3.4-1.9-4.5-3.5C-.4 16.7-1 11.5 1 8.4 2.5 6.2 4.7 4.9 6.8 4.9c1.7 0 3 .9 4.4.9 1.4 0 2.2-.9 4.3-.9 1.6 0 3.3.9 4.5 2.4-3.9 2.1-3.3 7.7 1.0 8.7Z" />
                        </svg>
                        App Store
                      </span>
                    }
                  />
                </a>
                <a
                  href={site.appLinks.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                  className="inline-flex transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
                >
                  <GracefulImage
                    src="/images/store/google-play.svg"
                    alt="Get it on Google Play"
                    width={190}
                    height={56}
                    className="h-14 w-auto"
                    fallback={
                      <span className="inline-flex h-14 items-center gap-2 rounded-xl bg-black px-5 text-[15px] font-semibold text-white">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M3.6 1.5c-.4.4-.6 1-.6 1.7v17.6c0 .7.2 1.3.6 1.7l11.1-11-11.1-10Zm12.5 11.4 3.6 2c1.1.6 1.1 1.7 0 2.3l-3.4 1.9-3.6-3.6 3.4-2.6Zm-1.4-1.4L4.6 22.4l9.5-5.4-2.4-3.5Zm0-2.0L11.7 6 4.6 1.6l10.1 7.9Z"/>
                        </svg>
                        Google Play
                      </span>
                    }
                  />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="group relative h-full overflow-hidden rounded-[24px] border border-starry-violet-soft/25 bg-white p-8 shadow-[0_18px_40px_-22px_rgba(31,39,71,0.18),0_1px_2px_rgba(31,39,71,0.04)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-starry-violet/40 hover:shadow-[0_30px_56px_-26px_rgba(76,63,224,0.30)]">
              <h3 className="font-display text-[28px] font-semibold leading-tight text-ink-on-light">
                Join the community.
              </h3>
              <p className="mt-3 text-body text-ink-on-light-soft">
                Follow along, ask questions, watch us build in public.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group/social inline-flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(225,48,108,0.45)]"
                  style={{ background: "linear-gradient(135deg, #FCAF45 0%, #E1306C 50%, #833AB4 100%)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
                  </svg>
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(10,102,194,0.5)]"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M4 4h4v4H4Zm0 6h4v10H4Zm6 0h4v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 4.4 2 4.4 5V20h-4v-5.2c0-1.6-.6-2.5-1.9-2.5-1.4 0-2.1.9-2.1 2.5V20h-4Z" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="group relative h-full overflow-hidden rounded-[24px] border border-starry-violet-soft/25 bg-white p-8 shadow-[0_18px_40px_-22px_rgba(31,39,71,0.18),0_1px_2px_rgba(31,39,71,0.04)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-starry-violet/40 hover:shadow-[0_30px_56px_-26px_rgba(76,63,224,0.30)]">
              <h3 className="font-display text-[28px] font-semibold leading-tight text-ink-on-light">
                For institutions.
              </h3>
              <p className="mt-3 text-body text-ink-on-light-soft">
                Help us reach more young people.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="lg" surface="light" onClick={() => openContact("partnership")} withArrow magnetic>
                  Partner with us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-10 text-center text-caption text-ink-on-light-soft">
          Press inquiries:{" "}
          <a href={`mailto:${site.contact.press}`} className="font-medium text-starry-violet-deep hover:text-starry-violet">
            {site.contact.press}
          </a>
        </p>
      </div>
    </section>
  );
}
