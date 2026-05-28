"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { processInsuranceCheckout } from "@/actions/checkout.actions";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { SubscribePaymentStep } from "@/components/Policy/SubscribePaymentStep";
import { SubscribePersonFields } from "@/components/Policy/SubscribePersonFields";
import { SubscribeRecapStep } from "@/components/Policy/SubscribeRecapStep";
import {
  useInitiateCashoutCollection,
  useVerifyTravelPayment,
} from "@/hooks/use-smobilpay";
import {
  useSelectTravelQuoteProduct,
  useSubscribeTravelPolicy,
} from "@/hooks/use-travel-quote-session";
import { TRAVEL_QUOTE_FLOW_STEP } from "@/lib/constants/quote-flow";
import { POLICY_TYPE_TRAVEL } from "@/lib/constants/constant";
import {
  languageCodeFromQuoteContext,
  subscriptionCountryFromQuoteContext,
} from "@/lib/travel/quote-subscribe-context";
import {
  readQuoteHolderFromStorage,
  writeQuoteHolderToStorage,
} from "@/lib/travel/quote-holder-storage";
import {
  readQuoteRecapFromStorage,
  writeQuoteRecapToStorage,
} from "@/lib/travel/quote-recap-storage";
import type { ParsedSelectedPlan } from "@/lib/travel/quote-wizard-url";
import { ageFromBirthDate, generatePaymentTrid, hasExpectedOldestAge } from "@/lib/utils";
import {
  HOLDER_FIELDS,
  type PersonFormData,
  type Step,
  type SubscriberFormData,
} from "@/types/subscribe";
import type {
  SubscribePolicyInputDto,
  TravelerInfoData,
  TripDetailsData,
} from "@/types/travel";
import type { S3pCashoutCollectResult } from "@/types/smobilpay";

interface TravelQuoteSubscribePhaseProps {
  flowStep: typeof TRAVEL_QUOTE_FLOW_STEP.DETAILS | typeof TRAVEL_QUOTE_FLOW_STEP.RECAP | typeof TRAVEL_QUOTE_FLOW_STEP.PAYMENT;
  tripDetails: TripDetailsData;
  travelerInfo: TravelerInfoData;
  selection: ParsedSelectedPlan;
  onBack: () => void;
  onGoToRecap: () => void;
  onGoToPayment: () => void;
}

export function TravelQuoteSubscribePhase({
  flowStep,
  tripDetails,
  travelerInfo,
  selection,
  onBack,
  onGoToRecap,
  onGoToPayment,
}: TravelQuoteSubscribePhaseProps) {
  const router = useRouter();
  const subscribe = useSubscribeTravelPolicy();
  const selectQuoteProduct = useSelectTravelQuoteProduct();
  const {
    mutate: reselectionMutate,
    mutateAsync: reselectionMutateAsync,
    isPending: isReselecting,
    isSuccess: reselectDone,
  } = selectQuoteProduct;
  const initiateCashout = useInitiateCashoutCollection();
  const verifyPayment = useVerifyTravelPayment();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
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
  const [detailsSubStep, setDetailsSubStep] = useState<Step>(1);

  const { plan, quoteCode, quoteContext } = selection;
  const expectedOldestAge = travelerInfo.oldest_traveler_age;
  const additionalTravelerCount =
    tripDetails.adult > 1 ? tripDetails.adult - 1 : 0;
  const hasGroup = additionalTravelerCount > 0;

  const destination = tripDetails.destination_area;

  const isSubmitting =
    subscribe.isPending ||
    isCheckingOut ||
    initiateCashout.isPending ||
    verifyPayment.isPending;

  const emptyMember = (): PersonFormData => ({
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
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<SubscriberFormData>({
    mode: "onSubmit",
    defaultValues: {
      ...emptyMember(),
      groupMembers: Array.from({ length: additionalTravelerCount }, emptyMember),
    },
  });

  useEffect(() => {
    const stored = readQuoteHolderFromStorage();
    if (stored) {
      reset({
        ...stored,
        groupMembers: Array.from({ length: additionalTravelerCount }, emptyMember),
      });
    }
  }, [additionalTravelerCount, reset]);

  useEffect(() => {
    if (
      flowStep === TRAVEL_QUOTE_FLOW_STEP.RECAP ||
      flowStep === TRAVEL_QUOTE_FLOW_STEP.PAYMENT
    ) {
      setRecapData(readQuoteRecapFromStorage());
    }
  }, [flowStep]);

  useEffect(() => {
    if (flowStep !== TRAVEL_QUOTE_FLOW_STEP.PAYMENT) return;
    if (!paymentTrid) setPaymentTrid(generatePaymentTrid());
  }, [flowStep, paymentTrid]);

  useEffect(() => {
    const idx = selection.plan.product_index;
    if (!Number.isInteger(idx) || idx < 0) return;
    if (quoteCode.trim()) return;
    if (isReselecting || reselectDone) return;
    reselectionMutate(idx, { onError: () => {} });
  }, [
    selection.plan.product_index,
    quoteCode,
    reselectionMutate,
    isReselecting,
    reselectDone,
  ]);

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

  const onNextDetailsSubStep = async () => {
    const ok = await trigger(HOLDER_FIELDS);
    if (ok) setDetailsSubStep(2);
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

  const onDetailsSubmit = (data: SubscriberFormData) => {
    if (!hasValidOldestAge(data)) return;
    writeQuoteHolderToStorage({
      title: data.title,
      first_name: data.first_name,
      last_name: data.last_name,
      birth_date: data.birth_date,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      city: data.city,
      passport_number: data.passport_number,
      passeport_exp_date: data.passeport_exp_date,
    });
    writeQuoteRecapToStorage(data);
    setRecapData(data);
    onGoToRecap();
  };

  const completeSubscriptionAfterPayment = (data: SubscriberFormData) => {
    if (!hasValidOldestAge(data)) return;

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
      const productIndex = selection.plan.product_index;
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
              planCategory: plan.name,
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

  const handleInitierPaiement = () => {
    if (!recapData || !paymentTrid || !canInitierPaiement) return;
    initiateCashout.mutate(
      {
        amount: plan.price,
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

  if (flowStep === TRAVEL_QUOTE_FLOW_STEP.DETAILS) {
    const showHolder = detailsSubStep === 1;
    const showGroup = hasGroup && detailsSubStep === 2;

    const detailsFormId = "travel-quote-details-form";

    const handleDetailsPrevious = () => {
      if (hasGroup && detailsSubStep === 2) {
        setDetailsSubStep(1);
        return;
      }
      onBack();
    };

    return (
      <div className="space-y-4">
        {ageInfoMessage && (
          <div className={`rounded-lg border p-3 text-sm ${ageBannerClasses}`}>
            {ageInfoMessage}
          </div>
        )}

        <form
          id={detailsFormId}
          onSubmit={handleSubmit(onDetailsSubmit)}
          noValidate
          className="space-y-4"
        >
          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <h2 className="mb-6 text-2xl font-bold">Vos détails</h2>

            {showHolder && (
              <SubscribePersonFields
                control={control}
                register={register}
                getValues={getValues}
                errors={errors}
                namePrefix=""
                title="Informations du souscripteur"
              />
            )}

            {showGroup && (
              <div className="space-y-4">
                {Array.from({ length: additionalTravelerCount }).map((_, index) => (
                  <SubscribePersonFields
                    key={`member-${index}`}
                    control={control}
                    register={register}
                    getValues={getValues}
                    errors={errors}
                    namePrefix={`groupMembers.${index}.`}
                    title={`Informations du membre ${index + 2}`}
                  />
                ))}
              </div>
            )}
          </div>

          {hasGroup && detailsSubStep === 1 ? (
            <QuoteStepNavigation
              onPrevious={handleDetailsPrevious}
              onNext={() => void onNextDetailsSubStep()}
            />
          ) : (
            <QuoteStepNavigation
              onPrevious={handleDetailsPrevious}
              nextType="submit"
              nextFormId={detailsFormId}
              isSubmitting={isSubmitting}
            />
          )}
        </form>
      </div>
    );
  }

  if (flowStep === TRAVEL_QUOTE_FLOW_STEP.RECAP && recapData) {
    return (
      <SubscribeRecapStep
        recapData={recapData}
        isSubmitting={isSubmitting}
        onBack={onBack}
        onContinue={onGoToPayment}
      />
    );
  }

  if (flowStep === TRAVEL_QUOTE_FLOW_STEP.PAYMENT && recapData && paymentTrid) {
    return (
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
        onBack={onBack}
        onInitiatePayment={() => void handleInitierPaiement()}
        onVerifyPayment={() => void handleVerifierStatutPaiement()}
      />
    );
  }

  return null;
}
