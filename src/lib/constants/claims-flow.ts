export const CLAIMS_FLOW_STEP_LABELS = [
  "Informations sinistre",
  "Détails & pièces",
] as const;

export const CLAIMS_FLOW_STEP = {
  INFO: 0,
  DETAILS: 1,
} as const;

export const CLAIMS_PORTAL_HOW_IT_WORKS = [
  {
    step: 1,
    title: "Décrivez le sinistre",
    subtitle: "Informations principales en 2 min",
  },
  {
    step: 2,
    title: "Ajoutez les détails",
    subtitle: "Circonstances, dommages et pièces",
  },
  {
    step: 3,
    title: "Envoyez votre déclaration",
    subtitle: "Notre équipe vous recontacte sous 24h",
  },
] as const;
