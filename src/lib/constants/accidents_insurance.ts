import type { AccidentInsuranceData } from "@/types/accidents-insurance";

/**
 * Données tarifaires du produit INDIVIDUELLE ACCIDENTS.
 * Source : Tarif Individuelle Accidents.pdf
 *
 * 5 classes de risque selon la profession :
 * - Classe 1 : Aucun travail manuel (bureau, professions libérales)
 * - Classe 2 : Déplacements professionnels ou travail manuel léger
 * - Classe 3 : Travail manuel avec outils/marchandises dangereuses
 * - Classe 4 : Activités dangereuses (haute tension, travaux en hauteur)
 * - Classe 5 : Activités particulièrement dangereuses (explosifs, démolition)
 */
export const ACCIDENTS_INSURANCE_DATA: AccidentInsuranceData = {
  document_info: {
    titre: "Assurance Individuelle Accidents",
    compagnie: "AFRILIFE Insurance",
    devise: "FCFA",
  },
  classes: [
    {
      id: 1,
      label: "Classe 1",
      description:
        "Aucun travail manuel professionnel. Emploi administratif ou de bureau, professions libérales, enseignants non techniques.",
    },
    {
      id: 2,
      label: "Classe 2",
      description:
        "Déplacements professionnels habituels ou travail manuel léger sans manipulation de marchandises dangereuses. Représentants de commerce, artisans, pharmaciens.",
    },
    {
      id: 3,
      label: "Classe 3",
      description:
        "Travail manuel avec manipulation de marchandises dangereuses et utilisation d'outils dangereux. Artisans, conducteurs, déménageurs, vétérinaires.",
    },
    {
      id: 4,
      label: "Classe 4",
      description:
        "Travail manuel dans le cadre d'activités dangereuses. Travaux en hauteur, électriciens haute tension, sapeurs-pompiers.",
    },
    {
      id: 5,
      label: "Classe 5",
      description:
        "Travail manuel dans le cadre d'activités particulièrement dangereuses. Abattage d'arbres, explosifs, démolition, mines.",
    },
  ],
  tarifs: [
    { classe: 1, deces: 0.9, ipt: 0.9, frais_medicaux: 20, indemnite_quotidienne: 2 },
    { classe: 2, deces: 1.25, ipt: 1.25, frais_medicaux: 30, indemnite_quotidienne: 3 },
    { classe: 3, deces: 1.5, ipt: 1.5, frais_medicaux: 40, indemnite_quotidienne: 4 },
    { classe: 4, deces: 2.0, ipt: 2.0, frais_medicaux: 50, indemnite_quotidienne: 5 },
    { classe: 5, deces: 2.3, ipt: 2.3, frais_medicaux: 60, indemnite_quotidienne: 6 },
  ],
  durees: [
    { mois_min: 1, mois_max: 3, label: "1 à 3 mois", facteur: 0.6 },
    { mois_min: 4, mois_max: 6, label: "4 à 6 mois", facteur: 0.8 },
    { mois_min: 7, mois_max: 9, label: "7 à 9 mois", facteur: 0.9 },
    { mois_min: 10, mois_max: 12, label: "Annuel (10-12 mois)", facteur: 1.0 },
  ],
  rabais_groupe: [
    { min_personnes: 5, max_personnes: 10, label: "5 à 10 personnes", rabais: 5 },
    { min_personnes: 11, max_personnes: 25, label: "11 à 25 personnes", rabais: 10 },
    { min_personnes: 26, max_personnes: 50, label: "26 à 50 personnes", rabais: 15 },
    { min_personnes: 51, max_personnes: 100, label: "51 à 100 personnes", rabais: 20 },
    { min_personnes: 101, max_personnes: null, label: "Plus de 100 personnes", rabais: 30 },
  ],
  fm_plafond_pourcentage: 5,
  fm_plafond_absolu: 1_000_000,
  iq_quart_pour_mille: 0.00025,
  iq_plafond: 50_000,
  franchise_fm: 10_000,
  franchise_iq_jours: [15, 30],
  majoration_25: 25,
  surprime_age: 10,
};
