import "server-only";

import crypto from "crypto";

/**
 * Signature header s3pAuth (Smobilpay / Maviance).
 * Aligné sur le script Postman officiel : concaténation key=value (sans encodage par clé),
 * puis baseString = METHOD & encodeURIComponent(url) & encodeURIComponent(parameterString),
 * HMAC-SHA1 + Base64. nonce et timestamp = même valeur (Date.now() en ms).
 */

interface BuildAuthInput {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  /** URL absolue, sans query string. Ex: https://s3p.smobilpay.staging.maviance.info/v2/quotestd */
  url: string;
  /** Query params de la requete (GET). */
  queryParams?: Record<string, string | number | undefined>;
  /** Body params de la requete (POST JSON aplati). */
  bodyParams?: Record<string, string | number | undefined>;
  publicKey: string;
  secretKey: string;
}

function trimParamValue(v: string | number): string {
  const s = typeof v === "string" ? v.trim() : String(v);
  return s;
}

export function buildS3pAuthorizationHeader(input: BuildAuthInput): string {
  const { method, url, queryParams, bodyParams, publicKey, secretKey } = input;

  const ts = Date.now();
  const timestamp = String(ts);
  const nonce = String(ts);

  /** Ordre Postman : {...query/body, ...s3pParams} — champs oauth écrasent le reste. */
  const allParams: Record<string, string> = {};

  if (bodyParams) {
    for (const [k, v] of Object.entries(bodyParams)) {
      if (v == null) continue;
      allParams[k] = trimParamValue(v);
    }
  }
  if (queryParams) {
    for (const [k, v] of Object.entries(queryParams)) {
      if (v == null) continue;
      allParams[k] = trimParamValue(v);
    }
  }

  allParams.s3pAuth_nonce = nonce;
  allParams.s3pAuth_signature_method = "HMAC-SHA1";
  allParams.s3pAuth_timestamp = timestamp;
  allParams.s3pAuth_token = publicKey.trim();

  const sortedKeys = Object.keys(allParams).sort();
  const parameterString = sortedKeys.map((k) => `${k}=${allParams[k]}`).join("&");

  const baseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(parameterString),
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
