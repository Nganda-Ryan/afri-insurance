"use client";

import React, { useEffect, useMemo } from "react";
import { UserIcon } from "lucide-react";
import {
  type Control,
  type FieldErrors,
  type UseFormGetValues,
  type UseFormRegister,
  type UseFormSetValue,
  useWatch,
} from "react-hook-form";

import { PersonFields } from "@/components/forms/PersonFields";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ageFromBirthDate } from "@/lib/utils";
import { usePlanStore } from "@/store/planStore";
import type { TravelQuoteFormData } from "@/types/travel";

interface TravelerInformationSectionProps {
  control: Control<TravelQuoteFormData>;
  register: UseFormRegister<TravelQuoteFormData>;
  setValue: UseFormSetValue<TravelQuoteFormData>;
  getValues: UseFormGetValues<TravelQuoteFormData>;
  errors: FieldErrors<TravelQuoteFormData>;
  touchedFields: Partial<Record<keyof TravelQuoteFormData, boolean>>;
}

export function TravelerInformationSection({
  control,
  register,
  setValue,
  getValues,
  errors,
  touchedFields,
}: TravelerInformationSectionProps) {
  const productCategory = useWatch({ control, name: "product_category" });
  const destinationArea = useWatch({ control, name: "destination_area" });
  const birthDate = useWatch({ control, name: "birth_date" });
  const oldestTravelerAge = useWatch({ control, name: "oldest_traveler_age" });

  useEffect(() => {
    const age = ageFromBirthDate(birthDate);
    if (age == null) return;
    setValue("oldest_traveler_age", age, { shouldValidate: true, shouldDirty: true });
  }, [birthDate, setValue]);

  const destination = usePlanStore((s) =>
    s.plans
      .find((c) => c.name === productCategory)
      ?.destinations.find((d) => d.destination === destinationArea),
  );

  const { ageMin, ageMax, ageRanges } = useMemo(() => {
    if (!destination) return { ageMin: 0, ageMax: 99, ageRanges: [] };
    const ranges = destination.age_ranges;
    return {
      ageMin: Math.min(...ranges.map((r) => r.min_age)),
      ageMax: Math.max(...ranges.map((r) => r.max_age)),
      ageRanges: ranges,
    };
  }, [destination]);

  const matchedRange = useMemo(() => {
    if (!Number.isFinite(oldestTravelerAge) || ageRanges.length === 0) return null;
    return (
      ageRanges.find(
        (r) => oldestTravelerAge >= r.min_age && oldestTravelerAge < r.max_age,
      ) ??
      ageRanges.find((r) => oldestTravelerAge === r.max_age) ??
      null
    );
  }, [oldestTravelerAge, ageRanges]);

  const isAgeValid =
    touchedFields.oldest_traveler_age &&
    !errors.oldest_traveler_age &&
    Number.isFinite(oldestTravelerAge);

  return (
    <QuoteFormSection title="Informations du voyageur" icon={UserIcon}>
      <PersonFields
        control={control}
        register={register}
        getValues={getValues}
        errors={errors}
        namePrefix=""
        embedded
      />

      <div className="border-t border-border pt-6">
        <Label className="mb-2 font-semibold text-text-main">
          Âge du voyageur le plus âgé
        </Label>
        <InputField
          type="number"
          {...register("oldest_traveler_age", {
            valueAsNumber: true,
            required: "L'âge est obligatoire",
            min: {
              value: ageMin,
              message: `L'âge minimum est de ${ageMin} an(s)`,
            },
            max: {
              value: ageMax,
              message: `L'âge maximum est de ${ageMax} ans`,
            },
          })}
          min={ageMin}
          max={ageMax}
          error={!!errors.oldest_traveler_age}
          success={isAgeValid}
          className="w-full border border-gray-200 px-4 py-3 transition-colors focus:bg-surface-base dark:bg-zinc-950 dark:text-zinc-100"
        />
        {errors.oldest_traveler_age && (
          <p className="mt-1 text-sm text-red-500">{errors.oldest_traveler_age.message}</p>
        )}
        {matchedRange && !errors.oldest_traveler_age && (
          <p className="mt-1 text-xs text-gray-500">
            Tranche appliquée : {matchedRange.min_age} – {matchedRange.max_age} ans
          </p>
        )}

        {ageRanges.length > 0 && (
          <div className="mt-4 rounded-lg border border-border px-4 py-3 dark:bg-zinc-950">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-main">
              Tranches d&apos;âge couvertes
            </p>
            <ul className="flex flex-wrap gap-2">
              {ageRanges.map((r) => (
                <li
                  key={`${r.min_age}-${r.max_age}`}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    matchedRange?.min_age === r.min_age && matchedRange?.max_age === r.max_age
                      ? "bg-brand-primary text-text-inverse"
                      : "bg-white text-text-main dark:bg-zinc-800"
                  }`}
                >
                  {r.min_age} – {r.max_age} ans
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </QuoteFormSection>
  );
}
