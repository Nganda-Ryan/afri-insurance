"use client";

import { QuoteDownloadStep } from "@/components/Quote/sections/QuoteDownloadStep";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import {
  buildQuoteDocument,
} from "@/lib/quote/download-quote-document";
import type { MrhQuoteResult } from "@/types/mrh-insurance";

interface MrhQuoteDevisStepProps {
  quote: MrhQuoteResult;
  onBack: () => void;
}

export function MrhQuoteDevisStep({ quote, onBack }: MrhQuoteDevisStepProps) {
  const amount = formatAutoAmount(quote.breakdown.prime_ttc, quote.devise);

  const lines: Array<{ label: string; value: string }> = [
    { label: "Profil", value: quote.profilLabel },
    { label: "Tranche tarifaire", value: quote.tarifLabel },
    { label: "Garanties", value: quote.garanties.join(", ") },
    {
      label: "Prime nette",
      value: formatAutoAmount(quote.breakdown.prime_nette, quote.devise),
    },
  ];

  const documentContent = buildQuoteDocument({
    title: "DEVIS ASSURANCE MULTIRISQUE HABITATION",
    productLabel: "Multirisque habitation",
    lines,
    amountLabel: "Prime TTC",
    amountValue: amount,
  });

  return (
    <QuoteDownloadStep
      filename="devis-assurance-habitation.txt"
      documentContent={documentContent}
      summaryAmountLabel="Montant du devis"
      summaryAmountValue={amount}
      onBack={onBack}
    />
  );
}
