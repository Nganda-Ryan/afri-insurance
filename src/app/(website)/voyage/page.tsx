import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis assurance voyage | Afri Insurance",
  description: "Obtenez et souscrivez votre assurance voyage en ligne",
};

export default function VoyageQuotePage() {
  return <QuoteProductPageContent productId="travel" />;
}
