import { AUTHORIZED_COUNTRIES } from "@/lib/constants/authorized-contry";

export const WORLD_DESTINATION_ZONE =
  "Tous les pays du monde entier, expt le pays de résidence";

export const WORLD_COVERAGE_COUNTRY = "Couverture";

function normalizeZone(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "'")
    .toLowerCase()
    .replace(/[.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ZONE_KEY_BY_NORMALIZED = Object.fromEntries(
  Object.keys(AUTHORIZED_COUNTRIES).map((key) => [normalizeZone(key), key]),
);

const ZONE_ALIASES: Record<string, string> = {
  [normalizeZone("Tous les pays du monde, expt le pays de résidence")]:
    WORLD_DESTINATION_ZONE,
  [normalizeZone(
    "Tous les lieux saints du monde entier, sans distinction de religion, expt ceux situés dans les pays Schengen",
  )]: "Pèlerinage",
};

export function resolveAuthorizedZoneKey(destinationArea: string): string | null {
  const trimmed = destinationArea.trim();
  if (!trimmed) return null;
  if (trimmed in AUTHORIZED_COUNTRIES) return trimmed;

  const normalized = normalizeZone(trimmed);
  return ZONE_ALIASES[normalized] ?? ZONE_KEY_BY_NORMALIZED[normalized] ?? null;
}

export function isWorldCoverageZone(destinationArea: string): boolean {
  return resolveAuthorizedZoneKey(destinationArea) === WORLD_DESTINATION_ZONE;
}

export function getDestinationCountriesForZone(destinationArea: string): string[] {
  const key = resolveAuthorizedZoneKey(destinationArea);
  if (!key) return [];
  return AUTHORIZED_COUNTRIES[key as keyof typeof AUTHORIZED_COUNTRIES] ?? [];
}
