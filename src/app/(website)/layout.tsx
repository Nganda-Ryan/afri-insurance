// import LandingFooter from "@/components/website/LandingFooter";

import type { Metadata } from "next";
import React from "react";

import LandingHeader from "@/components/website/header/LandingHeader";
import { WebsiteShell } from "@/components/website/WebsiteShell";
import { QueryProvider } from "@/components/providers/query-provider";
import { WebsiteToaster } from "@/components/providers/website-toaster";

export const metadata: Metadata = {
  title: "Cotation assurance | Afri Insurance",
  description:
    "Demandez un devis en ligne : assistance voyage et autres produits à venir.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LandingHeader />
      <div className="dark:bg-boxdark-2 dark:text-bodydark bg-blue-sky mt-28 mb-20">
        <QueryProvider>
          <WebsiteShell>{children}</WebsiteShell>
          <WebsiteToaster />
        </QueryProvider>
      </div>
      {/* <LandingFooter /> */}
    </div>
  );
}