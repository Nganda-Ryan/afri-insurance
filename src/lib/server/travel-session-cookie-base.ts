import "server-only";

import { EVO_COOKIE_MAX_AGE_SEC } from "@/lib/constants/cookies";
import { evoCookieOptions } from "@/lib/http/client";

/** Paramètres passés à `cookies().set` pour les cookies EVO (devis, police). */
export function getTravelSessionCookieBase() {
  return {
    ...evoCookieOptions(),
    maxAge: EVO_COOKIE_MAX_AGE_SEC,
  } as const;
}
