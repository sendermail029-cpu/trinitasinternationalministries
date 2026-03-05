"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { whatsappLink } from "@/lib/whatsapp";

const heroSlides = [
  "/home1.png",
  "/home2.png",
  "/home5.png"
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative flex h-[100svh] w-full items-center overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[activeSlide]}
            className="absolute inset-0 bg-navy"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Image
              src={heroSlides[activeSlide]}
              alt="Church worship background"
              fill
              priority={activeSlide === 0}
              sizes="100vw"
              className="object-cover object-[62%_28%] md:object-[68%_24%]"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25 md:to-transparent" />
      </div>

      <div className="section-shell relative z-10 mt-16 text-left text-white md:mt-24">
    

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="max-w-2xl text-4xl font-semibold tracking-[0.06em] md:max-w-3xl md:text-6xl"
        >
          Trinitas International Ministries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-5 max-w-xl text-base text-white/90 md:text-lg"
        >
          Spreading hope, faith and love across nations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#live"
            className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-navy transition-transform hover:scale-[1.03]"
          >
            Watch Live Service
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gold px-7 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
          >
            Donate Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
