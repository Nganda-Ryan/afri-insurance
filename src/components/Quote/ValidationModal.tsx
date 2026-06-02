"use client";

import React from "react";
import { CreditCardIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  languageCodeFromQuoteContext,
  subscriptionCountryFromQuoteContext,
} from "@/lib/travel/quote-subscribe-context";
import { stripDiacritics } from "@/lib/utils";
import type {
  SelectedPlan,
  SubscribePolicyInputDto,
  TravelerInfoData,
  TravelQuoteContext,
  TripDetailsData,
} from "@/types/travel";
import { useSubscribeTravelPolicy } from "@/hooks/use-travel-quote-session";
import { processInsuranceCheckout } from "@/actions/checkout.actions";
import {
  POLICY_TYPE_AUTO,
  POLICY_TYPE_HOME,
  POLICY_TYPE_PET,
  POLICY_TYPE_TRAVEL,
} from "@/lib/constants/constant";
import Button from "@/components/ui/button/Button";
import { SubscribePersonFields } from "@/components/Policy/SubscribePersonFields";
import type { PersonFormData } from "@/types/subscribe";

interface ValidationModalProps {
  selectedPlan: SelectedPlan;
  tripDetails: TripDetailsData;
  travelerInfo: TravelerInfoData;
  quoteContext?: TravelQuoteContext;
  onClose: () => void;
}

function policyTypeLabel(type: string): string {
  switch (type) {
    case POLICY_TYPE_AUTO:
      return "Assurance auto";
    case POLICY_TYPE_HOME:
      return "Assurance habitation";
    case POLICY_TYPE_PET:
      return "Assurance animaux";
    case POLICY_TYPE_TRAVEL:
    default:
      return "Assistance voyage";
  }
}

export function ValidationModal({
  selectedPlan,
  tripDetails,
  travelerInfo,
  quoteContext,
  onClose,
}: ValidationModalProps) {
  const router = useRouter();
  const subscribe = useSubscribeTravelPolicy();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const isSubmitting = subscribe.isPending || isCheckingOut;
  const insuranceTypeLabel = policyTypeLabel(POLICY_TYPE_TRAVEL);
  const currencyLabel = quoteContext?.currency?.trim();
  const totalPremiumLabel = `${selectedPlan.price.toLocaleString("fr-FR")}${currencyLabel ? ` ${currencyLabel}` : ""}`;

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonFormData>({
    mode: "onSubmit",
    defaultValues: {
      title: "M",
      destination_country: tripDetails.destination_country,
      residence_country: "",
      nationality: "",
    },
  });

  const onSubmit = (data: PersonFormData) => {
    const sanitizeCountry = (value: string) => stripDiacritics(value);
    const payload: SubscribePolicyInputDto = {
      subscription_country: sanitizeCountry(
        subscriptionCountryFromQuoteContext(quoteContext),
      ),
      language_code: languageCodeFromQuoteContext(quoteContext),
      agent_scope: "",
      policy_holder: [
        {
          title: data.title,
          first_name: data.first_name,
          last_name: data.last_name,
          birth_date: data.birth_date,
          email: data.email,
          address: data.address,
          is_policy_beneficiary: 0,
        },
      ],
      beneficiaries: [
        {
          title: data.title,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          passport_number: data.passport_number,
          phone_number: data.phone_number,
          birth_date: data.birth_date,
          address: data.address,
          passeport_exp_date: data.passeport_exp_date,
          city: data.city,
          destination_country: sanitizeCountry(data.destination_country),
          residence_country: sanitizeCountry(data.residence_country),
          nationality: sanitizeCountry(data.nationality),
        },
      ],
      consents: [],
      payment: { type: "MANAGED_BY_PARTNER" },
      addons: [],
    };
    console.log("Subscribe payload", payload);

    subscribe.mutate(payload, {
      onSuccess: async (res) => {
        if (res.ok && res.data) {
          const externalPolicyId = res.data.policyId;
          setIsCheckingOut(true);
          try {
            const checkoutResult = await processInsuranceCheckout({
              email: data.email,
              firstName: data.first_name,
              lastName: data.last_name,
              phone: data.phone_number,
              planCategory: selectedPlan.name,
              destination: tripDetails.destination_area,
              externalPolicyId,
              policyType: POLICY_TYPE_TRAVEL,
            });
            if (!checkoutResult.ok) {
              // Non-fatal : la police EVO est créée, on continue.
              console.error("[checkout] processInsuranceCheckout failed:", {
                code: checkoutResult.error?.code ?? "CHECKOUT_UNKNOWN_ERROR",
                message:
                  checkoutResult.error?.message ??
                  "Erreur inconnue pendant le checkout.",
              });
            }
          } catch (err) {
            // Non-fatal : la police EVO est créée, on continue.
            console.error("[checkout] processInsuranceCheckout failed:", err);
          } finally {
            setIsCheckingOut(false);
          }
          router.push(`/quote/${externalPolicyId}`);
          onClose();
          return;
        }
        console.log("Subscribe error", res.error);
        toast.error(res.error?.message ?? "Souscription impossible.");
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="validation-modal-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card text-card-foreground shadow-2xl"
      >
        {/* ── En-tête ── */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2
            id="validation-modal-title"
            className="text-2xl font-bold"
          >
            Devis validé - {insuranceTypeLabel}
          </h2>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 w-10 border-transparent bg-transparent p-0 shadow-none ring-0 hover:bg-muted"
            startIcon={<XIcon className="h-6 w-6 text-gray-600" />}
          >
            <span className="sr-only">Fermer</span>
          </Button>
        </div>

        <div className="p-4 md:p-6">

          {/* ── Récapitulatif plan ── */}
          <div className="mb-6 border rounded-lg bg-muted/50 p-6">
            <h3 className="mb-4 text-lg font-bold">
              Récapitulatif du plan choisi
            </h3>
            <div className="space-y-3">
              {[
                { label: "Type de plan", value: selectedPlan.name, highlight: true },
                {
                  label: "Prime totale",
                  value: totalPremiumLabel,
                  large: true,
                },
                { label: "Zone de destination", value: tripDetails.destination_area },
                { label: "Pays de destination", value: tripDetails.destination_country },
                {
                  label: "Dates de couverture",
                  value: `${new Date(tripDetails.start_date).toLocaleDateString()} – ${new Date(tripDetails.end_date).toLocaleDateString()}`,
                },
                { label: "Nombre de voyageurs", value: String(tripDetails.adult) },
              ].map(({ label, value, highlight, large }) => (
                <div
                  key={label}
                  className="flex items-start gap-2 justify-between border-b border-gray-300 pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-semibold text-text-main">{label}</span>
                  <span
                    className={
                      highlight
                        ? "font-bold text-brand-primary"
                        : large
                          ? "text-2xl font-bold text-text-main"
                          : "text-text-main"
                    }
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Formulaire souscripteur ── */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mb-6 rounded-lg border border-border bg-muted/40 p-6"
          >
            <h3 className="mb-4 text-lg font-bold">
              Informations du souscripteur
            </h3>
            <SubscribePersonFields
              control={control}
              register={register}
              getValues={getValues}
              errors={errors}
              namePrefix=""
              embedded
            />

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-lg px-6 py-4"
              startIcon={!isSubmitting ? <CreditCardIcon className="h-5 w-5" /> : undefined}
            >
              {isSubmitting ? "Traitement en cours..." : "Passer au paiement sécurisé"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
