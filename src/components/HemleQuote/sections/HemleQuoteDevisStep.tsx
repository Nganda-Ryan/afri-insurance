"use client";

import { QuoteDownloadStep } from "@/components/Quote/sections/QuoteDownloadStep";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { buildQuoteDocument } from "@/lib/quote/download-quote-document";
import type { HemleQuoteResult } from "@/types/hemle-insurance";

interface HemleQuoteDevisStepProps {
  quote: HemleQuoteResult;
  onBack: () => void;
}

export function HemleQuoteDevisStep({
  quote,
  onBack,
}: HemleQuoteDevisStepProps) {
  const { breakdown } = quote;
  const amount = formatAutoAmount(breakdown.prime_totale, quote.devise);

  const lines: Array<{ label: string; value: string }> = [
    { label: "Formule", value: breakdown.formuleLabel },
    { label: "Personnes couvertes", value: breakdown.couverture },
    { label: "Option", value: breakdown.optionLabel },
    {
      label: "Capital Frais Funéraires",
      value: formatAutoAmount(breakdown.capital_garanti, quote.devise),
    },
  ];

  if (breakdown.enfant) {
    lines.push(
      {
        label: `Add-on ${breakdown.enfant.label}`,
        value: breakdown.enfant.couverture,
      },
      {
        label: "Capital Frais Funéraires Solo Enfant",
        value: formatAutoAmount(breakdown.enfant.capital_garanti, quote.devise),
      },
      {
        label: "Prime annuelle TTC Solo Enfant",
        value: formatAutoAmount(
          breakdown.enfant.prime_annuelle,
          quote.devise,
        ),
      },
    );
  }

  lines.push({
    label: "Capital Frais Funéraires total",
    value: formatAutoAmount(breakdown.capital_total, quote.devise),
  });

  const documentContent = buildQuoteDocument({
    title: "DEVIS Afri Hemle – CAPITAL FRAIS FUNÉRAIRES",
    productLabel: quote.productName,
    lines,
    amountLabel: "Prime annuelle TTC totale",
    amountValue: amount,
  });

  return (
    <QuoteDownloadStep
      filename="devis-afri-hemle.txt"
      documentContent={documentContent}
      summaryAmountLabel="Prime annuelle TTC totale"
      summaryAmountValue={amount}
      onBack={onBack}
    />
  );
}
