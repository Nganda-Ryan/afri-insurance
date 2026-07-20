import type { QuoteAmountBreakdownRow } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import {
  formatHealthCoverageRate,
  HEALTH_INSURANCE_PRODUCT_DATA,
} from "@/lib/constants/health_insurance";
import type { HealthQuoteBreakdown } from "@/types/health-insurance";

export function getHealthBreakdownTableRows(
  breakdown: HealthQuoteBreakdown,
  devise: string,
): QuoteAmountBreakdownRow[] {
  // Safe lookup for active plan from HEALTH_INSURANCE_PRODUCT_DATA
  const targetPlanId = (breakdown as Record<string, any>).plan_id ?? (breakdown as Record<string, any>).planId;
  const planData = HEALTH_INSURANCE_PRODUCT_DATA.plans.find((p) => p.id === targetPlanId);

  // Fallback to breakdown properties if available, otherwise read from product JSON
  const unitCotisationAdulte =
    breakdown.cotisation_unitaire_adulte ?? planData?.tarifs.adulte.cotisation ?? 0;
  const unitCotisationEnfant =
    breakdown.cotisation_unitaire_enfant ?? planData?.tarifs.enfant.cotisation ?? 0;

  const adultCount = breakdown.adultCount ?? (breakdown as Record<string, any>).nombre_adultes ?? 0;
  const childCount = breakdown.childCount ?? (breakdown as Record<string, any>).nombre_enfants ?? 0;

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

  // 1. Adult Base Unit Rate + Subtotal Row
  if (adultCount > 0) {
    rows.push({
      label: "Cotisation adulte",
      value: formatAutoAmount(unitCotisationAdulte, devise),
    });

    const totalAdulte = breakdown.sous_total_adultes ?? adultCount * unitCotisationAdulte;
    rows.push({
      label: `Sous-total adulte (${adultCount} x ${formatAutoAmount(unitCotisationAdulte, devise)})`,
      value: formatAutoAmount(totalAdulte, devise),
    });
  }

  // 2. Child Base Unit Rate + Subtotal Row
  if (childCount > 0) {
    rows.push({
      label: "Cotisation enfant",
      value: formatAutoAmount(unitCotisationEnfant, devise),
    });

    const totalEnfant = breakdown.sous_total_enfants ?? childCount * unitCotisationEnfant;
    rows.push({
      label: `Sous-total enfant (${childCount} x ${formatAutoAmount(unitCotisationEnfant, devise)})`,
      value: formatAutoAmount(totalEnfant, devise),
    });
  }

  // 3. Total Cotisation
  rows.push({
    label: "Cotisation totale",
    value: formatAutoAmount(
      breakdown.cotisation_totale ?? (breakdown as Record<string, any>).prime_ttc,
      devise,
    ),
    highlight: true,
  });

  return rows;
}