import type {
  MrhInsuranceData,
  MrhLocataireTarif,
  MrhProprietaireTarif,
} from "@/types/mrh-insurance";

interface MrhProprietaireTarifSource {
  valeur_batiment: number;
  valeur_contenu: number;
  pn: number;
  pttc: number;
}

interface MrhLocataireTarifSource {
  loyer_mensuel: number;
  valeur_contenu: number;
  pn: number;
  pttc: number;
}

const MRH_TARIFS_SOURCE = {
  afri_insurance_mrh_tarifs: {
    proprietaire_occupant: [
      { valeur_batiment: 10000000, valeur_contenu: 1000000, pn: 14873, pttc: 23698 },
      { valeur_batiment: 15000000, valeur_contenu: 1500000, pn: 20434, pttc: 30330 },
      { valeur_batiment: 20000000, valeur_contenu: 2000000, pn: 25995, pttc: 36962 },
      { valeur_batiment: 25000000, valeur_contenu: 2500000, pn: 31556, pttc: 43593 },
      { valeur_batiment: 30000000, valeur_contenu: 3000000, pn: 37118, pttc: 56188 },
      { valeur_batiment: 35000000, valeur_contenu: 3500000, pn: 42679, pttc: 62819 },
      { valeur_batiment: 40000000, valeur_contenu: 4000000, pn: 48240, pttc: 69451 },
      { valeur_batiment: 45000000, valeur_contenu: 4500000, pn: 53801, pttc: 76083 },
      { valeur_batiment: 50000000, valeur_contenu: 5000000, pn: 59363, pttc: 82715 },
      { valeur_batiment: 55000000, valeur_contenu: 5500000, pn: 64924, pttc: 89347 },
      { valeur_batiment: 60000000, valeur_contenu: 6000000, pn: 70485, pttc: 95978 },
      { valeur_batiment: 65000000, valeur_contenu: 6500000, pn: 76046, pttc: 102610 },
      { valeur_batiment: 70000000, valeur_contenu: 7000000, pn: 81608, pttc: 109242 },
      { valeur_batiment: 75000000, valeur_contenu: 7500000, pn: 87169, pttc: 115874 },
      { valeur_batiment: 80000000, valeur_contenu: 8000000, pn: 92730, pttc: 122506 },
      { valeur_batiment: 85000000, valeur_contenu: 8500000, pn: 98291, pttc: 129137 },
      { valeur_batiment: 90000000, valeur_contenu: 9000000, pn: 103853, pttc: 135769 },
      { valeur_batiment: 95000000, valeur_contenu: 9500000, pn: 109414, pttc: 142401 },
      { valeur_batiment: 100000000, valeur_contenu: 10000000, pn: 114975, pttc: 149033 },
    ],
    proprietaire_non_occupant: [
      { valeur_batiment: 10000000, valeur_contenu: 1000000, pn: 14873, pttc: 18332 },
      { valeur_batiment: 15000000, valeur_contenu: 1500000, pn: 20434, pttc: 22280 },
      { valeur_batiment: 20000000, valeur_contenu: 2000000, pn: 25995, pttc: 26229 },
      { valeur_batiment: 25000000, valeur_contenu: 2500000, pn: 31556, pttc: 30178 },
      { valeur_batiment: 30000000, valeur_contenu: 3000000, pn: 37118, pttc: 40089 },
      { valeur_batiment: 35000000, valeur_contenu: 3500000, pn: 42679, pttc: 44038 },
      { valeur_batiment: 40000000, valeur_contenu: 4000000, pn: 48240, pttc: 47986 },
      { valeur_batiment: 45000000, valeur_contenu: 4500000, pn: 53801, pttc: 51935 },
      { valeur_batiment: 50000000, valeur_contenu: 5000000, pn: 59363, pttc: 55884 },
      { valeur_batiment: 55000000, valeur_contenu: 5500000, pn: 64924, pttc: 59832 },
      { valeur_batiment: 60000000, valeur_contenu: 6000000, pn: 70485, pttc: 63781 },
      { valeur_batiment: 65000000, valeur_contenu: 6500000, pn: 76046, pttc: 67730 },
      { valeur_batiment: 70000000, valeur_contenu: 7000000, pn: 81608, pttc: 71678 },
      { valeur_batiment: 75000000, valeur_contenu: 7500000, pn: 87169, pttc: 75627 },
      { valeur_batiment: 80000000, valeur_contenu: 8000000, pn: 92730, pttc: 79576 },
      { valeur_batiment: 85000000, valeur_contenu: 8500000, pn: 98291, pttc: 83524 },
      { valeur_batiment: 90000000, valeur_contenu: 9000000, pn: 103853, pttc: 87473 },
      { valeur_batiment: 95000000, valeur_contenu: 9500000, pn: 109414, pttc: 91422 },
      { valeur_batiment: 100000000, valeur_contenu: 10000000, pn: 114975, pttc: 95370 },
    ],
    locataire: [
      { loyer_mensuel: 50000, valeur_contenu: 500000, pn: 14873, pttc: 18962 },
      { loyer_mensuel: 75000, valeur_contenu: 750000, pn: 20434, pttc: 23226 },
      { loyer_mensuel: 100000, valeur_contenu: 1000000, pn: 25995, pttc: 27490 },
      { loyer_mensuel: 125000, valeur_contenu: 1250000, pn: 31556, pttc: 31754 },
      { loyer_mensuel: 150000, valeur_contenu: 1500000, pn: 37118, pttc: 41980 },
      { loyer_mensuel: 175000, valeur_contenu: 1750000, pn: 42679, pttc: 46244 },
      { loyer_mensuel: 200000, valeur_contenu: 2000000, pn: 48240, pttc: 50508 },
      { loyer_mensuel: 225000, valeur_contenu: 2250000, pn: 53801, pttc: 54772 },
      { loyer_mensuel: 250000, valeur_contenu: 2500000, pn: 59363, pttc: 59036 },
      { loyer_mensuel: 275000, valeur_contenu: 2750000, pn: 64924, pttc: 63300 },
      { loyer_mensuel: 300000, valeur_contenu: 3000000, pn: 70485, pttc: 67564 },
      { loyer_mensuel: 325000, valeur_contenu: 3250000, pn: 76046, pttc: 71828 },
      { loyer_mensuel: 350000, valeur_contenu: 3500000, pn: 81608, pttc: 76092 },
      { loyer_mensuel: 375000, valeur_contenu: 3750000, pn: 87169, pttc: 80356 },
      { loyer_mensuel: 400000, valeur_contenu: 4000000, pn: 92730, pttc: 84620 },
      { loyer_mensuel: 425000, valeur_contenu: 4250000, pn: 98291, pttc: 8884 },
      { loyer_mensuel: 450000, valeur_contenu: 4500000, pn: 103853, pttc: 93148 },
      { loyer_mensuel: 475000, valeur_contenu: 4750000, pn: 109414, pttc: 97412 },
      { loyer_mensuel: 500000, valeur_contenu: 5000000, pn: 114975, pttc: 101676 },
    ],
  },
  metadata: {
    devise: "XAF",
    regle_limite:
      "Au delà du maximum listé, consulter le siège pour tarification personnalisée.",
  },
} as const;

function mapProprietaireTarifs(
  rows: readonly MrhProprietaireTarifSource[],
): MrhProprietaireTarif[] {
  return rows.map((row) => ({
    valeur_batiment: row.valeur_batiment,
    valeur_contenu: row.valeur_contenu,
    prime_nette: row.pn,
    prime_ttc: row.pttc,
  }));
}

function mapLocataireTarifs(rows: readonly MrhLocataireTarifSource[]): MrhLocataireTarif[] {
  return rows.map((row) => ({
    loyer_mensuel: row.loyer_mensuel,
    valeur_contenu: row.valeur_contenu,
    prime_nette: row.pn,
    prime_ttc: row.loyer_mensuel === 425000 && row.pttc === 8884 ? 88884 : row.pttc,
  }));
}

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
      tarifs: mapProprietaireTarifs(
        MRH_TARIFS_SOURCE.afri_insurance_mrh_tarifs.proprietaire_occupant,
      ),
    },
    {
      id: "PROPRIETAIRE_NON_OCCUPANT",
      label: "Propriétaire Non Occupant",
      garanties_incluses: ["INC", "DE", "TOC", "DDE", "BDG", "RCPI"],
      tarifs: mapProprietaireTarifs(
        MRH_TARIFS_SOURCE.afri_insurance_mrh_tarifs.proprietaire_non_occupant,
      ),
    },
    {
      id: "LOCATAIRE",
      label: "Locataire",
      garanties_incluses: ["INC", "DE", "TOC", "VOL", "DDE", "BDG", "RCCF"],
      tarifs: mapLocataireTarifs(MRH_TARIFS_SOURCE.afri_insurance_mrh_tarifs.locataire),
    },
  ],
  note_bas_de_page: MRH_TARIFS_SOURCE.metadata.regle_limite,
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
