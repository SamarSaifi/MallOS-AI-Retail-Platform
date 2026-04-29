import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "./TopBar";
import { AIConcierge } from "./AIConcierge";
import { AdvisorProvider } from "@/context/AdvisorContext";

export const Layout = () => {
  const location = useLocation();
  return (
    <AdvisorProvider>
      <div className="min-h-screen bg-obsidian text-ivory flex flex-col">
        <TopBar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <AIConcierge />
      </div>
    </AdvisorProvider>
  );
};
