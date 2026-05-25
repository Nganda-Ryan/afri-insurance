"use client";

import React, { useEffect, useMemo } from "react";
import { MapPinIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import {
  defaultTripFieldsFromStore,
  TripDetailsSection,
} from "@/components/Quote/sections/TripDetailsSection";
import { TravelerInformationSection } from "@/components/Quote/sections/TravelerInformationSection";
import Button from "@/components/ui/button/Button";
import { DAY_IN_MS } from "@/lib/constants/constant";
import { writeQuoteHolderToStorage, isQuoteHolderComplete } from "@/lib/travel/quote-holder-storage";
import { usePlanStore } from "@/store/planStore";
import type { PersonFormData } from "@/types/subscribe";
import type { TravelerInfoData, TravelQuoteFormData, TripDetailsData } from "@/types/travel";

const initialDateValues = (() => {
  const now = Date.now();
  return {
    defaultDeparture: new Date(now + 7 * DAY_IN_MS).toISOString().split("T")[0],
    defaultReturn: new Date(now + 14 * DAY_IN_MS).toISOString().split("T")[0],
  };
})();

const emptyHolder = (): PersonFormData => ({
  title: "M",
  first_name: "",
  last_name: "",
  birth_date: "",
  email: "",
  phone_number: "",
  address: "",
  city: "",
  passport_number: "",
  passeport_exp_date: "",
});

interface QuoteFormStepProps {
  initialTrip: TripDetailsData | null;
  initialTraveler: TravelerInfoData | null;
  initialHolder: PersonFormData | null;
  onSubmit: (data: {
    trip: TripDetailsData;
    traveler: TravelerInfoData;
    holder: PersonFormData;
  }) => void;
}

export function QuoteFormStep({
  initialTrip,
  initialTraveler,
  initialHolder,
  onSubmit,
}: QuoteFormStepProps) {
  const plans = usePlanStore((s) => s.plans);
  const categoryOptions = useMemo(
    () => plans.map((c) => ({ label: c.name, value: c.name })),
    [plans],
  );

  const defaultValues = useMemo((): TravelQuoteFormData => {
    const tripDefaults = defaultTripFieldsFromStore(
      categoryOptions,
      initialDateValues.defaultDeparture,
      initialDateValues.defaultReturn,
    );
    return {
      ...emptyHolder(),
      ...tripDefaults,
      oldest_traveler_age: 0,
      ...(initialHolder ?? {}),
      ...(initialTrip ?? {}),
      ...(initialTraveler ?? {}),
    };
  }, [categoryOptions, initialHolder, initialTrip, initialTraveler]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<TravelQuoteFormData>({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleValidSubmit = (data: TravelQuoteFormData) => {
    const holder: PersonFormData = {
      title: data.title,
      first_name: data.first_name,
      last_name: data.last_name,
      birth_date: data.birth_date,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      city: data.city,
      passport_number: data.passport_number,
      passeport_exp_date: data.passeport_exp_date,
    };

    if (!isQuoteHolderComplete(holder)) return;

    const trip: TripDetailsData = {
      product_category: data.product_category,
      destination_area: data.destination_area,
      start_date: data.start_date,
      end_date: data.end_date,
      adult: data.adult,
    };

    writeQuoteHolderToStorage(holder);
    onSubmit({
      trip,
      traveler: { oldest_traveler_age: data.oldest_traveler_age },
      holder,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} className="space-y-6" noValidate>
      <TravelerInformationSection
        control={control}
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        touchedFields={touchedFields}
      />

      <QuoteFormSection title="Détails du voyage" icon={MapPinIcon}>
        <TripDetailsSection
          control={control}
          register={register}
          setValue={setValue}
          trigger={trigger}
          errors={errors}
          touchedFields={touchedFields}
          initialTripCategory={initialTrip?.product_category}
        />
      </QuoteFormSection>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          variant="primary"
          className="min-w-[70px] bg-brand-primary px-10 py-3 text-base font-semibold hover:bg-orange-600"
        >
          Suivant
        </Button>
      </div>
    </form>
  );
}
