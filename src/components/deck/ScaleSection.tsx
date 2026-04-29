import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import aerial from "@/assets/aerial-dubai.jpg";

const Counter = ({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const fmt = to >= 100 ? Math.round(val).toLocaleString() : val.toFixed(1);
  return <span ref={ref}>{fmt}{suffix}</span>;
};

const stats = [
  { v: 105, suffix: "M", label: "Annual Visitors", note: "More than NYC, Paris & London tourists combined" },
  { v: 80, suffix: "+", label: "Nationalities Daily", note: "A truly global, high-spend audience" },
  { v: 1200, suffix: "+", label: "Brands Onsite", note: "From flagship luxury to global retail icons" },
  { v: 12, suffix: "M ft²", label: "Built Area", note: "Equivalent to 200 football pitches" },
];

export const ScaleSection = () => {
  return (
    <section id="scale" className="relative py-32 md:py-44 overflow-hidden bg-obsidian">
      <div className="absolute inset-0 opacity-30">
        <img src={aerial} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/80 to-obsidian" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-6">Why This Property</div>
          <h2 className="font-display text-ivory text-4xl md:text-7xl leading-[1] mb-8">
            Bigger than a city.
            <br />
            <span className="text-gold-gradient italic">Busier than most countries.</span>
          </h2>
          <p className="text-ivory/65 text-lg font-light max-w-xl">
            The Dubai Mall is not a shopping center. It is a year-round, 12-million-square-foot
            destination that draws more annual visitors than any other place on Earth — and converts
            them into the highest-spending consumer audience in modern retail.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="bg-obsidian p-8 md:p-10 group hover:bg-onyx transition-colors duration-700"
            >
              <div className="font-display text-gold text-5xl md:text-6xl leading-none">
                <Counter to={s.v} suffix={s.suffix} />
              </div>
              <div className="mt-6 hairline w-12" />
              <div className="mt-4 text-ivory text-sm uppercase tracking-[0.2em]">{s.label}</div>
              <div className="mt-3 text-ivory/55 text-sm font-light leading-relaxed">{s.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
