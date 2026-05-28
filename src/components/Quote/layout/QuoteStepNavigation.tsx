"use client";

import { ChevronLeftIcon } from "lucide-react";

import Button from "@/components/ui/button/Button";

interface QuoteStepNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
  showPrevious?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  previousDisabled?: boolean;
  isSubmitting?: boolean;
  /** Lie le bouton Suivant à un formulaire hors du bouton (attribut HTML `form`). */
  nextFormId?: string;
  nextType?: "button" | "submit";
}

export function QuoteStepNavigation({
  onPrevious,
  onNext,
  previousLabel = "Précédent",
  nextLabel = "Suivant",
  showPrevious = true,
  showNext = true,
  nextDisabled = false,
  previousDisabled = false,
  isSubmitting = false,
  nextFormId,
  nextType = "button",
}: QuoteStepNavigationProps) {
  return (
    <div className="flex flex-row gap-3 pt-2 sm:items-center sm:justify-between">
      {showPrevious ? (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={previousDisabled || isSubmitting}
          startIcon={<ChevronLeftIcon className="h-4 w-4" />}
          className="w-full rounded-lg border-gray-300 px-6 py-3 font-semibold sm:w-auto"
        >
          {previousLabel}
        </Button>
      ) : (
        <span className="hidden sm:block" aria-hidden />
      )}

      {showNext ? (
        <Button
          type={nextType}
          form={nextFormId}
          variant="primary"
          onClick={nextType === "button" ? onNext : undefined}
          disabled={nextDisabled || isSubmitting}
          className="w-full min-w-[120px] rounded-lg px-8 py-3 font-semibold sm:w-auto"
        >
          {isSubmitting ? "Traitement en cours..." : nextLabel}
        </Button>
      ) : null}
    </div>
  );
}
