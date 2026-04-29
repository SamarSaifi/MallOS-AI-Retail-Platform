import { PartnerJourney } from "@/components/deck/PartnerJourney";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function PartnerPage() {
  return (
    <>
      <PageHeader
        index="08"
        eyebrow="Partner Journey"
        title="Three doors in. One destination."
        subtitle="Tailored paths for retail brands, sponsors, and event producers."
      />
      <PartnerJourney />
      <PageFooter prev={{ to: "/events", label: "Events" }} next={{ to: "/pitch", label: "Pitch Generator" }} />
    </>
  );
}
