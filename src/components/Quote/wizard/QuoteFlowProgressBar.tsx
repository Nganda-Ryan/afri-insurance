"use client";

import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import {
  TRAVEL_QUOTE_FLOW_STEP_LABELS,
} from "@/lib/constants/quote-flow";
import { useTravelQuoteFlowStep } from "@/hooks/use-travel-quote-flow-step";

/** Stepper pleine largeur (au-dessus du formulaire et de la sidebar). */
export function QuoteFlowProgressBar() {
  const { flowStep } = useTravelQuoteFlowStep();

  return (
    <ProgressBar
      currentStep={flowStep}
      totalSteps={TRAVEL_QUOTE_FLOW_STEP_LABELS.length}
      stepLabels={[...TRAVEL_QUOTE_FLOW_STEP_LABELS]}
    />
  );
}
