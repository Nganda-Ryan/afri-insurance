"use client";

import { useMemo, useState } from "react";
import { CarIcon } from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteAmountBreakdownTable } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import {
  calculateAutoQuote,
  getAutoCategoryOptions,
  getAutoDurationOptions,
  getAutoFuelTypeOptions,
  getAutoMotoOptions,
  getAutoPowerOptions,
  getAutoZoneOptions,
  isAutoMotoCategory,
} from "@/lib/auto/calculate-auto-quote";
import { representativePowerCvFromLabel } from "@/lib/auto/parse-power-range";
import { getAutoBreakdownTableRows } from "@/lib/auto/auto-breakdown-display";
import { AUTO_INSURANCE_PRODUCT_DATA } from "@/lib/constants/auto_insurance";
import type { AutoFuelType, AutoQuoteFormInput, AutoQuoteResult } from "@/types/auto-insurance";

interface AutoQuoteFormStepProps {
  initialForm?: AutoQuoteFormInput | null;
  onSubmit: (form: AutoQuoteFormInput, quote: AutoQuoteResult) => void;
}

function pickOptionValue<T extends string>(
  value: T,
  options: { value: T }[],
  fallback: T,
): T {
  return options.some((option) => option.value === value)
    ? value
    : (options[0]?.value ?? fallback);
}

export function AutoQuoteFormStep({ initialForm, onSubmit }: AutoQuoteFormStepProps) {
  const zoneOptions = useMemo(() => getAutoZoneOptions(), []);
  const defaultZone = initialForm?.zoneNom ?? zoneOptions[0]?.value ?? "";

  const [zoneNom, setZoneNom] = useState(defaultZone);
  const [categoryId, setCategoryId] = useState(initialForm?.categoryId ?? "");
  const [durationLabel, setDurationLabel] = useState(initialForm?.durationLabel ?? "");
  const [fuelType, setFuelType] = useState<AutoFuelType>(initialForm?.fuelType ?? "essence");
  const [powerLabel, setPowerLabel] = useState(initialForm?.powerLabel ?? "");
  const [motoCharacteristic, setMotoCharacteristic] = useState(
    initialForm?.motoCharacteristic ?? "",
  );

  const categoryOptions = useMemo(
    () => getAutoCategoryOptions(zoneNom),
    [zoneNom],
  );
  const effectiveCategoryId = useMemo(
    () => pickOptionValue(categoryId, categoryOptions, ""),
    [categoryId, categoryOptions],
  );

  const durationOptions = useMemo(
    () => getAutoDurationOptions(zoneNom, effectiveCategoryId),
    [zoneNom, effectiveCategoryId],
  );
  const isMoto = useMemo(
    () => isAutoMotoCategory(zoneNom, effectiveCategoryId),
    [zoneNom, effectiveCategoryId],
  );
  const effectiveDurationLabel = useMemo(() => {
    if (isMoto) return "";
    return pickOptionValue(durationLabel, durationOptions, "");
  }, [durationLabel, durationOptions, isMoto]);

  const fuelOptions = useMemo(
    () => getAutoFuelTypeOptions(zoneNom, effectiveCategoryId, effectiveDurationLabel),
    [zoneNom, effectiveCategoryId, effectiveDurationLabel],
  );
  const effectiveFuelType = useMemo(
    () => pickOptionValue(fuelType, fuelOptions, "essence"),
    [fuelType, fuelOptions],
  );

  const powerOptions = useMemo(
    () =>
      getAutoPowerOptions(
        zoneNom,
        effectiveCategoryId,
        effectiveDurationLabel,
        effectiveFuelType,
      ),
    [zoneNom, effectiveCategoryId, effectiveDurationLabel, effectiveFuelType],
  );
  const effectivePowerLabel = useMemo(
    () => pickOptionValue(powerLabel, powerOptions, ""),
    [powerLabel, powerOptions],
  );

  const motoOptions = useMemo(
    () => getAutoMotoOptions(zoneNom, effectiveCategoryId),
    [zoneNom, effectiveCategoryId],
  );
  const effectiveMotoCharacteristic = useMemo(
    () => pickOptionValue(motoCharacteristic, motoOptions, ""),
    [motoCharacteristic, motoOptions],
  );

  const representativePowerCv = useMemo(
    () => representativePowerCvFromLabel(effectivePowerLabel),
    [effectivePowerLabel],
  );

  const quoteResult = useMemo(() => {
    if (!zoneNom || !effectiveCategoryId) return null;

    if (isMoto) {
      if (!effectiveMotoCharacteristic) return null;
      return calculateAutoQuote({
        zoneNom,
        categoryId: effectiveCategoryId,
        durationLabel: "",
        fuelType: effectiveFuelType,
        powerLabel: "",
        powerCv: 0,
        motoCharacteristic: effectiveMotoCharacteristic,
      });
    }

    if (!effectiveDurationLabel || !effectivePowerLabel) return null;

    return calculateAutoQuote({
      zoneNom,
      categoryId: effectiveCategoryId,
      durationLabel: effectiveDurationLabel,
      fuelType: effectiveFuelType,
      powerLabel: effectivePowerLabel,
      powerCv: representativePowerCv,
    });
  }, [
    zoneNom,
    effectiveCategoryId,
    effectiveDurationLabel,
    effectiveFuelType,
    effectivePowerLabel,
    representativePowerCv,
    isMoto,
    effectiveMotoCharacteristic,
  ]);

  const devise = AUTO_INSURANCE_PRODUCT_DATA.document_info.devise;
  const breakdown = quoteResult?.breakdown;
  const breakdownTableRows = useMemo(
    () =>
      breakdown
        ? getAutoBreakdownTableRows(breakdown, devise, { isMoto })
        : [],
    [breakdown, devise, isMoto],
  );
  const canSubmit = quoteResult != null;

  const handleZoneChange = (value: string) => {
    setZoneNom(value);
    setCategoryId("");
    setDurationLabel("");
    setFuelType("essence");
    setPowerLabel("");
    setMotoCharacteristic("");
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setDurationLabel("");
    setFuelType("essence");
    setPowerLabel("");
    setMotoCharacteristic("");
  };

  const handleDurationChange = (value: string) => {
    setDurationLabel(value);
    setFuelType("essence");
    setPowerLabel("");
  };

  const handleFuelChange = (value: string) => {
    setFuelType(value as AutoFuelType);
    setPowerLabel("");
  };

  const handleSubmit = () => {
    if (!quoteResult) return;
    onSubmit(buildFormInput(), quoteResult);
  };

  function buildFormInput(): AutoQuoteFormInput {
    if (isMoto) {
      return {
        zoneNom,
        categoryId: effectiveCategoryId,
        durationLabel: "",
        fuelType: effectiveFuelType,
        powerLabel: "",
        powerCv: 0,
        motoCharacteristic: effectiveMotoCharacteristic,
      };
    }
    return {
      zoneNom,
      categoryId: effectiveCategoryId,
      durationLabel: effectiveDurationLabel,
      fuelType: effectiveFuelType,
      powerLabel: effectivePowerLabel,
      powerCv: representativePowerCv,
    };
  }

  return (
    <div className="space-y-6">
      <QuoteFormSection title="Cotation automobile" icon={CarIcon}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="auto-zone">Zone</Label>
            <Select
              id="auto-zone"
              value={zoneNom}
              onChange={handleZoneChange}
              options={zoneOptions}
              placeholder="Choisir une zone"
            />
          </div>

          <div>
            <Label htmlFor="auto-category">Catégorie</Label>
            <Select
              id="auto-category"
              value={effectiveCategoryId}
              onChange={handleCategoryChange}
              options={categoryOptions}
              placeholder="Choisir une catégorie"
            />
          </div>

          {isMoto ? (
            <div className="sm:col-span-2">
              <Label htmlFor="auto-moto">Caractéristique</Label>
              <Select
                id="auto-moto"
                value={effectiveMotoCharacteristic}
                onChange={setMotoCharacteristic}
                options={motoOptions}
                placeholder="Choisir une caractéristique"
              />
            </div>
          ) : (
            <>
              <div>
                <Label htmlFor="auto-duration">Durée</Label>
                <Select
                  id="auto-duration"
                  value={effectiveDurationLabel}
                  onChange={handleDurationChange}
                  options={durationOptions}
                  placeholder="Choisir une durée"
                />
              </div>

              <div>
                <Label htmlFor="auto-fuel">Puissance (Diesel ou Essence)</Label>
                <Select
                  id="auto-fuel"
                  value={effectiveFuelType}
                  onChange={handleFuelChange}
                  options={fuelOptions}
                  placeholder="Choisir le type"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="auto-power">Valeur puissance (CV)</Label>
                <Select
                  id="auto-power"
                  value={effectivePowerLabel}
                  onChange={setPowerLabel}
                  options={powerOptions}
                  placeholder="Choisir une tranche de puissance"
                  disabled={powerOptions.length === 0}
                />
              </div>
            </>
          )}
        </div>
      </QuoteFormSection>

      {breakdown ? (
        <QuoteFormSection title="Détail de la prime" icon={CarIcon}>
          <QuoteAmountBreakdownTable rows={breakdownTableRows} />
        </QuoteFormSection>
      ) : (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Complétez les critères pour afficher le détail de la prime.
        </p>
      )}

      <QuoteStepNavigation
        showPrevious={false}
        onNext={handleSubmit}
        nextLabel="Voir le récapitulatif"
        nextDisabled={!canSubmit}
      />
    </div>
  );
}
