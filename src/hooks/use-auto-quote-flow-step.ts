"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { AUTO_QUOTE_FLOW_STEP } from "@/lib/constants/auto-quote-flow";
import {
  AUTO_QUOTE_WIZARD_STEP_CODE_DEVIS,
  AUTO_QUOTE_WIZARD_STEP_CODE_FORM,
  AUTO_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import type { AutoQuoteSession } from "@/types/auto-insurance";
import { parseAutoQuoteSessionFromSearchParams } from "@/lib/auto/auto-quote-wizard-url";

/** Ancien code URL paiement — toujours reconnu pour compatibilité. */
const LEGACY_PAYMENT_STEP_CODE = "paiement-auto";

const STEP_CODE_TO_INDEX: Record<string, number> = {
  [AUTO_QUOTE_WIZARD_STEP_CODE_FORM]: AUTO_QUOTE_FLOW_STEP.FORM,
  [AUTO_QUOTE_WIZARD_STEP_CODE_RECAP]: AUTO_QUOTE_FLOW_STEP.RECAP,
  [AUTO_QUOTE_WIZARD_STEP_CODE_DEVIS]: AUTO_QUOTE_FLOW_STEP.DEVIS,
  [LEGACY_PAYMENT_STEP_CODE]: AUTO_QUOTE_FLOW_STEP.DEVIS,
};

export function useAutoQuoteFlowStep(): {
  flowStep: number;
  session: AutoQuoteSession | null;
} {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const stepCode = searchParams.get(URL_PARAM_STEP);
    const flowStep =
      stepCode != null ? (STEP_CODE_TO_INDEX[stepCode] ?? AUTO_QUOTE_FLOW_STEP.FORM) : AUTO_QUOTE_FLOW_STEP.FORM;
    const session = parseAutoQuoteSessionFromSearchParams(searchParams);
    return { flowStep, session };
  }, [searchParams]);
}
