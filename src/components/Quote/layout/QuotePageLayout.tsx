"use client";

import type { ReactNode } from "react";

interface QuotePageLayoutProps {
  children: ReactNode;
  aside: ReactNode;
  progress?: ReactNode;
}

export function QuotePageLayout({ children, aside, progress }: QuotePageLayoutProps) {
  return (
    <div className="space-y-6">
      {progress ? <div className="w-full">{progress}</div> : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-8">{children}</div>
        <aside className="min-w-0 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          {aside}
        </aside>
      </div>
    </div>
  );
}
