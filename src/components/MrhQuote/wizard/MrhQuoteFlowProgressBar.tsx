"use client";

import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import { MRH_QUOTE_FLOW_STEP_LABELS } from "@/lib/constants/mrh-quote-flow";
import { useMrhQuoteFlowStep } from "@/hooks/use-mrh-quote-flow-step";

export function MrhQuoteFlowProgressBar() {
  const { flowStep } = useMrhQuoteFlowStep();

  return (
    <ProgressBar
      currentStep={flowStep}
      totalSteps={MRH_QUOTE_FLOW_STEP_LABELS.length}
      stepLabels={[...MRH_QUOTE_FLOW_STEP_LABELS]}
    />
  );
}
