"use client";

import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import { HEALTH_QUOTE_FLOW_STEP_LABELS } from "@/lib/constants/health-quote-flow";
import { useHealthQuoteFlowStep } from "@/hooks/use-health-quote-flow-step";

export function HealthQuoteFlowProgressBar() {
  const { flowStep } = useHealthQuoteFlowStep();

  return (
    <ProgressBar
      currentStep={flowStep}
      totalSteps={HEALTH_QUOTE_FLOW_STEP_LABELS.length}
      stepLabels={[...HEALTH_QUOTE_FLOW_STEP_LABELS]}
    />
  );
}
