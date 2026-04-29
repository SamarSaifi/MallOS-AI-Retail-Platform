import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import aerial from "@/assets/aerial-dubai.jpg";
import { PremiumCTA } from "./PremiumCTAs";

const intents: Record<string, { label: string; subject: string; email: string }> = {
  walkthrough: { label: "Private Walkthrough", subject: "Private%20Walkthrough", email: "partnerships@thedubaimall.com" },
  sponsorship: { label: "Sponsorship Deck", subject: "Sponsorship%20Deck", email: "partners@thedubaimall.com" },
  partnership: { label: "Partnership", subject: "Start%20a%20Partnership", email: "leasing@thedubaimall.com" },
};

export const ContactSection = () => {
  const [params] = useSearchParams();
  const intent = params.get("intent");
  const active = useMemo(() => (intent && intents[intent]) || null, [intent]);

  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden bg-obsidian">
      <div className="absolute inset-0">
        <img src={aerial} alt="" className="h-full w-full object-cover opacity-40" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-obsidian/70" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {active && (
            <div className="inline-block mb-6 px-4 py-2 border border-gold/40 text-gold text-xs uppercase tracking-[0.3em]">
              Request: {active.label}
            </div>
          )}
          <div className="eyebrow mb-6">Take the Next Step</div>
          <h2 className="font-display text-ivory text-5xl md:text-8xl leading-[0.95]">
            Be part of the
            <br />
            <span className="text-gold-gradient italic">stage everyone watches.</span>
          </h2>
          <p className="mt-8 text-ivory/65 font-light max-w-xl mx-auto leading-relaxed">
            Book a private property walk-through, or request a custom proposal for
            your brand, sponsorship or event format.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <PremiumCTA
              label="Book a Private Walkthrough"
              variant="gold"
              href={`mailto:${intents.walkthrough.email}?subject=${intents.walkthrough.subject}`}
            />
            <PremiumCTA
              label="Request Sponsorship Deck"
              variant="outline"
              href={`mailto:${intents.sponsorship.email}?subject=${intents.sponsorship.subject}`}
            />
            <PremiumCTA
              label="Start a Partnership"
              variant="ghost"
              href={`mailto:${intents.partnership.email}?subject=${intents.partnership.subject}`}
            />
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10 max-w-3xl mx-auto text-left">
            {[
              { l: "Leasing", v: "leasing@thedubaimall.com" },
              { l: "Sponsorship", v: "partners@thedubaimall.com" },
              { l: "Events", v: "events@thedubaimall.com" },
            ].map((c) => (
              <div key={c.l} className="bg-obsidian p-6">
                <div className="eyebrow mb-2">{c.l}</div>
                <div className="text-ivory text-sm">{c.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="relative mt-24 border-t border-gold/15 pt-8 pb-6 text-center px-6">
        <div className="font-display text-gold text-2xl">The Dubai Mall</div>
        <div className="eyebrow mt-2">© 2026 · Confidential Sales Material</div>
      </footer>
    </section>
  );
};
