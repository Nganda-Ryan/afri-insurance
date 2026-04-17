"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import {
  QuotationWizardSidebar,
  type ProductType,
} from "@/components/Quote/QuotationWizardSidebar";
import {
  URL_PARAM_PRODUCT,
  quoteProductCodeFromId,
  quoteProductIdFromUrlCode,
} from "@/lib/travel/quote-wizard-url";
import { useWizardStore } from "@/store/wizardStore";

interface WebsiteShellProps {
  children: React.ReactNode;
}

export function WebsiteShell({ children }: WebsiteShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const wizardInProgress = useWizardStore((s) => s.wizardInProgress);

  const [showSwitchWarning, setShowSwitchWarning] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<ProductType | null>(null);

  const currentProduct: ProductType =
    quoteProductIdFromUrlCode(searchParams.get(URL_PARAM_PRODUCT)) ?? "travel";

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

  return (
    <div className="flex min-h-screen flex-col bg-surface-base lg:flex-row">
      <QuotationWizardSidebar
        currentProduct={currentProduct}
        onProductChange={handleProductSwitch}
      />

      <div className="flex-1 lg:ml-0 min-w-0">
        {children}
      </div>

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
              className="mb-3 text-xl font-bold text-brand-secondary"
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
                className="flex-1 rounded-lg bg-brand-primary px-4 py-3 font-semibold text-text-inverse shadow-md transition-opacity hover:bg-opacity-90"
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
