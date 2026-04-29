import { ScaleSection } from "@/components/deck/ScaleSection";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function ScalePage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="The Scale"
        title="A city within a city."
        subtitle="12 million square feet engineered for global commerce, culture, and crowd flow."
      />
      <ScaleSection />
      <PageFooter prev={{ to: "/", label: "Home" }} next={{ to: "/zones", label: "The Zones" }} />
    </>
  );
}
