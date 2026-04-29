import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Props {
  index?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  prev?: { to: string; label: string };
  next?: { to: string; label: string };
}

export const PageHeader = ({ eyebrow, title, subtitle }: Props) => (
  <header className="px-6 md:px-12 pt-16 pb-10 max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <span className="eyebrow">{eyebrow}</span>
    </motion.div>
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="font-display text-ivory text-4xl md:text-6xl mt-4 leading-[1.05] max-w-4xl"
    >
      {title}
    </motion.h1>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="mt-5 max-w-2xl text-ivory/65 text-base md:text-lg font-light leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="mt-8 h-px bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />
  </header>
);

export const PageFooter = ({
  prev,
  next,
}: {
  prev?: { to: string; label: string };
  next?: { to: string; label: string };
}) => (
  <footer className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-t border-gold/10 mt-16 flex items-center justify-between gap-6">
    {prev ? (
      <Link to={prev.to} className="group flex items-center gap-3 text-ivory/70 hover:text-gold transition-colors">
        <span className="text-gold">←</span>
        <div>
          <div className="eyebrow text-[10px]">Previous</div>
          <div className="font-display text-lg">{prev.label}</div>
        </div>
      </Link>
    ) : <div />}
    {next ? (
      <Link to={next.to} className="group flex items-center gap-3 text-ivory/70 hover:text-gold transition-colors text-right">
        <div>
          <div className="eyebrow text-[10px]">Next</div>
          <div className="font-display text-lg">{next.label}</div>
        </div>
        <span className="text-gold">→</span>
      </Link>
    ) : <div />}
  </footer>
);
