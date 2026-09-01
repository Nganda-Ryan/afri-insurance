"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { MRH_QUOTE_FLOW_STEP } from "@/lib/constants/mrh-quote-flow";
import {
  MRH_QUOTE_WIZARD_STEP_CODE_DEVIS,
  MRH_QUOTE_WIZARD_STEP_CODE_FORM,
  MRH_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { parseMrhQuoteSessionFromSearchParams } from "@/lib/mrh/mrh-quote-wizard-url";
import type { MrhQuoteSession } from "@/types/mrh-insurance";

/** Ancien code URL paiement - toujours reconnu pour compatibilité. */
const LEGACY_PAYMENT_STEP_CODE = "paiement-mrh";

const STEP_CODE_TO_INDEX: Record<string, number> = {
  [MRH_QUOTE_WIZARD_STEP_CODE_FORM]: MRH_QUOTE_FLOW_STEP.FORM,
  [MRH_QUOTE_WIZARD_STEP_CODE_RECAP]: MRH_QUOTE_FLOW_STEP.RECAP,
  [MRH_QUOTE_WIZARD_STEP_CODE_DEVIS]: MRH_QUOTE_FLOW_STEP.DEVIS,
  [LEGACY_PAYMENT_STEP_CODE]: MRH_QUOTE_FLOW_STEP.DEVIS,
};

export function useMrhQuoteFlowStep(): {
  flowStep: number;
  session: MrhQuoteSession | null;
} {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const stepCode = searchParams.get(URL_PARAM_STEP);
    const flowStep =
      stepCode != null
        ? (STEP_CODE_TO_INDEX[stepCode] ?? MRH_QUOTE_FLOW_STEP.FORM)
        : MRH_QUOTE_FLOW_STEP.FORM;
    const session = parseMrhQuoteSessionFromSearchParams(searchParams);
    return { flowStep, session };
  }, [searchParams]);
}
