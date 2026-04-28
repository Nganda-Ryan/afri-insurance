"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { useUserStore } from "@/store/userStore";

export function SignOutButton() {
  const clearUser = useUserStore((s) => s.clearUser);

  async function handleSignOut() {
    clearUser();
    await signOut({ callbackUrl: "/" });
  }

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:bg-slate-900 dark:hover:bg-red-900/20"
    >
      <LogOut className="h-4 w-4" />
      Se déconnecter
    </button>
  );
}
