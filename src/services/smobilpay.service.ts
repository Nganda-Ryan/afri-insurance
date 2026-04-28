import "server-only";

import { getS3pClient } from "@/lib/http/s3p-client";
import { toError } from "@/lib/http/errors";
import type {
  S3pCollectionResponseDto,
  S3pPaymentStatusDto,
  S3pQuoteDto,
  S3pSubscriptionDto,
} from "@/types/smobilpay";

/** GET /subscription — recupere le payItemId d'un service de souscription. */
export async function getS3pSubscription(params: {
  merchant: string;
  serviceid: string;
  serviceNumber?: string;
  customerNumber?: string;
}): Promise<S3pSubscriptionDto[]> {
  const client = getS3pClient();
  try {
    const res = await client.get<S3pSubscriptionDto[]>("/subscription", {
      params,
    });
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

/** POST /quotestd — demande un devis pour un payItem. */
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

/** POST /collectstd — execute la collecte de paiement (declenche USSD/MoMo). */
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

/** GET /verifytx — recupere le statut courant d'une collecte par PTN ou TRID. */
export async function getS3pVerifyTx(params: {
  ptn?: string;
  trid?: string;
}): Promise<S3pPaymentStatusDto[]> {
  const client = getS3pClient();
  try {
    const res = await client.get<S3pPaymentStatusDto[]>("/verifytx", {
      params,
    });
    return res.data;
  } catch (e) {
    throw toError(e);
  }
}

export const smobilpayService = {
  getSubscription: getS3pSubscription,
  requestQuote: postS3pQuote,
  collect: postS3pCollect,
  verifyTx: getS3pVerifyTx,
};
