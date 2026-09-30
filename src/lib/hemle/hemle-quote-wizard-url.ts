import {
  HEMLE_QUOTE_WIZARD_STEP_CODE_FORM,
  URL_PARAM_HEMLE_ENFANT,
  URL_PARAM_HEMLE_FORMULE,
  URL_PARAM_HEMLE_OPTION,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import {
  calculateHemleQuote,
  isHemleOptionAvailable,
  parseHemleFormuleId,
  parseHemleOptionId,
} from "@/lib/hemle/calculate-hemle-quote";
import type {
  HemleQuoteFormInput,
  HemleQuoteSession,
} from "@/types/hemle-insurance";

export function parseHemleQuoteFormFromSearchParams(
  sp: URLSearchParams,
): HemleQuoteFormInput | null {
  const formuleId = parseHemleFormuleId(
    sp.get(URL_PARAM_HEMLE_FORMULE)?.trim() ?? "",
  );
  const optionId = parseHemleOptionId(
    sp.get(URL_PARAM_HEMLE_OPTION)?.trim() ?? "",
  );

  if (!formuleId || !optionId) return null;
  if (!isHemleOptionAvailable(formuleId, optionId)) return null;

  const enfantRaw = sp.get(URL_PARAM_HEMLE_ENFANT)?.trim();
  const avecEnfant = enfantRaw === "1" || enfantRaw === "true";

  return { formuleId, optionId, avecEnfant };
}

export function parseHemleQuoteSessionFromSearchParams(
  sp: URLSearchParams,
): HemleQuoteSession | null {
  const form = parseHemleQuoteFormFromSearchParams(sp);
  if (!form) return null;
  const quote = calculateHemleQuote(form);
  if (!quote) return null;
  return { form, quote };
}

export function buildHemleQuoteWizardSearchParams(opts: {
  stepCode: string;
  form: HemleQuoteFormInput;
}): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, opts.stepCode);
  sp.set(URL_PARAM_HEMLE_FORMULE, opts.form.formuleId);
  sp.set(URL_PARAM_HEMLE_OPTION, opts.form.optionId);
  sp.set(URL_PARAM_HEMLE_ENFANT, opts.form.avecEnfant ? "1" : "0");
  return sp;
}

export function defaultHemleQuoteWizardSearchParams(): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, HEMLE_QUOTE_WIZARD_STEP_CODE_FORM);
  return sp;
}
