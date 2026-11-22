"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL } from "@/lib/data";
import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEWS_LIST_URL,
  GUEST_REVIEWS,
  type GuestReview,
} from "@/lib/reviews";

/** Split the reviews into two lists, alternating, so long and short ones mix. */
const LEFT = GUEST_REVIEWS.filter((_, i) => i % 2 === 0);
const RIGHT = GUEST_REVIEWS.filter((_, i) => i % 2 === 1);

/** Sideways nudges that give the columns a scattered, hand-placed look. */
const OFFSETS_LEFT = ["lg:ml-0", "lg:ml-10", "lg:ml-4", "lg:ml-14", "lg:ml-2", "lg:ml-8"];
const OFFSETS_RIGHT = ["lg:ml-12", "lg:ml-2", "lg:ml-8", "lg:ml-0", "lg:ml-14", "lg:ml-5"];

function ReviewCard({ review, offset = "", hidden = false }: { review: GuestReview; offset?: string; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className={`shrink-0 w-full lg:w-auto lg:max-w-[360px] xl:max-w-[400px] rounded-md bg-parchment/45 border border-brass/15 px-6 py-6 sm:px-8 sm:py-7 ${offset}`}
    >
      <div className="flex gap-0.5 text-brass mb-3" aria-label={`${review.stars} out of 5 stars`}>
        {Array.from({ length: review.stars }, (_, i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="font-display text-[17px] sm:text-xl leading-snug text-charcoal/85">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm text-charcoal/60">– {review.name}</figcaption>
    </figure>
  );
}

/** A column of cards that drifts upward forever. The list is drawn twice so the loop is seamless. */
function Track({
  reviews,
  offsets,
  duration,
}: {
  reviews: GuestReview[];
  offsets: string[];
  duration: number;
}) {
  return (
    <div
      className="reviews-track flex flex-col w-full"
      data-direction="up"
      style={{ animationDuration: `${duration}s` }}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex flex-col pb-5 gap-5 lg:pb-8 lg:gap-8">
          {reviews.map((r, i) => (
            <ReviewCard
              key={`${copy}-${r.name}`}
              review={r}
              offset={offsets[i % offsets.length] ?? ""}
              hidden={copy === 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Heading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center text-center gap-5"
    >
      <span className="text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold text-terracotta">Google Reviews</span>
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-charcoal whitespace-nowrap">
        Voices of <span className="text-terracotta">Our Guests</span>
      </h2>
      <p className="flex items-center gap-2 text-charcoal/70 text-sm sm:text-base">
        <span className="font-semibold text-charcoal">{GOOGLE_RATING.toFixed(1)}</span>
        <span className="flex gap-0.5 text-brass" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
        <span>from {GOOGLE_REVIEW_COUNT} Google reviews</span>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-1">
        <a
          href={GOOGLE_REVIEWS_LIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-charcoal font-medium"
        >
          <span className="w-11 h-11 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:bg-terracotta group-hover:border-terracotta group-hover:text-ivory transition-colors">
            <ArrowUpRight size={18} />
          </span>
          View All Reviews
        </a>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-terracotta font-medium underline underline-offset-4 decoration-terracotta/40 hover:decoration-terracotta"
        >
          Write a review
        </a>
      </div>
    </motion.div>
  );
}

export default function GuestReviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="relative bg-ivory overflow-hidden">
      <span id="reviews-heading" className="sr-only">
        Voices of Our Guests
      </span>

      {/* Desktop: two columns drifting upward, heading floating in the middle */}
      <div className="reviews-marquee hidden lg:block relative h-[820px]">
        <div className="absolute inset-0 grid grid-cols-[1fr_540px_1fr] xl:grid-cols-[1fr_600px_1fr] px-8 xl:px-12 reviews-fade-y">
          <div className="overflow-hidden">
            <Track reviews={LEFT} offsets={OFFSETS_LEFT} duration={70} />
          </div>
          <div aria-hidden="true" />
          <div className="overflow-hidden">
            <Track reviews={RIGHT} offsets={OFFSETS_RIGHT} duration={58} />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <Heading />
          </div>
        </div>
      </div>

      {/* Phones and tablets: heading on top, cards drifting upward below it */}
      <div className="reviews-marquee lg:hidden pt-20 sm:pt-24 pb-6 flex flex-col gap-8">
        <div className="px-5">
          <Heading />
        </div>
        <div className="h-[600px] sm:h-[640px] px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-5 reviews-fade-y">
          <div className="overflow-hidden sm:hidden">
            <Track reviews={GUEST_REVIEWS} offsets={[]} duration={80} />
          </div>
          <div className="overflow-hidden hidden sm:block">
            <Track reviews={LEFT} offsets={[]} duration={60} />
          </div>
          <div className="overflow-hidden hidden sm:block">
            <Track reviews={RIGHT} offsets={[]} duration={50} />
          </div>
        </div>
      </div>
    </section>
  );
}
