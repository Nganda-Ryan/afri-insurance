import type {
  IGetQuoteResponseDto,
  SelectTravelQuoteProductActionData,
  TravelQuoteContext,
  TravelQuoteGuaranteeSummary,
  TravelQuoteProductSummary,
} from "@/types/travel";

type EvoPriceBlock = {
  price_after_discount_incl_tax?: number;
  price_net?: number;
  premium_after_discount_excl_tax?: number;
};

type EvoProduct = {
  name?: string;
  quote_code?: string;
  prices?: EvoPriceBlock;
  currency?: string;
  duration?: number;
  composition?: string | null;
  guarantees?: unknown;
  attachments?: unknown;
  is_default_product?: number | boolean;
  _start_date?: string;
  _end_date?: string;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}

function pickProductsRoot(data: unknown): EvoProduct[] {
  if (!isRecord(data)) {
    throw new Error("Réponse devis EVO invalide (attendu un objet).");
  }
  const direct = data.products;
  if (Array.isArray(direct)) return direct as EvoProduct[];
  const nested = data.data;
  if (isRecord(nested) && Array.isArray(nested.products)) {
    return nested.products as EvoProduct[];
  }
  throw new Error("Réponse devis EVO invalide: champ `products` introuvable.");
}

function pickContextCurrency(data: unknown): string | undefined {
  if (!isRecord(data)) return undefined;
  const ctx = data.context;
  if (!isRecord(ctx)) return undefined;
  const c = ctx.currency;
  return typeof c === "string" && c.trim() ? c.trim() : undefined;
}

/**
 * Priorité TTC / HT / net, en ignorant les 0 quand un autre champ est &gt; 0
 * (l’API peut renvoyer `price_after_discount_incl_tax: 0` avec `price_net` renseigné).
 */
function pickDisplayPriceAmount(prices: EvoPriceBlock | undefined): number {
  if (!prices) {
    throw new Error("Bloc `prices` manquant dans la réponse devis EVO.");
  }
  const ordered: (number | undefined)[] = [
    prices.price_after_discount_incl_tax,
    prices.premium_after_discount_excl_tax,
    prices.price_net,
  ];
  for (const n of ordered) {
    if (typeof n === "number" && Number.isFinite(n) && n > 0) {
      return n;
    }
  }
  for (const n of ordered) {
    if (typeof n === "number" && Number.isFinite(n)) {
      return n;
    }
  }
  throw new Error("Prix manquant ou invalide dans la réponse devis EVO.");
}

function extractGuaranteeSummaries(guarantees: unknown): TravelQuoteGuaranteeSummary[] {
  if (!Array.isArray(guarantees)) return [];
  const out: TravelQuoteGuaranteeSummary[] = [];
  for (const g of guarantees) {
    if (!isRecord(g)) continue;
    const rawName = g.name ?? g.title ?? g.label;
    if (typeof rawName !== "string" || !rawName.trim()) continue;
    let limit: string | undefined;
    if (typeof g.limit === "string" && g.limit.trim()) {
      limit = g.limit.trim();
    } else if (typeof g.description === "string" && g.description.trim()) {
      limit = g.description.trim();
    }
    out.push({ name: rawName.trim(), limit });
  }
  return out;
}

function extractTermsUrl(attachments: unknown): string | undefined {
  if (!Array.isArray(attachments)) return undefined;
  for (const a of attachments) {
    if (!isRecord(a)) continue;
    if (a.is_terms_and_conditions !== true) continue;
    const url = a.content_url;
    if (typeof url === "string" && url.trim()) return url.trim();
  }
  return undefined;
}

function asDefaultProduct(v: unknown): boolean | undefined {
  if (v === true || v === 1) return true;
  if (v === false || v === 0) return false;
  return undefined;
}

function asOptionalTrimmedString(v: unknown): string | undefined {
  if (typeof v !== "string" || !v.trim()) return undefined;
  return v.trim();
}

function asOptionalNumber(v: unknown): number | undefined {
  if (typeof v !== "number" || !Number.isFinite(v)) return undefined;
  return v;
}

export function extractTravelQuoteContext(data: unknown): TravelQuoteContext | undefined {
  if (!isRecord(data)) return undefined;
  const ctx = data.context;
  if (!isRecord(ctx)) return undefined;
  const currency = asOptionalTrimmedString(ctx.currency);
  const country = asOptionalTrimmedString(ctx.country);
  const language = asOptionalTrimmedString(ctx.language);
  if (currency == null && country == null && language == null) return undefined;
  return { currency, country, language };
}

/**
 * Extrait les produits affichables. Les `quote_code` restent uniquement dans la réponse brute côté serveur.
 */
export function extractTravelQuoteProductSummaries(
  data: unknown,
): TravelQuoteProductSummary[] {
  const products = pickProductsRoot(data);
  if (products.length === 0) {
    throw new Error("Aucune offre renvoyée par l'API devis EVO.");
  }
  const contextCurrency = pickContextCurrency(data);
  return products.map((p, index) => {
    const productCurrency =
      typeof p.currency === "string" && p.currency.trim()
        ? p.currency.trim()
        : undefined;
    const currency = productCurrency ?? contextCurrency;

    const guaranteeSummaries = extractGuaranteeSummaries(p.guarantees);
    const termsUrl = extractTermsUrl(p.attachments);

    const composition = asOptionalTrimmedString(p.composition ?? undefined);
    const tripStartLabel = asOptionalTrimmedString(p._start_date);
    const tripEndLabel = asOptionalTrimmedString(p._end_date);
    const duration = asOptionalNumber(p.duration);

    return {
      index,
      name:
        typeof p.name === "string" && p.name.trim()
          ? p.name.trim()
          : (() => {
              throw new Error(
                `Nom de produit manquant pour l'offre #${index + 1}.`,
              );
            })(),
      price_label: String(pickDisplayPriceAmount(p.prices)),
      currency,
      duration,
      trip_start_label: tripStartLabel,
      trip_end_label: tripEndLabel,
      composition: composition ?? undefined,
      is_default_product: asDefaultProduct(p.is_default_product),
      guarantee_summaries:
        guaranteeSummaries.length > 0 ? guaranteeSummaries : undefined,
      terms_url: termsUrl,
    };
  });
}

export function extractQuoteCodeAtIndex(
  data: unknown,
  productIndex: number,
): string | null {
  const products = pickProductsRoot(data);
  const p = products[productIndex];
  const code = p?.quote_code;
  return typeof code === "string" && code.length > 0 ? code : null;
}

/** Extrait le produit sélectionné avec le contexte et l'expiration du devis en cache. */
export function extractSelectedTravelQuoteProduct(
  data: IGetQuoteResponseDto,
  productIndex: number,
): SelectTravelQuoteProductActionData | null {
  const product = data.products[productIndex];
  if (!product) return null;

  const quoteCode = product.quote_code;
  if (typeof quoteCode !== "string" || !quoteCode.length) return null;

  return {
    context: data.context,
    quote_expire_at: data.quote_expire_at,
    products: [product],
  };
}
