"use client";

import { useMemo, useState } from "react";
import { CarIcon } from "lucide-react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { AUTO_INSURANCE_PRODUCT_DATA } from "@/lib/constants/auto_insurance";
import {
  powerCvMatchesLabel,
  representativePowerCvFromLabel,
} from "@/lib/auto/parse-power-range";
import type {
  AutoCategory,
  AutoDtaRow,
  AutoFuelType,
  AutoQuoteFormInput,
  AutoQuoteResult,
  AutoTarifRow,
  AutoZone,
} from "@/types/auto-insurance";

// ==========================================
// 1. HELPERS & UTILS AUTO
// ==========================================

function findZone(zoneNom: string): AutoZone | undefined {
  return AUTO_INSURANCE_PRODUCT_DATA.zones.find((z) => z.nom === zoneNom);
}

function findCategory(zone: AutoZone, categoryId: string): AutoCategory | undefined {
  return zone.categories.find((c) => c.id === categoryId);
}

function findDtaAmount(dtaTable: AutoDtaRow[] | undefined, powerCv: number): number {
  if (!dtaTable?.length || !Number.isFinite(powerCv) || powerCv <= 0) return 0;

  const row = dtaTable.find((entry) => {
    const aboveMin = powerCv >= entry.min_cv;
    const belowMax = entry.max_cv == null || powerCv <= entry.max_cv;
    return aboveMin && belowMax;
  });

  return row?.montant ?? 0;
}

function powerLabelForTarif(
  tarif: AutoTarifRow,
  fuelType: AutoQuoteFormInput["fuelType"],
): string | null {
  return fuelType === "diesel" ? tarif.puissance_diesel : tarif.puissance_essence;
}

function findTarifRowByLabel(
  tarifs: AutoTarifRow[],
  fuelType: AutoQuoteFormInput["fuelType"],
  powerLabel: string,
): AutoTarifRow | undefined {
  return tarifs.find(
    (tarif) => powerLabelForTarif(tarif, fuelType) === powerLabel,
  );
}

function findTarifRow(
  tarifs: AutoTarifRow[],
  fuelType: AutoQuoteFormInput["fuelType"],
  powerCv: number,
): AutoTarifRow | undefined {
  return tarifs.find((tarif) => {
    const label = powerLabelForTarif(tarif, fuelType);
    if (!label) return false;
    return powerCvMatchesLabel(powerCv, label);
  });
}

function buildBreakdown(
  details: {
    rc: number;
    dr: number;
    ipt: number | null;
    prime_nette: number;
    accessoires: number;
    fichier_central: number | null;
    tva: number;
    carte_rose: number;
    prime_ttc: number;
  },
  dta: number,
) {
  const ipt = details.ipt ?? 0;
  const fichierCentral = details.fichier_central ?? 0;

  return {
    rc: details.rc,
    dr: details.dr,
    ipt,
    prime_annuelle: details.rc + details.dr + ipt,
    prime_nette: details.prime_nette,
    accessoires: details.accessoires,
    fichier_central: fichierCentral,
    tva: details.tva,
    carte_rose: details.carte_rose,
    prime_ttc: details.prime_ttc,
    dta,
    total_a_payer: details.prime_ttc + dta,
  };
}

export function calculateAutoQuote(
  input: AutoQuoteFormInput,
): AutoQuoteResult | null {
  const zone = findZone(input.zoneNom);
  if (!zone) return null;

  const category = findCategory(zone, input.categoryId);
  if (!category) return null;

  const devise = AUTO_INSURANCE_PRODUCT_DATA.document_info.devise;

  if (category.tarifs_motos?.length) {
    const moto = category.tarifs_motos.find(
      (row) => row.caracteristique === input.motoCharacteristic,
    );
    if (!moto) return null;

    return {
      zoneNom: zone.nom,
      categoryId: category.id,
      categoryNom: category.nom,
      categoryDescription: category.description,
      motoCharacteristic: moto.caracteristique,
      devise,
      breakdown: buildBreakdown(
        {
          rc: 0,
          dr: 0,
          ipt: 0,
          prime_nette: moto.prime_ttc_annuelle,
          accessoires: 0,
          fichier_central: 0,
          tva: 0,
          carte_rose: 0,
          prime_ttc: moto.prime_ttc_annuelle,
        },
        0,
      ),
    };
  }

  const duration = category.durees?.find((d) => d.label === input.durationLabel);
  if (!duration) return null;

  const tarif = input.powerLabel
    ? findTarifRowByLabel(duration.tarifs, input.fuelType, input.powerLabel)
    : findTarifRow(duration.tarifs, input.fuelType, input.powerCv);
  if (!tarif) return null;

  const powerLabel =
    powerLabelForTarif(tarif, input.fuelType) ?? input.powerLabel;

  const powerCv =
    input.powerCv > 0
      ? input.powerCv
      : representativePowerCvFromLabel(powerLabel);

  const dta = findDtaAmount(category.dta_table, powerCv);

  return {
    zoneNom: zone.nom,
    categoryId: category.id,
    categoryNom: category.nom,
    categoryDescription: category.description,
    durationLabel: duration.label,
    durationJours: duration.jours,
    fuelType: input.fuelType,
    powerCv,
    powerLabel: powerLabel ?? undefined,
    devise,
    breakdown: buildBreakdown(tarif.details_prime, dta),
  };
}

export function getAutoZoneOptions(): { value: string; label: string }[] {
  return AUTO_INSURANCE_PRODUCT_DATA.zones.map((zone) => ({
    value: zone.nom,
    label: zone.nom,
  }));
}

export function getAutoCategoryOptions(zoneNom: string): { value: string; label: string }[] {
  const zone = findZone(zoneNom);
  if (!zone) return [];
  return zone.categories.map((category) => ({
    value: category.id,
    label: category.nom,
  }));
}

export function getAutoDurationOptions(zoneNom: string, categoryId: string): { value: string; label: string }[] {
  const zone = findZone(zoneNom);
  const category = zone ? findCategory(zone, categoryId) : undefined;
  return (
    category?.durees?.map((duration) => ({
      value: duration.label,
      label: duration.label,
    })) ?? []
  );
}

export function getAutoMotoOptions(zoneNom: string, categoryId: string): { value: string; label: string }[] {
  const zone = findZone(zoneNom);
  const category = zone ? findCategory(zone, categoryId) : undefined;
  return (
    category?.tarifs_motos?.map((row) => ({
      value: row.caracteristique,
      label: row.caracteristique,
    })) ?? []
  );
}

export function isAutoMotoCategory(zoneNom: string, categoryId: string): boolean {
  const zone = findZone(zoneNom);
  const category = zone ? findCategory(zone, categoryId) : undefined;
  return Boolean(category?.tarifs_motos?.length);
}

export function getAutoPowerOptions(
  zoneNom: string,
  categoryId: string,
  durationLabel: string,
  fuelType: AutoFuelType,
): { value: string; label: string }[] {
  const zone = findZone(zoneNom);
  const category = zone ? findCategory(zone, categoryId) : undefined;
  const duration = category?.durees?.find((d) => d.label === durationLabel);
  if (!duration) return [];

  return duration.tarifs
    .map((tarif) => powerLabelForTarif(tarif, fuelType))
    .filter((label): label is string => Boolean(label))
    .map((label) => ({ value: label, label }));
}

export function getAutoFuelTypeOptions(
  zoneNom: string,
  categoryId: string,
  durationLabel: string,
): { value: AutoFuelType; label: string }[] {
  const options: { value: AutoFuelType; label: string }[] = [];
  if (
    getAutoPowerOptions(zoneNom, categoryId, durationLabel, "essence").length
  ) {
    options.push({ value: "essence", label: "Essence" });
  }
  if (getAutoPowerOptions(zoneNom, categoryId, durationLabel, "diesel").length) {
    options.push({ value: "diesel", label: "Diesel" });
  }
  return options;
}
interface AutoQuoteFormStepProps {
  initialForm?: AutoQuoteFormInput | null;
  onSubmit: (form: AutoQuoteFormInput, quote: AutoQuoteResult) => void;
}

export function AutoQuoteFormStep({ initialForm, onSubmit }: AutoQuoteFormStepProps) {
  const zoneOptions = useMemo(() => getAutoZoneOptions(), []);

  const [zoneNom, setZoneNom] = useState(initialForm?.zoneNom ?? "");
  const [categoryId, setCategoryId] = useState(initialForm?.categoryId ?? "");
  const [durationLabel, setDurationLabel] = useState(initialForm?.durationLabel ?? "");
  const [fuelType, setFuelType] = useState<"" | AutoFuelType>(initialForm?.fuelType ?? "");
  
  const [powerCvInput, setPowerCvInput] = useState<string>(
    initialForm?.powerCv ? String(initialForm.powerCv) : ""
  );
  
  const [motoCharacteristic, setMotoCharacteristic] = useState(
    initialForm?.motoCharacteristic ?? ""
  );

  const hasExplicitZone =
    zoneNom !== "" && zoneOptions.some((option: { value: string }) => option.value === zoneNom);

  const categoryOptions = useMemo(
    () => (hasExplicitZone ? getAutoCategoryOptions(zoneNom) : []),
    [hasExplicitZone, zoneNom],
  );
  const hasExplicitCategory =
    categoryId !== "" &&
    categoryOptions.some((option: { value: string }) => option.value === categoryId);

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
    durationOptions.some((option: { value: string }) => option.value === durationLabel);

  const fuelOptions = useMemo(
    () =>
      hasExplicitZone && hasExplicitCategory && hasExplicitDuration
        ? getAutoFuelTypeOptions(zoneNom, categoryId, durationLabel)
        : [],
    [hasExplicitZone, hasExplicitCategory, hasExplicitDuration, zoneNom, categoryId, durationLabel],
  );
  const hasExplicitFuel =
    fuelType !== "" && fuelOptions.some((option: { value: string }) => option.value === fuelType);

  const powerOptions = useMemo(
    () =>
      hasExplicitZone && hasExplicitCategory && hasExplicitDuration && hasExplicitFuel
        ? getAutoPowerOptions(zoneNom, categoryId, durationLabel, fuelType)
        : [],
    [hasExplicitZone, hasExplicitCategory, hasExplicitDuration, hasExplicitFuel, zoneNom, categoryId, durationLabel, fuelType],
  );

  const motoOptions = useMemo(
    () =>
      hasExplicitZone && hasExplicitCategory && isMoto
        ? getAutoMotoOptions(zoneNom, categoryId)
        : [],
    [hasExplicitZone, hasExplicitCategory, isMoto, zoneNom, categoryId],
  );
  const hasExplicitMoto =
    motoCharacteristic !== "" &&
    motoOptions.some((option: { value: string }) => option.value === motoCharacteristic);

  const parsedPowerCv = useMemo(() => {
    const val = parseInt(powerCvInput, 10);
    return isNaN(val) || val <= 0 ? 0 : val;
  }, [powerCvInput]);

  const powerLabel = useMemo(() => {
    if (parsedPowerCv === 0 || powerOptions.length === 0) return "";

    const matchedOption = powerOptions.find((opt: { label: string; value: string }) => {
      const match = opt.label.match(/\d+/g);
      if (!match) return false;
      
      if (opt.label.includes("Jusqu'à") || opt.label.includes("jusqu'à")) {
        return parsedPowerCv <= parseInt(match[0], 10);
      }
      if (opt.label.includes("ET +") || opt.label.includes("et +")) {
        return parsedPowerCv >= parseInt(match[0], 10);
      }
      if (match.length >= 2) {
        const min = parseInt(match[0], 10);
        const max = parseInt(match[1], 10);
        return parsedPowerCv >= min && parsedPowerCv <= max;
      }
      return false;
    });

    return matchedOption ? matchedOption.value : powerOptions[0]?.value ?? "";
  }, [parsedPowerCv, powerOptions]);

  const hasValidPower = parsedPowerCv > 0 && powerLabel !== "";

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

    if (!hasExplicitDuration || !hasExplicitFuel || !hasValidPower) return null;

    return calculateAutoQuote({
      zoneNom,
      categoryId,
      durationLabel,
      fuelType,
      powerLabel,
      powerCv: parsedPowerCv,
    });
  }, [
    hasExplicitZone,
    hasExplicitCategory,
    hasExplicitDuration,
    hasExplicitFuel,
    hasValidPower,
    hasExplicitMoto,
    isMoto,
    zoneNom,
    categoryId,
    durationLabel,
    fuelType,
    powerLabel,
    parsedPowerCv,
    motoCharacteristic,
  ]);

  const canSubmit = quoteResult != null;

  const handleZoneChange = (value: string) => {
    setZoneNom(value);
    setCategoryId("");
    setDurationLabel("");
    setFuelType("");
    setPowerCvInput("");
    setMotoCharacteristic("");
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setDurationLabel("");
    setFuelType("");
    setPowerCvInput("");
    setMotoCharacteristic("");
  };

  const handleDurationChange = (value: string) => {
    setDurationLabel(value);
    setFuelType("");
    setPowerCvInput("");
  };

  const handleFuelChange = (value: string) => {
    setFuelType(value as AutoFuelType);
    setPowerCvInput("");
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
      powerCv: parsedPowerCv,
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
                <Label htmlFor="auto-fuel">Énergie (Diesel ou Essence)</Label>
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
                <Label htmlFor="auto-power">Puissance (CV)</Label>
                <Input
                  id="auto-power"
                  type="number"
                  min={1}
                  max={99}
                  value={powerCvInput}
                  onChange={(e) => setPowerCvInput(e.target.value)}
                  placeholder="Ex: 2"
                  disabled={!hasExplicitFuel}
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











// "use client";

// import { useMemo, useState } from "react";
// import { CarIcon } from "lucide-react";

// import Label from "@/components/form/Label";
// import Select from "@/components/form/Select";
// import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
// import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
// import {
//   calculateAutoQuote,
//   getAutoCategoryOptions,
//   getAutoDurationOptions,
//   getAutoFuelTypeOptions,
//   getAutoMotoOptions,
//   getAutoPowerOptions,
//   getAutoZoneOptions,
//   isAutoMotoCategory,
// } from "@/lib/auto/calculate-auto-quote";
// import { representativePowerCvFromLabel } from "@/lib/auto/parse-power-range";
// import type { AutoFuelType, AutoQuoteFormInput, AutoQuoteResult } from "@/types/auto-insurance";

// interface AutoQuoteFormStepProps {
//   initialForm?: AutoQuoteFormInput | null;
//   onSubmit: (form: AutoQuoteFormInput, quote: AutoQuoteResult) => void;
// }

// export function AutoQuoteFormStep({ initialForm, onSubmit }: AutoQuoteFormStepProps) {
//   const zoneOptions = useMemo(() => getAutoZoneOptions(), []);

//   const [zoneNom, setZoneNom] = useState(initialForm?.zoneNom ?? "");
//   const [categoryId, setCategoryId] = useState(initialForm?.categoryId ?? "");
//   const [durationLabel, setDurationLabel] = useState(initialForm?.durationLabel ?? "");
//   const [fuelType, setFuelType] = useState<"" | AutoFuelType>(
//     initialForm?.fuelType ?? "",
//   );
//   const [powerLabel, setPowerLabel] = useState(initialForm?.powerLabel ?? "");
//   const [motoCharacteristic, setMotoCharacteristic] = useState(
//     initialForm?.motoCharacteristic ?? "",
//   );

//   const hasExplicitZone =
//     zoneNom !== "" && zoneOptions.some((option) => option.value === zoneNom);

//   const categoryOptions = useMemo(
//     () => (hasExplicitZone ? getAutoCategoryOptions(zoneNom) : []),
//     [hasExplicitZone, zoneNom],
//   );
//   const hasExplicitCategory =
//     categoryId !== "" &&
//     categoryOptions.some((option) => option.value === categoryId);

//   const isMoto = useMemo(
//     () =>
//       hasExplicitZone && hasExplicitCategory
//         ? isAutoMotoCategory(zoneNom, categoryId)
//         : false,
//     [hasExplicitZone, hasExplicitCategory, zoneNom, categoryId],
//   );

//   const durationOptions = useMemo(
//     () =>
//       hasExplicitZone && hasExplicitCategory && !isMoto
//         ? getAutoDurationOptions(zoneNom, categoryId)
//         : [],
//     [hasExplicitZone, hasExplicitCategory, isMoto, zoneNom, categoryId],
//   );
//   const hasExplicitDuration =
//     durationLabel !== "" &&
//     durationOptions.some((option) => option.value === durationLabel);

//   const fuelOptions = useMemo(
//     () =>
//       hasExplicitZone && hasExplicitCategory && hasExplicitDuration
//         ? getAutoFuelTypeOptions(zoneNom, categoryId, durationLabel)
//         : [],
//     [
//       hasExplicitZone,
//       hasExplicitCategory,
//       hasExplicitDuration,
//       zoneNom,
//       categoryId,
//       durationLabel,
//     ],
//   );
//   const hasExplicitFuel =
//     fuelType !== "" && fuelOptions.some((option) => option.value === fuelType);

//   const powerOptions = useMemo(
//     () =>
//       hasExplicitZone &&
//       hasExplicitCategory &&
//       hasExplicitDuration &&
//       hasExplicitFuel
//         ? getAutoPowerOptions(zoneNom, categoryId, durationLabel, fuelType)
//         : [],
//     [
//       hasExplicitZone,
//       hasExplicitCategory,
//       hasExplicitDuration,
//       hasExplicitFuel,
//       zoneNom,
//       categoryId,
//       durationLabel,
//       fuelType,
//     ],
//   );
//   const hasExplicitPower =
//     powerLabel !== "" &&
//     powerOptions.some((option) => option.value === powerLabel);

//   const motoOptions = useMemo(
//     () =>
//       hasExplicitZone && hasExplicitCategory && isMoto
//         ? getAutoMotoOptions(zoneNom, categoryId)
//         : [],
//     [hasExplicitZone, hasExplicitCategory, isMoto, zoneNom, categoryId],
//   );
//   const hasExplicitMoto =
//     motoCharacteristic !== "" &&
//     motoOptions.some((option) => option.value === motoCharacteristic);

//   const representativePowerCv = useMemo(
//     () => (hasExplicitPower ? representativePowerCvFromLabel(powerLabel) : 0),
//     [hasExplicitPower, powerLabel],
//   );

//   const quoteResult = useMemo(() => {
//     if (!hasExplicitZone || !hasExplicitCategory) return null;

//     if (isMoto) {
//       if (!hasExplicitMoto) return null;
//       return calculateAutoQuote({
//         zoneNom,
//         categoryId,
//         durationLabel: "",
//         fuelType: "essence",
//         powerLabel: "",
//         powerCv: 0,
//         motoCharacteristic,
//       });
//     }

//     if (!hasExplicitDuration || !hasExplicitFuel || !hasExplicitPower) return null;

//     return calculateAutoQuote({
//       zoneNom,
//       categoryId,
//       durationLabel,
//       fuelType,
//       powerLabel,
//       powerCv: representativePowerCv,
//     });
//   }, [
//     hasExplicitZone,
//     hasExplicitCategory,
//     hasExplicitDuration,
//     hasExplicitFuel,
//     hasExplicitPower,
//     hasExplicitMoto,
//     isMoto,
//     zoneNom,
//     categoryId,
//     durationLabel,
//     fuelType,
//     powerLabel,
//     motoCharacteristic,
//     representativePowerCv,
//   ]);

//   const canSubmit = quoteResult != null;

//   const handleZoneChange = (value: string) => {
//     setZoneNom(value);
//     setCategoryId("");
//     setDurationLabel("");
//     setFuelType("");
//     setPowerLabel("");
//     setMotoCharacteristic("");
//   };

//   const handleCategoryChange = (value: string) => {
//     setCategoryId(value);
//     setDurationLabel("");
//     setFuelType("");
//     setPowerLabel("");
//     setMotoCharacteristic("");
//   };

//   const handleDurationChange = (value: string) => {
//     setDurationLabel(value);
//     setFuelType("");
//     setPowerLabel("");
//   };

//   const handleFuelChange = (value: string) => {
//     setFuelType(value as AutoFuelType);
//     setPowerLabel("");
//   };

//   const handleSubmit = () => {
//     if (!quoteResult) return;
//     onSubmit(buildFormInput(), quoteResult);
//   };

//   function buildFormInput(): AutoQuoteFormInput {
//     if (isMoto) {
//       return {
//         zoneNom,
//         categoryId,
//         durationLabel: "",
//         fuelType: "essence",
//         powerLabel: "",
//         powerCv: 0,
//         motoCharacteristic,
//       };
//     }
//     return {
//       zoneNom,
//       categoryId,
//       durationLabel,
//       fuelType: fuelType as AutoFuelType,
//       powerLabel,
//       powerCv: representativePowerCv,
//     };
//   }

//   return (
//     <div className="space-y-6">
//       <QuoteFormSection title="Cotation automobile" icon={CarIcon}>
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//           <div>
//             <Label htmlFor="auto-zone">Zone</Label>
//             <Select
//               id="auto-zone"
//               value={hasExplicitZone ? zoneNom : ""}
//               onChange={handleZoneChange}
//               options={zoneOptions}
//               placeholder="Choisir une zone"
//             />
//           </div>

//           <div>
//             <Label htmlFor="auto-category">Catégorie</Label>
//             <Select
//               id="auto-category"
//               value={hasExplicitCategory ? categoryId : ""}
//               onChange={handleCategoryChange}
//               options={categoryOptions}
//               placeholder="Choisir une catégorie"
//               disabled={!hasExplicitZone || categoryOptions.length === 0}
//             />
//           </div>

//           {isMoto ? (
//             <div className="sm:col-span-2">
//               <Label htmlFor="auto-moto">Caractéristique</Label>
//               <Select
//                 id="auto-moto"
//                 value={hasExplicitMoto ? motoCharacteristic : ""}
//                 onChange={setMotoCharacteristic}
//                 options={motoOptions}
//                 placeholder="Choisir une caractéristique"
//                 disabled={motoOptions.length === 0}
//               />
//             </div>
//           ) : (
//             <>
//               <div>
//                 <Label htmlFor="auto-duration">Durée</Label>
//                 <Select
//                   id="auto-duration"
//                   value={hasExplicitDuration ? durationLabel : ""}
//                   onChange={handleDurationChange}
//                   options={durationOptions}
//                   placeholder="Choisir une durée"
//                   disabled={!hasExplicitCategory || durationOptions.length === 0}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="auto-fuel">Puissance (Diesel ou Essence)</Label>
//                 <Select
//                   id="auto-fuel"
//                   value={hasExplicitFuel ? fuelType : ""}
//                   onChange={handleFuelChange}
//                   options={fuelOptions}
//                   placeholder="Choisir le type"
//                   disabled={!hasExplicitDuration || fuelOptions.length === 0}
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <Label htmlFor="auto-power">Valeur puissance (CV)</Label>
//                 <Select
//                   id="auto-power"
//                   value={hasExplicitPower ? powerLabel : ""}
//                   onChange={setPowerLabel}
//                   options={powerOptions}
//                   placeholder="Choisir une valeur de puissance"
//                   disabled={!hasExplicitFuel || powerOptions.length === 0}
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       </QuoteFormSection>

//       <QuoteStepNavigation
//         showPrevious={false}
//         onNext={handleSubmit}
//         nextLabel="Obtenir un devis"
//         nextDisabled={!canSubmit}
//       />
//     </div>
//   );
// }
