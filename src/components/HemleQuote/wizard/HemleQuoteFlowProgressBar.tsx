"use client";

import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import { HEMLE_QUOTE_FLOW_STEP_LABELS } from "@/lib/constants/hemle-quote-flow";
import { useHemleQuoteFlowStep } from "@/hooks/use-hemle-quote-flow-step";

export function HemleQuoteFlowProgressBar() {
  const { flowStep } = useHemleQuoteFlowStep();

  return (
    <ProgressBar
      currentStep={flowStep}
      totalSteps={HEMLE_QUOTE_FLOW_STEP_LABELS.length}
      stepLabels={[...HEMLE_QUOTE_FLOW_STEP_LABELS]}
    />
  );
}
