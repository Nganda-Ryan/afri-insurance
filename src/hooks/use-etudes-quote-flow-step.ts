"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import {
  ETUDES_QUOTE_WIZARD_STEP_CODE_DEVIS,
  ETUDES_QUOTE_WIZARD_STEP_CODE_FORM,
  ETUDES_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { ETUDES_QUOTE_FLOW_STEP } from "@/lib/constants/etudes-quote-flow";
import { parseEtudesQuoteSessionFromSearchParams } from "@/lib/etudes/etudes-quote-wizard-url";
import type { EtudesQuoteSession } from "@/types/etudes-insurance";

const STEP_CODE_TO_INDEX: Record<string, number> = {
  [ETUDES_QUOTE_WIZARD_STEP_CODE_FORM]: ETUDES_QUOTE_FLOW_STEP.FORM,
  [ETUDES_QUOTE_WIZARD_STEP_CODE_RECAP]: ETUDES_QUOTE_FLOW_STEP.RECAP,
  [ETUDES_QUOTE_WIZARD_STEP_CODE_DEVIS]: ETUDES_QUOTE_FLOW_STEP.DEVIS,
};

export function useEtudesQuoteFlowStep(): {
  flowStep: number;
  session: EtudesQuoteSession | null;
} {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const stepCode = searchParams.get(URL_PARAM_STEP);
    const flowStep =
      stepCode != null
        ? (STEP_CODE_TO_INDEX[stepCode] ?? ETUDES_QUOTE_FLOW_STEP.FORM)
        : ETUDES_QUOTE_FLOW_STEP.FORM;
    const session =
      parseEtudesQuoteSessionFromSearchParams(searchParams);
    return { flowStep, session };
  }, [searchParams]);
}
