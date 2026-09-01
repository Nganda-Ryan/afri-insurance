import { MRH_INSURANCE_DATA } from "@/lib/constants/mrh_insurance";
import type {
  MrhProfil,
  MrhQuoteFormInput,
  MrhQuoteResult,
  MrhTarifRow,
} from "@/types/mrh-insurance";
import { isMrhLocataireTarif } from "@/types/mrh-insurance";

function findProfil(profilId: string): MrhProfil | undefined {
  return MRH_INSURANCE_DATA.profils_assurance.find((p) => p.id === profilId);
}

function buildBreakdown(tarif: MrhTarifRow) {
  if (isMrhLocataireTarif(tarif)) {
    return {
      prime_nette: tarif.prime_nette,
      prime_ttc: tarif.prime_ttc,
      loyer_mensuel: tarif.loyer_mensuel,
      valeur_contenu: tarif.valeur_contenu,
    };
  }
  return {
    prime_nette: tarif.prime_nette,
    prime_ttc: tarif.prime_ttc,
    valeur_batiment: tarif.valeur_batiment,
    valeur_contenu: tarif.valeur_contenu,
  };
}

export function formatMrhCompactAmount(value: number): string {
  if (value >= 1_000_000 && value % 1_000_000 === 0) {
    return `${value / 1_000_000} M`;
  }
  if (value >= 1_000 && value % 1_000 === 0) {
    return `${value / 1_000} k`;
  }
  return value.toLocaleString("fr-FR");
}

export function formatMrhTarifLabel(tarif: MrhTarifRow): string {
  const devise = MRH_INSURANCE_DATA.document_info.devise;

  if (isMrhLocataireTarif(tarif)) {
    return `Loyer ${tarif.loyer_mensuel.toLocaleString("fr-FR")} ${devise}`;
  }

  return `Bâtiment ${formatMrhCompactAmount(tarif.valeur_batiment)} ${devise}`;
}

export function formatMrhTarifSummary(quote: MrhQuoteResult): string {
  return quote.tarifLabel;
}

export function calculateMrhQuote(input: MrhQuoteFormInput): MrhQuoteResult | null {
  const profil = findProfil(input.profilId);
  if (!profil) return null;

  const tarif = profil.tarifs[input.tarifIndex];
  if (!tarif) return null;

  return {
    profilId: profil.id,
    profilLabel: profil.label,
    garanties: profil.garanties_incluses,
    tarifIndex: input.tarifIndex,
    tarifLabel: formatMrhTarifLabel(tarif),
    devise: MRH_INSURANCE_DATA.document_info.devise,
    breakdown: buildBreakdown(tarif),
  };
}

export function getMrhProfilOptions() {
  return MRH_INSURANCE_DATA.profils_assurance.map((profil) => ({
    value: profil.id,
    label: profil.label,
  }));
}

export function getMrhTarifOptions(profilId: string) {
  const profil = findProfil(profilId);
  if (!profil) return [];
  return profil.tarifs.map((tarif, index) => ({
    value: String(index),
    label: formatMrhTarifLabel(tarif),
  }));
}

export function isMrhLocataireProfil(profilId: string): boolean {
  return profilId === "LOCATAIRE";
}
