import { HEMLE_INSURANCE_DATA } from "@/lib/constants/hemle_insurance";
import type {
  HemleFormule,
  HemleFormuleId,
  HemleOptionId,
  HemleQuoteFormInput,
  HemleQuoteResult,
} from "@/types/hemle-insurance";

const DATA = HEMLE_INSURANCE_DATA;

function findFormule(formuleId: string): HemleFormule | undefined {
  return DATA.formules.find((f) => f.id === formuleId);
}

export function parseHemleFormuleId(value: string): HemleFormuleId | null {
  return findFormule(value) != null ? (value as HemleFormuleId) : null;
}

export function parseHemleOptionId(value: string): HemleOptionId | null {
  const known: HemleOptionId[] = ["ESSENTIEL", "CONFORT", "PREMIUM"];
  return known.includes(value as HemleOptionId)
    ? (value as HemleOptionId)
    : null;
}

export function isHemleOptionAvailable(
  formuleId: HemleFormuleId,
  optionId: HemleOptionId,
): boolean {
  const formule = findFormule(formuleId);
  return formule?.tarifs.some((t) => t.optionId === optionId) ?? false;
}

export function calculateHemleQuote(
  input: HemleQuoteFormInput,
): HemleQuoteResult | null {
  const formule = findFormule(input.formuleId);
  if (!formule) return null;

  const tarif = formule.tarifs.find((t) => t.optionId === input.optionId);
  if (!tarif) return null;

  const enfantInclus = input.avecEnfant;
  const capitalEnfant = enfantInclus ? DATA.enfant.capital_garanti : 0;
  const primeEnfant = enfantInclus ? DATA.enfant.prime_annuelle : 0;

  return {
    productName: DATA.document_info.titre,
    devise: DATA.document_info.devise,
    breakdown: {
      formuleId: formule.id,
      formuleLabel: formule.label,
      couverture: formule.couverture,
      optionId: tarif.optionId,
      optionLabel: tarif.optionLabel,
      capital_garanti: tarif.capital_garanti,
      prime_annuelle: tarif.prime_annuelle,
      enfant: enfantInclus
        ? {
            label: DATA.enfant.label,
            couverture: DATA.enfant.couverture,
            capital_garanti: DATA.enfant.capital_garanti,
            prime_annuelle: DATA.enfant.prime_annuelle,
          }
        : null,
      capital_total: tarif.capital_garanti + capitalEnfant,
      prime_totale: tarif.prime_annuelle + primeEnfant,
    },
  };
}

export function getHemleFormuleOptions(): {
  value: string;
  label: string;
}[] {
  return DATA.formules.map((f) => ({
    value: f.id,
    label: `${f.label} – ${f.couverture}`,
  }));
}

export function getHemleOptionOptions(formuleId: HemleFormuleId | null): {
  value: string;
  label: string;
}[] {
  const formule = formuleId ? findFormule(formuleId) : undefined;
  if (!formule) return [];
  return formule.tarifs.map((t) => ({
    value: t.optionId,
    label: `${t.optionLabel} – Capital ${t.capital_garanti.toLocaleString("fr-FR")} ${DATA.document_info.devise}`,
  }));
}
