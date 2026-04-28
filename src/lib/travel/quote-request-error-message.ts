import type { ActionResult } from "@/types/action-result";
import type { TravelQuoteActionData } from "@/types/travel";

/** Message à afficher : `envelope.error.message` si `!envelope.ok`, sinon incident rare React Query. */
export function quoteRequestErrorMessage(
  envelope: ActionResult<TravelQuoteActionData> | undefined,
  queryError?: unknown,
): string {
  if (envelope != null && !envelope.ok && envelope.error) {
    return envelope.error.message;
  }
  if (queryError instanceof Error) return queryError.message;
  if (queryError != null) return String(queryError);
  return "";
}
