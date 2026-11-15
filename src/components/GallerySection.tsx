"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY_GROUPS } from "@/lib/gallery";
import SectionHeading from "./SectionHeading";

const SPEED = 80; // px per second along the curve
const BULGE = 0.6; // how much taller the strip gets at the edges

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function GallerySection() {
  const [groupId, setGroupId] = useState(GALLERY_GROUPS[0].id);
  const [open, setOpen] = useState<number | null>(null);
  const group = GALLERY_GROUPS.find((g) => g.id === groupId) ?? GALLERY_GROUPS[0];
  const photos = group.photos;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const offset = useRef(0);
  const paused = useRef(false);
  const drag = useRef<{ x: number; moved: number } | null>(null);

  // Photos sit on the inside of a curved wall: flat in the middle, then taller and narrower
  // toward each edge, with top and bottom edges that dip in the centre.
  useEffect(() => {
    offset.current = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const container = containerRef.current;
      if (container) {
        const half = container.clientWidth / 2;
        const phone = half < 400;
        const w = phone ? half * 1.3 : clamp(half * 0.75, 300, 600);
        const gap = Math.round(w * 0.07);
        const h0 = w * (phone ? 0.7 : 0.5);
        const boxH = h0 * (1 + BULGE);
        const loop = photos.length * (w + gap);
        const radius = half;
        container.style.height = `${boxH}px`;

        if (!paused.current && !drag.current && !reducedMotion) offset.current += SPEED * dt;
        offset.current = ((offset.current % loop) + loop) % loop;

        // Top edge of the strip at screen x (measured from the centre)
        const top = (x: number) => ((boxH - h0) / 2) * (1 - (x / half) ** 2);
        const bend = (boxH - h0) / 2 / half ** 2;

        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          let u = i * (w + gap) - offset.current;
          u = ((u + loop / 2) % loop + loop) % loop - loop / 2;
          const a1 = (u - w / 2) / radius;
          const a2 = (u + w / 2) / radius;
          if (a2 <= -Math.PI / 2 || a1 >= Math.PI / 2) {
            card.style.visibility = "hidden";
            return;
          }
          const x1 = radius * Math.sin(clamp(a1, -Math.PI / 2, Math.PI / 2));
          const x2 = radius * Math.sin(clamp(a2, -Math.PI / 2, Math.PI / 2));
          const cw = x2 - x1;
          if (cw < 3) {
            card.style.visibility = "hidden";
            return;
          }
          const r = Math.min(16, cw / 4);
          const t1 = top(x1);
          const t2 = top(x2);
          const ta = top(x1 + r);
          const tb = top(x2 - r);
          // Control point of the curved edge between x1+r and x2-r
          const tc = (boxH - h0) / 2 - bend * (x1 + r) * (x2 - r);
          const B = (y: number) => boxH - y;
          card.style.visibility = "visible";
          card.style.left = `${half + x1}px`;
          card.style.width = `${cw}px`;
          card.style.height = `${boxH}px`;
          card.style.zIndex = String(1000 - Math.round(Math.abs(u)));
          card.style.clipPath = `path("M0 ${t1 + r} Q0 ${t1} ${r} ${ta} Q${cw / 2} ${tc} ${cw - r} ${tb} Q${cw} ${t2} ${cw} ${t2 + r} L${cw} ${B(t2) - r} Q${cw} ${B(t2)} ${cw - r} ${B(tb)} Q${cw / 2} ${B(tc)} ${r} ${B(ta)} Q0 ${B(t1)} 0 ${B(t1) - r} Z")`;
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [photos.length, groupId]);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, moved: 0 };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    drag.current.moved += Math.abs(dx);
    offset.current -= dx;
  };
  const endDrag = () => {
    window.setTimeout(() => (drag.current = null), 0);
  };

  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <section id="gallery" className="relative bg-banana py-16 sm:py-20 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 print-pattern" />
      <div className="absolute inset-0 bg-banana/70" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Gallery"
          tone="dark"
          title="A Look Inside Homely"
          description="Our food, our rooms and the families who fill them. Tap any photo to see it up close."
        />

        <div role="tablist" aria-label="Gallery groups" className="mt-8 flex flex-wrap justify-center gap-2">
          {GALLERY_GROUPS.map((g) => {
            const active = g.id === groupId;
            return (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setGroupId(g.id)}
                className={`px-5 py-2 rounded-full text-sm tracking-wide border backdrop-blur-md transition-colors ${
                  active
                    ? "bg-brass text-banana border-brass font-semibold"
                    : "bg-banana/40 text-parchment/85 border-parchment/25 hover:bg-banana/70"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mt-8 select-none touch-pan-y cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => {
          paused.current = false;
          endDrag();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={groupId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                type="button"
                onClick={() => {
                  if (drag.current && drag.current.moved > 6) return;
                  setOpen(i);
                }}
                onFocus={() => (paused.current = true)}
                onBlur={() => (paused.current = false)}
                aria-label={`Open photo: ${photo.alt}`}
                className="absolute top-0 invisible focus-visible:outline-none focus-visible:brightness-110"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 600px, 360px"
                  className="object-cover pointer-events-none"
                />
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={photos[open].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
            onClick={() => setOpen(null)}
          >
            <div className="relative w-full max-w-5xl h-[75vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                key={photos[open].src}
                src={photos[open].src}
                alt={photos[open].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="absolute bottom-6 inset-x-6 text-center text-sm text-parchment/80">
              {photos[open].alt} · {open + 1} / {photos.length}
            </p>
            {[
              { dir: -1, label: "Previous photo", icon: <ChevronLeft size={22} />, side: "left-3 sm:left-6" },
              { dir: 1, label: "Next photo", icon: <ChevronRight size={22} />, side: "right-3 sm:right-6" },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={(e) => {
                  e.stopPropagation();
                  step(b.dir);
                }}
                className={`absolute top-1/2 -translate-y-1/2 ${b.side} w-11 h-11 rounded-full flex items-center justify-center bg-banana/60 backdrop-blur-md border border-parchment/25 text-parchment hover:bg-banana/85 transition-colors`}
              >
                {b.icon}
              </button>
            ))}
            <button
              type="button"
              aria-label="Close gallery"
              onClick={() => setOpen(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full flex items-center justify-center bg-banana/60 backdrop-blur-md border border-parchment/25 text-parchment hover:bg-banana/85 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
