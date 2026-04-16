import "server-only";

import { randomBytes } from "crypto";

type CachedQuoteBundle = {
  expiresAtMs: number;
  rawResponse: unknown;
};

const store = new Map<string, CachedQuoteBundle>();
const DEFAULT_TTL_MS = 20 * 60 * 1000;

function prune(now: number): void {
  for (const [k, v] of store) {
    if (v.expiresAtMs <= now) store.delete(k);
  }
}

export function createTravelQuoteSessionId(
  rawResponse: unknown,
  ttlMs = DEFAULT_TTL_MS,
): string {
  const id = randomBytes(24).toString("hex");
  const now = Date.now();
  prune(now);
  store.set(id, { expiresAtMs: now + ttlMs, rawResponse });
  return id;
}

export function peekTravelQuoteSession(id: string): unknown | null {
  const now = Date.now();
  prune(now);
  const hit = store.get(id);
  if (!hit || hit.expiresAtMs <= now) {
    if (hit) store.delete(id);
    return null;
  }
  return hit.rawResponse;
}

export function deleteTravelQuoteSession(id: string): void {
  store.delete(id);
}
