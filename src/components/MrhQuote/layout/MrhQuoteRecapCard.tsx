"use client";

import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { MrhQuoteResult } from "@/types/mrh-insurance";

interface MrhQuoteRecapCardProps {
  quote: MrhQuoteResult;
}

export function MrhQuoteRecapCard({ quote }: MrhQuoteRecapCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white">
      <div className="bg-brand-primary px-4 py-[10px]">
        <h3 className="text-base font-bold text-white">Récapitulatif du devis</h3>
      </div>
      <div className="space-y-3 p-4 text-sm sm:p-5">
        {[
          { label: "Profil", value: quote.profilLabel, highlight: true },
          { label: "Tranche", value: quote.tarifLabel },
          {
            label: "Prime TTC",
            value: formatAutoAmount(quote.breakdown.prime_ttc, quote.devise),
            large: true,
          },
          ...(quote.breakdown.valeur_batiment != null
            ? [
                {
                  label: "Valeur bâtiment",
                  value: formatAutoAmount(quote.breakdown.valeur_batiment, quote.devise),
                },
              ]
            : []),
          ...(quote.breakdown.loyer_mensuel != null
            ? [
                {
                  label: "Loyer mensuel",
                  value: formatAutoAmount(quote.breakdown.loyer_mensuel, quote.devise),
                },
              ]
            : []),
          ...(quote.breakdown.valeur_contenu != null
            ? [
                {
                  label: "Valeur contenu",
                  value: formatAutoAmount(quote.breakdown.valeur_contenu, quote.devise),
                },
              ]
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
