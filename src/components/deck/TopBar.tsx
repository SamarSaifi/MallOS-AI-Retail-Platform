import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const navItems = [
  { to: "/scale", label: "Scale" },
  { to: "/zones", label: "Zones" },
  { to: "/luxury", label: "Luxury" },
  { to: "/crowd", label: "Crowd" },
  { to: "/advisor", label: "Advisor" },
  { to: "/roi", label: "ROI" },
  { to: "/events", label: "Events" },
  { to: "/partner", label: "Partner" },
  { to: "/pitch", label: "Pitch" },
  { to: "/finale", label: "Finale" },
];

export const TopBar = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-50 bg-obsidian/90 backdrop-blur-xl border-b border-gold/20"
    >
      <div className="px-6 md:px-12 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="h-9 w-9 rounded-sm bg-gold-gradient flex items-center justify-center">
            <span className="font-display text-obsidian text-lg leading-none">D</span>
          </div>
          <div className="leading-tight text-left hidden sm:block">
            <div className="font-display text-ivory text-lg">The Dubai Mall</div>
            <div className="eyebrow text-[9px]">Partnership Experience</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 flex-wrap justify-center">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
                  isActive ? "text-gold" : "text-ivory/70 hover:text-gold"
                }`
              }
            >
              {it.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => navigate("/contact")}
          className="shrink-0 px-4 md:px-5 py-2 bg-gold text-obsidian text-xs tracking-widest uppercase font-medium hover:bg-gold-bright transition-colors duration-300"
        >
          Connect
        </button>
      </div>

      {/* Mobile nav */}
      <nav className="lg:hidden flex gap-4 overflow-x-auto px-6 pb-3 border-t border-gold/10 pt-3">
        {navItems.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `text-[10px] uppercase tracking-[0.2em] whitespace-nowrap ${
                isActive ? "text-gold" : "text-ivory/60"
              }`
            }
          >
            {it.label}
          </NavLink>
        ))}
      </nav>
    </motion.header>
  );
};
