import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis prévoyance individuelle | Afri Insurance",
  description: "Obtenez votre devis prévoyance individuelle en ligne",
};

export default function PrevoyanceQuotePage() {
  return <QuoteProductPageContent productId="prevoyance" />;
}
