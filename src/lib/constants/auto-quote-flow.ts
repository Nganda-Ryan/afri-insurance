export const AUTO_QUOTE_FLOW_STEP_LABELS = [
  "Cotation",
  "Récapitulatif",
  "Paiement",
] as const;

export const AUTO_QUOTE_FLOW_STEP = {
  FORM: 0,
  RECAP: 1,
  PAYMENT: 2,
} as const;

export type AutoQuoteFlowStepIndex =
  (typeof AUTO_QUOTE_FLOW_STEP)[keyof typeof AUTO_QUOTE_FLOW_STEP];
