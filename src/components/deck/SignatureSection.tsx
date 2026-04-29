import { motion } from "framer-motion";
import { PremiumCTAGroup } from "@/components/deck/PremiumCTAs";

const line1 = "This is not a mall.";
const line2 = "This is a city.";

const wordVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const Words = ({ text, italicGold = false, delayBase = 0 }: { text: string; italicGold?: boolean; delayBase?: number }) => (
  <span className={italicGold ? "text-gold-gradient italic" : ""}>
    {text.split(" ").map((w, i) => (
      <motion.span
        key={i}
        variants={wordVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: delayBase + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block mr-[0.25em]"
      >
        {w}
      </motion.span>
    ))}
  </span>
);

export const SignatureSection = () => {
  return (
    <section className="relative py-32 md:py-48 bg-obsidian overflow-hidden vignette grain">
      {/* Slow fade overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-obsidian pointer-events-none"
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-40"
          animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse at center, hsl(42 70% 60% / 0.35), transparent 60%)" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display text-ivory text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.95] tracking-[-0.03em]">
          <Words text={line1} delayBase={0.2} />
          <br />
          <Words text={line2} italicGold delayBase={1.2} />
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 2.6 }}
          className="mt-14 mx-auto h-px w-48 bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-14 flex justify-center"
        >
          <PremiumCTAGroup className="justify-center" />
        </motion.div>
      </div>
    </section>
  );
};
