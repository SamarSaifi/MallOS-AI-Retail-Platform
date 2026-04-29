import { motion } from "framer-motion";

const items = [
  { id: "hero", label: "Overture" },
  { id: "scale", label: "Scale" },
  { id: "zones", label: "Zones" },
  { id: "luxury", label: "Luxury" },
  { id: "crowd", label: "Crowd" },
  { id: "advisor", label: "Advisor" },
  { id: "roi", label: "ROI" },
  { id: "events", label: "Events" },
  { id: "partner", label: "Partner" },
  { id: "pitch", label: "Pitch" },
  { id: "finale", label: "Finale" },
  { id: "contact", label: "Connect" },
];

export const SideNav = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block"
      aria-label="Section navigation"
    >
      <ul className="flex flex-col gap-5">
        {items.map((it) => (
          <li key={it.id}>
            <button
              onClick={() => scrollTo(it.id)}
              className="group flex items-center gap-3 text-left"
              aria-label={`Go to ${it.label}`}
            >
              <span className="block h-px w-6 bg-ivory/30 group-hover:w-12 group-hover:bg-gold transition-all duration-500" />
              <span className="eyebrow opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                {it.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};
