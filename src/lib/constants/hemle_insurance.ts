import type { HemleInsuranceData } from "@/types/hemle-insurance";

/**
 * Données du produit Afri Hemle (Capital garanti / Assuré).
 * Source : AFRI Hemle.xlsx
 *
 * 3 formules (Capi, Couple, Duo Parent) × 3 options (Essentiel, Confort,
 * Premium) avec capital garanti de 500 000 / 1 000 000 / 2 000 000 FCFA,
 * plus l'add-on « Solo Enfant » (option Unique) souscrit avec une formule.
 */
export const HEMLE_INSURANCE_DATA: HemleInsuranceData = {
  document_info: {
    titre: "Afri Hemle",
    compagnie: "AFRILIFE Insurance",
    devise: "FCFA",
  },
  formules: [
    {
      id: "CAPI",
      label: "Capi",
      couverture: "Assuré principal",
      tarifs: [
        {
          optionId: "ESSENTIEL",
          optionLabel: "Essentiel",
          capital_garanti: 500_000,
          prime_annuelle: 4_500,
        },
        {
          optionId: "CONFORT",
          optionLabel: "Confort",
          capital_garanti: 1_000_000,
          prime_annuelle: 9_000,
        },
        {
          optionId: "PREMIUM",
          optionLabel: "Premium",
          capital_garanti: 2_000_000,
          prime_annuelle: 17_500,
        },
      ],
    },
    {
      id: "COUPLE",
      label: "Couple",
      couverture: "Assuré principal + conjoint",
      tarifs: [
        {
          optionId: "ESSENTIEL",
          optionLabel: "Essentiel",
          capital_garanti: 500_000,
          prime_annuelle: 9_000,
        },
        {
          optionId: "CONFORT",
          optionLabel: "Confort",
          capital_garanti: 1_000_000,
          prime_annuelle: 17_500,
        },
        {
          optionId: "PREMIUM",
          optionLabel: "Premium",
          capital_garanti: 2_000_000,
          prime_annuelle: 35_000,
        },
      ],
    },
    {
      id: "DUO_PARENT",
      label: "Duo Parent",
      couverture:
        "Assuré principal + son père ou sa mère ou un de ses beaux-parents",
      tarifs: [
        {
          optionId: "ESSENTIEL",
          optionLabel: "Essentiel",
          capital_garanti: 500_000,
          prime_annuelle: 21_500,
        },
        {
          optionId: "CONFORT",
          optionLabel: "Confort",
          capital_garanti: 1_000_000,
          prime_annuelle: 43_000,
        },
        {
          optionId: "PREMIUM",
          optionLabel: "Premium",
          capital_garanti: 2_000_000,
          prime_annuelle: 86_000,
        },
      ],
    },
  ],
  enfant: {
    id: "SOLO_ENFANT",
    label: "Solo Enfant",
    couverture: "Enfant du souscripteur âgé de 12 à 25 ans",
    optionLabel: "Unique",
    capital_garanti: 500_000,
    prime_annuelle: 2_500,
  },
  description:
    "Le produit AFRI HEMLE garantit, en cas de décès toutes causes de l'assuré ou des assurés couverts, le versement au(x) bénéficiaire(s) d'une indemnité dite « Capital Frais Funéraires », forfaitaire et connue à l'avance, afin d'offrir à l'assuré ou à ses proches des obsèques dignes.",
  age_enfant_min: 12,
  age_enfant_max: 25,
};
