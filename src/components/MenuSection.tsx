"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Flame, TriangleAlert } from "lucide-react";
import { FOODHUB_URL } from "@/lib/data";
import { MENU_TABS, formatPrice, type MenuDiet, type MenuEntry } from "@/lib/menu";
import SectionHeading from "./SectionHeading";

type DietFilter = "all" | MenuDiet;

const DIET_FILTERS: { id: DietFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "veg", label: "Veg" },
  { id: "nonveg", label: "Non-Veg" },
];

function DietMark({ diet }: { diet: MenuDiet }) {
  const isVeg = diet === "veg";
  return (
    <span
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-flex items-center justify-center w-3.5 h-3.5 shrink-0 border-[1.5px] rounded-[2px] ${
        isVeg ? "border-[#4F7A3A]" : "border-terracotta"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isVeg ? "bg-[#4F7A3A]" : "bg-terracotta"}`} />
    </span>
  );
}

function MenuRow({ item }: { item: MenuEntry }) {
  return (
    <li className="flex items-baseline gap-2.5 py-1.5">
      <span className="translate-y-[2px]">
        <DietMark diet={item.diet} />
      </span>
      <span className="text-[15px] text-charcoal">
        {item.name}
        {item.note && <span className="text-charcoal/50 text-xs"> ({item.note})</span>}
        {item.spicy && (
          <Flame size={13} aria-label="Spicy" className="inline ml-1.5 -mt-0.5 text-terracotta fill-terracotta/30" />
        )}
      </span>
      <span className="flex-1 border-b border-dotted border-brass/50 translate-y-[-4px]" />
      <span className="font-display text-[15px] text-charcoal tabular-nums">{formatPrice(item.price)}</span>
    </li>
  );
}

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState(MENU_TABS[0].id);
  const [diet, setDiet] = useState<DietFilter>("all");

  const tab = MENU_TABS.find((t) => t.id === activeTab) ?? MENU_TABS[0];
  const groups = tab.groups
    .map((g) => ({ ...g, items: g.items.filter((i) => diet === "all" || i.diet === diet) }))
    .filter((g) => g.items.length > 0);

  return (
    <section id="menu" className="relative bg-banana py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 print-pattern" />
      <div className="absolute inset-0 bg-banana/60" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Menu"
          tone="dark"
          title="Healthy · Hearty · Happy"
          description="Crisp dosas, fiery Guntur starters, slow cooked curries and dum biryanis. Everything is made fresh with proper spices, the way we'd cook at home."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-14 bg-ivory rounded-sm p-2 sm:p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
        >
          <div className="border border-brass/60 p-1">
            <div className="border border-brass/30 px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
              <p className="text-center font-display text-sm sm:text-base tracking-[0.35em] uppercase text-brass">
                Atithi Devo Bhava
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {MENU_TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm tracking-wide border transition-colors ${
                      activeTab === t.id
                        ? "bg-banana text-parchment border-banana"
                        : "border-brass/40 text-charcoal/75 hover:border-brass hover:text-charcoal"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-y border-brass/25 py-3">
                <div className="flex items-center gap-1 p-1 rounded-full border border-brass/30">
                  {DIET_FILTERS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setDiet(f.id)}
                      className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition-colors ${
                        diet === f.id ? "bg-brass text-ivory" : "text-charcoal/70 hover:text-charcoal"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-5 text-xs text-charcoal/65">
                  <span className="flex items-center gap-1.5">
                    <DietMark diet="veg" /> Veg
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DietMark diet="nonveg" /> Non-Veg
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flame size={13} className="text-terracotta fill-terracotta/30" /> Spicy
                  </span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${diet}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-8 grid gap-x-14 gap-y-10 ${groups.length > 1 ? "md:grid-cols-2" : "md:grid-cols-2"}`}
                >
                  {groups.length === 0 && (
                    <p className="md:col-span-2 text-center text-sm text-charcoal/60 py-6">
                      No {diet === "veg" ? "vegetarian" : "non-vegetarian"} dishes in this section.
                    </p>
                  )}
                  {groups.map((group) => {
                    const half = Math.ceil(group.items.length / 2);
                    const single = groups.length === 1;
                    const columns = single ? [group.items.slice(0, half), group.items.slice(half)] : [group.items];
                    return (
                      <div key={group.title} className={single ? "md:col-span-2" : ""}>
                        <div className="flex items-baseline justify-between gap-3 border-b border-brass/40 pb-2">
                          <h3 className="font-display text-xl sm:text-2xl text-charcoal">{group.title}</h3>
                          {group.availability && (
                            <span className="text-[11px] tracking-[0.15em] uppercase text-terracotta whitespace-nowrap">
                              {group.availability}
                            </span>
                          )}
                        </div>
                        <div className={`mt-3 grid ${single ? "md:grid-cols-2 gap-x-14" : ""}`}>
                          {columns.map((col, i) => (
                            <ul key={i}>
                              {col.map((item) => (
                                <MenuRow key={item.name} item={item} />
                              ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 pt-6 border-t border-brass/25 grid md:grid-cols-2 gap-6 text-xs text-charcoal/65">
                <p className="tracking-[0.15em] uppercase leading-relaxed">
                  We use fresh ingredients &amp; authentic spices, prepared with love.
                </p>
                <p className="flex gap-2.5 leading-relaxed">
                  <TriangleAlert size={16} className="shrink-0 text-terracotta" />
                  <span>
                    <strong className="text-charcoal/80 font-semibold">Food allergy notice:</strong> please inform
                    our staff of any allergies or dietary requirements before ordering. While we take every care, we
                    cannot guarantee that our food is 100% allergen-free.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-md border border-brass/40 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-parchment">Homely, Delivered</h3>
            <p className="text-parchment/70 mt-1">
              Our signature dishes, freshly prepared and delivered to your door through Foodhub.
            </p>
          </div>
          <a
            href={FOODHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-7 py-3.5 rounded-full bg-brass text-banana font-semibold tracking-wide hover:bg-brass-light transition-colors flex items-center gap-2"
          >
            Order on Foodhub
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
