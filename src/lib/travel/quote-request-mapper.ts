import { EVO_DEFAULT_CONTEXT } from "@/config/evo-api";
import type { TravelQuoteWizardParsed } from "@/types/travel";

import { mapDestinationToArea } from "./destination-area";

function ageFromIsoBirthDate(birthDate: string): number {
  const born = new Date(birthDate);
  if (Number.isNaN(born.getTime())) {
    throw new Error("Date de naissance invalide.");
  }
  const today = new Date();
  let age = today.getFullYear() - born.getFullYear();
  const m = today.getMonth() - born.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < born.getDate())) {
    age -= 1;
  }
  if (age < 18 || age > 99) {
    throw new Error("Âge des voyageurs hors plage autorisée.");
  }
  return age;
}

/**
 * Corps JSON pour POST `travel/quotes_requests` (collection Postman « 02 - Get Quote »).
 */
export function buildTravelQuotesRequestBody(
  input: TravelQuoteWizardParsed,
): Record<string, unknown> {
  const adults = input.numberOfTravelers;
  if (!Number.isFinite(adults) || adults < 1) {
    throw new Error("Nombre de voyageurs invalide.");
  }
  const composition = adults > 1 ? "group" : "single";

  return {
    context: {
      currency: EVO_DEFAULT_CONTEXT.currency,
      country: EVO_DEFAULT_CONTEXT.country,
      language: EVO_DEFAULT_CONTEXT.language,
    },
    product_criteria: {
      category: input.productCategory,
      catalog: {
        reference: input.catalogReference,
        version: input.catalogVersion,
      },
    },
    travel: {
      destination_area: mapDestinationToArea(input.destination),
      start_date: input.departureDate,
      end_date: input.returnDate,
      travelers: {
        composition,
        types: {
          adult: adults,
          children: 0,
          senior: 0,
        },
        oldest_traveler_age: ageFromIsoBirthDate(input.oldestTravelerBirthDate),
      },
    },
  };
}
