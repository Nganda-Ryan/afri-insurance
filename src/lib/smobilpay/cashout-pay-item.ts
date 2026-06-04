import "server-only";

import { getMomoServiceId, getOmServiceId } from "@/lib/env/server";
import { actionFail, actionOk } from "@/lib/http/action-result";
import {
  readAxiosFeCode,
  readS3pOrAxiosErrorMessage,
} from "@/lib/http/axios-error-body";
import { smobilpayService } from "@/services/smobilpay.service";
import type { ActionResult } from "@/types/action-result";
import type { S3pCashoutLineDto } from "@/types/smobilpay";

export interface ResolvedCashoutPayItem {
  payItemId: string;
  serviceId: string;
  line: S3pCashoutLineDto;
}

/**
 * Résout le payItemId pour POST /quotestd via GET /cashout uniquement.
 * La ligne est choisie par serviceid (MOMO_SERVICE_ID ou OM_SERVICE_ID).
 */
export async function resolveCashoutPayItem(
  channel: "om" | "momo",
): Promise<ActionResult<ResolvedCashoutPayItem>> {
  const serviceId =
    channel === "momo" ? getMomoServiceId() : getOmServiceId();

  if (channel === "om" && !serviceId.trim()) {
    return actionFail(
      "CONFIG_ERROR",
      "Orange Money n'est pas configuré (OM_SERVICE_ID).",
    );
  }

  let cashout: S3pCashoutLineDto[];
  try {
    cashout = await smobilpayService.getCashout();
  } catch (e) {
    return actionFail(
      readAxiosFeCode(e) ?? "S3P_CASHOUT_FAILED",
      readS3pOrAxiosErrorMessage(e),
    );
  }

  const line = cashout.find(
    (row) => String(row.serviceid) === String(serviceId),
  );
  if (!line?.payItemId) {
    return actionFail(
      "S3P_CASHOUT_LINE_NOT_FOUND",
      `Aucune ligne cash-out pour serviceid=${serviceId} (${channel}).`,
    );
  }

  return actionOk({
    payItemId: line.payItemId,
    serviceId: String(serviceId),
    line,
  });
}
