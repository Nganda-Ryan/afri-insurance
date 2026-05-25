"use client";

import type { QuoteSidebarProductId } from "@/lib/travel/quote-wizard-url";

export type ProductType = QuoteSidebarProductId;

interface NavItem {
  id: ProductType;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "travel", label: "Voyage" },
  { id: "auto", label: "Automobile" },
  { id: "health", label: "Santé" },
  { id: "pet", label: "Individuelle accidents" },
  { id: "home", label: "Habitation" },
];

interface QuotationProductNavProps {
  currentProduct: ProductType;
  onProductChange: (product: ProductType) => void;
}

export function QuotationProductNav({
  currentProduct,
  onProductChange,
}: QuotationProductNavProps) {
  return (
    <nav
      className="border-b border-white/10 bg-brand-secondary-dark shadow-md"
      aria-label="Produits d'assurance"
    >
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6">
        <ul className="flex min-w-max gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = currentProduct === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onProductChange(item.id)}
                  className={`relative px-4 py-4 text-sm font-semibold tracking-wide transition-colors sm:px-6 sm:text-base ${
                    isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-1 rounded-t-full bg-brand-primary sm:left-6 sm:right-6"
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
