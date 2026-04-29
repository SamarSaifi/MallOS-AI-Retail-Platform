import { LeasingAdvisor } from "@/modules/ai-advisor/LeasingAdvisor";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function AdvisorPage() {
  return (
    <>
      <PageHeader
        index="05"
        eyebrow="AI Leasing Advisor"
        title="Tell us your brand. We'll find your floor."
        subtitle="An AI-powered placement engine that matches your category and audience to the right zone."
      />
      <LeasingAdvisor />
      <PageFooter prev={{ to: "/crowd", label: "Crowd Energy" }} next={{ to: "/roi", label: "ROI Modeling" }} />
    </>
  );
}
