import axios, { type AxiosError } from "axios";

export type NormalizedHttpError = {
  message: string;
  status?: number;
  code?: string;
};

function pickMessage(data: unknown): string | undefined {
  if (data == null) return undefined;
  if (typeof data === "string") return data;
  if (typeof data === "object") {
    const d = data as Record<string, unknown>;
    // EVO API: préférer error_description puis message puis error
    if (typeof d.error_description === "string" && d.error_description.trim())
      return d.error_description.trim();
    if (typeof d.message === "string" && d.message.trim()) return d.message.trim();
    if (Array.isArray(d.message) && d.message.every((x) => typeof x === "string"))
      return (d.message as string[]).join(", ");
    if (typeof d.error === "string" && d.error.trim()) return d.error.trim();
  }
  try {
    return JSON.stringify(data);
  } catch {
    return undefined;
  }
}

export function normalizeError(err: unknown): NormalizedHttpError {
  if (axios.isAxiosError(err)) {
    console.log('@@@axios.isAxiosError(err)');
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
