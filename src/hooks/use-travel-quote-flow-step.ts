"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { URL_PARAM_PRODUCT, URL_PARAM_STEP } from "@/lib/constants/constant";
import {
  parseSelectedPlanFromSearchParams,
  parseTravelerInfoFromSearchParams,
  parseTripDetailsFromSearchParams,
  quoteProductIdFromUrlCode,
  resolveWizardStepIndex,
  wizardStepIndexFromUrlCode,
  type ParsedSelectedPlan,
  type QuoteWizardStepIndex,
} from "@/lib/travel/quote-wizard-url";
import type { TravelerInfoData, TripDetailsData } from "@/types/travel";

export function useTravelQuoteFlowStep() {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const prod = quoteProductIdFromUrlCode(searchParams.get(URL_PARAM_PRODUCT));
    if (prod !== "travel") {
      return {
        flowStep: 0 as QuoteWizardStepIndex,
        tripDetails: null as TripDetailsData | null,
        travelerInfo: null as TravelerInfoData | null,
        selection: null as ParsedSelectedPlan | null,
      };
    }

    const tripDetails = parseTripDetailsFromSearchParams(searchParams);
    const travelerInfo = parseTravelerInfoFromSearchParams(searchParams);
    const selection = parseSelectedPlanFromSearchParams(searchParams);
    const rawStep = wizardStepIndexFromUrlCode(searchParams.get(URL_PARAM_STEP));
    const flowStep = resolveWizardStepIndex(
      rawStep,
      tripDetails,
      travelerInfo,
      selection,
    );

    return { flowStep, tripDetails, travelerInfo, selection };
  }, [searchParams]);
}
