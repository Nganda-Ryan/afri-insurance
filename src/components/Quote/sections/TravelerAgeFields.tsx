"use client";

import React, { useMemo } from "react";
import type { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { usePlanStore } from "@/store/planStore";

export type TravelerAgeFormValues = {
  oldest_traveler_age: number;
};

interface TravelerAgeFieldsProps {
  tripCategory: string;
  destinationArea: string;
  register: UseFormRegister<TravelerAgeFormValues>;
  watch: UseFormWatch<TravelerAgeFormValues>;
  errors: FieldErrors<TravelerAgeFormValues>;
  touchedFields: Partial<Record<keyof TravelerAgeFormValues, boolean>>;
}

export function TravelerAgeFields({
  tripCategory,
  destinationArea,
  register,
  watch,
  errors,
  touchedFields,
}: TravelerAgeFieldsProps) {
  const destination = usePlanStore((s) =>
    s.plans
      .find((c) => c.name === tripCategory)
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

  const oldestTravelerAge = watch("oldest_traveler_age");

  const isAgeValid =
    touchedFields.oldest_traveler_age &&
    !errors.oldest_traveler_age &&
    Number.isFinite(oldestTravelerAge);

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

  return (
    <div className="space-y-6 border-t border-gray-100 pt-6">
      <h3 className="text-lg font-semibold">
        Voyageur le plus âgé
      </h3>
      <div>
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
          className="w-full border border-gray-200 bg-white px-4 py-3 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {errors.oldest_traveler_age && (
          <p className="mt-1 text-sm text-red-500">
            {errors.oldest_traveler_age.message}
          </p>
        )}
        {matchedRange && !errors.oldest_traveler_age && (
          <p className="mt-1 text-xs text-gray-500">
            Tranche appliquée : {matchedRange.min_age} – {matchedRange.max_age} ans
          </p>
        )}
      </div>

      {ageRanges.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-zinc-600 dark:bg-zinc-900">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-main">
            Tranches d&apos;âge couvertes
          </p>
          <ul className="flex flex-wrap gap-2">
            {ageRanges.map((r) => (
              <li
                key={`${r.min_age}-${r.max_age}`}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  matchedRange?.min_age === r.min_age &&
                  matchedRange?.max_age === r.max_age
                    ? "bg-brand-primary text-white"
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
  );
}
