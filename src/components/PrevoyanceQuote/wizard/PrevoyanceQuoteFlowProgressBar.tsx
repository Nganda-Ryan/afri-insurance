"use client";

import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import { PREVOYANCE_QUOTE_FLOW_STEP_LABELS } from "@/lib/constants/prevoyance-quote-flow";
import { usePrevoyanceQuoteFlowStep } from "@/hooks/use-prevoyance-quote-flow-step";

export function PrevoyanceQuoteFlowProgressBar() {
  const { flowStep } = usePrevoyanceQuoteFlowStep();

  return (
    <ProgressBar
      currentStep={flowStep}
      totalSteps={PREVOYANCE_QUOTE_FLOW_STEP_LABELS.length}
      stepLabels={[...PREVOYANCE_QUOTE_FLOW_STEP_LABELS]}
    />
  );
}
