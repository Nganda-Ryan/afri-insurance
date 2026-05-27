import "server-only";

import { getClientCredentialsAccessToken } from "@/lib/http/oauth";
import { travelService } from "@/services/travel.service";
import type { IAttachment, IPolicyData } from "@/types/travel";

export type PolicyContractEmailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

const POLL_ATTEMPTS = 4;
const POLL_DELAY_MS = 2000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function guessContentType(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

function sanitizeFilename(name: string, fallback: string): string {
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed.replace(/[^\w.\- ]+/g, "_") : fallback;
}

async function fetchPolicyData(
  policyId: string,
  customerEmail: string,
): Promise<IPolicyData | null> {
  try {
    const data = await travelService.getPolicy(policyId, {
      customer_email: customerEmail,
    });
    return data as IPolicyData;
  } catch {
    return null;
  }
}

async function downloadFromContentUrl(
  attachment: IAttachment,
): Promise<PolicyContractEmailAttachment | null> {
  const url = attachment.content_url?.trim();
  if (!url) return null;

  const filename = sanitizeFilename(
    attachment.file_name || attachment.name,
    "contrat.pdf",
  );

  try {
    const token = await getClientCredentialsAccessToken();
    let res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      res = await fetch(url);
    }

    if (!res.ok) return null;

    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length === 0) return null;

    return {
      filename,
      content: buffer,
      contentType: res.headers.get("content-type") ?? guessContentType(filename),
    };
  } catch {
    return null;
  }
}

async function fetchCertificateAttachment(
  policyId: string,
): Promise<PolicyContractEmailAttachment | null> {
  try {
    const cert = await travelService.getPolicyCertificate(policyId);
    const buffer = Buffer.from(cert);
    if (buffer.length === 0) return null;
    return {
      filename: `contrat-${policyId}.pdf`,
      content: buffer,
      contentType: "application/pdf",
    };
  } catch {
    return null;
  }
}

/**
 * Récupère les pièces jointes du contrat (mêmes documents que sur /quote/[policyId]).
 * Réessaie brièvement si les documents ne sont pas encore générés côté EVO.
 */
export async function fetchPolicyContractEmailAttachments(
  policyId: string,
  customerEmail: string,
): Promise<PolicyContractEmailAttachment[]> {
  for (let attempt = 0; attempt < POLL_ATTEMPTS; attempt++) {
    const policy = await fetchPolicyData(policyId, customerEmail);
    if (policy) {
      const downloadable = (policy.attachments ?? []).filter(
        (item) =>
          typeof item.content_url === "string" && item.content_url.length > 0,
      );

      if (downloadable.length > 0) {
        const downloaded = await Promise.all(
          downloadable.map((attachment) => downloadFromContentUrl(attachment)),
        );
        const valid = downloaded.filter(
          (item): item is PolicyContractEmailAttachment => item != null,
        );
        if (valid.length > 0) return valid;
      }

      const certificate = await fetchCertificateAttachment(policyId);
      if (certificate) return [certificate];

      if (policy.attachments_generated > 0 && attempt < POLL_ATTEMPTS - 1) {
        await sleep(POLL_DELAY_MS);
        continue;
      }
    }

    if (attempt < POLL_ATTEMPTS - 1) {
      await sleep(POLL_DELAY_MS);
    }
  }

  const certificate = await fetchCertificateAttachment(policyId);
  return certificate ? [certificate] : [];
}
