import "server-only";

import type { AxiosResponse } from "axios";

import { getEvoApiClient } from "@/lib/http/client";
import { toError } from "@/lib/http/errors";
import type {
  IGetPlanResponseDto,
  IGetQuotePayload,
  IGetQuoteResponseDto,
  ISubscribePolicyRequestBody,
  ISubscribePolicyResponseDto,
} from "@/types/travel";

/** POST `travel/quotes_requests` - Postman « 02 - Get Quote » */
export async function postTravelQuotesRequest(
  body: IGetQuotePayload,
): Promise<IGetQuoteResponseDto> {
  const client = getEvoApiClient();
  try {
    const res: AxiosResponse<unknown> = await client.post(
      "travel/quotes_requests",
      body,
    );
    return res.data as IGetQuoteResponseDto;
  } catch (e) {
    console.log("@@@ERROR postTravelQuotesRequest", e)
    throw toError(e);
  }
}

/** POST `travel/policies` - Postman « 03 - Subscribe Policy » */
export async function postTravelPolicy(
  body: ISubscribePolicyRequestBody,
): Promise<ISubscribePolicyResponseDto> {
  const client = getEvoApiClient();
  try {
    const res = await client.post<ISubscribePolicyResponseDto>(
      "travel/policies",
      body,
    );
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

/** GET `travel/policies/:policyId` - Postman « 04 - Get Policy Data » */
export async function getTravelPolicy(
  policyId: string,
  headers?: Record<string, string>,
): Promise<unknown> {
  const client = getEvoApiClient();
  try {
    const res = await client.get<unknown>(`travel/policies/${policyId}`, {
      headers: headers ?? {},
    });
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

/** GET `travel/policies/:policyId/certificate` - Postman « 05 - Get Certificate » */
export async function getTravelPolicyCertificate(
  policyId: string,
): Promise<ArrayBuffer> {
  const client = getEvoApiClient();
  try {
    const res = await client.get<ArrayBuffer>(
      `travel/policies/${policyId}/certificate`,
      { responseType: "arraybuffer" },
    );
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

/** PATCH `travel/policies/:policyId` - Postman « 06 - Update Policy » */
export async function patchTravelPolicy(
  policyId: string,
  body: Record<string, unknown>,
): Promise<unknown> {
  const client = getEvoApiClient();
  try {
    const res = await client.patch<unknown>(
      `travel/policies/${policyId}`,
      body,
    );
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

/** POST `travel/policies/:policyId/cancel` - Postman « 07 - Cancel Policy » */
export async function postTravelPolicyCancel(
  policyId: string,
  body: Record<string, unknown>,
): Promise<unknown> {
  const client = getEvoApiClient();
  try {
    const res = await client.post<unknown>(
      `travel/policies/${policyId}/cancel`,
      body,
    );
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

/** POST `travel/getPolicysbyDate` - Postman « 08 - Policies by Date » (orthographe API) */
export async function postTravelPoliciesByDate(
  body: Record<string, unknown>,
): Promise<unknown> {
  const client = getEvoApiClient();
  try {
    const res = await client.post<unknown>("travel/getPolicysbyDate", body);
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

/** GET `travel/plans` - Postman « 09 - Get Plans » */
export async function getTravelPlans(): Promise<IGetPlanResponseDto> {
  const client = getEvoApiClient();
  try {
    const res = await client.get<IGetPlanResponseDto>("travel/plans");
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

export const travelService = {
  /** Alias explicite pour le "Get Quote" de Postman (POST /travel/quotes_requests). */
  getQuote: postTravelQuotesRequest,
  postQuotesRequest: postTravelQuotesRequest,
  subscribePolicy: postTravelPolicy,
  getPolicy: getTravelPolicy,
  getPolicyCertificate: getTravelPolicyCertificate,
  updatePolicy: patchTravelPolicy,
  cancelPolicy: postTravelPolicyCancel,
  getPoliciesByDate: postTravelPoliciesByDate,
  getPlans: getTravelPlans,
};
