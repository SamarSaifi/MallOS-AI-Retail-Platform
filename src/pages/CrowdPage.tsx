import { CrowdEnergy } from "@/modules/leasing/CrowdEnergy";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function CrowdPage() {
  return (
    <>
      <PageHeader
        index="04"
        eyebrow="Crowd Energy"
        title="Live footfall, mapped."
        subtitle="See how 100M+ annual visitors move through the mall — by hour, by day, by zone."
      />
      <CrowdEnergy />
      <PageFooter prev={{ to: "/luxury", label: "Luxury Stage" }} next={{ to: "/advisor", label: "AI Advisor" }} />
    </>
  );
}
