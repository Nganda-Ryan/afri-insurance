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
