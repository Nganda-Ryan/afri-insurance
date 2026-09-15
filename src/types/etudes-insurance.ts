export interface EtudesTarifRow {
  rente_annuelle: number;
  duree_service: number; // en années (3, 5, 7, 10, 15)
  cotisation: number;
}

export interface EtudesInsuranceProductData {
  document_info: {
    titre: string;
    compagnie: string;
    devise: string;
  };
  /** Tranches de rente annuelle possibles */
  rentes_annuelles: number[];
  /** Durées de service de la rente (en années) */
  durees_service: number[];
  /** Tableau des cotisations : rente_annuelle → durée → cotisation */
  tarifs: EtudesTarifRow[];
  description: string;
  /** Âge min du souscripteur (parent/tuteur) */
  age_min_souscripteur: number;
  /** Âge max du souscripteur (parent/tuteur) */
  age_max_souscripteur: number;
  /** Âge max du bénéficiaire (élève) à la souscription */
  age_max_beneficiaire: number;
}

export interface EtudesQuoteFormInput {
  rente_annuelle: number;
  duree_service: number;
}

export interface EtudesQuoteBreakdown {
  rente_annuelle: number;
  duree_service: number;
  cotisation: number;
}

export interface EtudesQuoteResult {
  productName: string;
  devise: string;
  breakdown: EtudesQuoteBreakdown;
}

export interface EtudesQuoteSession {
  form: EtudesQuoteFormInput;
  quote: EtudesQuoteResult;
}
