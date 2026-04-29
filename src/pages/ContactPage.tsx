import { ContactSection } from "@/components/deck/ContactSection";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        index="11"
        eyebrow="Connect"
        title="Let's build the next chapter together."
        subtitle="Book a private walkthrough or request our partnership deck."
      />
      <ContactSection />
      <PageFooter prev={{ to: "/finale", label: "The Finale" }} />
    </>
  );
}
