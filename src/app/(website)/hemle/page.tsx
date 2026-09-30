import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis Afri Hemle – Capital Frais Funéraires | Afri Insurance",
  description:
    "Obtenez votre devis Afri Hemle en ligne – Un Capital Frais Funéraires forfaitaire versé à vos bénéficiaires en cas de décès toutes causes",
};

export default function HemleQuotePage() {
  return <QuoteProductPageContent productId="hemle" />;
}
