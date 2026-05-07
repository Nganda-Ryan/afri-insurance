import axios from "axios";

import { toError } from "@/lib/http/errors";

/**
 * Résout l'AxiosError sous-jacent depuis n'importe quelle erreur.
 * toError() enveloppe toujours l'erreur originale dans `e.cause`,
 * donc on peut remonter la chaîne cause → cause → … jusqu'à trouver
 * un AxiosError, même après plusieurs niveaux d'enveloppement.
 */
function resolveAxiosError(e: unknown): import("axios").AxiosError | null {
  if (axios.isAxiosError(e)) return e;
  if (e instanceof Error && e.cause !== undefined) {
    return resolveAxiosError(e.cause);
  }
  return null;
}

/**
 * Lit le code d'erreur fonctionnel depuis n'importe quelle erreur.
 *
 * Priorité dans le corps de la réponse :
 *   1. `fe_code_error`  (champ EVO standard)
 *   2. `error`          (champ EVO alternatif, ex. "error.data_missmatch")
 *
 * Fonctionne que l'erreur soit un AxiosError direct ou un plain Error
 * enveloppé par toError() (la couche service).
 */
export function readAxiosFeCode(e: unknown): string | null {
  const ax = resolveAxiosError(e);
  if (!ax) return null;

  const d = ax.response?.data;
  if (d === null || typeof d !== "object") return null;

  const obj = d as Record<string, unknown>;
  if (typeof obj.fe_code_error === "string") return obj.fe_code_error;
  if (typeof obj.error === "string") return obj.error;
  if (typeof obj.respCode === "string") return obj.respCode;
  if (typeof obj.respCode === "number") return String(obj.respCode);
  return null;
}

/**
 * Lit le message lisible depuis n'importe quelle erreur.
 *
 * Priorité dans le corps de la réponse :
 *   1. `error_description`
 *   2. `error`
 *   3. message Axios générique ou e.message
 *
 * Fonctionne que l'erreur soit un AxiosError direct ou un plain Error
 * enveloppé par toError() (la couche service).
 */
export function readAxiosErrorMessage(e: unknown): string {
  const ax = resolveAxiosError(e);
  if (ax) {
    const d = ax.response?.data;
    if (d !== null && typeof d === "object") {
      const obj = d as Record<string, unknown>;
      if (typeof obj.error_description === "string" && obj.error_description.trim())
        return obj.error_description.trim();
      if (typeof obj.error === "string" && obj.error.trim())
        return obj.error.trim();
    }
    return toError(ax).message;
  }

  return e instanceof Error ? e.message : toError(e).message;
}

export type S3pCustomerMsgLang = "fr" | "en";

/** Corps d'erreur S3P (Smobilpay) : `customerMsg[]` avec language / content. */
export function readS3pCustomerMessage(
  e: unknown,
  preferLang: S3pCustomerMsgLang = "fr",
): string | null {
  const ax = resolveAxiosError(e);
  const d = ax?.response?.data;
  if (d === null || typeof d !== "object" || Array.isArray(d)) return null;
  const obj = d as Record<string, unknown>;
  const msgs = obj.customerMsg;
  if (!Array.isArray(msgs)) return null;
  for (const item of msgs) {
    if (
      item !== null &&
      typeof item === "object" &&
      typeof (item as Record<string, unknown>).language === "string" &&
      typeof (item as Record<string, unknown>).content === "string" &&
      (item as Record<string, unknown>).language === preferLang
    ) {
      return String((item as Record<string, unknown>).content).trim();
    }
  }
  const first = msgs[0];
  if (first !== null && typeof first === "object") {
    const c = (first as Record<string, unknown>).content;
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  return null;
}

export function readS3pOrAxiosErrorMessage(e: unknown): string {
  return (
    readS3pCustomerMessage(e, "fr") ??
    readS3pCustomerMessage(e, "en") ??
    readAxiosErrorMessage(e)
  );
}
