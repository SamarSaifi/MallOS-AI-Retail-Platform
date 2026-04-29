import { motion } from "framer-motion";
import zoneLuxury from "@/assets/zone-luxury.jpg";

const houses = [
  "Louis Vuitton", "Chanel", "Hermès", "Cartier", "Dior", "Gucci",
  "Saint Laurent", "Bvlgari", "Tiffany & Co.", "Prada", "Fendi", "Balenciaga",
  "Valentino", "Bottega Veneta", "Loewe", "Givenchy",
];

export const LuxurySection = () => {
  return (
    <section id="luxury" className="relative py-28 md:py-40 bg-obsidian overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5"
          >
            <div className="eyebrow mb-5">Fashion Avenue</div>
            <h2 className="font-display text-ivory text-4xl md:text-6xl leading-[1.05]">
              The address every luxury house
              <span className="text-gold-gradient italic"> needs to hold.</span>
            </h2>
            <p className="mt-7 text-ivory/65 leading-relaxed font-light">
              Fashion Avenue concentrates the world's most important maisons under
              one roof — flagship-scale stores that double as regional
              headquarters, brand experiences and clienteling theatres for the
              highest-spending shoppers on the planet.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-px bg-gold/15">
              {[
                { v: "$8B+", l: "Annual GMV" },
                { v: "AED 5K", l: "Avg. Basket" },
                { v: "70%", l: "Tourist Spend" },
              ].map((s, i) => (
                <div key={i} className="bg-obsidian p-5">
                  <div className="font-display text-gold text-2xl">{s.v}</div>
                  <div className="eyebrow text-[10px] mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative aspect-[4/5] overflow-hidden vignette"
          >
            <img src={zoneLuxury} alt="Fashion Avenue luxury wing" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Marquee of houses */}
        <div className="mt-20 relative overflow-hidden border-y border-gold/15 py-7">
          <div className="flex gap-12 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
            {[...houses, ...houses].map((h, i) => (
              <span key={i} className="font-display text-ivory/40 hover:text-gold transition-colors text-2xl md:text-3xl tracking-wide">
                {h} <span className="text-gold/40 mx-6">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
};
