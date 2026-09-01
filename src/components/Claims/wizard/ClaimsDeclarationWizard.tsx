"use client";

import { useState } from "react";
import { toast } from "sonner";

import { ClaimsFormStep1 } from "@/components/Claims/sections/ClaimsFormStep1";
import { ClaimsFormStep2 } from "@/components/Claims/sections/ClaimsFormStep2";
import { CLAIMS_FLOW_STEP } from "@/lib/constants/claims-flow";
import {
  EMPTY_CLAIMS_FORM,
  type ClaimsDeclarationFormData,
} from "@/types/claims";

interface ClaimsDeclarationWizardProps {
  step: number;
  onStepChange: (step: number) => void;
}

export function ClaimsDeclarationWizard({
  step,
  onStepChange,
}: ClaimsDeclarationWizardProps) {
  const [form, setForm] = useState<ClaimsDeclarationFormData>(EMPTY_CLAIMS_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (patch: Partial<ClaimsDeclarationFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitted(true);
      toast.success("Votre déclaration de sinistre a été envoyée.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-gray-200/80 bg-white px-6 py-12 text-center shadow-sm">
        <h2 className="mb-3 text-2xl font-bold text-brand-primary">
          Déclaration envoyée
        </h2>
        <p className="mx-auto max-w-md text-sm text-gray-600">
          Merci. Notre équipe a bien reçu votre déclaration et vous recontactera
          sous 24 h ouvrées.
        </p>
        <button
          type="button"
          className="mt-6 rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          onClick={() => {
            setForm(EMPTY_CLAIMS_FORM);
            onStepChange(CLAIMS_FLOW_STEP.INFO);
            setSubmitted(false);
          }}
        >
          Nouvelle déclaration
        </button>
      </div>
    );
  }

  return (
    <>
      {step === CLAIMS_FLOW_STEP.INFO ? (
        <ClaimsFormStep1
          form={form}
          onChange={updateForm}
          onNext={() => onStepChange(CLAIMS_FLOW_STEP.DETAILS)}
        />
      ) : (
        <ClaimsFormStep2
          form={form}
          onChange={updateForm}
          onBack={() => onStepChange(CLAIMS_FLOW_STEP.INFO)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
