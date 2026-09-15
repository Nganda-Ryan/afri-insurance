"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { HelepQuoteDevisStep } from "@/components/HelepQuote/sections/HelepQuoteDevisStep";
import { HelepQuoteFormStep } from "@/components/HelepQuote/sections/HelepQuoteFormStep";
import { HelepQuoteRecapStep } from "@/components/HelepQuote/sections/HelepQuoteRecapStep";
import {
  HELEP_QUOTE_WIZARD_STEP_CODE_DEVIS,
  HELEP_QUOTE_WIZARD_STEP_CODE_FORM,
  HELEP_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { HELEP_QUOTE_FLOW_STEP } from "@/lib/constants/helep-quote-flow";
import {
  buildHelepQuoteWizardSearchParams,
  defaultHelepQuoteWizardSearchParams,
} from "@/lib/helep/helep-quote-wizard-url";
import { useHelepQuoteFlowStep } from "@/hooks/use-helep-quote-flow-step";
import type {
  HelepQuoteFormInput,
  HelepQuoteResult,
} from "@/types/helep-insurance";

interface HelepQuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function HelepQuotationWizard({
  onWizardStateChange,
}: HelepQuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flowStep, session } = useHelepQuoteFlowStep();

  const replaceFlowUrl = useCallback(
    (stepCode: string, form: HelepQuoteFormInput) => {
      const sp = buildHelepQuoteWizardSearchParams({ stepCode, form });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const step = searchParams.get(URL_PARAM_STEP);
    if (step) return;
    const sp = defaultHelepQuoteWizardSearchParams();
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    onWizardStateChange(
      flowStep > HELEP_QUOTE_FLOW_STEP.FORM || session != null,
    );
  }, [flowStep, session, onWizardStateChange]);

  const handleFormSubmit = (
    form: HelepQuoteFormInput,
    _quote: HelepQuoteResult,
  ) => {
    replaceFlowUrl(HELEP_QUOTE_WIZARD_STEP_CODE_RECAP, form);
  };

  const handleBackToForm = () => {
    if (!session) return;
    replaceFlowUrl(HELEP_QUOTE_WIZARD_STEP_CODE_FORM, session.form);
  };

  const handleGoToDevis = () => {
    if (!session) return;
    replaceFlowUrl(HELEP_QUOTE_WIZARD_STEP_CODE_DEVIS, session.form);
  };

  const handleBackToRecap = () => {
    if (!session) return;
    replaceFlowUrl(HELEP_QUOTE_WIZARD_STEP_CODE_RECAP, session.form);
  };

  return (
    <>
      {flowStep === HELEP_QUOTE_FLOW_STEP.FORM && (
        <HelepQuoteFormStep
          initialForm={session?.form}
          onSubmit={handleFormSubmit}
        />
      )}

      {flowStep === HELEP_QUOTE_FLOW_STEP.RECAP && session ? (
        <HelepQuoteRecapStep
          quote={session.quote}
          onBack={handleBackToForm}
          onContinue={handleGoToDevis}
        />
      ) : null}

      {flowStep === HELEP_QUOTE_FLOW_STEP.DEVIS && session ? (
        <HelepQuoteDevisStep
          quote={session.quote}
          onBack={handleBackToRecap}
        />
      ) : null}
    </>
  );
}
