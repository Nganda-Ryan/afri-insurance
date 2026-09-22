import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis Afrikids Etudes – Rente Éducation | Afri Insurance",
  description:
    "Obtenez votre devis Afrikids Etudes en ligne – Protégez l'avenir scolaire de vos enfants",
};

export default function EtudesQuotePage() {
  return <QuoteProductPageContent productId="etudes" />;
}
