/** Étapes du parcours complet devis voyage → souscription. */
export const TRAVEL_QUOTE_FLOW_STEP_LABELS = [
  "Détails du voyage",
  "Devis",
  "Vos détails",
  "Récapitulatif",
  "Paiement",
] as const;

export const TRAVEL_QUOTE_FLOW_STEP = {
  TRIP: 0,
  QUOTE: 1,
  DETAILS: 2,
  RECAP: 3,
  PAYMENT: 4,
} as const;

export type TravelQuoteFlowStepIndex =
  (typeof TRAVEL_QUOTE_FLOW_STEP)[keyof typeof TRAVEL_QUOTE_FLOW_STEP];
