"use client";

import { useMemo, useState } from "react";
import { Users } from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import {
  calculateHelepQuote,
  getHelepFormuleOptions,
} from "@/lib/helep/calculate-helep-quote";
import { HELEP_INSURANCE_DATA } from "@/lib/constants/helep_insurance";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type {
  HelepFormuleId,
  HelepQuoteFormInput,
  HelepQuoteResult,
} from "@/types/helep-insurance";

interface HelepQuoteFormStepProps {
  initialForm?: HelepQuoteFormInput | null;
  onSubmit: (form: HelepQuoteFormInput, quote: HelepQuoteResult) => void;
}

export function HelepQuoteFormStep({
  initialForm,
  onSubmit,
}: HelepQuoteFormStepProps) {
  const formuleOptions = useMemo(() => getHelepFormuleOptions(), []);

  const [formuleId, setFormuleId] = useState(
    initialForm?.formuleId ?? "",
  );

  const hasExplicitFormule =
    formuleId !== "" &&
    formuleOptions.some((option) => option.value === formuleId);

  const formInput = useMemo((): HelepQuoteFormInput | null => {
    if (!hasExplicitFormule) return null;
    return { formuleId: formuleId as HelepFormuleId };
  }, [formuleId, hasExplicitFormule]);

  const quoteResult = useMemo(
    () => (formInput ? calculateHelepQuote(formInput) : null),
    [formInput],
  );

  const canSubmit = quoteResult != null && formInput != null;

  const handleSubmit = () => {
    if (!quoteResult || !formInput) return;
    onSubmit(formInput, quoteResult);
  };

  return (
    <div className="space-y-6">
      <QuoteFormSection title="Cotation Afri Helep" icon={Users}>
        <p className="text-sm text-text-main text-opacity-80">
          {HELEP_INSURANCE_DATA.description}
        </p>
        <p className="text-xs text-text-main text-opacity-60">
          Minimum {HELEP_INSURANCE_DATA.min_membres_tontine} membres dans la tontine.
          Garantie pour {HELEP_INSURANCE_DATA.duree_garantie_annees} an, renouvelable.
        </p>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label htmlFor="helep-formule">Formule</Label>
            <Select
              id="helep-formule"
              value={hasExplicitFormule ? formuleId : ""}
              onChange={setFormuleId}
              options={formuleOptions}
              placeholder="Choisir la formule"
            />
          </div>
        </div>

        {quoteResult && (
          <div className="mt-4 rounded-lg border border-brand-secondary/20 bg-brand-secondary/5 p-4">
            <p className="text-sm font-semibold text-brand-primary">
              Prime annuelle :{" "}
              {formatAutoAmount(quoteResult.breakdown.prime_annuelle, quoteResult.devise)}
            </p>
            <p className="mt-1 text-xs text-text-main text-opacity-70">
              Capital Personnes :{" "}
              {formatAutoAmount(quoteResult.breakdown.capital_personnes, quoteResult.devise)} •
              Capital Engagements :{" "}
              {formatAutoAmount(quoteResult.breakdown.capital_engagements, quoteResult.devise)} •
              Total :{" "}
              {formatAutoAmount(quoteResult.breakdown.capital_total, quoteResult.devise)}
            </p>
          </div>
        )}
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
