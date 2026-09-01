import "server-only";

import { getS3pClient } from "@/lib/http/s3p-client";
import { toError } from "@/lib/http/errors";
import type {
  S3pCashoutLineDto,
  S3pCollectionResponseDto,
  S3pPaymentStatusDto,
  S3pQuoteDto,
} from "@/types/smobilpay";

function normalizeVerifyTxPayload(data: unknown): S3pPaymentStatusDto[] {
  if (data == null) return [];
  if (Array.isArray(data)) return data as S3pPaymentStatusDto[];
  if (typeof data === "object") return [data as S3pPaymentStatusDto];
  return [];
}

/** GET /cashout - liste des services cash-out (OM, MoMo, …). */
export async function getS3pCashout(): Promise<S3pCashoutLineDto[]> {
  const client = getS3pClient();
  try {
    const res = await client.get<S3pCashoutLineDto[]>("/cashout");
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

/**
 * POST /quotestd - demande un devis pour un payItem.
 * `payItemId` provient exclusivement de GET /cashout (ligne filtrée par MOMO_SERVICE_ID / OM_SERVICE_ID).
 */
export async function postS3pQuote(body: {
  amount: number;
  payItemId: string;
}): Promise<S3pQuoteDto> {
  const client = getS3pClient();
  try {
    const res = await client.post<S3pQuoteDto>("/quotestd", body);
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

/** POST /collectstd - execute la collecte de paiement (declenche USSD/MoMo). */
export async function postS3pCollect(body: {
  quoteId: string;
  customerPhonenumber: string;
  customerEmailaddress: string;
  customerName?: string;
  customerAddress?: string;
  customerNumber?: string;
  serviceNumber?: string;
  trid?: string;
  tag?: string;
  cdata?: string;
}): Promise<S3pCollectionResponseDto> {
  const client = getS3pClient();
  try {
    const res = await client.post<S3pCollectionResponseDto>("/collectstd", body);
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

/** GET /verifytx - recupere le statut courant d'une collecte par PTN ou TRID. */
export async function getS3pVerifyTx(params: {
  ptn?: string;
  trid?: string;
}): Promise<S3pPaymentStatusDto[]> {
  const client = getS3pClient();
  try {
    const res = await client.get<unknown>("/verifytx", {
      params,
    });
    return normalizeVerifyTxPayload(res.data);
  } catch (e) {
    throw toError(e);
  }
}

export const smobilpayService = {
  getCashout: getS3pCashout,
  requestQuote: postS3pQuote,
  collect: postS3pCollect,
  verifyTx: getS3pVerifyTx,
};
