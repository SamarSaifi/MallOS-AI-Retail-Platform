import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Insight = { icon: string; label: string; value: string };

interface PromptEntry {
  q: string;
  insights: Insight[];
  summary: string;
  followUps: number[];
}

const prompts: PromptEntry[] = [
  {
    q: "Why should my brand be here?",
    insights: [
      { icon: "📊", label: "Audience Reach", value: "105M+ annual visitors · 80+ nationalities" },
      { icon: "💰", label: "Spending Power", value: "Highest luxury basket-size on Earth" },
      { icon: "🌍", label: "Global Reach", value: "$120M+ earned media value annually" },
      { icon: "📈", label: "Opportunity", value: "Tourism-led, year-round demand curve" },
    ],
    summary:
      "No other single property combines this volume, spending power, and global media reach. Your brand becomes part of the world's most-photographed retail destination.",
    followUps: [1, 2, 3],
  },
  {
    q: "Show me sponsorship options.",
    insights: [
      { icon: "🏛️", label: "Tier 1 — Naming", value: "Atriums · plazas · digital façades" },
      { icon: "✨", label: "Tier 2 — Activations", value: "Atrium takeovers · experiential zones" },
      { icon: "🎬", label: "Tier 3 — Always-on", value: "Fountain shows · seasonal · digital media" },
      { icon: "🔒", label: "Exclusivity", value: "Category-locked partnerships available" },
    ],
    summary:
      "Three structured tiers with category exclusivity. Each tier is built to deliver measurable reach, brand lift, and long-term equity.",
    followUps: [0, 2, 3],
  },
  {
    q: "What is the audience reach?",
    insights: [
      { icon: "👥", label: "Onsite Visitors", value: "105M+ per year" },
      { icon: "📸", label: "Social Reach", value: "12M+ Instagram-tagged moments" },
      { icon: "📺", label: "Earned Media", value: "$120M annual value" },
      { icon: "🌐", label: "Global Mix", value: "62% international tourists" },
    ],
    summary:
      "A built-in global audience that arrives every day — captured, measured, and re-broadcast across social, broadcast, and influencer channels.",
    followUps: [0, 1, 3],
  },
  {
    q: "How do I book a venue?",
    insights: [
      { icon: "🏟️", label: "Spaces", value: "500-cap rooms → 18,000-cap Grand Atrium" },
      { icon: "🎛️", label: "Tech Pack", value: "LED, rigging, broadcast-ready" },
      { icon: "📅", label: "Lead Time", value: "Proposal within 48 hours" },
      { icon: "🤝", label: "Curation", value: "Dedicated event partnerships team" },
    ],
    summary:
      "Tap an action below — our team responds within 48 hours with availability, technical packs, and a tailored proposal.",
    followUps: [0, 1, 2],
  },
];

const PROCESS_STEPS = ["Analyzing your question…", "Generating insights…", "Delivering recommendation…"];

export const AIConcierge = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "processing" | "result">("idle");
  const [processStep, setProcessStep] = useState(0);
  const [typedSummary, setTypedSummary] = useState("");
  const rafRef = useRef<number>(0);
  const timersRef = useRef<number[]>([]);

  const askPrompt = (i: number) => {
    setActive(i);
    setPhase("processing");
    setProcessStep(0);
    setTypedSummary("");

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [
      window.setTimeout(() => setProcessStep(1), 500),
      window.setTimeout(() => setProcessStep(2), 1000),
      window.setTimeout(() => setPhase("result"), 1500),
    ];
  };

  // typewriter for summary
  useEffect(() => {
    if (phase !== "result" || active === null) {
      setTypedSummary("");
      return;
    }
    const full = prompts[active].summary;
    setTypedSummary("");
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const i = Math.min(full.length, Math.floor(elapsed / 16));
      setTypedSummary(full.slice(0, i));
      if (i < full.length) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, active]);

  useEffect(() => () => {
    timersRef.current.forEach(clearTimeout);
  }, []);

  const goAndClose = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const current = active !== null ? prompts[active] : null;

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 h-14 w-14 md:h-16 md:w-16 rounded-full bg-gold-gradient text-obsidian shadow-[0_20px_60px_-10px_hsl(42_70%_60%/0.6)] flex items-center justify-center group btn-glow"
        aria-label="Open AI Concierge"
      >
        <span className="absolute inset-0 rounded-full animate-pulse-gold" />
        {open ? (
          <svg className="h-5 w-5 relative" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        ) : (
          <span className="font-display text-2xl relative leading-none">✦</span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] max-w-md glass-strong p-6 md:p-7 max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gold-gradient flex items-center justify-center text-obsidian font-display">✦</div>
                <div>
                  <div className="text-ivory text-sm font-medium">Mall Concierge</div>
                  <div className="flex items-center gap-1.5 text-gold/90 text-[10px] uppercase tracking-[0.3em]">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    AI · Live
                  </div>
                </div>
              </div>
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            </div>

            {/* Conversation surface */}
            <div className="min-h-[180px] mb-5 text-ivory/85 text-sm leading-relaxed font-light">
              {phase === "idle" && (
                <p className="text-ivory/55 italic">
                  Ask anything about partnerships, leasing, sponsorship or events at The Dubai Mall.
                </p>
              )}

              {phase !== "idle" && current && (
                <>
                  <div className="text-ivory text-sm mb-4">
                    <span className="text-gold/80 mr-2">›</span>{current.q}
                  </div>

                  {phase === "processing" && (
                    <div className="space-y-1.5">
                      {PROCESS_STEPS.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: i <= processStep ? 1 : 0.25, y: 0 }}
                          className={`text-xs ${
                            i === processStep ? "text-gold" : i < processStep ? "text-ivory/60" : "text-ivory/30"
                          }`}
                        >
                          {i < processStep && "✓ "}
                          {i === processStep && "› "}
                          {s}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {phase === "result" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Structured insights */}
                      <div className="grid grid-cols-1 gap-1.5 mb-4">
                        {current.insights.map((ins, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                            className="flex items-start gap-2.5 px-3 py-2 border border-gold/15 bg-obsidian/60"
                          >
                            <span className="text-base leading-none mt-0.5">{ins.icon}</span>
                            <div className="min-w-0">
                              <div className="eyebrow text-[8px] mb-0.5">{ins.label}</div>
                              <div className="text-ivory text-[12px] leading-snug">{ins.value}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Summary with cursor */}
                      <div className="flex items-start gap-2 mb-4">
                        <span className="text-gold mt-0.5">💡</span>
                        <p className="text-ivory/85 text-[12.5px]">
                          {typedSummary}
                          {typedSummary.length < current.summary.length && (
                            <span className="inline-block w-1.5 h-3.5 bg-gold/80 ml-0.5 align-middle animate-pulse" />
                          )}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-3 gap-1.5 mb-2">
                        <button
                          onClick={() => goAndClose("/advisor")}
                          className="px-2 py-2 text-[9px] uppercase tracking-[0.18em] border border-gold/30 text-ivory hover:bg-gold hover:text-obsidian transition-all hover:scale-[1.03]"
                        >
                          Best Zone
                        </button>
                        <button
                          onClick={() => goAndClose("/roi")}
                          className="px-2 py-2 text-[9px] uppercase tracking-[0.18em] border border-gold/30 text-ivory hover:bg-gold hover:text-obsidian transition-all hover:scale-[1.03]"
                        >
                          Calculate ROI
                        </button>
                        <button
                          onClick={() => goAndClose("/contact?intent=partnership")}
                          className="px-2 py-2 text-[9px] uppercase tracking-[0.18em] bg-gold-gradient text-obsidian font-medium btn-glow"
                        >
                          Partner
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            <div className="hairline mb-4" />

            {/* Suggestions / follow-ups */}
            <div className="space-y-2">
              <div className="eyebrow text-[9px] mb-1">
                {phase === "result" ? "Follow-ups" : "Try asking"}
              </div>
              {(phase === "result" && current ? current.followUps : prompts.map((_, i) => i)).map((i) => (
                <button
                  key={i}
                  onClick={() => askPrompt(i)}
                  className={`w-full text-left px-4 py-3 text-xs uppercase tracking-[0.2em] border transition-all duration-300 hover:scale-[1.01] ${
                    active === i && phase !== "idle"
                      ? "border-gold/60 text-gold shadow-[0_0_20px_hsl(45_85%_70%/0.25)]"
                      : "border-gold/15 text-ivory/70 hover:border-gold/50 hover:text-ivory hover:shadow-[0_0_18px_hsl(45_85%_70%/0.18)]"
                  }`}
                >
                  {prompts[i].q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
