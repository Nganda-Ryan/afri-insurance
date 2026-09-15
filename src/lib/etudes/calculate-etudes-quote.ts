import { ETUDES_INSURANCE_PRODUCT_DATA } from "@/lib/constants/etudes_insurance";
import type {
  EtudesQuoteFormInput,
  EtudesQuoteResult,
  EtudesTarifRow,
} from "@/types/etudes-insurance";

const DATA = ETUDES_INSURANCE_PRODUCT_DATA;

function findTarif(
  renteAnnuelle: number,
  dureeService: number,
): EtudesTarifRow | undefined {
  return DATA.tarifs.find(
    (t) =>
      t.rente_annuelle === renteAnnuelle && t.duree_service === dureeService,
  );
}

export function calculateEtudesQuote(
  input: EtudesQuoteFormInput,
): EtudesQuoteResult | null {
  const renteAnnuelle = Math.floor(input.rente_annuelle);
  const dureeService = Math.floor(input.duree_service);

  if (renteAnnuelle <= 0 || dureeService <= 0) return null;

  const tarif = findTarif(renteAnnuelle, dureeService);
  if (!tarif) return null;

  return {
    productName: DATA.document_info.titre,
    devise: DATA.document_info.devise,
    breakdown: {
      rente_annuelle: tarif.rente_annuelle,
      duree_service: tarif.duree_service,
      cotisation: tarif.cotisation,
    },
  };
}

export function getEtudesRenteOptions(): {
  value: string;
  label: string;
}[] {
  return DATA.rentes_annuelles.map((rente) => ({
    value: String(rente),
    label: `${rente.toLocaleString("fr-FR")} ${DATA.document_info.devise}`,
  }));
}

export function getEtudesDureeOptions(): {
  value: string;
  label: string;
}[] {
  return DATA.durees_service.map((duree) => ({
    value: String(duree),
    label: duree === 1 ? "1 an" : `${duree} ans`,
  }));
}
