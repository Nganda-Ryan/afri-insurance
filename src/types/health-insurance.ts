export type HealthPlanId = "SILVER" | "GOLD" | "PREMIUM";
export type HealthMemberType = "enfant" | "adulte";

export interface HealthMemberTarif {
  plafond: number;
  cotisation: number;
}

export interface HealthPlan {
  id: HealthPlanId;
  label: string;
  taux_couverture: number;
  tarifs: Record<HealthMemberType, HealthMemberTarif>;
}

export interface HealthInsuranceProductData {
  document_info: {
    titre: string;
    compagnie: string;
    devise: string;
  };
  plans: HealthPlan[];
}

export interface HealthQuoteFormInput {
  planId: HealthPlanId;
  adultCount: number;
  childCount: number;
}

export interface HealthQuoteBreakdown {
  taux_couverture: number;
  adultCount: number;
  childCount: number;
  cotisation_unitaire_adulte: number;
  cotisation_unitaire_enfant: number;
  plafond_adulte: number;
  plafond_enfant: number;
  sous_total_adultes: number;
  sous_total_enfants: number;
  cotisation_totale: number;
}

export interface HealthQuoteResult {
  planId: HealthPlanId;
  planLabel: string;
  devise: string;
  breakdown: HealthQuoteBreakdown;
}

export interface HealthQuoteSession {
  form: HealthQuoteFormInput;
  quote: HealthQuoteResult;
}
