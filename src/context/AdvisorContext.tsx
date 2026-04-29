import { createContext, useContext, useState, ReactNode } from "react";

export type ZoneId =
  | "fashion-avenue"
  | "main-retail"
  | "dining"
  | "innovation"
  | "atrium-events"
  | "activation";

export const ZONE_META: Record<ZoneId, { name: string; x: number; y: number; w: number; h: number }> = {
  "fashion-avenue":  { name: "Fashion Avenue",            x: 6,  y: 14, w: 38, h: 28 },
  "main-retail":     { name: "Main Retail Boulevard",     x: 48, y: 10, w: 46, h: 22 },
  "dining":          { name: "Dining District",           x: 6,  y: 50, w: 36, h: 26 },
  "innovation":      { name: "Innovation Court",          x: 48, y: 38, w: 28, h: 22 },
  "atrium-events":   { name: "Grand Atrium & Events Plaza", x: 80, y: 38, w: 14, h: 38 },
  "activation":      { name: "Activation Boulevard",      x: 46, y: 66, w: 32, h: 14 },
};

export const ZONE_BY_NAME: Record<string, ZoneId> = {
  "Fashion Avenue": "fashion-avenue",
  "Main Retail Boulevard": "main-retail",
  "Dining District": "dining",
  "Innovation Court": "innovation",
  "Grand Atrium & Events Plaza": "atrium-events",
  "Activation Boulevard": "activation",
};

interface AdvisorState {
  recommendedZone: ZoneId | null;
  setRecommendedZone: (z: ZoneId | null) => void;
}

const Ctx = createContext<AdvisorState | null>(null);

export const AdvisorProvider = ({ children }: { children: ReactNode }) => {
  const [recommendedZone, setRecommendedZone] = useState<ZoneId | null>(null);
  return <Ctx.Provider value={{ recommendedZone, setRecommendedZone }}>{children}</Ctx.Provider>;
};

export const useAdvisor = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdvisor must be used within AdvisorProvider");
  return v;
};
