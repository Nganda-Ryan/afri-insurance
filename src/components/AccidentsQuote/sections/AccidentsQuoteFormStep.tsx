"use client";

import { useMemo, useState } from "react";
import { Cross } from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import {
  calculateAccidentsQuote,
  getAccidentsClassOptions,
  getAccidentsDureeOptions,
} from "@/lib/accidents/calculate-accidents-quote";
import { ACCIDENTS_INSURANCE_DATA } from "@/lib/constants/accidents_insurance";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type {
  AccidentClass,
  AccidentQuoteFormInput,
  AccidentQuoteResult,
} from "@/types/accidents-insurance";

interface AccidentsQuoteFormStepProps {
  initialForm?: AccidentQuoteFormInput | null;
  onSubmit: (form: AccidentQuoteFormInput, quote: AccidentQuoteResult) => void;
}

export function AccidentsQuoteFormStep({
  initialForm,
  onSubmit,
}: AccidentsQuoteFormStepProps) {
  const classOptions = useMemo(() => getAccidentsClassOptions(), []);
  const dureeOptions = useMemo(() => getAccidentsDureeOptions(), []);

  const [classe, setClasse] = useState(
    initialForm?.classe != null ? String(initialForm.classe) : "",
  );
  const [capitalDeces, setCapitalDeces] = useState(
    initialForm?.capital_deces != null ? String(initialForm.capital_deces) : "",
  );
  const [capitalIpt, setCapitalIpt] = useState(
    initialForm?.capital_ipt != null ? String(initialForm.capital_ipt) : "",
  );
  const [dureeMois, setDureeMois] = useState(
    initialForm?.duree_mois != null ? String(initialForm.duree_mois) : "",
  );
  const [hasMajoration25, setHasMajoration25] = useState(
    initialForm?.has_majoration_25 ?? false,
  );
  const [hasSurprimeAge, setHasSurprimeAge] = useState(
    initialForm?.has_surprime_age ?? false,
  );

  const hasExplicitClasse =
    classe !== "" && classOptions.some((option) => option.value === classe);
  const hasExplicitCapitalDeces =
    capitalDeces !== "" &&
    Number.parseInt(capitalDeces, 10) > 0;
  const hasExplicitCapitalIpt =
    capitalIpt !== "" &&
    Number.parseInt(capitalIpt, 10) > 0;
  const hasExplicitDuree =
    dureeMois !== "" && dureeOptions.some((option) => option.value === dureeMois);

  const formInput = useMemo((): AccidentQuoteFormInput | null => {
    if (
      !hasExplicitClasse ||
      !hasExplicitCapitalDeces ||
      !hasExplicitCapitalIpt ||
      !hasExplicitDuree
    )
      return null;
    const classeValue = Number.parseInt(classe, 10) as AccidentClass;
    const capitalDecesValue = Number.parseInt(capitalDeces, 10);
    const capitalIptValue = Number.parseInt(capitalIpt, 10);
    const dureeMoisValue = Number.parseInt(dureeMois, 10);
    if (
      !Number.isFinite(classeValue) ||
      classeValue < 1 ||
      classeValue > 5 ||
      !Number.isFinite(capitalDecesValue) ||
      capitalDecesValue <= 0 ||
      !Number.isFinite(capitalIptValue) ||
      capitalIptValue <= 0 ||
      !Number.isFinite(dureeMoisValue) ||
      dureeMoisValue < 1
    ) {
      return null;
    }
    return {
      classe: classeValue,
      capital_deces: capitalDecesValue,
      capital_ipt: capitalIptValue,
      duree_mois: dureeMoisValue,
      has_majoration_25: hasMajoration25,
      has_surprime_age: hasSurprimeAge,
    };
  }, [
    classe,
    capitalDeces,
    capitalIpt,
    dureeMois,
    hasMajoration25,
    hasSurprimeAge,
    hasExplicitClasse,
    hasExplicitCapitalDeces,
    hasExplicitCapitalIpt,
    hasExplicitDuree,
  ]);

  const quoteResult = useMemo(
    () => (formInput ? calculateAccidentsQuote(formInput) : null),
    [formInput],
  );

  const canSubmit = quoteResult != null && formInput != null;

  const handleSubmit = () => {
    if (!quoteResult || !formInput) return;
    onSubmit(formInput, quoteResult);
  };

  return (
    <div className="space-y-6">
      <QuoteFormSection title="Cotation Individuelle Accidents" icon={Cross}>
        <p className="text-sm text-text-main text-opacity-80">
          Les assurés sont répartis par classe selon la profession exercée.
          Sélectionnez votre classe, vos capitaux et la durée de couverture.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="accidents-classe">Classe de risque</Label>
            <Select
              id="accidents-classe"
              value={hasExplicitClasse ? classe : ""}
              onChange={setClasse}
              options={classOptions}
              placeholder="Choisir la classe"
            />
          </div>

          <div>
            <Label htmlFor="accidents-capital-deces">Capital décès (FCFA)</Label>
            <input
              id="accidents-capital-deces"
              type="number"
              min={1}
              step={100_000}
              value={capitalDeces}
              onChange={(e) => setCapitalDeces(e.target.value)}
              placeholder="Ex: 5 000 000"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div>
            <Label htmlFor="accidents-capital-ipt">Capital infirmité permanente (FCFA)</Label>
            <input
              id="accidents-capital-ipt"
              type="number"
              min={1}
              step={100_000}
              value={capitalIpt}
              onChange={(e) => setCapitalIpt(e.target.value)}
              placeholder="Ex: 5 000 000"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div>
            <Label htmlFor="accidents-duree">Durée de couverture</Label>
            <Select
              id="accidents-duree"
              value={hasExplicitDuree ? dureeMois : ""}
              onChange={setDureeMois}
              options={dureeOptions}
              placeholder="Choisir la durée"
            />
          </div>

          <div className="flex flex-col justify-end gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={hasMajoration25}
                onChange={(e) => setHasMajoration25(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span>Moto {'>'}49cc ou sports dangereux (+25%)</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={hasSurprimeAge}
                onChange={(e) => setHasSurprimeAge(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span>Âge {'>'}60 ans (+10%)</span>
            </label>
          </div>
        </div>

        {quoteResult && (
          <div className="mt-4 rounded-lg border border-brand-secondary/20 bg-brand-secondary/5 p-4">
            <p className="text-sm font-semibold text-brand-primary">
              Prime totale estimée :{" "}
              {formatAutoAmount(quoteResult.breakdown.prime_totale, quoteResult.devise)}
            </p>
            <p className="mt-1 text-xs text-text-main text-opacity-70">
              Capital frais médicaux :{" "}
              {formatAutoAmount(quoteResult.breakdown.capital_fm, quoteResult.devise)} •
              Capital indemnité quotidienne :{" "}
              {quoteResult.breakdown.capital_iq.toLocaleString("fr-FR")} {quoteResult.devise}/jour
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
