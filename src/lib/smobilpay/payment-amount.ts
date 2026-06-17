/** Arrondit un montant FCFA au franc supérieur avant envoi S3P (ex. 8804.6 → 8805). */
export function roundPaymentAmountUp(amount: number): number {
  if (!Number.isFinite(amount)) return amount;
  return Math.ceil(amount);
}
