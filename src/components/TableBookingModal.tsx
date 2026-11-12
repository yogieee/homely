"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Users, CalendarDays, CheckCircle2, ChevronLeft } from "lucide-react";
import { RESERVATION_TIMES } from "@/lib/data";
import { useBooking } from "@/lib/booking-context";

type Step = 1 | 2 | 3 | 4;

const PARTY_SIZES = [2, 3, 4, 5, 6, 8, 10, 12];

export default function TableBookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [step, setStep] = useState<Step>(1);
  const [partySize, setPartySize] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");

  const resetAndClose = () => {
    closeBooking();
    setTimeout(() => {
      setStep(1);
      setPartySize(null);
      setDate("");
      setTime("");
      setName("");
      setEmail("");
      setPhone("");
      setRequests("");
    }, 300);
  };

  const handleConfirm = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setStep(4);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            onClick={resetAndClose}
          />
          <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <motion.div
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full sm:max-w-lg bg-banana border border-brass/25 rounded-t-md sm:rounded-md max-h-[92vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-banana/95 backdrop-blur-sm border-b border-parchment/10 px-6 py-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  {step > 1 && step < 4 && (
                    <button
                      onClick={() => setStep((s) => (s - 1) as Step)}
                      className="text-parchment/60 hover:text-brass-light transition-colors"
                      aria-label="Back"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <h2 className="font-display text-xl text-parchment">Reserve a Table</h2>
                </div>
                <button
                  onClick={resetAndClose}
                  className="text-parchment/60 hover:text-brass-light transition-colors"
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>

              {step < 4 && (
                <div className="flex items-center gap-2 px-6 pt-5">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex-1 h-1 rounded-full bg-parchment/10 overflow-hidden">
                      <motion.div
                        animate={{ width: step >= s ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                        className="h-full bg-brass"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-5"
                    >
                      <p className="text-parchment/70 text-sm flex items-center gap-2">
                        <Users size={16} className="text-brass-light" /> How many guests?
                      </p>
                      <div className="grid grid-cols-4 gap-3">
                        {PARTY_SIZES.map((size) => (
                          <button
                            key={size}
                            onClick={() => setPartySize(size)}
                            className={`py-3 rounded-xl border text-sm font-medium transition-colors ${
                              partySize === size
                                ? "bg-brass text-banana border-brass"
                                : "border-parchment/15 text-parchment/80 hover:border-brass/50"
                            }`}
                          >
                            {size}
                            {size === 12 ? "+" : ""}
                          </button>
                        ))}
                      </div>
                      <button
                        disabled={!partySize}
                        onClick={() => setStep(2)}
                        className="mt-2 w-full px-6 py-3.5 rounded-full bg-brass text-banana font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brass-light transition-colors"
                      >
                        Continue
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-5"
                    >
                      <p className="text-parchment/70 text-sm flex items-center gap-2">
                        <CalendarDays size={16} className="text-brass-light" /> Choose a date & time
                      </p>
                      <label className="flex flex-col gap-1.5 text-sm">
                        <span className="text-parchment/70">Date</span>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-parchment/5 border border-parchment/15 text-parchment text-sm focus:outline-none focus:ring-2 focus:ring-brass/50"
                        />
                      </label>
                      <div>
                        <span className="text-sm text-parchment/70 mb-2 block">Time</span>
                        <div className="grid grid-cols-5 gap-2">
                          {RESERVATION_TIMES.map((t) => (
                            <button
                              key={t}
                              onClick={() => setTime(t)}
                              className={`py-2.5 rounded-lg border text-xs sm:text-sm transition-colors ${
                                time === t
                                  ? "bg-brass text-banana border-brass"
                                  : "border-parchment/15 text-parchment/80 hover:border-brass/50"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        disabled={!date || !time}
                        onClick={() => setStep(3)}
                        className="mt-2 w-full px-6 py-3.5 rounded-full bg-brass text-banana font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brass-light transition-colors"
                      >
                        Continue
                      </button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.form
                      key="step3"
                      onSubmit={handleConfirm}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-4"
                    >
                      <p className="text-parchment/70 text-sm">Your details</p>
                      <input
                        required
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-parchment/5 border border-parchment/15 text-parchment placeholder:text-parchment/30 text-sm focus:outline-none focus:ring-2 focus:ring-brass/50"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-parchment/5 border border-parchment/15 text-parchment placeholder:text-parchment/30 text-sm focus:outline-none focus:ring-2 focus:ring-brass/50"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-parchment/5 border border-parchment/15 text-parchment placeholder:text-parchment/30 text-sm focus:outline-none focus:ring-2 focus:ring-brass/50"
                      />
                      <textarea
                        placeholder="Special requests (optional)"
                        value={requests}
                        onChange={(e) => setRequests(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl bg-parchment/5 border border-parchment/15 text-parchment placeholder:text-parchment/30 text-sm focus:outline-none focus:ring-2 focus:ring-brass/50"
                      />

                      <div className="rounded-xl bg-parchment/5 border border-parchment/10 p-4 text-sm text-parchment/70 flex flex-col gap-1">
                        <span>
                          Party of <strong className="text-parchment">{partySize}</strong>
                        </span>
                        <span>
                          {date} at <strong className="text-parchment">{time}</strong>
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="mt-1 w-full px-6 py-3.5 rounded-full bg-brass text-banana font-semibold tracking-wide hover:bg-brass-light transition-colors"
                      >
                        Confirm Reservation
                      </button>
                    </motion.form>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center gap-4 py-6"
                    >
                      <span className="w-16 h-16 rounded-full bg-brass/15 flex items-center justify-center text-brass-light">
                        <CheckCircle2 size={32} />
                      </span>
                      <h3 className="font-display text-2xl text-parchment">Table Reserved!</h3>
                      <p className="text-parchment/70 max-w-sm">
                        Thanks, {name.split(" ")[0]}! Your request for a table for {partySize} on {date} at{" "}
                        {time} is with us. We&apos;ll be in touch at {email} to confirm.
                      </p>
                      <button
                        onClick={resetAndClose}
                        className="mt-2 px-6 py-2.5 rounded-full border border-brass text-brass-light text-sm hover:bg-brass hover:text-banana transition-colors"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
