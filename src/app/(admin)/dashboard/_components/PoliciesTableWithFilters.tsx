"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  RefreshCcw,
  Search,
  ShieldCheck,
  Calendar,
  FileText,
  Eye,
  Ban,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCancelTravelPolicy,
} from "@/hooks/use-travel-quote-session";
import { getTravelPolicyAction } from "@/actions/travel-session.actions";

interface Policy {
  id: string;
  externalPolicyId: string | null;
  policyType: string | null;
  planCategory: string;
  destination: string;
  createdAt: string;
}

interface PoliciesTableWithFiltersProps {
  policies: Policy[];
}

export function PoliciesTableWithFilters({ policies }: PoliciesTableWithFiltersProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [cancelDialogPolicy, setCancelDialogPolicy] = useState<Policy | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const cancelPolicy = useCancelTravelPolicy();
  const [downloadingPolicyId, setDownloadingPolicyId] = useState<string | null>(null);
  const [downloadingAttachmentIndex, setDownloadingAttachmentIndex] = useState<number | null>(
    null,
  );
  const downloadTimeoutsRef = useRef<number[]>([]);

  const categories = useMemo(
    () => Array.from(new Set(policies.map((policy) => policy.planCategory))),
    [policies]
  );

  const filteredPolicies = useMemo(
    () =>
      policies.filter((policy) => {
        const normalizedSearch = searchTerm.toLowerCase();
        const matchesSearch =
          (policy.externalPolicyId ?? "").toLowerCase().includes(normalizedSearch) ||
          (policy.policyType ?? "").toLowerCase().includes(normalizedSearch) ||
          policy.planCategory.toLowerCase().includes(normalizedSearch) ||
          policy.destination.toLowerCase().includes(normalizedSearch) ||
          policy.id.toLowerCase().includes(normalizedSearch);
        const matchesCategory =
          categoryFilter === "all" || policy.planCategory === categoryFilter;

        return matchesSearch && matchesCategory;
      }),
    [categoryFilter, policies, searchTerm]
  );

  const handleExport = () => {
    const csv = [
      ["Référence externe", "Référence interne", "Type", "Catégorie", "Destination", "Date de création"],
      ...filteredPolicies.map((policy) => [
        policy.externalPolicyId ?? "",
        policy.id,
        policy.policyType ?? "",
        policy.planCategory,
        policy.destination,
        new Date(policy.createdAt).toLocaleDateString("fr-FR"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `polices_${new Date().toISOString().split("T")[0]}.csv`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  const resolveExternalPolicyId = (policy: Policy): string | null =>
    policy.externalPolicyId?.trim() || null;

  const handleViewDetails = (policy: Policy) => {
    const externalPolicyId = resolveExternalPolicyId(policy);
    if (!externalPolicyId) {
      toast.error("Détail indisponible: référence externe manquante.");
      return;
    }
    router.push(`/dashboard/policies/${externalPolicyId}`);
  };

  const handleNavigateUpdate = (policy: Policy) => {
    const externalPolicyId = resolveExternalPolicyId(policy);
    if (!externalPolicyId) {
      toast.error("Mise à jour impossible: référence externe manquante.");
      return;
    }
    router.push(`/dashboard/policies/${externalPolicyId}/update`);
  };

  const handleDownloadCertificate = async (policy: Policy) => {
    console.log("handleDownloadCertificate", policy);
    const externalPolicyId = resolveExternalPolicyId(policy);
    if (!externalPolicyId) {
      toast.error("Téléchargement impossible: référence externe manquante.");
      return;
    }

    // Même séquence que `quote/[policyId]/page.tsx` (hook `useTravelPolicy`) :
    // récupérer la police puis ouvrir les `attachments.content_url`.
    const policyRes = await getTravelPolicyAction(externalPolicyId);
    if (!policyRes.ok || !policyRes.data) {
      toast.error(policyRes.error?.message ?? "Police introuvable.");
      return;
    }

    const downloadableAttachments = (policyRes.data.attachments ?? []).filter(
      (item) => typeof item.content_url === "string" && item.content_url.length > 0,
    );
    if (downloadableAttachments.length === 0) {
      toast.error("Aucun document téléchargeable disponible.");
      return;
    }

    // Empêche les doubles clics de laisser des setTimeout actifs.
    downloadTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
    downloadTimeoutsRef.current = [];

    setDownloadingPolicyId(externalPolicyId);
    setDownloadingAttachmentIndex(0);

    downloadableAttachments.forEach((attachment, index) => {
      const timeoutId = window.setTimeout(() => {
        setDownloadingAttachmentIndex(index);
        window.open(attachment.content_url, "_blank");

        if (index === downloadableAttachments.length - 1) {
          setDownloadingPolicyId(null);
          setDownloadingAttachmentIndex(null);
        }
      }, 800 * (index + 1));

      downloadTimeoutsRef.current.push(timeoutId);
    });
  };

  const openCancelDialog = (policy: Policy) => {
    if (!resolveExternalPolicyId(policy)) {
      toast.error("Annulation impossible: référence externe manquante.");
      return;
    }
    setCancelReason("");
    setCancelDialogPolicy(policy);
  };

  const handleConfirmCancel = async () => {
    if (!cancelDialogPolicy) return;
    const externalPolicyId = resolveExternalPolicyId(cancelDialogPolicy);
    if (!externalPolicyId) {
      toast.error("Annulation impossible: référence externe manquante.");
      return;
    }
    if (cancelReason.trim().length === 0) {
      toast.error("Veuillez renseigner un motif d'annulation.");
      return;
    }

    const res = await cancelPolicy.mutateAsync({
      policyId: externalPolicyId,
      cancellation_reason: cancelReason.trim(),
    });
    console.log("res", res);
    if (!res.ok) {
      toast.error(res.error?.message ?? "Annulation impossible.");
      return;
    }
    setCancelDialogPolicy(null);
    setCancelReason("");
    toast.success("Demande d'annulation envoyée.");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-lg border border-border bg-white p-5 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par type, catégorie, destination ou référence…"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-lg border border-border bg-white py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-800"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-800"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={handleExport}
            className="bg-orange-500 hover:bg-primary/90 md:ml-auto md:w-auto"
            disabled={filteredPolicies.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Exporter CSV
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2 border-b border-border px-6 py-4">
          <FileText className="h-5 w-5 text-orange-500" />
          <h2 className="text-base font-semibold text-foreground">
            Liste des polices d&apos;assurance
          </h2>
          {filteredPolicies.length !== policies.length && (
            <span className="ml-auto text-xs text-muted-foreground">
              {filteredPolicies.length} / {policies.length} résultat
              {filteredPolicies.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {filteredPolicies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShieldCheck className="mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm font-medium text-foreground">
              {policies.length === 0
                ? "Aucune police pour le moment"
                : "Aucun résultat pour cette recherche"}
            </p>
            <p className="mt-1 text-xs text-orange-500 dark:text-blue-400">
              {policies.length === 0
                ? "Vos contrats apparaîtront ici après souscription."
                : "Essayez de modifier vos critères de recherche."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      Date de création
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Référence
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPolicies.map((policy) => (
                  <tr
                    key={policy.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(policy.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">
                      {policy.externalPolicyId ?? policy.id}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {policy.policyType ?? "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {(() => {
                          const hasExternalPolicyId = !!resolveExternalPolicyId(policy);
                          return (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                              <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuItem
                                  onClick={() => handleViewDetails(policy)}
                                  disabled={!hasExternalPolicyId}
                                >
                                  <Eye className="mr-2 h-3.5 w-3.5" />
                                  Détail
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem
                                  onClick={() => void handleDownloadCertificate(policy)}
                                  disabled={
                                    !hasExternalPolicyId ||
                                    (downloadingPolicyId === resolveExternalPolicyId(policy) &&
                                      downloadingAttachmentIndex !== null)
                                  }
                                >
                                  <Download className="mr-2 h-3.5 w-3.5" />
                                  {downloadingPolicyId === resolveExternalPolicyId(policy) &&
                                  downloadingAttachmentIndex !== null
                                    ? "Téléchargement..."
                                    : "Télécharger"}
                                </DropdownMenuItem> */}
                                <DropdownMenuItem
                                  onClick={() => handleNavigateUpdate(policy)}
                                  disabled={!hasExternalPolicyId}
                                >
                                  <RefreshCcw className="mr-2 h-3.5 w-3.5" />
                                  Mettre à jour
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openCancelDialog(policy)}
                                  disabled={!hasExternalPolicyId || cancelPolicy.isPending}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Ban className="mr-2 h-3.5 w-3.5" />
                                  Annuler
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          );
                        })()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog
        open={cancelDialogPolicy !== null}
        onOpenChange={(open) => {
          if (!open) {
            setCancelDialogPolicy(null);
            setCancelReason("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer l&apos;annulation</DialogTitle>
            <DialogDescription>
              Cette action enverra une demande d&apos;annulation pour la police{" "}
              <span className="font-medium text-foreground">
                {cancelDialogPolicy?.externalPolicyId ?? cancelDialogPolicy?.id}
              </span>
              .
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label htmlFor="cancel-reason" className="text-sm font-medium text-foreground">
              Motif d&apos;annulation
            </label>
            <textarea
              id="cancel-reason"
              value={cancelReason}
              onChange={(event) => setCancelReason(event.target.value)}
              placeholder="Ex: Changement de projet de voyage"
              rows={4}
              className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCancelDialogPolicy(null);
                setCancelReason("");
              }}
            >
              Fermer
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => void handleConfirmCancel()}
              disabled={cancelPolicy.isPending}
            >
              {cancelPolicy.isPending ? "Annulation..." : "Confirmer l'annulation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
