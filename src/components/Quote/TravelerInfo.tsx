"use client"

import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { TravelerInfoData } from '@/types/travel'
interface TravelerInfoProps {
  onSubmit: (data: TravelerInfoData) => void
  onBack: () => void
}

const ADULT_AGE_IN_MS = 18 * 365.25 * 24 * 60 * 60 * 1000
const maxAdultDob = new Date(Date.now() - ADULT_AGE_IN_MS)
  .toISOString()
  .split('T')[0]

export function TravelerInfo({
  onSubmit,
  onBack,
}: TravelerInfoProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<{ dateOfBirth: string }>({
    mode: 'onChange',
    defaultValues: {
      dateOfBirth: '',
    },
  })

  const dateOfBirth = useWatch({ control, name: 'dateOfBirth' })

  const isDateValid =
    touchedFields.dateOfBirth && !errors.dateOfBirth && Boolean(dateOfBirth)

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          oldestTravelerBirthDate: data.dateOfBirth,
        }),
      )}
      className="bg-surface-base rounded-lg p-6 lg:p-8 shadow-sm border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-brand-secondary mb-6">
        Voyageur le plus âgé
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-text-main mb-2">
            Date de naissance du voyageur le plus âgé
          </label>
          <input
            type="date"
            {...register('dateOfBirth', {
              required: 'La date de naissance est obligatoire',
              validate: (value) =>
                value <= maxAdultDob ||
                'Le voyageur le plus âgé doit avoir au moins 18 ans',
            })}
            max={maxAdultDob}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-surface-muted focus:bg-surface-base focus:outline-none transition-colors ${errors.dateOfBirth ? 'border-red-500' : isDateValid ? 'border-green-500' : 'border-gray-200 focus:border-brand-primary'}`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Cette donnée sert à calculer <code>oldest_traveler_age</code> pour la
          requête de devis EVO.
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-text-main rounded-lg font-semibold hover:border-brand-secondary transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Retour
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-brand-primary text-text-inverse rounded-lg font-semibold hover:bg-opacity-90 transition-opacity shadow-md"
        >
          Continuer
        </button>
      </div>
    </form>
  )
}
