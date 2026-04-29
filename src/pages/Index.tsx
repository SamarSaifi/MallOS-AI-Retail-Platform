import { Hero } from "@/components/deck/Hero";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "@/components/deck/TopBar";

const Index = () => {
  return (
    <>
      <Hero />
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="eyebrow mb-4">Explore the experience</div>
        <h2 className="font-display text-ivory text-3xl md:text-5xl max-w-3xl">
          Eleven chapters. One global stage.
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
          {navItems.map((it, i) => (
            <motion.div
              key={it.to}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <Link
                to={it.to}
                className="group block bg-obsidian p-8 hover:bg-obsidian/60 transition-colors h-full"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-gold text-2xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow">Chapter</span>
                </div>
                <div className="font-display text-ivory text-2xl mt-3 group-hover:text-gold transition-colors">
                  {it.label}
                </div>
                <div className="mt-6 text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  Enter →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Index;
