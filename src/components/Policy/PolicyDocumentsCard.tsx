"use client";

import { DownloadIcon, FileTextIcon } from "lucide-react";
import React, { useState } from "react";

import type { IPolicyAttachment } from "@/types/travel";
import { formatDate } from "./utils";

interface PolicyDocumentsCardProps {
  attachments: IPolicyAttachment[];
}

export function PolicyDocumentsCard({ attachments }: PolicyDocumentsCardProps) {
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);

  const handleDownload = (attachment: IPolicyAttachment, index: number) => {
    setDownloadingIndex(index);
    setTimeout(() => {
      window.open(attachment.content_url, "_blank");
      setDownloadingIndex(null);
    }, 800);
  };

  return (
    <div className="bg-surface-base border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="bg-brand-secondary bg-opacity-10 px-6 py-4 flex items-center gap-3 border-b border-gray-200">
        <FileTextIcon className="w-5 h-5 text-brand-secondary" />
        <h2 className="text-lg font-bold text-brand-secondary">Documents</h2>
      </div>
      <div className="p-6 space-y-3">
        {attachments.map((attachment, index) => (
          <div
            key={attachment.file_name}
            className="flex items-center justify-between p-4 bg-surface-muted rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <FileTextIcon className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <p className="font-semibold text-text-main text-sm">
                  {attachment.file_name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Généré le{" "}
                  {formatDate(attachment.created_at.split(" ")[0])}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleDownload(attachment, index)}
              disabled={downloadingIndex === index}
              className="flex items-center gap-2 px-5 py-3 bg-brand-primary text-text-inverse rounded-lg font-semibold hover:bg-opacity-90 transition-opacity shadow-md disabled:opacity-50 min-w-[180px] justify-center"
            >
              <DownloadIcon className="w-5 h-5" />
              {downloadingIndex === index
                ? "Téléchargement..."
                : "Télécharger le certificat"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
