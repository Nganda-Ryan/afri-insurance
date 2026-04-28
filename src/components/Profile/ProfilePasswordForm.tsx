"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updatePasswordAction } from "@/actions/profile.actions";
import type { IUpdatePasswordRequestDto } from "@/types/profile";

interface IProfilePasswordFormProps {
  hasPassword: boolean;
}

const inputBase =
  "h-11 w-full rounded-lg border appearance-none px-4 pr-11 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800";

const inputNormal = `${inputBase} bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;

const inputError = `${inputBase} text-error-800 border-error-500 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400";

const inputDisabled =
  "h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 shadow-theme-xs cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400";

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
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )}
  </button>
);

const actionButtonClass =
  "flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed";

export default function ProfilePasswordForm({ hasPassword }: IProfilePasswordFormProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IUpdatePasswordRequestDto>({
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  if (!hasPassword) {
    return (
      <div className="rounded-2xl bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 p-5">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Vous êtes connecté via Google. La gestion du mot de passe n&apos;est pas
          disponible pour les comptes OAuth.
        </p>
      </div>
    );
  }

  const onSubmit = async (data: IUpdatePasswordRequestDto) => {
    setServerError(null);
    const result = await updatePasswordAction(data);

    if (!result.ok) {
      setServerError(result.error?.message ?? "Une erreur est survenue.");
      return;
    }

    toast.success("Mot de passe mis à jour avec succès.");
    reset();
    setIsEditing(false);
  };

  const startEditing = () => {
    setServerError(null);
    reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setServerError(null);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="password-placeholder" className={labelClass}>
            Mot de passe
          </label>
          <input
            id="password-placeholder"
            type="password"
            defaultValue="••••••••"
            readOnly
            disabled
            tabIndex={-1}
            autoComplete="off"
            aria-label="Mot de passe masqué (aperçu)"
            className={inputDisabled}
          />
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={startEditing} className={actionButtonClass}>
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Modifier
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
        {/* Mot de passe actuel */}
        <div className="col-span-2 lg:col-span-1">
          <label htmlFor="currentPassword" className={labelClass}>
            Mot de passe actuel <span className="text-error-500">*</span>
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showCurrent ? "text" : "password"}
              placeholder="Votre mot de passe actuel"
              autoComplete="current-password"
              className={errors.currentPassword ? inputError : inputNormal}
              {...register("currentPassword", {
                required: "Le mot de passe actuel est requis.",
              })}
            />
            <EyeToggle show={showCurrent} onToggle={() => setShowCurrent((v) => !v)} />
          </div>
          {errors.currentPassword && (
            <p className="mt-1.5 text-xs text-error-500">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* Nouveau mot de passe */}
        <div className="col-span-2 lg:col-span-1">
          <label htmlFor="newPassword" className={labelClass}>
            Nouveau mot de passe <span className="text-error-500">*</span>
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNew ? "text" : "password"}
              placeholder="8 caractères minimum"
              autoComplete="new-password"
              className={errors.newPassword ? inputError : inputNormal}
              {...register("newPassword", {
                required: "Le nouveau mot de passe est requis.",
                minLength: { value: 8, message: "8 caractères minimum." },
              })}
            />
            <EyeToggle show={showNew} onToggle={() => setShowNew((v) => !v)} />
          </div>
          {errors.newPassword && (
            <p className="mt-1.5 text-xs text-error-500">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirmation */}
        <div className="col-span-2 lg:col-span-1">
          <label htmlFor="confirmPassword" className={labelClass}>
            Confirmer le mot de passe <span className="text-error-500">*</span>
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Répétez le nouveau mot de passe"
              autoComplete="new-password"
              className={errors.confirmPassword ? inputError : inputNormal}
              {...register("confirmPassword", {
                required: "La confirmation est requise.",
                validate: (value) =>
                  value === watch("newPassword") ||
                  "Les mots de passe ne correspondent pas.",
              })}
            />
            <EyeToggle show={showConfirm} onToggle={() => setShowConfirm((v) => !v)} />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-error-500">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {serverError && (
        <div className="mt-5 rounded-lg bg-error-50 border border-error-200 dark:bg-error-900/20 dark:border-error-800 p-3">
          <p className="text-sm text-error-600 dark:text-error-400">{serverError}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={cancelEditing}
          disabled={isSubmitting}
          className="rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Annuler
        </button>
        <button type="submit" disabled={isSubmitting} className={actionButtonClass}>
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          {isSubmitting ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
