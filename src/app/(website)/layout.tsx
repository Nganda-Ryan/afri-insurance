// import LandingFooter from "@/components/website/LandingFooter";

import type { Metadata } from "next";
import React, { Suspense } from "react";

import LandingHeader from "@/components/website/header/LandingHeader";
import { WebsiteShell } from "@/components/website/WebsiteShell";
import { WebsiteToaster } from "@/components/providers/website-toaster";

export const metadata: Metadata = {
  title: "Cotation assurance | Afri Insurance",
  description: "Demandez un devis en ligne",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LandingHeader />
      <div className="dark:bg-boxdark-2 dark:text-bodydark bg-blue-sky mt-15 mb-20">
        <Suspense fallback={<div className="min-h-screen" />}>
          <WebsiteShell>{children}</WebsiteShell>
        </Suspense>
        <WebsiteToaster />
      </div>
      {/* <LandingFooter /> */}
    </div>
  );
}