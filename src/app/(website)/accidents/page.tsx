import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis Individuelle Accidents | Afri Insurance",
  description:
    "Obtenez votre devis assurance individuelle accidents en ligne – Protégez-vous contre les accidents du quotidien",
};

export default function AccidentsQuotePage() {
  return <QuoteProductPageContent productId="accidents" />;
}
