import Link from "next/link";

import { getQuoteProductById } from "@/lib/constants/quote-products";
import { QUOTE_HUB_PATH } from "@/lib/constants/quote-product-routes";
import type { QuoteSidebarProductId } from "@/lib/travel/quote-wizard-url";

interface QuoteProductBreadcrumbProps {
  productId: QuoteSidebarProductId;
}

export function QuoteProductBreadcrumb({ productId }: QuoteProductBreadcrumbProps) {
  const product = getQuoteProductById(productId);
  const label = product?.title ?? "Devis";

  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <li>
          <Link
            href={QUOTE_HUB_PATH}
            className="font-medium text-brand-primary transition hover:underline"
          >
            Tous les devis
          </Link>
        </li>
        <li aria-hidden className="text-gray-400">
          /
        </li>
        <li>
          <span className="font-semibold text-text-main" aria-current="page">
            {label}
          </span>
        </li>
      </ol>
    </nav>
  );
}
