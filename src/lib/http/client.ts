import "server-only";

import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

import { EVO_DEFAULT_QUOTE_MODE } from "@/config/evo-api";
import {
  getEvoAcceptLanguage,
  getEvoApiBaseUrl,
  isProduction,
} from "@/lib/env/server";
import {
  clearOAuthTokenCache,
  getClientCredentialsAccessToken,
} from "@/lib/http/oauth";

let singleton: AxiosInstance | null = null;

function applyDefaultHeaders(config: InternalAxiosRequestConfig): void {
  config.headers.set("Accept-Language", getEvoAcceptLanguage());
  config.headers.set("x-quote-mode", EVO_DEFAULT_QUOTE_MODE);
  if (!config.headers.get("Content-Type") && config.data != null) {
    config.headers.set("Content-Type", "application/json");
  }
}

export function getEvoApiClient(): AxiosInstance {
  if (singleton) return singleton;

  singleton = axios.create({
    baseURL: getEvoApiBaseUrl(),
    timeout: 30_000,
    headers: { "Content-Type": "application/json" },
  });

  singleton.interceptors.request.use(async (config) => {
    applyDefaultHeaders(config);
    const token = await getClientCredentialsAccessToken();
    config.headers.set("Authorization", `Bearer ${token}`);

    return config;
  });

  singleton.interceptors.response.use(
    (res) => res,
    async (error) => {
      const status = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;

      if (status === 401) clearOAuthTokenCache();
      return Promise.reject(error);
    },
  );

  return singleton;
}

export function evoCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "strict" as const,
    path: "/",
  };
}
