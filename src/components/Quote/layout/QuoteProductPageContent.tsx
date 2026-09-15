"use client";

import React, { Suspense, useEffect } from "react";

import { AutoQuotePortalAside } from "@/components/AutoQuote/layout/AutoQuotePortalAside";
import { AutoQuoteFlowProgressBar } from "@/components/AutoQuote/wizard/AutoQuoteFlowProgressBar";
import { AutoQuotationWizard } from "@/components/AutoQuote/wizard/AutoQuotationWizard";
import { HealthQuotePortalAside } from "@/components/HealthQuote/layout/HealthQuotePortalAside";
import { HealthQuoteFlowProgressBar } from "@/components/HealthQuote/wizard/HealthQuoteFlowProgressBar";
import { HealthQuotationWizard } from "@/components/HealthQuote/wizard/HealthQuotationWizard";
import { MrhQuotePortalAside } from "@/components/MrhQuote/layout/MrhQuotePortalAside";
import { MrhQuoteFlowProgressBar } from "@/components/MrhQuote/wizard/MrhQuoteFlowProgressBar";
import { MrhQuotationWizard } from "@/components/MrhQuote/wizard/MrhQuotationWizard";
import { PrevoyanceQuotePortalAside } from "@/components/PrevoyanceQuote/layout/PrevoyanceQuotePortalAside";
import { PrevoyanceQuoteFlowProgressBar } from "@/components/PrevoyanceQuote/wizard/PrevoyanceQuoteFlowProgressBar";
import { PrevoyanceQuotationWizard } from "@/components/PrevoyanceQuote/wizard/PrevoyanceQuotationWizard";
import { EtudesQuotePortalAside } from "@/components/EtudesQuote/layout/EtudesQuotePortalAside";
import { EtudesQuoteFlowProgressBar } from "@/components/EtudesQuote/wizard/EtudesQuoteFlowProgressBar";
import { EtudesQuotationWizard } from "@/components/EtudesQuote/wizard/EtudesQuotationWizard";
import { AccidentsQuotePortalAside } from "@/components/AccidentsQuote/layout/AccidentsQuotePortalAside";
import { AccidentsQuoteFlowProgressBar } from "@/components/AccidentsQuote/wizard/AccidentsQuoteFlowProgressBar";
import { AccidentsQuotationWizard } from "@/components/AccidentsQuote/wizard/AccidentsQuotationWizard";
import { HelepQuotePortalAside } from "@/components/HelepQuote/layout/HelepQuotePortalAside";
import { HelepQuoteFlowProgressBar } from "@/components/HelepQuote/wizard/HelepQuoteFlowProgressBar";
import { HelepQuotationWizard } from "@/components/HelepQuote/wizard/HelepQuotationWizard";
import { QuotePageLayout } from "@/components/Quote/layout/QuotePageLayout";
import { QuotePortalAside } from "@/components/Quote/layout/QuotePortalAside";
import { QuoteProductBreadcrumb } from "@/components/Quote/layout/QuoteProductBreadcrumb";
import { QuoteFlowProgressBar } from "@/components/Quote/wizard/QuoteFlowProgressBar";
import { QuotationWizard } from "@/components/Quote/wizard/QuotationWizard";
import { usePlanStore } from "@/store/planStore";
import { useWizardStore } from "@/store/wizardStore";
import type { QuoteSidebarProductId } from "@/lib/travel/quote-wizard-url";

interface QuoteProductPageContentProps {
  productId: QuoteSidebarProductId;
}

function QuoteProductPageInner({ productId }: QuoteProductPageContentProps) {
  const fetchPlans = usePlanStore((s) => s.fetchPlans);
  const setWizardInProgress = useWizardStore((s) => s.setWizardInProgress);

  useEffect(() => {
    if (productId === "travel") {
      fetchPlans();
    }
  }, [productId, fetchPlans]);

  const wizardContent = (() => {
    switch (productId) {
      case "travel":
        return (
          <QuotePageLayout
            progress={<QuoteFlowProgressBar />}
            aside={<QuotePortalAside />}
          >
            <QuotationWizard onWizardStateChange={setWizardInProgress} />
          </QuotePageLayout>
        );
      case "auto":
        return (
          <QuotePageLayout
            progress={<AutoQuoteFlowProgressBar />}
            aside={<AutoQuotePortalAside />}
          >
            <AutoQuotationWizard onWizardStateChange={setWizardInProgress} />
          </QuotePageLayout>
        );
      case "home":
        return (
          <QuotePageLayout
            progress={<MrhQuoteFlowProgressBar />}
            aside={<MrhQuotePortalAside />}
          >
            <MrhQuotationWizard onWizardStateChange={setWizardInProgress} />
          </QuotePageLayout>
        );
      case "health":
        return (
          <QuotePageLayout
            progress={<HealthQuoteFlowProgressBar />}
            aside={<HealthQuotePortalAside />}
          >
            <HealthQuotationWizard onWizardStateChange={setWizardInProgress} />
          </QuotePageLayout>
        );
      case "prevoyance":
        return (
          <QuotePageLayout
            progress={<PrevoyanceQuoteFlowProgressBar />}
            aside={<PrevoyanceQuotePortalAside />}
          >
            <PrevoyanceQuotationWizard onWizardStateChange={setWizardInProgress} />
          </QuotePageLayout>
        );
      case "etudes":
        return (
          <QuotePageLayout
            progress={<EtudesQuoteFlowProgressBar />}
            aside={<EtudesQuotePortalAside />}
          >
            <EtudesQuotationWizard onWizardStateChange={setWizardInProgress} />
          </QuotePageLayout>
        );
      case "accidents":
        return (
          <QuotePageLayout
            progress={<AccidentsQuoteFlowProgressBar />}
            aside={<AccidentsQuotePortalAside />}
          >
            <AccidentsQuotationWizard onWizardStateChange={setWizardInProgress} />
          </QuotePageLayout>
        );
      case "helep":
        return (
          <QuotePageLayout
            progress={<HelepQuoteFlowProgressBar />}
            aside={<HelepQuotePortalAside />}
          >
            <HelepQuotationWizard onWizardStateChange={setWizardInProgress} />
          </QuotePageLayout>
        );
      case "pet":
        return (
          <div className="rounded-lg border border-border bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">Assurance animaux</h2>
            <p className="text-text-main text-opacity-90">
              Le moteur de cotation pour ce produit arrive prochainement.
            </p>
          </div>
        );
    }
  })();

  return (
    <main
      id="parcours-cotation"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10"
      aria-labelledby="quote-hero-title"
    >
      <QuoteProductBreadcrumb productId={productId} />
      {wizardContent}
    </main>
  );
}

export function QuoteProductPageContent({ productId }: QuoteProductPageContentProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10" />
      }
    >
      <QuoteProductPageInner productId={productId} />
    </Suspense>
  );
}
