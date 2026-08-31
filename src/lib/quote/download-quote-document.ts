/**
 * Télécharge un document devis simple (.txt) côté client.
 */
export function downloadQuoteDocument(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function formatQuoteDocumentDate(date = new Date()): string {
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function buildQuoteDocument(sections: {
  title: string;
  productLabel: string;
  lines: Array<{ label: string; value: string }>;
  amountLabel: string;
  amountValue: string;
  note?: string;
}): string {
  const divider = "----------------------------------------";
  const detailLines = sections.lines
    .map((line) => `${line.label} : ${line.value}`)
    .join("\n");

  return [
    "AFRI INSURANCE",
    sections.title,
    divider,
    `Produit : ${sections.productLabel}`,
    `Date : ${formatQuoteDocumentDate()}`,
    divider,
    "Détails",
    detailLines,
    divider,
    `${sections.amountLabel} : ${sections.amountValue}`,
    divider,
    sections.note ??
      "Document indicatif. Ce devis ne constitue pas un contrat d'assurance.",
    "",
  ].join("\n");
}
