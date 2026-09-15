"use client";

import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { HelepQuoteResult } from "@/types/helep-insurance";

interface HelepQuoteRecapCardProps {
  quote: HelepQuoteResult;
}

export function HelepQuoteRecapCard({ quote }: HelepQuoteRecapCardProps) {
  const { breakdown, devise } = quote;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white">
      <div className="bg-brand-primary px-4 py-[10px]">
        <h3 className="text-base font-bold text-white">Récapitulatif du devis</h3>
      </div>
      <div className="space-y-3 p-4 text-sm sm:p-5">
        {[
          { label: "Produit", value: quote.productName, highlight: true },
          { label: "Formule", value: breakdown.formuleLabel },
          {
            label: "Capital Personnes",
            value: formatAutoAmount(breakdown.capital_personnes, devise),
          },
          {
            label: "Capital Engagements",
            value: formatAutoAmount(breakdown.capital_engagements, devise),
          },
          {
            label: "Capital total",
            value: formatAutoAmount(breakdown.capital_total, devise),
          },
          {
            label: "Prime annuelle",
            value: formatAutoAmount(breakdown.prime_annuelle, devise),
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
