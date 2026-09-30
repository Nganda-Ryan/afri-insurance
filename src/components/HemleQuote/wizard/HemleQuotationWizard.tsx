"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { HemleQuoteDevisStep } from "@/components/HemleQuote/sections/HemleQuoteDevisStep";
import { HemleQuoteFormStep } from "@/components/HemleQuote/sections/HemleQuoteFormStep";
import { HemleQuoteRecapStep } from "@/components/HemleQuote/sections/HemleQuoteRecapStep";
import {
  HEMLE_QUOTE_WIZARD_STEP_CODE_DEVIS,
  HEMLE_QUOTE_WIZARD_STEP_CODE_FORM,
  HEMLE_QUOTE_WIZARD_STEP_CODE_RECAP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { HEMLE_QUOTE_FLOW_STEP } from "@/lib/constants/hemle-quote-flow";
import {
  buildHemleQuoteWizardSearchParams,
  defaultHemleQuoteWizardSearchParams,
} from "@/lib/hemle/hemle-quote-wizard-url";
import { useHemleQuoteFlowStep } from "@/hooks/use-hemle-quote-flow-step";
import type {
  HemleQuoteFormInput,
  HemleQuoteResult,
} from "@/types/hemle-insurance";

interface HemleQuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function HemleQuotationWizard({
  onWizardStateChange,
}: HemleQuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flowStep, session } = useHemleQuoteFlowStep();

  const replaceFlowUrl = useCallback(
    (stepCode: string, form: HemleQuoteFormInput) => {
      const sp = buildHemleQuoteWizardSearchParams({ stepCode, form });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const step = searchParams.get(URL_PARAM_STEP);
    if (step) return;
    const sp = defaultHemleQuoteWizardSearchParams();
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    onWizardStateChange(
      flowStep > HEMLE_QUOTE_FLOW_STEP.FORM || session != null,
    );
  }, [flowStep, session, onWizardStateChange]);

  const handleFormSubmit = (
    form: HemleQuoteFormInput,
    _quote: HemleQuoteResult,
  ) => {
    replaceFlowUrl(HEMLE_QUOTE_WIZARD_STEP_CODE_RECAP, form);
  };

  const handleBackToForm = () => {
    if (!session) return;
    replaceFlowUrl(HEMLE_QUOTE_WIZARD_STEP_CODE_FORM, session.form);
  };

  const handleGoToDevis = () => {
    if (!session) return;
    replaceFlowUrl(HEMLE_QUOTE_WIZARD_STEP_CODE_DEVIS, session.form);
  };

  const handleBackToRecap = () => {
    if (!session) return;
    replaceFlowUrl(HEMLE_QUOTE_WIZARD_STEP_CODE_RECAP, session.form);
  };

  return (
    <>
      {flowStep === HEMLE_QUOTE_FLOW_STEP.FORM && (
        <HemleQuoteFormStep
          initialForm={session?.form}
          onSubmit={handleFormSubmit}
        />
      )}

      {flowStep === HEMLE_QUOTE_FLOW_STEP.RECAP && session ? (
        <HemleQuoteRecapStep
          quote={session.quote}
          onBack={handleBackToForm}
          onContinue={handleGoToDevis}
        />
      ) : null}

      {flowStep === HEMLE_QUOTE_FLOW_STEP.DEVIS && session ? (
        <HemleQuoteDevisStep
          quote={session.quote}
          onBack={handleBackToRecap}
        />
      ) : null}
    </>
  );
}
