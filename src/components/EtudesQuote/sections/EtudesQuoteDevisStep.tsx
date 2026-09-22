"use client";

import { QuoteDownloadStep } from "@/components/Quote/sections/QuoteDownloadStep";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { buildQuoteDocument } from "@/lib/quote/download-quote-document";
import type { EtudesQuoteResult } from "@/types/etudes-insurance";

interface EtudesQuoteDevisStepProps {
  quote: EtudesQuoteResult;
  onBack: () => void;
}

export function EtudesQuoteDevisStep({
  quote,
  onBack,
}: EtudesQuoteDevisStepProps) {
  const { breakdown } = quote;
  const amount = formatAutoAmount(breakdown.cotisation, quote.devise);
  const dureeLabel =
    breakdown.duree_service === 1
      ? "1 an"
      : `${breakdown.duree_service} ans`;

  const lines: Array<{ label: string; value: string }> = [
    { label: "Produit", value: quote.productName },
    {
      label: "Rente annuelle",
      value: formatAutoAmount(breakdown.rente_annuelle, quote.devise),
    },
    { label: "Durée du service de la rente", value: dureeLabel },
    {
      label: "Cotisation annuelle",
      value: formatAutoAmount(breakdown.cotisation, quote.devise),
    },
  ];

  const documentContent = buildQuoteDocument({
    title: "DEVIS Afrikids Etudes – RENTE ÉDUCATION",
    productLabel: quote.productName,
    lines,
    amountLabel: "Cotisation annuelle",
    amountValue: amount,
  });

  return (
    <QuoteDownloadStep
      filename="devis-afrikids-etudes.txt"
      documentContent={documentContent}
      summaryAmountLabel="Montant du devis"
      summaryAmountValue={amount}
      onBack={onBack}
    />
  );
}
