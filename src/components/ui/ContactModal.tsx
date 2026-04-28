"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export type ContactAudience = "general" | "partnership" | "sponsorship" | "press" | "careers";

const audiences: { value: ContactAudience; label: string }[] = [
  { value: "general", label: "General" },
  { value: "partnership", label: "Partnership" },
  { value: "sponsorship", label: "Sponsorship" },
  { value: "press", label: "Press" },
  { value: "careers", label: "Careers" },
];

const subjects: Record<ContactAudience, string> = {
  general: "General inquiry",
  partnership: "Partnership inquiry",
  sponsorship: "Sponsorship inquiry",
  press: "Press inquiry",
  careers: "Careers inquiry",
};

export function ContactModal({ open, initialAudience = "general", onClose }: { open: boolean; initialAudience?: ContactAudience; onClose: () => void }) {
  const [audience, setAudience] = useState<ContactAudience>(initialAudience);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) setAudience(initialAudience);
  }, [open, initialAudience]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`[${subjects[audience]}] ${name || "inbound from starrytrader.com"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nOrganisation: ${org}\nInquiry type: ${subjects[audience]}\n\n${message}\n\nSent from starrytrader.com.`,
    );
    window.location.href = `mailto:${site.contact.general}?subject=${subject}&body=${body}`;
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
        >
          <div className="absolute inset-0 bg-starry-deep/70 backdrop-blur-md" />
          <motion.div
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[24px] border border-white/10 bg-starry-mid p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.18em] text-starry-blue-light">Get in touch</p>
                <h3 id="contact-title" className="text-sub text-ink-primary">
                  Let&rsquo;s talk.
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink-primary"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="mb-2 block text-caption text-ink-soft">Inquiry type</label>
                <div className="flex flex-wrap gap-2">
                  {audiences.map((a) => (
                    <button
                      type="button"
                      key={a.value}
                      onClick={() => setAudience(a.value)}
                      className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                        audience === a.value
                          ? "border-starry-blue-light bg-starry-blue-light/10 text-starry-blue-light"
                          : "border-white/10 text-ink-soft hover:border-white/30 hover:text-ink-primary"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" value={name} onChange={setName} required />
                <Field label="Organisation" value={org} onChange={setOrg} />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-caption text-ink-soft">Message</label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-starry-deep/60 px-4 py-3 text-[15px] text-ink-primary placeholder-ink-muted focus:border-starry-blue-light focus:outline-none"
                  placeholder="Tell us a bit about why you&rsquo;re reaching out."
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-caption text-ink-muted">
                  We read everything. We respond within 48 hours.
                </p>
                <Button type="submit" variant="primary" size="md">
                  Send message
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  const id = `f-${label.toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-caption text-ink-soft">
        {label}
        {required && <span className="ml-1 text-starry-blue-light">*</span>}
      </label>
      <input
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-starry-deep/60 px-4 py-3 text-[15px] text-ink-primary placeholder-ink-muted focus:border-starry-blue-light focus:outline-none"
      />
    </div>
  );
}
