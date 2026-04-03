"use client";
import { useInView } from "@/hooks/useInView";

const metrics = [
  { value: "10+", label: "Anos de experiência" },
  { value: "50+", label: "Projetos entregues" },
  { value: "100%", label: "Código em produção" },
  { value: "0", label: "Gambiarras aceitas" },
];

export default function Metrics() {
  const { ref, inView } = useInView(0.1);

  return (
    <div className="bg-zinc-950 px-6 pb-0">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`border border-zinc-800/70 rounded-2xl bg-zinc-900/40 px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`text-center transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: inView ? `${i * 80 + 100}ms` : "0ms" }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1.5">
                {m.value}
              </div>
              <div className="text-xs text-zinc-500">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
