import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const pitchByCategory: Record<string, (b: string) => string> = {
  Luxury: (b) =>
    `For a luxury brand, Dubai Mall offers more than retail space. It offers global visibility, premium audience alignment, and a destination environment where ${b}'s brand presence becomes part of the visitor experience.\n\nWith 50K+ premium daily footfall on Fashion Avenue, the world's highest-spending tourists pass your doors every hour — not as shoppers, but as potential brand ambassadors photographed by 12M+ Instagram moments per year.`,
  Fashion: (b) =>
    `For a fashion brand, Dubai Mall is the single largest stage in the region. ${b} steps into 70K+ daily exposure on the Main Retail Boulevard — broad audience appeal, strong repeat traffic, and lifestyle-led discovery built into every visit.\n\nThis is where collections become culture, and where seasonal drops sell out before they reach e-commerce.`,
  Food: (b) =>
    `For a food concept, Dubai Mall is a 365-day dining destination. ${b} joins the Dining District and inherits 80K+ daily traffic with the highest dwell time of any commercial venue in the region.\n\nFamilies, tourists and experience-led visitors return weekly — turning a restaurant into a recurring revenue engine, not a one-time transaction.`,
  Electronics: (b) =>
    `For a technology brand, Dubai Mall is a live demo theatre with 45K+ daily tech-focused reach. ${b} owns Innovation Court — the launchpad for product reveals, hands-on experiences, and high-intent customers who decide before they leave.\n\nProduct launches here trend regionally within 24 hours.`,
  Entertainment: (b) =>
    `For an entertainment concept, Dubai Mall is the world's largest experiential canvas. ${b} commands the Grand Atrium with 100K+ peak event exposure — immersive attractions, brand activations, and high-energy formats reach an audience that no single venue in the GCC can match.`,
  "Pop-up": (b) =>
    `For a pop-up or activation, Dubai Mall is the fastest go-to-market in the region. ${b} drops into Activation Boulevard with 60K+ daily discovery traffic — perfect for short-term campaigns, product launches, seasonal retail and test-market validation in days, not quarters.`,
};

const buildPitch = (brand: string, category: string) => {
  const b = brand.trim() || "Your brand";
  const fn = pitchByCategory[category] ?? pitchByCategory.Luxury;
  return fn(b);
};

export const PitchGenerator = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Luxury");
  const [pitch, setPitch] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const rafRef = useRef<number>(0);

  const generate = () => {
    setPitch(buildPitch(brand, category));
    setTyped("");
  };

  useEffect(() => {
    if (!pitch) return;
    const start = performance.now();
    const tick = (now: number) => {
      const i = Math.min(pitch.length, Math.floor((now - start) / 8));
      setTyped(pitch.slice(0, i));
      if (i < pitch.length) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pitch]);

  return (
    <section id="pitch" className="relative py-28 md:py-40 bg-onyx overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-radial-gold)" }} />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-16"
        >
          <div className="eyebrow mb-4">AI Sales Pitch · Generator</div>
          <h2 className="font-display text-ivory text-4xl md:text-6xl leading-[1.05]">
            One click. One pitch
            <span className="text-gold-gradient italic"> built for you.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-gold/10">
          <div className="lg:col-span-4 bg-obsidian p-8 md:p-10 space-y-6">
            <div>
              <div className="eyebrow mb-3">Brand Name</div>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Aurélien"
                className="w-full bg-transparent border-b border-gold/30 py-3 text-ivory font-display text-2xl focus:outline-none focus:border-gold transition-colors placeholder:text-ivory/25"
              />
            </div>
            <div>
              <div className="eyebrow mb-3">Category</div>
              <div className="grid grid-cols-2 gap-2">
                {["Luxury", "Fashion", "Food", "Electronics", "Entertainment", "Pop-up"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-2.5 text-xs uppercase tracking-[0.2em] border transition-colors ${
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
            <button
              onClick={generate}
              className="w-full py-5 bg-gold-gradient text-obsidian text-xs uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity"
            >
              Generate My Pitch
            </button>
          </div>

          <div className="lg:col-span-8 bg-obsidian/60 p-8 md:p-12 min-h-[420px]">
            <AnimatePresence mode="wait">
              {!pitch ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="font-display text-ivory/35 text-3xl italic">
                      Your custom pitch appears here.
                    </div>
                    <div className="eyebrow mt-3">Powered by Mall Intelligence</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={pitch}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gold-gradient flex items-center justify-center text-obsidian font-display">✦</div>
                      <div>
                        <div className="text-ivory text-sm">Mall Intelligence</div>
                        <div className="eyebrow text-[10px]">Generated · just now</div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigator.clipboard?.writeText(pitch)}
                      className="px-4 py-2 border border-gold/30 text-ivory/80 text-[10px] uppercase tracking-[0.25em] hover:border-gold hover:text-gold transition-colors"
                    >
                      Copy Pitch
                    </button>
                  </div>
                  <p className="text-ivory/85 font-light leading-[1.85] whitespace-pre-line">
                    {typed}
                    {typed.length < pitch.length && (
                      <span className="inline-block w-2 h-4 bg-gold/80 ml-0.5 align-middle animate-pulse" />
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
