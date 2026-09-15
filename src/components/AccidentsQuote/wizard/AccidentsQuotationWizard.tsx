"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AccidentsQuoteDevisStep } from "@/components/AccidentsQuote/sections/AccidentsQuoteDevisStep";
import { AccidentsQuoteFormStep } from "@/components/AccidentsQuote/sections/AccidentsQuoteFormStep";
import { AccidentsQuoteRecapStep } from "@/components/AccidentsQuote/sections/AccidentsQuoteRecapStep";
import {
  ACCIDENTS_QUOTE_WIZARD_STEP_CODE_DEVIS,
  ACCIDENTS_QUOTE_WIZARD_STEP_CODE_FORM,
  ACCIDENTS_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { ACCIDENTS_QUOTE_FLOW_STEP } from "@/lib/constants/accidents-quote-flow";
import {
  buildAccidentsQuoteWizardSearchParams,
  defaultAccidentsQuoteWizardSearchParams,
} from "@/lib/accidents/accidents-quote-wizard-url";
import { useAccidentsQuoteFlowStep } from "@/hooks/use-accidents-quote-flow-step";
import type {
  AccidentQuoteFormInput,
  AccidentQuoteResult,
} from "@/types/accidents-insurance";

interface AccidentsQuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function AccidentsQuotationWizard({
  onWizardStateChange,
}: AccidentsQuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flowStep, session } = useAccidentsQuoteFlowStep();

  const replaceFlowUrl = useCallback(
    (stepCode: string, form: AccidentQuoteFormInput) => {
      const sp = buildAccidentsQuoteWizardSearchParams({ stepCode, form });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const step = searchParams.get(URL_PARAM_STEP);
    if (step) return;
    const sp = defaultAccidentsQuoteWizardSearchParams();
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    onWizardStateChange(
      flowStep > ACCIDENTS_QUOTE_FLOW_STEP.FORM || session != null,
    );
  }, [flowStep, session, onWizardStateChange]);

  const handleFormSubmit = (
    form: AccidentQuoteFormInput,
    _quote: AccidentQuoteResult,
  ) => {
    replaceFlowUrl(ACCIDENTS_QUOTE_WIZARD_STEP_CODE_RECAP, form);
  };

  const handleBackToForm = () => {
    if (!session) return;
    replaceFlowUrl(ACCIDENTS_QUOTE_WIZARD_STEP_CODE_FORM, session.form);
  };

  const handleGoToDevis = () => {
    if (!session) return;
    replaceFlowUrl(ACCIDENTS_QUOTE_WIZARD_STEP_CODE_DEVIS, session.form);
  };

  const handleBackToRecap = () => {
    if (!session) return;
    replaceFlowUrl(ACCIDENTS_QUOTE_WIZARD_STEP_CODE_RECAP, session.form);
  };

  return (
    <>
      {flowStep === ACCIDENTS_QUOTE_FLOW_STEP.FORM && (
        <AccidentsQuoteFormStep
          initialForm={session?.form}
          onSubmit={handleFormSubmit}
        />
      )}

      {flowStep === ACCIDENTS_QUOTE_FLOW_STEP.RECAP && session ? (
        <AccidentsQuoteRecapStep
          quote={session.quote}
          onBack={handleBackToForm}
          onContinue={handleGoToDevis}
        />
      ) : null}

      {flowStep === ACCIDENTS_QUOTE_FLOW_STEP.DEVIS && session ? (
        <AccidentsQuoteDevisStep
          quote={session.quote}
          onBack={handleBackToRecap}
        />
      ) : null}
    </>
  );
}
