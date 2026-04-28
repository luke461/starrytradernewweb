"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

type Audience = "general" | "partnership" | "sponsorship" | "press" | "careers";

const audiences: { value: Audience; label: string }[] = [
  { value: "general", label: "General" },
  { value: "partnership", label: "Partnership" },
  { value: "sponsorship", label: "Sponsorship" },
  { value: "press", label: "Press" },
  { value: "careers", label: "Careers" },
];

const subjects: Record<Audience, string> = {
  general: "General inquiry",
  partnership: "Partnership inquiry",
  sponsorship: "Sponsorship inquiry",
  press: "Press inquiry",
  careers: "Careers inquiry",
};

export function ContactForm({ defaultAudience = "general" }: { defaultAudience?: Audience }) {
  const [audience, setAudience] = useState<Audience>(defaultAudience);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`[${subjects[audience]}] ${name || "inbound from starrytrader.com"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nOrganisation: ${org}\nInquiry type: ${subjects[audience]}\n\n${message}\n\nSent from starrytrader.com.`,
    );
    window.location.href = `mailto:${site.contact.general}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={submit} className="space-y-6">
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
          rows={5}
          className="w-full resize-none rounded-xl border border-white/10 bg-starry-deep/60 px-4 py-3 text-[15px] text-ink-primary placeholder-ink-muted focus:border-starry-blue-light focus:outline-none"
          placeholder="Tell us a bit about why you&rsquo;re reaching out."
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-caption text-ink-muted">We read everything. We respond within 48 hours.</p>
        <Button type="submit" variant="primary" size="md" magnetic>Send message</Button>
      </div>
    </form>
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
