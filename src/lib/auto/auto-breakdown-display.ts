import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { QuoteAmountBreakdownRow } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import type { AutoQuoteBreakdown } from "@/types/auto-insurance";

export function getAutoBreakdownTableRows(
  breakdown: AutoQuoteBreakdown,
  devise: string,
  { isMoto = false }: { isMoto?: boolean } = {},
): QuoteAmountBreakdownRow[] {
  const rows: QuoteAmountBreakdownRow[] = [];

  if (!isMoto) {
    rows.push(
      { label: "RC", value: formatAutoAmount(breakdown.rc, devise) },
      { label: "DR", value: formatAutoAmount(breakdown.dr, devise) },
      { label: "IPT", value: formatAutoAmount(breakdown.ipt, devise) },
      {
        label: "Prime annuelle (RC, DR, IPT)",
        value: formatAutoAmount(breakdown.prime_annuelle, devise),
      },
    );
  }

  rows.push(
    { label: "Prime nette", value: formatAutoAmount(breakdown.prime_nette, devise) },
    { label: "Accessoires", value: formatAutoAmount(breakdown.accessoires, devise) },
    {
      label: "Fichier central",
      value: formatAutoAmount(breakdown.fichier_central, devise),
    },
    { label: "TVA", value: formatAutoAmount(breakdown.tva, devise) },
    { label: "Carte rose", value: formatAutoAmount(breakdown.carte_rose, devise) },
    { label: "Prime TTC", value: formatAutoAmount(breakdown.prime_ttc, devise) },
  );

  if (breakdown.dta > 0) {
    rows.push({
      label: "DTA (droit de timbre)",
      value: formatAutoAmount(breakdown.dta, devise),
    });
  }

  rows.push({
    label: "Total à payer",
    value: formatAutoAmount(breakdown.total_a_payer, devise),
    highlight: true,
  });

  return rows;
}
