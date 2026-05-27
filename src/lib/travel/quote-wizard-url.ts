import {
  QUOTE_PRODUCT_CODE_AUTO,
  QUOTE_PRODUCT_CODE_HEALTH,
  QUOTE_PRODUCT_CODE_HOME,
  QUOTE_PRODUCT_CODE_PET,
  QUOTE_PRODUCT_CODE_TRAVEL,
  QUOTE_WIZARD_STEP_CODE_FORM,
  QUOTE_WIZARD_STEP_CODE_QUOTE,
  QUOTE_WIZARD_STEP_CODE_TRAVELER,
  TRIP_PRODUCT_CATEGORY_OPTIONS,
  URL_PARAM_ADULTS,
  URL_PARAM_AGE,
  URL_PARAM_CATEGORY,
  URL_PARAM_DEPART,
  URL_PARAM_DEST,
  URL_PARAM_DEST_COUNTRY,
  URL_PARAM_PRODUCT,
  URL_PARAM_RETURN,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import {
  destinationAreaCodeFromValue,
  destinationAreaValueFromCode,
} from "@/lib/travel/destination-area";
import { isWorldCoverageZone } from "@/lib/travel/authorized-countries";
import type { TravelerInfoData, TripDetailsData } from "@/types/travel";

export type QuoteSidebarProductId = "travel" | "home" | "auto" | "pet" | "health";

export type QuoteWizardStepIndex = 0 | 1;

const PRODUCT_CODE_TO_ID: Record<string, QuoteSidebarProductId> = {
  [QUOTE_PRODUCT_CODE_TRAVEL]: "travel",
  [QUOTE_PRODUCT_CODE_HOME]: "home",
  [QUOTE_PRODUCT_CODE_AUTO]: "auto",
  [QUOTE_PRODUCT_CODE_PET]: "pet",
  [QUOTE_PRODUCT_CODE_HEALTH]: "health",
};

const PRODUCT_ID_TO_CODE: Record<QuoteSidebarProductId, string> = {
  travel: QUOTE_PRODUCT_CODE_TRAVEL,
  home: QUOTE_PRODUCT_CODE_HOME,
  auto: QUOTE_PRODUCT_CODE_AUTO,
  pet: QUOTE_PRODUCT_CODE_PET,
  health: QUOTE_PRODUCT_CODE_HEALTH,
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
  if (c === QUOTE_WIZARD_STEP_CODE_FORM || c === QUOTE_WIZARD_STEP_CODE_TRAVELER) return 0;
  if (c === QUOTE_WIZARD_STEP_CODE_QUOTE) return 1;
  return null;
}

export function wizardStepUrlCodeFromIndex(step: QuoteWizardStepIndex): string {
  if (step === 0) return QUOTE_WIZARD_STEP_CODE_FORM;
  return QUOTE_WIZARD_STEP_CODE_QUOTE;
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

/** Construit les paramètres d'URL pour le parcours devis (produit + étape + données). */
export function buildQuoteWizardSearchParams(opts: {
  productId: QuoteSidebarProductId;
  stepIndex: QuoteWizardStepIndex;
  trip: TripDetailsData | null;
  traveler: TravelerInfoData | null;
}): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_PRODUCT, quoteProductCodeFromId(opts.productId));
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

  if (opts.traveler != null) {
    sp.set(URL_PARAM_AGE, String(opts.traveler.oldest_traveler_age));
  }

  return sp;
}

/** Ajuste l'étape affichée si l'URL demande une étape sans données suffisantes. */
export function resolveWizardStepIndex(
  requested: QuoteWizardStepIndex | null,
  trip: TripDetailsData | null,
  traveler: TravelerInfoData | null,
  hasStoredHolder: boolean,
): QuoteWizardStepIndex {
  if (requested == null) return 0;
  if (!trip || !traveler || !hasStoredHolder) return 0;
  if (requested === 1) return 1;
  return 0;
}
