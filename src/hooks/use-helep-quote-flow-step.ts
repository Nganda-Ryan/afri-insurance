"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import {
  HELEP_QUOTE_WIZARD_STEP_CODE_DEVIS,
  HELEP_QUOTE_WIZARD_STEP_CODE_FORM,
  HELEP_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { HELEP_QUOTE_FLOW_STEP } from "@/lib/constants/helep-quote-flow";
import { parseHelepQuoteSessionFromSearchParams } from "@/lib/helep/helep-quote-wizard-url";
import type { HelepQuoteSession } from "@/types/helep-insurance";

const STEP_CODE_TO_INDEX: Record<string, number> = {
  [HELEP_QUOTE_WIZARD_STEP_CODE_FORM]: HELEP_QUOTE_FLOW_STEP.FORM,
  [HELEP_QUOTE_WIZARD_STEP_CODE_RECAP]: HELEP_QUOTE_FLOW_STEP.RECAP,
  [HELEP_QUOTE_WIZARD_STEP_CODE_DEVIS]: HELEP_QUOTE_FLOW_STEP.DEVIS,
};

export function useHelepQuoteFlowStep(): {
  flowStep: number;
  session: HelepQuoteSession | null;
} {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const stepCode = searchParams.get(URL_PARAM_STEP);
    const flowStep =
      stepCode != null
        ? (STEP_CODE_TO_INDEX[stepCode] ?? HELEP_QUOTE_FLOW_STEP.FORM)
        : HELEP_QUOTE_FLOW_STEP.FORM;
    const session =
      parseHelepQuoteSessionFromSearchParams(searchParams);
    return { flowStep, session };
  }, [searchParams]);
}
