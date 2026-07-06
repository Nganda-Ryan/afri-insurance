"use client";

import { MrhGarantieBadges } from "@/components/MrhQuote/shared/MrhGarantieBadges";
import { QuoteAmountBreakdownTable } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import {
  isMrhLocataireProfil,
} from "@/lib/mrh/calculate-mrh-quote";
import { getMrhBreakdownTableRows } from "@/lib/mrh/mrh-breakdown-display";
import { MRH_INSURANCE_DATA } from "@/lib/constants/mrh_insurance";
import type { MrhQuoteResult } from "@/types/mrh-insurance";

interface MrhQuoteRecapStepProps {
  quote: MrhQuoteResult;
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

export function MrhQuoteRecapStep({
  quote,
  isSubmitting = false,
  onBack,
  onContinue,
}: MrhQuoteRecapStepProps) {
  const { breakdown, devise } = quote;
  const isLocataire = isMrhLocataireProfil(quote.profilId);
  const breakdownTableRows = getMrhBreakdownTableRows(breakdown, devise, {
    isLocataire,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-4 text-sm text-text-main sm:p-6">
        <h2 className="text-xl font-bold">Récapitulatif de votre devis</h2>
        <p className="text-text-main text-opacity-80">
          Vérifiez les informations de cotation avant de passer au paiement.
        </p>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-base font-semibold">Profil</h3>
          <div className="space-y-3">
            <RecapRow label="Profil d'assurance" value={quote.profilLabel} />
            <RecapRow label="Tranche tarifaire" value={quote.tarifLabel} />
            <div className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
              <span className="font-semibold text-text-main">Garanties incluses</span>
              <div className="mt-2">
                <MrhGarantieBadges garanties={quote.garanties} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-base font-semibold">Détail de la prime</h3>
          <QuoteAmountBreakdownTable rows={breakdownTableRows} />
          <p className="mt-4 text-xs text-gray-500">
            {MRH_INSURANCE_DATA.note_bas_de_page}
          </p>
        </div>
      </div>

      <QuoteStepNavigation
        onPrevious={onBack}
        onNext={onContinue}
        nextLabel="Passer au paiement"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
