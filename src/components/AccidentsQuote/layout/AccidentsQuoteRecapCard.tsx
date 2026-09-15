"use client";

import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { AccidentQuoteResult } from "@/types/accidents-insurance";

interface AccidentsQuoteRecapCardProps {
  quote: AccidentQuoteResult;
}

export function AccidentsQuoteRecapCard({ quote }: AccidentsQuoteRecapCardProps) {
  const { breakdown, devise } = quote;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white">
      <div className="bg-brand-primary px-4 py-[10px]">
        <h3 className="text-base font-bold text-white">Récapitulatif du devis</h3>
      </div>
      <div className="space-y-3 p-4 text-sm sm:p-5">
        {[
          { label: "Produit", value: quote.productName, highlight: true },
          { label: "Classe", value: breakdown.classe_label },
          {
            label: "Capital décès",
            value: formatAutoAmount(breakdown.capital_deces, devise),
          },
          {
            label: "Capital IPT",
            value: formatAutoAmount(breakdown.capital_ipt, devise),
          },
          { label: "Durée", value: breakdown.duree_label },
          {
            label: "Prime totale",
            value: formatAutoAmount(breakdown.prime_totale, devise),
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
