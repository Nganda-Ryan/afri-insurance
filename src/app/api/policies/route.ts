import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const policies = await prisma.policy.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      externalPolicyId: true,
      policyType: true,
      planCategory: true,
      destination: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    policies: policies.map((policy) => ({
      ...policy,
      createdAt: policy.createdAt.toISOString(),
    })),
  });
}
