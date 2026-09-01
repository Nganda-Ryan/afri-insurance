"use client";

import { QuoteAmountBreakdownTable } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { formatHealthCoverageRate } from "@/lib/constants/health_insurance";
import { getHealthBreakdownTableRows } from "@/lib/health/health-breakdown-display";
import type { HealthQuoteResult } from "@/types/health-insurance";

interface HealthQuoteRecapStepProps {
  quote: HealthQuoteResult;
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

export function HealthQuoteRecapStep({
  quote,
  isSubmitting = false,
  onBack,
  onContinue,
}: HealthQuoteRecapStepProps) {
  const { breakdown, devise } = quote;
  const breakdownTableRows = getHealthBreakdownTableRows(breakdown, devise);

  return (
    <div className="space-y-4">
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-4 text-sm text-text-main sm:p-6">
        <h2 className="text-xl font-bold">Récapitulatif de votre devis</h2>
        <p className="text-text-main text-opacity-80">
          Vérifiez les informations de cotation avant de télécharger votre devis.
        </p>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-base font-semibold">Formule</h3>
          <div className="space-y-3">
            <RecapRow label="Formule" value={quote.planLabel} />
            <RecapRow
              label="Taux de couverture"
              value={formatHealthCoverageRate(breakdown.taux_couverture)}
            />
            <RecapRow
              label="Effectif"
              value={`${breakdown.adultCount} adulte${breakdown.adultCount > 1 ? "s" : ""}, ${breakdown.childCount} enfant${breakdown.childCount > 1 ? "s" : ""}`}
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-base font-semibold">Détail de la cotisation</h3>
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
