import { Finale } from "@/modules/events/Finale";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function FinalePage() {
  return (
    <>
      <PageHeader
        eyebrow="The Finale"
        title="One mall. One city. One stage."
      />
      <Finale />
      <PageFooter prev={{ to: "/pitch", label: "Pitch Generator" }} next={{ to: "/contact", label: "Connect" }} />
    </>
  );
}
