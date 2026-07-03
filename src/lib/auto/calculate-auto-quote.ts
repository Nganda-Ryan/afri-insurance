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

/** Calcule un devis auto : zone → catégorie → durée → tranche de puissance + DTA. */
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

export function getAutoZoneOptions() {
  return AUTO_INSURANCE_PRODUCT_DATA.zones.map((zone) => ({
    value: zone.nom,
    label: zone.nom,
  }));
}

export function getAutoCategoryOptions(zoneNom: string) {
  const zone = findZone(zoneNom);
  if (!zone) return [];
  return zone.categories.map((category) => ({
    value: category.id,
    label: category.nom,
  }));
}

export function getAutoDurationOptions(zoneNom: string, categoryId: string) {
  const zone = findZone(zoneNom);
  const category = zone ? findCategory(zone, categoryId) : undefined;
  return (
    category?.durees?.map((duration) => ({
      value: duration.label,
      label: duration.label,
    })) ?? []
  );
}

export function getAutoMotoOptions(zoneNom: string, categoryId: string) {
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
) {
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
) {
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
