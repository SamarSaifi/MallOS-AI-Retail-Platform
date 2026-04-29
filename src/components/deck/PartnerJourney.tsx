import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Path = {
  id: "retail" | "sponsor" | "event";
  label: string;
  headline: string;
  bullets: { k: string; v: string }[];
  pitch: string;
  cta: string;
};

const paths: Path[] = [
  {
    id: "retail",
    label: "I'm a Retail Brand",
    headline: "Find your ideal leasing path, zone fit, and revenue opportunity.",
    pitch:
      "From flagship luxury to digitally-native pop-ups, we curate placement, foot-flow and adjacency strategy to maximize discovery and conversion for your category.",
    bullets: [
      { k: "100M+", v: "Annual addressable shoppers" },
      { k: "84%", v: "Visitors with purchase intent" },
      { k: "AED 5K", v: "Average luxury basket" },
      { k: "12-mo", v: "Avg. lease incubation cycle" },
    ],
    cta: "Request Leasing Kit",
  },
  {
    id: "sponsor",
    label: "I'm a Sponsor",
    headline: "Own high-visibility moments across footfall, events, and activations.",
    pitch:
      "Category-exclusive sponsorships across atriums, fountains, digital façades and seasonal programming — measured against verified footfall, dwell-time and earned media.",
    bullets: [
      { k: "Tier 1", v: "Naming rights & integrations" },
      { k: "Tier 2", v: "Atrium / plaza activations" },
      { k: "Tier 3", v: "Seasonal & always-on media" },
      { k: "$120M+", v: "Annual earned media value" },
    ],
    cta: "Get Sponsorship Tiers",
  },
  {
    id: "event",
    label: "I'm an Event Producer",
    headline: "Book spaces designed for launches, concerts, exhibitions, and cultural moments.",
    pitch:
      "Production-ready spaces from intimate 500-cap activations to 18,000-cap concert formats, with rigging, broadcast feeds and turnkey hospitality at hand.",
    bullets: [
      { k: "12+", v: "Bookable venues onsite" },
      { k: "18K", v: "Max single-event capacity" },
      { k: "24/7", v: "Production support team" },
      { k: "300+", v: "Events delivered annually" },
    ],
    cta: "Check Venue Availability",
  },
];

export const PartnerJourney = () => {
  const [active, setActive] = useState<Path["id"]>("retail");
  const path = paths.find((p) => p.id === active)!;

  return (
    <section id="partner" className="relative py-28 md:py-40 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-radial-gold)" }} />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="eyebrow mb-4">Choose Your Journey</div>
          <h2 className="font-display text-ivory text-4xl md:text-6xl leading-[1.05]">
            What brings you to
            <span className="text-gold-gradient italic"> The Mall?</span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center mb-14">
          {paths.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`px-6 py-4 border text-sm uppercase tracking-[0.25em] transition-all duration-500 ${
                active === p.id
                  ? "border-gold bg-gold text-obsidian"
                  : "border-gold/30 text-ivory/80 hover:border-gold hover:text-ivory"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong p-8 md:p-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-display text-ivory text-3xl md:text-5xl leading-tight">{path.headline}</h3>
                <p className="mt-6 text-ivory/65 font-light leading-relaxed max-w-lg">{path.pitch}</p>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-10 inline-flex items-center gap-3 text-gold uppercase text-xs tracking-[0.35em] group"
                >
                  <span>{path.cta}</span>
                  <span className="block h-px w-10 bg-gold group-hover:w-20 transition-all duration-500" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-px bg-gold/10">
                {path.bullets.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="bg-obsidian/80 p-6"
                  >
                    <div className="font-display text-gold text-3xl">{b.k}</div>
                    <div className="mt-2 text-ivory/65 text-sm font-light">{b.v}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
