"use client";

import { usePathname } from "next/navigation";

import { isQuotePortalPath } from "@/lib/constants/quote-product-routes";
import { cn } from "@/lib/utils";

import { WebsiteShell } from "./WebsiteShell";

interface WebsiteLayoutContentProps {
  children: React.ReactNode;
}

/** Contenu site : décalage sous le header fixe sauf hub / devis / sinistre (hero gère l'espace). */
export function WebsiteLayoutContent({ children }: WebsiteLayoutContentProps) {
  const pathname = usePathname();
  const isPortalPage =
    pathname === "/claims" || isQuotePortalPath(pathname);

  return (
    <div className={cn("flex-1", !isPortalPage && "pt-16 lg:pt-20")}>
      <WebsiteShell>{children}</WebsiteShell>
    </div>
  );
}
