import type { Metadata } from "next";

import { QuoteProductPageContent } from "@/components/Quote/layout/QuoteProductPageContent";

export const metadata: Metadata = {
  title: "Devis multirisque habitation | Afri Insurance",
  description: "Obtenez votre devis multirisque habitation en ligne",
};

export default function HabitationQuotePage() {
  return <QuoteProductPageContent productId="home" />;
}
