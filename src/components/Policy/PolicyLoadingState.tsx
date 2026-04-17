import { LoaderIcon } from "lucide-react";
import React from "react";

export function PolicyLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoaderIcon className="w-12 h-12 text-brand-primary animate-spin" />
      <p className="text-brand-secondary font-semibold mt-4 text-lg">
        Chargement de votre police...
      </p>
      <p className="text-gray-500 text-sm mt-1">
        Génération de vos documents
      </p>
    </div>
  );
}
