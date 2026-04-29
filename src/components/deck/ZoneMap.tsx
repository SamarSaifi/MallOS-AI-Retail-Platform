import { motion, AnimatePresence } from "framer-motion";
import { ZoneId, ZONE_META, useAdvisor } from "@/context/AdvisorContext";

interface Props {
  className?: string;
  height?: string;
}

export const ZoneMap = ({ className = "", height = "h-[420px]" }: Props) => {
  const { recommendedZone, setRecommendedZone } = useAdvisor();

  const zones = Object.entries(ZONE_META) as [ZoneId, typeof ZONE_META[ZoneId]][];

  // gentle zoom-in toward the recommended zone
  const focus = recommendedZone ? ZONE_META[recommendedZone] : null;
  const cx = focus ? focus.x + focus.w / 2 : 50;
  const cy = focus ? focus.y + focus.h / 2 : 50;
  const scale = focus ? 1.12 : 1;
  const tx = focus ? (50 - cx) * (scale - 1) * 1.6 : 0;
  const ty = focus ? (50 - cy) * (scale - 1) * 1.6 : 0;

  return (
    <div className={`relative w-full ${height} ${className} overflow-hidden bg-onyx border border-gold/15`}>
      {/* Background grid + map */}
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        animate={{ scale, x: tx, y: ty }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center" }}
      >
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="hsl(40 15% 18%)" strokeWidth="0.15" />
          </pattern>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(45 85% 70%)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(45 85% 70%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Mall outline */}
        <path
          d="M 4 14 Q 4 8 10 8 L 88 8 Q 94 8 94 14 L 94 90 Q 94 96 88 96 L 10 96 Q 4 96 4 90 Z"
          fill="hsl(30 12% 7%)"
          stroke="hsl(42 70% 60% / 0.3)"
          strokeWidth="0.25"
        />

        {/* Zone shapes */}
        {zones.map(([id, z]) => {
          const isActive = recommendedZone === id;
          const isDimmed = recommendedZone !== null && !isActive;
          return (
            <g key={id} style={{ opacity: isDimmed ? 0.28 : 1, transition: "opacity 0.6s ease" }}>
              {isActive && (
                <>
                  {/* Pulsing halo */}
                  <motion.rect
                    x={z.x - 6}
                    y={z.y - 6}
                    width={z.w + 12}
                    height={z.h + 12}
                    fill="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.85, 0.4] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.rect
                    x={z.x - 2}
                    y={z.y - 2}
                    width={z.w + 4}
                    height={z.h + 4}
                    rx="1"
                    fill="none"
                    stroke="hsl(45 85% 70%)"
                    strokeWidth="0.3"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.04, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: `${z.x + z.w / 2}px ${z.y + z.h / 2}px` }}
                  />
                </>
              )}
              <motion.rect
                onClick={() => setRecommendedZone(id)}
                x={z.x}
                y={z.y}
                width={z.w}
                height={z.h}
                rx="1"
                fill={isActive ? "hsl(45 85% 70% / 0.22)" : "hsl(30 8% 14% / 0.6)"}
                stroke={isActive ? "hsl(45 85% 70%)" : "hsl(42 70% 60% / 0.3)"}
                strokeWidth={isActive ? "0.55" : "0.2"}
                className="cursor-pointer transition-colors"
              />
            </g>
          );
        })}

        {/* Atrium center marker */}
        <circle cx="50" cy="50" r="1.2" fill="hsl(45 85% 70%)" opacity="0.6" />
        <circle cx="50" cy="50" r="0.5" fill="hsl(45 85% 70%)" />
      </motion.svg>

      {/* Labels overlay (also zooms with map) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ scale, x: `${tx}%`, y: `${ty}%` }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center" }}
      >
        {zones.map(([id, z]) => {
          const isActive = recommendedZone === id;
          const isDimmed = recommendedZone !== null && !isActive;
          return (
            <div
              key={id}
              className="absolute flex flex-col items-start justify-center transition-opacity duration-500"
              style={{
                left: `${z.x + 1.5}%`,
                top: `${z.y + 1.5}%`,
                width: `${z.w - 3}%`,
                height: `${z.h - 3}%`,
                opacity: isDimmed ? 0.3 : 1,
              }}
            >
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-1 inline-block px-1.5 py-0.5 bg-gold text-obsidian text-[7px] md:text-[8px] uppercase tracking-[0.25em] font-medium shadow-[0_0_18px_hsl(45_85%_70%/0.6)]"
                >
                  ★ Recommended
                </motion.div>
              )}
              {!isActive && (
                <div className="eyebrow text-[8px] md:text-[9px] text-ivory/40">Zone</div>
              )}
              <div className={`font-display text-[11px] md:text-sm leading-tight transition-colors ${isActive ? "text-ivory" : "text-ivory/55"}`}>
                {z.name}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Status banner */}
      <AnimatePresence>
        {recommendedZone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-3 left-3 right-3 glass-strong px-4 py-3 flex items-center justify-between"
          >
            <div>
              <div className="eyebrow text-[9px] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                AI Recommendation
              </div>
              <div className="font-display text-gold text-lg">{ZONE_META[recommendedZone].name}</div>
            </div>
            <button
              onClick={() => setRecommendedZone(null)}
              className="text-ivory/50 hover:text-gold text-xs uppercase tracking-widest transition-colors"
            >
              Reset
            </button>
          </motion.div>
        )}
        {!recommendedZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-3 left-3 right-3 px-4 py-3 border border-gold/15 bg-obsidian/60"
          >
            <div className="eyebrow text-[9px]">Awaiting input</div>
            <div className="text-ivory/60 text-sm">Run the Smart Leasing Advisor — your zone will glow.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
