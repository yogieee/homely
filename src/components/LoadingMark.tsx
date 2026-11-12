"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LoadingMark() {
  return (
    <div className="relative w-full h-full bg-banana flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 print-pattern" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative w-36 h-52 sm:w-44 sm:h-64 drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      >
        <Image src="/brand/logo-emblem.png" alt="Homely" fill loading="eager" sizes="176px" className="object-contain" />
      </motion.div>

      <div className="relative mt-8 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-2xl sm:text-3xl tracking-[0.4em] text-parchment [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]"
        >
          HOMELY
        </motion.p>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeInOut" }}
          className="mt-3 block h-px w-28 bg-brass-light"
        />
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 px-6 py-2.5 rounded-full bg-banana/35 backdrop-blur-md border border-parchment/20 shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] text-xs sm:text-sm tracking-[0.4em] uppercase text-parchment/90"
        >
          South Indian Fine Dining
        </motion.span>
      </div>
    </div>
  );
}
