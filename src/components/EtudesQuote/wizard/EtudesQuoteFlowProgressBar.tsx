"use client";

import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import { ETUDES_QUOTE_FLOW_STEP_LABELS } from "@/lib/constants/etudes-quote-flow";
import { useEtudesQuoteFlowStep } from "@/hooks/use-etudes-quote-flow-step";

export function EtudesQuoteFlowProgressBar() {
  const { flowStep } = useEtudesQuoteFlowStep();

  return (
    <ProgressBar
      currentStep={flowStep}
      totalSteps={ETUDES_QUOTE_FLOW_STEP_LABELS.length}
      stepLabels={[...ETUDES_QUOTE_FLOW_STEP_LABELS]}
    />
  );
}
