"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const n = t.navbar;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60"
          : "bg-transparent"
      }`}
    >
      {/* Animated gradient line when scrolled */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent transition-opacity duration-500 animate-glow-pulse ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="text-white font-semibold text-lg tracking-tight"
        >
          D2<span className="text-blue-500">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {n.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Language toggle */}
          <div className="flex items-center gap-0.5 bg-zinc-900/80 border border-zinc-800 rounded-md p-0.5">
            {(["pt", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-all duration-200 ${
                  lang === l
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="#contato"
            className="text-sm bg-white text-zinc-950 px-4 py-2 rounded-md font-medium hover:bg-zinc-100 transition-all duration-200 btn-glow"
          >
            {n.cta}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          {/* Language toggle mobile */}
          <div className="flex items-center gap-0.5 bg-zinc-900/80 border border-zinc-800 rounded-md p-0.5">
            {(["pt", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-all duration-200 ${
                  lang === l
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="text-zinc-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? n.ariaClose : n.ariaOpen}
          >
            {menuOpen ? (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 px-6 pb-6">
          <div className="flex flex-col gap-4 pt-4">
            {n.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className="bg-white text-zinc-950 px-4 py-2.5 rounded-md font-medium text-center hover:bg-zinc-100 transition-colors mt-2"
              onClick={() => setMenuOpen(false)}
            >
              {n.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
