"use server";

import axios from "axios";
import { cookies } from "next/headers";

import {
  EVO_POLICY_ID_COOKIE,
  EVO_QUOTE_CODE_COOKIE,
  EVO_QUOTE_SESSION_COOKIE,
} from "@/lib/constants/cookies";
import { EVO_QUOTE_NOT_FOUND_CODE } from "@/lib/constants/evo-api";
import { actionFail, actionOk } from "@/lib/http/action-result";
import { readAxiosErrorMessage, readAxiosFeCode } from "@/lib/http/axios-error-body";
import { toError } from "@/lib/http/errors";
import {
  createQuoteSessionId,
  peekTravelQuoteSession,
} from "@/lib/server/travel-quote-cache";
import { getTravelSessionCookieBase } from "@/lib/server/travel-session-cookie-base";
import {
  cancelPolicyInputSchema,
  subscribePolicyInputSchema,
  updatePolicyInputSchema,
} from "@/schemas/travel";
import { travelService } from "@/services/travel.service";
import {
  extractSelectedTravelQuoteProduct,
  extractTravelQuoteContext,
  extractTravelQuoteProductSummaries,
} from "@/lib/travel/evo-quote-response";
import { extractTravelPolicyId } from "@/lib/travel/policy-response";
import type { ActionResult } from "@/types/action-result";
import type {
  IGetQuotePayload,
  IGetQuoteResponseDto,
  IPolicyData,
  ISubscribePolicyRequestBody,
  SelectTravelQuoteProductActionData,
  SubscribePolicyInputDto,
  TravelQuoteActionData,
} from "@/types/travel";

const cookieBase = getTravelSessionCookieBase();

export async function requestTravelQuoteAction(
  payload: IGetQuotePayload,
): Promise<ActionResult<TravelQuoteActionData>> {
  try {
    const result: IGetQuoteResponseDto = await travelService.getQuote(payload);

    const sessionId = createQuoteSessionId(result);
    const cookieStore = await cookies();
    cookieStore.set(EVO_QUOTE_SESSION_COOKIE, sessionId, cookieBase);
    cookieStore.delete(EVO_QUOTE_CODE_COOKIE);
    cookieStore.delete(EVO_POLICY_ID_COOKIE);

    return actionOk({
      products: extractTravelQuoteProductSummaries(result),
      quoteContext: extractTravelQuoteContext(result),
    });
  } catch (e) {
    const feCode = readAxiosFeCode(e);
    if (
      axios.isAxiosError(e) &&
      e.response?.status === 422 &&
      feCode === EVO_QUOTE_NOT_FOUND_CODE
    ) {
      return actionFail<TravelQuoteActionData>(
        EVO_QUOTE_NOT_FOUND_CODE,
        "Aucune formule disponible. Modifiez vos entrées.",
      );
    }
    return actionFail<TravelQuoteActionData>(feCode, readAxiosErrorMessage(e));
  }
}

export async function selectTravelQuoteProductAction(
  productIndex: number,
): Promise<ActionResult<SelectTravelQuoteProductActionData>> {
  if (!Number.isInteger(productIndex) || productIndex < 0) {
    return actionFail("INVALID_PRODUCT_INDEX", "Index de produit invalide.");
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get(EVO_QUOTE_SESSION_COOKIE)?.value;
  if (!sessionId) {
    return actionFail(
      "SESSION_MISSING",
      "Session expirée ou absente. Relancez une cotation.",
    );
  }

  const raw = peekTravelQuoteSession(sessionId);
  if (raw == null) {
    return actionFail(
      "SESSION_EXPIRED",
      "Session de devis expirée. Relancez une cotation.",
    );
  }

  const selected = extractSelectedTravelQuoteProduct(raw, productIndex);
  if (!selected) {
    return actionFail(
      "QUOTE_CODE_NOT_FOUND",
      "Produit de devis introuvable pour cet index.",
    );
  }

  const quoteCode = selected.products[0]?.quote_code;
  if (!quoteCode) {
    return actionFail(
      "QUOTE_CODE_NOT_FOUND",
      "Code de devis manquant pour ce produit.",
    );
  }

  cookieStore.set(EVO_QUOTE_CODE_COOKIE, quoteCode, cookieBase);
  return actionOk(selected);
}

export async function subscribeTravelPolicyAction(
  payload: SubscribePolicyInputDto,
): Promise<ActionResult<{ policyId: string }>> {
  const parsed = subscribePolicyInputSchema.safeParse(payload);
  if (!parsed.success) {
    return actionFail(
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ?? "Données de souscription invalides.",
    );
  }

  const cookieStore = await cookies();
  const quoteCodeFromPayload = parsed.data.quote_code?.trim();
  const quoteCode =
    quoteCodeFromPayload || cookieStore.get(EVO_QUOTE_CODE_COOKIE)?.value;
  if (!quoteCode) {
    return actionFail(
      "QUOTE_CODE_COOKIE_MISSING",
      "Code de devis manquant. Sélectionnez un produit issu du tarif en ligne.",
    );
  }
  if (quoteCodeFromPayload) {
    cookieStore.set(EVO_QUOTE_CODE_COOKIE, quoteCodeFromPayload, cookieBase);
  }

  const apiBody: ISubscribePolicyRequestBody = {
    ...parsed.data,
    quote_code: quoteCode,
  };

  let res: Awaited<ReturnType<typeof travelService.subscribePolicy>>;
  try {
    res = await travelService.subscribePolicy(apiBody);
  } catch (e) {
    return actionFail(readAxiosFeCode(e), readAxiosErrorMessage(e));
  }

  try {
    const policyId = extractTravelPolicyId(res);
    cookieStore.set(EVO_POLICY_ID_COOKIE, policyId, cookieBase);
    return actionOk({ policyId });
  } catch (inner) {
    return actionFail("POLICY_ID_EXTRACTION_FAILED", toError(inner).message);
  }
}

export async function getTravelPolicyAction(
  policyId: string,
): Promise<ActionResult<IPolicyData>> {
  if (!policyId) {
    return actionFail("INVALID_POLICY_ID", "Identifiant de police invalide.");
  }
  try {
    const data = await travelService.getPolicy(policyId);
    return actionOk(data as IPolicyData);
  } catch (e) {
    return actionFail(readAxiosFeCode(e), readAxiosErrorMessage(e));
  }
}

export async function getTravelPolicyCertificateAction(
  policyId: string,
): Promise<
  ActionResult<{
    fileName: string;
    contentType: string;
    base64: string;
  }>
> {
  if (!policyId) {
    return actionFail("INVALID_POLICY_ID", "Identifiant de police invalide.");
  }

  try {
    const certificate = await travelService.getPolicyCertificate(policyId);
    const base64 = Buffer.from(certificate).toString("base64");
    return actionOk({
      fileName: `police-${policyId}.pdf`,
      contentType: "application/pdf",
      base64,
    });
  } catch (e) {
    return actionFail(readAxiosFeCode(e), readAxiosErrorMessage(e));
  }
}

export async function cancelTravelPolicyAction(input: {
  policyId: string;
  cancellation_reason: string;
}): Promise<ActionResult<Record<string, never>>> {
  if (!input.policyId) {
    return actionFail("INVALID_POLICY_ID", "Identifiant de police invalide.");
  }

  const parsed = cancelPolicyInputSchema.safeParse({
    cancellation_reason: input.cancellation_reason,
  });
  if (!parsed.success) {
    return actionFail(
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ?? "Données d'annulation invalides.",
    );
  }

  try {
    await travelService.cancelPolicy(input.policyId, parsed.data);
    return actionOk({});
  } catch (e) {
    return actionFail(readAxiosFeCode(e), readAxiosErrorMessage(e));
  }
}

export async function updateTravelPolicyAction(input: {
  policyId: string;
  payload: Record<string, unknown>;
}): Promise<ActionResult<Record<string, never>>> {
  if (!input.policyId) {
    return actionFail("INVALID_POLICY_ID", "Identifiant de police invalide.");
  }
  const parsed = updatePolicyInputSchema.safeParse(input.payload);
  if (!parsed.success) {
    return actionFail(
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ??
        "Le payload de mise à jour est invalide.",
    );
  }

  try {
    await travelService.updatePolicy(input.policyId, parsed.data);
    return actionOk({});
  } catch (e) {
    return actionFail(readAxiosFeCode(e), readAxiosErrorMessage(e));
  }
}

export async function getTravelPlansAction(): Promise<unknown> {
  return travelService.getPlans();
}

export async function getTravelPoliciesByDateAction(input: {
  start_date: string;
  end_date: string;
}): Promise<unknown> {
  return travelService.getPoliciesByDate({
    start_date: input.start_date,
    end_date: input.end_date,
  });
}
