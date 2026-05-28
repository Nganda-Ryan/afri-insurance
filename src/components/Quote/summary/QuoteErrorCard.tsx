"use client";

import { AlertCircleIcon } from "lucide-react";

import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";

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
  const displayMessage =
    message.trim() || "Une erreur est survenue lors du devis.";

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
            <h2 className="text-lg font-bold">Devis indisponible</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-main">{displayMessage}</p>
            {errorCode ? (
              <p className="mt-2 font-mono text-xs text-gray-500">Code : {errorCode}</p>
            ) : null}
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
