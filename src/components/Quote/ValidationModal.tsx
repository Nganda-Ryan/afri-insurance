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
import type {
  SelectedPlan,
  SubscribePolicyInputDto,
  TravelerInfoData,
  TravelQuoteContext,
  TripDetailsData,
} from "@/types/travel";
import { useSubscribeTravelPolicy } from "@/hooks/use-travel-quote-session";

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

export function ValidationModal({
  selectedPlan,
  tripDetails,
  travelerInfo,
  quoteContext,
  onClose,
}: ValidationModalProps) {
  const router = useRouter();
  const subscribe = useSubscribeTravelPolicy();

  const {
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
      onSuccess: (res) => {
        if (res.ok && res.data) {
          router.push(`/quote/${res.data.policyId}`);
          onClose();
          return;
        }
        toast.error(res.error?.message ?? "Souscription impossible.");
      },
    });
  };

  const fieldClass = (hasError: boolean) =>
    [
      "w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 focus:outline-none dark:bg-zinc-950 dark:text-zinc-100",
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-gray-200 focus:border-brand-primary dark:border-zinc-600",
    ].join(" ");

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
            className="text-2xl font-bold text-brand-secondary"
          >
            Devis validé
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <XIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* ── Icône succès ── */}
          <div className="mb-6 flex justify-center">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="#e74f1c" strokeWidth="4" fill="none" />
              <path
                d="M 35 60 L 52 77 L 85 44"
                stroke="#e74f1c"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* ── Récapitulatif plan ── */}
          <div className="mb-6 rounded-lg bg-muted/50 p-6">
            <h3 className="mb-4 text-lg font-bold text-brand-secondary">
              Récapitulatif du plan choisi
            </h3>
            <div className="space-y-3">
              {[
                { label: "Type de plan", value: selectedPlan.name, highlight: true },
                {
                  label: "Prime totale",
                  value:
                    selectedPlan.source === "api"
                      ? `${selectedPlan.price}`
                      : `$${selectedPlan.price}`,
                  large: true,
                },
                { label: "Destination", value: tripDetails.destination_area },
                {
                  label: "Dates de couverture",
                  value: `${new Date(tripDetails.start_date).toLocaleDateString()} – ${new Date(tripDetails.end_date).toLocaleDateString()}`,
                },
                { label: "Nombre de voyageurs", value: String(tripDetails.adult) },
              ].map(({ label, value, highlight, large }) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-gray-300 pb-3 last:border-0 last:pb-0"
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
            <h3 className="mb-4 text-lg font-bold text-brand-secondary">
              Informations du souscripteur
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Civilité */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Civilité <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("title", { required: "Civilité obligatoire" })}
                  className={fieldClass(!!errors.title)}
                >
                  <option value="M">M.</option>
                  <option value="Mme">Mme</option>
                </select>
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Prénom */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Jean"
                  {...register("first_name", { required: "Prénom obligatoire" })}
                  className={fieldClass(!!errors.first_name)}
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.first_name.message}</p>
                )}
              </div>

              {/* Nom */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Dupont"
                  {...register("last_name", { required: "Nom obligatoire" })}
                  className={fieldClass(!!errors.last_name)}
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.last_name.message}</p>
                )}
              </div>

              {/* Date de naissance */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Date de naissance <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("birth_date", {
                    required: "Date de naissance obligatoire",
                    validate: (v) =>
                      new Date(v) < new Date() || "La date doit être dans le passé",
                  })}
                  className={fieldClass(!!errors.birth_date)}
                />
                {errors.birth_date && (
                  <p className="mt-1 text-sm text-red-500">{errors.birth_date.message}</p>
                )}
              </div>

              {/* E-mail */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="jean.dupont@example.com"
                  {...register("email", {
                    required: "E-mail obligatoire",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Format e-mail invalide",
                    },
                  })}
                  className={fieldClass(!!errors.email)}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+237 6 00 00 00 00"
                  {...register("phone_number", {
                    required: "Téléphone obligatoire",
                  })}
                  className={fieldClass(!!errors.phone_number)}
                />
                {errors.phone_number && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone_number.message}</p>
                )}
              </div>

              {/* Adresse */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Adresse postale <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="123 rue de la Paix"
                  {...register("address", { required: "Adresse obligatoire" })}
                  className={fieldClass(!!errors.address)}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              {/* Ville */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Ville <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Yaoundé"
                  {...register("city", { required: "Ville obligatoire" })}
                  className={fieldClass(!!errors.city)}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              {/* Numéro de passeport */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Numéro de passeport <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="AB123456"
                  {...register("passport_number", {
                    required: "Numéro de passeport obligatoire",
                  })}
                  className={fieldClass(!!errors.passport_number)}
                />
                {errors.passport_number && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.passport_number.message}
                  </p>
                )}
              </div>

              {/* Date d'expiration du passeport */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Expiration du passeport <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("passeport_exp_date", {
                    required: "Date d'expiration obligatoire",
                    validate: (v) =>
                      new Date(v) > new Date() ||
                      "Le passeport doit être valide (date future)",
                  })}
                  className={fieldClass(!!errors.passeport_exp_date)}
                />
                {errors.passeport_exp_date && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.passeport_exp_date.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={subscribe.isPending}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-secondary px-6 py-4 font-semibold text-text-inverse shadow-md transition-opacity hover:bg-opacity-90 disabled:opacity-50"
            >
              <CreditCardIcon className="h-5 w-5" />
              {subscribe.isPending ? "Envoi…" : "Passer au paiement sécurisé"}
            </button>

            <p className="mt-4 text-center text-xs text-gray-600">
              En poursuivant, votre demande de police est transmise au partenaire avec le
              paiement géré par le partenaire.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
