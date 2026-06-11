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

export function formatMrhTarifLabel(profilId: string, tarif: MrhTarifRow): string {
  if (isMrhLocataireTarif(tarif)) {
    return `Loyer ${tarif.loyer_mensuel.toLocaleString("fr-FR")} FCFA / Contenu ${tarif.valeur_contenu.toLocaleString("fr-FR")} FCFA`;
  }
  return `Bâtiment ${tarif.valeur_batiment.toLocaleString("fr-FR")} FCFA / Contenu ${tarif.valeur_contenu.toLocaleString("fr-FR")} FCFA`;
}

export function getMrhTarifOptions(profilId: string) {
  const profil = findProfil(profilId);
  if (!profil) return [];
  return profil.tarifs.map((tarif, index) => ({
    value: String(index),
    label: formatMrhTarifLabel(profilId, tarif),
  }));
}

export function isMrhLocataireProfil(profilId: string): boolean {
  return profilId === "LOCATAIRE";
}
