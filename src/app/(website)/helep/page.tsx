import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis Afri Helep – Protection Tontines | Afri Insurance",
  description:
    "Obtenez votre devis Afri Helep en ligne – Protégez vos membres de tontine et sécurisez leurs engagements",
};

export default function HelepQuotePage() {
  return <QuoteProductPageContent productId="helep" />;
}
