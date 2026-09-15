export type AccidentClass = 1 | 2 | 3 | 4 | 5;

export interface AccidentClassInfo {
  id: AccidentClass;
  label: string;
  description: string;
}

export interface AccidentClassTarif {
  classe: AccidentClass;
  /** Taux per mille du capital décès */
  deces: number;
  /** Taux per mille du capital infirmité permanente totale */
  ipt: number;
  /** Taux per mille du capital frais médicaux */
  frais_medicaux: number;
  /** Taux per franc du capital indemnité quotidienne */
  indemnite_quotidienne: number;
}

export interface AccidentDurationOption {
  mois_min: number;
  mois_max: number;
  label: string;
  /** Facteur appliqué à la prime annuelle */
  facteur: number;
}

export interface AccidentGroupDiscount {
  min_personnes: number;
  max_personnes: number | null;
  label: string;
  /** Pourcentage de rabais */
  rabais: number;
}

export interface AccidentInsuranceData {
  document_info: {
    titre: string;
    compagnie: string;
    devise: string;
  };
  classes: AccidentClassInfo[];
  tarifs: AccidentClassTarif[];
  durees: AccidentDurationOption[];
  rabais_groupe: AccidentGroupDiscount[];
  /** Plafond frais médicaux (en % du cumul décès + IPT) */
  fm_plafond_pourcentage: number;
  /** Plafond frais médicaux absolu (FCFA) */
  fm_plafond_absolu: number;
  /** Règle du quart pour mille pour l'indemnité quotidienne */
  iq_quart_pour_mille: number;
  /** Plafond indemnité quotidienne (FCFA) */
  iq_plafond: number;
  /** Franchise frais médicaux (FCFA) */
  franchise_fm: number;
  /** Franchise indemnité quotidienne (jours) */
  franchise_iq_jours: number[];
  /** Majoration moto / sports dangereux (%) */
  majoration_25: number;
  /** Surprime âge > 60 ans (%) */
  surprime_age: number;
}

export interface AccidentQuoteFormInput {
  classe: AccidentClass;
  capital_deces: number;
  capital_ipt: number;
  duree_mois: number;
  has_majoration_25: boolean;
  has_surprime_age: boolean;
}

export interface AccidentQuoteBreakdown {
  classe: AccidentClass;
  classe_label: string;
  capital_deces: number;
  capital_ipt: number;
  capital_fm: number;
  capital_iq: number;
  prime_deces: number;
  prime_ipt: number;
  prime_fm: number;
  prime_iq: number;
  prime_nette: number;
  duree_mois: number;
  duree_label: string;
  duree_facteur: number;
  has_majoration_25: boolean;
  majoration_25: number;
  has_surprime_age: boolean;
  surprime_age: number;
  prime_totale: number;
}

export interface AccidentQuoteResult {
  productName: string;
  devise: string;
  breakdown: AccidentQuoteBreakdown;
}

export interface AccidentQuoteSession {
  form: AccidentQuoteFormInput;
  quote: AccidentQuoteResult;
}
