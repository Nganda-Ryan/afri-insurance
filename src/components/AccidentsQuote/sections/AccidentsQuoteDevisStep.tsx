"use client";

import { QuoteDownloadStep } from "@/components/Quote/sections/QuoteDownloadStep";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { buildQuoteDocument } from "@/lib/quote/download-quote-document";
import type { AccidentQuoteResult } from "@/types/accidents-insurance";

interface AccidentsQuoteDevisStepProps {
  quote: AccidentQuoteResult;
  onBack: () => void;
}

export function AccidentsQuoteDevisStep({
  quote,
  onBack,
}: AccidentsQuoteDevisStepProps) {
  const { breakdown } = quote;
  const amount = formatAutoAmount(breakdown.prime_totale, quote.devise);

  const lines: Array<{ label: string; value: string }> = [
    { label: "Produit", value: quote.productName },
    { label: "Classe de risque", value: breakdown.classe_label },
    {
      label: "Capital décès",
      value: formatAutoAmount(breakdown.capital_deces, quote.devise),
    },
    {
      label: "Capital infirmité permanente",
      value: formatAutoAmount(breakdown.capital_ipt, quote.devise),
    },
    {
      label: "Capital frais médicaux",
      value: formatAutoAmount(breakdown.capital_fm, quote.devise),
    },
    {
      label: "Capital indemnité quotidienne",
      value: `${breakdown.capital_iq.toLocaleString("fr-FR")} ${quote.devise}/jour`,
    },
    { label: "Durée", value: breakdown.duree_label },
    {
      label: "Prime nette",
      value: formatAutoAmount(breakdown.prime_nette, quote.devise),
    },
  ];

  if (breakdown.has_majoration_25) {
    lines.push({
      label: "Majoration moto/sports dangereux (+25%)",
      value: formatAutoAmount(breakdown.majoration_25, quote.devise),
    });
  }
  if (breakdown.has_surprime_age) {
    lines.push({
      label: "Surprime âge > 60 ans (+10%)",
      value: formatAutoAmount(breakdown.surprime_age, quote.devise),
    });
  }

  const documentContent = buildQuoteDocument({
    title: "DEVIS ASSURANCE INDIVIDUELLE ACCIDENTS",
    productLabel: quote.productName,
    lines,
    amountLabel: "Prime totale",
    amountValue: amount,
  });

  return (
    <QuoteDownloadStep
      filename="devis-individuelle-accidents.txt"
      documentContent={documentContent}
      summaryAmountLabel="Montant du devis"
      summaryAmountValue={amount}
      onBack={onBack}
    />
  );
}
