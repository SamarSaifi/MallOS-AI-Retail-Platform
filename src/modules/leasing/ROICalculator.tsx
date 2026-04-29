import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Category = "Luxury" | "Fashion" | "Food" | "Electronics" | "Entertainment" | "Pop-up";

const categoryMultiplier: Record<Category, number> = {
  Luxury: 450,
  Fashion: 280,
  Food: 350,
  Electronics: 320,
  Entertainment: 500,
  "Pop-up": 180,
};

const categories = Object.keys(categoryMultiplier) as Category[];

const useCountUp = (target: number, duration = 1400, trigger: unknown) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, trigger]);
  return val;
};

const fmt = (n: number) => Math.round(n).toLocaleString();

export const ROICalculator = () => {
  const [storeSize, setStoreSize] = useState(800); // sq ft
  const [months, setMonths] = useState(12);
  const [category, setCategory] = useState<Category>("Luxury");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  // Brief's formula
  const dailyExposure = storeSize * 35;
  const monthlyReach = dailyExposure * 30;
  const totalReach = monthlyReach * months;
  const estimatedValue = totalReach * 0.08; // AED
  const revenuePotential = storeSize * months * categoryMultiplier[category]; // AED

  const trigger = `${storeSize}-${months}-${category}-${inView}`;
  const animDaily = useCountUp(inView ? dailyExposure : 0, 1100, trigger);
  const animReach = useCountUp(inView ? totalReach : 0, 1500, trigger);
  const animValue = useCountUp(inView ? estimatedValue : 0, 1500, trigger);
  const animRev = useCountUp(inView ? revenuePotential : 0, 1500, trigger);

  const chartData = [
    { name: "Daily Exposure", value: dailyExposure, fill: "hsl(45, 85%, 70%)" },
    { name: "Total Reach", value: totalReach / 1000, fill: "hsl(42, 75%, 62%)" },
    { name: "Exposure Value (K AED)", value: estimatedValue / 1000, fill: "hsl(38, 65%, 55%)" },
    { name: "Revenue (K AED)", value: revenuePotential / 1000, fill: "hsl(34, 55%, 48%)" },
  ];

  return (
    <section id="roi" className="relative py-28 md:py-40 bg-onyx overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-16"
        >
          <div className="eyebrow mb-4">Live ROI Calculator</div>
          <h2 className="font-display text-ivory text-4xl md:text-6xl leading-[1.05]">
            Model the return,
            <br />
            <span className="text-gold-gradient italic">before you sign.</span>
          </h2>
          <p className="mt-6 text-ivory/65 font-light max-w-xl">
            Adjust your store size, lease duration, and category. See projected exposure,
            reach, brand value, and revenue update in real time.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-gold/10">
          {/* Controls */}
          <div className="lg:col-span-4 bg-obsidian p-8 md:p-10 space-y-8">
            <div>
              <div className="eyebrow mb-3">Category</div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] border transition-colors ${
                      category === c
                        ? "border-gold bg-gold text-obsidian"
                        : "border-gold/25 text-ivory/70 hover:border-gold/60"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <div className="eyebrow">Store Size</div>
                <div className="font-display text-gold text-2xl">{storeSize.toLocaleString()} sq ft</div>
              </div>
              <input
                type="range"
                min={200}
                max={5000}
                step={50}
                value={storeSize}
                onChange={(e) => setStoreSize(Number(e.target.value))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <div className="eyebrow">Lease Duration</div>
                <div className="font-display text-gold text-2xl">{months} mo</div>
              </div>
              <input
                type="range"
                min={3}
                max={36}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div className="hairline" />
            <div className="text-ivory/55 text-xs leading-relaxed">
              Model based on category averages, dwell-time data and verified
              footfall. Indicative only.
            </div>
          </div>

          {/* Output */}
          <div className="lg:col-span-8 bg-obsidian/60 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10 mb-10">
              <div className="bg-obsidian p-5 hover-lift">
                <div className="eyebrow">Daily Exposure</div>
                <div className="font-display text-ivory text-3xl md:text-4xl mt-2 transition-all">
                  {fmt(animDaily)}
                </div>
                <div className="text-ivory/45 text-[10px] mt-1">impressions / day</div>
              </div>
              <div className="bg-obsidian p-5 hover-lift">
                <div className="eyebrow">Total Reach</div>
                <div className="font-display text-ivory text-3xl md:text-4xl mt-2 transition-all">
                  {(animReach / 1e6).toFixed(1)}M
                </div>
                <div className="text-ivory/45 text-[10px] mt-1">over lease period</div>
              </div>
              <div className="bg-obsidian p-5 hover-lift">
                <div className="eyebrow">Exposure Value</div>
                <div className="font-display text-gold text-3xl md:text-4xl mt-2 animate-gold-glow">
                  AED {(animValue / 1e6).toFixed(1)}M
                </div>
                <div className="text-ivory/45 text-[10px] mt-1">brand value generated</div>
              </div>
              <div className="bg-obsidian p-5 hover-lift relative">
                <div className="eyebrow">Revenue Potential</div>
                <div className="font-display text-gold-gradient text-3xl md:text-4xl mt-2 animate-gold-glow">
                  AED {(animRev / 1e6).toFixed(1)}M
                </div>
                <div className="text-ivory/45 text-[10px] mt-1">{category} multiplier ×{categoryMultiplier[category]}</div>
              </div>
            </div>

            <div>
              <div className="eyebrow mb-4">Value Breakdown</div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "hsl(40 30% 96% / 0.55)", fontSize: 10 }}
                      axisLine={{ stroke: "hsl(42 70% 60% / 0.2)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "hsl(40 30% 96% / 0.4)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "hsl(45 85% 70% / 0.06)" }}
                      contentStyle={{
                        background: "hsl(30 15% 4%)",
                        border: "1px solid hsl(42 70% 60% / 0.3)",
                        borderRadius: 0,
                        color: "hsl(40 30% 96%)",
                        fontSize: 12,
                      }}
                      labelStyle={{ color: "hsl(45 85% 70%)", textTransform: "uppercase", letterSpacing: "1px", fontSize: 10 }}
                      formatter={(v: number) => v.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                    />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]} animationDuration={1200}>
                      {chartData.map((d, i) => (
                        <Cell key={i} fill={d.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
