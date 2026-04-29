import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import zoneLuxury from "@/assets/zone-luxury.jpg";
import zoneRetail from "@/assets/zone-retail.jpg";
import zoneDining from "@/assets/zone-dining.jpg";
import zoneEntertainment from "@/assets/zone-entertainment.jpg";
import zoneEvents from "@/assets/zone-events.jpg";

type Zone = {
  id: string;
  name: string;
  tagline: string;
  copy: string;
  stat: string;
  statLabel: string;
  image: string;
};

const zones: Zone[] = [
  {
    id: "luxury",
    name: "Fashion Avenue",
    tagline: "The world's most concentrated luxury wing.",
    copy: "Two floors. Two hundred-plus flagships. From Louis Vuitton to Chanel, Hermès to Cartier — Fashion Avenue is where the house's most ambitious global stores live.",
    stat: "200+",
    statLabel: "Luxury Maisons",
    image: zoneLuxury,
  },
  {
    id: "retail",
    name: "Retail Galleries",
    tagline: "Every category. Every tier. One destination.",
    copy: "From global flagships to digital-native pop-ups, the retail mix is curated for cultural breadth and commercial firepower across every consumer segment.",
    stat: "1,200+",
    statLabel: "Brands & Stores",
    image: zoneRetail,
  },
  {
    id: "dining",
    name: "Dining & Lifestyle",
    tagline: "Hospitality with a view of the world's tallest tower.",
    copy: "Over 200 restaurants and cafés — from Michelin-pedigree chefs to streetwise concepts — overlooking the Dubai Fountain and Burj Khalifa.",
    stat: "200+",
    statLabel: "Restaurants & Cafés",
    image: zoneDining,
  },
  {
    id: "entertainment",
    name: "Attractions",
    tagline: "An aquarium. An ice rink. A waterfall. A theatre.",
    copy: "The Dubai Aquarium, VR Park, KidZania, an Olympic-size ice rink, a 22-screen Reel Cinema — entertainment that rivals theme parks, embedded inside the mall.",
    stat: "10+",
    statLabel: "World-Class Attractions",
    image: zoneEntertainment,
  },
  {
    id: "events",
    name: "Events & Activations",
    tagline: "Where global brands launch what's next.",
    copy: "Concert-grade atrium spaces, fashion-week runways, F1-scale activations and broadcast-ready production — the platform where Apple, Nike and Cartier land in the region.",
    stat: "300+",
    statLabel: "Events Per Year",
    image: zoneEvents,
  },
];

export const ZonesExplorer = () => {
  const [active, setActive] = useState(0);
  const zone = zones[active];

  return (
    <section id="zones" className="relative py-28 md:py-40 bg-obsidian overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <div className="eyebrow mb-4">Explore the Property</div>
          <h2 className="font-display text-ivory text-4xl md:text-6xl leading-tight max-w-4xl">
            Five worlds.
            <span className="text-gold-gradient italic"> One address.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Image stage */}
          <div className="lg:col-span-7 relative aspect-[4/5] md:aspect-[16/11] lg:aspect-[5/6] overflow-hidden vignette">
            <AnimatePresence mode="wait">
              <motion.img
                key={zone.id}
                src={zone.image}
                alt={zone.name}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-obsidian/30" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="eyebrow mb-3">Zone 0{active + 1}</div>
                  <div className="font-display text-ivory text-3xl md:text-5xl">{zone.name}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <ul className="divide-y divide-gold/10 border-y border-gold/10">
              {zones.map((z, i) => {
                const isActive = i === active;
                return (
                  <li key={z.id}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="w-full text-left py-5 md:py-6 group flex items-baseline justify-between gap-4 transition-colors"
                    >
                      <div className="flex items-baseline gap-5">
                        <span className={`font-mono text-xs ${isActive ? "text-gold" : "text-ivory/30"} transition-colors`}>
                          0{i + 1}
                        </span>
                        <span
                          className={`font-display text-2xl md:text-3xl transition-colors ${
                            isActive ? "text-gold" : "text-ivory group-hover:text-gold/80"
                          }`}
                        >
                          {z.name}
                        </span>
                      </div>
                      <span
                        className={`block h-px transition-all duration-700 ${
                          isActive ? "w-12 bg-gold" : "w-4 bg-ivory/20 group-hover:w-8"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <AnimatePresence mode="wait">
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="mt-10"
              >
                <p className="font-display italic text-ivory text-2xl md:text-3xl leading-snug mb-5">
                  "{zone.tagline}"
                </p>
                <p className="text-ivory/65 leading-relaxed font-light max-w-md">{zone.copy}</p>
                <div className="mt-8 flex items-end gap-4">
                  <div className="font-display text-gold text-5xl leading-none">{zone.stat}</div>
                  <div className="eyebrow pb-2">{zone.statLabel}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
