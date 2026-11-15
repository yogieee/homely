"use client";

import { motion } from "framer-motion";
import { Store, Sparkles, UtensilsCrossed } from "lucide-react";
import SectionHeading from "./SectionHeading";
import OrnateFrame from "./OrnateFrame";
import SideKolam from "./SideKolam";
import StoryVideo from "./StoryVideo";

const PILLARS = [
  {
    icon: <Store size={20} />,
    title: "Where It Began",
    body: "Ma's Flavours was our little takeaway, serving home-style South Indian food to regulars who became family.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "A New Chapter",
    body: "We closed Ma's Flavours so those recipes could have a bigger home. That home is Homely.",
  },
  {
    icon: <UtensilsCrossed size={20} />,
    title: "Same Soul, Finer Table",
    body: "The dishes you already love, cooked with extra care and served at a table that feels like yours.",
  },
];

export default function OurStory() {
  return (
    <section id="our-story" className="relative bg-ivory py-24 sm:py-32 overflow-hidden">
      <SideKolam />
      <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 xl:px-14 grid lg:grid-cols-[1.75fr_1fr] gap-12 lg:gap-12 xl:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-video w-full rounded-md overflow-hidden border border-brass/30 order-2 lg:order-1 p-3"
        >
          <div className="relative w-full h-full rounded-md overflow-hidden">
            <StoryVideo />
          </div>
          <OrnateFrame tone="brass" />
        </motion.div>

        <div className="order-1 lg:order-2 flex flex-col justify-center gap-8 lg:py-6">
          <SectionHeading
            eyebrow="Our Story"
            title="From Ma's Flavours to Homely"
            description="It all started at Ma's Flavours, a small takeaway where Ma's cooking quickly won over our neighbours in Coventry. After years behind that counter, we closed its doors and opened Homely. Same recipes, same love, and now a proper table where you can sit back and take your time."
            align="left"
          />
        </div>
      </div>

      <div className="relative isolate max-w-[88rem] mx-auto px-5 sm:px-8 xl:px-14 mt-14 lg:mt-20">
        <div aria-hidden="true" className="absolute -z-10 -top-6 -left-8 w-56 h-56 rounded-full bg-terracotta/25 blur-3xl" />
        <div aria-hidden="true" className="absolute -z-10 -bottom-8 right-0 w-64 h-64 rounded-full bg-brass/35 blur-3xl" />
        <div aria-hidden="true" className="absolute -z-10 top-1/3 left-1/2 w-40 h-40 rounded-full bg-banana-light/20 blur-3xl" />
        <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-3 p-5 lg:p-7 rounded-xl bg-white/45 backdrop-blur-xl border border-white/70 shadow-[0_8px_32px_rgba(67,43,38,0.12),inset_0_1px_0_rgba(255,255,255,0.85)]"
            >
              <span className="shrink-0 w-10 h-10 rounded-full bg-white/60 border border-white/80 text-terracotta flex items-center justify-center shadow-sm">
                {p.icon}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-lg text-charcoal">{p.title}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
