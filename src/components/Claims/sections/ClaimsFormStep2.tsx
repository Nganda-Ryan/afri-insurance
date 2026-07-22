"use client";

import FileInput from "@/components/form/input/FileInput";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { FileWarningIcon } from "lucide-react";
import type { ClaimsDeclarationFormData } from "@/types/claims";

interface ClaimsFormStep2Props {
  form: ClaimsDeclarationFormData;
  onChange: (patch: Partial<ClaimsDeclarationFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

function isStep2Valid(form: ClaimsDeclarationFormData): boolean {
  return (
    form.adverseName.trim() !== "" &&
    form.adversePlate.trim() !== "" &&
    form.adverseInsurer.trim() !== "" &&
    form.circumstances.trim() !== "" &&
    form.damageInsuredVehicle.trim() !== "" &&
    form.damageAdverseVehicle.trim() !== "" &&
    form.injuredCount.trim() !== "" &&
    form.deceasedCount.trim() !== "" &&
    form.photos.length > 0 &&
    form.insuranceCertificate != null
  );
}

export function ClaimsFormStep2({
  form,
  onChange,
  onBack,
  onSubmit,
  isSubmitting = false,
}: ClaimsFormStep2Props) {
  return (
    <div className="space-y-6">
      <QuoteFormSection title="Détails, dommages et pièces" icon={FileWarningIcon}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <p className="mb-3 text-sm font-semibold text-gray-700">
              Partie adverse
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <Label htmlFor="claims-adverse-name">Nom</Label>
                <InputField
                  id="claims-adverse-name"
                  value={form.adverseName}
                  onChange={(e) => onChange({ adverseName: e.target.value })}
                  placeholder="Nom de la partie adverse"
                  className="border bg-white"
                />
              </div>
              <div>
                <Label htmlFor="claims-adverse-plate">Immatriculation</Label>
                <InputField
                  id="claims-adverse-plate"
                  value={form.adversePlate}
                  onChange={(e) => onChange({ adversePlate: e.target.value })}
                  placeholder="Immatriculation"
                  className="border bg-white"
                />
              </div>
              <div>
                <Label htmlFor="claims-adverse-insurer">Assureur</Label>
                <InputField
                  id="claims-adverse-insurer"
                  value={form.adverseInsurer}
                  onChange={(e) => onChange({ adverseInsurer: e.target.value })}
                  placeholder="Compagnie d'assurance"
                  className="border bg-white"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="claims-circumstances">
              Circonstances de l&apos;accident
            </Label>
            <TextArea
              placeholder="Décrivez les circonstances de l'accident…"
              rows={4}
              value={form.circumstances}
              onChange={(value) => onChange({ circumstances: value })}
              className="border bg-white text-gray-800"
            />
          </div>

          <div>
            <Label htmlFor="claims-damage-insured">
              Dommages sur le véhicule assuré
            </Label>
            <TextArea
              placeholder="Décrivez les dommages…"
              rows={3}
              value={form.damageInsuredVehicle}
              onChange={(value) => onChange({ damageInsuredVehicle: value })}
              className="border bg-white text-gray-800"
            />
          </div>

          <div>
            <Label htmlFor="claims-damage-adverse">
              Dommages sur le véhicule adverse
            </Label>
            <TextArea
              placeholder="Décrivez les dommages…"
              rows={3}
              value={form.damageAdverseVehicle}
              onChange={(value) => onChange({ damageAdverseVehicle: value })}
              className="border bg-white text-gray-800"
            />
          </div>

          <div>
            <Label htmlFor="claims-injured">Nombre de blessés</Label>
            <InputField
              id="claims-injured"
              type="number"
              min={0}
              value={form.injuredCount}
              onChange={(e) => onChange({ injuredCount: e.target.value })}
              className="border bg-white"
            />
          </div>

          <div>
            <Label htmlFor="claims-deceased">Nombre de décès</Label>
            <InputField
              id="claims-deceased"
              type="number"
              min={0}
              value={form.deceasedCount}
              onChange={(e) => onChange({ deceasedCount: e.target.value })}
              className="border bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="claims-photos">Prises de vue (photos)</Label>
            <FileInput
              id="claims-photos"
              className="bg-white"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                onChange({ photos: files });
              }}
            />
            {form.photos.length > 0 ? (
              <p className="mt-1.5 text-xs text-gray-500">
                {form.photos.length} fichier
                {form.photos.length > 1 ? "s" : ""} sélectionné
                {form.photos.length > 1 ? "s" : ""}
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-gray-500">
                Vous pouvez sélectionner plusieurs photos.
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="claims-certificate">Attestation d&apos;assurance</Label>
            <FileInput
              id="claims-certificate"
              className="bg-white"
              accept="image/*,.pdf,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                onChange({ insuranceCertificate: file });
              }}
            />
            {form.insuranceCertificate ? (
              <p className="mt-1.5 text-xs text-gray-500">
                Fichier : {form.insuranceCertificate.name}
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-gray-500">
                Joignez votre attestation d&apos;assurance (PDF ou image).
              </p>
            )}
          </div>
        </div>
      </QuoteFormSection>

      <QuoteStepNavigation
        onPrevious={onBack}
        onNext={onSubmit}
        nextLabel="Envoyer"
        nextDisabled={!isStep2Valid(form)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
