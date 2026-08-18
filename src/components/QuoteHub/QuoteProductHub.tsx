"use client";

import { QuoteProductCard } from "@/components/QuoteHub/QuoteProductCard";
import { QUOTE_PRODUCT_CATALOG } from "@/lib/constants/quote-products";
import {
  QUOTE_PORTAL_HOW_IT_WORKS,
  QUOTE_PORTAL_SUPPORT,
} from "@/lib/constants/quote-portal";

function QuoteHubMasthead() {
  return (
    <header
      className="bg-brand-primary px-4 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-22"
      aria-labelledby="quote-hub-title"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-white sm:text-sm">
          100% digital
        </p>
        <h1
          id="quote-hub-title"
          className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
        >
          Un devis. Le bon produit. Quelques minutes.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
          Choisissez la protection qui correspond à votre vie - voyage, véhicule,
          maison, santé ou prévoyance.
        </p>
      </div>
    </header>
  );
}

function QuoteHubHowItWorks() {
  return (
    <section className="mt-10 sm:mt-12" aria-labelledby="quote-hub-how-title">
      <h2
        id="quote-hub-how-title"
        className="text-lg font-bold text-text-main sm:text-xl"
      >
        Comment ça marche
      </h2>
      <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUOTE_PORTAL_HOW_IT_WORKS.map((item) => (
          <li key={item.step} className="flex gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white"
              aria-hidden
            >
              {item.step}
            </span>
            <div>
              <p className="font-semibold text-text-main">{item.title}</p>
              <p className="text-sm text-gray-600">{item.subtitle}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-gray-600">
        Une question ? {QUOTE_PORTAL_SUPPORT.phone}
        <span className="mx-2 text-gray-300">·</span>
        {QUOTE_PORTAL_SUPPORT.email}
      </p>
    </section>
  );
}

export function QuoteProductHub() {
  return (
    <>
      <QuoteHubMasthead />
      <main
        id="parcours-cotation"
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10"
        aria-labelledby="quote-hub-products-title"
      >
        <h2 id="quote-hub-products-title" className="sr-only">
          Nos produits d&apos;assurance
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {QUOTE_PRODUCT_CATALOG.map((product, index) => (
            <li key={product.id}>
              <QuoteProductCard product={product} priority={index < 3} />
            </li>
          ))}
        </ul>
        <QuoteHubHowItWorks />
      </main>
    </>
  );
}
