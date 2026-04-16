"use client";

import { useMutation } from "@tanstack/react-query";

import {
  requestTravelQuoteAction,
  selectTravelQuoteProductAction,
  subscribeTravelPolicyAction,
} from "@/actions/travel-session.actions";
import type {
  SubscribePolicyInput,
  TravelQuoteWizardInput,
} from "@/types/travel";

export function useRequestTravelQuote() {
  return useMutation({
    mutationFn: (input: TravelQuoteWizardInput) => requestTravelQuoteAction(input),
  });
}

export function useSelectTravelQuoteProduct() {
  return useMutation({
    mutationFn: (productIndex: number) =>
      selectTravelQuoteProductAction(productIndex),
  });
}

export function useSubscribeTravelPolicy() {
  return useMutation({
    mutationFn: (payload: SubscribePolicyInput) =>
      subscribeTravelPolicyAction(payload),
  });
}
