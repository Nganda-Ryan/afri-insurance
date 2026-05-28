"use client";

import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { formatDateDisplay } from "@/lib/utils";
import type { SubscriberFormData } from "@/types/subscribe";

interface RecapStepProps {
  recapData: SubscriberFormData;
  isSubmitting: boolean;
  onBack: () => void;
  onContinue: () => void;
}

export function SubscribeRecapStep({
  recapData,
  isSubmitting,
  onBack,
  onContinue,
}: RecapStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-4 text-sm text-text-main sm:p-6">
        <h2 className="text-xl font-bold">Synthèse avant paiement</h2>
        <p className="text-text-main text-opacity-80">
          Vérifiez vos informations avant de passer au paiement.
        </p>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 text-base font-semibold">Souscripteur principal</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <p>
              <span className="font-semibold">Nom complet :</span> {recapData.title}{" "}
              {recapData.first_name} {recapData.last_name}
            </p>
            <p>
              <span className="font-semibold">Date de naissance :</span>{" "}
              {formatDateDisplay(recapData.birth_date)}
            </p>
            <p>
              <span className="font-semibold">Email :</span> {recapData.email}
            </p>
            <p>
              <span className="font-semibold">Téléphone :</span> {recapData.phone_number}
            </p>
            <p>
              <span className="font-semibold">Passeport :</span> {recapData.passport_number}
            </p>
            <p>
              <span className="font-semibold">Expiration passeport :</span>{" "}
              {formatDateDisplay(recapData.passeport_exp_date)}
            </p>
            <p className="sm:col-span-2">
              <span className="font-semibold">Adresse :</span> {recapData.address},{" "}
              {recapData.city}
            </p>
          </div>
        </div>

        {recapData.groupMembers.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-base font-semibold">Membres du groupe</h3>
            <div className="space-y-3">
              {recapData.groupMembers.map((member, index) => (
                <div
                  key={`${member.first_name}-${member.last_name}-${index}`}
                  className="rounded-md border border-border p-3"
                >
                  <p className="font-semibold">Membre {index + 2}</p>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <p>
                      <span className="font-semibold">Nom complet :</span> {member.title}{" "}
                      {member.first_name} {member.last_name}
                    </p>
                    <p>
                      <span className="font-semibold">Date de naissance :</span>{" "}
                      {formatDateDisplay(member.birth_date)}
                    </p>
                    <p>
                      <span className="font-semibold">Email :</span> {member.email}
                    </p>
                    <p>
                      <span className="font-semibold">Téléphone :</span>{" "}
                      {member.phone_number}
                    </p>
                    <p>
                      <span className="font-semibold">Passeport :</span>{" "}
                      {member.passport_number}
                    </p>
                    <p>
                      <span className="font-semibold">Expiration passeport :</span>{" "}
                      {formatDateDisplay(member.passeport_exp_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <QuoteStepNavigation
        onPrevious={onBack}
        onNext={onContinue}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
