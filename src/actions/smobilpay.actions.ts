"use server";

import { getS3pErrorMessage } from "@/lib/errorCode";
import { actionFail, actionOk } from "@/lib/http/action-result";
import {
  readAxiosFeCode,
  readS3pOrAxiosErrorMessage,
} from "@/lib/http/axios-error-body";
import { resolveCashoutPayItem } from "@/lib/smobilpay/cashout-pay-item";
import { roundPaymentAmountUp } from "@/lib/smobilpay/payment-amount";
import { s3pCashoutCollectInputSchema, s3pVerifyInputSchema } from "@/schemas/smobilpay";
import { smobilpayService } from "@/services/smobilpay.service";
import type { ActionResult } from "@/types/action-result";
import type {
  S3pCashoutCollectResult,
  S3pPaymentStatusDto,
  S3pVerifyInput,
} from "@/types/smobilpay";

/**
 * Paiement cash-out (OM / MoMo) avant souscription :
 * GET /cashout → POST /quotestd → POST /collectstd.
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

  const data = parsed.data;
  console.log("Payload.parsed", parsed.data);

  const amount = roundPaymentAmountUp(data.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return actionFail("VALIDATION_ERROR", "Montant de paiement invalide.");
  }

  const cashoutResolved = await resolveCashoutPayItem(data.channel);
  console.log("Payload.cashoutResolved", cashoutResolved);
  if (!cashoutResolved.ok || !cashoutResolved.data) {
    return actionFail(
      cashoutResolved.error?.code ?? "S3P_CASHOUT_LINE_NOT_FOUND",
      cashoutResolved.error?.message ??
        "Ce moyen de paiement n'est pas disponible pour le moment.",
    );
  }
  const { line } = cashoutResolved.data;

  let quoteId: string;
  let payItemIdQuoted: string;
  try {
    console.log("requestQuote.payload", {
      amount,
      payItemId: line.payItemId,
    });
    const quote = await smobilpayService.requestQuote({
      amount,
      payItemId: line.payItemId,
    });
    console.log("requestQuote.result", quote);
    quoteId = quote.quoteId;
    payItemIdQuoted = quote.payItemId;
  } catch (e) {
    return actionFail(
      readAxiosFeCode(e) ?? "S3P_QUOTE_FAILED",
      readS3pOrAxiosErrorMessage(e),
    );
  }

  try {
    console.log("collect.payload", {
      quoteId,
      customerPhonenumber: data.subscriberPhone,
      customerEmailaddress: data.customerEmailaddress,
      customerName: data.customerName,
      customerAddress: data.customerAddress,
      serviceNumber: data.paymentPhone,
      trid: data.trid,
    });
    const collection = await smobilpayService.collect({
      quoteId,
      customerPhonenumber: data.subscriberPhone,
      customerEmailaddress: data.customerEmailaddress,
      customerName: data.customerName,
      customerAddress: data.customerAddress,
      serviceNumber: data.paymentPhone,
      trid: data.trid,
    });
    console.log("collect.result", collection);

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
    console.log("verifyTx.result", list);
    return actionOk(list[0] ?? null);
  } catch (e) {
    const code = readAxiosFeCode(e);
    return actionFail(
      code ?? "S3P_VERIFY_FAILED",
      getS3pErrorMessage(code, readS3pOrAxiosErrorMessage(e)),
    );
  }
}
