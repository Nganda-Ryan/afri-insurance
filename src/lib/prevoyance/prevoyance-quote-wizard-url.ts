import {
  PREVOYANCE_QUOTE_WIZARD_STEP_CODE_FORM,
  QUOTE_PRODUCT_CODE_PREVOYANCE,
  URL_PARAM_PREVOYANCE_AGE,
  URL_PARAM_PREVOYANCE_CAPITAL,
  URL_PARAM_PREVOYANCE_DURATION,
  URL_PARAM_PRODUCT,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { calculatePrevoyanceQuote } from "@/lib/prevoyance/calculate-prevoyance-quote";
import type {
  PrevoyanceQuoteFormInput,
  PrevoyanceQuoteSession,
} from "@/types/prevoyance-insurance";

export function parsePrevoyanceQuoteFormFromSearchParams(
  sp: URLSearchParams,
): PrevoyanceQuoteFormInput | null {
  const ageRaw = sp.get(URL_PARAM_PREVOYANCE_AGE);
  const durationRaw = sp.get(URL_PARAM_PREVOYANCE_DURATION);
  const capitalRaw = sp.get(URL_PARAM_PREVOYANCE_CAPITAL);

  const age = ageRaw != null ? Number.parseInt(ageRaw, 10) : NaN;
  const durationYears =
    durationRaw != null ? Number.parseInt(durationRaw, 10) : NaN;
  const capital = capitalRaw != null ? Number.parseInt(capitalRaw, 10) : NaN;

  if (
    !Number.isFinite(age) ||
    age < 0 ||
    !Number.isFinite(durationYears) ||
    durationYears < 1 ||
    !Number.isFinite(capital) ||
    capital < 1
  ) {
    return null;
  }

  return { age, durationYears, capital };
}

export function parsePrevoyanceQuoteSessionFromSearchParams(
  sp: URLSearchParams,
): PrevoyanceQuoteSession | null {
  const form = parsePrevoyanceQuoteFormFromSearchParams(sp);
  if (!form) return null;
  const quote = calculatePrevoyanceQuote(form);
  if (!quote) return null;
  return { form, quote };
}

export function buildPrevoyanceQuoteWizardSearchParams(opts: {
  stepCode: string;
  form: PrevoyanceQuoteFormInput;
}): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_PRODUCT, QUOTE_PRODUCT_CODE_PREVOYANCE);
  sp.set(URL_PARAM_STEP, opts.stepCode);
  sp.set(URL_PARAM_PREVOYANCE_AGE, String(opts.form.age));
  sp.set(URL_PARAM_PREVOYANCE_DURATION, String(opts.form.durationYears));
  sp.set(URL_PARAM_PREVOYANCE_CAPITAL, String(opts.form.capital));
  return sp;
}

export function defaultPrevoyanceQuoteWizardSearchParams(): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_PRODUCT, QUOTE_PRODUCT_CODE_PREVOYANCE);
  sp.set(URL_PARAM_STEP, PREVOYANCE_QUOTE_WIZARD_STEP_CODE_FORM);
  return sp;
}
