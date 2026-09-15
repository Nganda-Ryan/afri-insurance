export const ETUDES_QUOTE_FLOW_STEP_LABELS = [
  "Cotation",
  "Récapitulatif",
  "Devis",
] as const;

export const ETUDES_QUOTE_FLOW_STEP = {
  FORM: 0,
  RECAP: 1,
  DEVIS: 2,
} as const;

export type EtudesQuoteFlowStepIndex =
  (typeof ETUDES_QUOTE_FLOW_STEP)[keyof typeof ETUDES_QUOTE_FLOW_STEP];
