"use client";

import { QuoteDownloadStep } from "@/components/Quote/sections/QuoteDownloadStep";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { isAutoMotoCategory } from "@/lib/auto/calculate-auto-quote";
import {
  buildQuoteDocument,
} from "@/lib/quote/download-quote-document";
import type { AutoQuoteResult } from "@/types/auto-insurance";

interface AutoQuoteDevisStepProps {
  quote: AutoQuoteResult;
  onBack: () => void;
}

export function AutoQuoteDevisStep({ quote, onBack }: AutoQuoteDevisStepProps) {
  const isMoto = isAutoMotoCategory(quote.zoneNom, quote.categoryId);
  const amount = formatAutoAmount(quote.breakdown.total_a_payer, quote.devise);

  const lines: Array<{ label: string; value: string }> = [
    { label: "Zone", value: quote.zoneNom },
    { label: "Catégorie", value: quote.categoryNom },
  ];

  if (quote.durationLabel) {
    lines.push({ label: "Durée", value: quote.durationLabel });
  }
  if (quote.fuelType) {
    lines.push({
      label: "Énergie",
      value: quote.fuelType === "diesel" ? "Diesel" : "Essence",
    });
  }
  if (quote.powerLabel) {
    lines.push({ label: "Puissance fiscale", value: quote.powerLabel });
  }
  if (quote.motoCharacteristic) {
    lines.push({ label: "Caractéristique", value: quote.motoCharacteristic });
  }
  if (!isMoto) {
    lines.push(
      { label: "Prime nette", value: formatAutoAmount(quote.breakdown.prime_nette, quote.devise) },
      { label: "Prime TTC", value: formatAutoAmount(quote.breakdown.prime_ttc, quote.devise) },
    );
  }

  const documentContent = buildQuoteDocument({
    title: "DEVIS ASSURANCE AUTOMOBILE",
    productLabel: "Assurance automobile",
    lines,
    amountLabel: "Total à payer",
    amountValue: amount,
  });

  return (
    <QuoteDownloadStep
      filename="devis-assurance-automobile.txt"
      documentContent={documentContent}
      summaryAmountLabel="Montant du devis"
      summaryAmountValue={amount}
      onBack={onBack}
    />
  );
}
