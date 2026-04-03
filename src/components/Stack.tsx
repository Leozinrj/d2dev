"use client";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/contexts/LanguageContext";

const STACK_STATIC = [
  { color: "text-blue-400", borderColor: "border-blue-500/20", bgColor: "bg-blue-500/5", accentRgb: "96, 165, 250",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" /></svg>,
  },
  { color: "text-violet-400", borderColor: "border-violet-500/20", bgColor: "bg-violet-500/5", accentRgb: "167, 139, 250",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
  },
  { color: "text-sky-400", borderColor: "border-sky-500/20", bgColor: "bg-sky-500/5", accentRgb: "56, 189, 248",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>,
  },
  { color: "text-emerald-400", borderColor: "border-emerald-500/20", bgColor: "bg-emerald-500/5", accentRgb: "52, 211, 153",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>,
  },
];

export default function Stack() {
  const { ref, inView } = useInView();
  const { t } = useLanguage();
  const sk = t.stack;

  return (
    <section
      id="stack"
      className="relative bg-zinc-950 py-28 px-6 noise-overlay overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="pointer-events-none absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-sky-600/3 blur-3xl animate-float-b" />
      <div className="max-w-6xl mx-auto">
        <div ref={ref}>
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-mono">
              {sk.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              {sk.title}
            </h2>
            <p className="text-zinc-400 text-base max-w-lg mx-auto">
              {sk.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sk.groups.map((group, i) => {
              const s = STACK_STATIC[i];
              return (
              <div
                key={group.label}
                className={`group bg-zinc-900/80 border border-zinc-800 rounded-xl p-7 card-glow-accent backdrop-blur-sm flex flex-col gap-5 transition-all duration-700 ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`}
                style={{ '--card-accent': s.accentRgb, transitionDelay: inView ? `${i * 120 + 80}ms` : "0ms" } as React.CSSProperties}
              >
                {/* Icon badge */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.bgColor} border ${s.borderColor} ${s.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                  {s.icon}
                </div>

                {/* Label + description */}
                <div>
                  <p className={`text-sm font-semibold ${s.color} mb-2`}>{group.label}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{group.description}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
