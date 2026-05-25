"use client";

import type { PlanDetails } from "@/types/travel";
import Button from "@/components/ui/button/Button";

function formatQuoteMoney(value: number): string {
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export interface QuotePlanCardProps {
  plan: PlanDetails;
  expanded: boolean;
  onToggleGuarantees: () => void;
  onChoose: () => void;
  isSelecting: boolean;
}

export function QuotePlanCard({
  plan,
  onChoose,
  isSelecting,
}: QuotePlanCardProps) {
  const highlighted =
    plan.is_default_product || plan.type === "premium";

  return (
    <article
      className={`relative flex flex-col rounded-xl border bg-white p-4 transition-all hover:shadow-md dark:bg-zinc-950 dark:text-zinc-100`}
    >
      {plan.is_default_product ? (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-primary px-4 py-1 text-sm font-semibold text-white">
          Recommandée
        </div>
      ) : null}

      <div className="mb-4 mt-2 text-center">
        <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
        <div className="mb-1 text-4xl font-bold text-text-main">
          {formatQuoteMoney(plan.price)}
          {plan.currency ? (
            <span className="ml-2 text-2xl font-semibold text-gray-500 dark:text-gray-300">
              {plan.currency}
            </span>
          ) : null}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{plan.per_trip_label}</div>
      </div>

      <div className="mb-4 flex-1 text-center">
        {plan.terms_url ? (
          <a
            href={plan.terms_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold underline"
          >
            Conditions générales
          </a>
        ) : null}
      </div>

      <Button
        type="button"
        disabled={isSelecting}
        onClick={onChoose}
        variant={highlighted ? "primary" : "outline"}
        className={`mt-auto w-full font-semibold transition-all disabled:opacity-60! text-nowrap ${
          highlighted
            ? "shadow-md"
            : "border! border-brand-primary! bg-transparent! text-brand-primary! ring-0! hover:bg-brand-primary! hover:text-text-inverse! dark:border-brand-primary! dark:text-brand-primary! dark:hover:bg-brand-primary! dark:hover:text-text-inverse!"
        }`}
      >
        {isSelecting ? "Sélection…" : `Choisir ${plan.name}`}
      </Button>
    </article>
  );
}
