import type { QuoteSidebarProductId } from "@/lib/travel/quote-wizard-url";
import { quoteProductIdFromUrlCode } from "@/lib/travel/quote-wizard-url";

export type QuoteHeroProductId = QuoteSidebarProductId | "prevoyance";

export interface QuoteHeroContent {
  title: string;
  description: string;
}

export interface PolicyHeroContent {
  badge: string;
  title: string;
  description: string;
}

const QUOTE_HERO_BY_PRODUCT: Record<QuoteHeroProductId, QuoteHeroContent> = {
  travel: {
    title: "Achetez votre assurance voyage en quelques clics",
    description:
      "Renseignez vos informations et recevez une proposition adaptée à votre voyage.",
  },
  auto: {
    title: "Achetez votre assurance automobile en quelques clics",
    description:
      "Renseignez les informations de votre véhicule et obtenez votre prime instantanément.",
  },
  home: {
    title: "Assurez votre logement en quelques clics",
    description:
      "Choisissez votre profil et la tranche adaptée à votre bien pour obtenir votre devis multirisque habitation.",
  },
  health: {
    title: "Protégez votre santé en quelques clics",
    description:
      "Sélectionnez votre formule et composez la couverture de votre foyer en quelques instants.",
  },
  pet: {
    title: "Souscrivez votre assurance accidents en quelques clics",
    description:
      "Obtenez une proposition adaptée à vos besoins de protection individuelle.",
  },
  prevoyance: {
    title: "Préparez votre prévoyance en quelques clics",
    description:
      "Obtenez une proposition de prévoyance individuelle adaptée à votre situation.",
  },
};

const POLICY_HERO_BY_PRODUCT: Record<QuoteHeroProductId, PolicyHeroContent> = {
  travel: {
    badge: "Souscription confirmée",
    title: "Police confirmée",
    description: "Votre assurance voyage est maintenant active.",
  },
  auto: {
    badge: "Souscription confirmée",
    title: "Police confirmée",
    description: "Votre assurance automobile est maintenant active.",
  },
  home: {
    badge: "Souscription confirmée",
    title: "Police confirmée",
    description: "Votre assurance multirisque habitation est maintenant active.",
  },
  health: {
    badge: "Souscription confirmée",
    title: "Police confirmée",
    description: "Votre assurance santé est maintenant active.",
  },
  pet: {
    badge: "Souscription confirmée",
    title: "Police confirmée",
    description: "Votre assurance individuelle accidents est maintenant active.",
  },
  prevoyance: {
    badge: "Souscription confirmée",
    title: "Police confirmée",
    description: "Votre contrat de prévoyance est maintenant actif.",
  },
};

function isQuoteHeroProductId(value: string): value is QuoteHeroProductId {
  return value in QUOTE_HERO_BY_PRODUCT;
}

export function normalizeQuoteHeroProductId(
  product: string | null | undefined,
): QuoteHeroProductId {
  if (!product) return "travel";
  const fromCode = quoteProductIdFromUrlCode(product);
  if (fromCode) return fromCode;
  const normalized = product.trim().toLowerCase();
  return isQuoteHeroProductId(normalized) ? normalized : "travel";
}

export function getQuoteHeroContent(
  product: string | null | undefined,
): QuoteHeroContent {
  return QUOTE_HERO_BY_PRODUCT[normalizeQuoteHeroProductId(product)];
}

export function getPolicyHeroContent(
  product: string | null | undefined,
): PolicyHeroContent {
  return POLICY_HERO_BY_PRODUCT[normalizeQuoteHeroProductId(product)];
}
