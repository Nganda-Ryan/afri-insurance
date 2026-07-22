"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { QuoteHero } from "@/components/Quote/layout/QuoteHero";
import {
  QuotationProductNav,
  type ProductType,
} from "@/components/Quote/layout/QuotationProductNav";
import { URL_PARAM_PRODUCT } from "@/lib/constants/constant";
import { normalizeQuoteHeroProductId } from "@/lib/constants/quote-hero-content";
import {
  quoteProductCodeFromId,
  quoteProductIdFromUrlCode,
} from "@/lib/travel/quote-wizard-url";
import { useWizardStore } from "@/store/wizardStore";

/** Bandeau hero + navigation produits, affichés sous le header site sur la page cotation. */
export function QuoteCotationChrome() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const wizardInProgress = useWizardStore((s) => s.wizardInProgress);
  const isQuoteHome = pathname === "/";
  const isClaimsPage = pathname === "/claims";

  const [showSwitchWarning, setShowSwitchWarning] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<ProductType | null>(null);

  const productParam = searchParams.get(URL_PARAM_PRODUCT);
  const heroProductId = normalizeQuoteHeroProductId(productParam);

  const currentProduct: ProductType =
    quoteProductIdFromUrlCode(productParam) ?? "travel";

  const replaceProductInUrl = (product: ProductType) => {
    const sp = new URLSearchParams();
    sp.set(URL_PARAM_PRODUCT, quoteProductCodeFromId(product));
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  const handleProductSwitch = (product: ProductType) => {
    if (product === currentProduct) return;
    if (wizardInProgress) {
      setPendingProduct(product);
      setShowSwitchWarning(true);
    } else {
      replaceProductInUrl(product);
    }
  };

  const confirmSwitch = () => {
    if (pendingProduct) {
      replaceProductInUrl(pendingProduct);
    }
    setShowSwitchWarning(false);
    setPendingProduct(null);
  };

  const cancelSwitch = () => {
    setShowSwitchWarning(false);
    setPendingProduct(null);
  };

  if (!isQuoteHome && !isClaimsPage) return null;

  return (
    <>
      <QuoteHero
        productId={isClaimsPage ? undefined : heroProductId}
        badge={isClaimsPage ? "Sinistre" : undefined}
        title={
          isClaimsPage
            ? "Déclarez votre sinistre en quelques clics"
            : undefined
        }
        description={
          isClaimsPage
            ? "Renseignez les informations de l’accident et joignez vos pièces pour une prise en charge rapide."
            : undefined
        }
      />
      {/* <QuotationProductNav
        currentProduct={currentProduct}
        onProductChange={handleProductSwitch}
      /> */}

      {showSwitchWarning && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="switch-product-title"
        >
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground shadow-2xl">
            <h2
              id="switch-product-title"
              className="mb-3 text-xl font-bold"
            >
              Changer de produit ?
            </h2>
            <p className="mb-6 text-text-main">
              En poursuivant, le parcours en cours sera réinitialisé et les
              informations saisies seront perdues.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={cancelSwitch}
                className="flex-1 rounded-lg border-2 border-brand-primary px-4 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-text-inverse"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirmSwitch}
                className="flex-1 rounded-lg bg-brand-primary px-4 py-3 font-semibold text-text-inverse shadow-md transition-opacity hover:bg-brand-primary hover:bg-opacity-90"
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
