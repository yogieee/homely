"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FOODHUB_URL } from "@/lib/data";
import { useBooking } from "@/lib/booking-context";
import SocialLinks from "./SocialLinks";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 2.5 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function Hero() {
  const { openBooking } = useBooking();
  const { scrollY } = useScroll();
  const patternY = useTransform(scrollY, [0, 800], [0, 160]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-banana"
    >
      <motion.div style={{ y: patternY }} className="absolute -inset-y-40 inset-x-0 print-pattern" />
      <div className="absolute inset-0 bg-banana/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.35)_100%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-20 flex flex-col items-center text-center"
      >
        <motion.div variants={item} className="relative w-28 h-40 sm:w-32 sm:h-[11.5rem]">
          <Image src="/brand/logo-emblem.png" alt="Homely emblem" fill loading="eager" sizes="128px" className="object-contain" />
        </motion.div>

        <motion.span
          variants={item}
          className="mt-8 px-6 py-2.5 rounded-full bg-banana/35 backdrop-blur-md border border-parchment/20 shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] text-xs sm:text-sm tracking-[0.4em] uppercase text-parchment/90"
        >
          South Indian Fine Dining
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-parchment text-balance"
        >
          Authentic South Indian Soul in the Heart of Coventry
        </motion.h1>

        <motion.p variants={item} className="mt-6 text-base sm:text-lg text-parchment/70 max-w-xl">
          Family recipes, a warm welcome and the food you grew up with, right here in Coventry.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 w-full grid sm:grid-cols-3 overflow-hidden rounded-md bg-banana/35 backdrop-blur-md border border-parchment/20 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] divide-y sm:divide-y-0 sm:divide-x divide-parchment/15"
        >
          <QuickAction label="Reserve a Table" onClick={openBooking} />
          <QuickAction label="Order Online" href={FOODHUB_URL} />
          <QuickAction label="Private Dining" onClick={() => scrollTo("#event-hall")} />
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <SocialLinks className="justify-center" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function QuickAction({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const className =
    "flex items-center justify-center gap-2 px-5 py-4 text-sm tracking-[0.12em] uppercase text-parchment/90 hover:bg-parchment/10 hover:text-brass-light transition-colors";
  const content: ReactNode = (
    <>
      {label}
      {href && <ArrowUpRight size={14} />}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}
