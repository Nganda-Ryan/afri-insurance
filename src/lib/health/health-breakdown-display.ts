import type { QuoteAmountBreakdownRow } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { formatHealthCoverageRate } from "@/lib/constants/health_insurance";
import type { HealthQuoteBreakdown } from "@/types/health-insurance";

export function getHealthBreakdownTableRows(
  breakdown: HealthQuoteBreakdown,
  devise: string,
): QuoteAmountBreakdownRow[] {
  const rows: QuoteAmountBreakdownRow[] = [
    {
      label: "Taux de couverture",
      value: formatHealthCoverageRate(breakdown.taux_couverture),
    },
    {
      label: "Plafond adulte",
      value: formatAutoAmount(breakdown.plafond_adulte, devise),
    },
    {
      label: "Plafond enfant",
      value: formatAutoAmount(breakdown.plafond_enfant, devise),
    },
  ];

  if (breakdown.adultCount > 0) {
    rows.push({
      label: `${breakdown.adultCount} adulte${breakdown.adultCount > 1 ? "s" : ""} × cotisation`,
      value: formatAutoAmount(breakdown.sous_total_adultes, devise),
    });
  }

  if (breakdown.childCount > 0) {
    rows.push({
      label: `${breakdown.childCount} enfant${breakdown.childCount > 1 ? "s" : ""} × cotisation`,
      value: formatAutoAmount(breakdown.sous_total_enfants, devise),
    });
  }

  rows.push({
    label: "Cotisation totale",
    value: formatAutoAmount(breakdown.cotisation_totale, devise),
    highlight: true,
  });

  return rows;
}
