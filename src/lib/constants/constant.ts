/* TRIP CATEGORIES — valeurs API + codes URL courts */

export const TRIP_PRODUCT_CATEGORY_STANDARD = "Standard";
export const TRIP_PRODUCT_CATEGORY_STUDENT = "Etudiant";
export const TRIP_PRODUCT_CATEGORY_PILGRIMAGE = "Pèlerinage";

/** Codes URL pour chaque option du select « Catégorie de produit ». */
export const TRIP_PRODUCT_CATEGORY_CODE_STANDARD = "std";
export const TRIP_PRODUCT_CATEGORY_CODE_STUDENT = "etu";
export const TRIP_PRODUCT_CATEGORY_CODE_PILGRIMAGE = "pel";

export const TRIP_PRODUCT_CATEGORY_OPTIONS = [
  {
    label: "Standard",
    value: TRIP_PRODUCT_CATEGORY_STANDARD,
    code: TRIP_PRODUCT_CATEGORY_CODE_STANDARD,
  },
  {
    label: "Etudiant",
    value: TRIP_PRODUCT_CATEGORY_STUDENT,
    code: TRIP_PRODUCT_CATEGORY_CODE_STUDENT,
  },
  {
    label: "Pèlerinage",
    value: TRIP_PRODUCT_CATEGORY_PILGRIMAGE,
    code: TRIP_PRODUCT_CATEGORY_CODE_PILGRIMAGE,
  },
] as const;

/** Codes URL pour le module produit (barre latérale). */
export const QUOTE_PRODUCT_CODE_TRAVEL = "voyage";
export const QUOTE_PRODUCT_CODE_HOME = "habitation";
export const QUOTE_PRODUCT_CODE_AUTO = "auto";
export const QUOTE_PRODUCT_CODE_PET = "animaux";

/** Codes URL pour chaque étape du wizard devis voyage. */
export const QUOTE_WIZARD_STEP_CODE_TRIP = "voyage";
export const QUOTE_WIZARD_STEP_CODE_TRAVELER = "voyageur";
export const QUOTE_WIZARD_STEP_CODE_QUOTE = "devis";

/* PLAN TYPES */
export const PLAN_TYPE_STANDARD = "standard";
export const PLAN_TYPE_PREMIUM = "premium";
export const PLAN_TYPE_ELITE = "elite";

/** Codes URL pour les types de plan affichés (usage futur / cohérence). */
export const PLAN_TYPE_CODE_STANDARD = "std-plan";
export const PLAN_TYPE_CODE_PREMIUM = "prm-plan";
export const PLAN_TYPE_CODE_ELITE = "elt-plan";

export const PLAN_TYPES_OPTIONS = [
  {
    label: "Standard",
    value: PLAN_TYPE_STANDARD,
    code: PLAN_TYPE_CODE_STANDARD,
  },
  {
    label: "Premium",
    value: PLAN_TYPE_PREMIUM,
    code: PLAN_TYPE_CODE_PREMIUM,
  },
  {
    label: "Elite",
    value: PLAN_TYPE_ELITE,
    code: PLAN_TYPE_CODE_ELITE,
  },
];

/* TIME */
export const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const PLANS_TTL_MS = 10 * 60 * 1000; // 10 minutes
