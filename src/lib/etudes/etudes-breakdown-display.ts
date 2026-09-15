import type { QuoteAmountBreakdownRow } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { EtudesQuoteBreakdown } from "@/types/etudes-insurance";

export function getEtudesBreakdownTableRows(
  breakdown: EtudesQuoteBreakdown,
  devise: string,
): QuoteAmountBreakdownRow[] {
  const dureeLabel =
    breakdown.duree_service === 1
      ? "1 an"
      : `${breakdown.duree_service} ans`;

  return [
    {
      label: "Rente annuelle",
      value: formatAutoAmount(breakdown.rente_annuelle, devise),
    },
    {
      label: "Durée du service de la rente",
      value: dureeLabel,
    },
    {
      label: "Cotisation annuelle",
      value: formatAutoAmount(breakdown.cotisation, devise),
      highlight: true,
    },
  ];
}
