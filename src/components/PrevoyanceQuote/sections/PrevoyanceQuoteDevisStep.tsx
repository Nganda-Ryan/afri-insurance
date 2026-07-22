"use client";

import { QuoteDownloadStep } from "@/components/Quote/sections/QuoteDownloadStep";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { buildQuoteDocument } from "@/lib/quote/download-quote-document";
import type { PrevoyanceQuoteResult } from "@/types/prevoyance-insurance";

interface PrevoyanceQuoteDevisStepProps {
  quote: PrevoyanceQuoteResult;
  onBack: () => void;
}

export function PrevoyanceQuoteDevisStep({
  quote,
  onBack,
}: PrevoyanceQuoteDevisStepProps) {
  const { breakdown } = quote;
  const amount = formatAutoAmount(breakdown.prime_totale, quote.devise);
  const durationLabel =
    breakdown.durationYears === 1
      ? "1 an"
      : `${breakdown.durationYears} ans`;

  const lines: Array<{ label: string; value: string }> = [
    { label: "Produit", value: quote.productName },
    { label: "Âge", value: `${breakdown.age} ans` },
    { label: "Durée", value: durationLabel },
    {
      label: "Capital à assuré",
      value: formatAutoAmount(breakdown.capital, quote.devise),
    },
    {
      label: "Prime de risque",
      value: formatAutoAmount(breakdown.prime_risque, quote.devise),
    },
    {
      label: "Frais de police",
      value: formatAutoAmount(breakdown.frais_police, quote.devise),
    },
  ];

  const documentContent = buildQuoteDocument({
    title: "DEVIS PRÉVOYANCE DÉCÈS INDIVIDUELLE",
    productLabel: quote.productName,
    lines,
    amountLabel: "Prime totale",
    amountValue: amount,
  });

  return (
    <QuoteDownloadStep
      filename="devis-prevoyance-individuelle.txt"
      documentContent={documentContent}
      summaryAmountLabel="Montant du devis"
      summaryAmountValue={amount}
      onBack={onBack}
    />
  );
}
