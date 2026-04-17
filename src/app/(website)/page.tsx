"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";

import { QuotationWizard } from "@/components/Quote/QuotationWizard";
import {
  URL_PARAM_PRODUCT,
  quoteProductIdFromUrlCode,
} from "@/lib/travel/quote-wizard-url";
import { usePlanStore } from "@/store/planStore";
import { useWizardStore } from "@/store/wizardStore";

export default function HomeQuotationPage() {
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
      className="mx-auto max-w-[900px] px-4 py-8 lg:py-12"
      aria-labelledby="page-cotation-title"
    >
      {currentProduct === "travel" ? (
        <>
          <header>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
              Cotation en ligne
            </p>
          </header>
          <QuotationWizard onWizardStateChange={setWizardInProgress} />
        </>
      ) : (
        <div className="py-20 text-center">
          <h1 className="mb-4 text-3xl font-bold text-brand-secondary">
            {currentProduct === "home" && "Assurance habitation"}
            {currentProduct === "auto" && "Assurance auto"}
            {currentProduct === "pet" && "Assurance animaux"}
          </h1>
          <p className="text-text-main">
            Le moteur de cotation pour ce produit arrive prochainement.
          </p>
        </div>
      )}
    </main>
  );
}
