"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import type { StateJourney } from "@/lib/data";
import { findMenuItem, formatPrice } from "@/lib/menu";
import SideKolam from "./SideKolam";

type StateSectionProps = {
  journey: StateJourney;
  index: number;
};

export default function StateSection({ journey, index }: StateSectionProps) {
  const imageLeft = index % 2 === 0;

  return (
    <section
      id={journey.id}
      className="relative scroll-mt-20 bg-ivory overflow-hidden py-10 sm:py-14 lg:py-20"
    >
      <SideKolam left={!imageLeft} right={imageLeft} />
      <div className="relative lg:min-h-[min(60vw,100vh)] lg:flex lg:items-center">
        <div
          className={`brush-cut relative h-[min(100vw,72vh)] w-full lg:absolute lg:inset-y-0 lg:h-auto lg:w-[60%] ${
            imageLeft ? "lg:left-0" : "lg:right-0"
          }`}
        >
          <Image
            src={journey.image}
            alt={`${journey.landmark}, ${journey.state}`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent from-70% to-ivory ${
              imageLeft ? "lg:bg-gradient-to-r" : "lg:bg-gradient-to-l"
            } lg:from-75%`}
          />
          <span
            className={`absolute bottom-32 hidden lg:inline-flex px-4 py-2 rounded-full bg-banana/45 backdrop-blur-md border border-parchment/25 shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] text-xs tracking-[0.25em] uppercase text-parchment ${
              imageLeft ? "left-8" : "right-8"
            }`}
          >
            {journey.landmark}
          </span>
        </div>

        <div
          className={`relative z-10 w-full px-5 sm:px-8 -mt-16 pb-20 lg:mt-0 lg:py-28 flex ${
            imageLeft
              ? "lg:justify-start lg:pl-[calc(60%+3.5rem)] lg:pr-20 xl:pr-24"
              : "lg:justify-end lg:pr-[calc(60%+3.5rem)] lg:pl-20 xl:pl-24"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: imageLeft ? 32 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:max-w-[32rem] flex flex-col gap-5"
          >
            <span className="text-xs sm:text-sm tracking-[0.35em] uppercase font-semibold text-terracotta">
              {journey.state}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-balance text-charcoal">
              {journey.title}
            </h3>
            <div aria-hidden="true" className="kolam-divider !bg-left w-full max-w-xs opacity-80" />
            <p className="text-sm sm:text-base leading-relaxed text-charcoal/75">{journey.description}</p>

            <div className="inline-flex w-fit items-center gap-2 text-xs sm:text-sm text-charcoal/70">
              <Flame size={14} className="text-terracotta" />
              {journey.spiceProfile}
            </div>

            <div className="pt-4 border-t border-brass/25">
              <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-terracotta">Try It at Homely</p>
              <ul className="flex flex-wrap gap-2">
                {journey.menuPicks.map((name) => {
                  const item = findMenuItem(name);
                  return (
                    <li
                      key={name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-[13px] border border-brass/40 bg-brass/10 text-charcoal/85"
                    >
                      {name}
                      {item && (
                        <span className="font-display text-terracotta tabular-nums">{formatPrice(item.price)}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <a
                href="#menu"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:text-banana transition-colors"
              >
                See the full menu
                <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
