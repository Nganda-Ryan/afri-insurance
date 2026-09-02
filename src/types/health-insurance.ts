export type HealthPlanId = "SILVER" | "GOLD" | "PREMIUM";
export type HealthMemberType = "enfant" | "adulte";

export interface HealthMemberTarif {
  plafond: number;
  cotisation: number;
}

/** One guarantee line for a given plan */
export interface HealthGuaranteeItem {
  category: string;          // e.g. "CONSULTATIONS"
  label: string;             // e.g. "Consultations (Généraliste, Spécialiste, Urgence)"
  value: string;             // the coverage description for this plan
  note?: string;             // optional extra info (délai de carence, etc.)
}

export interface HealthPlan {
  id: HealthPlanId;
  label: string;
  taux_couverture: number;
  tarifs: Record<HealthMemberType, HealthMemberTarif>;
  /** All guarantees specific to this formula */
  garanties: HealthGuaranteeItem[];
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
  /** Guarantees of the selected plan – ready for the recap */
  garanties: HealthGuaranteeItem[];
}

export interface HealthQuoteSession {
  form: HealthQuoteFormInput;
  quote: HealthQuoteResult;
}







// export type HealthPlanId = "SILVER" | "GOLD" | "PREMIUM";
// export type HealthMemberType = "enfant" | "adulte";

// export interface HealthMemberTarif {
//   plafond: number;
//   cotisation: number;
// }

// export interface HealthPlan {
//   id: HealthPlanId;
//   label: string;
//   taux_couverture: number;
//   tarifs: Record<HealthMemberType, HealthMemberTarif>;
// }

// export interface HealthInsuranceProductData {
//   document_info: {
//     titre: string;
//     compagnie: string;
//     devise: string;
//   };
//   plans: HealthPlan[];
// }

// export interface HealthQuoteFormInput {
//   planId: HealthPlanId;
//   adultCount: number;
//   childCount: number;
// }

// export interface HealthQuoteBreakdown {
//   taux_couverture: number;
//   adultCount: number;
//   childCount: number;
//   cotisation_unitaire_adulte: number;
//   cotisation_unitaire_enfant: number;
//   plafond_adulte: number;
//   plafond_enfant: number;
//   sous_total_adultes: number;
//   sous_total_enfants: number;
//   cotisation_totale: number;
// }

// export interface HealthQuoteResult {
//   planId: HealthPlanId;
//   planLabel: string;
//   devise: string;
//   breakdown: HealthQuoteBreakdown;
// }

// export interface HealthQuoteSession {
//   form: HealthQuoteFormInput;
//   quote: HealthQuoteResult;
// }
