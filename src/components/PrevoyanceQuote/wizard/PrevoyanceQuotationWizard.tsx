"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PrevoyanceQuoteDevisStep } from "@/components/PrevoyanceQuote/sections/PrevoyanceQuoteDevisStep";
import { PrevoyanceQuoteFormStep } from "@/components/PrevoyanceQuote/sections/PrevoyanceQuoteFormStep";
import { PrevoyanceQuoteRecapStep } from "@/components/PrevoyanceQuote/sections/PrevoyanceQuoteRecapStep";
import {
  PREVOYANCE_QUOTE_WIZARD_STEP_CODE_DEVIS,
  PREVOYANCE_QUOTE_WIZARD_STEP_CODE_FORM,
  PREVOYANCE_QUOTE_WIZARD_STEP_CODE_RECAP,
  QUOTE_PRODUCT_CODE_PREVOYANCE,
  URL_PARAM_PRODUCT,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { PREVOYANCE_QUOTE_FLOW_STEP } from "@/lib/constants/prevoyance-quote-flow";
import {
  buildPrevoyanceQuoteWizardSearchParams,
  defaultPrevoyanceQuoteWizardSearchParams,
} from "@/lib/prevoyance/prevoyance-quote-wizard-url";
import { usePrevoyanceQuoteFlowStep } from "@/hooks/use-prevoyance-quote-flow-step";
import type {
  PrevoyanceQuoteFormInput,
  PrevoyanceQuoteResult,
} from "@/types/prevoyance-insurance";

interface PrevoyanceQuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function PrevoyanceQuotationWizard({
  onWizardStateChange,
}: PrevoyanceQuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flowStep, session } = usePrevoyanceQuoteFlowStep();

  const replaceFlowUrl = useCallback(
    (stepCode: string, form: PrevoyanceQuoteFormInput) => {
      const sp = buildPrevoyanceQuoteWizardSearchParams({ stepCode, form });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const product = searchParams.get(URL_PARAM_PRODUCT);
    const step = searchParams.get(URL_PARAM_STEP);
    if (product === QUOTE_PRODUCT_CODE_PREVOYANCE && step) return;
    const sp = defaultPrevoyanceQuoteWizardSearchParams();
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    onWizardStateChange(
      flowStep > PREVOYANCE_QUOTE_FLOW_STEP.FORM || session != null,
    );
  }, [flowStep, session, onWizardStateChange]);

  const handleFormSubmit = (
    form: PrevoyanceQuoteFormInput,
    _quote: PrevoyanceQuoteResult,
  ) => {
    replaceFlowUrl(PREVOYANCE_QUOTE_WIZARD_STEP_CODE_RECAP, form);
  };

  const handleBackToForm = () => {
    if (!session) return;
    replaceFlowUrl(PREVOYANCE_QUOTE_WIZARD_STEP_CODE_FORM, session.form);
  };

  const handleGoToDevis = () => {
    if (!session) return;
    replaceFlowUrl(PREVOYANCE_QUOTE_WIZARD_STEP_CODE_DEVIS, session.form);
  };

  const handleBackToRecap = () => {
    if (!session) return;
    replaceFlowUrl(PREVOYANCE_QUOTE_WIZARD_STEP_CODE_RECAP, session.form);
  };

  return (
    <>
      {flowStep === PREVOYANCE_QUOTE_FLOW_STEP.FORM && (
        <PrevoyanceQuoteFormStep
          initialForm={session?.form}
          onSubmit={handleFormSubmit}
        />
      )}

      {flowStep === PREVOYANCE_QUOTE_FLOW_STEP.RECAP && session ? (
        <PrevoyanceQuoteRecapStep
          quote={session.quote}
          onBack={handleBackToForm}
          onContinue={handleGoToDevis}
        />
      ) : null}

      {flowStep === PREVOYANCE_QUOTE_FLOW_STEP.DEVIS && session ? (
        <PrevoyanceQuoteDevisStep
          quote={session.quote}
          onBack={handleBackToRecap}
        />
      ) : null}
    </>
  );
}
