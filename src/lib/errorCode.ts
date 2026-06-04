export const errorCode = {
  "0": {
    description:
      "Le traitement de la transaction n'a pas généré d'erreur — elle est en cours ou a déjà été traitée avec succès.",
    action: "Aucune erreur. Vérifiez le statut du paiement.",
  },
  "2": {
    description: "La transaction fait l'objet d'une enquête.",
    action: "Contactez le support pour plus de détails.",
  },
  "3": {
    description: "La transaction a été annulée (reversed).",
    action: "Contactez le support pour plus de détails.",
  },
  "40401": {
    description: "Aucun bon disponible.",
    action: "Aucun bon disponible.",
  },
  "40701": {
    description: "Le paiement a expiré (timeout) pendant son exécution.",
    action: "Demandez un nouveau devis et réessayez.",
  },
  "41002": {
    description: "Solde insuffisant sur la passerelle de paiement.",
    action: "Réessayez plus tard. Contactez le support si le problème persiste.",
  },
  "41004": {
    description: "Passerelle vers l'opérateur temporairement indisponible.",
    action: "Réessayez plus tard.",
  },
  "60001": {
    description: "Aucune session agent ouverte.",
    action: "Contactez le support pour plus de détails.",
  },
  "60003": {
    description: "La session de l'entreprise n'est pas ouverte.",
    action: "Contactez le support pour plus de détails.",
  },
  "60010": {
    description: "Affectation de caisse invalide.",
    action: "Contactez le support pour plus de détails.",
  },
  "702000": {
    description: "Échec du paiement en raison d'une erreur générale.",
    action: "Contactez le support pour plus de détails.",
  },
  "702100": {
    description:
      "Échec lors de l'initialisation des communications avec l'opérateur.",
    action:
      "Réessayez. Contactez le support si l'erreur persiste lors d'une nouvelle tentative.",
  },
  "702101": {
    description:
      "La destination ne correspond pas à la plage attendue (ex. : numéro MSISDN non accepté par l'opérateur).",
    action:
      "Corrigez la demande et réessayez. Vérifiez les paramètres du service.",
  },
  "702102": {
    description: "Montant refusé : inférieur au seuil minimum autorisé.",
    action:
      "Corrigez la demande et réessayez. Vérifiez les paramètres du service.",
  },
  "702103": {
    description: "Montant refusé : supérieur au seuil maximum autorisé.",
    action:
      "Corrigez la demande et réessayez. Vérifiez les paramètres du service.",
  },
  "702105": {
    description: "Délai d'attente dépassé côté opérateur.",
    action:
      "Vérifiez le statut du paiement. Il doit passer en ERREUR ou SUCCÈS avant d'agir.",
  },
  "702106": {
    description:
      "Échec : l'opérateur est temporairement injoignable (phase d'initialisation).",
    action: "Réessayez plus tard. Contactez le support si le problème persiste.",
  },
  "703000": {
    description: "Échec du paiement en raison d'une erreur métier générale.",
    action: "Contactez le support pour plus de détails.",
  },
  "703003": {
    description: "Aucun numéro de téléphone n'est associé à cet abonné.",
    action: "Réessayez plus tard. Contactez le support si le problème persiste.",
  },
  "703020": {
    description:
      "L'opérateur est temporairement injoignable (après l'initialisation).",
    action: "Réessayez plus tard. Contactez le support si le problème persiste.",
  },
  "703100": {
    description:
      "Données invalides : un ou plusieurs champs de la demande de paiement ont été rejetés.",
    action:
      "Corrigez la demande et réessayez. Vérifiez les paramètres du service.",
  },
  "703102": {
    description: "L'opérateur a rejeté la transaction.",
    action: "Réessayez. Contactez le support si le problème persiste.",
  },
  "703103": {
    description: "Le compte bénéficiaire est bloqué chez l'opérateur.",
    action: "Informez le client.",
  },
  "703104": {
    description: "Le compte émetteur est bloqué chez l'opérateur.",
    action: "Informez le client.",
  },
  "703105": {
    description:
      "L'opérateur ne reconnaît pas le compte bénéficiaire de la transaction.",
    action: "Informez le client.",
  },
  "703106": {
    description:
      "L'opérateur ne reconnaît pas le compte émetteur de la transaction.",
    action: "Informez le client.",
  },
  "703107": {
    description:
      "Le compte bénéficiaire n'a pas suffisamment de fonds pour cette transaction.",
    action: "Informez le client.",
  },
  "703108": {
    description:
      "Le compte émetteur n'a pas suffisamment de fonds pour cette transaction.",
    action: "Informez le client.",
  },
  "703109": {
    description:
      "Montant refusé par l'opérateur : inférieur au seuil autorisé.",
    action:
      "Corrigez la demande et réessayez. Vérifiez les paramètres du service.",
  },
  "703110": {
    description:
      "Montant refusé par l'opérateur : supérieur au seuil autorisé.",
    action:
      "Corrigez la demande et réessayez. Vérifiez les paramètres du service.",
  },
  "703111": {
    description:
      "Le compte émetteur a dépassé sa limite (journalière, hebdomadaire, mensuelle, etc.).",
    action: "Informez le client.",
  },
  "703112": {
    description:
      "Le compte bénéficiaire a dépassé sa limite (journalière, hebdomadaire, mensuelle, etc.).",
    action: "Informez le client.",
  },
  "703113": {
    description:
      "L'élément de paiement n'est plus disponible ou a déjà été réglé.",
    action: "Récupérez un identifiant de paiement valide pour ce type de service.",
  },
  "703114": {
    description: "Montant refusé par l'opérateur : montant invalide.",
    action:
      "Corrigez la demande et réessayez. Vérifiez les paramètres du service.",
  },
  "703116": {
    description: "Code bouquet invalide.",
    action:
      "Corrigez la demande et réessayez. Contactez le support si le problème persiste.",
  },
  "703117": {
    description:
      "L'opérateur ne prend pas en charge le numéro de compte de la transaction.",
    action: "Informez le client.",
  },
  "703201": {
    description:
      "Le paiement nécessite une confirmation client qui n'a pas encore été donnée.",
    action: "Informez le client.",
  },
  "703202": {
    description:
      "Le client a refusé ou rejeté le paiement. La transaction ne peut pas aboutir sans confirmation.",
    action: "Informez le client. Relancez le paiement.",
  },
  "703203": {
    description:
      "Code de validation incorrect (PIN, OTP expiré, etc.). La transaction ne peut pas aboutir sans confirmation.",
    action: "Informez le client. Relancez le paiement.",
  },
  "703220": {
    description:
      "L'opérateur n'a pas trouvé le compte bénéficiaire de la transaction.",
    action: "Informez le client.",
  },
  "703401": {
    description:
      "Transaction introuvable chez l'opérateur lors de la vérification du statut.",
    action: "Contactez le support pour plus de détails.",
  },
  "703501": {
    description:
      "Erreur technique lors de la validation du paiement avec l'opérateur.",
    action: "Contactez le support pour plus de détails.",
  },
  "703503": {
    description: "Système de l'opérateur en maintenance.",
    action: "Réessayez. Contactez le support si le problème persiste.",
  },
  "704000": {
    description: "Erreur technique.",
    action: "Contactez le support pour plus de détails.",
  },
  "704003": {
    description: "Erreur de traitement du paiement.",
    action: "Contactez le support pour plus de détails.",
  },
  "704004": {
    description:
      "Le délai entre la recherche et le paiement de l'élément a expiré.",
    action: "Recommencez le parcours depuis le début.",
  },
  "704005": {
    description:
      "Erreur technique lors de la validation du paiement avec l'opérateur.",
    action: "Contactez le support pour plus de détails.",
  },
  "704006": {
    description: "Réponse inconnue de l'opérateur.",
    action: "Contactez le support pour plus de détails.",
  },
  "705000": {
    description: "Erreur technique inattendue.",
    action: "Contactez le support pour plus de détails.",
  },
  "705010": {
    description: "Délai d'attente dépassé lors de la communication avec l'opérateur.",
    action: "Réessayez plus tard. Contactez le support si le problème persiste.",
  },
  "705020": {
    description: "Délai d'attente dépassé lors de la communication avec l'opérateur.",
    action: "Réessayez plus tard. Contactez le support si le problème persiste.",
  },
  "705030": {
    description: "Délai d'attente dépassé lors de la communication avec l'opérateur.",
    action: "Réessayez plus tard. Contactez le support si le problème persiste.",
  },
  "90000": {
    description: "Erreur interne du serveur.",
    action: "Réessayez plus tard. Contactez le support si le problème persiste.",
  },
} as const;

export type S3pErrorCodeKey = keyof typeof errorCode;

/** Message utilisateur à partir du code S3P (description = raison). */
export function getS3pErrorMessage(
  code: number | string | null | undefined,
  fallback = "Une erreur de paiement est survenue.",
): string {
  if (code == null || code === "") return fallback;
  const entry = errorCode[String(code) as S3pErrorCodeKey];
  if (!entry) return fallback;
  return entry.description;
}

/** Instructions USSD après initiation du paiement mobile. */
export function getPaymentInitiatedMessage(
  channel: "" | "om" | "momo",
): string {
  const ussdHint =
    channel === "om"
      ? "saisissez #150*50#"
      : channel === "momo"
        ? "saisissez *126#"
        : "suivez les instructions affichées";

  return `Paiement initié. Suivez les instructions sur votre téléphone ou ${ussdHint}, puis vérifiez le statut.`;
}
