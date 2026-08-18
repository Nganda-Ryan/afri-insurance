import {
  HEALTH_QUOTE_WIZARD_STEP_CODE_FORM,
  URL_PARAM_HEALTH_ADULTS,
  URL_PARAM_HEALTH_CHILDREN,
  URL_PARAM_HEALTH_PLAN,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { calculateHealthQuote, parseHealthPlanId } from "@/lib/health/calculate-health-quote";
import type { HealthQuoteFormInput, HealthQuoteSession } from "@/types/health-insurance";

export function parseHealthQuoteFormFromSearchParams(
  sp: URLSearchParams,
): HealthQuoteFormInput | null {
  const planRaw = sp.get(URL_PARAM_HEALTH_PLAN)?.trim();
  const planId = planRaw ? parseHealthPlanId(planRaw) : null;
  const adultRaw = sp.get(URL_PARAM_HEALTH_ADULTS);
  const childRaw = sp.get(URL_PARAM_HEALTH_CHILDREN);
  const adultCount = adultRaw != null ? Number.parseInt(adultRaw, 10) : NaN;
  const childCount = childRaw != null ? Number.parseInt(childRaw, 10) : NaN;

  if (
    !planId ||
    !Number.isFinite(adultCount) ||
    adultCount < 0 ||
    !Number.isFinite(childCount) ||
    childCount < 0
  ) {
    return null;
  }

  return { planId, adultCount, childCount };
}

export function parseHealthQuoteSessionFromSearchParams(
  sp: URLSearchParams,
): HealthQuoteSession | null {
  const form = parseHealthQuoteFormFromSearchParams(sp);
  if (!form) return null;
  const quote = calculateHealthQuote(form);
  if (!quote) return null;
  return { form, quote };
}

export function buildHealthQuoteWizardSearchParams(opts: {
  stepCode: string;
  form: HealthQuoteFormInput;
}): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, opts.stepCode);
  sp.set(URL_PARAM_HEALTH_PLAN, opts.form.planId);
  sp.set(URL_PARAM_HEALTH_ADULTS, String(opts.form.adultCount));
  sp.set(URL_PARAM_HEALTH_CHILDREN, String(opts.form.childCount));
  return sp;
}

export function defaultHealthQuoteWizardSearchParams(): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, HEALTH_QUOTE_WIZARD_STEP_CODE_FORM);
  return sp;
}
