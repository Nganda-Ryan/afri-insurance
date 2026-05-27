"use client";

import React from "react";
import { CreditCardIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  languageCodeFromQuoteContext,
  subscriptionCountryFromQuoteContext,
} from "@/lib/travel/quote-subscribe-context";
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
import DatePicker from "@/components/form/date-picker";
import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";

interface ValidationModalProps {
  selectedPlan: SelectedPlan;
  tripDetails: TripDetailsData;
  travelerInfo: TravelerInfoData;
  quoteContext?: TravelQuoteContext;
  onClose: () => void;
}

interface SubscriberFormData {
  title: "M" | "Mme";
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  passport_number: string;
  passeport_exp_date: string;
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
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriberFormData>({
    mode: "onSubmit",
    defaultValues: { title: "M" },
  });

  const onSubmit = (data: SubscriberFormData) => {
    const payload: SubscribePolicyInputDto = {
      subscription_country: subscriptionCountryFromQuoteContext(quoteContext),
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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Civilité */}
              <div>
                <Label className="mb-2 font-semibold text-text-main">
                  Civilité <span className="text-red-500">*</span>
                </Label>
                <Controller
                  control={control}
                  name="title"
                  rules={{ required: "Civilité obligatoire" }}
                  render={({ field }) => (
                    <Select
                      id="subscriber-title"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      options={[
                        { value: "M", label: "M." },
                        { value: "Mme", label: "Mme" },
                      ]}
                      error={!!errors.title}
                      className="border bg-white py-3 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  )}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Prénom */}
              <div>
                <Label className="mb-2 font-semibold text-text-main">
                  Prénom <span className="text-red-500">*</span>
                </Label>
                <InputField
                  type="text"
                  placeholder="Jean"
                  {...register("first_name", { required: "Prénom obligatoire" })}
                  error={!!errors.first_name}
                  className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.first_name.message}</p>
                )}
              </div>

              {/* Nom */}
              <div>
                <Label className="mb-2 font-semibold text-text-main">
                  Nom <span className="text-red-500">*</span>
                </Label>
                <InputField
                  type="text"
                  placeholder="Dupont"
                  {...register("last_name", { required: "Nom obligatoire" })}
                  error={!!errors.last_name}
                  className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.last_name.message}</p>
                )}
              </div>

              {/* Date de naissance */}
              <div>
                <Label className="mb-2 font-semibold text-text-main">
                  Date de naissance <span className="text-red-500">*</span>
                </Label>
                <Controller
                  control={control}
                  name="birth_date"
                  rules={{
                    required: "Date de naissance obligatoire",
                    validate: (v) =>
                      new Date(v) < new Date() || "La date doit être dans le passé",
                  }}
                  render={({ field }) => (
                    <DatePicker
                      id="subscriber-birth-date"
                      name={field.name}
                      value={field.value}
                      appendToBody
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={!!errors.birth_date}
                      className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  )}
                />
                {errors.birth_date && (
                  <p className="mt-1 text-sm text-red-500">{errors.birth_date.message}</p>
                )}
              </div>

              {/* E-mail */}
              <div>
                <Label className="mb-2 font-semibold text-text-main">
                  E-mail <span className="text-red-500">*</span>
                </Label>
                <InputField
                  type="email"
                  placeholder="jean.dupont@example.com"
                  {...register("email", {
                    required: "E-mail obligatoire",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Format e-mail invalide",
                    },
                  })}
                  error={!!errors.email}
                  className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <Label className="mb-2 font-semibold text-text-main">
                  Téléphone <span className="text-red-500">*</span>
                </Label>
                <InputField
                  type="tel"
                  placeholder="+237 6 00 00 00 00"
                  {...register("phone_number", {
                    required: "Téléphone obligatoire",
                  })}
                  error={!!errors.phone_number}
                  className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.phone_number && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone_number.message}</p>
                )}
              </div>

              {/* Adresse */}
              <div className="md:col-span-2">
                <Label className="mb-2 font-semibold text-text-main">
                  Adresse postale <span className="text-red-500">*</span>
                </Label>
                <InputField
                  type="text"
                  placeholder="123 rue de la Paix"
                  {...register("address", { required: "Adresse obligatoire" })}
                  error={!!errors.address}
                  className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              {/* Ville */}
              <div>
                <Label className="mb-2 font-semibold text-text-main">
                  Ville <span className="text-red-500">*</span>
                </Label>
                <InputField
                  type="text"
                  placeholder="Yaoundé"
                  {...register("city", { required: "Ville obligatoire" })}
                  error={!!errors.city}
                  className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              {/* Numéro de passeport */}
              <div>
                <Label className="mb-2 font-semibold text-text-main">
                  Numéro de passeport <span className="text-red-500">*</span>
                </Label>
                <InputField
                  type="text"
                  placeholder="AB123456"
                  {...register("passport_number", {
                    required: "Numéro de passeport obligatoire",
                  })}
                  error={!!errors.passport_number}
                  className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.passport_number && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.passport_number.message}
                  </p>
                )}
              </div>

              {/* Date d'expiration du passeport */}
              <div>
                <Label className="mb-2 font-semibold text-text-main">
                  Expiration du passeport <span className="text-red-500">*</span>
                </Label>
                <Controller
                  control={control}
                  name="passeport_exp_date"
                  rules={{
                    required: "Date d'expiration obligatoire",
                    validate: (v) =>
                      new Date(v) > new Date() ||
                      "Le passeport doit être valide (date future)",
                  }}
                  render={({ field }) => (
                    <DatePicker
                      id="subscriber-passport-exp-date"
                      name={field.name}
                      value={field.value}
                      appendToBody
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={!!errors.passeport_exp_date}
                      className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  )}
                />
                {errors.passeport_exp_date && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.passeport_exp_date.message}
                  </p>
                )}
              </div>
            </div>

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
