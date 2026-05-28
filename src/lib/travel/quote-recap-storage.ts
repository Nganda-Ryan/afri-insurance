import type { SubscriberFormData } from "@/types/subscribe";

const STORAGE_KEY = "afri-travel-quote-recap";

export function readQuoteRecapFromStorage(): SubscriberFormData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SubscriberFormData;
  } catch {
    return null;
  }
}

export function writeQuoteRecapToStorage(data: SubscriberFormData): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function clearQuoteRecapStorage(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
