import "server-only";

function requireEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

export function getEvoApiBaseUrl(): string {
  const raw = requireEnv("EVO_API_BASE_URL");
  return raw.endsWith("/") ? raw : `${raw}/`;
}

export function getEvoOAuthClientId(): string {
  return requireEnv("EVO_OAUTH_CLIENT_ID");
}

export function getEvoOAuthClientSecret(): string {
  return requireEnv("EVO_OAUTH_CLIENT_SECRET");
}

export function getEvoOAuthScope(): string {
  return requireEnv("EVO_OAUTH_SCOPE");
}

export function getEvoAcceptLanguage(): string {
  return requireEnv("EVO_ACCEPT_LANGUAGE");
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}
