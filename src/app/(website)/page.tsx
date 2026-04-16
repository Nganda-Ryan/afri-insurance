"use client";

import { QuotationWizard } from "@/components/Quote/QuotationWizard";
import {
  QuotationWizardSidebar,
  type ProductType,
} from "@/components/Quote/QuotationWizardSidebar";
import React, { useState } from "react";

export default function HomeQuotationPage() {
  const [currentProduct, setCurrentProduct] = useState<ProductType>("travel");
  const [showSwitchWarning, setShowSwitchWarning] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<ProductType | null>(
    null,
  );
  const [wizardInProgress, setWizardInProgress] = useState(false);

  const handleProductSwitch = (product: ProductType) => {
    if (product === currentProduct) return;
    if (wizardInProgress) {
      setPendingProduct(product);
      setShowSwitchWarning(true);
    } else {
      setCurrentProduct(product);
    }
  };

  const confirmSwitch = () => {
    if (pendingProduct) {
      setCurrentProduct(pendingProduct);
      setWizardInProgress(false);
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

      <main
        id="parcours-cotation"
        className="flex-1 lg:ml-0"
        aria-labelledby="page-cotation-title"
      >
        <div className="mx-auto max-w-[900px] px-4 py-8 lg:py-12">
          {currentProduct === "travel" ? (
            <>
              <header>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
                  Cotation en ligne
                </p>
              </header>
              <QuotationWizard onWizardStateChange={setWizardInProgress} />
            </>
          ) : (
            <div className="py-20 text-center">
              <h1 className="mb-4 text-3xl font-bold text-brand-secondary">
                {currentProduct === "home" && "Assurance habitation"}
                {currentProduct === "auto" && "Assurance auto"}
                {currentProduct === "pet" && "Assurance animaux"}
              </h1>
              <p className="text-text-main">
                Le moteur de cotation pour ce produit arrive prochainement.
              </p>
            </div>
          )}
        </div>
      </main>

      {showSwitchWarning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="switch-product-title"
        >
          <div className="w-full max-w-md rounded-lg bg-surface-base p-6 shadow-2xl">
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
