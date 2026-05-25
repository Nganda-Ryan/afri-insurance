"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { QuoteFormStep } from "@/components/Quote/sections/QuoteFormStep";
import { QuoteSummary } from "@/components/Quote/summary/QuoteSummary";
import { ProgressBar } from "@/components/Quote/wizard/ProgressBar";
import {
  QUOTE_PRODUCT_CODE_TRAVEL,
  QUOTE_WIZARD_STEP_CODE_FORM,
  URL_PARAM_PRODUCT,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import {
  readQuoteHolderFromStorage,
  writeQuoteHolderToStorage,
} from "@/lib/travel/quote-holder-storage";
import {
  buildQuoteWizardSearchParams,
  parseTravelerInfoFromSearchParams,
  parseTripDetailsFromSearchParams,
  quoteProductIdFromUrlCode,
  resolveWizardStepIndex,
  wizardStepIndexFromUrlCode,
} from "@/lib/travel/quote-wizard-url";
import type {
  SelectedPlan,
  TravelerInfoData,
  TravelQuoteContext,
  TripDetailsData,
} from "@/types/travel";
import type { PersonFormData } from "@/types/subscribe";

interface QuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function QuotationWizard({ onWizardStateChange }: QuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [storedHolder, setStoredHolder] = useState<PersonFormData | null>(null);
  const [holderHydrated, setHolderHydrated] = useState(false);

  const stepLabels = ["Votre demande", "Devis"];

  useEffect(() => {
    setStoredHolder(readQuoteHolderFromStorage());
    setHolderHydrated(true);
  }, []);

  const replaceTravelWizardUrl = useCallback(
    (opts: {
      stepIndex: 0 | 1;
      trip: TripDetailsData | null;
      traveler: TravelerInfoData | null;
    }) => {
      const sp = buildQuoteWizardSearchParams({
        productId: "travel",
        stepIndex: opts.stepIndex,
        trip: opts.trip,
        traveler: opts.traveler,
      });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const p = searchParams.get(URL_PARAM_PRODUCT);
    const e = searchParams.get(URL_PARAM_STEP);
    if (p && e) return;
    const sp = new URLSearchParams(searchParams.toString());
    if (!p) sp.set(URL_PARAM_PRODUCT, QUOTE_PRODUCT_CODE_TRAVEL);
    if (!e) sp.set(URL_PARAM_STEP, QUOTE_WIZARD_STEP_CODE_FORM);
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const { currentStep, tripDetails, travelerInfo } = useMemo(() => {
    const prod = quoteProductIdFromUrlCode(searchParams.get(URL_PARAM_PRODUCT));
    if (prod !== "travel") {
      return {
        currentStep: 0 as const,
        tripDetails: null as TripDetailsData | null,
        travelerInfo: null as TravelerInfoData | null,
      };
    }
    const tripParsed = parseTripDetailsFromSearchParams(searchParams);
    const travelerParsed = parseTravelerInfoFromSearchParams(searchParams);
    const rawStep = wizardStepIndexFromUrlCode(searchParams.get(URL_PARAM_STEP));
    const hasHolder = storedHolder != null;
    const step = holderHydrated
      ? resolveWizardStepIndex(rawStep, tripParsed, travelerParsed, hasHolder)
      : 0;
    return {
      currentStep: step,
      tripDetails: tripParsed,
      travelerInfo: travelerParsed,
    };
  }, [searchParams, storedHolder, holderHydrated]);

  useEffect(() => {
    onWizardStateChange(
      currentStep > 0 || tripDetails !== null || storedHolder !== null,
    );
  }, [currentStep, tripDetails, storedHolder, onWizardStateChange]);

  const handleFormSubmit = (data: {
    trip: TripDetailsData;
    traveler: TravelerInfoData;
    holder: PersonFormData;
  }) => {
    writeQuoteHolderToStorage(data.holder);
    setStoredHolder(data.holder);
    replaceTravelWizardUrl({
      stepIndex: 1,
      trip: data.trip,
      traveler: data.traveler,
    });
  };

  const handlePlanSelection = (
    plan: SelectedPlan,
    ctx?: TravelQuoteContext,
    quoteCode?: string,
  ) => {
    if (!tripDetails || !travelerInfo) return;
    const sp = new URLSearchParams();
    sp.set("planName", plan.name);
    sp.set("planPrice", String(plan.price));
    sp.set("productIndex", String(plan.product_index));
    if (quoteCode) sp.set("quoteCode", quoteCode);
    sp.set("destination", tripDetails.destination_area);
    sp.set("startDate", tripDetails.start_date);
    sp.set("endDate", tripDetails.end_date);
    sp.set("adult", String(tripDetails.adult));
    sp.set("oldestTravelerAge", String(travelerInfo.oldest_traveler_age));
    if (ctx?.currency) sp.set("currency", ctx.currency);
    if (ctx?.country) sp.set("country", ctx.country);
    if (ctx?.language) sp.set("language", ctx.language);
    router.push(`/subscribe?${sp.toString()}`);
  };

  const handleBack = () => {
    replaceTravelWizardUrl({
      stepIndex: 0,
      trip: tripDetails,
      traveler: travelerInfo,
    });
  };

  return (
    <div className="space-y-6">
      {currentStep === 1 && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={stepLabels.length}
          stepLabels={stepLabels}
        />
      )}

      <div>
        {currentStep === 0 && holderHydrated && (
          <QuoteFormStep
            initialTrip={tripDetails}
            initialTraveler={travelerInfo}
            initialHolder={storedHolder}
            onSubmit={handleFormSubmit}
          />
        )}
        {currentStep === 1 && tripDetails && travelerInfo && (
          <QuoteSummary
            tripDetails={tripDetails}
            travelerInfo={travelerInfo}
            onPlanSelect={handlePlanSelection}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
