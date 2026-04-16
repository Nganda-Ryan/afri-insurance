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
  const progress = ((currentStep + 1) / totalSteps) * 100
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className={`text-sm font-medium ${index < currentStep ? 'text-brand-500' : index === currentStep ? 'text-gray-900' : 'text-gray-400'}`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-brand-500"
          style={{
            width: `${progress}%`,
            transition: 'width 0.5s ease-in-out',
          }}
        />
      </div>
    </div>
  )
}
