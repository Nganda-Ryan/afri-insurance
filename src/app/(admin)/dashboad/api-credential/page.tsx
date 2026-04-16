"use client"
import { useState } from "react";
import { Eye, EyeOff, Copy, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Credential {
  id: string;
  name: string;
  key: string;
  secret: string;
  environment: "sandbox" | "live";
  createdAt: string;
  lastUsed: string;
}

export default function Page() {
  const [credentials, setCredentials] = useState<Credential[]>([
    {
      id: "1",
      name: "Development",
      key: "pk_live_abc123xyz789",
      secret: "sk_live_secret_super_long_string",
      environment: "live",
      createdAt: "2024-01-15",
      lastUsed: "2 hours ago",
    },
    {
      id: "2",
      name: "Testing",
      key: "pk_sandbox_test123",
      secret: "sk_sandbox_test_secret",
      environment: "sandbox",
      createdAt: "2024-01-10",
      lastUsed: "1 week ago",
    },
  ]);

  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const toggleSecretVisibility = (id: string) => {
    setVisibleSecrets((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const deleteCredential = (id: string) => {
    setCredentials((prev) => prev.filter((cred) => cred.id !== id));
  };

  const generateNewCredential = () => {
    const newId = String(credentials.length + 1);
    const newCredential: Credential = {
      id: newId,
      name: "New Credential",
      key: `pk_live_${Math.random().toString(36).substr(2, 11)}`,
      secret: `sk_live_${Math.random().toString(36).substr(2, 21)}`,
      environment: "sandbox",
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "Just now",
    };
    setCredentials((prev) => [newCredential, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">API Credentials</h1>
          <p className="text-muted-foreground mt-2">
            Manage your API keys for sandbox and live environments
          </p>
        </div>
        <Button onClick={generateNewCredential} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Generate New Credential
        </Button>
      </div>

      {/* Tenant ID */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Tenant ID</h3>
        <div className="flex items-center gap-3">
          <code className="text-sm font-mono bg-white dark:bg-slate-800 px-3 py-2 rounded border border-blue-200 dark:border-blue-800 text-foreground flex-1">
            tenant_550e8400e29b41d4a71628ce
          </code>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard("tenant_550e8400e29b41d4a71628ce", "tenant-id")}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground dark:text-blue-400 mt-2">
          Use this ID in the X-Tenant-ID header for all API requests
        </p>
      </div>

      {/* Credentials List */}
      <div className="space-y-4">
        {credentials.map((cred) => (
          <div
            key={cred.id}
            className="bg-white dark:bg-slate-900 border border-border rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-lg">{cred.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Created {cred.createdAt} • Last used {cred.lastUsed}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  cred.environment === "live"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                }`}
              >
                {cred.environment.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3">
              {/* Public Key */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Public Key
                </label>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded border border-border text-foreground flex-1 break-all">
                    {cred.key}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(cred.key, `key-${cred.id}`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Secret Key */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Secret Key
                </label>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded border border-border text-foreground flex-1">
                    {visibleSecrets.has(cred.id)
                      ? cred.secret
                      : "•".repeat(cred.secret.length)}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSecretVisibility(cred.id)}
                  >
                    {visibleSecrets.has(cred.id) ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(cred.secret, `secret-${cred.id}`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {copied === `secret-${cred.id}` && "Secret copied to clipboard"}
                {copied === `key-${cred.id}` && "Key copied to clipboard"}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteCredential(cred.id)}
                className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Revoke
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
