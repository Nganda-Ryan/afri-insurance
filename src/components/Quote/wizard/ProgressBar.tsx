"use client";

import React from "react";
import { Check, FileText } from "lucide-react";

type StepVisualState = "completed" | "active" | "pending";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  /** Affiche l’étape finale « Contrat » (hors parcours 5 étapes voyage). */
  showContractStep?: boolean;
}

function getStepState(index: number, currentStep: number): StepVisualState {
  if (index < currentStep) return "completed";
  if (index === currentStep) return "active";
  return "pending";
}

function connectorColor(leftState: StepVisualState): string {
  if (leftState === "completed") return "bg-[#6d9489]";
  if (leftState === "active") return "bg-brand-primary";
  return "bg-brand-secondary/25";
}

function statusLabel(state: StepVisualState): string | null {
  if (state === "completed") return "Terminé";
  if (state === "active") return "En cours";
  return "En attente";
}

function MobileSegmentBar({
  index,
  total,
  state,
}: {
  index: number;
  total: number;
  state: StepVisualState;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const bg =
    state === "completed"
      ? "bg-[#6d9489]"
      : state === "active"
        ? "bg-brand-primary"
        : "bg-brand-secondary/25";

  const label =
    state === "completed"
      ? "Terminé"
      : state === "active"
        ? "En cours"
        : null;

  const labelColor =
    state === "completed"
      ? "text-[#6d9489]"
      : state === "active"
        ? "text-brand-primary"
        : "";

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
      <div
        className={`h-2 w-full ${bg} ${isFirst ? "rounded-l-full" : ""} ${isLast ? "rounded-r-full" : ""}`}
        aria-hidden
      />
      {label ? (
        <span className={`text-[10px] font-semibold leading-none ${labelColor}`}>
          {label}
        </span>
      ) : (
        <span className="text-[10px] leading-none opacity-0" aria-hidden>
          —
        </span>
      )}
    </div>
  );
}

function DesktopStepIcon({ state }: { state: StepVisualState }) {
  if (state === "completed") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6d9489]">
        <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} aria-hidden />
      </span>
    );
  }

  if (state === "active") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-brand-primary bg-white p-0.5">
        <span className="block h-full w-full rounded-sm bg-brand-primary" aria-hidden />
      </span>
    );
  }

  return (
    <span
      className="block h-7 w-7 shrink-0 rounded-lg bg-brand-secondary/25"
      aria-hidden
    />
  );
}

function DesktopConnector({ leftState }: { leftState: StepVisualState }) {
  return (
    <div
      className={`mx-1.5 mt-3.5 h-px min-w-4 flex-1 ${connectorColor(leftState)}`}
      aria-hidden
    />
  );
}

export function ProgressBar({
  currentStep,
  totalSteps,
  stepLabels,
  showContractStep = false,
}: ProgressBarProps) {
  const steps = stepLabels.slice(0, totalSteps);

  return (
    <div className="mb-2 w-full" role="navigation" aria-label="Progression">
      {/* Mobile : barres segmentées + Contrat */}
      <div className="lg:hidden">
        <div className="flex items-start gap-0.5">
          {steps.map((_, index) => (
            <MobileSegmentBar
              key={index}
              index={index}
              total={steps.length}
              state={getStepState(index, currentStep)}
            />
          ))}
          {showContractStep && (
            <div className="flex w-10 shrink-0 flex-col items-center gap-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-secondary/25">
                <FileText
                  className="h-3.5 w-3.5 text-brand-primary"
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
              <span className="text-center text-[10px] font-semibold leading-tight text-brand-primary">
                Contrat
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Desktop : stepper détaillé */}
      <div className="hidden w-full items-start lg:flex">
        {steps.map((label, index) => {
          const state = getStepState(index, currentStep);
          const status = statusLabel(state);
          const isLastWizardStep = index === steps.length - 1;
          const showConnectorAfter =
            !isLastWizardStep || showContractStep;

          return (
            <React.Fragment key={`${label}-${index}`}>
              <div className="flex max-w-[9.5rem] shrink-0 items-start gap-2 xl:max-w-none">
                <DesktopStepIcon state={state} />
                <div className="min-w-0">
                  <p className="text-[10px] leading-none text-gray-400">
                    Étape {index + 1}
                  </p>
                  <p className="mt-0.5 text-xs font-bold leading-snug text-brand-primary">
                    {label}
                  </p>
                  <p
                    className={`text-[10px] leading-snug ${
                      state === "completed"
                        ? "font-medium text-[#6d9489]"
                        : state === "active"
                          ? "font-semibold text-brand-primary"
                          : "font-medium/80"
                    }`}
                  >
                    {status}
                  </p>
                </div>
              </div>
              {showConnectorAfter && (
                <DesktopConnector leftState={state} />
              )}
            </React.Fragment>
          );
        })}

        {showContractStep && (
          <div className="flex shrink-0 items-start gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-secondary/25">
              <FileText
                className="h-3.5 w-3.5 text-brand-primary"
                strokeWidth={2}
                aria-hidden
              />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold leading-snug text-brand-primary">
                Votre contrat
              </p>
              <p className="text-[10px] leading-snug/80">
                Téléchargez-le
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
