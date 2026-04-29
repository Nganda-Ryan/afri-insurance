"use client";

import React, { useEffect, useMemo } from "react";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { DESTINATION_AREA_OPTIONS } from "@/lib/travel/destination-area";
import { usePlanStore } from "@/store/planStore";
import type { IFactorizedDestination } from "@/types/travel";
import { TripDetailsData } from "@/types/travel";
import { DAY_IN_MS, TRIP_PRODUCT_CATEGORY_STANDARD } from "@/lib/constants/constant";
import DatePicker from "@/components/form/date-picker";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import InputField from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";


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
      className="rounded-lg border-gray-100 bg-surface-base lg:p-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-brand-secondary">
        Détails du voyage
      </h2>

      <div className="space-y-6">
        {/* ── Catégorie ── */}
        <div>
          <Label htmlFor="trip-product-category" className="mb-2 font-semibold text-text-main">
            Catégorie de produit
          </Label>
          <div className="relative isolate">
            <Controller
              control={control}
              name="product_category"
              render={({ field }) => (
                <Select
                  id="trip-product-category"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={loading || categoryOptions.length === 0}
                  placeholder={categoryOptions.length === 0 ? "Chargement…" : "Choisir une catégorie…"}
                  options={categoryOptions}
                  className="border border-gray-200 bg-white py-3 pl-4 pr-11 text-gray-900 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
              )}
            />
            <ChevronDownIcon
              className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-zinc-400"
              aria-hidden
            />
          </div>
        </div>

        {/* ── Destination ── */}
        <div>
          <Label htmlFor="trip-destination-area" className="mb-2 font-semibold text-text-main">
            Zone de destination (couverture)
          </Label>
          <div className="relative isolate">
            <Controller
              control={control}
              name="destination_area"
              rules={{
                validate: (value) =>
                  value.trim().length > 0 ||
                  "Veuillez choisir une zone de destination",
              }}
              render={({ field }) => (
                <Select
                  id="trip-destination-area"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={loading || destinationOptions.length === 0}
                  placeholder={
                    loading
                      ? "Chargement…"
                      : destinationOptions.length === 0
                        ? "Choisir une catégorie d&apos;abord…"
                        : "Choisir une zone…"
                  }
                  options={destinationOptions.map((d) => ({
                    value: d.destination,
                    label: destinationLabel(d.destination),
                  }))}
                  error={!!errors.destination_area}
                  className="border border-gray-200 bg-white py-3 pl-4 pr-11 text-gray-900 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
              )}
            />
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
            <Controller
              control={control}
              name="start_date"
              rules={{ required: "La date de départ est obligatoire" }}
              render={({ field }) => (
                <DatePicker
                  id="trip-start-date"
                  name={field.name}
                  label="Date de départ"
                  value={field.value}
                  min={today}
                  onChange={(nextValue: string) => {
                    field.onChange(nextValue);
                    void trigger("end_date");
                  }}
                  onBlur={field.onBlur}
                  error={!!errors.start_date}
                  success={isFieldValid("start_date", startDate)}
                  className="border bg-white dark:bg-zinc-950 dark:text-zinc-100"
                />
              )}
            />
            {errors.start_date && (
              <p className="mt-1 text-sm text-red-500">
                {errors.start_date.message}
              </p>
            )}
          </div>

          <div>
            <Controller
              control={control}
              name="end_date"
              rules={{
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
              }}
              render={({ field }) => (
                <DatePicker
                  id="trip-end-date"
                  name={field.name}
                  label="Date de retour"
                  value={field.value}
                  min={startDate || today}
                  max={endDateMax}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!errors.end_date}
                  success={isFieldValid("end_date", endDate)}
                  className="border bg-white dark:bg-zinc-950 dark:text-zinc-100"
                />
              )}
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
          <Label htmlFor="trip-adult-count" className="mb-2 font-semibold text-text-main">
            Nombre de voyageurs
          </Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setValue("adult", Math.max(1, (adult ?? 1) - 1), {
                  shouldTouch: true,
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              className="h-12 w-12 rounded-lg  border-gray-200 bg-surface-muted p-0 hover:border-brand-primary hover:bg-brand-primary hover:text-text-inverse dark:border-zinc-600"
              startIcon={<MinusIcon className="h-5 w-5" />}
            >
              <span className="sr-only">Diminuer</span>
            </Button>
            <div className="max-w-[100px] flex-1">
              <InputField
                id="trip-adult-count"
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
                error={!!errors.adult}
                success={isFieldValid("adult", adult)}
                className="bg-white dark:bg-zinc-950 dark:text-zinc-100 pl-10"
              />
            </div>
            <Button
              type="button"
              variant="outline"
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
              className="h-12 w-12 rounded-lg  border-gray-200 bg-surface-muted p-0 hover:border-brand-primary hover:bg-brand-primary hover:text-text-inverse dark:border-zinc-600"
              startIcon={<PlusIcon className="h-5 w-5" />}
            >
              <span className="sr-only">Augmenter</span>
            </Button>
          </div>
          {!allowGroup && (
            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
              Cette destination n&apos;est disponible qu&apos;en solo.
            </p>
          )}
          {errors.adult && (
            <p className="mt-1 text-sm text-red-500">{errors.adult.message}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          className="px-8"
        >
          Continuer
        </Button>
      </div>
    </form>
  );
}
