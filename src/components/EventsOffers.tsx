"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { OFFERS } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import SideKolam from "./SideKolam";

export default function EventsOffers() {
  return (
    <section id="offers" className="relative bg-ivory scroll-mt-20 py-24 sm:py-28">
      <SideKolam />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="What's On"
          title="Events & Offers"
          description="What's happening at Homely right now, from our opening to private parties and dinner delivered to your door."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERS.map((offer, i) => (
            <motion.article
              key={offer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
            >
              <Image
                src={offer.image}
                alt={offer.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-banana/95 via-banana/30 via-55% to-transparent" />
              <span className="absolute top-5 right-5 px-4 py-1.5 rounded-full bg-parchment/90 backdrop-blur-sm border border-brass/50 text-banana text-sm font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                {offer.tag}
              </span>
              <div className="absolute inset-x-6 bottom-6 flex flex-col">
                <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-brass-light">
                  {offer.eyebrow}
                </span>
                <h3 className="mt-2 font-display font-semibold text-[1.75rem] leading-tight text-parchment text-balance">
                  {offer.title}
                </h3>
                <p className="mt-2 text-[15px] text-parchment/85 leading-relaxed">{offer.subtitle}</p>
                <a
                  href={offer.cta.href}
                  {...(offer.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-5 inline-flex w-fit items-center gap-2 px-5 py-2.5 rounded-full bg-brass text-banana text-sm font-semibold hover:bg-brass-light transition-colors"
                >
                  {offer.cta.label}
                  {offer.cta.external ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
