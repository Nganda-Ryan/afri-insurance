"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  initiateTravelPolicyPaymentAction,
  verifyTravelPolicyPaymentAction,
} from "@/actions/smobilpay.actions";
import { actionFail } from "@/lib/http/action-result";
import { toError } from "@/lib/http/errors";
import type { ActionResult } from "@/types/action-result";
import type {
  S3pInitiatePaymentInput,
  S3pPaymentStatusDto,
} from "@/types/smobilpay";

export function useInitiateTravelPayment() {
  return useMutation({
    mutationFn: (payload: S3pInitiatePaymentInput) =>
      initiateTravelPolicyPaymentAction(payload),
  });
}

interface UsePaymentStatusOptions {
  ptn: string | null;
  enabled?: boolean;
  /** Intervalle de polling en ms (par defaut 3s). */
  intervalMs?: number;
}

/**
 * Polling automatique du statut de paiement S3P par PTN.
 * S'arrete des qu'on atteint un statut terminal (SUCCESS / ERRORED / REVERSED / ERROREDREFUNDED).
 */
export function usePaymentStatus({
  ptn,
  enabled = true,
  intervalMs = 3000,
}: UsePaymentStatusOptions) {
  const query = useQuery<ActionResult<S3pPaymentStatusDto | null>>({
    queryKey: ["smobilpayStatus", ptn] as const,
    enabled: enabled && !!ptn,
    refetchInterval: (q) => {
      const data = q.state.data;
      if (!data?.ok) return intervalMs;
      const status = data.data?.status;
      if (
        status === "SUCCESS" ||
        status === "ERRORED" ||
        status === "REVERSED" ||
        status === "ERROREDREFUNDED"
      ) {
        return false;
      }
      return intervalMs;
    },
    queryFn: async () => {
      if (!ptn) {
        return actionFail<S3pPaymentStatusDto | null>(
          "MISSING_PTN",
          "Aucun PTN a verifier.",
        );
      }
      try {
        return await verifyTravelPolicyPaymentAction({ ptn });
      } catch (e) {
        return actionFail<S3pPaymentStatusDto | null>(null, toError(e).message);
      }
    },
  });

  const status = query.data?.ok ? query.data.data?.status ?? null : null;
  const isTerminal =
    status === "SUCCESS" ||
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
