"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useTravelPolicy } from "@/hooks/use-travel-quote-session";
import { PolicyHero } from "@/components/Quote/layout/PolicyHero";
import { QuotePageLayout } from "@/components/Quote/layout/QuotePageLayout";
import { QuotePortalAside } from "@/components/Quote/layout/QuotePortalAside";
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

/**
 * Layout partagé : Hero + grille 8/4 (contenu | récapitulatif).
 * Aucun bouton Retour : toute tentative de navigation arrière
 * ramène l'utilisateur à la racine "/" (étape 1, champs vidés).
 */
export default function Page() {
  const router = useRouter();
  const params = useParams<{ policyId: string }>();
  const policyId = params.policyId;

  const { result, isLoading, refetch } = useTravelPolicy(policyId);

  // Intercepte la navigation arrière du navigateur et redirige vers "/".
  useEffect(() => {
    const handlePopState = () => {
      router.replace("/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  if (isLoading) {
    return (
      <>
        <PolicyHero {...POLICY_HERO} />
        <main
          id="policy-detail"
          className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10"
          aria-labelledby="quote-hero-title"
        >
          <QuotePageLayout aside={<QuotePortalAside />}>
            <PolicyLoadingState />
          </QuotePageLayout>
        </main>
      </>
    );
  }

  if (!result?.ok || !result.data) {
    return (
      <>
        <PolicyHero {...POLICY_HERO} />
        <main
          id="policy-detail"
          className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10"
          aria-labelledby="quote-hero-title"
        >
          <QuotePageLayout aside={<QuotePortalAside />}>
            <PolicyErrorState
              message={result?.error?.message ?? "Police introuvable."}
              onRetry={() => void refetch()}
            />
          </QuotePageLayout>
        </main>
      </>
    );
  }

  const policy = result.data;

  return (
    <>
      <PolicyHero {...POLICY_HERO} />
      <main
        id="policy-detail"
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10"
        aria-labelledby="quote-hero-title"
      >
        <QuotePageLayout aside={<QuotePortalAside />}>
          <div className="space-y-4">
            {/* <PolicySuccessBanner policyNumber={policy.policy_number} /> */}
            <PolicyOverviewCard policy={policy} />
            <PolicyBeneficiaryCard beneficiaries={policy.beneficiaries} />
            <PolicyHolderCard policyHolder={policy.policy_holder[0]} />
            {policy.attachments.length > 0 && (
              <PolicyDocumentsCard attachments={policy.attachments} />
            )}
            <PolicyFooter catalog={policy.catalog} createdAt={policy.created_at} />
          </div>
        </QuotePageLayout>
      </main>
    </>
  );
}
