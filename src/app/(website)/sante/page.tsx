import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis assurance santé | Afri Insurance",
  description: "Obtenez votre devis assurance santé en ligne",
};

export default function SanteQuotePage() {
  return <QuoteProductPageContent productId="health" />;
}
