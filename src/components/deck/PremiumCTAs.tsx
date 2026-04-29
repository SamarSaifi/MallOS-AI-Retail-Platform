import { useNavigate } from "react-router-dom";

export type CTAVariant = "gold" | "outline" | "ghost";

interface CTAProps {
  variant?: CTAVariant;
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const styles: Record<CTAVariant, string> = {
  gold: "bg-gold text-obsidian hover:bg-gold-bright",
  outline: "border border-gold/40 text-ivory hover:bg-gold hover:text-obsidian",
  ghost: "border border-ivory/15 text-ivory/80 hover:border-gold hover:text-gold",
};

export const PremiumCTA = ({ variant = "gold", label, onClick, href, className = "" }: CTAProps) => {
  const cls = `group inline-flex items-center gap-3 px-7 py-4 text-[11px] uppercase tracking-[0.3em] font-medium btn-glow ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{label}</span>
      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
    </>
  );
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
};

export const PremiumCTAGroup = ({ className = "" }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col sm:flex-row gap-3 flex-wrap ${className}`}>
      <PremiumCTA
        label="Book a Private Walkthrough"
        variant="gold"
        onClick={() => navigate("/contact?intent=walkthrough")}
      />
      <PremiumCTA
        label="Request Sponsorship Deck"
        variant="outline"
        onClick={() => navigate("/contact?intent=sponsorship")}
      />
      <PremiumCTA
        label="Start a Partnership"
        variant="ghost"
        onClick={() => navigate("/contact?intent=partnership")}
      />
    </div>
  );
};
