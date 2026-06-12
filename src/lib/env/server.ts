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

function envOrDefault(name: string, fallback: string): string {
  const v = process.env[name]?.trim();
  return v && v.length > 0 ? v : fallback;
}

export function getSmobilpayBaseUrl(): string {
  const fromS3p =
    process.env.S3P_URL?.trim() ??
    process.env.NEXT_PUBLIC_S3P_URL?.trim();
  const raw =
    fromS3p && fromS3p.length > 0
      ? fromS3p
      : envOrDefault(
          "NEXT_PUBLIC_SMOBILEPAY_BASE_URL",
          "https://s3p.smobilpay.staging.maviance.info/v2",
        );
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

/** Service S3P cash-out MTN Mobile Money (ex. 20053). */
export function getMomoServiceId(): string {
  const v =
    process.env.MOMO_SERVICE_ID?.trim() ||
    process.env.MOMO_PAYMENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_MOMO_SERVICE_ID?.trim();
  return v && v.length > 0 ? v : "20053";
}

/** Service S3P cash-out Orange Money — obligatoire en prod (variable d'environnement). */
export function getOmServiceId(): string {
  const v =
    process.env.OM_SERVICE_ID?.trim() ||
    process.env.NEXT_PUBLIC_OM_SERVICE_ID?.trim();
  return v && v.length > 0 ? v : "";
}

export function getSmobilpayPublicKey(): string {
  return (
    process.env.S3P_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SMOBILEPAY_PUBLIC_KEY?.trim() ||
    requireEnv("NEXT_PUBLIC_SMOBILEPAY_PUBLIC_KEY")
  );
}

export function getSmobilpaySecretKey(): string {
  return (
    process.env.S3P_SECRET?.trim() ||
    process.env.SMOBILEPAY_SECRET_KEY?.trim() ||
    requireEnv("SMOBILEPAY_SECRET_KEY")
  );
}

export function getSmobilpayMerchant(): string {
  return envOrDefault("SMOBILEPAY_MERCHANT", "AFRI_CAM");
}

export function getSmobilpayServiceId(): string {
  return envOrDefault("SMOBILEPAY_SERVICE_ID", "10001");
}

export function getSmobilpayApiVersion(): string {
  return envOrDefault("SMOBILEPAY_API_VERSION", "3.0.0");
}
