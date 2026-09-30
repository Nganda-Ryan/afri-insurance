"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import {
  HEMLE_QUOTE_WIZARD_STEP_CODE_DEVIS,
  HEMLE_QUOTE_WIZARD_STEP_CODE_FORM,
  HEMLE_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { HEMLE_QUOTE_FLOW_STEP } from "@/lib/constants/hemle-quote-flow";
import { parseHemleQuoteSessionFromSearchParams } from "@/lib/hemle/hemle-quote-wizard-url";
import type { HemleQuoteSession } from "@/types/hemle-insurance";

const STEP_CODE_TO_INDEX: Record<string, number> = {
  [HEMLE_QUOTE_WIZARD_STEP_CODE_FORM]: HEMLE_QUOTE_FLOW_STEP.FORM,
  [HEMLE_QUOTE_WIZARD_STEP_CODE_RECAP]: HEMLE_QUOTE_FLOW_STEP.RECAP,
  [HEMLE_QUOTE_WIZARD_STEP_CODE_DEVIS]: HEMLE_QUOTE_FLOW_STEP.DEVIS,
};

export function useHemleQuoteFlowStep(): {
  flowStep: number;
  session: HemleQuoteSession | null;
} {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const stepCode = searchParams.get(URL_PARAM_STEP);
    const flowStep =
      stepCode != null
        ? (STEP_CODE_TO_INDEX[stepCode] ?? HEMLE_QUOTE_FLOW_STEP.FORM)
        : HEMLE_QUOTE_FLOW_STEP.FORM;
    const session = parseHemleQuoteSessionFromSearchParams(searchParams);
    return { flowStep, session };
  }, [searchParams]);
}
