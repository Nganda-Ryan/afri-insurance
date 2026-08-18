import {
  QUOTE_PRODUCT_CODE_AUTO,
  QUOTE_PRODUCT_CODE_HEALTH,
  QUOTE_PRODUCT_CODE_HOME,
  QUOTE_PRODUCT_CODE_PET,
  QUOTE_PRODUCT_CODE_PREVOYANCE,
  QUOTE_PRODUCT_CODE_TRAVEL,
  QUOTE_WIZARD_STEP_CODE_DETAILS,
  QUOTE_WIZARD_STEP_CODE_FORM,
  QUOTE_WIZARD_STEP_CODE_PAYMENT,
  QUOTE_WIZARD_STEP_CODE_QUOTE,
  QUOTE_WIZARD_STEP_CODE_RECAP,
  QUOTE_WIZARD_STEP_CODE_TRAVELER,
  QUOTE_WIZARD_STEP_CODE_TRIP,
  TRIP_PRODUCT_CATEGORY_OPTIONS,
  URL_PARAM_ADULTS,
  URL_PARAM_AGE,
  URL_PARAM_CATEGORY,
  URL_PARAM_COUNTRY,
  URL_PARAM_CURRENCY,
  URL_PARAM_DEPART,
  URL_PARAM_DEST,
  URL_PARAM_DEST_COUNTRY,
  URL_PARAM_LANGUAGE,
  URL_PARAM_PLAN_NAME,
  URL_PARAM_PLAN_PRICE,
  URL_PARAM_PRODUCT_INDEX,
  URL_PARAM_QUOTE_CODE,
  URL_PARAM_QUOTE_ID,
  URL_PARAM_RETURN,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { TRAVEL_QUOTE_FLOW_STEP } from "@/lib/constants/quote-flow";
import {
  destinationAreaCodeFromValue,
  destinationAreaValueFromCode,
} from "@/lib/travel/destination-area";
import { isWorldCoverageZone } from "@/lib/travel/authorized-countries";
import type {
  SelectedPlan,
  TravelerInfoData,
  TravelQuoteContext,
  TripDetailsData,
} from "@/types/travel";

export type QuoteSidebarProductId =
  | "travel"
  | "home"
  | "auto"
  | "pet"
  | "health"
  | "prevoyance";

/** Indices d'étape du parcours complet (0–4), alignés sur `TRAVEL_QUOTE_FLOW_STEP`. */
export type QuoteWizardStepIndex = 0 | 1 | 2 | 3 | 4;

export interface ParsedSelectedPlan {
  plan: SelectedPlan;
  quoteCode: string;
  quoteId?: number;
  quoteContext: TravelQuoteContext;
}

const PRODUCT_CODE_TO_ID: Record<string, QuoteSidebarProductId> = {
  [QUOTE_PRODUCT_CODE_TRAVEL]: "travel",
  [QUOTE_PRODUCT_CODE_HOME]: "home",
  [QUOTE_PRODUCT_CODE_AUTO]: "auto",
  [QUOTE_PRODUCT_CODE_PET]: "pet",
  [QUOTE_PRODUCT_CODE_HEALTH]: "health",
  [QUOTE_PRODUCT_CODE_PREVOYANCE]: "prevoyance",
};

const PRODUCT_ID_TO_CODE: Record<QuoteSidebarProductId, string> = {
  travel: QUOTE_PRODUCT_CODE_TRAVEL,
  home: QUOTE_PRODUCT_CODE_HOME,
  auto: QUOTE_PRODUCT_CODE_AUTO,
  pet: QUOTE_PRODUCT_CODE_PET,
  health: QUOTE_PRODUCT_CODE_HEALTH,
  prevoyance: QUOTE_PRODUCT_CODE_PREVOYANCE,
};

export function quoteProductIdFromUrlCode(
  code: string | null | undefined,
): QuoteSidebarProductId | null {
  if (!code) return null;
  const id = PRODUCT_CODE_TO_ID[code.trim().toLowerCase()];
  return id ?? null;
}

export function quoteProductCodeFromId(id: QuoteSidebarProductId): string {
  return PRODUCT_ID_TO_CODE[id];
}

export function wizardStepIndexFromUrlCode(
  code: string | null | undefined,
): QuoteWizardStepIndex | null {
  if (!code) return null;
  const c = code.trim().toLowerCase();
  if (
    c === QUOTE_WIZARD_STEP_CODE_TRIP ||
    c === QUOTE_WIZARD_STEP_CODE_FORM ||
    c === QUOTE_WIZARD_STEP_CODE_TRAVELER
  ) {
    return TRAVEL_QUOTE_FLOW_STEP.TRIP;
  }
  if (c === QUOTE_WIZARD_STEP_CODE_QUOTE) return TRAVEL_QUOTE_FLOW_STEP.QUOTE;
  if (c === QUOTE_WIZARD_STEP_CODE_DETAILS) return TRAVEL_QUOTE_FLOW_STEP.DETAILS;
  if (c === QUOTE_WIZARD_STEP_CODE_RECAP) return TRAVEL_QUOTE_FLOW_STEP.RECAP;
  if (c === QUOTE_WIZARD_STEP_CODE_PAYMENT) return TRAVEL_QUOTE_FLOW_STEP.PAYMENT;
  return null;
}

export function wizardStepUrlCodeFromIndex(step: QuoteWizardStepIndex): string {
  if (step === TRAVEL_QUOTE_FLOW_STEP.TRIP) return QUOTE_WIZARD_STEP_CODE_TRIP;
  if (step === TRAVEL_QUOTE_FLOW_STEP.QUOTE) return QUOTE_WIZARD_STEP_CODE_QUOTE;
  if (step === TRAVEL_QUOTE_FLOW_STEP.DETAILS) return QUOTE_WIZARD_STEP_CODE_DETAILS;
  if (step === TRAVEL_QUOTE_FLOW_STEP.RECAP) return QUOTE_WIZARD_STEP_CODE_RECAP;
  return QUOTE_WIZARD_STEP_CODE_PAYMENT;
}

function tripCategoryValueFromCode(code: string): string | undefined {
  const c = code.trim().toLowerCase();
  return TRIP_PRODUCT_CATEGORY_OPTIONS.find((o) => o.code === c)?.value;
}

function tripCategoryCodeFromValue(value: string): string | undefined {
  return TRIP_PRODUCT_CATEGORY_OPTIONS.find((o) => o.value === value)?.code;
}

function isIsoDate(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

export function isTripDetailsComplete(
  t: Partial<TripDetailsData>,
): t is TripDetailsData {
  const hasDestinationCountry =
    typeof t.destination_country === "string" &&
    (isWorldCoverageZone(t.destination_area ?? "") ||
      t.destination_country.trim().length > 0);

  return (
    typeof t.destination_area === "string" &&
    t.destination_area.trim().length > 0 &&
    hasDestinationCountry &&
    typeof t.start_date === "string" &&
    t.start_date.length > 0 &&
    typeof t.end_date === "string" &&
    t.end_date.length > 0 &&
    typeof t.adult === "number" &&
    Number.isFinite(t.adult) &&
    t.adult >= 1 &&
    typeof t.product_category === "string" &&
    t.product_category.length > 0
  );
}

export function isTravelerInfoComplete(
  traveler: TravelerInfoData | null,
): traveler is TravelerInfoData {
  if (!traveler) return false;
  const n = traveler.oldest_traveler_age;
  return Number.isFinite(n) && n >= 0 && n <= 99;
}

export function isWizardTripStepComplete(
  trip: TripDetailsData | null,
  traveler: TravelerInfoData | null,
): boolean {
  return (
    trip != null &&
    isTripDetailsComplete(trip) &&
    isTravelerInfoComplete(traveler)
  );
}

export function parseSelectedPlanFromSearchParams(
  sp: URLSearchParams,
): ParsedSelectedPlan | null {
  const planName = sp.get(URL_PARAM_PLAN_NAME)?.trim() ?? "";
  const planPrice = Number(sp.get(URL_PARAM_PLAN_PRICE) ?? "0");
  const productIndex = Number.parseInt(sp.get(URL_PARAM_PRODUCT_INDEX) ?? "", 10);
  if (!planName || !Number.isFinite(planPrice) || planPrice <= 0) return null;
  if (!Number.isInteger(productIndex) || productIndex < 0) return null;

  const quoteIdRaw = sp.get(URL_PARAM_QUOTE_ID);
  const quoteIdParsed =
    quoteIdRaw != null ? Number.parseInt(quoteIdRaw, 10) : Number.NaN;
  const quoteId =
    Number.isInteger(quoteIdParsed) && quoteIdParsed > 0
      ? quoteIdParsed
      : undefined;

  return {
    plan: {
      name: planName,
      price: planPrice,
      type: "standard",
      product_index: productIndex,
      source: "api",
    },
    quoteCode: sp.get(URL_PARAM_QUOTE_CODE)?.trim() ?? "",
    quoteId,
    quoteContext: {
      currency: sp.get(URL_PARAM_CURRENCY) ?? undefined,
      country: sp.get(URL_PARAM_COUNTRY) ?? undefined,
      language: sp.get(URL_PARAM_LANGUAGE) ?? undefined,
    },
  };
}

/** Lit les champs voyage depuis les query params (codes `cat` / `dst`). */
export function parseTripDetailsFromSearchParams(
  sp: URLSearchParams,
): TripDetailsData | null {
  const catParam = sp.get(URL_PARAM_CATEGORY);
  const dstParam = sp.get(URL_PARAM_DEST);
  const dstCountryParam = sp.get(URL_PARAM_DEST_COUNTRY);
  const dep = sp.get(URL_PARAM_DEPART);
  const ret = sp.get(URL_PARAM_RETURN);
  const advRaw = sp.get(URL_PARAM_ADULTS);

  const product_category = catParam
    ? (tripCategoryValueFromCode(catParam) ?? catParam.trim())
    : undefined;
  const destination_area = dstParam
    ? (destinationAreaValueFromCode(dstParam) ?? dstParam.trim())
    : undefined;
  const destination_country = dstCountryParam?.trim() || undefined;

  const adult = advRaw != null ? Number.parseInt(advRaw, 10) : Number.NaN;

  const partial: Partial<TripDetailsData> = {
    ...(product_category != null
      ? { product_category: product_category as TripDetailsData["product_category"] }
      : {}),
    ...(destination_area != null ? { destination_area } : {}),
    ...(destination_country != null ? { destination_country } : {}),
    ...(dep && isIsoDate(dep) ? { start_date: dep } : {}),
    ...(ret && isIsoDate(ret) ? { end_date: ret } : {}),
    ...(Number.isFinite(adult) && adult >= 1 ? { adult } : {}),
  };

  return isTripDetailsComplete(partial) ? partial : null;
}

export function parseTravelerInfoFromSearchParams(
  sp: URLSearchParams,
): TravelerInfoData | null {
  const ageRaw = sp.get(URL_PARAM_AGE);
  if (ageRaw == null) return null;
  const n = Number.parseInt(ageRaw, 10);
  if (!Number.isFinite(n) || n < 0 || n > 99) return null;
  return { oldest_traveler_age: n };
}

function appendPlanToSearchParams(
  sp: URLSearchParams,
  selection: ParsedSelectedPlan | null,
): void {
  if (!selection) return;
  sp.set(URL_PARAM_PLAN_NAME, selection.plan.name);
  sp.set(URL_PARAM_PLAN_PRICE, String(selection.plan.price));
  sp.set(URL_PARAM_PRODUCT_INDEX, String(selection.plan.product_index));
  if (selection.quoteCode.trim()) {
    sp.set(URL_PARAM_QUOTE_CODE, selection.quoteCode);
  }
  if (
    selection.quoteId != null &&
    Number.isInteger(selection.quoteId) &&
    selection.quoteId > 0
  ) {
    sp.set(URL_PARAM_QUOTE_ID, String(selection.quoteId));
  }
  if (selection.quoteContext.currency?.trim()) {
    sp.set(URL_PARAM_CURRENCY, selection.quoteContext.currency);
  }
  if (selection.quoteContext.country?.trim()) {
    sp.set(URL_PARAM_COUNTRY, selection.quoteContext.country);
  }
  if (selection.quoteContext.language?.trim()) {
    sp.set(URL_PARAM_LANGUAGE, selection.quoteContext.language);
  }
}

/** Construit les paramètres d'URL pour le parcours devis (produit + étape + données). */
export function buildQuoteWizardSearchParams(opts: {
  productId: QuoteSidebarProductId;
  stepIndex: QuoteWizardStepIndex;
  trip: TripDetailsData | null;
  traveler: TravelerInfoData | null;
  selection?: ParsedSelectedPlan | null;
}): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, wizardStepUrlCodeFromIndex(opts.stepIndex));

  if (opts.trip && isTripDetailsComplete(opts.trip)) {
    const cat = tripCategoryCodeFromValue(opts.trip.product_category);
    const dst = destinationAreaCodeFromValue(opts.trip.destination_area);
    sp.set(URL_PARAM_CATEGORY, cat ?? opts.trip.product_category);
    sp.set(URL_PARAM_DEST, dst ?? opts.trip.destination_area);
    if (opts.trip.destination_country.trim()) {
      sp.set(URL_PARAM_DEST_COUNTRY, opts.trip.destination_country);
    }
    sp.set(URL_PARAM_DEPART, opts.trip.start_date);
    sp.set(URL_PARAM_RETURN, opts.trip.end_date);
    sp.set(URL_PARAM_ADULTS, String(opts.trip.adult));
  }

  if (opts.traveler != null && isTravelerInfoComplete(opts.traveler)) {
    sp.set(URL_PARAM_AGE, String(opts.traveler.oldest_traveler_age));
  }

  if (
    opts.stepIndex >= TRAVEL_QUOTE_FLOW_STEP.DETAILS &&
    opts.selection
  ) {
    appendPlanToSearchParams(sp, opts.selection);
  }

  return sp;
}

/** Migre d'anciens paramètres `/subscribe` vers le format page d'accueil. */
export function migrateLegacySubscribeParams(sp: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(sp.toString());
  const legacyMap: [string, string][] = [
    ["planName", URL_PARAM_PLAN_NAME],
    ["planPrice", URL_PARAM_PLAN_PRICE],
    ["productIndex", URL_PARAM_PRODUCT_INDEX],
    ["quoteCode", URL_PARAM_QUOTE_CODE],
    ["quoteId", URL_PARAM_QUOTE_ID],
    ["quote_id", URL_PARAM_QUOTE_ID],
    ["currency", URL_PARAM_CURRENCY],
    ["country", URL_PARAM_COUNTRY],
    ["language", URL_PARAM_LANGUAGE],
  ];
  for (const [legacy, modern] of legacyMap) {
    const v = next.get(legacy);
    if (v != null && !next.has(modern)) {
      next.set(modern, v);
      next.delete(legacy);
    }
  }
  if (!next.has(URL_PARAM_STEP) && next.has(URL_PARAM_PLAN_NAME)) {
    next.set(URL_PARAM_STEP, QUOTE_WIZARD_STEP_CODE_DETAILS);
  }
  return next;
}

/**
 * Ajuste l'étape affichée si l'URL demande une étape sans données suffisantes.
 * Ne lit pas sessionStorage : l'URL est la source de vérité pour éviter les erreurs d'hydratation.
 */
export function resolveWizardStepIndex(
  requested: QuoteWizardStepIndex | null,
  trip: TripDetailsData | null,
  traveler: TravelerInfoData | null,
  selection: ParsedSelectedPlan | null,
): QuoteWizardStepIndex {
  if (!isWizardTripStepComplete(trip, traveler)) {
    return TRAVEL_QUOTE_FLOW_STEP.TRIP;
  }

  const req = requested ?? TRAVEL_QUOTE_FLOW_STEP.TRIP;
  if (req <= TRAVEL_QUOTE_FLOW_STEP.QUOTE) {
    if (req === TRAVEL_QUOTE_FLOW_STEP.TRIP) return TRAVEL_QUOTE_FLOW_STEP.TRIP;
    return TRAVEL_QUOTE_FLOW_STEP.QUOTE;
  }

  if (!selection) return TRAVEL_QUOTE_FLOW_STEP.QUOTE;

  if (req === TRAVEL_QUOTE_FLOW_STEP.DETAILS) {
    return TRAVEL_QUOTE_FLOW_STEP.DETAILS;
  }

  if (req === TRAVEL_QUOTE_FLOW_STEP.RECAP) {
    return TRAVEL_QUOTE_FLOW_STEP.RECAP;
  }

  if (req >= TRAVEL_QUOTE_FLOW_STEP.PAYMENT) {
    return TRAVEL_QUOTE_FLOW_STEP.PAYMENT;
  }

  return TRAVEL_QUOTE_FLOW_STEP.DETAILS;
}
