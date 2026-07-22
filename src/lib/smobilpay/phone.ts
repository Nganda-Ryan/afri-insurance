/** Normalise un numéro camerounais au format international 237XXXXXXXXX (sans +). */
export function normalizeCameroonPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.startsWith("237")) return d;
  if (d.startsWith("0") && d.length > 1) return `237${d.slice(1)}`;
  return `237${d}`;
}

export function isValidCameroonPhone(digits: string): boolean {
  return digits.startsWith("237") && digits.length >= 12;
}

export const CAMEROON_PHONE_INVALID_MESSAGE =
  "Numéro de téléphone invalide. Saisissez un numéro camerounais complet (ex. 6XX XXX XXX).";

/** Validation formulaire (react-hook-form) - alignée sur le schéma SmobilPay. */
export function validateCameroonPhoneInput(raw: string): string | true {
  const digits = raw.trim().replace(/\D/g, "");
  if (digits.length < 8) return CAMEROON_PHONE_INVALID_MESSAGE;
  if (!isValidCameroonPhone(normalizeCameroonPhone(raw))) {
    return CAMEROON_PHONE_INVALID_MESSAGE;
  }
  return true;
}
