import { motion } from "framer-motion";
import zoneEvents from "@/assets/zone-events.jpg";

const events = [
  {
    tag: "Concert · 18,000 capacity",
    title: "Atrium Live Series",
    copy: "Multi-night residencies inside the Grand Atrium, broadcast-ready with full lighting rigs and 360° crowd flow.",
  },
  {
    tag: "Brand Activation",
    title: "Global Product Launches",
    copy: "Apple, Cartier, Nike and LVMH have used the property to introduce flagship products to the MENA market.",
  },
  {
    tag: "Couture · Runway",
    title: "Arab Fashion Week",
    copy: "A purpose-built runway and front-row protocol that hosts the region's most-photographed fashion moments.",
  },
  {
    tag: "Sponsorship · Year-round",
    title: "Naming & Naming-Rights",
    copy: "Atriums, plazas and digital façades available for category-exclusive partnership across multi-year terms.",
  },
];

export const EventsSection = () => {
  return (
    <section id="events" className="relative py-28 md:py-40 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <img src={zoneEvents} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/80 to-obsidian" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-16"
        >
          <div className="eyebrow mb-4">Events & Monetization</div>
          <h2 className="font-display text-ivory text-4xl md:text-6xl leading-[1.05]">
            Not a venue.
            <span className="text-gold-gradient italic"> A global platform.</span>
          </h2>
          <p className="mt-6 text-ivory/65 max-w-xl font-light leading-relaxed">
            Concerts, broadcast moments, brand activations, fashion weeks and
            corporate experiences — engineered for production-grade scale and
            built-in audience guarantee.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/10">
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-obsidian p-8 md:p-12 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-px w-0 bg-gold-gradient group-hover:w-full transition-all duration-1000" />
              <div className="eyebrow mb-5">{e.tag}</div>
              <div className="font-display text-ivory text-3xl md:text-4xl group-hover:text-gold transition-colors duration-500">
                {e.title}
              </div>
              <p className="mt-5 text-ivory/60 font-light leading-relaxed max-w-md">{e.copy}</p>
              <div className="mt-8 flex items-center gap-3 text-gold text-xs uppercase tracking-[0.3em]">
                <span>Inquire</span>
                <span className="block h-px w-8 bg-gold group-hover:w-16 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 md:p-12 glass"
        >
          <div>
            <div className="font-display text-ivory text-3xl md:text-4xl">Start a Partnership</div>
            <div className="mt-2 text-ivory/55 font-light">
              Book a private property tour or request a tailored deck for your category.
            </div>
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gold text-obsidian px-8 py-4 text-sm uppercase tracking-[0.3em] hover:bg-gold-bright transition-colors duration-500"
          >
            Connect with Sales
          </button>
        </motion.div>
      </div>
    </section>
  );
};
