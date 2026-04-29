import { LuxurySection } from "@/components/deck/LuxurySection";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function LuxuryPage() {
  return (
    <>
      <PageHeader
        index="03"
        eyebrow="Luxury Stage"
        title="Where the world's flagship brands live."
        subtitle="The most concentrated luxury floor on earth — and the audience to match."
      />
      <LuxurySection />
      <PageFooter prev={{ to: "/zones", label: "The Zones" }} next={{ to: "/crowd", label: "Crowd Energy" }} />
    </>
  );
}
