import { ZonesExplorer } from "@/components/deck/ZonesExplorer";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function ZonesPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="The Zones"
        title="Five worlds under one roof."
        subtitle="Curated districts for luxury, dining, entertainment, retail, and live events."
      />
      <ZonesExplorer />
      <PageFooter prev={{ to: "/scale", label: "The Scale" }} next={{ to: "/luxury", label: "Luxury Stage" }} />
    </>
  );
}
