"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AutoQuoteFormStep } from "@/components/AutoQuote/sections/AutoQuoteFormStep";
import { AutoQuotePaymentStep } from "@/components/AutoQuote/sections/AutoQuotePaymentStep";
import { AutoQuoteRecapStep } from "@/components/AutoQuote/sections/AutoQuoteRecapStep";
import {
  AUTO_QUOTE_WIZARD_STEP_CODE_FORM,
  AUTO_QUOTE_WIZARD_STEP_CODE_PAYMENT,
  AUTO_QUOTE_WIZARD_STEP_CODE_RECAP,
  QUOTE_PRODUCT_CODE_AUTO,
  URL_PARAM_PRODUCT,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { AUTO_QUOTE_FLOW_STEP } from "@/lib/constants/auto-quote-flow";
import {
  buildAutoQuoteWizardSearchParams,
  defaultAutoQuoteWizardSearchParams,
} from "@/lib/auto/auto-quote-wizard-url";
import { useAutoQuoteFlowStep } from "@/hooks/use-auto-quote-flow-step";
import type { AutoQuoteFormInput, AutoQuoteResult } from "@/types/auto-insurance";

interface AutoQuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function AutoQuotationWizard({ onWizardStateChange }: AutoQuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flowStep, session } = useAutoQuoteFlowStep();

  const replaceFlowUrl = useCallback(
    (stepCode: string, form: AutoQuoteFormInput) => {
      const sp = buildAutoQuoteWizardSearchParams({ stepCode, form });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const product = searchParams.get(URL_PARAM_PRODUCT);
    const step = searchParams.get(URL_PARAM_STEP);
    if (product === QUOTE_PRODUCT_CODE_AUTO && step) return;
    const sp = defaultAutoQuoteWizardSearchParams();
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    onWizardStateChange(flowStep > AUTO_QUOTE_FLOW_STEP.FORM || session != null);
  }, [flowStep, session, onWizardStateChange]);

  const handleFormSubmit = (form: AutoQuoteFormInput, _quote: AutoQuoteResult) => {
    replaceFlowUrl(AUTO_QUOTE_WIZARD_STEP_CODE_RECAP, form);
  };

  const handleBackToForm = () => {
    if (!session) return;
    replaceFlowUrl(AUTO_QUOTE_WIZARD_STEP_CODE_FORM, session.form);
  };

  const handleGoToPayment = () => {
    if (!session) return;
    replaceFlowUrl(AUTO_QUOTE_WIZARD_STEP_CODE_PAYMENT, session.form);
  };

  const handleBackToRecap = () => {
    if (!session) return;
    replaceFlowUrl(AUTO_QUOTE_WIZARD_STEP_CODE_RECAP, session.form);
  };

  return (
    <>
      {flowStep === AUTO_QUOTE_FLOW_STEP.FORM && (
        <AutoQuoteFormStep
          initialForm={session?.form}
          onSubmit={handleFormSubmit}
        />
      )}

      {flowStep === AUTO_QUOTE_FLOW_STEP.RECAP && session ? (
        <AutoQuoteRecapStep
          quote={session.quote}
          onBack={handleBackToForm}
          onContinue={handleGoToPayment}
        />
      ) : null}

      {flowStep === AUTO_QUOTE_FLOW_STEP.PAYMENT && session ? (
        <AutoQuotePaymentStep quote={session.quote} onBack={handleBackToRecap} />
      ) : null}
    </>
  );
}
