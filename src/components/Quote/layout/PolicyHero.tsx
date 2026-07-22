"use client";

import { useSearchParams } from "next/navigation";

import { URL_PARAM_PRODUCT } from "@/lib/constants/constant";
import {
  getPolicyHeroContent,
  type QuoteHeroProductId,
} from "@/lib/constants/quote-hero-content";

interface PolicyHeroProps {
  badge?: string;
  title?: string;
  description?: string;
  productId?: QuoteHeroProductId;
}

/**
 * Variante de QuoteHero conçue pour les pages intérieures
 * (ex: /quote/[policyId]).
 *
 * Sur ces pages, `WebsiteLayoutContent` ajoute déjà `pt-16 lg:pt-20`
 * pour compenser le header fixe - ce composant n'a donc pas besoin
 * de grand padding supérieur et évite le double-espace visible.
 */
export function PolicyHero({
  badge,
  title,
  description,
  productId,
}: PolicyHeroProps) {
  const searchParams = useSearchParams();
  const productFromUrl = searchParams.get(URL_PARAM_PRODUCT);
  const content = getPolicyHeroContent(productId ?? productFromUrl);

  return (
    <section
      className="-mt-16 lg:-mt-20 bg-brand-primary px-4 pb-6 pt-20 sm:px-6 sm:pb-8 sm:pt-24 lg:pb-10 lg:pt-28"
      aria-labelledby="quote-hero-title"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-white sm:text-base">
          {badge ?? content.badge}
        </p>
        <h1
          id="quote-hero-title"
          className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl"
        >
          {title ?? content.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
          {description ?? content.description}
        </p>
      </div>
    </section>
  );
}
