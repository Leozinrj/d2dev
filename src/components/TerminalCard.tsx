"use client";
import { useEffect, useState } from "react";

const LINES = [
  { text: "$ D2Dev connect --platform ifood --store prod-001", type: "cmd" },
  { text: "  ▸ Autenticando credenciais e validando webhook...", type: "info" },
  { text: "  ✓ Canal ativo — 62 pedidos sincronizados em tempo real", type: "success" },
  { text: "$ D2Dev deploy api-gateway --env production", type: "cmd" },
  { text: "  ▸ Build · Health check · Zero-downtime rollout...", type: "info" },
  { text: "  ✓ v2.4.1 no ar — p99 latency 38ms", type: "success" },
  { text: "$ D2Dev audit contracts/OrderEscrow.sol", type: "cmd" },
  { text: "  ▸ Analisando 847 linhas · Slither · Echidna...", type: "info" },
  { text: "  ✓ 0 vulnerabilidades — pronto para deploy on-chain", type: "success" },
];

const DELAYS = [0, 700, 1400, 2100, 2700, 3400, 4100, 4800, 5600];
const LOOP_AT = 8500;

export default function TerminalCard() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function run() {
      setVisible(0);
      DELAYS.forEach((delay, i) => {
        const t = setTimeout(() => setVisible(i + 1), delay);
        timeouts.push(t);
      });
      const loop = setTimeout(run, LOOP_AT);
      timeouts.push(loop);
    }

    const start = setTimeout(run, 600);
    timeouts.push(start);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Ambient glow inside card */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 pointer-events-none" />

      {/* macOS-style header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-950/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs text-zinc-500 font-mono ml-2 select-none">
          ~/d2dev — bash
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-6 font-mono text-[13px] leading-relaxed min-h-[260px] space-y-1.5">
        {LINES.slice(0, visible).map((line, i) => (
          <div
            key={i}
            className={`transition-all duration-300 animate-fade-up ${
              line.type === "cmd"
                ? "text-zinc-100"
                : line.type === "success"
                  ? "text-emerald-400"
                  : "text-zinc-500"
            } ${line.type === "cmd" && i > 0 ? "mt-4" : ""}`}
          >
            {line.type === "cmd" && (
              <span className="text-blue-500 mr-1 select-none">❯</span>
            )}
            {line.type === "success" && (
              <span className="mr-1 select-none">  </span>
            )}
            {line.type === "info" && (
              <span className="mr-1 select-none">  </span>
            )}
            {line.text.replace(/^\$ /, "")}
          </div>
        ))}
        {visible > 0 && visible <= LINES.length && (
          <span className="text-zinc-400 animate-blink select-none">▋</span>
        )}
      </div>

      {/* Status bar */}
      <div className="px-5 py-2.5 border-t border-zinc-800/60 bg-zinc-950/30 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-zinc-500 font-mono">production</span>
        </div>
        <span className="text-xs text-zinc-600 font-mono">d2dev v1.0.0</span>
      </div>
    </div>
  );
}
