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
  const { breakdown, devise, garanties } = quote;
  const breakdownTableRows = getHealthBreakdownTableRows(breakdown, devise);

  // Group guarantees by category
  const garantiesByCategory = (garanties ?? []).reduce<
    Record<string, NonNullable<typeof garanties>>
  >((acc, g) => {
    if (!acc[g.category]) acc[g.category] = [];
    acc[g.category].push(g);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-4 text-sm text-text-main sm:p-6">
        <h2 className="text-xl font-bold">Récapitulatif de votre devis</h2>
        <p className="text-text-main text-opacity-80">
          Vérifiez les informations de cotation avant de télécharger votre devis.
        </p>

        {/* Formule */}
        <div className="rounded-lg border border-border bg-card p-4">
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

        {/* Détail de la cotisation */}
        <div className="rounded-lg border border-border bg-card p-3">
          <h3 className="mb-3 text-base font-semibold">Détail de la cotisation</h3>
          <QuoteAmountBreakdownTable rows={breakdownTableRows} />
        </div>

        {/*GARANTIES*/}
        {garanties && garanties.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-3">
            <h3 className="mb-4 text-base font-semibold">
              Garanties de la formule {quote.planLabel}
            </h3>

            <div className="space-y-5">
              {Object.entries(garantiesByCategory).map(([category, items]) => (
                <div key={category} className="border-t pt-3 bg-card">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                    {category}
                  </h4>
                  <div className="space-y-2.5">
                    {items.map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col gap-0.5 pb-2 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-text-main">{item.label}</p>
                          {item.note && (
                            <p className="mt-0.5 text-xs text-gray-600">
                              {item.note}
                            </p>
                          )}
                        </div>
                        <p className="shrink-0 text-sm font-semibold text-text-main sm:text-right">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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





