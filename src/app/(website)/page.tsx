"use client";

import React, { Suspense, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { AutoQuotePortalAside } from "@/components/AutoQuote/layout/AutoQuotePortalAside";
import { AutoQuoteFlowProgressBar } from "@/components/AutoQuote/wizard/AutoQuoteFlowProgressBar";
import { AutoQuotationWizard } from "@/components/AutoQuote/wizard/AutoQuotationWizard";
import { HealthQuotePortalAside } from "@/components/HealthQuote/layout/HealthQuotePortalAside";
import { HealthQuoteFlowProgressBar } from "@/components/HealthQuote/wizard/HealthQuoteFlowProgressBar";
import { HealthQuotationWizard } from "@/components/HealthQuote/wizard/HealthQuotationWizard";
import { MrhQuotePortalAside } from "@/components/MrhQuote/layout/MrhQuotePortalAside";
import { MrhQuoteFlowProgressBar } from "@/components/MrhQuote/wizard/MrhQuoteFlowProgressBar";
import { MrhQuotationWizard } from "@/components/MrhQuote/wizard/MrhQuotationWizard";
import { QuotePageLayout } from "@/components/Quote/layout/QuotePageLayout";
import { QuotePortalAside } from "@/components/Quote/layout/QuotePortalAside";
import { QuoteFlowProgressBar } from "@/components/Quote/wizard/QuoteFlowProgressBar";
import { QuotationWizard } from "@/components/Quote/wizard/QuotationWizard";
import { URL_PARAM_PRODUCT } from "@/lib/constants/constant";
import { quoteProductIdFromUrlCode } from "@/lib/travel/quote-wizard-url";
import { usePlanStore } from "@/store/planStore";
import { useWizardStore } from "@/store/wizardStore";

const COMING_SOON_LABELS: Record<string, string> = {
  auto: "Assurance automobile",
  pet: "Assurance individuelle accidents",
  prevoyance: "Prévoyance individuelle",
};

function HomeQuotationPageContent() {
  const searchParams = useSearchParams();
  const fetchPlans = usePlanStore((s) => s.fetchPlans);
  const setWizardInProgress = useWizardStore((s) => s.setWizardInProgress);

  const currentProduct = useMemo(() => {
    const productParam = searchParams.get(URL_PARAM_PRODUCT);
    if (!productParam) return "travel";
    return quoteProductIdFromUrlCode(productParam) ?? productParam.trim().toLowerCase();
  }, [searchParams]);

  useEffect(() => {
    if (currentProduct === "travel") {
      fetchPlans();
    }
  }, [currentProduct, fetchPlans]);

  return (
    <main
      id="parcours-cotation"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10"
      aria-labelledby="quote-hero-title"
    >
      {currentProduct === "travel" ? (
        <QuotePageLayout
          progress={<QuoteFlowProgressBar />}
          aside={<QuotePortalAside />}
        >
          <QuotationWizard onWizardStateChange={setWizardInProgress} />
        </QuotePageLayout>
      ) : currentProduct === "auto" ? (
        <QuotePageLayout
          progress={<AutoQuoteFlowProgressBar />}
          aside={<AutoQuotePortalAside />}
        >
          <AutoQuotationWizard onWizardStateChange={setWizardInProgress} />
        </QuotePageLayout>
      ) : currentProduct === "home" ? (
        <QuotePageLayout
          progress={<MrhQuoteFlowProgressBar />}
          aside={<MrhQuotePortalAside />}
        >
          <MrhQuotationWizard onWizardStateChange={setWizardInProgress} />
        </QuotePageLayout>
      ) : currentProduct === "health" ? (
        <QuotePageLayout
          progress={<HealthQuoteFlowProgressBar />}
          aside={<HealthQuotePortalAside />}
        >
          <HealthQuotationWizard onWizardStateChange={setWizardInProgress} />
        </QuotePageLayout>
      ) : (
        <div className="rounded-lg border border-border bg-white px-6 py-16 text-center shadow-sm">
          <h2 className="mb-3 text-2xl font-bold">
            {COMING_SOON_LABELS[currentProduct] ?? "Ce produit"}
          </h2>
          <p className="text-text-main text-opacity-90">
            Le moteur de cotation pour ce produit arrive prochainement.
          </p>
        </div>
      )}
    </main>
  );
}

export default function HomeQuotationPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10" />
      }
    >
      <HomeQuotationPageContent />
    </Suspense>
  );
}
