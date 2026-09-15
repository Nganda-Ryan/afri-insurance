"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { EtudesQuoteDevisStep } from "@/components/EtudesQuote/sections/EtudesQuoteDevisStep";
import { EtudesQuoteFormStep } from "@/components/EtudesQuote/sections/EtudesQuoteFormStep";
import { EtudesQuoteRecapStep } from "@/components/EtudesQuote/sections/EtudesQuoteRecapStep";
import {
  ETUDES_QUOTE_WIZARD_STEP_CODE_DEVIS,
  ETUDES_QUOTE_WIZARD_STEP_CODE_FORM,
  ETUDES_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { ETUDES_QUOTE_FLOW_STEP } from "@/lib/constants/etudes-quote-flow";
import {
  buildEtudesQuoteWizardSearchParams,
  defaultEtudesQuoteWizardSearchParams,
} from "@/lib/etudes/etudes-quote-wizard-url";
import { useEtudesQuoteFlowStep } from "@/hooks/use-etudes-quote-flow-step";
import type {
  EtudesQuoteFormInput,
  EtudesQuoteResult,
} from "@/types/etudes-insurance";

interface EtudesQuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function EtudesQuotationWizard({
  onWizardStateChange,
}: EtudesQuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flowStep, session } = useEtudesQuoteFlowStep();

  const replaceFlowUrl = useCallback(
    (stepCode: string, form: EtudesQuoteFormInput) => {
      const sp = buildEtudesQuoteWizardSearchParams({ stepCode, form });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const step = searchParams.get(URL_PARAM_STEP);
    if (step) return;
    const sp = defaultEtudesQuoteWizardSearchParams();
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    onWizardStateChange(
      flowStep > ETUDES_QUOTE_FLOW_STEP.FORM || session != null,
    );
  }, [flowStep, session, onWizardStateChange]);

  const handleFormSubmit = (
    form: EtudesQuoteFormInput,
    _quote: EtudesQuoteResult,
  ) => {
    replaceFlowUrl(ETUDES_QUOTE_WIZARD_STEP_CODE_RECAP, form);
  };

  const handleBackToForm = () => {
    if (!session) return;
    replaceFlowUrl(ETUDES_QUOTE_WIZARD_STEP_CODE_FORM, session.form);
  };

  const handleGoToDevis = () => {
    if (!session) return;
    replaceFlowUrl(ETUDES_QUOTE_WIZARD_STEP_CODE_DEVIS, session.form);
  };

  const handleBackToRecap = () => {
    if (!session) return;
    replaceFlowUrl(ETUDES_QUOTE_WIZARD_STEP_CODE_RECAP, session.form);
  };

  return (
    <>
      {flowStep === ETUDES_QUOTE_FLOW_STEP.FORM && (
        <EtudesQuoteFormStep
          initialForm={session?.form}
          onSubmit={handleFormSubmit}
        />
      )}

      {flowStep === ETUDES_QUOTE_FLOW_STEP.RECAP && session ? (
        <EtudesQuoteRecapStep
          quote={session.quote}
          onBack={handleBackToForm}
          onContinue={handleGoToDevis}
        />
      ) : null}

      {flowStep === ETUDES_QUOTE_FLOW_STEP.DEVIS && session ? (
        <EtudesQuoteDevisStep
          quote={session.quote}
          onBack={handleBackToRecap}
        />
      ) : null}
    </>
  );
}
