import {
  ETUDES_QUOTE_WIZARD_STEP_CODE_FORM,
  URL_PARAM_ETUDES_DUREE,
  URL_PARAM_ETUDES_RENTE,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { calculateEtudesQuote } from "@/lib/etudes/calculate-etudes-quote";
import type {
  EtudesQuoteFormInput,
  EtudesQuoteSession,
} from "@/types/etudes-insurance";

export function parseEtudesQuoteFormFromSearchParams(
  sp: URLSearchParams,
): EtudesQuoteFormInput | null {
  const renteRaw = sp.get(URL_PARAM_ETUDES_RENTE);
  const dureeRaw = sp.get(URL_PARAM_ETUDES_DUREE);

  const renteAnnuelle = renteRaw != null ? Number.parseInt(renteRaw, 10) : NaN;
  const dureeService = dureeRaw != null ? Number.parseInt(dureeRaw, 10) : NaN;

  if (
    !Number.isFinite(renteAnnuelle) ||
    renteAnnuelle <= 0 ||
    !Number.isFinite(dureeService) ||
    dureeService <= 0
  ) {
    return null;
  }

  return { rente_annuelle: renteAnnuelle, duree_service: dureeService };
}

export function parseEtudesQuoteSessionFromSearchParams(
  sp: URLSearchParams,
): EtudesQuoteSession | null {
  const form = parseEtudesQuoteFormFromSearchParams(sp);
  if (!form) return null;
  const quote = calculateEtudesQuote(form);
  if (!quote) return null;
  return { form, quote };
}

export function buildEtudesQuoteWizardSearchParams(opts: {
  stepCode: string;
  form: EtudesQuoteFormInput;
}): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, opts.stepCode);
  sp.set(URL_PARAM_ETUDES_RENTE, String(opts.form.rente_annuelle));
  sp.set(URL_PARAM_ETUDES_DUREE, String(opts.form.duree_service));
  return sp;
}

export function defaultEtudesQuoteWizardSearchParams(): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, ETUDES_QUOTE_WIZARD_STEP_CODE_FORM);
  return sp;
}
