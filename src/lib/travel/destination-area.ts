/**
 * Valeurs `destination_area` alignées sur la collection Postman EVO UAT AFRI Cameroun.
 * Si `TripDetails` envoie déjà une de ces valeurs exactes, elle est renvoyée telle quelle.
 */

export const DESTINATION_AREA_AFRICA =
  "Tous les pays africains et îles périphériques, expt le pays de résidence";

export const DESTINATION_AREA_EUROPE =
  "Tous les pays du continent européens et les îles périphériques";

export const DESTINATION_AREA_WORLD =
  "Tous les pays du monde, expt le pays de résidence";

export const DESTINATION_AREA_SCHENGEN =
  "Tous les pays membres de l'espace Schengen";

export const DESTINATION_AREA_PILGRIMAGE =
  "Tous les lieux saints du monde entier, sans distinction de religion, expt ceux situés dans les pays Schengen";

/** Options affichées : libellé, valeur API exacte, code URL court. */
export const DESTINATION_AREA_OPTIONS: ReadonlyArray<{
  label: string;
  value: string;
  code: string;
}> = [
  {
    label: "Afrique et îles périphériques (hors pays de résidence)",
    value: DESTINATION_AREA_AFRICA,
    code: "afrique",
  },
  {
    label: "Europe et îles périphériques",
    value: DESTINATION_AREA_EUROPE,
    code: "europe",
  },
  {
    label: "Monde entier (hors pays de résidence)",
    value: DESTINATION_AREA_WORLD,
    code: "monde",
  },
  {
    label: "Lieux saints (hors Schengen)",
    value: DESTINATION_AREA_PILGRIMAGE,
    code: "pelerinage",
  },
  { label: "Espace Schengen", value: DESTINATION_AREA_SCHENGEN, code: "schengen" },
];

export function destinationAreaValueFromCode(
  code: string | null | undefined,
): string | undefined {
  if (!code) return undefined;
  const c = code.trim().toLowerCase();
  return DESTINATION_AREA_OPTIONS.find((o) => o.code === c)?.value;
}

export function destinationAreaCodeFromValue(
  value: string | null | undefined,
): string | undefined {
  if (!value) return undefined;
  const v = value.trim();
  return DESTINATION_AREA_OPTIONS.find((o) => o.value === v)?.code;
}
