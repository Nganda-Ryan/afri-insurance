export function formatAutoAmount(value: number, devise = "FCFA"): string {
  return `${value.toLocaleString("fr-FR")} ${devise}`;
}
