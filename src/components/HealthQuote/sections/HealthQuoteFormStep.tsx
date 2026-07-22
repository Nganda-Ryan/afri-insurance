"use client";

import { useMemo, useState } from "react";
import { HeartPulseIcon } from "lucide-react";

import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import {
  calculateHealthQuote,
  getHealthPlanOptions,
  parseHealthPlanId,
} from "@/lib/health/calculate-health-quote";
import type { HealthQuoteFormInput, HealthQuoteResult } from "@/types/health-insurance";

interface HealthQuoteFormStepProps {
  initialForm?: HealthQuoteFormInput | null;
  onSubmit: (form: HealthQuoteFormInput, quote: HealthQuoteResult) => void;
}

function parseCount(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function HealthQuoteFormStep({ initialForm, onSubmit }: HealthQuoteFormStepProps) {
  const planOptions = useMemo(() => getHealthPlanOptions(), []);

  const [planId, setPlanId] = useState<string>(initialForm?.planId ?? "");
  const [adultCount, setAdultCount] = useState(
    initialForm?.adultCount != null ? String(initialForm.adultCount) : "1",
  );
  const [childCount, setChildCount] = useState(
    initialForm?.childCount != null ? String(initialForm.childCount) : "0",
  );

  const selectedPlanId = useMemo(() => {
    if (!planId) return null;
    return parseHealthPlanId(planId);
  }, [planId]);

  const parsedAdultCount = parseCount(adultCount);
  const parsedChildCount = parseCount(childCount);

  const quoteResult = useMemo(
    () =>
      selectedPlanId
        ? calculateHealthQuote({
            planId: selectedPlanId,
            adultCount: parsedAdultCount,
            childCount: parsedChildCount,
          })
        : null,
    [selectedPlanId, parsedAdultCount, parsedChildCount],
  );

  const canSubmit = quoteResult != null && selectedPlanId != null;

  const handleSubmit = () => {
    if (!quoteResult || !selectedPlanId) return;
    onSubmit(
      {
        planId: selectedPlanId,
        adultCount: parsedAdultCount,
        childCount: parsedChildCount,
      },
      quoteResult,
    );
  };

  return (
    <div className="space-y-6">
      <QuoteFormSection title="Cotation assurance santé" icon={HeartPulseIcon}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="health-plan">Formule</Label>
            <Select
              id="health-plan"
              value={selectedPlanId ?? ""}
              onChange={setPlanId}
              options={planOptions}
              placeholder="Choisir une formule"
            />
          </div>

          <div>
            <Label htmlFor="health-adults">Nombre d&apos;adultes</Label>
            <InputField
              id="health-adults"
              type="number"
              min={0}
              value={adultCount}
              onChange={(e) => setAdultCount(e.target.value)}
              className="border bg-white"
            />
          </div>

          <div>
            <Label htmlFor="health-children">Nombre d&apos;enfants</Label>
            <InputField
              id="health-children"
              type="number"
              min={0}
              value={childCount}
              onChange={(e) => setChildCount(e.target.value)}
              className="border bg-white"
            />
          </div>
        </div>
      </QuoteFormSection>

      <QuoteStepNavigation
        showPrevious={false}
        onNext={handleSubmit}
        nextLabel="Obtenir un devis"
        nextDisabled={!canSubmit}
      />
    </div>
  );
}
