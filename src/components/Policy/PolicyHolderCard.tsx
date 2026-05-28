import { UserIcon } from "lucide-react";
import React from "react";

import type { IPolicyHolder } from "@/types/travel";
import { InfoRow } from "./InfoRow";

interface PolicyHolderCardProps {
  policyHolder: IPolicyHolder;
}

export function PolicyHolderCard({ policyHolder }: PolicyHolderCardProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-brand-primary px-6 py-4 dark:border-gray-700">
        <UserIcon className="w-5 h-5 text-white" />
        <h2 className="text-lg font-bold text-white">
          Souscripteur
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <InfoRow
            label="Nom complet"
            value={`${policyHolder.policy_holder_title}. ${policyHolder.policy_holder_first_name} ${policyHolder.policy_holder_last_name}`}
          />
          <InfoRow label="Email" value={policyHolder.policy_holder_email} />
        </div>
      </div>
    </div>
  );
}
