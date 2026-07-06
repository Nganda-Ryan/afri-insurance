"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { HealthQuoteFormStep } from "@/components/HealthQuote/sections/HealthQuoteFormStep";
import { HealthQuotePaymentStep } from "@/components/HealthQuote/sections/HealthQuotePaymentStep";
import { HealthQuoteRecapStep } from "@/components/HealthQuote/sections/HealthQuoteRecapStep";
import {
  HEALTH_QUOTE_WIZARD_STEP_CODE_FORM,
  HEALTH_QUOTE_WIZARD_STEP_CODE_PAYMENT,
  HEALTH_QUOTE_WIZARD_STEP_CODE_RECAP,
  QUOTE_PRODUCT_CODE_HEALTH,
  URL_PARAM_PRODUCT,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { HEALTH_QUOTE_FLOW_STEP } from "@/lib/constants/health-quote-flow";
import {
  buildHealthQuoteWizardSearchParams,
  defaultHealthQuoteWizardSearchParams,
} from "@/lib/health/health-quote-wizard-url";
import { useHealthQuoteFlowStep } from "@/hooks/use-health-quote-flow-step";
import type { HealthQuoteFormInput, HealthQuoteResult } from "@/types/health-insurance";

interface HealthQuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function HealthQuotationWizard({ onWizardStateChange }: HealthQuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flowStep, session } = useHealthQuoteFlowStep();

  const replaceFlowUrl = useCallback(
    (stepCode: string, form: HealthQuoteFormInput) => {
      const sp = buildHealthQuoteWizardSearchParams({ stepCode, form });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const product = searchParams.get(URL_PARAM_PRODUCT);
    const step = searchParams.get(URL_PARAM_STEP);
    if (product === QUOTE_PRODUCT_CODE_HEALTH && step) return;
    const sp = defaultHealthQuoteWizardSearchParams();
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    onWizardStateChange(flowStep > HEALTH_QUOTE_FLOW_STEP.FORM || session != null);
  }, [flowStep, session, onWizardStateChange]);

  const handleFormSubmit = (form: HealthQuoteFormInput, _quote: HealthQuoteResult) => {
    replaceFlowUrl(HEALTH_QUOTE_WIZARD_STEP_CODE_RECAP, form);
  };

  const handleBackToForm = () => {
    if (!session) return;
    replaceFlowUrl(HEALTH_QUOTE_WIZARD_STEP_CODE_FORM, session.form);
  };

  const handleGoToPayment = () => {
    if (!session) return;
    replaceFlowUrl(HEALTH_QUOTE_WIZARD_STEP_CODE_PAYMENT, session.form);
  };

  const handleBackToRecap = () => {
    if (!session) return;
    replaceFlowUrl(HEALTH_QUOTE_WIZARD_STEP_CODE_RECAP, session.form);
  };

  return (
    <>
      {flowStep === HEALTH_QUOTE_FLOW_STEP.FORM && (
        <HealthQuoteFormStep
          initialForm={session?.form}
          onSubmit={handleFormSubmit}
        />
      )}

      {flowStep === HEALTH_QUOTE_FLOW_STEP.RECAP && session ? (
        <HealthQuoteRecapStep
          quote={session.quote}
          onBack={handleBackToForm}
          onContinue={handleGoToPayment}
        />
      ) : null}

      {flowStep === HEALTH_QUOTE_FLOW_STEP.PAYMENT && session ? (
        <HealthQuotePaymentStep quote={session.quote} onBack={handleBackToRecap} />
      ) : null}
    </>
  );
}
