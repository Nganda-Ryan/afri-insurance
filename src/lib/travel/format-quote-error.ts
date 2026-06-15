import {
  EVO_PRODUCT_NOT_FOUND_CODE,
  EVO_QUOTE_NOT_FOUND_CODE,
} from "@/lib/constants/evo-api";

export type QuoteErrorDisplay = {
  message: string;
  code: string | null;
};

type EvoErrorPayload = {
  error_description?: string;
  fe_code_error?: string;
  error?: string;
};

const QUOTE_ERROR_MESSAGES_FR: Record<string, string> = {
  [EVO_PRODUCT_NOT_FOUND_CODE]:
    "Aucune formule d'assurance ne correspond aux informations saisies.",
  [EVO_QUOTE_NOT_FOUND_CODE]:
    "Aucune formule disponible pour ce voyage.",
  "error.quoting.invalid.not.found":
    "Aucune formule disponible pour ce voyage.",
};

const EN_DESCRIPTION_TO_FR: Record<string, string> = {
  "Product not found": "Produit introuvable pour cette combinaison voyage.",
};

function parseEvoErrorPayload(message: string): EvoErrorPayload | null {
  const trimmed = message.trim();
  if (!trimmed.startsWith("{")) return null;
  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    return {
      error_description:
        typeof parsed.error_description === "string"
          ? parsed.error_description
          : undefined,
      fe_code_error:
        typeof parsed.fe_code_error === "string"
          ? parsed.fe_code_error
          : undefined,
      error: typeof parsed.error === "string" ? parsed.error : undefined,
    };
  } catch {
    return null;
  }
}

function resolveFrenchMessage(
  rawMessage: string,
  code: string | null,
): string {
  if (code && QUOTE_ERROR_MESSAGES_FR[code]) {
    return QUOTE_ERROR_MESSAGES_FR[code];
  }

  const trimmed = rawMessage.trim();
  if (trimmed && QUOTE_ERROR_MESSAGES_FR[trimmed]) {
    return QUOTE_ERROR_MESSAGES_FR[trimmed];
  }

  if (trimmed && EN_DESCRIPTION_TO_FR[trimmed]) {
    return EN_DESCRIPTION_TO_FR[trimmed];
  }

  if (trimmed.startsWith("{")) {
    return "Une erreur est survenue lors du devis.";
  }

  return trimmed || "Une erreur est survenue lors du devis.";
}

/** Normalise message + code EVO pour l'affichage étape devis. */
export function formatQuoteErrorDisplay(
  message: string,
  code?: string | null,
): QuoteErrorDisplay {
  const parsed = parseEvoErrorPayload(message);
  const resolvedCode =
    (code?.trim() || parsed?.fe_code_error?.trim() || parsed?.error?.trim()) ??
    null;
  const rawMessage =
    parsed?.error_description?.trim() ||
    (message.trim().startsWith("{") ? "" : message.trim());

  return {
    message: resolveFrenchMessage(rawMessage, resolvedCode),
    code: resolvedCode,
  };
}
