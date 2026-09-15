export type HelepFormuleId = "ESSENTIEL" | "CONFORT" | "PREMIUM";

export interface HelepFormule {
  id: HelepFormuleId;
  label: string;
  /** Capital Protection des Personnes (versé à la famille) */
  capital_personnes: number;
  /** Capital Protection des Engagements (cotisations/crédit) */
  capital_engagements: number;
  /** Prime annuelle */
  prime_annuelle: number;
}

export interface HelepInsuranceData {
  document_info: {
    titre: string;
    compagnie: string;
    devise: string;
  };
  formules: HelepFormule[];
  description: string;
  /** Nombre minimum de membres dans la tontine */
  min_membres_tontine: number;
  /** Durée de la garantie en années */
  duree_garantie_annees: number;
}

export interface HelepQuoteFormInput {
  formuleId: HelepFormuleId;
}

export interface HelepQuoteBreakdown {
  formuleId: HelepFormuleId;
  formuleLabel: string;
  capital_personnes: number;
  capital_engagements: number;
  capital_total: number;
  prime_annuelle: number;
}

export interface HelepQuoteResult {
  productName: string;
  devise: string;
  breakdown: HelepQuoteBreakdown;
}

export interface HelepQuoteSession {
  form: HelepQuoteFormInput;
  quote: HelepQuoteResult;
}
