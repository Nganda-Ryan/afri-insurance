/** Defaults aligned with EVO-API UAT AFRI Cameroun Postman collection. */

export const EVO_DEFAULT_OAUTH_SCOPE =
  "urn:axa.partners.sales.individual.travel.quotesrequests.write urn:axa.partners.sales.individual.travel.policies.write";

export const EVO_DEFAULT_QUOTE_MODE = "LIVE" as const;

export const EVO_DEFAULT_CATALOG = {
  reference: "81TS0124",
  version: 1,
} as const;

export const EVO_DEFAULT_CONTEXT = {
  currency: "EUR",
  country: "Cameroun",
  language: "FR",
} as const;
