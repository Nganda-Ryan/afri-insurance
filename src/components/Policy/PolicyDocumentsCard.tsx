"use client";

import { DownloadIcon, FileTextIcon } from "lucide-react";
import React, { useState } from "react";

import Button from "@/components/ui/button/Button";
import type { IAttachment } from "@/types/travel";
import { formatDate } from "@/lib/utils";

interface PolicyDocumentsCardProps {
  attachments: IAttachment[];
}

export function PolicyDocumentsCard({ attachments }: PolicyDocumentsCardProps) {
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);

  const handleDownload = (attachment: IAttachment, index: number) => {
    console.log("handleDownload", attachment, index);
    setDownloadingIndex(index);
    setTimeout(() => {
      window.open(attachment.content_url, "_blank");
      setDownloadingIndex(null);
    }, 800);
  };

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-brand-primary px-6 py-4 dark:border-gray-700">
        <FileTextIcon className="w-5 h-5 text-white" />
        <h2 className="text-lg font-bold text-white">Documents</h2>
      </div>
      <div className="space-y-3">
        {attachments.map((attachment, index) => (
          <div
            key={attachment.file_name}
            className="flex items-center justify-between rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/60"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm font-semibold text-text-main dark:text-gray-100">
                  {attachment.file_name}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
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
