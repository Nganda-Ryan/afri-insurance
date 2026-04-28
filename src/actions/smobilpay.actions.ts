"use server";

import { actionFail, actionOk } from "@/lib/http/action-result";
import { readAxiosErrorMessage, readAxiosFeCode } from "@/lib/http/axios-error-body";
import {
  getSmobilpayMerchant,
  getSmobilpayServiceId,
} from "@/lib/env/server";
import {
  s3pInitiatePaymentInputSchema,
  s3pVerifyInputSchema,
} from "@/schemas/smobilpay";
import { smobilpayService } from "@/services/smobilpay.service";
import type { ActionResult } from "@/types/action-result";
import type {
  S3pCollectionResponseDto,
  S3pInitiatePaymentInput,
  S3pPaymentStatusDto,
  S3pVerifyInput,
} from "@/types/smobilpay";

interface InitiatePaymentResult {
  ptn: string;
  status: S3pCollectionResponseDto["status"];
  trid?: string;
  receiptNumber: string;
  veriCode: string;
  priceLocalCur: number;
  localCur: string;
}

/**
 * Demarrre un paiement Smobilpay pour une police voyage :
 *  1) GET /subscription -> payItemId
 *  2) POST /quotestd     -> quoteId
 *  3) POST /collectstd   -> ptn (debit declenche cote client par USSD/Mobile Money)
 */
export async function initiateTravelPolicyPaymentAction(
  payload: S3pInitiatePaymentInput,
): Promise<ActionResult<InitiatePaymentResult>> {
  const parsed = s3pInitiatePaymentInputSchema.safeParse(payload);
  if (!parsed.success) {
    return actionFail(
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ?? "Donnees de paiement invalides.",
    );
  }
  const data = parsed.data;
  const normalizedAmount = Math.round(data.amount);
  if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
    return actionFail("VALIDATION_ERROR", "Montant de paiement invalide.");
  }
  const merchant = getSmobilpayMerchant();
  const serviceid = getSmobilpayServiceId();

  let payItemId: string;
  try {
    const subs = await smobilpayService.getSubscription({
      merchant,
      serviceid,
      serviceNumber: data.policyId,
    });
    if (!subs.length || !subs[0]?.payItemId) {
      return actionFail(
        "S3P_SUBSCRIPTION_NOT_FOUND",
        "Aucune souscription Smobilpay trouvee pour cette police.",
      );
    }
    payItemId = subs[0].payItemId;
  } catch (e) {
    return actionFail(
      readAxiosFeCode(e) ?? "S3P_SUBSCRIPTION_LOOKUP_FAILED",
      readAxiosErrorMessage(e),
    );
  }

  let quoteId: string;
  try {
    const quote = await smobilpayService.requestQuote({
      amount: normalizedAmount,
      payItemId,
    });
    quoteId = quote.quoteId;
  } catch (e) {
    return actionFail(
      readAxiosFeCode(e) ?? "S3P_QUOTE_FAILED",
      readAxiosErrorMessage(e),
    );
  }

  try {
    const collection = await smobilpayService.collect({
      quoteId,
      customerPhonenumber: data.customerPhonenumber,
      customerEmailaddress: data.customerEmailaddress,
      customerName: data.customerName,
      customerAddress: data.customerAddress,
      serviceNumber: data.policyId,
      trid: data.trid ?? `policy-${data.policyId}-${Date.now()}`,
    });

    return actionOk({
      ptn: collection.ptn,
      status: collection.status,
      trid: collection.trid,
      receiptNumber: collection.receiptNumber,
      veriCode: collection.veriCode,
      priceLocalCur: collection.priceLocalCur,
      localCur: collection.localCur,
    });
  } catch (e) {
    return actionFail(
      readAxiosFeCode(e) ?? "S3P_COLLECT_FAILED",
      readAxiosErrorMessage(e),
    );
  }
}

/** GET /verifytx — recupere le statut courant d'une collecte. */
export async function verifyTravelPolicyPaymentAction(
  input: S3pVerifyInput,
): Promise<ActionResult<S3pPaymentStatusDto | null>> {
  const parsed = s3pVerifyInputSchema.safeParse(input);
  if (!parsed.success || (!parsed.data.ptn && !parsed.data.trid)) {
    return actionFail(
      "VALIDATION_ERROR",
      "Vous devez fournir un PTN ou un TRID pour verifier le paiement.",
    );
  }
  try {
    const list = await smobilpayService.verifyTx(parsed.data);
    return actionOk(list[0] ?? null);
  } catch (e) {
    return actionFail(
      readAxiosFeCode(e) ?? "S3P_VERIFY_FAILED",
      readAxiosErrorMessage(e),
    );
  }
}
