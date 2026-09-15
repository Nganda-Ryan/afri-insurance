"use client";

import { QuoteDownloadStep } from "@/components/Quote/sections/QuoteDownloadStep";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { buildQuoteDocument } from "@/lib/quote/download-quote-document";
import type { HelepQuoteResult } from "@/types/helep-insurance";

interface HelepQuoteDevisStepProps {
  quote: HelepQuoteResult;
  onBack: () => void;
}

export function HelepQuoteDevisStep({
  quote,
  onBack,
}: HelepQuoteDevisStepProps) {
  const { breakdown } = quote;
  const amount = formatAutoAmount(breakdown.prime_annuelle, quote.devise);

  const lines: Array<{ label: string; value: string }> = [
    { label: "Produit", value: quote.productName },
    { label: "Formule", value: breakdown.formuleLabel },
    {
      label: "Capital Protection des Personnes",
      value: formatAutoAmount(breakdown.capital_personnes, quote.devise),
    },
    {
      label: "Capital Protection des Engagements",
      value: formatAutoAmount(breakdown.capital_engagements, quote.devise),
    },
    {
      label: "Capital total",
      value: formatAutoAmount(breakdown.capital_total, quote.devise),
    },
  ];

  const documentContent = buildQuoteDocument({
    title: "DEVIS AFRI HELEP – PROTECTION TONTINES",
    productLabel: quote.productName,
    lines,
    amountLabel: "Prime annuelle",
    amountValue: amount,
  });

  return (
    <QuoteDownloadStep
      filename="devis-afri-helep.txt"
      documentContent={documentContent}
      summaryAmountLabel="Montant du devis"
      summaryAmountValue={amount}
      onBack={onBack}
    />
  );
}
