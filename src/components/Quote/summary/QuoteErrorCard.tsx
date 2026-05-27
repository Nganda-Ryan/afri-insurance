"use client";

import { AlertCircleIcon, ChevronLeftIcon } from "lucide-react";

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
    <article className="mx-auto max-w-lg rounded-xl border border-red-200 bg-surface-base p-6 shadow-sm dark:border-red-900/50">
      <div className="flex gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/50"
          aria-hidden
        >
          <AlertCircleIcon className="h-7 w-7 text-red-600 dark:text-red-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold">
            Devis indisponible
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-main">
            {displayMessage}
          </p>
          {errorCode ? (
            <p className="mt-2 font-mono text-xs text-gray-500 dark:text-gray-400">
              Code : {errorCode}
            </p>
          ) : null}
        </div>
      </div>

      <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
        Modifiez les informations du voyage pour essayer une autre formule.
      </p>

      <button
        type="button"
        onClick={onBack}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 py-3 text-sm font-semibold text-text-main transition-colors hover:border-brand-secondary sm:w-auto sm:px-6"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Modifier
      </button>
    </article>
  );
}
