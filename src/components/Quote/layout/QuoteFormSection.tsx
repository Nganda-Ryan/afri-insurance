"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface QuoteFormSectionProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}

export function QuoteFormSection({ title, icon: Icon, children }: QuoteFormSectionProps) {
  return (
    <section className="overflow-visible rounded-lg border border-gray-200/80 bg-white">
      <div className="bg-brand-primary flex items-center gap-3 overflow-hidden rounded-t-lg border-b border-brand-secondary/10 px-4 py-1.5 sm:px-5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-brand-secondary text-text-inverse"
          aria-hidden
        >
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-base font-bold sm:text-lg text-white">{title}</h2>
      </div>
      <div className="space-y-6 p-4 sm:p-6">{children}</div>
    </section>
  );
}
