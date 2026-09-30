import type { QuoteAmountBreakdownRow } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { HemleQuoteBreakdown } from "@/types/hemle-insurance";

export function getHemleBreakdownTableRows(
  breakdown: HemleQuoteBreakdown,
  devise: string,
): QuoteAmountBreakdownRow[] {
  const rows: QuoteAmountBreakdownRow[] = [
    { label: "Formule choisie", value: breakdown.formuleLabel },
    { label: "Personnes couvertes", value: breakdown.couverture },
    { label: "Option", value: breakdown.optionLabel },
    {
      label: "Capital Frais Funéraires",
      value: formatAutoAmount(breakdown.capital_garanti, devise),
    },
  ];

  if (breakdown.enfant) {
    rows.push({
      label: `Add-on ${breakdown.enfant.label} (${breakdown.enfant.couverture})`,
      value: formatAutoAmount(breakdown.enfant.capital_garanti, devise),
    });
  }

  rows.push(
    {
      label: "Capital Frais Funéraires total",
      value: formatAutoAmount(breakdown.capital_total, devise),
      highlight: true,
    },
    {
      label: "Prime annuelle TTC",
      value: formatAutoAmount(breakdown.prime_annuelle, devise),
    },
  );

  if (breakdown.enfant) {
    rows.push({
      label: "Prime annuelle TTC Solo Enfant",
      value: formatAutoAmount(breakdown.enfant.prime_annuelle, devise),
    });
  }

  rows.push({
    label: "Prime annuelle TTC totale",
    value: formatAutoAmount(breakdown.prime_totale, devise),
    highlight: true,
  });

  return rows;
}
