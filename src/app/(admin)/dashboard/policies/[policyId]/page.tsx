"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { PolicyBeneficiaryCard } from "@/components/Policy/PolicyBeneficiaryCard";
import { PolicyDocumentsCard } from "@/components/Policy/PolicyDocumentsCard";
import { PolicyErrorState } from "@/components/Policy/PolicyErrorState";
import { PolicyFooter } from "@/components/Policy/PolicyFooter";
import { PolicyHolderCard } from "@/components/Policy/PolicyHolderCard";
import { PolicyLoadingState } from "@/components/Policy/PolicyLoadingState";
import { PolicyOverviewCard } from "@/components/Policy/PolicyOverviewCard";
import { PolicySuccessBanner } from "@/components/Policy/PolicySuccessBanner";
import { useTravelPolicy } from "@/hooks/use-travel-quote-session";

export default function AdminPolicyDetailPage() {
  const router = useRouter();
  const params = useParams<{ policyId: string }>();
  const policyId = params.policyId;
  const { result, isLoading, refetch } = useTravelPolicy(policyId);

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
    <main>
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="rounded-lg p-2 transition-colors hover:bg-surface-muted"
        >
          <ArrowLeftIcon className="h-5 w-5 text-text-main" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold lg:text-3xl">
            Détail du contrat
          </h1>
          <p className="mt-1 text-gray-500">
            Consultation de la police depuis le dashboard
          </p>
        </div>
      </div>

      {/* <PolicySuccessBanner policyNumber={policy.policy_number} /> */}
      <PolicyOverviewCard policy={policy} />
      <PolicyBeneficiaryCard beneficiaries={policy.beneficiaries} />
      <PolicyHolderCard policyHolder={policy.policy_holder[0]} />
      {policy.attachments.length > 0 && (
        <PolicyDocumentsCard attachments={policy.attachments} />
      )}
      <PolicyFooter catalog={policy.catalog} createdAt={policy.created_at} />
    </main>
  );
}
