"use client";

import DatePicker from "@/components/form/date-picker";
import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import { AlertTriangleIcon } from "lucide-react";
import type { ClaimsDeclarationFormData } from "@/types/claims";

interface ClaimsFormStep1Props {
  form: ClaimsDeclarationFormData;
  onChange: (patch: Partial<ClaimsDeclarationFormData>) => void;
  onNext: () => void;
}

function isStep1Valid(form: ClaimsDeclarationFormData): boolean {
  return (
    form.insuredName.trim() !== "" &&
    form.incidentDate.trim() !== "" &&
    form.incidentPlace.trim() !== "" &&
    form.vehiclePlate.trim() !== "" &&
    form.policyNumber.trim() !== "" &&
    form.coverageStart.trim() !== "" &&
    form.coverageEnd.trim() !== ""
  );
}

export function ClaimsFormStep1({ form, onChange, onNext }: ClaimsFormStep1Props) {
  return (
    <div className="space-y-6">
      <QuoteFormSection title="Informations du sinistre" icon={AlertTriangleIcon}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="claims-insured-name">Nom de l&apos;assuré</Label>
            <InputField
              id="claims-insured-name"
              value={form.insuredName}
              onChange={(e) => onChange({ insuredName: e.target.value })}
              placeholder="Nom et prénom de l'assuré"
              className="border bg-white"
            />
          </div>

          <div>
            <DatePicker
              id="claims-incident-date"
              label="Date de survenance du sinistre"
              value={form.incidentDate}
              onChange={(value: string) => onChange({ incidentDate: value })}
              placeholder="Sélectionner une date"
            />
          </div>

          <div>
            <Label htmlFor="claims-incident-place">Lieu de survenance</Label>
            <InputField
              id="claims-incident-place"
              value={form.incidentPlace}
              onChange={(e) => onChange({ incidentPlace: e.target.value })}
              placeholder="Ville, quartier, route…"
              className="border bg-white"
            />
          </div>

          <div>
            <Label htmlFor="claims-vehicle-plate">
              Immatriculation du véhicule assuré
            </Label>
            <InputField
              id="claims-vehicle-plate"
              value={form.vehiclePlate}
              onChange={(e) => onChange({ vehiclePlate: e.target.value })}
              placeholder="Ex. LT 1234 AB"
              className="border bg-white"
            />
          </div>

          <div>
            <Label htmlFor="claims-policy-number">N° de police d&apos;assurance</Label>
            <InputField
              id="claims-policy-number"
              value={form.policyNumber}
              onChange={(e) => onChange({ policyNumber: e.target.value })}
              placeholder="Numéro de police"
              className="border bg-white"
            />
          </div>

          <div>
            <DatePicker
              id="claims-coverage-start"
              label="Période de couverture — effet"
              value={form.coverageStart}
              onChange={(value: string) => onChange({ coverageStart: value })}
              placeholder="Date d'effet"
            />
          </div>

          <div>
            <DatePicker
              id="claims-coverage-end"
              label="Période de couverture — échéance"
              value={form.coverageEnd}
              onChange={(value: string) => onChange({ coverageEnd: value })}
              placeholder="Date d'échéance"
            />
          </div>
        </div>
      </QuoteFormSection>

      <QuoteStepNavigation
        showPrevious={false}
        onNext={onNext}
        nextLabel="Suivant"
        nextDisabled={!isStep1Valid(form)}
      />
    </div>
  );
}
