"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { HEALTH_QUOTE_FLOW_STEP } from "@/lib/constants/health-quote-flow";
import {
  HEALTH_QUOTE_WIZARD_STEP_CODE_FORM,
  HEALTH_QUOTE_WIZARD_STEP_CODE_PAYMENT,
  HEALTH_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { parseHealthQuoteSessionFromSearchParams } from "@/lib/health/health-quote-wizard-url";
import type { HealthQuoteSession } from "@/types/health-insurance";

const STEP_CODE_TO_INDEX: Record<string, number> = {
  [HEALTH_QUOTE_WIZARD_STEP_CODE_FORM]: HEALTH_QUOTE_FLOW_STEP.FORM,
  [HEALTH_QUOTE_WIZARD_STEP_CODE_RECAP]: HEALTH_QUOTE_FLOW_STEP.RECAP,
  [HEALTH_QUOTE_WIZARD_STEP_CODE_PAYMENT]: HEALTH_QUOTE_FLOW_STEP.PAYMENT,
};

export function useHealthQuoteFlowStep(): {
  flowStep: number;
  session: HealthQuoteSession | null;
} {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const stepCode = searchParams.get(URL_PARAM_STEP);
    const flowStep =
      stepCode != null
        ? (STEP_CODE_TO_INDEX[stepCode] ?? HEALTH_QUOTE_FLOW_STEP.FORM)
        : HEALTH_QUOTE_FLOW_STEP.FORM;
    const session = parseHealthQuoteSessionFromSearchParams(searchParams);
    return { flowStep, session };
  }, [searchParams]);
}
