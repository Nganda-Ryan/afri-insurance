import type { HealthInsuranceProductData, HealthPlanId } from "@/types/health-insurance";

export const HEALTH_INSURANCE_PRODUCT_DATA: HealthInsuranceProductData = {
  document_info: {
    titre: "TARIF Assurance santé",
    compagnie: "AFRI INSURANCE",
    devise: "FCFA",
  },
  plans: [
    {
      id: "SILVER",
      label: "Silver",
      taux_couverture: 0.8,
      tarifs: {
        enfant: { plafond: 500000, cotisation: 65450 },
        adulte: { plafond: 1000000, cotisation: 129250 },
      },
    },
    {
      id: "GOLD",
      label: "Gold",
      taux_couverture: 0.9,
      tarifs: {
        enfant: { plafond: 1000000, cotisation: 125950 },
        adulte: { plafond: 2000000, cotisation: 247500 },
      },
    },
    {
      id: "PREMIUM",
      label: "Premium",
      taux_couverture: 1,
      tarifs: {
        enfant: { plafond: 2000000, cotisation: 195250 },
        adulte: { plafond: 3000000, cotisation: 385000 },
      },
    },
  ],
};

export const HEALTH_PLAN_LABELS: Record<HealthPlanId, string> = {
  SILVER: "Silver",
  GOLD: "Gold",
  PREMIUM: "Premium",
};

export function formatHealthCoverageRate(rate: number): string {
  return `${Math.round(rate * 100)} %`;
}
