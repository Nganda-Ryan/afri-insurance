import type { PersonFormData } from "@/types/subscribe";

const STORAGE_KEY = "afri-travel-quote-holder";
const HOLDER_STORAGE_EVENT = "afri-travel-quote-holder:updated";

let cachedRaw: string | null | undefined;
let cachedHolder: PersonFormData | null = null;

function parseAndValidateHolder(raw: string | null): PersonFormData | null {
  if (!raw) return null;
  try {
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

export function readQuoteHolderFromStorage(): PersonFormData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedHolder;
    cachedRaw = raw;
    cachedHolder = parseAndValidateHolder(raw);
    return cachedHolder;
  } catch {
    return null;
  }
}

export function subscribeQuoteHolderStorage(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.storageArea !== sessionStorage || event.key !== STORAGE_KEY) return;
    cachedRaw = undefined;
    onStoreChange();
  };

  const onCustomEvent = () => {
    cachedRaw = undefined;
    onStoreChange();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(HOLDER_STORAGE_EVENT, onCustomEvent);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(HOLDER_STORAGE_EVENT, onCustomEvent);
  };
}

export function writeQuoteHolderToStorage(holder: PersonFormData): void {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(holder);
    sessionStorage.setItem(STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedHolder = parseAndValidateHolder(raw);
    window.dispatchEvent(new Event(HOLDER_STORAGE_EVENT));
  } catch {
    /* ignore quota errors */
  }
}

export function clearQuoteHolderStorage(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    cachedRaw = null;
    cachedHolder = null;
    window.dispatchEvent(new Event(HOLDER_STORAGE_EVENT));
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
