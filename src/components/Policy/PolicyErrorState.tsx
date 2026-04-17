import { AlertCircleIcon } from "lucide-react";
import React from "react";

interface PolicyErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function PolicyErrorState({ message, onRetry }: PolicyErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <AlertCircleIcon className="w-8 h-8 text-red-500" />
      </div>
      <p className="text-lg font-semibold text-text-main">
        Impossible de charger la police
      </p>
      <p className="text-sm text-gray-500 mt-1 max-w-sm">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 px-5 py-2.5 bg-brand-primary text-text-inverse rounded-lg font-semibold hover:bg-opacity-90 transition-opacity"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
