import { UserIcon } from "lucide-react";
import React from "react";

import type { IPolicyHolder } from "@/types/travel";
import { InfoRow } from "./InfoRow";

interface PolicyHolderCardProps {
  policyHolder: IPolicyHolder;
}

export function PolicyHolderCard({ policyHolder }: PolicyHolderCardProps) {
  return (
    <div className="bg-surface-base border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="bg-brand-secondary bg-opacity-10 px-6 py-4 flex items-center gap-3 border-b border-gray-200">
        <UserIcon className="w-5 h-5 text-brand-secondary" />
        <h2 className="text-lg font-bold text-brand-secondary">
          Souscripteur
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <InfoRow
            label="Nom complet"
            value={`${policyHolder.title}. ${policyHolder.first_name} ${policyHolder.last_name}`}
          />
          <InfoRow label="Email" value={policyHolder.email} />
        </div>
      </div>
    </div>
  );
}
