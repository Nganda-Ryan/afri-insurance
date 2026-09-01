"use client";

import { useMemo, useState } from "react";
import { HomeIcon } from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import {
  calculateMrhQuote,
  getMrhProfilOptions,
  getMrhTarifOptions,
} from "@/lib/mrh/calculate-mrh-quote";
import type { MrhQuoteFormInput, MrhQuoteResult } from "@/types/mrh-insurance";

interface MrhQuoteFormStepProps {
  initialForm?: MrhQuoteFormInput | null;
  onSubmit: (form: MrhQuoteFormInput, quote: MrhQuoteResult) => void;
}

export function MrhQuoteFormStep({ initialForm, onSubmit }: MrhQuoteFormStepProps) {
  const profilOptions = useMemo(() => getMrhProfilOptions(), []);

  const [profilId, setProfilId] = useState(initialForm?.profilId ?? "");
  const [tarifIndex, setTarifIndex] = useState(
    initialForm?.tarifIndex != null ? String(initialForm.tarifIndex) : "",
  );

  const hasExplicitProfil =
    profilId !== "" && profilOptions.some((option) => option.value === profilId);

  const tarifOptions = useMemo(
    () => (hasExplicitProfil ? getMrhTarifOptions(profilId) : []),
    [hasExplicitProfil, profilId],
  );

  const hasExplicitTarifSelection =
    tarifIndex !== "" && tarifOptions.some((option) => option.value === tarifIndex);
  const parsedTarifIndex = hasExplicitTarifSelection
    ? Number.parseInt(tarifIndex, 10)
    : NaN;

  const quoteResult = useMemo(() => {
    if (!hasExplicitProfil || !Number.isFinite(parsedTarifIndex) || parsedTarifIndex < 0) {
      return null;
    }
    return calculateMrhQuote({ profilId, tarifIndex: parsedTarifIndex });
  }, [hasExplicitProfil, profilId, parsedTarifIndex]);

  const canSubmit = quoteResult != null;

  const handleSubmit = () => {
    if (!quoteResult || !hasExplicitProfil) return;
    onSubmit(
      { profilId, tarifIndex: parsedTarifIndex },
      quoteResult,
    );
  };

  return (
    <div className="space-y-6">
      <QuoteFormSection title="Cotation multirisque habitation" icon={HomeIcon}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="mrh-profil">Profil du client</Label>
            <Select
              id="mrh-profil"
              value={hasExplicitProfil ? profilId : ""}
              onChange={(value) => {
                setProfilId(value);
                setTarifIndex("");
              }}
              options={profilOptions}
              placeholder="Choisir un profil"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="mrh-tarif">Valeur du batiment</Label>
            <Select
              id="mrh-tarif"
              value={hasExplicitTarifSelection ? tarifIndex : ""}
              onChange={setTarifIndex}
              options={tarifOptions}
              placeholder="Choisir une valeur"
              disabled={!hasExplicitProfil || tarifOptions.length === 0}
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
