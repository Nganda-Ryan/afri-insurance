export interface MrhProprietaireTarif {
  valeur_batiment: number;
  valeur_contenu: number;
  prime_nette: number;
  prime_ttc: number;
}

export interface MrhLocataireTarif {
  loyer_mensuel: number;
  valeur_contenu: number;
  prime_nette: number;
  prime_ttc: number;
}

export type MrhTarifRow = MrhProprietaireTarif | MrhLocataireTarif;

export interface MrhProfil {
  id: string;
  label: string;
  garanties_incluses: string[];
  tarifs: MrhTarifRow[];
}

export interface MrhInsuranceData {
  document_info: {
    titre: string;
    compagnie: string;
    devise: string;
  };
  profils_assurance: MrhProfil[];
  note_bas_de_page: string;
}

export interface MrhQuoteFormInput {
  profilId: string;
  tarifIndex: number;
}

export interface MrhQuoteBreakdown {
  prime_nette: number;
  prime_ttc: number;
  valeur_batiment?: number;
  valeur_contenu?: number;
  loyer_mensuel?: number;
}

export interface MrhQuoteResult {
  profilId: string;
  profilLabel: string;
  garanties: string[];
  tarifIndex: number;
  tarifLabel: string;
  devise: string;
  breakdown: MrhQuoteBreakdown;
}

export interface MrhQuoteSession {
  form: MrhQuoteFormInput;
  quote: MrhQuoteResult;
}

export function isMrhLocataireTarif(tarif: MrhTarifRow): tarif is MrhLocataireTarif {
  return "loyer_mensuel" in tarif;
}
