"use client";

import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { AutoQuoteResult } from "@/types/auto-insurance";

interface AutoQuoteRecapCardProps {
  quote: AutoQuoteResult;
}

export function AutoQuoteRecapCard({ quote }: AutoQuoteRecapCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white">
      <div className="bg-brand-primary px-4 py-[10px]">
        <h3 className="text-base font-bold text-white">Récapitulatif du devis</h3>
      </div>
      <div className="space-y-3 p-4 text-sm sm:p-5">
        {[
          { label: "Catégorie", value: quote.categoryNom, highlight: true },
          {
            label: "Total à payer",
            value: formatAutoAmount(quote.breakdown.total_a_payer, quote.devise),
            large: true,
          },
          ...(quote.durationLabel
            ? [{ label: "Durée", value: quote.durationLabel }]
            : []),
          ...(quote.powerLabel
            ? [{ label: "Puissance", value: quote.powerLabel }]
            : []),
          ...(quote.motoCharacteristic
            ? [{ label: "Véhicule", value: quote.motoCharacteristic }]
            : []),
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
