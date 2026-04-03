"use client";
import { useEffect, useState } from "react";
import TerminalCard from "./TerminalCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const show = (delay: string) =>
    `transition-all duration-700 ${delay} ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950 noise-overlay">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />

      {/* Gradient fades */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950/70" />

      {/* Floating particles */}
      <div className="absolute bottom-32 left-[20%] w-1 h-1 rounded-full bg-blue-400/30" style={{ animation: 'float-particle 6s ease-in-out infinite' }} />
      <div className="absolute bottom-48 left-[60%] w-0.5 h-0.5 rounded-full bg-violet-400/25" style={{ animation: 'float-particle 8s ease-in-out infinite 2s' }} />
      <div className="absolute bottom-24 left-[80%] w-0.5 h-0.5 rounded-full bg-indigo-400/20" style={{ animation: 'float-particle 7s ease-in-out infinite 4s' }} />

      {/* Animated ambient orbs */}
      <div className="absolute top-1/4 left-[15%] w-[600px] h-[500px] bg-blue-600/8 rounded-full blur-[130px] pointer-events-none animate-float-a" />
      <div className="absolute bottom-1/4 right-[10%] w-[450px] h-[400px] bg-violet-600/7 rounded-full blur-[110px] pointer-events-none animate-float-b" />
      <div className="absolute top-2/3 left-[40%] w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[90px] pointer-events-none animate-float-a" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[calc(100vh-10rem)]">
          {/* ── Left: copy ── */}
          <div>
            {/* Badge */}
            <div className={show("delay-0")}>
              <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full px-4 py-1.5 text-xs text-zinc-400 mb-10 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                {h.badge}
              </div>
            </div>

            {/* Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-semibold leading-[1.05] tracking-tight mb-7 ${show("delay-100")}`}>
              <span className="text-white">{h.h1[0]}</span>
              <br />
              <span className="text-white">{h.h1[1]}</span>{" "}
              <span className="text-gradient-shimmer">{h.h1Accent}</span>
            </h1>

            {/* Subheadline */}
            <p className={`text-base sm:text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg ${show("delay-200")}`}>
              {h.subtitle}
            </p>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-14 ${show("delay-300")}`}>
              <a
                href="#contato"
                className="group inline-flex items-center justify-center gap-2 bg-white text-zinc-950 px-7 py-3.5 rounded-md font-medium text-sm hover:bg-zinc-100 transition-all duration-200 btn-glow"
              >
                {h.ctaPrimary}
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
              <a
                href="#capacidades"
                className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 px-7 py-3.5 rounded-md font-medium text-sm hover:border-zinc-500 hover:text-white transition-colors duration-200"
              >
                {h.ctaSecondary}
              </a>
            </div>

            {/* Metrics strip */}
            <div className={`grid grid-cols-3 gap-3 sm:gap-6 pt-8 relative ${show("delay-500")}`}>
              <div className="absolute top-0 left-0 right-0 section-divider" />
              {h.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-base sm:text-xl font-semibold text-white mb-1">{m.value}</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 leading-tight">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: terminal ── */}
          <div
            className={`hidden lg:flex items-center justify-center transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="w-full max-w-md">
              <TerminalCard />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-mono">scroll</span>
        <div className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-zinc-500 animate-bounce" />
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
