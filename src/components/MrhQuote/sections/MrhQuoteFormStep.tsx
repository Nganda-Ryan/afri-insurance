"use client";

import { useMemo, useState } from "react";
import { HomeIcon } from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { QuoteAmountBreakdownTable } from "@/components/Quote/layout/QuoteAmountBreakdownTable";
import { QuoteFormSection } from "@/components/Quote/layout/QuoteFormSection";
import { QuoteStepNavigation } from "@/components/Quote/layout/QuoteStepNavigation";
import {
  calculateMrhQuote,
  getMrhProfilOptions,
  getMrhTarifOptions,
  isMrhLocataireProfil,
} from "@/lib/mrh/calculate-mrh-quote";
import { getMrhBreakdownTableRows } from "@/lib/mrh/mrh-breakdown-display";
import { MRH_GARANTIE_LABELS, MRH_INSURANCE_DATA } from "@/lib/constants/mrh_insurance";
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
  const effectiveTarifIndex = useMemo(
    () => pickOptionValue(tarifIndex, tarifOptions),
    [tarifIndex, tarifOptions],
  );
  const isLocataire = useMemo(
    () => isMrhLocataireProfil(effectiveProfilId),
    [effectiveProfilId],
  );

  const parsedTarifIndex = Number.parseInt(effectiveTarifIndex, 10);
  const quoteResult = useMemo(() => {
    if (!effectiveProfilId || !Number.isFinite(parsedTarifIndex) || parsedTarifIndex < 0) {
      return null;
    }
    return calculateMrhQuote({ profilId: effectiveProfilId, tarifIndex: parsedTarifIndex });
  }, [effectiveProfilId, parsedTarifIndex]);

  const devise = MRH_INSURANCE_DATA.document_info.devise;
  const breakdown = quoteResult?.breakdown;
  const breakdownTableRows = useMemo(
    () =>
      breakdown
        ? getMrhBreakdownTableRows(breakdown, devise, { isLocataire })
        : [],
    [breakdown, devise, isLocataire],
  );
  const canSubmit = quoteResult != null;

  const garantiesLabel = useMemo(() => {
    if (!quoteResult) return "";
    return quoteResult.garanties
      .map((code) => MRH_GARANTIE_LABELS[code] ?? code)
      .join(", ");
  }, [quoteResult]);

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
              value={effectiveTarifIndex}
              onChange={setTarifIndex}
              options={tarifOptions}
              placeholder="Choisir une tranche"
            />
          </div>
        </div>

        {quoteResult ? (
          <div className="mt-4 rounded-lg border border-brand-primary/20 bg-brand-primary/5 px-4 py-3">
            <p className="text-sm font-medium text-gray-700">Garanties incluses</p>
            <p className="mt-1 text-sm text-gray-600">{garantiesLabel}</p>
          </div>
        ) : null}
      </QuoteFormSection>

      {breakdown ? (
        <QuoteFormSection title="Détail de la prime" icon={HomeIcon}>
          <QuoteAmountBreakdownTable rows={breakdownTableRows} />
          <p className="mt-4 text-xs text-gray-500">
            {MRH_INSURANCE_DATA.note_bas_de_page}
          </p>
        </QuoteFormSection>
      ) : (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Sélectionnez un profil et une tranche tarifaire pour afficher le détail de la prime.
        </p>
      )}

      <QuoteStepNavigation
        showPrevious={false}
        onNext={handleSubmit}
        nextLabel="Voir le récapitulatif"
        nextDisabled={!canSubmit}
      />
    </div>
  );
}
