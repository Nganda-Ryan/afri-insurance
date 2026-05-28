import React from "react";

import { formatDate } from "@/lib/utils";
import { ICatalog } from "@/types/travel";

interface PolicyFooterProps {
  catalog: ICatalog;
  createdAt: string;
}

export function PolicyFooter({ catalog, createdAt }: PolicyFooterProps) {
  return (
    <div className="rounded-lg p-5 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Code catalogue :{" "}
        <span className="font-mono font-semibold">{catalog.code}</span> ·
        Version {catalog.version} · Devise :{" "}
        <span className="font-semibold">{catalog.currency}</span>
      </p>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Police émise le {formatDate(createdAt.split(" ")[0])} · Pour toute
        question, contactez votre assureur.
      </p>
    </div>
  );
}
