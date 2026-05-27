"use client";

import React, { Suspense, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { QuotePageLayout } from "@/components/Quote/layout/QuotePageLayout";
import { QuotePortalAside } from "@/components/Quote/layout/QuotePortalAside";
import { QuotationWizard } from "@/components/Quote/wizard/QuotationWizard";
import { URL_PARAM_PRODUCT } from "@/lib/constants/constant";
import { quoteProductIdFromUrlCode } from "@/lib/travel/quote-wizard-url";
import { usePlanStore } from "@/store/planStore";
import { useWizardStore } from "@/store/wizardStore";

const COMING_SOON_LABELS: Record<string, string> = {
  home: "Assurance habitation",
  auto: "Assurance automobile",
  health: "Assurance santé",
  pet: "Assurance individuelle accidents",
};

function HomeQuotationPageContent() {
  const searchParams = useSearchParams();
  const fetchPlans = usePlanStore((s) => s.fetchPlans);
  const setWizardInProgress = useWizardStore((s) => s.setWizardInProgress);

  const currentProduct = useMemo(
    () => quoteProductIdFromUrlCode(searchParams.get(URL_PARAM_PRODUCT)) ?? "travel",
    [searchParams],
  );

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
        <QuotePageLayout aside={<QuotePortalAside />}>
          <QuotationWizard onWizardStateChange={setWizardInProgress} />
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
