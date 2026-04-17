import { UserIcon } from "lucide-react";
import React from "react";

import type { IPolicyBeneficiary } from "@/types/travel";
import { calculateAge, formatDate } from "./utils";
import { InfoRow } from "./InfoRow";

interface PolicyBeneficiaryCardProps {
  beneficiaries: IPolicyBeneficiary[];
}

export function PolicyBeneficiaryCard({ beneficiaries }: PolicyBeneficiaryCardProps) {
  return (
    <div className="bg-surface-base border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="bg-brand-secondary bg-opacity-10 px-6 py-4 flex items-center gap-3 border-b border-gray-200">
        <UserIcon className="w-5 h-5 text-brand-secondary" />
        <h2 className="text-lg font-bold text-brand-secondary">
          Détails du bénéficiaire
        </h2>
      </div>
      {beneficiaries.map((beneficiary) => (
        <div key={beneficiary.id} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InfoRow
              label="Nom complet"
              value={`${beneficiary.title}. ${beneficiary.first_name} ${beneficiary.last_name}`}
            />
            <InfoRow
              label="Date de naissance"
              value={formatDate(beneficiary.birth_date)}
            />
            <InfoRow label="Email" value={beneficiary.email} />
            <InfoRow label="Téléphone" value={beneficiary.phone_number} />
            <InfoRow
              label="Numéro de passeport"
              value={beneficiary.passport_number}
            />
            <InfoRow
              label="Âge"
              value={`${calculateAge(beneficiary.birth_date)} ans`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
