"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Sparkles, UtensilsCrossed, CheckCircle2 } from "lucide-react";
import { OCCASION_TYPES, CATERING_STYLES } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import OrnateFrame from "./OrnateFrame";
import SideKolam from "./SideKolam";

const HIGHLIGHTS = [
  {
    icon: <Users size={20} />,
    title: "Room for 50 to 70 Guests",
    body: "Our upstairs floor is all yours, whether it's a close family get-together or a full house.",
  },
  {
    icon: <UtensilsCrossed size={20} />,
    title: "Customisable Feast Menus",
    body: "Banana leaf feast, buffet or plated meal. We'll build the menu around your day and your budget.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Decor & Styling Options",
    body: "Flowers, drapes and lighting to make the room feel like your celebration.",
  },
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  occasion: (typeof OCCASION_TYPES)[number];
  cateringStyle: (typeof CATERING_STYLES)[number];
  notes: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  eventDate: "",
  guestCount: 50,
  occasion: OCCASION_TYPES[0],
  cateringStyle: CATERING_STYLES[0],
  notes: "",
};

export default function EventHallSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!/^[0-9+\s()-]{7,}$/.test(form.phone)) nextErrors.phone = "Enter a valid phone number.";
    if (!form.eventDate) nextErrors.eventDate = "Please select a preferred date.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section id="event-hall" className="relative bg-ivory py-24 sm:py-32">
      <SideKolam />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Private Event Floor"
          title="Celebrate in Our Upstairs Event Hall"
          description="Birthdays, anniversaries, baby showers, naming ceremonies and work dinners. Bring everyone together upstairs and let us take care of the food."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="relative h-64 sm:h-80 rounded-md overflow-hidden border border-brass/30">
              <Image
                src="/images/event-hall.jpg"
                alt="A family naming ceremony in the Homely upstairs event hall, with marigold garlands and banana-leaf place settings"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-banana/70 to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-banana/80 backdrop-blur-sm rounded-full px-4 py-2 text-parchment text-sm">
                <Users size={16} className="text-brass-light" />
                50 to 70 Guests
              </div>
              <OrnateFrame tone="ivory" />
            </div>

            <div className="grid gap-4">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.title}
                  className="flex items-start gap-4 p-5 rounded-md bg-white/40 border border-brass/15"
                >
                  <span className="shrink-0 w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center">
                    {h.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-banana">{h.title}</h3>
                    <p className="text-sm text-charcoal/70 mt-1">{h.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-md bg-banana p-6 sm:p-8 lg:p-10 border border-brass/25 overflow-hidden"
          >
            <div className="absolute inset-0 damask-dark opacity-[0.06] pointer-events-none" />
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center gap-4 py-10"
                >
                  <span className="w-16 h-16 rounded-full bg-brass/15 flex items-center justify-center text-brass-light">
                    <CheckCircle2 size={32} />
                  </span>
                  <h3 className="font-display text-2xl text-parchment">Enquiry Received</h3>
                  <p className="text-parchment/70 max-w-sm">
                    Thanks, {form.fullName.split(" ")[0] || "friend"}! We&apos;ve got your enquiry. Someone from our team
                    will be in touch within 24 hours to plan your {form.occasion.toLowerCase()} for{" "}
                    {form.guestCount} guests.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-2 px-6 py-2.5 rounded-full border border-brass text-brass-light text-sm hover:bg-brass hover:text-banana transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  <h3 className="font-display text-xl sm:text-2xl text-parchment">
                    Event Hall Enquiry
                  </h3>

                  <Field label="Full Name" error={errors.fullName}>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className={inputClass(errors.fullName)}
                      placeholder="Jane Smith"
                    />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Email Address" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass(errors.email)}
                        placeholder="jane@email.com"
                      />
                    </Field>
                    <Field label="Phone Number" error={errors.phone}>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass(errors.phone)}
                        placeholder="07123 456789"
                      />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Preferred Event Date" error={errors.eventDate}>
                      <input
                        type="date"
                        value={form.eventDate}
                        onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                        className={inputClass(errors.eventDate)}
                      />
                    </Field>
                    <Field label="Occasion Type">
                      <select
                        value={form.occasion}
                        onChange={(e) =>
                          setForm({ ...form, occasion: e.target.value as FormState["occasion"] })
                        }
                        className={inputClass()}
                      >
                        {OCCASION_TYPES.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label={`Number of Guests: ${form.guestCount}`}>
                    <input
                      type="range"
                      min={50}
                      max={70}
                      value={form.guestCount}
                      onChange={(e) => setForm({ ...form, guestCount: Number(e.target.value) })}
                      className="w-full accent-[#B08A5E]"
                    />
                    <div className="flex justify-between text-xs text-parchment/50 mt-1">
                      <span>50</span>
                      <span>70</span>
                    </div>
                  </Field>

                  <Field label="Catering Style">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {CATERING_STYLES.map((style) => (
                        <button
                          type="button"
                          key={style}
                          onClick={() => setForm({ ...form, cateringStyle: style })}
                          className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors ${
                            form.cateringStyle === style
                              ? "bg-brass text-banana border-brass"
                              : "border-parchment/20 text-parchment/70 hover:border-brass/50"
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Additional Notes">
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      rows={3}
                      className={inputClass()}
                      placeholder="Dietary requirements, decor preferences, timings..."
                    />
                  </Field>

                  <button
                    type="submit"
                    className="mt-2 w-full px-6 py-3.5 rounded-full bg-brass text-banana font-semibold tracking-wide hover:bg-brass-light transition-colors"
                  >
                    Submit Enquiry
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function inputClass(error?: string) {
  return `w-full px-4 py-3 rounded-xl bg-parchment/5 border text-parchment placeholder:text-parchment/30 text-sm focus:outline-none focus:ring-2 focus:ring-brass/50 transition-colors ${
    error ? "border-terracotta" : "border-parchment/15"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-parchment/70">{label}</span>
      {children}
      {error && <span className="text-terracotta text-xs">{error}</span>}
    </label>
  );
}
