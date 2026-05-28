"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { useTravelPolicy } from "@/hooks/use-travel-quote-session";
import { QuoteHero } from "@/components/Quote/layout/QuoteHero";
import { PolicyBeneficiaryCard } from "@/components/Policy/PolicyBeneficiaryCard";
import { PolicyDocumentsCard } from "@/components/Policy/PolicyDocumentsCard";
import { PolicyErrorState } from "@/components/Policy/PolicyErrorState";
import { PolicyFooter } from "@/components/Policy/PolicyFooter";
import { PolicyHolderCard } from "@/components/Policy/PolicyHolderCard";
import { PolicyLoadingState } from "@/components/Policy/PolicyLoadingState";
import { PolicyOverviewCard } from "@/components/Policy/PolicyOverviewCard";
import { PolicySuccessBanner } from "@/components/Policy/PolicySuccessBanner";

const POLICY_HERO = {
  badge: "Souscription confirmée",
  title: "Police confirmée",
  description: "Votre assurance voyage est maintenant active.",
} as const;

export default function Page() {
  const router = useRouter();
  const params = useParams<{ policyId: string }>();
  const policyId = params.policyId;

  const { result, isLoading, refetch } = useTravelPolicy(policyId);

  if (isLoading) {
    return (
      <>
        <QuoteHero {...POLICY_HERO} />
        <main className="mx-auto max-w-[900px] px-4 py-8 lg:py-12">
          <PolicyLoadingState />
        </main>
      </>
    );
  }

  if (!result?.ok || !result.data) {
    return (
      <>
        <QuoteHero {...POLICY_HERO} />
        <main className="mx-auto max-w-[900px] px-4 py-8 lg:py-12">
          <PolicyErrorState
            message={result?.error?.message ?? "Police introuvable."}
            onRetry={() => void refetch()}
          />
        </main>
      </>
    );
  }

  const policy = result.data;

  return (
    <>
      {/* <QuoteHero {...POLICY_HERO} /> */}
      <main className="mx-auto max-w-[900px] px-4 py-8 lg:py-12">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 rounded-lg p-2 text-text-main transition-colors hover:bg-gray-100"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Retour</span>
        </button>

        <PolicySuccessBanner policyNumber={policy.policy_number} />
        <PolicyOverviewCard policy={policy} />
        <PolicyBeneficiaryCard beneficiaries={policy.beneficiaries} />
        <PolicyHolderCard policyHolder={policy.policy_holder[0]} />
        {policy.attachments.length > 0 && (
          <PolicyDocumentsCard attachments={policy.attachments} />
        )}
        <PolicyFooter catalog={policy.catalog} createdAt={policy.created_at} />
      </main>
    </>
  );
}
