import "server-only";

import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

import {
  getSmobilpayApiVersion,
  getSmobilpayBaseUrl,
  getSmobilpayPublicKey,
  getSmobilpaySecretKey,
} from "@/lib/env/server";
import { buildS3pAuthorizationHeader } from "@/lib/http/s3p-auth";

let singleton: AxiosInstance | null = null;

function flattenQueryParams(
  params: unknown,
): Record<string, string> | undefined {
  if (!params || typeof params !== "object") return undefined;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(params as Record<string, unknown>)) {
    if (v == null) continue;
    out[k] = String(v);
  }
  return Object.keys(out).length ? out : undefined;
}

function flattenBodyParams(
  data: unknown,
): Record<string, string> | undefined {
  if (data == null) return undefined;
  const raw =
    typeof data === "string"
      ? (() => {
          try {
            return JSON.parse(data) as unknown;
          } catch {
            return undefined;
          }
        })()
      : data;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (v == null) continue;
    if (typeof v === "object") continue;
    out[k] = String(v);
  }
  return Object.keys(out).length ? out : undefined;
}

function resolveAbsoluteUrl(config: InternalAxiosRequestConfig): string {
  const baseURL = config.baseURL ?? "";
  const url = config.url ?? "";
  if (/^https?:\/\//i.test(url)) return url;
  const trimmedBase = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  const trimmedUrl = url.startsWith("/") ? url : `/${url}`;
  return `${trimmedBase}${trimmedUrl}`;
}

function applyDefaultHeaders(config: InternalAxiosRequestConfig): void {
  config.headers.set("x-api-version", getSmobilpayApiVersion());
  config.headers.set("Accept", "application/json");
  if (!config.headers.get("Content-Type") && config.data != null) {
    config.headers.set("Content-Type", "application/json");
  }
}

export function getS3pClient(): AxiosInstance {
  if (singleton) return singleton;

  singleton = axios.create({
    baseURL: getSmobilpayBaseUrl(),
    timeout: 30_000,
    headers: { Accept: "application/json" },
  });

  singleton.interceptors.request.use((config) => {
    applyDefaultHeaders(config);

    const method = (config.method ?? "get").toUpperCase() as
      | "GET"
      | "POST"
      | "PUT"
      | "DELETE"
      | "PATCH";

    const absoluteUrl = resolveAbsoluteUrl(config);
    const queryParams = flattenQueryParams(config.params);
    const bodyParams = method === "GET" ? undefined : flattenBodyParams(config.data);

    const authHeader = buildS3pAuthorizationHeader({
      method,
      url: absoluteUrl,
      queryParams,
      bodyParams,
      publicKey: getSmobilpayPublicKey(),
      secretKey: getSmobilpaySecretKey(),
    });

    config.headers.set("Authorization", authHeader);
    return config;
  });

  return singleton;
}
