import { ACCIDENTS_INSURANCE_DATA } from "@/lib/constants/accidents_insurance";
import type {
  AccidentClass,
  AccidentClassTarif,
  AccidentDurationOption,
  AccidentQuoteFormInput,
  AccidentQuoteResult,
} from "@/types/accidents-insurance";

const DATA = ACCIDENTS_INSURANCE_DATA;

function findTarif(classe: AccidentClass): AccidentClassTarif | undefined {
  return DATA.tarifs.find((t) => t.classe === classe);
}

function findClasseLabel(classe: AccidentClass): string {
  return DATA.classes.find((c) => c.id === classe)?.label ?? `Classe ${classe}`;
}

function findDureeOption(mois: number): AccidentDurationOption {
  return (
    DATA.durees.find((d) => mois >= d.mois_min && mois <= d.mois_max) ??
    DATA.durees[DATA.durees.length - 1]
  );
}

function roundMoney(value: number): number {
  return Math.round(value);
}

export function calculateAccidentsQuote(
  input: AccidentQuoteFormInput,
): AccidentQuoteResult | null {
  const tarif = findTarif(input.classe);
  if (!tarif) return null;

  if (input.capital_deces <= 0 || input.capital_ipt <= 0) return null;
  if (input.duree_mois < 1 || input.duree_mois > 12) return null;

  // Capital frais médicaux = min(5% du cumul décès+IPT, 1 000 000)
  const cumulDecesIpt = input.capital_deces + input.capital_ipt;
  const capitalFm = Math.min(
    roundMoney((DATA.fm_plafond_pourcentage / 100) * cumulDecesIpt),
    DATA.fm_plafond_absolu,
  );

  // Capital indemnité quotidienne = min(quart pour mille du cumul, 50 000)
  const capitalIq = Math.min(
    roundMoney(DATA.iq_quart_pour_mille * cumulDecesIpt),
    DATA.iq_plafond,
  );

  // Primes de base (per mille)
  const primeDeces = roundMoney((tarif.deces / 1000) * input.capital_deces);
  const primeIpt = roundMoney((tarif.ipt / 1000) * input.capital_ipt);
  const primeFm = roundMoney((tarif.frais_medicaux / 1000) * capitalFm);
  // Indemnité quotidienne : tarif per franc × capital
  const primeIq = roundMoney(tarif.indemnite_quotidienne * capitalIq);

  const primeNette = primeDeces + primeIpt + primeFm + primeIq;

  // Facteur durée
  const dureeOption = findDureeOption(input.duree_mois);
  let primeTotale = roundMoney(primeNette * dureeOption.facteur);

  // Majoration 25% (moto / sports dangereux)
  const montantMajoration = input.has_majoration_25
    ? roundMoney(primeTotale * (DATA.majoration_25 / 100))
    : 0;
  primeTotale += montantMajoration;

  // Surprime âge > 60 ans
  const montantSurprime = input.has_surprime_age
    ? roundMoney(primeTotale * (DATA.surprime_age / 100))
    : 0;
  primeTotale += montantSurprime;

  return {
    productName: DATA.document_info.titre,
    devise: DATA.document_info.devise,
    breakdown: {
      classe: input.classe,
      classe_label: findClasseLabel(input.classe),
      capital_deces: input.capital_deces,
      capital_ipt: input.capital_ipt,
      capital_fm: capitalFm,
      capital_iq: capitalIq,
      prime_deces: primeDeces,
      prime_ipt: primeIpt,
      prime_fm: primeFm,
      prime_iq: primeIq,
      prime_nette: primeNette,
      duree_mois: input.duree_mois,
      duree_label: dureeOption.label,
      duree_facteur: dureeOption.facteur,
      has_majoration_25: input.has_majoration_25,
      majoration_25: montantMajoration,
      has_surprime_age: input.has_surprime_age,
      surprime_age: montantSurprime,
      prime_totale: primeTotale,
    },
  };
}

export function getAccidentsClassOptions(): {
  value: string;
  label: string;
}[] {
  return DATA.classes.map((c) => ({
    value: String(c.id),
    label: `${c.label} – ${c.description.split(".")[0]}`,
  }));
}

export function getAccidentsDureeOptions(): {
  value: string;
  label: string;
}[] {
  return DATA.durees.map((d) => ({
    value: String(d.mois_min === 1 && d.mois_max === 3 ? 3 : d.mois_max),
    label: d.label,
  }));
}
