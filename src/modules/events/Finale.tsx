import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aerial from "@/assets/aerial-dubai.jpg";
import { PremiumCTAGroup } from "@/components/deck/PremiumCTAs";

const ZONES = [
  { name: "Luxury", x: "22%", y: "38%", delay: 0 },
  { name: "Retail", x: "44%", y: "32%", delay: 0.15 },
  { name: "Dining", x: "62%", y: "58%", delay: 0.3 },
  { name: "Entertainment", x: "32%", y: "66%", delay: 0.45 },
  { name: "Events", x: "72%", y: "30%", delay: 0.6 },
  { name: "Hospitality", x: "82%", y: "60%", delay: 0.75 },
];

export const Finale = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.4, 1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.85], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0.4, 0.7], [60, 0]);

  return (
    <section ref={ref} id="finale" className="relative h-[140vh] bg-obsidian overflow-hidden">
      <div className="sticky top-0 h-screen w-full overflow-hidden vignette grain">
        <motion.div style={{ scale }} className="absolute inset-0">
          <img src={aerial} alt="Aerial view of The Dubai Mall and Downtown" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/60" />
        </motion.div>

        {/* Zone lights */}
        <motion.div style={{ opacity }} className="absolute inset-0">
          {ZONES.map((z) => (
            <motion.div
              key={z.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: z.x, top: z.y }}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30%" }}
              transition={{ duration: 1.2, delay: z.delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: z.delay }}
                className="absolute -inset-10 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(42 85% 70% / 0.5) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
              <div className="relative flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_20px_hsl(42_85%_70%)]" />
                <span className="text-ivory text-[10px] md:text-xs uppercase tracking-[0.3em]">
                  {z.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final tagline */}
        <motion.div
          style={{ y: textY, opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="eyebrow mb-6">The Final Word</div>
          <h2 className="font-display text-ivory text-5xl md:text-8xl lg:text-[8rem] leading-[0.95] max-w-6xl">
            This is not a mall.
            <br />
            <span className="text-gold-gradient italic">This is a city.</span>
          </h2>
          <p className="mt-8 max-w-xl text-ivory/65 font-light leading-relaxed">
            Twelve million square feet. Six worlds. One stage that the next generation
            of global brands cannot afford to miss.
          </p>
          <div className="mt-10">
            <PremiumCTAGroup className="justify-center" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
