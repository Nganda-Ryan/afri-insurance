"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { MrhQuoteDevisStep } from "@/components/MrhQuote/sections/MrhQuoteDevisStep";
import { MrhQuoteFormStep } from "@/components/MrhQuote/sections/MrhQuoteFormStep";
import { MrhQuoteRecapStep } from "@/components/MrhQuote/sections/MrhQuoteRecapStep";
import {
  MRH_QUOTE_WIZARD_STEP_CODE_DEVIS,
  MRH_QUOTE_WIZARD_STEP_CODE_FORM,
  MRH_QUOTE_WIZARD_STEP_CODE_RECAP,
  QUOTE_PRODUCT_CODE_HOME,
  URL_PARAM_PRODUCT,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { MRH_QUOTE_FLOW_STEP } from "@/lib/constants/mrh-quote-flow";
import {
  buildMrhQuoteWizardSearchParams,
  defaultMrhQuoteWizardSearchParams,
} from "@/lib/mrh/mrh-quote-wizard-url";
import { useMrhQuoteFlowStep } from "@/hooks/use-mrh-quote-flow-step";
import type { MrhQuoteFormInput, MrhQuoteResult } from "@/types/mrh-insurance";

interface MrhQuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function MrhQuotationWizard({ onWizardStateChange }: MrhQuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flowStep, session } = useMrhQuoteFlowStep();

  const replaceFlowUrl = useCallback(
    (stepCode: string, form: MrhQuoteFormInput) => {
      const sp = buildMrhQuoteWizardSearchParams({ stepCode, form });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const product = searchParams.get(URL_PARAM_PRODUCT);
    const step = searchParams.get(URL_PARAM_STEP);
    if (product === QUOTE_PRODUCT_CODE_HOME && step) return;
    const sp = defaultMrhQuoteWizardSearchParams();
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    onWizardStateChange(flowStep > MRH_QUOTE_FLOW_STEP.FORM || session != null);
  }, [flowStep, session, onWizardStateChange]);

  const handleFormSubmit = (form: MrhQuoteFormInput, _quote: MrhQuoteResult) => {
    replaceFlowUrl(MRH_QUOTE_WIZARD_STEP_CODE_RECAP, form);
  };

  const handleBackToForm = () => {
    if (!session) return;
    replaceFlowUrl(MRH_QUOTE_WIZARD_STEP_CODE_FORM, session.form);
  };

  const handleGoToDevis = () => {
    if (!session) return;
    replaceFlowUrl(MRH_QUOTE_WIZARD_STEP_CODE_DEVIS, session.form);
  };

  const handleBackToRecap = () => {
    if (!session) return;
    replaceFlowUrl(MRH_QUOTE_WIZARD_STEP_CODE_RECAP, session.form);
  };

  return (
    <>
      {flowStep === MRH_QUOTE_FLOW_STEP.FORM && (
        <MrhQuoteFormStep
          initialForm={session?.form}
          onSubmit={handleFormSubmit}
        />
      )}

      {flowStep === MRH_QUOTE_FLOW_STEP.RECAP && session ? (
        <MrhQuoteRecapStep
          quote={session.quote}
          onBack={handleBackToForm}
          onContinue={handleGoToDevis}
        />
      ) : null}

      {flowStep === MRH_QUOTE_FLOW_STEP.DEVIS && session ? (
        <MrhQuoteDevisStep quote={session.quote} onBack={handleBackToRecap} />
      ) : null}
    </>
  );
}
