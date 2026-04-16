"use client"
import React, { useEffect, useState } from 'react'
import { TripDetails } from './TripDetails'
import { TravelerInfo } from './TravelerInfo'
import { QuoteSummary } from './QuoteSummary'
import { ValidationModal } from './ValidationModal'
import { ProgressBar } from './ProgressBar'
import { SelectedPlan, TravelerInfoData, TripDetailsData } from '@/types/travel'
interface QuotationWizardProps {
  onWizardStateChange: (inProgress: boolean) => void
}
export function QuotationWizard({ onWizardStateChange }: QuotationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [tripDetails, setTripDetails] = useState<TripDetailsData | null>(null)
  const [travelerInfo, setTravelerInfo] = useState<TravelerInfoData | null>(
    null,
  )
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const stepLabels = ['Détails du voyage', 'Âge du voyageur', 'Devis']
  useEffect(() => {
    onWizardStateChange(currentStep > 0 || tripDetails !== null)
  }, [currentStep, tripDetails, onWizardStateChange])
  
  const handleTripDetailsSubmit = (data: TripDetailsData) => {
    setTripDetails(data)
    setCurrentStep(1)
  }
  const handleTravelerInfoSubmit = (data: TravelerInfoData) => {
    setTravelerInfo(data)
    setCurrentStep(2)
  }
  const handlePlanSelection = (plan: SelectedPlan) => {
    setSelectedPlan(plan)
    setShowValidationModal(true)
  }
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  const handleCloseModal = () => {
    setShowValidationModal(false)
  }
  return (
    <div className='space-y-4'>
        <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-secondary">
                Assurance assistance voyage
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-main text-opacity-90">
                Complétez les étapes pour obtenir des offres.
            </p>
        </div>

        {currentStep < 2 && (
            <ProgressBar
                currentStep={currentStep}
                totalSteps={2}
                stepLabels={stepLabels}
            />
        )}

        <div key={currentStep}>
            {currentStep === 0 && <TripDetails onSubmit={handleTripDetailsSubmit} />}
            {currentStep === 1 && (<TravelerInfo onSubmit={handleTravelerInfoSubmit} onBack={handleBack} />)}
            {currentStep === 2 && tripDetails && travelerInfo && (
                <QuoteSummary
                    tripDetails={tripDetails}
                    travelerInfo={travelerInfo}
                    onPlanSelect={handlePlanSelection}
                    onBack={handleBack}
                />
            )}
        </div>

        {showValidationModal && selectedPlan && tripDetails && travelerInfo && (
            <ValidationModal
            selectedPlan={selectedPlan}
            tripDetails={tripDetails}
            travelerInfo={travelerInfo}
            onClose={handleCloseModal}
            />
        )}
    </div>
  )
}
