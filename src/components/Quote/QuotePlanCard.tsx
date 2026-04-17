"use client";

import { CheckIcon, ChevronDownIcon } from "lucide-react";

import type { PlanDetails } from "@/types/travel";

function formatQuoteMoney(value: number): string {
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
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
  expanded,
  onToggleGuarantees,
  onChoose,
  isSelecting,
}: QuotePlanCardProps) {
  const highlighted =
    plan.is_default_product || plan.type === "premium";

  const hasGuarantees = plan.guarantees.length > 0;

  return (
    <article
      className={`relative flex flex-col rounded-xl border bg-surface-base p-4 shadow-sm transition-all hover:shadow-md ${highlighted ? "border-2 border-brand-secondary md:scale-[1.02]" : "border-gray-200 dark:border-gray-700"}`}
    >
      {plan.is_default_product && (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-primary px-4 py-1 text-sm font-bold text-text-inverse shadow-md">
          Recommandée
        </div>
      )}
      {!plan.is_default_product && plan.type === "premium" && (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-primary px-4 py-1 text-sm font-bold text-text-inverse shadow-md">
          Le plus choisi
        </div>
      )}

      <div className="mb-4 text-center">
        <h3 className="mb-2 text-xl font-bold text-brand-secondary">
          {plan.name}
        </h3>
        <div className="mb-1 text-4xl font-bold text-text-main">
          {formatQuoteMoney(plan.price)}
          {plan.currency ? (
            <span className="ml-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {plan.currency}
            </span>
          ) : null}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {plan.per_trip_label}
        </div>
      </div>

      <div className="mb-4 flex-1">
        {hasGuarantees ? (
          <>
            <button
              type="button"
              onClick={onToggleGuarantees}
              className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-brand-secondary"
            >
              <span>Voir les garanties</span>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>

            {expanded && (
              <div className="space-y-3 overflow-hidden">
                {plan.guarantees.map((line, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <p className="min-w-0 flex-1 text-text-main">{line}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}

        {plan.terms_url ? (
          <a
            href={plan.terms_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block text-sm font-semibold text-brand-secondary underline ${hasGuarantees ? "mt-4" : ""}`}
          >
            Conditions générales
          </a>
        ) : null}
      </div>

      <button
        type="button"
        disabled={isSelecting}
        onClick={onChoose}
        className={`mt-auto w-full rounded-lg py-3 font-semibold transition-all disabled:opacity-60 ${highlighted ? "bg-brand-primary text-text-inverse shadow-md hover:bg-opacity-90" : "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-text-inverse"}`}
      >
        {isSelecting ? "Sélection…" : `Choisir ${plan.name}`}
      </button>
    </article>
  );
}
