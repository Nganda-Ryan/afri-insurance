/** Parse une tranche de puissance fiscale (ex. « Jusqu'à 2 CV », « 7 à 10 CV »). */
export function parsePowerRangeLabel(
  label: string | null | undefined,
): { min: number; max: number } | null {
  if (!label?.trim()) return null;

  const jusquA = label.match(/Jusqu['']à\s+(\d+)/i);
  if (jusquA) {
    return { min: 0, max: Number.parseInt(jusquA[1], 10) };
  }

  const range = label.match(/(\d+)\s*à\s*(\d+)/i);
  if (range) {
    return {
      min: Number.parseInt(range[1], 10),
      max: Number.parseInt(range[2], 10),
    };
  }

  const inf = label.match(/Inférieur\s*à\s*<?\s*(\d+)/i);
  if (inf) {
    return { min: 0, max: Number.parseInt(inf[1], 10) - 1 };
  }

  const etPlus = label.match(/(\d+)\s*CV\s*(?:ET|et)\s*\+/);
  if (etPlus) {
    const min = Number.parseInt(etPlus[1], 10);
    return { min, max: min + 99 };
  }

  return null;
}

/** CV représentatif d'une tranche (pour DTA et récap). */
export function representativePowerCvFromLabel(
  label: string | null | undefined,
): number {
  const range = parsePowerRangeLabel(label);
  if (!range) return 1;
  if (range.min === 0) return Math.max(range.max, 1);
  return Math.ceil((range.min + range.max) / 2);
}

export function powerCvMatchesLabel(
  powerCv: number,
  label: string | null | undefined,
): boolean {
  const range = parsePowerRangeLabel(label);
  if (!range || !Number.isFinite(powerCv) || powerCv <= 0) return false;
  return powerCv >= range.min && powerCv <= range.max;
}
