"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { resetUserPassword } from "@/actions/password-reset.actions";
import { Button } from "@/components/ui/button";

interface IResetForm {
  password: string;
  confirm: string;
}

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IResetForm>({ defaultValues: { password: "", confirm: "" } });

  // Si pas de token dans l'URL, l'affichage indique directement que le lien est invalide
  if (!token) {
    return (
      <div className="flex flex-col flex-1 lg:w-1/2 w-full">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto px-6">
          <div className="rounded-xl bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Lien invalide
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ce lien de réinitialisation est manquant ou invalide.
            </p>
          </div>
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/auth/forgot-password"
              className="font-medium text-brand-500 hover:text-brand-600 underline underline-offset-2"
            >
              Faire une nouvelle demande
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: IResetForm) => {
    setServerError(null);
    const result = await resetUserPassword(token, data.password);

    if (!result.ok) {
      setServerError(result.error?.message ?? "Une erreur est survenue.");
      return;
    }

    // Redirige vers la page de connexion avec un message de succès
    router.push("/auth/signin?passwordCreated=1");
  };

  const EyeToggle = ({
    show,
    onToggle,
  }: {
    show: boolean;
    onToggle: () => void;
  }) => (
    <button
      type="button"
      tabIndex={-1}
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      aria-label={show ? "Masquer" : "Afficher"}
    >
      {show ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )}
    </button>
  );

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto px-6">
        <h1 className="mb-2 font-semibold text-gray-800 dark:text-white text-title-sm sm:text-title-md">
          Créer mon mot de passe
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Choisissez un mot de passe sécurisé (8 caractères minimum).
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nouveau mot de passe */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Nouveau mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="8 caractères minimum"
                autoComplete="new-password"
                className={`w-full rounded-lg border px-4 py-2.5 pr-11 text-sm outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400
                  ${errors.password
                    ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  }`}
                {...register("password", {
                  required: "Le mot de passe est requis",
                  minLength: { value: 8, message: "8 caractères minimum" },
                })}
              />
              <EyeToggle show={showPassword} onToggle={() => setShowPassword((v) => !v)} />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirmation */}
          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirmer le mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Répétez le mot de passe"
                autoComplete="new-password"
                className={`w-full rounded-lg border px-4 py-2.5 pr-11 text-sm outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400
                  ${errors.confirm
                    ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  }`}
                {...register("confirm", {
                  required: "La confirmation est requise",
                  validate: (value) =>
                    value === watch("password") || "Les mots de passe ne correspondent pas",
                })}
              />
              <EyeToggle show={showConfirm} onToggle={() => setShowConfirm((v) => !v)} />
            </div>
            {errors.confirm && (
              <p className="mt-1 text-xs text-red-500">{errors.confirm.message}</p>
            )}
          </div>

          {serverError && (
            <div className="rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{serverError}</p>
              {serverError.includes("expiré") && (
                <Link
                  href="/auth/forgot-password"
                  className="mt-1 inline-block text-sm font-medium text-brand-500 hover:text-brand-600 underline underline-offset-2"
                >
                  Faire une nouvelle demande
                </Link>
              )}
            </div>
          )}

          <Button className="w-full" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement…" : "Définir mon mot de passe"}
          </Button>
        </form>
      </div>
    </div>
  );
}
