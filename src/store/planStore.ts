import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getTravelPlansAction } from "@/actions/travel-session.actions";
import { factorizePlans } from "@/lib/travel/factorize-plans";
import type { IGetPlanResponseDto, IGetPlanResponseDtoFactorize } from "@/types/travel";
import { isCacheValid } from "@/lib/utils";


interface PlanStoreState {
  plans: IGetPlanResponseDtoFactorize;
  fetchedAt: number | null;
  loading: boolean;
  error: string | null;

  fetchPlans: () => Promise<void>;
  forceRefreshPlans: () => Promise<void>;
  resetPlans: () => void;
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
          console.log('result', result);
          const raw = Array.isArray(result) ? (result as IGetPlanResponseDto[]) : [result as IGetPlanResponseDto];

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
