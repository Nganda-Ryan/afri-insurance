"use client";

import { ArrowLeftIcon, ChevronLeftIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import DatePicker from "@/components/form/date-picker";
import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { ProgressBar } from "@/components/Quote/ProgressBar";
import { PolicyErrorState } from "@/components/Policy/PolicyErrorState";
import { PolicyLoadingState } from "@/components/Policy/PolicyLoadingState";
import { useTravelPolicy, useUpdateTravelPolicy } from "@/hooks/use-travel-quote-session";

type Step = 1 | 2 | 3;
type TitleValue = "M" | "Mme";

type UpdatePayload = {
  start_date: string;
  end_date: string;
  policy_holder: {
    id: number;
    title: TitleValue;
    first_name: string;
    last_name: string;
    email: string;
  };
  beneficiaries: Array<{
    id: number;
    title: TitleValue;
    first_name: string;
    last_name: string;
    birth_date: string;
    email: string;
  }>;
};

type FormValues = UpdatePayload;

function toDateInputValue(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.slice(0, 10);
}

function toTitleValue(value: unknown): TitleValue {
  if (typeof value !== "string") return "M";
  const v = value.toLowerCase();
  if (v.includes("mme") || v.includes("mrs") || v.includes("femme")) return "Mme";
  return "M";
}

export default function UpdatePolicyPage() {
  const router = useRouter();
  const params = useParams<{ policyId: string }>();
  const policyId = params.policyId;

  const { result, isLoading, refetch } = useTravelPolicy(policyId);
  const updatePolicy = useUpdateTravelPolicy();

  const policy = result?.ok ? result.data : null;
  console.log("policy", policy);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const holderEmail = policy?.policy_holder?.[0]?.policy_holder_email?.trim().toLowerCase();
  const uiBeneficiaries = useMemo(() => {
    const rawBeneficiaries = policy?.beneficiaries ?? [];
    if (!holderEmail) return rawBeneficiaries;
    return rawBeneficiaries.filter((b) => (b.email ?? "").trim().toLowerCase() !== holderEmail);
  }, [policy?.beneficiaries, holderEmail]);

  const defaultValues = useMemo<FormValues>(() => {
    if (!policy) {
      return {
        start_date: "",
        end_date: "",
        policy_holder: { id: 0, title: "M", first_name: "", last_name: "", email: "" },
        beneficiaries: [],
      };
    }

    const holder = policy.policy_holder?.[0];
    return {
      start_date: toDateInputValue(policy.start_date),
      end_date: toDateInputValue(policy.end_date),
      policy_holder: {
        id: holder?.policy_holder_id ?? 0,
        title: toTitleValue(holder?.policy_holder_title ?? "M"),
        first_name: holder?.policy_holder_first_name ?? "",
        last_name: holder?.policy_holder_last_name ?? "",
        email: holder?.policy_holder_email ?? "",
      },
      beneficiaries: uiBeneficiaries.map((b) => ({
        id: b.id,
        title: toTitleValue(b.title),
        first_name: b.first_name ?? "",
        last_name: b.last_name ?? "",
        birth_date: toDateInputValue(b.birth_date ?? ""),
        email: b.email ?? "",
      })),
    };
  }, [policy, uiBeneficiaries]);

  const {
    control,
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues,
  });

  useEffect(() => {
    if (!policy) return;
    reset(defaultValues);
  }, [policy, defaultValues, reset]);

  const beneficiaries = uiBeneficiaries;
  const hasBeneficiaries = beneficiaries.length > 0;
  const totalSteps = hasBeneficiaries ? 3 : 2;
  const stepLabels = useMemo(
    () => (hasBeneficiaries ? ["Souscripteur", "Bénéficiaire(s)", "Durée"] : ["Souscripteur", "Durée"]),
    [hasBeneficiaries]
  );

  const goToStep2 = async () => {
    const ok = await trigger([
      "policy_holder.title",
      "policy_holder.first_name",
      "policy_holder.last_name",
      "policy_holder.email",
    ]);
    if (!ok) return;
    setCurrentStep(2);
  };

  const goToStep3 = async () => {
    const beneficiaryFields = beneficiaries.flatMap((_, index) => [
      `beneficiaries.${index}.title`,
      `beneficiaries.${index}.first_name`,
      `beneficiaries.${index}.last_name`,
      `beneficiaries.${index}.email`,
      `beneficiaries.${index}.birth_date`,
    ]);
    const ok = await trigger(beneficiaryFields as Array<keyof FormValues>);
    if (!ok) return;
    setCurrentStep(3);
  };

  const onSubmit = async (data: FormValues) => {
    if (!policyId) {
      toast.error("Identifiant de police manquant.");
      return;
    }

    const payload: UpdatePayload = {
      start_date: data.start_date,
      end_date: data.end_date,
      policy_holder: {
        id: data.policy_holder.id,
        title: data.policy_holder.title,
        first_name: data.policy_holder.first_name,
        last_name: data.policy_holder.last_name,
        email: data.policy_holder.email,
      },
      beneficiaries: data.beneficiaries.map((b) => ({
        id: b.id,
        title: b.title,
        first_name: b.first_name,
        last_name: b.last_name,
        birth_date: b.birth_date,
        email: b.email,
      })),
    };

    const res = await updatePolicy.mutateAsync({ policyId, payload });

    if (!res.ok) {
      toast.error(res.error?.message ?? "Mise à jour impossible.");
      return;
    }

    toast.success("Police mise à jour.");
    router.push(`/dashboard/policies/${policyId}`);
  };

  if (isLoading) return <PolicyLoadingState />;

  if (!result?.ok || !result.data || !policy) {
    return (
      <PolicyErrorState
        message={result?.error?.message ?? "Police introuvable."}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <main>
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg p-2 transition-colors hover:bg-surface-muted"
          aria-label="Retour dashboard"
        >
          <ArrowLeftIcon className="h-5 w-5 text-text-main" />
        </button>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-brand-secondary lg:text-3xl">
            Mettre à jour le contrat
          </h1>
          <p className="mt-1 text-gray-500">Mise à jour du souscripteur, des bénéficiaires et de la durée.</p>
        </div>
      </div>

      <div className="mb-5 rounded-lg border border-border bg-white p-4 dark:bg-slate-900">
        <ProgressBar currentStep={currentStep - 1} totalSteps={totalSteps} stepLabels={stepLabels} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* ids needed in payload */}
        <input type="hidden" {...register("policy_holder.id", { valueAsNumber: true })} />

        {currentStep === 1 && (
          <section className="rounded-lg border border-border bg-white p-5 dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Souscripteur</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="policy_holder.title" className="text-sm font-medium text-foreground">
                  Civilité
                </Label>
                <Controller
                  control={control}
                  name="policy_holder.title"
                  rules={{ required: "Civilité requise" }}
                  render={({ field }) => (
                    <Select
                      id="policy_holder.title"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      options={[
                        { value: "M", label: "M" },
                        { value: "Mme", label: "Mme" },
                      ]}
                      error={!!errors.policy_holder?.title}
                      className="border bg-white py-3 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  )}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="policy_holder.first_name" className="text-sm font-medium text-foreground">
                  Prénom
                </Label>
                <InputField
                  id="policy_holder.first_name"
                  type="text"
                  {...register("policy_holder.first_name", { required: "Prénom requis" })}
                  error={!!errors.policy_holder?.first_name}
                  className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="policy_holder.last_name" className="text-sm font-medium text-foreground">
                  Nom
                </Label>
                <InputField
                  id="policy_holder.last_name"
                  type="text"
                  {...register("policy_holder.last_name", { required: "Nom requis" })}
                  error={!!errors.policy_holder?.last_name}
                  className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="policy_holder.email" className="text-sm font-medium text-foreground">
                  E-mail
                </Label>
                <InputField
                  id="policy_holder.email"
                  type="email"
                  {...register("policy_holder.email", { required: "E-mail requis" })}
                  error={!!errors.policy_holder?.email}
                  className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button type="button" variant="primary" onClick={() => void goToStep2()} className="w-full sm:w-auto">
                Suivant
              </Button>
            </div>
          </section>
        )}

        {hasBeneficiaries && currentStep === 2 && (
          <section className="rounded-lg border border-border bg-white p-5 dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Bénéficiaires</h2>

            <div className="space-y-4">
              {beneficiaries.map((b, index) => (
                <div key={b.id} className="rounded-lg border border-border bg-card p-4 sm:p-5">
                  <h3 className="mb-3 text-base font-semibold text-brand-secondary">
                    Bénéficiaire {index + 1}
                  </h3>

                  {/* ids needed in payload */}
                  <input
                    type="hidden"
                    {...register(`beneficiaries.${index}.id` as const, { valueAsNumber: true })}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label
                        htmlFor={`beneficiaries.${index}.title`}
                        className="text-sm font-medium text-foreground"
                      >
                        Civilité
                      </Label>
                      <Controller
                        control={control}
                        name={`beneficiaries.${index}.title` as const}
                        rules={{ required: "Civilité requise" }}
                        render={({ field }) => (
                          <Select
                            id={`beneficiaries.${index}.title`}
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            options={[
                              { value: "M", label: "M" },
                              { value: "Mme", label: "Mme" },
                            ]}
                            error={!!errors.beneficiaries?.[index]?.title}
                            className="border bg-white py-3 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor={`beneficiaries.${index}.first_name`}
                        className="text-sm font-medium text-foreground"
                      >
                        Prénom
                      </Label>
                      <InputField
                        id={`beneficiaries.${index}.first_name`}
                        type="text"
                        {...register(`beneficiaries.${index}.first_name` as const, {
                          required: "Prénom requis",
                        })}
                        error={!!errors.beneficiaries?.[index]?.first_name}
                        className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor={`beneficiaries.${index}.last_name`}
                        className="text-sm font-medium text-foreground"
                      >
                        Nom
                      </Label>
                      <InputField
                        id={`beneficiaries.${index}.last_name`}
                        type="text"
                        {...register(`beneficiaries.${index}.last_name` as const, {
                          required: "Nom requis",
                        })}
                        error={!!errors.beneficiaries?.[index]?.last_name}
                        className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor={`beneficiaries.${index}.email`}
                        className="text-sm font-medium text-foreground"
                      >
                        E-mail
                      </Label>
                      <InputField
                        id={`beneficiaries.${index}.email`}
                        type="email"
                        {...register(`beneficiaries.${index}.email` as const, {
                          required: "E-mail requis",
                        })}
                        error={!!errors.beneficiaries?.[index]?.email}
                        className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                      />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <Label
                        htmlFor={`beneficiaries.${index}.birth_date`}
                        className="text-sm font-medium text-foreground"
                      >
                        Date de naissance
                      </Label>
                      <Controller
                        control={control}
                        name={`beneficiaries.${index}.birth_date` as const}
                        rules={{ required: "Date de naissance requise" }}
                        render={({ field }) => (
                          <DatePicker
                            id={`beneficiaries.${index}.birth_date`}
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!errors.beneficiaries?.[index]?.birth_date}
                            className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                startIcon={<ChevronLeftIcon className="h-4 w-4" />}
                className="w-full sm:w-auto"
              >
                Précédent
              </Button>

              <Button
                type="button"
                variant="primary"
                onClick={() => void goToStep3()}
                className="w-full sm:w-auto"
              >
                Suivant
              </Button>
            </div>
          </section>
        )}

        {((!hasBeneficiaries && currentStep === 2) || (hasBeneficiaries && currentStep === 3)) && (
          <section className="rounded-lg border border-border bg-white p-5 dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Durée du contrat</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="start_date" className="text-sm font-medium text-foreground">
                  Date de début
                </Label>
                <Controller
                  control={control}
                  name="start_date"
                  rules={{ required: "Date de début requise" }}
                  render={({ field }) => (
                    <DatePicker
                      id="start_date"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={!!errors.start_date}
                      className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  )}
                />
                {errors.start_date && (
                  <p className="text-sm text-red-500">{String(errors.start_date.message ?? "Date requise")}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="end_date" className="text-sm font-medium text-foreground">
                  Date de fin
                </Label>
                <Controller
                  control={control}
                  name="end_date"
                  rules={{ required: "Date de fin requise" }}
                  render={({ field }) => (
                    <DatePicker
                      id="end_date"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={!!errors.end_date}
                      className="border bg-white dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  )}
                />
                {errors.end_date && <p className="text-sm text-red-500">{String(errors.end_date.message ?? "Date requise")}</p>}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(hasBeneficiaries ? 2 : 1)}
                startIcon={<ChevronLeftIcon className="h-4 w-4" />}
                className="w-full sm:w-auto"
              >
                Précédent
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={updatePolicy.isPending}
                className="w-full sm:w-auto"
              >
                {updatePolicy.isPending ? "Mise à jour..." : "Enregistrer les changements"}
              </Button>
            </div>
          </section>
        )}
      </form>
    </main>
  );
}

