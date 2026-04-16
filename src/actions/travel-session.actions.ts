"use server";

import axios from "axios";
import { cookies } from "next/headers";

import {
  EVO_POLICY_ID_COOKIE,
  EVO_QUOTE_CODE_COOKIE,
  EVO_QUOTE_SESSION_COOKIE,
  EVO_COOKIE_MAX_AGE_SEC,
} from "@/lib/constants/cookies";
import { evoCookieOptions } from "@/lib/http/client";
import { toError } from "@/lib/http/errors";
import { buildTravelQuotesRequestBody } from "@/lib/travel/quote-request-mapper";
import {
  extractQuoteCodeAtIndex,
  extractTravelQuoteProductSummaries,
} from "@/lib/travel/evo-quote-response";
import { extractTravelPolicyId } from "@/lib/travel/policy-response";
import {
  createTravelQuoteSessionId,
  peekTravelQuoteSession,
} from "@/lib/server/travel-quote-cache";
import {
  subscribePolicyInputSchema,
  travelQuoteWizardInputSchema,
} from "@/schemas/travel";
import { travelService } from "@/services/travel.service";
import type {
  SubscribePolicyInput,
  TravelQuoteRequestResult,
  TravelQuoteWizardInput,
} from "@/types/travel";

const cookieBase = {
  ...evoCookieOptions(),
  maxAge: EVO_COOKIE_MAX_AGE_SEC,
} as const;

export async function requestTravelQuoteAction(
  raw: TravelQuoteWizardInput,
): Promise<TravelQuoteRequestResult> {
  try {
    const parsed = travelQuoteWizardInputSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        ok: false,
        error: {
          message: parsed.error.issues[0]?.message ?? "Invalid quote input",
        },
      };
    }

    const body = buildTravelQuotesRequestBody(parsed.data);

    const apiJson = await travelService.getQuote(body);

    // const sessionId = createTravelQuoteSessionId(apiJson);
    // const cookieStore = await cookies();
    // cookieStore.set(EVO_QUOTE_SESSION_COOKIE, sessionId, cookieBase);
    // cookieStore.delete(EVO_QUOTE_CODE_COOKIE);
    // cookieStore.delete(EVO_POLICY_ID_COOKIE);

    const products = extractTravelQuoteProductSummaries(apiJson);
    return { ok: true, sessionCookieSet: true, products };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const feCode = (e.response?.data as { fe_code_error?: unknown } | undefined)
        ?.fe_code_error;

      if (
        e.response?.status === 422 &&
        feCode === "error.policy.data.quote.not_found"
      ) {
        return {
          ok: false,
          error: {
            message:
              "Aucune formule n'est disponible pour les informations saisies. Modifiez vos entrées puis réessayez.",
          },
        };
      }
    }

    return { ok: false, error: { message: toError(e).message } };
  }
}

export async function selectTravelQuoteProductAction(
  productIndex: number,
): Promise<{ ok: true }> {
  if (!Number.isInteger(productIndex) || productIndex < 0) {
    throw new Error("Invalid product index");
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get(EVO_QUOTE_SESSION_COOKIE)?.value;
  if (!sessionId) {
    throw new Error("Session expirée ou absente. Relancez une cotation.");
  }

  const raw = peekTravelQuoteSession(sessionId);
  if (raw == null) {
    throw new Error("Session de devis expirée. Relancez une cotation.");
  }

  const quoteCode = extractQuoteCodeAtIndex(raw, productIndex);
  if (!quoteCode) {
    throw new Error("Produit de devis introuvable pour cet index.");
  }

  cookieStore.set(EVO_QUOTE_CODE_COOKIE, quoteCode, cookieBase);
  return { ok: true };
}

export type SubscribeTravelPolicyResult = {
  policyId: string;
};

export async function subscribeTravelPolicyAction(
  payload: SubscribePolicyInput,
): Promise<SubscribeTravelPolicyResult> {
  const parsed = subscribePolicyInputSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid subscription payload");
  }

  const cookieStore = await cookies();
  const quoteCode = cookieStore.get(EVO_QUOTE_CODE_COOKIE)?.value;
  if (!quoteCode) {
    throw new Error(
      "Code de devis manquant. Sélectionnez un produit issu du tarif en ligne.",
    );
  }

  const apiBody: Record<string, unknown> = {
    quote_code: quoteCode,
    ...parsed.data,
  };

  let res: unknown;
  try {
    res = await travelService.subscribePolicy(apiBody);
  } catch (e) {
    throw toError(e);
  }

  const policyId = extractTravelPolicyId(res);
  cookieStore.set(EVO_POLICY_ID_COOKIE, policyId, cookieBase);

  return { policyId };
}

/** Données publiques — lecture catalogue des plans (GET `travel/plans`). */
export async function getTravelPlansAction(): Promise<unknown> {
  return travelService.getPlans();
}

/** Recherche de polices par période — Postman « 08 ». */
export async function getTravelPoliciesByDateAction(input: {
  start_date: string;
  end_date: string;
}): Promise<unknown> {
  return travelService.getPoliciesByDate({
    start_date: input.start_date,
    end_date: input.end_date,
  });
}
