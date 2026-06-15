"use client";

import { AlertCircleIcon } from "lucide-react";

import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { formatQuoteErrorDisplay } from "@/lib/travel/format-quote-error";

export interface QuoteErrorCardProps {
  message: string;
  errorCode?: string | null;
  onBack: () => void;
}

export function QuoteErrorCard({
  message,
  errorCode,
  onBack,
}: QuoteErrorCardProps) {
  const { message: displayMessage, code: displayCode } = formatQuoteErrorDisplay(
    message,
    errorCode,
  );

  return (
    <div className="space-y-4">
      <article className="rounded-lg border border-red-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50"
            aria-hidden
          >
            <AlertCircleIcon className="h-7 w-7 text-red-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-text-main">Devis indisponible</h2>

            <div className="mt-3 space-y-3 rounded-md border border-red-100 bg-red-50/40 px-3 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-red-800/70">
                  Détail
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text-main">
                  {displayMessage}
                </p>
              </div>

              {/* {displayCode ? (
                <div className="border-t border-red-100 pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Code technique
                  </p>
                  <p className="mt-1.5">
                    <code className="inline-block max-w-full break-all rounded-md bg-white px-2.5 py-1 font-mono text-xs text-gray-700 ring-1 ring-red-100">
                      {displayCode}
                    </code>
                  </p>
                </div>
              ) : null} */}
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm text-gray-600">
          Modifiez les informations du voyage pour essayer une autre formule.
        </p>
      </article>

      <QuoteStepNavigation onPrevious={onBack} showNext={false} />
    </div>
  );
}
