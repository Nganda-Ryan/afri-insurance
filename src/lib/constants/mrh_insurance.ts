import type { MrhInsuranceData } from "@/types/mrh-insurance";

export const MRH_INSURANCE_DATA: MrhInsuranceData = {
  document_info: {
    titre: "TARIF MULTIRISQUE HABITATION",
    compagnie: "AFRI INSURANCE",
    devise: "FCFA",
  },
  profils_assurance: [
    {
      id: "PROPRIETAIRE_OCCUPANT",
      label: "Propriétaire Occupant",
      garanties_incluses: ["INC", "DE", "TOC", "VOL", "DDE", "BDG", "RCCF"],
      tarifs: [
        {
          valeur_batiment: 10000000,
          valeur_contenu: 1000000,
          prime_nette: 14873,
          prime_ttc: 23698,
        },
        {
          valeur_batiment: 15000000,
          valeur_contenu: 1500000,
          prime_nette: 20434,
          prime_ttc: 30330,
        },
      ],
    },
    {
      id: "PROPRIETAIRE_NON_OCCUPANT",
      label: "Propriétaire Non Occupant",
      garanties_incluses: ["INC", "DE", "TOC", "DDE", "BDG", "RCPI"],
      tarifs: [
        {
          valeur_batiment: 10000000,
          valeur_contenu: 1000000,
          prime_nette: 14873,
          prime_ttc: 18332,
        },
      ],
    },
    {
      id: "LOCATAIRE",
      label: "Locataire",
      garanties_incluses: ["INC", "DE", "TOC", "VOL", "DDE", "BDG", "RCCF"],
      tarifs: [
        {
          loyer_mensuel: 50000,
          valeur_contenu: 500000,
          prime_nette: 14873,
          prime_ttc: 18962,
        },
        {
          loyer_mensuel: 75000,
          valeur_contenu: 750000,
          prime_nette: 20434,
          prime_ttc: 23226,
        },
      ],
    },
  ],
  note_bas_de_page: "Au delà : Consulter le siège",
};

export const MRH_GARANTIE_LABELS: Record<string, string> = {
  INC: "Incendie",
  DE: "Dégâts des eaux",
  TOC: "Tempête, ouragan, cyclone",
  VOL: "Vol",
  DDE: "Dommages électriques",
  BDG: "Bris de glace",
  RCCF: "RC chef de famille",
  RCPI: "RC propriétaire immeuble",
};
