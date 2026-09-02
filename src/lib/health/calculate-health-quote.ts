import {
  formatHealthCoverageRate,
  HEALTH_INSURANCE_PRODUCT_DATA,
} from "@/lib/constants/health_insurance";
import type {
  HealthPlan,
  HealthPlanId,
  HealthQuoteFormInput,
  HealthQuoteResult,
} from "@/types/health-insurance";

function findPlan(planId: string): HealthPlan | undefined {
  return HEALTH_INSURANCE_PRODUCT_DATA.plans.find((plan) => plan.id === planId);
}

function isValidPlanId(planId: string): planId is HealthPlanId {
  return findPlan(planId) != null;
}

export function calculateHealthQuote(
  input: HealthQuoteFormInput,
): HealthQuoteResult | null {
  const plan = findPlan(input.planId);
  if (!plan) return null;

  const adultCount = Math.max(0, Math.floor(input.adultCount));
  const childCount = Math.max(0, Math.floor(input.childCount));
  if (adultCount + childCount < 1) return null;

  const { adulte, enfant } = plan.tarifs;
  const sous_total_adultes = adultCount * adulte.cotisation;
  const sous_total_enfants = childCount * enfant.cotisation;

  return {
    planId: plan.id,
    planLabel: plan.label,
    devise: HEALTH_INSURANCE_PRODUCT_DATA.document_info.devise,
    breakdown: {
      taux_couverture: plan.taux_couverture,
      adultCount,
      childCount,
      cotisation_unitaire_adulte: adulte.cotisation,
      cotisation_unitaire_enfant: enfant.cotisation,
      plafond_adulte: adulte.plafond,
      plafond_enfant: enfant.plafond,
      sous_total_adultes,
      sous_total_enfants,
      cotisation_totale: sous_total_adultes + sous_total_enfants,
    },
    // ← NEW: pass the guarantees of the selected plan
    garanties: plan.garanties,
  };
}

export function getHealthPlanOptions() {
  return HEALTH_INSURANCE_PRODUCT_DATA.plans.map((plan) => ({
    value: plan.id,
    label: `${plan.label} (${formatHealthCoverageRate(plan.taux_couverture)})`,
  }));
}

export function parseHealthPlanId(value: string): HealthPlanId | null {
  return isValidPlanId(value) ? value : null;
}




// import {
//   formatHealthCoverageRate,
//   HEALTH_INSURANCE_PRODUCT_DATA,
// } from "@/lib/constants/health_insurance";
// import type {
//   HealthPlan,
//   HealthPlanId,
//   HealthQuoteFormInput,
//   HealthQuoteResult,
// } from "@/types/health-insurance";

// function findPlan(planId: string): HealthPlan | undefined {
//   return HEALTH_INSURANCE_PRODUCT_DATA.plans.find((plan) => plan.id === planId);
// }

// function isValidPlanId(planId: string): planId is HealthPlanId {
//   return findPlan(planId) != null;
// }

// export function calculateHealthQuote(
//   input: HealthQuoteFormInput,
// ): HealthQuoteResult | null {
//   const plan = findPlan(input.planId);
//   if (!plan) return null;

//   const adultCount = Math.max(0, Math.floor(input.adultCount));
//   const childCount = Math.max(0, Math.floor(input.childCount));
//   if (adultCount + childCount < 1) return null;

//   const { adulte, enfant } = plan.tarifs;
//   const sous_total_adultes = adultCount * adulte.cotisation;
//   const sous_total_enfants = childCount * enfant.cotisation;

//   return {
//     planId: plan.id,
//     planLabel: plan.label,
//     devise: HEALTH_INSURANCE_PRODUCT_DATA.document_info.devise,
//     breakdown: {
//       taux_couverture: plan.taux_couverture,
//       adultCount,
//       childCount,
//       cotisation_unitaire_adulte: adulte.cotisation,
//       cotisation_unitaire_enfant: enfant.cotisation,
//       plafond_adulte: adulte.plafond,
//       plafond_enfant: enfant.plafond,
//       sous_total_adultes,
//       sous_total_enfants,
//       cotisation_totale: sous_total_adultes + sous_total_enfants,
//     },
//   };
// }

// export function getHealthPlanOptions() {
//   return HEALTH_INSURANCE_PRODUCT_DATA.plans.map((plan) => ({
//     value: plan.id,
//     label: `${plan.label} (${formatHealthCoverageRate(plan.taux_couverture)})`,
//   }));
// }

// export function parseHealthPlanId(value: string): HealthPlanId | null {
//   return isValidPlanId(value) ? value : null;
// }
