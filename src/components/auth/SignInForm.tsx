"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from "next/image";

interface ICredentialsForm {
  email: string;
  password: string;
}

const ERROR_FANTOME =
  "Votre compte a été créé lors de votre achat. Veuillez vous connecter avec Google ou cliquer sur Définir mon mot de passe.";
const ERROR_DEFAULT = "Email ou mot de passe incorrect.";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlError = searchParams.get("error");
  const passwordCreated = searchParams.get("passwordCreated") === "1";

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(
    urlError ? ERROR_DEFAULT : null
  );
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICredentialsForm>({
    defaultValues: { email: "", password: "" },
  });

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleLogin = async (data: ICredentialsForm) => {
    setLoginError(null);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      if (result.error === "COMPTE_FANTOME") {
        setLoginError(ERROR_FANTOME);
      } else {
        setLoginError(ERROR_DEFAULT);
      }
      return;
    }

    if (result?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto px-6">
        <div className="mb-6 flex items-center justify-center gap-4">
          <Image
            src="/images/logo/logo-afri-insurance.png"
            alt="Logo Afri Insurance"
            width={120}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
          <Image
            src="/images/logo/logo-afri-life.png"
            alt="Logo Afri Life"
            width={120}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>

        <h1 className="mb-2 font-semibold text-gray-800 dark:text-white text-title-sm sm:text-title-md text-center">
          Se connecter
        </h1>

        {/* Message de succès après création de mot de passe */}
        {passwordCreated && (
          <div className="rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800 p-3 mb-4">
            <p className="text-sm text-green-700 dark:text-green-400 font-medium">
              Mot de passe créé avec succès. Connectez-vous maintenant.
            </p>
          </div>
        )}

        {/* Google button */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-3 mb-6"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {googleLoading ? "Redirection…" : "Continuer avec Google"}
        </Button>

        {/* Separator */}
        <div className="flex items-center gap-3 mb-6">
          <hr className="flex-1 border-gray-200 dark:border-gray-700" />
          <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            ou
          </span>
          <hr className="flex-1 border-gray-200 dark:border-gray-700" />
        </div>

        {/* Credentials form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="vous@exemple.com"
              autoComplete="email"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400
                ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"}`}
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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Votre mot de passe"
                autoComplete="current-password"
                className={`w-full rounded-lg border px-4 py-2.5 pr-11 text-sm outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400
                  ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"}`}
                {...register("password", {
                  required: "Le mot de passe est requis",
                })}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? (
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
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {loginError && (
            <div className="rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{loginError}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connexion…" : "Se connecter"}
          </Button>
        </form>

        {/* Forgot / first login link */}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center">
          Première connexion ou mot de passe oublié ?{" "}
          <Link
            href="/auth/forgot-password"
            className="font-medium text-brand-500 hover:text-brand-600 underline underline-offset-2"
          >
            Définir mon mot de passe
          </Link>
        </p>
      </div>
    </div>
  );
}