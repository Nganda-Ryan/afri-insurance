import type { QuoteAmountBreakdownRow } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { HelepQuoteBreakdown } from "@/types/helep-insurance";

export function getHelepBreakdownTableRows(
  breakdown: HelepQuoteBreakdown,
  devise: string,
): QuoteAmountBreakdownRow[] {
  return [
    {
      label: "Formule choisie",
      value: breakdown.formuleLabel,
    },
    {
      label: "Capital Protection des Personnes",
      value: formatAutoAmount(breakdown.capital_personnes, devise),
    },
    {
      label: "Capital Protection des Engagements",
      value: formatAutoAmount(breakdown.capital_engagements, devise),
    },
    {
      label: "Capital total",
      value: formatAutoAmount(breakdown.capital_total, devise),
      highlight: true,
    },
    {
      label: "Prime annuelle",
      value: formatAutoAmount(breakdown.prime_annuelle, devise),
      highlight: true,
    },
  ];
}
