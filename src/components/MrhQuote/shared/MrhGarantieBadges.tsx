"use client";

import { Badge } from "@/components/ui/badge";
import { MRH_GARANTIE_LABELS } from "@/lib/constants/mrh_insurance";

interface MrhGarantieBadgesProps {
  garanties: string[];
}

export function MrhGarantieBadges({ garanties }: MrhGarantieBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {garanties.map((code) => (
        <Badge key={code} variant="secondary" className="text-xs font-medium">
          {MRH_GARANTIE_LABELS[code] ?? code}
        </Badge>
      ))}
    </div>
  );
}
