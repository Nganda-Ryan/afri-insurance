import type {
  IFactorizedCategory,
  IFactorizedDestination,
  IGetPlanResponseDto,
  IGetPlanResponseDtoFactorize,
} from "@/types/travel";

/**
 * Factorise la liste brute renvoyée par GET `travel/plans` en un tableau
 * de catégories. Pour chaque catégorie ses destinations sont regroupées,
 * et pour chaque destination les tranches d'âge (min_age / max_age) sont
 * collectées dans `age_ranges`. Tous les autres champs sont conservés.
 */
export function factorizePlans(
  plans: IGetPlanResponseDto[],
): IGetPlanResponseDtoFactorize {
  const categoryMap = new Map<string, IFactorizedCategory>();

  for (const plan of plans) {
    let category = categoryMap.get(plan.category);
    if (!category) {
      category = {
        name: plan.category,
        company: plan.company,
        destinations: [],
      };
      categoryMap.set(plan.category, category);
    }

    const existing = category.destinations.find(
      (d) => d.destination === plan.destination,
    );

    if (existing) {
      const alreadyHasRange = existing.age_ranges.some(
        (r) => r.min_age === plan.min_age && r.max_age === plan.max_age,
      );
      if (!alreadyHasRange) {
        existing.age_ranges.push({ min_age: plan.min_age, max_age: plan.max_age });
      }
    } else {
      const destination: IFactorizedDestination = {
        destination: plan.destination,
        min_days: plan.min_days,
        max_days: plan.max_days,
        currency: plan.currency,
        language: plan.language,
        composition: plan.composition,
        traveler_type: plan.traveler_type,
        age_ranges: [{ min_age: plan.min_age, max_age: plan.max_age }],
      };
      category.destinations.push(destination);
    }
  }

  return Array.from(categoryMap.values());
}
