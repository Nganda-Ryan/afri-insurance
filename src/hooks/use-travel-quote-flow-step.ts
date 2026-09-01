"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { quoteProductIdFromPathname } from "@/lib/constants/quote-product-routes";
import { URL_PARAM_STEP } from "@/lib/constants/constant";
import {
  parseSelectedPlanFromSearchParams,
  parseTravelerInfoFromSearchParams,
  parseTripDetailsFromSearchParams,
  resolveWizardStepIndex,
  wizardStepIndexFromUrlCode,
  type ParsedSelectedPlan,
  type QuoteWizardStepIndex,
} from "@/lib/travel/quote-wizard-url";
import type { TravelerInfoData, TripDetailsData } from "@/types/travel";

export function useTravelQuoteFlowStep() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMemo(() => {
    const prod = quoteProductIdFromPathname(pathname);
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
  }, [pathname, searchParams]);
}
