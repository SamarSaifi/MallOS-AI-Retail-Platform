import { EventsSection } from "@/components/deck/EventsSection";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function EventsPage() {
  return (
    <>
      <PageHeader
        index="07"
        eyebrow="Events & Sponsorship"
        title="The world's biggest stage for live activations."
        subtitle="From product launches to global broadcasts — sponsor moments that travel."
      />
      <EventsSection />
      <PageFooter prev={{ to: "/roi", label: "ROI Modeling" }} next={{ to: "/partner", label: "Partner Journey" }} />
    </>
  );
}
