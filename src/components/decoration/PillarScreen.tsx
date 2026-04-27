/**
 * Phone-screen content for each of the three product pillars.
 * Shared between PillarsPinned (full-size on /product) and PillarsTeaser
 * (mini-size on the home page).
 */
export function PillarScreen({ pillarId }: { pillarId: string }) {
  if (pillarId === "learn") {
    return (
      <div className="flex h-full flex-col bg-gradient-to-b from-starry-soft via-starry-mid to-starry-deep p-4">
        <p className="font-display text-[14px] font-semibold text-ink-primary">Learning Path</p>
        <p className="mt-1 text-[11px] text-ink-soft">Foundations → Markets → Strategy</p>
        <div className="mt-3 space-y-2">
          {[
            { n: 1, t: "What a stock actually is", done: true },
            { n: 2, t: "Why prices move", done: true },
            { n: 3, t: "Volatility, demystified", done: false, current: true },
            { n: 4, t: "Reading a news headline", done: false },
            { n: 5, t: "Diversification basics", done: false },
          ].map((s) => (
            <div key={s.n} className={`surface-card !rounded-xl !p-3 flex items-center gap-3 ${s.current ? "!border-starry-blue-light/60" : ""}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${s.done ? "bg-success-soft/20 text-success-soft" : s.current ? "bg-starry-blue-light/20 text-starry-blue-light" : "bg-white/5 text-ink-muted"}`}>
                {s.done ? "✓" : s.n}
              </span>
              <p className="text-[12px] text-ink-primary">{s.t}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto surface-card !rounded-xl !p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-starry-blue-light">Daily Jargon · Day 12</p>
          <p className="mt-1 text-[12px] text-ink-primary">Beta</p>
          <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft">A measure of how a stock moves relative to the market. Higher beta = more volatile.</p>
        </div>
      </div>
    );
  }
  if (pillarId === "research") {
    return (
      <div className="flex h-full flex-col bg-gradient-to-b from-starry-soft via-starry-mid to-starry-deep p-4">
        <p className="font-display text-[14px] font-semibold text-ink-primary">Stock Stories</p>
        <p className="mt-1 text-[11px] text-ink-soft">Swipe through the market</p>
        <div className="surface-card mt-3 !rounded-2xl !p-4 flex-1 flex flex-col">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-starry-blue-light">NVDA · Today</p>
          <p className="mt-2 font-display text-[15px] font-semibold leading-snug text-ink-primary">
            Why every chip stock is moving in lockstep right now.
          </p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">
            One macro story is driving sentiment across the entire sector. We unpack it in plain English.
          </p>
          <div className="mt-auto flex gap-2">
            <span className="rounded-full bg-success-soft/15 px-2 py-0.5 text-[10px] text-success-soft">Positive 61%</span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-ink-soft">Neutral 28%</span>
            <span className="rounded-full bg-starry-violet-soft/15 px-2 py-0.5 text-[10px] text-starry-violet-soft">Negative 11%</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-starry-soft via-starry-mid to-starry-deep p-4">
      <p className="font-display text-[14px] font-semibold text-ink-primary">LeetTrade</p>
      <p className="mt-1 text-[11px] text-ink-soft">Scenario 07 of 16</p>
      <div className="surface-card mt-3 !rounded-2xl !p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-starry-blue-light">Scenario</p>
        <p className="mt-1 text-[12.5px] text-ink-primary leading-relaxed">
          A retailer beats earnings but lowers next-quarter guidance. Stock drops 12% pre-market. What do you do?
        </p>
        <div className="mt-3 space-y-2">
          {["Buy the dip", "Hold and re-evaluate at close", "Sell into weakness"].map((opt, i) => (
            <button key={opt} type="button" className={`w-full rounded-lg border px-3 py-2 text-left text-[11.5px] text-ink-soft ${i === 1 ? "border-starry-blue-light/60 text-starry-blue-light" : "border-white/10"}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 surface-card !rounded-xl !p-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">Global leaderboard</p>
        <ol className="mt-2 space-y-1 text-[11px] text-ink-soft">
          <li className="flex justify-between"><span>1. wei.h</span><span className="font-mono text-starry-blue-light">98.2%</span></li>
          <li className="flex justify-between"><span>2. priya.k</span><span className="font-mono text-ink-soft">96.4%</span></li>
          <li className="flex justify-between"><span>3. you</span><span className="font-mono text-ink-soft">94.1%</span></li>
        </ol>
      </div>
    </div>
  );
}
