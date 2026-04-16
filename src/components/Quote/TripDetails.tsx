"use client";

import React from "react";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { DESTINATION_AREA_OPTIONS } from "@/lib/travel/destination-area";
import { TripDetailsData } from "@/types/travel";


interface TripDetailsProps {
  onSubmit: (data: TripDetailsData) => void;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const initialDateValues = (() => {
  const now = Date.now();
  return {
    today: new Date(now).toISOString().split("T")[0],
    defaultDeparture: new Date(now + 7 * DAY_IN_MS).toISOString().split("T")[0],
    defaultReturn: new Date(now + 14 * DAY_IN_MS).toISOString().split("T")[0],
  };
})();

export function TripDetails({ onSubmit }: TripDetailsProps) {
  const today = initialDateValues.today;
  const defaultDeparture = initialDateValues.defaultDeparture;
  const defaultReturn = initialDateValues.defaultReturn;
  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, touchedFields },
  } = useForm<TripDetailsData>({
    mode: "onChange",
    defaultValues: {
      destination: "",
      departureDate: defaultDeparture,
      returnDate: defaultReturn,
      numberOfTravelers: 2,
      productCategory: "Standard",
    },
  });

  const destination = useWatch({ control, name: "destination" });
  const departureDate = useWatch({ control, name: "departureDate" });
  const returnDate = useWatch({ control, name: "returnDate" });
  const numberOfTravelers = useWatch({ control, name: "numberOfTravelers" });
  const departureDateField = register("departureDate", {
    required: "La date de départ est obligatoire",
  });
  const numberOfTravelersField = register("numberOfTravelers", {
    valueAsNumber: true,
    min: {
      value: 1,
      message: "Au moins un voyageur est requis",
    },
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
              {...register("productCategory")}
              className="w-full cursor-pointer appearance-none rounded-lg border-2 border-gray-200 bg-white py-3 pl-4 pr-11 text-gray-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/25 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            >
              <option value="Standard">Standard</option>
              <option value="Etudiant">Etudiant</option>
              <option value="Pèlerinage">Pèlerinage</option>
            </select>
            <ChevronDownIcon
              className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-zinc-400"
              aria-hidden
            />
          </div>
          <p className="mt-1 text-xs text-gray-600">
            Contexte et catalogue EVO utilises: currency EUR, country Cameroun,
            language FR, reference 81TS0124, version 1.
          </p>
        </div>

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
              {...register("destination", {
                validate: (value) =>
                  value.trim().length > 0 ||
                  "Veuillez choisir une zone de destination",
              })}
              className={[
                "w-full cursor-pointer appearance-none rounded-lg border-2 py-3 pl-4 pr-11",
                "bg-white text-gray-900 shadow-sm",
                "dark:bg-zinc-950 dark:text-zinc-100",
                "focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/25",
                errors.destination
                  ? "border-red-500"
                  : isFieldValid("destination", destination)
                    ? "border-green-600 dark:border-green-500"
                    : "border-gray-200 dark:border-zinc-600",
              ].join(" ")}
            >
              <option value="" disabled>
                Choisir une zone…
              </option>
              {DESTINATION_AREA_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-zinc-400"
              aria-hidden
            />
          </div>
          {errors.destination && (
            <p className="mt-1 text-sm text-red-500">
              {errors.destination.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-main">
              Date de départ
            </label>
            <input
              type="date"
              {...departureDateField}
              min={today}
              onChange={(e) => {
                departureDateField.onChange(e);
                void trigger("returnDate");
              }}
              className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:bg-white focus:outline-none dark:bg-zinc-950 dark:text-zinc-100 ${errors.departureDate ? "border-red-500" : isFieldValid("departureDate", departureDate) ? "border-green-600 dark:border-green-500" : "border-gray-200 focus:border-brand-primary dark:border-zinc-600"}`}
            />
            {errors.departureDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.departureDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-text-main">
              Date de retour
            </label>
            <input
              type="date"
              {...register("returnDate", {
                required: "La date de retour est obligatoire",
                validate: (value) =>
                  !departureDate ||
                  new Date(value) > new Date(departureDate) ||
                  "La date de retour doit être postérieure au départ",
              })}
              min={departureDate || today}
              className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:bg-white focus:outline-none dark:bg-zinc-950 dark:text-zinc-100 ${errors.returnDate ? "border-red-500" : isFieldValid("returnDate", returnDate) ? "border-green-600 dark:border-green-500" : "border-gray-200 focus:border-brand-primary dark:border-zinc-600"}`}
            />
            {errors.returnDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.returnDate.message}
              </p>
            )}
          </div>
        </div>

        <div>
            <label className="mb-2 block text-sm font-semibold text-text-main">
                Nombre de voyageurs
            </label>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => {
                      setValue(
                        "numberOfTravelers",
                        Math.max(1, (numberOfTravelers ?? 1) - 1),
                        {
                          shouldTouch: true,
                          shouldDirty: true,
                          shouldValidate: true,
                        },
                      );
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-gray-200 bg-surface-muted transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-text-inverse dark:border-zinc-600"
                    >
                    <MinusIcon className="h-5 w-5" />
                </button>
                <div className="max-w-[100px] flex-1">
                    <input
                        type="number"
                        {...numberOfTravelersField}
                        onChange={(e) => {
                          numberOfTravelersField.onChange(e);
                          const nextValue = Math.max(
                            1,
                            Number.parseInt(e.target.value, 10) || 1,
                          );
                          setValue("numberOfTravelers", nextValue, {
                            shouldTouch: true,
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
                        className={`w-full rounded-lg border-2 py-3 text-center text-2xl font-bold focus:border-brand-primary focus:outline-none dark:border-zinc-600 ${errors.numberOfTravelers ? "border-red-500" : isFieldValid("numberOfTravelers", numberOfTravelers) ? "border-green-600 dark:border-green-500" : "border-gray-200"}`}
                    />
                </div>
                <button
                    type="button"
                    onClick={() => {
                      setValue(
                        "numberOfTravelers",
                        (numberOfTravelers ?? 1) + 1,
                        {
                          shouldTouch: true,
                          shouldDirty: true,
                          shouldValidate: true,
                        },
                      );
                      void trigger("numberOfTravelers");
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-gray-200 bg-surface-muted transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-text-inverse dark:border-zinc-600"
                >
                    <PlusIcon className="h-5 w-5" />
                </button>
            </div>
            {errors.numberOfTravelers && (
                <p className="mt-1 text-sm text-red-500">
                {errors.numberOfTravelers.message}
                </p>
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
