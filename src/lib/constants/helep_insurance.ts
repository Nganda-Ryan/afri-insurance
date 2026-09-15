import type { HelepInsuranceData } from "@/types/helep-insurance";

/**
 * Données du produit AFRI HELEP (Protection des Personnes et des Engagements – Tontines).
 * Source : Fiche_Produit_AFRI_HELEP.pdf
 *
 * 3 formules avec capital forfaitaire identique pour Protection Personnes
 * et Protection Engagements :
 * - ESSENTIEL : 250 000 FCFA chacun, prime 4 500 FCFA/an
 * - CONFORT   : 500 000 FCFA chacun, prime 9 000 FCFA/an
 * - PREMIUM   : 750 000 FCFA chacun, prime 14 000 FCFA/an
 */
export const HELEP_INSURANCE_DATA: HelepInsuranceData = {
  document_info: {
    titre: "AFRI HELEP – Protection Tontines",
    compagnie: "AFRILIFE Insurance",
    devise: "FCFA",
  },
  formules: [
    {
      id: "ESSENTIEL",
      label: "HELEP ESSENTIEL",
      capital_personnes: 250_000,
      capital_engagements: 250_000,
      prime_annuelle: 4_500,
    },
    {
      id: "CONFORT",
      label: "HELEP CONFORT",
      capital_personnes: 500_000,
      capital_engagements: 500_000,
      prime_annuelle: 9_000,
    },
    {
      id: "PREMIUM",
      label: "HELEP PREMIUM",
      capital_personnes: 750_000,
      capital_engagements: 750_000,
      prime_annuelle: 14_000,
    },
  ],
  description:
    "Le produit AFRI HELEP garantit, en cas de Décès ou d'Invalidité Absolue et Définitive (IAD) d'un membre de tontine, le versement de deux capitaux forfaitaires : un capital Protection des Personnes (versé à la famille) et un capital Protection des Engagements (cotisations et/ou crédit).",
  min_membres_tontine: 20,
  duree_garantie_annees: 1,
};
