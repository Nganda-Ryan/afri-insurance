import type { PersonFormData } from "@/types/subscribe";

const STORAGE_KEY = "afri-travel-quote-holder";

export function readQuoteHolderFromStorage(): PersonFormData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersonFormData;
    if (
      typeof parsed.first_name === "string" &&
      typeof parsed.last_name === "string" &&
      typeof parsed.email === "string"
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function writeQuoteHolderToStorage(holder: PersonFormData): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(holder));
  } catch {
    /* ignore quota errors */
  }
}

export function clearQuoteHolderStorage(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function isQuoteHolderComplete(holder: Partial<PersonFormData>): holder is PersonFormData {
  return (
    (holder.title === "M" || holder.title === "Mme") &&
    typeof holder.first_name === "string" &&
    holder.first_name.trim().length > 0 &&
    typeof holder.last_name === "string" &&
    holder.last_name.trim().length > 0 &&
    typeof holder.birth_date === "string" &&
    holder.birth_date.length > 0 &&
    typeof holder.email === "string" &&
    holder.email.trim().length > 0 &&
    typeof holder.phone_number === "string" &&
    holder.phone_number.trim().length > 0 &&
    typeof holder.address === "string" &&
    holder.address.trim().length > 0 &&
    typeof holder.city === "string" &&
    holder.city.trim().length > 0 &&
    typeof holder.passport_number === "string" &&
    holder.passport_number.trim().length > 0 &&
    typeof holder.passeport_exp_date === "string" &&
    holder.passeport_exp_date.length > 0
  );
}
