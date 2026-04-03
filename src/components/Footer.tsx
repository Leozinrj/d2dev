"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();
  const ft = t.footer;

  return (
    <footer className="bg-zinc-950 py-10 px-6 relative">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-base tracking-tight">
              D2<span className="text-blue-500">.</span>
            </span>
            <span className="text-zinc-600 text-sm">
              {ft.tagline}
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-5">
            {ft.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-zinc-600">
            © {year} D2. {ft.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
