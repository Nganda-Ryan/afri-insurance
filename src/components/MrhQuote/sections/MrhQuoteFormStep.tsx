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

function pickOptionValue(
  value: string,
  options: { value: string }[],
): string {
  return options.some((option) => option.value === value)
    ? value
    : (options[0]?.value ?? "");
}

export function MrhQuoteFormStep({ initialForm, onSubmit }: MrhQuoteFormStepProps) {
  const profilOptions = useMemo(() => getMrhProfilOptions(), []);
  const defaultProfil = initialForm?.profilId ?? profilOptions[0]?.value ?? "";

  const [profilId, setProfilId] = useState(defaultProfil);
  const [tarifIndex, setTarifIndex] = useState(
    initialForm?.tarifIndex != null ? String(initialForm.tarifIndex) : "",
  );

  const effectiveProfilId = useMemo(
    () => pickOptionValue(profilId, profilOptions),
    [profilId, profilOptions],
  );

  const tarifOptions = useMemo(
    () => getMrhTarifOptions(effectiveProfilId),
    [effectiveProfilId],
  );

  const hasExplicitTarifSelection =
    tarifIndex !== "" && tarifOptions.some((option) => option.value === tarifIndex);
  const parsedTarifIndex = hasExplicitTarifSelection
    ? Number.parseInt(tarifIndex, 10)
    : NaN;

  const quoteResult = useMemo(() => {
    if (!effectiveProfilId || !Number.isFinite(parsedTarifIndex) || parsedTarifIndex < 0) {
      return null;
    }
    return calculateMrhQuote({ profilId: effectiveProfilId, tarifIndex: parsedTarifIndex });
  }, [effectiveProfilId, parsedTarifIndex]);

  const canSubmit = quoteResult != null;

  const handleSubmit = () => {
    if (!quoteResult) return;
    onSubmit(
      { profilId: effectiveProfilId, tarifIndex: parsedTarifIndex },
      quoteResult,
    );
  };

  return (
    <div className="space-y-6">
      <QuoteFormSection title="Cotation multirisque habitation" icon={HomeIcon}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="mrh-profil">Profil d&apos;assurance</Label>
            <Select
              id="mrh-profil"
              value={effectiveProfilId}
              onChange={(value) => {
                setProfilId(value);
                setTarifIndex("");
              }}
              options={profilOptions}
              placeholder="Choisir un profil"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="mrh-tarif">Grille tarifaire</Label>
            <Select
              id="mrh-tarif"
              value={hasExplicitTarifSelection ? tarifIndex : ""}
              onChange={setTarifIndex}
              options={tarifOptions}
              placeholder="Choisir une tranche"
            />
          </div>
        </div>
      </QuoteFormSection>

      <QuoteStepNavigation
        showPrevious={false}
        onNext={handleSubmit}
        nextLabel="Générer devis"
        nextDisabled={!canSubmit}
      />
    </div>
  );
}
