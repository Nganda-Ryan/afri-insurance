import {
  BuildingIcon,
  CalendarIcon,
  FileTextIcon,
  HashIcon,
  MapPinIcon,
  PlaneIcon,
  ShieldCheckIcon,
} from "lucide-react";
import React from "react";

import type { IPolicyData } from "@/types/travel";
import { formatDate } from "@/lib/utils";
import { InfoRow } from "./InfoRow";
import { StatusBadge } from "./StatusBadge";

interface PolicyOverviewCardProps {
  policy: IPolicyData;
}

export function PolicyOverviewCard({ policy }: PolicyOverviewCardProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className={`bg-brand-primary px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <ShieldCheckIcon className="w-6 h-6 text-text-inverse" />
          <h2 className="text-lg font-bold text-text-inverse">
            Aperçu de la police
          </h2>
        </div>
        <StatusBadge status={policy.policy_status} />
      </div>
      <div className="p-6 dark:text-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <InfoRow
            label="Numéro de police"
            value={policy.policy_number}
            icon={<HashIcon className="w-4 h-4" />}
          />
          <InfoRow
            label="ID Police"
            value={`#${policy.policy_id}`}
            icon={<FileTextIcon className="w-4 h-4" />}
          />
          <InfoRow
            label="Compagnie d'assurance"
            value={policy.company}
            icon={<BuildingIcon className="w-4 h-4" />}
          />
          <InfoRow
            label="Produit"
            value={`${policy.product.name} - ${policy.product.category}`}
            icon={<PlaneIcon className="w-4 h-4" />}
          />
          <InfoRow
            label="Période de couverture"
            value={`${formatDate(policy.coverage_period.start_date)} - ${formatDate(policy.coverage_period.end_date)}`}
            icon={<CalendarIcon className="w-4 h-4" />}
          />
          <InfoRow
            label="Type de voyage"
            value={policy.type === "single" ? "Voyage simple" : "Multi-voyage annuel"}
            icon={<PlaneIcon className="w-4 h-4" />}
          />
          <InfoRow
            label="Destination"
            value={policy.quoting_criteria.find(criterion => criterion.code === "Destination area")?.value as string ?? ""}
            icon={<MapPinIcon className="w-4 h-4" />}
          />
          <InfoRow
            label="Durée du voyage"
            value={`${policy.quoting_criteria.find(criterion => criterion.code === "Trip Duration")?.value ?? ""} jours`}
            icon={<CalendarIcon className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
}
