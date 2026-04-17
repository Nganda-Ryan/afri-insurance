import type { z } from "zod";

import type {
  policiesByDateInputSchema,
  subscribePolicyInputSchema,
  travelQuoteWizardInputSchema,
} from "@/schemas/travel";

export type TravelQuoteWizardInput = z.input<typeof travelQuoteWizardInputSchema>;

export type TravelQuoteWizardParsed = z.output<typeof travelQuoteWizardInputSchema>;

/** Corps attendu par POST `travel/quotes_requests` (Get Quote). */
export type TravelQuoteRequestComposition = "single" | "group";

export interface IGetQuotePayload {
  context: {
    currency: string;
    country: string;
    language: string;
  };
  product_criteria: {
    category: TravelQuoteWizardParsed["product_category"];
    catalog: {
      reference: string;
      version: number;
    };
  };
  travel: {
    destination_area: string;
    start_date: string;
    end_date: string;
    travelers: {
      composition: TravelQuoteRequestComposition;
      types: {
        adult: number;
        children: number;
        senior: number;
      };
      oldest_traveler_age: number;
    };
  };
}

/** Réponse POST `travel/quotes_requests` (Get Quote) — DTO API. */
export interface IGetQuoteExpireAtDto {
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface IGetQuoteProductPricesDto {
  total_taxes?: number;
  price_after_discount_incl_tax?: number;
  premium_after_discount_excl_tax?: number;
  total_discount?: number;
  guarantee_class_prices?: unknown[];
  price_net?: number;
}

export interface IGetQuoteProductAttachmentDto {
  name: string | null;
  is_terms_and_conditions?: boolean;
  included_in_esignature?: boolean;
  content_url?: string;
}

export interface IGetQuoteProductDto {
  name?: string;
  is_default_product?: number | boolean;
  composition?: string | null;
  type?: string | null;
  prices?: IGetQuoteProductPricesDto;
  attachments?: IGetQuoteProductAttachmentDto[];
  consents?: unknown[];
  disclaimers?: unknown[];
  duration?: number;
  guarantees?: unknown[];
  addons?: unknown[];
  addon_codes?: unknown[];
  risks?: unknown[];
  travelers_breakdown?: unknown[];
  product_code?: number;
  quote_id?: number;
  note?: string;
  vehicule_max_age?: number;
  child_max_age?: number;
  spouse_max_age?: number;
  adultsupp_max_age?: number;
  devis_file_exists?: number;
  quote_code?: string;
  _start_date?: string;
  _end_date?: string;
}

export interface IGetQuoteResponseDto {
  context: {
    currency?: string;
    country?: string;
    language?: string;
  };
  quote_expire_at?: IGetQuoteExpireAtDto;
  products: IGetQuoteProductDto[];
}

export type SubscribePolicyInputDto = z.infer<typeof subscribePolicyInputSchema>;

/** Corps POST `travel/policies` (Postman « 03 - Subscribe Policy »), après fusion du `quote_code` côté serveur. */
export type ISubscribePolicyRequestBody = SubscribePolicyInputDto & {
  quote_code: string;
};

/** Réponse minimale POST `travel/policies`. */
export interface ISubscribePolicyResponseDto {
  policy_id?: string | number;
  id?: string | number;
  data?: { id?: string | number; policy_id?: string | number };
}

export type PoliciesByDateInput = z.infer<typeof policiesByDateInputSchema>;

export type TravelQuoteGuaranteeSummary = {
  name: string;
  limit?: string;
};

export type TravelQuoteProductSummary = {
  index: number;
  name: string;
  price_label: string;
  currency?: string;
  duration?: number;
  trip_start_label?: string;
  trip_end_label?: string;
  composition?: string;
  is_default_product?: boolean;
  guarantee_summaries?: TravelQuoteGuaranteeSummary[];
  terms_url?: string;
};

export type TravelQuoteContext = {
  currency?: string;
  country?: string;
  language?: string;
};

/** Données métier renvoyées par `requestTravelQuoteAction` en cas de succès. */
export type TravelQuoteActionData = {
  products: TravelQuoteProductSummary[];
  quoteContext: TravelQuoteContext | undefined;
};

/**
 * Offre devis affichée (agrégat à partir de `TravelQuoteProductSummary` + contexte).
 * `guarantees` : uniquement les libellés issus de l’API ; vide si l’API n’en renvoie pas.
 */
export interface PlanDetails {
  name: string;
  type: "standard" | "premium" | "elite";
  /** Montant parsé pour les calculs / sélection. */
  price: number;
  /** Libellé prix tel que renvoyé par l’API. */
  price_label: string;
  per_trip_label: string;
  product_index: number;
  source: "api";
  currency?: string;
  /** Une entrée par garantie API (`guarantee_summaries`) ; jamais inventée. */
  guarantees: string[];
  duration?: number;
  trip_start_label?: string;
  trip_end_label?: string;
  composition?: string;
  terms_url?: string;
  is_default_product?: boolean;
}

export interface TripDetailsData {
  destination_area: string;
  start_date: string;
  end_date: string;
  adult: number;
  product_category: "Standard" | "Etudiant" | "Pèlerinage";
}

export interface TravelerInfoData {
  oldest_traveler_age: number;
}

export interface SelectedPlan {
  name: string;
  price: number;
  type: "standard" | "premium" | "elite";
  product_index: number;
  source: "api";
}

export type PLAN_TYPES_TYPE = "standard" | "premium" | "elite";
















/* PLAN */
export interface ICurrency {
  name: string;
  rate: number;
  label: string;
}

export interface ICurrencyData {
  currency_net: string;
  currencies: ICurrency[];
}

export interface ILanguage {
  label: string;
  value: string;
}

export interface ITravelerType {
  min: number;
  max: number;
  type: string;
  coefficient: number;
}

export interface IGetPlanResponseDto {
  company: string;
  category: string;
  destination: string;
  min_age: number;
  max_age: number;
  min_days: number;
  max_days: number;
  currency: ICurrencyData;
  language: ILanguage[];
  composition: string[];
  traveler_type: ITravelerType[];
}

/** Tranche d'âge issue d'une entrée brute (min_age / max_age). */
export interface IFactorizedAgeRange {
  min_age: number;
  max_age: number;
}

/**
 * Destination factorisée : regroupe toutes les tranches d'âge
 * qui partagent la même destination au sein d'une catégorie.
 * Tous les champs de IGetPlanResponseDto sont présents.
 */
export interface IFactorizedDestination {
  destination: string;
  min_days: number;
  max_days: number;
  currency: ICurrencyData;
  language: ILanguage[];
  composition: string[];
  traveler_type: ITravelerType[];
  /** Tranches d'âge disponibles pour cette destination. */
  age_ranges: IFactorizedAgeRange[];
}

/**
 * Catégorie factorisée : regroupe toutes les destinations
 * qui appartiennent à la même catégorie.
 */
export interface IFactorizedCategory {
  /** Nom de la catégorie (ex. "Standard", "Etudiant", "Pèlerinage"). */
  name: string;
  company: string;
  destinations: IFactorizedDestination[];
}

/**
 * Résultat factorisé de getTravelPlans() :
 * tableau de catégories, chacune contenant ses destinations,
 * chaque destination contenant ses tranches d'âge.
 */
export type IGetPlanResponseDtoFactorize = IFactorizedCategory[];

/* ─────────────────────────────────────────────────────────────
   GET travel/policies/:policyId  (04 - Get Policy Data)
───────────────────────────────────────────────────────────── */

export interface IPolicyProduct {
  code: number;
  name: string;
  category: string;
}

export interface IPolicyCatalog {
  code: string;
  version: string;
  currency: string;
}

export interface IPolicyHolder {
  title: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IPolicyBeneficiary {
  id: number;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  passport_number: string;
  phone_number: string;
}

export interface IPolicyQuotingCriteria {
  destination: string;
  trip_duration: number;
  party_composition: string;
  number_of_travelers: number;
  beneficiary_age: number;
}

export interface IPolicyAttachment {
  file_name: string;
  type: string;
  created_at: string;
  content_url: string;
}

export interface IPolicyCoveragePeriod {
  start_date: string;
  end_date: string;
}

export interface IPolicyData {
  policy_id: number;
  policy_number: string;
  policy_status: string;
  start_date: string;
  end_date: string;
  company: string;
  type: string;
  created_at: string;
  product: IPolicyProduct;
  catalog: IPolicyCatalog;
  policy_holder: IPolicyHolder;
  beneficiaries: IPolicyBeneficiary[];
  quoting_criteria: IPolicyQuotingCriteria;
  attachments: IPolicyAttachment[];
  coverage_period: IPolicyCoveragePeriod;
}