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

/** Options affichées dans le formulaire (libellé court + valeur API exacte). */
export const DESTINATION_AREA_OPTIONS: ReadonlyArray<{
  label: string;
  value: string;
}> = [
  {
    label: "Afrique et îles périphériques (hors pays de résidence)",
    value: DESTINATION_AREA_AFRICA,
  },
  {
    label: "Europe et îles périphériques",
    value: DESTINATION_AREA_EUROPE,
  },
  { label: "Monde entier (hors pays de résidence)", value: DESTINATION_AREA_WORLD },
  {
    label: "Lieux saints (hors Schengen)",
    value: DESTINATION_AREA_PILGRIMAGE,
  },
  { label: "Espace Schengen", value: DESTINATION_AREA_SCHENGEN },
];

const KNOWN_AREAS = new Set(
  DESTINATION_AREA_OPTIONS.map((o) => o.value),
);

export function mapDestinationToArea(destination: string): string {
  const trimmed = destination.trim();
  if (!KNOWN_AREAS.has(trimmed)) {
    throw new Error(
      "Zone de destination inconnue. Modifiez vos entrées puis réessayez.",
    );
  }

  return trimmed;
}
