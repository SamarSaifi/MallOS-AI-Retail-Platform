import { useMemo } from "react";

interface Props {
  count?: number;
  className?: string;
}

/** Subtle floating gold light particles for cinematic backgrounds */
export const Particles = ({ count = 22, className = "" }: Props) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 1 + Math.random() * 2.5;
        const left = Math.random() * 100;
        const delay = Math.random() * 14;
        const duration = 16 + Math.random() * 18;
        const dx = (Math.random() - 0.5) * 120;
        const opacity = 0.25 + Math.random() * 0.45;
        return { i, size, left, delay, duration, dx, opacity };
      }),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((p) => (
        <span
          key={p.i}
          className="absolute bottom-[-10px] rounded-full bg-gold"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: "blur(0.5px)",
            boxShadow: "0 0 8px hsl(var(--gold) / 0.7)",
            animation: `floatParticle ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error css var
            "--dx": `${p.dx}px`,
          }}
        />
      ))}
    </div>
  );
};
