"use client";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState, useEffect, useCallback } from "react";

const CAPS_STATIC = [
  { tagColor: "text-blue-400", dotColor: "bg-blue-400", accentRgb: "96, 165, 250" },
  { tagColor: "text-violet-400", dotColor: "bg-violet-400", accentRgb: "167, 139, 250" },
  { tagColor: "text-indigo-400", dotColor: "bg-indigo-400", accentRgb: "129, 140, 248" },
  { tagColor: "text-orange-400", dotColor: "bg-orange-400", accentRgb: "251, 146, 60" },
  { tagColor: "text-sky-400", dotColor: "bg-sky-400", accentRgb: "56, 189, 248" },
  { tagColor: "text-emerald-400", dotColor: "bg-emerald-400", accentRgb: "52, 211, 153" },
  { tagColor: "text-amber-400", dotColor: "bg-amber-400", accentRgb: "251, 191, 36" },
];

const HASHES = ["0xa1f3...c84e","0xb27d...39ff","0xc90e...1a2b","0xd45c...88d0","0xe13a...f55c","0xf628...70ab","0x071b...c31d"];
const AUTO_INTERVAL = 3200;

function BlockChain({ active, total, onSelect }: { active: number; total: number; onSelect: (i: number) => void }) {
  return (
    <div className="select-none mb-10">
      <div className="flex items-center w-full">
        {Array.from({ length: total }).map((_, i) => {
          const confirmed = i < active;
          const current = i === active;
          return (
            <div key={i} className="flex items-center flex-1 min-w-0">
              <button
                onClick={() => onSelect(i)}
                aria-label={`Card ${i + 1}`}
                className={`relative flex flex-col items-center justify-center flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded border sm:rounded-md font-mono transition-all duration-500 cursor-pointer ${
                  current
                    ? "border-emerald-500/50 bg-emerald-950/60 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                    : confirmed
                    ? "border-zinc-700 bg-zinc-900/80 text-zinc-500"
                    : "border-zinc-800/60 bg-zinc-950 text-zinc-700"
                }`}
              >
                {current && (
                  <span className="absolute -inset-[2px] rounded-md border border-emerald-500/20 animate-ping opacity-30" />
                )}
                <span className="text-[7px] sm:text-[9px] leading-none">{String(i + 1).padStart(2, "0")}</span>
                {(confirmed || current) && (
                  <span className="text-[6px] leading-none mt-0.5 text-emerald-500/70">✓</span>
                )}
              </button>
              {i < total - 1 && (
                <div className="flex-1 relative h-px mx-0.5 sm:mx-1.5 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-zinc-800/50" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/70 to-emerald-400/40 origin-left transition-transform duration-600"
                    style={{ transform: i < active ? "scaleX(1)" : "scaleX(0)", transitionDuration: "600ms" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] font-mono text-zinc-700">
          {String(active + 1).padStart(2, "0")}/{total}
        </span>
        <span className="text-[10px] font-mono text-emerald-500/30 hidden sm:block">
          {HASHES[active]}
        </span>
      </div>
    </div>
  );
}

export default function Capabilities() {
  const { ref, inView } = useInView();
  const { t } = useLanguage();
  const caps = t.capabilities;
  const total = caps.items.length;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;

  function getCardStep() {
    const container = scrollRef.current;
    if (!container) return 360;
    const card = container.querySelector('[data-card]') as HTMLElement;
    return (card?.offsetWidth ?? 340) + 20; // card + gap-5
  }

  const goTo = useCallback((index: number, instant = false) => {
    const wrapped = ((index % total) + total) % total;
    const container = scrollRef.current;
    if (container) {
      const step = getCardStep();
      const cardW = step - 20;
      const containerW = container.offsetWidth;
      const scrollLeft = Math.max(0, wrapped * step - containerW / 2 + cardW / 2);
      container.scrollTo({ left: scrollLeft, behavior: instant ? "instant" : "smooth" });
    }
    setActiveIndex(wrapped);
  }, []);

  function scroll(dir: "left" | "right") {
    setPaused(true);
    const next = dir === "right"
      ? (activeRef.current + 1) % total
      : (activeRef.current - 1 + total) % total;
    const wraps = (dir === "right" && activeRef.current === total - 1) ||
                  (dir === "left" && activeRef.current === 0);
    goTo(next, wraps);
    setTimeout(() => setPaused(false), 6000);
  }

  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;
    const step = getCardStep();
    const containerW = container.offsetWidth;
    const cardW = step - 20;
    const index = Math.round((container.scrollLeft + containerW / 2 - cardW / 2) / step);
    setActiveIndex(Math.max(0, Math.min(total - 1, index)));
  }

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => {
      const next = (activeRef.current + 1) % total;
      const wraps = activeRef.current === total - 1;
      goTo(next, wraps);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [inView, paused, goTo, total]);

  return (
    <section
      id="capacidades"
      className="relative bg-zinc-900/40 py-28 noise-overlay"
    >
      {/* Orbs in their own overflow-hidden wrapper so they don't clip the scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-600/4 blur-3xl animate-float-b" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sky-600/4 blur-3xl animate-float-a" />
      </div>
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref}>
          <div className={`mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-mono">{caps.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3">{caps.title}</h2>
            <p className="text-zinc-400 text-base max-w-xl">{caps.subtitle}</p>
          </div>
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <BlockChain active={activeIndex} total={total} onSelect={(i) => { setPaused(true); goTo(i); setTimeout(() => setPaused(false), 6000); }} />
          </div>
        </div>
      </div>

      {/* Scroll area — alinhado com max-w-6xl, sem corte lateral */}
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Fade lateral direito para indicar scroll */}
        <div className="absolute right-0 top-0 bottom-4 w-12 sm:w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pt-4 pb-8 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {caps.items.map((item, i) => {
            const s = CAPS_STATIC[i];
            return (
            <div
              key={item.title}
              data-card
              className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: inView ? `${i * 60 + 100}ms` : "0ms" }}
            >
              <div
                className={`relative border rounded-2xl p-7 card-glow-accent flex flex-col h-full transition-all duration-500 overflow-hidden ${
                  i === activeIndex
                    ? "bg-zinc-900 border-zinc-600 shadow-2xl shadow-black/50 scale-[1.05]"
                    : "bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700 scale-100"
                }`}
                style={{ "--card-accent": s.accentRgb } as React.CSSProperties}
              >
                {/* Active card top accent line */}
                {i === activeIndex && (
                  <div
                    className="absolute top-0 left-8 right-8 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${s.accentRgb}, 0.6), transparent)` }}
                  />
                )}
                <span className={`text-xs font-mono font-medium ${s.tagColor} mb-5 block`}>{item.tag}</span>
                <h3 className="text-white font-semibold text-xl mb-3 leading-snug">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{item.description}</p>
                <ul className="mt-auto space-y-2.5 pt-5 border-t border-zinc-800/50">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-xs text-zinc-400">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dotColor} opacity-80`} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-1.5 mt-2 px-6">
        {caps.items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPaused(true); goTo(i); setTimeout(() => setPaused(false), 6000); }}
            aria-label={`Card ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-white/80" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"}`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
