"use client";

import React, { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TripDetailsStep } from "@/components/Quote/sections/TripDetailsStep";
import { QuoteSummary } from "@/components/Quote/summary/QuoteSummary";
import { TravelQuoteSubscribePhase } from "@/components/Quote/wizard/TravelQuoteSubscribePhase";
import { TRAVEL_QUOTE_FLOW_STEP } from "@/lib/constants/quote-flow";
import {
  QUOTE_WIZARD_STEP_CODE_TRIP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { useTravelQuoteFlowStep } from "@/hooks/use-travel-quote-flow-step";
import { clearQuoteRecapStorage } from "@/lib/travel/quote-recap-storage";
import {
  buildQuoteWizardSearchParams,
  type ParsedSelectedPlan,
  type QuoteWizardStepIndex,
} from "@/lib/travel/quote-wizard-url";
import type {
  SelectedPlan,
  TravelerInfoData,
  TravelQuoteContext,
  TripDetailsData,
} from "@/types/travel";

interface QuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function QuotationWizard({ onWizardStateChange }: QuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { flowStep, tripDetails, travelerInfo, selection } = useTravelQuoteFlowStep();

  const replaceFlowUrl = useCallback(
    (opts: {
      stepIndex: QuoteWizardStepIndex;
      trip: TripDetailsData | null;
      traveler: TravelerInfoData | null;
      selection?: ParsedSelectedPlan | null;
    }) => {
      const sp = buildQuoteWizardSearchParams({
        productId: "travel",
        stepIndex: opts.stepIndex,
        trip: opts.trip,
        traveler: opts.traveler,
        selection: opts.selection ?? null,
      });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const e = searchParams.get(URL_PARAM_STEP);
    if (e) return;
    const sp = new URLSearchParams(searchParams.toString());
    sp.set(URL_PARAM_STEP, QUOTE_WIZARD_STEP_CODE_TRIP);
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    onWizardStateChange(flowStep > TRAVEL_QUOTE_FLOW_STEP.TRIP || tripDetails !== null);
  }, [flowStep, tripDetails, onWizardStateChange]);

  const handleTripDetailsSubmit = (
    trip: TripDetailsData,
    traveler: TravelerInfoData,
  ) => {
    replaceFlowUrl({
      stepIndex: TRAVEL_QUOTE_FLOW_STEP.QUOTE,
      trip,
      traveler,
    });
  };

  const handlePlanSelection = (
    plan: SelectedPlan,
    ctx?: TravelQuoteContext,
    quoteCode?: string,
    quoteId?: number,
  ) => {
    if (!tripDetails || !travelerInfo) return;
    clearQuoteRecapStorage();
    replaceFlowUrl({
      stepIndex: TRAVEL_QUOTE_FLOW_STEP.DETAILS,
      trip: tripDetails,
      traveler: travelerInfo,
      selection: {
        plan,
        quoteCode: quoteCode ?? "",
        quoteId,
        quoteContext: ctx ?? {},
      },
    });
  };

  const handleBackFromQuote = () => {
    replaceFlowUrl({
      stepIndex: TRAVEL_QUOTE_FLOW_STEP.TRIP,
      trip: tripDetails,
      traveler: travelerInfo,
    });
  };

  const handleBackFromDetails = () => {
    if (!tripDetails || !travelerInfo || !selection) return;
    replaceFlowUrl({
      stepIndex: TRAVEL_QUOTE_FLOW_STEP.QUOTE,
      trip: tripDetails,
      traveler: travelerInfo,
      selection,
    });
  };

  const handleGoToRecap = () => {
    if (!tripDetails || !travelerInfo || !selection) return;
    replaceFlowUrl({
      stepIndex: TRAVEL_QUOTE_FLOW_STEP.RECAP,
      trip: tripDetails,
      traveler: travelerInfo,
      selection,
    });
  };

  const handleBackFromRecap = () => {
    if (!tripDetails || !travelerInfo || !selection) return;
    replaceFlowUrl({
      stepIndex: TRAVEL_QUOTE_FLOW_STEP.DETAILS,
      trip: tripDetails,
      traveler: travelerInfo,
      selection,
    });
  };

  const handleGoToPayment = () => {
    if (!tripDetails || !travelerInfo || !selection) return;
    replaceFlowUrl({
      stepIndex: TRAVEL_QUOTE_FLOW_STEP.PAYMENT,
      trip: tripDetails,
      traveler: travelerInfo,
      selection,
    });
  };

  const handleBackFromPayment = () => {
    if (!tripDetails || !travelerInfo || !selection) return;
    replaceFlowUrl({
      stepIndex: TRAVEL_QUOTE_FLOW_STEP.RECAP,
      trip: tripDetails,
      traveler: travelerInfo,
      selection,
    });
  };

  return (
    <>
      {flowStep === TRAVEL_QUOTE_FLOW_STEP.TRIP && (
        <TripDetailsStep
          onSubmit={handleTripDetailsSubmit}
          initialTrip={tripDetails}
          initialTraveler={travelerInfo}
        />
      )}

      {flowStep === TRAVEL_QUOTE_FLOW_STEP.QUOTE && tripDetails && travelerInfo && (
        <QuoteSummary
          tripDetails={tripDetails}
          travelerInfo={travelerInfo}
          onPlanSelect={handlePlanSelection}
          onBack={handleBackFromQuote}
        />
      )}

      {flowStep >= TRAVEL_QUOTE_FLOW_STEP.DETAILS &&
        tripDetails &&
        travelerInfo &&
        selection && (
          <TravelQuoteSubscribePhase
            flowStep={
              flowStep as
                | typeof TRAVEL_QUOTE_FLOW_STEP.DETAILS
                | typeof TRAVEL_QUOTE_FLOW_STEP.RECAP
                | typeof TRAVEL_QUOTE_FLOW_STEP.PAYMENT
            }
            tripDetails={tripDetails}
            travelerInfo={travelerInfo}
            selection={selection}
            onBack={
              flowStep === TRAVEL_QUOTE_FLOW_STEP.DETAILS
                ? handleBackFromDetails
                : flowStep === TRAVEL_QUOTE_FLOW_STEP.RECAP
                  ? handleBackFromRecap
                  : handleBackFromPayment
            }
            onGoToRecap={handleGoToRecap}
            onGoToPayment={handleGoToPayment}
          />
        )}
    </>
  );
}
