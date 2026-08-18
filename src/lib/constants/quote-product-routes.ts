import {
  QUOTE_PRODUCT_CODE_AUTO,
  QUOTE_PRODUCT_CODE_HEALTH,
  QUOTE_PRODUCT_CODE_HOME,
  QUOTE_PRODUCT_CODE_PET,
  QUOTE_PRODUCT_CODE_PREVOYANCE,
  QUOTE_PRODUCT_CODE_TRAVEL,
  QUOTE_WIZARD_STEP_CODE_TRIP,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import type { QuoteSidebarProductId } from "@/lib/travel/quote-wizard-url";

/** Chemins pathname des pages devis (produit = pathname, pas query `p`). */
export const QUOTE_PRODUCT_PATH: Record<QuoteSidebarProductId, string> = {
  travel: "/voyage",
  auto: "/auto",
  home: "/habitation",
  health: "/sante",
  prevoyance: "/prevoyance",
  pet: "/animaux",
};

const PATH_TO_PRODUCT_ID: Record<string, QuoteSidebarProductId> = {
  [QUOTE_PRODUCT_PATH.travel]: "travel",
  [QUOTE_PRODUCT_PATH.auto]: "auto",
  [QUOTE_PRODUCT_PATH.home]: "home",
  [QUOTE_PRODUCT_PATH.health]: "health",
  [QUOTE_PRODUCT_PATH.prevoyance]: "prevoyance",
  [QUOTE_PRODUCT_PATH.pet]: "pet",
};

/** Mapping legacy `?p=` → pathname (redirects). */
export const LEGACY_PRODUCT_CODE_TO_PATH: Record<string, string> = {
  [QUOTE_PRODUCT_CODE_TRAVEL]: QUOTE_PRODUCT_PATH.travel,
  [QUOTE_PRODUCT_CODE_AUTO]: QUOTE_PRODUCT_PATH.auto,
  [QUOTE_PRODUCT_CODE_HOME]: QUOTE_PRODUCT_PATH.home,
  [QUOTE_PRODUCT_CODE_HEALTH]: QUOTE_PRODUCT_PATH.health,
  [QUOTE_PRODUCT_CODE_PREVOYANCE]: QUOTE_PRODUCT_PATH.prevoyance,
  [QUOTE_PRODUCT_CODE_PET]: QUOTE_PRODUCT_PATH.pet,
};

export const QUOTE_HUB_PATH = "/";

export const QUOTE_PRODUCT_PATHS = Object.values(QUOTE_PRODUCT_PATH);

export function quoteProductIdFromPathname(
  pathname: string | null | undefined,
): QuoteSidebarProductId | null {
  if (!pathname) return null;
  const normalized = pathname.replace(/\/$/, "") || "/";
  return PATH_TO_PRODUCT_ID[normalized] ?? null;
}

export function quoteProductPathFromId(id: QuoteSidebarProductId): string {
  return QUOTE_PRODUCT_PATH[id];
}

export function isQuoteProductPath(pathname: string | null | undefined): boolean {
  return quoteProductIdFromPathname(pathname) != null;
}

export function isQuotePortalPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const normalized = pathname.replace(/\/$/, "") || "/";
  return normalized === QUOTE_HUB_PATH || isQuoteProductPath(normalized);
}

/** URL d'entrée du parcours voyage (étape détails du voyage). */
export function travelQuoteEntryHref(): string {
  return `${QUOTE_PRODUCT_PATH.travel}?${URL_PARAM_STEP}=${QUOTE_WIZARD_STEP_CODE_TRIP}`;
}
