import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis AFRI HELEP – Protection Tontines | Afri Insurance",
  description:
    "Obtenez votre devis AFRI HELEP en ligne – Protégez vos membres de tontine et sécurisez leurs engagements",
};

export default function HelepQuotePage() {
  return <QuoteProductPageContent productId="helep" />;
}
