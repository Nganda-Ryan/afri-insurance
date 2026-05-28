"use client";

import { formatDateDisplay } from "@/lib/utils";

export interface QuotePlanRecapCardProps {
  planName: string;
  totalPremiumLabel: string;
  destination: string;
  startDate: string;
  endDate: string;
  adult: string;
}

export function QuotePlanRecapCard({
  planName,
  totalPremiumLabel,
  destination,
  startDate,
  endDate,
  adult,
}: QuotePlanRecapCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200/80 bg-white">
      <div className="bg-brand-primary px-4 py-[10px]">
        <h3 className="text-base font-bold text-white">Récapitulatif du plan choisi</h3>
      </div>
      <div className="space-y-3 p-4 text-sm sm:p-5">
        {[
          { label: "Type de plan", value: planName, highlight: true },
          { label: "Prime totale", value: totalPremiumLabel, large: true },
          { label: "Destination", value: destination },
          {
            label: "Dates de couverture",
            value: `${formatDateDisplay(startDate)} – ${formatDateDisplay(endDate)}`,
          },
          { label: "Nombre de voyageurs", value: adult },
        ].map(({ label, value, highlight, large }) => (
          <div
            key={label}
            className="flex items-start justify-between gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0"
          >
            <span className="font-semibold text-text-main">{label}</span>
            <span
              className={
                highlight
                  ? "text-right font-bold text-brand-primary"
                  : large
                    ? "text-right text-lg font-bold text-text-main"
                    : "text-right text-text-main"
              }
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
