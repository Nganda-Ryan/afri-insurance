import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "./_components/SignOutButton";
import CardInfo from "@/components/common/CardInfo";
import Badge from "@/components/ui/badge/Badge";
import { PoliciesTableWithFilters } from "./_components/PoliciesTableWithFilters";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      policies: { orderBy: { createdAt: "desc" } },
    },
  });

  const displayName =
    user?.firstName ??
    session.user.name ??
    session.user.email?.split("@")[0] ??
    "utilisateur";

  const policies = user?.policies ?? [];
  console.log("policies", policies);

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Bonjour,&nbsp;
            <span className="text-orange-500">
              {displayName}
            </span>
          </h1>
          <p className="mt-1 text-sm dark:text-slate-100">
            Bienvenue dans votre espace client Afri Insurance.
          </p>
        </div>
      </div>


      <PoliciesTableWithFilters
        policies={policies.map((policy) => ({
          id: policy.id,
          externalPolicyId: policy.externalPolicyId,
          policyType: policy.policyType,
          planCategory: policy.planCategory,
          destination: policy.destination,
          createdAt: policy.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
