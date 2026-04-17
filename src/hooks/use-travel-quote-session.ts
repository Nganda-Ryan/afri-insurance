"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getTravelPolicyAction,
  requestTravelQuoteAction,
  selectTravelQuoteProductAction,
  subscribeTravelPolicyAction,
} from "@/actions/travel-session.actions";
import { actionFail } from "@/lib/http/action-result";
import { toError } from "@/lib/http/errors";
import type { ActionResult } from "@/types/action-result";
import type {
  IGetQuotePayload,
  IPolicyData,
  SubscribePolicyInputDto,
  TravelQuoteActionData,
} from "@/types/travel";

export function travelQuoteQueryKey(payload: IGetQuotePayload) {
  return [
    "travelQuote",
    payload.travel.destination_area,
    payload.travel.start_date,
    payload.travel.end_date,
    payload.travel.travelers.types.adult,
    payload.travel.travelers.oldest_traveler_age,
    payload.product_criteria.category,
    payload.product_criteria.catalog.reference,
    payload.product_criteria.catalog.version,
  ] as const;
}

/** Devis voyage : `result` (enveloppe unique), `isLoading` (premier chargement), `refetch`. */
export function useTravelQuote(payload: IGetQuotePayload) {
  const query = useQuery({
    queryKey: travelQuoteQueryKey(payload),
    queryFn: async (): Promise<ActionResult<TravelQuoteActionData>> => {
      try {
        return await requestTravelQuoteAction(payload);
      } catch (e) {
        return actionFail<TravelQuoteActionData>(null, toError(e).message);
      }
    },
  });

  return {
    result: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}

export function useSelectTravelQuoteProduct() {
  return useMutation({
    mutationFn: (productIndex: number) =>
      selectTravelQuoteProductAction(productIndex),
  });
}

export function useSubscribeTravelPolicy() {
  return useMutation({
    mutationFn: (payload: SubscribePolicyInputDto) =>
      subscribeTravelPolicyAction(payload),
  });
}

export function useTravelPolicy(policyId: string) {
  const query = useQuery({
    queryKey: ["travelPolicy", policyId] as const,
    queryFn: async (): Promise<ActionResult<IPolicyData>> => {
      try {
        return await getTravelPolicyAction(policyId);
      } catch (e) {
        return actionFail<IPolicyData>(null, toError(e).message);
      }
    },
    enabled: !!policyId,
  });

  return {
    result: query.data,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
