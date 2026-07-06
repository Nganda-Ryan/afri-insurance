export const MRH_QUOTE_FLOW_STEP_LABELS = [
  "Cotation",
  "Récapitulatif",
  "Paiement",
] as const;

export const MRH_QUOTE_FLOW_STEP = {
  FORM: 0,
  RECAP: 1,
  PAYMENT: 2,
} as const;

export type MrhQuoteFlowStepIndex =
  (typeof MRH_QUOTE_FLOW_STEP)[keyof typeof MRH_QUOTE_FLOW_STEP];
