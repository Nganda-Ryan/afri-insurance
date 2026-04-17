import { EVO_DEFAULT_CONTEXT } from "@/config/evo-api";
import type { TravelQuoteContext } from "@/types/travel";

export function subscriptionCountryFromQuoteContext(
  ctx?: TravelQuoteContext,
): string {
  const c = ctx?.country?.trim();
  if (c) return c;
  return EVO_DEFAULT_CONTEXT.country;
}

/** Code langue court pour Subscribe Policy (ex. `FR` → `fr`). */
export function languageCodeFromQuoteContext(ctx?: TravelQuoteContext): string {
  const raw = (ctx?.language ?? EVO_DEFAULT_CONTEXT.language).trim();
  if (!raw) return EVO_DEFAULT_CONTEXT.language.toLowerCase();
  if (raw.length <= 5 && !raw.includes("-")) return raw.toLowerCase();
  return raw.slice(0, 2).toLowerCase();
}
