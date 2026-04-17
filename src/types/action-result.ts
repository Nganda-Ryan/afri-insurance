/** Enveloppe uniforme pour les server actions (succès / échec au même endroit). */
export type ActionResult<T> = {
  ok: boolean;
  data: T | null;
  error: { code: string | null; message: string } | null;
};
