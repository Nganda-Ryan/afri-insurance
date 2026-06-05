"use client";

import { useMemo } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormGetValues,
  type UseFormRegister,
} from "react-hook-form";

import { validateCameroonPhoneInput } from "@/lib/smobilpay/phone";
import { validateUniquePassportNumber, type PassportUniquenessData } from "@/lib/utils";

import { AUTHORIZED_COUNTRIES } from "@/lib/constants/authorized-contry";
import { WORLD_COVERAGE_COUNTRY } from "@/lib/travel/authorized-countries";

import DatePicker from "@/components/form/date-picker";
import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import type { PersonFormData } from "@/types/subscribe";

type PersonFieldPrefix = "" | `groupMembers.${number}.`;

export type PersonFieldsFormValues = FieldValues & {
  passport_number?: string;
  groupMembers?: PersonFormData[];
};

interface PersonFieldsProps<T extends PersonFieldsFormValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  getValues: UseFormGetValues<T>;
  errors: FieldErrors<T>;
  namePrefix: PersonFieldPrefix;
  title?: string;
  embedded?: boolean;
}

export function PersonFields<T extends PersonFieldsFormValues>({
  control,
  register,
  getValues,
  errors,
  namePrefix,
  title,
  embedded = false,
}: PersonFieldsProps<T>) {
  const fieldName = (key: keyof PersonFormData) =>
    `${namePrefix}${key}` as Path<T>;
  const fieldId = (key: keyof PersonFormData) => `${namePrefix}${key}`.replaceAll(".", "-");
  const memberIndex =
    namePrefix === "" ? null : Number.parseInt(namePrefix.split(".")[1] ?? "-1", 10);
  const fieldError = (key: keyof PersonFormData) =>
    memberIndex == null
      ? (errors as FieldErrors<PersonFormData>)[key]
      : (errors as FieldErrors<{ groupMembers: PersonFormData[] }>).groupMembers?.[memberIndex]?.[
          key
        ];

  const residenceNationalityOptions = useMemo(() => {
    const all = Array.from(new Set(Object.values(AUTHORIZED_COUNTRIES).flat()));
    const withoutCoverage = all.filter(
      (c) => c && c.trim().length > 0 && c !== WORLD_COVERAGE_COUNTRY,
    );

    return withoutCoverage
      .sort((a, b) => a.localeCompare(b, "fr"))
      .map((country) => ({ value: country, label: country }));
  }, []);

  const fields = (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Civilite <span className="text-red-500">*</span>
        </Label>
        <Controller
          control={control}
          name={fieldName("title")}
          rules={{ required: "Civilite obligatoire" }}
          render={({ field }) => (
            <Select
              id={fieldId("title")}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              options={[{ value: "M", label: "M." }, { value: "Mme", label: "Mme" }]}
              error={!!fieldError("title")}
              className="border border-gray-200 py-3 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            />
          )}
        />
        {fieldError("title") && (
          <p className="mt-1 text-sm text-red-500">{String(fieldError("title")?.message ?? "")}</p>
        )}
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Prenom <span className="text-red-500">*</span>
        </Label>
        <InputField
          type="text"
          placeholder="Jean"
          {...register(fieldName("first_name"), { required: "Prenom obligatoire" })}
          error={!!fieldError("first_name")}
          className="border border-gray-200 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {fieldError("first_name") && (
          <p className="mt-1 text-sm text-red-500">
            {String(fieldError("first_name")?.message ?? "")}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Nom <span className="text-red-500">*</span>
        </Label>
        <InputField
          type="text"
          placeholder="Dupont"
          {...register(fieldName("last_name"), { required: "Nom obligatoire" })}
          error={!!fieldError("last_name")}
          className="border border-gray-200 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {fieldError("last_name") && (
          <p className="mt-1 text-sm text-red-500">{String(fieldError("last_name")?.message ?? "")}</p>
        )}
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Date de naissance <span className="text-red-500">*</span>
        </Label>
        <Controller
          control={control}
          name={fieldName("birth_date")}
          rules={{
            required: "Date de naissance obligatoire",
            validate: (v: string) => new Date(v) < new Date() || "La date doit etre dans le passe",
          }}
          render={({ field }) => (
            <DatePicker
              id={fieldId("birth_date")}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!fieldError("birth_date")}
              className="border border-gray-200 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            />
          )}
        />
        {fieldError("birth_date") && (
          <p className="mt-1 text-sm text-red-500">{String(fieldError("birth_date")?.message ?? "")}</p>
        )}
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          E-mail <span className="text-red-500">*</span>
        </Label>
        <InputField
          type="email"
          placeholder="jean.dupont@example.com"
          {...register(fieldName("email"), {
            required: "E-mail obligatoire",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Format e-mail invalide" },
          })}
          error={!!fieldError("email")}
          className="border border-gray-200 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {fieldError("email") && (
          <p className="mt-1 text-sm text-red-500">{String(fieldError("email")?.message ?? "")}</p>
        )}
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Telephone <span className="text-red-500">*</span>
        </Label>
        <InputField
          type="tel"
          placeholder="+237 6 00 00 00 00"
          {...register(fieldName("phone_number"), {
            required: "Telephone obligatoire",
            validate: validateCameroonPhoneInput,
          })}
          error={!!fieldError("phone_number")}
          className="border border-gray-200 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {fieldError("phone_number") && (
          <p className="mt-1 text-sm text-red-500">
            {String(fieldError("phone_number")?.message ?? "")}
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        <Label className="mb-2 font-semibold text-text-main">
          Adresse postale <span className="text-red-500">*</span>
        </Label>
        <InputField
          type="text"
          placeholder="123 rue de la Paix"
          {...register(fieldName("address"), { required: "Adresse obligatoire" })}
          error={!!fieldError("address")}
          className="border border-gray-200 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {fieldError("address") && (
          <p className="mt-1 text-sm text-red-500">{String(fieldError("address")?.message ?? "")}</p>
        )}
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Ville <span className="text-red-500">*</span>
        </Label>
        <InputField
          type="text"
          placeholder="Yaounde"
          {...register(fieldName("city"), { required: "Ville obligatoire" })}
          error={!!fieldError("city")}
          className="border border-gray-200 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {fieldError("city") && (
          <p className="mt-1 text-sm text-red-500">{String(fieldError("city")?.message ?? "")}</p>
        )}
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Pays de destination
        </Label>
        <Controller
          control={control}
          name={fieldName("destination_country")}
          render={({ field }) => (
            <Select
              id={fieldId("destination_country")}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled
              options={
                field.value
                  ? [{ value: field.value, label: field.value }]
                  : []
              }
              error={!!fieldError("destination_country")}
              className="border border-gray-200 py-3 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            />
          )}
        />
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Pays de résidence <span className="text-red-500">*</span>
        </Label>
        <Controller
          control={control}
          name={fieldName("residence_country")}
          rules={{ required: "Pays de résidence obligatoire" }}
          render={({ field }) => (
            <Select
              id={fieldId("residence_country")}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Choisir un pays…"
              options={residenceNationalityOptions}
              error={!!fieldError("residence_country")}
              className="border border-gray-200 py-3 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            />
          )}
        />
        {fieldError("residence_country") && (
          <p className="mt-1 text-sm text-red-500">
            {String(fieldError("residence_country")?.message ?? "")}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Nationalité <span className="text-red-500">*</span>
        </Label>
        <Controller
          control={control}
          name={fieldName("nationality")}
          rules={{ required: "Nationalité obligatoire" }}
          render={({ field }) => (
            <Select
              id={fieldId("nationality")}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Choisir un pays…"
              options={residenceNationalityOptions}
              error={!!fieldError("nationality")}
              className="border border-gray-200 py-3 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            />
          )}
        />
        {fieldError("nationality") && (
          <p className="mt-1 text-sm text-red-500">
            {String(fieldError("nationality")?.message ?? "")}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Numero de passeport <span className="text-red-500">*</span>
        </Label>
        <InputField
          type="text"
          placeholder="AB123456"
          {...register(fieldName("passport_number"), {
            required: "Numero de passeport obligatoire",
            validate: (value) =>
              validateUniquePassportNumber(
                value,
                getValues() as unknown as PassportUniquenessData,
              ),
          })}
          error={!!fieldError("passport_number")}
          className="border border-gray-200 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {fieldError("passport_number") && (
          <p className="mt-1 text-sm text-red-500">
            {String(fieldError("passport_number")?.message ?? "")}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 font-semibold text-text-main">
          Expiration du passeport <span className="text-red-500">*</span>
        </Label>
        <Controller
          control={control}
          name={fieldName("passeport_exp_date")}
          rules={{
            required: "Date d'expiration obligatoire",
            validate: (v: string) =>
              new Date(v) > new Date() || "Le passeport doit etre valide (date future)",
          }}
          render={({ field }) => (
            <DatePicker
              id={fieldId("passeport_exp_date")}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!fieldError("passeport_exp_date")}
              className="border border-gray-200 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            />
          )}
        />
        {fieldError("passeport_exp_date") && (
          <p className="mt-1 text-sm text-red-500">
            {String(fieldError("passeport_exp_date")?.message ?? "")}
          </p>
        )}
      </div>
    </div>
  );

  if (embedded) {
    return fields;
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
      {title ? (
        <h3 className="mb-3 text-base font-semibold sm:text-lg">{title}</h3>
      ) : null}
      {fields}
    </div>
  );
}
