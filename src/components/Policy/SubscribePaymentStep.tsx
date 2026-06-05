"use client";

import { useEffect, useState } from "react";

import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { getPaymentInitiatedMessage } from "@/lib/errorCode";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import Button from "@/components/ui/button/Button";
import type { S3pCashoutCollectResult } from "@/types/smobilpay";

interface PaymentStepProps {
  quoteId: string;
  walletPhone: string;
  payChannel: "" | "om" | "momo";
  canInitierPaiement: boolean;
  isSubmitting: boolean;
  initiatePending: boolean;
  verifyPending: boolean;
  subscribePending: boolean;
  collectResult: S3pCashoutCollectResult | null;
  paymentInitFeedback: { tone: "success" | "error"; message: string } | null;
  initiateCooldownSec: number;
  onWalletPhoneChange: (value: string) => void;
  onPayChannelChange: (value: "" | "om" | "momo") => void;
  onBack: () => void;
  onInitiatePayment: () => void;
  onVerifyPayment: () => void;
}

const VERIFY_PAYMENT_COOLDOWN_SEC = 10;

export function SubscribePaymentStep({
  quoteId,
  walletPhone,
  payChannel,
  canInitierPaiement,
  isSubmitting,
  initiatePending,
  verifyPending,
  subscribePending,
  collectResult,
  paymentInitFeedback,
  initiateCooldownSec,
  onWalletPhoneChange,
  onPayChannelChange,
  onBack,
  onInitiatePayment,
  onVerifyPayment,
}: PaymentStepProps) {
  const [verifyCooldownSec, setVerifyCooldownSec] = useState(0);

  useEffect(() => {
    if (verifyCooldownSec <= 0) return;
    const timer = window.setTimeout(() => {
      setVerifyCooldownSec((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [verifyCooldownSec]);

  const verifyBlocked =
    verifyPending || subscribePending || verifyCooldownSec > 0;

  /** Verrouillage formulaire uniquement pendant l'appel ou le délai avant réessai. */
  const paymentFormLocked = initiatePending || initiateCooldownSec > 0;
  const canRetryInitiate =
    canInitierPaiement && !initiatePending && !isSubmitting && initiateCooldownSec <= 0;

  const handleVerifyPayment = () => {
    if (verifyBlocked) return;
    setVerifyCooldownSec(VERIFY_PAYMENT_COOLDOWN_SEC);
    onVerifyPayment();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-brand-secondary">Paiement mobile</h2>
        <p className="text-sm text-text-main text-opacity-90">
          Renseignez le numéro du compte à débiter et le réseau. Référence de transaction :{" "}
          <span className="font-mono text-xs">{quoteId}</span>
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
              onChange={(e) => onWalletPhoneChange(e.target.value)}
              disabled={paymentFormLocked}
              className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>
          <div>
            <Label className="mb-2 font-semibold text-text-main">
              Moyen de paiement <span className="text-red-500">*</span>
            </Label>
            <Select
              id="pay-channel"
              name="payChannel"
              value={payChannel}
              disabled={paymentFormLocked}
              onChange={(v: string) => onPayChannelChange(v as "" | "om" | "momo")}
              options={[
                { value: "", label: "Choisir…" },
                { value: "momo", label: "Mobile Money (MTN)" },
                { value: "om", label: "Orange Money" },
              ]}
              className="border bg-white py-3 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>
        </div>

        {paymentInitFeedback ? (
          <p
            className={`text-sm ${paymentInitFeedback.tone === "success" ? "text-emerald-600" : "text-red-600"}`}
          >
            {paymentInitFeedback.message}
          </p>
        ) : null}

        {collectResult ? (
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="mb-3 text-sm text-text-main">
              {getPaymentInitiatedMessage(payChannel)}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="primary"
                onClick={handleVerifyPayment}
                disabled={verifyBlocked}
                className="w-full sm:w-auto"
              >
                {verifyPending ? "Vérification…" : "Vérifier le statut du paiement"}
              </Button>
              {verifyCooldownSec > 0 ? (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {verifyCooldownSec}s
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <QuoteStepNavigation
        onPrevious={onBack}
        onNext={onInitiatePayment}
        nextLabel={
          initiateCooldownSec > 0
            ? `Réessayer dans ${initiateCooldownSec}s`
            : "Initier le paiement"
        }
        showNext={true}
        nextDisabled={!canRetryInitiate}
        previousDisabled={initiatePending || verifyPending}
        isSubmitting={initiatePending || isSubmitting}
      />
    </div>
  );
}
