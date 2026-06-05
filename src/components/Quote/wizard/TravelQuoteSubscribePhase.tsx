"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { getPaymentInitiatedMessage, getS3pErrorMessage } from "@/lib/errorCode";
import {
  isValidCameroonPhone,
  normalizeCameroonPhone,
  validateCameroonPhoneInput,
} from "@/lib/smobilpay/phone";
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
import {
  ageFromBirthDate,
  generatePaymentTrid,
  hasOldestAgeInRange,
  stripDiacritics,
} from "@/lib/utils";
import { usePlanStore } from "@/store/planStore";
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

function getSubscriberPhonesError(data: SubscriberFormData): string | null {
  const holder = validateCameroonPhoneInput(data.phone_number);
  if (holder !== true) {
    return "Le téléphone du souscripteur est invalide. Corrigez-le à l'étape « Vos détails ».";
  }
  for (let i = 0; i < data.groupMembers.length; i++) {
    const memberErr = validateCameroonPhoneInput(data.groupMembers[i].phone_number);
    if (memberErr !== true) {
      return `Le téléphone du membre ${i + 2} est invalide. Corrigez-le à l'étape « Vos détails ».`;
    }
  }
  return null;
}

function normalizeSubscriberPhones(data: SubscriberFormData): SubscriberFormData {
  return {
    ...data,
    phone_number: normalizeCameroonPhone(data.phone_number),
    groupMembers: data.groupMembers.map((member) => ({
      ...member,
      phone_number: normalizeCameroonPhone(member.phone_number),
    })),
  };
}

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
  const [collectResult, setCollectResult] = useState<S3pCashoutCollectResult | null>(
    null,
  );
  const [paymentInitFeedback, setPaymentInitFeedback] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);
  const [detailsSubStep, setDetailsSubStep] = useState<Step>(1);
  const [initiateCooldownSec, setInitiateCooldownSec] = useState(0);
  const [paymentTrid, setPaymentTrid] = useState(generatePaymentTrid);
  const [hasInitiatedPayment, setHasInitiatedPayment] = useState(false);

  const INITIATE_PAYMENT_COOLDOWN_SEC = 30;

  useEffect(() => {
    if (initiateCooldownSec <= 0) return;
    const timer = window.setTimeout(() => {
      setInitiateCooldownSec((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [initiateCooldownSec]);

  const { plan, quoteCode, quoteContext } = selection;
  const expectedOldestAge = travelerInfo.oldest_traveler_age;
  const additionalTravelerCount =
    tripDetails.adult > 1 ? tripDetails.adult - 1 : 0;
  const hasGroup = additionalTravelerCount > 0;

  // Retrouve la tranche d'âge couverte (min_age / max_age) qui correspond
  // à l'âge déclaré lors de l'étape devis, pour la catégorie et destination choisies.
  const matchedRange = usePlanStore((s) => {
    const destination = s.plans
      .find((c) => c.name === tripDetails.product_category)
      ?.destinations.find((d) => d.destination === tripDetails.destination_area);
    if (!destination) return null;
    return (
      destination.age_ranges.find(
        (r) => expectedOldestAge >= r.min_age && expectedOldestAge < r.max_age,
      ) ??
      destination.age_ranges.find((r) => expectedOldestAge === r.max_age) ??
      null
    );
  });

  const destination = tripDetails.destination_area;

  const isSubmitting =
    subscribe.isPending ||
    isCheckingOut ||
    initiateCashout.isPending ||
    verifyPayment.isPending;

  const emptyMember = useCallback(
    (): PersonFormData => ({
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
      destination_country: tripDetails.destination_country,
      residence_country: "",
      nationality: "",
    }),
    [tripDetails.destination_country],
  );

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
        ...emptyMember(),
        ...stored,
        groupMembers: Array.from({ length: additionalTravelerCount }, emptyMember),
      });
    }
  }, [additionalTravelerCount, emptyMember, reset]);

  useEffect(() => {
    if (
      flowStep === TRAVEL_QUOTE_FLOW_STEP.RECAP ||
      flowStep === TRAVEL_QUOTE_FLOW_STEP.PAYMENT
    ) {
      setRecapData(readQuoteRecapFromStorage());
    }
  }, [flowStep]);

  useEffect(() => {
    if (flowStep !== TRAVEL_QUOTE_FLOW_STEP.PAYMENT || !recapData) return;
    const phoneError = getSubscriberPhonesError(recapData);
    if (!phoneError) return;
    toast.error(phoneError);
    onBack();
  }, [flowStep, recapData, onBack]);

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
    if (!matchedRange) return "neutral";
    if (detectedOldestAge == null) return "neutral";
    return detectedOldestAge >= matchedRange.min_age && detectedOldestAge <= matchedRange.max_age
      ? "match"
      : "mismatch";
  }, [detectedOldestAge, matchedRange]);

  const ageInfoMessage = useMemo(() => {
    if (!matchedRange) return null;
    const { min_age, max_age } = matchedRange;
    if (detectedOldestAge == null) {
      return `Tranche d'âge attendue : ${min_age} – ${max_age} ans.`;
    }
    if (detectedOldestAge >= min_age && detectedOldestAge <= max_age) {
      return `Vérification OK : le plus âgé a ${detectedOldestAge} ans (tranche couverte : ${min_age} – ${max_age} ans).`;
    }
    return `Attention : le plus âgé a ${detectedOldestAge} ans, mais la tranche couverte est ${min_age} – ${max_age} ans.`;
  }, [detectedOldestAge, matchedRange]);

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
    if (!matchedRange) return true; // Pas de tranche connue : on laisse passer
    if (!hasOldestAgeInRange(data, matchedRange.min_age, matchedRange.max_age)) {
      toast.error(
        `L'âge du plus âgé doit être compris entre ${matchedRange.min_age} et ${matchedRange.max_age} ans. Veuillez corriger les dates de naissance avant de continuer.`,
      );
      return false;
    }
    return true;
  };

  const onDetailsSubmit = (data: SubscriberFormData) => {
    if (!hasValidOldestAge(data)) return;
    const normalized = normalizeSubscriberPhones(data);
    writeQuoteHolderToStorage({
      title: normalized.title,
      first_name: normalized.first_name,
      last_name: normalized.last_name,
      birth_date: normalized.birth_date,
      email: normalized.email,
      phone_number: normalized.phone_number,
      address: normalized.address,
      city: normalized.city,
      passport_number: normalized.passport_number,
      passeport_exp_date: normalized.passeport_exp_date,
      destination_country: normalized.destination_country,
      residence_country: normalized.residence_country,
      nationality: normalized.nationality,
    });
    writeQuoteRecapToStorage(normalized);
    setRecapData(normalized);
    onGoToRecap();
  };

  const handleContinueToPayment = () => {
    if (!recapData) return;
    const phoneError = getSubscriberPhonesError(recapData);
    if (phoneError) {
      toast.error(phoneError);
      return;
    }
    onGoToPayment();
  };

  const completeSubscriptionAfterPayment = (data: SubscriberFormData) => {
    if (!hasValidOldestAge(data)) return;
    const sanitizeCountry = (value: string) => stripDiacritics(value);

    const payload: SubscribePolicyInputDto = {
      subscription_country: sanitizeCountry(
        subscriptionCountryFromQuoteContext(quoteContext),
      ),
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
          destination_country: sanitizeCountry(data.destination_country),
          residence_country: sanitizeCountry(data.residence_country),
          nationality: sanitizeCountry(data.nationality),
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
          destination_country: sanitizeCountry(m.destination_country),
          residence_country: sanitizeCountry(m.residence_country),
          nationality: sanitizeCountry(m.nationality),
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
    isValidCameroonPhone(normalizeCameroonPhone(walletPhone)) &&
    (payChannel === "om" || payChannel === "momo");

  const handleInitierPaiement = () => {
    if (!recapData || !canInitierPaiement) return;
    if (payChannel !== "om" && payChannel !== "momo") return;
    if (initiateCooldownSec > 0 || initiateCashout.isPending) return;

    setCollectResult(null);
    setPaymentInitFeedback(null);

    const tridToSend = hasInitiatedPayment
      ? generatePaymentTrid()
      : paymentTrid;
    if (hasInitiatedPayment) {
      setPaymentTrid(tridToSend);
    }
    setHasInitiatedPayment(true);

    initiateCashout.mutate(
      {
        amount: plan.price,
        channel: payChannel,
        paymentPhone: normalizeCameroonPhone(walletPhone),
        subscriberPhone: normalizeCameroonPhone(recapData.phone_number),
        customerEmailaddress: recapData.email,
        customerName: `${recapData.first_name} ${recapData.last_name}`.trim(),
        customerAddress: `${recapData.address}, ${recapData.city}`,
        trid: tridToSend,
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
            message: getPaymentInitiatedMessage(payChannel),
          });
          setInitiateCooldownSec(INITIATE_PAYMENT_COOLDOWN_SEC);
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
            toast.error(
              getS3pErrorMessage(
                res.error?.code,
                res.error?.message ?? "Vérification impossible.",
              ),
            );
            return;
          }
          if (!res.data) {
            toast.message("Aucune transaction trouvée pour le moment.");
            return;
          }
          const { status, errorCode } = res.data;
          if (errorCode != null && errorCode !== 0) {
            toast.error(getS3pErrorMessage(errorCode));
            return;
          }
          if (status === "SUCCESS" || status === "DEBITED") {
            completeSubscriptionAfterPayment(recapData);
            return;
          }
          if (
            status === "ERRORED" ||
            status === "REVERSED" ||
            status === "ERROREDREFUNDED"
          ) {
            toast.error(
              getS3pErrorMessage(
                errorCode,
                `Paiement : statut « ${status} ».`,
              ),
            );
            return;
          }
          toast.message(
            "Paiement en cours de traitement. Réessayez dans quelques instants.",
          );
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
        onContinue={handleContinueToPayment}
      />
    );
  }

  if (flowStep === TRAVEL_QUOTE_FLOW_STEP.PAYMENT && recapData) {
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
        initiateCooldownSec={initiateCooldownSec}
        onWalletPhoneChange={(value) => {
          const normalized = normalizeCameroonPhone(value);
          setWalletPhone((prev) => {
            if (prev !== normalized) {
              setCollectResult(null);
              setPaymentInitFeedback(null);
            }
            return normalized;
          });
        }}
        onPayChannelChange={setPayChannel}
        onBack={onBack}
        onInitiatePayment={() => void handleInitierPaiement()}
        onVerifyPayment={() => void handleVerifierStatutPaiement()}
      />
    );
  }

  return null;
}
