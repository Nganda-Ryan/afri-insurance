import React from 'react'
interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}
export function ProgressBar({
  currentStep,
  totalSteps,
  stepLabels,
}: ProgressBarProps) {
  const stepRange = Math.max(totalSteps - 1, 1)
  const progress = Math.min(Math.max((currentStep / stepRange) * 100, 0), 100)
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className={`text-sm font-medium ${index < currentStep ? 'text-orange-500' : index === currentStep ? 'text-gray-900' : 'text-gray-400'}`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-brand-primary"
          style={{
            width: `${progress}%`,
            transition: 'width 0.5s ease-in-out',
          }}
        />
      </div>
    </div>
  )
}
