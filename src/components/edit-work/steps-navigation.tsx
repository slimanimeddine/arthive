'use client'
import { classNames } from '@/lib/utils'
import { CheckIcon } from '@heroicons/react/20/solid'
import useArtworkStore from '@/stores/artwork-store'

export default function StepsNavigation() {
  const { step: currentStep, setStep, isStepValid } = useArtworkStore()

  const steps = [
    {
      name: 'Step 1',
      href: '#',
      status: currentStep > 1 ? 'complete' : 'current',
    },
    {
      name: 'Step 2',
      href: '#',
      status:
        currentStep > 2
          ? 'complete'
          : currentStep === 2
            ? 'current'
            : 'upcoming',
    },
    {
      name: 'Step 3',
      href: '#',
      status:
        currentStep > 3
          ? 'complete'
          : currentStep === 3
            ? 'current'
            : 'upcoming',
    },
    {
      name: 'Step 4',
      href: '#',
      status: currentStep === 4 ? 'current' : 'upcoming',
    },
  ]

  const handleStepClick = (stepIndex: number) => {
    if (
      stepIndex < currentStep ||
      (stepIndex === currentStep && isStepValid())
    ) {
      setStep(stepIndex)
    }
  }

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="flex items-center"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
              'relative'
            )}
          >
            {step.status === 'complete' ? (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="h-0.5 w-full bg-indigo-600" />
                </div>
                <button
                  onClick={() => handleStepClick(stepIdx + 1)}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900"
                >
                  <CheckIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-white"
                  />
                  <span className="sr-only">{step.name}</span>
                </button>
              </>
            ) : step.status === 'current' ? (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <button
                  onClick={() => handleStepClick(stepIdx + 1)}
                  aria-current="step"
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
                >
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-indigo-600"
                  />
                  <span className="sr-only">{step.name}</span>
                </button>
              </>
            ) : (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <button
                  onClick={() => handleStepClick(stepIdx + 1)}
                  disabled={step.status === 'upcoming'}
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 cursor-pointer"
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      step.status === 'upcoming'
                        ? 'bg-transparent group-hover:bg-gray-300'
                        : 'bg-gray-300',
                      'h-2.5 w-2.5 rounded-full'
                    )}
                  />
                  <span className="sr-only">{step.name}</span>
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
