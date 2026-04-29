import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles, MapPin, Users, TrendingUp, Lightbulb, Loader2, DollarSign, Target, ArrowRight } from "lucide-react";
import { ZoneMap } from "@/components/deck/ZoneMap";
import { useAdvisor, ZONE_BY_NAME } from "@/context/AdvisorContext";
import { PremiumCTAGroup } from "@/components/deck/PremiumCTAs";

type BrandType = "Luxury" | "Fashion" | "Food" | "Electronics" | "Entertainment" | "Pop-up";
type Budget = "Low" | "Medium" | "High" | "Premium";
type StoreSize = "Small" | "Medium" | "Large" | "Flagship";
type Audience = "Tourists" | "Families" | "Luxury Buyers" | "Youth" | "Business Visitors";

const brands: BrandType[] = ["Luxury", "Fashion", "Food", "Electronics", "Entertainment", "Pop-up"];
const budgets: Budget[] = ["Low", "Medium", "High", "Premium"];
const sizes: StoreSize[] = ["Small", "Medium", "Large", "Flagship"];
const audiences: Audience[] = ["Tourists", "Families", "Luxury Buyers", "Youth", "Business Visitors"];

type Recommendation = {
  zone: string;
  audience: string;
  footfall: string;
  roi: string;
  reason: string;
  fitScore: number;
  alternative: string;
};

const recommendations: Record<BrandType, Recommendation> = {
  Luxury: {
    zone: "Fashion Avenue",
    audience: "High-income tourists and luxury buyers",
    footfall: "50K+ premium visitors daily",
    roi: "Very High",
    reason:
      "Perfect fit for premium brands seeking global visibility, luxury positioning, and high-value customer traffic.",
    fitScore: 96,
    alternative: "Main Retail Boulevard",
  },
  Fashion: {
    zone: "Main Retail Boulevard",
    audience: "Tourists, youth, and mass retail shoppers",
    footfall: "70K+ daily exposure",
    roi: "High",
    reason:
      "Strong visibility for lifestyle and fashion brands with high repeat traffic and broad audience appeal.",
    fitScore: 91,
    alternative: "Fashion Avenue",
  },
  Food: {
    zone: "Dining District",
    audience: "Families, tourists, and experience-led visitors",
    footfall: "80K+ dining-led traffic",
    roi: "Very High",
    reason:
      "Food concepts benefit from high dwell time, repeat visits, and strong family and tourist movement.",
    fitScore: 94,
    alternative: "Activation Boulevard",
  },
  Electronics: {
    zone: "Innovation Court",
    audience: "Tech-savvy youth, tourists, and business visitors",
    footfall: "45K+ daily tech-focused reach",
    roi: "High",
    reason:
      "Ideal for product demos, launches, experience zones, and high-intent technology customers.",
    fitScore: 88,
    alternative: "Main Retail Boulevard",
  },
  Entertainment: {
    zone: "Grand Atrium & Events Plaza",
    audience: "Families, tourists, and event audiences",
    footfall: "100K+ peak event exposure",
    roi: "Very High",
    reason:
      "Best for immersive attractions, brand activations, and high-energy experiential concepts.",
    fitScore: 97,
    alternative: "Activation Boulevard",
  },
  "Pop-up": {
    zone: "Activation Boulevard",
    audience: "Trend-driven shoppers and tourists",
    footfall: "60K+ daily discovery traffic",
    roi: "Medium to High",
    reason:
      "Perfect for short-term campaigns, product launches, seasonal retail, and test-market activations.",
    fitScore: 85,
    alternative: "Main Retail Boulevard",
  },
};

const audienceBoost: Record<BrandType, Audience> = {
  Luxury: "Luxury Buyers",
  Fashion: "Tourists",
  Food: "Families",
  Electronics: "Business Visitors",
  Entertainment: "Families",
  "Pop-up": "Youth",
};

const LOADING_STEPS = [
  "Analyzing brand fit…",
  "Mapping audience alignment…",
  "Calculating optimal zone…",
];

const Pill = <T extends string>({
  value,
  active,
  onClick,
}: {
  value: T;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-3.5 py-2 text-[10px] uppercase tracking-[0.22em] border transition-all duration-300 ${
      active
        ? "border-gold bg-gold text-obsidian shadow-[0_0_24px_hsl(45_85%_70%/0.35)]"
        : "border-gold/25 text-ivory/70 hover:border-gold/60 hover:text-ivory hover:scale-[1.02]"
    }`}
  >
    {value}
  </button>
);

export const LeasingAdvisor = () => {
  const [brand, setBrand] = useState<BrandType>("Luxury");
  const [budget, setBudget] = useState<Budget>("High");
  const [storeSize, setStoreSize] = useState<StoreSize>("Large");
  const [audience, setAudience] = useState<Audience>("Luxury Buyers");
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [typedReason, setTypedReason] = useState("");
  const rafRef = useRef<number>(0);
  const { setRecommendedZone } = useAdvisor();

  const analyze = () => {
    setAnalyzing(true);
    setRec(null);
    setTypedReason("");
    setLoadingStep(0);
    setRecommendedZone(null);

    // step through loading messages
    const stepTimers = [
      setTimeout(() => setLoadingStep(1), 450),
      setTimeout(() => setLoadingStep(2), 900),
    ];

    setTimeout(() => {
      const base = recommendations[brand];
      const audienceMatch = audience === audienceBoost[brand] ? 3 : -2;
      const budgetBoost = ({ Low: -4, Medium: 0, High: 2, Premium: 4 } as Record<Budget, number>)[budget];
      const sizeBoost = ({ Small: -2, Medium: 0, Large: 2, Flagship: 4 } as Record<StoreSize, number>)[storeSize];
      const fit = Math.max(60, Math.min(99, base.fitScore + audienceMatch + budgetBoost + sizeBoost));
      const r = { ...base, fitScore: fit };
      setRec(r);
      setRecommendedZone(ZONE_BY_NAME[r.zone] ?? null);
      setAnalyzing(false);
      stepTimers.forEach(clearTimeout);
    }, 1400);
  };

  useEffect(() => {
    if (!rec) return;
    const full = rec.reason;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const i = Math.min(full.length, Math.floor(elapsed / 14));
      setTypedReason(full.slice(0, i));
      if (i < full.length) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rec]);

  return (
    <section id="advisor" className="relative py-28 md:py-40 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-radial-gold)" }} />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-16"
        >
          <div className="eyebrow mb-4 flex items-center gap-2">
            <Sparkles className="h-3 w-3" />
            Smart Leasing Advisor · AI
          </div>
          <h2 className="font-display text-ivory text-4xl md:text-6xl leading-[1.05]">
            A decision engine,
            <br />
            <span className="text-gold-gradient italic">not a brochure.</span>
          </h2>
          <p className="mt-6 text-ivory/65 font-light max-w-xl">
            Tell us about your brand. Our model maps it against years of leasing data,
            footfall heat-curves and category-mix economics — then returns the placement that wins.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-gold/10">
          {/* Inputs */}
          <div className="lg:col-span-2 bg-obsidian/90 p-8 md:p-10">
            <div className="space-y-7">
              <div>
                <div className="eyebrow mb-3">Brand Type</div>
                <div className="flex flex-wrap gap-2">
                  {brands.map((c) => (
                    <Pill key={c} value={c} active={brand === c} onClick={() => setBrand(c)} />
                  ))}
                </div>
              </div>

              <div>
                <div className="eyebrow mb-3">Budget</div>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((c) => (
                    <Pill key={c} value={c} active={budget === c} onClick={() => setBudget(c)} />
                  ))}
                </div>
              </div>

              <div>
                <div className="eyebrow mb-3">Store Size</div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((c) => (
                    <Pill key={c} value={c} active={storeSize === c} onClick={() => setStoreSize(c)} />
                  ))}
                </div>
              </div>

              <div>
                <div className="eyebrow mb-3">Target Audience</div>
                <div className="flex flex-wrap gap-2">
                  {audiences.map((c) => (
                    <Pill key={c} value={c} active={audience === c} onClick={() => setAudience(c)} />
                  ))}
                </div>
              </div>

              <button
                onClick={analyze}
                disabled={analyzing}
                className="w-full py-5 bg-gold-gradient text-obsidian text-xs uppercase tracking-[0.3em] font-medium btn-glow disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI working…
                  </>
                ) : (
                  <>Generate Recommendation</>
                )}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="lg:col-span-3 bg-obsidian/60 p-8 md:p-12 min-h-[560px] relative">
            <AnimatePresence mode="wait">
              {analyzing && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8"
                >
                  <div className="h-12 w-12 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
                  <div className="space-y-2 text-center">
                    {LOADING_STEPS.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{
                          opacity: i <= loadingStep ? 1 : 0.25,
                          y: 0,
                        }}
                        transition={{ duration: 0.4 }}
                        className={`text-sm font-light tracking-wide ${
                          i === loadingStep ? "text-gold" : i < loadingStep ? "text-ivory/70" : "text-ivory/30"
                        }`}
                      >
                        {i < loadingStep && "✓ "}
                        {i === loadingStep && "› "}
                        {step}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {!analyzing && !rec && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center text-center"
                >
                  <div>
                    <div className="font-display text-ivory/40 text-3xl italic">
                      Configure your brand.
                    </div>
                    <div className="eyebrow mt-3">Then generate recommendation</div>
                  </div>
                </motion.div>
              )}

              {!analyzing && rec && (
                <motion.div
                  key="rec"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Glowing recommendation card */}
                  <div className="relative animate-card-glow border border-gold/30 bg-obsidian/80 p-6 md:p-8 mb-6">
                    <div className="flex items-start justify-between gap-6 flex-wrap">
                      <div>
                        <div className="eyebrow flex items-center gap-2">
                          <MapPin className="h-3 w-3" /> Recommended Zone
                        </div>
                        <div className="font-display text-gold-gradient text-3xl md:text-5xl mt-2 italic">
                          {rec.zone}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="eyebrow flex items-center gap-2 justify-end">
                          <Target className="h-3 w-3" /> Match Score
                        </div>
                        <motion.div
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="font-display text-ivory text-4xl md:text-5xl mt-1"
                        >
                          <span className="text-gold-gradient">{rec.fitScore}%</span>
                        </motion.div>
                        <div className="text-ivory/45 text-[10px] mt-1">brand–zone alignment</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/10 mb-6">
                    <div className="bg-obsidian p-5 hover-lift">
                      <div className="eyebrow flex items-center gap-2"><Users className="h-3 w-3" /> Audience</div>
                      <div className="font-display text-ivory text-lg mt-2 leading-tight">{rec.audience}</div>
                    </div>
                    <div className="bg-obsidian p-5 hover-lift">
                      <div className="eyebrow flex items-center gap-2"><TrendingUp className="h-3 w-3" /> Footfall</div>
                      <div className="font-display text-ivory text-lg mt-2 leading-tight">{rec.footfall}</div>
                    </div>
                    <div className="bg-obsidian p-5 hover-lift">
                      <div className="eyebrow flex items-center gap-2"><DollarSign className="h-3 w-3" /> ROI Potential</div>
                      <div className="font-display text-gold text-2xl mt-2">{rec.roi}</div>
                    </div>
                    <div className="bg-obsidian p-5 hover-lift">
                      <div className="eyebrow flex items-center gap-2"><ArrowRight className="h-3 w-3" /> Alternative Zone</div>
                      <div className="font-display text-ivory text-lg mt-2 leading-tight">{rec.alternative}</div>
                    </div>
                  </div>

                  <div className="hairline mb-5" />
                  <div className="eyebrow mb-3 flex items-center gap-2">
                    <Lightbulb className="h-3 w-3" /> Insight — Why this fits your brand
                  </div>
                  <p className="text-ivory/80 font-light leading-relaxed">
                    {typedReason}
                    {typedReason.length < rec.reason.length && (
                      <span className="inline-block w-2 h-4 bg-gold/80 ml-0.5 align-middle animate-pulse" />
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Interactive Mall Zone Map */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-px bg-gold/10">
          <div className="lg:col-span-4 bg-obsidian p-8 md:p-10">
            <div className="eyebrow mb-3">Interactive Zone Map</div>
            <h3 className="font-display text-ivory text-3xl leading-tight">
              Watch your zone <span className="text-gold-gradient italic">light up.</span>
            </h3>
            <p className="text-ivory/60 text-sm mt-4 leading-relaxed">
              Run the advisor — the recommended zone glows on the live floorplan. Click any
              zone to explore alternatives.
            </p>
            <div className="hairline my-6" />
            <PremiumCTAGroup className="flex-col" />
          </div>
          <div className="lg:col-span-8 bg-obsidian p-4 md:p-6">
            <ZoneMap height="h-[460px]" />
          </div>
        </div>
      </div>
    </section>
  );
};
