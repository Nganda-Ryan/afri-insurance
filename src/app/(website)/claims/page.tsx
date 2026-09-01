"use client";

import { useState } from "react";

import { ClaimsPortalAside } from "@/components/Claims/layout/ClaimsPortalAside";
import { ClaimsDeclarationWizard } from "@/components/Claims/wizard/ClaimsDeclarationWizard";
import { QuotePageLayout } from "@/components/Quote/layout/QuotePageLayout";
import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import {
  CLAIMS_FLOW_STEP,
  CLAIMS_FLOW_STEP_LABELS,
} from "@/lib/constants/claims-flow";

export default function ClaimsPage() {
  const [step, setStep] = useState<number>(CLAIMS_FLOW_STEP.INFO);

  return (
    <main
      id="declaration-sinistre"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10"
      aria-labelledby="quote-hero-title"
    >
      <QuotePageLayout
        progress={
          <ProgressBar
            currentStep={step}
            totalSteps={CLAIMS_FLOW_STEP_LABELS.length}
            stepLabels={[...CLAIMS_FLOW_STEP_LABELS]}
          />
        }
        aside={<ClaimsPortalAside />}
      >
        <ClaimsDeclarationWizard step={step} onStepChange={setStep} />
      </QuotePageLayout>
    </main>
  );
}
