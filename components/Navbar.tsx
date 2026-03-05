"use client";

import { type MouseEvent, useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#pastor", label: "Pastor" },
  { href: "#timings", label: "Timings" },
  { href: "#live", label: "Live" },
  { href: "#donations", label: "Donations" },
  { href: "#gallery", label: "Gallery" },

  { href: "#contact", label: "Contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [splashTarget, setSplashTarget] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!splashTarget) return;

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      const targetId = splashTarget.replace("#", "");
      const section = document.getElementById(targetId);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", splashTarget);
      }

      document.body.style.overflow = "";
      setSplashTarget(null);
    }, 700);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [splashTarget]);

  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    setSplashTarget(href);
  };

  return (
    <>
      {splashTarget && (
        <div className="fixed inset-0 z-[120] overflow-hidden bg-navy">
          <Image
            src="/logoo.gif"
            alt="Loading transition"
            fill
            priority
            sizes="100vw"
            quality={100}
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/35" />
        </div>
      )}

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-navy/95 shadow-premium backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="section-shell flex h-24 items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-transparent shadow-[0_6px_16px_rgba(0,0,0,0.4)]">
              <Image
                src="/log.gif"
                alt="Trinitas Ministries Logo"
                fill
                priority
                sizes="64px"
                quality={100}
                className="rounded-full object-cover object-center scale-95"
              />
            </span>
            <span className="leading-none text-white">
              <span className="block font-serif text-3xl font-medium tracking-[0.08em] text-[#e9edf5]">TRINITAS</span>
              <span className="mt-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-8 bg-gold/80" />
                <span>International Ministries</span>
                <span className="h-px w-8 bg-gold/80" />
              </span>
            </span>
          </a>

          <button
            className="inline-flex items-center justify-center rounded-md border border-gold/60 px-3 py-2 text-xs font-semibold text-gold md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <ul className="hidden items-center gap-7 text-sm font-medium text-white md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={handleNavClick(link.href)} className="transition-colors hover:text-gold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {open && (
          <div className="border-t border-gold/20 bg-navy/95 px-6 py-4 md:hidden">
            <ul className="space-y-3 text-white">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavClick(link.href)}
                    className="block rounded-md px-2 py-1 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
