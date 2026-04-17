import React from "react";

import type { IPolicyCatalog } from "@/types/travel";
import { formatDate } from "./utils";

interface PolicyFooterProps {
  catalog: IPolicyCatalog;
  createdAt: string;
}

export function PolicyFooter({ catalog, createdAt }: PolicyFooterProps) {
  return (
    <div className="bg-surface-muted rounded-lg p-5 text-center">
      <p className="text-sm text-gray-600">
        Code catalogue :{" "}
        <span className="font-mono font-semibold">{catalog.code}</span> ·
        Version {catalog.version} · Devise :{" "}
        <span className="font-semibold">{catalog.currency}</span>
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Police émise le {formatDate(createdAt.split(" ")[0])} · Pour toute
        question, contactez votre assureur.
      </p>
    </div>
  );
}
