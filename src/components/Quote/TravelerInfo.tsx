"use client";

import React, { useEffect, useMemo } from "react";
import { ChevronLeftIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { usePlanStore } from "@/store/planStore";
import type { TravelerInfoData, TripDetailsData } from "@/types/travel";

interface TravelerInfoProps {
  onSubmit: (data: TravelerInfoData) => void;
  onBack: () => void;
  tripDetails: TripDetailsData;
  initialValues?: TravelerInfoData | null;
  onDraftChange?: (data: TravelerInfoData) => void;
}

export function TravelerInfo({
  onSubmit,
  onBack,
  tripDetails,
  initialValues,
  onDraftChange,
}: TravelerInfoProps) {
  /** Destination active dans le store (dérivée de la catégorie + destination du voyage). */
  const destination = usePlanStore((s) =>
    s.plans
      .find((c) => c.name === tripDetails.product_category)
      ?.destinations.find((d) => d.destination === tripDetails.destination_area),
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

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<{ oldest_traveler_age: number }>({
    mode: "onChange",
    defaultValues: {
      oldest_traveler_age: initialValues?.oldest_traveler_age ?? ageMin,
    },
  });

  const oldestTravelerAge = useWatch({ control, name: "oldest_traveler_age" });

  useEffect(() => {
    reset({
      oldest_traveler_age: initialValues?.oldest_traveler_age ?? ageMin,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues?.oldest_traveler_age, reset]);

  useEffect(() => {
    if (oldestTravelerAge != null) {
      onDraftChange?.({ oldest_traveler_age: oldestTravelerAge });
    }
  }, [oldestTravelerAge, onDraftChange]);

  const isAgeValid =
    touchedFields.oldest_traveler_age &&
    !errors.oldest_traveler_age &&
    Number.isFinite(oldestTravelerAge);

  /** Tranche correspondant à l'âge saisi (indication visuelle). */
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
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({ oldest_traveler_age: data.oldest_traveler_age }),
      )}
      className="rounded-lg border border-gray-100 bg-surface-base p-6 shadow-sm lg:p-8"
    >
      <h2 className="mb-6 text-2xl font-bold text-brand-secondary">
        Voyageur le plus âgé
      </h2>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-text-main">
            Âge du voyageur le plus âgé
          </label>
          <input
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
            className={`w-full rounded-lg border-2 bg-surface-muted px-4 py-3 transition-colors focus:bg-surface-base focus:outline-none ${
              errors.oldest_traveler_age
                ? "border-red-500"
                : isAgeValid
                  ? "border-green-500"
                  : "border-gray-200 focus:border-brand-primary"
            }`}
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

        {/* Tranches disponibles pour cette destination */}
        {ageRanges.length > 0 && (
          <div className="rounded-lg border border-gray-100 bg-surface-muted px-4 py-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-main">
              Tranches d'âge couvertes
            </p>
            <ul className="flex flex-wrap gap-2">
              {ageRanges.map((r) => (
                <li
                  key={`${r.min_age}-${r.max_age}`}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    matchedRange?.min_age === r.min_age &&
                    matchedRange?.max_age === r.max_age
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

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-text-main transition-colors hover:border-brand-secondary"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          Retour
        </button>
        <button
          type="submit"
          className="rounded-lg bg-brand-primary px-8 py-3 font-semibold text-text-inverse shadow-md transition-opacity hover:bg-opacity-90"
        >
          Continuer
        </button>
      </div>
    </form>
  );
}
