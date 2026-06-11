"use client";

import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import { AUTO_QUOTE_FLOW_STEP_LABELS } from "@/lib/constants/auto-quote-flow";
import { useAutoQuoteFlowStep } from "@/hooks/use-auto-quote-flow-step";

export function AutoQuoteFlowProgressBar() {
  const { flowStep } = useAutoQuoteFlowStep();

  return (
    <ProgressBar
      currentStep={flowStep}
      totalSteps={AUTO_QUOTE_FLOW_STEP_LABELS.length}
      stepLabels={[...AUTO_QUOTE_FLOW_STEP_LABELS]}
    />
  );
}
