"use client";

import React, { useState } from "react";
import { XIcon, FileTextIcon, DownloadIcon, CreditCardIcon } from "lucide-react";
import { toast } from "sonner";

import {
  SelectedPlan,
  TripDetailsData,
  TravelerInfoData,
} from "@/types/travel";
import { useSubscribeTravelPolicy } from "@/hooks/use-travel-quote-session";
import { buildSubscribePolicyInput } from "@/lib/travel/subscribe-mapper";

interface ValidationModalProps {
  selectedPlan: SelectedPlan;
  tripDetails: TripDetailsData;
  travelerInfo: TravelerInfoData;
  onClose: () => void;
}

export function ValidationModal({
  selectedPlan,
  tripDetails,
  travelerInfo,
  onClose,
}: ValidationModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const subscribe = useSubscribeTravelPolicy();

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast.success("Document de devis préparé (aperçu).");
    }, 1500);
  };

  const handleSubscribe = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Le nom complet, l’e-mail et le téléphone sont obligatoires.");
      return;
    }
    const payload = buildSubscribePolicyInput({
      subscriptionCountry: "Cameroun",
      languageCode: "fr",
      travelerFullName: fullName,
      travelerEmail: email,
      travelerBirthDate: travelerInfo.oldestTravelerBirthDate,
      travelerPhone: phone,
      address: "Cameroun",
      city: "Yaoundé",
      passportNumber: "PENDING-REF",
      passportExpiry: "2030/01/01",
    });
    subscribe.mutate(payload, {
      onSuccess: (res) => {
        toast.success(`Police créée (référence ${res.policyId}).`);
        onClose();
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : String(err));
      },
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="validation-modal-title"
        className="bg-surface-base rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-surface-base border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2
            id="validation-modal-title"
            className="text-2xl font-bold text-brand-secondary"
          >
            Devis validé
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-surface-muted rounded-lg transition-colors"
          >
            <XIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="#e74f1c"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M 35 60 L 52 77 L 85 44"
                  stroke="#e74f1c"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="bg-surface-muted rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-brand-secondary mb-4">
              Récapitulatif du plan choisi
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                <span className="font-semibold text-text-main">Type de plan</span>
                <span className="text-brand-primary font-bold">
                  {selectedPlan.name}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                <span className="font-semibold text-text-main">
                  Prime totale
                </span>
                <span className="text-2xl font-bold text-text-main">
                  {selectedPlan.source === "api"
                    ? `${selectedPlan.price}`
                    : `$${selectedPlan.price}`}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                <span className="font-semibold text-text-main">Destination</span>
                <span className="text-text-main">{tripDetails.destination}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                <span className="font-semibold text-text-main">
                  Dates de couverture
                </span>
                <span className="text-text-main">
                  {new Date(tripDetails.departureDate).toLocaleDateString()} -{" "}
                  {new Date(tripDetails.returnDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                <span className="font-semibold text-text-main">
                  Date de naissance du plus âgé
                </span>
                <span className="text-text-main">
                  {new Date(
                    travelerInfo.oldestTravelerBirthDate,
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-text-main">
                  Nombre de voyageurs
                </span>
                <span className="text-text-main">
                  {tripDetails.numberOfTravelers}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6 rounded-lg border border-gray-200 bg-surface-base p-6">
            <h3 className="mb-4 text-lg font-bold text-brand-secondary">
              Informations du souscripteur
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-brand-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-brand-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-main">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+237 6 00 00 00 00"
                  className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-brand-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-surface-muted p-6 rounded-lg">
              <FileTextIcon className="w-16 h-16 text-brand-primary" />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Document de devis prêt
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-text-inverse rounded-lg font-semibold hover:bg-opacity-90 transition-opacity shadow-md disabled:opacity-50"
            >
              <DownloadIcon className="w-5 h-5" />
              {isDownloading ? "Téléchargement..." : "Télécharger le devis PDF"}
            </button>
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={subscribe.isPending}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-brand-secondary text-text-inverse rounded-lg font-semibold hover:bg-opacity-90 transition-opacity shadow-md disabled:opacity-50"
            >
              <CreditCardIcon className="w-5 h-5" />
              {subscribe.isPending
                ? "Envoi…"
                : "Passer au paiement sécurisé"}
            </button>
          </div>

          <p className="text-xs text-gray-600 text-center mt-6">
            Votre devis est valable 30 jours. Aucun paiement n’est requis à ce stade.
          </p>
        </div>
      </div>
    </div>
  );
}
