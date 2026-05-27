"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeftIcon, ChevronLeftIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { processInsuranceCheckout } from "@/actions/checkout.actions";
import Button from "@/components/ui/button/Button";
import { ProgressBar } from "@/components/Quote/ProgressBar";
import {
  useInitiateCashoutCollection,
  useVerifyTravelPayment,
} from "@/hooks/use-smobilpay";
import {
  useSelectTravelQuoteProduct,
  useSubscribeTravelPolicy,
} from "@/hooks/use-travel-quote-session";
import { POLICY_TYPE_TRAVEL } from "@/lib/constants/constant";
import {
  languageCodeFromQuoteContext,
  subscriptionCountryFromQuoteContext,
} from "@/lib/travel/quote-subscribe-context";
import { ageFromBirthDate, generatePaymentTrid, hasExpectedOldestAge } from "@/lib/utils";
import { SubscribePaymentStep } from "@/components/Policy/SubscribePaymentStep";
import { SubscribePersonFields } from "@/components/Policy/SubscribePersonFields";
import { SubscribePlanSummaryAside } from "@/components/Policy/SubscribePlanSummaryAside";
import { SubscribeRecapStep } from "@/components/Policy/SubscribeRecapStep";
import {
  HOLDER_FIELDS,
  type FlowPhase,
  type PersonFormData,
  type Step,
  type SubscriberFormData,
} from "@/types/subscribe";
import type { SubscribePolicyInputDto, TravelQuoteContext } from "@/types/travel";
import type { S3pCashoutCollectResult } from "@/types/smobilpay";

export default function SubscribePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscribe = useSubscribeTravelPolicy();
  const selectQuoteProduct = useSelectTravelQuoteProduct();
  const {
    mutate: reselectionMutate,
    mutateAsync: reselectionMutateAsync,
    isPending: isReselecting,
    isSuccess: reselectDone,
  } =
    selectQuoteProduct;
  const initiateCashout = useInitiateCashoutCollection();
  const verifyPayment = useVerifyTravelPayment();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [flowPhase, setFlowPhase] = useState<FlowPhase>("form");
  const [recapData, setRecapData] = useState<SubscriberFormData | null>(null);
  const [walletPhone, setWalletPhone] = useState("");
  const [payChannel, setPayChannel] = useState<"" | "om" | "momo">("");
  const [paymentTrid, setPaymentTrid] = useState<string | null>(null);
  const [collectResult, setCollectResult] = useState<S3pCashoutCollectResult | null>(
    null,
  );
  const [paymentInitFeedback, setPaymentInitFeedback] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const isSubmitting =
    subscribe.isPending ||
    isCheckingOut ||
    initiateCashout.isPending ||
    verifyPayment.isPending;

  const planName = searchParams.get("planName") ?? "";
  const planPrice = Number(searchParams.get("planPrice") ?? "0");
  const destination = searchParams.get("destination") ?? "";
  const productIndex = Number.parseInt(searchParams.get("productIndex") ?? "", 10);
  const quoteCode = searchParams.get("quoteCode") ?? "";
  const startDate = searchParams.get("startDate") ?? "";
  const endDate = searchParams.get("endDate") ?? "";
  const adult = searchParams.get("adult") ?? "";
  const expectedOldestAge = Number.parseInt(
    searchParams.get("oldestTravelerAge") ?? "",
    10,
  );
  const travelerCount = Number.parseInt(adult, 10);
  const additionalTravelerCount = Number.isFinite(travelerCount) && travelerCount > 1 ? travelerCount - 1 : 0;
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

  useEffect(() => {
    if (!Number.isInteger(productIndex) || productIndex < 0) return;
    if (quoteCode.trim()) return;
    if (isReselecting || reselectDone) return;
    reselectionMutate(productIndex, {
      onError: () => {},
    });
  }, [
    productIndex,
    quoteCode,
    reselectionMutate,
    isReselecting,
    reselectDone,
  ]);

  const onNextStep = async () => {
    const ok = await trigger(HOLDER_FIELDS);
    if (ok) setCurrentStep(2);
  };

  const hasValidOldestAge = (data: SubscriberFormData) => {
    if (!hasExpectedOldestAge(data, expectedOldestAge)) {
      toast.error(
        `L'age du plus age doit etre ${expectedOldestAge} ans. Veuillez corriger les dates de naissance avant de continuer.`,
      );
      return false;
    }
    return true;
  };

  const onSubmit = (data: SubscriberFormData) => {
    if (!hasValidOldestAge(data)) return;
    setRecapData(data);
    setFlowPhase("recap");
  };

  const completeSubscriptionAfterPayment = (data: SubscriberFormData) => {
    if (!hasValidOldestAge(data)) {
      return;
    }

    const payload: SubscribePolicyInputDto = {
      subscription_country: subscriptionCountryFromQuoteContext(quoteContext),
      language_code: languageCodeFromQuoteContext(quoteContext),
      agent_scope: "",
      quote_code: quoteCode.trim() || undefined,
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
    const runSubscription = async () => {
      if (!quoteCode.trim() && Number.isInteger(productIndex) && productIndex >= 0) {
        const reselectRes = await reselectionMutateAsync(productIndex);
        if (!reselectRes.ok) {
          toast.error(
            reselectRes.error?.message ??
              "Impossible de restaurer le devis sélectionné. Revenez à l'étape devis.",
          );
          return;
        }
      }
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

    void runSubscription();
  };

  const canInitierPaiement =
    walletPhone.replace(/\D/g, "").length >= 8 &&
    (payChannel === "om" || payChannel === "momo");

  const handlePasserAuPaiement = () => {
    setWalletPhone("");
    setPayChannel("");
    setCollectResult(null);
    setPaymentInitFeedback(null);
    setPaymentTrid(generatePaymentTrid());
    setFlowPhase("payment");
  };

  const handleInitierPaiement = () => {
    if (!recapData || !paymentTrid || !canInitierPaiement) {
      return;
    }
    initiateCashout.mutate(
      {
        amount: planPrice,
        channel: payChannel,
        walletDestination: walletPhone,
        customerPhonenumber: recapData.phone_number,
        customerEmailaddress: recapData.email,
        customerName: `${recapData.first_name} ${recapData.last_name}`.trim(),
        customerAddress: `${recapData.address}, ${recapData.city}`,
        trid: paymentTrid,
      },
      {
        onSuccess: (res) => {
          if (!res.ok || !res.data) {
            setPaymentInitFeedback({
              tone: "error",
              message: res.error?.message ?? "Impossible d'initier le paiement.",
            });
            return;
          }
          setCollectResult(res.data);
          setPaymentInitFeedback({
            tone: "success",
            message:
              "Paiement initié. Suivez les instructions sur votre téléphone puis vérifiez le statut.",
          });
        },
      },
    );
  };

  const handleVerifierStatutPaiement = () => {
    const trid = collectResult?.trid ?? paymentTrid;
    if (!trid || !recapData) {
      toast.error("Référence de transaction manquante.");
      return;
    }
    verifyPayment.mutate(
      { trid },
      {
        onSuccess: (res) => {
          if (!res.ok) {
            toast.error(res.error?.message ?? "Vérification impossible.");
            return;
          }
          const st = res.data?.status;
          if (st === "SUCCESS" || st === "DEBITED" || st === "ERRORED") {
            completeSubscriptionAfterPayment(recapData);
            return;
          }
          if (st) {
            toast.message(`Statut du paiement : ${st}`);
          } else {
            toast.message("Aucune transaction trouvée pour le moment.");
          }
        },
      },
    );
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

  const showStepOne = flowPhase === "form" && currentStep === 1;
  const showStepTwo = flowPhase === "form" && hasGroup && currentStep === 2;
  const stepperLabels = hasGroup
    ? ["Souscripteur", "Membres du groupe", "Récapitulatif", "Paiement"]
    : ["Souscripteur", "Récapitulatif", "Paiement"];
  const stepperIndex = (() => {
    if (flowPhase === "recap") return hasGroup ? 2 : 1;
    if (flowPhase === "payment") return hasGroup ? 3 : 2;
    if (hasGroup) {
      if (currentStep === 1) return 0;
      return 1;
    }
    return 0;
  })();

  return (
    // <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-12">
    //   <Button
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:pl-25 lg:pr-8 lg:py-12">
    {/* Return Button: Full width on mobile for better UX */}
    <Button
        type="button"
        variant="outline"
        onClick={() => router.back()}
        className="mb-6 w-full sm:w-auto"
        startIcon={<ArrowLeftIcon className="h-4 w-4" />}
      >
        Retourner
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <SubscribePlanSummaryAside
          planName={planName}
          totalPremiumLabel={totalPremiumLabel}
          destination={destination}
          startDate={startDate}
          endDate={endDate}
          adult={adult}
        />

        <section className="lg:col-span-8">
          <div className="mb-5 sm:mb-6">
            <ProgressBar
              currentStep={stepperIndex}
              totalSteps={stepperLabels.length}
              stepLabels={stepperLabels}
            />
          </div>

          {ageInfoMessage && flowPhase === "form" && (
            <div
              className={`mb-4 rounded-lg border p-3 text-sm ${ageBannerClasses}`}
            >
              {ageInfoMessage}
            </div>
          )}

          {flowPhase === "form" && (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {showStepOne && (
                <SubscribePersonFields
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
                    <SubscribePersonFields
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
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Traitement en cours..." : "Suivant"}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Traitement en cours..." : "Suivant"}
                  </Button>
                </div>
              )}
            </form>
          )}

          {flowPhase === "recap" && recapData && (
            <SubscribeRecapStep
              recapData={recapData}
              planName={planName}
              totalPremiumLabel={totalPremiumLabel}
              destination={destination}
              adult={adult}
              startDate={startDate}
              endDate={endDate}
              isSubmitting={isSubmitting}
              onEdit={() => setFlowPhase("form")}
              onContinueToPayment={handlePasserAuPaiement}
            />
          )}

          {flowPhase === "payment" && recapData && paymentTrid && (
            <SubscribePaymentStep
              paymentTrid={paymentTrid}
              walletPhone={walletPhone}
              payChannel={payChannel}
              canInitierPaiement={canInitierPaiement}
              isSubmitting={isSubmitting}
              initiatePending={initiateCashout.isPending}
              verifyPending={verifyPayment.isPending}
              subscribePending={subscribe.isPending}
              collectResult={collectResult}
              paymentInitFeedback={paymentInitFeedback}
              onWalletPhoneChange={setWalletPhone}
              onPayChannelChange={setPayChannel}
              onBack={() => setFlowPhase("recap")}
              onInitiatePayment={() => void handleInitierPaiement()}
              onVerifyPayment={() => void handleVerifierStatutPaiement()}
            />
          )}
        </section>
      </div>
    </main>
  );
}
