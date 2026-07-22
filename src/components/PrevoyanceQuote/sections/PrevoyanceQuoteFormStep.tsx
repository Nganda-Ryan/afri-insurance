"use client";

import { useMemo, useState } from "react";
import { ShieldIcon } from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { PREVOYANCE_INDIVIDUELLE_INSURANCE_DATA } from "@/lib/constants/prevoyance_individuelle_insurance";
import {
  calculatePrevoyanceQuote,
  getPrevoyanceAgeOptions,
  getPrevoyanceCapitalOptions,
  getPrevoyanceDurationOptions,
} from "@/lib/prevoyance/calculate-prevoyance-quote";
import type {
  PrevoyanceQuoteFormInput,
  PrevoyanceQuoteResult,
} from "@/types/prevoyance-insurance";

interface PrevoyanceQuoteFormStepProps {
  initialForm?: PrevoyanceQuoteFormInput | null;
  onSubmit: (form: PrevoyanceQuoteFormInput, quote: PrevoyanceQuoteResult) => void;
}

function pickOptionValue(
  value: string,
  options: { value: string }[],
): string {
  return options.some((option) => option.value === value)
    ? value
    : (options[0]?.value ?? "");
}

export function PrevoyanceQuoteFormStep({
  initialForm,
  onSubmit,
}: PrevoyanceQuoteFormStepProps) {
  const ageOptions = useMemo(() => getPrevoyanceAgeOptions(), []);
  const capitalOptions = useMemo(() => getPrevoyanceCapitalOptions(), []);

  const [age, setAge] = useState(
    initialForm?.age != null ? String(initialForm.age) : "",
  );
  const [durationYears, setDurationYears] = useState(
    initialForm?.durationYears != null ? String(initialForm.durationYears) : "",
  );
  const [capital, setCapital] = useState(
    initialForm?.capital != null
      ? String(initialForm.capital)
      : String(PREVOYANCE_INDIVIDUELLE_INSURANCE_DATA.base_capital),
  );

  const effectiveAge = useMemo(
    () => pickOptionValue(age, ageOptions),
    [age, ageOptions],
  );
  const parsedAge = Number.parseInt(effectiveAge, 10);

  const durationOptions = useMemo(
    () =>
      Number.isFinite(parsedAge) ? getPrevoyanceDurationOptions(parsedAge) : [],
    [parsedAge],
  );

  const effectiveCapital = useMemo(
    () => pickOptionValue(capital, capitalOptions),
    [capital, capitalOptions],
  );

  const hasExplicitAge =
    age !== "" && ageOptions.some((option) => option.value === age);
  const hasExplicitDuration =
    durationYears !== "" &&
    durationOptions.some((option) => option.value === durationYears);

  const formInput = useMemo((): PrevoyanceQuoteFormInput | null => {
    if (!hasExplicitAge || !hasExplicitDuration) return null;
    const ageValue = Number.parseInt(age, 10);
    const durationValue = Number.parseInt(durationYears, 10);
    const capitalValue = Number.parseInt(effectiveCapital, 10);
    if (
      !Number.isFinite(ageValue) ||
      !Number.isFinite(durationValue) ||
      !Number.isFinite(capitalValue)
    ) {
      return null;
    }
    return {
      age: ageValue,
      durationYears: durationValue,
      capital: capitalValue,
    };
  }, [age, durationYears, effectiveCapital, hasExplicitAge, hasExplicitDuration]);

  const quoteResult = useMemo(
    () => (formInput ? calculatePrevoyanceQuote(formInput) : null),
    [formInput],
  );

  const canSubmit = quoteResult != null && formInput != null;

  const handleSubmit = () => {
    if (!quoteResult || !formInput) return;
    onSubmit(formInput, quoteResult);
  };

  return (
    <div className="space-y-6">
      <QuoteFormSection title="Cotation prévoyance individuelle" icon={ShieldIcon}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="prevoyance-age">Âge de l&apos;assuré</Label>
            <Select
              id="prevoyance-age"
              value={hasExplicitAge ? age : ""}
              onChange={(value) => {
                setAge(value);
                setDurationYears("");
              }}
              options={ageOptions}
              placeholder="Choisir l'âge"
            />
          </div>

          <div>
            <Label htmlFor="prevoyance-duration">Durée du contrat</Label>
            <Select
              id="prevoyance-duration"
              value={hasExplicitDuration ? durationYears : ""}
              onChange={setDurationYears}
              options={durationOptions}
              placeholder="Choisir la durée"
              disabled={!hasExplicitAge || durationOptions.length === 0}
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="prevoyance-capital">Capital assuré</Label>
            <Select
              id="prevoyance-capital"
              value={effectiveCapital}
              onChange={setCapital}
              options={capitalOptions}
              placeholder="Choisir le capital"
            />
          </div>
        </div>
      </QuoteFormSection>

      <QuoteStepNavigation
        showPrevious={false}
        onNext={handleSubmit}
        nextLabel="Générer devis"
        nextDisabled={!canSubmit}
      />
    </div>
  );
}
