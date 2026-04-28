"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateProfileInfoAction } from "@/actions/profile.actions";
import { useUserStore } from "@/store/userStore";
import type { IUpdateProfileInfoRequestDto } from "@/types/profile";

interface IProfileInfoFormProps {
  initialValues: IUpdateProfileInfoRequestDto & { email: string };
}

const inputBase =
  "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800";

const inputNormal = `${inputBase} bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;

const inputError = `${inputBase} text-error-800 border-error-500 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;

const inputDisabled = `${inputBase} text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400";

export default function ProfileInfoForm({ initialValues }: IProfileInfoFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const updateInfo = useUserStore((s) => s.updateInfo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<IUpdateProfileInfoRequestDto>({
    defaultValues: {
      firstName: initialValues.firstName,
      lastName: initialValues.lastName,
      phone: initialValues.phone,
    },
  });

  const onSubmit = async (data: IUpdateProfileInfoRequestDto) => {
    setServerError(null);
    const result = await updateProfileInfoAction(data);

    if (!result.ok) {
      setServerError(result.error?.message ?? "Une erreur est survenue.");
      return;
    }

    updateInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || null,
    });

    reset(data);
    setIsEditing(false);
    toast.success("Informations mises à jour avec succès.");
  };

  const handleCancel = () => {
    reset({
      firstName: initialValues.firstName,
      lastName: initialValues.lastName,
      phone: initialValues.phone,
    });
    setServerError(null);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
        {/* Email — lecture seule */}
        <div className="col-span-2">
          <label className={labelClass}>Adresse email</label>
          <div className="relative">
            <input
              type="email"
              value={initialValues.email}
              readOnly
              disabled
              className={inputDisabled}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
              non modifiable
            </span>
          </div>
        </div>

        {/* Prénom */}
        <div className="col-span-2 lg:col-span-1">
          <label htmlFor="firstName" className={labelClass}>
            Prénom <span className="text-error-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Votre prénom"
            autoComplete="given-name"
            readOnly={!isEditing}
            className={
              errors.firstName                ? inputError
                : isEditing
                  ? inputNormal
                  : inputDisabled
            }
            {...register("firstName", { required: "Le prénom est requis." })}
          />
          {errors.firstName && (
            <p className="mt-1.5 text-xs text-error-500">{errors.firstName.message}</p>
          )}
        </div>

        {/* Nom */}
        <div className="col-span-2 lg:col-span-1">
          <label htmlFor="lastName" className={labelClass}>
            Nom <span className="text-error-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Votre nom de famille"
            autoComplete="family-name"
            readOnly={!isEditing}
            className={
              errors.lastName
                ? inputError
                : isEditing
                  ? inputNormal
                  : inputDisabled
            }
            {...register("lastName", { required: "Le nom est requis." })}
          />
          {errors.lastName && (
            <p className="mt-1.5 text-xs text-error-500">{errors.lastName.message}</p>
          )}
        </div>

        {/* Téléphone */}
        <div className="col-span-2 lg:col-span-1">
          <label htmlFor="phone" className={labelClass}>
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+237 6xx xxx xxx"
            autoComplete="tel"
            readOnly={!isEditing}
            className={
              errors.phone
                ? inputError
                : isEditing
                  ? inputNormal
                  : inputDisabled
            }
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-error-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {serverError && (
        <div className="mt-5 rounded-lg bg-error-50 border border-error-200 dark:bg-error-900/20 dark:border-error-800 p-3">
          <p className="text-sm text-error-600 dark:text-error-400">{serverError}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Annuler
          </button>
        )}
        <button
          type={isEditing ? "submit" : "button"}
          disabled={isEditing ? isSubmitting || !isDirty : false}
          onClick={
            isEditing
              ? undefined
              : () => {
                  setServerError(null);
                  setIsEditing(true);
                }
          }
          className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
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
          {isEditing
            ? isSubmitting
              ? "Enregistrement…"
              : "Enregistrer"
            : "Modifier"}
        </button>
      </div>
    </form>
  );
}
