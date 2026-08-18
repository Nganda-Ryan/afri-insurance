import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis individuelle accidents | Afri Insurance",
  description: "Assurance individuelle accidents - bientôt disponible",
};

export default function AnimauxQuotePage() {
  return <QuoteProductPageContent productId="pet" />;
}
