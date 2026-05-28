"use client";

import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import Button from "@/components/ui/button/Button";
import type { S3pCashoutCollectResult } from "@/types/smobilpay";

interface PaymentStepProps {
  paymentTrid: string;
  walletPhone: string;
  payChannel: "" | "om" | "momo";
  canInitierPaiement: boolean;
  isSubmitting: boolean;
  initiatePending: boolean;
  verifyPending: boolean;
  subscribePending: boolean;
  collectResult: S3pCashoutCollectResult | null;
  paymentInitFeedback: { tone: "success" | "error"; message: string } | null;
  onWalletPhoneChange: (value: string) => void;
  onPayChannelChange: (value: "" | "om" | "momo") => void;
  onBack: () => void;
  onInitiatePayment: () => void;
  onVerifyPayment: () => void;
}

export function SubscribePaymentStep({
  paymentTrid,
  walletPhone,
  payChannel,
  canInitierPaiement,
  isSubmitting,
  initiatePending,
  verifyPending,
  subscribePending,
  collectResult,
  paymentInitFeedback,
  onWalletPhoneChange,
  onPayChannelChange,
  onBack,
  onInitiatePayment,
  onVerifyPayment,
}: PaymentStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-brand-secondary">Paiement mobile</h2>
        <p className="text-sm text-text-main text-opacity-90">
          Renseignez le numéro du compte à débiter et le réseau. Référence de transaction :{" "}
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
              onChange={(e) => onWalletPhoneChange(e.target.value)}
              disabled={collectResult != null}
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
              disabled={collectResult != null}
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
              Paiement initié. Après validation sur votre téléphone, vérifiez le statut ci-dessous.
            </p>
            <Button
              type="button"
              variant="primary"
              onClick={onVerifyPayment}
              disabled={verifyPending || subscribePending}
              className="w-full sm:w-auto"
            >
              {verifyPending ? "Vérification…" : "Vérifier le statut du paiement"}
            </Button>
          </div>
        ) : null}
      </div>

      <QuoteStepNavigation
        onPrevious={onBack}
        onNext={onInitiatePayment}
        nextLabel="Initier le paiement"
        showNext={collectResult == null}
        nextDisabled={!canInitierPaiement || initiatePending || isSubmitting}
        previousDisabled={initiatePending || verifyPending}
        isSubmitting={initiatePending || isSubmitting}
      />
    </div>
  );
}
