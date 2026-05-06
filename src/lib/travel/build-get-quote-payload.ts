import type { IGetQuotePayload, TravelQuoteWizardInput } from "@/types/travel";

const DEFAULT_QUOTE_CONTEXT = {
  currency: "EUR",
  country: "Cameroun",
  language: "FR",
} as const satisfies IGetQuotePayload["context"];

function resolveTravelerTypeFromAge(age: number): "children" | "adult" | "senior" {
  if (age <= 18) return "children";
  if (age <= 75) return "adult";
  return "senior";
}

/** Transforme les champs wizard (formulaire) en payload API Get Quote. */
export function buildGetQuotePayload(input: TravelQuoteWizardInput): IGetQuotePayload {
  const adults = input.adult;
  if (!Number.isFinite(adults) || adults < 1) {
    throw new Error("Nombre de voyageurs invalide.");
  }
  const oldestTravelerAge = input.oldest_traveler_age;
  if (
    !Number.isFinite(oldestTravelerAge) ||
    oldestTravelerAge < 0 ||
    oldestTravelerAge > 99
  ) {
    throw new Error("L'age du voyageur le plus age est obligatoire et doit etre valide.");
  }
  const composition = adults > 1 ? "group" : "single";
  const travelerType = resolveTravelerTypeFromAge(oldestTravelerAge);
  const remainingTravelers = Math.max(0, adults - 1);
  const types = {
    // On connait seulement l'age max. On affecte ce voyageur a sa tranche,
    // puis on répartit les autres selon l'information minimale disponible.
    adult:
      travelerType === "adult"
        ? adults
        : travelerType === "senior"
          ? remainingTravelers
          : 0,
    children: travelerType === "children" ? adults : 0,
    senior: travelerType === "senior" ? 1 : 0,
  };

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
        types,
        oldest_traveler_age: oldestTravelerAge,
      },
    },
  };
}
