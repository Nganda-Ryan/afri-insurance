"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import { generatePaymentTrid } from "@/lib/utils";
import type { AutoQuoteResult } from "@/types/auto-insurance";

interface AutoQuotePaymentStepProps {
  quote: AutoQuoteResult;
  onBack: () => void;
}

export function AutoQuotePaymentStep({ quote, onBack }: AutoQuotePaymentStepProps) {
  const [walletPhone, setWalletPhone] = useState("");
  const [payChannel, setPayChannel] = useState<"" | "om" | "momo">("");
  const [paymentTrid] = useState(() => generatePaymentTrid());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setWalletPhone("");
    setPayChannel("");
  }, []);

  const canPay = walletPhone.trim().length >= 9 && payChannel !== "";

  const handleInitiatePayment = async () => {
    if (!canPay) return;
    setIsSubmitting(true);
    try {
      toast.info(
        "Le paiement en ligne pour l'assurance automobile sera disponible prochainement.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-brand-secondary">Paiement mobile</h2>
        <p className="text-sm text-text-main text-opacity-90">
          Montant à régler :{" "}
          <span className="font-bold">
            {formatAutoAmount(quote.breakdown.total_a_payer, quote.devise)}
          </span>
        </p>
        <p className="text-sm text-text-main text-opacity-90">
          Référence de transaction :{" "}
          <span className="font-mono text-xs">{paymentTrid}</span>
        </p>

        <div className="space-y-4">
          <div>
            <Label className="mb-2 font-semibold text-text-main">
              Numéro de téléphone (paiement) <span className="text-red-500">*</span>
            </Label>
            <InputField
              type="tel"
              placeholder="2376XXXXXXXX"
              value={walletPhone}
              onChange={(e) => setWalletPhone(e.target.value)}
              disabled={isSubmitting}
              className="border bg-white"
            />
          </div>
          <div>
            <Label className="mb-2 font-semibold text-text-main">
              Moyen de paiement <span className="text-red-500">*</span>
            </Label>
            <Select
              id="auto-pay-channel"
              name="payChannel"
              value={payChannel}
              disabled={isSubmitting}
              onChange={(v) => setPayChannel(v as "" | "om" | "momo")}
              options={[
                { value: "", label: "Choisir…" },
                { value: "momo", label: "Mobile Money (MTN)" },
                { value: "om", label: "Orange Money" },
              ]}
              className="border bg-white py-3"
            />
          </div>
        </div>
      </div>

      <QuoteStepNavigation
        onPrevious={onBack}
        onNext={handleInitiatePayment}
        nextLabel="Initier le paiement"
        nextDisabled={!canPay}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
