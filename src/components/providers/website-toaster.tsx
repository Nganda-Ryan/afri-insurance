"use client";

import { Toaster } from "sonner";

/** Toasts pour le parcours de cotation (Sonner). Indépendant de `next-themes`. */
export function WebsiteToaster() {
  return (
    <Toaster
      position="bottom-right"
      closeButton
      richColors
      expand
      visibleToasts={4}
      toastOptions={{
        duration: 4500,
        classNames: {
          toast:
            "min-h-[64px] rounded-xl border border-white/15 bg-slate-950/95 px-4 py-3 text-white shadow-2xl backdrop-blur-md",
          title: "text-sm font-semibold leading-snug text-white",
          description: "mt-1 text-xs leading-relaxed text-slate-200",
          success: "border-emerald-400/40 bg-emerald-950/90",
          error: "border-red-400/45 bg-red-950/90",
          warning: "border-amber-400/45 bg-amber-950/90",
          info: "border-sky-400/45 bg-sky-950/90",
          actionButton:
            "bg-brand-primary text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:ring-offset-0",
          cancelButton:
            "bg-white/10 text-white hover:bg-white/20 border border-white/20",
          closeButton:
            "bg-transparent text-white/70 hover:text-white hover:bg-white/10 border border-white/20",
        },
      }}
    />
  );
}
