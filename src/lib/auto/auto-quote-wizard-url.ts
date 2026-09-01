import {
  AUTO_QUOTE_WIZARD_STEP_CODE_FORM,
  URL_PARAM_AUTO_CATEGORY,
  URL_PARAM_AUTO_DURATION,
  URL_PARAM_AUTO_FUEL,
  URL_PARAM_AUTO_MOTO,
  URL_PARAM_AUTO_POWER,
  URL_PARAM_AUTO_POWER_LABEL,
  URL_PARAM_AUTO_ZONE,
  URL_PARAM_STEP,
} from "@/lib/constants/constant";
import { calculateAutoQuote } from "@/lib/auto/calculate-auto-quote";
import type { AutoFuelType, AutoQuoteFormInput, AutoQuoteSession } from "@/types/auto-insurance";

export function parseAutoQuoteFormFromSearchParams(
  sp: URLSearchParams,
): AutoQuoteFormInput | null {
  const zoneNom = sp.get(URL_PARAM_AUTO_ZONE)?.trim();
  const categoryId = sp.get(URL_PARAM_AUTO_CATEGORY)?.trim();
  if (!zoneNom || !categoryId) return null;

  const fuelRaw = sp.get(URL_PARAM_AUTO_FUEL)?.trim();
  const fuelType: AutoFuelType = fuelRaw === "diesel" ? "diesel" : "essence";
  const powerLabel = sp.get(URL_PARAM_AUTO_POWER_LABEL)?.trim() ?? "";
  const powerRaw = sp.get(URL_PARAM_AUTO_POWER);
  const powerCv = powerRaw != null ? Number.parseInt(powerRaw, 10) : 0;
  const motoCharacteristic = sp.get(URL_PARAM_AUTO_MOTO)?.trim() || undefined;

  const form: AutoQuoteFormInput = {
    zoneNom,
    categoryId,
    durationLabel: sp.get(URL_PARAM_AUTO_DURATION)?.trim() ?? "",
    fuelType,
    powerLabel,
    powerCv: Number.isFinite(powerCv) ? powerCv : 0,
    motoCharacteristic,
  };

  if (motoCharacteristic) return form;
  if (!form.durationLabel || !powerLabel) return null;
  return form;
}

export function parseAutoQuoteSessionFromSearchParams(
  sp: URLSearchParams,
): AutoQuoteSession | null {
  const form = parseAutoQuoteFormFromSearchParams(sp);
  if (!form) return null;
  const quote = calculateAutoQuote(form);
  if (!quote) return null;
  return { form, quote };
}

export function buildAutoQuoteWizardSearchParams(opts: {
  stepCode: string;
  form: AutoQuoteFormInput;
}): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, opts.stepCode);
  sp.set(URL_PARAM_AUTO_ZONE, opts.form.zoneNom);
  sp.set(URL_PARAM_AUTO_CATEGORY, opts.form.categoryId);

  if (opts.form.motoCharacteristic) {
    sp.set(URL_PARAM_AUTO_MOTO, opts.form.motoCharacteristic);
    return sp;
  }

  sp.set(URL_PARAM_AUTO_DURATION, opts.form.durationLabel);
  sp.set(URL_PARAM_AUTO_FUEL, opts.form.fuelType);
  sp.set(URL_PARAM_AUTO_POWER_LABEL, opts.form.powerLabel);
  sp.set(URL_PARAM_AUTO_POWER, String(opts.form.powerCv));
  return sp;
}

export function defaultAutoQuoteWizardSearchParams(): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set(URL_PARAM_STEP, AUTO_QUOTE_WIZARD_STEP_CODE_FORM);
  return sp;
}
