import type { EtudesInsuranceProductData } from "@/types/etudes-insurance";

/**
 * Données tarifaires du produit AFRIKIDS ETUDES (Rente Éducation).
 * Source : Fiche_Produit_AFRIKIDS_ETUDES-Distribution_Ecole.pdf
 *
 * Tableau des cotisations (FCFA) :
 * - Lignes : rente annuelle (montant versé à l'élève par an)
 * - Colonnes : durée du service de la rente (en années)
 */
export const ETUDES_INSURANCE_PRODUCT_DATA: EtudesInsuranceProductData = {
  document_info: {
    titre: "AFRIKIDS ETUDES – Rente Éducation",
    compagnie: "AFRILIFE Insurance",
    devise: "FCFA",
  },
  rentes_annuelles: [
    100_000,
    150_000,
    200_000,
    250_000,
    300_000,
    400_000,
    500_000,
    1_000_000,
  ],
  durees_service: [3, 5, 7, 10, 15],
  tarifs: [
    // Rente 100 000 FCFA
    { rente_annuelle: 100_000, duree_service: 3, cotisation: 3_000 },
    { rente_annuelle: 100_000, duree_service: 5, cotisation: 5_000 },
    { rente_annuelle: 100_000, duree_service: 7, cotisation: 6_500 },
    { rente_annuelle: 100_000, duree_service: 10, cotisation: 9_000 },
    { rente_annuelle: 100_000, duree_service: 15, cotisation: 12_500 },
    // Rente 150 000 FCFA
    { rente_annuelle: 150_000, duree_service: 3, cotisation: 4_500 },
    { rente_annuelle: 150_000, duree_service: 5, cotisation: 7_500 },
    { rente_annuelle: 150_000, duree_service: 7, cotisation: 10_000 },
    { rente_annuelle: 150_000, duree_service: 10, cotisation: 13_500 },
    { rente_annuelle: 150_000, duree_service: 15, cotisation: 18_500 },
    // Rente 200 000 FCFA
    { rente_annuelle: 200_000, duree_service: 3, cotisation: 6_000 },
    { rente_annuelle: 200_000, duree_service: 5, cotisation: 9_500 },
    { rente_annuelle: 200_000, duree_service: 7, cotisation: 13_000 },
    { rente_annuelle: 200_000, duree_service: 10, cotisation: 18_000 },
    { rente_annuelle: 200_000, duree_service: 15, cotisation: 24_500 },
    // Rente 250 000 FCFA
    { rente_annuelle: 250_000, duree_service: 3, cotisation: 7_500 },
    { rente_annuelle: 250_000, duree_service: 5, cotisation: 12_000 },
    { rente_annuelle: 250_000, duree_service: 7, cotisation: 16_500 },
    { rente_annuelle: 250_000, duree_service: 10, cotisation: 22_000 },
    { rente_annuelle: 250_000, duree_service: 15, cotisation: 31_000 },
    // Rente 300 000 FCFA
    { rente_annuelle: 300_000, duree_service: 3, cotisation: 9_000 },
    { rente_annuelle: 300_000, duree_service: 5, cotisation: 14_500 },
    { rente_annuelle: 300_000, duree_service: 7, cotisation: 19_500 },
    { rente_annuelle: 300_000, duree_service: 10, cotisation: 26_500 },
    { rente_annuelle: 300_000, duree_service: 15, cotisation: 37_000 },
    // Rente 400 000 FCFA
    { rente_annuelle: 400_000, duree_service: 3, cotisation: 12_000 },
    { rente_annuelle: 400_000, duree_service: 5, cotisation: 19_000 },
    { rente_annuelle: 400_000, duree_service: 7, cotisation: 26_000 },
    { rente_annuelle: 400_000, duree_service: 10, cotisation: 36_000 },
    { rente_annuelle: 400_000, duree_service: 15, cotisation: 49_000 },
    // Rente 500 000 FCFA
    { rente_annuelle: 500_000, duree_service: 3, cotisation: 15_000 },
    { rente_annuelle: 500_000, duree_service: 5, cotisation: 24_000 },
    { rente_annuelle: 500_000, duree_service: 7, cotisation: 32_500 },
    { rente_annuelle: 500_000, duree_service: 10, cotisation: 44_500 },
    { rente_annuelle: 500_000, duree_service: 15, cotisation: 62_000 },
    // Rente 1 000 000 FCFA
    { rente_annuelle: 1_000_000, duree_service: 3, cotisation: 30_000 },
    { rente_annuelle: 1_000_000, duree_service: 5, cotisation: 48_000 },
    { rente_annuelle: 1_000_000, duree_service: 7, cotisation: 64_500 },
    { rente_annuelle: 1_000_000, duree_service: 10, cotisation: 88_000 },
    { rente_annuelle: 1_000_000, duree_service: 15, cotisation: 130_000 },
  ],
  description:
    "Le produit AFRIKIDS ETUDES garantit le versement d'une rente annuelle pendant la durée choisie, qui servira au paiement des frais de scolarité ainsi que les fournitures scolaires de l'enfant en cas de Décès ou Invalidité Absolue et Définitive (IAD) de son parent ou tuteur.",
  age_min_souscripteur: 18,
  age_max_souscripteur: 65,
  age_max_beneficiaire: 21,
};
