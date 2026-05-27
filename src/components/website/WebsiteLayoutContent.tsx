"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { WebsiteShell } from "./WebsiteShell";

interface WebsiteLayoutContentProps {
  children: React.ReactNode;
}

/** Contenu site : décalage sous le header fixe sauf sur / (le hero gère déjà l'espace). */
export function WebsiteLayoutContent({ children }: WebsiteLayoutContentProps) {
  const isQuoteHome = usePathname() === "/";

  return (
    <div className={cn("flex-1", !isQuoteHome && "pt-16 lg:pt-20")}>
      <WebsiteShell>{children}</WebsiteShell>
    </div>
  );
}
