import type { QuoteAmountBreakdownRow } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { MrhQuoteBreakdown } from "@/types/mrh-insurance";

export function getMrhBreakdownTableRows(
  breakdown: MrhQuoteBreakdown,
  devise: string,
  { isLocataire = false }: { isLocataire?: boolean } = {},
): QuoteAmountBreakdownRow[] {
  const rows: QuoteAmountBreakdownRow[] = [];

  if (!isLocataire && breakdown.valeur_batiment != null) {
    rows.push({
      label: "Valeur bâtiment",
      value: formatAutoAmount(breakdown.valeur_batiment, devise),
    });
  }

  if (isLocataire && breakdown.loyer_mensuel != null) {
    rows.push({
      label: "Loyer mensuel",
      value: formatAutoAmount(breakdown.loyer_mensuel, devise),
    });
  }

  if (breakdown.valeur_contenu != null) {
    rows.push({
      label: "Valeur contenu",
      value: formatAutoAmount(breakdown.valeur_contenu, devise),
    });
  }

  rows.push(
    { label: "Prime nette", value: formatAutoAmount(breakdown.prime_nette, devise) },
    {
      label: "Prime TTC",
      value: formatAutoAmount(breakdown.prime_ttc, devise),
      highlight: true,
    },
  );

  return rows;
}
