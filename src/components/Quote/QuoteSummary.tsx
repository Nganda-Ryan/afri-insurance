"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronDownIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";

import {
  TripDetailsData,
  TravelerInfoData,
  SelectedPlan,
  PlanDetails,
  PLAN_TYPES_TYPE,
} from "@/types/travel";
import { EVO_DEFAULT_CATALOG } from "@/config/evo-api";
import {
  useRequestTravelQuote,
  useSelectTravelQuoteProduct,
} from "@/hooks/use-travel-quote-session";

interface QuoteSummaryProps {
  tripDetails: TripDetailsData;
  travelerInfo: TravelerInfoData;
  onPlanSelect: (plan: SelectedPlan) => void;
  onBack: () => void;
}


const PLAN_TYPES: PLAN_TYPES_TYPE[] = ["standard", "premium", "elite"];

function mapTypeFromIndex(index: number): SelectedPlan["type"] {
  return PLAN_TYPES[Math.min(index, PLAN_TYPES.length - 1)];
}

function parsePriceLabel(label: string): number {
  const n = Number.parseFloat(String(label).replace(/,/g, "."));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
}

export function QuoteSummary({
  tripDetails,
  travelerInfo,
  onPlanSelect,
  onBack,
}: QuoteSummaryProps) {
    const [expandedKey, setExpandedKey] = useState<string | null>(null);
    const requestQuote = useRequestTravelQuote();
    const { mutate: requestQuoteMutate, isPending, isSuccess } = requestQuote;
    const selectProduct = useSelectTravelQuoteProduct();
    const quoteResult = requestQuote.data;
    const quoteErrorMessage =
      quoteResult && quoteResult.ok === false
        ? quoteResult.error.message
        : requestQuote.error instanceof Error
          ? requestQuote.error.message
          : requestQuote.error
            ? String(requestQuote.error)
            : "";

    const quoteInput = useMemo(
        () => ({
            destination: tripDetails.destination,
            departureDate: tripDetails.departureDate,
            returnDate: tripDetails.returnDate,
            numberOfTravelers: tripDetails.numberOfTravelers,
            oldestTravelerBirthDate: travelerInfo.oldestTravelerBirthDate,
            productCategory: tripDetails.productCategory,
            catalogReference: EVO_DEFAULT_CATALOG.reference,
            catalogVersion: EVO_DEFAULT_CATALOG.version,
        }),
        [
            tripDetails.departureDate,
            tripDetails.destination,
            tripDetails.numberOfTravelers,
            tripDetails.productCategory,
            tripDetails.returnDate,
            travelerInfo.oldestTravelerBirthDate,
        ],
    );

    useEffect(() => {
        if (isPending || isSuccess || requestQuote.isError) return;
        requestQuoteMutate(quoteInput);
    }, [
        quoteInput,
        requestQuoteMutate,
        isPending,
        isSuccess,
        requestQuote.isError,
    ]);

    const apiPlans: PlanDetails[] = useMemo(() => {
        const apiProducts =
          requestQuote.data && requestQuote.data.ok ? requestQuote.data.products : [];
        return apiProducts.map((p, i) => ({
            name: p.name,
            type: mapTypeFromIndex(i),
            price: parsePriceLabel(p.priceLabel),
            perTripLabel: "per trip",
            productIndex: p.index,
            source: "api",
            currency: p.currency,
            coverages: [
                {
                name: "Premium (API)",
                limit: p.currency
                    ? `${p.priceLabel} ${p.currency}`
                    : p.priceLabel,
                },
            ],
        }));
    }, [requestQuote.data]);

    const isLoading = isPending;

    const handleSelectPlan = async (plan: PlanDetails) => {
        try {
        await selectProduct.mutateAsync(plan.productIndex);
        } catch (err) {
        toast.error(err instanceof Error ? err.message : String(err));
        return;
        }
        onPlanSelect({
        name: plan.name,
        price: plan.price,
        type: plan.type,
        productIndex: plan.productIndex,
        source: plan.source,
        });
    };

    if (isLoading) {
        return (
        <div className="space-y-6">
            <div className="h-8 bg-surface-muted rounded animate-pulse w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div
                key={i}
                className="bg-surface-muted rounded-lg p-6 animate-pulse"
                >
                <div className="h-6 bg-gray-300 rounded w-2/3 mb-4" />
                <div className="h-10 bg-gray-300 rounded w-1/2 mb-6" />
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 bg-gray-300 rounded" />
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>
        );
    }

    if (requestQuote.data && requestQuote.data.ok === false) {
        return (
        <div>
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100">
            {quoteErrorMessage}
            </div>

            <div className="flex items-center justify-between">
            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-text-main transition-colors hover:border-brand-secondary"
            >
                <ChevronLeftIcon className="w-4 h-4" />
                Modifier
            </button>
            </div>
            <p className="mt-3 text-sm text-text-main">
            Modifiez les informations du voyage pour essayer une autre formule.
            </p>
        </div>
        );
    }

    return (
        <div>
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-brand-secondary">
            Vos options de devis
            </h2>
            <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-sm border-2 border-gray-300 text-text-main rounded-lg font-semibold hover:border-brand-secondary transition-colors"
            >
            <ChevronLeftIcon className="w-4 h-4" />
            Modifier
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apiPlans.map((plan) => (
            <div
                key={`${plan.source}-${plan.name}-${plan.productIndex}`}
                className={`relative bg-surface-base rounded-lg p-6 shadow-md transition-all hover:shadow-xl ${plan.type === "premium" ? "border-2 border-brand-secondary md:scale-105" : "border border-gray-200"}`}
            >
                {plan.type === "premium" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-text-inverse px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Le plus choisi
                </div>
                )}

                <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-brand-secondary mb-2">
                    {plan.name}
                </h3>
                <div className="text-4xl font-bold text-text-main mb-1">
                    {plan.source === "api" && plan.currency
                    ? `${plan.price} ${plan.currency}`
                    : `$${plan.price}`}
                </div>
                <div className="text-sm text-gray-600">{plan.perTripLabel}</div>
                </div>

                <div className="mb-6">
                <button
                    type="button"
                    onClick={() => {
                    const k = `${plan.source}-${plan.productIndex}`;
                    setExpandedKey(expandedKey === k ? null : k);
                    }}
                    className="w-full flex items-center justify-between text-sm font-semibold text-brand-secondary mb-3"
                >
                    <span>Voir les garanties</span>
                    <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${expandedKey === `${plan.source}-${plan.productIndex}` ? "rotate-180" : ""}`}
                    />
                </button>

                {expandedKey === `${plan.source}-${plan.productIndex}` && (
                    <div className="space-y-2 overflow-hidden">
                    {plan.coverages.map((coverage, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                        <CheckIcon className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <div className="font-medium text-text-main">
                            {coverage.name}
                            </div>
                            <div className="text-gray-600">{coverage.limit}</div>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>

                <button
                type="button"
                disabled={selectProduct.isPending}
                onClick={() => void handleSelectPlan(plan)}
                className={`w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-60 ${plan.type === "premium" ? "bg-brand-primary text-text-inverse hover:bg-opacity-90 shadow-md" : "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-text-inverse"}`}
                >
                {selectProduct.isPending ? "Sélection…" : `Choisir ${plan.name}`}
                </button>
            </div>
            ))}
        </div>

        {requestQuote.isSuccess && apiPlans.length === 0 && (
            <div className="rounded-lg border border-gray-200 bg-surface-muted px-4 py-6 text-sm text-text-main">
            EVO n’a renvoyé aucune offre pour cette demande.
            </div>
        )}

        <div className="mt-8 bg-surface-muted rounded-lg p-6">
            <h3 className="font-semibold text-brand-secondary mb-3">
            Récapitulatif du voyage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
                <span className="text-gray-600">Destination :</span>
                <span className="ml-2 font-medium">{tripDetails.destination}</span>
            </div>
            <div>
                <span className="text-gray-600">Catégorie :</span>
                <span className="ml-2 font-medium">{tripDetails.productCategory}</span>
            </div>
            <div>
                <span className="text-gray-600">Voyageurs :</span>
                <span className="ml-2 font-medium">
                {tripDetails.numberOfTravelers}
                </span>
            </div>
            <div>
                <span className="text-gray-600">Date de naissance du plus âgé :</span>
                <span className="ml-2 font-medium">
                {new Date(travelerInfo.oldestTravelerBirthDate).toLocaleDateString()}
                </span>
            </div>
            <div>
                <span className="text-gray-600">Départ :</span>
                <span className="ml-2 font-medium">
                {new Date(tripDetails.departureDate).toLocaleDateString()}
                </span>
            </div>
            <div>
                <span className="text-gray-600">Retour :</span>
                <span className="ml-2 font-medium">
                {new Date(tripDetails.returnDate).toLocaleDateString()}
                </span>
            </div>
            </div>
        </div>
        </div>
    );
}
