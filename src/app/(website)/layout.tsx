import type { Metadata } from "next";
import React, { Suspense } from "react";

import { QuoteCotationChrome } from "@/components/Quote/layout/QuoteCotationChrome";
import LandingFooter from "@/components/website/header/LandingFooter";
import LandingHeader from "@/components/website/header/LandingHeader";
import { WebsiteLayoutContent } from "@/components/website/WebsiteLayoutContent";
import { WebsiteToaster } from "@/components/providers/website-toaster";

export const metadata: Metadata = {
  title: "Devis en ligne | Afri Insurance",
  description: "Choisissez votre produit et obtenez un devis en quelques minutes",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <Suspense fallback={null}>
        <QuoteCotationChrome />
      </Suspense>
      <div className="dark:bg-boxdark-2 dark:text-bodydark flex flex-1 flex-col">
        <Suspense fallback={<div className="min-h-screen" />}>
          <WebsiteLayoutContent>{children}</WebsiteLayoutContent>
        </Suspense>
        <WebsiteToaster />
      </div>
      <LandingFooter />
    </div>
  );
}
