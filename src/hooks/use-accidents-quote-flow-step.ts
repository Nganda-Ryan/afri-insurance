"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import {
  ACCIDENTS_QUOTE_WIZARD_STEP_CODE_DEVIS,
  ACCIDENTS_QUOTE_WIZARD_STEP_CODE_FORM,
  ACCIDENTS_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { ACCIDENTS_QUOTE_FLOW_STEP } from "@/lib/constants/accidents-quote-flow";
import { parseAccidentsQuoteSessionFromSearchParams } from "@/lib/accidents/accidents-quote-wizard-url";
import type { AccidentQuoteSession } from "@/types/accidents-insurance";

const STEP_CODE_TO_INDEX: Record<string, number> = {
  [ACCIDENTS_QUOTE_WIZARD_STEP_CODE_FORM]: ACCIDENTS_QUOTE_FLOW_STEP.FORM,
  [ACCIDENTS_QUOTE_WIZARD_STEP_CODE_RECAP]: ACCIDENTS_QUOTE_FLOW_STEP.RECAP,
  [ACCIDENTS_QUOTE_WIZARD_STEP_CODE_DEVIS]: ACCIDENTS_QUOTE_FLOW_STEP.DEVIS,
};

export function useAccidentsQuoteFlowStep(): {
  flowStep: number;
  session: AccidentQuoteSession | null;
} {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const stepCode = searchParams.get(URL_PARAM_STEP);
    const flowStep =
      stepCode != null
        ? (STEP_CODE_TO_INDEX[stepCode] ?? ACCIDENTS_QUOTE_FLOW_STEP.FORM)
        : ACCIDENTS_QUOTE_FLOW_STEP.FORM;
    const session =
      parseAccidentsQuoteSessionFromSearchParams(searchParams);
    return { flowStep, session };
  }, [searchParams]);
}
