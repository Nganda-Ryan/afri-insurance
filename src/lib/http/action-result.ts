import type { ActionResult } from "@/types/action-result";

export function actionOk<T>(data: T): ActionResult<T> {
  return { ok: true, data, error: null };
}

export function actionFail<T = never>(
  code: string | null,
  message: string,
): ActionResult<T> {
  return { ok: false, data: null, error: { code, message } };
}
