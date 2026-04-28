"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { sendPasswordResetLink } from "@/actions/password-reset.actions";
import { Button } from "@/components/ui/button";

interface IForgotForm {
  email: string;
}

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IForgotForm>({ defaultValues: { email: "" } });

  const onSubmit = async (data: IForgotForm) => {
    setServerError(null);
    const result = await sendPasswordResetLink(data.email);

    if (!result.ok) {
      setServerError(result.error?.message ?? "Une erreur est survenue.");
      return;
    }

    setSent(true);
  };

  // ── État : email envoyé ────────────────────────────────────────────────────
  if (sent) {
    return (
      <div className="flex flex-col flex-1 lg:w-1/2 w-full">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto px-6">
          <div className="rounded-xl bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800 p-6 text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Email envoyé !
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Si un compte existe pour{" "}
              <strong className="text-gray-800 dark:text-white">{getValues("email")}</strong>,
              vous recevrez un lien valable <strong>1 heure</strong>.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vérifiez aussi vos spams.
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/auth/signin"
              className="font-medium text-brand-500 hover:text-brand-600 underline underline-offset-2"
            >
              ← Retour à la connexion
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // ── État : formulaire ──────────────────────────────────────────────────────
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto px-6">
        <h1 className="mb-2 font-semibold text-gray-800 dark:text-white text-title-sm sm:text-title-md">
          Définir mon mot de passe
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Renseignez votre adresse email. Si un compte lui est associé, vous
          recevrez un lien pour créer ou réinitialiser votre mot de passe.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Adresse email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="vous@exemple.com"
              autoComplete="email"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400
                ${errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                }`}
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Adresse email invalide",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {serverError && (
            <div className="rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{serverError}</p>
            </div>
          )}

          <Button className="w-full" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours…" : "Recevoir le lien"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/auth/signin"
            className="font-medium text-brand-500 hover:text-brand-600 underline underline-offset-2"
          >
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
