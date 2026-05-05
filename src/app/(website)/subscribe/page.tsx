"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  CreditCardIcon
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { processInsuranceCheckout } from "@/actions/checkout.actions";
import DatePicker from "@/components/form/date-picker";
import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { ProgressBar } from "@/components/Quote/ProgressBar";
import { useSubscribeTravelPolicy } from "@/hooks/use-travel-quote-session";
import { POLICY_TYPE_TRAVEL } from "@/lib/constants/constant";
import {
  languageCodeFromQuoteContext,
  subscriptionCountryFromQuoteContext,
} from "@/lib/travel/quote-subscribe-context";
import type { SubscribePolicyInputDto, TravelQuoteContext } from "@/types/travel";

type Step = 1 | 2;

interface PersonFormData {
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

interface SubscriberFormData extends PersonFormData {
  groupMembers: PersonFormData[];
}

function ageFromBirthDate(value: string): number | null {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const monthDelta = today.getMonth() - d.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < d.getDate())) age -= 1;
  return age;
}

function PersonFields({
  control,
  register,
  errors,
  namePrefix,
  title,
}: {
  control: any;
  register: any;
  errors: any;
  namePrefix: "" | `groupMembers.${number}.`;
  title: string;
}) {
  const fieldName = (key: keyof PersonFormData) => `${namePrefix}${key}` as const;
  const fieldId = (key: keyof PersonFormData) =>
    `${namePrefix}${key}`.replaceAll(".", "-");
  const memberIndex =
    namePrefix === "" ? null : Number.parseInt(namePrefix.split(".")[1] ?? "-1", 10);
  const fieldError = (key: keyof PersonFormData) =>
    memberIndex == null ? errors[key] : errors.groupMembers?.[memberIndex]?.[key];

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <h3 className="mb-3 text-base font-semibold text-brand-secondary sm:text-lg">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-2 font-semibold text-text-main">
            Civilite <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name={fieldName("title")}
            rules={{ required: "Civilite obligatoire" }}
            render={({ field }: { field: any }) => (
              <Select
                id={fieldId("title")}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={[{ value: "M", label: "M." }, { value: "Mme", label: "Mme" }]}
                error={!!fieldError("title")}
                className="border bg-white py-3 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
              />
            )}
          />
          {fieldError("title") && (
            <p className="mt-1 text-sm text-red-500">
              {String(fieldError("title")?.message ?? "")}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2 font-semibold text-text-main">
            Prenom <span className="text-red-500">*</span>
          </Label>
          <InputField
            type="text"
            placeholder="Jean"
            {...register(fieldName("first_name"), { required: "Prenom obligatoire" })}
            error={!!fieldError("first_name")}
            className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {fieldError("first_name") && (
            <p className="mt-1 text-sm text-red-500">
              {String(fieldError("first_name")?.message ?? "")}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2 font-semibold text-text-main">
            Nom <span className="text-red-500">*</span>
          </Label>
          <InputField
            type="text"
            placeholder="Dupont"
            {...register(fieldName("last_name"), { required: "Nom obligatoire" })}
            error={!!fieldError("last_name")}
            className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {fieldError("last_name") && (
            <p className="mt-1 text-sm text-red-500">
              {String(fieldError("last_name")?.message ?? "")}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2 font-semibold text-text-main">
            Date de naissance <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name={fieldName("birth_date")}
            rules={{
              required: "Date de naissance obligatoire",
              validate: (v: string) =>
                new Date(v) < new Date() || "La date doit etre dans le passe",
            }}
            render={({ field }: { field: any }) => (
              <DatePicker
                id={fieldId("birth_date")}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldError("birth_date")}
                className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
              />
            )}
          />
          {fieldError("birth_date") && (
            <p className="mt-1 text-sm text-red-500">
              {String(fieldError("birth_date")?.message ?? "")}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2 font-semibold text-text-main">
            E-mail <span className="text-red-500">*</span>
          </Label>
          <InputField
            type="email"
            placeholder="jean.dupont@example.com"
            {...register(fieldName("email"), {
              required: "E-mail obligatoire",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format e-mail invalide",
              },
            })}
            error={!!fieldError("email")}
            className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {fieldError("email") && (
            <p className="mt-1 text-sm text-red-500">
              {String(fieldError("email")?.message ?? "")}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2 font-semibold text-text-main">
            Telephone <span className="text-red-500">*</span>
          </Label>
          <InputField
            type="tel"
            placeholder="+237 6 00 00 00 00"
            {...register(fieldName("phone_number"), { required: "Telephone obligatoire" })}
            error={!!fieldError("phone_number")}
            className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {fieldError("phone_number") && (
            <p className="mt-1 text-sm text-red-500">
              {String(fieldError("phone_number")?.message ?? "")}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label className="mb-2 font-semibold text-text-main">
            Adresse postale <span className="text-red-500">*</span>
          </Label>
          <InputField
            type="text"
            placeholder="123 rue de la Paix"
            {...register(fieldName("address"), { required: "Adresse obligatoire" })}
            error={!!fieldError("address")}
            className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {fieldError("address") && (
            <p className="mt-1 text-sm text-red-500">
              {String(fieldError("address")?.message ?? "")}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2 font-semibold text-text-main">
            Ville <span className="text-red-500">*</span>
          </Label>
          <InputField
            type="text"
            placeholder="Yaounde"
            {...register(fieldName("city"), { required: "Ville obligatoire" })}
            error={!!fieldError("city")}
            className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {fieldError("city") && (
            <p className="mt-1 text-sm text-red-500">
              {String(fieldError("city")?.message ?? "")}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2 font-semibold text-text-main">
            Numero de passeport <span className="text-red-500">*</span>
          </Label>
          <InputField
            type="text"
            placeholder="AB123456"
            {...register(fieldName("passport_number"), {
              required: "Numero de passeport obligatoire",
            })}
            error={!!fieldError("passport_number")}
            className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {fieldError("passport_number") && (
            <p className="mt-1 text-sm text-red-500">
              {String(fieldError("passport_number")?.message ?? "")}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2 font-semibold text-text-main">
            Expiration du passeport <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name={fieldName("passeport_exp_date")}
            rules={{
              required: "Date d'expiration obligatoire",
              validate: (v: string) =>
                new Date(v) > new Date() ||
                "Le passeport doit etre valide (date future)",
            }}
            render={({ field }: { field: any }) => (
              <DatePicker
                id={fieldId("passeport_exp_date")}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldError("passeport_exp_date")}
                className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
              />
            )}
          />
          {fieldError("passeport_exp_date") && (
            <p className="mt-1 text-sm text-red-500">
              {String(fieldError("passeport_exp_date")?.message ?? "")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SubscribePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscribe = useSubscribeTravelPolicy();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const isSubmitting = subscribe.isPending || isCheckingOut;

  const planName = searchParams.get("planName") ?? "";
  const planPrice = Number(searchParams.get("planPrice") ?? "0");
  const destination = searchParams.get("destination") ?? "";
  const startDate = searchParams.get("startDate") ?? "";
  const endDate = searchParams.get("endDate") ?? "";
  const adult = searchParams.get("adult") ?? "";
  const expectedOldestAge = Number.parseInt(
    searchParams.get("oldestTravelerAge") ?? "",
    10,
  );
  const travelerCount = Number.parseInt(adult, 10);
  const additionalTravelerCount =
    Number.isFinite(travelerCount) && travelerCount > 1 ? travelerCount - 1 : 0;
  const hasGroup = additionalTravelerCount > 0;

  const quoteContext: TravelQuoteContext = {
    currency: searchParams.get("currency") ?? undefined,
    country: searchParams.get("country") ?? undefined,
    language: searchParams.get("language") ?? undefined,
  };

  const hasRequiredParams =
    planName.trim().length > 0 &&
    Number.isFinite(planPrice) &&
    planPrice > 0 &&
    destination.trim().length > 0 &&
    startDate.trim().length > 0 &&
    endDate.trim().length > 0;
  const currencyLabel = quoteContext.currency?.trim();
  const totalPremiumLabel = `${planPrice.toLocaleString("fr-FR")}${currencyLabel ? ` ${currencyLabel}` : ""}`;

  const {
    control,
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<SubscriberFormData>({
    mode: "onSubmit",
    defaultValues: {
      title: "M",
      first_name: "",
      last_name: "",
      birth_date: "",
      email: "",
      phone_number: "",
      address: "",
      city: "",
      passport_number: "",
      passeport_exp_date: "",
      groupMembers: Array.from({ length: additionalTravelerCount }, () => ({
        title: "M" as const,
        first_name: "",
        last_name: "",
        birth_date: "",
        email: "",
        phone_number: "",
        address: "",
        city: "",
        passport_number: "",
        passeport_exp_date: "",
      })),
    },
  });

  const [holderBirthDate, groupMembers] = watch(["birth_date", "groupMembers"]) as [
    string,
    PersonFormData[],
  ];

  const detectedOldestAge = useMemo(() => {
    const ages = [
      ageFromBirthDate(holderBirthDate),
      ...(groupMembers ?? []).map((m) => ageFromBirthDate(m.birth_date)),
    ].filter((v): v is number => v != null);
    return ages.length ? Math.max(...ages) : null;
  }, [holderBirthDate, groupMembers]);

  const ageState: "neutral" | "match" | "mismatch" = useMemo(() => {
    if (!Number.isFinite(expectedOldestAge)) return "neutral";
    if (detectedOldestAge == null) return "neutral";
    return detectedOldestAge === expectedOldestAge ? "match" : "mismatch";
  }, [detectedOldestAge, expectedOldestAge]);

  const ageInfoMessage = useMemo(() => {
    if (!Number.isFinite(expectedOldestAge)) return null;
    if (detectedOldestAge == null) {
      return `Age le plus eleve attendu : ${expectedOldestAge} ans.`;
    }
    if (detectedOldestAge === expectedOldestAge) {
      return `Verification OK : actuellement, le plus age est ${detectedOldestAge} ans (attendu : ${expectedOldestAge} ans).`;
    }
    return `Attention : actuellement, le plus age est ${detectedOldestAge} ans, alors que l'age attendu est ${expectedOldestAge} ans.`;
  }, [detectedOldestAge, expectedOldestAge]);

  const ageBannerClasses =
    ageState === "match"
      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
      : ageState === "mismatch"
        ? "border-amber-300 bg-amber-50 text-amber-800"
        : "border-border bg-card text-text-main";

  const onNextStep = async () => {
    const ok = await trigger([
      "title",
      "first_name",
      "last_name",
      "birth_date",
      "email",
      "phone_number",
      "address",
      "city",
      "passport_number",
      "passeport_exp_date",
    ]);
    if (ok) setCurrentStep(2);
  };

  const onSubmit = (data: SubscriberFormData) => {
    const ages = [
      ageFromBirthDate(data.birth_date),
      ...data.groupMembers.map((m) => ageFromBirthDate(m.birth_date)),
    ].filter((v): v is number => v != null);
    const currentOldestAge = ages.length ? Math.max(...ages) : null;
    if (
      Number.isFinite(expectedOldestAge) &&
      currentOldestAge != null &&
      currentOldestAge !== expectedOldestAge
    ) {
      toast.warning(
        `Age le plus eleve : ${currentOldestAge} ans (attendu : ${expectedOldestAge} ans). Verifiez les dates de naissance.`,
      );
    }

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
        ...data.groupMembers.map((m) => ({
          title: m.title,
          first_name: m.first_name,
          last_name: m.last_name,
          email: m.email,
          passport_number: m.passport_number,
          phone_number: m.phone_number,
          birth_date: m.birth_date,
          address: m.address,
          passeport_exp_date: m.passeport_exp_date,
          city: m.city,
        })),
      ],
      consents: [],
      payment: { type: "MANAGED_BY_PARTNER" },
      addons: [],
    };
    console.log(payload);

    subscribe.mutate(payload, {
      onSuccess: async (res) => {
        if (!res.ok || !res.data) {
          toast.error(res.error?.message ?? "Souscription impossible.");
          return;
        }
        const policyId = res.data.policyId;
        setIsCheckingOut(true);
        try {
          const checkoutResult = await processInsuranceCheckout({
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            phone: data.phone_number,
            planCategory: planName,
            destination,
            externalPolicyId: policyId,
            policyType: POLICY_TYPE_TRAVEL,
          });

          if (!checkoutResult.ok) {
            const detail =
              checkoutResult.error?.message ??
              "Une etape technique post-souscription a echoue.";
            toast.warning(`Souscription creee, mais traitement incomplet: ${detail}`);
          }
        } catch (err) {
          console.error("[subscribe] processInsuranceCheckout failed", err);
          toast.warning(
            "Souscription creee, mais une erreur serveur est survenue apres creation.",
          );
        } finally {
          setIsCheckingOut(false);
        }
        toast.success("Souscription effectuee avec succes.");
        router.push(`/quote/${policyId}`);
      },
    });
  };

  if (!hasRequiredParams) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
          <h1 className="text-2xl font-bold text-brand-secondary">Souscription</h1>
          <p className="mt-3 text-sm text-text-main">
            Informations de devis manquantes. Veuillez retourner aux offres et
            selectionner un plan.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
            className="mt-5"
          >
            Retour aux offres
          </Button>
        </div>
      </main>
    );
  }

  const showStepOne = currentStep === 1;
  const showStepTwo = hasGroup && currentStep === 2;
  const stepperLabels = hasGroup
    ? ["Souscripteur", "Membres du groupe"]
    : ["Souscripteur"];
  const stepperIndex = (() => {
    if (hasGroup) {
      if (currentStep === 1) return 0;
      return 1;
    }
    return 0;
  })();

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-12">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.back()}
        className="mb-4 sm:mb-6"
        startIcon={<ArrowLeftIcon className="h-4 w-4" />}
      >
        Retourner
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="rounded-lg border border-border bg-muted/50 p-4 sm:p-5 lg:sticky lg:top-24">
            <h2 className="mb-4 text-base font-bold text-brand-secondary sm:text-lg">
              Recapitulatif du plan choisi
            </h2>
            <div className="space-y-3 text-sm">
              {[
                { label: "Type de plan", value: planName, highlight: true },
                { label: "Prime totale", value: totalPremiumLabel, large: true },
                { label: "Destination", value: destination },
                {
                  label: "Dates de couverture",
                  value: `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`,
                },
                { label: "Nombre de voyageurs", value: adult },
              ].map(({ label, value, highlight, large }) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-3 border-b border-gray-300 pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-semibold text-text-main">{label}</span>
                  <span
                    className={
                      highlight
                        ? "text-right font-bold text-brand-primary"
                        : large
                          ? "text-right text-xl font-bold text-text-main sm:text-2xl"
                          : "text-right text-text-main"
                    }
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="lg:col-span-8">
          <div className="mb-5 sm:mb-6">
            <ProgressBar
              currentStep={stepperIndex}
              totalSteps={stepperLabels.length}
              stepLabels={stepperLabels}
            />
          </div>

          {ageInfoMessage && (
            <div
              className={`mb-4 rounded-lg border p-3 text-sm ${ageBannerClasses}`}
            >
              {ageInfoMessage}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {showStepOne && (
                <PersonFields
                  key="holder"
                  control={control}
                  register={register}
                  errors={errors}
                  namePrefix=""
                  title="Informations du souscripteur"
                />
              )}

              {showStepTwo && (
                <div className="space-y-4">
                  {Array.from({ length: additionalTravelerCount }).map((_, index) => (
                    <PersonFields
                      key={`member-${index}`}
                      control={control}
                      register={register}
                      errors={errors}
                      namePrefix={`groupMembers.${index}.`}
                      title={`Informations du membre ${index + 2}`}
                    />
                  ))}
                </div>
              )}

              {hasGroup && currentStep === 1 ? (
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => void onNextStep()}
                    className="w-full sm:w-auto"
                  >
                    Suivant
                  </Button>
                </div>
              ) : hasGroup && currentStep === 2 ? (
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    startIcon={<ChevronLeftIcon className="h-4 w-4" />}
                    className="w-full sm:w-auto"
                  >
                    Precedent
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    startIcon={
                      !isSubmitting ? <CreditCardIcon className="h-5 w-5" /> : undefined
                    }
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Traitement en cours..." : "Payer maintenant"}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    startIcon={
                      !isSubmitting ? <CreditCardIcon className="h-5 w-5" /> : undefined
                    }
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Traitement en cours..." : "Payer maintenant"}
                  </Button>
                </div>
              )}
          </form>
        </section>
      </div>
    </main>
  );
}
