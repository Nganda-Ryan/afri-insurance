"use client";

import { QuoteAmountBreakdownTable } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { getAccidentsBreakdownTableRows } from "@/lib/accidents/accidents-breakdown-display";
import type { AccidentQuoteResult } from "@/types/accidents-insurance";

interface AccidentsQuoteRecapStepProps {
  quote: AccidentQuoteResult;
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

export function AccidentsQuoteRecapStep({
  quote,
  isSubmitting = false,
  onBack,
  onContinue,
}: AccidentsQuoteRecapStepProps) {
  const { breakdown, devise } = quote;
  const breakdownTableRows = getAccidentsBreakdownTableRows(breakdown, devise);

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
            <RecapRow label="Classe" value={breakdown.classe_label} />
            <RecapRow
              label="Capital décès"
              value={formatAutoAmount(breakdown.capital_deces, devise)}
            />
            <RecapRow
              label="Capital IPT"
              value={formatAutoAmount(breakdown.capital_ipt, devise)}
            />
            <RecapRow label="Durée" value={breakdown.duree_label} />
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
