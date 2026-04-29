import { PitchGenerator } from "@/modules/ai-advisor/PitchGenerator";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function PitchPage() {
  return (
    <>
      <PageHeader
        index="09"
        eyebrow="Pitch Generator"
        title="Your brand. Our stage. One pitch."
        subtitle="Generate a tailored partnership pitch in seconds."
      />
      <PitchGenerator />
      <PageFooter prev={{ to: "/partner", label: "Partner Journey" }} next={{ to: "/finale", label: "The Finale" }} />
    </>
  );
}
