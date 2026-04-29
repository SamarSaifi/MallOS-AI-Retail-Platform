import { ROICalculator } from "@/modules/leasing/ROICalculator";
import { PageFooter, PageHeader } from "@/components/deck/PageHeader";

export default function ROIPage() {
  return (
    <>
      <PageHeader
        index="06"
        eyebrow="ROI Modeling"
        title="Model your return — in real time."
        subtitle="Project revenue, growth and payback across lease durations and categories."
      />
      <ROICalculator />
      <PageFooter prev={{ to: "/advisor", label: "AI Advisor" }} next={{ to: "/events", label: "Events" }} />
    </>
  );
}
