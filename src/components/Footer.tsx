"use client";

import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { ADDRESS, FOODHUB_URL, MAPS_EMBED, MAPS_LINK, NAV_LINKS } from "@/lib/data";
import { useBooking } from "@/lib/booking-context";
import SocialLinks from "./SocialLinks";

const HOURS = [
  { day: "Every day", time: "12 noon to 11 PM" },
  { day: "Tandoori, roti and naans", time: "From 5 PM" },
];

export default function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer id="visit-us" className="relative bg-banana pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 print-pattern pointer-events-none" />
      <div className="absolute inset-0 bg-banana/60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 grid sm:grid-cols-2 gap-10 lg:flex lg:justify-between lg:gap-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative w-7 h-10 shrink-0">
              <Image src="/brand/logo-emblem.png" alt="Homely emblem" fill sizes="40px" className="object-contain" />
            </span>
            <span className="font-display text-xl tracking-[0.15em] text-parchment">HOMELY</span>
          </div>
          <p className="text-parchment/60 text-sm lg:text-[15px] leading-relaxed max-w-xs lg:max-w-sm">
            From Ma&apos;s Flavours to Homely. The same family recipes, now served as fine Indian
            dining in the heart of Coventry. Healthy, hearty, happy.
          </p>
          <div className="mt-2">
            <p className="text-brass-light text-xs uppercase tracking-[0.2em] mb-3">Follow Us</p>
            <SocialLinks size="sm" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-brass-light text-sm uppercase tracking-[0.2em]">Visit Us</h3>
          <div className="flex items-start gap-3 text-parchment/70 text-sm lg:text-[15px]">
            <MapPin size={18} className="shrink-0 mt-0.5 text-brass-light" />
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-brass-light transition-colors">
              {ADDRESS}
            </a>
          </div>
          <div className="flex items-center gap-3 text-parchment/70 text-sm lg:text-[15px]">
            <Phone size={18} className="shrink-0 text-brass-light" />
            <a href="tel:+442476001234" className="hover:text-brass-light transition-colors">
              +44 24 7600 1234
            </a>
          </div>
          <div className="flex items-center gap-3 text-parchment/70 text-sm lg:text-[15px]">
            <Mail size={18} className="shrink-0 text-brass-light" />
            <a href="mailto:hello@homelycoventry.co.uk" className="hover:text-brass-light transition-colors">
              hello@homelycoventry.co.uk
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:shrink-0 lg:whitespace-nowrap">
          <h3 className="text-brass-light text-sm uppercase tracking-[0.2em] flex items-center gap-2">
            <Clock size={16} /> Opening Hours
          </h3>
          <ul className="flex flex-col gap-3 text-sm lg:text-[15px] text-parchment/70">
            {HOURS.map((h) => (
              <li key={h.day} className="flex flex-col">
                <span className="text-parchment/90">{h.day}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 lg:shrink-0 lg:whitespace-nowrap">
          <h3 className="text-brass-light text-sm uppercase tracking-[0.2em]">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-sm lg:text-[15px]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-parchment/70 hover:text-brass-light transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={openBooking}
                className="text-parchment/70 hover:text-brass-light transition-colors text-left"
              >
                Table Reservation
              </button>
            </li>
            <li>
              <a
                href={FOODHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-parchment/70 hover:text-brass-light transition-colors"
              >
                Order via Foodhub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 mt-14">
        <div className="relative rounded-md overflow-hidden border border-brass/50 p-1.5 bg-banana/60">
          <iframe
            title={`Map to Homely, ${ADDRESS}`}
            src={MAPS_EMBED}
            className="block w-full h-72 sm:h-80 rounded-sm border-0 [filter:sepia(0.2)_saturate(0.9)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-banana/80 backdrop-blur-md border border-parchment/25 text-parchment text-sm font-medium shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-banana transition-colors"
          >
            <Navigation size={15} className="text-brass-light" />
            Get Directions
          </a>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 mt-14 pt-6 border-t border-parchment/10">
        <div aria-hidden="true" className="kolam-divider w-full max-w-xs mx-auto mb-6 opacity-70" />
        <p className="text-center text-parchment/40 text-xs">
          © {new Date().getFullYear()} Homely Restaurant & Event Venue, Coventry. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
