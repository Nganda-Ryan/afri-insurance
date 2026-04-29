"use client";

import { DownloadIcon, FileTextIcon } from "lucide-react";
import React, { useState } from "react";

import Button from "@/components/ui/button/Button";
import type { IAttachment } from "@/types/travel";
import { formatDate } from "./utils";

interface PolicyDocumentsCardProps {
  attachments: IAttachment[];
}

export function PolicyDocumentsCard({ attachments }: PolicyDocumentsCardProps) {
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);

  const handleDownload = (attachment: IAttachment, index: number) => {
    setDownloadingIndex(index);
    setTimeout(() => {
      window.open(attachment.content_url, "_blank");
      setDownloadingIndex(null);
    }, 800);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-6 bg-white">
      <div className="bg-brand-secondary bg-opacity-10 px-6 py-4 flex items-center gap-3 border-b border-gray-200">
        <FileTextIcon className="w-5 h-5 text-brand-secondary" />
        <h2 className="text-lg font-bold text-brand-secondary">Documents</h2>
      </div>
      <div className=" space-y-3">
        {attachments.map((attachment, index) => (
          <div
            key={attachment.file_name}
            className="flex items-center justify-between p-4 bg-surface-muted rounded-lg"
          >
            <div className="flex items-center gap-4">
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
            <Button
              onClick={() => handleDownload(attachment, index)}
              disabled={downloadingIndex === index}
              startIcon={<DownloadIcon className="w-5 h-5" />}
              className="min-w-[180px]"
            >
              {downloadingIndex === index
                ? "Téléchargement..."
                : "Télécharger"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
