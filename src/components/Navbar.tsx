"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, FOODHUB_URL } from "@/lib/data";
import { useBooking } from "@/lib/booking-context";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("top");
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      setIsScrolled(window.scrollY + 80 >= heroBottom);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsDrawerOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-banana/80 backdrop-blur-xl backdrop-saturate-150 border-b border-parchment/15 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_-1px_0_rgba(255,255,255,0.06)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="relative w-7 h-10 shrink-0">
              <Image src="/brand/logo-emblem.png" alt="Homely emblem" fill sizes="40px" className="object-contain" />
            </span>
            <span className="font-display text-xl sm:text-2xl tracking-[0.15em] text-parchment">
              HOMELY
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm tracking-wide text-parchment/90 hover:text-brass-light transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brass-light transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openBooking}
              className="px-5 py-2.5 rounded-full border border-brass text-brass-light text-sm font-medium tracking-wide hover:bg-brass hover:text-banana transition-colors"
            >
              Reserve a Table
            </button>
            <a
              href={FOODHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-brass text-banana text-sm font-semibold tracking-wide hover:bg-brass-light transition-colors flex items-center gap-1.5"
            >
              Order Online
              <ArrowUpRight size={15} />
            </a>
          </div>

          <button
            className="md:hidden text-parchment p-2"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[82%] max-w-sm bg-banana border-l border-brass/40 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-brass/20">
                <span className="flex items-center gap-2.5">
                  <span className="relative w-6 h-9 shrink-0">
                    <Image src="/brand/logo-emblem.png" alt="Homely emblem" fill sizes="32px" className="object-contain" />
                  </span>
                  <span className="font-display text-xl tracking-[0.15em] text-parchment">HOMELY</span>
                </span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-parchment p-2"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-2 px-6 py-8">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-lg py-3 text-parchment/90 hover:text-brass-light transition-colors border-b border-parchment/10"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <div className="mt-auto px-6 pb-10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    openBooking();
                  }}
                  className="px-5 py-3 rounded-full border border-brass text-brass-light text-sm font-medium tracking-wide text-center"
                >
                  Reserve a Table
                </button>
                <a
                  href={FOODHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-brass text-banana text-sm font-semibold tracking-wide text-center flex items-center justify-center gap-1.5"
                >
                  Order Online
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
