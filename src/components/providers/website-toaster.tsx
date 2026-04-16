"use client";

import { Toaster } from "sonner";

/** Toasts pour le parcours de cotation (Sonner). Indépendant de `next-themes`. */
export function WebsiteToaster() {
  return <Toaster richColors closeButton position="top-center" />;
}
