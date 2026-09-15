import {
  ACCIDENTS_QUOTE_WIZARD_STEP_CODE_FORM,
  URL_PARAM_ACCIDENTS_CAPITAL_DECES,
  URL_PARAM_ACCIDENTS_CAPITAL_IPT,
  URL_PARAM_ACCIDENTS_CLASSE,
  URL_PARAM_ACCIDENTS_DUREE,
  URL_PARAM_ACCIDENTS_MOTO,
  URL_PARAM_ACCIDENTS_AGE,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { calculateAccidentsQuote } from "@/lib/accidents/calculate-accidents-quote";
import type {
  AccidentClass,
  AccidentQuoteFormInput,
  AccidentQuoteSession,
} from "@/types/accidents-insurance";

export function parseAccidentsQuoteFormFromSearchParams(
  sp: URLSearchParams,
): AccidentQuoteFormInput | null {
  const classeRaw = sp.get(URL_PARAM_ACCIDENTS_CLASSE);
  const capitalDecesRaw = sp.get(URL_PARAM_ACCIDENTS_CAPITAL_DECES);
  const capitalIptRaw = sp.get(URL_PARAM_ACCIDENTS_CAPITAL_IPT);
  const dureeRaw = sp.get(URL_PARAM_ACCIDENTS_DUREE);
  const motoRaw = sp.get(URL_PARAM_ACCIDENTS_MOTO);
  const ageRaw = sp.get(URL_PARAM_ACCIDENTS_AGE);

  const classe = classeRaw != null ? Number.parseInt(classeRaw, 10) : NaN;
  const capitalDeces =
    capitalDecesRaw != null ? Number.parseInt(capitalDecesRaw, 10) : NaN;
  const capitalIpt =
    capitalIptRaw != null ? Number.parseInt(capitalIptRaw, 10) : NaN;
  const dureeMois =
    dureeRaw != null ? Number.parseInt(dureeRaw, 10) : NaN;

  if (
    !Number.isFinite(classe) ||
    (classe < 1 || classe > 5) ||
    !Number.isFinite(capitalDeces) ||
    capitalDeces <= 0 ||
    !Number.isFinite(capitalIpt) ||
    capitalIpt <= 0 ||
    !Number.isFinite(dureeMois) ||
    dureeMois < 1 ||
    dureeMois > 12
  ) {
    return null;
  }

  return {
    classe: classe as AccidentClass,
    capital_deces: capitalDeces,
    capital_ipt: capitalIpt,
    duree_mois: dureeMois,
    has_majoration_25: motoRaw === "1",
    has_surprime_age: ageRaw === "1",
  };
}

export function parseAccidentsQuoteSessionFromSearchParams(
  sp: URLSearchParams,
): AccidentQuoteSession | null {
  const form = parseAccidentsQuoteFormFromSearchParams(sp);
  if (!form) return null;
  const quote = calculateAccidentsQuote(form);
  if (!quote) return null;
  return { form, quote };
}

export function buildAccidentsQuoteWizardSearchParams(opts: {
  stepCode: string;
  form: AccidentQuoteFormInput;
}): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, opts.stepCode);
  sp.set(URL_PARAM_ACCIDENTS_CLASSE, String(opts.form.classe));
  sp.set(URL_PARAM_ACCIDENTS_CAPITAL_DECES, String(opts.form.capital_deces));
  sp.set(URL_PARAM_ACCIDENTS_CAPITAL_IPT, String(opts.form.capital_ipt));
  sp.set(URL_PARAM_ACCIDENTS_DUREE, String(opts.form.duree_mois));
  sp.set(URL_PARAM_ACCIDENTS_MOTO, opts.form.has_majoration_25 ? "1" : "0");
  sp.set(URL_PARAM_ACCIDENTS_AGE, opts.form.has_surprime_age ? "1" : "0");
  return sp;
}

export function defaultAccidentsQuoteWizardSearchParams(): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, ACCIDENTS_QUOTE_WIZARD_STEP_CODE_FORM);
  return sp;
}
