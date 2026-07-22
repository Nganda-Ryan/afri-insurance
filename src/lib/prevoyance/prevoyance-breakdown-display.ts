import type { QuoteAmountBreakdownRow } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { PrevoyanceQuoteBreakdown } from "@/types/prevoyance-insurance";

export function getPrevoyanceBreakdownTableRows(
  breakdown: PrevoyanceQuoteBreakdown,
  devise: string,
): QuoteAmountBreakdownRow[] {
  return [
    {
      label: "Capital assuré",
      value: formatAutoAmount(breakdown.capital, devise),
    },
    {
      label: "Âge à la souscription",
      value: `${breakdown.age} ans`,
    },
    {
      label: "Durée du contrat",
      value:
        breakdown.durationYears === 1
          ? "1 an"
          : `${breakdown.durationYears} ans`,
    },
    {
      label: "Prime de risque",
      value: formatAutoAmount(breakdown.prime_risque, devise),
    },
    {
      label: "Frais de police",
      value: formatAutoAmount(breakdown.frais_police, devise),
    },
    {
      label: "Prime totale",
      value: formatAutoAmount(breakdown.prime_totale, devise),
      highlight: true,
    },
  ];
}
