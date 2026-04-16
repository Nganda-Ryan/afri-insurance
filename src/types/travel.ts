import type { z } from "zod";

import type {
  policiesByDateInputSchema,
  subscribePolicyInputSchema,
  travelQuoteWizardInputSchema,
} from "@/schemas/travel";

export type TravelQuoteWizardInput = z.input<typeof travelQuoteWizardInputSchema>;

export type TravelQuoteWizardParsed = z.output<typeof travelQuoteWizardInputSchema>;

export type SubscribePolicyInput = z.infer<typeof subscribePolicyInputSchema>;

export type PoliciesByDateInput = z.infer<typeof policiesByDateInputSchema>;

export type TravelQuoteProductSummary = {
  index: number;
  name: string;
  priceLabel: string;
  currency?: string;
};

export type TravelQuoteRequestResult = {
  ok: true;
  sessionCookieSet: true;
  products: TravelQuoteProductSummary[];
} | {
  ok: false;
  error: {
    message: string;
  };
};


export interface PlanDetails {
  name: string;
  type: "standard" | "premium" | "elite";
  price: number;
  perTripLabel: string;
  productIndex: number;
  source: "api";
  currency?: string;
  coverages: { name: string; limit: string }[];
}


export interface TripDetailsData {
  destination: string
  departureDate: string
  returnDate: string
  numberOfTravelers: number
  productCategory: 'Standard' | 'Etudiant' | 'Pèlerinage'
}
export interface TravelerInfoData {
  oldestTravelerBirthDate: string
}
export interface SelectedPlan {
  name: string
  price: number
  type: 'standard' | 'premium' | 'elite'
  productIndex: number
  source: 'api'
}

export type PLAN_TYPES_TYPE = 'standard' | 'premium' | 'elite'