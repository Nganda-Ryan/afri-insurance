import "server-only";

import {
  getEvoApiBaseUrl,
  getEvoOAuthClientId,
  getEvoOAuthClientSecret,
  getEvoOAuthScope,
} from "@/lib/env/server";
import { normalizeError } from "@/lib/http/errors";
import { SAFETY_BUFFER_MS } from "../constants/constant";
import { CachedToken, TokenResponse } from "@/types/authTypes";


let cache: CachedToken | null = null;


export async function getClientCredentialsAccessToken(options?: {forceRefresh?: boolean;}): Promise<string> {
  const forceRefresh = options?.forceRefresh === true;
  const now = Date.now();
  if (!forceRefresh && cache && cache.expiresAtMs > now + SAFETY_BUFFER_MS) {
    return cache.accessToken;
  }

  const baseUrl = getEvoApiBaseUrl();
  const clientId = getEvoOAuthClientId();
  const clientSecret = getEvoOAuthClientSecret();
  const scope = getEvoOAuthScope();

  const tokenUrl = new URL("token", baseUrl).toString();
  const basic = Buffer.from(`${clientId}:${clientSecret}`, "utf8").toString("base64");

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    scope,
  });

  let res: Response;
  try {
    res = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basic}`,
      },
      body,
      cache: "no-store",
    });
  } catch (e) {
    throw new Error(normalizeError(e).message);
  }

  console.log('@@@res', res);
  const json = (await res.json().catch(() => ({}))) as TokenResponse;
  console.log('@@@json', json);

  if (!res.ok || !json.access_token) {
    const msg = typeof (json as { error_description?: string }).error_description === "string"
        ? (json as { error_description: string }).error_description
        : `OAuth token request failed (${res.status})`;

    throw new Error(msg);
  }

  const expiresInSec = typeof json.expires_in === "number" && json.expires_in > 0
      ? json.expires_in
      : 3600;

  cache = {
    accessToken: json.access_token,
    expiresAtMs: now + expiresInSec * 1000,
  };

  return cache.accessToken;
}

export function clearOAuthTokenCache(): void {
  cache = null;
}
