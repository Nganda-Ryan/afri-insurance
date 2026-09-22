"use client";

import { useMemo, useState } from "react";
import { GraduationCap } from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import {
  calculateEtudesQuote,
  getEtudesDureeOptions,
  getEtudesRenteOptions,
} from "@/lib/etudes/calculate-etudes-quote";
import type {
  EtudesQuoteFormInput,
  EtudesQuoteResult,
} from "@/types/etudes-insurance";

interface EtudesQuoteFormStepProps {
  initialForm?: EtudesQuoteFormInput | null;
  onSubmit: (form: EtudesQuoteFormInput, quote: EtudesQuoteResult) => void;
}

export function EtudesQuoteFormStep({
  initialForm,
  onSubmit,
}: EtudesQuoteFormStepProps) {
  const renteOptions = useMemo(() => getEtudesRenteOptions(), []);
  const dureeOptions = useMemo(() => getEtudesDureeOptions(), []);

  const [renteAnnuelle, setRenteAnnuelle] = useState(
    initialForm?.rente_annuelle != null
      ? String(initialForm.rente_annuelle)
      : "",
  );
  const [dureeService, setDureeService] = useState(
    initialForm?.duree_service != null
      ? String(initialForm.duree_service)
      : "",
  );

  const hasExplicitRente =
    renteAnnuelle !== "" &&
    renteOptions.some((option) => option.value === renteAnnuelle);
  const hasExplicitDuree =
    dureeService !== "" &&
    dureeOptions.some((option) => option.value === dureeService);

  const formInput = useMemo((): EtudesQuoteFormInput | null => {
    if (!hasExplicitRente || !hasExplicitDuree) return null;
    const renteValue = Number.parseInt(renteAnnuelle, 10);
    const dureeValue = Number.parseInt(dureeService, 10);
    if (!Number.isFinite(renteValue) || !Number.isFinite(dureeValue)) {
      return null;
    }
    return {
      rente_annuelle: renteValue,
      duree_service: dureeValue,
    };
  }, [renteAnnuelle, dureeService, hasExplicitRente, hasExplicitDuree]);

  const quoteResult = useMemo(
    () => (formInput ? calculateEtudesQuote(formInput) : null),
    [formInput],
  );

  const canSubmit = quoteResult != null && formInput != null;

  const handleSubmit = () => {
    if (!quoteResult || !formInput) return;
    onSubmit(formInput, quoteResult);
  };

  return (
    <div className="space-y-6">
      <QuoteFormSection title="Cotation Afrikids Etudes" icon={GraduationCap}>
        <p className="text-sm text-text-main text-opacity-80">
          Le produit Afrikids Etudes garantit le versement d&apos;une rente
          annuelle pour les frais de scolarité en cas de Décès ou Invalidité
          Absolue et Définitive (IAD) d&apos;un parent ou tuteur.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="etudes-rente">Rente annuelle</Label>
            <Select
              id="etudes-rente"
              value={hasExplicitRente ? renteAnnuelle : ""}
              onChange={setRenteAnnuelle}
              options={renteOptions}
              placeholder="Choisir la rente"
            />
          </div>

          <div>
            <Label htmlFor="etudes-duree">Durée du service de la rente</Label>
            <Select
              id="etudes-duree"
              value={hasExplicitDuree ? dureeService : ""}
              onChange={setDureeService}
              options={dureeOptions}
              placeholder="Choisir la durée"
            />
          </div>
        </div>
      </QuoteFormSection>

      <QuoteStepNavigation
        showPrevious={false}
        onNext={handleSubmit}
        nextLabel="Obtenir un devis"
        nextDisabled={!canSubmit}
      />
    </div>
  );
}
