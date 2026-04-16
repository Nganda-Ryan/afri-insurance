import type { TravelQuoteProductSummary } from "@/types/travel";

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

function formatPriceLabel(p: EvoProduct): string {
  const n =
    p.prices?.price_after_discount_incl_tax ??
    p.prices?.premium_after_discount_excl_tax ??
    p.prices?.price_net;
  if (typeof n === "number" && Number.isFinite(n)) {
    return String(n);
  }
  throw new Error("Prix manquant ou invalide dans la réponse devis EVO.");
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
  return products.map((p, index) => ({
    index,
    name:
      typeof p.name === "string" && p.name.trim()
        ? p.name
        : (() => {
            throw new Error(
              `Nom de produit manquant pour l'offre #${index + 1}.`,
            );
          })(),
    priceLabel: formatPriceLabel(p),
    currency:
      typeof p.currency === "string" && p.currency.trim()
        ? p.currency
        : undefined,
  }));
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
