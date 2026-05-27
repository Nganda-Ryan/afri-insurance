"use server";

import { actionFail, actionOk } from "@/lib/http/action-result";
import {
  readAxiosErrorMessage,
  readAxiosFeCode,
  readS3pOrAxiosErrorMessage,
} from "@/lib/http/axios-error-body";
import {
  getEurToXafExchangeRate,
  getMomoServiceId,
  getOmServiceId,
  getSmobilpayMerchant,
  getSmobilpayServiceId,
} from "@/lib/env/server";
import {
  s3pCashoutCollectInputSchema,
  s3pInitiatePaymentInputSchema,
  s3pVerifyInputSchema,
} from "@/schemas/smobilpay";
import { smobilpayService } from "@/services/smobilpay.service";
import type { ActionResult } from "@/types/action-result";
import type {
  S3pCashoutCollectResult,
  S3pCollectionResponseDto,
  S3pInitiatePaymentInput,
  S3pPaymentStatusDto,
  S3pVerifyInput,
} from "@/types/smobilpay";

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function convertEuroToXaf(amountEur: number): number {
  const rate = getEurToXafExchangeRate();
  return Math.round(amountEur * rate);
}

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

/**
 * Paiement cash-out (OM / MoMo) avant souscription :
 * GET /cashout → GET /validate → POST /quotestd → POST /collectstd.
 */
export async function initiateCashoutCollectionAction(
  payload: unknown,
): Promise<ActionResult<S3pCashoutCollectResult>> {
  const parsed = s3pCashoutCollectInputSchema.safeParse(payload);
  if (!parsed.success) {
    return actionFail(
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ?? "Données de paiement invalides.",
    );
  }
  const data = {
    ...parsed.data,
    walletDestination: digitsOnly(parsed.data.walletDestination),
    customerPhonenumber: digitsOnly(parsed.data.customerPhonenumber),
  };
  if (data.walletDestination.length < 8) {
    return actionFail("VALIDATION_ERROR", "Numéro de paiement invalide.");
  }
  if (data.customerPhonenumber.length < 8) {
    return actionFail("VALIDATION_ERROR", "Téléphone souscripteur invalide.");
  }

  const amount = convertEuroToXaf(parsed.data.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return actionFail("VALIDATION_ERROR", "Montant de paiement invalide.");
  }

  const serviceId =
    data.channel === "momo" ? getMomoServiceId() : getOmServiceId();
  if (data.channel === "om" && !serviceId.trim()) {
    return actionFail(
      "CONFIG_ERROR",
      "Orange Money n'est pas configuré (OM_SERVICE_ID).",
    );
  }

  let cashout: Awaited<ReturnType<typeof smobilpayService.getCashout>>;
  try {
    cashout = await smobilpayService.getCashout();
  } catch (e) {
    return actionFail(
      readAxiosFeCode(e) ?? "S3P_CASHOUT_FAILED",
      readS3pOrAxiosErrorMessage(e),
    );
  }

  const line = cashout.find((row) => String(row.serviceid) === String(serviceId));
  if (!line?.payItemId) {
    return actionFail(
      "S3P_CASHOUT_LINE_NOT_FOUND",
      "Ce moyen de paiement n'est pas disponible pour le moment.",
    );
  }

  try {
    const validated = await smobilpayService.validateCashoutDestination({
      destination: data.walletDestination,
      serviceId: String(serviceId),
    });
    const ok =
      validated.status === "VERIFIED" || validated.status === "VALIDATED";
    if (!ok) {
      return actionFail(
        "S3P_VALIDATE_FAILED",
        `Compte mobile : statut « ${validated.status} » (attendu vérifié).`,
      );
    }
  } catch (e) {
    return actionFail(
      readAxiosFeCode(e) ?? "S3P_VALIDATE_FAILED",
      readS3pOrAxiosErrorMessage(e),
    );
  }

  let quoteId: string;
  let payItemIdQuoted: string;
  try {
    const quote = await smobilpayService.requestQuote({
      amount,
      payItemId: line.payItemId,
    });
    quoteId = quote.quoteId;
    payItemIdQuoted = quote.payItemId;
  } catch (e) {
    return actionFail(
      readAxiosFeCode(e) ?? "S3P_QUOTE_FAILED",
      readS3pOrAxiosErrorMessage(e),
    );
  }

  const nationalService =
    data.walletDestination.startsWith("237") &&
    data.walletDestination.length > 9
      ? data.walletDestination.slice(3)
      : data.walletDestination;

  try {
    const collection = await smobilpayService.collect({
      quoteId,
      customerPhonenumber: data.customerPhonenumber,
      customerEmailaddress: data.customerEmailaddress,
      customerName: data.customerName,
      customerAddress: data.customerAddress,
      serviceNumber: nationalService,
      trid: data.trid,
    });

    return actionOk({
      quoteId,
      ptn: collection.ptn,
      trid: collection.trid ?? data.trid,
      receiptNumber: collection.receiptNumber,
      veriCode: collection.veriCode,
      status: String(collection.status),
      payItemId: collection.payItemId ?? payItemIdQuoted,
    });
  } catch (e) {
    return actionFail(
      readAxiosFeCode(e) ?? "S3P_COLLECT_FAILED",
      readS3pOrAxiosErrorMessage(e),
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
      readS3pOrAxiosErrorMessage(e),
    );
  }
}
