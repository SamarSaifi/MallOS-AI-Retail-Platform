import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Mode = "Morning" | "Afternoon" | "Evening" | "Weekend";

const curves: Record<Mode, number[]> = {
  Morning:   [10, 14, 22, 30, 36, 40, 44, 42, 38, 34, 30, 28],
  Afternoon: [22, 30, 42, 55, 64, 70, 72, 68, 60, 52, 46, 42],
  Evening:   [40, 52, 64, 76, 86, 92, 96, 94, 88, 78, 64, 50],
  Weekend:   [55, 68, 80, 90, 96, 100, 99, 95, 92, 88, 80, 70],
};

const HOURS = ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
const ZONES = [
  { name: "Fashion Avenue", x: "20%", y: "30%", weight: 1.0 },
  { name: "Grand Atrium", x: "48%", y: "42%", weight: 1.2 },
  { name: "Aquarium Plaza", x: "70%", y: "28%", weight: 0.85 },
  { name: "Waterfront", x: "62%", y: "68%", weight: 1.05 },
  { name: "Cinemas", x: "30%", y: "70%", weight: 0.9 },
  { name: "Beauty Hall", x: "82%", y: "55%", weight: 0.8 },
];

export const CrowdEnergy = () => {
  const [mode, setMode] = useState<Mode>("Evening");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const seq: Mode[] = ["Morning", "Afternoon", "Evening", "Weekend"];
    let i = seq.indexOf(mode);
    const t = setInterval(() => {
      i = (i + 1) % seq.length;
      setMode(seq[i]);
    }, 4200);
    return () => clearInterval(t);
  }, [auto, mode]);

  const data = curves[mode];
  const peak = Math.max(...data);

  return (
    <section id="crowd" className="relative py-28 md:py-40 bg-obsidian overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-16"
        >
          <div className="eyebrow mb-4">Crowd Energy · Live Simulation</div>
          <h2 className="font-display text-ivory text-4xl md:text-6xl leading-[1.05]">
            The mall is
            <span className="text-gold-gradient italic"> alive.</span>
          </h2>
          <p className="mt-6 text-ivory/65 font-light max-w-xl">
            Watch verified footfall ebb and flow across the property — from a quiet
            morning espresso to a Saturday-night crescendo of 280,000 visitors.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          {(Object.keys(curves) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setAuto(false); }}
              className={`px-5 py-3 text-xs uppercase tracking-[0.25em] border transition-all duration-500 ${
                mode === m
                  ? "border-gold bg-gold text-obsidian"
                  : "border-gold/25 text-ivory/70 hover:border-gold/60"
              }`}
            >
              {m}
            </button>
          ))}
          <button
            onClick={() => setAuto((v) => !v)}
            className="ml-auto eyebrow flex items-center gap-2 text-ivory/60 hover:text-gold transition-colors"
          >
            <span className={`h-2 w-2 rounded-full ${auto ? "bg-gold animate-pulse" : "bg-ivory/30"}`} />
            {auto ? "Auto-cycle on" : "Auto-cycle off"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gold/10">
          {/* Heatmap "map" */}
          <div className="bg-obsidian p-8 md:p-10 relative aspect-[4/3] lg:aspect-auto">
            <div className="eyebrow mb-4">Zone Density</div>
            <div className="absolute inset-8 md:inset-10 top-14 rounded-sm border border-gold/15 overflow-hidden">
              {/* base "map" pattern */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(40 30% 96% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(40 30% 96% / 0.04) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              {ZONES.map((z, i) => {
                const intensity = (peak / 100) * z.weight;
                const radius = 60 + intensity * 90;
                return (
                  <motion.div
                    key={z.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: z.x, top: z.y }}
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div
                      animate={{ width: radius * 2, height: radius * 2, opacity: 0.35 + intensity * 0.4 }}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-full -translate-x-1/2 -translate-y-1/2 absolute left-0 top-0"
                      style={{
                        background: `radial-gradient(circle, hsl(42 85% 65% / ${0.55 * intensity}) 0%, transparent 70%)`,
                        filter: "blur(4px)",
                      }}
                    />
                    <div className="relative flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_hsl(42_85%_70%)]" />
                      <span className="text-ivory text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                        {z.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Hourly chart */}
          <div className="bg-obsidian/60 p-8 md:p-10">
            <div className="flex items-baseline justify-between mb-6">
              <div className="eyebrow">Hourly Footfall · {mode}</div>
              <div className="font-display text-gold text-3xl">
                {Math.round(peak * 2800).toLocaleString()}
                <span className="text-ivory/40 text-sm ml-1">peak/hr</span>
              </div>
            </div>
            <div className="h-64 flex items-end gap-1.5">
              {data.map((v, i) => (
                <motion.div
                  key={i}
                  className="flex-1 relative rounded-t-sm overflow-hidden"
                  initial={false}
                  animate={{ height: `${v}%` }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.025 }}
                  style={{
                    background:
                      "linear-gradient(to top, hsl(38 55% 45% / 0.4), hsl(45 85% 70% / 0.95))",
                  }}
                >
                  {v === peak && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-gold uppercase tracking-widest">
                      Peak
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[10px] text-ivory/40 uppercase tracking-widest">
              {HOURS.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
