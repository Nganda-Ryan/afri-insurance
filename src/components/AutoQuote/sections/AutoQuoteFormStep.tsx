"use client";

import { useMemo, useState } from "react";
import { CarIcon } from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
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
import type { AutoFuelType, AutoQuoteFormInput, AutoQuoteResult } from "@/types/auto-insurance";

interface AutoQuoteFormStepProps {
  initialForm?: AutoQuoteFormInput | null;
  onSubmit: (form: AutoQuoteFormInput, quote: AutoQuoteResult) => void;
}

export function AutoQuoteFormStep({ initialForm, onSubmit }: AutoQuoteFormStepProps) {
  const zoneOptions = useMemo(() => getAutoZoneOptions(), []);

  const [zoneNom, setZoneNom] = useState(initialForm?.zoneNom ?? "");
  const [categoryId, setCategoryId] = useState(initialForm?.categoryId ?? "");
  const [durationLabel, setDurationLabel] = useState(initialForm?.durationLabel ?? "");
  const [fuelType, setFuelType] = useState<"" | AutoFuelType>(
    initialForm?.fuelType ?? "",
  );
  const [powerLabel, setPowerLabel] = useState(initialForm?.powerLabel ?? "");
  const [motoCharacteristic, setMotoCharacteristic] = useState(
    initialForm?.motoCharacteristic ?? "",
  );

  const hasExplicitZone =
    zoneNom !== "" && zoneOptions.some((option) => option.value === zoneNom);

  const categoryOptions = useMemo(
    () => (hasExplicitZone ? getAutoCategoryOptions(zoneNom) : []),
    [hasExplicitZone, zoneNom],
  );
  const hasExplicitCategory =
    categoryId !== "" &&
    categoryOptions.some((option) => option.value === categoryId);

  const isMoto = useMemo(
    () =>
      hasExplicitZone && hasExplicitCategory
        ? isAutoMotoCategory(zoneNom, categoryId)
        : false,
    [hasExplicitZone, hasExplicitCategory, zoneNom, categoryId],
  );

  const durationOptions = useMemo(
    () =>
      hasExplicitZone && hasExplicitCategory && !isMoto
        ? getAutoDurationOptions(zoneNom, categoryId)
        : [],
    [hasExplicitZone, hasExplicitCategory, isMoto, zoneNom, categoryId],
  );
  const hasExplicitDuration =
    durationLabel !== "" &&
    durationOptions.some((option) => option.value === durationLabel);

  const fuelOptions = useMemo(
    () =>
      hasExplicitZone && hasExplicitCategory && hasExplicitDuration
        ? getAutoFuelTypeOptions(zoneNom, categoryId, durationLabel)
        : [],
    [
      hasExplicitZone,
      hasExplicitCategory,
      hasExplicitDuration,
      zoneNom,
      categoryId,
      durationLabel,
    ],
  );
  const hasExplicitFuel =
    fuelType !== "" && fuelOptions.some((option) => option.value === fuelType);

  const powerOptions = useMemo(
    () =>
      hasExplicitZone &&
      hasExplicitCategory &&
      hasExplicitDuration &&
      hasExplicitFuel
        ? getAutoPowerOptions(zoneNom, categoryId, durationLabel, fuelType)
        : [],
    [
      hasExplicitZone,
      hasExplicitCategory,
      hasExplicitDuration,
      hasExplicitFuel,
      zoneNom,
      categoryId,
      durationLabel,
      fuelType,
    ],
  );
  const hasExplicitPower =
    powerLabel !== "" &&
    powerOptions.some((option) => option.value === powerLabel);

  const motoOptions = useMemo(
    () =>
      hasExplicitZone && hasExplicitCategory && isMoto
        ? getAutoMotoOptions(zoneNom, categoryId)
        : [],
    [hasExplicitZone, hasExplicitCategory, isMoto, zoneNom, categoryId],
  );
  const hasExplicitMoto =
    motoCharacteristic !== "" &&
    motoOptions.some((option) => option.value === motoCharacteristic);

  const representativePowerCv = useMemo(
    () => (hasExplicitPower ? representativePowerCvFromLabel(powerLabel) : 0),
    [hasExplicitPower, powerLabel],
  );

  const quoteResult = useMemo(() => {
    if (!hasExplicitZone || !hasExplicitCategory) return null;

    if (isMoto) {
      if (!hasExplicitMoto) return null;
      return calculateAutoQuote({
        zoneNom,
        categoryId,
        durationLabel: "",
        fuelType: "essence",
        powerLabel: "",
        powerCv: 0,
        motoCharacteristic,
      });
    }

    if (!hasExplicitDuration || !hasExplicitFuel || !hasExplicitPower) return null;

    return calculateAutoQuote({
      zoneNom,
      categoryId,
      durationLabel,
      fuelType,
      powerLabel,
      powerCv: representativePowerCv,
    });
  }, [
    hasExplicitZone,
    hasExplicitCategory,
    hasExplicitDuration,
    hasExplicitFuel,
    hasExplicitPower,
    hasExplicitMoto,
    isMoto,
    zoneNom,
    categoryId,
    durationLabel,
    fuelType,
    powerLabel,
    motoCharacteristic,
    representativePowerCv,
  ]);

  const canSubmit = quoteResult != null;

  const handleZoneChange = (value: string) => {
    setZoneNom(value);
    setCategoryId("");
    setDurationLabel("");
    setFuelType("");
    setPowerLabel("");
    setMotoCharacteristic("");
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setDurationLabel("");
    setFuelType("");
    setPowerLabel("");
    setMotoCharacteristic("");
  };

  const handleDurationChange = (value: string) => {
    setDurationLabel(value);
    setFuelType("");
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
        categoryId,
        durationLabel: "",
        fuelType: "essence",
        powerLabel: "",
        powerCv: 0,
        motoCharacteristic,
      };
    }
    return {
      zoneNom,
      categoryId,
      durationLabel,
      fuelType: fuelType as AutoFuelType,
      powerLabel,
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
              value={hasExplicitZone ? zoneNom : ""}
              onChange={handleZoneChange}
              options={zoneOptions}
              placeholder="Choisir une zone"
            />
          </div>

          <div>
            <Label htmlFor="auto-category">Catégorie</Label>
            <Select
              id="auto-category"
              value={hasExplicitCategory ? categoryId : ""}
              onChange={handleCategoryChange}
              options={categoryOptions}
              placeholder="Choisir une catégorie"
              disabled={!hasExplicitZone || categoryOptions.length === 0}
            />
          </div>

          {isMoto ? (
            <div className="sm:col-span-2">
              <Label htmlFor="auto-moto">Caractéristique</Label>
              <Select
                id="auto-moto"
                value={hasExplicitMoto ? motoCharacteristic : ""}
                onChange={setMotoCharacteristic}
                options={motoOptions}
                placeholder="Choisir une caractéristique"
                disabled={motoOptions.length === 0}
              />
            </div>
          ) : (
            <>
              <div>
                <Label htmlFor="auto-duration">Durée</Label>
                <Select
                  id="auto-duration"
                  value={hasExplicitDuration ? durationLabel : ""}
                  onChange={handleDurationChange}
                  options={durationOptions}
                  placeholder="Choisir une durée"
                  disabled={!hasExplicitCategory || durationOptions.length === 0}
                />
              </div>

              <div>
                <Label htmlFor="auto-fuel">Puissance (Diesel ou Essence)</Label>
                <Select
                  id="auto-fuel"
                  value={hasExplicitFuel ? fuelType : ""}
                  onChange={handleFuelChange}
                  options={fuelOptions}
                  placeholder="Choisir le type"
                  disabled={!hasExplicitDuration || fuelOptions.length === 0}
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="auto-power">Valeur puissance (CV)</Label>
                <Select
                  id="auto-power"
                  value={hasExplicitPower ? powerLabel : ""}
                  onChange={setPowerLabel}
                  options={powerOptions}
                  placeholder="Choisir une valeur de puissance"
                  disabled={!hasExplicitFuel || powerOptions.length === 0}
                />
              </div>
            </>
          )}
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
