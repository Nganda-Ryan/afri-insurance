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
