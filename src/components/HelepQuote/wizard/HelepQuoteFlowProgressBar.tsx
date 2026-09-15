"use client";

import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import { HELEP_QUOTE_FLOW_STEP_LABELS } from "@/lib/constants/helep-quote-flow";
import { useHelepQuoteFlowStep } from "@/hooks/use-helep-quote-flow-step";

export function HelepQuoteFlowProgressBar() {
  const { flowStep } = useHelepQuoteFlowStep();

  return (
    <ProgressBar
      currentStep={flowStep}
      totalSteps={HELEP_QUOTE_FLOW_STEP_LABELS.length}
      stepLabels={[...HELEP_QUOTE_FLOW_STEP_LABELS]}
    />
  );
}
