"use client";

import { QuoteDownloadStep } from "@/components/Quote/sections/QuoteDownloadStep";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { formatHealthCoverageRate } from "@/lib/constants/health_insurance";
import {
  buildQuoteDocument,
} from "@/lib/quote/download-quote-document";
import type { HealthQuoteResult } from "@/types/health-insurance";

interface HealthQuoteDevisStepProps {
  quote: HealthQuoteResult;
  onBack: () => void;
}

export function HealthQuoteDevisStep({ quote, onBack }: HealthQuoteDevisStepProps) {
  const { breakdown } = quote;
  const amount = formatAutoAmount(breakdown.cotisation_totale, quote.devise);

  const lines: Array<{ label: string; value: string }> = [
    { label: "Formule", value: quote.planLabel },
    {
      label: "Taux de couverture",
      value: formatHealthCoverageRate(breakdown.taux_couverture),
    },
    {
      label: "Effectif",
      value: `${breakdown.adultCount} adulte(s), ${breakdown.childCount} enfant(s)`,
    },
  ];

  const documentContent = buildQuoteDocument({
    title: "DEVIS ASSURANCE SANTÉ",
    productLabel: "Assurance santé",
    lines,
    amountLabel: "Cotisation totale",
    amountValue: amount,
  });

  return (
    <QuoteDownloadStep
      filename="devis-assurance-sante.txt"
      documentContent={documentContent}
      summaryAmountLabel="Montant du devis"
      summaryAmountValue={amount}
      onBack={onBack}
    />
  );
}
