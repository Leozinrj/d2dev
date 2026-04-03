"use client";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { ref, inView } = useInView();
  const { t } = useLanguage();
  const ab = t.about;

  return (
    <section
      id="sobre"
      className="relative bg-zinc-900/30 py-28 px-6 noise-overlay overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-violet-600/3 blur-3xl animate-float-a" />
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 font-mono">
              {ab.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6 leading-tight">
              {ab.title[0]}
              <br />
              <span className="text-zinc-500">{ab.title[1]}</span>
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-5">
              {ab.p1}
            </p>
            <p className="text-zinc-400 text-base leading-relaxed mb-5">
              {ab.p2}
            </p>
            <p className="text-zinc-400 text-base leading-relaxed">
              {ab.p3}
            </p>
          </div>

          {/* Right: principles + stats */}
          <div
            className={`space-y-4 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 mb-2 backdrop-blur-sm">
              <p className="text-xs text-zinc-500 font-mono mb-4 uppercase tracking-widest">
                {ab.principlesLabel}
              </p>
              <ul className="space-y-3">
                {ab.principles.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="text-blue-400 flex-shrink-0"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-zinc-300">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 text-center card-glow backdrop-blur-sm">
                <div className="text-2xl font-semibold text-white mb-1">{ab.stats[0].value}</div>
                <div className="text-xs text-zinc-500">{ab.stats[0].label}</div>
              </div>
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 text-center card-glow backdrop-blur-sm">
                <div className="text-2xl font-semibold text-white mb-1">{ab.stats[1].value}</div>
                <div className="text-xs text-zinc-500">{ab.stats[1].label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
