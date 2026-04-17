"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { useTravelPolicy } from "@/hooks/use-travel-quote-session";
import { PolicyBeneficiaryCard } from "@/components/Policy/PolicyBeneficiaryCard";
import { PolicyDocumentsCard } from "@/components/Policy/PolicyDocumentsCard";
import { PolicyErrorState } from "@/components/Policy/PolicyErrorState";
import { PolicyFooter } from "@/components/Policy/PolicyFooter";
import { PolicyHolderCard } from "@/components/Policy/PolicyHolderCard";
import { PolicyLoadingState } from "@/components/Policy/PolicyLoadingState";
import { PolicyOverviewCard } from "@/components/Policy/PolicyOverviewCard";
import { PolicySuccessBanner } from "@/components/Policy/PolicySuccessBanner";

export default function Page() {
    const router = useRouter();
    const params = useParams<{ policyId: string }>();
    const policyId = params.policyId;

    const { result, isLoading, refetch } = useTravelPolicy(policyId);
    console.log("result", result);
    if (isLoading) {
        return <PolicyLoadingState />;
    }

    if (!result?.ok || !result.data) {
        return (
        <PolicyErrorState
            message={result?.error?.message ?? "Police introuvable."}
            onRetry={() => void refetch()}
        />
        );
    }

    const policy = result.data;

  return (
    <main className="mx-auto max-w-[900px] px-4 py-8 lg:py-12">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-surface-muted transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-text-main" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-brand-secondary">
            Police confirmée
          </h1>
          <p className="text-gray-500 mt-1">
            Votre assurance voyage est maintenant active
          </p>
        </div>
      </div>

      <PolicySuccessBanner policyNumber={policy.policy_number} />
      <PolicyOverviewCard policy={policy} />
      <PolicyBeneficiaryCard beneficiaries={policy.beneficiaries} />
      <PolicyHolderCard policyHolder={policy.policy_holder} />
      {policy.attachments.length > 0 && (
        <PolicyDocumentsCard attachments={policy.attachments} />
      )}
      <PolicyFooter catalog={policy.catalog} createdAt={policy.created_at} />
    </main>
  );
}
