"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const EMAIL = "contato@d2dev.com.br";

function EmailModal({ onClose, modal }: { onClose: () => void; modal: { label: string; copy: string; copied: string; close: string } }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-5">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-blue-400">
            <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>

        <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-2">{modal.label}</p>
        <p className="text-white font-semibold text-lg mb-6 break-all">{EMAIL}</p>

        <button
          onClick={handleCopy}
          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
            copied
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              : "bg-white text-zinc-950 hover:bg-zinc-100"
          }`}
        >
          {copied ? (
            <span className="inline-flex items-center gap-2">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              {modal.copied}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" /></svg>
              {modal.copy}
            </span>
          )}
        </button>

        <button onClick={onClose} className="mt-3 w-full text-sm text-zinc-500 hover:text-zinc-300 transition-colors py-2">
          {modal.close}
        </button>
      </div>
    </div>
  );
}

export default function FinalCTA() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useLanguage();
  const cta = t.cta;

  return (
    <section id="contato" className="relative bg-zinc-950 py-28 px-6 noise-overlay overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      {/* Radial gradient spotlight */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.06)_0%,transparent_70%)]" />
      {/* Floating particles */}
      <div className="absolute bottom-20 left-[30%] w-1 h-1 rounded-full bg-blue-400/20" style={{ animation: 'float-particle 7s ease-in-out infinite' }} />
      <div className="absolute bottom-40 left-[70%] w-0.5 h-0.5 rounded-full bg-violet-400/15" style={{ animation: 'float-particle 9s ease-in-out infinite 3s' }} />
      {showModal && <EmailModal onClose={() => setShowModal(false)} modal={cta.modal} />}

      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 font-mono">
          {cta.eyebrow}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
          {cta.title[0]} <span className="text-gradient-shimmer">{cta.title[1]}</span>
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          {cta.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 px-7 py-3.5 rounded-md font-medium hover:bg-zinc-100 transition-all duration-200 text-sm btn-glow"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            {cta.emailBtn}
          </button>
          <a
            href="https://wa.me/5519988686475"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 px-7 py-3.5 rounded-md font-medium hover:border-zinc-500 hover:text-white transition-colors duration-200 text-sm"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            {cta.whatsappBtn}
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-zinc-600">
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            {cta.trust[0]}
          </span>
          <span className="hidden sm:block w-px h-3 bg-zinc-800" />
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            {cta.trust[1]}
          </span>
          <span className="hidden sm:block w-px h-3 bg-zinc-800" />
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            {cta.trust[2]}
          </span>
        </div>
      </div>
    </section>
  );
}
