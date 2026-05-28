"use client";

import React, { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

import { TripDetailsSection } from "@/components/Quote/sections/TripDetailsSection";
import {
  TravelerAgeFields,
  type TravelerAgeFormValues,
} from "@/components/Quote/sections/TravelerAgeFields";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { DAY_IN_MS, TRIP_PRODUCT_CATEGORY_STANDARD } from "@/lib/constants/constant";
import {
  isWorldCoverageZone,
  WORLD_COVERAGE_COUNTRY,
} from "@/lib/travel/authorized-countries";
import { usePlanStore } from "@/store/planStore";
import type {
  TravelQuoteFormData,
  TravelerInfoData,
  TripDetailsData,
} from "@/types/travel";

type TripStepFormValues = TripDetailsData & TravelerAgeFormValues;

interface TripDetailsStepProps {
  onSubmit: (trip: TripDetailsData, traveler: TravelerInfoData) => void;
  initialTrip?: TripDetailsData | null;
  initialTraveler?: TravelerInfoData | null;
}

const initialDateValues = (() => {
  const now = Date.now();
  return {
    defaultDeparture: new Date(now + 7 * DAY_IN_MS).toISOString().split("T")[0],
    defaultReturn: new Date(now + 14 * DAY_IN_MS).toISOString().split("T")[0],
  };
})();

function defaultAgeForTrip(
  productCategory: string,
  destinationArea: string,
): number {
  const destination = usePlanStore
    .getState()
    .plans.find((c) => c.name === productCategory)
    ?.destinations.find((d) => d.destination === destinationArea);
  if (!destination?.age_ranges.length) return 18;
  return Math.min(...destination.age_ranges.map((r) => r.min_age));
}

export function TripDetailsStep({
  onSubmit,
  initialTrip,
  initialTraveler,
}: TripDetailsStepProps) {
  const plans = usePlanStore((s) => s.plans);

  const categoryOptions = useMemo(
    () => plans.map((c) => ({ label: c.name, value: c.name })),
    [plans],
  );

  const resolvedDefaults = useMemo((): TripStepFormValues => {
    const defaultCategory =
      categoryOptions.find((o) => o.value === TRIP_PRODUCT_CATEGORY_STANDARD)?.value ??
      categoryOptions[0]?.value ??
      TRIP_PRODUCT_CATEGORY_STANDARD;

    const merged: TripStepFormValues = {
      destination_area: "",
      destination_country: "",
      start_date: initialDateValues.defaultDeparture,
      end_date: initialDateValues.defaultReturn,
      adult: 1,
      product_category: defaultCategory as TripDetailsData["product_category"],
      oldest_traveler_age: initialTraveler?.oldest_traveler_age ?? 18,
      ...(initialTrip ?? {}),
    };

    if (initialTraveler?.oldest_traveler_age != null) {
      merged.oldest_traveler_age = initialTraveler.oldest_traveler_age;
    } else if (merged.destination_area && merged.product_category) {
      merged.oldest_traveler_age = defaultAgeForTrip(
        merged.product_category,
        merged.destination_area,
      );
    }

    if (
      merged.destination_area &&
      isWorldCoverageZone(merged.destination_area) &&
      !merged.destination_country
    ) {
      merged.destination_country = WORLD_COVERAGE_COUNTRY;
    }

    return merged;
  }, [categoryOptions, initialTrip, initialTraveler]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm<TripStepFormValues>({
    mode: "onChange",
    defaultValues: resolvedDefaults,
  });

  useEffect(() => {
    reset(resolvedDefaults);
  }, [resolvedDefaults, reset]);

  const productCategory = useWatch({ control, name: "product_category" });
  const destinationArea = useWatch({ control, name: "destination_area" });

  const formBridge = {
    control: control as unknown as Control<TravelQuoteFormData>,
    register: register as unknown as UseFormRegister<TravelQuoteFormData>,
    setValue: setValue as unknown as UseFormSetValue<TravelQuoteFormData>,
    trigger: trigger as unknown as UseFormTrigger<TravelQuoteFormData>,
    errors: errors as FieldErrors<TravelQuoteFormData>,
    touchedFields,
  };

  const handleFormSubmit = (data: TripStepFormValues) => {
    const { oldest_traveler_age, ...trip } = data;
    onSubmit(trip, { oldest_traveler_age });
  };

  const formId = "trip-details-step-form";

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
      noValidate
    >
      <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
        <h2 className="mb-6 text-2xl font-bold">Détails du voyage</h2>

        <TripDetailsSection
          {...formBridge}
          initialTripCategory={initialTrip?.product_category}
        />

        <TravelerAgeFields
          tripCategory={productCategory ?? resolvedDefaults.product_category}
          destinationArea={destinationArea ?? resolvedDefaults.destination_area}
          register={
            register as unknown as UseFormRegister<TravelerAgeFormValues>
          }
          watch={watch as unknown as UseFormWatch<TravelerAgeFormValues>}
          errors={
            errors as FieldErrors<TravelerAgeFormValues>
          }
          touchedFields={touchedFields}
        />
      </div>

      <QuoteStepNavigation
        showPrevious={false}
        nextLabel="Suivant"
        nextType="submit"
        nextFormId={formId}
      />
    </form>
  );
}
