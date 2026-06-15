function envOrDefault(name: string, fallback: string): string {
  const v = process.env[name]?.trim();
  return v && v.length > 0 ? v : fallback;
}

function envIntOrDefault(name: string, fallback: number): number {
  const v = process.env[name]?.trim();
  if (!v) return fallback;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Scope OAuth (server-side en général). Peut être surchargé via `EVO_OAUTH_SCOPE`.
 * (fallback pour éviter les crashes côté client si importé accidentellement)
 */
export const EVO_DEFAULT_OAUTH_SCOPE = envOrDefault(
  "EVO_OAUTH_SCOPE",
  "urn:axa.partners.sales.individual.travel.quotesrequests.write urn:axa.partners.sales.individual.travel.policies.write",
);

/** Header x-quote-mode. Surcharge via `NEXT_PUBLIC_EVO_QUOTE_MODE`. */
export const EVO_DEFAULT_QUOTE_MODE = envOrDefault(
  "NEXT_PUBLIC_EVO_QUOTE_MODE",
  "LIVE",
) as "LIVE" | "TEST" | "UAT" | string;

/** Surcharges via `NEXT_PUBLIC_EVO_CATALOG_REFERENCE` et `NEXT_PUBLIC_EVO_CATALOG_VERSION`. */
export const EVO_DEFAULT_CATALOG = {
  reference: envOrDefault("NEXT_PUBLIC_EVO_CATALOG_REFERENCE", "81TS0124"),
  version: envIntOrDefault("NEXT_PUBLIC_EVO_CATALOG_VERSION", 1),
} as const;

/** Surcharges via `NEXT_PUBLIC_EVO_DEFAULT_CURRENCY/COUNTRY/LANGUAGE`. */
export const EVO_DEFAULT_CONTEXT = {
  currency: envOrDefault("NEXT_PUBLIC_EVO_DEFAULT_CURRENCY", "Franc CFA"),
  country: envOrDefault("NEXT_PUBLIC_EVO_DEFAULT_COUNTRY", "Cameroun"),
  language: envOrDefault("NEXT_PUBLIC_EVO_DEFAULT_LANGUAGE", "FR"),
} as const;
