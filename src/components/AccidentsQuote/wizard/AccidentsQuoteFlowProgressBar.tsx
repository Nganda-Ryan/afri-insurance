"use client";

import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import { ACCIDENTS_QUOTE_FLOW_STEP_LABELS } from "@/lib/constants/accidents-quote-flow";
import { useAccidentsQuoteFlowStep } from "@/hooks/use-accidents-quote-flow-step";

export function AccidentsQuoteFlowProgressBar() {
  const { flowStep } = useAccidentsQuoteFlowStep();

  return (
    <ProgressBar
      currentStep={flowStep}
      totalSteps={ACCIDENTS_QUOTE_FLOW_STEP_LABELS.length}
      stepLabels={[...ACCIDENTS_QUOTE_FLOW_STEP_LABELS]}
    />
  );
}
