import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getTravelPlansAction } from "@/actions/travel-session.actions";
import { factorizePlans } from "@/lib/travel/factorize-plans";
import type { IGetPlanResponseDto, IGetPlanResponseDtoFactorize } from "@/types/travel";
import { PLANS_TTL_MS } from "@/lib/constants/constant";


interface PlanStoreState {
  plans: IGetPlanResponseDtoFactorize;
  fetchedAt: number | null;
  loading: boolean;
  error: string | null;

  /** Fetch plans only if cache is absent or older than 10 min. */
  fetchPlans: () => Promise<void>;
  /** Force a fresh fetch regardless of cache age. */
  forceRefreshPlans: () => Promise<void>;
  resetPlans: () => void;
}

function isCacheValid(fetchedAt: number | null): boolean {
  if (fetchedAt === null) return false;
  return Date.now() - fetchedAt < PLANS_TTL_MS;
}

export const usePlanStore = create<PlanStoreState>()(
  persist(
    (set, get) => ({
      plans: [],
      fetchedAt: null,
      loading: false,
      error: null,

      fetchPlans: async () => {
        if (isCacheValid(get().fetchedAt)) return;
        await get().forceRefreshPlans();
      },

      forceRefreshPlans: async () => {
        set({ loading: true, error: null });
        try {
          const result = await getTravelPlansAction();
          const raw = Array.isArray(result)
            ? (result as IGetPlanResponseDto[])
            : [result as IGetPlanResponseDto];

          set({ plans: factorizePlans(raw), fetchedAt: Date.now(), loading: false });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Erreur inconnue";
          set({ error: message, loading: false });
        }
      },

      resetPlans: () => set({ plans: [], fetchedAt: null, error: null }),
    }),
    {
      name: "travel-plans-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        plans: state.plans,
        fetchedAt: state.fetchedAt,
      }),
    },
  ),
);
