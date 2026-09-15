import { HELEP_INSURANCE_DATA } from "@/lib/constants/helep_insurance";
import type {
  HelepFormule,
  HelepFormuleId,
  HelepQuoteFormInput,
  HelepQuoteResult,
} from "@/types/helep-insurance";

const DATA = HELEP_INSURANCE_DATA;

function findFormule(formuleId: string): HelepFormule | undefined {
  return DATA.formules.find((f) => f.id === formuleId);
}

function isValidFormuleId(formuleId: string): formuleId is HelepFormuleId {
  return findFormule(formuleId) != null;
}

export function calculateHelepQuote(
  input: HelepQuoteFormInput,
): HelepQuoteResult | null {
  const formule = findFormule(input.formuleId);
  if (!formule) return null;

  return {
    productName: DATA.document_info.titre,
    devise: DATA.document_info.devise,
    breakdown: {
      formuleId: formule.id,
      formuleLabel: formule.label,
      capital_personnes: formule.capital_personnes,
      capital_engagements: formule.capital_engagements,
      capital_total: formule.capital_personnes + formule.capital_engagements,
      prime_annuelle: formule.prime_annuelle,
    },
  };
}

export function getHelepFormuleOptions(): {
  value: string;
  label: string;
}[] {
  return DATA.formules.map((f) => ({
    value: f.id,
    label: `${f.label} – ${f.capital_personnes.toLocaleString("fr-FR")} ${DATA.document_info.devise} / formule`,
  }));
}

export function parseHelepFormuleId(value: string): HelepFormuleId | null {
  return isValidFormuleId(value) ? value : null;
}
