"use client";

import { QuoteAmountBreakdownTable } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { getAutoBreakdownTableRows } from "@/lib/auto/auto-breakdown-display";
import type { AutoQuoteResult } from "@/types/auto-insurance";
import { isAutoMotoCategory } from "@/lib/auto/calculate-auto-quote";

interface AutoQuoteRecapStepProps {
  quote: AutoQuoteResult;
  isSubmitting?: boolean;
  onBack: () => void;
  onContinue: () => void;
}

function RecapRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
      <span className="font-semibold text-text-main">{label}</span>
      <span className="text-right text-text-main">{value}</span>
    </div>
  );
}

export function AutoQuoteRecapStep({
  quote,
  isSubmitting = false,
  onBack,
  onContinue,
}: AutoQuoteRecapStepProps) {
  const { breakdown, devise } = quote;
  const isMoto = isAutoMotoCategory(quote.zoneNom, quote.categoryId);
  const breakdownTableRows = getAutoBreakdownTableRows(breakdown, devise, { isMoto });

  return (
    <div className="space-y-4">
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-4 text-sm text-text-main sm:p-6">
        <h2 className="text-xl font-bold">Récapitulatif de votre devis</h2>
        <p className="text-text-main text-opacity-80">
          Vérifiez les informations de cotation avant de télécharger votre devis.
        </p>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-base font-semibold">Véhicule</h3>
          <div className="space-y-3">
            <RecapRow label="Zone" value={quote.zoneNom} />
            <RecapRow label="Catégorie" value={quote.categoryNom} />
            {quote.durationLabel ? (
              <RecapRow label="Durée" value={quote.durationLabel} />
            ) : null}
            {quote.fuelType ? (
              <RecapRow
                label="Énergie"
                value={quote.fuelType === "diesel" ? "Diesel" : "Essence"}
              />
            ) : null}
            {quote.powerLabel ? (
              <RecapRow label="Puissance fiscale" value={quote.powerLabel} />
            ) : null}
            {quote.motoCharacteristic ? (
              <RecapRow label="Caractéristique" value={quote.motoCharacteristic} />
            ) : null}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-base font-semibold">Détail de la prime</h3>
          <QuoteAmountBreakdownTable rows={breakdownTableRows} />
        </div>
      </div>

      <QuoteStepNavigation
        onPrevious={onBack}
        onNext={onContinue}
        nextLabel="Voir le devis"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
