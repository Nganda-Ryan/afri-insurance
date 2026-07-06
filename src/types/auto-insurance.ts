export type AutoFuelType = "essence" | "diesel";

export interface AutoPrimeDetails {
  rc: number;
  dr: number;
  ipt: number | null;
  prime_nette: number;
  accessoires: number;
  fichier_central: number | null;
  tva: number;
  carte_rose: number;
  prime_ttc: number;
}

export interface AutoTarifRow {
  puissance_essence: string | null;
  puissance_diesel: string | null;
  details_prime: AutoPrimeDetails;
}

export interface AutoDtaRow {
  min_cv: number;
  max_cv: number | null;
  montant: number;
}

export interface AutoDurationTarif {
  label: string;
  jours: number;
  tarifs: AutoTarifRow[];
}

export interface AutoMotoTarif {
  caracteristique: string;
  prime_ttc_annuelle: number;
}

export interface AutoCategory {
  id: string;
  nom: string;
  description: string;
  durees?: AutoDurationTarif[];
  dta_table?: AutoDtaRow[];
  tarifs_motos?: AutoMotoTarif[];
}

export interface AutoZone {
  nom: string;
  categories: AutoCategory[];
}

export interface AutoInsuranceProductData {
  document_info: {
    titre: string;
    compagnie: string;
    devise: string;
  };
  zones: AutoZone[];
}

export interface AutoQuoteFormInput {
  zoneNom: string;
  categoryId: string;
  durationLabel: string;
  fuelType: AutoFuelType;
  /** Libellé de tranche issu des tarifs (ex. « 7 à 10 CV »). */
  powerLabel: string;
  /** CV représentatif pour le DTA et l'affichage récap. */
  powerCv: number;
  motoCharacteristic?: string;
}

export interface AutoQuoteBreakdown {
  rc: number;
  dr: number;
  ipt: number;
  prime_annuelle: number;
  prime_nette: number;
  accessoires: number;
  fichier_central: number;
  tva: number;
  carte_rose: number;
  prime_ttc: number;
  dta: number;
  total_a_payer: number;
}

export interface AutoQuoteResult {
  zoneNom: string;
  categoryId: string;
  categoryNom: string;
  categoryDescription: string;
  durationLabel?: string;
  durationJours?: number;
  fuelType?: AutoFuelType;
  powerCv?: number;
  powerLabel?: string;
  motoCharacteristic?: string;
  devise: string;
  breakdown: AutoQuoteBreakdown;
}

export interface AutoQuoteSession {
  form: AutoQuoteFormInput;
  quote: AutoQuoteResult;
}
