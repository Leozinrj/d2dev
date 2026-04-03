"use client";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlockchainSection() {
  const { ref, inView } = useInView();
  const { t } = useLanguage();
  const bc = t.blockchain;

  return (
    <section className="relative bg-zinc-950 py-28 px-6 noise-overlay overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      {/* Ambient orb */}
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-600/3 blur-[120px] animate-float-b" />
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left: copy */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 font-mono">
              {bc.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6 leading-tight">
              {bc.title[0]}
              <br />
              {bc.title[1]}
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-5">
              {bc.p1}
            </p>
            <p className="text-zinc-400 text-base leading-relaxed mb-8">
              {bc.p2}
            </p>

            <div className="inline-flex items-center gap-2 text-sm text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 rounded-lg px-4 py-2.5 backdrop-blur-sm">
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                className="flex-shrink-0"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 12.75 2.25 2.25L15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              {bc.badge}
            </div>

            {/* Code decoration */}
            <div className="mt-8 font-mono text-[11px] text-zinc-700 hidden lg:block">
              <span className="text-emerald-500/40">contract</span> OrderEscrow <span className="text-zinc-600">{'{'}</span><br/>
              <span className="ml-4 text-zinc-600">function</span> <span className="text-blue-400/40">release</span><span className="text-zinc-700">()</span> <span className="text-zinc-600">external</span> <span className="text-zinc-700">{'{ ... }'}</span><br/>
              <span className="text-zinc-600">{'}'}</span>
            </div>
          </div>

          {/* Right: use cases */}
          <div className="space-y-4">
            {bc.useCases.map((uc, i) => (
              <div
                key={uc.title}
                className={`group flex gap-4 bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 card-glow backdrop-blur-sm transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
                }`}
                style={{ transitionDelay: inView ? `${i * 150 + 100}ms` : "0ms" }}
              >
                <div className="relative w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-500/20 transition-colors duration-300">
                  <span className="text-emerald-400 text-xs font-mono font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm mb-1">{uc.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{uc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
