"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import {
  PREVOYANCE_QUOTE_WIZARD_STEP_CODE_DEVIS,
  PREVOYANCE_QUOTE_WIZARD_STEP_CODE_FORM,
  PREVOYANCE_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { PREVOYANCE_QUOTE_FLOW_STEP } from "@/lib/constants/prevoyance-quote-flow";
import { parsePrevoyanceQuoteSessionFromSearchParams } from "@/lib/prevoyance/prevoyance-quote-wizard-url";
import type { PrevoyanceQuoteSession } from "@/types/prevoyance-insurance";

const STEP_CODE_TO_INDEX: Record<string, number> = {
  [PREVOYANCE_QUOTE_WIZARD_STEP_CODE_FORM]: PREVOYANCE_QUOTE_FLOW_STEP.FORM,
  [PREVOYANCE_QUOTE_WIZARD_STEP_CODE_RECAP]: PREVOYANCE_QUOTE_FLOW_STEP.RECAP,
  [PREVOYANCE_QUOTE_WIZARD_STEP_CODE_DEVIS]: PREVOYANCE_QUOTE_FLOW_STEP.DEVIS,
};

export function usePrevoyanceQuoteFlowStep(): {
  flowStep: number;
  session: PrevoyanceQuoteSession | null;
} {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const stepCode = searchParams.get(URL_PARAM_STEP);
    const flowStep =
      stepCode != null
        ? (STEP_CODE_TO_INDEX[stepCode] ?? PREVOYANCE_QUOTE_FLOW_STEP.FORM)
        : PREVOYANCE_QUOTE_FLOW_STEP.FORM;
    const session = parsePrevoyanceQuoteSessionFromSearchParams(searchParams);
    return { flowStep, session };
  }, [searchParams]);
}
