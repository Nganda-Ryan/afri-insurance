import type { HealthInsuranceProductData, HealthPlanId } from "@/types/health-insurance";

export const HEALTH_INSURANCE_PRODUCT_DATA: HealthInsuranceProductData = {
  document_info: {
    titre: "TARIF Assurance santé",
    compagnie: "AFRI INSURANCE",
    devise: "FCFA",
  },
  plans: [
    {
      id: "SILVER",
      label: "Silver",
      taux_couverture: 0.8,
      tarifs: {
        enfant: { plafond: 500_000, cotisation: 65_450 },
        adulte: { plafond: 1_000_000, cotisation: 129_250 },
      },
      garanties: [
        // CONSULTATIONS
        {
          category: "CONSULTATIONS",
          label: "Consultations (Généraliste, Spécialiste, Urgence)",
          value: "80 % de 100 000 FCFA / an",
          note: "Suivant convention SINAMEC",
        },
        // PHARMACIE, IMAGERIES & EXAMENS
        {
          category: "PHARMACIE, IMAGERIES & EXAMENS",
          label: "Pharmacie",
          value: "Frais réels (80 % du plafond annuel)",
        },
        {
          category: "PHARMACIE, IMAGERIES & EXAMENS",
          label: "Radiologie & spécialité (K/Z)",
          value: "1 000 FCFA / acte",
        },
        {
          category: "PHARMACIE, IMAGERIES & EXAMENS",
          label: "Analyses médicales (B)",
          value: "260 FCFA / acte",
        },
        // PRÉVENTION & TRAITEMENTS SPÉCIAUX
        {
          category: "PRÉVENTION & TRAITEMENTS SPÉCIAUX",
          label: "Vaccination (prévention)",
          value: "Exclu",
        },
        {
          category: "PRÉVENTION & TRAITEMENTS SPÉCIAUX",
          label: "Traitement antiviral",
          value: "Exclu",
        },
        {
          category: "PRÉVENTION & TRAITEMENTS SPÉCIAUX",
          label: "Kinésithérapie / Rééducation",
          value: "Exclu",
          note: "5 000 FCFA / séance",
        },
        // HOSPITALISATION
        {
          category: "HOSPITALISATION",
          label: "Nombre de prises en charge",
          value: "2 / an",
          note: "Limitée à 3 jours par hospitalisation – Délai de carence 3 mois (sauf accident)",
        },
        {
          category: "HOSPITALISATION",
          label: "Hébergement (chambre)",
          value: "15 000 FCFA / jour",
        },
        {
          category: "HOSPITALISATION",
          label: "Soins en hospitalisation médicale ou chirurgicale",
          value: "80 % des frais réels",
        },
        // MATERNITÉ
        {
          category: "MATERNITÉ",
          label: "Suivi prénatal (3 échographies + 3 visites + 3 bilans)",
          value: "80 % de 100 000 FCFA",
          note: "Délai de carence : 12 mois",
        },
        {
          category: "MATERNITÉ",
          label: "Accouchement simple",
          value: "100 000 FCFA",
        },
        {
          category: "MATERNITÉ",
          label: "Accouchement gémellaire",
          value: "150 000 FCFA",
        },
        {
          category: "MATERNITÉ",
          label: "Accouchement chirurgical",
          value: "250 000 FCFA",
        },
        // OPTIQUE
        {
          category: "OPTIQUE",
          label: "Verres et montures",
          value: "75 000 FCFA / 2 ans",
          note: "Délai de carence 3 mois – Exclusion dioptries ±0,25 et verres de lecture",
        },
        // SOINS DENTAIRES
        {
          category: "SOINS DENTAIRES",
          label: "Soins conservateurs",
          value: "75 000 FCFA / an",
          note: "Entente préalable requise",
        },
        {
          category: "SOINS DENTAIRES",
          label: "Prothèses dentaires",
          value: "Exclues",
        },
        // PROTHÈSES AUTRES
        {
          category: "PROTHÈSES AUTRES",
          label: "Prothèses uniquement internes",
          value: "75 000 FCFA / an",
          note: "Maladies postetadhésion uniquement",
        },
        {
          category: "PROTHÈSES AUTRES",
          label: "Petits appareillages et prothèses externes",
          value: "Exclus",
        },
        // TRANSPORT
        {
          category: "TRANSPORT MÉDICALISÉ",
          label: "Ambulance / déplacement médicalisé",
          value: "20 000 FCFA / déplacement – 2 / an",
        },
        // DEUXIÈME AVIS
        {
          category: "DEUXIÈME AVIS MÉDICAL",
          label: "Deuxième avis médical",
          value: "100 % des frais réels",
        },
      ],
    },
    {
      id: "GOLD",
      label: "Gold",
      taux_couverture: 0.9,
      tarifs: {
        enfant: { plafond: 1_000_000, cotisation: 125_950 },
        adulte: { plafond: 2_000_000, cotisation: 247_500 },
      },
      garanties: [
        {
          category: "CONSULTATIONS",
          label: "Consultations (Généraliste, Spécialiste, Urgence)",
          value: "90 % de 200 000 FCFA / an",
          note: "Suivant convention SINAMEC",
        },
        {
          category: "PHARMACIE, IMAGERIES & EXAMENS",
          label: "Pharmacie",
          value: "Frais réels (90 % du plafond annuel)",
        },
        {
          category: "PHARMACIE, IMAGERIES & EXAMENS",
          label: "Radiologie & spécialité (K/Z)",
          value: "1 000 FCFA / acte",
        },
        {
          category: "PHARMACIE, IMAGERIES & EXAMENS",
          label: "Analyses médicales (B)",
          value: "260 FCFA / acte",
        },
        {
          category: "PRÉVENTION & TRAITEMENTS SPÉCIAUX",
          label: "Vaccination (prévention)",
          value: "Exclu",
        },
        {
          category: "PRÉVENTION & TRAITEMENTS SPÉCIAUX",
          label: "Traitement antiviral",
          value: "Exclu",
        },
        {
          category: "PRÉVENTION & TRAITEMENTS SPÉCIAUX",
          label: "Kinésithérapie / Rééducation",
          value: "20 séances max / an",
          note: "5 000 FCFA / séance",
        },
        {
          category: "HOSPITALISATION",
          label: "Nombre de prises en charge",
          value: "3 / an",
          note: "Limitée à 3 jours par hospitalisation – Délai de carence 3 mois (sauf accident)",
        },
        {
          category: "HOSPITALISATION",
          label: "Hébergement (chambre)",
          value: "20 000 FCFA / jour",
        },
        {
          category: "HOSPITALISATION",
          label: "Soins en hospitalisation médicale ou chirurgicale",
          value: "90 % des frais réels",
        },
        {
          category: "MATERNITÉ",
          label: "Suivi prénatal (3 échographies + 3 visites + 3 bilans)",
          value: "90 % de 200 000 FCFA",
          note: "Délai de carence : 12 mois",
        },
        {
          category: "MATERNITÉ",
          label: "Accouchement simple",
          value: "150 000 FCFA",
        },
        {
          category: "MATERNITÉ",
          label: "Accouchement gémellaire",
          value: "200 000 FCFA",
        },
        {
          category: "MATERNITÉ",
          label: "Accouchement chirurgical",
          value: "300 000 FCFA",
        },
        {
          category: "OPTIQUE",
          label: "Verres et montures",
          value: "80 000 FCFA / 2 ans",
          note: "Délai de carence 3 mois – Exclusion dioptries ±0,25 et verres de lecture",
        },
        {
          category: "SOINS DENTAIRES",
          label: "Soins conservateurs",
          value: "80 000 FCFA / an",
          note: "Entente préalable requise",
        },
        {
          category: "SOINS DENTAIRES",
          label: "Prothèses dentaires",
          value: "60 000 FCFA / an",
        },
        {
          category: "PROTHÈSES AUTRES",
          label: "Prothèses uniquement internes",
          value: "150 000 FCFA / an",
          note: "Maladies postetadhésion uniquement",
        },
        {
          category: "PROTHÈSES AUTRES",
          label: "Petits appareillages et prothèses externes",
          value: "Exclus",
        },
        {
          category: "TRANSPORT MÉDICALISÉ",
          label: "Ambulance / déplacement médicalisé",
          value: "25 000 FCFA / déplacement et 2 / an",
        },
        {
          category: "DEUXIÈME AVIS MÉDICAL",
          label: "Deuxième avis médical",
          value: "100 % des frais réels",
        },
      ],
    },
    {
      id: "PREMIUM",
      label: "Premium",
      taux_couverture: 1,
      tarifs: {
        enfant: { plafond: 2_000_000, cotisation: 195_250 },
        adulte: { plafond: 3_000_000, cotisation: 385_000 },
      },
      garanties: [
        {
          category: "CONSULTATIONS",
          label: "Consultations (Généraliste, Spécialiste, Urgence)",
          value: "Plafond annuel",
          note: "Suivant convention SINAMEC",
        },
        {
          category: "PHARMACIE, IMAGERIES & EXAMENS",
          label: "Pharmacie",
          value: "Frais réels (plafond annuel)",
        },
        {
          category: "PHARMACIE, IMAGERIES & EXAMENS",
          label: "Radiologie & spécialité (K/Z)",
          value: "1 200 FCFA / acte",
        },
        {
          category: "PHARMACIE, IMAGERIES & EXAMENS",
          label: "Analyses médicales (B)",
          value: "260 FCFA / acte",
        },
        {
          category: "PRÉVENTION & TRAITEMENTS SPÉCIAUX",
          label: "Vaccination (prévention)",
          value: "Enfant < 7 ans",
        },
        {
          category: "PRÉVENTION & TRAITEMENTS SPÉCIAUX",
          label: "Traitement antiviral",
          value: "500 000 FCFA / an",
        },
        {
          category: "PRÉVENTION & TRAITEMENTS SPÉCIAUX",
          label: "Kinésithérapie / Rééducation",
          value: "40 séances max / an",
          note: "5 000 FCFA / séance",
        },
        {
          category: "HOSPITALISATION",
          label: "Nombre de prises en charge",
          value: "Plafond annuel",
          note: "Limitée à 3 jours par hospitalisation et Délai de carence 3 mois (sauf accident)",
        },
        {
          category: "HOSPITALISATION",
          label: "Hébergement (chambre)",
          value: "30 000 FCFA / jour",
        },
        {
          category: "HOSPITALISATION",
          label: "Soins en hospitalisation médicale ou chirurgicale",
          value: "100 % des frais réels",
        },
        {
          category: "MATERNITÉ",
          label: "Suivi prénatal (3 échographies + 3 visites + 3 bilans)",
          value: "Plafond annuel",
          note: "Délai de carence : 12 mois",
        },
        {
          category: "MATERNITÉ",
          label: "Accouchement simple",
          value: "200 000 FCFA",
        },
        {
          category: "MATERNITÉ",
          label: "Accouchement gémellaire",
          value: "250 000 FCFA",
        },
        {
          category: "MATERNITÉ",
          label: "Accouchement chirurgical",
          value: "350 000 FCFA",
        },
        {
          category: "OPTIQUE",
          label: "Verres et montures",
          value: "100 000 FCFA / 2 ans",
          note: "Délai de carence 3 mois et Exclusion dioptries ±0,25 et verres de lecture",
        },
        {
          category: "SOINS DENTAIRES",
          label: "Soins conservateurs",
          value: "150 000 FCFA / an",
          note: "Entente préalable requise",
        },
        {
          category: "SOINS DENTAIRES",
          label: "Prothèses dentaires",
          value: "100 000 FCFA / an",
        },
        {
          category: "PROTHÈSES AUTRES",
          label: "Prothèses uniquement internes",
          value: "200 000 FCFA / an",
          note: "Maladies postetadhésion uniquement",
        },
        {
          category: "PROTHÈSES AUTRES",
          label: "Petits appareillages et prothèses externes",
          value: "Exclus",
        },
        {
          category: "TRANSPORT MÉDICALISÉ",
          label: "Ambulance / déplacement médicalisé",
          value: "30 000 FCFA / déplacement (3/an)",
        },
        {
          category: "DEUXIÈME AVIS MÉDICAL",
          label: "Deuxième avis médical",
          value: "100 % des frais réels",
        },
      ],
    },
  ],
};

export const HEALTH_PLAN_LABELS: Record<HealthPlanId, string> = {
  SILVER: "Silver",
  GOLD: "Gold",
  PREMIUM: "Premium",
};

export function formatHealthCoverageRate(rate: number): string {
  return `${Math.round(rate * 100)} %`;
}







// import type { HealthInsuranceProductData, HealthPlanId } from "@/types/healthetinsurance";

// export const HEALTH_INSURANCE_PRODUCT_DATA: HealthInsuranceProductData = {
//   document_info: {
//     titre: "TARIF Assurance santé",
//     compagnie: "AFRI INSURANCE",
//     devise: "FCFA",
//   },
//   plans: [
//     {
//       id: "SILVER",
//       label: "Silver",
//       taux_couverture: 0.8,
//       tarifs: {
//         enfant: { plafond: 500000, cotisation: 65450 },
//         adulte: { plafond: 1000000, cotisation: 129250 },
//       },
//     },
//     {
//       id: "GOLD",
//       label: "Gold",
//       taux_couverture: 0.9,
//       tarifs: {
//         enfant: { plafond: 1000000, cotisation: 125950 },
//         adulte: { plafond: 2000000, cotisation: 247500 },
//       },
//     },
//     {
//       id: "PREMIUM",
//       label: "Premium",
//       taux_couverture: 1,
//       tarifs: {
//         enfant: { plafond: 2000000, cotisation: 195250 },
//         adulte: { plafond: 3000000, cotisation: 385000 },
//       },
//     },
//   ],
// };

// export const HEALTH_PLAN_LABELS: Record<HealthPlanId, string> = {
//   SILVER: "Silver",
//   GOLD: "Gold",
//   PREMIUM: "Premium",
// };

// export function formatHealthCoverageRate(rate: number): string {
//   return `${Math.round(rate * 100)} %`;
// }
