"use client";

import { DownloadIcon } from "lucide-react";

import Button from "@/components/ui/button/Button";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { downloadQuoteDocument } from "@/lib/quote/download-quote-document";

interface QuoteDownloadStepProps {
  title?: string;
  description?: string;
  filename: string;
  documentContent: string;
  summaryAmountLabel: string;
  summaryAmountValue: string;
  onBack: () => void;
}

export function QuoteDownloadStep({
  title = "Votre devis",
  description = "Téléchargez votre devis indicatif. Un conseiller pourra le finaliser avec vous.",
  filename,
  documentContent,
  summaryAmountLabel,
  summaryAmountValue,
  onBack,
}: QuoteDownloadStepProps) {
  const handleDownload = () => {
    downloadQuoteDocument(filename, documentContent);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-brand-secondary">{title}</h2>
        <p className="text-sm text-text-main text-opacity-90">{description}</p>
        <p className="text-sm text-text-main text-opacity-90">
          {summaryAmountLabel} :{" "}
          <span className="font-bold">{summaryAmountValue}</span>
        </p>

        <Button
          type="button"
          variant="primary"
          onClick={handleDownload}
          startIcon={<DownloadIcon className="h-4 w-4" />}
          className="w-full rounded-lg px-6 py-3 font-semibold sm:w-auto"
        >
          Télécharger le devis
        </Button>
      </div>

      <QuoteStepNavigation
        onPrevious={onBack}
        showNext={false}
      />
    </div>
  );
}
