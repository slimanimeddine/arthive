'use client'

import { classNames } from '@/lib/utils'
import useArtworkStore from '@/stores/artwork-store'
import FirstStep from './first-step'
import FourthStep from './fourth-step'
import SecondStep from './second-step'
import ThirdStep from './third-step'

type CreateArtworkProps = {
  token: string
}

export default function CreateArtwork({ token }: CreateArtworkProps) {
  const { step, setStep, isStepValid } = useArtworkStore()

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FirstStep />
      case 2:
        return <SecondStep />
      case 3:
        return <ThirdStep token={token} />
      case 4:
        return <FourthStep token={token} />
      default:
        return null
    }
  }

  const handleBack = () => {
    setStep(Math.max(step - 1, 1))
  }

  const handleNext = () => {
    setStep(Math.min(step + 1, 4))
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Create Artwork</h1>
      {renderStep()}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className={classNames(
            'px-4 py-2 text-white rounded-md transition-colors',
            step === 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-500 hover:bg-gray-600'
          )}
          disabled={step === 1} // Disable "Back" on the first step
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className={classNames(
            'px-4 py-2 text-white rounded-md transition-colors',
            isStepValid()
              ? 'bg-indigo-500 hover:bg-indigo-600'
              : 'bg-gray-400 cursor-not-allowed'
          )}
          disabled={!isStepValid()} // Disable "Next" if the current step is not valid
        >
          {step === 4 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}
