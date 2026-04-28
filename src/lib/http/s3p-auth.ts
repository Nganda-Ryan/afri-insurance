import "server-only";

import crypto from "crypto";

/**
 * Signature header s3pAuth (Smobilpay / Maviance).
 * Schema OAuth 1.0a-like : HMAC-SHA1 sur la base string composee de
 *  METHOD & url-encoded(URL) & url-encoded(params tries)
 *
 * Les params signes incluent :
 *  - les query params de la requete (et le body uniquement si form-encoded ; pour S3P le body est JSON donc on ne l'inclut pas)
 *  - les champs s3pAuth (nonce, timestamp, signature_method, token, version)
 */

interface BuildAuthInput {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  /** URL absolue, sans query string. Ex: https://s3p.smobilpay.staging.maviance.info/v2/quotestd */
  url: string;
  /** Query params de la requete (GET). */
  queryParams?: Record<string, string | number | undefined>;
  /** Body params de la requete (POST JSON). */
  bodyParams?: Record<string, string | number | undefined>;
  publicKey: string;
  secretKey: string;
}

function rfc3986(input: string): string {
  return encodeURIComponent(input)
    .replaceAll("!", "%21")
    .replaceAll("*", "%2A")
    .replaceAll("'", "%27")
    .replaceAll("(", "%28")
    .replaceAll(")", "%29");
}

function generateNonce(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return crypto.randomBytes(16).toString("hex");
}

function unixTimestampSeconds(): string {
  return Math.floor(Date.now() / 1000).toString();
}

export function buildS3pAuthorizationHeader(input: BuildAuthInput): string {
  const { method, url, queryParams, bodyParams, publicKey, secretKey } = input;

  const nonce = generateNonce();
  const timestamp = unixTimestampSeconds();

  const oauthParams: Record<string, string> = {
    "s3pAuth_nonce": nonce,
    "s3pAuth_signature_method": "HMAC-SHA1",
    "s3pAuth_timestamp": timestamp,
    "s3pAuth_token": publicKey,
  };

  const allParams: Record<string, string> = { ...oauthParams };
  if (bodyParams) {
    for (const [k, v] of Object.entries(bodyParams)) {
      if (v == null) continue;
      allParams[k] = String(v);
    }
  }
  if (queryParams) {
    for (const [k, v] of Object.entries(queryParams)) {
      if (v == null) continue;
      allParams[k] = String(v);
    }
  }

  const sortedParams = Object.keys(allParams)
    .sort()
    .map((k) => `${rfc3986(k)}=${rfc3986(allParams[k] ?? "")}`)
    .join("&");

  const baseString = [
    method.toUpperCase(),
    rfc3986(url),
    rfc3986(sortedParams),
  ].join("&");

  const signature = crypto
    .createHmac("sha1", secretKey)
    .update(baseString)
    .digest("base64");

  const headerParts = [
    `s3pAuth_timestamp="${timestamp}"`,
    `s3pAuth_signature="${signature}"`,
    `s3pAuth_nonce="${nonce}"`,
    `s3pAuth_signature_method="HMAC-SHA1"`,
    `s3pAuth_token="${publicKey}"`,
  ];

  return `s3pAuth ${headerParts.join(", ")}`;
}
