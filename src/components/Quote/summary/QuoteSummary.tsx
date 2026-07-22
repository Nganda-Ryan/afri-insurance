"use client";

import React, { useMemo, useState } from "react";
import { toast } from "sonner";

import type {
  TripDetailsData,
  TravelerInfoData,
  SelectedPlan,
  PlanDetails,
  PLAN_TYPES_TYPE,
  TravelQuoteGuaranteeSummary,
  TravelQuoteContext,
} from "@/types/travel";
import { EVO_DEFAULT_CATALOG } from "@/config/evo-api";
import {
  useSelectTravelQuoteProduct,
  useTravelQuote,
} from "@/hooks/use-travel-quote-session";
import { buildGetQuotePayload } from "@/lib/travel/build-get-quote-payload";
import { PLAN_TYPE_ELITE, PLAN_TYPE_PREMIUM, PLAN_TYPE_STANDARD } from "@/lib/constants/constant";
import { QuoteErrorCard } from "./QuoteErrorCard";
import { QuotePlanCard } from "./QuotePlanCard";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";

interface QuoteSummaryProps {
  tripDetails: TripDetailsData;
  travelerInfo: TravelerInfoData;
  onPlanSelect: (
    plan: SelectedPlan,
    quoteContext: TravelQuoteContext | undefined,
    quoteCode: string,
    quoteId: number,
  ) => void;
  onBack: () => void;
}


const PLAN_TYPES: PLAN_TYPES_TYPE[] = [PLAN_TYPE_STANDARD, PLAN_TYPE_PREMIUM, PLAN_TYPE_ELITE];

function mapTypeFromIndex(index: number): SelectedPlan["type"] {
  return PLAN_TYPES[Math.min(index, PLAN_TYPES.length - 1)];
}

function parsePriceLabel(label: string): number {
  const n = Number.parseFloat(String(label).replace(/,/g, "."));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
}

/** Libellés de garantie à partir du seul tableau API ; rien si vide ou sans nom. */
function guaranteeLinesFromSummaries(
  summaries: TravelQuoteGuaranteeSummary[] | undefined,
): string[] {
  if (!summaries?.length) return [];
  const out: string[] = [];
  for (const g of summaries) {
    const name = typeof g.name === "string" ? g.name.trim() : "";
    if (!name) continue;
    const limit = typeof g.limit === "string" ? g.limit.trim() : "";
    out.push(limit ? `${name} - ${limit}` : name);
  }
  return out;
}

export function QuoteSummary({
  tripDetails,
  travelerInfo,
  onPlanSelect,
  onBack,
}: QuoteSummaryProps) {
    const [expandedKey, setExpandedKey] = useState<string | null>(null);

    const quoteInput = useMemo(
        () => ({
            destination_area: tripDetails.destination_area,
            start_date: tripDetails.start_date,
            end_date: tripDetails.end_date,
            adult: tripDetails.adult,
            oldest_traveler_age: travelerInfo.oldest_traveler_age,
            product_category: tripDetails.product_category,
            catalog_reference: EVO_DEFAULT_CATALOG.reference,
            catalog_version: EVO_DEFAULT_CATALOG.version,
        }),
        [
            tripDetails.start_date,
            tripDetails.destination_area,
            tripDetails.adult,
            tripDetails.product_category,
            tripDetails.end_date,
            travelerInfo.oldest_traveler_age,
        ],
    );

    const quotePayload = useMemo(
        () => buildGetQuotePayload(quoteInput),
        [quoteInput],
    );

    const { result, isLoading } = useTravelQuote(quotePayload);
    const selectProduct = useSelectTravelQuoteProduct();

    const quoteErrorMessage = result != null && !result.ok ? (result.error?.message ?? "") : "";
    const quoteFailed = result != null && !result.ok;

    const quoteContext = result?.ok === true ? result.data?.quoteContext : undefined;

    const apiPlans: PlanDetails[] = useMemo(() => {
        if (!result?.ok || !result.data) return [];
        const { products, quoteContext: ctx } = result.data;

        return products.map((p, i) => {
            const currency = p.currency ?? ctx?.currency;

            return {
                name: p.name,
                type: mapTypeFromIndex(i),
                price: parsePriceLabel(p.price_label),
                price_label: p.price_label,
                per_trip_label: p.duration != null ? `${p.duration} jours` : "Pour ce voyage",
                product_index: p.index,
                source: "api" as const,
                currency,
                guarantees: guaranteeLinesFromSummaries(p.guarantee_summaries),
                duration: p.duration,
                trip_start_label: p.trip_start_label,
                trip_end_label: p.trip_end_label,
                composition: p.composition,
                terms_url: p.terms_url,
                is_default_product: p.is_default_product,
            };
        });
    }, [result]);

    const handleSelectPlan = async (plan: PlanDetails) => {
        const res = await selectProduct.mutateAsync(plan.product_index);
        if (!res.ok || !res.data) {
            toast.error(res.error?.message ?? "Sélection impossible.");
            return;
        }
        const selectedProduct = res.data.products[0];
        const quoteCode = selectedProduct?.quote_code;
        const quoteId = selectedProduct?.quote_id;
        if (!quoteCode) {
          toast.error("Code de devis manquant. Relancez une cotation.");
          return;
        }
        if (quoteId == null || !Number.isInteger(quoteId) || quoteId <= 0) {
          toast.error("Identifiant de devis manquant. Relancez une cotation.");
          return;
        }
        onPlanSelect(
            {
                name: plan.name,
                price: plan.price,
                type: plan.type,
                product_index: plan.product_index,
                source: plan.source,
            },
            quoteContext,
            quoteCode,
            quoteId,
        );
    };

    if (isLoading) {
        return (
        <div className="space-y-6">
            <div className="h-8 rounded animate-pulse w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="rounded-lg p-6 animate-pulse"
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

    if (quoteFailed && result != null) {
        return (
            <QuoteErrorCard
                message={quoteErrorMessage}
                errorCode={result.error?.code}
                onBack={onBack}
            />
        );
    }

    return (
        <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
            <h2 className="mb-6 text-2xl font-bold">
                Votre tarif
            </h2>

            {quoteContext &&
                (quoteContext.language ||
                    quoteContext.country ||
                    quoteContext.currency) && (
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                        {[
                            quoteContext.language &&
                                `Langue : ${quoteContext.language}`,
                            quoteContext.country &&
                                `Pays : ${quoteContext.country}`,
                            quoteContext.currency &&
                                `Devise : ${quoteContext.currency}`,
                        ]
                            .filter(Boolean)
                            .join(" · ")}
                    </p>
                )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {apiPlans.map((plan) => {
                    const planKey = `${plan.source}-${plan.product_index}`;
                    return (
                        <QuotePlanCard
                            key={`${plan.source}-${plan.name}-${plan.product_index}`}
                            plan={plan}
                            expanded={expandedKey === planKey}
                            onToggleGuarantees={() =>
                                setExpandedKey(expandedKey === planKey ? null : planKey)
                            }
                            onChoose={() => void handleSelectPlan(plan)}
                            isSelecting={selectProduct.isPending}
                        />
                    );
                })}
            </div>

            {result?.ok === true && apiPlans.length === 0 && (
                <div className="rounded-lg border border-gray-200 px-4 py-6 text-sm text-text-main">
                Aucune formule disponible. Modifiez vos entrées.
                </div>
            )}

            <div className="mt-8 rounded-lg p-6 border bg-white dark:bg-zinc-950 dark:text-zinc-100">
                <h3 className="font-semibold mb-3">
                    Récapitulatif du voyage
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="text-gray-600">Zone :</span>
                    <span className="ml-2 font-medium">{tripDetails.destination_area}</span>
                </div>
                <div>
                    <span className="text-gray-600">Pays :</span>
                    <span className="ml-2 font-medium">{tripDetails.destination_country}</span>
                </div>
                <div>
                    <span className="text-gray-600">Catégorie :</span>
                    <span className="ml-2 font-medium">{tripDetails.product_category}</span>
                </div>
                <div>
                    <span className="text-gray-600">Voyageurs :</span>
                    <span className="ml-2 font-medium">
                    {tripDetails.adult}
                    </span>
                </div>
                <div>
                    <span className="text-gray-600">Âge du plus âgé :</span>
                    <span className="ml-2 font-medium">
                    {travelerInfo.oldest_traveler_age} ans
                    </span>
                </div>
                <div>
                    <span className="text-gray-600">Départ :</span>
                    <span className="ml-2 font-medium">
                    {new Date(tripDetails.start_date).toLocaleDateString()}
                    </span>
                </div>
                <div>
                    <span className="text-gray-600">Retour :</span>
                    <span className="ml-2 font-medium">
                    {new Date(tripDetails.end_date).toLocaleDateString()}
                    </span>
                </div>
                </div>
            </div>
            </div>

            <QuoteStepNavigation
                onPrevious={onBack}
                showNext={false}
            />
        </div>
    );
}
