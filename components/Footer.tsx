"use client";

import Image from "next/image";
import { ChevronUp, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="overflow-x-clip bg-[#050B15] pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">

        {/* MAIN CONTENT AREA */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">

          {/* Left: Brand & Statement */}
          <div className="flex max-w-sm flex-col space-y-6">
            <div className="max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-black/30 shadow-[0_6px_16px_rgba(0,0,0,0.4)]">
                  <Image
                    src="/log.gif"
                    alt="Trinitas Ministries Logo"
                    fill
                    priority
                    sizes="64px"
                    quality={100}
                    unoptimized
                    className="rounded-full object-cover object-center scale-110"
                  />
                </span>
                <span className="min-w-0 leading-none text-white">
                  <span className="block font-serif text-[2rem] font-medium tracking-[0.06em] text-[#e9edf5] sm:text-3xl sm:tracking-[0.08em]">TRINITAS</span>
                  <span className="mt-1 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-gold sm:tracking-[0.2em]">
                    <span className="hidden h-px w-8 shrink-0 bg-gold/80 sm:block" />
                    <span className="truncate sm:whitespace-nowrap">International Ministries</span>
                    <span className="hidden h-px w-8 shrink-0 bg-gold/80 sm:block" />
                  </span>
                </span>
              </div>
            </div>
            <p className="break-words text-[10px] leading-relaxed uppercase tracking-[0.14em] text-white/50 sm:text-[11px] sm:tracking-widest">
              Trinitas Charitable Trust is dedicated to ministerial excellence and community growth.
            </p>
          </div>

          {/* Center: Navigation */}
          <nav className="flex flex-col space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Navigation</span>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:gap-x-12">
              {["Home", "About", "Live", "Donations", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-[#D4AF37] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>

          {/* Right: Legal & Action */}
          <div className="flex flex-col items-start md:items-end space-y-6">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-500"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-black">
                Back to Top
              </span>
              <ChevronUp size={16} className="text-[#D4AF37] group-hover:text-black" />
            </button>
            <div className="text-left md:text-right">
              <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-1">
                Section 51/2023 Registered
              </p>
              <p className="text-[9px] text-white/30 uppercase tracking-widest">
                Subject to the Trust Constitution
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM UTILITY BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5">
          {/* Copyright */}
          <div className="break-words text-center text-[9px] font-bold uppercase tracking-[0.08em] text-white/20 md:text-left md:tracking-[0.3em]">
            � 2026 Trinitas International Ministries | All Rights Reserved
          </div>

          {/* Developer Link */}
          <a
            href="https://www.pandjtechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            <div className="h-[1px] w-8 bg-white/10 group-hover:w-12 group-hover:bg-[#D4AF37] transition-all" />
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest group-hover:text-white transition-colors">
              Developed by <span className="text-white/60">P&J Technologies</span>
            </p>
          </a>

          {/* Kingdom Builders */}
          <div className="flex items-center gap-2 opacity-20 hover:opacity-100 transition-opacity cursor-default">
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">Served with</span>
            <Heart size={10} className="text-white fill-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
