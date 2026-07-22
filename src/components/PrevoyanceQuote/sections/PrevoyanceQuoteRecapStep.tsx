"use client";

import { QuoteAmountBreakdownTable } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { getPrevoyanceBreakdownTableRows } from "@/lib/prevoyance/prevoyance-breakdown-display";
import type { PrevoyanceQuoteResult } from "@/types/prevoyance-insurance";

interface PrevoyanceQuoteRecapStepProps {
  quote: PrevoyanceQuoteResult;
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

export function PrevoyanceQuoteRecapStep({
  quote,
  isSubmitting = false,
  onBack,
  onContinue,
}: PrevoyanceQuoteRecapStepProps) {
  const { breakdown, devise } = quote;
  const breakdownTableRows = getPrevoyanceBreakdownTableRows(breakdown, devise);
  const durationLabel =
    breakdown.durationYears === 1
      ? "1 an"
      : `${breakdown.durationYears} ans`;

  return (
    <div className="space-y-4">
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-4 text-sm text-text-main sm:p-6">
        <h2 className="text-xl font-bold">Récapitulatif de votre devis</h2>
        <p className="text-text-main text-opacity-80">
          Vérifiez les informations de cotation avant de télécharger votre devis.
        </p>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-base font-semibold">Contrat</h3>
          <div className="space-y-3">
            <RecapRow label="Produit" value={quote.productName} />
            <RecapRow label="Âge" value={`${breakdown.age} ans`} />
            <RecapRow label="Durée" value={durationLabel} />
            <RecapRow
              label="Capital assuré"
              value={formatAutoAmount(breakdown.capital, devise)}
            />
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
        nextLabel="Télécharger"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
