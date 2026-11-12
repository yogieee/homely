"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { STATE_JOURNEYS } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import StateSection from "./StateSection";
import SideKolam from "./SideKolam";

const CULTURE_NOTES = [
  {
    tag: "Our Value",
    eyebrow: "Hospitality",
    title: "Atithi Devo Bhava",
    subtitle: "The guest is God",
    image: "/images/culture-hospitality.jpg",
    alt: "A host's hands in a namaste welcome beside a brass oil lamp",
  },
  {
    tag: "Tradition",
    eyebrow: "The Way We Serve",
    title: "Banana-Leaf Dining",
    subtitle: "A feast on a fresh green leaf",
    image: "/images/culture-banana-leaf.jpg",
    alt: "A traditional South Indian meal served on a banana leaf",
  },
  {
    tag: "Every Morning",
    eyebrow: "Daily Ceremony",
    title: "The Filter Coffee Ritual",
    subtitle: "Brewed slow, poured tall",
    image: "/images/culture-filter-coffee.jpg",
    alt: "Filter coffee poured from a steel tumbler into a brass davara",
  },
  {
    tag: "Made to Share",
    eyebrow: "Togetherness",
    title: "Family-Style Sharing",
    subtitle: "Food at the heart of family life",
    image: "/images/culture-family-sharing.jpg",
    alt: "A family passing dishes around a shared table",
  },
];

export default function CultureJourney() {
  return (
    <>
      <section id="four-states" className="relative bg-ivory py-24 sm:py-32">
        <SideKolam />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Why We Tell This Story"
            title="The Four-State Journey"
            description="Ask anyone from Bengaluru, Chennai, Kochi or Hyderabad what home tastes like and you'll get a different answer every time. South India is really four kitchens, each shaped by its own rivers, coastlines, temples and families. At Homely we bring all four to one table in Coventry: Karnataka's tiffins, Tamil Nadu's idlis, Kerala's coastal flavours and the fire of Andhra and Telangana, cooked the way Ma always did."
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 mx-auto max-w-4xl flex items-center justify-center gap-5 sm:gap-8 text-center"
          >
            <span aria-hidden="true" className="hidden sm:block h-px w-16 lg:w-24 bg-brass/60 shrink-0" />
            <span className="font-display italic text-3xl sm:text-4xl lg:text-5xl leading-tight text-terracotta text-balance">
              So wherever your home is, here you won&apos;t miss it.
            </span>
            <span aria-hidden="true" className="hidden sm:block h-px w-16 lg:w-24 bg-brass/60 shrink-0" />
          </motion.p>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {CULTURE_NOTES.map((note, i) => (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[3/5] rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
              >
                <Image
                  src={note.image}
                  alt={note.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-banana/90 via-banana/25 via-55% to-transparent" />
                <span className="absolute top-5 right-5 px-4 py-1.5 rounded-full bg-parchment/90 backdrop-blur-sm border border-brass/50 text-banana text-sm font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                  {note.tag}
                </span>
                <div className="absolute inset-x-6 bottom-7 flex flex-col">
                  <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-brass-light">
                    {note.eyebrow}
                  </span>
                  <h3 className="mt-2 font-display font-semibold text-[1.75rem] leading-tight text-parchment text-balance">
                    {note.title}
                  </h3>
                  <p className="mt-2 text-[15px] font-medium text-parchment/85">{note.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {STATE_JOURNEYS.map((journey, i) => (
        <StateSection key={journey.id} journey={journey} index={i} />
      ))}
    </>
  );
}
