"use client";

import React, { useEffect, useMemo } from "react";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { DESTINATION_AREA_OPTIONS } from "@/lib/travel/destination-area";
import { usePlanStore } from "@/store/planStore";
import type { IFactorizedDestination } from "@/types/travel";
import { TripDetailsData } from "@/types/travel";
import { DAY_IN_MS, TRIP_PRODUCT_CATEGORY_STANDARD } from "@/lib/constants/constant";


interface TripDetailsProps {
  onSubmit: (data: TripDetailsData) => void;
  /** Données déjà validées (ex. retour depuis l'étape suivante). */
  initialValues?: TripDetailsData | null;
}

const initialDateValues = (() => {
  const now = Date.now();
  return {
    today: new Date(now).toISOString().split("T")[0],
    defaultDeparture: new Date(now + 7 * DAY_IN_MS).toISOString().split("T")[0],
    defaultReturn: new Date(now + 14 * DAY_IN_MS).toISOString().split("T")[0],
  };
})();

/** Nombre de jours entre deux dates ISO yyyy-mm-dd (inclusive du jour de départ). */
function daysBetween(start: string, end: string): number {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.round((e - s) / DAY_IN_MS);
}

/** Ajoute n jours à une date ISO et retourne la date ISO résultante. */
function addDaysToIso(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/** Retrouve le label lisible d'une destination à partir de sa valeur API. */
function destinationLabel(value: string): string {
  return DESTINATION_AREA_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function TripDetails({ onSubmit, initialValues }: TripDetailsProps) {
  const today = initialDateValues.today;
  const defaultDeparture = initialDateValues.defaultDeparture;
  const defaultReturn = initialDateValues.defaultReturn;

  const plans = usePlanStore((s) => s.plans);
  const loading = usePlanStore((s) => s.loading);

  /** Options de catégorie dérivées du store. */
  const categoryOptions = useMemo(
    () => plans.map((c) => ({ label: c.name, value: c.name })),
    [plans],
  );

  const resolvedDefaults = useMemo((): TripDetailsData => {
    const defaultCategory =
      categoryOptions.find((o) => o.value === TRIP_PRODUCT_CATEGORY_STANDARD)?.value ??
      categoryOptions[0]?.value ??
      TRIP_PRODUCT_CATEGORY_STANDARD;

    return {
      destination_area: "",
      start_date: defaultDeparture,
      end_date: defaultReturn,
      adult: 2,
      product_category: defaultCategory as TripDetailsData["product_category"],
      ...(initialValues ?? {}),
    };
  }, [initialValues, defaultDeparture, defaultReturn, categoryOptions]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors, touchedFields },
  } = useForm<TripDetailsData>({
    mode: "onChange",
    defaultValues: resolvedDefaults,
  });

  useEffect(() => {
    reset(resolvedDefaults);
  }, [resolvedDefaults, reset]);

  const productCategory = useWatch({ control, name: "product_category" });
  const destinationArea = useWatch({ control, name: "destination_area" });
  const startDate = useWatch({ control, name: "start_date" });
  const endDate = useWatch({ control, name: "end_date" });
  const adult = useWatch({ control, name: "adult" });

  /** Catégorie active dans le store. */
  const activeCategory = useMemo(
    () => plans.find((c) => c.name === productCategory),
    [plans, productCategory],
  );

  /** Options de destination filtrées par catégorie sélectionnée. */
  const destinationOptions = useMemo(
    () => activeCategory?.destinations ?? [],
    [activeCategory],
  );

  /** Destination active (pour les contraintes de date et de composition). */
  const selectedDestination: IFactorizedDestination | undefined = useMemo(
    () => destinationOptions.find((d) => d.destination === destinationArea),
    [destinationOptions, destinationArea],
  );

  /** Reset la destination quand la catégorie change (sauf lors du chargement initial). */
  useEffect(() => {
    if (!initialValues || productCategory !== initialValues.product_category) {
      setValue("destination_area", "", {
        shouldTouch: false,
        shouldDirty: false,
        shouldValidate: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCategory, setValue]);

  /** Re-valide end_date quand selectedDestination change. */
  useEffect(() => {
    if (destinationArea) void trigger("end_date");
  }, [selectedDestination, trigger, destinationArea]);

  const allowGroup = selectedDestination?.composition.includes("group") ?? true;
  const maxAdults = allowGroup ? 99 : 1;

  const endDateMax =
    selectedDestination && startDate
      ? addDaysToIso(startDate, selectedDestination.max_days)
      : undefined;

  const startDateField = register("start_date", {
    required: "La date de départ est obligatoire",
  });
  const adultField = register("adult", {
    valueAsNumber: true,
    min: { value: 1, message: "Au moins un voyageur est requis" },
    max: allowGroup
      ? undefined
      : { value: 1, message: "Cette catégorie n'accepte qu'un voyageur (solo)" },
    validate: (value) =>
      Number.isFinite(value) && value >= 1
        ? true
        : "Au moins un voyageur est requis",
  });

  const isFieldValid = (fieldName: keyof TripDetailsData, value: unknown) =>
    touchedFields[fieldName] && !errors[fieldName] && Boolean(value);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-gray-100 bg-surface-base p-6 shadow-sm lg:p-8"
    >
      <h2 className="mb-6 text-2xl font-bold text-brand-secondary">
        Détails du voyage
      </h2>

      <div className="space-y-6">
        {/* ── Catégorie ── */}
        <div>
          <label
            htmlFor="trip-product-category"
            className="mb-2 block text-sm font-semibold text-text-main"
          >
            Catégorie de produit
          </label>
          <div className="relative isolate">
            <select
              id="trip-product-category"
              {...register("product_category")}
              disabled={loading || categoryOptions.length === 0}
              className="w-full cursor-pointer appearance-none rounded-lg border-2 border-gray-200 bg-white py-3 pl-4 pr-11 text-gray-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/25 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {categoryOptions.length === 0 ? (
                <option value="">Chargement…</option>
              ) : (
                categoryOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))
              )}
            </select>
            <ChevronDownIcon
              className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-zinc-400"
              aria-hidden
            />
          </div>
        </div>

        {/* ── Destination ── */}
        <div>
          <label
            htmlFor="trip-destination-area"
            className="mb-2 block text-sm font-semibold text-text-main"
          >
            Zone de destination (couverture)
          </label>
          <div className="relative isolate">
            <select
              id="trip-destination-area"
              {...register("destination_area", {
                validate: (value) =>
                  value.trim().length > 0 ||
                  "Veuillez choisir une zone de destination",
              })}
              disabled={loading || destinationOptions.length === 0}
              className={[
                "w-full cursor-pointer appearance-none rounded-lg border-2 py-3 pl-4 pr-11",
                "bg-white text-gray-900 shadow-sm",
                "dark:bg-zinc-950 dark:text-zinc-100",
                "focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/25",
                "disabled:cursor-not-allowed disabled:opacity-60",
                errors.destination_area
                  ? "border-red-500"
                  : isFieldValid("destination_area", destinationArea)
                    ? "border-green-600 dark:border-green-500"
                    : "border-gray-200 dark:border-zinc-600",
              ].join(" ")}
            >
              <option value="" disabled>
                {loading
                  ? "Chargement…"
                  : destinationOptions.length === 0
                    ? "Choisir une catégorie d'abord…"
                    : "Choisir une zone…"}
              </option>
              {destinationOptions.map((d) => (
                <option key={d.destination} value={d.destination}>
                  {destinationLabel(d.destination)}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-zinc-400"
              aria-hidden
            />
          </div>
          {errors.destination_area && (
            <p className="mt-1 text-sm text-red-500">
              {errors.destination_area.message}
            </p>
          )}
          {selectedDestination && (
            <p className="mt-1 text-xs text-gray-500">
              Durée couverte : {selectedDestination.min_days} – {selectedDestination.max_days} jours
            </p>
          )}
        </div>

        {/* ── Dates ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-main">
              Date de départ
            </label>
            <input
              type="date"
              {...startDateField}
              min={today}
              onChange={(e) => {
                startDateField.onChange(e);
                void trigger("end_date");
              }}
              className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:bg-white focus:outline-none dark:bg-zinc-950 dark:text-zinc-100 ${errors.start_date ? "border-red-500" : isFieldValid("start_date", startDate) ? "border-green-600 dark:border-green-500" : "border-gray-200 focus:border-brand-primary dark:border-zinc-600"}`}
            />
            {errors.start_date && (
              <p className="mt-1 text-sm text-red-500">
                {errors.start_date.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-text-main">
              Date de retour
            </label>
            <input
              type="date"
              {...register("end_date", {
                required: "La date de retour est obligatoire",
                validate: (value) => {
                  if (!startDate) return true;
                  if (new Date(value) <= new Date(startDate)) {
                    return "La date de retour doit être postérieure au départ";
                  }
                  if (selectedDestination) {
                    const diff = daysBetween(startDate, value);
                    if (diff < selectedDestination.min_days) {
                      return `Durée minimum : ${selectedDestination.min_days} jour(s)`;
                    }
                    if (diff > selectedDestination.max_days) {
                      return `Durée maximum : ${selectedDestination.max_days} jour(s)`;
                    }
                  }
                  return true;
                },
              })}
              min={startDate || today}
              max={endDateMax}
              className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:bg-white focus:outline-none dark:bg-zinc-950 dark:text-zinc-100 ${errors.end_date ? "border-red-500" : isFieldValid("end_date", endDate) ? "border-green-600 dark:border-green-500" : "border-gray-200 focus:border-brand-primary dark:border-zinc-600"}`}
            />
            {errors.end_date && (
              <p className="mt-1 text-sm text-red-500">
                {errors.end_date.message}
              </p>
            )}
          </div>
        </div>

        {/* ── Nombre de voyageurs ── */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-text-main">
            Nombre de voyageurs
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setValue("adult", Math.max(1, (adult ?? 1) - 1), {
                  shouldTouch: true,
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-gray-200 bg-surface-muted transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-text-inverse dark:border-zinc-600"
            >
              <MinusIcon className="h-5 w-5" />
            </button>
            <div className="max-w-[100px] flex-1">
              <input
                type="number"
                {...adultField}
                onChange={(e) => {
                  adultField.onChange(e);
                  const nextValue = Math.min(
                    maxAdults,
                    Math.max(1, Number.parseInt(e.target.value, 10) || 1),
                  );
                  setValue("adult", nextValue, {
                    shouldTouch: true,
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                min={1}
                max={maxAdults}
                className={`w-full rounded-lg border-2 py-3 text-center text-2xl font-bold focus:border-brand-primary focus:outline-none dark:border-zinc-600 ${errors.adult ? "border-red-500" : isFieldValid("adult", adult) ? "border-green-600 dark:border-green-500" : "border-gray-200"}`}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if ((adult ?? 1) >= maxAdults) return;
                setValue("adult", (adult ?? 1) + 1, {
                  shouldTouch: true,
                  shouldDirty: true,
                  shouldValidate: true,
                });
                void trigger("adult");
              }}
              disabled={(adult ?? 1) >= maxAdults}
              className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-gray-200 bg-surface-muted transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-text-inverse disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          {!allowGroup && (
            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
              Cette destination n'est disponible qu'en solo.
            </p>
          )}
          {errors.adult && (
            <p className="mt-1 text-sm text-red-500">{errors.adult.message}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
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
