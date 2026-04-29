import { motion } from "framer-motion";

interface SectionDividerProps {
  label?: string;
  index?: string;
}

export const SectionDivider = ({ label, index }: SectionDividerProps) => (
  <div className="relative w-full bg-obsidian py-12 md:py-16">
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center gap-6">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      {(label || index) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 shrink-0"
        >
          {index && <span className="font-display text-gold text-2xl">{index}</span>}
          {label && <span className="eyebrow">{label}</span>}
        </motion.div>
      )}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  </div>
);
