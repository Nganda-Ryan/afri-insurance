import axios, { type AxiosError } from "axios";

export type NormalizedHttpError = {
  message: string;
  status?: number;
  code?: string;
};

function pickMessage(data: unknown): string | undefined {
  if (data == null) return undefined;
  if (typeof data === "string") return data;
  if (typeof data === "object" && "message" in data) {
    const m = (data as { message?: unknown }).message;
    if (typeof m === "string") return m;
    if (Array.isArray(m) && m.every((x) => typeof x === "string"))
      return m.join(", ");
  }
  try {
    return JSON.stringify(data);
  } catch {
    return undefined;
  }
}

export function normalizeError(err: unknown): NormalizedHttpError {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<unknown>;
    const fromBody = pickMessage(ax.response?.data);
    return {
      message: fromBody ?? ax.message ?? "Request failed",
      status: ax.response?.status,
      code: ax.code,
    };
  }
  if (err instanceof Error) {
    return { message: err.message };
  }
  return { message: "Unexpected error" };
}

export function toError(err: unknown): Error {
  const n = normalizeError(err);
  const e = new Error(n.message);
  e.cause = err;
  return e;
}
