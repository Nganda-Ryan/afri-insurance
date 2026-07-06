"use client";

import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { formatHealthCoverageRate } from "@/lib/constants/health_insurance";
import type { HealthQuoteResult } from "@/types/health-insurance";

interface HealthQuoteRecapCardProps {
  quote: HealthQuoteResult;
}

export function HealthQuoteRecapCard({ quote }: HealthQuoteRecapCardProps) {
  const { breakdown, devise } = quote;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white">
      <div className="bg-brand-primary px-4 py-[10px]">
        <h3 className="text-base font-bold text-white">Récapitulatif du devis</h3>
      </div>
      <div className="space-y-3 p-4 text-sm sm:p-5">
        {[
          { label: "Formule", value: quote.planLabel, highlight: true },
          {
            label: "Couverture",
            value: formatHealthCoverageRate(breakdown.taux_couverture),
          },
          {
            label: "Effectif",
            value: `${breakdown.adultCount} ad. / ${breakdown.childCount} enf.`,
          },
          {
            label: "Cotisation totale",
            value: formatAutoAmount(breakdown.cotisation_totale, devise),
            large: true,
          },
        ].map(({ label, value, highlight, large }) => (
          <div
            key={label}
            className="flex items-start justify-between gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0"
          >
            <span className="font-semibold text-text-main">{label}</span>
            <span
              className={
                highlight
                  ? "text-right font-bold text-brand-primary"
                  : large
                    ? "text-right text-lg font-bold text-text-main"
                    : "text-right text-text-main"
              }
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
