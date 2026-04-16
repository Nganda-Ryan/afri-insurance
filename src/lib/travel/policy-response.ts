function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}

export function extractTravelPolicyId(data: unknown): string {
  if (!isRecord(data)) {
    throw new Error("Réponse police EVO invalide.");
  }
  const candidates = [
    data.id,
    data.policy_id,
    isRecord(data.data) ? data.data.id : undefined,
  ];
  for (const c of candidates) {
    if (typeof c === "number" && Number.isFinite(c)) return String(c);
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  throw new Error("Impossible d'extraire l'ID de police EVO.");
}
