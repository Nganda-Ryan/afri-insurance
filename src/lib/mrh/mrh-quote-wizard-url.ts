import {
  MRH_QUOTE_WIZARD_STEP_CODE_FORM,
  URL_PARAM_MRH_PROFIL,
  URL_PARAM_MRH_TARIF,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { calculateMrhQuote } from "@/lib/mrh/calculate-mrh-quote";
import type { MrhQuoteFormInput, MrhQuoteSession } from "@/types/mrh-insurance";

export function parseMrhQuoteFormFromSearchParams(
  sp: URLSearchParams,
): MrhQuoteFormInput | null {
  const profilId = sp.get(URL_PARAM_MRH_PROFIL)?.trim();
  const tarifRaw = sp.get(URL_PARAM_MRH_TARIF);
  const tarifIndex = tarifRaw != null ? Number.parseInt(tarifRaw, 10) : NaN;

  if (!profilId || !Number.isFinite(tarifIndex) || tarifIndex < 0) return null;
  return { profilId, tarifIndex };
}

export function parseMrhQuoteSessionFromSearchParams(
  sp: URLSearchParams,
): MrhQuoteSession | null {
  const form = parseMrhQuoteFormFromSearchParams(sp);
  if (!form) return null;
  const quote = calculateMrhQuote(form);
  if (!quote) return null;
  return { form, quote };
}

export function buildMrhQuoteWizardSearchParams(opts: {
  stepCode: string;
  form: MrhQuoteFormInput;
}): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, opts.stepCode);
  sp.set(URL_PARAM_MRH_PROFIL, opts.form.profilId);
  sp.set(URL_PARAM_MRH_TARIF, String(opts.form.tarifIndex));
  return sp;
}

export function defaultMrhQuoteWizardSearchParams(): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, MRH_QUOTE_WIZARD_STEP_CODE_FORM);
  return sp;
}
