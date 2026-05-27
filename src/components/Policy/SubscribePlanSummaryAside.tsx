"use client";

interface PlanSummaryAsideProps {
  planName: string;
  totalPremiumLabel: string;
  destination: string;
  startDate: string;
  endDate: string;
  adult: string;
}

export function SubscribePlanSummaryAside({
  planName,
  totalPremiumLabel,
  destination,
  startDate,
  endDate,
  adult,
}: PlanSummaryAsideProps) {
  return (
    <aside className="lg:col-span-4">
      <div className="rounded-lg border border-border bg-muted/50 p-4 sm:p-5 lg:sticky lg:top-24">
        <h2 className="mb-4 text-base font-bold text-brand-secondary sm:text-lg">
          Recapitulatif du plan choisi
        </h2>
        <div className="space-y-3 text-sm">
          {[
            { label: "Type de plan", value: planName, highlight: true },
            { label: "Prime totale", value: totalPremiumLabel, large: true },
            { label: "Destination", value: destination },
            {
              label: "Dates de couverture",
              value: `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`,
            },
            { label: "Nombre de voyageurs", value: adult },
          ].map(({ label, value, highlight, large }) => (
            <div
              key={label}
              className="flex items-start justify-between gap-3 border-b border-gray-300 pb-3 last:border-0 last:pb-0"
            >
              <span className="font-semibold text-text-main">{label}</span>
              <span
                className={
                  highlight
                    ? "text-right font-bold text-brand-primary"
                    : large
                      ? "text-right text-xl font-bold text-text-main sm:text-2xl"
                      : "text-right text-text-main"
                }
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
