"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  QUOTE_PRODUCT_CODE_TRAVEL,
  QUOTE_WIZARD_STEP_CODE_TRIP,
} from "@/lib/constants/constant";
import {
  URL_PARAM_PRODUCT,
  URL_PARAM_STEP,
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
import { ProgressBar } from "./ProgressBar";
import { QuoteSummary } from "./QuoteSummary";
import { TravelerInfo } from "./TravelerInfo";
import { TripDetails } from "./TripDetails";
import { ValidationModal } from "./ValidationModal";

interface QuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void;
}

export function QuotationWizard({ onWizardStateChange }: QuotationWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [travelerDraft, setTravelerDraft] = useState<TravelerInfoData | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [modalQuoteContext, setModalQuoteContext] = useState<
    TravelQuoteContext | undefined
  >(undefined);
  const [showValidationModal, setShowValidationModal] = useState(false);

  const stepLabels = ["Détails du voyage", "Âge du voyageur", "Devis"];

  const replaceTravelWizardUrl = useCallback(
    (opts: {
      stepIndex: 0 | 1 | 2;
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
    if (!e) sp.set(URL_PARAM_STEP, QUOTE_WIZARD_STEP_CODE_TRIP);
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
    const step = resolveWizardStepIndex(rawStep, tripParsed, travelerParsed);
    return {
      currentStep: step,
      tripDetails: tripParsed,
      travelerInfo: travelerParsed,
    };
  }, [searchParams]);

  useEffect(() => {
    onWizardStateChange(currentStep > 0 || tripDetails !== null);
  }, [currentStep, tripDetails, onWizardStateChange]);

  const handleTripDetailsSubmit = (data: TripDetailsData) => {
    replaceTravelWizardUrl({
      stepIndex: 1,
      trip: data,
      traveler: travelerInfo,
    });
  };

  const handleTravelerInfoSubmit = (data: TravelerInfoData) => {
    setTravelerDraft(null);
    if (!tripDetails) return;
    replaceTravelWizardUrl({
      stepIndex: 2,
      trip: tripDetails,
      traveler: data,
    });
  };

  const handleTravelerDraftChange = useCallback((data: TravelerInfoData) => {
    setTravelerDraft(data);
  }, []);

  const handlePlanSelection = (
    plan: SelectedPlan,
    ctx?: TravelQuoteContext,
  ) => {
    setSelectedPlan(plan);
    setModalQuoteContext(ctx);
    setShowValidationModal(true);
  };

  const handleBack = () => {
    if (currentStep <= 0) return;
    const nextStep = (currentStep - 1) as 0 | 1 | 2;
    replaceTravelWizardUrl({
      stepIndex: nextStep,
      trip: tripDetails,
      traveler: nextStep >= 1 ? travelerInfo : null,
    });
  };

  const handleCloseModal = () => {
    setShowValidationModal(false);
    setModalQuoteContext(undefined);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-brand-secondary lg:text-4xl">
          Assurance assistance voyage
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-main text-opacity-90">
          Complétez les étapes pour obtenir des offres.
        </p>
      </div>

      {currentStep < 2 && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={2}
          stepLabels={stepLabels}
        />
      )}

      <div>
        {currentStep === 0 && (
          <TripDetails
            onSubmit={handleTripDetailsSubmit}
            initialValues={tripDetails}
          />
        )}
        {currentStep === 1 && tripDetails && (
          <TravelerInfo
            tripDetails={tripDetails}
            onSubmit={handleTravelerInfoSubmit}
            onBack={handleBack}
            initialValues={travelerInfo ?? travelerDraft}
            onDraftChange={handleTravelerDraftChange}
          />
        )}
        {currentStep === 2 && tripDetails && travelerInfo && (
          <QuoteSummary
            tripDetails={tripDetails}
            travelerInfo={travelerInfo}
            onPlanSelect={handlePlanSelection}
            onBack={handleBack}
          />
        )}
      </div>

      {showValidationModal && selectedPlan && tripDetails && travelerInfo && (
        <ValidationModal
          selectedPlan={selectedPlan}
          tripDetails={tripDetails}
          travelerInfo={travelerInfo}
          quoteContext={modalQuoteContext}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
