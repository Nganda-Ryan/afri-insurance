"use client";

import { useMemo, useState } from "react";
import { Shield } from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import {
  calculateHemleQuote,
  getHemleFormuleOptions,
  getHemleOptionOptions,
  isHemleOptionAvailable,
  parseHemleFormuleId,
} from "@/lib/hemle/calculate-hemle-quote";
import { HEMLE_INSURANCE_DATA } from "@/lib/constants/hemle_insurance";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type {
  HemleFormuleId,
  HemleOptionId,
  HemleQuoteFormInput,
  HemleQuoteResult,
} from "@/types/hemle-insurance";

interface HemleQuoteFormStepProps {
  initialForm?: HemleQuoteFormInput | null;
  onSubmit: (form: HemleQuoteFormInput, quote: HemleQuoteResult) => void;
}

export function HemleQuoteFormStep({
  initialForm,
  onSubmit,
}: HemleQuoteFormStepProps) {
  const formuleOptions = useMemo(() => getHemleFormuleOptions(), []);

  const [formuleId, setFormuleId] = useState(initialForm?.formuleId ?? "");
  const [optionId, setOptionId] = useState(initialForm?.optionId ?? "");
  const [avecEnfant, setAvecEnfant] = useState(
    initialForm?.avecEnfant ?? false,
  );

  const parsedFormuleId = parseHemleFormuleId(formuleId);
  const optionOptions = useMemo(
    () => getHemleOptionOptions(parsedFormuleId),
    [parsedFormuleId],
  );

  // L'option reste valable que si elle appartient à la formule choisie.
  const hasExplicitOption =
    optionId !== "" &&
    parsedFormuleId != null &&
    isHemleOptionAvailable(parsedFormuleId, optionId as HemleOptionId);

  const formInput = useMemo((): HemleQuoteFormInput | null => {
    if (!parsedFormuleId || !hasExplicitOption) return null;
    return {
      formuleId: parsedFormuleId,
      optionId: optionId as HemleOptionId,
      avecEnfant,
    };
  }, [parsedFormuleId, hasExplicitOption, optionId, avecEnfant]);

  const quoteResult = useMemo(
    () => (formInput ? calculateHemleQuote(formInput) : null),
    [formInput],
  );

  const canSubmit = quoteResult != null && formInput != null;

  const handleSubmit = () => {
    if (!quoteResult || !formInput) return;
    onSubmit(formInput, quoteResult);
  };

  return (
    <div className="space-y-6">
      <QuoteFormSection title="Cotation Afri Hemle" icon={Shield}>
        <p className="text-sm text-text-main text-opacity-80">
          {HEMLE_INSURANCE_DATA.description}
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="hemle-formule">Formule</Label>
            <Select
              id="hemle-formule"
              value={formuleId}
              onChange={setFormuleId}
              options={formuleOptions}
              placeholder="Choisir la formule"
            />
          </div>

          <div>
            <Label htmlFor="hemle-option">Option</Label>
            <Select
              id="hemle-option"
              value={hasExplicitOption ? optionId : ""}
              onChange={setOptionId}
              options={optionOptions}
              placeholder={
                parsedFormuleId ? "Choisir l'option" : "Choisir d'abord une formule"
              }
              disabled={!parsedFormuleId}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={avecEnfant}
                onChange={(e) => setAvecEnfant(e.target.checked)}
                disabled={!parsedFormuleId}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <span>
                Ajouter l&apos;option{" "}
                <span className="font-semibold">
                  {HEMLE_INSURANCE_DATA.enfant.label}
                </span>{" "}
                ({HEMLE_INSURANCE_DATA.enfant.couverture}) – Capital Frais Funéraires{" "}
                {formatAutoAmount(
                  HEMLE_INSURANCE_DATA.enfant.capital_garanti,
                  HEMLE_INSURANCE_DATA.document_info.devise,
                )}{" "}
                pour{" "}
                {formatAutoAmount(
                  HEMLE_INSURANCE_DATA.enfant.prime_annuelle,
                  HEMLE_INSURANCE_DATA.document_info.devise,
                )}
                /an. Souscrite obligatoirement avec une formule.
              </span>
            </label>
          </div>
        </div>

        {quoteResult && (
          <div className="mt-4 rounded-lg border border-brand-secondary/20 bg-brand-secondary/5 p-4">
            <p className="text-sm font-semibold text-brand-primary">
              Prime annuelle TTC totale :{" "}
              {formatAutoAmount(
                quoteResult.breakdown.prime_totale,
                quoteResult.devise,
              )}
            </p>
            <p className="mt-1 text-xs text-text-main text-opacity-70">
              Formule : {quoteResult.breakdown.formuleLabel} • Option :{" "}
              {quoteResult.breakdown.optionLabel} •              Capital Frais Funéraires total :{" "}
              {formatAutoAmount(
                quoteResult.breakdown.capital_total,
                quoteResult.devise,
              )}
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
