"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "center",
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`flex flex-col gap-4 max-w-2xl ${alignment}`}
    >
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="mb-1">
        <g stroke={isDark ? "#B08A5E" : "#9A4E36"} strokeWidth="1">
          <path d="M17 2 L32 17 L17 32 L2 17 Z" />
          <path d="M17 10 L24 17 L17 24 L10 17 Z" />
        </g>
      </svg>
      <span
        className={`text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold ${
          isDark ? "text-brass-light" : "text-terracotta"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-balance ${
          isDark ? "text-parchment" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={`kolam-divider w-full max-w-xs ${align === "center" ? "" : "!bg-left"} ${isDark ? "opacity-90" : "opacity-80"}`}
      />
      {description && (
        <p className={`text-base sm:text-lg ${isDark ? "text-parchment/80" : "text-charcoal/70"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
