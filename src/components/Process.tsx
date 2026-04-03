"use client";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Process() {
  const { ref, inView } = useInView();
  const { t } = useLanguage();
  const pr = t.process;

  return (
    <section
      id="processo"
      className="relative bg-zinc-900/30 py-28 px-6 noise-overlay overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-indigo-600/3 blur-3xl animate-float-a" />
      <div className="max-w-6xl mx-auto">
        <div ref={ref}>
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-mono">
              {pr.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              {pr.title}
            </h2>
            <p className="text-zinc-400 text-base max-w-lg mx-auto">
              {pr.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pr.steps.map((step, i) => (
              <div
                key={step.number}
                className={`group relative bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 h-full card-glow backdrop-blur-sm transition-all duration-700 ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`}
                style={{ transitionDelay: inView ? `${i * 120 + 80}ms` : "0ms" }}
              >
                {/* Step connector for desktop */}
                {i < pr.steps.length - 1 && (
                  <div
                    className={`hidden lg:block absolute top-9 left-full w-5 h-px z-10 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: inView ? `${i * 100 + 300}ms` : '0ms' }}
                  >
                    <div className="h-full w-full bg-gradient-to-r from-blue-500/50 to-transparent" />
                  </div>
                )}
                <div className={`text-4xl font-bold font-mono mb-5 leading-none transition-all duration-700 ${inView ? 'text-gradient-blue' : 'text-zinc-800/80'}`}>
                  {step.number}
                </div>
                <h3 className="text-white font-semibold text-base mb-3 group-hover:text-blue-50 transition-colors duration-300">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
