export type HemleFormuleId = "CAPI" | "COUPLE" | "DUO_PARENT";

export type HemleOptionId = "ESSENTIEL" | "CONFORT" | "PREMIUM";

export interface HemleTarif {
  optionId: HemleOptionId;
  optionLabel: string;
  /** Capital Frais Funéraires (capital garanti / Assuré – FCFA) */
  capital_garanti: number;
  /** Prime annuelle TTC (FCFA) */
  prime_annuelle: number;
}

export interface HemleFormule {
  id: HemleFormuleId;
  label: string;
  /** Personnes couvertes par la formule */
  couverture: string;
  tarifs: HemleTarif[];
}

/** Add-on « Solo Enfant », souscrit obligatoirement avec une formule. */
export interface HemleEnfantAddOn {
  id: "SOLO_ENFANT";
  label: string;
  couverture: string;
  optionLabel: string;
  capital_garanti: number;
  prime_annuelle: number;
}

export interface HemleInsuranceData {
  document_info: {
    titre: string;
    compagnie: string;
    devise: string;
  };
  formules: HemleFormule[];
  enfant: HemleEnfantAddOn;
  description: string;
  /** Tranche d'âge de l'enfant couvert par l'option Solo Enfant */
  age_enfant_min: number;
  age_enfant_max: number;
}

export interface HemleQuoteFormInput {
  formuleId: HemleFormuleId;
  optionId: HemleOptionId;
  /** Ajout de l'option Solo Enfant (souscrite avec une formule) */
  avecEnfant: boolean;
}

export interface HemleQuoteBreakdown {
  formuleId: HemleFormuleId;
  formuleLabel: string;
  couverture: string;
  optionId: HemleOptionId;
  optionLabel: string;
  capital_garanti: number;
  prime_annuelle: number;
  /** Option Solo Enfant incluse, ou null */
  enfant: {
    label: string;
    couverture: string;
    capital_garanti: number;
    prime_annuelle: number;
  } | null;
  capital_total: number;
  prime_totale: number;
}

export interface HemleQuoteResult {
  productName: string;
  devise: string;
  breakdown: HemleQuoteBreakdown;
}

export interface HemleQuoteSession {
  form: HemleQuoteFormInput;
  quote: HemleQuoteResult;
}
