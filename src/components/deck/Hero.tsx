import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import heroImg from "@/assets/hero-mall.jpg";
import { PremiumCTA } from "./PremiumCTAs";
import { Particles } from "./Particles";

export const Hero = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const yHeadline = useTransform(scrollY, [0, 600], [0, -80]);
  const ySub = useTransform(scrollY, [0, 600], [0, -40]);
  const yBg = useTransform(scrollY, [0, 600], [0, 120]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen min-h-[720px] w-full overflow-hidden vignette grain"
    >
      {/* Cinematic background — image + animated gradients simulating video */}
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img
          src={heroImg}
          alt="The Dubai Mall atrium"
          className="h-full w-full object-cover ken-burns"
          width={1920}
          height={1080}
        />
        {/* Layered cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-transparent to-obsidian/30" />
        {/* Slow drifting gold light */}
        <motion.div
          aria-hidden
          className="absolute -inset-[20%] opacity-30 pointer-events-none"
          animate={{ x: ["-5%", "5%", "-5%"], y: ["-3%", "3%", "-3%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 30% 60%, hsl(45 85% 70% / 0.35), transparent 60%), radial-gradient(ellipse 40% 30% at 70% 30%, hsl(42 70% 60% / 0.25), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Floating gold particles */}
      <Particles count={26} />

      {/* Content */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="relative z-10 h-full flex flex-col justify-center pb-32 md:pb-40 px-6 md:px-24 max-w-[1600px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="eyebrow mb-6"
        >
          The Dubai Mall · Downtown Dubai
        </motion.div>

        <motion.h1
          style={{ y: yHeadline }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-ivory text-6xl md:text-8xl lg:text-[9rem] leading-[0.92] max-w-6xl tracking-[-0.03em]"
        >
          100M+ Visitors.
          <br />
          <span className="text-gold-gradient italic animate-gold-glow inline-block">
            One Global Stage.
          </span>
        </motion.h1>

        <motion.p
          style={{ y: ySub }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-8 max-w-2xl text-ivory/75 text-lg md:text-xl font-light leading-relaxed"
        >
          An interactive sales experience for retail brands, sponsors,
          and event partners — built on the world's most-visited destination.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-3 flex-wrap"
        >
          <PremiumCTA
            label="Explore Opportunity"
            variant="gold"
            onClick={() => navigate("/scale")}
          />
          <PremiumCTA
            label="Find My Best Zone"
            variant="outline"
            onClick={() => navigate("/advisor")}
          />
          <PremiumCTA
            label="Book a Private Walkthrough"
            variant="ghost"
            onClick={() => navigate("/contact?intent=walkthrough")}
          />
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-0 inset-x-0 z-10 border-t border-gold/15 bg-obsidian/50 backdrop-blur-md"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/10">
          {[
            { v: "12M", l: "Sq Ft Built" },
            { v: "1,200+", l: "Stores & F&B" },
            { v: "100M+", l: "Annual Visitors" },
            { v: "#1", l: "Most-Visited Worldwide" },
          ].map((s, i) => (
            <div key={i} className="px-6 py-5 md:py-6">
              <div className="font-display text-ivory text-3xl md:text-4xl">{s.v}</div>
              <div className="eyebrow mt-1 text-[10px]">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
