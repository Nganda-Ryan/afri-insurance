export const ACCIDENTS_QUOTE_FLOW_STEP_LABELS = [
  "Cotation",
  "Récapitulatif",
  "Devis",
] as const;

export const ACCIDENTS_QUOTE_FLOW_STEP = {
  FORM: 0,
  RECAP: 1,
  DEVIS: 2,
} as const;

export type AccidentsQuoteFlowStepIndex =
  (typeof ACCIDENTS_QUOTE_FLOW_STEP)[keyof typeof ACCIDENTS_QUOTE_FLOW_STEP];
