import type { IGetQuotePayload, TravelQuoteWizardInput } from "@/types/travel";

const DEFAULT_QUOTE_CONTEXT = {
  currency: "EUR",
  country: "Cameroun",
  language: "FR",
} as const satisfies IGetQuotePayload["context"];

/** Transforme les champs wizard (formulaire) en payload API Get Quote. */
export function buildGetQuotePayload(input: TravelQuoteWizardInput): IGetQuotePayload {
  const adults = input.adult;
  if (!Number.isFinite(adults) || adults < 1) {
    throw new Error("Nombre de voyageurs invalide.");
  }
  const composition = adults > 1 ? "group" : "single";

  return {
    context: { ...DEFAULT_QUOTE_CONTEXT },
    product_criteria: {
      category: input.product_category,
      catalog: {
        reference: input.catalog_reference,
        version: input.catalog_version,
      },
    },
    travel: {
      destination_area: input.destination_area,
      start_date: input.start_date,
      end_date: input.end_date,
      travelers: {
        composition,
        types: {
          adult: adults,
          children: 0,
          senior: 0,
        },
        oldest_traveler_age: input.oldest_traveler_age,
      },
    },
  };
}
