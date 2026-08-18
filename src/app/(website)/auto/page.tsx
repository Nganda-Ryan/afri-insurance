import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis assurance automobile | Afri Insurance",
  description: "Obtenez votre devis assurance automobile en ligne",
};

export default function AutoQuotePage() {
  return <QuoteProductPageContent productId="auto" />;
}
