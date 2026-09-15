import {
  HELEP_QUOTE_WIZARD_STEP_CODE_FORM,
  URL_PARAM_HELEP_FORMULE,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { calculateHelepQuote, parseHelepFormuleId } from "@/lib/helep/calculate-helep-quote";
import type {
  HelepQuoteFormInput,
  HelepQuoteSession,
} from "@/types/helep-insurance";

export function parseHelepQuoteFormFromSearchParams(
  sp: URLSearchParams,
): HelepQuoteFormInput | null {
  const formuleRaw = sp.get(URL_PARAM_HELEP_FORMULE)?.trim();
  const formuleId = formuleRaw ? parseHelepFormuleId(formuleRaw) : null;

  if (!formuleId) return null;

  return { formuleId };
}

export function parseHelepQuoteSessionFromSearchParams(
  sp: URLSearchParams,
): HelepQuoteSession | null {
  const form = parseHelepQuoteFormFromSearchParams(sp);
  if (!form) return null;
  const quote = calculateHelepQuote(form);
  if (!quote) return null;
  return { form, quote };
}

export function buildHelepQuoteWizardSearchParams(opts: {
  stepCode: string;
  form: HelepQuoteFormInput;
}): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, opts.stepCode);
  sp.set(URL_PARAM_HELEP_FORMULE, opts.form.formuleId);
  return sp;
}

export function defaultHelepQuoteWizardSearchParams(): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, HELEP_QUOTE_WIZARD_STEP_CODE_FORM);
  return sp;
}
