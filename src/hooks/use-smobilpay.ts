"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  initiateCashoutCollectionAction,
  verifyTravelPolicyPaymentAction,
} from "@/actions/smobilpay.actions";
import { actionFail } from "@/lib/http/action-result";
import { toError } from "@/lib/http/errors";
import type { ActionResult } from "@/types/action-result";
import type {
  S3pCashoutCollectInput,
  S3pPaymentStatusDto,
  S3pVerifyInput,
} from "@/types/smobilpay";

export function useInitiateCashoutCollection() {
  return useMutation({
    mutationFn: (payload: S3pCashoutCollectInput) =>
      initiateCashoutCollectionAction(payload),
  });
}

export function useVerifyTravelPayment() {
  return useMutation({
    mutationFn: (input: S3pVerifyInput) => verifyTravelPolicyPaymentAction(input),
  });
}

interface UsePaymentStatusOptions {
  ptn?: string | null;
  trid?: string | null;
  enabled?: boolean;
  /** Intervalle de polling en ms (par defaut 5s). */
  intervalMs?: number;
}

/**
 * Polling du statut S3P par PTN et/ou TRID.
 * S'arrête sur SUCCESS, DEBITED, ERRORED, REVERSED, ERROREDREFUNDED.
 */
export function usePaymentStatus({
  ptn = null,
  trid = null,
  enabled = true,
  intervalMs = 5000,
}: UsePaymentStatusOptions) {
  const ptnKey = ptn?.trim() ?? "";
  const tridKey = trid?.trim() ?? "";
  const hasKey = Boolean(ptnKey) || Boolean(tridKey);

  const query = useQuery<ActionResult<S3pPaymentStatusDto | null>>({
    queryKey: ["smobilpayStatus", ptnKey, tridKey] as const,
    enabled: enabled && hasKey,
    refetchInterval: (q) => {
      const data = q.state.data;
      if (!data?.ok) return intervalMs;
      const status = data.data?.status;
      if (
        status === "SUCCESS" ||
        status === "DEBITED" ||
        status === "ERRORED" ||
        status === "REVERSED" ||
        status === "ERROREDREFUNDED"
      ) {
        return false;
      }
      return intervalMs;
    },
    queryFn: async () => {
      if (!hasKey) {
        return actionFail<S3pPaymentStatusDto | null>(
          "MISSING_REFERENCE",
          "Fournissez un PTN ou un TRID.",
        );
      }
      try {
        return await verifyTravelPolicyPaymentAction({
          ptn: ptnKey || undefined,
          trid: tridKey || undefined,
        });
      } catch (e) {
        return actionFail<S3pPaymentStatusDto | null>(null, toError(e).message);
      }
    },
  });

  const status = query.data?.ok ? query.data.data?.status ?? null : null;
  const isTerminal =
    status === "SUCCESS" ||
    status === "DEBITED" ||
    status === "ERRORED" ||
    status === "REVERSED" ||
    status === "ERROREDREFUNDED";

  return {
    result: query.data,
    status,
    isTerminal,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
