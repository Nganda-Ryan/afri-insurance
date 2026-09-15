import type { QuoteAmountBreakdownRow } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { formatAutoAmount } from "@/lib/auto/format-auto-amount";
import type { AccidentQuoteBreakdown } from "@/types/accidents-insurance";

export function getAccidentsBreakdownTableRows(
  breakdown: AccidentQuoteBreakdown,
  devise: string,
): QuoteAmountBreakdownRow[] {
  const rows: QuoteAmountBreakdownRow[] = [
    {
      label: "Classe de risque",
      value: breakdown.classe_label,
    },
    {
      label: "Capital décès",
      value: formatAutoAmount(breakdown.capital_deces, devise),
    },
    {
      label: "Capital infirmité permanente",
      value: formatAutoAmount(breakdown.capital_ipt, devise),
    },
    {
      label: "Capital frais médicaux",
      value: formatAutoAmount(breakdown.capital_fm, devise),
    },
    {
      label: "Capital indemnité quotidienne",
      value: `${breakdown.capital_iq.toLocaleString("fr-FR")} ${devise}/jour`,
    },
    { label: "Prime décès", value: formatAutoAmount(breakdown.prime_deces, devise) },
    { label: "Prime infirmité permanente", value: formatAutoAmount(breakdown.prime_ipt, devise) },
    { label: "Prime frais médicaux", value: formatAutoAmount(breakdown.prime_fm, devise) },
    { label: "Prime indemnité quotidienne", value: formatAutoAmount(breakdown.prime_iq, devise) },
    {
      label: "Prime nette",
      value: formatAutoAmount(breakdown.prime_nette, devise),
    },
    {
      label: `Durée (${breakdown.duree_label})`,
      value: `× ${breakdown.duree_facteur}`,
    },
  ];

  if (breakdown.has_majoration_25) {
    rows.push({
      label: "Majoration moto / sports dangereux (+25%)",
      value: formatAutoAmount(breakdown.majoration_25, devise),
    });
  }

  if (breakdown.has_surprime_age) {
    rows.push({
      label: "Surprime âge > 60 ans (+10%)",
      value: formatAutoAmount(breakdown.surprime_age, devise),
    });
  }

  rows.push({
    label: "Prime totale",
    value: formatAutoAmount(breakdown.prime_totale, devise),
    highlight: true,
  });

  return rows;
}
