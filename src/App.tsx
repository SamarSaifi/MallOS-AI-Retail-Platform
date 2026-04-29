import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, ScrollRestoration } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/deck/Layout";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScalePage from "./pages/ScalePage";
import ZonesPage from "./pages/ZonesPage";
import LuxuryPage from "./pages/LuxuryPage";
import CrowdPage from "./pages/CrowdPage";
import AdvisorPage from "./pages/AdvisorPage";
import ROIPage from "./pages/ROIPage";
import EventsPage from "./pages/EventsPage";
import PartnerPage from "./pages/PartnerPage";
import PitchPage from "./pages/PitchPage";
import FinalePage from "./pages/FinalePage";
import ContactPage from "./pages/ContactPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/scale" element={<ScalePage />} />
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/luxury" element={<LuxuryPage />} />
            <Route path="/crowd" element={<CrowdPage />} />
            <Route path="/advisor" element={<AdvisorPage />} />
            <Route path="/roi" element={<ROIPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/pitch" element={<PitchPage />} />
            <Route path="/finale" element={<FinalePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
