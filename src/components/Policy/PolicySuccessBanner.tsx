import { CheckCircleIcon } from "lucide-react";
import React from "react";

interface PolicySuccessBannerProps {
  policyNumber: string;
}

export function PolicySuccessBanner({ policyNumber }: PolicySuccessBannerProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <CheckCircleIcon className="w-7 h-7 text-green-600" />
      </div>
      <div>
        <h3 className="font-bold text-green-800">Paiement effectué</h3>
        <p className="text-sm text-green-700 mt-0.5">
          Votre police{" "}
          <span className="font-mono font-bold">{policyNumber}</span> a été
          émise avec succès.
        </p>
      </div>
    </div>
  );
}
